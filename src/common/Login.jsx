import { useState } from "react"; import { useNavigate } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import { adminLoginAPI } from "../services/AllAPI";

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLoginAPI({ email, password });
      if (res.data.success) {
        localStorage.setItem("role", "admin");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-3" style={{ width: "320px" }}>
        <h5 className="text-center mb-3">Admin Login</h5>

        <form onSubmit={loginAdmin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-2" required />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3" required />
          
          <Button type="submit" className="w-100">Login</Button>
        </form>
      </Card>
    </Container>
  );
};

export default Login;
