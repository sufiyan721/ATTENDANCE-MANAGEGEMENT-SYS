import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Home(){
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Home" subtitle="Attendance Management System" />
        <div className="card">
          <h4>Welcome to your Final Year Project — AMS</h4>
          <p style={{color:'#6b7280'}}>This frontend is built with React + Vite + Bootstrap. Later we will hook to Django + MySQL.</p>
          <div style={{marginTop:12}}>
            <small style={{color:'#6b7280'}}>Tip: use the sidebar to navigate. The UI is responsive and minimal.</small>
          </div>
        </div>
      </div>
    </div>
  )
}
