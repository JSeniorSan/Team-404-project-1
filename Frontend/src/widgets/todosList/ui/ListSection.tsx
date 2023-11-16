import Card from "entities/card/ui/Card";
import React from "react";
import { ITask } from "shared/api/user/UserSlice";

export interface IListSection {
  list: ITask[];
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
