// import { toast } from "react-toastify";
// import React, { useState, useCallback, useRef, useEffect } from "react";
// import {
//   FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
//   FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell,
//   FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn, FaUserTie, FaLandmark, FaCalendarAlt, FaPeopleArrows
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Outlet, Link, NavLink } from "react-router-dom";
// import { FaClipboardList, FaCalendarCheck, FaRegHandshake, FaRegClock, FaTasks, FaRegTimesCircle, FaClipboard, FaRegEdit } from 'react-icons/fa';
// import { FaMicrophone } from "react-icons/fa";
// import VoiceNavigation from "./VoiceNavigation";
// import { FaMoneyBillWave, FaParking, FaChartBar } from "react-icons/fa";
// import RolePermissions from "./RolePermissions";
// import Constants from "./Constants";

// const Dashboard = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [query, setQuery] = useState("");
//   const recognitionRef = useRef(null);
//   const [listening, setListening] = useState(false);
//   const [results, setResults] = useState([]);
//   const [session, setSession] = useState([]);
//   const [collapsed, setCollapsed] = useState(() => {
//     // Always collapsed on small screens
//     return window.innerWidth <= 768;
//   });
//   const [sections, setSections] = useState({
//     admin: false,
//     developer: false,
//     sales: false,
//     crm: false,
//   });
//   const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
//   const navigate = useNavigate();
//   const toggleSidebar = useCallback(() => {
//     if (window.innerWidth > 768) {
//       setCollapsed((prev) => !prev);   // expand/collapse only on tablet/laptop
//     } else {
//       setCollapsed(true);  // force collapsed on mobile
//     }
//   }, []);


//   // const toggleSection = useCallback((section) => {
//   //   setSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   // }, []);
//   const toggleSection = useCallback((section) => {
//     setSections((prev) => {
//       const newState = {};
//       for (const key in prev) {
//         newState[key] = false;
//       }

//       newState[section] = !prev[section];
//       return newState;
//     });
//   }, []);

//   // const handleLogout = useCallback(() => {
//   //   localStorage.removeItem('authToken');
//   //   navigate('/login');

//   // }, [navigate]);

//   //   const handleLogout = useCallback(async () => {
//   //   try {
//   //     // Call backend logout to clear cookies + Azure AD session
//   //     await fetch("http://localhost:5288/api/auth/logout", {
//   //       method: "POST",
//   //       credentials: "include", // important to clear session cookie
//   //     });

//   //     // Clear any local tokens (optional)
//   //     setSession({ authenticated: false, name: null });
//   //     localStorage.removeItem("authToken");

//   //     // Redirect to login page
//   //     // navigate("/login");
//   //      window.location.href =
//   //       "http://localhost:5288/api/auth/login?returnUrl=http://localhost:5173/dashboard";
//   //   } catch (error) {
//   //     console.error("Logout failed:", error);
//   //   }
//   // }, [navigate]);

//   const handleLogout = useCallback(async () => {
//     try {
//       // 1️⃣ Clear backend session
//       await fetch("http://localhost:5288/api/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       // 2️⃣ Clear frontend session
//       setSession({ authenticated: false, name: null });
//       localStorage.removeItem("authToken");
//       console.log("logging out ");
//       // 3️⃣ Logout from Azure and go back to login page
//       window.location.href =
//         // "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
//         // "https://login.microsoftonline.com/common/oauth2/v2.0/logout";
//         //correct :
//         // "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:5288/api/auth/login?returnUrl=http://localhost:5173/dashboard";

//         "https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:5288/api/auth/login";


//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   }, []);




