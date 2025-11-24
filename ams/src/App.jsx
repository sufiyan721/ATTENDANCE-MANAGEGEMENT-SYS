import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import TakeAttendance from "./pages/TakeAttendance";
import Report from "./pages/Report";
import Classes from "./pages/Classes";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App(){
  const isLoggedIn = localStorage.getItem("isLoggedIn")==="true";
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home"/> : <Navigate to="/login"/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/attendance" element={<ProtectedRoute><TakeAttendance/></ProtectedRoute>} />
        <Route path="/report" element={<ProtectedRoute><Report/></ProtectedRoute>} />
        <Route path="/add-student" element={<ProtectedRoute><AddStudent/></ProtectedRoute>} />
        <Route path="/classes" element={<ProtectedRoute><Classes /></ProtectedRoute>}/>
        <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute> }/>

        <Route path="*" element={<Navigate to="/home" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}
