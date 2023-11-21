import Card from "entities/card/ui/Card";
import React from "react";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
export interface IListSection {
  list: ITodo[];
}

const ListSection: React.FC<IListSection> = ({ list }) => {
  return (
    <section className="flex flex-col gap-4">
      {list.map((task) => {
        return (
          <Card title={task.title} elemId={task.id} key={task.id}>
            {task.description}
          </Card>
        );
      })}
    </section>
  );
};

export default ListSection;
