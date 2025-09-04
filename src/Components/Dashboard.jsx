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
//   // const [collapsed, setCollapsed] = useState(false);
// //   const [collapsed, setCollapsed] = useState(() => {
// //   // Default collapsed on small screens
// //   return window.innerWidth <= 768;
// // });

// const [collapsed, setCollapsed] = useState(() => {
//   // Always collapsed on small screens
//   return window.innerWidth <= 768;
// });

//   const [sections, setSections] = useState({
//     admin: false,
//     developer: false,
//     sales: false,
//     crm: false,
//   });
//   const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
//   const navigate = useNavigate();
//   // const toggleSidebar = useCallback(() => setCollapsed((prev) => !prev), []);
// //   const toggleSidebar = useCallback(() => {
// //   if (window.innerWidth > 768) {   // only toggle for medium+ screens
// //     setCollapsed((prev) => !prev);
// //   }
// // }, []);

// const toggleSidebar = useCallback(() => {
//   if (window.innerWidth > 768) {
//     setCollapsed((prev) => !prev);   // expand/collapse only on tablet/laptop
//   } else {
//     setCollapsed(true);  // force collapsed on mobile
//   }
// }, []);


//   const toggleSection = useCallback((section) => {
//     setSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   }, []);
//   const handleLogout = useCallback(() => {
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   }, [navigate]);

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

//   // for path system :moduleData

  
// const handleSearch = (event) => {
//   const searchTerm = event.target.value.toLowerCase();
//   setQuery(searchTerm);

//   if (searchTerm) {
//     const filteredResults = moduleData.filter((item) =>
//       item.label.toLowerCase().includes(searchTerm)
//     );
//     setResults(filteredResults);
//   } else {
//     setResults([]);
//   }
// };


//   const handleRedirect = (path) => {
//     navigate(path);
//     setQuery("");
//     setResults([]);
//   };

// // for voice system => commandRoutes

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

//      recognition.onresult = (event) => {
//         let command = event.results[0][0].transcript.trim().toLowerCase();
//         console.log("🎤 Recognized command:", command);
//       let matchedPath = null;
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
//           <button className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            
//                {/* <img
//             src="/unnamed.png"
//             alt="Profile"
//             className="rounded-circle profile"
//             /> */}
//             {/* <img
//   src="/unnamed.png"
//   alt="Profile"
//   className="rounded-circle profile"
//   style={{ cursor: window.innerWidth > 768 ? "pointer" : "default" }}
//   // onClick={toggleSidebar}
//     onClick={() => {
//     if (window.innerWidth > 768) toggleSidebar();
//   }}
// /> */}

//  <img
//       src="/unnamed.png"
//       alt="Profile"
//       className="rounded-circle profile"
//     />

//           </button>
//           <span className="navbar-brand mb-0 h1">CRM ERP</span>
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
//   </div>
//  {results.length > 0 && (
//             <ul
//               className="list-group mt-2 position-absolute bg-white w-100 shadow"
//               style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}   >
//              {results.map((item, index) => (
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
//             background:Constants.primaryColor,
//             overflowY: 'auto',
//             scrollbarWidth: 'none',
//           }}
//         >
       

//           <ul className="nav flex-column">
// {(role === "admin" || role === "developer") && (
//     <SidebarItem
//       to="/dashboard"
//       icon={<FaTachometerAlt />}
//       label="Dashboard"
//       collapsed={collapsed}
//     />
//   )}
          
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
//         </div>
//       </div>
//     </div>

//   );
// };

// const SidebarItem = React.memo(({ to, icon, label, collapsed }) => (
//   <li className="nav-item">

//     <NavLink
//       to={to}
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

