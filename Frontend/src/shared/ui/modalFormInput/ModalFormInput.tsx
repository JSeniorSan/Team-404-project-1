import { IInput } from "./modal.interfaces";
import "./index.scss";
import Glass from "../../asset/search-normal.svg?react";
const ModalFormInput: React.FC<IInput> = ({ type, placeholder }) => {
  return (
    <div className="inputClass">
      <Glass />
      <input type={type} placeholder={placeholder} className="input" />
    </div>
  );
};

export default ModalFormInput;
