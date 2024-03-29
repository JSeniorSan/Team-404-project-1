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

import PageTitle from "widgets/titleListOrBoard/PageTitle";
import TodosWidget from "widgets/todosList/TodosWidget";
import Empty from "shared/ui/empty/Empty";
import FormCard from "features/NewTodoModalWindow/FormCard";
import { selectModalWindowState } from "./model/ModalWindowSelector";
import NewPanel from "shared/ui/btns/addons/NewTodoBtn/NewPanel";

function TodosPage() {
  const selectColumnModalId = useSelector(selectModalWindowState);
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const workspaceId = useSelector(selectWorkspaceData);
  const isEmpty = useSelector(selectEmpty);
  const [getKanban, { isFetching: isKanbanFetch, data: kanbanData }] =
    todoApi.useLazyGetKanbanQuery();

  useEffect(() => {
    const abortFetch = new AbortController();

    getKanban(workspaceId);
    if (!Object.keys(currentUser).length) {
      navigate("/account");
    }

    return () => {
      abortFetch.abort();
    };
  }, [getKanban, workspaceId, navigate, currentUser, kanbanData]);

  return (
    <>
      {isEmpty && <Empty />}
      {!isEmpty && !isKanbanFetch && !!kanbanData && (
        <div className="todoPage">
          <PageTitle kanbanDataName={kanbanData.name} />
          <TodosWidget
            kanbanDataPanels={kanbanData.panels}
            workspaceId={workspaceId}
          />
          <NewPanel />
          <FormCard columnId={selectColumnModalId} />
        </div>
      )}
    </>
  );
}

export default TodosPage;