//   const handleClose = () => {
//     console.log("Closing the voice navigation.");
//     setShowVoiceRecognition(false);
//   };
//   const role = localStorage.getItem("userRole");
//   const allowedMenus = RolePermissions[role] || [];
//   // 🔹 Build ALL commands (for all modules, not filtered by role)
//   const buildAllVoiceCommands = (rolePermissions) => {
//     const commands = {};
//     Object.values(rolePermissions).forEach(menus => {
//       menus.forEach(menu => {
//         if (menu.subItems) {
//           menu.subItems.forEach(item => {
//             const command = item.label.toLowerCase();
//             commands[command] = item.to;
//           });
//         }
//       });
//     });
//     return commands;
//   };
//   // functions for path  and voice system for their respective modules:
//   const buildVoiceCommands = (allowedMenus, navigate) => {
//     const commands = {};
//     allowedMenus.forEach(menu => {
//       if (menu.subItems) {
//         menu.subItems.forEach(item => {
//           const command = item.label.toLowerCase(); // Example: "Leads"
//           commands[command] = item.to;             // Example: "/dashboard/sales/leads"
//         });
//       }
//     });
//     return commands;
//   };
//   // 🔹 Build search data only for allowed menus
//   const buildSearchData = (allowedMenus) => {
//     const searchList = [];
//     allowedMenus.forEach(menu => {
//       if (menu.subItems) {
//         menu.subItems.forEach(item => {
//           searchList.push({
//             label: item.label,   // e.g. "Leads"
//             value: item.to       // e.g. "/dashboard/sales/leads"
//           });
//         });
//       }
//     });
//     return searchList;
//   };
//   // ✅ Build commands & search data dynamically
//   const allCommandRoutes = buildAllVoiceCommands(RolePermissions); // 🔹 all
//   const commandRoutes = buildVoiceCommands(allowedMenus, navigate);  // filtred
//   const moduleData = buildSearchData(allowedMenus);

//   console.log("Role:", localStorage.getItem("userRole"));
// console.log("Allowed Menus:", RolePermissions[localStorage.getItem("userRole")]);

//   // for path system :moduleData
//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setQuery(searchTerm);
//     if (searchTerm) {
//       const filteredResults = moduleData.filter((item) =>
//         item.label.toLowerCase().includes(searchTerm)
//       );
//       setResults(filteredResults);
//     } else {
//       setResults([]);
//     }
//   };
//   const handleRedirect = (path) => {
//     navigate(path);
//     setQuery("");
//     setResults([]);
//   };

//   // for voice system => commandRoutes
//   useEffect(() => {
//     if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//       const recognition = recognitionRef.current;
//       recognition.continuous = false;
//       recognition.interimResults = false;
//       recognition.lang = "en-US";
//       recognition.onstart = () => {
//         setListening(true);
//       };
//       recognition.onend = () => {
//         setListening(false);
//       };
//       recognition.onresult = (event) => {
//         let command = event.results[0][0].transcript.trim().toLowerCase();
//         console.log("🎤 Recognized command:", command);
//         let matchedPath = null;
//         for (const key in allCommandRoutes) {
//           if (command.includes(key)) {
//             matchedPath = allCommandRoutes[key];
//             break;
//           }
//         }
//         if (!matchedPath) {
//           toast.error("❓ Command not recognized");
//           speak("Command not recognized");
//           return;
//         }
//         const hasAccess = moduleData.some(
//           (item) => item.value.toLowerCase() === matchedPath.toLowerCase()
//         );
//         if (hasAccess) {
//           speak(`Redirecting to ${command}`, () => {
//             handleRedirect(matchedPath);
//           });
//         } else {
//           toast.error("🚫 You don’t have access to this module");
//           speak("You don’t have access to this module");
//         }
//         setTimeout(() => {
//           setListening(false);
//         }, 1000);
//       };
//       recognition.onerror = () => {
//         setListening(false);
//       };
//     }
//   }, [commandRoutes, moduleData]); // 👈 add dependencies
//   const speak = (message, callback) => {
//     const speech = new SpeechSynthesisUtterance(message);
//     speech.lang = "en-US";
//     speech.rate = 1;
//     speech.onstart = () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop();
//       }
//     };
//     speech.onend = () => {
//       if (callback) {
//         callback();
//       } else {
//         if (!listening) {
//           setTimeout(() => startListening(), 500);
//         }
//       }
//     };
//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(speech);
//   };
//   const startListening = () => {
//     if (recognitionRef.current && !listening) {
//       console.log("🎤 Starting recognition...");
//       recognitionRef.current.start();
//     }
//   };
//   return (
//     <div className="d-flex flex-column vh-100 ">
//       <nav className="navbar  px-3" style={{ background: Constants.primaryColor }}>
//         <div className="d-flex align-items-center">
//           {/* <button className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}> */}
//           <div className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}>
//             <img
//               src="/unnamed.png"
//               alt="Profile"
//               className="rounded-circle profile"
//             />
//           </div>
//           {/* </button> */}
//           <span className="navbar-brand mb-0 h1 text-white">CRM ERP</span>
//         </div>
//         <div className="position-relative">
//           <div className="mx-auto w-100 d-none d-md-block">
//             <input
//               type="text"
//               className="form-control ps-5"
//               placeholder="Search..."
//               onChange={handleSearch}
//             />
//             <FaMicrophone
//               size={30}
//               className={`position-absolute top-50 end-0 translate-middle-y p-1 ${listening ? "text-success" : "text-secondary"}`}
//               style={{ cursor: "pointer", marginRight: "10px" }}
//               onClick={startListening}
//             />
//           </div>
//           {results.length > 0 && (
//             <ul
//               className="list-group mt-2 position-absolute bg-white w-100 shadow"
//               style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}   >
//               {results.map((item, index) => (
//                 <li
//                   key={index}
//                   className="list-group-item cursor-pointer"
//                   onClick={() => handleRedirect(item.value)}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {item.label}
//                 </li>
//               ))}

