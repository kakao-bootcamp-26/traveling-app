import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

type Props = {
  label?: string;
  labelColor?: string;
} & InputHTMLAttributes<HTMLInputElement>;
export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, labelColor = "black", name, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={name}
            style={{
              color: labelColor,
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {label}
          </label>
        )}
        <input name={name} ref={ref} {...props} />
      </div>
    );
  },
);
