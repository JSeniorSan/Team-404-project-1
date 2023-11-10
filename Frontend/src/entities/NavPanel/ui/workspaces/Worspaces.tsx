import { useEffect, useState } from "react";
import { todoApi } from "../../../../shared/api/todoQueryApi/TodoServise";
import Page from "../../../../shared/ui/p/Page";
import CreateNew from "./createNew/CreateNew";
import { useAppDispatch } from "../../../../shared/api/redux-hooks";
import { addWorkspace } from "../../../../shared/api/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectView } from "../../../../shared/api/view/viewSliceSelector";
import { switchWidget } from "../../../../shared/api/view/ViewSlice";
import SpinLoading from "../../../../shared/ui/spin/Spin";
const Worspaces = () => {
  const dispatch = useAppDispatch();
  const template = useSelector(selectView);
  const navigate = useNavigate();

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

  const [newWorkspace, setNewWorkspace] = useState<boolean>(false);

  const handleClickToWorkspace = async (id: number, name: string) => {
    const optimizationString = name.split(" ").join("");
    dispatch(addWorkspace(id));
    if (template === "List") {
      navigate(`/dashboard/list/${optimizationString}`);
    }
    if (template === "Board") {
      navigate(`/dashboard/kanban/${optimizationString}`);
    }
    if (template === "none") {
      dispatch(switchWidget("List"));
      navigate(`/dashboard/list/${optimizationString}`);
    }
  };

  return (
    <div className="spaces">
      <CreateNew
        newWorkspace={newWorkspace}
        setNewWorkspace={setNewWorkspace}
      />
      {isWorkspacesFetching && <SpinLoading />}
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((name) => {
            return (
              <li
                key={name.id}
                onClick={() => handleClickToWorkspace(name.id, name.name)}
              >
                <Page color="black" size="16px" weight="500">
                  {name.name}
                </Page>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Worspaces;
