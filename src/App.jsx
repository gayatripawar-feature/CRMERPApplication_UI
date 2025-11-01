// import React from 'react';
// import {useEffect} from "react";
// import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
// import Dashboard from './Components/Dashboard'; 
// import ShareSpace from './Components/Developer/ShareSpace';
// import LostVisitsModule from './Components/LostVisitsModule';
// import CRM from "./Components/CRM/CRM";
// import Registration from "./Components/CRM/Registration";
// import HomeLoan from './Components/CRM/HomeLoan';
// import OCR from "./Components/CRM/OCR";
// import Agreement from './Components/CRM/Agreement';
// import Architect from './Components/CRM/Architect';
// import Demand from './Components/CRM/Demand';
// import Admin_Banker from './Components/Admin/Admin_Banker';
// import BasicInfo from './Components/Developer/BasicInfo';
// import ProjectInventory from './Components/Developer/ProjectInventory';
// import CostSheet from './Components/Developer/CostSheet';
// import Salesmis from './Components/Developer/Salesmis';
// import Marketing from './Components/Developer/Marketing';
// import { Calendar } from 'lucide-react';
// import SalesCalendar from "./Components/Sales/SalesCalendar";
// import SalesDashboard from "./Components/Sales/SalesDashboard";
// import SalesSharespace from "./Components/Sales/SalesSharespace";
// import Leads from "./Components/Sales/Leads";
// import SharedbyDeveloper from "./Components/Sales/SharedbyDeveloper";
// import LeadsFollowUp from './Components/Sales/LeadsFollowup';
// import LostLeads from "./Components/Sales/LostLeads";
// import FirstVisits from "./Components/Sales/FirstVisits";
// import FirstVisitFollowup from "./Components/Sales/FirstVisitFollowup";
// import { toast ,ToastContainer} from "react-toastify";
// import Admin_SalesModule from './Components/Admin/Admin_SalesModule';
// import FirstVisitSteps from './Components/Sales/FirstVisitSteps';
// import SalesLostVisits from "./Components/Sales/SalesLostVisits";
// import Templates from "./Components/Sales/Templates";
// import BookingForm from './Components/Sales/BookingForm';
// import ChannelPartner from './Components/Sales/ChannelPartner';
// import DailyCollection from "./Components/CRM/DailyCollection";
// import FlatAllotementReport from "./Components/CRM/FlatAllotementReport";
// import Parkingreport from "./Components/CRM/Parkingreport";
// import MISReport from "./Components/CRM/MISReport";
// import GeneratePdf from "./Components/Sales/GeneratePdf";
// import Temp5 from "./Components/Sales/Temp5";
// import Login from "./Components/Login";
// import DashboardHome from "./Components/DashboardHome/DashboardHome";
// const App = () => {

//   useEffect(() => {

//     document.title = "CRM ERP Application"; 

//      const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
//      link.type = "image/png";
//      link.rel = "icon";
//      link.href = "/unnamed.png"; 

//      document.head.appendChild(link);  
//    }, []);



//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Routes>


//        {/* <Route path="/login" element={<Login />} /> */}
//          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
// {/* Dashboard and nested routes */}
//          {/* <Route path="/dashboard" element={<Dashboard />} > */}

// {/* <Route path="/" element={<Navigate to="/login" />} /> */}

// <Route path="/login" element={<Login />} />
// <Route path="/" element={<Navigate to="/login" />} />
//    <Route path="/dashboard" element={<Dashboard />} >
//                <Route index element={<DashboardHome />} />

//          {/* <Route path="/" element={<Dashboard />}> */}
//        <Route path="admin/salesperson" element={<Admin_SalesModule />} />
//         <Route path="admin/banker" element={<Admin_Banker/>} />

//          <Route path="developer/sharespace" element={<ShareSpace />} />
//         <Route path ="developer/basicinfo" element={<BasicInfo />} />
//         <Route path ="developer/projectinventory" element={<ProjectInventory />} />
//         <Route path ="developer/costsheet" element={<CostSheet />} />
//         <Route path ="developer/salesmis" element={<Salesmis/>} />
//         <Route path="developer/marketing" element={<Marketing/>}/>

