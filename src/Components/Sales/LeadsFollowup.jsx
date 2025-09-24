

// import React, { useState, useEffect } from 'react';
// import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
// import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
// import FirmTable from './FirmTable';
// import DisplayTable from "./DisplayTable";
// import LandownerTable from "./LandownerTable";
// import FlatAllotment from './FlatAllotement';
// import { ToastContainer, toast } from 'react-toastify';
// import FollowupHistoryTable from './FollowupHistoryTable';
// import UndefinedTable from './UndefinedTable';
// import BookedTable from './BookedTable';
// import PendingFollowuptable from './PendingFollowuptable';


// import { AiOutlineProject } from 'react-icons/ai'; 
// import { MdLocationCity } from 'react-icons/md';   
// import { GiHouseKeys } from 'react-icons/gi';      

// import { FaUsers } from 'react-icons/fa';          


// import autoTable from "jspdf-autotable";

// import { jsPDF } from "jspdf";

// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import Constants from '../Constants';



// const sections = [
//   { label: "Pending Follow Up", icon: <FaUsers size={20} />, createLabel: "Create Firm" },  
//   { label: "Follow Up History", icon: <AiOutlineProject size={20} />, createLabel: "Create Project" },  
//   { label: "Undefined", icon: <MdLocationCity size={20} />, createLabel: "Create Landowner Info" },  
//   { label: "Visit Scheduled", icon: <GiHouseKeys size={20} />, createLabel: "Create Flat Allotment Info" },  
 
// ];
//   const tabNames = [ "firm", "display", "landowner","allotement"]; 

// const LeadsFollowUp = () => {


     
//     const [loans, setLoans] = useState([]);
//     const [expandedSection, setExpandedSection] = useState(0); 
//     const [showFirmForm, setShowFirmForm] = useState(false);
   
//     const [showProjectForm, setShowProjectForm] = useState(false);
//     const [phases, setPhases] = useState([]);
//     const [showLandownerForm, setShowLandownerForm] = useState(false); 
//     const [showFlatForm, setShowFlatForm] = useState(false); 
//     const [selectedTab, setSelectedTab] = useState("firm");
//     const [projectData, setProjectData] = useState([]);
//     const[FlatAllotement , setFlatAllotement] = useState([false]);
//     const [selectedProject, setSelectedProject] = useState('');
//     const [Flatdata, setFlatdata] = useState([]);
//     const [selectedBank, setSelectedBank] = useState('');
//     const [error, setError] = useState('');
//     const [name, setName] = useState('');
//     const [mobileNo, setMobileNo] = useState('');
//     const [nameError, setNameError] = useState('');
//     const [mobileNoError, setMobileNoError] = useState('');
//     const [panError, setPanError] = useState("");
  
//     const [firmName, setFirmName] = useState("");
//     const [firmNameError, setFirmNameError] = useState("");
  
//     const [mobileError, setMobileError] = useState("");
//     const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState("");
  
//     const [firmPan, setFirmPan] = useState("");
//     const [firmPanError, setFirmPanError] = useState("");
   
//     const [ageError, setAgeError] = useState("");
//     const [occupationError, setOccupationError] = useState(""); 
  
//     const [closingExecutive, setClosingExecutive] = useState('');
//     const [accountNo, setAccountNo] = useState(""); 
//   const [accountNoError, setAccountNoError] = useState("");
  
//   const [ifscCode, setIfscCode] = useState(""); 
//   const [ifscCodeError, setIfscCodeError] = useState("");
//   const [status, setStatus] = useState({});
//   const [firms, setFirms] = useState([]);


//     const [fileNames, setFileNames] = useState({
//       firmPanNoDocument: "",
//       firmGstNoDocument: "",
//       firmLightBillForAddressProof: "",
//     });
  
  
//     const handleFirmPanChange = (e) => {
//       const value = e.target.value;
//       setFirmPan(value);
      
//       const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
//       if (!panRegex.test(value)) {
//         setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
//       } else {
//         setFirmPanError(""); 
//       }
//     };
  
    
//      const handleFileChange = (e, key) => {
//       const file = e.target.files[0]; 
//       if (file) {
//         setFileNames((prevState) => ({
//           ...prevState,
//           [key]: file.name, 
//         }));
//       }
//     };
  
//     const handleAgeChange = (e, index) => {
//       const value = e.target.value;
//       const updatedPartners = [...partners];
//       updatedPartners[index].age = value; 
//       setPartners(updatedPartners); 
    
    
//       validateAge(value); 
//     };
  
//     const handleStatusChange = (event, leadId) => {
//         setStatus({
//           ...status,
//           [leadId]: event.target.value
//         });
//       };
  
  
//     const handleOccupationChange = (e, index) => {
//       const value = e.target.value;
//       const updatedPartners = [...partners];
//       updatedPartners[index].occupation = value; 
//       setPartners(updatedPartners); 
//     };
  
    
  
  
//     const [partners, setPartners] = useState([
//       { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }
//     ]);
    
//     useEffect(() => {
//       console.log("Updated Selected Tab:", selectedTab);
//       loadLoansData();
//     }, []);
  
//     const loadLoansData = async () => {
//       const data = await fetchLoansData();
//       setLoans(data);
//     };
  
  
//   const handleTabClick = (index) => {
//       console.log("Clicked Section Index:", index);
//       console.log("Selected Tab Before Update:", selectedTab);
//       setSelectedTab(tabNames[index]); 
//   };
  
