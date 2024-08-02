import React from "react";

type Props = {
  fontSize?: string;
};

export default function MainLogo({ fontSize = "20px" }: Props) {
  return (
    <div
      style={{
        fontSize,
      }}
      className="font-notoSansKr font-bold text-primary"
    >
      강쥐조아
    </div>
  );
}
