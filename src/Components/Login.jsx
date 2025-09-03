import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RolePermissions from "./RolePermissions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const users = [
  { email: "admin@hegl.in", password: "admin", role: "admin" },
  { email: "yogitazine@hegl.in", password: "zine", role: "crm" },
  { email: "ajaykate@hegl.in", password: "ajay", role: "sales" },
  { email: "shubhangi@hegl.in", password: "shubhangi", role: "sales" },
  { email: "ranjeet@hegl.in", password: "ranjeet", role: "sales" }, 
  { email: "yogita@hegl.in", password: "yogita", role: "sales" },  
  {email:"gayatri@gmail.com",password:"gayatri",role:"developer"},
  {email:"receiptionist@gmail.com",password:"receiptionist",role:"receiptionist"},
  
  
];




const handleLogin = (e) => {
  e.preventDefault();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    
    const { role } = user;
    const normalizedRole = role.toLowerCase();

   
    localStorage.setItem("userRole", normalizedRole);

    
    const firstPage =
      RolePermissions[normalizedRole]?.[0]?.subItems?.[0]?.to || "/dashboard";

    navigate(firstPage);
  } else {
    alert("Invalid email or password");
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        backgroundImage: "url('./pexels1.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <img
          src="./unnamed.png"
          alt="Logo"
          style={{ width: "70px", marginBottom: "20px", borderRadius: "50%" }}
        />

       

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "15px",
              backgroundColor: "#3551ebff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s ease",
              fontWeight:"bold",
            }}
          >
            Login btn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
