/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { makeHotelRecommendationPayload } from '@/hotels/adapter/outgoing/payload/makeHotelRecommendationPayload';
import { HotelRecommendationsNaversResponse } from '@/hotels/dto/HotelCuration.dto';
import { TravelInformation } from '@/hotels/dto/TravelInformation.dto';

const got = async () => {
  const module = await import('got');
  return module.default;
};

const makeNaverHotelRecommendationApiOptions = ({
  checkInDate,
  checkOutDate,
  destination,
  origin,
  passengerInfo: { count, fareType },
}: TravelInformation) => {
  const url = 'https://airline-api.naver.com/graphql';

  let passengerInfo = '';
  if (count.adult > 0) {
    passengerInfo += `adult=${count.adult}`;
  }
  if (count.child > 0) {
    passengerInfo += `&child=${count.child}`;
  }
  if (count.infant > 0) {
    passengerInfo += `&infant=${count.infant}`;
  }

  const headers = {
    'Content-Type': 'application/json',
    Referer: `https://m-flight.naver.com/flights/international/${origin}-${destination}-${checkInDate}/${destination}-${origin}-${checkOutDate}?${passengerInfo}&isDirect=true&fareType=${fareType}`,
  };
  return { url, headers };
};

const fetchNaverHotelRecommendation = async (
  url: string,
  headers: Record<string, string>,
  travelInformationDto: TravelInformation,
) => {
  const gotInstance = await got();
  try {
    const payload = makeHotelRecommendationPayload(travelInformationDto);
    const response = await gotInstance.post(url, {
      json: payload,
      headers,
      responseType: 'json',
    });

    const responseData = response.body as HotelRecommendationsNaversResponse;
    const results = responseData.data.statsRecommendedHotels;
    const hotelInfos = results.hotelsInfo;
    console.log('hotelInfos', hotelInfos);

    return { data: hotelInfos };
  } catch (error) {
    console.log(error?.response?.body?.errors);
  }
};

export const getNaverHotelRecommendation = async (
  travelInformationDto: TravelInformation,
) => {
  try {
    const MAX_ATTEMPTS = 4;
    let attempts = 0;

    const { url, headers } =
      makeNaverHotelRecommendationApiOptions(travelInformationDto);

    while (attempts < MAX_ATTEMPTS) {
      const hotelInfos = await fetchNaverHotelRecommendation(
        url,
        headers,
        travelInformationDto,
      );
      if (hotelInfos) {
        return hotelInfos;
      }
      attempts++;
    }
    return { error: 'Max attempts reached, no results found.' };
  } catch (error) {
    console.error('Error fetching the first response');
  }
};
