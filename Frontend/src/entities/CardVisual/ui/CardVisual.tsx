import CardUi from "../../../shared/ui/card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import { DeleteTodo, ToggleTodo } from "../../../shared/api/todo/todoSlice";
import Wrapper from "../../../shared/ui/wrapper/Wrapper";

const CardVisual: React.FC<ICardVisual> = ({ title, description, id }) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    dispatch(DeleteTodo(id));
  };

  const doneHandler = () => {
    dispatch(ToggleTodo(id));
  };

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
