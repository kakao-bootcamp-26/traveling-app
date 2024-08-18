import React from "react";
import type { PropsWithChildren } from "react";
import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBotPage";
import { DestinationEntity } from "@/shared/entities/destination.entity";

type Props = {
  setState: any;
  createChatBotMessage: any;
};
type NavigateProps = {
  moveToAIResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};

const ActionProvider: ChatBotProps["actionProvider"] =
  ({ moveToAIResultStep, saveAIRecommendationDestinations }: NavigateProps) =>
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
        moveToAIResultStep();
      };

      const goToPrevStep = () => {
        console.log("goToPrevStep");
        const feedbackMessage = createChatBotMessage("피드백이 완료되었습니다.");
        setState((prev: any) => ({
          ...prev,
          messages: [...prev.messages, feedbackMessage],
        }));
      };

      const botMessage = createChatBotMessage(
        <>
          <p className="mb-2">후보를 추천해드리겠습니다.</p>
          {cityCuration.map((city, idx) => (
            <div className="mb-3" key={city.city}>
              <p className="mb-1">{idx + 1}번째 추천</p>
              <div className="grid grid-cols-[1fr_2fr]">
                <p>국가</p>
                <p>{city.country}</p>
                <p>도시</p>
                <p>{city.city}</p>
                <p>공항</p>
                <p>
                  {city.airport.name} ({city.airport.code})
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
              style={{ border: "1px solid #ffffff" }}
              onClick={goToNextStep}
            >
              예
            </button>
            <button
              className="w-[70px] rounded-md px-2 py-1"
              style={{ border: "1px solid #ffffff" }}
              onClick={goToPrevStep}
            >
              아니요
            </button>
          </div>
          <p>다른 도시를 추천받고 싶으시다면 채팅을 계속 해주세요.</p>
        </>,
      );

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
