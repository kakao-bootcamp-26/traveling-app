type ArrivalInfo = {
  arrivalAirport: string;
  arrivalTime: string;
  arrivalDate: string;
};
type DepartureInfo = {
  departureAirport: string;
  departureTime: string;
  departureDate: string;
};
type FlightSchedule = {
  airline: string;
  journeyTime: {
    hours: number;
    minutes: number;
  };
  carbonEmission: number;
};
type FlightFare = {
  adult: number;
  child: number;
  infant: number;
};

export type FlightTimeInformation = ArrivalInfo & DepartureInfo & FlightSchedule;

export type FlightInformation = {
  // 왕복의 출발
  arrival: FlightTimeInformation;
  // 왕복의 도착
  departure: FlightTimeInformation;
  fare: FlightFare;
  link: string;
  id: string;
};
export interface FlightCuration {
  [key: string]: FlightInformation;
}
