import "./index.scss";
import TodosList from "widgets/todosList/TodosList";
import { useSelector } from "react-redux";

import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import { selectUser, selectWorkspaceData } from "shared/api/user/userSelectors";
import WorkspaceHeader from "entities/Workspace/title/WorksapceHeader";
import { useNavigate } from "react-router-dom";
import SpinLoading from "shared/ui/spin/Spin";
import { selectView } from "shared/api/view/viewSliceSelector";
import TodosBoard from "widgets/todosBoard/TodosBoard";

function TodosPageList() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const workspaceId = useSelector(selectWorkspaceData);
  const pageState = useSelector(selectView);
  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();

  useEffect(() => {
    getKanban(workspaceId);
    if (!Object.keys(currentUser).length) {
      navigate("/account");
    }
  }, [getKanban, workspaceId, navigate, currentUser]);

  return (
    <>
      {isKanbanFetch && (
        <div className="w-full h-screen flex items-center justify-center">
          <SpinLoading />
        </div>
      )}
      {!isKanbanFetch && kanbanData && (
        <div className="list">
          <WorkspaceHeader kanbanData={kanbanData} />
          {pageState === "List" && <TodosList kanbanData={kanbanData} />}
          {pageState === "Board" && <TodosBoard />}
        </div>
      )}
    </>
  );
}

export default TodosPageList;
