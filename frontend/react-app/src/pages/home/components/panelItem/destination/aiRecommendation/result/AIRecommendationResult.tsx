import CityCuration from "@/pages/home/components/panelItem/destination/aiRecommendation/result/CityCuration";
import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import useNotification from "@/pages/home/hooks/notification/useNotification";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import { useState } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToResultPage: () => void;
  recommendationCities: DestinationEntity[];
};

export default function AIRecommendationResult({
  moveToAIRecommendationInitStep,
  moveToResultPage,
  recommendationCities,
}: Props) {
  const isRecommendationResultEmpty = recommendationCities.length === 0;
  const [selectedCity, setSelectedCity] = useState<DestinationEntity | null>(null);
  const changeSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  const { contextHolder, openNotificationWithIcon } = useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openErrorNotification = openNotificationWithIcon("error");

  const selectCity = (city: DestinationEntity) => {
    setSelectedCity(city);
  };

  const clickNextHandler = () => {
    if (selectedCity) {
      changeSelectedTravelInfo((prev) => ({
        ...prev,
        destination: {
          city: selectedCity.city,
          airportCode: selectedCity.airport.code,
        },
      }));
      moveToResultPage();
    } else {
      openErrorNotification("도시 선택 오류", "도시를 선택해주세요.");
    }
  };

  return (
    <>
      {contextHolder}
      <div data-nonblur="true" className="w-full">
        <div data-nonblur="true" className="mb-6">
          <h2 data-nonblur="true" className="text-[22px] font-bold mb-4">
            추천 결과
          </h2>
          <p data-nonblur="true" className="text-[13px]">
            추천 결과를 확인하고, 원하는 도시를 선택해주세요.
          </p>
        </div>
        <section data-nonblur="true" className="flex flex-col items-center">
          {isRecommendationResultEmpty
            ? "추천 결과가 없습니다."
            : recommendationCities.map((city, index) => {
                return (
                  <CityCuration
                    key={city.city}
                    city={city}
                    sequence={index + 1}
                    selectCity={selectCity}
                    isSelected={city === selectedCity}
                  />
                );
              })}
        </section>

        <div data-nonblur="true" className="flex flex-col items-center"></div>

        <div className="mt-4" data-nonblur="true">
          <button
            data-nonblur="true"
            onClick={moveToAIRecommendationInitStep}
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
      </div>
    </>
  );
}
