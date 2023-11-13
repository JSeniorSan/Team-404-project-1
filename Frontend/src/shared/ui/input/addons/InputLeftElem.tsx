import Input from "../Input";
import "./index.scss";

export interface IInputLeftElem {
  elem: React.ReactNode;
  placeholder: string;
  type: "text" | "search" | "date";
}

const InputLeftElem: React.FC<IInputLeftElem> = ({
  elem,
  placeholder,
  type,
}) => {
  return (
    <div className="InputLeftElem">
      {elem}
      <Input placeholder={placeholder} type={type} variant="withoutLine" />
    </div>
  );
};

export default InputLeftElem;
