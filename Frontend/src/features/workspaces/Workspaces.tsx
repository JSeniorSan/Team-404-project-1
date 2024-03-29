import { useEffect } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "../createNewWorkspace/CreateNew";
import Workspace from "../../entities/workspace/Workspace";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { setEmpty, setMaxId } from "shared/api/user/UserSlice";

const Workspaces = ({ setIsHide }: { setIsHide: (value: boolean) => void }) => {
  const dispatch = useAppDispatch();

  const [getWorkspaces, { isFetching, data: allWorkspaces, isError: errWork }] =
    todoApi.useLazyGetAllWorkspacesQuery();

  useEffect(() => {
    getWorkspaces(null);
    if (allWorkspaces?.length !== 0 && typeof allWorkspaces !== "undefined") {
      dispatch(setMaxId(allWorkspaces[allWorkspaces.length - 1].id));
    }
  }, [allWorkspaces, dispatch, getWorkspaces]);

  function handleClick() {
    dispatch(setEmpty(false));
  }

  return (
    <div className="spaces">
      <CreateNew />
      {errWork && <p>error</p>}
      {!isFetching && (
        <ul className="spaces__list" onClick={handleClick}>
          {allWorkspaces?.map((workspace) => {
            return (
              <Workspace
                id={workspace.id}
                name={workspace.name}
                key={workspace.id}
                color={workspace.hex}
                allWorkspaces={allWorkspaces}
                setIsHide={setIsHide}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Workspaces;
