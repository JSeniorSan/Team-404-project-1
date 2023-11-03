import "../../app/index.scss";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import {
  IResponseAuth,
  todoApi,
} from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";
import NewTodo from "../../shared/ui/newTodo/NewTodo";
import LogoColors from "../../shared/asset/Frame 45.svg?react";
import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { modalWindowSelector } from "../../shared/api/todo/modalSelectors";
import { switchModalWindow } from "../../shared/api/todo/modalSlice";
import { Navigate } from "react-router-dom";
import { deleteCurrentUser } from "../../shared/api/user/UserSlice";
import { selectUser } from "../../shared/api/user/userSelectors";
import { useEffect } from "react";
export interface ICurrentUser extends IResponseAuth {}

function TodoTasks() {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);
  const modalStatus = useSelector(modalWindowSelector);
  // const [skip, setSkip] = useState<boolean>(true);

  const [getData, { data: todos, isFetching: isTodosFetching }] =
    todoApi.useLazyFetchAllTaskQuery();

  const user = {
    id: "",
    ...currentUser,
  };
  console.log(user);
  useEffect(() => {
    getData("");
  }, [getData]);

  const [deleteMeById] = todoApi.useDeleteMeByIdMutation();

  const [logout] = todoApi.useLogoutMutation();

  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  if (!Object.keys(currentUser).length) {
    return <Navigate to={"/account"} />;
  }
  console.log(user.id);

  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5">
        <Template className="template">
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
            {/* {isError && <h1>error</h1>} */}
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

      <FormCard className="modalWrapper" />
      <div className="fixed right-5 bottom-5 flex gap-2 items-center">
        <NewTodo onClick={createHandler} />
        <LogoColors />
      </div>
    </Wrapper>
  );
}

export default TodoTasks;