//     const handleTabChange = (_, newValue) => {
//       setSelectedTab(newValue);
//     };
  
  
//     const handleToggleSection = (index) => {
//       if (sections[index].label === "Download PDF") {
//         handleDownloadPDF();
//         return;
//       }
//       console.log("Clicked Section Index:", index);
//       console.log("Selected Tab Before Update:", selectedTab);
//       setExpandedSection(index);  
  
     
//     if (sections[index].label === "Follow Up History") {
//       setSelectedTab("display");
//   } else if (sections[index].label === "Pending Follow Up") {
//       setSelectedTab("firm");
//   } else if (sections[index].label === "Undefined") {
//       setSelectedTab("landowner");
//   } else if (sections[index].label === "Visit Scheduled") {
//       setSelectedTab("allotement");
//   }
  
    
//       setShowFirmForm(false);
//       setShowProjectForm(false); 
//       setShowLandownerForm(false); 
     
//       setShowFlatForm(false);
//     };
  
//     const [newPhase, setNewPhase] = useState({
//       phaseNo: '',
//       wingNo: '',
//       mahareraNo: ''
//     });
  
    
  
//     {selectedTab  === "firm" && <PendingFollowuptable/>}
//     {selectedTab === "display" && <FollowupHistoryTable />}
//      {selectedTab === "landowner" && <LandownerTable />}
//      {selectedTab === "allotement" && <FlatAllotement/>}
  
//     const handleDownloadPDF = () => {
//       const link = document.createElement("a");
//       link.href = "/path/to/demand_letter.pdf";
//       link.download = "Demand_Letter.pdf";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };
  
//     const handleAddPartner = () => {
//       setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
//     };
  
//     const handleRemovePartner = (index) => {
//       setPartners(partners.filter((_, i) => i !== index));
//     };
  
//     const handleAddPhase = () => {
//       setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); 
//     };
  
//     const handleRemovePhase = (index) => {
//       setPhases(phases.filter((_, i) => i !== index));
//     };
  
//     const handlePrevious = () => {
//       if (currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//     };
  
//     const handleNext = () => {
//       setCurrentPage(currentPage + 1);
//     };
  
//     const handleCreateFirm = () => {
//       setShowFirmForm(false);
//       setShowProjectForm(false);
//     };
  
//     const handleCreateProject = () => {
//       setShowProjectForm(true);
//     };
  
//     const documentLabels = [
//       "Residential Address Document",
//       "PAN No Document",
//       "Aadhaar No Document",
//       "Photo Document",
//       "Light Bill for Address Proof",
//     ];
  
//     const handleBankChange = (event) => {
//       setSelectedBank(event.target.value);
//     };
  
//     const handlePANChange = (e, index) => {
//       const updatedPartner = { ...partners[index], pan: e.target.value };
      
     
//       const isValidPAN = validatePAN(updatedPartner.pan);
//       if (!isValidPAN) {
//         setPanError("Invalid PAN number format.");
//       } else {
//         setPanError("");
//       }
    
    
//       setPartners((prevPartners) => {
//         const newPartners = [...prevPartners];
//         newPartners[index] = updatedPartner;
//         return newPartners;
//       });
//     };
    
  
//     const handleNameChange = (event) => {
//       const value = event.target.value;
  
     
//       if (/[^a-zA-Z\s]/.test(value)) {
//         setError('Name should only contain letters and spaces.');
//       } else {
//         setError('');
//       }
//   setFirmPan(value);
//       // setName(value);
//     };
  
   
//     const handleMobileNoChange = (event) => {
//       const value = event.target.value;
    
     
//       if (/[^0-9]/.test(value)) {
//         setMobileError('Mobile number should only contain digits.');
//       } else if (value.length > 10) {
//         setMobileError('Mobile number cannot exceed 10 digits.');
//       } else {
//         setMobileError(''); 
//       }
    
     
//       setMobileNo(value);
//     };
    
  
//     const handleAccountNoChange = (e) => {
//       const value = e.target.value;
      
     
//       const accountNoRegex = /^[0-9]{10,16}$/; 
    
//       if (value && !accountNoRegex.test(value)) {
//         setAccountNoError("Account number must be between 10 to 16 digits.");
//       } else {
//         setAccountNoError(""); 
//       }
    
   
//       setAccountNo(value);
//     };
  
//     // const [formData, setFormData] = useState({
//     //   nextFollowUp: "",   
//     // });
    
//     const [assignTo, setAssignTo] = useState('');
//     const [nextFollowUp, setNextFollowUp] = useState("");
//     const validatePAN = (pan) => {
//       const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; 
//       return panPattern.test(pan);
//     };
  
    
  
//     const handlePartnerNameChange = (e, index) => {
//       const value = e.target.value;
//       const partnerCopy = [...partners];
      
     
//       if (/\d/.test(value)) {
//         setNameError("Name should only contain letters"); 
//       } else {
//         setNameError(""); 
//       }
  
   
//       partnerCopy[index] = { ...partnerCopy[index], name: value };
//       setPartners(partnerCopy);
//     };
  
  
  
//     const handleFirmNameChange = (e) => {
//       const value = e.target.value;
    
      
//       if (!/^\d*$/.test(value)) {
//         setFirmNameError("Lead No should only contain digits"); 
//       } else {
//         setFirmNameError(""); 
//       }
    
//       setFirmName(value);
//     };
    
  
//     const validateFirmName = () => {
//       if (!firmName.trim()) {
//         setFirmNameError("Firm Name is required.");
//         return false;
//       }
//       setFirmNameError("");
//       return true;
//     };
//     // const [formData, setFormData] = useState({
//     //   firmName: '',
//     //   closingExecutive: '',
//     //   firmPan: '',
//     //   status: '',
//     //   assignTo: '',
//     //   leadType: '',
//     //   nextFollowUp: '',
//     //   mobileNo: '',
//     //   mailId: '',
//     //   address: '',
//     //   residentialAddress: '',
//     //   panNo: '',
//     // });
  



