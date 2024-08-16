import { useFunnel } from "@/shared/hooks/useFunnel";
import HumanSelectPage from "@/pages/home/components/panelItem/destination/humanSelect/HumanSelectPage";

import QuestionPage from "@/pages/home/components/panelItem/destination/question/QuestionPage";
import ResultPage from "@/pages/home/components/panelItem/destination/result/ResultPage";
import { RecommendationByKeyword } from "@/pages/home/components/panelItem/destination/keywordItem/RecommendationByKeywordPage";
import { useRecoilValue } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useEffect } from "react";

type FunnelSteps = "Question" | "AIRecommendation" | "HumanSelect" | "Result";

export function DestinationPanelItem() {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);
  const { Funnel, setStep } = useFunnel<FunnelSteps>("Question");

  const moveToAIRecommendationPage = () => {
    setStep("AIRecommendation");
  };

  const moveToHumanSelectPage = () => {
    setStep("HumanSelect");
  };

  const moveToInitialPage = () => {
    setStep("Question");
  };

  const moveToResultPage = () => {
    setStep("Result");
  };

  // Reset step when travel info is changed
  useEffect(() => {
    if (selectedTravelInfo) {
      setStep("Question");
    }
  }, [selectedTravelInfo.origin, selectedTravelInfo.passenger, selectedTravelInfo.schedule]);

  return (
    <>
      <div
        data-nonblur="true"
        style={{
          height: "calc(100vh - 107px)",
          overflowY: "scroll",
        }}
        className="flex flex-col justify-between"
      >
        <Funnel>
          <QuestionPage
            name="Question"
            moveToAIRecommendationPage={moveToAIRecommendationPage}
            moveToHumanSelectPage={moveToHumanSelectPage}
          />
          <RecommendationByKeyword
            name="AIRecommendation"
            moveToInitialPage={moveToInitialPage}
            moveToResultPage={moveToResultPage}
          />
          <HumanSelectPage
            name="HumanSelect"
            moveToInitialPage={moveToInitialPage}
            moveToResultPage={moveToResultPage}
          />
          <ResultPage name="Result" moveToInitialPage={moveToInitialPage} />
        </Funnel>
      </div>
    </>
  );
}
