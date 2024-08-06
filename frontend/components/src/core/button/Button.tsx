import { Button as AntdButton, ConfigProviderProps } from "antd";
import { PropsWithChildren } from "react";

type SizeType = ConfigProviderProps["componentSize"];
type Props = {
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";

  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  size: SizeType;
  loading?: boolean | { delay: number };
  disabled?: boolean;
  block?: boolean;
  htmlType?: "button" | "submit" | "reset";
  type?: "default" | "primary" | "text";
  shape?: "circle" | "round";
  style?: React.CSSProperties;
};
export const Button = ({ children, ...props }: PropsWithChildren<Props>) => {
  return <AntdButton {...props}>{children}</AntdButton>;
};
