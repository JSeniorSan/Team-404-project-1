import { useForm } from "react-hook-form";
import Btn from "../btns/Btn";
import Input from "../input/Input";
import { SubmitHandler } from "react-hook-form";
import { IFormData } from "entities/FormTask/ui/formTask.interfaces";

export interface IForm extends IFormData {
  onSubmit: SubmitHandler<IFormData>;
}

const Form: React.FC<IForm> = ({ title, description, onSubmit }) => {
  const { handleSubmit, register } = useForm<IForm>();
  const stopHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <form
      className="modalWrapper__form"
      onClick={stopHandler}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="text-xl ">{title}</label>
      <Input
        type="text"
        placeholder="Введите заголовок задачи"
        variant="input"
        {...register("title", { required: true })}
      />
      <label className="text-xl">{description}</label>
      <textarea className="textarea" {...register("description")} />
      <Btn type="submit" color="black">
        Submit
      </Btn>
    </form>
  );
};

export default Form;
