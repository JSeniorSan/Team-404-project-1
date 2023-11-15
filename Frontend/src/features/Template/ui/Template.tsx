import "./index.scss";
import { ITemplate } from "./template.interfaces";

const Template: React.FC<ITemplate> = ({ className, children, ...props }) => {
  return (
    <div className={className} {...props}>
      <main className="template__todo">{children}</main>
    </div>
  );
};

export default Template;
