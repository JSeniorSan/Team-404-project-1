import RightMenu from "widgets/rightWidgetMenu/RightMenu";
import cn from "classnames";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import PanelSortableContext from "./ui/portalAndSortable/PanelSortableContext";
import TodosDndContext from "./ui/TodosDndContext";
import PortalDragOverlay from "./ui/portalAndSortable/PortalDragOverlay";
import { useLastPathname } from "shared/helpers/location/Location";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
  workspaceId: number;
}

const TodosWidget: React.FC<IPropsPanels> = ({
  kanbanDataPanels,
  workspaceId,
}) => {
  const tasksInPanels = kanbanDataPanels.map((panel) => panel.tasks);
  const todos = tasksInPanels?.flat();
  const [patchPanelsPositions] = todoApi.usePatchPanelsPositionsMutation();
  const [colums, setColums] = useState<IPanel[]>(kanbanDataPanels);
  const [tasks, setTasks] = useState<ITodo[]>(todos);
  const [activePanel, setActivePanel] = useState<IPanel | null>(null);
  const [activeTask, setActiveTask] = useState<ITodo | null>(null);
  const columsId = useMemo(() => colums.map((col) => col.id), [colums]);
  const pathname = useLastPathname();
  useEffect(() => {
    patchPanelsPositions({
      workspaceId: workspaceId,
      panels: colums,
    });
  }, [colums, patchPanelsPositions, workspaceId]);

  return (
    <div className="flex flex-col gap-5 h-full mb-3">
      <TodosDndContext
        todos={todos}
        setColums={setColums}
        activeTask={activeTask}
        setActivePanel={setActivePanel}
        setActiveTask={setActiveTask}
        setTasks={setTasks}
      >
        <div
          className={cn({
            ["listPanelsFormat"]: pathname === "list",
            ["boardPanelsFormat"]: pathname === "board",
          })}
        >
          <PanelSortableContext
            columsId={columsId}
            colums={colums}
            tasks={tasks}
            viewType={pathname}
          />
          <RightMenu />
        </div>
        <PortalDragOverlay
          activePanel={activePanel}
          activeTask={activeTask}
          tasks={tasks}
          viewType={pathname}
        />
      </TodosDndContext>
    </div>
  );
};
export default TodosWidget;
