import { IWrapper } from "./wrapper.interfaces";
import "./index.scss";
const Wrapper: React.FC<IWrapper> = ({ children, className, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default Wrapper;
