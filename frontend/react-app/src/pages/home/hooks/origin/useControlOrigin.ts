import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { AirportLocation } from "@/shared/entities";
import { useSetRecoilState } from "recoil";

export default function useControlOrigin() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  const updateOrigin = (originAirport: AirportLocation) => {
    changeSelectedTravelInfo((prevState) => ({
      ...prevState,
      origin: originAirport,
    }));
  };

  return { updateOrigin };
}
