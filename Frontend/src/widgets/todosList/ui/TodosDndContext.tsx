import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  IPanel,
  IPatchTasksData,
  ITodo,
} from "shared/api/todoQueryApi/todoInterfaces";
import onDragEnd from "shared/helpers/dnd/OnDragEnd";
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
  patchTasks: (value: IPatchTasksData) => void;
  tasks: ITodo[];
  activeTask: ITodo | null;
  todos: ITodo[];
}

const TodosDndContext: React.FC<IDndContext> = ({
  children,
  setActivePanel,
  setActiveTask,
  patchTasks,
  activeTask,
  tasks,
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

  function dndOnDragStart(event: DragStartEvent) {
    onDragStart(event, setActivePanel, setActiveTask);
  }

  function dndOnDragOver(event: DragOverEvent) {
    onDragOver(event, activeTask, setTasks);
  }

  function dndOnDragEnd(event: DragEndEvent) {
    onDragEnd(
      event,
      setActivePanel,
      setActiveTask,
      setColums,
      tasks,
      patchTasks
    );
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
