import { useFunnel } from "@/shared/hooks/useFunnel";
import HumanSelectPage from "@/pages/home/components/panelItem/destination/humanSelect/HumanSelectPage";

import QuestionPage from "@/pages/home/components/panelItem/destination/question/QuestionPage";
import ResultPage from "@/pages/home/components/panelItem/destination/result/ResultPage";
import { RecommendationByKeyword } from "@/pages/home/components/panelItem/destination/keywordItem/RecommendationByKeywordPage";

type FunnelSteps = "Question" | "AIRecommendation" | "HumanSelect" | "Result";

export function DestinationPanelItem() {
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
