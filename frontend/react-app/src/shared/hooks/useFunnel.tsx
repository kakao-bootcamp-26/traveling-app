import { FC, isValidElement, useState } from "react";

// https://medium.com/@yujin.px/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C%EC%97%90%EC%84%9C-%ED%8D%BC%EB%84%90-funnel-%ED%8C%A8%ED%84%B4%EC%9D%84-%ED%9A%A8%EC%9C%A8%EC%A0%81%EC%9C%BC%EB%A1%9C-%EA%B0%9C%EB%B0%9C%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-669934f9469a
type StepProps = {
  name: string;
  children: React.ReactNode;
};

type FunnelProps = {
  children: React.ReactNode[];
};

interface FunnelComponent extends FC<FunnelProps> {
  Step: FC<StepProps>;
}

type UseFunnelReturn<T> = {
  Funnel: FunnelComponent;
  setStep: (step: T) => void;
};

export function useFunnel<T>(initialStep: T): UseFunnelReturn<T> {
  const [step, setStep] = useState<T>(initialStep);

  // Step을 렌더링하는 컴포넌트
  const Step: FC<StepProps> = ({ children }) => {
    return <>{children}</>;
  };

  // 하위 Step 컴포넌트 중 현재 활성화된 Step을 렌더링하는 컴포넌트
  const Funnel: FunnelComponent = ({ children }) => {
    const currentStep = children.find(
      (child: React.ReactNode) => isValidElement(child) && child.props.name === step,
    );
    return <>{currentStep}</>;
  };

  Funnel.Step = Step;

  return { Funnel, setStep };
}