//         <Route path="sales/lostvisits"  element={<LostVisitsModule />} />
//         <Route path ="sales/salesdashboard" element={< SalesDashboard/>} />
//         <Route path ="sales/sharespace" element={< SalesSharespace/>} /> 
//         <Route path = "sales/sharedbydeveloper" element={<SharedbyDeveloper/>}  />
//         <Route path = "sales/leads" element={<Leads/>}  />
//         <Route path = "sales/leadsfollowup" element={<LeadsFollowUp/>}  />
//         <Route path = "sales/LostLeads" element ={<LostLeads />} />
//         <Route path = "sales/firstvisits" element ={<FirstVisits />} />
//         <Route path="sales/firstvisitfollowup" element={<FirstVisitFollowup/>} />
//         <Route path ="sales/FirstVisitSteps" element={<FirstVisitSteps/>} />
//         <Route path ="sales/saleslostvisits" element={<SalesLostVisits/>} />
//         <Route path = "sales/salestemplates" element={<Temp5/>} />
//         <Route path = "sales/bookingform" element={<BookingForm/>} />
//         <Route path = "sales/channelpartner" element={<ChannelPartner/>} />
//          <Route path ="sales/salescalander" element={< SalesCalendar/>} />



//            <Route path="crm/CRM" element={<CRM/>} /> 
//           <Route path="crm/registration" element={<Registration />} /> 
//           <Route path="crm/HomeLoan" element={<HomeLoan />} />
//           <Route path= "crm/ocr" element={<OCR />} />
//           <Route path ="crm/Agreement" element={<Agreement />} />
//           <Route path="crm/architect" element={<Architect/>} />
//           <Route path ="crm/Demand" element={<Demand />} />

//           <Route path ="crm/dailycollection" element={<DailyCollection />} />
//           <Route path ="crm/flatallotmentreport" element ={<FlatAllotementReport />} />
//           <Route path ="crm/parkingreport" element ={<Parkingreport />}  />
//           <Route path ="crm/misreport" element ={<MISReport/>}  />



//         </Route>
//       </Routes>
//     </Router>
//   );
// };

// export default App;







//////////////////

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ShareSpace from "./Components/Developer/ShareSpace";
import LostVisitsModule from "./Components/LostVisitsModule";
import CRM from "./Components/CRM/CRM";
import Registration from "./Components/CRM/Registration";
import HomeLoan from "./Components/CRM/HomeLoan";
import OCR from "./Components/CRM/OCR";
import Agreement from "./Components/CRM/Agreement";
import Architect from "./Components/CRM/Architect";
import Demand from "./Components/CRM/Demand";
import Admin_Banker from "./Components/Admin/Admin_Banker";
import BasicInfo from "./Components/Developer/BasicInfo";
import ProjectInventory from "./Components/Developer/ProjectInventory";
import CostSheet from "./Components/Developer/CostSheet";
import Salesmis from "./Components/Developer/Salesmis";
import Marketing from "./Components/Developer/Marketing";
import SalesCalendar from "./Components/Sales/SalesCalendar";
import SalesDashboard from "./Components/Sales/SalesDashboard";
import SalesSharespace from "./Components/Sales/SalesSharespace";
import Leads from "./Components/Sales/Leads";
import SharedbyDeveloper from "./Components/Sales/SharedbyDeveloper";
import LeadsFollowUp from "./Components/Sales/LeadsFollowup";
import LostLeads from "./Components/Sales/LostLeads";
import FirstVisits from "./Components/Sales/FirstVisits";
import FirstVisitFollowup from "./Components/Sales/FirstVisitFollowup";
import { ToastContainer } from "react-toastify";
import Admin_SalesModule from "./Components/Admin/Admin_SalesModule";
import FirstVisitSteps from "./Components/Sales/FirstVisitSteps";
import SalesLostVisits from "./Components/Sales/SalesLostVisits";
import Temp5 from "./Components/Sales/Temp5";
import BookingForm from "./Components/Sales/BookingForm";
import ChannelPartner from "./Components/Sales/ChannelPartner";
import DailyCollection from "./Components/CRM/DailyCollection";
import FlatAllotementReport from "./Components/CRM/FlatAllotementReport";
import Parkingreport from "./Components/CRM/Parkingreport";
import MISReport from "./Components/CRM/MISReport";
import DashboardHome from "./Components/DashboardHome/DashboardHome";

