import { Form as AntdForm } from "antd";
import { PropsWithChildren } from "react";
type Props = {
  layout: "horizontal" | "vertical";
  onFinish?: (values: any) => void;
};
function Form({ children, ...props }: PropsWithChildren<Props>) {
  return <AntdForm {...props}>{children}</AntdForm>;
}

export { Form };
