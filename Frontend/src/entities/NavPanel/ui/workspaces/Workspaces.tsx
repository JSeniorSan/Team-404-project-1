import { useEffect } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "./createNew/CreateNew";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import SpinLoading from "shared/ui/spin/Spin";
import Workspace from "./workspace/Workspace";
const Workspaces = () => {
  const template = useSelector(selectView);
  const [
    getWorkspaces,
    { isFetching: isWorkspacesFetching, data: allWorkspaces },
  ] = todoApi.useLazyGetAllWorkspacesQuery();
  useEffect(() => {
    getWorkspaces("");
  }, [getWorkspaces, template]);
  console.log(allWorkspaces);

  return (
    <div className="spaces">
      <CreateNew />
      {isWorkspacesFetching && <SpinLoading />}

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
