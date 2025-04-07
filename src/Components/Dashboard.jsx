

// import React, { useState } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import { 
//   FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaUser, FaSignOutAlt 
// } from 'react-icons/fa';

// const Dashboard = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [developerOpen, setDeveloperOpen] = useState(false);
//   const [salesOpen, setSalesOpen] = useState(false);
//   const [crmOpen, setCrmOpen] = useState(false);

//   const navigate = useNavigate();

//   const toggleSidebar = () => setCollapsed(!collapsed);

//   const handleLogout = () => {
   
//     localStorage.removeItem('authToken');
//     navigate('/login');
//   };

//   return (
//     <div className="d-flex flex-column vh-100">
//       {/* Top Navbar */}
//       <nav className="navbar navbar-dark bg-dark px-3">
//         <div className="d-flex align-items-center">
//           <button className="btn btn-dark me-3" onClick={toggleSidebar}>
//             <FaBars size={20} />
//           </button>
//           <span className="navbar-brand mb-0 h1">CRM ERP</span>
//         </div>
//         <div className="mx-auto w-50">
//           <input type="text" className="form-control" placeholder="Search..." />
//         </div>
//         <div>
//           <img 
//             src="https://i.pravatar.cc/40?img=3" 
//             alt="Profile"
//             className="rounded-circle"
//           />
//         </div>
//       </nav>

//       <div className="d-flex flex-grow-1">
//         {/* Sidebar */}
//         <div 
//           className="bg-dark text-white p-3 d-flex flex-column" 
//           style={{ width: collapsed ? '80px' : '250px', transition: 'width 0.3s' }}
//         >
//           <ul className="nav flex-column">
//             <li className="nav-item mb-3">
//               <Link to="/" className="nav-link text-white d-flex align-items-center">
//                 <FaTachometerAlt className="me-2" />
//                 {!collapsed && <span>Dashboard</span>}
//               </Link>
//             </li>
//             <li className="nav-item mb-3">
//               <div 
//                 className="nav-link text-white d-flex align-items-center" 
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setAdminOpen(!adminOpen)}
//               >
//                 <FaUserShield className="me-2" />
//                 {!collapsed && <span>Admin Section</span>}
//               </div>
//               {adminOpen && !collapsed && (
//                 <ul className="nav flex-column ps-3">
//                   <li className="nav-item mb-2">
//                     <Link to="/admin/salesperson" className="nav-link text-white d-flex align-items-center">
//                       <FaUserShield className="me-2" />
//                       <span>Sales Person</span>
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li className="nav-item mb-3">
//               <div 
//                 className="nav-link text-white d-flex align-items-center" 
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setDeveloperOpen(!developerOpen)}
//               >
//                 <FaCode className="me-2" />
//                 {!collapsed && <span>Developer Module</span>}
//               </div>
//               {developerOpen && !collapsed && (
//                 <ul className="nav flex-column ps-3">
//                   <li className="nav-item mb-2">
//                     <Link to="/developer/sharespace" className="nav-link text-white d-flex align-items-center">
//                       <FaCode className="me-2" />
//                       <span>Share Space</span>
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li className="nav-item mb-3">
//               <div 
//                 className="nav-link text-white d-flex align-items-center" 
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setSalesOpen(!salesOpen)}
//               >
//                 <FaChartLine className="me-2" />
//                 {!collapsed && <span>Sales Module</span>}
//               </div>
//               {salesOpen && !collapsed && (
//                 <ul className="nav flex-column ps-3">
//                   <li className="nav-item mb-2">
//                     <Link to="/sales/lostvisits" className="nav-link text-white d-flex align-items-center">
//                       <FaChartLine className="me-2" />
//                       <span>Lost Visits</span>
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//             <li className="nav-item mb-3">
//               <div 
//                 className="nav-link text-white d-flex align-items-center" 
//                 style={{ cursor: 'pointer' }}
//                 onClick={() => setCrmOpen(!crmOpen)}
//               >
//                 <FaCogs className="me-2" />
//                 {!collapsed && <span>CRM Module</span>}
//               </div>
//               {crmOpen && !collapsed && (
//                 <ul className="nav flex-column ps-3">
//                   <li className="nav-item mb-2">
//                     <Link to="/crm/registration" className="nav-link text-white d-flex align-items-center">
//                       <FaUser className="me-2" />
//                       <span>Registration</span>
//                     </Link>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>

