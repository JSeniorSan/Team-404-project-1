import { useEffect } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "../createNewWorkspace/CreateNew";
import Workspace from "../../entities/workspace/Workspace";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { setMaxId } from "shared/api/user/UserSlice";

const Workspaces = () => {
  const dispatch = useAppDispatch();

  const [getWorkspaces, { isFetching, data: allWorkspaces, isError: errWork }] =
    todoApi.useLazyGetAllWorkspacesQuery();

  useEffect(() => {
    getWorkspaces(undefined);

    console.log("fetching", isFetching);

    // async function getWorkspace() {
    //   const fetchingData = await fetch("http://127.0.0.1:8000/workspace/");
    //   const data = await fetchingData.json();
    //   return data;
    // }
    // const info = getWorkspace();
    // console.log(info);

    if (allWorkspaces?.length !== 0 && typeof allWorkspaces !== "undefined") {
      dispatch(setMaxId(allWorkspaces[allWorkspaces.length - 1].id));
    }
  }, [allWorkspaces]);

  return (
    <div className="spaces">
      <CreateNew />
      {errWork && <p>error</p>}
      {!isFetching && (
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
