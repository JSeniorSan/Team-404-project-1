import React from "react";
import cn from "classnames";
import { ICard } from "./card.interface";
import "./index.scss";
import useMenu from "shared/hooks/useMenu";
import { motion } from "framer-motion";
import { switchState } from "widgets/rightWidgetMenu/model/MenuSlice";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import Page from "shared/ui/p/Page";
import CalendarIcon from "shared/asset/calendar.svg?react";
import AvatarIcon from "shared/asset/Group 3.svg?react";
import MessageIcon from "shared/asset/Chat.svg?react";
import LinkIcon from "shared/asset/link-2.svg?react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CardUi: React.FC<ICard> = ({ children, task, widgets }) => {
  const { dispatch } = useMenu();
  const viewType = useSelector(selectView);
  const handleSideMenu = () => {
    dispatch(switchState({ isOpen: true, todoId: task.id }));
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="w-60 h-[206.13px] border-2 border-blue-100 rounded-lg pt-5 gap-2 relative flex-shrink-0 flex-grow-0 bg-slate-100 "
      />
    );
  }

  return (
    <motion.div
      className={cn({
        ["cardList"]: viewType === "List",
        ["cardBoard"]: viewType === "Board",
      })}
      onClick={handleSideMenu}
      transition={{ duration: 0.1 }}
      whileTap={{ scale: 1.01 }}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="flex justify-between">
        <div className="card__title">{task.title}</div>
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
