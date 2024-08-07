import { useRecoilState } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import type { FlightClass, PassengerCount } from "@/shared/entities";

export function PassengerPanelItem() {
  const [selectedTravelInfoAtom, changeSelectedTravelInfo] = useRecoilState(
    selectedTravelInfoSelector,
  );

  const currentFlightClass = selectedTravelInfoAtom.passenger.flightClass;

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

  const updateFlightClass = (flightClass: FlightClass) => {
    changeSelectedTravelInfo((prevState) => {
      return {
        ...prevState,
        passenger: {
          ...prevState.passenger,
          flightClass,
        },
      };
    });
  };

  return (
    <section data-nonblur="true">
      <div
        style={{
          display: "flex",
          // columnGap: "12px",
          // width: "300px",
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
            backgroundColor:
              currentFlightClass === "Business" ? "rgb(84, 128, 246)" : "transparent",
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
