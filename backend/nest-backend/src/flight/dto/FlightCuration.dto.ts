interface JourneyTime {
  hours: number;
  minutes: number;
}

interface FlightDetail {
  departureAirport: string;
  departureDate: string;
  departureTime: string;
  arrivalAirport: string;
  arrivalDate: string;
  arrivalTime: string;
  airline: string;
  journeyTime: JourneyTime;
  carbonEmission: number;
}

interface PricePerPerson {
  adult: number;
  child: number;
  infant: number;
}

// interface FlightSchedule {
//   departure: FlightDetail;
//   arrival: FlightDetail;
//   fare: PricePerPerson;
//   link?: string; // ReserveParameter가 없는 경우에 대비하여 optional로 설정
//   airlines: any; // airlines에 대한 타입이 명확하지 않아서 any로 설정 (필요에 따라 정의 가능)
// }

interface FlightResult {
  id: string;
  departure: FlightDetail;
  arrival: FlightDetail;
  fare: PricePerPerson;
  link?: string;
  airlines: any;
}

export interface FlightCurationSuccess {
  [key: string]: FlightResult;
}

export interface FlightCurationError {
  error: string;
}
