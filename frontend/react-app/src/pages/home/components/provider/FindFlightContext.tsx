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
  const [flight, setFlight] = useState();
  const findFlight = (flight: any) => {
    setFlight(flight);
  };
  return (
    <FindFlightStateContext.Provider value={{ flight }}>
      <FindFlightDispatchContext.Provider value={{ findFlight }}>
        {children}
      </FindFlightDispatchContext.Provider>
    </FindFlightStateContext.Provider>
  );
};
