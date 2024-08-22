import { SelectAirlineDispatchContext } from "@/pages/home/components/provider/SelectAirlineContext";
import { useContext } from "react";

export const useSelectAirlineDispatchContext = () => {
  const context = useContext(SelectAirlineDispatchContext);
  if (context === undefined) {
    throw new Error("SelectAirlineDispatchContext must be used within a SelectAirlineProvider");
  }
  return context;
};
