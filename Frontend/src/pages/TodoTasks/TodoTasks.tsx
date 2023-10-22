import CardUi from "../../shared/ui/card/Card";
import "../../app/index.scss";
import { Input } from "antd";
import { useEffect, useState } from "react";
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
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
function TodoTasks() {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const todos = useSelector(selectAllTodos);

  const [value, setValue] = useState<string>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    if (value) {
      console.log("yes");

      dispatch(MakeTodo(value));
    }
  };

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
      <BtnDone color="green" description="Add todo" onClick={handleClick} />

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
