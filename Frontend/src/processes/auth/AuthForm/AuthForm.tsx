import { useNavigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";
import BtnDone from "../../../shared/ui/btns/btn-done/Btn-done";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Page from "../../../shared/ui/p/Page";
export interface IAuth {
  username: string;
  password: string;
  email: string;
}

const AuthForm = () => {
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  const [createAuth, { isSuccess: sucsess, data: authInfo }] =
    todoApi.useRegistrationUserMutation();

  const isSucessRegister = (value: boolean) => {
    if (value) {
      navigate("/account");
      setStatus("");
    } else {
      setStatus("Форма ввода заполнена не корректно");
    }
  };

  const { register, handleSubmit } = useForm<IAuth>();
  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    console.log(data);
    await createAuth(data);
    console.log(sucsess);
    console.log(authInfo);

    isSucessRegister(sucsess);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Page color="black" size="16px" weight="500">
        {status}
      </Page>
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
