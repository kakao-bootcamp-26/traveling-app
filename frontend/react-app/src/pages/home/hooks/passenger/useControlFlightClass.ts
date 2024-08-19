import { useSetRecoilState } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import type { FlightClass } from "@/shared/entities";

export default function useControlFlightClass() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  const updateFlightClass = (flightClass: FlightClass) => {
    changeSelectedTravelInfo((prevState) => {
      return {
        ...prevState,
        passenger: {
          ...prevState.passenger,
          flightClass,
        },
      };
    });
  };

  return { updateFlightClass };
}
