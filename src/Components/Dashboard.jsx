import { toast } from "react-toastify";
import React, { useState, useCallback,useRef,useEffect } from "react"; 
import { 
  FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
  FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell,
  FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn , FaUserTie ,FaLandmark,FaCalendarAlt,FaPeopleArrows
} from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
import { Outlet, Link, NavLink } from "react-router-dom";
import {  FaClipboardList, FaCalendarCheck, FaRegHandshake, FaRegClock, FaTasks, FaRegTimesCircle, FaClipboard, FaRegEdit } from 'react-icons/fa';
import {  FaMicrophone } from "react-icons/fa";
import VoiceNavigation from "./VoiceNavigation";
import { FaMoneyBillWave,  FaParking, FaChartBar } from "react-icons/fa";
import RolePermissions from "./RolePermissions";
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const recognitionRef = useRef(null);
 const [listening, setListening] = useState(false);
 const [results, setResults] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [sections, setSections] = useState({
    admin: false,
    developer: false,
    sales: false,
    crm: false,
  });
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = useCallback(() => setCollapsed((prev) => !prev), []);
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


//  For path system :
  // const moduleData = [
    
  //   { name: "Share Space", path: "CRM > Share Space", to: "dashboard/crm/sharespace" },
  //   { name: "Home Loan Applicability", path: "CRM > Home Loan Applicability", to: "dashboard/crm/homeloan" },
  //   { name: "OCR Collection", path: "CRM > OCR Collection", to: "dashboard/crm/OCR" },
  //   { name: "Agreement", path: "CRM > Agreement", to: "dashboard/crm/agreement" },
  //   { name: "Registration", path: "CRM > Registration", to: "dashboard/crm/registration" },
  //   { name: "Engineer & Architect Letter", path: "CRM > Engineer & Architect Letter", to: "dashboard/crm/Architect" },
  //   { name: "Demand Raised", path: "CRM > Demand Raised", to: "dashboard/crm/demand-raised" },
  //   { name: "Daily Collection", path: "CRM > Daily Collection", to: "dashboard/crm/dailycollection" },
  //   { name: "Flat Allotment Report", path: "CRM > Flat Allotment Report", to: "dashboard/crm/flatallotmentreport" },
  //   { name: "Parking Report", path: "CRM > Parking Report", to: "dashboard/crm/parkingreport" },
  //   { name: "MIS Report", path: "CRM > MIS Report", to: "dashboard/crm/misreport" },
  
  //   { name: "Sales", path: "Sales", to: "/sales" },
  //   { name: "Dashboard", path: "Sales > Dashboard", to: "dashboard/sales/salesdashboard" },
  //   { name: "Calendar", path: "Sales > Calendar", to: "dashboard/sales/salescalander" },
  //   { name: "Share Space", path: "Sales > Share Space", to: "dashboard/sales/sharespace" },
  //   { name: "Shared By Developer", path: "Sales > Shared By Developer", to: "dashboard/sales/sharedbydeveloper" },
  //   { name: "Leads", path: "Sales > Leads", to: "/dashboard/sales/leads" },
  //   { name: "Leads Follow Up", path: "Sales > Leads Follow Up", to: "dashboard/sales/leadsfollowup" },
  //   { name: "Lost Leads", path: "Sales > Lost Leads", to: "dashboard/sales/lostleads" },
  //   { name: "First Visit", path: "Sales > First Visit", to: "dashboard/sales/firstvisits" },
  //   { name: "First Visit Follow Up", path: "Sales > First Visit Follow Up", to: "dashboard/sales/firstvisitfollowup" },
  //   { name: "First Visit Steps", path: "Sales > First Visit Steps", to: "dashboard/sales/firstvisitsteps" },
  //   { name: "Lost Visits", path: "Sales > Lost Visits", to: "dashboard/sales/saleslostvisits" },
  //   { name: "Templates", path: "Sales > Templates", to: "dashboard/sales/salestemplates" },
  //   { name: "Booking Form", path: "Sales > Booking Form", to: "dashboard/sales/bookingform" },
  //   { name: "Channel Partner", path: "Sales > Channel Partner", to: "dashboard/sales/channelpartner" },
      
  //   {name : "Banker Details" , path :"Admin > Banker Details" , to :"dashboard/admin/banker"},
  //   {name :"Sales Person" ,path : "Admin > Sales Person" ,to :"dashboard/admin/salesperson"},

  //   { name: "Share Space", path : "Developer/ Share Space" ,to: "dashboard/developer/sharespace",  },
  //   {name: "Basic Information", path :"Developer / Basic Information", to: "dashboard/developer/basicinfo",  },
  //   { name: "Project Inventory" ,  path :"Developer /Project Inventory", to: "dashboard/developer/projectinventory", },
  //   { name: "Cost Sheet Details" , path :"Developer/Cost Sheet Details", to: "dashboard/developer/costsheet", },
  //   { name: "Sales MIS", path :"Developer/Sales MIS" ,to: "dashboard/developer/salesmis",  },
  //   { name: "Marketing" ,path :"Developer/Marketing", to: "dashboard/developer/marketing",  }
  // ];
  


