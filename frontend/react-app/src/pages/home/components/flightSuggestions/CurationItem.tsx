import React from "react";
import { FlightInformation } from "@/shared/entities/flightCuration.entity";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

type Props = {
  curation: FlightInformation;
};
export default function CurationItem({ curation }: Props) {
  return (
    <article className="flex w-[60%] min-w-[500px]">
      <section className="w-[70%] bg-dark-blue-2 px-6 py-4 flex flex-col">
        <section className="flex-col mb-2">
          <div className="flex mb-2 gap-x-4">
            <span>가는 항공편</span>
            <span>
              {curation.departure.departureDate}-{curation.departure.arrivalDate}
            </span>
          </div>
          <div className="flex items-center justify-between gap-x-2 text-[12px]">
            <div className="flex flex-col w-[42px] items-center">
              <span>{dayjs(curation.departure.departureTime, "HHmm").format("HH:mm")}</span>
              <span>{curation.departure.departureAirport}</span>
            </div>
            <div className="min-w-[160px] flex-1 flex flex-col justify-center items-center">
              <span>
                {curation.departure.journeyTime.hours}h {curation.departure.journeyTime.minutes}m
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="118.002"
                height="6"
                viewBox="0 0 118.002 6"
              >
                <path
                  data-name="합치기 48"
                  d="M4061.173 16317.2h-106.345a3 3 0 1 1 0-2h106.344a3 3 0 1 1 0 2z"
                  transform="translate(-3949 -16313.203)"
                  style={{ fill: "#c9d2d7" }}
                />
              </svg>
            </div>
            <div className="flex flex-col w-[42px] items-center">
              <span>{dayjs(curation.departure.arrivalTime, "HHmm").format("HH:mm")}</span>
              <span>{curation.departure.arrivalAirport}</span>
            </div>
            <div className="flex flex-col w-[50px] items-center">
              <span>항공사</span>
              <span>{curation.departure.airline}</span>
            </div>
          </div>
        </section>
        <section className="flex-col">
          <div className="flex mb-2 gap-x-4">
            <span>오는 항공편</span>
            <span>
              {curation.arrival.departureDate}-{curation.arrival.arrivalDate}
            </span>
          </div>
          <div className="flex items-center justify-between gap-x-2 text-[12px]">
            <div className="flex flex-col w-[42px] items-center">
              <span>{dayjs(curation.arrival.departureTime, "HHmm").format("HH:mm")}</span>
              <span>{curation.arrival.departureAirport}</span>
            </div>
            <div className="min-w-[160px] flex-1 flex flex-col justify-center items-center">
              <span>
                {curation.arrival.journeyTime.hours}h {curation.arrival.journeyTime.minutes}m
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="118.002"
                height="6"
                viewBox="0 0 118.002 6"
              >
                <path
                  data-name="합치기 48"
                  d="M4061.173 16317.2h-106.345a3 3 0 1 1 0-2h106.344a3 3 0 1 1 0 2z"
                  transform="translate(-3949 -16313.203)"
                  style={{ fill: "#c9d2d7" }}
                />
              </svg>
            </div>
            <div className="flex flex-col w-[42px] items-center">
              <span>{dayjs(curation.arrival.arrivalTime, "HHmm").format("HH:mm")}</span>
              <span>{curation.arrival.arrivalAirport}</span>
            </div>
            <div className="flex flex-col w-[50px] items-center">
              <span>항공사</span>
              <span>{curation.arrival.airline}</span>
            </div>
          </div>
        </section>
      </section>
      <section className="w-[30%] bg-dark-grey px-6 py-4">
        <div className="mb-4">
          <div>어른: ₩{curation.fare.adult}</div>
          <div>어린이: ₩{curation.fare.child}</div>
          <div>유아: ₩{curation.fare.infant}</div>
        </div>
        <div className="flex justify-center px-2 py-2 font-semibold bg-blue-400 rounded-md">
          <button>
            <Link to={curation.link} target="_blank">
              SELECT
            </Link>
          </button>
        </div>
      </section>
    </article>
  );
}
