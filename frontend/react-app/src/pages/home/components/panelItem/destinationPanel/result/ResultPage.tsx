import { useRecoilValue } from "recoil";
import { notification } from "antd";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";

type Props = {
  name: string;
  moveToInitialPage: () => void;
};

export default function ResultPage({ moveToInitialPage }: Props) {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  const [api, contextHolder] = notification.useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openErrorNotification = (message: string) => {
    api["error"]({
      message: "입력 오류",
      description: message,
    });
  };

  const submitMyTravelInfo = () => {
    if (!selectedTravelInfo.origin) {
      openErrorNotification("출발지를 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.arrival) {
      openErrorNotification("도착일을 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.departure) {
      openErrorNotification("출발일을 선택해주세요.");
      return;
    }
    if (!selectedTravelInfo.destination) {
      openErrorNotification("도착지를 선택해주세요.");
      return;
    }

    // 여기에 API 호출 로직을 작성해주세요. => 항공 티켓 추천 API 호출
  };

  return (
    <>
      {contextHolder}
      <div>
        최종 결과
        <div>
          <button
            data-nonblur="true"
            onClick={moveToInitialPage}
            className="w-[120px] py-2 border-2 rounded-lg mr-10"
          >
            처음으로 돌아가기
          </button>
          <button
            data-nonblur="true"
            className="text-xl font-semibold"
            onClick={submitMyTravelInfo}
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
