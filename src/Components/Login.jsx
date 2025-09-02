// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RolePermissions from "./RolePermissions";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("sales"); 
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // ✅ in real app, validate from backend
//     if (email && password) {
//       localStorage.setItem("userRole", role);
// const firstPage =
//   RolePermissions[role]?.[0]?.subItems?.[0]?.to || "/dashboard";
// navigate(firstPage);
//     }
// };

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="admin">Admin</option>
//         <option value="sales">Sales</option>
//         <option value="developer">Developer</option>
//         <option value="crm">CRM</option>
//       </select>
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginPage;


// ----------------------------------
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RolePermissions from "./RolePermissions";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:5000/api/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const { role } = data;
//         localStorage.setItem("userRole", role);

//         const firstPage =
//           RolePermissions[role]?.[0]?.subItems?.[0]?.to || "/dashboard";

//         navigate(firstPage);
//       } else {
//         alert(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
//       }}
//     >
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "400px",
//           background: "#fff",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//           textAlign: "center",
//         }}
//       >
//         {/* ✅ Small Logo at Top */}
//         <img
//           src="./unnamed.png"
//           alt="Logo"
//           style={{ width: "60px", marginBottom: "20px" ,borderRadius:"50%"}}
//         />

//         <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

//         <form onSubmit={handleLogin}>
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "12px",
//               margin: "10px 0",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "12px",
//               margin: "10px 0",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               fontSize: "14px",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginTop: "15px",
//               backgroundColor: "#4CAF50",
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "16px",
//               cursor: "pointer",
//               transition: "background 0.3s ease",
//             }}
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
// --------------------------------------





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RolePermissions from "./RolePermissions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded users list
const users = [
  { email: "admin@hegl.in", password: "admin", role: "admin" },
  { email: "yogitazine@hegl.in", password: "zine", role: "crm" },
  { email: "ajaykate@hegl.in", password: "ajay", role: "sales" },
  { email: "shubhangi@hegl.in", password: "shubhangi", role: "sales" },
  { email: "ranjeet@hegl.in", password: "ranjeet", role: "sales" }, 
  { email: "yogita@hegl.in", password: "yogita", role: "sales" },  
  // {email:"ashwini@hegl.in",password:"ashwini",role:"Receiptionist"} ,
];

//   const handleLogin = (e) => {
//     e.preventDefault();

//     const user = users.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (user) {
//       const normalizedRole = role.toLowerCase();
// localStorage.setItem("userRole", normalizedRole);
//   const firstPage =
//   RolePermissions[normalizedRole]?.[0]?.subItems?.[0]?.to || "/dashboard";

//       navigate(firstPage);
//     } else {
//       alert("Invalid email or password");
//     }
//   };


const handleLogin = (e) => {
  e.preventDefault();

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    // ✅ extract role from matched user
    const { role } = user;
    const normalizedRole = role.toLowerCase();

    // ✅ save role in localStorage
    localStorage.setItem("userRole", normalizedRole);

    // ✅ find the first page for that role
    const firstPage =
      RolePermissions[normalizedRole]?.[0]?.subItems?.[0]?.to || "/dashboard";

    // ✅ navigate to correct module
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
          style={{ width: "60px", marginBottom: "20px", borderRadius: "50%" }}
        />

        <h2 style={{ marginBottom: "20px", color: "#333" }}>Login</h2>

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
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
