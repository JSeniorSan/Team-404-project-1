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
    getWorkspaces("");

    if (allWorkspaces?.length !== 0 && typeof allWorkspaces !== "undefined") {
      dispatch(setMaxId(allWorkspaces[allWorkspaces.length - 1].id));
    }
  }, [getWorkspaces, template, dispatch, allWorkspaces]);
  console.log(allWorkspaces);

  return (
    <div className="spaces">
      <CreateNew />
      {errWork && <p>error</p>}
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((name) => {
            return (
              <Workspace
                id={name.id}
                name={name.name}
                key={name.id}
                color={name.hex ? name.hex : "#aabbcc"}
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
