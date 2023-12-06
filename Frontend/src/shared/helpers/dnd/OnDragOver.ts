import { DragOverEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export type SetStateType<T> = (prevState: T) => T;

function onDragOver(
  event: DragOverEvent,
  activeTask: ITodo | null,
  setTasks: (value: SetStateType<ITodo[]>) => void
) {
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
      if (
        ts[activeIndex].panel_id !== ts[overIndex].panel_id &&
        activeIndex < overIndex
      ) {
        const obj1 = { ...ts[activeIndex] };
        obj1.panel_id = ts[overIndex].panel_id;
        ts[activeIndex] = obj1;
        const copyArray = [...ts];
        const startArray = copyArray.slice(0, activeIndex);
        const interval = copyArray.slice(activeIndex + 1, overIndex);
        const endArray = copyArray.slice(overIndex);
        const cuttedTodo = copyArray.slice(activeIndex, activeIndex + 1);

        return startArray.concat(interval, cuttedTodo, endArray);
      } else if (
        ts[activeIndex].panel_id !== ts[overIndex].panel_id &&
        activeIndex > overIndex
      ) {
        const obj1 = { ...ts[activeIndex] };
        obj1.panel_id = ts[overIndex].panel_id;
        ts[activeIndex] = obj1;
        const copyArray = [...ts];
        const cuttedTodo = copyArray.slice(activeIndex, activeIndex + 1);
        const interval = copyArray.slice(overIndex, activeIndex);
        const start = copyArray.slice(0, overIndex);
        const end = copyArray.slice(activeIndex + 1);

        return start.concat(cuttedTodo, interval, end);
      }

      return arrayMove(ts, activeIndex, overIndex);
    });
  }
}

export default onDragOver;
