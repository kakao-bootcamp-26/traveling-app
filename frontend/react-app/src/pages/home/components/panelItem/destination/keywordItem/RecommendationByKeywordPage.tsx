import KeywordItem from "@/pages/home/components/panelItem/destination/keywordItem/KeywordItem";
import { keywords } from "@/pages/home/constants/keywords";
import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import useSelectKeyword from "@/pages/home/hooks/destination/useSelectKeyword";
import React from "react";

type Props = {
  name: FunnelSteps;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

export function RecommendationByKeyword({ moveToInitialPage, moveToResultPage }: Props) {
  const { contextHolder, toggleSelection, openMoreThanOneNotification, selectedKeywords } =
    useSelectKeyword();

  const moveToNextStep = () => {
    if (selectedKeywords.length === 0) {
      openMoreThanOneNotification();
      return;
    } else {
      moveToResultPage();
    }
  };

  return (
    <>
      {contextHolder}
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
            onClick={moveToInitialPage}
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
    </>
  );
}
