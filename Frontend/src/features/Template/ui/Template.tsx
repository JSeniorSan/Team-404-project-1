import Wrapper from "shared/ui/wrapper/Wrapper";
import "./index.scss";
import { ITemplate } from "./template.interfaces";

const Template: React.FC<ITemplate> = ({ className, children, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      <main className="template__todo">{children}</main>
    </Wrapper>
  );
};

export default Template;
