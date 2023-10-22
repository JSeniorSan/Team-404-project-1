import "./index.scss";
import { ITodosContainer } from "./todosContainer.interfaces";
const TodosContainer: React.FC<ITodosContainer> = ({ children }) => {
  return <section className="container">{children}</section>;
};

export default TodosContainer;
