import React from "react";
import { FlightInformation } from "@/shared/entities/flightCuration.entity";
import { Link } from "react-router-dom";
import FlightTimeInformation from "@/pages/home/components/flightSuggestions/FlightTimeInformation";
import { useRecoilValue } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";

type Props = {
  curation: FlightInformation;
};
export default function CurationItem({ curation }: Props) {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  return (
    <article className="flex w-[60%] min-w-[600px]">
      <section className="w-[75%] bg-dark-blue-2 px-6 py-4 flex flex-col">
        <FlightTimeInformation type="departure" flightInformation={curation.departure} />
        <hr className="my-4 " />
        <FlightTimeInformation type="arrival" flightInformation={curation.arrival} />
      </section>
      <section className="w-[25%] bg-dark-grey px-3 py-4">
        <div className="mb-4 text-[13px]">
          <div>어른: ₩{curation.fare.adult}</div>
          <div>어린이: ₩{curation.fare.child}</div>
          <div>유아: ₩{curation.fare.infant}</div>
        </div>

        <div className="mb-2">
          <div>어른: ${selectedTravelInfo.passenger.count.adults} 명</div>
          <div>어린이: ${selectedTravelInfo.passenger.count.children} 명</div>
          <div>유아: ${selectedTravelInfo.passenger.count.children} 명</div>
          <hr className="my-2" />
          <div>
            총: ₩
            {curation.fare.adult * selectedTravelInfo.passenger.count.adults +
              curation.fare.child * selectedTravelInfo.passenger.count.children +
              curation.fare.infant * selectedTravelInfo.passenger.count.infants}
          </div>
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
