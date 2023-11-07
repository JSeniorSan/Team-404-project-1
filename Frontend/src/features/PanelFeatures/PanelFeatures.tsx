import Page from "../../shared/ui/p/Page";
import "./index.scss";
import cn from "classnames";
export interface IMenuProps {
  menu: boolean;
}
const PanelFeaturesCard: React.FC<IMenuProps> = ({ menu }) => {
  return (
    <div
      className={cn("menu", {
        ["activeMenu"]: menu,
      })}
    >
      <Page color="black" size="14px" weight="500">
        Create task
      </Page>
      <Page color="black" size="14px" weight="500">
        Create task
      </Page>
      <Page color="black" size="14px" weight="500">
        Delete panel
      </Page>
    </div>
  );
};

export default PanelFeaturesCard;
