import Page from "shared/ui/p/Page";
import "./index.scss";
import { Link } from "react-router-dom";
import Login from "processes/auth/Login/Login";
import Btn from "shared/ui/btns/Btn";

const Account = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex rounded-3xl h-fit border w-fit shadow-lg">
          <Login />
          <div className="register">
            <div className="text-white text-5xl font-bold">Hello, friend!</div>
            <Page size="14px" color="gray" weight="500">
              Register with your personal details to use all of site features
            </Page>
            <Link to={"/account/register"}>
              <Btn color="white" type="activity">
                Sign Up
              </Btn>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
