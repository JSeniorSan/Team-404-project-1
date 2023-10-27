import "../../app/index.scss";
import CardVisual from "../../entities/CardVisual/ui/CardVisual";
import TodosContainer from "../../shared/ui/todosContainer/TodosContainer";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
import Template from "../../features/Template/ui/Template";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import { Footer, Header } from "antd/es/layout/layout";
import FormCard from "../../entities/FormTask/ui/FormTask";
import { Link } from "react-router-dom";

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
      <Header className="text-white text-2xl flex justify-between items-center">
        <Link to={"/"}>
          <h1>Home</h1>
        </Link>
        <h1>Menu</h1>
      </Header>
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
          <br />
          <br />
          <br />
          <div>
            <hr />
          </div>
        </div>
      </Wrapper>
      <Footer />
      <FormCard className="modalWrapper" />
    </Wrapper>
  );
}

export default TodoTasks;
