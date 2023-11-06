import { useEffect, useState } from "react";
import { todoApi } from "../../../../shared/api/todoQueryApi/TodoServise";
import Page from "../../../../shared/ui/p/Page";
import CreateNew from "./createNew/CreateNew";
import { useAppDispatch } from "../../../../shared/api/redux-hooks";
import { addWorkspace } from "../../../../shared/api/user/UserSlice";
const Worspaces = () => {
  const dispatch = useAppDispatch();

  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();
  const [
    getWorkspaces,
    { isFetching: isWorkspacesFetching, data: allWorkspaces },
  ] = todoApi.useLazyGetAllWorkspacesQuery();

  useEffect(() => {
    getWorkspaces("");
  }, [getWorkspaces]);

  if (!isWorkspacesFetching) {
    console.log(allWorkspaces);
  }

  const [newWorkspace, setNewWorkspace] = useState<boolean>(false);

  const handleClickToWorkspace = async (id: number) => {
    await getKanban(id);
  };

  useEffect(() => {
    if (kanbanData) {
      dispatch(addWorkspace(kanbanData));
      console.log(kanbanData);
    }
  }, [isKanbanFetch, kanbanData, dispatch]);

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
