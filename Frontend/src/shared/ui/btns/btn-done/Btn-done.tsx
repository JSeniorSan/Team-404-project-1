import { IButtonDone } from "./Btn-done.interfaces";
import "./index.scss";
import cn from "classnames";
const BtnDone: React.FC<IButtonDone> = ({ description, color }) => {
  return (
    <button
      className={cn("btn__done", {
        ["red"]: color === "red",
        ["green"]: color === "green",
        ["yellow"]: color === "yellow",
        ["default"]: color === "default",
      })}
    >
      {description}
    </button>
  );
};

export default BtnDone;
