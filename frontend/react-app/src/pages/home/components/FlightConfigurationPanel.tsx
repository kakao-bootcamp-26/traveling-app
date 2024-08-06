import FlightPanelUI from "@/pages/home/components/FlightPanelUI";
import { SelectedTravelInput } from "@/pages/home/components/TravelInfoForm";

type Props = {
  selectedInputType: SelectedTravelInput | null;
  onBlur: () => void;
};
export function FlightConfigurationPanel({ selectedInputType, onBlur }: Props) {
  console.log(selectedInputType);
  return (
    <section
      style={{ position: "absolute", left: "360px", top: 0, width: "300px", height: "100vh" }}
    >
      <FlightPanelUI isOpen={selectedInputType === "passenger"} onBlur={onBlur}>
        a
      </FlightPanelUI>
      <FlightPanelUI isOpen={selectedInputType === "origin"} onBlur={onBlur}>
        b
      </FlightPanelUI>
      <FlightPanelUI isOpen={selectedInputType === "destination"} onBlur={onBlur}>
        c
      </FlightPanelUI>
      <FlightPanelUI isOpen={selectedInputType === "schedule"} onBlur={onBlur}>
        d
      </FlightPanelUI>
    </section>
  );
}
