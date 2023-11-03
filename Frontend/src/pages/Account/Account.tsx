import Wrapper from "../../shared/ui/wrapper/Wrapper";
import Page from "../../shared/ui/p/Page";
import BtnDone from "../../shared/ui/btns/btn-done/Btn-done";
import "./index.scss";
import { Link } from "react-router-dom";
import Login from "../../processes/auth/Login/Login";
import { todoApi } from "../../shared/api/todoQueryApi/TodoServise";
// import { useSelector } from "react-redux";
// import { selectUser } from "../../shared/api/user/userSelectors";

const Account = () => {
  // const user = useSelector(selectUser);
  const { data: userEntityAlredy } = todoApi.useGetMeQuery("");

  return (
    <Wrapper className="w-full h-screen flex justify-center items-center">
      <Wrapper className="flex rounded-3xl h-fit border w-fit shadow-lg">
        <Login userEntityAlredy={userEntityAlredy} />

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
