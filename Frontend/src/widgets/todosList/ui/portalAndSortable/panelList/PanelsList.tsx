import Template from "entities/Template/ui/Template";
import Panel from "features/panel/Panel";
import ListSection from "../../sections/ListSection";
import BoardSection from "../../sections/BoardSection";
import cn from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import React from "react";

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
        className={cn({
          ["border sm:w-[300px] w-[250px] h-96 opacity-90 rounded-lg mr-5 border-blue-200 flex-shrink-0 flex-grow-0 bg-slate-50"]:
            type === "board",
          ["lg:w-[calc(100vw-400px)] w-3/4 ml-12 flex-shrink-0 flex-grow-0 h-96 border-blue-200 bg-slate-50"]:
            type === "list",
        })}
        style={style}
      />
    );
  }

  return (
    <Template
      ref={setNodeRef}
      style={style}
      className={cn({
        ["md:w-[300px] w-[250px] h-96 backdrop-blur-md opacity-90 rounded-lg mr-5 shrink-0 overflow-y-auto overflow-x-hidden shadow-md  p-2"]:
          type === "board",
        ["lg:w-[calc(100vw-400px)] w-3/4 ml-12 flex-shrink-0 flex-grow-0 h-96 overflow-y-auto overflow-x-hidden border rounded-md"]:
          type === "list",
      })}
    >
      <Panel
        className={cn({
          ["flex justify-between pb-5 border-b-2 border-blue-200 rounded-sm items-center relative w-[250px] cursor-grab pr-5 "]:
            type === "board",
          ["lg:w-[calc(100vw-400px)] w-full flex relative justify-between gap-3 min-w-full border-blue-200 border-b-2 cursor-grab rounded-sm pb-5 flex-shrink-0 flex-grow-0 p-3 "]:
            type === "list",
        })}
        panelTitle={panel.name}
        todosCount={tasks.length}
        panelId={panel.id}
        {...attributes}
        {...listeners}
      />
      {type === "list" && <ListSection list={tasks} panelId={panel.id} />}
      {type === "board" && <BoardSection list={tasks} panelId={panel.id} />}
    </Template>
  );
};
export default PanelsList;

export interface IPanelList {
  panel: IPanel;
  type: string;
  tasks: ITodo[];
}
