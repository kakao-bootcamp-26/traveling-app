import { useEffect } from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { DatePicker, DatePickerProps, notification, Typography } from "antd";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import useControlDatePicker from "@/pages/home/hooks/schedule/useControlDatePicker";

type Props = {
  isOpen: boolean;
};

export function SchedulePanelItem({ isOpen }: Props) {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  // DatePicker를 열고 닫는 상태를 관리
  // const [arrivalOpen, setArrivalOpen] = useState(false);
  // const [departureOpen, setDepartureOpen] = useState(false);
  const { isArrivalDatePickerOpen, isDepartureDatePickerOpen, openDatePicker, closeAllDatePicker } =
    useControlDatePicker();

  // Notification
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message: string) => {
    api["error"]({
      message: "날짜 입력 오류",
      description: message,
    });
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

      if (type === "arrival" && newDate.isBefore(dayjs())) {
        openNotificationWithIcon("현재보다 이전 시간은 선택할 수 없습니다.");
        return;
      }

      if (type === "departure" && selectedTravelInfoAtom.schedule?.arrival) {
        if (newDate.isBefore(selectedTravelInfoAtom.schedule.arrival)) {
          openNotificationWithIcon("도착일은 출발일보다 늦어야합니다.");
          return;
        }
      }

      if (type === "departure" && newDate.isBefore(dayjs())) {
        openNotificationWithIcon("현재보다 이전 시간은 선택할 수 없습니다.");
        return;
      }

      changeSelectedTravelInfo((prev) => ({
        ...prev,
        schedule: {
          ...prev.schedule,
          [type]: newDate,
        },
      }));
      closeAllDatePicker();
    };

  const panelClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".ant-picker") && !target.closest(".ant-picker-dropdown")) {
      closeAllDatePicker();
    }
  };

  return (
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
          onChange={onChange("departure")}
          defaultValue={selectedTravelInfoAtom.schedule?.departure}
          value={selectedTravelInfoAtom.schedule?.departure}
          style={{ width: "70%", padding: "8px 16px" }}
          open={isDepartureDatePickerOpen}
          onClick={() => openDatePicker("departure")}
        />
      </div>
    </section>
  );
}
