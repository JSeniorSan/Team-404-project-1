import RightMenu from "widgets/rightWidgetMenu/RightMenu";
import { useSelector } from "react-redux";
import { selectView } from "shared/api/view/viewSliceSelector";
import cn from "classnames";
import "./index.scss";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useMemo, useState } from "react";
import PanelsList from "./ui/PanelsList";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { createPortal } from "react-dom";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import CardUi from "entities/card/ui/CardUi";

export interface IPropsPanels {
  kanbanDataPanels: IPanel[];
}

const TodosWidget: React.FC<IPropsPanels> = ({ kanbanDataPanels }) => {
  console.log("panels", kanbanDataPanels);

  const [colums, setColums] = useState<IPanel[]>(kanbanDataPanels);
  const tasksInPanels = kanbanDataPanels.map((panel) => panel.tasks);
  const todos = tasksInPanels?.flat();
  console.log("todos", todos);

  const [tasks, setTasks] = useState<ITodo[]>(todos);
  console.log("tasks", tasks);

  const [activePanel, setActivePanel] = useState<IPanel | null>(null);
  const [activeTask, setActiveTask] = useState<ITodo | null>(null);
  const columsId = useMemo(() => colums.map((col) => col.id), [colums]);
  const viewType = useSelector(selectView);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActivePanel(event.active.data.current?.panel);
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActivePanel(null);
    setActiveTask(null);

    const { over, active } = event;
    if (!over) return;
    const activeColumnId = active.id;
    const overColumnId = over?.id;

    if (activeColumnId === overColumnId) return;

    setColums((colums) => {
      const activeColumnIndex = colums.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = colums.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(colums, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { over, active } = event;
    const activeId = active?.id;
    const overId = over?.id;
    if (!over) return;
    if (activeId === overId) return;
    if (!activeTask) return;

    const isActiveTask = event.active?.data.current?.type === "Task";
    const isOverTask = event.over?.data.current?.type === "Task";

    // I'm drag over task
    if (isActiveTask && isOverTask) {
      setTasks((ts) => {
        const activeIndex = ts.findIndex((t) => t.id === activeId);
        const overIndex = ts.findIndex((t) => t.id === overId);
        const obj1 = { ...ts[activeIndex] };
        obj1.panel_id = ts[overIndex].panel_id;
        ts[activeIndex] = obj1;
        return arrayMove(ts, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over?.data.current?.type === "Column";

    // I'm drag over column
    if (isActiveTask && isOverAColumn) {
      setTasks((ts) => {
        const activeIndex = ts.findIndex((t) => t.id === activeId);
        const obj2 = { ...ts[activeIndex] };
        obj2.panel_id = overId as number;
        ts[activeIndex] = obj2;
        return arrayMove(ts, activeIndex, activeIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  return (
    <div className="flex flex-col gap-5 h-full mb-3">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div
          className={cn({
            ["listPanelsFormat"]: viewType === "List",
            ["boardPanelsFormat"]: viewType === "Board",
          })}
        >
          <SortableContext items={columsId}>
            {colums &&
              colums.map((panel) => {
                const filt = tasks.filter((ts) => {
                  return ts.panel_id == panel.id;
                });

                return (
                  <PanelsList
                    panel={panel}
                    type={viewType}
                    key={panel.id}
                    tasks={filt}
                  />
                );
              })}
          </SortableContext>
          <RightMenu />
        </div>
        {createPortal(
          <DragOverlay>
            {activePanel && (
              <PanelsList
                panel={activePanel}
                type={viewType}
                tasks={tasks.filter((ts) => ts.panel_id === activePanel.id)}
              />
            )}
            {activeTask && (
              <CardUi task={activeTask} widgets={true}>
                {activeTask.description}
              </CardUi>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};
export default TodosWidget;
