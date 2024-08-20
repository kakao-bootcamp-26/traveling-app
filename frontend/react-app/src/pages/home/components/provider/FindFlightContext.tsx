import { fetchInternationalRoundTripFlightList } from "@/services/flight";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { TravelInfo } from "@/shared/entities";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

type FindFlightStateProps = {
  isFetching: boolean;
};

type FindFlightDispatchProps = {
  findFlight: any;
};

export const FindFlightStateContext = createContext<FindFlightStateProps>({
  isFetching: false,
});
export const FindFlightDispatchContext = createContext<FindFlightDispatchProps>({
  findFlight: () => {},
});

export const FindFlightProvider = ({ children }: PropsWithChildren) => {
  const [isFetching, setIsFetching] = useState(false);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  const updateFlightSuggestions = useSetRecoilState(selectedTravelInfoFlightSuggestionsAtom);

  useEffect(() => {
    if (selectedTravelInfo) {
      setIsFetching(false);
    }
  }, [selectedTravelInfo]);

  const findFlight = async (travelInfo: TravelInfo) => {
    updateFlightSuggestions({
      key: travelInfo.key,
      flight: null,
    });
    setIsFetching(true);
    const response = await fetchInternationalRoundTripFlightList();
    console.log(response);
    setTimeout(() => {
      const flight = {
        origin: travelInfo.origin,
        destination: travelInfo.destination,
        schedule: travelInfo.schedule,
      };
      updateFlightSuggestions({
        key: travelInfo.key,
        flight,
      });
      setIsFetching(false);
    }, 3000);
  };

  return (
    <FindFlightStateContext.Provider value={{ isFetching }}>
      <FindFlightDispatchContext.Provider value={{ findFlight }}>
        {children}
      </FindFlightDispatchContext.Provider>
    </FindFlightStateContext.Provider>
  );
};
