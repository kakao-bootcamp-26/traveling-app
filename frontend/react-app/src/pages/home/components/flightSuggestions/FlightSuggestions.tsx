import { useRecoilValue } from "recoil";
import { useFindFlightStateContext } from "@/pages/home/hooks/context/useFindFlightStateContext";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import AirplaneLoader from "@/shared/components/loader/AirplaneLoader";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import NoFlightCuration from "@/pages/home/components/flightSuggestions/NoFlightCuration";
import SelectFlightOptions from "@/pages/home/components/flightSuggestions/SelectFlightOptions";
import { SelectAirlineProvider } from "@/pages/home/components/provider/SelectAirlineContext";
import FlightCuration from "@/pages/home/components/flightSuggestions/FlightCuration";

export default function FlightSuggestions() {
  const { isFetching } = useFindFlightStateContext();

  const flightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  const flightKeys = Object.keys(flightSuggestions?.flightCuration.data?.flights ?? {});

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

        {!isFetching && flightSuggestions?.flightCuration && (
          <div>
            <div>
              <nav className="flex flex-col justify-center mb-6 text-xl">
                <p>
                  Flights from {selectedTravelInfo.origin.city} To{" "}
                  {selectedTravelInfo.destination.city}
                </p>
              </nav>
              <SelectAirlineProvider>
                <SelectFlightOptions />
                {flightSuggestions?.flightCuration.data && (
                  <FlightCuration flightKeys={flightKeys} />
                )}

                {flightSuggestions?.flightCuration.error && <NoFlightCuration />}
              </SelectAirlineProvider>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
