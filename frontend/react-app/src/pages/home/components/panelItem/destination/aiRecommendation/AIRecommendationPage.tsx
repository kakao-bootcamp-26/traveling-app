import ChatBotPage from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBotPage";
import AIRecommendationInitPage from "@/pages/home/components/panelItem/destination/aiRecommendation/init/AIRecommendationInitPage";
import { RecommendationByKeyword } from "@/pages/home/components/panelItem/destination/aiRecommendation/keywordItem/RecommendationByKeywordPage";
import AIRecommendationResult from "@/pages/home/components/panelItem/destination/aiRecommendation/result/AIRecommendationResult";
import useAIRecommendationFunnel from "@/pages/home/hooks/destination/useAIRecommendationFunnel";
import { FunnelSteps } from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import { useState } from "react";

type Props = {
  name: FunnelSteps;
  moveToInitialPage: () => void;
  moveToResultPage: () => void;
};

export default function AIRecommendationPage({ moveToInitialPage, moveToResultPage }: Props) {
  const {
    moveToAIRecommendationInitStep,
    Funnel,
    moveToChatBotStep,
    moveToKeywordStep,
    moveToAIRecommendationResultStep,
  } = useAIRecommendationFunnel();

  const [AIRecommendationDestinations, setAIRecommendationDestinations] = useState<
    DestinationEntity[]
  >([]);

  const saveAIRecommendationDestinations = (cities: DestinationEntity[]) => {
    setAIRecommendationDestinations(cities);
  };

  return (
    <article className="flex flex-col items-center" data-nonblur="true">
      <Funnel>
        <AIRecommendationInitPage
          name="INIT"
          moveToInitialPage={moveToInitialPage}
          moveToChatBotStep={moveToChatBotStep}
          moveToKeywordStep={moveToKeywordStep}
        />
        <RecommendationByKeyword
          name="KEYWORD"
          moveToAIRecommendationInitStep={moveToAIRecommendationInitStep}
          moveToAIRecommendationResultStep={moveToAIRecommendationResultStep}
          saveAIRecommendationDestinations={saveAIRecommendationDestinations}
        />
        <ChatBotPage
          name="CHAT_BOT"
          moveToAIRecommendationInitStep={moveToAIRecommendationInitStep}
          moveToAIRecommendationResultStep={moveToAIRecommendationResultStep}
          saveAIRecommendationDestinations={saveAIRecommendationDestinations}
        />
        <AIRecommendationResult
          name="AI_RESULT"
          moveToAIRecommendationInitStep={moveToAIRecommendationInitStep}
          moveToResultPage={moveToResultPage}
          recommendationCities={AIRecommendationDestinations}
        />
      </Funnel>
    </article>
  );
}
