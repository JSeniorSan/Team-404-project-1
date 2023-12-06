import { DragStartEvent } from "@dnd-kit/core";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export type SetActiveState<T> = (value: T | null) => void;

function onDragStart(
  event: DragStartEvent,
  setActivePanel: SetActiveState<IPanel>,
  setActiveTask: SetActiveState<ITodo>
) {
  if (event.active.data.current?.type === "Column") {
    setActivePanel(event.active.data.current?.panel);
  }
  if (event.active.data.current?.type === "Task") {
    setActiveTask(event.active.data.current?.task);
  }
}

export default onDragStart;
