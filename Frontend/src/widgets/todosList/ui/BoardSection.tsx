import { SortableContext } from "@dnd-kit/sortable";
import Card from "entities/card/ui/Card";

import { IListSection } from "widgets/todosList/ui/ListSection";

export interface IBoardSection extends IListSection {}

const BoardSection: React.FC<IBoardSection> = ({ list }) => {
  return (
    <section className="flex h-fit items-center flex-col gap-3 ">
      <SortableContext items={list}>
        {list.map((task) => {
          return (
            <Card task={task} key={task.id} widgets={true}>
              {task.description}
            </Card>
          );
        })}
      </SortableContext>
    </section>
  );
};

export default BoardSection;
