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
    const botMessage = createChatBotMessage(message);

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
