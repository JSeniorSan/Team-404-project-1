import React from "react";

import { ICard } from "./card.interface";
import "./index.scss";
const CardUi: React.FC<ICard> = ({ children, title }) => {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__box">{children}</div>
    </div>
  );
};

export default CardUi;