//             </ul>
//           )}
//         </div>
//         <div className="d-flex align-items-center">
//           {/* <img
//       src="/unnamed.png"
//       alt="Profile"
//       className="rounded-circle profile"
//     /> */}
//         </div>
//       </nav>
//       <div className="d-flex w-100">
//         <div
//           className=" text-white p-3 d-flex flex-column"
//           style={{
//             width: collapsed ? '80px' : '250px',
//             height: '100vh',
//             transition: 'width 0.3s',
//             flexShrink: 0,
//             background: Constants.primaryColor,
//             overflowY: 'auto',
//             scrollbarWidth: 'none',
//             position: "relative",
//           }}
//         >
//           <ul className="nav flex-column">
//             {(role === "admin" || role === "developer") && (
//               <SidebarItem
//                 to="/dashboard"
//                 icon={<FaTachometerAlt />}
//                 label="Dashboard"
//                 collapsed={collapsed}
//               />
//             )}

//             {allowedMenus.map((menu, idx) => (
//               <SidebarDropdown
//                 key={idx}
//                 label={menu.label}
//                 icon={menu.icon}
//                 collapsed={collapsed}
//                 isOpen={sections[menu.label]}
//                 toggleOpen={() => toggleSection(menu.label)}
//                 subItems={menu.subItems}
//               />
//             ))}
//           </ul>
//           <div style={{ marginTop: "auto", marginBottom: "50px" }}>
//             <button className="btn w-100 d-flex align-items-center justify-content-center" onClick={handleLogout} style={{ background: "#fbcbd7ff" }}>
//               <FaSignOutAlt className="me-2" />
//               {!collapsed && 'SignOut'}
//             </button>
//           </div>
//         </div>
//         <div
//           className="main-content flex-grow-1 p-3 "
//           style={{
//             paddingLeft: collapsed ? "80px" : "250px",
//             transition: "margin-left 0.3s ease-in-out",
//             width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
//             background: "#fff",
//             minHeight: "100vh",
//             borderRadius: "10px",
//             boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",

//           }}
//         >
//           <Outlet />

//           {/* Global Footer */}
//           {/* <footer className="text-center py-2 mt-3" style={{ borderTop: "1px solid #ddd", fontSize: "14px", color: "#666", }} >
//             © Created and Maintained By Artemis NextGen </footer> */}
//         </div>



//       </div>
//     </div>

//   );
// };

// const SidebarItem = React.memo(({ to, icon, label, collapsed }) => (
//   <li className="nav-item">

//     <NavLink
//       to={to}
//       end
//       className={({ isActive }) =>
//         `nav-link d-flex align-items-center ${isActive ? "active-tab" : "text-white"
//         }`
//       }

//       style={({ isActive }) => ({
//         background: isActive ? "#fbcbd7ff" : "transparent",
//         color: isActive ? "#fff" : "#ddd",
//         borderRadius: "8px",
//         padding: "8px",
//       })}
//     >
//       {icon}
//       {!collapsed && <span className="ms-2">{label}</span>}
//     </NavLink>
//   </li>
// ));




// const SidebarDropdown = React.memo(({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const itemRef = useRef(null);
//   const [menuPos, setMenuPos] = useState({ top: 0 });

//   // Determine if screen is mobile/tablet
//   const isMobileOrTablet = window.innerWidth <= 992;

//   const handleClick = () => {
//     if (!collapsed) {
//       toggleOpen(); // inline submenu for full sidebar
//     } else if (isMobileOrTablet) {
//       // Only show floating menu on mobile/tablet
//       const rect = itemRef.current.getBoundingClientRect();
//       setMenuPos({ top: rect.top });
//       setShowMenu((prev) => !prev);
//     }
//   };

