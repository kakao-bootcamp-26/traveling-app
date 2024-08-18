import { TravelInfo } from "@/shared/entities";
import { createContext, PropsWithChildren, useState } from "react";

type FindFlightStateProps = {
  flight: any;
};

type FindFlightDispatchProps = {
  findFlight: any;
};

export const FindFlightStateContext = createContext<FindFlightStateProps>({
  flight: null,
});
export const FindFlightDispatchContext = createContext<FindFlightDispatchProps>({
  findFlight: () => {},
});

export const FindFlightProvider = ({ children }: PropsWithChildren) => {
  const [flight, setFlight] = useState<any>(null);

  const findFlight = (travelInfo: TravelInfo) => {
    setTimeout(() => {
      const flight = {
        origin: travelInfo.origin,
        destination: travelInfo.destination,
        schedule: travelInfo.schedule,
      };

      console.log("항공편 정보를 찾았습니다.", flight);
      setFlight(flight);
    }, 2000);
  };

  return (
    <FindFlightStateContext.Provider value={{ flight }}>
      <FindFlightDispatchContext.Provider value={{ findFlight }}>
        {children}
      </FindFlightDispatchContext.Provider>
    </FindFlightStateContext.Provider>
  );
};
