import Template from "features/Template/ui/Template";
import { IProps } from "entities/PageTitle/PageTitle";
import TaskTitle from "widgets/todosList/ui/TaskTitle";
import NewPanel from "features/NewPanel/NewPanel";
import ListSection from "./ui/ListSection";
import RightMenu from "entities/RightMenu/RightMenu";

const TodosList: React.FC<IProps> = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-5 h-fit mb-3">
      <div className="flex h-fit flex-col gap-10">
        {props.kanbanData.panels &&
          props.kanbanData.panels.map((panel) => {
            return (
              <Template className="template" key={panel.id}>
                <TaskTitle
                  panelTitle={panel.name}
                  todosCount={panel.tasks.length}
                  panelId={panel.id}
                />
                <ListSection list={panel.tasks} />
              </Template>
            );
          })}
        <NewPanel />
        <RightMenu />
      </div>
    </div>
  );
};
export default TodosList;
