import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import "./index.scss";
import { Link } from "react-router-dom";
export interface ITodosMode
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  path: string;
}

const TodosMode: React.FC<ITodosMode> = ({
  children,
  className,
  title,
  path,
  ...props
}) => {
  return (
    <Link to={path} className="w-full">
      <div className={cn("todosMode", className)} {...props}>
        <span>{children}</span>
        <div>{title}</div>
      </div>
    </Link>
  );
};

export default TodosMode;
