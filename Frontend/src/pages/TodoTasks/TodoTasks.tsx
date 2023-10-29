import "../../app/index.scss";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import FormCard from "../../entities/FormTask/ui/FormTask";
import NewTodo from "../../shared/ui/newTodo/NewTodo";
import LogoColors from "../../shared/asset/Frame 45.svg?react";
function TodoTasks() {
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = todoApi.useFetchAllTodosQuery("");
  console.log(todos);

  return (
    <Wrapper className="wrapper">
      <Wrapper className="flex gap-5">
        <Template className="template">
          <TodosContainer>
            {isLoading && <h1>Loading...</h1>}
            {isError && <h1>error</h1>}
            {isSuccess &&
              todos.map((el) => {
                return (
                  <CardVisual
                    idElem={el.id}
                    key={Math.random()}
                    title={el.title}
                    description={el.description}
                  />
                );
              })}
          </TodosContainer>
        </Template>
        <div>
          <h1 className="text-4xl">
            Привет, это твой личный веб помощник с твоими делами!
          </h1>
          <h2 className="text-2xl">Давай начинать планировать 😎</h2>

          <div>
            <hr />
          </div>
        </div>
      </Wrapper>
      <FormCard className="modalWrapper" />
      <div className="fixed right-5 bottom-5 flex gap-2 items-center">
        <NewTodo />
        <LogoColors />
      </div>
    </Wrapper>
  );
}

export default TodoTasks;
