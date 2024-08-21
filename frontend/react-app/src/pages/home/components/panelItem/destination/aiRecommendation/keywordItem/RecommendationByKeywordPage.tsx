import KeywordItem from "@/pages/home/components/panelItem/destination/aiRecommendation/keywordItem/KeywordItem";
import { keywords } from "@/pages/home/constants/keywords";
import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import useSelectKeyword from "@/pages/home/hooks/destination/useSelectKeyword";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import { Spin } from "antd";
import { useState } from "react";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToAIRecommendationResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};

export function RecommendationByKeyword({
  moveToAIRecommendationInitStep,
  moveToAIRecommendationResultStep,
  saveAIRecommendationDestinations,
}: Props) {
  const { contextHolder, toggleSelection, openMoreThanOneNotification, selectedKeywords } =
    useSelectKeyword();
  const [AIResultLoadStatus, setAIResultLoadStatus] = useState<
    "start" | "loading" | "loaded" | "error"
  >("start");

  const moveToNextStep = () => {
    setAIResultLoadStatus("loading");
    if (selectedKeywords.length === 0) {
      openMoreThanOneNotification();
      setAIResultLoadStatus("start");
      return;
    } else {
      // TODO: Call API to get AI recommendation And Save It...!
      // 현재는 임시로 2초 후에 결과를 저장하고, 결과 페이지로 이동하도록 설정
      setTimeout(() => {
        saveAIRecommendationDestinations([
          {
            country: "일본",
            city: "도쿄",
            airport: { name: "나리타 국제공항", airportCode: "NRT", cityCode: "TYO" },
          },
          {
            country: "이탈리아",
            city: "로마",
            airport: { name: "파우미치노 국제공항", airportCode: "FCO", cityCode: "ROM" },
          },
        ]);
        moveToAIRecommendationResultStep();
        setAIResultLoadStatus("loaded");
      }, 2000);
    }
  };

  return (
    <>
      {contextHolder}
      <Spin spinning={AIResultLoadStatus === "loading"}>
        <article className="flex flex-col items-center" data-nonblur="true">
          <div className="flex flex-col items-center mt-4 mb-6" data-nonblur="true">
            <h5 className="text-[20px] mb-2" data-nonblur="true">
              키워드를 선택해주세요
            </h5>
            <p className="text-md" data-nonblur="true">
              키워드는 최대 3개까지 선택 가능합니다
            </p>
          </div>
          <div
            className="grid grid-cols-3 gap-x-4 gap-y-2 h-[25vh] overflow-scroll"
            data-nonblur="true"
          >
            {keywords.map((item) => (
              <KeywordItem
                key={item.keyword}
                item={item}
                isSelected={selectedKeywords.includes(item.keyword)}
                toggleSelection={toggleSelection}
              />
            ))}
          </div>
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
              onClick={moveToNextStep}
              className="w-[120px] py-2 border-2 rounded-lg"
            >
              다음
            </button>
          </div>
        </article>
      </Spin>
    </>
  );
}
