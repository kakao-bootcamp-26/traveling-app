import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";

const airportList = [
  {
    name: "서울/인천",
    code: "ICN",
  },
  {
    name: "서울/김포",
    code: "GMP",
  },
  {
    name: "부산/김해",
    code: "PUS",
  },
  {
    name: "대구",
    code: "TAE",
  },
];

export function OriginPanelItem() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);
  const updateSelectedAirport = (e: MouseEvent) => {
    // 이 부분 로직을 좀 더 깊게 공부해보기
    const target = e.target as HTMLElement;
    const airport =
      target.dataset.airport || (target.closest("[data-airport]") as HTMLElement)?.dataset.airport;

    if (airport) {
      changeSelectedTravelInfo((prev) => ({ ...prev, origin: airport }));
    }
  };

  return (
    <div data-nonblur="true">
      <h4 data-nonblur="true" style={{ fontSize: "22px", marginBottom: "18px" }}>
        선택 가능한 공항
      </h4>
      <div style={{ width: "240px" }}>
        <ul
          data-nonblur="true"
          style={{
            fontSize: "16px",
            fontWeight: 300,
            display: "flex",
            flexDirection: "column",
            rowGap: "8px",
          }}
        >
          {airportList.map((airport) => (
            <li
              data-nonblur="true"
              data-airport={airport.code}
              onClick={updateSelectedAirport}
              key={airport.code}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                cursor: "pointer",
              }}
              className="hover:text-gray-400"
            >
              <span style={{ flex: "1" }}>{airport.name}</span>
              <span>{airport.code}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
