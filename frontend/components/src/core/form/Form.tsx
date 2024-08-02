import { FormHTMLAttributes, PropsWithChildren } from "react";

export function Form({
  children,
  ...props
}: PropsWithChildren<FormHTMLAttributes<HTMLFormElement>>) {
  return <form {...props}>{children}</form>;
}