//           {/* Logout Option */}
//           <div className="mt-auto">
//             <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
//               <FaSignOutAlt className="me-2" />
//               {!collapsed && 'Logout'}
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-grow-1 p-4">
//           <Outlet /> {/* Render the child routes */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;



// import React, { useState, useCallback } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {
//   FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt
// } from 'react-icons/fa';
// import { FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell } from "react-icons/fa";
// import { 
//   FaInfoCircle, 
//   FaBuilding, 
//   FaFileInvoiceDollar, 
//   FaBullhorn, 
//   FaUsers,  // <-- Add this
//   FaUserCheck, 
//   FaHome, 
//   FaFileAlt, 
//   FaFileSignature, 
//   FaStamp, 
//   FaDraftingCompass, 
//   FaBell 
// } from "react-icons/fa";

// import React, { useState, useCallback } from 'react';
// import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {
//   FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
//   FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, 
//   FaDraftingCompass, FaBell, FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn
// } from 'react-icons/fa';

// ===
// import React from "react";
// import { useState, useCallback } from "react";

// import {
//   FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
//   FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell,
//   FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn
// } from 'react-icons/fa';


import React, { useState, useCallback,useRef,useEffect } from "react"; 
import { 
  FaBars, FaTachometerAlt, FaUserShield, FaCode, FaChartLine, FaCogs, FaSignOutAlt,
  FaUsers, FaUserCheck, FaHome, FaFileAlt, FaFileSignature, FaStamp, FaDraftingCompass, FaBell,
  FaInfoCircle, FaBuilding, FaFileInvoiceDollar, FaBullhorn , FaUserTie ,FaLandmark,FaCalendarAlt,FaPeopleArrows
} from "react-icons/fa";  
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import {  FaClipboardList, FaCalendarCheck, FaRegHandshake, FaRegClock, FaTasks, FaRegTimesCircle, FaClipboard, FaRegEdit } from 'react-icons/fa';

import {  FaMicrophone } from "react-icons/fa";
import VoiceNavigation from "./VoiceNavigation";





const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [query, setQuery] = useState("");

  // const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

