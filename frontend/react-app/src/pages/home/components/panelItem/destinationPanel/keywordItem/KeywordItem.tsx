import type { Keyword } from "@/pages/home/constants/keywords";
import React from "react";

type Props = {
  item: Keyword;
  isSelected: boolean;
  selectedItemsCount: number;
  setSelectedKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  openInfoNotification: (message: string) => void;
};

const MAX_KEYWORD_COUNT = 3;
export default function KeywordItem({
  item,
  isSelected,
  setSelectedKeywords,
  selectedItemsCount,
  openInfoNotification,
}: Props) {
  return (
    <div
      key={item.keyword}
      className="rounded-md flex items-baseline font-pretendard gap-x-[6px] py-1 px-[6px] cursor-pointer"
      style={{
        border: "2px solid ",
        borderColor: isSelected ? "#FFD700" : "#E5E7EB",
        transition: "border-color 0.2s",
        position: "relative",
      }}
      data-nonblur="true"
      onClick={() => {
        if (isSelected) {
          setSelectedKeywords((prev) => prev.filter((keyword) => keyword !== item.keyword));
        } else if (selectedItemsCount === MAX_KEYWORD_COUNT) {
          openInfoNotification("키워드는 최대 3가지만 선택할 수 있습니다.");
          return;
        } else {
          setSelectedKeywords((prev) => [...prev, item.keyword]);
        }
      }}
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
      <span data-nonblur="true" className="text-lg ">
        {item.icon}
      </span>
      <span data-nonblur="true" className="flex-1 text-xs font-semibold font-pretendard">
        {item.keyword}
      </span>
    </div>
  );
}
