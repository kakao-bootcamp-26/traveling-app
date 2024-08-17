import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import React, { PropsWithChildren } from "react";

type Props = {
  setState: any;
  createChatBotMessage: any;
};

const ActionProvider: ChatBotProps["actionProvider"] = ({
  createChatBotMessage,
  setState,
  children,
}: PropsWithChildren<Props>) => {
  const handleMessage = (message: string) => {
    const messageLower = message.toLowerCase();
    console.log(createChatBotMessage);
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

    const botMessage = createChatBotMessage([
      <>
        <p className="mb-2">후보를 추천해드리겠습니다.</p>
        {cityCuration.map((city, idx) => (
          <div className="mb-2">
            <p>{idx + 1}번째 추천</p>
            <p>{city.country}</p>
            <p>{city.city}</p>
            <p>{city.airport.name}</p>
            <p>{city.airport.code}</p>
          </div>
        ))}
        <p className="mb-2">위의 도시들 중에서 어떤 도시로 여행을 가고 싶으신가요?</p>
        <div>
          {cityCuration.map((city, idx) => (
            <button>{idx + 1} 번째 추천</button>
          ))}
        </div>
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
