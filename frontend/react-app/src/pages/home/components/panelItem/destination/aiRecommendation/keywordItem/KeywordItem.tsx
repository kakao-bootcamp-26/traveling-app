import type { Keyword } from "@/pages/home/constants/keywords";
import React from "react";

type Props = {
  item: Keyword;
  isSelected: boolean;
  toggleSelection: (item: string) => void;
};

export default function KeywordItem({ item, isSelected, toggleSelection }: Props) {
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
        toggleSelection(item.keyword);
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