//   // Close floating menu when clicking outside
//   useEffect(() => {
//     const handleOutsideClick = (e) => {
//       if (itemRef.current && !itemRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };
//     if (showMenu && isMobileOrTablet) {
//       document.addEventListener("mousedown", handleOutsideClick);
//     }
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [showMenu, isMobileOrTablet]);

//   return (
//     <li className="nav-item mb-3 position-relative" ref={itemRef}>
//       <div
//         className="nav-link text-white d-flex align-items-center"
//         style={{ cursor: "pointer" }}
//         onClick={handleClick}
//       >
//         {icon}
//         {!collapsed && <span className="ms-2">{label}</span>}
//         {collapsed && <span className="ms-auto">&#9662;</span>}
//       </div>

//       {/* Inline submenu for expanded sidebar */}
//       {isOpen && !collapsed && (
//         <ul className="nav flex-column ps-3">
//           {subItems.map((item, idx) => (
//             <SidebarItem key={idx} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
//           ))}
//         </ul>
//       )}

//       {/* Floating submenu for mobile/tablet only */}
//       {collapsed && showMenu && isMobileOrTablet && (
//         <ul
//           className="list-group position-fixed shadow"
//           style={{
//             minWidth: "200px",
//             zIndex: 9999,
//             left: "80px",       // next to collapsed sidebar
//             top: menuPos.top,
//           }}
//         >
//           <li className="list-group-item fw-bold bg-light">{label}</li>
//           {subItems.map((item, idx) => (
//             <li key={idx} className="list-group-item p-2">
//               <NavLink
//                 to={item.to}
//                 className="text-decoration-none text-dark d-flex align-items-center"
//                 onClick={() => setShowMenu(false)}
//               >
//                 {item.icon}
//                 <span className="ms-2">{item.label}</span>
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// });

// export default Dashboard;




// After removing the roles and roles permissions

import { toast } from "react-toastify";
import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
  FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell,
  FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn, FaUserTie, FaLandmark, FaCalendarAlt, FaPeopleArrows
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Outlet, Link, NavLink } from "react-router-dom";
import { FaClipboardList, FaCalendarCheck, FaRegHandshake, FaRegClock, FaTasks, FaRegTimesCircle, FaClipboard, FaRegEdit } from 'react-icons/fa';
import { FaMicrophone } from "react-icons/fa";
import VoiceNavigation from "./VoiceNavigation";
import { FaMoneyBillWave, FaParking, FaChartBar } from "react-icons/fa";
// import RolePermissions from "./RolePermissions";
import Constants from "./Constants";

