import { useSelectAirlineDispatchContext } from "@/pages/home/hooks/context/useSelectAirlineDispatchContext";
import { useSelectAirlineStateContext } from "@/pages/home/hooks/context/useSelectAirlineStateContext";

export default function SelectFlightOptions() {
  const { toggleAirlineHandler } = useSelectAirlineDispatchContext();
  const { isAllAirlineSelected, airlineList, selectedAirlineCodes } =
    useSelectAirlineStateContext();

  return (
    <div className="flex flex-col mb-6 gap-y-3">
      <p className="text-lg font-pretendard">항공사 선택</p>
      <div className="flex overflow-x-scroll gap-x-2 w-[90%] items-stretch">
        {airlineList.map(([airlineCode, airlineName]) => (
          <div key={airlineCode}>
            <button
              onClick={() => {
                toggleAirlineHandler(airlineCode);
              }}
              className="relative px-4 py-2 rounded-md"
              style={{
                color: "skyblue",
                minWidth: "100px",
                backgroundColor: "rgb(37, 40, 62)",
                fontSize: "12px",
                height: "100%",
                opacity:
                  isAllAirlineSelected || selectedAirlineCodes.includes(airlineCode) ? "1" : "0.4",
              }}
            >
              {selectedAirlineCodes.includes(airlineCode) && (
                <span className="absolute top-1 right-1">X</span>
              )}
              <div className="flex flex-col items-center">
                <span>{airlineCode}</span>
                <span className="text-[12px]">{airlineName}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
