import { TravelInformation } from '@/flight/dto/TravelInformation.dto';

export const makeInternationalRoundTripFlightListKeyPayload = ({
  passenger: {
    count: { adult, child, infant },
    fareType,
  },
  trip,
  originCityCode,
  destinationCityCode,
  departureDate,
  arrivalDate,
}: TravelInformation) => {
  const payload = {
    operationName: 'getInternationalList',
    variables: {
      adult,
      child,
      infant,
      where: 'pc',
      isDirect: true, // 직항
      galileoFlag: true,
      travelBizFlag: true,
      fareType: fareType,
      itinerary: [
        {
          departureAirport: originCityCode,
          arrivalAirport: destinationCityCode,
          departureDate: departureDate,
        },
        {
          departureAirport: destinationCityCode,
          arrivalAirport: originCityCode,
          departureDate: arrivalDate,
        },
      ],
      stayLength: '',
      // trip: 'OW',
      trip: trip,
      galileoKey: '',
      travelBizKey: '',
    },
    query: `query getInternationalList(
        $trip: InternationalList_TripType!,
        $itinerary: [InternationalList_itinerary]!,
        $adult: Int = 1,
        $child: Int = 0,
        $infant: Int = 0,
        $fareType: InternationalList_CabinClass!,
        $where: InternationalList_DeviceType = pc,
        $isDirect: Boolean = false,
        $stayLength: String,
        $galileoKey: String,
        $galileoFlag: Boolean = true,
        $travelBizKey: String,
        $travelBizFlag: Boolean = true
    ) {
        internationalList(
            input: {
                trip: $trip,
                itinerary: $itinerary,
                person: { adult: $adult, child: $child, infant: $infant },
                fareType: $fareType,
                where: $where,
                isDirect: $isDirect,
                stayLength: $stayLength,
                galileoKey: $galileoKey,
                galileoFlag: $galileoFlag,
                travelBizKey: $travelBizKey,
                travelBizFlag: $travelBizFlag
            }
        ) {
            galileoKey
            galileoFlag
            travelBizKey
            travelBizFlag
            totalResCnt
            resCnt
            results {
                airlines
                airports
                fareTypes
                schedules
                fares
                errors
            }
        }
    }`,
  };
  return payload;
};

export type NaverFlightKey = {
  galileoKey: string;
  travelBizKey: string;
};

export const makeInternationalRoundTripFlightListPayload = (
  { galileoKey, travelBizKey }: NaverFlightKey,
  {
    passenger: {
      count: { adult, child, infant },
      fareType,
    },
    trip,
    originCityCode,
    destinationCityCode,
    departureDate,
    arrivalDate,
  }: TravelInformation,
) => {
  const payload = {
    operationName: 'getInternationalList',
    variables: {
      adult,
      child,
      infant,
      where: 'pc',
      isDirect: true,
      galileoFlag: galileoKey !== '',
      travelBizFlag: travelBizKey !== '', // If empty, set to false
      fareType,
      itinerary: [
        {
          departureAirport: originCityCode,
          arrivalAirport: destinationCityCode,
          departureDate: departureDate,
        },
        {
          departureAirport: destinationCityCode,
          arrivalAirport: originCityCode,
          departureDate: arrivalDate,
        },
      ],
      stayLength: '',
      trip,
      galileoKey: galileoKey,
      travelBizKey: travelBizKey,
    },
    query: `query getInternationalList($trip: InternationalList_TripType!, $itinerary: [InternationalList_itinerary]!, $adult: Int = 1, $child: Int = 0, $infant: Int = 0, $fareType: InternationalList_CabinClass!, $where: InternationalList_DeviceType = pc, $isDirect: Boolean = false, $stayLength: String, $galileoKey: String, $galileoFlag: Boolean = true, $travelBizKey: String, $travelBizFlag: Boolean = true) {
                internationalList(
                    input: {trip: $trip, itinerary: $itinerary, person: {adult: $adult, child: $child, infant: $infant}, fareType: $fareType, where: $where, isDirect: $isDirect, stayLength: $stayLength, galileoKey: $galileoKey, galileoFlag: $galileoFlag, travelBizKey: $travelBizKey, travelBizFlag: $travelBizFlag}
                ) {
                    galileoKey
                    galileoFlag
                    travelBizKey
                    travelBizFlag
                    totalResCnt
                    resCnt
                    results {
                        airlines
                        airports
                        fareTypes
                        schedules
                        fares
                        errors
                    }
                }
            }`,
  };

  return payload;
};
