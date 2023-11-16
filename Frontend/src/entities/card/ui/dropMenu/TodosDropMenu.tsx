import React, { useState } from "react";
import Dots from "shared/asset/tabler_dots.svg?react";
import cn from "classnames";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

export interface IDropMenu {
  elemId: number;
}

const TodosDropMenu: React.FC<IDropMenu> = ({ elemId }) => {
  const [cardOptionMenu, setCardOptionMenu] = useState<boolean>(false);
  const [deleteTodo] = todoApi.useRemoveTaskMutation();

  const deleteHandler = async () => {
    await deleteTodo(elemId);
  };

  const handleClickCardOptions = () => {
    setCardOptionMenu(!cardOptionMenu);
  };
  return (
    <>
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
      </div>
    </>
  );
};

export default TodosDropMenu;
