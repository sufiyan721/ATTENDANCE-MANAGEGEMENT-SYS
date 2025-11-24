import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useEffect, useState } from "react";

export default function TakeAttendance(){
  const [classes,setClasses]=useState([]);
  const [selectedClass,setSelectedClass]=useState("");
  const [students,setStudents]=useState([]);

  useEffect(()=>{
    const cls = JSON.parse(localStorage.getItem("ams_classes")||"[]");
    setClasses(cls);
  },[]);

  useEffect(()=>{
    if(!selectedClass) return setStudents([]);
    const cls = JSON.parse(localStorage.getItem("ams_classes")||"[]");
    const found = cls.find(c=>c.name===selectedClass);
    setStudents(found?.students || []);
  },[selectedClass]);

  const togglePresent = (i)=>{
    const copy = [...students];
    copy[i].present = !copy[i].present;
    setStudents(copy);
  }

  const save = ()=>{
    // Save today's attendance under localStorage 'ams_attendance' keyed by date/class
    const key = 'ams_attendance';
    const all = JSON.parse(localStorage.getItem(key)||"[]");
    all.push({ date: new Date().toISOString().slice(0,10), className:selectedClass, attendance: students.map(s=>({roll:s.roll,present:!!s.present}))});
    localStorage.setItem(key, JSON.stringify(all));
    alert("Attendance saved");
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Take Attendance" subtitle="Select class and mark present/absent" />
        <div className="card">
          <div style={{display:'flex',gap:12,alignItems:'center'}}>
            <select className="form-control" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((c,i)=><option key={i} value={c.name}>{c.name}</option>)}
            </select>
            <button className="btn btn-custom" onClick={save}>Save</button>
          </div>

          <div style={{marginTop:12}}>
            {students.length===0 ? <p className="text-muted">No students.</p> :
              <table className="table">
                <thead><tr><th>#</th><th>Name</th><th>Roll</th><th>Present</th></tr></thead>
                <tbody>
                  {students.map((s,i)=>(
                    <tr key={i} className="item-row">
                      <td>{i+1}</td>
                      <td>{s.name}</td>
                      <td>{s.roll}</td>
                      <td>
                        <input type="checkbox" checked={!!s.present} onChange={()=>togglePresent(i)}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
