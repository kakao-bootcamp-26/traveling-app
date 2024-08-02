import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type Props = {
  label: string;
  labelColor?: string;
  fontSize?: string;
} & Exclude<InputHTMLAttributes<HTMLInputElement>, "type">;
export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, labelColor = "black", name, fontSize = "14px", ...props }, ref) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <input name={name} ref={ref} {...props} type="checkbox" />
        <label
          htmlFor={name}
          style={{
            color: labelColor,
            fontSize,
          }}
        >
          {label}
        </label>
      </div>
    );
  },
);
