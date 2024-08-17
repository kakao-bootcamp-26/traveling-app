import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "react-chatbot-kit/build/main.css";
import "./ChatBot.css";
import { DestinationEntity } from "@/shared/entities/destination.entity";

export type ChatBotProps = Parameters<typeof Chatbot>[0];
type Props = {
  moveToAIRecommendationResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};
export default function ChatBot({
  moveToAIRecommendationResultStep,
  saveAIRecommendationDestinations,
}: Props) {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider({
        saveAIRecommendationDestinations,
        moveToResultStep: moveToAIRecommendationResultStep,
      })}
    />
  );
}

ChatBot.Header = () => {
  return <header className="relative w-full"></header>;
};
