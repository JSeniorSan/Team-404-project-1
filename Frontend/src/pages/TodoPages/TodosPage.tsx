import "./index.scss";
import { useSelector } from "react-redux";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import {
  selectEmpty,
  selectUser,
  selectWorkspaceData,
} from "shared/api/user/userSelectors";
import { useNavigate } from "react-router-dom";
import NewTodoComponent from "shared/ui/btns/addons/NewTodoBtn/NewTodoComponent";
import FormCard from "features/NewTodoModalWindow/FormTask";
import PageTitle from "widgets/titleListOrBoard/PageTitle";
import TodosWidget from "widgets/todosList/TodosWidget";
import Empty from "shared/ui/empty/Empty";

function TodosPage() {
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const workspaceId = useSelector(selectWorkspaceData);
  const isEmpty = useSelector(selectEmpty);
  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();

  useEffect(() => {
    getKanban(workspaceId);
    if (!Object.keys(currentUser).length) {
      navigate("/account");
    }
  }, [getKanban, workspaceId, navigate, currentUser, kanbanData]);

  return (
    <>
      {isEmpty && <Empty />}
      {!isEmpty && !isKanbanFetch && kanbanData && (
        <div className="todoPage">
          <PageTitle kanbanDataName={kanbanData.name} />
          <TodosWidget kanbanDataPanels={kanbanData.panels} />
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

export default TodosPage;
