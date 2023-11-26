import { useEffect } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "../createNewWorkspace/CreateNew";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import Workspace from "../../entities/workspace/Workspace";
const Workspaces = () => {
  const template = useSelector(selectView);
  const [
    getWorkspaces,
    { isFetching: isWorkspacesFetching, data: allWorkspaces },
  ] = todoApi.useLazyGetAllWorkspacesQuery();
  useEffect(() => {
    getWorkspaces("");
  }, [getWorkspaces, template]);

  return (
    <div className="spaces">
      <CreateNew />
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((name) => {
            return (
              <Workspace
                id={name.id}
                name={name.name}
                key={name.id}
                color={name.hex ? name.hex : "#aabbcc"}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Workspaces;
