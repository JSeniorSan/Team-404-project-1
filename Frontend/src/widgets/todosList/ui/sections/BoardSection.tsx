import { SortableContext } from "@dnd-kit/sortable";
import CardUi from "entities/card/ui/CardUi";
import React from "react";

import NewTask from "shared/ui/newTask/NewTask";
import { IListSection } from "widgets/todosList/ui/sections/ListSection";
export interface IBoardSection extends IListSection {
  panelId: number;
}

const BoardSection: React.FC<IBoardSection> = React.memo(
  ({ list, panelId }) => {
    return (
      <section className="flex h-fit items-center flex-col gap-3 p-2">
        <NewTask columnId={panelId} />
        <SortableContext items={list}>
          {list.map((task) => {
            return (
              <CardUi task={task} key={task.id} widgets={true}>
                {task.description}
              </CardUi>
            );
          })}
        </SortableContext>
      </section>
    );
  }
);

export default BoardSection;
