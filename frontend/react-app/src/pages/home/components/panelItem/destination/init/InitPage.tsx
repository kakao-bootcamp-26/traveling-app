import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";

type Props = {
  name: FunnelSteps;
  moveToAIRecommendationPage: () => void;
  moveToHumanSelectPage: () => void;
};

export default function QuestionPage({ moveToAIRecommendationPage, moveToHumanSelectPage }: Props) {
  return (
    <div data-nonblur="true" className="flex flex-col items-center">
      <div data-nonblur="true" className="flex flex-col items-center mt-4 mb-4">
        <h5 data-nonblur="true" className="mb-2 text-2xl">
          AI의 여행지 추천을 원하시나요?
        </h5>
        <p data-nonblur="true" className="text-md">
          키워드 기반으로 여행지를 추천해드립니다.
        </p>
      </div>
      <div data-nonblur="true" className="mt-4">
        <button
          data-nonblur="true"
          onClick={moveToAIRecommendationPage}
          className="w-[120px] py-2 border-2 rounded-lg mr-10"
        >
          네
        </button>
        <button
          data-nonblur="true"
          onClick={moveToHumanSelectPage}
          className="w-[120px] py-2 border-2 rounded-lg"
        >
          아니오
        </button>
      </div>
    </div>
  );
}
