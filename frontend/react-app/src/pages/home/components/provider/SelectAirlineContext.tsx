import { selectedTravelInfoFlightSuggestionsAtom } from "@/shared/atom/flightAtom";
import { createContext, PropsWithChildren, useState } from "react";
import { useRecoilValue } from "recoil";
type SelectAirlineStateContextProps = {
  airlineList: [string, string][];
  selectedAirlineCodes: string[];
  isAllAirlineSelected: boolean;
};
type SelectAirlineDispatchContextProps = {
  toggleAirlineHandler: (airlineCode: string) => void;
};
export const SelectAirlineStateContext = createContext<SelectAirlineStateContextProps>({
  airlineList: [],
  selectedAirlineCodes: [],
  isAllAirlineSelected: false,
});
export const SelectAirlineDispatchContext = createContext<SelectAirlineDispatchContextProps>({
  toggleAirlineHandler: () => {},
});

export const SelectAirlineProvider = ({ children }: PropsWithChildren) => {
  const selectedFlightSuggestions = useRecoilValue(selectedTravelInfoFlightSuggestionsAtom);

  const airlineList = Object.entries(
    selectedFlightSuggestions?.flightCuration?.data?.airlines || {},
  );

  const [selectedAirlineCodes, setSelectedAirlineCodes] = useState<string[]>([]);

  const selectAirlineHandler = (airlineCode: string) => {
    setSelectedAirlineCodes([...selectedAirlineCodes, airlineCode]);
  };

  const unselectAirlineHandler = (airlineCode: string) => {
    setSelectedAirlineCodes(selectedAirlineCodes.filter((code) => code !== airlineCode));
  };

  const toggleAirlineHandler = (airlineCode: string) => {
    if (selectedAirlineCodes.includes(airlineCode)) {
      unselectAirlineHandler(airlineCode);
    } else {
      selectAirlineHandler(airlineCode);
    }
  };

  // 항공사 전체 선택 여부 (진짜 전체 선택했거나 아니면 아무것도 선택하지 않았거나)
  const isAllAirlineSelected =
    selectedAirlineCodes.length === airlineList.length ||
    (airlineList.length > 0 && selectedAirlineCodes.length === 0);

  return (
    <SelectAirlineStateContext.Provider
      value={{
        airlineList,
        selectedAirlineCodes,
        isAllAirlineSelected,
      }}
    >
      <SelectAirlineDispatchContext.Provider value={{ toggleAirlineHandler }}>
        {children}
      </SelectAirlineDispatchContext.Provider>
    </SelectAirlineStateContext.Provider>
  );
};
