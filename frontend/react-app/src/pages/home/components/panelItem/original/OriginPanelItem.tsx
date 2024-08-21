import useControlOrigin from "@/pages/home/hooks/origin/useControlOrigin";

const airportList = [
  {
    name: "서울/인천",
    airportCode: "ICN",
    cityCode: "SEL",
  },
  {
    name: "서울/김포",
    airportCode: "GMP",
    cityCode: "SEL",
  },
  {
    name: "부산/김해",
    airportCode: "PUS",
    cityCode: "PUS",
  },
  {
    name: "대구",
    airportCode: "TAE",
    cityCode: "TAE",
  },
];

export function OriginPanelItem() {
  const { updateOrigin } = useControlOrigin();

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
              data-airport={airport.airportCode}
              onClick={() =>
                updateOrigin({
                  airportCode: airport.airportCode,
                  city: airport.name,
                  cityCode: airport.cityCode,
                })
              }
              key={airport.airportCode}
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                cursor: "pointer",
              }}
              className="hover:text-gray-400"
            >
              <span style={{ flex: "1" }}>{airport.name}</span>
              <span>{airport.airportCode}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
