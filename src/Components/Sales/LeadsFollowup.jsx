

import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import FollowupHistoryTable from './FollowupHistoryTable';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';
import PendingFollowuptable from './PendingFollowuptable';

// import { FaBuilding } from 'react-icons/fa';      // Building icon
import { AiOutlineProject } from 'react-icons/ai'; // Project icon
import { MdLocationCity } from 'react-icons/md';   // City icon
import { GiHouseKeys } from 'react-icons/gi';      // House keys icon

import { FaUsers } from 'react-icons/fa';           // Users icon


import autoTable from "jspdf-autotable";

import { jsPDF } from "jspdf";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';



const sections = [
  { label: "Pending Follow Up", icon: <FaUsers size={20} />, createLabel: "Create Firm" },  // Changed to FaUsers icon
  { label: "Follow Up History", icon: <AiOutlineProject size={20} />, createLabel: "Create Project" },  // Changed to AiOutlineProject icon
  { label: "Undefined", icon: <MdLocationCity size={20} />, createLabel: "Create Landowner Info" },  // Changed to MdLocationCity icon
  { label: "Visit Scheduled", icon: <GiHouseKeys size={20} />, createLabel: "Create Flat Allotment Info" },  // Changed to GiHouseKeys icon
 
];
  const tabNames = [ "firm", "display", "landowner","allotement"]; 

