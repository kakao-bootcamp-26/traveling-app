import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import React, { PropsWithChildren } from "react";
import { useSetRecoilState } from "recoil";

type Props = {
  setState: any;
  createChatBotMessage: any;
};
type NavigateProps = {
  moveToResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};
const ActionProvider: ChatBotProps["actionProvider"] =
  ({ moveToResultStep, saveAIRecommendationDestinations }: NavigateProps) =>
  ({ createChatBotMessage, setState, children }: PropsWithChildren<Props>) => {
    const handleMessage = (message: string) => {
      const messageLower = message.toLowerCase();

      const cityCuration = [
        {
          country: "일본",
          city: "도쿄",
          airport: { name: "나리타 국제공항", code: "NRT" },
        },
        {
          country: "이탈리아",
          city: "로마",
          airport: { name: "파우미치노 국제공항", code: "FCO" },
        },
      ];

      const goToNextStep = () => {
        console.log("goToNextStep");
        saveAIRecommendationDestinations(cityCuration);
        moveToResultStep();
      };

      const botMessage = createChatBotMessage([
        <>
          <p className="mb-2">후보를 추천해드리겠습니다.</p>
          {cityCuration.map((city, idx) => (
            <div className="mb-2" key={city.city}>
              <p>{idx + 1}번째 추천</p>
              <p>{city.country}</p>
              <p>{city.city}</p>
              <p>{city.airport.name}</p>
              <p>{city.airport.code}</p>
            </div>
          ))}
          <div className="mb-2">
            <p>AI의 추천이 만족스러우셨나요?</p>
          </div>
          <div className="mb-2">
            <button onClick={goToNextStep}>예</button>
            <button>아니요</button>
          </div>
          <p>만약 다른 도시를 추천받고 싶으시다면 채팅을 계속 해주세요.</p>
        </>,
      ]);

      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    };
    return (
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement<any>(child, {
              actions: {
                handleMessage,
              },
            });
          }
        })}
      </div>
    );
  };

export default ActionProvider;
