import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";
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
  tasks: ITodo[];
  activeTask: ITodo | null;
  todos: ITodo[];
}

const TodosDndContext: React.FC<IDndContext> = ({
  children,
  setActivePanel,
  setActiveTask,
  activeTask,
  tasks,
  setColums,
  setTasks,
}) => {
  const [patchPanelsPositions] = todoApi.usePatchPanelsPositionsMutation();

  async function patchTasksFn(cols: IPanel[]) {
    await patchPanelsPositions({
      panels: cols.map((val) => val.id),
      tasks: tasks,
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
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
    onDragEnd(event, setActivePanel, setActiveTask, setColums, patchTasksFn);
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
