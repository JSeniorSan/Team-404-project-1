import { SortableContext } from "@dnd-kit/sortable";
import CardUi from "entities/card/ui/CardUi";
import React from "react";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import NewTask from "shared/ui/newTask/NewTask";
export interface IListSection {
  list: ITodo[];
  panelId: number;
}

const ListSection: React.FC<IListSection> = ({ list, panelId }) => {
  return (
    <section className="flex flex-col gap-4">
      <NewTask columnId={panelId} />
      <SortableContext items={list}>
        {list.map((task) => {
          return (
            <CardUi title={task.title} key={task.id} task={task}>
              {task.description}
            </CardUi>
          );
        })}
      </SortableContext>
    </section>
  );
};

export default ListSection;
