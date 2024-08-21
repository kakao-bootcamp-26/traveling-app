import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useFunnel } from "@/shared/hooks/useFunnel";
import { useSetRecoilState } from "recoil";

export type FunnelSteps = "INIT" | "AI_RECOMMENDATION" | "HUMAN_SELECT" | "RESULT";

export default function useDestinationPanelFunnel() {
  const { step, setStep, Funnel } = useFunnel<FunnelSteps>("INIT");
  const updateSelectedTravelInfo = useSetRecoilState(selectedTravelInfoSelector);

  const moveToInitialPage = () => {
    setStep("INIT");
    updateSelectedTravelInfo((prev) => ({
      ...prev,
      destination: {
        airportCode: "",
        city: "",
        cityCode: "",
      },
    }));
  };

  const moveToAIRecommendationPage = () => {
    setStep("AI_RECOMMENDATION");
  };

  const moveToHumanSelectPage = () => {
    setStep("HUMAN_SELECT");
  };

  const moveToResultPage = () => {
    setStep("RESULT");
  };

  return {
    step,
    Funnel,
    moveToInitialPage,
    moveToAIRecommendationPage,
    moveToHumanSelectPage,
    moveToResultPage,
  };
}
