import React from "react";
import type { PropsWithChildren } from "react";

type Props = {
  actions: any;
};

const MessageParser = ({ children, actions }: PropsWithChildren<Props>) => {
  const parse = (message: string) => {
    actions.handleMessage(message);
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
