import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar(){
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("isLoggedIn"); navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/mnt/data/c5614e0a-28f7-493f-9176-f4879cc2841a.png" alt="logo" />
        <div>
          <div style={{fontWeight:600}}>AMS</div>
          <small style={{color:'#6b7280'}}>Attendance System</small>
        </div>
      </div>

      <nav>
        <NavLink to="/home" className={({isActive})=>isActive?'active':''}>Home</NavLink>
        <NavLink to="/dashboard" className={({isActive})=>isActive?'active':''}>Dashboard</NavLink>
        <NavLink to="/attendance" className={({isActive})=>isActive?'active':''}>Take Attendance</NavLink>
        <NavLink to="/report" className={({isActive})=>isActive?'active':''}>Report</NavLink>
        <NavLink to="/classes" className={({isActive})=>isActive?'active':''}>Classes</NavLink>
        <NavLink to="/students" className={({isActive})=>isActive?'active':''}>Student Info</NavLink>
      </nav>

      <div style={{marginTop:18}}>
        <button className="btn btn-custom w-100" onClick={logout}>Logout</button>
      </div>
    </aside>
    
  )
}
