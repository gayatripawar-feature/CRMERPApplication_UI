

import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead,TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import FollowupHistoryTable from './FollowupHistoryTable';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';

import FirstvisitfollowupUndefinedTable from './FirstvisitfollowupUndefinedTable';
import FirstvisitfollowupbookedTable from './FirstvisitfollowupbookedTable';
import leadsfollowup_followuphistory from './leadsfollowup_followuphistory';
import {   FaHourglassStart,FaHistory, FaUserCheck, FaQuestionCircle } from 'react-icons/fa'; 

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';
import Leadsfollowup_followuphistory from './leadsfollowup_followuphistory';



const sections = [
  { label: "Pending Follow Up", icon: <FaHourglassStart size={20} />, createLabel: "Create Firm" }, 
  { label: "Follow Up History", icon: <FaHistory size={20} />, createLabel: "Create Project" }, 
  { label: "Booked", icon: <FaUserCheck size={20} />, createLabel: "Create Landowner Info" }, 
  { label: "Undefined", icon: <FaQuestionCircle size={20} />, createLabel: "Create Flat Allotment Info" }, 
];
  const tabNames = [ "firm", "display", "landowner","allotement"]; 

const FirstvisitFollowup = () => {


     
    const [loans, setLoans] = useState([]);
    const [expandedSection, setExpandedSection] = useState(0); // Ensure expandedSection is defined here
    const [showFirmForm, setShowFirmForm] = useState(false);
    // const [partners, setPartners] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [phases, setPhases] = useState([]);
    const [showLandownerForm, setShowLandownerForm] = useState(false); 
    const [showFlatForm, setShowFlatForm] = useState(false); 
    const [selectedTab, setSelectedTab] = useState("firm");
    const [projectData, setProjectData] = useState([]);
    const[FlatAllotement , setFlatAllotement] = useState([false]);
    const [selectedProject, setSelectedProject] = useState('');
    const [Flatdata, setFlatdata] = useState([]);
    const [selectedBank, setSelectedBank] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const [panError, setPanError] = useState("");
    const [leadType, setLeadType] = useState('');
    const [firmName, setFirmName] = useState("");
    const [firmNameError, setFirmNameError] = useState("");
  const [firms, setFirms] = useState([]);

  const [statusError, setStatusError] = useState('');
    const [mobileError, setMobileError] = useState("");
    const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  
    const [firmPan, setFirmPan] = useState("");
    const [firmPanError, setFirmPanError] = useState("");
    // const [age, setAge] = useState("");
    const [ageError, setAgeError] = useState("");
    const [occupationError, setOccupationError] = useState(""); 
  
    const [closingExecutive, setClosingExecutive] = useState('');
    const [accountNo, setAccountNo] = useState(""); // Initialize the account number state
  const [accountNoError, setAccountNoError] = useState("");
  
  const [ifscCode, setIfscCode] = useState(""); 
  const [ifscCodeError, setIfscCodeError] = useState("");
  // const [status, setStatus] = useState({});
   const [nextFollowUp, setNextFollowUp] = useState('');
  const [status, setStatus] = useState('');

  
    const [fileNames, setFileNames] = useState({
      firmPanNoDocument: "",
      firmGstNoDocument: "",
      firmLightBillForAddressProof: "",
    });
  
  
    const handleFirmPanChange = (e) => {
      const value = e.target.value;
      setFirmPan(value);
      
      const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
      if (!panRegex.test(value)) {
        setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
      } else {
        setFirmPanError(""); 
      }
    };
  
    
     const handleFileChange = (e, key) => {
      const file = e.target.files[0]; 
      if (file) {
        setFileNames((prevState) => ({
          ...prevState,
          [key]: file.name, 
        }));
      }
    };
  
    const handleAgeChange = (e, index) => {
      const value = e.target.value;
      const updatedPartners = [...partners];
      updatedPartners[index].age = value; 
      setPartners(updatedPartners); 
    
 
      validateAge(value); 
    };
  
   
  
    const handleStatusChange = (event) => {
      setStatus(event.target.value);
    };
    
    const handleOccupationChange = (e, index) => {
      const value = e.target.value;
      const updatedPartners = [...partners];
      updatedPartners[index].occupation = value; // Update the occupation field
      setPartners(updatedPartners); // Update the state
    };
  
   
  
  
    const [partners, setPartners] = useState([
      { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }
    ]);
    
    useEffect(() => {
      console.log("Updated Selected Tab:", selectedTab);
      loadLoansData();
    }, []);
  
    const loadLoansData = async () => {
      const data = await fetchLoansData();
      setLoans(data);
    };
  
  
  const handleTabClick = (index) => {
      console.log("Clicked Section Index:", index);
      console.log("Selected Tab Before Update:", selectedTab);
      setSelectedTab(tabNames[index]); 
  };
  
    const handleTabChange = (_, newValue) => {
      setSelectedTab(newValue);
    };
  
  

    


    const handleToggleSection = (index) => {
      if (sections[index].label === "Download PDF") {
        handleDownloadPDF();
        return;
      }
      console.log("Clicked Section Index:", index);
      console.log("Selected Tab Before Update:", selectedTab);
      setExpandedSection(index);  
  
     
    if (sections[index].label === "Follow Up History") {
      setSelectedTab("display");
  } else if (sections[index].label === "Pending Follow Up") {
      setSelectedTab("firm");
  } else if (sections[index].label === "Booked") {
      setSelectedTab("landowner");
  } else if (sections[index].label === "Undefined") {
      setSelectedTab("allotement");
  }
  
    
      setShowFirmForm(false);
      setShowProjectForm(false); 
      setShowLandownerForm(false); 
      // setFlatAllotement(false);
      setShowFlatForm(false);
    };


  
    const [newPhase, setNewPhase] = useState({
      phaseNo: '',
      wingNo: '',
      mahareraNo: ''
    });
     
    
    
     {/* Table Section */}
     {selectedTab === "firm" && <FirmTable />}
    
    {selectedTab === "display" && <FollowupHistoryTable />}
  
   
     {selectedTab === "landowner" && <UndefinedTable/>}
    

    {selectedTab === "allotement" && <BookedTable />}
  

    {/* Table Section */}
{selectedTab === "firm" && <FirmTable />}
{selectedTab === "display" && <FollowupHistoryTable />}
// {selectedTab === "display" && <Leadsfollowup_followuphistory />}
{selectedTab === "landowner" && <UndefinedTable />}
{selectedTab === "allotement" && <BookedTable />}

    const handleDownloadPDF = () => {
      const link = document.createElement("a");
      link.href = "/path/to/demand_letter.pdf";
      link.download = "Demand_Letter.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const handleAddPartner = () => {
      setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
    };
  
    const handleRemovePartner = (index) => {
      setPartners(partners.filter((_, i) => i !== index));
    };
  
    const handleAddPhase = () => {
      setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); // Add default empty phase
    };
  
    const handleRemovePhase = (index) => {
      setPhases(phases.filter((_, i) => i !== index));
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handleCreateFirm = () => {
      setShowFirmForm(false);
      setShowProjectForm(false);
    };
  
    const handleCreateProject = () => {
      setShowProjectForm(true);
    };
  
    const documentLabels = [
      "Residential Address Document",
      "PAN No Document",
      "Aadhaar No Document",
      "Photo Document",
      "Light Bill for Address Proof",
    ];
  
    const handleBankChange = (event) => {
      setSelectedBank(event.target.value);
    };
  
    const handlePANChange = (e, index) => {
      const updatedPartner = { ...partners[index], pan: e.target.value };
      
      // Validate PAN No.
      const isValidPAN = validatePAN(updatedPartner.pan);
      if (!isValidPAN) {
        setPanError("Invalid PAN number format.");
      } else {
        setPanError(""); // Clear error if valid
      }
    
      // Update partner state
      setPartners((prevPartners) => {
        const newPartners = [...prevPartners];
        newPartners[index] = updatedPartner;
        return newPartners;
      });
    };
    
  
    const handleNameChange = (event) => {
      const value = event.target.value;
    
      if (/[^a-zA-Z\s]/.test(value)) {
        setNameError('Name should only contain letters and spaces.');
      } else {
        setNameError('');
      }
    
      setName(value);
    };
    
  
   
    const handleMobileNoChange = (event) => {
      const value = event.target.value;
    
      // Validate the input value
      if (/[^0-9]/.test(value)) {
        setMobileError('Mobile number should only contain digits.');
      } else if (value.length > 10) {
        setMobileError('Mobile number cannot exceed 10 digits.');
      } else {
        setMobileError(''); // Clear the error when it's valid
      }
    
      // Update the mobile number value
      setMobileNo(value);
    };
    
  
    const handleAccountNoChange = (e) => {
      const value = e.target.value;
      
      // Regular expression to check if the value is numeric and has a valid length (e.g., 10-16 digits)
      const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
    
      if (value && !accountNoRegex.test(value)) {
        setAccountNoError("Account number must be between 10 to 16 digits.");
      } else {
        setAccountNoError(""); // Clear the error if valid
      }
    
      // Update the account number in the state
      setAccountNo(value);
    };
  
    
   
    const validatePAN = (pan) => {
      const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format: 5 letters, 4 digits, 1 letter
      return panPattern.test(pan);
    };
  
    
  
    const handlePartnerNameChange = (e, index) => {
      const value = e.target.value;
      const partnerCopy = [...partners];
      
      // Regex to check if the value contains any numbers
      if (/\d/.test(value)) {
        setNameError("Name should only contain letters"); // Error message if numbers are present
      } else {
        setNameError(""); // Clear error message if the value is valid
      }
  
      // Update the partner's name in the state
      partnerCopy[index] = { ...partnerCopy[index], name: value };
      setPartners(partnerCopy);
    };
  
  
    const handleFirmNameChange = (e) => {
      const value = e.target.value;
  
      // Regex to check if the value contains any numbers
      if (/\d/.test(value)) {
        setFirmNameError("Firm Name should only contain letters"); // Error message if numbers are present
      } else {
        setFirmNameError(""); // Clear error message if the value is valid
      }
  
      // Update the firm name in the state
      setFirmName(value);
    };
  
  
  
    const validateFirmName = () => {
      if (!firmName.trim()) {
        setFirmNameError("Firm Name is required.");
        return false;
      }
      setFirmNameError("");
      return true;
    };
  
  
    const [formValues, setFormValues] = useState({
      firmName: "",
      projectName: "",
      projectAddress: "",
      oldSurveyNumber: "",
      newSurveyNumber: "",
      village: "",
      taluka: "",
      district: "",
      sanctionAuthority: "",
      east: "",
      west: "",
      north: "",
      south: "",
      latitude: "",
      longitude: "",
      landmark: "",
    });
  
    // State to store validation errors
    const [errors, setErrors] = useState({
      firmName: "",
    });
    
  
    const handleChange = (e, label, partnerIndex) => {
      const { value } = e.target;
    
      // For Lead Type selection
  if (label === 'Lead Type') {
    setLeadType(value);
  }
      // Update the partners array with the new value for the specific field
      const updatedPartners = [...partners];
      updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
      setPartners(updatedPartners);
    
      // Apply validation for the 'firmName' field
      if (label === 'Firm Name') {
        // Check if the input contains only letters and spaces
        if (!/^[A-Za-z\s]*$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            firmName: ' Name should only contain letters and spaces',
          }));
        } else {
          setErrors((prev) => ({
            ...prev,
            firmName: '', // Clear the error if valid
          }));
        }
      }
    };
    
    
  
    const validateAge = (age) => {
      if (!age || age < 0 || age > 120) {
        setAgeError("Please enter a valid age between 0 and 120");
      } else {
        setAgeError("");
      }
    };
    
    
    const handleIfscCodeChange = (e) => {
      const value = e.target.value;
    
      // Regular expression to validate IFSC code format
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    
      if (value && !ifscRegex.test(value)) {
        setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
      } else {
        setIfscCodeError(""); // Clear the error if valid
      }
    
      // Update the IFSC code in the state
      setIfscCode(value); // Assuming you have a state for the IFSC code
    };
    
  
    const handleMobileChange = (e, index) => {
      const value = e.target.value;
      const partnerCopy = [...partners];
    
      // Validate Mobile No. to ensure it doesn't exceed 10 digits
      if (/[^0-9]/.test(value)) {
        setMobileError("Mobile number should only contain digits");
      } else if (value.length > 10) {
        setMobileError("Mobile number cannot exceed 10 digits");
      } else {
        setMobileError(""); // Clear the error if the value is valid
      }
    
      // Update the partner's mobile number in the state
      partnerCopy[index] = { ...partnerCopy[index], mobileNo: value };
      setPartners(partnerCopy);
    };
    
    const handleEmailChange = (e, index) => {
      const value = e.target.value;
      const partnerCopy = [...partners];
    
      // Regular expression to validate Gmail email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
      if (value && !emailRegex.test(value)) {
        setEmailError("Invalid Gmail address");
        console.log("invalid email");
      } else {
        setEmailError(""); // Clear the error if the value is valid
      }
    
      // Update the partner's email in the state
      partnerCopy[index] = { ...partnerCopy[index], email: value };
      setPartners(partnerCopy);
    };
  
  
  
    const validateForm = () => {
      
    };
    
    const handleClosingExecutiveChange = (event) => {
        setClosingExecutive(event.target.value);
      };
    

      const handleDownloadPDFPending = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Firm Details Report", 14, 15);
      
        const tableColumn = [
          "TIMESTAMP", "FIRM NAME", "FIRM ADDRESS", "FIRM PAN NO", "FIRM GST NO",
          "NAME", "AGE", "OCCUPATION", "MOBILE NO.", "MAIL ID",
          "RESIDENTIAL ADDRESS", "PAN NO", "AADHAAR NO"
        ];
      
        const tableRows = loans.map(row => [
          row.timestamp || "-",
          row.name || "-",
          row.address || "-",
          row.firmPanNo || "-",
          row.firmGstNo || "-",
          row.contactName || "-",          // Assuming 'NAME' refers to a separate contact name field
          row.age || "-",                  // Add these fields in your data source if not present
          row.occupation || "-",
          row.mobile || "-",
          row.email || "-",
          row.residentialAddress || "-",
          row.panNo || "-",
          row.aadhaarNo || "-"
        ]);
      
        console.log("Formatted Table Rows:", tableRows);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumn],
          body: tableRows,
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        doc.save("PendingFollowup_Details_Report.pdf");
      };
      
      
  
      const handleDownloadPDFFollowup = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Followup Details Report - Page 1", 14, 15);
      
        // First page columns
        const tableColumnPage1 = [
          "STATUS HISTORY", "REMARK HISTORY", "ASSIGN TO HISTORY", "LEAD DAYS", "TIMESTAMP",
          "ENQUIRY NO", "LEAD NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "WHATSAPP NO."
        ];
      
        const tableRowsPage1 = loans.map(row => [
          row.statusHistory || "-",
          row.remarkHistory || "-",
          row.assignToHistory || "-",
          row.leadDays || "-",
          row.timestamp || "-",
          row.enquiryNo || "-",
          row.leadNo || "-",
          row.salesExecutiveName || "-",
          row.name || "-",
          row.mobile || "-",
          row.whatsapp || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage1],
          body: tableRowsPage1,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        // Add a new page for the rest of the columns
        doc.addPage("landscape");
        doc.text("Followup Details Report - Page 2", 14, 15);
      
        const tableColumnPage2 = [
          "ALTERNATE CONTACT NO.", "EMAIL", "ADDRESS", "OCCUPATION", "COMPANY", "INTERESTED IN",
          "BUDGET (APPROX.)", "REASON FOR PURCHASE", "REFERENCE BY / SOURCE",
          "NAME OF CP ", "PLANNING TO BUY WITHIN?", "CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS"
        ];
      
        const tableRowsPage2 = loans.map(row => [
          row.alternateContact || "-",
          row.email || "-",
          row.address || "-",
          row.occupation || "-",
          row.company || "-",
          row.interestedIn || "-",
          row.budget || "-",
          row.reasonForPurchase || "-",
          row.referenceBy || "-",
          row.cpName || "-",
          row.planningToBuyWithin || "-",
          row.customerFeedback || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage2],
          body: tableRowsPage2,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        doc.save("Followup_Details_Report.pdf");
      };
      
      
      const handleDownloadPDFBooked = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Followup Details Report - Page 1", 14, 15);
      
        // First page columns (with serial number)
        const tableColumnPage1 = [
          "S. NO.", "ENQUIRY NO", "LEAD NO.", "NAME", "MOBILE", "WHATSAPP NO.",
          "INTERESTED IN", "BUDGET (APPROX.)"
        ];
      
        const tableRowsPage1 = loans.map((row, index) => [
          index + 1,
          row.enquiryNo || "-",
          row.leadNo || "-",
          row.name || "-",
          row.mobile || "-",
          row.whatsapp || "-",
          row.interestedIn || "-",
          row.budget || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage1],
          body: tableRowsPage1,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        // Second page
        doc.addPage("landscape");
        doc.text("Followup Details Report - Page 2", 14, 15);
      
        const tableColumnPage2 = [
          "S. NO.", "EMAIL", "ADDRESS", "REASON FOR PURCHASE", "REFERENCE BY / SOURCE",
          "NAME OF CP", "PLANNING TO BUY WITHIN?", "CUSTOMER FEEDBACK"
        ];
      
        const tableRowsPage2 = loans.map((row, index) => [
          index + 1,
          row.email || "-",
          row.address || "-",
          row.reasonForPurchase || "-",
          row.referenceBy || "-",
          row.cpName || "-",
          row.planningToBuyWithin || "-",
          row.customerFeedback || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage2],
          body: tableRowsPage2,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        doc.save("Booked_Details_Report.pdf");
      };
      
      const handleDownloadPDFUndefined = () => {
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Followup Details Report - Page 1", 14, 15);
      
        // First page columns
        const tableColumnPage1 = [
          "S. NO.", "STATUS HISTORY", "REMARK HISTORY", "ASSIGN TO HISTORY",
          "ENQUIRY NO.", "LEAD NO.", "NAME", "WHATSAPP NO."
        ];
      
        const tableRowsPage1 = loans.map((row, index) => [
          index + 1,
          row.statusHistory || "-",
          row.remarkHistory || "-",
          row.assignToHistory || "-",
          row.enquiryNo || "-",
          row.leadNo || "-",
          row.name || "-",
          row.whatsapp || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage1],
          body: tableRowsPage1,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        // Second page
        doc.addPage("landscape");
        doc.text("Followup Details Report - Page 2", 14, 15);
      
        const tableColumnPage2 = [
          "S. NO.", "OCCUPATION", "INTERESTED IN", "BUDGET (APPROX.)", "REASON FOR PURCHASE.",
          "REFERENCE BY / SOURCE", "NAME OF CP (IF CHANNEL PARTNER)", "PLANNING TO BUY WITHIN ?",
          "CUSTOMER FEEDBACK"
        ];
      
        const tableRowsPage2 = loans.map((row, index) => [
          index + 1,
          row.occupation || "-",
          row.interestedIn || "-",
          row.budget || "-",
          row.reasonForPurchase || "-",
          row.referenceBy || "-",
          row.cpName || "-",
          row.planningToBuyWithin || "-",
          row.customerFeedback || "-"
        ]);
      
        autoTable(doc, {
          startY: 25,
          head: [tableColumnPage2],
          body: tableRowsPage2,
          styles: { fontSize: 8, cellPadding: 2 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
      
        doc.save("Undefined_Details_Report.pdf");
      };
      

      const handleNoChange = (e) => {
        setFirmName(e.target.value);
      };
      
       const handleSubmit = () => {
    const newFirm = {
      firmName,
      closingExecutive,
      name,
      nextFollowUp,
      leadType,
      status
    };

    // Add new firm data to the firms array
    setFirms((prevFirms) => [...prevFirms, newFirm]);

    // Show success toast
    toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });

    // Clear form fields after submission (optional)
    setFirmName('');
    setClosingExecutive('');
    setName('');
    setNextFollowUp('');
    setLeadType('');
    setStatus('');
    setShowFirmForm(false);
  };

    return (
      <div className="main-content">
        <h6>Sales Module / Enquiry Follow Up Management</h6>
       
     
   
      
  
  
       
        <div className='d-flex align-items-center mb-3'>
        {sections.map((section, index) => (
  <div
    key={index}
    className="d-flex align-items-center"  
    style={{
      backgroundColor: Constants.primaryColor,
      padding: '8px',
      borderRadius: '20px',
      margin: '5px',
      cursor: 'pointer', 
      transition: "width 0.3s ease, background 0.3s ease",
      width: expandedSection === index ? "220px" : "50px", 
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      justifyContent: "center", 
      textTransform: "none",
      position: "relative",
      background: Constants.primaryColor, // Gradient background
      boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    }}
    onClick={() => handleToggleSection(index)}  // onClick function for handling clicks
  >
    {/* Modify icon size here */}
    {React.cloneElement(section.icon, { 
      style: { 
        marginRight: '8px', 
        fontSize: expandedSection === index ? '150px' : '160px', // Increase the size of the icon when expanded
        color: '#fff',
        transition: "font-size 0.3s ease",  // Optional: Add transition for a smooth size change
      }
    })}

    {/* Conditionally display label based on expandedSection */}
    {expandedSection === index ? (
      <span className="p-1 fw-bold fs-6" style={{ color: 'white', marginLeft: '10px' }}>
        {section.label}
      </span>
    ) : null}

    {/* Hover effects */}
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      transform: "scale(0.1)",
      transition: "transform 0.3s ease",
      zIndex: -1,
    }}></div>

    <div
      style={{
        "&:hover": {
          background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
        },
        "&:hover div": {
          transform: "scale(1)",
        },
      }}
    ></div>
  </div>
))}
        </div>


        
  
       
  {expandedSection === 0 && selectedTab === "firm" && (
    <div className="content-container mt-3">
      {!showFirmForm ? (
        <>
          <div className='button-container'>
            <div className='d-flex gap-3'>

            <Button 
              variant="contained" 
              color="primary" 
              style={{ background: Constants.primaryColor }} 
              className='fw-bold'
              onClick={() => setShowFirmForm(true)}
            >
              + New Follow UP
            </Button>

            <Button
    variant="contained"
    sx={{
      background: Constants.primaryColor,
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: Constants.primaryColor,
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFPending}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
            </div>
       
  
            {/* Previous and Next buttons on the right */}
            <div className="right-buttons">
              <Button variant="contained" color="secondary" onClick={handlePrevious}>
                Previous
              </Button>
              <Button variant="contained" color="secondary" onClick={handleNext}>
                Next
              </Button>
            </div>
          </div>
  
          <div className="mt-3">
            {/* <FirmTable firms={loans} /> */}
            <FirmTable firms={firms} />
          </div>
        </>
      ) : (
     
  
      <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
      <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          
        </Typography>
  
       
        
        <Grid container spacing={2}>
        <Grid item xs={6}>
  <TextField
    label="Enquiry No"
    fullWidth
    variant="outlined"
    value={firmName}
    onChange={handleNoChange}   // Calling function
    error={!!firmNameError}
    helperText={firmNameError}
  />
</Grid>


    <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="closing-executive-label">Sales Person</InputLabel>
          <Select
            labelId="closing-executive-label"
            id="closing-executive"
            value={closingExecutive}
            onChange={handleClosingExecutiveChange}
            label="Closing Executive"
          >
            {/* Sales Person options */}
            <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
            <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
            <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
            <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
            <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
            <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
            <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
            <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
          </Select>
        </FormControl>
      </Grid>
   

  
    <Grid item xs={6}>
      <TextField
        label="Remark"
        fullWidth
        variant="outlined"
       
      />
    </Grid>

    
    <Grid item xs={6}>
  <TextField
    label="Name"
    fullWidth
    variant="outlined"
    value={name}
    onChange={handleNameChange}
    error={!!nameError}  // show error if validation fails
    helperText={nameError}  // show error message
    required 
  />
</Grid>


    <Grid item xs={6}>
      <TextField
      type="date"
        label="Next Follow Up"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }} 
      />
    </Grid>

  
    <Grid item xs={6}>
      <TextField
        label="Assign To"
        fullWidth
        variant="outlined"
      />
    </Grid>
    
    <Grid item xs={6}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Lead Type</InputLabel>
        <Select
          value={leadType}
          // onChange={handleChange}
          onChange={(e) => handleChange(e, 'Lead Type')}

          label="Lead Type"
        >
          <MenuItem value="hot">Hot</MenuItem>
          <MenuItem value="warm">Warm</MenuItem>
          <MenuItem value="cold">Cold</MenuItem>
          <MenuItem value="lost">Lost</MenuItem>
          <MenuItem value="booked">Booked</MenuItem>
          <MenuItem value="undefined">Undefined</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={6}>
      <FormControl fullWidth variant="outlined" error={!!statusError}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
        //  onChange={(e) => handleStatusChange(e, 'Status')}
        onChange={handleStatusChange}

          label="Status"
        >
          <MenuItem value="follow_up">Follow up</MenuItem>
          <MenuItem value="not_interested">Not interested</MenuItem>
          <MenuItem value="callback_request">Callback request</MenuItem>
          <MenuItem value="unreachable">Unreachable</MenuItem>
          <MenuItem value="booked_property_other_project">Booked property in other project</MenuItem>
          <MenuItem value="not_answer">Not answered</MenuItem>
          <MenuItem value="invalid_number">Invalid number</MenuItem>
          <MenuItem value="visit_scheduled">Visit scheduled</MenuItem>
          <MenuItem value="visit_postponed">Visit postponed</MenuItem>
          <MenuItem value="visit_cancelled">Visit cancelled</MenuItem>
          <MenuItem value="re_scheduled">Re-scheduled</MenuItem>
          <MenuItem value="visit_done">Visit done</MenuItem>
        </Select>
        {statusError && <FormHelperText>{statusError}</FormHelperText>}
      </FormControl>
    </Grid>

   
  </Grid>
  
  

  
  
  
  
        <Button
          variant="contained"
          className="m-3"
          color="success"
          // onClick={() => {
           
          //   // toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
            
      
          //   // setShowFirmForm(false); 
          // }}
           onClick={handleSubmit}
        >
          Submit
        </Button>
      </Paper>
    </div>
      
      )}
    </div>
  )}
  
  
  
  {expandedSection === 1 && selectedTab === "display" && (
    <div className="content-container mt-3">
     
      {!showProjectForm ? (
         <>
     <div>
   
     </div>
  
  <div>
    
  <Button
    variant="contained"
    sx={{
      background: Constants.primaryColor,
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: Constants.primaryColor,
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFFollowup}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
  </div>
  
  
  
  <div className='mt-3'>
 
  <FollowupHistoryTable data={projectData} />
  
    {/* < Leadsfollowup_followuphistory data={projectData} /> */}
  </div>
     </>
      ) : (
       
  <div>

  </div>
  
  
      )}
    </div>
  )} 
  
  
  
  
  
  
  
  
  
  
  {expandedSection === 2 && selectedTab === "landowner" && (
    <div className="content-container mt-3">
     
      {!showLandownerForm ? (
         <>
         <div className='button-container'>
      
        <div className='d-flex gap-3'>
            <Typography variant="h5" component="h2" sx={{ marginBottom: "16px", fontWeight: "bold",paddingTop:"8px" }}>
                  Booked Enquiries
                </Typography>
        <Button
    variant="contained"
    sx={{
      background: Constants.primaryColor,
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "3px 10px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: Constants.primaryColor,
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFBooked}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        </div>
    
   
      </div>
  <div className='mt-3'>
  {/* <LandownerTable data={projectData} /> */}
  {/* <BookedTable data ={projectData} /> */}
  {/* <UndefinedTable data= {Flatdata} /> */}
  {/* <Firstvisitfollowupvookedtable data = {projectData} /> */}

  {/* <FirstvisitFollowupbookedTable data = {projectData}/> */}
  <FirstvisitfollowupbookedTable data ={projectData} />
  

   </div>
  </>
  
      ) : (
        <div>

        </div>
  
      )}
    </div>
  )}
  
  
  {expandedSection === 3 && selectedTab === "allotement" && (
    <div className="content-container mt-3">
      {!showFlatForm ? (
        <>
        
          
          <div className="button-container">
 <div className='d-flex gap-3'>
  <Typography variant="h5" component="h2" sx={{ marginBottom: "16px", color: "", fontWeight: "bold",paddingTop:"6px" }}>
      Lost Enquiries
      </Typography>

 <Button
    variant="contained"
    sx={{
      background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFUndefined}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
 </div>
    </div>
      
  
          <div className="mt-3">
            

           { <FirstvisitfollowupUndefinedTable data = {projectData} /> }
          </div>
        </>
      ) : (
        <div>

        </div>
      
      )}
    </div>
  )}
  
  
  
    </div>
    )
  };
     
   
    


export default FirstvisitFollowup;

