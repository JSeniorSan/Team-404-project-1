import { IInput } from "./modal.interfaces";

const ModalFormInput: React.FC<IInput> = ({ type, placeholder }) => {
  return <input type={type} placeholder={placeholder} />;
};

export default ModalFormInput;
