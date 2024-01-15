import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  IPanel,
  // IPatchTasksData,
  ITodo,
} from "shared/api/todoQueryApi/todoInterfaces";

type SetStateType<T> = (prevState: T) => T;
type SetActiveState<T> = (value: T | null) => void;

function onDragEnd(
  event: DragEndEvent,
  setActivePanel: SetActiveState<IPanel>,
  setActiveTask: SetActiveState<ITodo>,
  setColums: (value: SetStateType<IPanel[]>) => void,
  tasks: ITodo[]
  // patchTasks: any
) {
  const { over, active } = event;
  if (!over) return;
  setActivePanel(null);
  setActiveTask(null);

  const activeColumnId = active.id;
  const overColumnId = over?.id;

  // if (activeColumnId === overColumnId) return;

  setColums((colums) => {
    const activeColumnIndex = colums.findIndex(
      (col) => col.id === activeColumnId
    );
    const overColumnIndex = colums.findIndex((col) => col.id === overColumnId);

    return arrayMove(colums, activeColumnIndex, overColumnIndex);
  });
  console.log(tasks);
  //   async function patchTasksFn() {
  //     await patchTasks({
  //       tasks: tasks,
  //     });
  //   }
  //   patchTasksFn();
}

export default onDragEnd;
