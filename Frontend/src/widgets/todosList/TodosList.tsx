import "./index.scss";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import NewTodoComponent from "../../entities/NewTodo/NewTodoComponent";
import { IProps } from "../../entities/Workspace/title/WorksapceHeader";
import TaskTitle from "../../entities/TaskTitle/TaskTitle";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import FormCard from "../../entities/FormTask/ui/FormTask";
import NewPanel from "../../features/NewPanel/NewPanel";

const TodosList: React.FC<IProps> = ({ ...props }) => {
  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5 h-fit ">
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
        <NewPanel />
      </Wrapper>
      <NewTodoComponent />
      <FormCard
        className="modalWrapper"
        id={
          props.kanbanData.panels[0]
            ? props.kanbanData.panels[0].id?.toString()
            : // Пофиксить
              "1"
        }
      />
    </Wrapper>
  );
};
export default TodosList;
