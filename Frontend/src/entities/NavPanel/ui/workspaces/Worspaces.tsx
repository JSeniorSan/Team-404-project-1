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

  const handleClickToWorkspace = async (id: number) => {
    dispatch(addWorkspace(id));
    if (template === "List") {
      navigate(`/dashboard/list/${id}`);
    }
    if (template === "Board") {
      navigate(`/dashboard/kanban/${id}`);
    }
    if (template === "none") {
      dispatch(switchWidget("List"));
      navigate(`/dashboard/list/${id}`);
    }
  };

  return (
    <div className="spaces">
      <CreateNew
        newWorkspace={newWorkspace}
        setNewWorkspace={setNewWorkspace}
      />
      {isWorkspacesFetching && <div>Loading...</div>}
      {!isWorkspacesFetching && (
        <ul className="spaces__list">
          {allWorkspaces?.map((name) => {
            return (
              <li key={name.id} onClick={() => handleClickToWorkspace(name.id)}>
                <Page color="black" size="16px" weight="700">
                  {name.name + " " + `id: ${name.id}`}
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
