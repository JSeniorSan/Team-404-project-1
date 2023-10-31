import "../../app/index.scss";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";
import NewTodo from "../../shared/ui/newTodo/NewTodo";
import LogoColors from "../../shared/asset/Frame 45.svg?react";
import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { modalWindowSelector } from "../../shared/api/todo/modalSelectors";
import { switchModalWindow } from "../../shared/api/todo/modalSlice";

function TodoTasks() {
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = todoApi.useFetchAllTaskQuery("");
  console.log(todos);

  const dispatch = useAppDispatch();

  const modalStatus = useSelector(modalWindowSelector);

  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  const [unlogout] = todoApi.useLogoutMutation();

  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5">
        <Template className="template">
          <TodosContainer>
            <button
              className="border w-20 bg-slate-400"
              onClick={async () => {
                await unlogout(null);
              }}
            >
              Unlogin
            </button>
            {isLoading && <h1>Loading...</h1>}
            {isError && <h1>error</h1>}
            {isSuccess &&
              todos.map((el) => {
                return (
                  <CardVisual
                    idElem={el.id}
                    key={Math.random()}
                    title={el.title}
                    description={el.description}
                  />
                );
              })}
          </TodosContainer>
        </Template>
      </Wrapper>

      <FormCard className="modalWrapper" />
      <div className="fixed right-5 bottom-5 flex gap-2 items-center">
        <NewTodo onClick={createHandler} />
        <LogoColors />
      </div>
    </Wrapper>
  );
}

export default TodoTasks;
