import "./index.scss";
import cn from "classnames";
import { DetailedHTMLProps, HTMLAttributes } from "react";

import LeftHeaderItems from "../../entities/LeftHeaderItems/LeftHeaderItems";
import RightHeaderItems from "../../entities/RightHeaderItems/RightHeaderItems";
export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  return (
    <header className={cn("header", className)} {...props}>
      <LeftHeaderItems />
      <RightHeaderItems />
    </header>
  );
};

export default Header;
