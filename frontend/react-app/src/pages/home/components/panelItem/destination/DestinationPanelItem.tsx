import HumanSelectPage from "@/pages/home/components/panelItem/destination/humanSelect/HumanSelectPage";

import InitPage from "@/pages/home/components/panelItem/destination/init/InitPage";
import ResultPage from "@/pages/home/components/panelItem/destination/result/ResultPage";
import { useRecoilValue } from "recoil";
import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useEffect } from "react";
import useDestinationPanelFunnel from "@/pages/home/hooks/destination/useDestinationPanelFunnel";
import AIRecommendationPage from "@/pages/home/components/panelItem/destination/aiRecommendation/AIRecommendationPage";

export function DestinationPanelItem() {
  const selectedTravelInfo = useRecoilValue(selectedTravelInfoSelector);

  const {
    moveToInitialPage,
    moveToResultPage,
    moveToAIRecommendationPage,
    moveToHumanSelectPage,
    Funnel,
  } = useDestinationPanelFunnel();

  // Reset step when travel info is changed
  useEffect(() => {
    if (!selectedTravelInfo.destination.airportCode || !selectedTravelInfo.destination.city) {
      moveToInitialPage();
    } else {
      moveToResultPage();
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
          <InitPage
            name="INIT"
            moveToAIRecommendationPage={moveToAIRecommendationPage}
            moveToHumanSelectPage={moveToHumanSelectPage}
          />
          <AIRecommendationPage
            name="AI_RECOMMENDATION"
            moveToInitialPage={moveToInitialPage}
            moveToResultPage={moveToResultPage}
          />
          <HumanSelectPage
            name="HUMAN_SELECT"
            moveToInitialPage={moveToInitialPage}
            moveToResultPage={moveToResultPage}
          />
          <ResultPage name="RESULT" moveToInitialPage={moveToInitialPage} />
        </Funnel>
      </div>
    </>
  );
}
