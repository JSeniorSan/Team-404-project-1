import CardVisual from "entities/CardVisual/ui/CardVisual";
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
          <CardVisual
            title={task.title}
            description={task.description}
            idElem={task.id}
            key={task.id}
          />
        );
      })}
    </section>
  );
};

export default ListSection;
