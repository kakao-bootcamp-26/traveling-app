import { Button as AntdButton } from "antd";
import { PropsWithChildren } from "react";

type Props = {
  iconOption?: {
    icon: React.ReactNode;
    iconPosition: "start" | "end";
  };
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  loading?: boolean | { delay: number };
  disabled: boolean;
  block: boolean;
  htmlType: "button" | "submit" | "reset";
  type: "default" | "primary" | "text";
};
export default function Button({ children, ...props }: PropsWithChildren<Props>) {
  return <AntdButton {...props}>{children}</AntdButton>;
}
