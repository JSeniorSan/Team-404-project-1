import "./index.scss";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import {
  IResponseAuth,
  todoApi,
} from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";

import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteCurrentUser } from "../../shared/api/user/UserSlice";
import { selectUser } from "../../shared/api/user/userSelectors";
import { useEffect } from "react";
import NewTodoComponent from "../../entities/NewTodo/NewTodoComponent";
export interface ICurrentUser extends IResponseAuth {}

function TodosList() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);

  const [getData, { data: todos, isFetching: isTodosFetching }] =
    todoApi.useLazyFetchAllTaskQuery();

  const user = {
    id: "",
    ...currentUser,
  };

  useEffect(() => {
    getData("");
  }, [getData, dispatch]);
  console.log(todos);

  const [deleteMeById] = todoApi.useDeleteMeByIdMutation();

  const [logout] = todoApi.useLogoutMutation();

  if (!Object.keys(currentUser).length) {
    return <Navigate to={"/account"} />;
  }

  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5">
        {/* Col logic */}

        <Template className="template">
          <div className="">TODO</div>
          <TodosContainer>
            <button
              className="border w-20 bg-slate-400"
              onClick={async () => {
                if (Object.keys(currentUser).length) {
                  await deleteMeById(user.id);
                }
                await logout(null);

                dispatch(deleteCurrentUser());
              }}
            >
              Unlogin
            </button>
            {isTodosFetching && <h1>Loading...</h1>}
            {!isTodosFetching &&
              todos?.map((el) => {
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
      <NewTodoComponent />
      <FormCard className="modalWrapper" />
    </Wrapper>
  );
}
export default TodosList;
