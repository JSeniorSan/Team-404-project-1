import "./index.scss";
import TodosList from "../../../widgets/todosList/TodosList";
import { useSelector } from "react-redux";

import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import { selectWorkspaceData } from "../../../shared/api/user/userSelectors";
import WorkspaceHeader from "../../../entities/Workspace/title/WorksapceHeader";

function TodosPageList() {
  const workspaceId = useSelector(selectWorkspaceData);

  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();

  if (isKanbanFetch) {
    console.log(kanbanData);
  }

  useEffect(() => {
    getKanban(workspaceId);
  }, [getKanban, workspaceId]);

  return (
    <>
      {isKanbanFetch && <div>Loading...</div>}
      {!isKanbanFetch && kanbanData && (
        <div>
          <WorkspaceHeader kanbanData={kanbanData} />
          <TodosList kanbanData={kanbanData} />
        </div>
      )}
    </>
  );
}

export default TodosPageList;
