import { internationalAirportsWithCity } from "@/constants";
import { cityMap } from "@/pages/home/constants/countries";

type Props = {
  name: string;
  myCountries: string[];
  openInfoNotification: (title: string, message: string) => void;
  myCity: string | null;
  myCountry: string;
  setMyCity: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function CitySelect({ myCountries, myCity, setMyCity, myCountry }: Props) {
  const clickCityHandler = (country: string, city: string) => () => {
    if (myCity === city) {
      setMyCity(null);
      return;
    }
    setMyCity(city);
  };

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
      <div data-nonblur="true" className="flex flex-col gap-y-4">
        {myCountries.map((country) => {
          const cities = cityMap[country];
          return (
            <div data-nonblur="true" key={cities.toString()}>
              <h6 data-nonblur="true" className="text-[18px] font-pretendard mb-2">
                {country}
              </h6>
              <div data-nonblur="true" className="grid grid-cols-3 ml-6 gap-x-5 gap-y-3">
                {cities.map((city) => {
                  const isSelected = myCity === city;
                  return (
                    <div
                      key={city}
                      data-nonblur="true"
                      className="px-2 py-1 rounded-md "
                      style={{
                        border: "2px solid",
                        borderColor: isSelected ? "#FFD700" : "#E5E7EB",
                      }}
                      onClick={clickCityHandler(country, city)}
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
      <div data-nonblur="true" className="mt-10">
        <h5 className="text-[18px]">최종 선택</h5>
        <div>
          <p>국가</p>
          <p>{myCountry}</p>
        </div>
      </div>
      <div>
        <p>도시</p>
        <p>{myCity}</p>
        <p>인근 공항</p>
        <p>
          {myCity &&
            internationalAirportsWithCity[myCity as keyof typeof internationalAirportsWithCity]
              .name}
        </p>
      </div>
    </section>
  );
}
