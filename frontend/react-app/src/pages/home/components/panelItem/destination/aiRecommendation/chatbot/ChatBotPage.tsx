import ChatBot from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBot";
import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import { DestinationEntity } from "@/shared/entities/destination.entity";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToAIRecommendationResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};

export default function ChatBotPage({
  moveToAIRecommendationInitStep,
  moveToAIRecommendationResultStep,
}: Props) {
  return (
    <div data-nonblur="true">
      <div className="chatbot">
        <ChatBot />
      </div>
      <div className="mt-4" data-nonblur="true">
        <button
          data-nonblur="true"
          onClick={moveToAIRecommendationInitStep}
          className="w-[120px] py-2 border-2 rounded-lg mr-10"
        >
          이전
        </button>

        <button
          data-nonblur="true"
          onClick={moveToAIRecommendationResultStep}
          className="w-[120px] py-2 border-2 rounded-lg"
        >
          AI 추천 결과보기
        </button>
      </div>
    </div>
  );
}
