import React from "react";
import { Airlines, FlightInformation } from "@/shared/entities/flightCuration.entity";
import { Link } from "react-router-dom";
import FlightTimeInformation from "@/pages/home/components/flightSuggestions/curationList/success/FlightTimeInformation";
import { useRecoilValue } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";

type Props = {
  curation: FlightInformation;
  airlines: Airlines;
};
export default function FlightCurationItem({ curation, airlines }: Props) {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  return (
    <article className="flex w-[60%] min-w-[600px]">
      <section className="w-[75%] bg-dark-blue-2 px-6 py-4 flex flex-col">
        <FlightTimeInformation
          type="departure"
          flightInformation={curation.departure}
          airline={airlines[curation.departure?.airline]}
        />
        <hr className="my-4 " />
        <FlightTimeInformation
          type="arrival"
          flightInformation={curation.arrival}
          airline={airlines[curation.arrival?.airline]}
        />
      </section>
      <section className="w-[25%] bg-dark-grey px-3 py-4">
        <div className="mb-4 text-[13px]">
          <div>어른: ₩{curation.fare?.adult.toLocaleString("en-US")}</div>
          <div>어린이: ₩{curation.fare?.child.toLocaleString("en-US")}</div>
          <div>유아: ₩{curation.fare?.infant.toLocaleString("en-US")}</div>
        </div>

        <div className="mb-2">
          <div className="grid grid-cols-[1fr_1fr]">
            <span>어른</span>
            <span>: {selectedTravelInfo.passenger.count?.adults} 명</span>
            <span>어린이</span>
            <span>: {selectedTravelInfo.passenger.count?.children} 명</span>
            <span>유아</span>
            <span>: {selectedTravelInfo.passenger.count?.infants} 명</span>
          </div>
          <hr className="my-2" />
          <div>
            총: ₩
            {(
              curation.fare?.adult * selectedTravelInfo.passenger.count?.adults +
              curation.fare?.child * selectedTravelInfo.passenger.count?.children +
              curation.fare?.infant * selectedTravelInfo.passenger.count?.infants
            )?.toLocaleString("en-US")}
          </div>
        </div>
        <div
          className={`flex justify-center px-2 py-2 font-semibold ${curation.link ? "bg-blue-400" : "bg-slate-500"} rounded-md`}
        >
          <button>
            <Link to={curation.link || ""} target="_blank">
              SELECT
            </Link>
          </button>
        </div>
      </section>
    </article>
  );
}
