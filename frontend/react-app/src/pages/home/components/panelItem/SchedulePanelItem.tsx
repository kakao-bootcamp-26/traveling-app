import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DatePicker, DatePickerProps, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";

type Props = {
  isOpen: boolean;
};
export function SchedulePanelItem({ isOpen }: Props) {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );
  // DatePicker를 열고 닫는 상태를 관리
  const [arrivalOpen, setArrivalOpen] = useState(false);
  const [departureOpen, setDepartureOpen] = useState(false);

  // Notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message: string) => {
    api["error"]({
      message: "입력 오류",
      description: message,
    });
  };

  useEffect(() => {
    if (!isOpen) {
      setArrivalOpen(false);
      setDepartureOpen(false);
    }
  }, [isOpen]);

  const onChange: (type: "arrival" | "departure") => DatePickerProps["onChange"] =
    (type) => (_, dateStr) => {
      // 유효성 검사
      const newDate = dayjs(dateStr as string);

      if (type === "arrival" && selectedTravelInfoAtom.schedule?.departure) {
        if (newDate.isAfter(selectedTravelInfoAtom.schedule.departure)) {
          openNotificationWithIcon("출발일은 도착일보다 빨라야합니다.");
          return;
        }
      }

      if (type === "departure" && selectedTravelInfoAtom.schedule?.arrival) {
        if (newDate.isBefore(selectedTravelInfoAtom.schedule.arrival)) {
          openNotificationWithIcon("도착일은 출발일보다 늦어야합니다.");
          return;
        }
      }

      changeSelectedTravelInfo((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [type]: newDate,
        },
      }));
      setArrivalOpen(false);
    };

  return (
    <section
      data-nonblur="true"
      style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".ant-picker") && !target.closest(".ant-picker-dropdown")) {
          setArrivalOpen(false);
          setDepartureOpen(false);
        }
      }}
    >
      {contextHolder}
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
          onChange={onChange("arrival")}
          style={{ width: "70%" }}
          open={arrivalOpen}
          onClick={() => setArrivalOpen(true)}
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
          onChange={onChange("departure")}
          defaultValue={selectedTravelInfoAtom.schedule?.departure}
          value={selectedTravelInfoAtom.schedule?.departure}
          style={{ width: "70%" }}
          open={departureOpen}
          onClick={() => setDepartureOpen(true)}
        />
      </div>
    </section>
  );
}
