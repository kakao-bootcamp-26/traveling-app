import React from "react";
import { useRecoilValue } from "recoil";
import { useFindFlightStateContext } from "@/pages/home/components/provider/useFindFlightStateContext";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import AirplaneLoader from "@/shared/components/loader/AirplaneLoader";
import CurationItem from "@/pages/home/components/flightSuggestions/CurationItem";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import NoFlightCuration from "@/pages/home/components/flightSuggestions/NoFlightCuration";

export default function FlightSuggestions() {
  const { isFetching } = useFindFlightStateContext();

  const flightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  const curationKeys = Object.keys(flightSuggestions?.flightCuration.data ?? {});
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

        {!isFetching && (
          <div>
            <div>
              <nav className="flex flex-col justify-center mb-10 text-xl">
                <p>
                  Flights from {selectedTravelInfo.origin.city} To{" "}
                  {selectedTravelInfo.destination.city}
                </p>
              </nav>
              {flightSuggestions?.flightCuration.data && (
                <section className="flex flex-col w-full gap-y-8">
                  {curationKeys.map((key) => {
                    if (!flightSuggestions?.flightCuration.data) return null;
                    const curation = flightSuggestions.flightCuration.data[key];
                    const airlines = curation.airlines;
                    return <CurationItem key={key} curation={curation} airlines={airlines} />;
                  })}
                </section>
              )}
              {flightSuggestions?.flightCuration.error && <NoFlightCuration />}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