//     const [formData, setFormData] = useState({
//   leadNo: '',
//   closingExecutive: '',
//   remark: '',
//   name: '',
//   status: '',
//   assignTo: '',
//   leadType: '',
//   nextFollowUp: '',
// });

//     const [formValues, setFormValues] = useState({
//       firmName: "",
//       projectName: "",
//       projectAddress: "",
//       oldSurveyNumber: "",
//       newSurveyNumber: "",
//       village: "",
//       taluka: "",
//       district: "",
//       sanctionAuthority: "",
//       east: "",
//       west: "",
//       north: "",
//       south: "",
//       latitude: "",
//       longitude: "",
//       landmark: "",
//     });
  
//     const [leadType, setLeadType] = useState('');
//     const [lastFollowUp, setLastFollowUp] = useState(""); // or some default value
//     const [remark, setRemark] = useState(""); // Set a default value if needed
//     const [leadNo, setLeadNo] = useState("");  // Initialize leadNo state with an empty string

//     const [mailId, setMailId] = useState("");  // Initialize mailId state

//     const [errors, setErrors] = useState({
//       firmName: "",
//     });
    
  
//     const handleChange = (e, label, partnerIndex) => {
//       const { value } = e.target;
    
     
//       const updatedPartners = [...partners];
//       updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
//       setPartners(updatedPartners);
    
     
//       if (label === 'Firm Name') {
       
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           setErrors((prev) => ({
//             ...prev,
//             firmName: 'Firm Name should only contain letters and spaces',
//           }));
//         } else {
//           setErrors((prev) => ({
//             ...prev,
//             firmName: '', 
//           }));
//         }
//       }
//     };
    
    
  
//     const validateAge = (age) => {
//       if (!age || age < 0 || age > 120) {
//         setAgeError("Please enter a valid age between 0 and 120");
//       } else {
//         setAgeError("");
//       }
//     };
    
    
//     const handleIfscCodeChange = (e) => {
//       const value = e.target.value;
    
      
//       const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    
//       if (value && !ifscRegex.test(value)) {
//         setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
//       } else {
//         setIfscCodeError(""); 
//       }
    
    
//       setIfscCode(value); 
//     };
    
  
//     const handleMobileChange = (e, index) => {
//       const value = e.target.value;
//       const partnerCopy = [...partners];
    
     
//       if (/[^0-9]/.test(value)) {
//         setMobileError("Mobile number should only contain digits");
//       } else if (value.length > 10) {
//         setMobileError("Mobile number cannot exceed 10 digits");
//       } else {
//         setMobileError(""); 
//       }
    
    
//       partnerCopy[index] = { ...partnerCopy[index], mobileNo: value };
//       setPartners(partnerCopy);
//     };
    
//     const handleEmailChange = (e, index) => {
//       const value = e.target.value;
//       const partnerCopy = [...partners];
    
//       const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    
//       if (value && !emailRegex.test(value)) {
//         setEmailError("Invalid Gmail address");
//         console.log("invalid email");
//       } else {
//         setEmailError(""); 
//       }
    
     
//       partnerCopy[index] = { ...partnerCopy[index], email: value };
//       setPartners(partnerCopy);
//     };
  
  
  
//     const validateForm = () => {
      
//     };
    
//     // const handleClosingExecutiveChange = (event) => {
//     //     setClosingExecutive(event.target.value);
//     //   };


//       const handleDownloadPDFPending = () => {
//         console.log("Loans data before mapping:", loans); 
    
//         const doc = new jsPDF("landscape");
//         doc.setFontSize(14);
//         doc.text("Pending Follow-up Report", 14, 15);
    
//         // Define new table columns
//         const tableColumn = [
//             "Last Follow Up", "Status", "Remark", "Next Follow Up", 
//             "Assign To", "Lead No.", "Name", "Mobile No. / WhatsApp No.", 
//             "You Are Looking For?", "Email", "Source Name"
//         ];
    
//         // Map data into rows
//         const tableRows = loans.map(row => [
//             row.lastFollowUp || "-",
//             row.status || "-",
//             row.remark || "-",
//             row.nextFollowUp || "-",
//             row.assignTo || "-",
//             row.leadNo || "-",
//             row.name || "-",
//             row.mobile || "-",
//             row.lookingFor || "-",
//             row.email || "-",
//             row.sourceName || "-"
//         ]);
    
//         console.log("Formatted Table Rows:", tableRows);
    
//         autoTable(doc, {
//             startY: 25,
//             head: [tableColumn],
//             body: tableRows,
//             styles: { fontSize: 10, cellPadding: 3 },
//             headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//         });
    
//         doc.save("PendingFollowup_Report.pdf");
//     };
    
//     const handleDownloadPDFHistory = () => {
//       console.log("Loans data before mapping:", loans); 
  
//       const doc = new jsPDF("landscape");
//       doc.setFontSize(14);
//       doc.text("Pending Follow-up Report", 14, 15); 
  
//       // Columns for the first page
//       const firstPageColumns = [
//           "STATUS HISTORY", "REMARK HISTORY", "ASSIGN TO HISTORY", "LEAD DAYS", "TIMESTAMP", 
//           "ENQUIRY NO", "LEAD NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE","WHATSAPP NO."
//       ];
  
//       // Columns for the second page
//       const secondPageColumns = [
//          "EMAIL", "ADDRESS", "OCCUPATION", "COMPANY", 
//           "INTERESTED IN", "BUDGET (APPROX.)", "REASON FOR PURCHASE", "REFERENCE BY / SOURCE", 
//           "NAME OF CP ", "PLANNING TO BUY WITHIN?", "CUSTOMER FEEDBACK"
//       ];
  
//       // Limit the number of rows to fit within 2 pages
//       const maxRowsPerPage = 15;
//       const totalRows = Math.min(loans.length, maxRowsPerPage * 2);
  
//       // Mapping data for the first page
//       const firstPageRows = loans.slice(0, totalRows).map(row => [
//           row.statusHistory || "-",
//           row.remarkHistory || "-",
//           row.assignToHistory || "-",
//           row.leadDays || "-",
//           row.timestamp || "-",
//           row.enquiryNo || "-",
//           row.leadNo || "-",
//           row.salesExecutiveName || "-",
//           row.name || "-",
//           row.mobile || "-"
//       ]);
  
//       // Mapping data for the second page
//       const secondPageRows = loans.slice(0, totalRows).map(row => [
//           row.whatsappNo || "-",
//           row.alternateContactNo || "-",
//           row.email || "-",
//           row.address || "-",
//           row.occupation || "-",
//           row.company || "-",
//           row.interestedIn || "-",
//           row.budgetApprox || "-",
//           row.reasonForPurchase || "-",
//           row.referenceBySource || "-",
//           row.nameOfCP || "-",
//           row.planningToBuyWithin || "-",
//           row.customerFeedback || "-"
//       ]);
  
//       console.log("Formatted Table Rows for First Page:", firstPageRows);
//       console.log("Formatted Table Rows for Second Page:", secondPageRows);
  
//       // Generate the first page
//       autoTable(doc, {
//           startY: 25,
//           head: [firstPageColumns],
//           body: firstPageRows,
//           styles: { fontSize: 10, cellPadding: 3 },
//           headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//           margin: { top: 20 }
//       });
  
//       // Add a new page for the remaining columns
//       doc.addPage();
//       doc.text("Pending Follow-up Report (Continued)", 14, 15);
  
//       // Generate the second page
//       autoTable(doc, {
//           startY: 25,
//           head: [secondPageColumns],
//           body: secondPageRows,
//           styles: { fontSize: 10, cellPadding: 3 },
//           headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//           margin: { top: 20 }
//       });
  
//       doc.save("Followup_History_Report.pdf");
//   };
  

 

//   const handleDownloadPDFUndefined = () => {
//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Pending Follow-up Report", 14, 15); 

//     // Merged columns for a single page
//     const tableColumns = [
//         "STATUS HISTORY", "REMARK HISTORY", "LEAD NO", "NAME", "MOBILE NO.",
//         "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME"
//     ];

//     // Limit the number of rows to fit within one page
//     const maxRowsPerPage = 15;
//     const totalRows = Math.min(loans.length, maxRowsPerPage);

//     // Mapping data for the table
//     const tableRows = loans.slice(0, totalRows).map(row => [
//         row.statusHistory || "-",
//         row.remarkHistory || "-",
//         row.leadNo || "-",
//         row.name || "-",
//         row.mobile || "-",
//         row.lookingFor || "-",
//         row.email || "-",
//         row.sourceName || "-"
//     ]);

//     console.log("Formatted Table Rows:", tableRows);

//     // Generate the table on a single page
//     autoTable(doc, {
//         startY: 25,
//         head: [tableColumns],
//         body: tableRows,
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//         margin: { top: 20 }
//     });

//     doc.save("Undefined_Report.pdf");
// };

// const handleDownloadPDFVisit = () => {
//   const doc = new jsPDF("landscape");
//   doc.setFontSize(14);
//   doc.text("Pending Follow-up Report", 14, 15); 


//   const tableColumns = [
//       "TIMESTAMP", "LEAD NO.",  "NAME", "MOBILE NO.",
//       "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME", "LOCATION"
//   ];

  
//   const maxRowsPerPage = 15;
//   const totalRows = Math.min(loans.length, maxRowsPerPage);

//   const tableRows = loans.slice(0, totalRows).map(row => [
//       row.statusHistory || "-",
//       row.remarkHistory || "-",
//       row.leadNo || "-",
//       row.name || "-",
//       row.mobile || "-",
//       row.lookingFor || "-",
//       row.email || "-",
//       row.sourceName || "-"
//   ]);

//   console.log("Formatted Table Rows:", tableRows);

  
//   autoTable(doc, {
//       startY: 25,
//       head: [tableColumns],
//       body: tableRows,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//       margin: { top: 20 }
//   });

//   doc.save("VisitScheduled_Report.pdf");
// };
  
// const handleClosingExecutiveChange = (e) => {
//   setClosingExecutive(e.target.value);
// };


// // Handle Assign To Change
// const handleAssignToChange = (e) => {
//   setAssignTo(e.target.value);
// };

// // Handle Lead Type Change
// const handleLeadTypeChange = (e) => {
//   setLeadType(e.target.value);
// };

// // Handle Next Follow Up Date Change
// const handleNextFollowUpChange = (newValue) => {
//   setNextFollowUp(newValue ? newValue.format('YYYY-MM-DD') : '');
// };



// const handleSubmit = (e) => {
 

//   const newFirm = {
//     lastFollowUp,
//     status,
//     remark,
//     nextFollowUp,
//     assignTo,
//     leadNo,
//     name,
//     mobileNo,
//     mailId,
   
//   };

 
//  setLoans((prev) => [...prev, formData]);
//   setFormData({   
//     leadNo: '',
//     closingExecutive: '',
//     name: '',
//     remark: '',
//     status: '',
//     assignTo: '',
//     leadType: '',
//     nextFollowUp: '',
//   });
//   console.log("Form submitted with data:", formData);
// };


//     return (
//       <div className="main-content">
//         <h6>Sales Module / Enquiry Follow Up Management</h6>
       
     
   
      
  
  
//         <div className="d-flex align-items-center mb-3">
        

// {sections.map((section, index) => (
//   <div 
//     key={index} 
//     style={{ 
//       display: 'flex', 
//       alignItems: 'center', 
//       backgroundColor: Constants.primaryColor,
//       padding: '8px', 
//       borderRadius: '20px',  
//       margin: '5px',
//       cursor: 'pointer',    
//       transition: "width 0.3s ease, background 0.3s ease",
//       width: expandedSection === index ? "220px" : "50px", 
//       minWidth: "50px",
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       fontSize: "14px",
//       justifyContent: "center",
//       textTransform: "none",
//       position: "relative",
//       background: Constants.primaryColor, 
//       boxShadow:
//         "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//     }}
//     onClick={() => handleToggleSection(index)}  
//   >
    
//     {React.cloneElement(section.icon, { 
//       style: { 
//         marginRight: '8px', 
//         fontSize: expandedSection === index ? '150px' : '160px', 
//         color: '#fff',
//         transition: "font-size 0.3s ease",  
//       }
//     })}

    
//     {expandedSection === index ? (
//       <span className="p-1 fw-bold fs-6" style={{ color: 'white', marginLeft: '10px' }}>
//         {section.label}
//       </span>
//     ) : null}

   
//     <div style={{
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(255, 255, 255, 0.2)",
//       transform: "scale(0.1)",
//       transition: "transform 0.3s ease",
//       zIndex: -1,
//     }}></div>

//     <div 
//       style={{
//         "&:hover": {
//           background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
//         },
//         "&:hover div": {
//           transform: "scale(1)",
//         },
//       }}
//     ></div>
//   </div>
// ))}

//         </div>
//   {expandedSection === 0 && selectedTab === "firm" && (
//     <div className="content-container mt-3">
//       {!showFirmForm ? (
//         <>
//           <div className='button-container'>
//            <div className='d-flex gap-3'>
//            <Button 
//               variant="contained" 
//               color="primary" 
//               style={{ background: Constants.primaryColor }} 
//               className='fw-bold'
//               onClick={() => setShowFirmForm(true)}
//             >
//               + New Follow UP
//             </Button>
//             <Button
//     variant="contained"
//     sx={{
//       background: Constants.primaryColor,
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  
//       gap: "8px",  
//       "&:hover": {
//         background: Constants.primaryColor,
//       },
     
//     }}
    
//     onClick={handleDownloadPDFPending}
//   >
//     <FaFileDownload size={18} />  
//     Download PDF
//   </Button>
//            </div>
  
        
//             <div className="right-buttons">
//               <Button variant="contained" color="secondary" onClick={handlePrevious}>
//                 Previous
//               </Button>
//               <Button variant="contained" color="secondary" onClick={handleNext}>
//                 Next
//               </Button>
//             </div>
//           </div>
  
//           <div className="mt-3">
         
//             {/* <PendingFollowuptable firms={loans}  /> */}
//               <PendingFollowuptable firms={loans} setFirms={setFirms} />
//           </div>
//         </>
//       ) : (
     
  
//       <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
//       <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
//         <Typography variant="h5" gutterBottom>
          
//         </Typography>
  
       
        
//         <Grid container spacing={2}>
//     <Grid item xs={6}>
//       <TextField
//         label="Lead No"
//         fullWidth
//         variant="outlined"
//         value={firmName}
//         onChange={handleFirmNameChange} 
//         error={!!firmNameError} 
//         helperText={firmNameError} 
//       />
//     </Grid>
   
//       <Grid item xs={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="closing-executive-label">Closing Executive</InputLabel>
//           <Select
//             labelId="closing-executive-label"
//             id="closing-executive"
//             value={closingExecutive}
//             onChange={handleClosingExecutiveChange}
//             label="Closing Executive"
//           >
           
//             <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
//             <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
//             <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
//             <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
//             <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//             <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
//             <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
//             <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
    

  
//     <Grid item xs={6}>
//       <TextField
//         label="Remark"
//         fullWidth
//         variant="outlined"
        
//       />
//     </Grid>


//     <Grid item xs={6}>
//   <TextField
//     label="Name"
//     fullWidth
//     variant="outlined"
//     value={firmPan}
//     onChange={handleNameChange}
//     error={!!nameError}
//     helperText={nameError}
//   />
// </Grid>


//     <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="status-label">Status</InputLabel>
//     <Select
//       labelId="status-label"
//       id="status"
//       label="Status"
//       fullWidth
//       variant="outlined"
//     >
//       <MenuItem value="Follow Up">Follow Up</MenuItem>
//       <MenuItem value="Not Interested">Not Interested</MenuItem>
//       <MenuItem value="Callback Request">Callback Request</MenuItem>
//       <MenuItem value="Unreachable">Unreachable</MenuItem>
//       <MenuItem value="Booked History in Other Project">Booked History in Other Project</MenuItem>
//       <MenuItem value="Not Answer">Not Answer</MenuItem>
//       <MenuItem value="Invalid Number">Invalid Number</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>

   
//     <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="assign-to-label">Assign To</InputLabel>
//     <Select
//       labelId="assign-to-label"
//       id="assign-to"
//       label="Assign To"
//       fullWidth
//       variant="outlined"
//     >
//       <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
//       <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
//       <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
//       <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
//       <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//       <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
//       <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
//       <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>

    
// <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="lead-type-label">Lead Type</InputLabel>
//     <Select
//       labelId="lead-type-label"
//       id="lead-type"
//       label="Lead Type"
//       fullWidth
//       variant="outlined"
//     >
//       <MenuItem value="Hot">Hot</MenuItem>
//       <MenuItem value="Cold">Cold</MenuItem>
//       <MenuItem value="Warm">Warm</MenuItem>
//       <MenuItem value="Lost">Lost</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>


// <Grid item xs={6}>
//   <Box sx={{ width: '100%' }}>
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label="Next Follow Up"
//         value={formData.nextFollowUp ? dayjs(formData.nextFollowUp) : null}
//         onChange={(newValue) => {
//           setFormData({
//             ...formData,
//             nextFollowUp: newValue ? newValue.format('YYYY-MM-DD') : '',
//           });
//         }}
//          format="DD/MM/YYYY"
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: '#fff', borderRadius: '8px' }}
//             InputLabelProps={{ shrink: true }}
//           />
//         )}
//       />
//     </LocalizationProvider>
//   </Box>
// </Grid>


//   </Grid>
  
  

  
  
  
  
       
//            <Button
//   variant="contained"
//   className="m-3"
//   color="success"
//   onClick={() => {
//     handleSubmit(); 
//     console.log('Form submitted with data:', {
//       firmName,
//       closingExecutive,
//       firmPan,
//       status,
//       assignTo,
//       leadType,
//       nextFollowUp
//     });
//     toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//     setShowFirmForm(false);
//   }}
// >
//   Submit
// </Button>

//       </Paper>
//     </div>
      
//       )}
//     </div>
//   )}
  
  
  
//   {expandedSection === 1 && selectedTab === "display" && (
//     <div className="content-container mt-3">
     
//       {!showProjectForm ? (
//          <>
//      <div>
//      <Button
//     variant="contained"
//     sx={{
//       background:Constants.primaryColor,
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: Constants.primaryColor,
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFHistory}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//      </div>
  
  
  
  
  
