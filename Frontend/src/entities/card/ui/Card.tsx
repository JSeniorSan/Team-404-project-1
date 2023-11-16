import React from "react";

import { ICard } from "./card.interface";
import "./index.scss";
import TodosDropMenu from "./dropMenu/TodosDropMenu";

const CardUi: React.FC<ICard> = ({ children, title, elemId }) => {
  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="card__title">{title}</div>
        <TodosDropMenu elemId={elemId} />
      </div>
      <div className="card__box">{children}</div>
    </div>
  );
};

export default CardUi;
