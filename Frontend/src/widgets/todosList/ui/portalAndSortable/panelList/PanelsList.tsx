import Template from "entities/Template/ui/Template";
import Panel from "features/panel/Panel";
import ListSection from "../../sections/ListSection";
import BoardSection from "../../sections/BoardSection";
import cn from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export interface IPanelList {
  panel: IPanel;
  type: string;
  tasks: ITodo[];
}

const PanelsList: React.FC<IPanelList> = ({ panel, type, tasks }) => {
  const {
    setNodeRef,
    transform,
    transition,
    attributes,
    listeners,
    isDragging,
  } = useSortable({
    id: panel.id,
    data: {
      type: "Column",
      panel,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn({
          ["border w-[250px] min-h-full h-fit opacity-90 rounded-lg mr-5 border-blue-200 flex-shrink-0 flex-grow-0 bg-slate-50"]:
            type === "Board",
        })}
      />
    );
  }

  return (
    <Template
      ref={setNodeRef}
      style={style}
      className={cn({
        ["w-[250px] min-h-full h-full backdrop-blur-md opacity-90 rounded-lg mr-5"]:
          type === "Board",
        ["w-[calc(100vw-400px)]  ml-12 flex-shrink-0 flex-grow-0"]:
          type === "List",
      })}
    >
      <Panel
        className={cn({
          ["flex justify-between pb-5 border-b-2 border-blue-200 rounded-sm items-center relative w-[250px] cursor-grab"]:
            type === "Board",
          ["w-[calc(100vw-400px)] flex relative justify-between gap-3 min-w-full border-blue-200 border-b-2 cursor-grab rounded-sm pb-5 flex-shrink-0 flex-grow-0"]:
            type === "List",
        })}
        panelTitle={panel.name}
        todosCount={tasks.length}
        panelId={panel.id}
        {...attributes}
        {...listeners}
      />
      {type === "List" && <ListSection list={tasks} panelId={panel.id} />}
      {type === "Board" && <BoardSection list={tasks} panelId={panel.id} />}
    </Template>
  );
};

export default PanelsList;
