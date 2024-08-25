import HotelCurationItem from "@/pages/home/components/flightSuggestions/curationList/success/HotelCurationItem";
import { useGetHotelRecommendations } from "@/pages/home/hooks/hotel/useGetHotelRecommendations";

export default function HotelCuration() {
  const { loadStatus, hotelRecommendations } = useGetHotelRecommendations();

  return (
    <div className="w-full">
      {loadStatus === "loading" || (loadStatus === "wait" && <div>loading...</div>)}
      {loadStatus === "error" && <div>error...</div>}
      {loadStatus === "success" && (
        <div>
          <h5 className="mb-8 text-[19px] font-bold font-pretendard">호텔 추천</h5>
          <div className="h-[55vh] overflow-y-scroll">
            {hotelRecommendations.map((hotel) => (
              <HotelCurationItem key={hotel.id} hotelInfo={hotel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
