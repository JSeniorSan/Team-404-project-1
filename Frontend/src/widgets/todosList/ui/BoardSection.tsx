import Card from "entities/card/ui/Card";
import { useEffect, useState } from "react";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
import { IListSection } from "widgets/todosList/ui/ListSection";

export interface IBoardSection extends IListSection {}

const BoardSection: React.FC<IBoardSection> = ({ list }) => {
  const [tasks, setTasks] = useState<ITodo[]>([]);

  useEffect(() => {
    setTasks(list);
  }, [setTasks, list]);

  return (
    <section className="flex h-fit items-center flex-col gap-3 ">
      {tasks.map((task) => {
        return (
          <Card
            title={task.title}
            elemId={task.id}
            key={task.id}
            widgets={true}
          >
            {task.description}
          </Card>
        );
      })}
    </section>
  );
};

export default BoardSection;