const LeadsFollowUp = () => {


     
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
  
    const [firmName, setFirmName] = useState("");
    const [firmNameError, setFirmNameError] = useState("");
  
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
  const [status, setStatus] = useState({});
  

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
      updatedPartners[index].age = value; // Update the age of the specific partner
      setPartners(updatedPartners); // Update the state
    
      // Validate the age value
      validateAge(value); // You should already have this function defined
    };
  
    const handleStatusChange = (event, leadId) => {
        setStatus({
          ...status,
          [leadId]: event.target.value
        });
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
  } else if (sections[index].label === "Undefined") {
      setSelectedTab("landowner");
  } else if (sections[index].label === "Visit Scheduled") {
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
    //  {selectedTab === "firm" && <FirmTable />}
    //  {selectedTab === "display" && <DisplayTable />}
    {selectedTab  === "firm" && <PendingFollowuptable/>}
    {selectedTab === "display" && <FollowupHistoryTable />}
     {selectedTab === "landowner" && <LandownerTable />}
     {selectedTab === "allotement" && <FlatAllotement/>}
  
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
        setError('Name should only contain letters and spaces.');
      } else {
        setError('');
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
  
    const [formData, setFormData] = useState({
      nextFollowUp: "",   // your field name
    });
    
    const [nextFollowUp, setNextFollowUp] = useState("");
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
            firmName: 'Firm Name should only contain letters and spaces',
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
        console.log("Loans data before mapping:", loans); 
    
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Pending Follow-up Report", 14, 15);
    
        // Define new table columns
        const tableColumn = [
            "Last Follow Up", "Status", "Remark", "Next Follow Up", 
            "Assign To", "Lead No.", "Name", "Mobile No. / WhatsApp No.", 
            "You Are Looking For?", "Email", "Source Name"
        ];
    
        // Map data into rows
        const tableRows = loans.map(row => [
            row.lastFollowUp || "-",
            row.status || "-",
            row.remark || "-",
            row.nextFollowUp || "-",
            row.assignTo || "-",
            row.leadNo || "-",
            row.name || "-",
            row.mobile || "-",
            row.lookingFor || "-",
            row.email || "-",
            row.sourceName || "-"
        ]);
    
        console.log("Formatted Table Rows:", tableRows);
    
        autoTable(doc, {
            startY: 25,
            head: [tableColumn],
            body: tableRows,
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        });
    
        doc.save("PendingFollowup_Report.pdf");
    };
    
    const handleDownloadPDFHistory = () => {
      console.log("Loans data before mapping:", loans); 
  
      const doc = new jsPDF("landscape");
      doc.setFontSize(14);
      doc.text("Pending Follow-up Report", 14, 15); 
  
      // Columns for the first page
      const firstPageColumns = [
          "STATUS HISTORY", "REMARK HISTORY", "ASSIGN TO HISTORY", "LEAD DAYS", "TIMESTAMP", 
          "ENQUIRY NO", "LEAD NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE","WHATSAPP NO."
      ];
  
      // Columns for the second page
      const secondPageColumns = [
         "EMAIL", "ADDRESS", "OCCUPATION", "COMPANY", 
          "INTERESTED IN", "BUDGET (APPROX.)", "REASON FOR PURCHASE", "REFERENCE BY / SOURCE", 
          "NAME OF CP ", "PLANNING TO BUY WITHIN?", "CUSTOMER FEEDBACK"
      ];
  
      // Limit the number of rows to fit within 2 pages
      const maxRowsPerPage = 15;
      const totalRows = Math.min(loans.length, maxRowsPerPage * 2);
  
      // Mapping data for the first page
      const firstPageRows = loans.slice(0, totalRows).map(row => [
          row.statusHistory || "-",
          row.remarkHistory || "-",
          row.assignToHistory || "-",
          row.leadDays || "-",
          row.timestamp || "-",
          row.enquiryNo || "-",
          row.leadNo || "-",
          row.salesExecutiveName || "-",
          row.name || "-",
          row.mobile || "-"
      ]);
  
      // Mapping data for the second page
      const secondPageRows = loans.slice(0, totalRows).map(row => [
          row.whatsappNo || "-",
          row.alternateContactNo || "-",
          row.email || "-",
          row.address || "-",
          row.occupation || "-",
          row.company || "-",
          row.interestedIn || "-",
          row.budgetApprox || "-",
          row.reasonForPurchase || "-",
          row.referenceBySource || "-",
          row.nameOfCP || "-",
          row.planningToBuyWithin || "-",
          row.customerFeedback || "-"
      ]);
  
      console.log("Formatted Table Rows for First Page:", firstPageRows);
      console.log("Formatted Table Rows for Second Page:", secondPageRows);
  
      // Generate the first page
      autoTable(doc, {
          startY: 25,
          head: [firstPageColumns],
          body: firstPageRows,
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
          margin: { top: 20 }
      });
  
      // Add a new page for the remaining columns
      doc.addPage();
      doc.text("Pending Follow-up Report (Continued)", 14, 15);
  
      // Generate the second page
      autoTable(doc, {
          startY: 25,
          head: [secondPageColumns],
          body: secondPageRows,
          styles: { fontSize: 10, cellPadding: 3 },
          headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
          margin: { top: 20 }
      });
  
      doc.save("Followup_History_Report.pdf");
  };
  

 

  const handleDownloadPDFUndefined = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Pending Follow-up Report", 14, 15); 

    // Merged columns for a single page
    const tableColumns = [
        "STATUS HISTORY", "REMARK HISTORY", "LEAD NO", "NAME", "MOBILE NO.",
        "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME"
    ];

    // Limit the number of rows to fit within one page
    const maxRowsPerPage = 15;
    const totalRows = Math.min(loans.length, maxRowsPerPage);

    // Mapping data for the table
    const tableRows = loans.slice(0, totalRows).map(row => [
        row.statusHistory || "-",
        row.remarkHistory || "-",
        row.leadNo || "-",
        row.name || "-",
        row.mobile || "-",
        row.lookingFor || "-",
        row.email || "-",
        row.sourceName || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);

    // Generate the table on a single page
    autoTable(doc, {
        startY: 25,
        head: [tableColumns],
        body: tableRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        margin: { top: 20 }
    });

    doc.save("Undefined_Report.pdf");
};