// // const SidebarDropdown = React.memo(({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => (
// //   <li className="nav-item mb-3">
// //     <div className="nav-link text-white d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={toggleOpen}>
// //       {icon}
// //       {!collapsed && <span className="ms-2">{label}</span>}
// //     </div>
// //     {isOpen && !collapsed && (
// //       <ul className="nav flex-column ps-3">
// //         {subItems.map((item, index) => (
// //           <SidebarItem key={index} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
// //         ))}
// //       </ul>
// //     )}
// //   </li>
// // ));
// const SidebarDropdown = React.memo(
//   ({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => {
//     const isMobileOrTablet = window.innerWidth <= 992; // small/medium

//     return (
//       <li className="nav-item mb-3 position-relative">
//         <div
//           className="nav-link text-white d-flex align-items-center"
//           style={{ cursor: "pointer" }}
//           onClick={toggleOpen}
//         >
//           {icon}
//           {!collapsed && <span className="ms-2">{label}</span>}
//           {/* Dropdown arrow only when collapsed on small/medium */}
//           {collapsed && isMobileOrTablet && (
//             <span className="ms-auto">&#9662;</span>
//           )}
//         </div>

//         {/* Expanded sidebar: normal inline list */}
//         {isOpen && !collapsed && !isMobileOrTablet && (
//           <ul className="nav flex-column ps-3">
//             {subItems.map((item, index) => (
//               <SidebarItem
//                 key={index}
//                 to={item.to}
//                 icon={item.icon}
//                 label={item.label}
//                 collapsed={collapsed}
//               />
//             ))}
//           </ul>
//         )}

//         {/* Collapsed + mobile/tablet: floating dropdown */}
//         {isOpen && collapsed && isMobileOrTablet && (
//           <ul
//             className="list-group position-absolute start-100 top-0 ms-2 shadow"
//             style={{ minWidth: "180px", zIndex: 2000 }}
//           >
//             <li className="list-group-item fw-bold bg-light">{label}</li>
//             {subItems.map((item, index) => (
//               <li key={index} className="list-group-item p-2">
//                 <NavLink
//                   to={item.to}
//                   className="text-decoration-none text-dark d-flex align-items-center"
//                 >
//                   {item.icon}
//                   <span className="ms-2">{item.label}</span>
//                 </NavLink>
//               </li>
//             ))}
//           </ul>
//         )}
//       </li>
//     );
//   }
// );




// export default Dashboard;









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
import RolePermissions from "./RolePermissions";
import Constants from "./Constants";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const recognitionRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [results, setResults] = useState([]);
  // const [collapsed, setCollapsed] = useState(false);
//   const [collapsed, setCollapsed] = useState(() => {
//   // Default collapsed on small screens
//   return window.innerWidth <= 768;
// });

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
  // const toggleSidebar = useCallback(() => setCollapsed((prev) => !prev), []);
//   const toggleSidebar = useCallback(() => {
//   if (window.innerWidth > 768) {   // only toggle for medium+ screens
//     setCollapsed((prev) => !prev);
//   }
// }, []);

