import React from "react";

import { ICard } from "./card.interface";
import "./index.scss";
import useMenu from "shared/hooks/useMenu";
import { motion } from "framer-motion";

const CardUi: React.FC<ICard> = ({ children, title, elemId }) => {
  const { handleSideMenu } = useMenu();

  return (
    <motion.div
      className="card"
      onClick={handleSideMenu}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex justify-between">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__box">{children}</div>
    </motion.div>
  );
};

export default CardUi;
