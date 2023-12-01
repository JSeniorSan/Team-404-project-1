import { Navigate, useLocation } from "react-router-dom";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const { data: userObj, isError } = todoApi.useGetMeQuery("");
  const location = useLocation();
  const systemUser = useSelector(selectUser);
  console.log(isError);

  if ((!userObj && systemUser) || (!userObj && !systemUser)) {
    console.log("redirect");

    return <Navigate to={"/account"} state={{ from: location }} replace />;
  }
  return children;
};

export default AuthHocPrivat;
