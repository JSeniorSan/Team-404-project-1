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
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import {
  IPanel,
  // IPatchTasksData,
  ITodo,
} from "shared/api/todoQueryApi/todoInterfaces";
// import onDragEnd from "shared/helpers/dnd/OnDragEnd";
import onDragOver from "shared/helpers/dnd/OnDragOver";
import onDragStart from "shared/helpers/dnd/OnDragStart";

type SetStateType<T> = (prevState: T) => T;
type SetActiveState<T> = (value: T | null) => void;

export interface IDndContext {
  children: React.ReactNode;
  setActivePanel: SetActiveState<IPanel>;
  setActiveTask: SetActiveState<ITodo>;
  setColums: (value: SetStateType<IPanel[]>) => void;
  setTasks: (value: SetStateType<ITodo[]>) => void;
  // patchTasks: any;
  tasks: ITodo[];
  activeTask: ITodo | null;
  todos: ITodo[];
}

const TodosDndContext: React.FC<IDndContext> = ({
  children,
  setActivePanel,
  setActiveTask,
  // patchTasks,
  activeTask,
  tasks,
  setColums,
  setTasks,
}) => {
  const [patchTasks] = todoApi.usePatchTasksPositionsMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  function dndOnDragStart(event: DragStartEvent) {
    onDragStart(event, setActivePanel, setActiveTask);
  }

  function dndOnDragOver(event: DragOverEvent) {
    onDragOver(event, activeTask, setTasks);
  }

  function dndOnDragEnd(event: DragEndEvent) {
    function onDragEnd(
      event: DragEndEvent,
      setActivePanel: SetActiveState<IPanel>,
      setActiveTask: SetActiveState<ITodo>,
      setColums: (value: SetStateType<IPanel[]>) => void,
      tasks: ITodo[]
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
        const overColumnIndex = colums.findIndex(
          (col) => col.id === overColumnId
        );

        return arrayMove(colums, activeColumnIndex, overColumnIndex);
      });
      console.log(tasks);
      async function patchTasksFn() {
        await patchTasks({
          tasks: tasks,
        });
      }
      patchTasksFn();
    }

    onDragEnd(event, setActivePanel, setActiveTask, setColums, tasks);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={dndOnDragStart}
      onDragEnd={dndOnDragEnd}
      onDragOver={dndOnDragOver}
    >
      {children}
    </DndContext>
  );
};

export default TodosDndContext;
