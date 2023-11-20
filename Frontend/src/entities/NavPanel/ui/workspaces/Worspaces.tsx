import { useEffect, useState } from "react";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import CreateNew from "./createNew/CreateNew";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import SpinLoading from "shared/ui/spin/Spin";
import Workspace from "./workspace/Workspace";
const Worspaces = () => {
  const [newWorkspace, setNewWorkspace] = useState<boolean>(false);
  const template = useSelector(selectView);
  const [
    getWorkspaces,
    { isFetching: isWorkspacesFetching, data: allWorkspaces },
  ] = todoApi.useLazyGetAllWorkspacesQuery();
  useEffect(() => {
    getWorkspaces("");
  }, [getWorkspaces, template]);

  if (!isWorkspacesFetching) {
    console.log(allWorkspaces);
  }

  return (
    <div className="spaces">
      <CreateNew
        newWorkspace={newWorkspace}
        setNewWorkspace={setNewWorkspace}
        allWorkspaces={allWorkspaces}
      />
      {isWorkspacesFetching && <SpinLoading />}
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((name) => {
            return <Workspace id={name.id} name={name.name} key={name.id} />;
          })}
        </ul>
      )}
    </div>
  );
};

export default Worspaces;
