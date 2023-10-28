import { Outlet } from "react-router";
import Header from "../entities/Header/ui/Header";
import NavPanel from "../entities/NavPanel/ui/NavPanel";
import "./index.scss";
import NewTodo from "../shared/ui/newTodo/NewTodo";
import LogoColors from "../shared/asset/Frame 45.svg?react";

const Layout = () => {
  return (
    <div className="layout">
      <NavPanel className="nav" />
      <Header className="head" />
      <div className="content">
        <Outlet />
        <div className="fixed right-5 bottom-5 flex gap-2 items-center">
          <NewTodo />
          <LogoColors />
        </div>
      </div>
    </div>
  );
};

export default Layout;