// const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);

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
  // const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Memoized toggle functions
  const toggleSidebar = useCallback(() => setCollapsed((prev) => !prev), []);
 
  const toggleSection = useCallback((section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }, [navigate]);


  // const menuItems = [
  //   { to: "/developer/sharespace", icon: <FaCode />, label: "Share Space" },
  //   { to: "/developer/basicinfo", icon: <FaInfoCircle />, label: "Basic Information" },
  //   { to: "/developer/projectinventory", icon: <FaBuilding />, label: "Project Inventory" },
  //   { to: "/developer/costsheet", icon: <FaFileInvoiceDollar />, label: "Cost Sheet Details" },
  //   { to: "/developer/salesmis", icon: <FaChartLine />, label: "Sales MIS" },
  //   { to: "/developer/marketing", icon: <FaBullhorn />, label: "Marketing" },
  // ];


  // handleClose function that will be passed to VoiceNavigation as a prop
  const handleClose = () => {
    console.log("Closing the voice navigation.");
    setShowVoiceRecognition(false); // Hide the voice recognition when it's closed
  };


  // const moduleData = [
  //   {name :"CRM" ,path: "CRM"},
  //   {name :"Share Space" ,path: "CRM > Share Space"},
  //   { name : "Home Loan Applicability" , path :"CRM > Home Loan Applicability"},
  //   { name : "CRM" , path :"CRM > CRM"},
  //   { name : "OCR Collection" , path :"CRM > OCR Collection"},
  //   { name : "Agreement" , path :"CRM > Agreement"},
  //   { name : "Registration" , path :"CRM > Registration"},
  //   { name: "Engineer & Architect Letter", path: " CRM > Engineer & Architect Letter" },
  //   { name: "Demand Raised", path: " CRM > Demand Raised" },
  //   { name: "Daily Collection", path: " CRM > Daily Collection" },
  //   { name: "Flat Allotement Report", path: " CRM > Flat Allotement Report" },
  //   { name: "Parking Report", path: " CRM > Parking Report" },
  //   { name: "MIS Report", path: " CRM > MIS Report" },

  //   {name : "Sales" , path :"Sales"},
  //   {name: "Dashboard" , path :" Sales > Dashboard"},
  //   {name: "Calendar" , path :" Sales > Calendar"},
  //   {name: "Share Space" , path :" Sales > Share Space"},
  //   {name: "Shared By Developer" , path :" Sales > Shared By Developer"},
  //   {name: "Leads" , path :" Sales > Leads"},
  //   {name: "Leads Follow Up" , path :" Sales > Leads Follow Up"},
  //   {name: "Lost Leads" , path :" Sales > Lost Leads"}, 
  //   {name: "First Visit" , path :" Sales >First Visit"}, 
  //   {name: "First Visit Follow Up" , path :" Sales > First Visit Follow Up"},
  //   {name: "First Visit Steps" , path :" Sales > First Visit Steps"},
  //   {name: "Lost Visits" , path :" Sales > Lost visits"},
  //   {name: "Templates" , path :" Sales > Templates"},
  //   { name: "Booking Form", path: "Sales > Booking Form" },
  //   { name: "Channel Partner", path: "Sales > Channel Partner" },


    
  // ];

  const moduleData = [
    // { name: "CRM", path: "CRM", to: "/crm" }xxxxxxxxxxxxxxxx ,
    { name: "Share Space", path: "CRM > Share Space", to: "/crm/sharespace" },
    { name: "Home Loan Applicability", path: "CRM > Home Loan Applicability", to: "/crm/homeloan" },
    { name: "OCR Collection", path: "CRM > OCR Collection", to: "/crm/OCR" },
    { name: "Agreement", path: "CRM > Agreement", to: "/crm/agreement" },
    { name: "Registration", path: "CRM > Registration", to: "/crm/registration" },
    { name: "Engineer & Architect Letter", path: "CRM > Engineer & Architect Letter", to: "/crm/Architect" },
    { name: "Demand Raised", path: "CRM > Demand Raised", to: "/crm/demand-raised" },
    { name: "Daily Collection", path: "CRM > Daily Collection", to: "/crm/dailycollection" },
    { name: "Flat Allotment Report", path: "CRM > Flat Allotment Report", to: "/crm/flatallotmentreport" },
    { name: "Parking Report", path: "CRM > Parking Report", to: "/crm/parkingreport" },
    { name: "MIS Report", path: "CRM > MIS Report", to: "/crm/misreport" },
  
    { name: "Sales", path: "Sales", to: "/sales" },
    { name: "Dashboard", path: "Sales > Dashboard", to: "/sales/salesdashboard" },
    { name: "Calendar", path: "Sales > Calendar", to: "/sales/salescalander" },
    { name: "Share Space", path: "Sales > Share Space", to: "/sales/sharespace" },
    { name: "Shared By Developer", path: "Sales > Shared By Developer", to: "/sales/sharedbydeveloper" },
    { name: "Leads", path: "Sales > Leads", to: "/sales/leads" },
    { name: "Leads Follow Up", path: "Sales > Leads Follow Up", to: "/sales/leadsfollowup" },
    { name: "Lost Leads", path: "Sales > Lost Leads", to: "/sales/lostleads" },
    { name: "First Visit", path: "Sales > First Visit", to: "/sales/firstvisits" },
    { name: "First Visit Follow Up", path: "Sales > First Visit Follow Up", to: "/sales/firstvisitfollowup" },
    { name: "First Visit Steps", path: "Sales > First Visit Steps", to: "/sales/firstvisitsteps" },
    { name: "Lost Visits", path: "Sales > Lost Visits", to: "/sales/saleslostvisits" },
    { name: "Templates", path: "Sales > Templates", to: "/sales/salestemplates" },
    { name: "Booking Form", path: "Sales > Booking Form", to: "/sales/bookingform" },
    { name: "Channel Partner", path: "Sales > Channel Partner", to: "/sales/channelpartner" },

    {name : "Banker Details" , path :"Admin > Banker Details" , to :"/admin/banker"},
    {name :"Sales Person" ,path : "Admin > Sales Person" ,to :"/admin/salesperson"},

    { name: "Share Space", path : "Developer/ Share Space" ,to: "/developer/sharespace",  },
    {name: "Basic Information", path :"Developer / Basic Information", to: "/developer/basicinfo",  },
    { name: "Project Inventory" ,  path :"Developer /Project Inventory", to: "/developer/projectinventory", },
    { name: "Cost Sheet Details" , path :"Developer/Cost Sheet Details", to: "/developer/costsheet", },
    { name: "Sales MIS", path :"Developer/Sales MIS" ,to: "/developer/salesmis",  },
    { name: "Marketing" ,path :"Developer/Marketing", to: "/developer/marketing",  }
  ];
  


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


