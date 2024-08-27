import { SelectAirlineStateContext } from "@/pages/home/components/provider/SelectAirlineContext";
import { useContext } from "react";

export const useSelectAirlineStateContext = () => {
  const context = useContext(SelectAirlineStateContext);
  if (context === undefined) {
    throw new Error("SelectAirlineStateContext must be used within a SelectAirlineProvider");
  }
  return context;
};