//   <div className='mt-3'>
 
//  <div>
 

//  </div>
//   <FollowupHistoryTable data={projectData} />

//   </div>
//      </>
//       ) : (
       
//   <div>

//   </div>
  
  
//       )}
//     </div>
//   )} 
  
  
  
  
  
  
  
  
  
  
//   {expandedSection === 2 && selectedTab === "landowner" && (
//     <div className="content-container mt-3">
     
//       {!showLandownerForm ? (
//          <>
//          <div className='button-container'>
      
    
   
//       </div>
//   <div className='mt-3'>
//   {/* <LandownerTable data={projectData} /> */}
//   {/* <BookedTable data ={projectData} /> */}

//   <div>
//   <Button className='m-2'
//     variant="contained"
//     sx={{
//       background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFUndefined}
//   >
//     <FaFileDownload size={18} />  
//     Download PDF
//   </Button>
//   </div>
//   <UndefinedTable data= {Flatdata} />
//   </div>
//   </>
  
//       ) : (
//         <div>

//         </div>
  
//       )}
//     </div>
//   )}
  
  
//   {expandedSection === 3 && selectedTab === "allotement" && (
//     <div className="content-container mt-3">
//       {!showFlatForm ? (
//         <>
        
          
//           <div className="button-container">
//           <Button
//     variant="contained"
//     sx={{
//       background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFVisit}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//     </div>
  
  
//           <div className="mt-3">
//             {/* <FlatAllotment data={Flatdata} /> */}
//             {/* <UndefinedTable data= {Flatdata} /> */} 

