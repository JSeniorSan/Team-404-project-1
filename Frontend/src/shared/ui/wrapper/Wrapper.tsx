import { IWrapper } from "./wrapper.interfaces";
import "./index.scss";
const Wrapper: React.FC<IWrapper> = ({ children }) => {
  return <section className="wrapper">{children}</section>;
};

export default Wrapper;
