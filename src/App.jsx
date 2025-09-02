import React from 'react';
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard'; 
import ShareSpace from './Components/Developer/ShareSpace';
import LostVisitsModule from './Components/LostVisitsModule';
import CRM from "./Components/CRM/CRM";
import Registration from "./Components/CRM/Registration";
import HomeLoan from './Components/CRM/HomeLoan';
import OCR from "./Components/CRM/OCR";
import Agreement from './Components/CRM/Agreement';
import Architect from './Components/CRM/Architect';
import Demand from './Components/CRM/Demand';
import Admin_Banker from './Components/Admin/Admin_Banker';
import BasicInfo from './Components/Developer/BasicInfo';
import ProjectInventory from './Components/Developer/ProjectInventory';
import CostSheet from './Components/Developer/CostSheet';
import Salesmis from './Components/Developer/Salesmis';
import Marketing from './Components/Developer/Marketing';
import { Calendar } from 'lucide-react';
import SalesCalendar from "./Components/Sales/SalesCalendar";
import SalesDashboard from "./Components/Sales/SalesDashboard";
import SalesSharespace from "./Components/Sales/SalesSharespace";
import Leads from "./Components/Sales/Leads";
import SharedbyDeveloper from "./Components/Sales/SharedbyDeveloper";
import LeadsFollowUp from './Components/Sales/LeadsFollowup';
import LostLeads from "./Components/Sales/LostLeads";
import FirstVisits from "./Components/Sales/FirstVisits";
import FirstVisitFollowup from "./Components/Sales/FirstVisitFollowup";
import { toast ,ToastContainer} from "react-toastify";
import Admin_SalesModule from './Components/Admin/Admin_SalesModule';
import FirstVisitSteps from './Components/Sales/FirstVisitSteps';
import SalesLostVisits from "./Components/Sales/SalesLostVisits";
import Templates from "./Components/Sales/Templates";
import BookingForm from './Components/Sales/BookingForm';
import ChannelPartner from './Components/Sales/ChannelPartner';
import DailyCollection from "./Components/CRM/DailyCollection";
import FlatAllotementReport from "./Components/CRM/FlatAllotementReport";
import Parkingreport from "./Components/CRM/Parkingreport";
import MISReport from "./Components/CRM/MISReport";
import GeneratePdf from "./Components/Sales/GeneratePdf";
import Temp5 from "./Components/Sales/Temp5";
import Login from "./Components/Login";
import DashboardHome from "./Components/DashboardHome/DashboardHome";
const App = () => {

  useEffect(() => {
   
    document.title = "CRM ERP Application"; 
    
     const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
     link.type = "image/png";
     link.rel = "icon";
     link.href = "/unnamed.png"; 
    
     document.head.appendChild(link);  
   }, []);
  


  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
      

       <Route path="/login" element={<Login />} />
         <Route path="/" element={<Navigate to="/login" />} />
         {/* Dashboard and nested routes */}
         <Route path="/dashboard" element={<Dashboard />} >

               <Route index element={<DashboardHome />} />

         {/* <Route path="/" element={<Dashboard />}> */}
       <Route path="admin/salesperson" element={<Admin_SalesModule />} />
        <Route path="admin/banker" element={<Admin_Banker/>} />

         <Route path="developer/sharespace" element={<ShareSpace />} />
        <Route path ="developer/basicinfo" element={<BasicInfo />} />
        <Route path ="developer/projectinventory" element={<ProjectInventory />} />
        <Route path ="developer/costsheet" element={<CostSheet />} />
        <Route path ="developer/salesmis" element={<Salesmis/>} />
        <Route path="developer/marketing" element={<Marketing/>}/>
        
        <Route path="sales/lostvisits"  element={<LostVisitsModule />} />
        <Route path ="sales/salesdashboard" element={< SalesDashboard/>} />
        <Route path ="sales/sharespace" element={< SalesSharespace/>} /> 
        <Route path = "sales/sharedbydeveloper" element={<SharedbyDeveloper/>}  />
        <Route path = "sales/leads" element={<Leads/>}  />
        <Route path = "sales/leadsfollowup" element={<LeadsFollowUp/>}  />
        <Route path = "sales/LostLeads" element ={<LostLeads />} />
        <Route path = "sales/firstvisits" element ={<FirstVisits />} />
        <Route path="sales/firstvisitfollowup" element={<FirstVisitFollowup/>} />
        <Route path ="sales/FirstVisitSteps" element={<FirstVisitSteps/>} />
        <Route path ="sales/saleslostvisits" element={<SalesLostVisits/>} />
        <Route path = "sales/salestemplates" element={<Temp5/>} />
        <Route path = "sales/bookingform" element={<BookingForm/>} />
        <Route path = "sales/channelpartner" element={<ChannelPartner/>} />
         <Route path ="sales/salescalander" element={< SalesCalendar/>} />
      
         
        
           <Route path="crm/CRM" element={<CRM/>} /> 
          <Route path="crm/registration" element={<Registration />} /> 
          <Route path="crm/HomeLoan" element={<HomeLoan />} />
          <Route path= "crm/ocr" element={<OCR />} />
          <Route path ="crm/Agreement" element={<Agreement />} />
          <Route path="crm/architect" element={<Architect/>} />
          <Route path ="crm/Demand" element={<Demand />} />
  
          <Route path ="crm/dailycollection" element={<DailyCollection />} />
          <Route path ="crm/flatallotmentreport" element ={<FlatAllotementReport />} />
          <Route path ="crm/parkingreport" element ={<Parkingreport />}  />
          <Route path ="crm/misreport" element ={<MISReport/>}  />
       
  

        </Route>
      </Routes>
    </Router>
  );
};

export default App;
