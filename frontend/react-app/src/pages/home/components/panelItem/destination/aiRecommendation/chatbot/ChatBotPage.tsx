import { useCallback } from "react";
import Chatbot from "react-chatbot-kit";

import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import makeChatbotConfig from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/config";
import MessageParser from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/MessageParser";
import ActionProvider from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ActionProvider";

import "react-chatbot-kit/build/main.css";
import "./ChatBot.css";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToAIRecommendationResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};

export type ChatBotProps = Parameters<typeof Chatbot>[0];

export default function ChatBotPage({
  moveToAIRecommendationInitStep,
  moveToAIRecommendationResultStep,
  saveAIRecommendationDestinations,
}: Props) {
  const ChatbotHeader = useCallback(() => {
    return (
      <header
        className="relative z-10 flex justify-between w-full px-4 py-2 font-semibold text-black"
        style={{ borderBottom: "1px solid #999999" }}
      >
        <div>
          <button onClick={moveToAIRecommendationInitStep}>
            <span>뒤로</span>
          </button>
        </div>
        <div>GO And Travel 챗봇</div>
        <div></div>
      </header>
    );
  }, []);

  return (
    <div data-nonblur="true" className="mt-14">
      <div className="chatbot">
        <Chatbot
          config={makeChatbotConfig({
            header: <ChatbotHeader />,
          })}
          messageParser={MessageParser}
          actionProvider={ActionProvider({
            saveAIRecommendationDestinations,
            moveToResultStep: moveToAIRecommendationResultStep,
          })}
        />
      </div>
    </div>
  );
}
