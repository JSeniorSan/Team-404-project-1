import { SubmitHandler, useForm } from "react-hook-form";
import Btn from "shared/ui/btns/Btn";
import useRegister from "shared/hooks/useRegister";
import Status from "shared/ui/Status/Status";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

export interface IAuth {
  username: string;
  password: string;
  email: string;
}

const AuthForm = () => {
  const { isSucessRegister, status } = useRegister();

  const [createAuth, { isSuccess: sucsess }] =
    todoApi.useRegistrationUserMutation();
  const { register, handleSubmit } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    await createAuth(data);

    isSucessRegister(sucsess);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Status status={status} />
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
        <Btn color="black">Submit</Btn>
      </form>
    </div>
  );
};

export default AuthForm;
