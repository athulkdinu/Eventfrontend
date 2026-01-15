import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./common/Login";
import AdminDashboard from "./admin/AdminDashboard";
import UserDashboard from "./user/UserDashboard";

const isAdmin = () => localStorage.getItem("role") === "admin";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/dashboard" element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}/>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
