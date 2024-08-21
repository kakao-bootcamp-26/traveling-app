import type { FlightTimeInformation as FlightTimeInformationEntity } from "@/shared/entities/flightCuration.entity";
import dayjs from "dayjs";

type Props = {
  type: "departure" | "arrival"; // 출국 귀국
  flightInformation: FlightTimeInformationEntity;
};

export default function FlightTimeInformation({ type, flightInformation }: Props) {
  return (
    <section className="flex-col">
      <div className="flex mb-2 gap-x-4">
        <span>{type === "departure" ? "가는" : "오는"} 항공편</span>
      </div>
      {/* 항공 정보 */}
      <div className="flex items-center justify-between gap-x-2 text-[12px]">
        <div className="flex flex-col w-[20%] items-center">
          <div className="flex flex-col items-center mb-2">
            <span className="text-[10px]">
              {dayjs(flightInformation.departureDate, "YYYYMMDDHHmm").format("YYYY/MM/DD(ddd)")}
            </span>
            <span>{dayjs(flightInformation.departureTime, "HHmm").format("HH:mm")}</span>
          </div>
          <span>{flightInformation.departureAirport}</span>
        </div>
        <div className="w-[45%] flex-1 flex flex-col justify-center items-center px-2">
          <span>
            {flightInformation.journeyTime.hours}h {flightInformation.journeyTime.minutes}m
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="6" viewBox="0 0 118.002 6">
            <path
              data-name="합치기 48"
              d="M4061.173 16317.2h-106.345a3 3 0 1 1 0-2h106.344a3 3 0 1 1 0 2z"
              transform="translate(-3949 -16313.203)"
              style={{ fill: "#c9d2d7" }}
            />
          </svg>
        </div>
        <div className="flex flex-col w-[20%] items-center">
          <div className="flex flex-col items-center mb-2">
            <span className="text-[10px]">
              {dayjs(flightInformation.arrivalDate, "YYYYMMDDHHmm").format("YYYY/MM/DD(ddd)")}
            </span>
            <span>{dayjs(flightInformation.arrivalTime, "HHmm").format("HH:mm")}</span>
          </div>
          <span>{flightInformation.arrivalAirport}</span>
        </div>
        <div className="flex flex-col w-[15%] items-center">
          <span>항공사</span>
          <span>{flightInformation.airline}</span>
        </div>
      </div>
      {/* 탄소배출 */}
    </section>
  );
}
