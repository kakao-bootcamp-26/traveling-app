import CitySelect from "@/pages/home/components/panelItem/destination/humanSelect/CitySelect";
import CountrySelect from "@/pages/home/components/panelItem/destination/humanSelect/CountrySelect";
import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import useHumanSelectNotification from "@/pages/home/hooks/destination/useHumanSelectNotification";
import useHumanSelectFunnel from "@/pages/home/hooks/destination/useHumanSelectFunnel";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import useHumanSelectCountries from "@/pages/home/hooks/destination/useHumanSelectCountries";
import useHumanSelectCityAndCountry from "@/pages/home/hooks/destination/useHumanSelectCityAndCountry";

type Props = {
  name: FunnelSteps;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

export default function HumanSelectPage({ moveToInitialPage, moveToResultPage }: Props) {
  const [selectedTravelInfo, changeSelectedTravelInfo] = useRecoilState(selectedTravelInfoSelector);

  const { Funnel, currentStep, moveToCityFunnel, moveToCountryFunnel } = useHumanSelectFunnel();

  const {
    contextHolder,
    openSelectOneCityNotification,
    openSelectMoreThanOneCountryNotification,
    openSelectLessThanThreeCountryNotification,
  } = useHumanSelectNotification();

  const { selectedCountries, toggleSelection } = useHumanSelectCountries(
    openSelectLessThanThreeCountryNotification,
  );

  const { airport, selectedCountry, selectedCity, toggleCity } =
    useHumanSelectCityAndCountry(selectedCountries);

  // Reset funnel when travel info is changed
  useEffect(() => {
    moveToCountryFunnel();
  }, [selectedTravelInfo]);

  const clickPrevHandler = () => {
    if (currentStep === "COUNTRY") {
      moveToInitialPage();
    } else if (currentStep === "CITY") {
      moveToCountryFunnel();
    }
  };

  const clickNextHandler = () => {
    if (currentStep === "COUNTRY") {
      if (selectedCountries.length === 0) {
        openSelectMoreThanOneCountryNotification();
        return;
      }
      moveToCityFunnel();
      return;
    }
    if (currentStep === "CITY") {
      if (!selectedCity) {
        openSelectOneCityNotification();
        return;
      }

      changeSelectedTravelInfo({
        ...selectedTravelInfo,
        destination: {
          airportCode: airport.airportCode,
          city: selectedCity,
          cityCode: airport.cityCode,
        },
      });
      moveToResultPage();
    }
  };

  return (
    <>
      {contextHolder}
      <article className="flex flex-col items-center" data-nonblur="true">
        <div className="flex flex-col items-center mt-4 mb-6" data-nonblur="true">
          <h5 className="text-[20px] mb-2" data-nonblur="true">
            가고 싶으신 여행지가 있으신가요?
          </h5>
        </div>
        <div className="w-full px-3 mb-12" data-nonblur="true">
          <Funnel>
            <CountrySelect
              name="COUNTRY"
              toggleSelection={toggleSelection}
              selectedCountries={selectedCountries}
            />
            <CitySelect
              name="CITY"
              CityList={
                <CitySelect.List
                  selectedCountries={selectedCountries}
                  selectedCity={selectedCity}
                  toggleCity={toggleCity}
                />
              }
              Result={
                <CitySelect.Result
                  selectedCity={selectedCity}
                  airportName={airport?.name}
                  selectedCountry={selectedCountry}
                />
              }
            />
          </Funnel>
        </div>
        <div data-nonblur="true">
          <button
            data-nonblur="true"
            onClick={clickPrevHandler}
            className="w-[120px] py-2 border-2 rounded-lg mr-10"
          >
            이전
          </button>
          <button
            data-nonblur="true"
            onClick={clickNextHandler}
            className="w-[120px] py-2 border-2 rounded-lg"
          >
            다음
          </button>
        </div>
      </article>
    </>
  );
}
