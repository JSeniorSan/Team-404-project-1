import "./index.scss";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import Notification from "shared/asset/notification.svg?react";
import Message from "shared/asset/Chat.svg?react";
import UserIcon from "shared/asset/Group 3.svg?react";
import ListLogo from "shared/asset/fatrows.svg?react";
import TodosMode from "shared/ui/todosModeContainer/TodosMode";
import BoardLogo from "shared/asset/kanban.svg?react";
import Calendar from "shared/asset/calendar.svg?react";
import Glass from "shared/asset/search-normal.svg?react";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import { useAppDispatch } from "shared/api/redux-hooks";
import { switchWidget } from "shared/api/view/ViewSlice";
import { useNavigate } from "react-router-dom";
import UserMenu from "features/UserMenu/USerMenu";
import InputLeftElem from "shared/ui/input/addons/InputLeftElem";
export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const viewState = useSelector(selectView);
  const [userMenu, setUserMenu] = useState<boolean>(false);

  const handleListClick = () => {
    dispatch(switchWidget("List"));
    navigate("/dashboard/list");
  };
  const handleBoardClick = () => {
    dispatch(switchWidget("Board"));
    navigate("/dashboard/kanban");
  };
  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };
  useEffect(() => {
    dispatch(switchWidget("none"));
  }, [dispatch]);

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
        <InputLeftElem placeholder="Search..." type="search" elem={<Glass />} />

        <span>
          <Message />
        </span>
        <span>
          <Notification />
        </span>
        <span className="relative cursor-pointer">
          <UserIcon
            onClick={handleUserMenu}
            className="hover:border-green-400 border rounded-full"
          />
          <UserMenu menu={userMenu} />
        </span>
      </div>
    </header>
  );
};

export default Header;
