import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import { Spin } from "antd";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToResultPage: () => void;
  recommendations: string[];
};

export default function AIRecommendationResult({
  moveToAIRecommendationInitStep,
  moveToResultPage,
  recommendations,
}: Props) {
  if (recommendations.length === 0) {
    return (
      <div data-nonblur="true" className="flex flex-col items-center">
        <h5 className="mb-6">AI의 결과를 기다리는 중입니다.</h5>
        <Spin tip="Loading" size="large"></Spin>
      </div>
    );
  }

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
