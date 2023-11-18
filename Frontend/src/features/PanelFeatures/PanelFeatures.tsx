import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import "./index.scss";
import cn from "classnames";
export interface IMenuProps {
  menu: boolean;
  panelId: number;
}
const PanelFeaturesCard: React.FC<IMenuProps> = ({ menu, panelId }) => {
  const [deletePanel] = todoApi.useDeletePanelMutation();

  const handleDeletePanel = async () => {
    await deletePanel(panelId);
  };

  return (
    <div
      className={cn("menu", {
        ["activeMenu"]: menu,
      })}
    >
      <div>Create task</div>
      <div>Create task</div>
      <div onClick={handleDeletePanel} className="cursor-pointer">
        Delete panel
      </div>
    </div>
  );
};

export default PanelFeaturesCard;
