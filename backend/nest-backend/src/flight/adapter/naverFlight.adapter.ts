/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { TravelInformation } from '@/flight/dto/TravelInformation.dto';
import {
  makeInternationalRoundTripFlightListKeyPayload,
  makeInternationalRoundTripFlightListPayload,
  NaverFlightKey,
} from '@/flight/adapter/payload/makeInternationalFlightListPayload';

const got = async () => {
  const module = await import('got');
  return module.default;
};

const url = 'https://airline-api.naver.com/graphql';
const headers = {
  'Content-Type': 'application/json',
  Referer:
    'https://m-flight.naver.com/flights/international/ICN-DAD-20240907?adult=1&isDirect=true&fareType=Y',
};

const fetchNaverFlightKey = async (
  travelInformation: TravelInformation,
): Promise<NaverFlightKey> => {
  const gotInstance = await got();
  try {
    const payload =
      makeInternationalRoundTripFlightListKeyPayload(travelInformation);
    const response = await gotInstance.post(url, {
      json: payload,
      headers,
      responseType: 'json',
    });

    const responseData = response.body as any;
    const travelBizKey = responseData.data?.internationalList?.travelBizKey;
    const galileoKey = responseData.data?.internationalList?.galileoKey;

    return {
      travelBizKey: travelBizKey || '',
      galileoKey: galileoKey || '',
    };
  } catch (error) {
    console.log(error.response?.body?.errors);
    // console.error(
    //   'Error fetching the first response:',
    //   // error,
    //   error.response?.body,
    // );

    // if (error.response?.body?.errors) {
    //   const err = error.response.body.errors[0];
    //   console.error('Error fetching the first response!:', err.extensions);
    //   // console.error(
    //   //   'This Got-based implementation is equivalent to the Axios code you provided. The code is structured to make two API calls to the Naver airline API, the first to retrieve necessary keys and the second to use those keys to fetch detailed flight schedules and fares.',
    //   // );
    // }
  }
};

export const fetchInternationalFlightList = async (
  travelInformation: TravelInformation,
) => {
  try {
    const gotInstance = await got();
    const { galileoKey, travelBizKey } =
      await fetchNaverFlightKey(travelInformation);
    return new Promise((resolve) => {
      setTimeout(async () => {
        const payload = makeInternationalRoundTripFlightListPayload(
          {
            galileoKey,
            travelBizKey,
          },
          travelInformation,
        );
        const response = (await gotInstance.post(url, {
          json: payload,
          headers,
          responseType: 'json',
        })) as any;

        const results = response.body?.data?.internationalList?.results;

        const fares = results['fares'];
        const schedules = results['schedules'];
        const [departureSchedule, arrivalSchedule] = schedules as [any, any];

        const result = {};

        for (const item of Object.entries(fares)) {
          // 가격
          const [key, value] = item as [string, any];
          // console.log(value.fare['A01']);
          const fare = value.fare['A01'][0];
          const pricePerAdult =
            parseInt(fare['Adult']['NaverFare'], 10) ||
            parseInt(fare['Adult']['Fare'], 10) +
              parseInt(fare['Adult']['Tax'], 10) +
              parseInt(fare['Adult']['QCharge'], 10);
          const pricePerChild =
            parseInt(fare['Child']['NaverFare'], 10) ||
            parseInt(fare['Child']['Fare']) +
              parseInt(fare['Child']['Tax'], 10) +
              parseInt(fare['Child']['QCharge'], 10);
          const pricePerInfant =
            parseInt(fare['Infant']['NaverFare'], 10) ||
            parseInt(fare['Infant']['Fare']) +
              parseInt(fare['Infant']['Tax'], 10) +
              parseInt(fare['Infant']['QCharge'], 10);

          const pricePerPerson = {
            adult: pricePerAdult,
            child: pricePerChild,
            infant: pricePerInfant,
          };

          console.log(fare);
          const [departureSchKey, arrivalSchKey] = value.sch;
          const departureSch = departureSchedule[departureSchKey];
          const arrivalSch = arrivalSchedule[arrivalSchKey];

          result[key] = {
            id: key,
            departure: {
              departureAirport: departureSch.detail[0].sa, // 출발 공항
              departureDate: departureSch.detail[0].sdt, // 출발 날짜
              departureTime: departureSch.detail[0].sdt.slice(-4), // 출발 시각 (마지막 4자리)
              arrivalAirport: departureSch.detail[0].ea, // 도착 공항
              arrivalDate: departureSch.detail[0].edt, // 도착 날짜
              arrivalTime: departureSch.detail[0].edt.slice(-4), // 도착 시각 (마지막 4자리)
              airline: departureSch.detail[0].av, // 항공사
              journeyTime: {
                hours: parseInt(departureSch.journeyTime[0]),
                minutes: parseInt(departureSch.journeyTime[1]),
              },
              carbonEmission: departureSch.detail[0].carbonEmission,
            },

            arrival: {
              departureAirport: arrivalSch.detail[0].sa, // 출발 공항
              departureDate: arrivalSch.detail[0].sdt, // 출발 날짜
              departureTime: arrivalSch.detail[0].sdt.slice(-4), // 출발 시각 (마지막 4자리)
              arrivalAirport: arrivalSch.detail[0].ea, // 도착 공항
              arrivalDate: arrivalSch.detail[0].edt, // 도착 날짜
              arrivalTime: arrivalSch.detail[0].edt.slice(-4), // 도착 시각 (마지막 4자리)
              airline: arrivalSch.detail[0].av, // 항공사
              journeyTime: {
                hours: parseInt(arrivalSch.journeyTime[0]),
                minutes: parseInt(arrivalSch.journeyTime[1]),
              },
              carbonEmission: arrivalSch.detail[0].carbonEmission,
            },
            fare: pricePerPerson,
            link: fare?.ReserveParameter?.['#cdata-section'],
          };
        }

        if (Object.keys(result).length === 0) {
          resolve({ error: 'No results found' });
        } else {
          resolve(result);
        }
      }, 2000);
    });

    // return result;
  } catch (error) {
    console.error('Error fetching the second response:', error);
  }
};
