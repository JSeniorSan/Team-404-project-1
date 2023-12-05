import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

type SetStateType<T> = (prevState: T) => T;
type SetActiveState<T> = (value: T | null) => void;

export interface IDndContext {
  children: React.ReactNode;
  setActivePanel: SetActiveState<IPanel>;
  setActiveTask: SetActiveState<ITodo>;
  setColums: (value: SetStateType<IPanel[]>) => void;
  setTasks: (value: SetStateType<ITodo[]>) => void;
  activeTask: ITodo | null;
  todos: ITodo[];
}

const TodosDndContext: React.FC<IDndContext> = ({
  children,
  setActivePanel,
  setActiveTask,
  activeTask,
  setColums,
  setTasks,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    })
  );

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
    const activeColumnId = active.id;
    const overColumnId = over?.id;

    if (!over) return;
    if (!over) return;
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

    const isActiveTask = active?.data.current?.type === "Task";
    const isOverTask = over?.data.current?.type === "Task";
    const isOverAColumn = over?.data.current?.type === "Column";

    // I'm drag over a column
    if (isActiveTask && isOverAColumn) {
      setTasks((ts) => {
        const activeIndex = ts.findIndex((t) => t.id === activeId);
        const obj2 = { ...ts[activeIndex] };
        obj2.panel_id = overId as number;
        console.log("over", overId);

        ts[activeIndex] = obj2;
        return arrayMove(ts, activeIndex, activeIndex);
      });
    }

    // I'm drag over a task
    if (isActiveTask && isOverTask) {
      setTasks((ts) => {
        const activeIndex = ts.findIndex((t) => t.id === activeId);
        const overIndex = ts.findIndex((t) => t.id === overId);
        if (ts[activeIndex].panel_id !== ts[overIndex].panel_id) {
          const obj1 = { ...ts[activeIndex] };
          obj1.panel_id = ts[overIndex].panel_id;
          ts[activeIndex] = obj1;

          // вырезать позонно элементы и соединить с переносом старого значения вперед
        }

        console.log(activeIndex, overIndex, active);
        console.log(arrayMove(ts, activeIndex, overIndex));

        return arrayMove(ts, activeIndex, overIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {children}
    </DndContext>
  );
};

export default TodosDndContext;
