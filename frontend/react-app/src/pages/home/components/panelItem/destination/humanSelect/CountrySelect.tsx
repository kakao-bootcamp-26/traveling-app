import { HumanSelectFunnels } from "@/pages/home/hooks/destination/useHumanSelectFunnel";
import { countries } from "../../../../constants/countries";

type Props = {
  name: HumanSelectFunnels;
  selectedCountries: string[];
  toggleSelection: (country: string) => void;
};

export default function CountrySelect({ toggleSelection, selectedCountries }: Props) {
  return (
    <section data-nonblur="true">
      <div data-nonblur="true" className="flex flex-col items-center mb-6">
        <h5 data-nonblur="true" className="text-[17px] mb-2">
          국가를 먼저 선택해주세요
        </h5>
        <p data-nonblur="true" className="text-[13px]">
          최대 3개까지 선택 가능합니다.
        </p>
      </div>
      <div
        data-nonblur="true"
        className="grid flex-1 w-full grid-cols-3 font-pretendard gap-x-4 gap-y-2"
      >
        {countries.map((country) => {
          const isSelected = selectedCountries.includes(country);
          return (
            <div
              data-nonblur="true"
              key={country}
              style={{
                border: "2px solid",
                borderColor: isSelected ? "#FFD700" : "#E5E7EB",
                transition: "all 0.5s",
                position: "relative",
              }}
              className="px-2 py-1 rounded-md"
              onClick={() => toggleSelection(country)}
            >
              {isSelected ? (
                <div
                  data-nonblur="true"
                  className="absolute top-[2px] right-[2px] flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-all"
                >
                  <span
                    data-nonblur="true"
                    className="text-[7px] font-bold text-white leading-none h-full flex items-center justify-center :"
                  >
                    X
                  </span>
                </div>
              ) : null}
              <span data-nonblur="true" className="font-pretendard text-[12px]">
                {country}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
