import { IInput } from "./modal.interfaces";
import "./index.scss";

const ModalFormInput: React.FC<IInput> = ({
  type,
  placeholder,
  children,
  ...props
}) => {
  return (
    <div className="inputClass" {...props}>
      {children}
      <input type={type} placeholder={placeholder} className="input" />
    </div>
  );
};

export default ModalFormInput;
