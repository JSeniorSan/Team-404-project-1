import CardUi from "../../shared/card/ui/Card";
import "../../app/index.scss";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { Button } from "antd/es/radio";
import {
  GetTodosAsync,
  MakeTodo,
} from "../../entities/todos/store/todo/todoSlice";
import { useAppDispatch } from "../../entities/todos/store/redux-hooks";
import {
  selectStatus,
  selectAllTodos,
} from "../../entities/todos/store/todo/todoSelectors";
import { useSelector } from "react-redux";
function TodoTasks() {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const todos = useSelector(selectAllTodos);

  const [value, setValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // const handleClick = () => {
  //   if (value) {
  //     dispatch(MakeTodo(value));
  //   }
  // };

  useEffect(() => {
    dispatch(GetTodosAsync());
  }, []);
  return (
    <section className="wrapper">
      <Input
        showCount
        maxLength={20}
        onChange={onChange}
        className="w-36 h-6"
      />
      <Button type="primary" className="w-36 h-8">
        Add todo
      </Button>

      <div className="hi">
        {status === "loading" && <h1>Loading...</h1>}
        {status === "rejected" && <h1>error</h1>}
        {status === "idle" &&
          todos.map((el) => {
            return (
              <CardUi key={Math.random()} title={el.title}>
                Description
              </CardUi>
            );
          })}
      </div>
    </section>
  );
}

export default TodoTasks;
