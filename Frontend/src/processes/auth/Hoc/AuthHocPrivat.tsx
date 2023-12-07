import { Navigate, useLocation } from "react-router-dom";
// import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import React from "react";
// import { useAppDispatch } from "shared/hooks/redux-hooks";
// import { saveUser } from "shared/api/user/UserSlice";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";
// import { useSelector } from "react-redux";
// import { selectUser } from "shared/api/user/userSelectors";

export interface IAuthHoc {
  children: React.ReactNode;
}

const AuthHocPrivat: React.FC<IAuthHoc> = ({ children }) => {
  // const dispatch = useAppDispatch();
  const selectUserStor = useSelector(selectUser);
  // const { data: userObj, isError } = todoApi.useGetMeQuery(null);
  const location = useLocation();
  // const [getMeQuery, { data: meData, isSuccess: getMeDone, isError: meError }] =
  //   todoApi.useLazyGetMeQuery();

  // useEffect(() => {
  //   async function getMeFn() {
  //     await getMeQuery(null);
  //     if (getMeDone && meData) {
  //       dispatch(saveUser(meData));
  //     }
  //   }
  //   getMeFn();
  // }, [getMeQuery, dispatch, meData, getMeDone]);
  console.log("keys", Object.keys(selectUserStor).length);

  if (!Object.keys(selectUserStor).length) {
    return <Navigate to="/account" state={{ from: location }} replace />;
  }
  return children;
};

export default AuthHocPrivat;
