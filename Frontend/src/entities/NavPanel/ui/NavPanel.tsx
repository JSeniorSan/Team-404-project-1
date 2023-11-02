import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";
import Logo from "../../../shared/asset/Group 1.svg?react";
import Home from "../../../shared/asset/home-2.svg?react";
import Tasks from "../../../shared/asset/tasks.svg?react";
import Cup from "../../../shared/asset/cup.svg?react";
import Members from "../../../shared/asset/profile-2user.svg?react";
import Plus from "../../../shared/asset/Plus.svg?react";

import TodosMode from "../../../shared/ui/todosModeContainer/TodosMode";
import { useNavigate } from "react-router-dom";
export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const NavPanel: React.FC<INavPanel> = ({ className, ...props }) => {
  const navigate = useNavigate();
  const handleClickHome = () => {
    return navigate("/Home");
  };
  return (
    <aside className={cn("navPanel", className)} {...props}>
      <div className="mainTitle" onClick={handleClickHome}>
        <Logo height={50} width={50} />
        Canban
      </div>
      <div className="navig">
        <TodosMode title="Home">
          <Home />
        </TodosMode>
        <TodosMode title="My Tasks">
          <Tasks />
        </TodosMode>
        <TodosMode title="Goals">
          <Cup />
        </TodosMode>
        <TodosMode title="Members">
          <Members />
        </TodosMode>
      </div>
      <div className="spaces">
        <div className="spaces__title">
          WORKSPACE
          <Plus />
        </div>
        <div className="spaces__list">Wevsite Design</div>
      </div>
      <div className="theme">Theme</div>
    </aside>
  );
};

export default NavPanel;
