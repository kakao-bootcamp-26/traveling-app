import { InitTravelInfo } from "@/shared/entities";

export const createNewTravelItem = (key: string): InitTravelInfo => {
  return {
    origin: "ICN",
    destination: "",
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
