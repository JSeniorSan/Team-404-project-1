import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";

import MainTitle from "../../shared/ui/mainTitle/MainTitle";
import NavElements from "../../entities/NavElements/NavElements";
import Worspaces from "../../features/workspaces/Workspaces";
import ThemeSwitcher from "../../features/themeSwitcher/ThemeSwitcher";

export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const NavPanel: React.FC<INavPanel> = ({ className, ...props }) => {
  return (
    <aside className={cn("navPanel", className)} {...props}>
      <MainTitle title="Kanban" />
      <NavElements />
      <Worspaces />
      <ThemeSwitcher />
    </aside>
  );
};

export default NavPanel;
