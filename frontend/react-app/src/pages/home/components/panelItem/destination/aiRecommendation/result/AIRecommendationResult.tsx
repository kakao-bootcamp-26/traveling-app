import { AIRecommendationFunnelSteps } from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import { DestinationEntity } from "@/shared/entities/destination.entity";

type Props = {
  name: AIRecommendationFunnelSteps;
  moveToAIRecommendationInitStep: () => void;
  moveToResultPage: () => void;
  recommendationCities: DestinationEntity[];
};

export default function AIRecommendationResult({
  moveToAIRecommendationInitStep,
  moveToResultPage,
  recommendationCities,
}: Props) {
  return (
    <div data-nonblur="true">
      {recommendationCities.length === 0 ? (
        <div data-nonblur="true" className="flex flex-col items-center">
          추천 결과가 없습니다.
        </div>
      ) : (
        <div data-nonblur="true" className="flex flex-col items-center">
          {recommendationCities.map((city) => {
            return <div data-nonblur="true">{city.city}</div>;
          })}
        </div>
      )}
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
