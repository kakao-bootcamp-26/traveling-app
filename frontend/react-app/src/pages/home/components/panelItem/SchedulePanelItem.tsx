import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DatePicker, DatePickerProps } from "antd";
import React from "react";
import { useRecoilState } from "recoil";

export function SchedulePanelItem() {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  const onChange: DatePickerProps["onChange"] = (_, dateStr) => {
    console.log("onChange:", dateStr);
  };
  return (
    <section data-nonblur="true">
      <div>
        <DatePicker
          defaultValue={selectedTravelInfoAtom.schedule?.arrival}
          showTime
          onChange={onChange}
        />
      </div>
      <div>
        <DatePicker
          showTime
          onChange={onChange}
          defaultValue={selectedTravelInfoAtom.schedule?.departure}
        />
      </div>
    </section>
  );
}
