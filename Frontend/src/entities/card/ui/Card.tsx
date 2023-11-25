import React from "react";
import cn from "classnames";
import { ICard } from "./card.interface";
import "./index.scss";
import useMenu from "shared/hooks/useMenu";
import { motion } from "framer-motion";
import { switchState } from "entities/RightMenu/model/MenuSlice";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import Page from "shared/ui/p/Page";
import CalendarIcon from "shared/asset/calendar.svg?react";
import AvatarIcon from "shared/asset/Group 3.svg?react";
import MessageIcon from "shared/asset/Chat.svg?react";
import LinkIcon from "shared/asset/link-2.svg?react";
const CardUi: React.FC<ICard> = ({ children, title, elemId, widgets }) => {
  const { dispatch } = useMenu();
  const viewType = useSelector(selectView);
  const handleSideMenu = () => {
    dispatch(switchState({ isOpen: true, todoId: elemId }));
  };

  return (
    <motion.div
      className={cn({
        ["cardList"]: viewType === "List",
        ["cardBoard"]: viewType === "Board",
      })}
      onClick={handleSideMenu}
      transition={{ duration: 0.02 }}
      whileTap={{ scale: 1.01 }}
      whileDrag={{ rotateZ: 360 }}
    >
      <div className="flex justify-between">
        <div className="card__title">{title}</div>
      </div>
      <div className="card__box">{children}</div>
      {widgets && (
        <>
          <div className="flex justify-between px-4">
            <div>Tag</div>
            <AvatarIcon />
          </div>
          <div className="border-t-2 p-4 flex justify-between h-full items-center">
            <div className="flex items-center gap-3">
              <div className="flex gap-2 items-center text-gray-400">
                <MessageIcon />8
              </div>
              <div className="flex items-center text-gray-400">
                <LinkIcon /> 8
              </div>
            </div>

            <div className="flex gap-1 items-center ">
              <CalendarIcon />
              <Page color="gray" size="12px" weight="600">
                Calendar
              </Page>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CardUi;
