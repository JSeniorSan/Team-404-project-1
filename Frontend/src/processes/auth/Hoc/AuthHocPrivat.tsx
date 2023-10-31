import { Navigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const { data: userObj } = todoApi.useGetMeQuery("");
  console.log(`user: ${userObj}`);

  if (!userObj) {
    return <Navigate to={"/account"} />;
  }
  return children;
};

export default AuthHocPrivat;
