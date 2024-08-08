import { CloseOutlined } from "@ant-design/icons";
import React, { PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
  title: string;
  onBlur: () => void;
};
export function FlightPanelUI({ isOpen, title, onBlur, children }: PropsWithChildren<Props>) {
  return (
    <div
      data-nonblur="true"
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out", // 애니메이션 적용
        transform: isOpen ? "translateX(0)" : "translateX(-100px)", // isOpen 상태에 따라 translate 조정
        opacity: isOpen ? 1 : 0, // isOpen 상태에 따라 opacity 조정
        pointerEvents: isOpen ? "auto" : "none", // 패널이 보이지 않을 때 클릭 차단
        zIndex: isOpen ? "1" : "0",
        backgroundColor: "teal",
        color: "white",
      }}
    >
      <div
        data-nonblur="true"
        style={{
          cursor: "pointer",
          paddingLeft: "auto",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "rgb(65, 69, 78)",
          padding: "15px",
          paddingBottom: "35px",
        }}
      >
        <span
          data-nonblur="true"
          style={{
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          {title}
        </span>
        <span onClick={onBlur}>
          <CloseOutlined
            type="message"
            style={{ fontSize: "18px" }}
            // theme="outlined"
          />
        </span>
      </div>
      <div
        data-nonblur="true"
        style={{
          padding: "15px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
