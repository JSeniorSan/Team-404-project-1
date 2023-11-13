import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/api/redux-hooks";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { IForm, ITodoTask } from "./formTask.interfaces";
import "./index.scss";
import cn from "classnames";
import { modalWindowSelector } from "shared/api/modal/modalSelectors";
import { switchModalWindow } from "shared/api/modal/modalSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import Btn from "shared/ui/btns/Btn";
import Input from "shared/ui/input/Input";
import Glass from "shared/asset/Group 3.svg?react";
import InputLeftElem from "shared/ui/input/addons/InputLeftElem";

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
        <label className="text-xl ">Task title</label>
        <Input
          type="text"
          placeholder="Введите заголовок задачи"
          variant="input"
          {...register("title", { required: true })}
        />
        <label className="text-xl">Task</label>
        <textarea className="textarea" {...register("description")} />
        <Btn type="submit" color="black">
          Submit
        </Btn>
        <InputLeftElem elem={<Glass />} placeholder="Hi" type="text" />
      </form>
    </div>
  );
};

export default FormCard;
