import Card from "entities/card/ui/Card";
import React from "react";
// import { ITask } from "shared/api/user/UserSlice";
import { useAppDispatch } from "shared/api/redux-hooks";
import { useEffect } from "react";
import { addTasks } from "../model/PanelsSlice";
import { ITodo } from "shared/api/todoQueryApi/todoInterfaces";
export interface IListSection {
  list: ITodo[];
}

const ListSection: React.FC<IListSection> = ({ list }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(addTasks(list));
  }, [dispatch, list]);
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
