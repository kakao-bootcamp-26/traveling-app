import { useFindFlightDispatchContext } from "@/pages/home/components/provider/useFindFlightDispatchContext";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { GrPowerReset } from "react-icons/gr";
import { useRecoilValue } from "recoil";

export default function NoFlightCuration() {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  const { findFlight } = useFindFlightDispatchContext();
  return (
    <div className="flex flex-col  min-h-[60vh] items-center justify-center">
      <h5 className="mb-5 text-3xl font-bold font-pretendard">검색된 항공편이 없습니다.</h5>
      <div className="flex flex-col items-center justify-center mb-5 gap-y-2">
        <p className="text-lg font-pretendard">선택하신 조건으로 검색된 항공편이 없습니다</p>
        <p className="text-lg font-pretendard">
          다른 조건으로 다시 검색하시거나, 다시 검색하기 버튼을 눌러주세요
        </p>
      </div>
      <div>
        <button
          onClick={() => findFlight(selectedTravelInfo)}
          className="flex items-center px-4 py-2 bg-white rounded-md gap-x-2 text-dark-blue "
        >
          <span className="text-lg font-bold font-pretendard">다시 검색하기</span>
          <span>
            <GrPowerReset size={30} fontWeight={700} />
          </span>
        </button>
      </div>
    </div>
  );
}
