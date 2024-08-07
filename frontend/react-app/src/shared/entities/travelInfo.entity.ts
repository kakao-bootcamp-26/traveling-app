// 비행기 클래스 정보 타입 정의
export type FlightClass = "Economy" | "Business" | "First";

// 여행 일정을 나타내는 타입 정의
export interface TravelSchedule {
  departure: Date; // 출발 일시
  arrival: Date; // 도착 일시
}

export interface PassengerCount {
  adults: number; // 성인 수
  children: number; // 어린이 수
  infants: number; // 유아 수
} // 탑승객 수

// 탑승객 정보를 나타내는 타입 정의
interface Passenger {
  flightClass: FlightClass; // 비행기 클래스 정보
  count: PassengerCount;
}

// 여행 정보를 나타내는 타입 정의
export interface TravelInfo {
  passenger: Passenger; // 탑승객 정보
  origin: string; // 출발지
  destination: string; // 목적지
  schedule: TravelSchedule; // 여행 일정
  key: string;
}

// 여행 정보 고민 중일 때의 타입
export interface InitTravelInfo {
  origin: string; // 출발지
  destination: string; // 목적지
  passenger: Passenger; // 탑승객 정보
  schedule?: Partial<TravelSchedule>; // 여행 일정
  key: string;
}
