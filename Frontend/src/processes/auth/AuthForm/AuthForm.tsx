import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { SubmitHandler, useForm } from "react-hook-form";
export interface IAuth {
  Email: string;
  Password: string;
  UserName: string;
}

const AuthForm = () => {
  const { register, handleSubmit } = useForm<IAuth>();

  const onSubmit: SubmitHandler<IAuth> = () => console.log("hi");
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          type="text"
          {...register("Email", { required: true })}
        />
        <input
          placeholder="UserName"
          type="text"
          {...register("UserName", { required: true })}
        />
        <input
          placeholder="Password"
          type="text"
          {...register("Password", { required: true })}
        />
        <BtnDone color="default" description="Submit" />
      </form>
    </div>
  );
};

export default AuthForm;