const App = () => {
  const [session, setSession] = useState({
    authenticated: false,
    name: null,
    loading: true,
  });

  useEffect(() => {
    document.title = "CRM ERP Application";
    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/png";
    link.rel = "icon";
    link.href = "/unnamed.png";
    document.head.appendChild(link);



    //  Check session on app load
    // const refreshSession = async () => {
    //   console.log(" Checking session...");
    //   try {

    //     const response = await fetch("http://localhost:5288/api/auth/session", {
    //       credentials: "include", // include cookies
    //     });

    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log("Session data:", data);
    //       setSession({ ...data, loading: false });
    //     } else {
    //       console.warn(" Session invalid or expired");
    //       setSession({ authenticated: false, name: null, loading: false });
    //     }
    //   } catch (error) {
    //     console.error("Session check failed:", error);
    //     setSession({ authenticated: false, name: null, loading: false });
    //   }
    // };


    const refreshSession = async () => {
  console.log(" Checking app session & Microsoft SSO state...");

  try {
    //  Check your backend session (ASP.NET cookie)
    const response = await fetch("http://localhost:5288/api/auth/session", {
      credentials: "include", // includes your .AspNetCore cookie
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Backend session active:", data);

      // Now check Microsoft SSO cookie validity (client-side)
      checkMicrosoftSSOCookies();

      setSession({ ...data, loading: false });
    } else {
      console.warn("⚠️ Backend session invalid or expired. Checking SSO...");
      setSession({ authenticated: false, name: null, loading: false });

      // Check if Microsoft still has a valid SSO cookie
      checkMicrosoftSSOCookies();
    }
  } catch (error) {
    console.error(" Session check failed:", error);
    setSession({ authenticated: false, name: null, loading: false });

    // Check Microsoft SSO in case of backend failure
    checkMicrosoftSSOCookies();
  }
};


    refreshSession();
  }, []);



  const checkMicrosoftSSOCookies = async () => {
  try {
    console.log(" Checking Microsoft SSO cookie status...");

    // Use a HEAD request to Microsoft endpoint (CORS-safe)
    const ssoCheck = await fetch("https://login.microsoftonline.com/common/oauth2/v2.0/authorize", {
      method: "HEAD",
      mode: "no-cors", // won't expose data, but will show if network request succeeds
    });

    console.log(" Microsoft SSO cookie appears active (request reached Microsoft).");
  } catch (err) {
    console.warn(" Unable to reach Microsoft SSO endpoint — likely no active SSO session.");
  }
};

  //  Show loader while checking session value
  if (session.loading) {
    return <div>Loading...</div>;
  }

  //  If user is not authenticated, redirect to Microsoft login
  if (!session.authenticated) {
    window.location.href =
      "http://localhost:5288/api/auth/login?returnUrl=http://localhost:5173/dashboard";

    return null;
  }

  // If authenticated, render dashboard and routes
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />

          {/* Admin Routes */}
          <Route path="admin/salesperson" element={<Admin_SalesModule />} />
          <Route path="admin/banker" element={<Admin_Banker />} />

          {/* Developer Routes */}
          <Route path="developer/sharespace" element={<ShareSpace />} />
          <Route path="developer/basicinfo" element={<BasicInfo />} />
          <Route path="developer/projectinventory" element={<ProjectInventory />} />
          <Route path="developer/costsheet" element={<CostSheet />} />
          <Route path="developer/salesmis" element={<Salesmis />} />
          <Route path="developer/marketing" element={<Marketing />} />

          {/* Sales Routes */}
          <Route path="sales/lostvisits" element={<LostVisitsModule />} />
          <Route path="sales/salesdashboard" element={<SalesDashboard />} />
          <Route path="sales/sharespace" element={<SalesSharespace />} />
          <Route path="sales/sharedbydeveloper" element={<SharedbyDeveloper />} />
          <Route path="sales/leads" element={<Leads />} />
          <Route path="sales/leadsfollowup" element={<LeadsFollowUp />} />
          <Route path="sales/LostLeads" element={<LostLeads />} />
          <Route path="sales/firstvisits" element={<FirstVisits />} />
          <Route path="sales/firstvisitfollowup" element={<FirstVisitFollowup />} />
          <Route path="sales/FirstVisitSteps" element={<FirstVisitSteps />} />
          <Route path="sales/saleslostvisits" element={<SalesLostVisits />} />
          <Route path="sales/salestemplates" element={<Temp5 />} />
          <Route path="sales/bookingform" element={<BookingForm />} />
          <Route path="sales/channelpartner" element={<ChannelPartner />} />
          <Route path="sales/salescalander" element={<SalesCalendar />} />

          {/* CRM Routes */}
          <Route path="crm/CRM" element={<CRM />} />
          <Route path="crm/registration" element={<Registration />} />
          <Route path="crm/HomeLoan" element={<HomeLoan />} />
          <Route path="crm/ocr" element={<OCR />} />
          <Route path="crm/Agreement" element={<Agreement />} />
          <Route path="crm/architect" element={<Architect />} />
          <Route path="crm/Demand" element={<Demand />} />
          <Route path="crm/dailycollection" element={<DailyCollection />} />
          <Route path="crm/flatallotmentreport" element={<FlatAllotementReport />} />
          <Route path="crm/parkingreport" element={<Parkingreport />} />
          <Route path="crm/misreport" element={<MISReport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
