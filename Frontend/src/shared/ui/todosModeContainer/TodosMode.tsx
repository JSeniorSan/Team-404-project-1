import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import "./index.scss";
export interface ITodosMode
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
}

const TodosMode: React.FC<ITodosMode> = ({
  children,
  className,
  title,
  ...props
}) => {
  return (
    <div className={cn("todosMode", className)} {...props}>
      <span>{children}</span>
      <div>{title}</div>
    </div>
  );
};

export default TodosMode;
