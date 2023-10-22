import "../../app/index.scss";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { GetTodosAsync, MakeTodo } from "../../shared/api/todo/todoSlice";
import { useAppDispatch } from "../../shared/api/redux-hooks";
import {
  selectStatus,
  selectAllTodos,
} from "../../shared/api/todo/todoSelectors";
import { useSelector } from "react-redux";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
function TodoTasks() {
  const dispatch = useAppDispatch();
  const status = useSelector(selectStatus);
  const todos = useSelector(selectAllTodos);

  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    console.log("no");
    if (value) {
      console.log("yes");

      dispatch(MakeTodo(value));
    }
  };

  useEffect(() => {
    dispatch(GetTodosAsync());
  }, []);
  return (
    <Wrapper>
      <Input
        showCount
        maxLength={20}
        onChange={onChange}
        className="w-36 h-6"
      />
      <BtnDone color="default" description="Add todo" onClick={handleClick}>
        Click
      </BtnDone>
      <TodosContainer>
        {status === "loading" && <h1>Loading...</h1>}
        {status === "rejected" && <h1>error</h1>}
        {status === "idle" &&
          todos.map((el) => {
            return (
              <CardVisual
                key={Math.random()}
                title={el.title}
                description={el.descrption}
              />
            );
          })}
      </TodosContainer>
    </Wrapper>
  );
}

export default TodoTasks;
