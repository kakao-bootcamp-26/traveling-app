import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useRecoilState } from "recoil";
import { Form, Input } from "antd";
import { FlightConfigurationPanel } from "@/pages/home/components/FlightConfigurationPanel";
import { useEffect, useState } from "react";
import { TravelInfo } from "@/shared/entities";

export type SelectedTravelInput = Exclude<keyof TravelInfo, "key">;

export default function TravelInfoForm() {
  const [selectedItem] = useRecoilState(selectedTravelInfoSelector);
  const [selectedTravelInputType, setSelectedTravelInputType] =
    useState<SelectedTravelInput | null>(null);

  const handleInputFocus = (inputType: SelectedTravelInput) => () => {
    setSelectedTravelInputType(inputType);
  };

  const handleInputBlur = () => {
    setSelectedTravelInputType(null);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).dataset.nonblur) {
        return;
      }
      handleInputBlur();
    });
  }, []);

  return (
    <>
      <section style={{ width: "360px", height: "100vh", zIndex: "10" }}>
        <div style={{ margin: "8px" }}>
          <Form layout={"vertical"}>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="탑승 인원"
                value={`${selectedItem.passenger?.count || 0}명, ${selectedItem.passenger?.flightClass}`}
                onFocus={handleInputFocus("passenger")}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="출발지"
                value={selectedItem.origin}
                onFocus={handleInputFocus("origin")}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="목적지"
                value={selectedItem.destination}
                onFocus={handleInputFocus("destination")}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="날짜"
                onFocus={handleInputFocus("schedule")}
                value={selectedItem.schedule?.arrival?.toString()}
              />
            </Form.Item>
          </Form>
        </div>
      </section>
      <FlightConfigurationPanel
        selectedInputType={selectedTravelInputType}
        onBlur={handleInputBlur}
      />
    </>
  );
}