// useEffect(() => {
//   if (!recognitionRef.current && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//     recognitionRef.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     const recognition = recognitionRef.current;

//     recognition.continuous = false;
//     recognition.interimResults = false;
//     recognition.lang = "en-US";

//     recognition.onstart = () => {
//       setListening(true); // 🔴 Mic turns red
//     };

//     recognition.onend = () => {
//       setListening(false); // ✅ Mic turns green after listening
//     };
    

//     recognition.onresult = (event) => {
//       let command = event.results[0][0].transcript.trim().toLowerCase();
//       console.log("Recognized command:", command);
//       console.log("redirecting");
//       // Process command (Navigate or Speak)
//       setTimeout(() => {
//         setListening(false); // ✅ Ensure mic turns green after execution
//       }, 1000);
//     };

//     recognition.onerror = () => {
//       setListening(false); // Reset in case of error
//     };
//   }
// }, []);

// const speak = (message) => {
//   const speech = new SpeechSynthesisUtterance(message);
//   speech.lang = "en-US";
//   speech.rate = 1;

//   speech.onstart = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop();
//     }
//   };

//   speech.onend = () => {
//     if (!listening) {
//       setTimeout(() => startListening(), 500);
//     }
//   };

//   window.speechSynthesis.speak(speech);
// };


 
//  const startListening = () => {
//   if (recognitionRef.current && !listening) {
//     console.log("🎤 Starting recognition...");
//     recognitionRef.current.start();
//   }
// };

const commandRoutes = {
//   "go to home": "/home",
//   "open lost visit": "/lost-visit",
//   "open dashboard": "/dashboard",
//   "open report": "/report",
//   "open booking": "/booking",
// };

  // Admin Module
  "admin banker": "/admin/banker",
  "admin sales module": "/admin/sales-module",

  // CRM Module
  "agreement": "/crm/agreement",
  "architect": "/crm/architect",
  "dashboard": "/crm",
  "daily collection": "/crm/daily-collection",
  "demand": "/crm/demand",
  "flat allotment report": "/crm/flat-allotment-report",
  "home loan": "/crm/home-loan",
  "mis report": "/crm/mis-report",
  "ocr": "/crm/ocr",
  "parking report": "/crm/parking-report",
  "registration": "/crm/registration",
  "share space": "/crm/sharespacecrm",

  // Developer Module
  "share space developer": "/developer/sharespace",
  "basic information": "/developer/basicinfo",
  "project inventory": "/developer/projectinventory",
  "cost sheet details": "/developer/costsheet",
  "sales mis": "/developer/salesmis",
  "marketing": "/developer/marketing",

  // Sales Module
  "sales": "/sales",
  "dashboard sales": "/sales/salesdashboard",
  "calendar": "/sales/salescalander",
  "shared by developer": "/sales/sharedbydeveloper",
  "leads": "/sales/leads",
  "leads follow up": "/sales/leadsfollowup",
  "lost leads": "/sales/lostleads",
  "first visit": "/sales/firstvisits",
  "first visit follow up": "/sales/firstvisitfollowup",
  "first visit steps": "/sales/firstvisitsteps",
  "lost visits": "/sales/saleslostvisits",
  "templates": "/sales/salestemplates",
  "booking form": "/sales/bookingform",
  "channel partner": "/sales/channelpartner",

  // Common Routes
  "dashboard": "/dashboard",
  "profile": "/profile",
  "settings": "/settings",
  "reports": "/reports",
}

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
      console.log("Recognized command:", command);

      const path = commandRoutes[command];
     
      if (path) {
        
        speak(`Redirecting to ${command}`, () => {
          handleRedirect(path);
        });
      } else {
        speak("Command not recognized");
      }

      setTimeout(() => {
        setListening(false);
      }, 1000);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  }
}, []);

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
     
