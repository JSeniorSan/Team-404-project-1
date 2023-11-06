import "./index.scss";

import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";

import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteCurrentUser } from "../../shared/api/user/UserSlice";
import { selectUser } from "../../shared/api/user/userSelectors";

import NewTodoComponent from "../../entities/NewTodo/NewTodoComponent";
import { IProps } from "../../entities/Workspace/title/WorksapceHeader";

const TodosList: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);

  const user = {
    id: "",
    ...currentUser,
  };

  const [deleteMeById] = todoApi.useDeleteMeByIdMutation();

  const [logout] = todoApi.useLogoutMutation();

  if (!Object.keys(currentUser).length) {
    return <Navigate to={"/account"} />;
  }
  console.log(props.kanbanData.panels);

  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5">
        {props.kanbanData.panels &&
          props.kanbanData.panels.map((panel) => {
            return (
              <Template className="template" key={panel.id}>
                <div className="">{panel.name}</div>
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
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                  <div>1</div>
                </TodosContainer>
              </Template>
            );
          })}
      </Wrapper>
      <NewTodoComponent />
      <FormCard className="modalWrapper" />
    </Wrapper>
  );
};
export default TodosList;
