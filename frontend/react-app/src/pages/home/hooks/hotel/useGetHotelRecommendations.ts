import { fareType } from "@/pages/home/constants/fareType";
import { fetchHotelRecommendations } from "@/services/hotel";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { checkIsHotelCuration, HotelInfo } from "@/shared/entities/hotelCuration.entity";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type LoadStatus = "wait" | "loading" | "success" | "error";
export function useGetHotelRecommendations() {
  const [loadStatus, setLoadStatus] = useState<LoadStatus>("wait");
  const [hotelRecommendations, setHotelRecommendations] = useState<HotelInfo[]>([]);
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  useEffect(() => {
    async function getHotelRecommendations() {
      setLoadStatus("loading");
      try {
        // fetch hotel recommendations
        const response = await fetchHotelRecommendations({
          origin: selectedTravelInfo?.origin.cityCode || "",
          destination: selectedTravelInfo?.destination.cityCode || "",
          checkInDate: dayjs(selectedTravelInfo?.schedule?.departure).format("YYYY-MM-DD"),
          checkOutDate: dayjs(selectedTravelInfo?.schedule?.arrival).format("YYYY-MM-DD"),
          passengerInfo: {
            count: {
              adult: selectedTravelInfo?.passenger.count.adults || 0,
              child: selectedTravelInfo?.passenger.count.children || 0,
              infant: selectedTravelInfo?.passenger.count.infants || 0,
            },
            fareType: fareType[selectedTravelInfo?.passenger.flightClass],
          },
        });
        if (checkIsHotelCuration(response)) {
          setHotelRecommendations(response.data);
          setLoadStatus("success");
        } else {
          setLoadStatus("error");
        }
      } catch (error) {
        // handle error
        setLoadStatus("error");
      }
    }

    getHotelRecommendations();
  }, [selectedTravelInfo]);

  return {
    loadStatus,
    hotelRecommendations,
  };
}
