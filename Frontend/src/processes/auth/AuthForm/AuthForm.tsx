import { useNavigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { SubmitHandler, useForm } from "react-hook-form";
export interface IAuth {
  username: string;
  password: string;
  email: string;
}

const AuthForm = () => {
  const navigate = useNavigate();
  const [createAuth] = todoApi.useRegistrationUserMutation();

  const { register, handleSubmit } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    console.log(data);

    await createAuth(data);

    navigate("/todo/template");
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-6"
      >
        <input
          placeholder="Email"
          type="text"
          {...register("email", { required: true })}
          className="border w-32"
        />
        <input
          placeholder="UserName"
          type="text"
          {...register("username", { required: true })}
          className="border w-32"
        />
        <input
          placeholder="Password"
          type="text"
          {...register("password", { required: true })}
          className="border w-32"
        />
        <BtnDone color="default" description="Submit" />
      </form>
    </div>
  );
};

export default AuthForm;
