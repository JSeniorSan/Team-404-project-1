import Wrapper from "../../shared/ui/wrapper/Wrapper";
import Page from "../../shared/ui/p/Page";
// import ModalFormInput from "../../shared/ui/modalFormInput/ModalFormInput";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import "./index.scss";
import { Link, Navigate } from "react-router-dom";
import Login from "../../processes/auth/Login/Login";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";

const Account = () => {
  const { data: userEntityAlredy } = todoApi.useGetMeQuery("");
  if (userEntityAlredy) {
    return <Navigate to={"Home"} />;
  }
  return (
    <Wrapper className="w-full h-screen flex justify-center items-center">
      <Wrapper className="flex rounded-3xl h-fit border w-fit">
        <Login />

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
