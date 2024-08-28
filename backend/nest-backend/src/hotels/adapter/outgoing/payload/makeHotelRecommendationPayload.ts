import { TravelInformation } from '@/hotels/dto/TravelInformation.dto';

export function makeHotelRecommendationPayload({
  checkInDate,
  checkOutDate,
  destination,
}: TravelInformation) {
  const payload = {
    operationName: 'statsRecommendedHotels',
    variables: {
      checkIn: checkInDate,
      checkOut: checkOutDate,
      iataCode: destination,
      impSection: 'FLIGHT_DETAIL',
      recoType: 'TOP_CLK',
    },

    query: `query statsRecommendedHotels($checkIn: String!, $checkOut: String!, $iataCode: String!, $impSection: ImpSection!, $recoType: RecoType!, $adultCnt: Int = 2, $childCnt: Int = 0, $includeTax: Boolean = false) {\n  statsRecommendedHotels(\n    checkIn: $checkIn\n    checkOut: $checkOut\n    iataCode: $iataCode\n    impSection: $impSection\n    recoType: $recoType\n    adultCnt: $adultCnt\n    childCnt: $childCnt\n    includeTax: $includeTax\n  ) {\n    hotelsInfo {\n      clkLogUrl\n      id\n      image\n      name\n      overallRating\n      price\n    }\n    impLogUrl\n  }\n}`,
  };

  return payload;
}
