import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useRecoilValue } from "recoil";
import { Form, Input } from "antd";
import { FlightConfigurationPanel } from "@/pages/home/components/FlightConfigurationPanel";
import { useEffect, useState } from "react";
import { TravelInfo } from "@/shared/entities";
import { passengerInformationToString } from "@/pages/home/utils";

export type SelectedTravelInput = Exclude<keyof TravelInfo, "key">;

function checkIsNonBlurTarget(target: HTMLElement) {
  return (
    target.dataset.nonblur === "true" ||
    target.closest(".ant-picker-dropdown") ||
    target.closest(".ant-picker")
  );
}

export default function TravelInfoForm() {
  const selectedItem = useRecoilValue(selectedTravelInfoSelector);
  const [selectedTravelInputType, setSelectedTravelInputType] =
    useState<SelectedTravelInput | null>(null);

  const handleInputFocus = (inputType: SelectedTravelInput) => () => {
    setSelectedTravelInputType(inputType);
  };

  const handleInputBlur = () => {
    setSelectedTravelInputType(null);
  };

  useEffect(() => {
    const closeOnOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (checkIsNonBlurTarget(target)) {
        return;
      }
      handleInputBlur();
    };
    // Close the panel when clicking outside of the panel
    window.addEventListener("click", closeOnOutsideClick);

    return () => {
      window.removeEventListener("click", closeOnOutsideClick);
    };
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
                value={`${passengerInformationToString(selectedItem.passenger as TravelInfo["passenger"])}`}
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
