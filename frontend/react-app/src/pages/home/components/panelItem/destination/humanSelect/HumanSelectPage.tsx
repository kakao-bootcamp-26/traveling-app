import { internationalAirportsWithCity } from "@/constants";
import CitySelect from "@/pages/home/components/panelItem/destination/humanSelect/CitySelect";
import CountrySelect from "@/pages/home/components/panelItem/destination/humanSelect/CountrySelect";
import { cityMap } from "@/pages/home/constants/countries";
import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useFunnel } from "@/shared/hooks/useFunnel";
import { notification } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";

type Props = {
  name: FunnelSteps;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

type HumanSelectFunnels = "COUNTRY" | "CITY";

export default function HumanSelectPage({ moveToInitialPage, moveToResultPage }: Props) {
  const [selectedTravelInfo, changeSelectedTravelInfo] = useRecoilState(selectedTravelInfoSelector);
  const { Funnel, setStep, step } = useFunnel<HumanSelectFunnels>("COUNTRY");
  const [myCountries, setMyCountries] = useState<string[]>([]);
  const [myCity, setMyCity] = useState<string | null>(null);

  const [api, contextHolder] = notification.useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openInfoNotification = (title: string, message: string) => {
    api["info"]({
      message: title,
      description: message,
    });
  };

  useEffect(() => {
    // Reset funnel when travel info is changed
    setStep("COUNTRY");
  }, [selectedTravelInfo]);

  const clickPrev = () => {
    if (step === "COUNTRY") {
      moveToInitialPage();
    } else if (step === "CITY") {
      setStep("COUNTRY");
    }
  };

  const clickNext = () => {
    if (step === "COUNTRY") {
      if (myCountries.length === 0) {
        openInfoNotification("국가를 선택해주세요.", "국가를 1개 이상 선택해주세요.");
        return;
      }
      setStep("CITY");
      return;
    }
    if (step === "CITY") {
      if (!myCity) {
        openInfoNotification("도시를 선택해주세요.", "도시를 1개만 선택해주세요.");
        return;
      }
      const airportCode =
        internationalAirportsWithCity[myCity as keyof typeof internationalAirportsWithCity].code;
      changeSelectedTravelInfo({
        ...selectedTravelInfo,
        destination: { airportCode, city: myCity },
      });
      moveToResultPage();
    }
  };

  const myCountry = useMemo(() => {
    return myCountries.find((country) => cityMap[country].includes(myCity || "")) || "";
  }, [myCity]);

  return (
    <>
      {contextHolder}
      <article className="flex flex-col items-center" data-nonblur="true">
        <div className="flex flex-col items-center mt-4 mb-6" data-nonblur="true">
          <h5 className="text-[20px] mb-2" data-nonblur="true">
            가고 싶으신 여행지가 있으신가요?
          </h5>
        </div>
        <div className="w-full px-3" data-nonblur="true">
          <Funnel>
            <CountrySelect
              name="COUNTRY"
              setMyCountries={setMyCountries}
              myCountries={myCountries}
              openInfoNotification={openInfoNotification}
            />
            <CitySelect
              name="CITY"
              myCountries={myCountries}
              openInfoNotification={openInfoNotification}
              myCity={myCity}
              setMyCity={setMyCity}
              myCountry={myCountry}
            />
          </Funnel>
        </div>
        <div className="h-[25vh] overflow-scroll" data-nonblur="true"></div>
        <div data-nonblur="true">
          <button
            data-nonblur="true"
            onClick={clickPrev}
            className="w-[120px] py-2 border-2 rounded-lg mr-10"
          >
            이전
          </button>
          <button
            data-nonblur="true"
            onClick={clickNext}
            className="w-[120px] py-2 border-2 rounded-lg"
          >
            다음
          </button>
        </div>
      </article>
    </>
  );
}
