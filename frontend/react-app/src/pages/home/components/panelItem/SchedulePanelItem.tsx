import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DatePicker, DatePickerProps, Typography } from "antd";
import React from "react";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";

export function SchedulePanelItem() {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  const onChange: (type: "arrival" | "departure") => DatePickerProps["onChange"] =
    (type) => (_, dateStr) => {
      // 유효성 검사
      const newDate = dayjs(dateStr as string);

      if (type === "arrival" && selectedTravelInfoAtom.schedule?.departure) {
        if (newDate.isAfter(selectedTravelInfoAtom.schedule.departure)) {
          console.log("arrival date is after departure date");
          return;
        }
      }

      if (type === "departure" && selectedTravelInfoAtom.schedule?.arrival) {
        if (newDate.isBefore(selectedTravelInfoAtom.schedule.arrival)) {
          console.log("departure date is before arrival date");
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
    };
  return (
    <section
      data-nonblur="true"
      style={{ display: "flex", flexDirection: "column", rowGap: "20px" }}
    >
      <div>
        <Typography.Title level={4} style={{ color: "white" }}>
          여행 시작일
        </Typography.Title>
        <DatePicker
          defaultValue={selectedTravelInfoAtom.schedule?.arrival}
          value={selectedTravelInfoAtom.schedule?.arrival}
          showTime
          onChange={onChange("arrival")}
          style={{ width: "70%" }}
        />
      </div>
      <div>
        <Typography.Title level={4} style={{ color: "white" }}>
          여행 종료일
        </Typography.Title>
        <DatePicker
          showTime
          onChange={onChange("departure")}
          defaultValue={selectedTravelInfoAtom.schedule?.departure}
          value={selectedTravelInfoAtom.schedule?.departure}
          style={{ width: "70%" }}
        />
      </div>
    </section>
  );
}
