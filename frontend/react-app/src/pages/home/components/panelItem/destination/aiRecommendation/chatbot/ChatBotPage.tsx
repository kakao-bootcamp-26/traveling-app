import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToAIRecommendationResultStep: () => void;
};

export default function ChatBotPage({
  moveToAIRecommendationInitStep,
  moveToAIRecommendationResultStep,
}: Props) {
  return (
    <div>
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
