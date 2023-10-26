import { IInput } from "./modal.interfaces";
import "./index.scss";
const ModalFormInput: React.FC<IInput> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} className="input" />;
};

export default ModalFormInput;
