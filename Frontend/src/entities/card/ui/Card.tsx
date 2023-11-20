import React from "react";

import { ICard } from "./card.interface";
import "./index.scss";
import useMenu from "shared/hooks/useMenu";
import { motion } from "framer-motion";
import { switchState } from "entities/RightMenu/model/MenuSlice";

const CardUi: React.FC<ICard> = ({ children, title, elemId }) => {
  const { dispatch } = useMenu();
  const handleSideMenu = () => {
    dispatch(switchState({ isOpen: true, todoId: elemId }));
  };
  console.log(elemId);

  return (
    <motion.div
      className="card"
      onClick={handleSideMenu}
      transition={{ duration: 0.02 }}
      whileTap={{ scale: 1.01 }}
    >
      <div className="flex justify-between">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__box">{children}</div>
    </motion.div>
  );
};

export default CardUi;
