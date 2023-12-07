import { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "classnames";
import "./index.scss";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { useNavigate } from "react-router";
import { switchWidget } from "shared/api/view/ViewSlice";
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/dashboard/home");
    dispatch(switchWidget(""));
  };
  return (
    <div
      className={cn("todosMode", className)}
      onClick={handleHomeClick}
      {...props}
    >
      <span>{children}</span>
      <div>{title}</div>
    </div>
  );
};

export default TodosMode;
