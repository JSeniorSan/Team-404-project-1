import { useNavigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import { useForm, SubmitHandler } from "react-hook-form";
import Page from "../../../shared/ui/p/Page";
import { useAppDispatch } from "../../../shared/api/redux-hooks";
import { saveUser } from "../../../shared/api/user/UserSlice";
import { useEffect } from "react";
import Btn from "../../../shared/ui/btns/Btn";
export interface IInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [login, { isSuccess: done }] = todoApi.useLoginMutation();

  const [getMe, { data: meData }] = todoApi.useLazyGetMeQuery();

  const { handleSubmit, register } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    await login(
      `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
    );
    await getMe("");
  };

  useEffect(() => {
    if (done && meData) {
      dispatch(saveUser(meData));
      navigate("/dashboard/home", { replace: true });
    }
  }, [dispatch, navigate, done, getMe, meData]);

  return (
    <form
      className="flex flex-col gap-4 justify-center rounded-l-3xl p-10 pr-32"
      onSubmit={handleSubmit(onSubmit)}
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
      <Btn color="black" type="activity">
        Sign In
      </Btn>
    </form>
  );
};

export default Login;
