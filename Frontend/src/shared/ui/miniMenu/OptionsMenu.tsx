import "./index.scss";
import cn from "classnames";

export interface IMenuProps {
  menu: boolean;
  text: string;
  handleOnClick?: () => void;
}

const OptionsMenu: React.FC<IMenuProps> = ({ menu, text, handleOnClick }) => {
  return (
    <div
      className={cn("menu", {
        ["activeMenu"]: menu,
      })}
    >
      <div onClick={handleOnClick} className="cursor-pointer">
        {text}
      </div>
    </div>
  );
};

export default OptionsMenu;