const toggleSidebar = useCallback(() => {
  if (window.innerWidth > 768) {
    setCollapsed((prev) => !prev);   // expand/collapse only on tablet/laptop
  } else {
    setCollapsed(true);  // force collapsed on mobile
  }
}, []);


  const toggleSection = useCallback((section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);
  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);

  const handleClose = () => {
    console.log("Closing the voice navigation.");
    setShowVoiceRecognition(false);
  };

  const role = localStorage.getItem("userRole");
  const allowedMenus = RolePermissions[role] || [];



  // 🔹 Build ALL commands (for all modules, not filtered by role)
  const buildAllVoiceCommands = (rolePermissions) => {
    const commands = {};
    Object.values(rolePermissions).forEach(menus => {
      menus.forEach(menu => {
        if (menu.subItems) {
          menu.subItems.forEach(item => {
            const command = item.label.toLowerCase();
            commands[command] = item.to;
          });
        }
      });
    });
    return commands;
  };


  // functions for path  and voice system for their respective modules:
  const buildVoiceCommands = (allowedMenus, navigate) => {
    const commands = {};

    allowedMenus.forEach(menu => {
      if (menu.subItems) {
        menu.subItems.forEach(item => {
          const command = item.label.toLowerCase(); // Example: "Leads"
          commands[command] = item.to;             // Example: "/dashboard/sales/leads"
        });
      }
    });

    return commands;
  };

  // 🔹 Build search data only for allowed menus
  const buildSearchData = (allowedMenus) => {
    const searchList = [];

    allowedMenus.forEach(menu => {
      if (menu.subItems) {
        menu.subItems.forEach(item => {
          searchList.push({
            label: item.label,   // e.g. "Leads"
            value: item.to       // e.g. "/dashboard/sales/leads"
          });
        });
      }
    });

    return searchList;
  };



  // ✅ Build commands & search data dynamically

  const allCommandRoutes = buildAllVoiceCommands(RolePermissions); // 🔹 all
  const commandRoutes = buildVoiceCommands(allowedMenus, navigate);  // filtred
  const moduleData = buildSearchData(allowedMenus);

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
          toast.error("🚫 You don’t have access to this module");
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
  }, [commandRoutes, moduleData]); // 👈 add dependencies
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


  return (
    <div className="d-flex flex-column vh-100 ">

      <nav className="navbar  px-3" style={{ background: Constants.primaryColor }}>

        <div className="d-flex align-items-center">
          <button className="btn  me-3 " onClick={toggleSidebar} style={{ cursor: "pointer" }}>
            
             

 <img
      src="/unnamed.png"
      alt="Profile"
      className="rounded-circle profile"
    />

          </button>
          <span className="navbar-brand mb-0 h1">CRM ERP</span>
        </div>


        <div className="position-relative">


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
            background:Constants.primaryColor,
            overflowY: 'auto',
            scrollbarWidth: 'none',
             position: "relative", 
          }}
        >
       

          <ul className="nav flex-column">
{(role === "admin" || role === "developer") && (
    <SidebarItem
      to="/dashboard"
      icon={<FaTachometerAlt />}
      label="Dashboard"
      collapsed={collapsed}
    />
  )}
          
            {allowedMenus.map((menu, idx) => (
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
        </div>
      </div>
    </div>

  );
};

const SidebarItem = React.memo(({ to, icon, label, collapsed }) => (
  <li className="nav-item">

    <NavLink
      to={to}
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





// const SidebarDropdown = React.memo(({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const isMobileOrTablet = window.innerWidth <= 992;

//   // For positioning the floating menu next to the clicked item
//   const itemRef = useRef(null);
//   const [menuPos, setMenuPos] = useState({ top: 0 });

//   const handleMouseEnter = () => {
//     if (collapsed && !isMobileOrTablet) {
//       const rect = itemRef.current.getBoundingClientRect();
//       setMenuPos({ top: rect.top });
//       setShowMenu(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (collapsed && !isMobileOrTablet) {
//       setShowMenu(false);
//     }
//   };

//   const handleClick = () => {
//     if (!collapsed) {
//       toggleOpen();
//     } else if (isMobileOrTablet) {
//       // On mobile/tablet, click opens menu below
//       setShowMenu((prev) => !prev);
//     }
//   };

//   return (
//     <li
//       className="nav-item mb-3 position-relative"
//       ref={itemRef}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
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
      
//       {/* Floating menu for collapsed sidebar on desktop */}
//       {collapsed && showMenu && !isMobileOrTablet && (
//         <ul
//           className="list-group position-fixed shadow"
//           style={{
//             minWidth: "200px",
//             zIndex: 2000,
//             left: "80px", // next to collapsed sidebar
//             top: menuPos.top,
//           }}
//         >
//           <li className="list-group-item fw-bold bg-light">{label}</li>
//           {subItems.map((item, idx) => (
//             <li key={idx} className="list-group-item p-2">
//               <NavLink
//                 to={item.to}
//                 className="text-decoration-none text-dark d-flex align-items-center"
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


