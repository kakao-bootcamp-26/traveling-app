import ErrorMessageConfirmation from "@blog/components/src/core/messageConfirmation/ErrorMessageConfirmation";
import React from "react";
import type { FieldErrors } from "react-hook-form";

interface ErrorObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

type Props = {
  errors: FieldErrors<ErrorObject>;
};
export default function ErrorConfirm({ errors }: Props) {
  const errorKeys = Object.keys(errors);
  const hasError = errorKeys.length > 0;
  const message = errors[errorKeys[0]]?.message as string;
  return <ErrorMessageConfirmation hasError={hasError} message={message} />;
}
