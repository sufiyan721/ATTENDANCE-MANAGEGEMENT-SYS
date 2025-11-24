import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useState, useEffect } from "react";

export default function AddStudent(){
  const [name,setName]=useState("");
  const [roll,setRoll]=useState("");
  const [cls,setCls]=useState("");
  const [section,setSection]=useState("");
  const [gender,setGender]=useState("Male");
  const [contact,setContact]=useState("");
  const [classes,setClasses]=useState([]);

  useEffect(()=>{ setClasses(JSON.parse(localStorage.getItem("ams_classes")||"[]"))},[]);

  const handleAdd = (e)=>{
    e.preventDefault();
    const newStudent = { name, roll, className:cls, section, gender, contact };
    const students = JSON.parse(localStorage.getItem("ams_students")||"[]");
    students.push(newStudent);
    localStorage.setItem("ams_students", JSON.stringify(students));

    // also attach to class item if exists
    const clsList = JSON.parse(localStorage.getItem("ams_classes")||"[]");
    const updated = clsList.map(c => c.name===cls ? {...c, students:[...(c.students||[]), newStudent]} : c);
    localStorage.setItem("ams_classes", JSON.stringify(updated));
    // clear
    setName("");setRoll("");setCls("");setSection("");setContact("");
    alert("Student added");
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content">
        <Topbar title="Add Student" subtitle="Add new student record" />
        <div className="card" style={{maxWidth:720}}>
          <form onSubmit={handleAdd}>
            <div className="row">
              <div className="col-md-6"><label>Name</label><input required className="form-control" value={name} onChange={e=>setName(e.target.value)}/></div>
              <div className="col-md-6"><label>Roll No</label><input required className="form-control" value={roll} onChange={e=>setRoll(e.target.value)}/></div>
            </div>
            <div className="row" style={{marginTop:10}}>
              <div className="col-md-4"><label>Class</label>
                <select className="form-control" value={cls} onChange={e=>setCls(e.target.value)} required>
                  <option value="">Select</option>
                  {classes.map((c,i)=><option key={i} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="col-md-4"><label>Section</label><input className="form-control" value={section} onChange={e=>setSection(e.target.value)}/></div>
              <div className="col-md-4"><label>Gender</label>
                <select className="form-control" value={gender} onChange={e=>setGender(e.target.value)}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>

            <div style={{marginTop:10}}>
              <label>Contact</label><input className="form-control" value={contact} onChange={e=>setContact(e.target.value)}/>
            </div>

            <div style={{marginTop:14}}>
              <button className="btn btn-custom">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