import RolePermissions from "./RolePermissions";
import { useSession } from "./SessionContext";
const Dashboard = () => {

  const { authenticated, name, id, groups } = useSession();
  // const session = useSession();

  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [results, setResults] = useState([]);
  // const [session, setSession] = useState([]);
  const [collapsed, setCollapsed] = useState(() => {
    // Always collapsed on small screens
    return window.innerWidth <= 768;
  });
  const [sections, setSections] = useState({
    admin: false,
    developer: false,
    sales: false,
    crm: false,
  });
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = useCallback(() => {
    if (window.innerWidth > 768) {
      setCollapsed((prev) => !prev);   // expand/collapse only on tablet/laptop
    } else {
      setCollapsed(true);  // force collapsed on mobile
    }
  }, []);


  // const toggleSection = useCallback((section) => {
  //   setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  // }, []);
  // const toggleSection = useCallback((section) => {
  //   setSections((prev) => {
  //     const newState = {};
  //     for (const key in prev) {
  //       newState[key] = false;
  //     }

  //     newState[section] = !prev[section];
  //     return newState;
  //   });
  // }, []);
  // const toggleSection = useCallback((section) => {
  //   setSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],  // Only toggle the clicked section, don't reset others
  //   }));
  // }, []);




  // SI function:
  // const handleLogout = () => {
  //   const form = document.createElement('form');
  //   form.method = 'POST';
  //   form.action = 'https://localhost:5289/api/auth/logout'; // BFF logout endpoint
  //   // if you require CSRF/session id as query param, add it here:
  //   // form.action += '?sessionId=' + encodeURIComponent(sessionId);
  //   document.body.appendChild(form);
  //   form.submit();
  // }


  const handleLogout = () => {
    const form = document.createElement("form");
    form.method = "POST";
    // Backend logout endpoint with redirect back to Home page
    form.action = "https://localhost:5289/api/auth/logout?returnUrl=https://localhost:5173/";
    document.body.appendChild(form);
    form.submit();
  };



  const handleClose = () => {
    console.log("Closing the voice navigation.");
    setShowVoiceRecognition(false);
  };


  // for path system :moduleData
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setQuery(searchTerm);
    if (searchTerm) {
      const filteredResults = moduleData.filter((item) =>
        item.label.toLowerCase().includes(searchTerm)
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };
  const handleRedirect = (path) => {
    navigate(path);
    setQuery("");
    setResults([]);
  };

  // for voice system => commandRoutes
  useEffect(() => {
    if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      const recognition = recognitionRef.current;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.trim().toLowerCase();
        console.log("🎤 Recognized command:", command);
        let matchedPath = null;
        for (const key in allCommandRoutes) {
          if (command.includes(key)) {
            matchedPath = allCommandRoutes[key];
            break;
          }
        }
        if (!matchedPath) {
          toast.error("❓ Command not recognized");
          speak("Command not recognized");
          return;
        }
        const hasAccess = moduleData.some(
          (item) => item.value.toLowerCase() === matchedPath.toLowerCase()
        );
        if (hasAccess) {
          speak(`Redirecting to ${command}`, () => {
            handleRedirect(matchedPath);
          });
        } else {
          toast.error(" You don’t have access to this module");
          speak("You don’t have access to this module");
        }
        setTimeout(() => {
          setListening(false);
        }, 1000);
      };
      recognition.onerror = () => {
        setListening(false);
      };
    }

  }, []); // 👈 add dependencies
  const speak = (message, callback) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    speech.onstart = () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
    speech.onend = () => {
      if (callback) {
        callback();
      } else {
        if (!listening) {
          setTimeout(() => startListening(), 500);
        }
      }
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };
  const startListening = () => {
    if (recognitionRef.current && !listening) {
      console.log("🎤 Starting recognition...");
      recognitionRef.current.start();
    }
  };

  // const allMenus = {
  //   // 🔹 Common Menus — shown to everyone (Admin + Developer + Sales + CRM)
  //   common: [
  //     {
  //       label: "Admin",
  //       icon: <FaUserShield />,
  //       subItems: [
  //         { to: "/dashboard/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
  //         { to: "/dashboard/admin/banker", icon: <FaLandmark />, label: "Banker Details" },
  //       ],
  //     },
  //     {
  //       label: "Developer",
  //       icon: <FaCode />,
  //       subItems: [
  //         { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
  //         { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
  //         { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
  //         { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
  //         { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
  //         { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
  //       ],
  //     },
  //     {
  //       label: "Sales",
  //       icon: <FaChartLine />,
  //       subItems: [
  //         { to: "/dashboard/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
  //         { to: "/dashboard/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" },
  //         { to: "/dashboard/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" },
  //         { to: "/dashboard/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
  //         { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
  //         { to: "/dashboard/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
  //         { to: "/dashboard/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
  //         { to: "/dashboard/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
  //         { to: "/dashboard/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
  //         { to: "/dashboard/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
  //         { to: "/dashboard/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
  //         { to: "/dashboard/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
  //         { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
  //         { to: "/dashboard/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },
  //       ],
  //     },
  //     {
  //       label: "CRM",
  //       icon: <FaCogs />,
  //       subItems: [
  //         { to: "/dashboard/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
  //         { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
  //         { to: "/dashboard/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
  //         { to: "/dashboard/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
  //         { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
  //         { to: "/dashboard/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
  //         { to: "/dashboard/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
  //         { to: "/dashboard/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
  //         { to: "/dashboard/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotment Report" },
  //         { to: "/dashboard/crm/parkingreport", icon: <FaParking />, label: "Parking Report" },
  //         { to: "/dashboard/crm/misreport", icon: <FaChartBar />, label: "MIS Report" },
  //       ],
  //     },
  //   ],

  //   // 🔹 Role-based variations (optional if you want later)
  //   developer: [
  //     {
  //       label: "Developer Section",
  //       icon: <FaCode />,
  //       subItems: [
  //         { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
  //         { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
  //         { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
  //       ],
  //     },
  //   ],

  //   sales: [
  //     {
  //       label: "Sales Module",
  //       icon: <FaChartLine />,
  //       subItems: [
  //         { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
  //         { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
  //       ],
  //     },
  //   ],

  //   crm: [
  //     {
  //       label: "CRM Module",
  //       icon: <FaCogs />,
  //       subItems: [
  //         { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
  //         { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
  //       ],
  //     },
  //   ],

  //   receiptionist: [
  //     {
  //       label: "Receptionist Module",
  //       icon: <FaChartLine />,
  //       subItems: [{ to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" }],
  //     },
  //   ],
  // };


  //  Map Azure AD group names → RolePermissions keys




  const allMenus = {
    admin: [
      {
        label: "Admin Section",
        icon: <FaUserShield />,
        subItems: [

          { to: "/dashboard/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
          { to: "/dashboard/admin/banker", icon: <FaLandmark />, label: "Banker Details" },
        ]
      },
      {
        // Developer :
        label: "Developer",
        icon: <FaCode />,
        subItems: [
          { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
          { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
          { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
          { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
          { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
          { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
        ]
      },
      // Sales :
      {
        label: "Sales",
        icon: <FaChartLine />,
        subItems: [

          { to: "/dashboard/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/dashboard/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" },
          { to: "/dashboard/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" },
          { to: "/dashboard/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
          { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
          { to: "/dashboard/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
          // { to: "/dashboard/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
          { to: "/dashboard/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
          // { to: "/dashboard/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
          { to: "/dashboard/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
          { to: "/dashboard/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
          { to: "/dashboard/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
          { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
          { to: "/dashboard/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },
        ]
      },

      // CRM :

      {
        label: "CRM",
        icon: <FaCogs />,
        subItems: [


          { to: "/dashboard/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
          { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
          { to: "/dashboard/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
          { to: "/dashboard/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
          { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
          { to: "/dashboard/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
          { to: "/dashboard/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
          { to: "/dashboard/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
          { to: "/dashboard/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotement Report" },
          { to: "/dashboard/crm/parkingreport", icon: <FaParking />, label: "Parking Report" },
          { to: "/dashboard/crm/misreport", icon: <FaChartBar />, label: "MIS Report" },



        ],
      },
    ],

    developer: [
      {
        label: "Admin Section",
        icon: <FaUserShield />,
        subItems: [
          { to: "/dashboard/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
          { to: "/dashboard/admin/banker", icon: <FaLandmark />, label: "Banker Details" },
        ]
      },
      {
        label: "Developer",
        icon: <FaCode />,
        subItems: [
          { to: "/dashboard/developer/sharespace", icon: <FaCode />, label: "Share Space" },
          { to: "/dashboard/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
          { to: "/dashboard/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
          { to: "/dashboard/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
          { to: "/dashboard/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
          { to: "/dashboard/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
        ]
      },
      {
        label: "Sales",
        icon: <FaChartLine />,
        subItems: [
          { to: "/dashboard/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/dashboard/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" },
          { to: "/dashboard/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" },
          { to: "/dashboard/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
          { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
          { to: "/dashboard/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
          // { to: "/dashboard/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
          { to: "/dashboard/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
          // { to: "/dashboard/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
          { to: "/dashboard/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
          { to: "/dashboard/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
          { to: "/dashboard/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
          { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
          { to: "/dashboard/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },
        ]
      },
      {
        label: "CRM",
        icon: <FaCogs />,
        subItems: [
          { to: "/dashboard/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
          { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
          { to: "/dashboard/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
          { to: "/dashboard/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
          { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
          { to: "/dashboard/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
          { to: "/dashboard/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
          { to: "/dashboard/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
          { to: "/dashboard/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotement Report" },
          { to: "/dashboard/crm/parkingreport", icon: <FaParking />, label: "Parking Report" },
          { to: "/dashboard/crm/misreport", icon: <FaChartBar />, label: "MIS Report" },
        ]
      },
    ],
    sales: [
      {
        label: "Sales Module",
        icon: <FaChartLine />,
        subItems: [
          { to: "/dashboard/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" },
          { to: "/dashboard/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" },
          { to: "/dashboard/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" },
          { to: "/dashboard/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
          // { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
          { to: "/dashboard/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
          // { to: "/dashboard/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
          { to: "/dashboard/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
          // { to: "/dashboard/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
          { to: "/dashboard/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
          { to: "/dashboard/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
          { to: "/dashboard/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
          { to: "/dashboard/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
          { to: "/dashboard/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },
        ],
      },
    ],
    crm: [
      {
        label: "CRM Module",
        icon: <FaCogs />,
        subItems: [

          { to: "/dashboard/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
          { to: "/dashboard/crm/crm", icon: <FaUserCheck />, label: "CRM" },
          { to: "/dashboard/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
          { to: "/dashboard/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
          { to: "/dashboard/crm/registration", icon: <FaStamp />, label: "Registration" },
          { to: "/dashboard/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
          { to: "/dashboard/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
          { to: "/dashboard/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
          { to: "/dashboard/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotement Report" },
          { to: "/dashboard/crm/parkingreport", icon: <FaParking />, label: "Parking Report" },
          { to: "/dashboard/crm/misreport", icon: <FaChartBar />, label: "MIS Report" },
        ],
      },
    ],
    receiptionist: [
      {
        label: "Sales Module",
        icon: <FaChartLine />,
        subItems: [
          { to: "/dashboard/sales/leads", icon: <FaClipboardList />, label: "Leads" },
        ],
      }
    ],
  };

  const groupToRoleMap = {
    "grp-rems-admin": "admin",
    "grp-rems-developer": "developer",
    "grp-rems-sales": "sales",
    "grp-rems-crm": "crm",
    "grp-sales-receiptionist": "receiptionist",
  };

  //  Determine the role from user groups (first valid one)
  const userRole =
    groups?.map((g) => groupToRoleMap[g.toLowerCase()]).find(Boolean) || "sales"; // fallback to sales if none found

  const toggleSection = useCallback(
  (section) => {
    if (
      (section === "sales" && userRole === "sales") ||
      (section === "crm" && userRole === "crm")
    ) {
      console.log(`🚫 Prevented toggle for ${section} (role = ${userRole})`);
      return; // Don't allow toggle for same-role modules
    }

    console.log(`🔹 Toggling section: ${section}`);
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  },
  [userRole]
);
  // const [sections, setSections] = useState({
  //   admin: false,
  //   developer: false,
  //   sales: userRole === "sales",
  //   crm: userRole === "crm",
  // });
  // const roleMenus = RolePermissions[userRole] || [];
  // const roleMenus = groupToRoleMap[userRole] || [];
  const roleMenus = allMenus[userRole] || [];


 



  useEffect(() => {
    console.log("✅ Dashboard Mounted");
    console.log("Session Data:", { authenticated, name, id, groups });

    // Check what role got detected
    console.log("Detected user groups:", groups);
    console.log("Mapped user role:", userRole);

    // Check which menu is being loaded
    console.log("Loaded roleMenus:", roleMenus);
  }, [authenticated, groups, userRole]);

useEffect(() => {
  setSections({
    admin: false,
    developer: false,
    sales: userRole === "sales",
    crm: userRole === "crm",
  });
}, [userRole]);

  return (
    <div className="d-flex flex-column vh-100 ">
      <nav className="navbar  px-3" style={{ background: Constants.primaryColor }}>
        <div className="d-flex align-items-center">
          {/* <button className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}> */}
          <div className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            <img
              src="/unnamed.png"
              alt="Profile"
              className="rounded-circle profile"
            />
          </div>
          {/* </button> */}
          <span className="navbar-brand mb-0 h1 text-white">CRM ERP</span>
        </div>
        <div className=" position-relative">
          <div className="mx-auto w-100 d-none d-md-block">
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <FaMicrophone
              size={30}
              className={`position-absolute top-50 end-0 translate-middle-y p-1 ${listening ? "text-success" : "text-secondary"}`}
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={startListening}
            />
          </div>
          {results.length > 0 && (
            <ul
              className="list-group mt-2 position-absolute bg-white w-100 shadow"
              style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}   >
              {results.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item cursor-pointer"
                  onClick={() => handleRedirect(item.value)}
                  style={{ cursor: "pointer" }}
                >
                  {item.label}
                </li>
              ))}

            </ul>
          )}
        </div>



        <div className="d-flex align-items-center">
          {/* <img
      src="/unnamed.png"
      alt="Profile"
      className="rounded-circle profile"
    /> */}
        </div>
      </nav>
      <div className="d-flex w-100">
        <div
          className=" text-white p-3 d-flex flex-column"
          style={{
            width: collapsed ? '80px' : '250px',
            height: '100vh',
            transition: 'width 0.3s',
            flexShrink: 0,
            background: Constants.primaryColor,
            overflowY: 'auto',
            scrollbarWidth: 'none',
            position: "relative",
          }}
        >
          <ul className="nav flex-column">

            {/* {allMenus.common?.map((menu, idx) => ( */}
            {/* {allowedMenus.map((menuKey, idx) => { */}
            {/* {roleMenus.map((menuKey, idx) => {
              const menu = allMenus[menuKey.toLowerCase()];
              if (!menu) return null;

              return menu.map((submenu, i) => (

                < SidebarDropdown
                  key={idx}
                  label={menu.label}
                  icon={menu.icon}
                  collapsed={collapsed}
                  isOpen={sections[menu.label]}
                  toggleOpen={() => toggleSection(menu.label)}
                  subItems={menu.subItems}
                />
              ));
            })}; */}
            {roleMenus.map((menu, idx) => (
              <SidebarDropdown
                key={idx}
                label={menu.label}
                icon={menu.icon}
                collapsed={collapsed}
                isOpen={sections[menu.label]}
                toggleOpen={() => toggleSection(menu.label)}
                subItems={menu.subItems}
              />
            ))}

          </ul>
          <div style={{ marginTop: "auto", marginBottom: "50px" }}>
            <button className="btn w-100 d-flex align-items-center justify-content-center" onClick={handleLogout} style={{ background: "#fbcbd7ff" }}>
              <FaSignOutAlt className="me-2" />
              {!collapsed && 'SignOut'}
            </button>
          </div>
        </div>
        <div
          className="main-content flex-grow-1 p-3 "
          style={{
            paddingLeft: collapsed ? "80px" : "250px",
            transition: "margin-left 0.3s ease-in-out",
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
            background: "#fff",
            minHeight: "100vh",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",

          }}
        >
          <Outlet />

          {/* Global Footer */}
          {/* <footer className="text-center py-2 mt-3" style={{ borderTop: "1px solid #ddd", fontSize: "14px", color: "#666", }} >
            © Created and Maintained By Artemis NextGen </footer> */}
        </div>



      </div>
    </div>

  );
};

const SidebarItem = React.memo(({ to, icon, label, collapsed }) => (
  <li className="nav-item">

    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `nav-link d-flex align-items-center ${isActive ? "active-tab" : "text-white"
        }`
      }

      style={({ isActive }) => ({
        background: isActive ? "#fbcbd7ff" : "transparent",
        color: isActive ? "#fff" : "#ddd",
        borderRadius: "8px",
        padding: "8px",
      })}
    >
      {icon}
      {!collapsed && <span className="ms-2">{label}</span>}
    </NavLink>
  </li>
));




const SidebarDropdown = React.memo(({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => {
  const [showMenu, setShowMenu] = useState(false);
  const itemRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ top: 0 });

  // Determine if screen is mobile/tablet
  const isMobileOrTablet = window.innerWidth <= 992;

  const handleClick = () => {
    if (!collapsed) {
      toggleOpen(); // inline submenu for full sidebar
    } else if (isMobileOrTablet) {
      // Only show floating menu on mobile/tablet
      const rect = itemRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.top });
      setShowMenu((prev) => !prev);
    }
  };

  // Close floating menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (itemRef.current && !itemRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu && isMobileOrTablet) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [showMenu, isMobileOrTablet]);

  return (
    <li className="nav-item mb-3 position-relative" ref={itemRef}>
      <div
        className="nav-link text-white d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        {icon}
        {!collapsed && <span className="ms-2">{label}</span>}
        {collapsed && <span className="ms-auto">&#9662;</span>}
      </div>

      {/* Inline submenu for expanded sidebar */}
      {isOpen && !collapsed && (
        <ul className="nav flex-column ps-3">
          {subItems.map((item, idx) => (
            <SidebarItem key={idx} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
          ))}
        </ul>
      )}

      {/* Floating submenu for mobile/tablet only */}
      {collapsed && showMenu && isMobileOrTablet && (
        <ul
          className="list-group position-fixed shadow"
          style={{
            minWidth: "200px",
            zIndex: 9999,
            left: "80px",       // next to collapsed sidebar
            top: menuPos.top,
          }}
        >
          <li className="list-group-item fw-bold bg-light">{label}</li>
          {subItems.map((item, idx) => (
            <li key={idx} className="list-group-item p-2">
              <NavLink
                to={item.to}
                className="text-decoration-none text-dark d-flex align-items-center"
                onClick={() => setShowMenu(false)}
              >
                {item.icon}
                <span className="ms-2">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
});

export default Dashboard;

