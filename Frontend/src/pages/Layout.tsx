import { Outlet } from "react-router";
import Header from "../entities/Header/ui/Header";
import NavPanel from "../entities/NavPanel/ui/NavPanel";
import "./index.scss";

const Layout = () => {
  return (
    <div className="layout">
      <NavPanel className="nav" />
      <Header className="head" />
      <Outlet />
    </div>
  );
};

export default Layout;
