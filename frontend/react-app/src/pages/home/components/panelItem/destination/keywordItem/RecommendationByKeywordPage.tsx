import KeywordItem from "@/pages/home/components/panelItem/destination/keywordItem/KeywordItem";
import { keywords } from "@/pages/home/constants/keywords";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

type Props = {
  name: string;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

export function RecommendationByKeyword({ moveToInitialPage, moveToResultPage }: Props) {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  const [api, contextHolder] = notification.useNotification({
    maxCount: 2,
    showProgress: true,
  });

  const openInfoNotification = (message: string) => {
    api["info"]({
      message: "최대 선택 개수 초과",
      description: message,
    });
  };

  const openMoreThanOneNotification = (message: string) => {
    api["info"]({
      message: "키워드를 선택해주세요.",
      description: message,
    });
  };

  useEffect(() => {
    // Reset selected keywords when travel info is changed
    setSelectedKeywords([]);
  }, [selectedTravelInfo]);

  const moveToNextStep = () => {
    // TODO: 키워드가 1개 이상이어야 함
    if (selectedKeywords.length === 0) {
      openMoreThanOneNotification("키워드를 1개 이상 선택해주세요.");
      return;
    } else {
      moveToResultPage();
    }
  };

  return (
    <>
      {contextHolder}
      <article className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-4 mb-6">
          <h5 className="text-[20px] mb-2">키워드를 선택해주세요</h5>
          <p className="text-md">키워드는 최대 3개까지 선택 가능합니다</p>
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
              openInfoNotification={openInfoNotification}
              selectedItemsCount={selectedKeywords.length}
              setSelectedKeywords={setSelectedKeywords}
            />
          ))}
        </div>
        <div className="mt-4">
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
