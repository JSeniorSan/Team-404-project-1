import { useEffect } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "../createNewWorkspace/CreateNew";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import Workspace from "../../entities/workspace/Workspace";
import { useAppDispatch } from "shared/api/redux-hooks";
import { setMaxId } from "shared/api/user/UserSlice";

const Workspaces = () => {
  const template = useSelector(selectView);
  const dispatch = useAppDispatch();

  const [
    getWorkspaces,
    { isFetching: isWorkspacesFetching, data: allWorkspaces, isError: errWork },
  ] = todoApi.useLazyGetAllWorkspacesQuery();
  useEffect(() => {
    getWorkspaces(null);
    console.log(allWorkspaces);

    if (allWorkspaces?.length !== 0 && typeof allWorkspaces !== "undefined") {
      dispatch(setMaxId(allWorkspaces[allWorkspaces.length - 1].id));
    }
  }, [getWorkspaces, template, dispatch, allWorkspaces]);
  console.log("all workspaces", allWorkspaces);
  console.log("err", errWork);
  console.log("fetching", isWorkspacesFetching);

  return (
    <div className="spaces">
      <CreateNew />
      {errWork && <p>error</p>}
      {isWorkspacesFetching && <p>LOADING</p>}
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((workspace) => {
            return (
              <Workspace
                id={workspace.id}
                name={workspace.name}
                key={workspace.id}
                color={workspace.hex}
                allWorkspaces={allWorkspaces}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Workspaces;
