import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { IForm, ITodoTask } from "./formTask.interfaces";
import "./index.scss";
import cn from "classnames";
import { modalWindowSelector } from "../../../shared/api/todo/modalSelectors";
import { switchModalWindow } from "../../../shared/api/todo/modalSlice";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { useForm, SubmitHandler } from "react-hook-form";

const FormCard: React.FC<ITodoTask> = ({ className, ...props }) => {
  const [createTodo] = todoApi.useCreateTaskMutation();

  const dispatch = useAppDispatch();

  const { handleSubmit, register, reset } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const createNewObjectData = {
      infoData: data,
      id: `${props.id}`,
    };

    await createTodo(createNewObjectData);

    reset();
    dispatch(switchModalWindow(false));
  };

  const modalStatus = useSelector(modalWindowSelector);

  const modalWindowHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(switchModalWindow(!modalStatus));
  };

  const stopHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className={cn(className, {
        ["active"]: modalStatus,
      })}
      onClick={modalWindowHandler}
      {...props}
    >
      <form
        className="modalWrapper__form"
        onClick={stopHandler}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>Task title</label>
        <input
          type="string"
          placeholder="Введите заголовок задачи"
          style={{ color: "black" }}
          {...register("title", { required: true })}
        />
        <label>Task</label>
        <textarea className="textarea" {...register("description")} />
        <BtnDone color="green" description="Submit" />
      </form>
    </div>
  );
};

export default FormCard;
