import RightMenu from "entities/RightMenu/RightMenu";
import NewPanel from "features/NewPanel/NewPanel";
import Template from "features/Template/ui/Template";
// import DragCard from "shared/ui/DragCard/DragCard";
import { IPropsPanels } from "widgets/todosList/TodosWidget";
import Panel from "widgets/todosList/ui/Panel";
import BoardSection from "./ui/BoardSection";

const TodosBoard: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  return (
    <div className="flex gap-5 h-fit mb-3">
      <div className="flex h-fit gap-10">
        {kanbanDataPanels &&
          kanbanDataPanels.map((panel) => {
            return (
              <Template
                className="flex flex-col justify-center items-start px-12 w-fit h-fit"
                key={panel.id}
              >
                <Panel
                  className="flex justify-between pb-5 border-b-2 rounded-sm border-gray-50 items-center gap-5 relative"
                  panelTitle={panel.name}
                  todosCount={panel.tasks.length}
                  panelId={panel.id}
                />
                <BoardSection list={panel.tasks} />
              </Template>
            );
          })}
        <NewPanel />
        <RightMenu />
        {/* <DragCard title={} description={}/> */}
      </div>
    </div>
  );
};

export default TodosBoard;
