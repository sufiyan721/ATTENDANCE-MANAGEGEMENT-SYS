import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
