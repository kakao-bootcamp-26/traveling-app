// 비행기 클래스 정보 타입 정의
type FlightClass = "Economy" | "Business" | "First";

// 여행 일정을 나타내는 타입 정의
interface TravelSchedule {
  departure: Date; // 출발 일시
  arrival: Date; // 도착 일시
}

// 탑승객 정보를 나타내는 타입 정의
interface Passenger {
  flightClass: FlightClass; // 비행기 클래스 정보
  count: number; // 탑승객 수
}

// 여행 정보를 나타내는 타입 정의
interface TravelInfo {
  passenger: Passenger; // 탑승객 정보
  origin: string; // 출발지
  destination: string; // 목적지
  schedule: TravelSchedule; // 여행 일정
}
