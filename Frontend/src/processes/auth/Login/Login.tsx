import { useNavigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { useForm, SubmitHandler } from "react-hook-form";
import Page from "../../../shared/ui/p/Page";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { useEffect } from "react";
export interface IInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [login, { isSuccess: done }] = todoApi.useLoginMutation();
  const { data: userObj } = todoApi.useGetMeQuery("");
  console.log(`login: ${done}`);

  const { handleSubmit, register } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    await login(
      `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
    );
  };

  useEffect(() => {
    navigate("/todos/template");
  }, [done, navigate]);

  return (
    <form
      className="flex flex-col gap-4 justify-center rounded-l-3xl p-10 pr-32"
      onSubmit={handleSubmit(onSubmit)}
      id="form"
    >
      <div className="text-5xl font-bold">Sign in</div>
      <div className="h-16 p-3">Login logo</div>
      <Page size="14px" color="black" weight="500">
        or use our email password
      </Page>
      <input
        placeholder="Email"
        type="text"
        {...register("username", { required: true })}
      />
      <input
        placeholder="Password"
        type="text"
        {...register("password", { required: true })}
      />
      <Page size="14px" color="black" weight="500">
        Forget your password?
      </Page>
      <BtnDone color="default" description="SIGN IN" />
    </form>
  );
};

export default Login;
