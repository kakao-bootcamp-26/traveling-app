import type { ButtonHTMLAttributes } from "react";
import React from "react";

type Props = {
  onCheckDuplicate: () => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function CheckDuplicateButton({ onCheckDuplicate, ...props }: Props) {
  return (
    <button onClick={onCheckDuplicate} {...props}>
      중복검사
    </button>
  );
}
