import "./index.scss";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
export interface IBtn
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  type?: "activity" | "newTodo";
  color?: "black" | "white";
}

const Btn: React.FC<IBtn> = ({ color, type, children, ...props }) => {
  return (
    <button
      className={cn("btn", {
        ["activityBtn"]: type === "activity",
        ["newTodo"]: type === "newTodo",
        ["darkText"]: color === "black",
        ["lightText"]: color === "white",
      })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Btn;
