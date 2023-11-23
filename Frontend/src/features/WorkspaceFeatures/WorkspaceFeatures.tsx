import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import OptionsMenu from "shared/ui/optionsMenu/OptionsMenu";

export interface IWorkspaceFeatures {
  menu: boolean;
  workspaceId: number;
}
const WorkspaceFeatures: React.FC<IWorkspaceFeatures> = ({
  menu,
  workspaceId,
}) => {
  const [deleteWorkspace] = todoApi.useDeleteWorkspaceMutation();
  const handleDeleteWorkspace = async () => {
    await deleteWorkspace(workspaceId);
  };

  return (
    <OptionsMenu
      menu={menu}
      text="Delete"
      handleOnClick={handleDeleteWorkspace}
    />
  );
};

export default WorkspaceFeatures;
