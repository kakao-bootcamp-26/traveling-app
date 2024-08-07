import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { notification } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

export function DestinationPanelItem() {
  const [selectedTravelInfo, updateSelectedTravelInfo] = useRecoilState(selectedTravelInfoSelector);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message: string) => {
    api["error"]({
      message: "입력 오류",
      description: message,
    });
  };

  const submitMyTravelInfo = () => {
    if (!selectedTravelInfo.origin) {
      openNotificationWithIcon("출발지를 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.arrival) {
      openNotificationWithIcon("도착일을 선택해주세요.");
      return;
    }

    if (!selectedTravelInfo.schedule?.departure) {
      openNotificationWithIcon("출발일을 선택해주세요.");
      return;
    }
    if (!selectedTravelInfo.destination) {
      openNotificationWithIcon("도착지를 선택해주세요.");
      return;
    }

    // 여기에 API 호출 로직을 작성해주세요.
  };

  return (
    <>
      {contextHolder}
      <div
        data-nonblur="true"
        style={{
          height: "calc(100vh - 107px)",
          overflowY: "scroll",
        }}
        className="flex flex-col justify-between"
      >
        <div></div>
        <button data-nonblur="true" className="font-semibold text-xl" onClick={submitMyTravelInfo}>
          Done
        </button>
      </div>
    </>
  );
}
