import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import "./index.scss";
import OptionsMenu from "shared/ui/miniMenu/OptionsMenu";

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
    <OptionsMenu
      menu={menu}
      text="Delete panel"
      handleOnClick={handleDeletePanel}
    />
  );
};

export default PanelFeaturesCard;
