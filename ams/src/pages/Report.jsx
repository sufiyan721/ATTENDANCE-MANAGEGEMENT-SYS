import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState } from "react";

export default function Report(){
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [className,setClassName]=useState("");
  const [results,setResults]=useState([]);
  const classes = JSON.parse(localStorage.getItem("ams_classes")||"[]");

  const search = ()=>{
    const all = JSON.parse(localStorage.getItem("ams_attendance")||"[]");
    const found = all.filter(r=>r.date===date && r.className===className);
    setResults(found);
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Reports" subtitle="Class-wise attendance history" />
        <div className="card">
          <div style={{display:'flex',gap:12}}>
            <input type="date" className="form-control" value={date} onChange={e=>setDate(e.target.value)}/>
            <select className="form-control" value={className} onChange={e=>setClassName(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((c,i)=><option key={i} value={c.name}>{c.name}</option>)}
            </select>
            <button className="btn btn-custom" onClick={search}>Filter</button>
          </div>

          <div style={{marginTop:12}}>
            {results.length===0 ? <p className="text-muted">No records for selected filters.</p> :
              results.map((r,idx)=>(
                <div key={idx} className="card" style={{marginBottom:10}}>
                  <h6>{r.className} — {r.date}</h6>
                  <table className="table">
                    <thead><tr><th>Roll</th><th>Present</th></tr></thead>
                    <tbody>
                      {r.attendance.map((a,i)=>(
                        <tr key={i}><td>{a.roll}</td><td>{a.present ? "Yes":"No"}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
