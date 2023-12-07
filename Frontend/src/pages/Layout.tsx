import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import Header from "../widgets/header/Header";
import NavPanel from "../widgets/navPanel/NavPanel";
import "./index.scss";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect } from "react";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { deleteCurrentUser } from "shared/api/user/UserSlice";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";

const Layout = () => {
  const dispatch = useAppDispatch();
  const [getMeQuery, { data: meData, isSuccess: getMeDone, isError: meError }] =
    todoApi.useLazyGetMeQuery();
  const systemUser = useSelector(selectUser);
  useEffect(() => {
    async function getMeFn() {
      await getMeQuery(null);
    }
    getMeFn();
  }, [getMeQuery, dispatch, meData, getMeDone]);

  if (meError && systemUser) {
    dispatch(deleteCurrentUser());
    <Navigate to="/account" replace />;
  }
  return (
    <>
      <div className="layout">
        <NavPanel className="nav" />
        <Header className="head" />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
