import { SortableContext } from "@dnd-kit/sortable";
import CardUi from "entities/card/ui/CardUi";
import React from "react";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
export interface IListSection {
  list: ITodo[];
}

const ListSection: React.FC<IListSection> = ({ list }) => {
  return (
    <section className="flex flex-col gap-4">
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
