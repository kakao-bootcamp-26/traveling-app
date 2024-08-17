import { useFunnel } from "@/shared/hooks/useFunnel";

export type HumanSelectFunnels = "COUNTRY" | "CITY";
export default function useHumanSelectFunnel() {
  const { Funnel, setStep, step } = useFunnel<HumanSelectFunnels>("COUNTRY");

  const moveToCountryFunnel = () => {
    setStep("COUNTRY");
  };

  const moveToCityFunnel = () => {
    setStep("CITY");
  };

  return {
    Funnel,
    moveToCountryFunnel,
    moveToCityFunnel,
    currentStep: step,
  };
}
