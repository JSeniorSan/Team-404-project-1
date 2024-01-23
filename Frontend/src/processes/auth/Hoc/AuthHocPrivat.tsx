import { Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  const [getMeQuery, { data: meData }] = todoApi.useLazyGetMeQuery();
  useEffect(() => {
    getMeQuery(null);
  }, [getMeQuery]);
  const selectUserStore = useSelector(selectUser);
  const location = useLocation();

  if (Object.keys(selectUserStore).length === 0 && !meData) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthHocPrivat;
