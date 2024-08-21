import React from "react";
import type { PropsWithChildren } from "react";

type Props = {
  actions: any;
};

const MessageParser = ({ children, actions }: PropsWithChildren<Props>) => {
  const parse = (message: string) => {
    // TODO: AI로부터 받은 결과를 파싱하여 메시지를 생성하는 로직을 작성합니다.
    const AIResult = [
      {
        country: "일본",
        city: "도쿄",
        airport: { name: "나리타 국제공항", airportCode: "NRT", cityCode: "TYO" },
      },
      {
        country: "이탈리아",
        city: "로마",
        airport: { name: "파우미치노 국제공항", airportCode: "FCO", cityCode: "ROM" },
      },
    ];
    actions.handleCurationMessage(AIResult);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement<any>(child, {
            parse,
            actions: {},
          });
        }
      })}
    </div>
  );
};

export default MessageParser;
