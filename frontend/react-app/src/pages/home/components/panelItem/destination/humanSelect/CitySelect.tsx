import { cityMap } from "@/pages/home/constants/countries";
import { HumanSelectFunnels } from "@/pages/home/hooks/destination/useHumanSelectFunnel";
import { ReactNode } from "react";

type Props = {
  name: HumanSelectFunnels;
  CityList: ReactNode;
  Result: ReactNode;
};

export default function CitySelect({ CityList, Result }: Props) {
  return (
    <section data-nonblur="true">
      <div data-nonblur="true" className="flex flex-col items-center mb-6">
        <h5 data-nonblur="true" className="text-[17px] mb-2">
          도시를 선택해주세요
        </h5>
        <p data-nonblur="true" className="text-[13px]">
          1 개만 선택 가능합니다.
        </p>
      </div>
      {CityList}
      {Result}
    </section>
  );
}

type CitySelectResultProps = {
  selectedCity: string | null;
  selectedCountry: string;
  airportName?: string;
};

const CitySelectResult = ({
  selectedCity,
  selectedCountry,
  airportName,
}: CitySelectResultProps) => {
  if (!selectedCity) return null;
  return (
    <section data-nonblur="true" className="mt-10">
      <h5 data-nonblur="true" className="text-[18px] mb-2">
        최종 선택
      </h5>
      <div data-nonblur="true" className="grid grid-cols-[1fr_2fr] ml-4 gap-y-2">
        <p data-nonblur="true">국가</p>
        <p data-nonblur="true">{selectedCountry || ""}</p>
        <p data-nonblur="true">도시</p>
        <p data-nonblur="true">{selectedCity || ""}</p>
        <p data-nonblur="true">인근 공항</p>
        <p data-nonblur="true">{airportName || ""}</p>
      </div>
    </section>
  );
};

type CitySelectListProps = {
  selectedCountries: string[];
  selectedCity: string | null;
  toggleCity: (city: string) => void;
};

const CitySelectList = ({ selectedCountries, selectedCity, toggleCity }: CitySelectListProps) => {
  return (
    <div data-nonblur="true" className="flex flex-col gap-y-4">
      {selectedCountries.map((country) => {
        const cities = cityMap[country];
        return (
          <div data-nonblur="true" key={cities.toString()}>
            <h6 data-nonblur="true" className="text-[18px] font-pretendard mb-2">
              {country}
            </h6>
            <div data-nonblur="true" className="grid grid-cols-3 ml-6 gap-x-5 gap-y-3">
              {cities.map((city) => {
                const isSelected = selectedCity === city;
                return (
                  <div
                    key={city}
                    data-nonblur="true"
                    className="px-2 py-1 rounded-md "
                    style={{
                      border: "2px solid",
                      borderColor: isSelected ? "#FFD700" : "#E5E7EB",
                    }}
                    onClick={() => toggleCity(city)}
                  >
                    <span data-nonblur="true" className="font-pretendard text-[10px]">
                      {city}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

CitySelect.Result = CitySelectResult;
CitySelect.List = CitySelectList;
