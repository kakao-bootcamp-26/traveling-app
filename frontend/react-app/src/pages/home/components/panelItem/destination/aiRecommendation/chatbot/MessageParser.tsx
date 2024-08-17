import React, { PropsWithChildren } from "react";

type Props = {
  actions: any;
};

const MessageParser = ({ children, actions }: PropsWithChildren<Props>) => {
  const parse = (message: string) => {
    if (message.includes("안녕")) {
      actions.handleHello();
    }
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
