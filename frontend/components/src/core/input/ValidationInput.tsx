import type { InputHTMLAttributes, PropsWithChildren } from "react";
import React, { forwardRef } from "react";

type Props = {
  label?: string;
  labelColor?: string;
  validateButton: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;
export const ValidateInput = forwardRef<HTMLInputElement, PropsWithChildren<Props>>(
  ({ label, labelColor = "black", name, validateButton, ...props }, ref) => {
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
        <div>
          <input name={name} ref={ref} {...props} />
          {validateButton}
        </div>
      </div>
    );
  },
);
