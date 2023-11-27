import { useAppDispatch } from "shared/api/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { IWorkspaceData } from "shared/api/todoQueryApi/todoInterfaces";
import { addWorkspace } from "shared/api/user/UserSlice";
import OptionsMenu from "shared/ui/miniMenu/OptionsMenu";

export interface IWorkspaceFeatures {
  menu: boolean;
  workspaceId: number;
  allWorkspaces: IWorkspaceData[];
}
const WorkspaceDropMenu: React.FC<IWorkspaceFeatures> = ({
  menu,
  workspaceId,
  allWorkspaces,
}) => {
  // const [getKanbanData] = todoApi.useLazyGetKanbanQuery();
  const dispatch = useAppDispatch();
  const [deleteWorkspace] = todoApi.useDeleteWorkspaceMutation();
  const handleDeleteWorkspace = async () => {
    await deleteWorkspace(workspaceId);
    // await getKanbanData(allWorkspaces[allWorkspaces.length - 1].id);
    if (workspaceId !== allWorkspaces[allWorkspaces.length - 1].id) {
      dispatch(addWorkspace(allWorkspaces[allWorkspaces.length - 1].id));
    } else {
      dispatch(addWorkspace(allWorkspaces[allWorkspaces.length - 2].id));
    }
  };

  return (
    <OptionsMenu
      menu={menu}
      text="Delete"
      handleOnClick={handleDeleteWorkspace}
    />
  );
};

export default WorkspaceDropMenu;
