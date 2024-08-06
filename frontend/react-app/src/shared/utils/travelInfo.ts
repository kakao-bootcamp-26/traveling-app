import { InitTravelInfo } from "@/shared/entities";

export const createNewTravelItem = (key: string): InitTravelInfo => {
  return {
    origin: "Seoul",
    destination: "Jeju",
    passenger: {
      count: 0,
      flightClass: "Economy",
    },
    key,
  };
};
