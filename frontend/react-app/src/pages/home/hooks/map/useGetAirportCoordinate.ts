import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { getAirportCoordinates } from "@/shared/utils/geoCoding/getCoordinates";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type Coordinate = {
  lat: number;
  lon: number;
};
export default function useGetAirportCoordinate() {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  useEffect(() => {
    async function setAirportCoordinate() {
      if (selectedTravelInfo) {
        const { lat, lon } = await getAirportCoordinates(
          selectedTravelInfo.destination.airportCode,
        );
        setCoordinate({ lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    }
    setAirportCoordinate();
  }, [selectedTravelInfo]);

  return coordinate;
}
