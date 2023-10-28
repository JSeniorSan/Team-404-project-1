import "./index.scss";
import cn from "classnames";
import ModalFormInput from "../../../shared/ui/modalFormInput/ModalFormInput";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IHeader
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Header: React.FC<IHeader> = ({ className, ...props }) => {
  return (
    <header className={cn("header", className)} {...props}>
      <div className="flex gap-4 items-center ">
        <div>
          <span>Logo</span>List
        </div>
        <div>
          <span>Logo</span>Board
        </div>
        <div>
          <span>Logo</span>Calendar
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <ModalFormInput placeholder="Search..." type="search" />
        <span>Message</span>
        <span>Notification</span>
        <span>UserIcon</span>
      </div>
    </header>
  );
};

export default Header;
