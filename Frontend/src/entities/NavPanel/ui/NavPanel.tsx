import { DetailedHTMLProps, HTMLAttributes } from "react";
import "./index.scss";
import cn from "classnames";
export interface INavPanel
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const NavPanel: React.FC<INavPanel> = ({ className, ...props }) => {
  return (
    <aside className={cn("navPanel", className)} {...props}>
      <div className="mainTitle">Title</div>
      <div>Nav</div>
      <div>Spaces</div>
      <div>Theme</div>
    </aside>
  );
};

export default NavPanel;
