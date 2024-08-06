import { useRecoilState } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import type { PassengerCount } from "@/shared/entities";

export function PassengerPanelItem() {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  // 성인, 아동, 유아 승객 수를 업데이트하는 함수
  const updatePassengerCount = (type: keyof PassengerCount, operation: (cur: number) => number) => {
    changeSelectedTravelInfo((prevState) => {
      const count = prevState.passenger.count[type];

      const newCount = operation(count);

      if (count === newCount) return prevState;

      return {
        ...prevState,
        passenger: {
          ...prevState.passenger,
          count: {
            ...prevState.passenger.count,
            [type]: newCount,
          },
        },
      };
    });
  };

  return (
    <section>
      <div></div>
      <div
        data-nonblur="true"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          alignItems: "center",
          fontSize: "19px",
          rowGap: "24px",
        }}
      >
        <div data-nonblur="true">Adults</div>
        <div
          data-nonblur="true"
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
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
            }}
            onClick={() =>
              updatePassengerCount("adults", (cur: number) => (cur - 1 > 1 ? cur - 1 : 1))
            }
          >
            −
          </button>
          <span data-nonblur="true" style={{ width: "16px", textAlign: "center" }}>
            {selectedTravelInfoAtom.passenger?.count?.adults}
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
            }}
            onClick={() =>
              updatePassengerCount("adults", (cur: number) => (cur + 1 > 8 ? 8 : cur + 1))
            }
          >
            +
          </button>
        </div>
        <div data-nonblur="true">Children</div>
        <div
          data-nonblur="true"
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
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
            }}
            onClick={() =>
              updatePassengerCount("children", (cur: number) => (cur - 1 > 0 ? cur - 1 : 0))
            }
          >
            −
          </button>
          <span data-nonblur="true" style={{ width: "16px", textAlign: "center" }}>
            {selectedTravelInfoAtom.passenger?.count?.children}
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
            }}
            onClick={() =>
              updatePassengerCount("children", (cur: number) => (cur + 1 > 8 ? 8 : cur + 1))
            }
          >
            +
          </button>
        </div>
        <div data-nonblur="true">Infants</div>
        <div
          data-nonblur="true"
          style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
        >
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
            }}
            onClick={() =>
              updatePassengerCount("infants", (cur: number) => (cur - 1 > 0 ? cur - 1 : 0))
            }
          >
            −
          </button>
          <span data-nonblur="true" style={{ width: "16px", textAlign: "center" }}>
            {selectedTravelInfoAtom.passenger?.count?.infants}
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
            }}
            onClick={() =>
              updatePassengerCount("infants", (cur: number) => (cur + 1 > 8 ? 8 : cur + 1))
            }
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
}
