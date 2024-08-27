import { useRecoilState } from "recoil";
import { notification } from "antd";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { internationalAirports } from "@/constants";
import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import { InitTravelInfo } from "@/shared/entities";
import { useFindFlightDispatchContext } from "@/pages/home/hooks/context/useFindFlightDispatchContext";

type Props = {
  name: FunnelSteps;
  moveToInitialPage: () => void;
};

function checkCanSubmit(selectedTravelInfo: InitTravelInfo) {
  if (!selectedTravelInfo) return false;
  if (!selectedTravelInfo.origin) return false;
  if (!selectedTravelInfo.destination.airportCode) return false;
  if (!selectedTravelInfo.destination.city) return false;
  if (!selectedTravelInfo.schedule?.arrival) return false;
  if (!selectedTravelInfo.schedule?.departure) return false;
  return true;
}

export default function ResultPage({ moveToInitialPage }: Props) {
  const [selectedTravelInfo, changeSelectedTravelInfo] = useRecoilState(selectedTravelInfoSelector);
  const { findFlight } = useFindFlightDispatchContext();

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

  const canSubmit = checkCanSubmit(selectedTravelInfo);

  const submitMyTravelInfo = () => {
    if (!selectedTravelInfo.origin) {
      openErrorNotification("출발지를 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.arrival) {
      openErrorNotification("출발일을 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.departure) {
      openErrorNotification("도착일을 선택해주세요.");
      return;
    }
    if (!selectedTravelInfo.destination) {
      openErrorNotification("도착지를 선택해주세요.");
      return;
    }

    // 여기에 API 호출 로직을 작성해주세요. => 항공 티켓 추천 API 호출
    findFlight(selectedTravelInfo);
  };

  const clickInitializeButton = () => {
    moveToInitialPage();
    changeSelectedTravelInfo((prev) => ({
      ...prev,
      destination: {
        city: "",
        airportCode: "",
        cityCode: "",
      },
    }));
  };

  return (
    <>
      {contextHolder}
      <section data-nonblur="true" className="flex flex-col items-center">
        <div data-nonblur="true" className="flex flex-col items-center mt-4 mb-6">
          <h5 data-nonblur="true" className="text-[20px] mb-2">
            최종선택하신 도시는{" "}
          </h5>
          <h5 data-nonblur="true" className="text-[20px] mb-2">
            "{selectedTravelInfo.destination?.city}" 이며,{" "}
          </h5>
          <h5 data-nonblur="true" className="text-[20px] mb-2">
            인근 공항은
          </h5>
          <h5 data-nonblur="true" className="text-[20px] mb-2">
            "
            {
              internationalAirports[
                selectedTravelInfo.destination?.airportCode as keyof typeof internationalAirports
              ]
            }
            " 입니다.
          </h5>
        </div>
        <div data-nonblur="true" className="flex justify-center">
          <button
            data-nonblur="true"
            onClick={clickInitializeButton}
            className="w-[120px] py-2 border-2 rounded-lg mr-10 hover:shadow-lg"
          >
            처음으로
          </button>
          <button
            data-nonblur={canSubmit ? "false" : "true"}
            className="w-[120px] py-2 border-2 rounded-lg hover:shadow-lg"
            style={{
              borderColor: canSubmit ? "#ffffff" : "#999999",
              color: canSubmit ? "#ffffff" : "#999999",
            }}
            onClick={submitMyTravelInfo}
          >
            항공권 검색
          </button>
        </div>
      </section>
    </>
  );
}
