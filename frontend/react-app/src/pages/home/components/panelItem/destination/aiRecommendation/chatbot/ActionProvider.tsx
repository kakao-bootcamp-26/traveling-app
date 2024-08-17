import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import React, { PropsWithChildren } from "react";
import "react-chatbot-kit/build/main.css";

type Props = {
  setState: any;
  createChatBotMessage: any;
};

const ActionProvider: ChatBotProps["actionProvider"] = ({
  createChatBotMessage,
  setState,
  children,
}: PropsWithChildren<Props>) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

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
              handleHello,
            },
          });
        }
      })}
    </div>
  );
};

export default ActionProvider;
