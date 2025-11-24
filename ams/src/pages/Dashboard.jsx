import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard(){
  // sample stats — use real data later
  const totalStudents = JSON.parse(localStorage.getItem("ams_students")||"[]").length || 0;
  const dataBar = { labels:["Mon","Tue","Wed","Thu","Fri"], datasets:[{ label:"Attendance %", data:[90,88,92,85,93], backgroundColor:'#2e7d32'}] };
  const dataLine = { labels:["Week1","Week2","Week3","Week4"], datasets:[{ label:"Monthly Trend", data:[88,90,87,92], borderColor:'#2e7d32', fill:false }] };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Dashboard" subtitle="Overview" />

        <div className="stat-grid" style={{marginBottom:16}}>
          <StatCard title="Total Students" value={totalStudents} sub="Registered" />
          <StatCard title="Present Today" value="105" sub="Auto-simulated" />
          <StatCard title="Absent Today" value="15" sub="Auto-simulated" />
          <StatCard title="Monthly Avg" value="89%" sub="Across classes" />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div className="card">
            <h5>Week Attendance</h5>
            <Bar data={dataBar} />
          </div>
          <div className="card">
            <h5>Monthly Trend</h5>
            <Line data={dataLine} />
          </div>
        </div>
      </div>
    </div>
  )
}
