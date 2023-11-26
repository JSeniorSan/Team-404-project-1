import { Outlet } from "react-router";
import Header from "../widgets/header/Header";
import NavPanel from "../widgets/navPanel/NavPanel";
import "./index.scss";

const Layout = () => {
  return (
    <div className="layout">
      <NavPanel className="nav" />
      <Header className="head" />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
