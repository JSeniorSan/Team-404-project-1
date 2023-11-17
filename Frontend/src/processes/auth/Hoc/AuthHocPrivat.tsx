import { Navigate, useLocation } from "react-router-dom";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import React from "react";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const location = useLocation();
  const { data: userObj } = todoApi.useGetMeQuery("");

  if (!userObj) {
    return <Navigate to={"/account"} state={{ from: location }} replace />;
  }
  return children;
};

export default AuthHocPrivat;
