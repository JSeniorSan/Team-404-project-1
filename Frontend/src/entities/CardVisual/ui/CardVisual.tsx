import CardUi from "../../../shared/ui/card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import Wrapper from "../../../shared/ui/wrapper/Wrapper";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import { useSelector } from "react-redux";
import { modalWindowSelector } from "../../../shared/api/todo/todoSelectors";
import { switchModalWindow } from "../../../shared/api/todo/todoSlice";

const CardVisual: React.FC<ICardVisual> = ({
  title,
  description,
  idElem,
  ...props
}) => {
  const dispatch = useAppDispatch();

  const modalWindowState = useSelector(modalWindowSelector);

  const [deleteTodo] = todoApi.useRemoveTodoMutation();

  const deleteHandler = () => {
    deleteTodo(idElem);
  };

  const doneHandler = () => {};

  const handleModalWindow = () => {
    dispatch(switchModalWindow(!modalWindowState));
  };

  return (
    <CardUi title={title} {...props}>
      <h2>{description}</h2>
      <Wrapper className="box__controll">
        <BtnDone color="green" description="Done" onClick={doneHandler} />
        <BtnDone color="red" description="Remove" onClick={deleteHandler} />
        <BtnDone
          color="yellow"
          description="Change"
          onClick={handleModalWindow}
        />
      </Wrapper>
    </CardUi>
  );
};

export default CardVisual;
