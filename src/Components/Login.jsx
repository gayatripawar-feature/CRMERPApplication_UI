
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  
//   const handleLogin = (e) => {
//     e.preventDefault();

    
//     if (email === "admin@test.com" && password === "12345") {
//       localStorage.setItem("authToken", "sampleToken");
//       navigate("/dashboard"); 
//     } else {

//       alert("Invalid credentials");
//     }
//   };



//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow" style={{ width: "350px" }}>
//         <h3 className="text-center mb-4">Login</h3>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <input
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-100">
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RolePermissions from "./RolePermissions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("sales"); // default
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ in real app, validate from backend
    if (email && password) {
      localStorage.setItem("userRole", role);

    
   
//     const firstPage = RolePermissions[role]?.[0]?.to || "/dashboard";
// navigate(firstPage);

const firstPage =
  RolePermissions[role]?.[0]?.subItems?.[0]?.to || "/dashboard";
navigate(firstPage);


    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="sales">Sales</option>
        <option value="developer">Developer</option>
        <option value="crm">CRM</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
