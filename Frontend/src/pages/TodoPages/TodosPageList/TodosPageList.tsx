import "./index.scss";
import TodosList from "../../../widgets/todosList/TodosList";
import { useSelector } from "react-redux";

import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import {
  selectUser,
  selectWorkspaceData,
} from "../../../shared/api/user/userSelectors";
import WorkspaceHeader from "../../../entities/Workspace/title/WorksapceHeader";
import { useNavigate } from "react-router-dom";

function TodosPageList() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const workspaceId = useSelector(selectWorkspaceData);

  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();

  useEffect(() => {
    getKanban(workspaceId);
    if (!Object.keys(currentUser).length) {
      navigate("/account");
    }
  }, [getKanban, workspaceId, navigate, currentUser]);

  if (isKanbanFetch) {
    console.log(kanbanData);
  }

  return (
    <>
      {isKanbanFetch && <div>Loading...</div>}
      {!isKanbanFetch && kanbanData && (
        <div className="list">
          <WorkspaceHeader kanbanData={kanbanData} />
          <TodosList kanbanData={kanbanData} />
        </div>
      )}
    </>
  );
}

export default TodosPageList;
