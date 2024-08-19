import useControlFlightClass from "@/pages/home/hooks/passenger/useControlFlightClass";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import React from "react";
import { useRecoilValue } from "recoil";

export default function SelectFlightClass() {
  const selectedTravelInfoAtom = useRecoilValue(selectedTravelInfoSelector);
  const currentFlightClass = selectedTravelInfoAtom.passenger.flightClass;
  const { updateFlightClass } = useControlFlightClass();

  return (
    <div
      style={{
        display: "flex",
        padding: "4px",
        marginTop: "10px",
        marginBottom: "40px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        borderRadius: "6px",
        fontSize: "16px",
      }}
      data-nonblur="true"
    >
      <button
        data-nonblur="true"
        style={{
          flex: "1",
          padding: "6px 0px",
          border: 0,
          backgroundColor: currentFlightClass === "Economy" ? "rgb(84, 128, 246)" : "transparent",
          borderRadius: "6px",
          color: "white",
          transition: "background-color 0.3s",
        }}
        onClick={() => updateFlightClass("Economy")}
      >
        이코노미
      </button>
      <button
        data-nonblur="true"
        style={{
          flex: "1",
          padding: "6px 0px",
          border: 0,
          backgroundColor: currentFlightClass === "Business" ? "rgb(84, 128, 246)" : "transparent",
          borderRadius: "6px",
          color: "white",
          transition: "background-color 0.3s",
        }}
        onClick={() => updateFlightClass("Business")}
      >
        비즈니스
      </button>
      <button
        data-nonblur="true"
        style={{
          flex: "1",
          padding: "6px 0px",
          border: 0,
          borderRadius: "6px",
          backgroundColor: currentFlightClass === "First" ? "rgb(84, 128, 246)" : "transparent",
          color: "white",
          transition: "background-color 0.3s",
        }}
        onClick={() => updateFlightClass("First")}
      >
        퍼스트
      </button>
    </div>
  );
}
