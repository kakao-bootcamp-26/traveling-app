import { selectedTravelInfoSelector } from "@/shared/atom/travelAtom";
import { useRecoilValue } from "recoil";
import { Form, Input, Typography } from "antd";
import { FlightConfigurationPanel } from "@/pages/home/components/FlightConfigurationPanel";
import { useEffect, useState } from "react";
import { TravelInfo } from "@/shared/entities";

import {
  checkNonBlurTarget,
  passengerInformationToString,
  scheduleInformationToString,
} from "@/pages/home/utils";
import { domesticAirports, internationalAirports } from "@/constants";

export type SelectedTravelInput = Exclude<keyof TravelInfo, "key">;

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

      if (checkNonBlurTarget(target)) {
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
        <div style={{ margin: "14px", marginBottom: "40px" }}>
          <Typography.Title level={2} style={{ color: "black" }}>
            여행 정보
          </Typography.Title>
          <Typography.Paragraph style={{ color: "black" }}>
            여행 계획을 입력해주세요. <br />
            여행 정보를 입력하면 여행 경로를 추천해드립니다.
          </Typography.Paragraph>
        </div>
        <div style={{ margin: "14px" }}>
          <Form layout={"vertical"}>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="탑승 인원"
                style={{
                  padding: "8px 16px",
                }}
                value={`${passengerInformationToString(selectedItem.passenger as TravelInfo["passenger"])}`}
                onFocus={handleInputFocus("passenger")}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                style={{
                  padding: "8px 16px",
                }}
                placeholder="Pick Dates"
                onFocus={handleInputFocus("schedule")}
                value={scheduleInformationToString(selectedItem.schedule)}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="출발지"
                style={{
                  padding: "8px 16px",
                }}
                value={`${selectedItem.origin.city} (${selectedItem.origin.airportCode})`}
                onFocus={handleInputFocus("origin")}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "12px" }}>
              <Input
                data-nonblur="true"
                type="text"
                placeholder="목적지"
                style={{
                  padding: "8px 16px",
                }}
                value={
                  internationalAirports[
                    selectedItem.destination.airportCode as keyof typeof internationalAirports
                  ]
                }
                onFocus={handleInputFocus("destination")}
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
