import React from "react";
import { Card } from "antd";
import { ICard } from "./card.interface";
import "./index.scss";
const CardUi: React.FC<ICard> = ({ children, title }) => {
  return (
    <Card className="card" bordered={true} title={title}>
      {children}
    </Card>
  );
};

export default CardUi;
