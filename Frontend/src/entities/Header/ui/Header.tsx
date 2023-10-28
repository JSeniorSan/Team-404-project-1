import "./index.scss";
import cn from "classnames";
import ModalFormInput from "../../../shared/ui/modalFormInput/ModalFormInput";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import Notification from "../../../shared/asset/notification.svg?react";
import Message from "../../../shared/asset/Chat.svg?react";
import UserIcon from "../../../shared/asset/Group 3.svg?react";
import ListLogo from "../../../shared/asset/fatrows.svg?react";
import TodosMode from "../../../shared/ui/todosModeContainer/TodosMode";
import BoardLogo from "../../../shared/asset/kanban.svg?react";
import Calendar from "../../../shared/asset/calendar.svg?react";
import Glass from "../../../shared/asset/search-normal.svg?react";
export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  return (
    <header className={cn("header", className)} {...props}>
      <div className="flex gap-4 items-center">
        <TodosMode title="List">
          <ListLogo />
        </TodosMode>
        <TodosMode title="Board">
          <BoardLogo className="fill-gray-50" />
        </TodosMode>
        <TodosMode title="Calendar">
          <Calendar />
        </TodosMode>
      </div>
      <div className="flex gap-4 items-center">
        <ModalFormInput placeholder="Search..." type="search">
          <Glass />
        </ModalFormInput>
        <span>
          <Message />
        </span>
        <span>
          <Notification />
        </span>
        <span>
          <UserIcon />
        </span>
      </div>
    </header>
  );
};

export default Header;
