import { fareType } from "@/pages/home/constants/fareType";
import { fetchInternationalRoundTripFlightList } from "@/services/flight";
import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { TravelInfo } from "@/shared/entities";
import { isFlightCurationErrorResponse } from "@/shared/entities/flightCuration.entity";
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
        flightCuration: {
          data: null,
          error: null,
        },
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
        trip: "RT", // Round Trip
      });
      if (isFlightCurationErrorResponse(flightCuration)) {
        updateFlightSuggestions({
          key: travelInfo.key,
          flightCuration: {
            data: null,
            error: flightCuration.error,
          },
        });
      } else {
        updateFlightSuggestions({
          key: travelInfo.key,
          flightCuration: {
            data: flightCuration,
            error: null,
          },
        });
      }

      setIsFetching(false);
    } catch (error) {
      updateFlightSuggestions({
        key: travelInfo.key,
        flightCuration: {
          data: null,
          error: "요청 중 오류가 발생했습니다.",
        },
      });
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
