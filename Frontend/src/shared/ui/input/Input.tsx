import cn from "classnames";
import "./index.scss";
import { DetailedHTMLProps, HTMLAttributes, forwardRef } from "react";

export interface IInput
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type: "text" | "search" | "date";
  placeholder: string;
  variant: "input" | "withoutLine";
}

const Input = forwardRef<HTMLInputElement, IInput>(
  ({ type, placeholder, variant, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn("input", {
          ["input"]: variant === "input",
          ["withoutLine"]: variant === "withoutLine",
        })}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
