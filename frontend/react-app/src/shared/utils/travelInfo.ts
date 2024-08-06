import { InitTravelInfo } from "@/shared/entities";

export const createNewTravelItem = (key: string): InitTravelInfo => {
  return {
    origin: "ICN",
    destination: "",
    passenger: {
      count: 0,
      flightClass: "Economy",
    },
    key,
  };
};
