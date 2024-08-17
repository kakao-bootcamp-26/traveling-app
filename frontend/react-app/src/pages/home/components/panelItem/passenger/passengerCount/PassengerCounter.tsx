import React from "react";
import type { PassengerCount } from "@/shared/entities";

type Props = {
  passengerType: keyof PassengerCount;
  minimumCondition: boolean;
  maximumCondition: boolean;
  decreaseHandler: () => void;
  increaseHandler: () => void;
  currentCount: number;
};

export default function PassengerCounter({
  minimumCondition,
  maximumCondition,
  decreaseHandler,
  increaseHandler,
  currentCount,
  passengerType,
}: Props) {
  return (
    <>
      <div data-nonblur="true">{passengerType.toUpperCase()}</div>
      <div data-nonblur="true" style={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
        <button
          data-nonblur="true"
          style={{
            fontSize: "20px",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            border: 0,
            backgroundColor: minimumCondition ? "rgba(0,0,0,0.1)" : "#5480f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={decreaseHandler}
        >
          −
        </button>
        <span data-nonblur="true" style={{ width: "16px", textAlign: "center" }}>
          {currentCount}
        </span>
        <button
          data-nonblur="true"
          style={{
            fontSize: "20px",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            border: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: maximumCondition ? "rgba(0,0,0,0.1)" : "#5480f6",
            transition: "background-color 0.3s",
          }}
          onClick={increaseHandler}
        >
          +
        </button>
      </div>
    </>
  );
}
