import "./index.scss";
import NewTodo from "../../shared/ui/newTodo/NewTodo";
import { useAppDispatch } from "../../shared/api/redux-hooks";
import { switchModalWindow } from "../../shared/api/todo/modalSlice";
import { modalWindowSelector } from "../../shared/api/todo/modalSelectors";
import { useSelector } from "react-redux";

const NewTodoComponent = () => {
  const dispatch = useAppDispatch();
  const modalStatus = useSelector(modalWindowSelector);

  const createHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  return (
    <div className="fixed right-5 bottom-5 flex gap-2 items-center">
      <NewTodo onClick={createHandler} />
    </div>
  );
};

export default NewTodoComponent;
