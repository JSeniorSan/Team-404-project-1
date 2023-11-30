import { useAppDispatch } from "shared/api/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { IWorkspaceData } from "shared/api/todoQueryApi/todoInterfaces";
import { addWorkspace, setEmpty } from "shared/api/user/UserSlice";
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
  const dispatch = useAppDispatch();
  const [deleteWorkspace] = todoApi.useDeleteWorkspaceMutation();
  const handleDeleteWorkspace = async () => {
    await deleteWorkspace(workspaceId);

    if (workspaceId !== allWorkspaces[allWorkspaces.length - 1].id) {
      dispatch(addWorkspace(allWorkspaces[allWorkspaces.length - 1].id));
    } else if (allWorkspaces.length === 1) {
      console.log("0");
      dispatch(setEmpty(true));
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
