import "./index.scss";

import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";

import { useAppDispatch } from "../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { deleteCurrentUser } from "../../shared/api/user/UserSlice";
import { selectUser } from "../../shared/api/user/userSelectors";

import NewTodoComponent from "../../entities/NewTodo/NewTodoComponent";
import { IProps } from "../../entities/Workspace/title/WorksapceHeader";
import TaskTitle from "../../entities/TaskTitle/TaskTitle";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";

const TodosList: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectUser);

  const user = {
    id: "",
    ...currentUser,
  };

  const [deleteMeById] = todoApi.useDeleteMeByIdMutation();

  const [logout] = todoApi.useLogoutMutation();

  return (
    <Wrapper className="wrapper">
      <button
        className="border w-20 bg-slate-400 ml-12"
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
      <Wrapper className="flex gap-5 h-fit">
        {props.kanbanData.panels &&
          props.kanbanData.panels.map((panel) => {
            return (
              <Template className="template" key={panel.id}>
                <TaskTitle
                  panelTitle={panel.name}
                  todosCount={panel.tasks.length}
                />
                <TodosContainer>
                  {panel.tasks.map((task) => {
                    return (
                      <CardVisual
                        title={task.title}
                        description={task.description}
                        idElem={task.id}
                        key={task.id}
                      />
                    );
                  })}
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
