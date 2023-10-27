import React from "react";
import Wrapper from "../../shared/ui/wrapper/Wrapper";
import Page from "../../shared/ui/p/Page";
import ModalFormInput from "../../shared/ui/modalFormInput/ModalFormInput";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import Header from "../../entities/Header/ui/Header";
import "./index.scss";
import { Link } from "react-router-dom";
const Account = () => {
  return (
    <Wrapper className="w-full h-screen flex flex-col gap-64 items-center">
      <Header />
      <Wrapper className="flex justify-between rounded-3xl h-fit w-9/12 border ">
        <div className="flex flex-col gap-4 justify-center rounded-l-3xl p-10 pr-32">
          <div className="text-5xl font-bold">Sign in</div>
          <div className="h-16 p-3">Login logo</div>
          <Page>or use our email password</Page>
          <ModalFormInput placeholder="Email" type="text" />
          <ModalFormInput placeholder="Password" type="text" />
          <Page>Forget your password?</Page>
          <Link to={"/todo"}>
            <BtnDone color="default" description="SIGN IN" />
          </Link>
        </div>
        <div className="register">
          <Page color="white" size="large">
            Hello, friend!
          </Page>
          <Page color="white">
            Register with your personal details to use all of site features
          </Page>
          <BtnDone description="SIGN UP" color="default" />
        </div>
      </Wrapper>
    </Wrapper>
  );
};

export default Account;
