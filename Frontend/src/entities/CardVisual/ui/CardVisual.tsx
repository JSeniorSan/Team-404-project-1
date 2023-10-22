import CardUi from "../../../shared/ui/card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
const CardVisual: React.FC<ICardVisual> = ({ title, description }) => {
  return (
    <CardUi title={title}>
      {description}
      <BtnDone color="green" description="Done" />
      <BtnDone color="red" description="Remove" />
    </CardUi>
  );
};

export default CardVisual;
