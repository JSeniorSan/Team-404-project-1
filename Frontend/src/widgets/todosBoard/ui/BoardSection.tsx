// import { DndContext, closestCenter } from "@dnd-kit/core";
// import {
//   SortableContext,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
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

  // const handleDragEnd = (event) => {
  //   const { active, over } = event;
  //   console.log("ACTIVE" + active.id);
  //   console.log("OVER" + over.id);

  //   if (active.id !== over.id) {
  //     setTasks((values) => {
  //       const activeIndex = values.indexOf(active.id);
  //       const overIndex = values.indexOf(over.id);
  //       console.log(activeIndex);
  //       console.log(overIndex);

  //       return arrayMove(values, activeIndex, overIndex);
  //     });
  //   }
  // };

  return (
    // <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
    <section className="flex flex-col gap-4">
      {/* <SortableContext items={list} strategy={verticalListSortingStrategy}> */}
      {tasks.map((task, listId) => {
        return (
          <Card
            title={task.title}
            elemId={task.id}
            listId={listId}
            key={task.id}
            widgets={true}
          >
            {task.description}
          </Card>
        );
      })}
      {/* </SortableContext> */}
    </section>
    // </DndContext>
  );
};

export default BoardSection;
