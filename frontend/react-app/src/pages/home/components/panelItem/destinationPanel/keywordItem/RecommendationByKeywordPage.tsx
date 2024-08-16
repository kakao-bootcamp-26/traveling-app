import KeywordItem from "@/pages/home/components/panelItem/destinationPanel/keywordItem/KeywordItem";
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

  useEffect(() => {
    // Reset selected keywords when travel info is changed
    setSelectedKeywords([]);
  }, [selectedTravelInfo]);

  return (
    <>
      {contextHolder}
      <article>
        <h5 className="mb-4 text-[20px]">키워드를 선택해주세요</h5>
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
            onClick={moveToResultPage}
            className="w-[120px] py-2 border-2 rounded-lg"
          >
            다음
          </button>
        </div>
      </article>
    </>
  );
}
