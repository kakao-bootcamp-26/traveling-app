import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { DatePicker, Typography } from "antd";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import useControlDatePicker from "@/pages/home/hooks/schedule/useControlDatePicker";
import usePickDate from "@/pages/home/hooks/schedule/usePickDate";

type Props = {
  isOpen: boolean;
};

export function SchedulePanelItem({ isOpen }: Props) {
  const selectedTravelInfoAtom = useRecoilValue(selectedTravelInfoSelector);

  // DatePicker를 열고 닫는 상태를 관리
  const { isArrivalDatePickerOpen, isDepartureDatePickerOpen, openDatePicker, closeAllDatePicker } =
    useControlDatePicker();

  // 날짜 선택 함수
  const { pickDate: pickDateHandler, contextHolder } = usePickDate();

  const panelClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".ant-picker") && !target.closest(".ant-picker-dropdown")) {
      closeAllDatePicker();
    }
  };

  useEffect(
    // Panel이 닫힐 때 DatePicker를 닫는다.
    function closeDatePickerWhenPanelClosed() {
      if (!isOpen) {
        closeAllDatePicker();
      }
    },
    [isOpen],
  );

  return (
    <>
      {contextHolder}
      <section
        data-nonblur="true"
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
          height: "calc(100vh - 107px)",
        }}
        onClick={panelClickHandler}
      >
        <div data-nonblur="true">
          <Typography.Title level={4} style={{ color: "white" }} data-nonblur="true">
            여행 시작일
          </Typography.Title>
          <DatePicker
            defaultValue={selectedTravelInfoAtom.schedule?.arrival}
            value={selectedTravelInfoAtom.schedule?.arrival}
            showTime
            format={"YYYY-MM-DD HH:mm"}
            minuteStep={15}
            // onChange={pickDateHandler("arrival")}
            onChange={pickDateHandler("arrival", closeAllDatePicker)}
            style={{ width: "70%", padding: "8px 16px" }}
            open={isArrivalDatePickerOpen}
            onClick={() => openDatePicker("arrival")}
          />
        </div>
        <div data-nonblur="true">
          <Typography.Title level={4} style={{ color: "white" }} data-nonblur="true">
            여행 종료일
          </Typography.Title>
          <DatePicker
            showTime
            format={"YYYY-MM-DD HH:mm"}
            minuteStep={15}
            onChange={pickDateHandler("departure", closeAllDatePicker)}
            defaultValue={selectedTravelInfoAtom.schedule?.departure}
            value={selectedTravelInfoAtom.schedule?.departure}
            style={{ width: "70%", padding: "8px 16px" }}
            open={isDepartureDatePickerOpen}
            onClick={() => openDatePicker("departure")}
          />
        </div>
      </section>
    </>
  );
}
