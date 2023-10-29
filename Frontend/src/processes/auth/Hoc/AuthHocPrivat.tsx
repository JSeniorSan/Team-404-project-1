import { Navigate } from "react-router-dom";
import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const { data: user } = todoApi.useGetMeQuery("");
  //   const location = useLocation();
  if (!user) {
    return <Navigate to={"/account"} />;
  }
  return children;
};

export default AuthHocPrivat;
