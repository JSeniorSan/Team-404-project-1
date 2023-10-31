// import { Navigate } from "react-router-dom";
// import { todoApi } from "../../../shared/api/todoQueryApi/TodoServise";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  // const { data: user } = todoApi.useGetMeQuery(null);
  // console.log(`user: ${user}`);

  return children;
};

export default AuthHocPrivat;
