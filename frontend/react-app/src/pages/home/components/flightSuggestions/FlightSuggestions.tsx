import React from "react";
import { useRecoilValue } from "recoil";
import { useFindFlightStateContext } from "@/pages/home/components/provider/useFindFlightStateContext";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import AirplaneLoader from "@/shared/components/loader/AirplaneLoader";

export default function FlightSuggestions() {
  const { isFetching } = useFindFlightStateContext();

  const flightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);

  return (
    <div className={`${flightSuggestions?.flight ? "suggestion" : ""}`}>
      <section
        className={`${flightSuggestions ? "bg-dark-blue" : "bg-transparent"}  h-[100vh] overflow-y-scroll text-white relative`}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <AirplaneLoader
            className={`${isFetching ? "opacity-100 visible" : "opacity-0 hidden"} transition-opacity duration-500 transition-`}
          />
        </div>
        {flightSuggestions?.flight && <div>{flightSuggestions?.flight?.destination?.city}</div>}
      </section>
    </div>
  );
}
