import { useSelectAirlineDispatchContext } from "@/pages/home/hooks/context/useSelectAirlineDispatchContext";
import { useSelectAirlineStateContext } from "@/pages/home/hooks/context/useSelectAirlineStateContext";

export default function SelectFlightOptions() {
  const { toggleAirlineHandler } = useSelectAirlineDispatchContext();
  const { isAllAirlineSelected, airlineList, selectedAirlineCodes } =
    useSelectAirlineStateContext();

  return (
    <div className="flex flex-col mb-6 gap-y-3">
      <p className="text-lg font-pretendard">항공사 선택</p>
      <div className="flex gap-x-2">
        {airlineList.map(([airlineCode, airlineName]) => (
          <div key={airlineCode} className={`rounded-md bg-dark-blue2 text-white`}>
            <button
              onClick={() => {
                toggleAirlineHandler(airlineCode);
              }}
              className="px-4 py-2 rounded-md"
              style={{
                color: "skyblue",
                backgroundColor: "rgb(37, 40, 62)",
                opacity:
                  isAllAirlineSelected || selectedAirlineCodes.includes(airlineCode) ? "1" : "0.4",
              }}
            >
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