//             <BookedTable data ={projectData} />
//           </div>
//         </>
//       ) : (
//         <div>

//         </div>
  
//       )}
//     </div>
//   )}
//   </div>
//     )
//   };
     
   
    


// export default LeadsFollowUp;

// With responsive and updated code:



import React, { useState, useEffect } from 'react';
import {
  Input, Table, TableBody, TableCell, TableContainer, Typography,
  IconButton, TableHead, TableRow, Paper, Box, Tabs, Tab, Button,
  TextField, Grid, MenuItem, FormControl, Select, InputLabel,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
// import FollowupHistoryTable from './FollowupHistoryTable';
import Leadsfollowup_followuphistory from './leadsfollowup_followuphistory';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';
import PendingFollowuptable from './PendingFollowuptable';

import { AiOutlineProject } from 'react-icons/ai';
import { MdLocationCity } from 'react-icons/md';
import { GiHouseKeys } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';

import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";

import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Constants from '../Constants';


const sections = [
  { label: "Pending Follow Up", icon: <FaUsers size={20} />, createLabel: "Create Firm" },
  { label: "Follow Up History", icon: <AiOutlineProject size={20} />, createLabel: "Create Project" },
  { label: "Undefined", icon: <MdLocationCity size={20} />, createLabel: "Create Landowner Info" },
  { label: "Visit Scheduled", icon: <GiHouseKeys size={20} />, createLabel: "Create Flat Allotment Info" },
];
const tabNames = ["firm", "display", "landowner", "allotement"];

const LeadsFollowUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [phases, setPhases] = useState([]);
  const [showLandownerForm, setShowLandownerForm] = useState(false);
  const [showFlatForm, setShowFlatForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("firm");
  const [projectData, setProjectData] = useState([]);
  const [FlatAllotement, setFlatAllotement] = useState([false]);
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
  const [leadNoError, setLeadNoError] = useState("");
  const [firmNameError, setFirmNameError] = useState("");

  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");

  const [firmPan, setFirmPan] = useState("");

  const [ageError, setAgeError] = useState("");
  const [occupationError, setOccupationError] = useState("");

  const [closingExecutive, setClosingExecutive] = useState('');
  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [status, setStatus] = useState({});
  const [firms, setFirms] = useState([]);

  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: "",
    firmGstNoDocument: "",
    firmLightBillForAddressProof: "",
  });


  //  state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    leadType: '',
    status: ''
  });


  const handleLeadNoChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setLeadNoError("Lead No should only contain digits");
    } else {
      setLeadNoError("");
    }

    setFormData({ ...formData, leadNo: value });
  };


  useEffect(() => {
    console.log("Updated Selected Tab:", selectedTab);
    loadLoansData();
  }, []);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
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

    setShowFlatForm(false);
  };





  { selectedTab === "firm" && <PendingFollowuptable /> }
  // { selectedTab === "display" && <FollowupHistoryTable /> }
   { selectedTab === "display" && <Leadsfollowup_followuphistory /> }
  { selectedTab === "landowner" && <LandownerTable /> }
  { selectedTab === "allotement" && <FlatAllotement /> }

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/path/to/demand_letter.pdf";
    link.download = "Demand_Letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  const handleNameChange = (e) => {
    const value = e.target.value;

    // Validation: Only letters and spaces allowed
    if (/[^a-zA-Z\s]/.test(value)) {
      setNameError('Name should only contain letters and spaces.');
    } else {
      setNameError('');
    }

    setFormData({ ...formData, name: value });
  };




  const [formData, setFormData] = useState({
    leadNo: '',
    closingExecutive: '',
    remark: '',
    name: '',
    status: '',
    assignTo: '',
    leadType: '',
    nextFollowUp: '',
  });




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
      "ENQUIRY NO", "LEAD NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "WHATSAPP NO."
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


    const tableColumns = [
      "TIMESTAMP", "LEAD NO.", "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME", "LOCATION"
    ];


    const maxRowsPerPage = 15;
    const totalRows = Math.min(loans.length, maxRowsPerPage);

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

  


  // Handle Assign To Change
  const handleAssignToChange = (e) => {
    setAssignTo(e.target.value);
  };

  // Handle Lead Type Change
  const handleLeadTypeChange = (e) => {
    setLeadType(e.target.value);
  };

  // Handle Next Follow Up Date Change
  const handleNextFollowUpChange = (newValue) => {
    setNextFollowUp(newValue ? newValue.format('YYYY-MM-DD') : '');
  };






  const handleSubmit = () => {
    // Validate required fields
    let hasErrors = false;
    const newErrors = {
      leadType: '',
      status: ''
    };

    if (!formData.leadType) {
      newErrors.leadType = 'Lead Type is required';
      hasErrors = true;
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
      hasErrors = true;
    }

    setValidationErrors(newErrors);

    if (hasErrors) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    const newFollowUp = {
      leadNo: formData.leadNo,
      name: formData.name,
      remark: formData.remark,
      leadType: formData.leadType,
      status: formData.status,

    };

    // Add to the loans array
    setLoans((prev) => [...prev, newFollowUp]);

    // Reset form data
    setFormData({
      leadNo: '',
      name: '',
      remark: '',
      leadType: '',
      status: '',
    });

    // Reset validation errors
    setValidationErrors({
      leadType: '',
      status: ''
    });

    console.log("Form submitted with data:", newFollowUp);
    toast.success("Follow-up details submitted!", { position: "top-right", autoClose: 3000 });
    setShowFirmForm(false);
  };

  return (
    <div className="container my-2">
      <h6 className="mb-3 fs-6">Sales Module / Lead Follow Up Management</h6>

      {/* <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
        
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: Constants.primaryColor,
              padding: '8px',
              borderRadius: '20px',
              margin: '5px',
              cursor: 'pointer',
              transition: "width 0.3s ease, background 0.3s ease",
              width: expandedSection === index ? (isMobile ? "180px" : "220px") : "50px",
              minWidth: "50px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              fontSize: isMobile ? "12px" : "14px",
              justifyContent: "center",
              textTransform: "none",
              position: "relative",
              background: Constants.primaryColor,
              boxShadow:
                "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
            }}
            onClick={() => handleToggleSection(index)}
          >
            {React.cloneElement(section.icon, {
              style: {
                marginRight: expandedSection === index ? '8px' : '0',
                fontSize: isMobile ? '16px' : (expandedSection === index ? '20px' : '20px'),
                color: '#fff',
                transition: "font-size 0.3s ease",
              }
            })}

            {expandedSection === index ? (
              <span className="p-1 fw-bold" style={{
                color: 'white',
                marginLeft: '5px',
                fontSize: isMobile ? '12px' : '14px'
              }}>
                {section.label}
              </span>
            ) : null}

            {/* <div style={{
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
       
  <button
    className="btn"
    onClick={handleDownloadPDFPending}
    style={{
      backgroundColor: Constants.primaryColor,
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "20px",
      padding: isMobile ? "6px 12px" : "8px 16px",
      margin: "5px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    <FaFileDownload size={isMobile ? 16 : 18} />
    {isMobile ? "PDF" : "Download PDF"}
  </button>
      </div> */}

     {/* Sections Row */}
<div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3" 
 style={{
    justifyContent: "space-between", // ✅ Tabs left, button right
    width: "100%",
  }}
>

<div className="d-flex flex-wrap">
  {sections.map((section, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Constants.primaryColor,
        padding: '8px',
        borderRadius: '20px',
        margin: '5px',
        cursor: 'pointer',
        transition: "width 0.3s ease, background 0.3s ease",
        width: expandedSection === index ? (isMobile ? "180px" : "220px") : "50px",
        minWidth: "50px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: isMobile ? "12px" : "14px",
        justifyContent: "center",
        textTransform: "none",
        position: "relative",
        background: Constants.primaryColor,
        boxShadow:
          "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
      }}
      onClick={() => handleToggleSection(index)}
    >
      {React.cloneElement(section.icon, {
        style: {
          marginRight: expandedSection === index ? '8px' : '0',
          fontSize: isMobile ? '16px' : (expandedSection === index ? '20px' : '20px'),
          color: '#fff',
          transition: "font-size 0.3s ease",
        }
      })}

      {expandedSection === index ? (
        <span className="p-1 fw-bold" style={{
          color: 'white',
          marginLeft: '5px',
          fontSize: isMobile ? '12px' : '14px'
        }}>
          {section.label}
        </span>
      ) : null}
    </div>
  ))}
