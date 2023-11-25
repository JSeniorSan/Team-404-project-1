import Card from "entities/card/ui/Card";
import { IListSection } from "widgets/todosList/ui/ListSection";

export interface IBoardSection extends IListSection {}

const BoardSection: React.FC<IBoardSection> = ({ list }) => {
  return (
    <section className="flex flex-col gap-4">
      {list.map((task) => {
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
