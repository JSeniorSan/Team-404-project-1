import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";
export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const NavPanel: React.FC<INavPanel> = ({ className, ...props }) => {
  return (
    <aside className={cn("navPanel", className)} {...props}>
      <div className="mainTitle">Title</div>
      <div className="navig">Nav</div>
      <div className="spaces">Spaces</div>
      <div className="theme">Theme</div>
    </aside>
  );
};

export default NavPanel;