</div>
  {/* ✅ One Centralized Download PDF Button */}
  <button
    className="btn"
    onClick={() => {
      if (selectedTab === "firm") handleDownloadPDFPending();
      else if (selectedTab === "display") handleDownloadPDFHistory();
      else if (selectedTab === "landowner") handleDownloadPDFUndefined();
      else if (selectedTab === "allotement") handleDownloadPDFVisit();
    }}
    style={{
      backgroundColor: Constants.primaryColor,
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "20px",
      padding: isMobile ? "6px 12px" : "8px 16px",
      margin: "5px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    <FaFileDownload size={isMobile ? 16 : 18} />
    {isMobile ? "PDF" : "Download PDF"}
  </button>
</div>
  
      {expandedSection === 0 && selectedTab === "firm" && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>

             

              <div className="mt-3">
                <PendingFollowuptable firms={loans} setFirms={setLoans} isMobile={isMobile} isTablet={isTablet} />
              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => setShowFirmForm(false)}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
            >
              <DialogTitle>Add New Follow Up</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Lead No"
                      fullWidth
                      variant="outlined"
                      value={formData.leadNo}
                      onChange={handleLeadNoChange}
                      error={!!leadNoError}
                      helperText={leadNoError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>


                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      variant="outlined"

                      value={formData.name}
                      onChange={handleNameChange}
                      error={!!nameError}
                      helperText={nameError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Remark"
                      fullWidth
                      variant="outlined"
                      value={formData.remark}
                      onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor }} required
                    >
                      <InputLabel id="lead-type-label">Lead Type</InputLabel>
                      <Select
                        labelId="lead-type-label"
                        id="lead-type"
                        label="Lead Type"
                        value={formData.leadType}
                        onChange={(e) => {
                          setFormData({ ...formData, leadType: e.target.value });
                          setValidationErrors({ ...validationErrors, leadType: '' });
                        }}
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiSelect-icon': {
                            color: Constants.primaryColor
                          }
                        }}
                      >
                        <MenuItem value="Hot">Hot</MenuItem>
                        <MenuItem value="Cold">Cold</MenuItem>
                        <MenuItem value="Warm">Warm</MenuItem>
                        <MenuItem value="Lost">Lost</MenuItem>

                      </Select>
                      {validationErrors.leadType && (
                        <Typography variant="caption" color="error">
                          {validationErrors.leadType}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>



                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor }} required
                    >
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        id="status"
                        label="Status"
                        value={formData.status}
                        onChange={(e) => {
                          setFormData({ ...formData, status: e.target.value });
                          setValidationErrors({ ...validationErrors, status: '' });
                        }}
                        fullWidth
                        variant="outlined"
                        sx={{
                          '& .MuiSelect-icon': {
                            color: Constants.primaryColor
                          }
                        }}
                      >
                        <MenuItem value="Follow Up">Follow Up</MenuItem>
                        <MenuItem value="Not Interested">Not Interested</MenuItem>
                        <MenuItem value="Callback Request">Callback Request</MenuItem>
                        <MenuItem value="Unreachable">Unreachable</MenuItem>
                        <MenuItem value="Booked History in Other Project">Booked History in Other Project</MenuItem>
                        <MenuItem value="Not Answer">Not Answer</MenuItem>
                        <MenuItem value="Invalid Number">Invalid Number</MenuItem>
                      </Select>
                      {validationErrors.status && (
                        <Typography variant="caption" color="error">
                          {validationErrors.status}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid>


                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setShowFirmForm(false)} color="secondary">
                  Cancel
                </Button>
                <Button
                  variant="contained"

                  style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }}

                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}
      {expandedSection === 1 && selectedTab === "display" && (
        <div className="content-container mt-3">
          {!showProjectForm ? (
            <>
              <div className='mt-3'>
                {/* <FollowupHistoryTable data={projectData} isMobile={isMobile} isTablet={isTablet} /> */}
                        <Leadsfollowup_followuphistory data={projectData} isMobile={isMobile} isTablet={isTablet} />
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
             

              <div className='mt-3'>
                <UndefinedTable data={Flatdata} isMobile={isMobile} isTablet={isTablet} />
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
             

              <div className='mt-3'>
                <BookedTable data={projectData} isMobile={isMobile} isTablet={isTablet} />
              </div>
            </>
          ) : (
            <div>

            </div>
          )}
        </div>
      )}



      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
};

export default LeadsFollowUp;