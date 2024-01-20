import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";

import MainTitle from "../../shared/ui/mainTitle/MainTitle";
import NavElements from "../../entities/NavElements/NavElements";
import Worspaces from "../../features/workspaces/Workspaces";
import ThemeSwitcher from "../../features/themeSwitcher/ThemeSwitcher";
import { CloseIcon } from "@chakra-ui/icons";

export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isHide: boolean;
  setIsHide: (value: boolean) => void;
}

const NavPanel: React.FC<INavPanel> = ({
  isHide,
  setIsHide,
  className,
  ...props
}) => {
  return (
    <aside
      className={cn("navPanel", className, {
        ["hidden"]: isHide === true,
        ["block w-full h-screen"]: isHide === false,
      })}
      {...props}
    >
      <div className="md:hidden w-fit">
        <CloseIcon onClick={() => setIsHide(true)} />
      </div>
      <MainTitle title="Kanban" />
      <NavElements setIsHide={setIsHide} />
      <Worspaces setIsHide={setIsHide} />
      <ThemeSwitcher />
    </aside>
  );
};

export default NavPanel;
