import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToResultPage: () => void;
};

export default function AIRecommendationResult({
  moveToAIRecommendationInitStep,
  moveToResultPage,
}: Props) {
  return (
    <div data-nonblur="true">
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
          onClick={moveToResultPage}
          className="w-[120px] py-2 border-2 rounded-lg"
        >
          다음
        </button>
      </div>
    </div>
  );
}
