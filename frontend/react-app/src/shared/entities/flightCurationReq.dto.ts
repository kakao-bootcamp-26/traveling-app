interface PassengerInformation {
  count: {
    adult: number;
    child: number;
    infant: number;
  };
  fareType: "Y" | "C" | "F"; // Economy, Business, First
}
export interface TravelInformation {
  passenger: PassengerInformation;
  trip: "OW" | "RT"; // One Way, Round Trip
  originCityCode: string;
  destinationCityCode: string;
  departureDate: string;
  arrivalDate: string;
}
