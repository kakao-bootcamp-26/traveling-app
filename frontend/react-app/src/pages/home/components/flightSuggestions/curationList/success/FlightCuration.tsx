import FlightCurationItem from "@/pages/home/components/flightSuggestions/curationList/success/FlightCurationItem";
import { useSelectAirlineStateContext } from "@/pages/home/hooks/context/useSelectAirlineStateContext";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import React from "react";
import { useRecoilValue } from "recoil";

export default function FlightCuration({ flightKeys }: { flightKeys: string[] }) {
  const flightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);
  const { selectedAirlineCodes, isAllAirlineSelected } = useSelectAirlineStateContext();

  return (
    <section className="flex flex-col gap-y-8 mr-14 h-[80vh] overflow-y-scroll">
      {flightKeys.map((key) => {
        if (!flightSuggestions?.flightCuration.data?.flights) return null;
        const curation = flightSuggestions.flightCuration.data.flights[key];
        const airlines = flightSuggestions.flightCuration.data.airlines;

        const isSatisfyArrivalAirline = selectedAirlineCodes.includes(curation.arrival.airline);
        const isSatisfyDepartureAirline = selectedAirlineCodes.includes(curation.departure.airline);

        // 항공사 - 전체 선택 / 부분 선택
        if (isAllAirlineSelected) {
          // 전체 선택
          return <FlightCurationItem key={key} curation={curation} airlines={airlines} />;
        } else if (isSatisfyArrivalAirline || isSatisfyDepartureAirline) {
          // 부분 선택 조건 만족
          return <FlightCurationItem key={key} curation={curation} airlines={airlines} />;
        } else {
          return null;
        }
      })}
    </section>
  );
}
