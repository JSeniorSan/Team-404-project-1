import React from "react";
import cn from "classnames";
import "./index.scss";
import { IBtnModal } from "./btn-modal.interfaces";
const BtnModal: React.FC<IBtnModal> = ({ type, title, ...props }) => {
  return (
    <button
      className={cn({
        ["transparent"]: type === "transparent",
        ["btn__modal"]: type === "default",
      })}
      {...props}
    >
      {title}
    </button>
  );
};

export default BtnModal;
