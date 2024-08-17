import { useState } from "react";

export default function useControlDatePicker() {
  // DatePicker를 열고 닫는 상태를 관리
  const [isArrivalDatePickerOpen, toggleArrivalDatePicker] = useState(false);
  const [isDepartureDatePickerOpen, toggleDepartureDatePicker] = useState(false);

  const closeAllDatePicker = () => {
    toggleArrivalDatePicker(false);
    toggleDepartureDatePicker(false);
  };

  const openDatePicker = (type: "arrival" | "departure") => {
    if (type === "arrival") {
      toggleArrivalDatePicker(true);
      toggleDepartureDatePicker(false);
    } else if (type === "departure") {
      toggleArrivalDatePicker(false);
      toggleDepartureDatePicker(true);
    } else {
      throw new Error("Invalid type");
    }
  };

  return {
    isArrivalDatePickerOpen,
    isDepartureDatePickerOpen,
    openDatePicker,
    closeAllDatePicker,
  };
}
