import RightMenu from "widgets/rightWidgetMenu/RightMenu";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import cn from "classnames";
import "./index.scss";
import { useMemo, useState } from "react";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import PanelSortableContext from "./ui/portalAndSortable/PanelSortableContext";
import TodosDndContext from "./ui/TodosDndContext";
import PortalDragOverlay from "./ui/portalAndSortable/PortalDragOverlay";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
}

const TodosWidget: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  const tasksInPanels = kanbanDataPanels.map((panel) => panel.tasks);
  const todos = tasksInPanels?.flat();
  const [colums, setColums] = useState<IPanel[]>(kanbanDataPanels);
  const [tasks, setTasks] = useState<ITodo[]>(todos);
  const [activePanel, setActivePanel] = useState<IPanel | null>(null);
  const [activeTask, setActiveTask] = useState<ITodo | null>(null);

  const columsId = useMemo(() => colums.map((col) => col.id), [colums]);
  const viewType = useSelector(selectView);

  return (
    <div className="flex flex-col gap-5 h-full mb-3">
      <TodosDndContext
        activeTask={activeTask}
        setActivePanel={setActivePanel}
        setActiveTask={setActiveTask}
        setTasks={setTasks}
        setColums={setColums}
        todos={todos}
      >
        <div
          className={cn({
            ["listPanelsFormat"]: viewType === "List",
            ["boardPanelsFormat"]: viewType === "Board",
          })}
        >
          <PanelSortableContext
            columsId={columsId}
            colums={colums}
            tasks={tasks}
            viewType={viewType}
          />
          <RightMenu />
        </div>
        <PortalDragOverlay
          activePanel={activePanel}
          activeTask={activeTask}
          tasks={tasks}
          viewType={viewType}
        />
      </TodosDndContext>
    </div>
  );
};
export default TodosWidget;
