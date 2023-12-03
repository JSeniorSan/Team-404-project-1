import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/api/redux-hooks";
import { IFormData, ITodoTask } from "./formTask.interfaces";
import "./index.scss";
import cn from "classnames";
import { modalWindowSelector } from "shared/api/modal/modalSelectors";
import { switchModalWindow } from "shared/api/modal/modalSlice";
import Form from "shared/ui/form/Form";
import { SubmitHandler } from "react-hook-form";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

const FormCard: React.FC<ITodoTask> = ({ columnId, ...props }) => {
  const dispatch = useAppDispatch();
  const modalStatus = useSelector(modalWindowSelector);
  const [createTodo] = todoApi.useCreateTaskMutation();

  const modalWindowHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const createNewObjectData = {
      ...data,
      panel_id: columnId,
    };
    await createTodo(createNewObjectData);
    dispatch(switchModalWindow(false));
  };

  return (
    <div
      className={cn("modalWrapper", {
        ["active"]: modalStatus,
      })}
      onClick={modalWindowHandler}
      {...props}
    >
      <Form
        description="Task text"
        title="Task title"
        onSubmit={onSubmit}
        type="withDescription"
      />
    </div>
  );
};

export default FormCard;
