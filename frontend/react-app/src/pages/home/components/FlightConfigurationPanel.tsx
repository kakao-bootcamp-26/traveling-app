import { useEffect } from "react";
import { FlightPanelUI } from "@/pages/home/components/FlightPanelUI";
import { DestinationPanelItem } from "@/pages/home/components/panelItem/DestinationPanelItem";
import { OriginPanelItem } from "@/pages/home/components/panelItem/OriginPanelItem";
import { PassengerPanelItem } from "@/pages/home/components/panelItem/PassengerPanelItem";
import { SelectedTravelInput } from "@/pages/home/components/TravelInfoForm";
import { SchedulePanelItem } from "@/pages/home/components/panelItem/SchedulePanelItem";

type Props = {
  selectedInputType: SelectedTravelInput | null;
  onBlur: () => void;
};

export function FlightConfigurationPanel({ selectedInputType, onBlur }: Props) {
  useEffect(() => {
    if (selectedInputType !== null) {
      document.body.classList.add("open");
    } else {
      document.body.classList.remove("open");
    }
  }, [selectedInputType]);

  return (
    <section
      data-nonblur="true"
      style={{ position: "absolute", left: "360px", top: 0, width: "400px", height: "100vh" }}
    >
      <FlightPanelUI
        title="누구와 함께 여행을 가실건가요?"
        isOpen={selectedInputType === "passenger"}
        onBlur={onBlur}
      >
        <PassengerPanelItem />
      </FlightPanelUI>
      <FlightPanelUI
        title="언제 여행을 떠나실건가요?"
        isOpen={selectedInputType === "schedule"}
        onBlur={onBlur}
      >
        <SchedulePanelItem isOpen={selectedInputType === "schedule"} />
      </FlightPanelUI>

      <FlightPanelUI
        title="어디에서 출발하실건가요?"
        isOpen={selectedInputType === "origin"}
        onBlur={onBlur}
      >
        <OriginPanelItem />
      </FlightPanelUI>
      <FlightPanelUI
        title="어디로 가실건가요?"
        isOpen={selectedInputType === "destination"}
        onBlur={onBlur}
      >
        <DestinationPanelItem />
      </FlightPanelUI>
    </section>
  );
}
