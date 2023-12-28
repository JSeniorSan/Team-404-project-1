import { useAppDispatch } from "shared/hooks/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { IWorkspaceData } from "shared/api/todoQueryApi/todoInterfaces";
import { addWorkspace, setEmpty } from "shared/api/user/UserSlice";
import OptionsMenu from "shared/ui/miniMenu/OptionsMenu";
import { useNavigate } from "react-router-dom";
import { useLastPathname } from "shared/helpers/location/Location";

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
  const navigate = useNavigate();
  const pathname = useLastPathname();
  const [deleteWorkspace] = todoApi.useDeleteWorkspaceMutation();
  const handleDeleteWorkspace = async () => {
    await deleteWorkspace(workspaceId);

    if (workspaceId !== allWorkspaces[allWorkspaces.length - 1].id) {
      navigate(
        `/dashboard/${pathname}/${allWorkspaces[allWorkspaces.length - 1].name}`
      );
      dispatch(addWorkspace(allWorkspaces[allWorkspaces.length - 1].id));
    } else if (allWorkspaces.length === 1) {
      dispatch(setEmpty(true));
      navigate(`/dashboard/${pathname}/empty`);
    } else {
      dispatch(addWorkspace(allWorkspaces[allWorkspaces.length - 2].id));
      navigate(
        `/dashboard/${pathname}/${allWorkspaces[allWorkspaces.length - 2].name}`
      );
      console.log(
        `/dashboard/${pathname}/${allWorkspaces[allWorkspaces.length - 2].name}`
      );
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
