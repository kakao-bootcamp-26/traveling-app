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

export type Airlines = {
  [key: string]: string;
};

export type Airports = {
  [key: string]: string;
};

export type FlightTimeInformation = ArrivalInfo & DepartureInfo & FlightSchedule;

export type FlightInformation = {
  // 왕복의 출발
  arrival: FlightTimeInformation;
  // 왕복의 도착
  departure: FlightTimeInformation;
  fare: FlightFare;
  link?: string;
  id: string;
};
export type FlightCuration = {
  flights: { [key: string]: FlightInformation };
} & { airlines: Airlines; airports: Airports };

export type FlightCurationError = { error: string };

export function isFlightCurationErrorResponse(
  response: FlightCuration | FlightCurationError,
): response is FlightCurationError {
  return "error" in response;
}
