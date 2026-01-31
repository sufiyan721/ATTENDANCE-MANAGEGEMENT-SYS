import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const navigate = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");

  const handleLogin = (e)=>{
    e.preventDefault();
    if(email==="sufiyan@gmail.com" && password==="1234"){
      localStorage.setItem("isLoggedIn","true");
      navigate("/dashboard");
    } else {
      setErr("Invalid credentials");
    }
  }

  return (
    <div style={{display:'flex',justifyContent:"center",alignItems:"center",minHeight:"100vh"}}>
      <div className="card" style={{maxWidth:420,width:'100%'}}>
        <div style={{padding:22}}>
          <h3>Sign in to AMS</h3>
          <p style={{color:'#6b7280'}}>Enter your credentials</p>

          {err && <div className="alert alert-danger">{err}</div>}

          <form onSubmit={handleLogin}>
            <input className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
            <input className="form-control mb-2" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
            <button className="btn btn-custom w-100" type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}
