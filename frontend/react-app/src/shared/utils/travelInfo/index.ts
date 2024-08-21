import { InitTravelInfo } from "@/shared/entities";

export const createNewTravelItem = (key: string): InitTravelInfo => {
  return {
    origin: { airportCode: "ICN", city: "서울/인천" },
    destination: {
      city: "",
      airportCode: "",
    },
    passenger: {
      count: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      flightClass: "Economy",
    },
    key,
  };
};
