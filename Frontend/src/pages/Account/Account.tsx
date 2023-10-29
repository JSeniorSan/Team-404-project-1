import Wrapper from "../../shared/ui/wrapper/Wrapper";
import Page from "../../shared/ui/p/Page";
// import ModalFormInput from "../../shared/ui/modalFormInput/ModalFormInput";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";

export interface IInputs {
  username: string;
  password: string;
}

const Account = () => {
  const navigate = useNavigate();

  const [login, { isSuccess: done }] = todoApi.useLoginMutation();

  const { handleSubmit, register } = useForm<IInputs>();

  const onSubmit: SubmitHandler<IInputs> = async (data) => {
    await login(data);
    if (done) {
      navigate("/todo/template");
    }
  };

  return (
    <Wrapper className="w-full h-screen flex justify-center items-center">
      <Wrapper className="flex rounded-3xl h-fit border w-fit">
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
        <div className="register">
          <div className="text-white text-5xl font-bold">Hello, friend!</div>
          <Page size="14px" color="gray" weight="500">
            Register with your personal details to use all of site features
          </Page>
          <Link to={"/account/register"}>
            <BtnDone description="SIGN UP" color="default" />
          </Link>
        </div>
      </Wrapper>
    </Wrapper>
  );
};

export default Account;
