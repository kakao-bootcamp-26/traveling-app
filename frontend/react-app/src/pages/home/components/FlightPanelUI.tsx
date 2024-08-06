import React, { PropsWithChildren } from "react";

type Props = {
  isOpen: boolean;
  onBlur: () => void;
};
export default function FlightPanelUI({ isOpen, onBlur, children }: PropsWithChildren<Props>) {
  console.log(children);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        padding: "10px",
        position: "absolute",
        transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out", // 애니메이션 적용
        transform: isOpen ? "translateX(0)" : "translateX(-100px)", // isOpen 상태에 따라 translate 조정
        opacity: isOpen ? 1 : 0, // isOpen 상태에 따라 opacity 조정
        pointerEvents: isOpen ? "auto" : "none", // 패널이 보이지 않을 때 클릭 차단
        zIndex: "1",
      }}
    >
      <div onClick={onBlur} style={{ cursor: "pointer" }}>
        X
      </div>
      <div data-nonblur="true">{children}</div>
    </div>
  );
}
