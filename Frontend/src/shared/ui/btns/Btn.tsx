import "./index.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
export interface IBtn
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "activity" | "newPanel" | "submit" | "greenNewPanel";
  color?: "black" | "white" | "green";
  children: React.ReactNode;
}

const Btn: React.FC<IBtn> = ({
  color,
  type,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn("btn", className, {
        ["activityBtn"]: type === "activity",
        ["newPanel"]: type === "newPanel",
        ["greenNewPanel"]: type === "greenNewPanel",
        ["darkText"]: color === "black",
        ["lightText"]: color === "white",
        ["submit"]: type === "submit",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Btn;
