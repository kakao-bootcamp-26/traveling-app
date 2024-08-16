import { useFunnel } from "@/shared/hooks/useFunnel";

export type AIRecommendationFunnelSteps = "INIT" | "KEYWORD" | "CHAT_BOT" | "AI_RESULT";

export default function useAIRecommendationFunnel() {
  const { Funnel, step, setStep } = useFunnel<AIRecommendationFunnelSteps>("INIT");

  const moveToKeywordStep = () => {
    setStep("KEYWORD");
  };

  const moveToChatBotStep = () => {
    setStep("CHAT_BOT");
  };

  const moveToAIRecommendationInitStep = () => {
    setStep("INIT");
  };

  const moveToAIRecommendationResultStep = () => {
    setStep("AI_RESULT");
  };

  return {
    Funnel,
    step,
    moveToKeywordStep,
    moveToChatBotStep,
    moveToAIRecommendationInitStep,
    moveToAIRecommendationResultStep,
  };
}
