import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";

export function OriginPanelItem() {
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);
  const handleSelect = (e: MouseEvent) => {
    const airport =
      (e.target as HTMLElement).dataset.airport ||
      (e.target as HTMLElement).parentElement?.dataset.airport;

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
          <li
            data-nonblur="true"
            data-airport="ICN"
            onClick={handleSelect}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <span style={{ flex: "1" }}>서울/인천</span>
            <span>ICN</span>
          </li>
          <li
            data-nonblur="true"
            data-airport="GMP"
            onClick={handleSelect}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <span style={{ flex: "1" }}>서울/김포</span>
            <span>GMP</span>
          </li>
          <li
            data-nonblur="true"
            data-airport="PUS"
            onClick={handleSelect}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <span style={{ flex: "1" }}>부산/김해</span>
            <span>PUS</span>
          </li>
          <li
            data-nonblur="true"
            data-airport="TAE"
            onClick={handleSelect}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              cursor: "pointer",
            }}
          >
            <span style={{ flex: "1" }}>대구</span>
            <span>TAE</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
