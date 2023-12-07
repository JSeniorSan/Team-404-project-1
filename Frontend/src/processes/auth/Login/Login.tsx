import { useForm, SubmitHandler } from "react-hook-form";
import Page from "shared/ui/p/Page";
import Btn from "shared/ui/btns/Btn";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { saveUser } from "shared/api/user/UserSlice";

export interface IInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isError: errorLogin, isSuccess: succsessLogin }] =
    todoApi.useLoginMutation();

  const [getMeQuery, { data: meData, isSuccess: getMeDone }] =
    todoApi.useLazyGetMeQuery();

  useEffect(() => {
    if (meData) {
      dispatch(saveUser(meData));
    }

    if (succsessLogin && getMeDone) {
      navigate("/dashboard/home", { replace: true });
      console.log("done");
    }
  }, [succsessLogin, navigate, getMeQuery, dispatch, meData, getMeDone]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    try {
      await login(
        `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
      );
      await getMeQuery(null);
    } catch (err) {
      if (err instanceof Error) {
        console.log("error", err.message);
      }
    }
  };

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
      {errors.username?.type === "required" && (
        <p className="text-red-500">Требуется ввести Email</p>
      )}
      {errorLogin && !errors.username && (
        <p className="text-red-500">Некорректно введен Email или пароль</p>
      )}
      <input
        placeholder="Email"
        type="text"
        {...register("username", { required: true })}
        aria-invalid={errors.username ? "true" : "false"}
      />

      {errors.password?.type === "validate" && (
        <p className="text-red-500">nope</p>
      )}
      <input
        placeholder="Password"
        type="text"
        {...register("password", { required: "Требуется ввести пароль" })}
        aria-invalid={errors.password ? "true" : "false"}
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
