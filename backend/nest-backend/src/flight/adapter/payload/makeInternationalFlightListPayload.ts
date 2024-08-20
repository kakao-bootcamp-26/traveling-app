export const makeInternationalRoundTripFlightListKeyPayload = () => {
  const payload = {
    operationName: 'getInternationalList',
    variables: {
      adult: 1,
      child: 0,
      infant: 0,
      where: 'pc',
      isDirect: true,
      galileoFlag: true,
      travelBizFlag: true,
      fareType: 'Y',
      itinerary: [
        {
          departureAirport: 'ICN',
          arrivalAirport: 'DAD',
          departureDate: '20240907',
        },
        {
          departureAirport: 'DAD',
          arrivalAirport: 'ICN',
          departureDate: '20240912',
        },
      ],
      stayLength: '',
      trip: 'OW',
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

export const makeInternationalRoundTripFlightListPayload = ({
  galileoKey,
  travelBizKey,
}: NaverFlightKey) => {
  if (!galileoKey || !travelBizKey) {
    throw new Error('Galileo or TravelBiz key is missing');
  }
  const payload = {
    operationName: 'getInternationalList',
    variables: {
      adult: 1,
      child: 0,
      infant: 0,
      where: 'pc',
      isDirect: true,
      galileoFlag: galileoKey !== '',
      travelBizFlag: travelBizKey !== '', // If empty, set to false
      fareType: 'Y',
      itinerary: [
        {
          departureAirport: 'ICN',
          arrivalAirport: 'DAD',
          departureDate: '20240907',
        },
      ],
      stayLength: '',
      trip: 'OW',
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
