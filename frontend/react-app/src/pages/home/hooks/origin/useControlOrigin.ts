import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useSetRecoilState } from "recoil";

export default function useControlOrigin() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  const updateOrigin = (airportCode: string) => {
    changeSelectedTravelInfo((prevState) => ({
      ...prevState,
      origin: airportCode,
    }));
  };

  return { updateOrigin };
}
