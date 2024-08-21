import { InitTravelInfo } from "@/shared/entities";
import { createMenuItem } from "@/shared/utils";
import dayjs from "dayjs";

export const initTravelItem: InitTravelInfo[] = [
  {
    key: "1",
    origin: { airportCode: "ICN", city: "서울/인천", cityCode: "SEL" },
    destination: { airportCode: "LAX", city: "Los Angeles", cityCode: "LAX" },
    schedule: { departure: dayjs("10:00"), arrival: dayjs("14:00") },
    passenger: {
      flightClass: "Economy",
      count: {
        adults: 1,
        children: 0,
        infants: 0,
      },
    },
  },
  {
    key: "2",
    origin: { airportCode: "JFK", city: "New York", cityCode: "NYC" },
    destination: { airportCode: "HND", city: "Tokyo", cityCode: "TYO" },
    schedule: { departure: dayjs("08:00"), arrival: dayjs("12:00") },
    passenger: {
      flightClass: "Economy",
      count: {
        adults: 1,
        children: 0,
        infants: 0,
      },
    },
  },
];

export const initMenuList = initTravelItem.map((info) =>
  createMenuItem({
    origin: info.origin,
    destination: info.destination,
    key: info.key,
    schedule: info?.schedule,
  }),
);
