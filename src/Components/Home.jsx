
// const Home = () => {

//     const handleSignIn = () => {
//         window.location.href = "https://localhost:5289/api/auth/login?returnUrl=https://localhost:5173/dashboard";

//     }
//     return (
//         <>
//             <h1>Home</h1>
//             <button onClick={handleSignIn}>Login</button>
//         </>
//     )
// }

// export default Home;





// const Home = () => {
//   const handleSignIn = () => {
//     window.location.href =
//       "https://localhost:5289/api/auth/login?returnUrl=https://localhost:5173/dashboard";
//   };

//   // Premium quality images (CRM, Sales, Logo, Background)
//   const bgImg =
//     "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

//   const logo =
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png";

//   const salesImg =
//     "https://images.unsplash.com/photo-1598257006626-48b0c252070d?auto=format&fit=crop&w=600&q=80";

//   const crmImg =
//     "https://images.unsplash.com/photo-1557425529-b1ae9c141e7d?auto=format&fit=crop&w=600&q=80";



//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgImg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         height: "100vh",
//         width: "100%",
//         display: "flex",
//         justifyContent: "flex-end",
//         alignItems: "center",
//         paddingRight: "80px",
//       }}
//     >
//       {/* Right Side Section */}
//       <div
//         style={{
//           textAlign: "center",
//           padding: "30px",
//           borderRadius: "14px",
//           background: "rgba(255, 255, 255, 0.18)",
//           backdropFilter: "blur(10px)",
//           boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
//         }}
//       >
//         {/* Logo */}
//         <img
//         //   src={logo}
//         src="/unnamed.png"
//           alt="Company Logo"
//           style={{
//             width: "200px",
//             marginBottom: "25px",
//             filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.3))",
//             borderRadius:"50%",
//           }}
//         />

//         {/* Two Images Side-by-Side */}
//         <div
//           style={{
//             display: "flex",
//             gap: "20px",
//             justifyContent: "center",
//             marginBottom: "25px",
//           }}
//         >
//           <img
//             src={salesImg}
//             alt="Sales"
//             style={{
//               width: "180px",
//               height: "130px",
//               borderRadius: "12px",
//               objectFit: "cover",
//               boxShadow: "0px 4px 14px rgba(0,0,0,0.35)",
//             }}
//           />

//           <img
//             src={crmImg}
//             alt="CRM"
//             style={{
//               width: "180px",
//               height: "130px",
//               borderRadius: "12px",
//               objectFit: "cover",
//               boxShadow: "0px 4px 14px rgba(0,0,0,0.35)",
//             }}
//           />
//         </div>

//         {/* Login Button */}
//         <button
//           onClick={handleSignIn}
//           style={{
//             padding: "14px 45px",
//             borderRadius: "10px",
//             border: "none",
//             background:
//               "linear-gradient(135deg, rgba(76, 3, 3, 1) 0%, #aa0738ff 100%)",
//             color: "white",
//             fontSize: "18px",
//             fontWeight: "600",
//             cursor: "pointer",
//             letterSpacing: "0.5px",
//             boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
//             transition: "0.3s",
//           }}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

const Home = () => {
  const handleSignIn = () => {
    window.location.href =
      "https://localhost:5289/api/auth/login?returnUrl=https://localhost:5173/dashboard";
  };

  const bgImg =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";
    // "https://images.unsplash.com/photo-1531972111231-7485f92c4f9a?auto=format&fit=crop&w=1600&q=80";
    // "https://images.unsplash.com/photo-1526404079168-902f73ae98c7?auto=format&fit=crop&w=1600&q=80";

  // High-quality CRM + Sales images
  const slidingImages = [
    "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611224923853-80b023f01651?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1598257006626-48b0c252070d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center", // CENTERING RIGHT SECTION
        alignItems: "center",
      }}
    >
      {/* RIGHT SIDE CONTENT BOX */}
      <div
        style={{
          textAlign: "center",
          padding: "40px 35px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.20)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          width: "520px", // INCREASED WIDTH
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        {/* LOGO */}
        <img
          src="/unnamed.png"
          alt="Company Logo"
          style={{
            width: "170px",
            marginBottom: "30px",
            filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.25))",
            borderRadius: "50%",
          }}
        />

        {/* TITLE */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#3b3b3b",
            marginBottom: "18px",
            letterSpacing: "0.5px",
          }}
        >
          Artemis NextGen 
        </h2>

        <p
          style={{
            fontSize: "15px",
            color: "#333",
            marginBottom: "25px",
            opacity: "0.9",
          }}
        >
          Smart Automation • Lead Tracking • Sales Pipeline • Follow-ups
        </p>

        {/* SLIDING IMAGES */}
        <div
          style={{
            overflow: "hidden",
            width: "100%",
            height: "150px",
            borderRadius: "14px",
            marginBottom: "30px",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "max-content",
              animation: "scroll 18s linear infinite",
            }}
          >
            {[...slidingImages, ...slidingImages].map((img, index) => (
              <img
                key={index}
                src={img}
                alt="crm-sales"
                style={{
                  width: "200px",
                  height: "150px",
                  objectFit: "cover",
                  marginRight: "18px",
                  borderRadius: "12px",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
                }}
              />
            ))}
          </div>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleSignIn}
          style={{
            padding: "15px 55px",
            borderRadius: "12px",
            border: "none",
            background:
              "linear-gradient(135deg, #520202 0%, #b40634 100%)",
            color: "white",
            fontSize: "19px",
            fontWeight: "600",
            cursor: "pointer",
            letterSpacing: "0.5px",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.25)",
            transition: "0.3s",
          }}
        >
          Login
        </button>
      </div>

      {/* SCROLL ANIMATION */}
      <style>
        {`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        `}
      </style>
    </div>
  );
};

export default Home;

