import CardUi from "../../card/Card";
import { ICardVisual } from "./cardVisual.interfaces";
import "./index.scss";

const CardVisual: React.FC<ICardVisual> = ({
  title,
  description,
  idElem,
  ...props
}) => {
  return (
    <CardUi title={title} elemId={idElem} {...props}>
      <h2 className="text-ellipsis whitespace-nowrap overflow-hidden">
        {description}
      </h2>
    </CardUi>
  );
};

export default CardVisual;
