import { useForm } from "react-hook-form";
import Btn from "../btns/Btn";
import Input from "../input/Input";
import { SubmitHandler } from "react-hook-form";
import { IFormData } from "features/NewTodoModalWindow/formTask.interfaces";

export interface IForm extends IFormData {
  onSubmit: SubmitHandler<IFormData>;
}

const Form: React.FC<IForm> = ({ title, description, onSubmit, type }) => {
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
      <Input
        type="text"
        placeholder={title}
        variant="input"
        {...register("title", { required: true })}
      />
      {type === "withDescription" && (
        <>
          <label className="text-xl">{description}</label>
          <textarea className="textarea" {...register("description")} />
        </>
      )}

      <Btn type="submit" color="black">
        Submit
      </Btn>
    </form>
  );
};

export default Form;
