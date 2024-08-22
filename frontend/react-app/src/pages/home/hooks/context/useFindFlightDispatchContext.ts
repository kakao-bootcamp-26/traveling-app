import { useContext } from "react";
import { FindFlightDispatchContext } from "@/pages/home/components/provider/FindFlightContext";

export const useFindFlightDispatchContext = () => {
  const context = useContext(FindFlightDispatchContext);
  if (context === undefined) {
    throw new Error("useFindFlightDispatch must be used within a FindFlightProvider");
  }
  return context;
};