const handleDownloadPDFVisit = () => {
  const doc = new jsPDF("landscape");
  doc.setFontSize(14);
  doc.text("Pending Follow-up Report", 14, 15); 

  // Merged columns for a single page
  const tableColumns = [
      "TIMESTAMP", "LEAD NO.",  "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME", "LOCATION"
  ];

  // Limit the number of rows to fit within one page
  const maxRowsPerPage = 15;
  const totalRows = Math.min(loans.length, maxRowsPerPage);

  // Mapping data for the table
  const tableRows = loans.slice(0, totalRows).map(row => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.lookingFor || "-",
      row.email || "-",
      row.sourceName || "-"
  ]);

  console.log("Formatted Table Rows:", tableRows);

  // Generate the table on a single page
  autoTable(doc, {
      startY: 25,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 }
  });

  doc.save("VisitScheduled_Report.pdf");
};
  
    
    return (
      <div className="main-content">
        <h6>Sales Module / Enquiry Follow Up Management</h6>
       
     
   
      
  
  
        <div className="d-flex align-items-center mb-3">
        

{sections.map((section, index) => (
  <div 
    key={index} 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#3621a9', 
      padding: '8px', 
      borderRadius: '20px',  // borderRadius changed to 20px from 10%
      margin: '5px',
      cursor: 'pointer',    // Add pointer cursor for better UX
      transition: "width 0.3s ease, background 0.3s ease",
      width: expandedSection === index ? "220px" : "50px", // Toggle width based on expanded state
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      justifyContent: "center",
      textTransform: "none",
      position: "relative",
      background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)", // Gradient background
      boxShadow:
        "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
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
              style={{ background: '#272ba8' }} 
              className='fw-bold'
              onClick={() => setShowFirmForm(true)}
            >
              + New Follow UP
            </Button>
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
            <PendingFollowuptable firms={loans} />
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
        label="Lead No"
        fullWidth
        variant="outlined"
        value={firmName}
        onChange={handleFirmNameChange} 
        error={!!firmNameError} 
        helperText={firmNameError} 
      />
    </Grid>
   
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="closing-executive-label">Closing Executive</InputLabel>
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
    {/* </Grid> */}

  
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
    value={firmPan}
    onChange={handleNameChange}
    error={!!nameError}
    helperText={nameError}
  />
</Grid>


    <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="status-label">Status</InputLabel>
    <Select
      labelId="status-label"
      id="status"
      label="Status"
      fullWidth
      variant="outlined"
    >
      <MenuItem value="Follow Up">Follow Up</MenuItem>
      <MenuItem value="Not Interested">Not Interested</MenuItem>
      <MenuItem value="Callback Request">Callback Request</MenuItem>
      <MenuItem value="Unreachable">Unreachable</MenuItem>
      <MenuItem value="Booked History in Other Project">Booked History in Other Project</MenuItem>
      <MenuItem value="Not Answer">Not Answer</MenuItem>
      <MenuItem value="Invalid Number">Invalid Number</MenuItem>
    </Select>
  </FormControl>
</Grid>

   
    <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="assign-to-label">Assign To</InputLabel>
    <Select
      labelId="assign-to-label"
      id="assign-to"
      label="Assign To"
      fullWidth
      variant="outlined"
    >
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
  <FormControl fullWidth variant="outlined">
    <InputLabel id="lead-type-label">Lead Type</InputLabel>
    <Select
      labelId="lead-type-label"
      id="lead-type"
      label="Lead Type"
      fullWidth
      variant="outlined"
    >
      <MenuItem value="Hot">Hot</MenuItem>
      <MenuItem value="Cold">Cold</MenuItem>
      <MenuItem value="Warm">Warm</MenuItem>
      <MenuItem value="Lost">Lost</MenuItem>
    </Select>
  </FormControl>
</Grid>


<Grid item xs={6}>
  <Box sx={{ width: '100%' }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Next Follow Up"
        value={formData.nextFollowUp ? dayjs(formData.nextFollowUp) : null}
        onChange={(newValue) => {
          setFormData({
            ...formData,
            nextFollowUp: newValue ? newValue.format('YYYY-MM-DD') : '',
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            style={{ backgroundColor: '#fff', borderRadius: '8px' }}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </LocalizationProvider>
  </Box>
</Grid>


  </Grid>
  
  

  
  
  
  
        <Button
          variant="contained"
          className="m-3"
          color="success"
          onClick={() => {
            // Simply show the toast message without calling validation functions
            toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
            
            // If you want to close the form (or any other logic), you can add it here
            setShowFirmForm(false); // Example of hiding the form after submission
          }}
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
    onClick={handleDownloadPDFHistory}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
     </div>
  
  
  
  
  
  <div className='mt-3'>
 
 <div>
 

 </div>
  <FollowupHistoryTable data={projectData} />

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
      
    
   
      </div>
  <div className='mt-3'>
  {/* <LandownerTable data={projectData} /> */}
  {/* <BookedTable data ={projectData} /> */}

  <div>
  <Button className='m-2'
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
    <FaFileDownload size={18} />  
    Download PDF
  </Button>
  </div>
  <UndefinedTable data= {Flatdata} />
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
    onClick={handleDownloadPDFVisit}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
    </div>
  
  
          <div className="mt-3">
            {/* <FlatAllotment data={Flatdata} /> */}
            {/* <UndefinedTable data= {Flatdata} /> */} 

            <BookedTable data ={projectData} />
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
     
   
    


export default LeadsFollowUp;