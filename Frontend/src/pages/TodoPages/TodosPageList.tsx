import "./index.scss";
import TodosList from "widgets/todosList/TodosList";
import { useSelector } from "react-redux";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import { selectUser, selectWorkspaceData } from "shared/api/user/userSelectors";
import { useNavigate } from "react-router-dom";
import SpinLoading from "shared/ui/spin/Spin";
import { selectView } from "shared/api/view/viewSliceSelector";
import TodosBoard from "widgets/todosBoard/TodosBoard";
import NewTodoComponent from "entities/NewTodo/NewTodoComponent";
import FormCard from "entities/FormTask/ui/FormTask";
import PageTitle from "entities/PageTitle/PageTitle";

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
      {isKanbanFetch && <SpinLoading />}
      {!isKanbanFetch && kanbanData && (
        <div className="list">
          <PageTitle kanbanData={kanbanData} />
          {pageState === "List" && <TodosList kanbanData={kanbanData} />}
          {pageState === "Board" && <TodosBoard />}
          <NewTodoComponent />
          <FormCard
            id={
              kanbanData.panels[0] ? kanbanData.panels[0].id?.toString() : "1"
            }
          />
        </div>
      )}
    </>
  );
}

export default TodosPageList;
