import React, { useState } from "react";
import Dots from "../../shared/asset/tabler_dots.svg?react";
import { ICard } from "./card.interface";
import "./index.scss";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import cn from "classnames";
const CardUi: React.FC<ICard> = ({ children, title, elemId }) => {
  const [cardOptionMenu, setCardOptionMenu] = useState<boolean>(false);
  const [deleteTodo] = todoApi.useRemoveTaskMutation();
  const deleteHandler = async () => {
    await deleteTodo(elemId);
  };
  const doneHandler = () => {};
  const handleClickCardOptions = () => {
    setCardOptionMenu(!cardOptionMenu);
  };

  return (
    <div className="card">
      <div className="flex justify-between">
        <div className="card__title">{title}</div>
        <Dots className="cardVisual__dots" onClick={handleClickCardOptions} />
        <div
          className={cn("box__controll", {
            ["activeCardOptions"]: cardOptionMenu,
          })}
        >
          <div onClick={deleteHandler} className="cursor-pointer">
            Delete
          </div>
          <div onClick={deleteHandler} className="cursor-pointer">
            Change
          </div>
          <div>Replace to: </div>
          <div onClick={doneHandler}>Done</div>
        </div>
      </div>
      <div className="card__box">{children}</div>
    </div>
  );
};

export default CardUi;
