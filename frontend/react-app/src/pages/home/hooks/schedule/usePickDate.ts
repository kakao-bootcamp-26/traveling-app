import useNotification from "@/pages/home/hooks/notification/useNotification";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DatePickerProps } from "antd";

import dayjs from "dayjs";
import { useRecoilState } from "recoil";

export default function usePickDate() {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  const { contextHolder, openNotificationWithIcon } = useNotification();

  const openErrorNotification = openNotificationWithIcon("error");

  const checkValidation = (type: "arrival" | "departure", selectedDate: dayjs.Dayjs) => {
    if (type === "arrival" && selectedTravelInfoAtom.schedule?.departure) {
      if (selectedDate.isAfter(selectedTravelInfoAtom.schedule.departure)) {
        openErrorNotification("날짜 입력 오류", "출발일은 도착일보다 빨라야합니다.");
        return false;
      }
    }

    if (type === "arrival" && selectedDate.isBefore(dayjs())) {
      openErrorNotification("날짜 입력 오류", "현재보다 이전 시간은 선택할 수 없습니다.");
      return false;
    }

    if (type === "departure" && selectedTravelInfoAtom.schedule?.arrival) {
      if (selectedDate.isBefore(selectedTravelInfoAtom.schedule.arrival)) {
        openErrorNotification("날짜 입력 오류", "도착일은 출발일보다 늦어야합니다.");
        return false;
      }
    }

    if (type === "departure" && selectedDate.isBefore(dayjs())) {
      openErrorNotification("날짜 입력 오류", "현재보다 이전 시간은 선택할 수 없습니다.");
      return false;
    }

    return true;
  };

  const pickDate: (
    type: "arrival" | "departure",
    onSuccess?: () => void,
  ) => DatePickerProps["onChange"] = (type, onSuccess) => (_, dateStr) => {
    // 유효성 검사
    const newDate = dayjs(dateStr as string);

    if (!checkValidation(type, newDate)) {
      return;
    }

    changeSelectedTravelInfo((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [type]: newDate,
      },
    }));
    onSuccess?.();
  };

  return { contextHolder, pickDate };
}
