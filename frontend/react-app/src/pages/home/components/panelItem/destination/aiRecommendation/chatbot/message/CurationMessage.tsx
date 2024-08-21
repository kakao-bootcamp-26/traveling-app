import { DestinationEntity } from "@/shared/entities/destination.entity";
import React, { useState } from "react";

type Props = {
  result: DestinationEntity[];
  goToNextStep: () => void;
  goToPrevStep: () => void;
};

export default function CurationMessage({ result, goToNextStep, goToPrevStep }: Props) {
  const [activate, setActivate] = useState(true);

  const approveAIRecommendation = () => {
    setActivate(false);
    goToNextStep();
  };

  const disapproveAIRecommendation = () => {
    setActivate(false);
    goToPrevStep();
  };

  return (
    <>
      <p className="mb-2">후보를 추천해드리겠습니다.</p>
      {result.map((city, idx) => (
        <div className="mb-3" key={city.city}>
          <p className="mb-1">{idx + 1}번째 추천</p>
          <div className="grid grid-cols-[1fr_2fr]">
            <p>국가</p>
            <p>{city.country}</p>
            <p>도시</p>
            <p>{city.city}</p>
            <p>공항</p>
            <p>
              {city.airport.name} ({city.airport.cityCode})
            </p>
          </div>
        </div>
      ))}
      <hr className="mb-2" />
      <div className="mb-2">
        <p>AI의 추천이 만족스러우셨나요? </p>
        <p>만족스러우셨다면 "예" 버튼을 눌러주세요</p>
      </div>
      <div className="mb-2">
        <button
          className="w-[70px] rounded-md mr-2 px-2 py-1"
          style={{
            border: "1px solid",
            borderColor: activate ? "#ffffff" : "#999999",
            color: activate ? "#ffffff" : "#999999",
          }}
          onClick={approveAIRecommendation}
          disabled={!activate}
        >
          예
        </button>
        <button
          className="w-[70px] rounded-md px-2 py-1"
          style={{
            border: "1px solid",
            borderColor: activate ? "#ffffff" : "#999999",
            color: activate ? "#ffffff" : "#999999",
          }}
          onClick={disapproveAIRecommendation}
          disabled={!activate}
        >
          아니요
        </button>
      </div>
      <p>다른 도시를 추천받고 싶으시다면 채팅을 계속 해주세요.</p>
    </>
  );
}
