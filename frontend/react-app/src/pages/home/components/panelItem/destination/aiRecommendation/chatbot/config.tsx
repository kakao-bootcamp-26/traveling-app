import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import ChatBot from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import { createChatBotMessage } from "react-chatbot-kit";

const config: ChatBotProps["config"] = {
  initialMessages: [
    createChatBotMessage(
      `안녕하세요. 여행 추천 플랫폼 GO And Travel 입니다. 어떤 느낌의 도시를 방문하시고 싶으신가요?`,
      {},
    ),
  ],
  customComponents: {
    header: () => <ChatBot.Header />,
  },
  customStyles: {},
};

export default config;
