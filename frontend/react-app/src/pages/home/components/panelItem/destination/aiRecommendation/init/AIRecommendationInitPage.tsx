import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToInitialPage: () => void;
  moveToKeywordStep: () => void;
  moveToChatBotStep: () => void;
};

export default function AIRecommendationInitPage({
  moveToInitialPage,
  moveToKeywordStep,
  moveToChatBotStep,
}: Props) {
  return (
    <div data-nonblur="true">
      <div data-nonblur="true" className="mb-10">
        <h5 data-nonblur="true" className="text-[20px] mb-4">
          여행지 추천
        </h5>
        <p data-nonblur="true" className="text-md">
          여행지 추천을 받아보세요
        </p>
        <p data-nonblur="true">챗봇 / 키워드 선택 중 원하는 방법을 선택해주세요</p>
      </div>
      <div className="mt-4" data-nonblur="true">
        <button
          data-nonblur="true"
          onClick={moveToInitialPage}
          className="w-[80px] py-2 border-2 rounded-lg mr-10"
        >
          이전
        </button>

        <button
          data-nonblur="true"
          onClick={moveToKeywordStep}
          className="w-[100px] py-2 border-2 rounded-lg mr-10"
        >
          키워드 선택
        </button>
        <button
          data-nonblur="true"
          onClick={moveToChatBotStep}
          className="w-[80px] py-2 border-2 rounded-lg"
        >
          챗봇으로
        </button>
      </div>
    </div>
  );
}