const handleSearch = (event) => {
  const searchTerm = event.target.value.toLowerCase();
  setQuery(searchTerm);

  if (searchTerm) {
    const filteredResults = moduleData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
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



// For voice system :
// const commandRoutes = {
//   // Admin Module
//   "admin banker": "/dashboard/admin/banker",  //done
//   "admin sales module": "/dashboard/admin/salesperson",   //done

//   // CRM Module
//   "agreement": "/dashboard/crm/agreement",   //done
//   "architect": "/dashboard/crm/architect",   //done
//   // "dashboard": "/crm",
//   "daily collection": "/dashboard/crm/dailycollection",   //done
//   "demand": "/dashboard/crm/demand",          //done
//   "flat allotment report": "/dashboard/crm/flatallotmentreport",  //done
//   "home loan": "/dashboard/crm/HomeLoan",    //done
//   "mis report": "/dashboard/crm/misreport",  //done
//   "ocr": "/dashboard/crm/ocr",              //done
//   "parking report": "/dashboard/crm/parkingreport",   //done
//   "registration": "/dashboard/crm/registration",         //done
  

//   // Developer Module
//   "share space developer": "/dashboard/developer/sharespace",  //done
//   "basic information": "/dashboard/developer/basicinfo",      //done
//   "project inventory": "/dashboard/developer/projectinventory",  //done
//   "cost sheet details": "/dashboard/developer/costsheet",    //done
//   "sales mis": "/dashboard/developer/salesmis",        //done
//   "marketing": "/dashboard/developer/marketing",      //done

//   // Sales Module
//   // "sales": "/sales",
//   "dashboard sales": "/dashboard/sales/salesdashboard",     //done
//   "calendar": "/dashboard/sales/salescalander",               //done
//   "shared by developer": "/dashboard/sales/sharedbydeveloper",   //done
//   "leads": "/dashboard/sales/leads",                       //done
//   "leads follow up": "/dashboard/sales/leadsfollowup",     //done
//   "lost leads": "/dashboard/sales/lostleads",         //done
//   "first visit": "/dashboard/sales/firstvisits",       //done
//   "first visit follow up": "/dashboard/sales/firstvisitfollowup",  //done
//   "first visit steps": "/dashboard/sales/firstvisitsteps",     //done
//   "lost visits": "/dashboard/sales/saleslostvisits",     //done
//   "templates": "/dashboard/sales/salestemplates",    //done
//   "booking form": "/dashboard/sales/bookingform",    //done
//   "channel partner": "/dashboard/sales/channelpartner",   //done

  
// }



// First useeefect for voice system
// useEffect(() => {
//   if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//     recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     const recognition = recognitionRef.current;

//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setListening(true);
//     };

//     recognition.onend = () => {
//       setListening(false);
//     };

//     recognition.onresult = (event) => {
//       let command = event.results[0][0].transcript.trim().toLowerCase();
//       console.log("Recognized command:", command);

//       const path = commandRoutes[command];
     
//       if (path) {
        
//         speak(`Redirecting to ${command}`, () => {
//           handleRedirect(path);
//         });
//       } else {
//         speak("Command not recognized");
//       }

//       setTimeout(() => {
//         setListening(false);
//       }, 1000);
//     };

//     recognition.onerror = () => {
//       setListening(false);
//     };
//   }
// }, []);





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

//  recognition.onresult = (event) => {
//   let command = event.results[0][0].transcript.trim().toLowerCase();
//   console.log("Recognized command:", command);

//   const path = commandRoutes[command];

//   if (path) {
//     // ✅ Command exists → now check access
//     const hasAccess = moduleData.some((item) => item.value === path);

//     if (hasAccess) {
//       // User has access → redirect
//       speak(`Redirecting to ${command}`, () => {
//         handleRedirect(path);
//       });
//     } else {
//       // ❌ Command exists but not in allowed modules
//       toast.error("🚫 You don’t have access to this module");
//       speak("You don’t have access to this module");
//     }
//   } else {
//     // ❌ Command not found in commandRoutes
//     toast.error("❓ Command not recognized");
//     speak("Command not recognized");
//   }

//   setTimeout(() => {
//     setListening(false);
//   }, 1000);
// };



recognition.onresult = (event) => {
  let command = event.results[0][0].transcript.trim().toLowerCase();
  console.log("🎤 Recognized command:", command);

  // 1️⃣ First: see if it exists at all in ALL commands
  let matchedPath = null;
  for (const key in allCommandRoutes) {
    if (command.includes(key)) {
      matchedPath = allCommandRoutes[key];
      break;
    }
  }

  if (!matchedPath) {
    // ❌ Not found anywhere
    toast.error("❓ Command not recognized");
    speak("Command not recognized");
    return;
  }

  // 2️⃣ Found a valid command → now check access
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
const speak = (message,callback) => {
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
     
<nav className="navbar navbar-dark px-3" style={{ background: "#800020" }}>

  <div className="d-flex align-items-center">
    <button className="btn  me-3" onClick={toggleSidebar}>
      <FaBars size={20} style={{color:"#fff"}}/>
    </button>
    <span className="navbar-brand mb-0 h1">CRM ERP</span>
  </div>
  

<div className="position-relative">
     
      
      <div className="mx-auto w-100">
    <input
      type="text"
      className="form-control ps-5" 
      placeholder="Search..."
      onChange={handleSearch}
    /> 
    
    <FaMicrophone
  size={30}
  className={`position-absolute top-50 end-0 translate-middle-y p-1 ${
    listening ? "text-success" : "text-secondary"}`} 
  style={{ cursor: "pointer", marginRight: "10px" }}
  onClick={startListening} 
/> 



  </div>


   


 

{results.length > 0 && (
        <ul
          className="list-group mt-2 position-absolute bg-white w-100 shadow"
          style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}
        >
          {/* {results.map((item, index) => (
            <li
              key={index}
              className="list-group-item cursor-pointer"
              onClick={() => handleRedirect(item.to)}
              style={{ cursor: "pointer" }}
            >
              
              {item.path}
            </li>
          ))} */}
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
{/* {showVoiceRecognition && <VoiceNavigation />} */}
{/* {showVoiceRecognition && <VoiceNavigation onClose={handleClose} />} */}

       <div className="d-flex w-100">
 
  <div
    className=" text-white p-3 d-flex flex-column"
    style={{
      width: collapsed ? '80px' : '250px',  
      height: '100vh',  
      transition: 'width 0.3s',  
      flexShrink: 0,  
      background:"#800020",
      overflowY: 'auto',
      scrollbarWidth: 'none',
       }}
  >
    {/* <ul className="nav flex-column">
     
 <SidebarItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" collapsed={collapsed} />
      <SidebarDropdown
        label="Admin Section"
        icon={<FaUserShield />}
        collapsed={collapsed}
        isOpen={sections.admin}
        toggleOpen={() => toggleSection('admin')}
        subItems={[
         
          { to: "/admin/salesperson", icon: <FaUserTie />, label: "Sales Person" },
          { to: "/admin/banker", icon: <FaLandmark />, label: "Banker Details" }
          
        ]}
      />

      <SidebarDropdown
        label="Developer Module"
        icon={<FaCode />}
        collapsed={collapsed}
        isOpen={sections.developer}
        toggleOpen={() => toggleSection('developer')}
        subItems={[
         
          { to: "/developer/sharespace", icon: <FaCode />, label: "Share Space" },
          { to: "/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
          { to: "/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
          { to: "/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
          { to: "/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
          { to: "/developer/marketing", icon: <FaBullhorn />, label: "Marketing" }
         ] }
      />

      <SidebarDropdown
        label="Sales Module"
        icon={<FaChartLine />}
        collapsed={collapsed}
        isOpen={sections.sales}
        toggleOpen={() => toggleSection('sales')}
        subItems={[
        
          { to: "/sales/salesdashboard", icon: <FaTachometerAlt />, label: "Dashboard" }, 
{ to: "/sales/salescalander", icon: <FaCalendarAlt />, label: "Calendar" }, 
{ to: "/sales/sharespace", icon: <FaPeopleArrows />, label: "Share Space" } ,
  { to: "/sales/sharedbydeveloper", icon: <FaUsers />, label: "Shared By Developer" },
  { to: "/sales/leads", icon: <FaClipboardList />, label: "Leads" },
  { to: "/sales/leadsfollowup", icon: <FaCalendarCheck />, label: "Leads Follow Up" },
  { to: "/sales/lostleads", icon: <FaRegTimesCircle />, label: "Lost Leads" },
  { to: "/sales/firstvisits", icon: <FaRegHandshake />, label: "First Visit" },
  { to: "/sales/firstvisitfollowup", icon: <FaRegClock />, label: "First Visit Follow Up" },
  { to: "/sales/firstvisitsteps", icon: <FaTasks />, label: "First Visit Steps" },
  { to: "/sales/saleslostvisits", icon: <FaRegTimesCircle />, label: "Lost Visits" },
  { to: "/sales/salestemplates", icon: <FaClipboard />, label: "Templates" },
  { to: "/sales/bookingform", icon: <FaRegEdit />, label: "Booking Form" },
  { to: "/sales/channelpartner", icon: <FaRegEdit />, label: "Channel Partner" },

        ]}
      />

      <SidebarDropdown
        label="CRM Module"
        icon={<FaCogs />}
        collapsed={collapsed}
        isOpen={sections.crm}
        toggleOpen={() => toggleSection('crm')}
        subItems={[
       
        { to: "/crm/sharespace", icon: <FaUsers />, label: "Share Space" },
   
    { to: "/crm/HomeLoan", icon: <FaHome />, label: "Home Loan Applicability" },
    { to: "/crm/crm", icon: <FaUserCheck />, label: "CRM" },
    { to: "/crm/OCR", icon: <FaFileAlt />, label: "OCR Collection" },
    { to: "/crm/Agreement", icon: <FaFileSignature />, label: "Agreement" },
    { to: "/crm/registration", icon: <FaStamp />, label: "Registration" },
    { to: "/crm/Architect", icon: <FaDraftingCompass />, label: "Engineer & Architect Letter" },
    { to: "/crm/Demand", icon: <FaBell />, label: "Demand Raised" },
    { to: "/crm/dailycollection", icon: <FaMoneyBillWave />, label: "Daily Collection" },
    { to: "/crm/flatallotmentreport", icon: <FaHome />, label: "Flat Allotement Report" },
    {to :"/crm/parkingreport" ,icon :<FaParking />, label :"Parking Report"},
    {to :"/crm/misreport" ,icon :<FaChartBar />, label :"MIS Report"},
      ]}
      />
   
    </ul> */}

   <ul className="nav flex-column">
     <SidebarItem to="/dashboard" icon={<FaTachometerAlt />} label="Dashboard" collapsed={collapsed} />
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

      <button className="btn w-100 d-flex align-items-center justify-content-center" onClick={handleLogout} style={{background:"#fbcbd7ff"}}>
        <FaSignOutAlt className="me-2"  />
        {!collapsed && 'SignOut'}
      </button>
    </div>
  </div>

  <div
  className="main-content flex-grow-1 p-3"
  style={{
   
    paddingLeft: collapsed ? "80px" : "250px",  
    transition: "margin-left 0.3s ease-in-out",
    width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
   background:"#fff",
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
        `nav-link d-flex align-items-center ${
          isActive ? "active-tab" : "text-white"
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

const SidebarDropdown = React.memo(({ label, icon, collapsed, isOpen, toggleOpen, subItems }) => (
  <li className="nav-item mb-3">
    <div className="nav-link text-white d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={toggleOpen}>
      {icon}
      {!collapsed && <span className="ms-2">{label}</span>}
    </div>
    {isOpen && !collapsed && (
      <ul className="nav flex-column ps-3">
        {subItems.map((item, index) => (
          <SidebarItem key={index} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed} />
        ))}
      </ul>
    )}
  </li>
));

export default Dashboard; 


