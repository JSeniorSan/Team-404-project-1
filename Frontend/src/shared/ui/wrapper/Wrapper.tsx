import { IWrapper } from "./wrapper.interfaces";
import "./index.scss";
const Wrapper: React.FC<IWrapper> = ({ children, className, ...props }) => {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
};

export default Wrapper;
