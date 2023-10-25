import "../../app/index.scss";
import { Input } from "antd";
import { useState } from "react";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
function TodoTasks() {
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = todoApi.useFetchAllTodosQuery("");

  const [createTodo, {}] = todoApi.useCreateTodoMutation();

  const [value, setValue] = useState<string>("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleClick = async () => {
    await createTodo({ title: value, description: null });
  };

  return (
    <Wrapper className="todo__wrapper">
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
        {isLoading && <h1>Loading...</h1>}
        {isError && <h1>error</h1>}
        {isSuccess &&
          todos.map((el) => {
            return (
              <CardVisual
                id={el.id}
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
