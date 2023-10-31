import Wrapper from "../../shared/ui/wrapper/Wrapper";
import Page from "../../shared/ui/p/Page";
// import ModalFormInput from "../../shared/ui/modalFormInput/ModalFormInput";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import "./index.scss";
import { Link } from "react-router-dom";
import { lazy } from "react";
// import Login  from "../../processes/auth/Login/Login";
const LoginComponent = lazy(() => import("../../processes/auth/Login/Login"));
const Account = () => {
  return (
    <Wrapper className="w-full h-screen flex justify-center items-center">
      <Wrapper className="flex rounded-3xl h-fit border w-fit">
        <LoginComponent />

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
