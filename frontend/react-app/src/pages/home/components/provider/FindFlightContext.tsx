import { fareType } from "@/pages/home/constants/fareType";
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
    try {
      updateFlightSuggestions({
        key: travelInfo.key,
        flightCuration: null,
      });
      setIsFetching(true);
      const flightCuration = await fetchInternationalRoundTripFlightList({
        passenger: {
          count: {
            adult: travelInfo.passenger.count.adults,
            child: travelInfo.passenger.count.children,
            infant: travelInfo.passenger.count.infants,
          },
          fareType: fareType[travelInfo.passenger.flightClass],
        },
        originCityCode: travelInfo.origin.cityCode,
        destinationCityCode: travelInfo.destination.cityCode,
        departureDate: travelInfo.schedule.departure.format("YYYYMMDD"),
        arrivalDate: travelInfo.schedule.arrival.format("YYYYMMDD"),
        trip: "RT",
      });

      updateFlightSuggestions({
        key: travelInfo.key,
        flightCuration,
      });

      setIsFetching(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <FindFlightStateContext.Provider value={{ isFetching }}>
      <FindFlightDispatchContext.Provider value={{ findFlight }}>
        {children}
      </FindFlightDispatchContext.Provider>
    </FindFlightStateContext.Provider>
  );
};
