// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import RolePermissions from "./RolePermissions";
// import Constants from "./Constants";

// const LoginPage = () => {
//   console.log("LoginPage rendered");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const users = [
//     { email: "admin@hegl.in", password: "admin", role: "admin" },
//     { email: "yogitazine@hegl.in", password: "zine", role: "crm" },
//     { email: "ajaykate@hegl.in", password: "ajay", role: "sales" },
//     { email: "shubhangi@hegl.in", password: "shubhangi", role: "sales" },
//     { email: "ranjeet@hegl.in", password: "ranjeet", role: "sales" },
//     { email: "yogita@hegl.in", password: "yogita", role: "sales" },
//     { email: "gayatri@gmail.com", password: "gayatri", role: "developer" },
//     { email: "receiptionist@gmail.com", password: "receiptionist", role: "receiptionist" },


//   ];

//   const handleLogin = (e) => {
//     console.log("handlelogin fired");
//     e.preventDefault();

//     // const user = users.find(
//     //   (u) => u.email === email && u.password === password
//     // );

//     // if (user) {
//     //   const { role } = user;
//     //   const normalizedRole = role.toLowerCase();

//     //   localStorage.setItem("userRole", normalizedRole);
//     //   localStorage.setItem("userEmail", email);

//     //   const firstPage =
//     //     RolePermissions[normalizedRole]?.[0]?.subItems?.[0]?.to || "/dashboard";

//     //   navigate(firstPage);
//     // } else {
//     //   alert("Invalid email or password");
//     // }

//     console.log("login backend calling");
//     console.log("Email:", email, "Password:", password);
//     // Redirect to backend (ASP.NET Core) login endpoint
//     // window.location.href = "http://localhost:5174/login";
//     window.location.href = "http://localhost:5288/api/auth/login?returnUrl=http://localhost:5173";

//   };
//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
//         backgroundImage: "url('./pexels1.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
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
//         <img
//           src="./unnamed.png"
//           alt="Logo"
//           style={{ width: "70px", marginBottom: "20px", borderRadius: "50%" }}
//         />



//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "12px",
//               margin: "10px 0",
//               // border: "1px solid #ccc",
//               border: `1px solid ${Constants.borderColor}`,
//               borderRadius: "8px",
//               fontSize: "14px",
//               outline: "none",

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
//               border: `1px solid ${Constants.borderColor}`,
//               borderRadius: "8px",
//               fontSize: "14px",
//               outline: "none",
//             }}
//           />
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "12px",
//               marginTop: "15px",
//               backgroundColor: Constants.primaryColor,
//               color: "white",
//               border: "none",
//               borderRadius: "8px",
//               fontSize: "16px",
//               cursor: "pointer",
//               transition: "background 0.3s ease",
//               fontWeight: "bold",
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





// const LoginPage = () => {
//   return (
//   <>
//   </>
//   )
// }
// export default LoginPage;


import React from "react";

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://localhost:5289/api/auth/login?returnUrl=https://localhost:5173/dashboard";

  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Sign in with Microsoft</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;




