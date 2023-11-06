import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";

import MainTitle from "./mainTitle/MainTitle";
import NavElements from "./navElements/NavElements";
import Worspaces from "./workspaces/Worspaces";
import ThemeSwitcher from "./themeSwitcher/ThemeSwitcher";

export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const NavPanel: React.FC<INavPanel> = ({ className, ...props }) => {
  return (
    <aside className={cn("navPanel", className)} {...props}>
      <MainTitle />
      <NavElements />
      <Worspaces />
      <ThemeSwitcher />
    </aside>
  );
};

export default NavPanel;
