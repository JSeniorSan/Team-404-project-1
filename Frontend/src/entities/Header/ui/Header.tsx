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
import { useSelector } from "react-redux";
import { selectView } from "../../../shared/api/view/viewSliceSelector";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import { switchWidget } from "../../../shared/api/view/ViewSlice";
import { useNavigate } from "react-router-dom";
export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const viewState = useSelector(selectView);

  const handleListClick = () => {
    dispatch(switchWidget("List"));
    navigate("/dashboard/todos/list");
  };
  const handleBoardClick = () => {
    dispatch(switchWidget("Board"));
    navigate("/dashboard/todos/kanban");
  };

  return (
    <header className={cn("header", className)} {...props}>
      <div className="flex gap-4 items-center">
        <TodosMode
          title="List"
          className={cn({
            ["activeBlue"]: viewState === "List",
          })}
          onClick={handleListClick}
        >
          <ListLogo />
        </TodosMode>
        <TodosMode
          title="Board"
          className={cn({ ["activeBlue"]: viewState === "Board" })}
          onClick={handleBoardClick}
        >
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