<nav className="navbar navbar-dark px-3" style={{ background: "#3621a9" }}>

  <div className="d-flex align-items-center">
    <button className="btn btn-dark me-3" onClick={toggleSidebar}>
      <FaBars size={20} />
    </button>
    <span className="navbar-brand mb-0 h1">CRM ERP</span>
  </div>
  

<div className="position-relative">
     
      {/* <div className="mx-auto w-100">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          onChange={handleSearch} 
        />
      </div> */}
      <div className="mx-auto w-100">
    <input
      type="text"
      className="form-control ps-5" // Add left padding to make space for the icon
      placeholder="Search..."
      onChange={handleSearch}
    /> 
     {/* <FaMicrophone
      size={30}
      className="position-absolute top-50 end-0 translate-middle-y text-black p-1"
      style={{ cursor: "pointer", paddingLeft: "10px"}}
      onClick={() => setShowVoiceRecognition(true)}
    />  */}
    <FaMicrophone
  size={30}
  className={`position-absolute top-50 end-0 translate-middle-y p-1 ${listening ? "text-danger" : "text-success"}`} 
  style={{ cursor: "pointer", marginRight: "10px" }}
  onClick={startListening} 
/> 

{/* <input
      type="text"
      className="form-control ps-5"
      placeholder="Search..."
      onChange={handleSearch}
    />
    <FaMicrophone
  size={30}
  className={`position-absolute top-50 end-0 translate-middle-y p-1 ${listening ? "text-danger" : "text-success"}`} 
  style={{ cursor: "pointer", marginRight: "10px" }}
  onClick={startListening} 
/> */}

  </div>


   


 

{results.length > 0 && (
        <ul
          className="list-group mt-2 position-absolute bg-white w-100 shadow"
          style={{ zIndex: 1050, maxHeight: "200px", overflowY: "auto" }}
        >
          {results.map((item, index) => (
            <li
              key={index}
              className="list-group-item cursor-pointer"
              onClick={() => handleRedirect(item.to)}
              style={{ cursor: "pointer" }}
            >
              {/* ✅ Show breadcrumb-style path */}
              {item.path}
            </li>
          ))}
        </ul>
      )}
    </div>
  <div className="d-flex align-items-center">
   
    {/* <FaMicrophone
            size={20}
            className="me-3 text-white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowVoiceRecognition(true)}
          /> */}
    {/* Profile Image */}
    <img
      src="/unnamed.png"
      alt="Profile"
      className="rounded-circle profile"
    />
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
      background:"#3621a9",
      overflowY: 'auto',
      scrollbarWidth: 'none',
      //  background: "linear-gradient(180deg, #ff6347 0%, #2c1a80 100%)",


    }}
  >
    <ul className="nav flex-column">
      <SidebarItem to="/" icon={<FaTachometerAlt />} label="Dashboard" collapsed={collapsed} />

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
    { to: "/crm/dailycollection", icon: <FaBell />, label: "Daily Collection" },
    { to: "/crm/flatallotmentreport", icon: <FaBell />, label: "Flat Allotement Report" },
    {to :"/crm/parkingreport" ,icon :<FaBell />, label :"Parking Report"},
    {to :"/crm/misreport" ,icon :<FaBell />, label :"MIS Report"},
      ]}
      />
   
    </ul>

   
    <div style={{ marginTop: "auto", marginBottom: "50px" }}>

      <button className="btn btn-danger w-100 d-flex align-items-center justify-content-center" onClick={handleLogout}>
        <FaSignOutAlt className="me-2" />
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

    // background: "#f8f9fa",  
    // background: "#ffcdd2",
   background:" #edf7fc",
    minHeight: "100vh",  
    borderRadius: "10px",  
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",  
    
  }}
>
  <Outlet />
</div>

{/* <div
  className="main-content flex-grow-1 p-3"
  style={{
    paddingLeft: collapsed ? "80px" : "250px",
    transition: "all 0.3s ease-in-out",
    background: "#edf7fc",
    minHeight: "100vh",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: collapsed ? "calc(100% - 80px)" : "calc(100% - 250px)", // Adjust width dynamically
  }}
>
  {/* <Outlet /> 
</div> */}


  </div>
</div>

  );
};

const SidebarItem = React.memo(({ to, icon, label, collapsed }) => (
  <li className="nav-item">
    <Link to={to} className="nav-link text-white d-flex align-items-center">
      {icon}
      {!collapsed && <span className="ms-2">{label}</span>}
    </Link>
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


