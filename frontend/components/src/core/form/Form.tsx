import { Form as AntdForm } from "antd";
import { PropsWithChildren } from "react";
type Props = {
  layout: "horizontal" | "vertical";
};
function Form({ children, ...props }: PropsWithChildren<Props>) {
  return <AntdForm {...props}>{children}</AntdForm>;
}

export default Form;
