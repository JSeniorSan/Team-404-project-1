import CardUi from "../../../shared/ui/card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import Wrapper from "../../../shared/ui/wrapper/Wrapper";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";

const CardVisual: React.FC<ICardVisual> = ({ title, description, id }) => {
  const [deleteTodo, {}] = todoApi.useRemoveTodoMutation();

  const deleteHandler = () => {
    deleteTodo(id);
  };

  const doneHandler = () => {};

  return (
    <CardUi title={title}>
      <Wrapper className="box">
        {description}

        <BtnDone color="green" description="Done" onClick={doneHandler} />
        <BtnDone color="red" description="Remove" onClick={deleteHandler} />
      </Wrapper>
    </CardUi>
  );
};

export default CardVisual;
