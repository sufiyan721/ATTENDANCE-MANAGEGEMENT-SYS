import { NavLink } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="text-center text-light mb-4">AMS</h3>

      <ul className="nav flex-column px-3">

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-light" to="/dashboard">
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-light" to="/students">
            Students
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-light" to="/classes">
            Classes
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-light" to="/attendance">
            Take Attendance
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink className="nav-link text-light" to="/reports">
            Reports
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
