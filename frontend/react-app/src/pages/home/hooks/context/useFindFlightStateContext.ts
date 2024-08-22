import { useContext } from "react";
import { FindFlightStateContext } from "@/pages/home/components/provider/FindFlightContext";

export const useFindFlightStateContext = () => {
  const context = useContext(FindFlightStateContext);
  if (context === undefined) {
    throw new Error("useFindFlightState must be used within a FindFlightProvider");
  }
  return context;
};
