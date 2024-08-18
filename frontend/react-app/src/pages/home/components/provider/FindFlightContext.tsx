import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { TravelInfo } from "@/shared/entities";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type FindFlightStateProps = {
  flight: any;
  isLoading: boolean;
  start: boolean;
};

type FindFlightDispatchProps = {
  findFlight: any;
};

export const FindFlightStateContext = createContext<FindFlightStateProps>({
  flight: null,
  isLoading: false,
  start: false,
});
export const FindFlightDispatchContext = createContext<FindFlightDispatchProps>({
  findFlight: () => {},
});

export const FindFlightProvider = ({ children }: PropsWithChildren) => {
  const [flight, setFlight] = useState<any>(null);
  const [start, setStart] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  useEffect(() => {
    if (selectedTravelInfo) {
      setFlight(null);
      setStart(false);
      setIsLoading(false);
    }
  }, [selectedTravelInfo]);

  const findFlight = (travelInfo: TravelInfo) => {
    setIsLoading(true);
    setStart(true);
    setTimeout(() => {
      const flight = {
        origin: travelInfo.origin,
        destination: travelInfo.destination,
        schedule: travelInfo.schedule,
      };
      // TODO: 여행 정보와 엮어야함...!
      console.log("항공편 정보를 찾았습니다.", flight);
      setFlight(flight);
      setIsLoading(false);
    }, 10000);
  };

  return (
    <FindFlightStateContext.Provider value={{ flight, isLoading, start }}>
      <FindFlightDispatchContext.Provider value={{ findFlight }}>
        {children}
      </FindFlightDispatchContext.Provider>
    </FindFlightStateContext.Provider>
  );
};
