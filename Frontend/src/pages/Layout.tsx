import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import Header from "../widgets/header/Header";
import NavPanel from "../widgets/navPanel/NavPanel";
import "./index.scss";
import { todoApi } from "shared/api/todoQueryApi/TodoServise";
import { useEffect, useState } from "react";
import { useAppDispatch } from "shared/hooks/redux-hooks";
import { deleteCurrentUser } from "shared/api/user/UserSlice";
import { useSelector } from "react-redux";
import { selectUser } from "shared/api/user/userSelectors";
import { ArrowRightIcon } from "@chakra-ui/icons";

const Layout = () => {
  const [isHide, setIsHide] = useState<boolean>(true);
  const [getMeQuery, { data: meData, isSuccess: getMeDone, isError: meError }] =
    todoApi.useLazyGetMeQuery();
  const dispatch = useAppDispatch();

  const systemUser = useSelector(selectUser);
  useEffect(() => {
    getMeQuery(null);
  }, [getMeQuery, dispatch, meData, getMeDone]);

  if (meError && systemUser) {
    dispatch(deleteCurrentUser());
    <Navigate to="/account" replace />;
  }
  return (
    <>
      <div className="layout">
        {isHide && (
          <span
            className="absolute left-1 top-24 rounded-full p-2 border flex justify-center items-center md:hidden"
            onClick={handleClick}
          >
            <ArrowRightIcon />
          </span>
        )}
        <NavPanel className="nav" isHide={isHide} setIsHide={setIsHide} />
        {isHide && <Header className="head" />}
        {isHide && (
          <div className="content">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );

  function handleClick() {
    setIsHide(false);
  }
};

export default Layout;
