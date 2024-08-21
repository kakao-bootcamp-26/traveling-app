import React from "react";
import { useRecoilValue } from "recoil";
import { useFindFlightStateContext } from "@/pages/home/components/provider/useFindFlightStateContext";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import AirplaneLoader from "@/shared/components/loader/AirplaneLoader";
import CurationItem from "@/pages/home/components/flightSuggestions/CurationItem";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";

export default function FlightSuggestions() {
  const { isFetching } = useFindFlightStateContext();

  const flightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  const curationKeys = Object.keys(flightSuggestions?.flightCuration ?? {});
  return (
    <div className={`${flightSuggestions?.flightCuration ? "suggestion" : ""}`}>
      <section
        className={`${flightSuggestions ? "bg-dark-blue" : "bg-transparent"}  h-[100vh] overflow-y-scroll text-white relative px-6 py-4 `}
      >
        <div
          className={`${isFetching ? "opacity-100 visible" : "opacity-0 hidden"} transition-opacity duration-500 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2`}
        >
          <AirplaneLoader />
          <div className="mt-14">Searching for best flights</div>
        </div>

        <div>
          {flightSuggestions?.flightCuration && (
            <>
              <nav className="flex flex-col justify-center mb-10 text-xl">
                <p>
                  Flights from {selectedTravelInfo.origin.city} To{" "}
                  {selectedTravelInfo.destination.city}
                </p>
              </nav>
              <section className="flex flex-col w-full gap-y-8">
                {curationKeys.map((key) => {
                  if (!flightSuggestions?.flightCuration) return null;
                  const curation = flightSuggestions.flightCuration[key];
                  return <CurationItem key={key} curation={curation} />;
                })}
              </section>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
