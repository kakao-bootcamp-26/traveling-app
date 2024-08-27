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
          <h5 className="mt-8 mb-5 text-[19px] font-bold font-pretendard">호텔 추천</h5>
          <div className="h-[55vh] overflow-y-scroll">
            {hotelRecommendations.length > 0 &&
              hotelRecommendations.map((hotel) => (
                <HotelCurationItem key={hotel.id} hotelInfo={hotel} />
              ))}
            {hotelRecommendations.length === 0 && (
              <div>
                <p className="mt-2">추천할 호텔이 존재하지 않습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
