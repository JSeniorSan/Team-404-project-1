import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const selectUserStor = useSelector(selectUser);
  const location = useLocation();
  if (!Object.keys(selectUserStor).length) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthHocPrivat;
