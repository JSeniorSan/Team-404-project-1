import CardUi from "../../../shared/ui/card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
// import { useAppDispatch } from "../../../shared/api/redux-hooks";

const CardVisual: React.FC<ICardVisual> = ({ title, description }) => {
  // const dispatch = useAppDispatch();

  const deleteHandler = () => {
    // dispatch();
  };

  const doneHandler = () => {
    // dispatch();
  };

  return (
    <CardUi title={title}>
      {description}
      <BtnDone color="green" description="Done" onClick={doneHandler} />
      <BtnDone color="red" description="Remove" onClick={deleteHandler} />
    </CardUi>
  );
};

export default CardVisual;
