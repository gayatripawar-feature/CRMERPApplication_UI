// import React, { useState, useEffect } from 'react';
// import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
// import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
// import FirmTable from './FirmTable';
// import DisplayTable from "./DisplayTable";
// import LandownerTable from "./LandownerTable";
// import FlatAllotment from './FlatAllotement';
// import { ToastContainer, toast } from 'react-toastify';
// import { useRef } from "react";
// import {  FaProjectDiagram, FaUserTie, FaHome, } from 'react-icons/fa';
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable"; 
// import { GetApp as GetAppIcon } from '@mui/icons-material';
// import { PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';
// import html2canvas from "html2canvas";
// import Constants from '../Constants';
// const fetchLoansData = async () => {
//   const response = await fetch('/api/getOCRCollection');
//   return response.json();
// };

// const sections = [
//   { label: "Firm Display", icon: <FaProjectDiagram size={20} />, createLabel: "Create Firm" },
//   { label: "Project Display", icon: <FaHome size={20} />, createLabel: "Create Project" },
//   { label: "Landowner Display", icon: <FaUserTie size={20} />, createLabel: "Create Landowner Info" },
//   { label: "Landowner Flat Allotement Display", icon: <FaBuilding size={20} />, createLabel: "Create Flat Allotment Info" },
//   ];
// const tabNames = [ "firm", "display", "landowner","allotement"]; 
//   const BasicInfo = () => {
//   const [loans, setLoans] = useState([]);
//   const [expandedSection, setExpandedSection] = useState(0); 
//   const [showFirmForm, setShowFirmForm] = useState(false);
  
//   const [showProjectForm, setShowProjectForm] = useState(false);
//   const [phases, setPhases] = useState([]);
//   const [showLandownerForm, setShowLandownerForm] = useState(false); 
//   const [showFlatForm, setShowFlatForm] = useState(false); 
//   const [selectedTab, setSelectedTab] = useState("firm");
//   const [projectData, setProjectData] = useState([]);
//   const[FlatAllotement , setFlatAllotement] = useState([false]);
//   const [selectedProject, setSelectedProject] = useState('');
//   const [Flatdata, setFlatdata] = useState([]);
//   const [selectedBank, setSelectedBank] = useState('');
//   const [error, setError] = useState('');
//   const [name, setName] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [nameError, setNameError] = useState('');
//   const [mobileNoError, setMobileNoError] = useState('');
//   const [panError, setPanError] = useState("");
//   const[  firmgstno, setFirmGstNo] = useState("");
//   const [firmName, setFirmName] = useState("");
//   const [firmNameError, setFirmNameError] = useState("");
//   const [mobileError, setMobileError] = useState("");
//   const [email, setEmail] = useState('');
//   const [emailError, setEmailError] = useState("");
//   const [firmPan, setFirmPan] = useState("");
//   const [firmPanError, setFirmPanError] = useState("");
//   const [ageError, setAgeError] = useState("");
//   const [occupationError, setOccupationError] = useState(""); 
//  const [aadhaarError, setAadhaarError] = useState(false);
//  const [aadhaarErrorMessage, setAadhaarErrorMessage] = useState("");
//   const [accountNo, setAccountNo] = useState(""); 
// const [accountNoError, setAccountNoError] = useState("");
// const [ifscCode, setIfscCode] = useState(""); 
// const [ifscCodeError, setIfscCodeError] = useState("");
// const [selectedLandowner, setSelectedLandowner] = useState("");
// const [noOfFlats, setNoOfFlats] = useState(0);
// const [tableRows, setTableRows] = useState([]);
// const [firms, setFirms] = useState([]);

//  // Initialize as an empty array
// const projects = ["Project A", "Project B", "Project C"];
// const landowners = {
//   "Project A": [{ name: "John Doe", mobile: "9876543210", flats: 2 }],
//   "Project B": [{ name: "Jane Smith", mobile: "8765432109", flats: 3 }],
//   "Project C": [{ name: "Mike Johnson", mobile: "7654321098", flats: 1 }]
// };
// const handleProjectChange = (event) => {
//   setSelectedProject(event.target.value);
//   setSelectedLandowner("");
//   setMobileNo("");
//   setNoOfFlats(0);
//   setTableRows([]);
// };

// // Handles landowner selection and auto-fills data
// const handleLandownerChange = (event) => {
//   const landowner = landowners[selectedProject].find(l => l.name === event.target.value);
//   setSelectedLandowner(event.target.value);
//   setMobileNo(landowner?.mobile || "");
//   setNoOfFlats(landowner?.flats || 0);
//   generateTableRows(landowner?.flats || 0);
// };

// // Generates rows dynamically based on No. of Flats Allotted
// const generateTableRows = (num) => {
//   setTableRows(new Array(num).fill({
//     area: "",
//     wing: "",
//     flatNo: "",
//     flatType: ""
//   }));
// };

// // Handles changes in the dropdown fields inside the table
// const handleRowChange = (index, field, value) => {
//   const updatedRows = [...tableRows];
//   updatedRows[index][field] = value;
//   setTableRows(updatedRows);
// };
// useEffect(() => {
//   console.log("Loans updated:", loans);
// }, [loans]);

//   const [fileNames, setFileNames] = useState({
//     firmPanNoDocument: [], 
//     firmGstNoDocument: [],
//     firmLightBillForAddressProof: [],
//   });
  

//   const [formData, setFormData] = useState({
//     area: "",
//     wing: "",
//     flatNumber: "",
//     flatType: "",
//   });
 


//   const handleFirmPanChange = (e) => {
//     const value = e.target.value;
//     setFirmPan(value);
 
//     const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
//     if (!panRegex.test(value)) {
//       setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
//     } else {
//       setFirmPanError("");  
//     }
//   };
  
 
//   const validateAadhaar = (aadhaar) => {
//     const aadhaarRegex = /^[0-9]{12}$/; 
//     return aadhaarRegex.test(aadhaar);
//   };
  

  
  
//   const handleFileChange = (event, key) => {
//     const newFiles = Array.from(event.target.files).map(file => file.name);
  
//     setFileNames((prev) => ({
//       ...prev,
//       [key]: prev[key] ? [...prev[key], ...newFiles] : newFiles, 
//     }));
//   };
//     const handleAgeChange = (e, index) => {
//     const value = e.target.value;
//     const updatedPartners = [...partners];
//     updatedPartners[index].age = value; 
//     setPartners(updatedPartners); 
//     // Validate the age value
//     validateAge(value); 
//   };
//  const handleOccupationChange = (e, index) => {
//     const value = e.target.value;
//     const updatedPartners = [...partners];
//     updatedPartners[index].occupation = value; 
//     setPartners(updatedPartners); 
//   };

//   const [partners, setPartners] = useState([
//     { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }
//   ]);
  
//   useEffect(() => {
//     console.log("Updated Selected Tab:", selectedTab);
//     loadLoansData();
//   }, []);

//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoans(data);
//   };


// const handleTabClick = (index) => {
//     console.log("Clicked Section Index:", index);
//     console.log("Selected Tab Before Update:", selectedTab);
//     setSelectedTab(tabNames[index]); 
// };
// const handleTabChange = (_, newValue) => {
//     setSelectedTab(newValue);
//   };
//   const handleToggleSection = (index) => {
//     if (sections[index].label === "Download PDF") {
//       handleDownloadPDF();
//       return;
//     }
//     console.log("Clicked Section Index:", index);
//     console.log("Selected Tab Before Update:", selectedTab);
//     setExpandedSection(index);  

//       // Set selected tab dynamically based on the section clicked
//   if (sections[index].label === "Project Display") {
//     setSelectedTab("display");
//   } else if (sections[index].label === "Firm Display") {
//     setSelectedTab("firm");
//   } else if (sections[index].label === "Landowner Display") {
//     setSelectedTab("landowner");
//   } else if (sections[index].label === "Landowner Flat Allotement Display") {
//     setSelectedTab("allotement");
//   }
//    setShowFirmForm(false);
//     setShowProjectForm(false); 
//     setShowLandownerForm(false); 
//      setShowFlatForm(false);
//   };

//   const [newPhase, setNewPhase] = useState({
//     phaseNo: '',
//     wingNo: '',
//     mahareraNo: ''
//   });

//   const pdfRef = useRef(); 
 
//    {selectedTab === "firm" && <FirmTable />}
//    {selectedTab === "display" && <DisplayTable />}
//    {selectedTab === "landowner" && <LandownerTable />}
//    {selectedTab === "allotement" && <FlatAllotement/>}

//    const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     const timestamp = new Date().toLocaleDateString();  
//     const projectName = "";
//       const name = "";
//       const mobileNo = "";
//       const flatsAlloted = "";  
//       const reraCarpetArea = ""; 
//       const wing = "";
//       const flatNo = "";
//       const typeOfFlat = "";
//       const columns = [
//         "Timestamp", "Project Name", "Name", "Mobile No", 
//         "No of Flats Allotted", "RERA Carpet Area", "Wing", "Flat No", "Type of Flat"
//       ];
//       const data = [
//         timestamp, projectName, name, mobileNo, 
//         flatsAlloted, reraCarpetArea, wing, flatNo, typeOfFlat
//       ];
//       doc.setFontSize(18);
//       doc.text("Flat Allotment Information", 10, 10);
//     doc.setFontSize(12);
//     const columnWidths = [25, 30, 20, 20, 20, 20, 20, 20, 20]; 
//    const splitTextToFit = (text, maxWidth) => {
//         const lines = doc.splitTextToSize(text, maxWidth);
//         return lines;
//       };
//       const rowHeight = 15;  
//       const extraRowSpacing = 5; 
//       let xPos = 10;
//       let yPos = 40;
//      columns.forEach((col, index) => {
//         doc.rect(xPos, yPos, columnWidths[index], 20); 
//         let headerLines = splitTextToFit(col, columnWidths[index] - 4); 
//         doc.text(headerLines, xPos + 2, yPos + 7); 
//         xPos += columnWidths[index]; 
//       });
    
     
//       xPos = 10;
//       yPos += 20;
    
//       data.forEach((value, index) => {
//         doc.rect(xPos, yPos, columnWidths[index], 10); 
//         let dataLines = splitTextToFit(value, columnWidths[index] - 4); 
//         doc.text(dataLines, xPos + 2, yPos + 7); 
//         xPos += columnWidths[index]; 
//       });
    
         
//          yPos += rowHeight + extraRowSpacing;
     
//       doc.save("Flat_Allotment_Info.pdf");
//     };

 

   
    
//     const handleDownloadPDFFirm = () => {
//       console.log("Loans data before mapping:", loans); // Use loans instead of firms
    
     
    
//       const doc = new jsPDF("landscape");
//       doc.setFontSize(14);
//       doc.text("Firm Details Report", 14, 15);
    
//       const tableColumn = [
//         "Timestamp", "Firm Name", "Firm Address", "Firm PAN No",
//         "Firm GST No", "Residential Address", "PAN No", "Aadhaar No",
//         "Photo", "Light Bill"
//       ];
    
//       const tableRows = loans.map(row => [
//         row.timestamp || "-",
//         row.name || "-",
//         row.address || "-",
//         row.firmPanNo || "-",
//         row.firmGstNo || "-",
//         row.residentialAddress || "-",
//         row.panNo || "-",
//         row.aadhaarNo || "-",
//         row.photo || "-",
//         row.lightBill || "-"
//       ]);
    
//       console.log("Formatted Table Rows:", tableRows);
    
//       autoTable(doc, {
//         startY: 25,
//         head: [tableColumn],
//         body: tableRows,
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//       });
    
//       doc.save("Firm_Details_Report.pdf");
//     };
    

//     const displayref = useRef();
    
//     const handleDownloadPDFProject = () => {
//       if (!displayref.current) {
//         console.error("DisplayTable ref is not available.");
//         return;
//       }
//       console.log("Loans data before mapping:", loans); 
    
//       const doc = new jsPDF("landscape");
//       doc.setFontSize(14);
//       doc.text("Project Display Report", 14, 15);
    
//       const tableColumn = [
//         "Timestamp", "Firm Name", "Project Name", "Project Address",
//         "Old Survey No", "New Survey No", "Village", "Taluka",
//         "District", "Sanction Authority", "East", "West",
//         "North", "South", "Latitude", "Longitude",
//         "Landmark", "Phase No", "Wing No", "MahaRERA No"
//       ];
    
//       const tableRows = loans.map(row => [
//         row.timestamp || "-",
//         row.firmName || "-",
//         row.projectName || "-",
//         row.projectAddress || "-",
//         row.oldSurveyNo || "-",
//         row.newSurveyNo || "-",
//         row.village || "-",
//         row.taluka || "-",
//         row.district || "-",
//         row.sanctionAuthority || "-",
//         row.east || "-",
//         row.west || "-",
//         row.north || "-",
//         row.south || "-",
//         row.latitude || "-",
//         row.longitude || "-",
//         row.landmark || "-",
//         row.phaseNo || "-",
//         row.wingNo || "-",
//         row.mahareraNo || "-"
//       ]);
    
//       console.log("Formatted Table Rows:", tableRows);
    
      
    
//       autoTable(doc, {
//         startY: 25,
//         head: [tableColumn],
//         body: tableRows,
//         margin: { top: 20 },
//         styles: { overflow: 'linebreak' },
//         didDrawPage: (data) => {
//           doc.text("Project Display Report", 14, 10);
//         }
//       });
//       doc.save("Project_Display_Report.pdf");
     
//     };
    

//     const landowner_pdf =useRef();


//     const handleDownloadPDFLandowner = () => {
//       if (!landowner_pdf.current) {
//         console.error("LandownerTable ref is not available.");
//         return;
//       }
    
//       console.log("Project Data:", projectData);
    
      
    
//       const doc = new jsPDF("landscape");
//       doc.setFontSize(14);
//       doc.text("Landowner Display Report", 14, 15);
    
//       // ✅ Columns that match the actual data
//       const tableColumn = [
//         "Timestamp", "Project Name", "Landowner Name", "Age", "Occupation",
//         "Mobile No", "Mail ID", "Village", "Taluka", "District",
//         "Bank Name", "Bank Address", "Account No.", "IFSC Code"
//       ];
    
//       // ✅ Ensure column mapping is correct
//       const tableRows = projectData.map(row => [
//         row.timestamp || "-",
//         row.projectName || "-",
//         row.landownerName || "-",
//         row.age || "-",
//         row.occupation || "-",
//         row.mobileNo || "-",
//         row.mailId || "-",
//         row.village || "-",
//         row.taluka || "-",
//         row.district || "-",
//         row.bankName || "-",
//         row.bankAddress || "-",
//         row.accountNo || "-",
//         row.ifscCode || "-"
//       ]);
    
//       console.log("Formatted Table Rows:", tableRows); // Debugging
    
//       autoTable(doc, {
//         startY: 25,
//         head: [tableColumn],
//         body: tableRows,
//         margin: { top: 20 },
//         styles: { overflow: 'linebreak' },
//         didDrawPage: (data) => {
//           doc.text("Landowner Display Report", 14, 10);
//         }
//       });
    
//       // ✅ Save the PDF
//       doc.save("Landowner_Display_Report.pdf");
//     };


//     const allotement_pdf = useRef();
    
//     const handleDownloadPDFAllotement = () => {
//       if (!allotement_pdf.current) {
//           console.error("LandownerTable ref is not available.");
//           return;
//       }
  
//       console.log("Project Data:", projectData);
  
//       const doc = new jsPDF("landscape");
//       doc.setFontSize(14);
     
//       const tableColumn = [
//           "Timestamp", 
//           "Project Name", 
//           "Flat Allottee Name", 
//           "Mobile No.", 
//           "No. of Flats Allotted", 
//           "RERA Carpet Area (SQ FT)", 
//           "Wing", 
//           "Flat No.", 
//           "Type of Flat"
//       ];
  
//       // ✅ Mapping data correctly to the new columns
//       const tableRows = projectData.map(row => [
//           row.timestamp || "-",
//           row.projectName || "-",
//           row.flatAllotteeName || "-",  
//           row.mobileNo || "-",
//           row.noOfFlatsAllotted || "-", 
//           row.reraCarpetArea || "-",    
//           row.wing || "-",
//           row.flatNo || "-",
//           row.typeOfFlat || "-"         
//       ]);
  
//       console.log("Formatted Table Rows:", tableRows); 
  
//       autoTable(doc, {
//           startY: 25,
//           head: [tableColumn],
//           body: tableRows,
//           margin: { top: 20 },
//           styles: { overflow: 'linebreak' },
//           didDrawPage: (data) => {
//               doc.text("Flat Allotment Display Report", 14, 10);
//           }
//       });
  
      
//       doc.save("flat_allotment_display.pdf");
//   };
  
//   const handleAddPartner = () => {
//     setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
//   };

  
  
//   const handleRemovePartner = () => {
//     setPartners(partners.slice(0, partners.length - 1)); 
//   };
  
//   const handleAddPhase = () => {
//     setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); 
//   };

//   const handleRemovePhase = (index) => {
//     setPhases(phases.filter((_, i) => i !== index));
//   };

//   const handlePrevious = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNext = () => {
//     setCurrentPage(currentPage + 1);
//   };

//   const handleCreateFirm = () => {
//     setShowFirmForm(false);
//     setShowProjectForm(false);
//   };

//   const handleCreateProject = () => {
//     setShowProjectForm(true);
//   };

//   const documentLabels = [
//     "Residential Address Document",
//     "PAN No Document",
//     "Aadhaar No Document",
//     "Photo Document",
//     "Light Bill for Address Proof",
//   ];

//   const handleBankChange = (event) => {
//     setSelectedBank(event.target.value);
//   };

//   const handlePANChange = (e, index) => {
//     const updatedPartner = { ...partners[index], pan: e.target.value };
    
//     // Validate PAN No.
//     const isValidPAN = validatePAN(updatedPartner.pan);
//     if (!isValidPAN) {
//       setPanError("Invalid PAN number format.");
//     } else {
//       setPanError(""); // Clear error if valid
//     }
  
//     // Update partner state
//     setPartners((prevPartners) => {
//       const newPartners = [...prevPartners];
//       newPartners[index] = updatedPartner;
//       return newPartners;
//     });
//   };
  

//   const handleNameChange = (event) => {
//     const value = event.target.value;

   
//     if (/[^a-zA-Z\s]/.test(value)) {
//       setError('Name should only contain letters and spaces.');
//     } else {
//       setError('');
//     }

//     setName(value);
//   };

 
//   const handleMobileNoChange = (event) => {
//     const value = event.target.value;
  

//     if (/[^0-9]/.test(value)) {
//       setMobileError('Mobile number should only contain digits.');
//     } else if (value.length > 10) {
//       setMobileError('Mobile number cannot exceed 10 digits.');
//     } else {
//       setMobileError(''); 
//     }
  
   
//     setMobileNo(value);
//   };
  

//   const handleAccountNoChange = (e) => {
//     const value = e.target.value;
//      // Regular expression to check if the value is numeric and has a (e.g., 10-16 digits)
//     const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
//     if (value && !accountNoRegex.test(value)) {
//       setAccountNoError("Account number must be between 10 to 16 digits.");
//     } else {
//       setAccountNoError(""); 
//     }
//    setAccountNo(value);
//   };

//   const validatePAN = (pan) => {
//     const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format: 5 letters, 4 digits, 1 letter
//     return panPattern.test(pan);
//   };

//   const handlePartnerNameChange = (e, index) => {
//     const value = e.target.value;
//     const partnerCopy = [...partners];
//     // Regex to check if the value contains any numbers
//     if (/\d/.test(value)) {
//       setNameError("Name should only contain letters"); 
//     } else {
//       setNameError(""); // Clear error message if the value is valid
//     }
//  // Update the partner's name in the state
//     partnerCopy[index] = { ...partnerCopy[index], name: value };
//     setPartners(partnerCopy);
//   };


//   const handleFirmNameChange = (e) => {
//     const value = e.target.value;


//     if (/\d/.test(value)) {
//       setFirmNameError("Firm Name should only contain letters"); 
//     } else {
//       setFirmNameError(""); 
//     }

    
//     setFirmName(value);
//   };


//   const validateFirmName = () => {
//     if (!firmName.trim()) {
//       setFirmNameError("Firm Name is required.");
//       return false;
//     }
//     setFirmNameError("");
//     return true;
//   };


//   const [formValues, setFormValues] = useState({
//     firmName: "",
//     projectName: "",
//     projectAddress: "",
//     oldSurveyNumber: "",
//     newSurveyNumber: "",
//     village: "",
//     taluka: "",
//     district: "",
//     sanctionAuthority: "",
//     east: "",
//     west: "",
//     north: "",
//     south: "",
//     latitude: "",
//     longitude: "",
//     landmark: "",
//   });

//   // State to store validation errors
//   const [errors, setErrors] = useState({
//     firmName: "",
//   });
  


  
//   const handleChange = (e, label) => {
//     const { value } = e.target;
  
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [label.toLowerCase().replace(/ /g, "")]: value,
//     }));
  
//     if (label === 'Firm Name') {
//       if (!/^[A-Za-z\s]*$/.test(value)) {
//         setErrors((prev) => ({
//           ...prev,
//           firmName: 'Firm Name should only contain letters and spaces',
//         }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           firmName: '',
//         }));
//       }
//     }
//   };

//   const validateAge = (age) => {
//     if (!age || age < 0 || age > 120) {
//       setAgeError("Please enter a valid age between 0 and 120");
//     } else {
//       setAgeError("");
//     }
//   };
  
//   const [firmFormData, setFirmFormData] = useState({
//   name: '',
//   address: '',
//   firmPanNo: '',
//   firmGstNo: '',
//   firmPan: null,
//   firmGst: null,
//   firmLightBill: null,
  
// });


// const handleFirmSubmit = () => {
//   const timestamp = new Date().toLocaleString(); 

//   const newFirm = {
//     name: firmName,
//     address: firmFormData.address,
//     firmPanNo: firmPan,
//     firmGstNo: firmFormData.firmGstNo,
//     firmPan: firmFormData.firmPan,          
//     firmGst: firmFormData.firmGst,           
//     firmLightBill: firmFormData.firmLightBill, 
//     partners: partners,
//     timestamp,
//   };

//   setFirms((prevFirms) => [...prevFirms, newFirm]);

//   toast.success("Details are submitted!", {
//     position: "top-right",
//     autoClose: 3000,
//   });

//   // Reset all relevant states
//   setFirmFormData({
//     name: '',
//     address: '',
//     firmPanNo: '',
//     firmGstNo: '',
//     firmPan: null,
//     firmGst: null,
//     firmLightBill: null,
//   });

//   setFirmName('');
//   setFirmPan('');
//   setFirmPanError('');
//   setFirmGstNo('');
//   setPartners([]);
//   setFileNames({});
//   setShowFirmForm(false);
  
// };



//   const handleIfscCodeChange = (e) => {
//     const value = e.target.value;
  
//     // Regular expression to validate IFSC code format
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
//     if (value && !ifscRegex.test(value)) {
//       setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
//     } else {
//       setIfscCodeError(""); 
//     }
  
  
//     setIfscCode(value); 
//   };
  

//   const handleMobileChange = (e, index) => {
//     const value = e.target.value;
//     const partnerCopy = [...partners];
  
//     // Validate Mobile No. to ensure it doesn't exceed 10 digits
//     if (/[^0-9]/.test(value)) {
//       setMobileError("Mobile number should only contain digits");
//     } else if (value.length > 10) {
//       setMobileError("Mobile number cannot exceed 10 digits");
//     } else {
//       setMobileError(""); 
//     }
  
//     // Update the partner's mobile number in the state
//     partnerCopy[index] = { ...partnerCopy[index], mobileNo: value };
//     setPartners(partnerCopy);
//   };
  
//   const handleEmailChange = (e, index) => {
//     const value = e.target.value;
//     const partnerCopy = [...partners];
  
//     // Regular expression to validate Gmail email format
//     // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  
//     if (value && !emailRegex.test(value)) {
//       setEmailError("Invalid Gmail address");
//       console.log("invalid email");
//     } else {
//       setEmailError(""); 
//     }
  
    
//     partnerCopy[index] = { ...partnerCopy[index], email: value };
//     setPartners(partnerCopy);
//   };



//   const validateForm = () => {
//  };
  

 
  
//   return (
//     <div className="main-content">
//       <h6>Developer Module / Basic Information Management</h6>
     
   
 
    


//       <div className="d-flex align-items-center mb-3">
      
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
//       width: expandedSection === index ? "290px" : "50px", 
//       minWidth: "50px",
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       fontSize: "14px",
      
     
//       justifyContent: "center",
//       textTransform: "none",
//       position: "relative",
//       background: Constants.primaryColor, // Gradient background
//       boxShadow:
//         "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//     }}
//     onClick={() => handleToggleSection(index)}  // onClick function for handling clicks
//   >
//     {React.cloneElement(section.icon, { style: { marginRight: '8px',color: 'white' } })}  {/* Add some margin to separate icon from label */}
    
//     {/* Conditionally display label based on expandedSection */}
//     {expandedSection === index ? (
//       <span className="fw-bold text-white p-2 fs-6" style={{ color: 'white', marginLeft: '10px' }}>{section.label}</span>
//     ) : null}

//     {/* Hover effects */}
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

//       </div>  
// {expandedSection === 0 && selectedTab === "firm" && (
//   <div className="content-container mt-3">
//     {!showFirmForm ? (
//       <>
//         <div className='button-container'>
//     <div className="d-flex gap-3">  
//   <Button 
//     variant="contained" 
//     color="primary" 
//     style={{ background: Constants.primaryColor }} 
//     className="fw-bold"
//     onClick={() => setShowFirmForm(true)}
//   >
//     + Create Firm
//   </Button>

//   <Button
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
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFFirm}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
// </div>
    
//           {/* Previous and Next buttons on the right */}
//           <div className="right-buttons">
//             <Button variant="contained" color="secondary" onClick={handlePrevious}>
//               Previous
//             </Button>
//             <Button variant="contained" color="secondary" onClick={handleNext}>
//               Next
//             </Button>
//           </div>
//         </div>

//         <div className="mt-3">
//         <div ref={pdfRef} className="mt-3">
//           <FirmTable firms={loans} />
        

//           </div>
//         </div>
//       </>
//     ) : (
//     <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
//     <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
//       <Typography variant="h5" gutterBottom>
//         Firm Details
//       </Typography>

    
//       <Grid container spacing={2}>
//   <Grid item xs={6}>
//     <TextField
//       label="Firm Name"
//       fullWidth
//       variant="outlined"
//       value={firmName}
//       onChange={handleFirmNameChange} 
//       error={!!firmNameError} 
//       helperText={firmNameError} 
//     />
//   </Grid>
//   <Grid item xs={6}>
//     <TextField
//       label="Firm Address"
//       fullWidth
//       variant="outlined"
//       value={firmFormData.address}
//   onChange={(e) => setFirmFormData({ ...firmFormData, address: e.target.value })}

//     />
//   </Grid>

//   <Grid item xs={6}>
//     <TextField
//       label="Firm PAN No"
//       fullWidth
//       variant="outlined"
//       value={firmPan}
//             onChange={handleFirmPanChange}
//             error={!!firmPanError}  
//             helperText={firmPanError}
//     />
//   </Grid>
//   <Grid item xs={6}>
//     <TextField
//       label="Firm GST No"
//       fullWidth
//       variant="outlined"
//        value={firmFormData.firmGstNo}
//   onChange={(e) => setFirmFormData({ ...firmFormData, firmGstNo: e.target.value })}
//     />
//   </Grid>
// </Grid>


   

// <Grid container spacing={2}>
//   {[{ label: "Firm PAN No Document", key: "firmPanNoDocument" },
//     { label: "Firm GST No Document", key: "firmGstNoDocument" },
//     { label: "Firm Light Bill for Address Proof Document", key: "firmLightBillForAddressProof" }]
//     .map((item, index) => (
//       <Grid item xs={6} key={index}>
//         <Typography variant="body2" gutterBottom style={{ paddingTop: "16px" }}>
//           {item.label}
//         </Typography>
//         <label>
//           <Input
//             type="file"
//             multiple
//             style={{ display: "none" }} 
//             id={`file-input-${index}`} 
//             onChange={(e) => handleFileChange(e, item.key)} 
//           />
//           <Button variant="contained" color="light" component="span">
//             Choose File
//           </Button>
//         </label>

        
//  {fileNames[item.key] && (
//           <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" , whiteSpace: "pre-line" }}>
            
//             {fileNames[item.key].join('\n')}
//           </Typography>
//         )} 
  
//       </Grid>
//     ))}
// </Grid>

//       <Typography variant="h5" className="mt-4" gutterBottom>
//         Partner Details
//       </Typography>





// {partners.map((partner, index) => (
//   <Paper key={index} className="p-3 mb-3" elevation={2} style={{ borderRadius: "10px" }}>
//     <Grid container spacing={2}>
//       {["Name", "Age", "Occupation", "Mobile No.", "Mail ID", "Residential Address", "PAN No.", "Aadhaar No.",
//         "Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"]
//         .map((label, i) => (
//           <Grid item xs={6} key={i}>
//             {/* Check if the label is one of the document fields to show file input */}
//             {["Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"].includes(label) ? (
//               <>
//                 <Typography variant="body2" gutterBottom>{label}</Typography>
//                 <label>
//                   <Input
//                     type="file"
//                     style={{ display: "none" }} 
//                     id={`file-input-${label}`} 
//                     onChange={(e) => handleFileChange(e, label)} 
//                   />
//                   <Button variant="contained" color="light" component="span">
//                     Choose File
//                   </Button>
//                 </label>
//                 {/* Display selected file name */}
//                 {fileNames[label] && (
//                   <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" , whiteSpace: "pre-line" }}>
//                     {fileNames[label].join('\n')}
//                   </Typography>
//                 )}
//               </>
//             ) : (
//               <TextField
//                 label={label}
//                 fullWidth
//                 variant="outlined"
//                 type={label === "Age" ? "text" : "text"} 
//                 value={partner[label.toLowerCase().replace(/ /g, "")]} 
//                 onChange={(e) => {
//                   if (label === "Age") {
//                     handleAgeChange(e, index); 
//                   } else if (label === "Occupation") {
//                     handleOccupationChange(e, index); 
//                   } else if (label === "Name") {
//                     handlePartnerNameChange(e, index); 
//                   } else if (label === "Mobile No.") {
//                     handleMobileChange(e, index); 
//                   } else if (label === "Mail ID") {
//                     handleEmailChange(e, index); 
//                   } else if (label === "PAN No.") {
//                     handlePANChange(e, index); 
//                   } else if (label === "Aadhaar No.") {
//                     const aadhaar = e.target.value;
//                     if (validateAadhaar(aadhaar)) {
//                       setAadhaarError(false); 
//                       handleAadhaarChange(e, index); 
//                     } else {
//                       setAadhaarError(true); 
//                       setAadhaarErrorMessage("Aadhaar number should be exactly 12 digits.");
//                     }
//                   }
//                 }}
//                 error={ 
//                   (label === "Name" && !!nameError) ||
//                   (label === "Mobile No." && !!mobileError) ||
//                   (label === "Mail ID" && !!emailError) ||
//                   (label === "PAN No." && !!panError) ||
//                   (label === "Age" && !!ageError) ||
//                   (label === "Occupation" && !!occupationError)  || // Check for Occupation error
//                   (label === "Aadhaar No." && aadhaarError)
//                 }
//                 helperText={ 
//                   (label === "Name" && nameError) ||
//                   (label === "Mobile No." && mobileError) ||
//                   (label === "Mail ID" && emailError) ||
//                   (label === "PAN No." && panError) ||
//                   (label === "Age" && ageError) ||
//                   (label === "Occupation" && occupationError)  || // Show Occupation error
//                   (label === "Aadhaar No." && aadhaarError && aadhaarErrorMessage)
//                 }
//               />
//             )}
//           </Grid>
//         ))}
//     </Grid>
//   </Paper>
// ))}


//       <Button className="m-3 m-2" variant="contained" color="primary" onClick={() => setPartners([...partners, {}])}>
//         <FaPlus /> Add Partner
//       </Button>

      
// <Button
//   variant="contained"
//   sx={{
//     backgroundColor: 'red', 
//     '&:hover': {
//       backgroundColor: '#d32f2f', 
//     }
//   }}
//   onClick={handleRemovePartner} 
//   className="m-2"
// >
//   Remove Partner
// </Button>

  
//       <Button
//   variant="contained"
//   className="m-3"
//   color="success"
//   onClick={handleFirmSubmit}
// >
//   Submit
// </Button>

//     </Paper>
//   </div>
    
//     )}
//   </div>
// )}



// {expandedSection === 1 && selectedTab === "display" && (
//   <div className="content-container mt-3">
   
//     {!showProjectForm ? (
//        <>
      
// <div className='button-container'>
//   <div className='d-flex gap-3'>
//   <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} className='fw-bold'
// onClick={() => {
//    console.log("Before:", showProjectForm);
//    setShowProjectForm(true);
//    console.log("After:", showProjectForm);
// }}>
// + Create Project
// </Button>
//   <Button
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
//         background:Constants.primaryColor,
//       },
//     }}
//     onClick={() => {
//       console.log("Download PDF button clicked");
//       handleDownloadPDFProject();
//     }}

//   >
//     <FaFileDownload size={18} /> 
//     Download PDF
//   </Button>
//   </div>



//  <div className="right-buttons">
//       <Button variant="contained" color="secondary" onClick={handlePrevious}>
//         Previous
//       </Button>
//       <Button variant="contained" color="secondary" onClick={handleNext}>
//         Next
//       </Button>
//     </div>
//     </div>

// <div className='mt-3' ref={displayref}>
// <DisplayTable data={projectData} />
// </div>
//    </>
//     ) : (
     


//       <div
//   className="project-form mt-4 p-3"
//   style={{
//     maxHeight: "500px", 
//     overflowY: "auto",
//     paddingRight: "10px",
//   }}
// >
//   <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
//     <Typography variant="h5" gutterBottom>
//       Project Details
//     </Typography>

   

// <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <TextField
//               label="Firm Name"
//               fullWidth
//               variant="outlined"
//               value={firmName}
//               onChange={handleFirmNameChange} 
//               error={!!firmNameError} 
//               helperText={firmNameError} 
//             />
//           </Grid>

//           {/* Other fields */}
//           {[
//             'Project Name',
//             'Project Address',
//             'Old Survey Number',
//             'New Survey Number',
//             'Village',
//             'Taluka',
//             'District',
//             'Sanction Authority',
//             'East',
//             'West',
//             'North',
//             'South',
//             'Latitude',
//             'Longitude',
//             'Landmark',
//           ].map((label, index) => (
//             <Grid item xs={6} key={index}>
//               <TextField
//                 label={label}
//                 fullWidth
//                 variant="outlined"
//                 value={formValues[label.toLowerCase().replace(/ /g, '')]} 
//                 onChange={(e) => handleChange(e, label)} 
//               />
//             </Grid>
//           ))}
//         </Grid>
    

//     <Typography variant="h5" className="mt-4" gutterBottom>
//       Phase Details
//     </Typography>

//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Phase No</TableCell>
//             <TableCell>Wing No</TableCell>
//             <TableCell>Maharera No</TableCell>
//             <TableCell>Action</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {phases.map((phase, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <TextField
//                   fullWidth
//                   value={phase.phaseNo}
//                   onChange={(e) =>
//                     setPhases(
//                       phases.map((p, i) =>
//                         i === index ? { ...p, phaseNo: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   fullWidth
//                   value={phase.wingNo}
//                   onChange={(e) =>
//                     setPhases(
//                       phases.map((p, i) =>
//                         i === index ? { ...p, wingNo: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               </TableCell>
//               <TableCell>
//                 <TextField
//                   fullWidth
//                   value={phase.mahareraNo}
//                   onChange={(e) =>
//                     setPhases(
//                       phases.map((p, i) =>
//                         i === index ? { ...p, mahareraNo: e.target.value } : p
//                       )
//                     )
//                   }
//                 />
//               </TableCell>
//               <TableCell>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => handleRemovePhase(index)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

//     <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//       <Button className="m-2" variant="contained" color="primary" onClick={handleAddPhase}>
//         <FaPlus /> Add Row
//       </Button>

   
//  <Button
//   variant="contained"
//   className="mt-3"
//   color="success"
//   onClick={() => {
//     setShowFirmForm(false);
//     toast.success("details are submitted!", { position: "top-right", autoClose: 3000 });
//   }}
// >
//   Submit
// </Button>
  
//     </div>
//   </Paper>
// </div>

//     )}
//   </div>
// )} 










// {expandedSection === 2 && selectedTab === "landowner" && (
//   <div className="content-container mt-3">
   
//     {!showLandownerForm ? (
//        <>
//        <div className='button-container'>
//         <div className='d-flex gap-3'>

//         <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} className='fw-bold'


// onClick={() => {
//   console.log("Before:", showLandownerForm);
//   setShowLandownerForm(true);
//   console.log("After:", showLandownerForm);
// }}>

// + Create Landowner Info
// </Button>

// <Button
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
//     onClick={handleDownloadPDFLandowner}
    
//   >
//     <FaFileDownload size={18} />  
//     Download PDF
//   </Button>
//         </div>
      
  
//   <div className="right-buttons">
//       <Button variant="contained" color="secondary" onClick={handlePrevious}>
//         Previous
//       </Button>
//       <Button variant="contained" color="secondary" onClick={handleNext}>
//         Next
//       </Button>
//     </div>
//     </div>
// <div className='mt-3' ref={landowner_pdf}>
// <LandownerTable data={projectData} />
// </div>
// </>

//     ) : (
//       <div
//         className="landowner-form mt-4 p-3 border rounded"
       
//         style={{
//           maxHeight: "500px",
//           overflowY: "auto",
//           backgroundColor: "#f8f9fa", 
//           border: "1px solid #ccc", 
//         }}
//       >
//         <h5>Landowner Details</h5>
//         <Grid container spacing={2}>
//           {/* <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid> */}
//           <Grid item xs={4}>
//         {/* <FormControl fullWidth variant="outlined">
//           <InputLabel id="project-name-label">Project Name</InputLabel>
//           <Select
//             labelId="project-name-label"
//             id="project-name-select"
//             value={selectedProject}
//             onChange={handleChange}
//             label="Project Name"
//           >
//             <MenuItem value="Project Name 1">Project Name 1</MenuItem>
//             <MenuItem value="Project Name 121">Project Name 121</MenuItem>
//             <MenuItem value="11">11</MenuItem>
//             <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
//             <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
//             <MenuItem value="Sohan Enterprised">Sohan Enterprised</MenuItem>
//           </Select>
//         </FormControl> */}
//          <FormControl fullWidth variant="outlined">
//           <InputLabel id="project-name-label">Project Name</InputLabel>
//           <Select
//             labelId="project-name-label"
//             id="project-name-select"
//             value={selectedProject}
//             // onChange={handleChange}
//             onChange={handleProjectChange}
//             label="Project Name"
//           >
//             <MenuItem value="Project Name 1">Project Name 1</MenuItem>
//             <MenuItem value="Project Name 121">Project Name 121</MenuItem>
//             <MenuItem value="11">11</MenuItem>
//             <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
//             <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
//             <MenuItem value="Sohan Enterprised">Sohan Enterprised</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
          
//                 <Grid item xs={4}>
//       <TextField
//         label="Mobile No."
//         fullWidth
//         value={mobileNo}
//         onChange={handleMobileNoChange}
//         error={!!mobileError} 
//         helperText={mobileError} 
//       />
//     </Grid>


//           <Grid item xs={4}><TextField label="Landowner Name" fullWidth value={name} onChange={handleNameChange}
//            error={!!error} 
//            helperText={error}
//           /></Grid>
//           <Grid item xs={4}><TextField type="number" label="Age" fullWidth /></Grid>
//           <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
         

          
// <Grid item xs={4}>
//   <TextField
//     label="Mail ID"
//     fullWidth
   
//     onChange={handleEmailChange} 
//     error={!!emailError} 
//     helperText={emailError} 
//   />
// </Grid>


//           <Grid item xs={4}><TextField label="Village" fullWidth /></Grid>
//           <Grid item xs={4}><TextField label="District" fullWidth /></Grid>
//           <Grid item xs={4}><TextField label="Taluka" fullWidth /></Grid>
        
//           <Grid item xs={4}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="bank-name-label">Name of Bank</InputLabel>
//           <Select
//             labelId="bank-name-label"
//             id="bank-name-select"
//             value={selectedBank}
//             onChange={handleBankChange}
//             label="Name of Bank"
//           >
//             <MenuItem value="SBI Bank">SBI Bank</MenuItem>
//             <MenuItem value="Bank Of Baroda">Bank Of Baroda</MenuItem>
//             <MenuItem value="Canara Bank">Canara Bank</MenuItem>
//             <MenuItem value="Axis Bank">Axis Bank</MenuItem>
//             <MenuItem value="Bank of India">Bank of India</MenuItem>
//             <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
//             <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
//             <MenuItem value="Bank of Maharashtra">Bank of Maharashtra</MenuItem>
//             <MenuItem value="Central Bank of India">Central Bank of India</MenuItem>
//             <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
//             <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
//             <MenuItem value="Indian Bank">Indian Bank</MenuItem>
//             <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//           <Grid item xs={4}><TextField label="Bank Address" fullWidth /></Grid>
          
//           {/* <Grid item xs={4}><TextField label="Account No." fullWidth /></Grid> */}
//           <Grid item xs={4}>
//   <TextField
//     label="Account No."
//     fullWidth
//     value={accountNo} // Bind the value of the account number state
//     onChange={handleAccountNoChange} // Trigger onChange handler
//     error={!!accountNoError} // Show error if there's an accountNoError
//     helperText={accountNoError} // Display error message if any
//   />
// </Grid>

   
//     <Grid item xs={4}>
//   <TextField
//     label="IFSC Code"
//     fullWidth
//     value={ifscCode} 
//     onChange={handleIfscCodeChange} 
//     error={!!ifscCodeError} 
//     helperText={ifscCodeError} 
//   />
// </Grid>

 
// <Grid item xs={4}>
//   <Typography variant="body2" gutterBottom>
//     Aadhaar No.
//   </Typography>

//   <label>
//     <Input
//       type="file"
//       style={{ display: "none" }}
//       id="file-input-aadhaar"
//       multiple  // ✅ Allow multiple file selection
//       onChange={(e) => handleFileChange(e, "aadhaarFile")} // ✅ Correct key
//     />
    
//     <Button
//       variant="contained"
//       color="light"
//       component="span"
//     >
//       Choose Files
//     </Button>
//   </label>

//   {Array.isArray(fileNames.aadhaarFile) && fileNames.aadhaarFile.length > 0 && (
//     <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//       {fileNames.aadhaarFile.map((file, index) => (
//         <div key={index}>{file}</div> // ✅ Keeps adding new files
//       ))}
//     </Typography>
//   )}
// </Grid>

//           <Grid item xs={4}>
//             <Typography variant="body2" gutterBottom>
//             Photo
//             </Typography>
//             <label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 style={{ display: "none" }} // Hide the default input
//                 id="file-input-image" // Unique ID for the file input
//                 onChange={(e) => handleFileChange(e, "imageFile")} // Handle file selection
//               />
//               <Button
//                 variant="contained"
//                 color="light"
//                 component="span"
//               >
//                 Choose File
//               </Button>
//             </label>
//             {fileNames.imageFile && (
//               <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                 {fileNames.imageFile} 
//               </Typography>
//             )}
//           </Grid>


//           <Grid item xs={4} sx={{ marginTop: "6px"}}>
//             <Typography variant="body2" gutterBottom>
//               Residential Address
//             </Typography>
//             <label>
//               <Input
//                 type="file"
//                 style={{ display: "none" }}
//                 id="file-input-address"
//                 onChange={(e) => handleFileChange(e, "addressFile")}
//               />
//               <Button
//                 variant="contained"
//                 color="light"
//                 component="span"
//                 // onClick={() => document.getElementById("file-input-address").click()}
//               >
//                 Choose File
//               </Button>
//             </label>
//             {fileNames.addressFile && (
//               <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                 {fileNames.addressFile}
//               </Typography>
//             )}
//           </Grid>

//           {/* PAN No. File Upload */}
//           <Grid item xs={4} sx={{ marginTop: "6px"}}>
//             <Typography variant="body2" gutterBottom>
//               PAN No.
//             </Typography>
//             <label>
//               <Input
//                 type="file"
//                 style={{ display: "none" }}
//                 id="file-input-pan"
//                 onChange={(e) => handleFileChange(e, "panFile")}
//               />
//               <Button
//                 variant="contained"
//                 color="light"
//                 component="span"
//                 // onClick={() => document.getElementById("file-input-pan").click()}
//               >
//                 Choose File
//               </Button>
//             </label>
//             {fileNames.panFile && (
//               <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                 {fileNames.panFile}
//               </Typography>
//             )}
//           </Grid>

          
//           <Grid item xs={4} sx={{ marginTop: "6px"}}>
//             <Typography variant="body2" gutterBottom>
//               Light Bill
//             </Typography>
//             <label>
//               <Input
//                 type="file"
//                 multiple
//                 style={{ display: "none" }}
//                 id="file-input-lightbill"
//                 onChange={(e) => handleFileChange(e, "lightBillFile")}
//               />
//               <Button
//                 variant="contained"
//                 color="light"
//                 component="span"
                
//               >
//                 Choose File
//               </Button>
//             </label>
//             {fileNames.lightBillFile && (
//               <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                 {fileNames.lightBillFile}
//               </Typography>
//             )}
//           </Grid>

        
//         </Grid>

        

       
        
// <Button
//   variant="contained"
//   className="mt-3"
//   color="success"
//   onClick={() => {
//     setShowFirmForm(false);
//     toast.success("details are submitted!", { position: "top-right", autoClose: 3000 });
//   }}
// >
// Submit Landowner Info
// </Button>
//       </div>
//     )}
//   </div>
// )}


// {expandedSection === 3 && selectedTab === "allotement" && (
//   <div className="content-container mt-3">
//     {!showFlatForm ? (
//       <>
        
//         <div className="button-container">
 
//         <div className='d-flex gap-3'>
//     <Button variant="contained" color="primary" style={{ background: Constants.primaryColor}} className='fw-bold'
//     onClick={() => setShowFlatForm(true)}>
//       + Flat Allotment Info
//     </Button>
//     <Button
//     variant="contained"
//     sx={{
//       background: Constants.primaryColor,
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
//     onClick={handleDownloadPDFAllotement}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//   </div>

//     <div className="right-buttons">
//       <Button variant="contained" color="secondary" onClick={handlePrevious}>
//         Previous
//       </Button>
//       <Button variant="contained" color="secondary" onClick={handleNext}>
//         Next
//       </Button>
//     </div>
//   </div>


//         <div className="mt-3" ref={allotement_pdf}>
//           <FlatAllotment data={Flatdata} />
//         </div>
//       </>
//     ) : (

   


// <div className="landowner-form mt-4 p-3 border rounded" style={{ backgroundColor: "#f8f9fa", border: "1px solid #ccc"  }}>
//       <h5>Flat Allotment Display</h5>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <FormControl fullWidth>
//             <InputLabel>Project Name</InputLabel>
//             <Select value={selectedProject} onChange={handleProjectChange}>
//               {projects.map((proj) => <MenuItem key={proj} value={proj}>{proj}</MenuItem>)}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={4}>
//           <FormControl fullWidth disabled={!selectedProject}>
//             <InputLabel> Landowner Name</InputLabel>
//             <Select value={selectedLandowner} onChange={handleLandownerChange}>
//               {selectedProject && landowners[selectedProject]?.map((owner) => (
//                 <MenuItem key={owner.name} value={owner.name}>{owner.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={4}>
//           <TextField label="Mobile No." fullWidth value={mobileNo} disabled />
//         </Grid>

//         <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="No. of Flats Allotted"
//     fullWidth
//     value={noOfFlats}
//     onChange={(e) => {
//       const value = Math.max(1, parseInt(e.target.value, 10) || 0); // Ensure at least 1
//       setNoOfFlats(value);
//       generateTableRows(value); // Update table rows dynamically
//     }}
//   />
// </Grid>

//       </Grid>

//       <h4 className="pt-3">Flat Details</h4>
//       {/* <TableContainer component={Paper}> */}
//       <TableContainer component={Paper} style={{   maxHeight: '400px',overflowY: 'auto' }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ bgcolor: "primary.main" }}>
//               {["RERA CARPET AREA (SQ FT)", "WING", "FLAT NO.", "TYPE OF FLAT"].map((col) => (
//                 <TableCell key={col} sx={{ color: "white", fontWeight: "bold" }}>{col}</TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableRows.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>RERA CARPET AREA (SQ FT)</InputLabel>
//                     <Select value={row.area} onChange={(e) => handleRowChange(index, "area", e.target.value)}>
                      
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>WING</InputLabel>
//                     <Select value={row.wing} onChange={(e) => handleRowChange(index, "wing", e.target.value)}>
                    
                     
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>FLAT NO.</InputLabel>
//                     <Select value={row.flatNo} onChange={(e) => handleRowChange(index, "flatNo", e.target.value)}>
                     
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//                 <TableCell>
//                   <FormControl fullWidth>
//                     <InputLabel>TYPE OF FLAT</InputLabel>
//                     <Select value={row.flatType} onChange={(e) => handleRowChange(index, "flatType", e.target.value)}>
                     
//                     </Select>
//                   </FormControl>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Button
//         variant="contained"
//         className="mt-3"
//         color="success"
//         onClick={() => {
//           toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//         }}
//       >
//         Submit Flat Allotment Info
//       </Button>
//     </div>
//     )}
//   </div>
// )}



//   </div>
//   )
// }
   
 


// export default BasicInfo;




// ----------------------

import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
  TableHead,
  TableRow,
  Paper,
  Box,
  Tabs,
  Tab,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FaEye,
  FaBuilding,
  FaFileDownload,
  FaPlus,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import FirmTable from "./FirmTable";
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from "./FlatAllotement";
import { ToastContainer, toast } from "react-toastify";
import { useRef } from "react";
import { FaProjectDiagram, FaUserTie, FaHome } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { GetApp as GetAppIcon } from "@mui/icons-material";
import { PictureAsPdf as PictureAsPdfIcon } from "@mui/icons-material";
import html2canvas from "html2canvas";
import Constants from "../Constants";
import { Close as CloseIcon } from "@mui/icons-material";

const fetchLoansData = async () => {
  const response = await fetch("/api/getOCRCollection");
  return response.json();
};

const sections = [
  {
    label: "Firm Display",
    icon: <FaProjectDiagram size={20} />,
    createLabel: "Create Firm",
  },
  {
    label: "Project Display",
    icon: <FaHome size={20} />,
    createLabel: "Create Project",
  },
  {
    label: "Landowner Display",
    icon: <FaUserTie size={20} />,
    createLabel: "Create Landowner Info",
  },
  {
    label: "Landowner Flat Allotement Display",
    icon: <FaBuilding size={20} />,
    createLabel: "Create Flat Allotment Info",
  },
];
const tabNames = ["firm", "display", "landowner", "allotement"];
const BasicInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
  const [selectedProject, setSelectedProject] = useState("");
  const [Flatdata, setFlatdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [panError, setPanError] = useState("");
  const [firmgstno, setFirmGstNo] = useState("");
  const [firmName, setFirmName] = useState("");
  const [firmNameError, setFirmNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firmPan, setFirmPan] = useState("");
  const [firmPanError, setFirmPanError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [occupationError, setOccupationError] = useState("");
  const [aadhaarError, setAadhaarError] = useState(false);
  const [aadhaarErrorMessage, setAadhaarErrorMessage] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [selectedLandowner, setSelectedLandowner] = useState("");
  const [noOfFlats, setNoOfFlats] = useState(0);
  const [tableRows, setTableRows] = useState([]);
  const [firms, setFirms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewDocument, setViewDocument] = useState(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);

  const [uploadedFiles, setUploadedFiles] = useState({});
  const [flatDialogOpen, setFlatDialogOpen] = useState(false);
  const [landownerDialogOpen, setLandownerDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [firmDialogOpen, setFirmDialogOpen] = useState(false);

  // editing and deleting states for flat allotment section
  const [editingFlatAllotment, setEditingFlatAllotment] = useState(null);
  const [isEditingFlat, setIsEditingFlat] = useState(false);
  const [deleteConfirmOpenAllotment, setDeleteConfirmOpenAllotment] =
    useState(false);
  const [itemToDeleteAllotment, setItemToDeleteAllotment] = useState(null);

  // editing and deleting states for landowner section
  const [editingLandowner, setEditingLandowner] = useState(null);
  const [isEditingLandowner, setIsEditingLandowner] = useState(false);
  const [deleteConfirmOpenLandowner, setDeleteConfirmOpenLandowner] =
    useState(false);
  const [itemToDeleteLandowner, setItemToDeleteLandowner] = useState(null);

  // editing and deleting states for project section
  const [editingProject, setEditingProject] = useState(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [deleteConfirmOpenProject, setDeleteConfirmOpenProject] =
    useState(false);
  const [itemToDeleteProject, setItemToDeleteProject] = useState(null);

  // editing and deleting states for firm section
  const [editingFirm, setEditingFirm] = useState(null);
  const [isEditingFirm, setIsEditingFirm] = useState(false);
  const [deleteConfirmOpenFirm, setDeleteConfirmOpenFirm] = useState(false);
  const [itemToDeleteFirm, setItemToDeleteFirm] = useState(null);

  // states for landowner section
  const [landownerData, setLandownerData] = useState([]);
  const [landownerForm, setLandownerForm] = useState({
    projectName: "",
    landownerName: "",
    age: "",
    occupation: "",
    mobileNo: "",
    mailId: "",
    village: "",
    taluka: "",
    district: "",
    bankName: "",
    bankAddress: "",
    accountNo: "",
    ifscCode: "",
    residentialAddressDoc: null,
    panDoc: null,
    aadhaarDoc: null,
    photoDoc: null,
    lightBillDoc: null,
  });

  // Initialize as an empty array
  const projects = ["Project A", "Project B", "Project C"];
  const landowners = {
    "Project A": [{ name: "John Doe", mobile: "9876543210" }],
    "Project B": [{ name: "Jane Smith", mobile: "8765432109" }],
    "Project C": [{ name: "Mike Johnson", mobile: "7654321098" }],
  };

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
    setSelectedLandowner("");
    setMobileNo("");
    setNoOfFlats(0);
    setTableRows([]);
  };

  const handleLandownerChange = (event) => {
    setSelectedLandowner(event.target.value);
  };

  // Generates rows dynamically based on No. of Flats Allotted
  const generateTableRows = (num) => {
    setTableRows(
      [...Array(num)].map(() => ({
        area: "",
        wing: "",
        flatNo: "",
        flatType: "",
      }))
    );
  };

  // Handles changes in the dropdown fields inside the table
  const handleRowChange = (index, field, value) => {
    const updatedRows = tableRows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setTableRows(updatedRows);
  };

  useEffect(() => {
    console.log("Loans updated:", loans);
  }, [loans]);

  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: [],
    firmGstNoDocument: [],
    firmLightBillForAddressProof: [],
  });

  const [formData, setFormData] = useState({
    area: "",
    wing: "",
    flatNumber: "",
    flatType: "",
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

  const validateAadhaar = (aadhaar) => {
    const aadhaarRegex = /^[0-9]{12}$/;
    return aadhaarRegex.test(aadhaar);
  };

  const handleFileChange = (event, key) => {
    const files = Array.from(event.target.files);

    // Store the actual files for submission
    setUploadedFiles((prev) => ({
      ...prev,
      [key]: files,
    }));

    // Update file names for display
    const newFiles = files.map((file) => file.name);
    setFileNames((prev) => ({
      ...prev,
      [key]: prev[key] ? [...prev[key], ...newFiles] : newFiles,
    }));
  };

  const handleAgeChange = (e, index) => {
    const value = e.target.value;
    const updatedPartners = [...partners];
    updatedPartners[index].age = value;
    setPartners(updatedPartners);
    // Validate the age value
    validateAge(value);
  };

  const handleOccupationChange = (e, index) => {
    const value = e.target.value;
    const updatedPartners = [...partners];
    updatedPartners[index].occupation = value;
    setPartners(updatedPartners);
  };

  const [partners, setPartners] = useState([
    {
      name: "",
      age: "",
      occupation: "",
      mobile: "",
      email: "",
      residentialAddress: "",
      pan: "",
      aadhaarNo: "",
    },
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

    // Set selected tab dynamically based on the section clicked
    if (sections[index].label === "Project Display") {
      setSelectedTab("display");
    } else if (sections[index].label === "Firm Display") {
      setSelectedTab("firm");
    } else if (sections[index].label === "Landowner Display") {
      setSelectedTab("landowner");
    } else if (sections[index].label === "Landowner Flat Allotement Display") {
      setSelectedTab("allotement");
      setSelectedTab("allotement");
    }
    setShowFirmForm(false);
    setShowProjectForm(false);
    setShowLandownerForm(false);
    setShowFlatForm(false);
  };

  const [newPhase, setNewPhase] = useState({
    phaseNo: "",
    wingNo: "",
    mahareraNo: "",
  });

  const pdfRef = useRef();

  {selectedTab === "firm" && <FirmTable />; }
  {selectedTab === "display" && <DisplayTable />;}
  {selectedTab === "landowner" && <LandownerTable />;}
  {selectedTab === "allotement" && <FlatAllotement />;}

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleDateString();
    const projectName = "";
    const name = "";
    const mobileNo = "";
    const flatsAlloted = "";
    const reraCarpetArea = "";
    const wing = "";
    const flatNo = "";
    const typeOfFlat = "";
    const columns = [
      "Timestamp",
      "Project Name",
      "Name",
      "Mobile No",
      "No of Flats Allotted",
      "RERA Carpet Area",
      "Wing",
      "Flat No",
      "Type of Flat",
    ];
    const data = [
      timestamp,
      projectName,
      name,
      mobileNo,
      flatsAlloted,
      reraCarpetArea,
      wing,
      flatNo,
      typeOfFlat,
    ];
    doc.setFontSize(18);
    doc.text("Flat Allotment Information", 10, 10);
    doc.setFontSize(12);
    const columnWidths = [25, 30, 20, 20, 20, 20, 20, 20, 20];
    const splitTextToFit = (text, maxWidth) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      return lines;
    };
    const rowHeight = 15;
    const extraRowSpacing = 5;
    let xPos = 10;
    let yPos = 40;
    columns.forEach((col, index) => {
      doc.rect(xPos, yPos, columnWidths[index], 20);
      let headerLines = splitTextToFit(col, columnWidths[index] - 4);
      doc.text(headerLines, xPos + 2, yPos + 7);
      xPos += columnWidths[index];
    });

    xPos = 10;
    yPos += 20;

    data.forEach((value, index) => {
      doc.rect(xPos, yPos, columnWidths[index], 10);
      let dataLines = splitTextToFit(value, columnWidths[index] - 4);
      doc.text(dataLines, xPos + 2, yPos + 7);
      xPos += columnWidths[index];
    });

    yPos += rowHeight + extraRowSpacing;

    doc.save("Flat_Allotment_Info.pdf");
  };

  const handleDownloadPDFFirm = () => {
    console.log("Loans data before mapping:", loans); // Use loans instead of firms

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);

    const tableColumn = [
      "Timestamp",
      "Firm Name",
      "Firm Address",
      "Firm PAN No",
      "Firm GST No",
      "Residential Address",
      "PAN No",
      "Aadhaar No",
      "Photo",
      "Light Bill",
    ];

    const tableRows = loans.map((row) => [
      row.timestamp || "-",
      row.name || "-",
      row.address || "-",
      row.firmPanNo || "-",
      row.firmGstNo || "-",
      row.residentialAddress || "-",
      row.panNo || "-",
      row.aadhaarNo || "-",
      row.photo || "-",
      row.lightBill || "-",
    ]);

    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Firm_Details_Report.pdf");
  };

  const displayref = useRef();

  // const handleDownloadPDFProject = () => {
  //   if (!displayref.current) {
  //     console.error("DisplayTable ref is not available.");
  //     return;
  //   }
  //   console.log("Loans data before mapping:", loans);

  //   const doc = new jsPDF("landscape");
  //   doc.setFontSize(14);
  //   doc.text("Project Display Report", 14, 15);

  //   const tableColumn = [
  //     "Timestamp",
  //     "Firm Name",
  //     "Project Name",
  //     "Project Address",
  //     "Old Survey No",
  //     "New Survey No",
  //     "Village",
  //     "Taluka",
  //     "District",
  //     "Sanction Authority",
  //     "East",
  //     "West",
  //     "North",
  //     "South",
  //     "Latitude",
  //     "Longitude",
  //     "Landmark",
  //     "Phase No",
  //     "Wing No",
  //     "MahaRERA No",
  //   ];

  //   const tableRows = loans.map((row) => [
  //     row.timestamp || "-",
  //     row.firmName || "-",
  //     row.projectName || "-",
  //     row.projectAddress || "-",
  //     row.oldSurveyNo || "-",
  //     row.newSurveyNo || "-",
  //     row.village || "-",
  //     row.taluka || "-",
  //     row.district || "-",
  //     row.sanctionAuthority || "-",
  //     row.east || "-",
  //     row.west || "-",
  //     row.north || "-",
  //     row.south || "-",
  //     row.latitude || "-",
  //     row.longitude || "-",
  //     row.landmark || "-",
  //     row.phaseNo || "-",
  //     row.wingNo || "-",
  //     row.mahareraNo || "-",
  //   ]);

  //   console.log("Formatted Table Rows:", tableRows);

  //   autoTable(doc, {
  //     startY: 25,
  //     head: [tableColumn],
  //     body: tableRows,
  //     margin: { top: 20 },
  //     styles: { overflow: "linebreak" },
  //     didDrawPage: (data) => {
  //       doc.text("Project Display Report", 14, 10);
  //     },
  //   });
  //   doc.save("Project_Display_Report.pdf");
  // };
  const handleDownloadPDFProject = () => {
    // Use projectsData instead of loans since that's what's displayed in the table
    const dataToExport = projectsData.length > 0 ? projectsData : [];

    if (dataToExport.length === 0) {
      toast.error("No project data available to download");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Project Display Report", 14, 15);

    const tableColumn = [
      "Timestamp",
      "Firm Name",
      "Project Name",
      "Project Address",
      "Old Survey No",
      "New Survey No",
      "Village",
      "Taluka",
      "District",
      "Sanction Authority",
      "East",
      "West",
      "North",
      "South",
      "Latitude",
      "Longitude",
      "Landmark",
      "Phase No",
      "Wing No",
      "MahaRERA No",
    ];

    const tableRows = dataToExport.map((row) => [
      row.timestamp || "-",
      row.firmName || "-",
      row.projectName || "-",
      row.projectAddress || "-",
      row.oldSurveyNumber || "-",
      row.newSurveyNumber || "-",
      row.village || "-",
      row.taluka || "-",
      row.district || "-",
      row.sanctionAuthority || "-",
      row.east || "-",
      row.west || "-",
      row.north || "-",
      row.south || "-",
      row.latitude || "-",
      row.longitude || "-",
      row.landmark || "-",
      row.phaseNo || "-",
      row.wingNo || "-",
      row.mahareraNo || "-",
    ]);

    console.log("Exporting Project Data:", dataToExport);
    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      margin: { top: 20 },
      styles: {
        fontSize: 8, // Smaller font to fit all columns
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [139, 107, 255],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      didDrawPage: (data) => {
        doc.text("Project Display Report", 14, 10);
      },
    });

    doc.save("Project_Display_Report.pdf");
  };

  const landowner_pdf = useRef();

  const handleDownloadPDFLandowner = () => {
    if (!landowner_pdf.current) {
      console.error("LandownerTable ref is not available.");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Landowner Display Report", 14, 15);

    const tableColumn = [
      "Timestamp",
      "Project Name",
      "Landowner Name",
      "Age",
      "Occupation",
      "Mobile No",
      "Mail ID",
      "Village",
      "Taluka",
      "District",
      "Bank Name",
      "Bank Address",
      "Account No.",
      "IFSC Code",
    ];

    const tableRows = landownerData.map((row) => [
      row.timestamp || "-",
      row.projectName || "-",
      row.landownerName || "-",
      row.age || "-",
      row.occupation || "-",
      row.mobileNo || "-",
      row.mailId || "-",
      row.village || "-",
      row.taluka || "-",
      row.district || "-",
      row.bankName || "-",
      row.bankAddress || "-",
      row.accountNo || "-",
      row.ifscCode || "-",
    ]);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      margin: { top: 20 },
      styles: { overflow: "linebreak" },
      didDrawPage: (data) => {
        doc.text("Landowner Display Report", 14, 10);
      },
    });

    doc.save("Landowner_Display_Report.pdf");
  };

  const allotement_pdf = useRef();

  const handleDownloadPDFAllotement = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);

    const tableColumn = [
      "Timestamp",
      "Project Name",
      "Landowner Name",
      "Mobile No.",
      "No. of Flats",
      "RERA Carpet Area",
      "Wing",
      "Flat No.",
      "Type of Flat",
    ];

    // Group the data for PDF (similar to table grouping)
    const groupedData = groupFlatAllotments(projectData);

    // Flatten for PDF table
    const tableRows = groupedData.flatMap((group) =>
      group.flatDetails.map((flat) => [
        group.timestamp || "-",
        group.projectName || "-",
        group.landownerName || "-",
        group.mobileNo || "-",
        group.noOfFlatsAlloted || "-",
        flat.reraCarpetArea || "-",
        flat.wing || "-",
        flat.flatNo || "-",
        flat.typeOfFlat || "-",
      ])
    );

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      margin: { top: 20 },
      styles: { overflow: "linebreak" },
      didDrawPage: (data) => {
        doc.text("Flat Allotment Display Report", 14, 10);
      },
    });

    doc.save("flat_allotment_display.pdf");
  };

  const handleAddPartner = () => {
    setPartners([
      ...partners,
      {
        name: "",
        age: "",
        occupation: "",
        mobile: "",
        email: "",
        address: "",
        pan: "",
        aadhaar: "",
      },
    ]);
  };

  const handleRemovePartner = () => {
    setPartners(partners.slice(0, partners.length - 1));
  };

  const handleAddPhase = () => {
    setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]);
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
      setError("Name should only contain letters and spaces.");
    } else {
      setError("");
    }

    setName(value);
  };

  const handleMobileNoChange = (event) => {
    const value = event.target.value;

    if (/[^0-9]/.test(value)) {
      setMobileError("Mobile number should only contain digits.");
    } else if (value.length > 10) {
      setMobileError("Mobile number cannot exceed 10 digits.");
    } else {
      setMobileError("");
    }

    setMobileNo(value);
  };

  const handleAccountNoChange = (e) => {
    const value = e.target.value;
    // Regular expression to check if the value is numeric and has a (e.g., 10-16 digits)
    const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
    if (value && !accountNoRegex.test(value)) {
      setAccountNoError("Account number must be between 10 to 16 digits.");
    } else {
      setAccountNoError("");
    }
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
      setNameError("Name should only contain letters");
    } else {
      setNameError(""); // Clear error message if the value is valid
    }
    // Update the partner's name in the state
    partnerCopy[index] = { ...partnerCopy[index], name: value };
    setPartners(partnerCopy);
  };

  const handleFirmNameChange = (e) => {
    const value = e.target.value;

    if (/\d/.test(value)) {
      setFirmNameError("Firm Name should only contain letters");
    } else {
      setFirmNameError("");
    }

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

  const [projectsData, setProjectsData] = useState([]);
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
    phases: [],
  });

  // State to store validation errors
  const [errors, setErrors] = useState({
    firmName: "",
  });

  const handleChange = (e, fieldName) => {
    const { value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldName.toLowerCase().replace(/ /g, "")]: value,
    }));
  };

  const validateAge = (age) => {
    if (!age || age < 0 || age > 120) {
      setAgeError("Please enter a valid age between 0 and 120");
    } else {
      setAgeError("");
    }
  };

  // const [firmFormData, setFirmFormData] = useState({
  //   name: "",
  //   address: "",
  //   firmPanNo: "",
  //   firmGstNo: "",
  //   firmPan: null,
  //   firmGst: null,
  //   firmLightBill: null,
  // });

  const [firmFormData, setFirmFormData] = useState({
  name: "",
  address: "",
  firmPanNo: "",
  firmGstNo: "",
  firmPan: null,
  firmGst: null,
  firmLightBill: null,
  partners: [
    {
      name: "",
      age: "",
      occupation: "",
      mobile: "",
      email: "",
      residentialAddress: "", 
      pan: "",
      aadhaarNo: "",
    },
  ],
});

  // const handleFirmSubmit = () => {
  //   const timestamp = new Date().toLocaleString();

  //   // Create the main firm object with proper partner data mapping
  //   const newFirm = {
  //     timestamp: timestamp,
  //     name: firmName,
  //     address: firmFormData.address,
  //     firmPanNo: firmPan,
  //     firmGstNo: firmFormData.firmGstNo,
  //     firmPan: firmFormData.firmPan,
  //     firmGst: firmFormData.firmGst,
  //     firmLightBill: firmFormData.firmLightBill,

  //     // Partner details - taking first partner for display
  //     partner: partners[0]?.name || "",
  //     age: partners[0]?.age || "",
  //     occupation: partners[0]?.occupation || "",
  //     mobileNo: partners[0]?.mobile || "",
  //     mailId: partners[0]?.email || "",
  //     residentialAddress: partners[0]?.residentialAddress || "",
  //     panNo: partners[0]?.pan || "",
  //     aadhaarNo: partners[0]?.aadhaarNo || "",

  //     // Document URLs for partner
  //     residentialAddressDoc: uploadedFiles.addressFile
  //       ? URL.createObjectURL(uploadedFiles.addressFile[0])
  //       : "",
  //     panDoc: uploadedFiles.panFile
  //       ? URL.createObjectURL(uploadedFiles.panFile[0])
  //       : "",
  //     aadhaarDoc: uploadedFiles.aadhaarFile
  //       ? URL.createObjectURL(uploadedFiles.aadhaarFile[0])
  //       : "",
  //     photo: uploadedFiles.imageFile
  //       ? URL.createObjectURL(uploadedFiles.imageFile[0])
  //       : "",
  //     lightBill: uploadedFiles.lightBillFile
  //       ? URL.createObjectURL(uploadedFiles.lightBillFile[0])
  //       : "",

  //     // Store the complete partners array for reference
  //     partners: partners,
  //     uploadedFiles: uploadedFiles,
  //   };

  //   setFirms((prevFirms) => [...prevFirms, newFirm]);

  //   toast.success("Firm details submitted successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   // Reset form
  //   resetFirmForm();
  //   setFirmDialogOpen(false);
  // };

  



  const handleFirmSubmit = () => {
  const timestamp = new Date().toLocaleString();

  const newFirm = {
    timestamp,
    name: firmName,
    address: firmFormData.address,
    firmPanNo: firmPan,
    firmGstNo: firmFormData.firmGstNo,
    firmPan: firmFormData.firmPan,
    firmGst: firmFormData.firmGst,
    firmLightBill: firmFormData.firmLightBill,

    // ✅ Partner details (use first partner for table display)
    name: partners[0]?.name || "",
    age: partners[0]?.age || "",
    occupation: partners[0]?.occupation || "",
    mobile: partners[0]?.mobile || "",
    email: partners[0]?.email || "",
    residentialAddress: partners[0]?.residentialAddress || "",
    pan: partners[0]?.pan || "",
    aadhaarNo: partners[0]?.aadhaarNo || "",

    // ✅ Partner Documents
    residentialAddressDoc: uploadedFiles.addressFile
      ? URL.createObjectURL(uploadedFiles.addressFile[0])
      : "",
    panDoc: uploadedFiles.panFile
      ? URL.createObjectURL(uploadedFiles.panFile[0])
      : "",
    aadhaarDoc: uploadedFiles.aadhaarFile
      ? URL.createObjectURL(uploadedFiles.aadhaarFile[0])
      : "",
    photo: uploadedFiles.imageFile
      ? URL.createObjectURL(uploadedFiles.imageFile[0])
      : "",
    lightBill: uploadedFiles.lightBillFile
      ? URL.createObjectURL(uploadedFiles.lightBillFile[0])
      : "",

    // ✅ Keep all partners for future reference
    partners,
    uploadedFiles,
  };

  setFirms((prev) => [...prev, newFirm]);
  console.log("submited Firm Data",newFirm);
  toast.success("Firm details submitted successfully!", {
    position: "top-right",
    autoClose: 3000,
  });

  resetFirmForm();
  setFirmDialogOpen(false);
};

  const handleEditFirm = (firm) => {
    console.log("Editing firm:", firm); // Debug log

    setEditingFirm(firm);
    setIsEditingFirm(true);

    // Pre-fill the form with existing firm data
    setFirmName(firm.name || "");

    setFirmFormData({
      address: firm.address || "",
      firmGstNo: firm.firmGstNo || "",
      firmPan: firm.firmPan || null,
      firmGst: firm.firmGst || null,
      firmLightBill: firm.firmLightBill || null,
    });

    setFirmPan(firm.firmPanNo || "");

    // Handle partners data - FIXED VERSION
    if (firm.partners && firm.partners.length > 0) {
      // Use the actual partners array from the firm data
      setPartners(
        firm.partners.map((partner) => ({
          name: partner.name || "",
          age: partner.age || "",
          occupation: partner.occupation || "",
          mobile: partner.mobile || partner.mobileNo || "",
          email: partner.email || partner.mailId || "",
          address: partner.address || partner.residentialAddress || "",
          pan: partner.pan || partner.panNo || "",
          aadhaarNo: partner.aadhaarNo || partner.aadhaar || "",
        }))
      );
    } else {
      // Fallback to individual fields from flat structure
      setPartners([
        {
          name: firm.partner || "",
          age: firm.age || "",
          occupation: firm.occupation || "",
          mobile: firm.mobileNo || "",
          email: firm.mailId || "",
          address: firm.residentialAddress || "",
          pan: firm.panNo || "",
          aadhaarNo: firm.aadhaarNo || "",
        },
      ]);
    }

    // Set file names if available
    if (firm.uploadedFiles) {
      setUploadedFiles(firm.uploadedFiles);

      const newFileNames = {};
      Object.keys(firm.uploadedFiles).forEach((key) => {
        if (firm.uploadedFiles[key] && firm.uploadedFiles[key].length > 0) {
          newFileNames[key] = firm.uploadedFiles[key].map(
            (file) =>
              file.name || (file instanceof File ? file.name : "Uploaded File")
          );
        }
      });
      setFileNames(newFileNames);
    } else {
      // Reset file names if no files exist
      setFileNames({});
      setUploadedFiles({});
    }

    setFirmDialogOpen(true);
  };

  const handleDeleteFirm = (firm) => {
    const updatedFirms = firms.filter(
      (item) => !(item.name === firm.name && item.firmPanNo === firm.firmPanNo)
    );
    setFirms(updatedFirms);

    toast.success("Firm deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleUpdateFirm = () => {
    const timestamp = new Date().toLocaleString();

    // Create the updated firm object
    const updatedFirm = {
      timestamp: timestamp,
      name: firmName,
      address: firmFormData.address,
      firmPanNo: firmPan,
      firmGstNo: firmFormData.firmGstNo,
      firmPan: firmFormData.firmPan,
      firmGst: firmFormData.firmGst,
      firmLightBill: firmFormData.firmLightBill,

      // Partner details - fixed mapping
      partner: partners[0]?.name || "",
      age: partners[0]?.age || "",
      occupation: partners[0]?.occupation || "",
      mobileNo: partners[0]?.mobile || "",
      mailId: partners[0]?.email || "",
      // residentialAddress: partners[0]?.address || "",
      residentialAddress: partners[0]?.residentialAddress || "",

      panNo: partners[0]?.pan || "",
      aadhaarNo: partners[0]?.aadhaarNo,

      residentialAddressDoc: "",
      panDoc: "",
      aadhaarDoc: "",
      photo: "",
      lightBill: "",
      partners: partners,
      uploadedFiles: uploadedFiles,
    };

    // Remove the old firm and add the updated one
    const updatedData = firms.filter(
      (item) =>
        !(
          item.name === editingFirm.name &&
          item.firmPanNo === editingFirm.firmPanNo
        )
    );

    setFirms([...updatedData, updatedFirm]);

    toast.success("Firm updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form and close dialog
    resetFirmForm();
    setFirmDialogOpen(false);
    setIsEditingFirm(false);
    setEditingFirm(null);
  };

  
  const resetFirmForm = () => {
    setFirmFormData({
      name: "",
      address: "",
      firmPanNo: "",
      firmGstNo: "",
      firmPan: null,
      firmGst: null,
      firmLightBill: null,
    });
    setFirmName("");
    setFirmPan("");
    setFirmPanError("");
    setFirmGstNo("");
    setPartners([
      {
        name: "",
        age: "",
        occupation: "",
        mobile: "",
        email: "",
        residentialAddress: "",
        pan: "",
        aadhaarNo: "",
      },
    ]);
    setFileNames({
      firmPanNoDocument: [],
      firmGstNoDocument: [],
      firmLightBillForAddressProof: [],
      // Add other file name keys as needed
    });
    setUploadedFiles({});
    setIsEditingFirm(false);
    setEditingFirm(null);

    // Reset error states
    setNameError("");
    setMobileError("");
    setEmailError("");
    setPanError("");
    setAgeError("");
    setOccupationError("");
    setAadhaarError(false);
    setAadhaarErrorMessage("");
  };

  const handleDeleteClickFirm = (firm) => {
    setItemToDeleteFirm(firm);
    setDeleteConfirmOpenFirm(true);
  };

  const handleDeleteCancelFirm = () => {
    setDeleteConfirmOpenFirm(false);
    setItemToDeleteFirm(null);
  };

  const handleDeleteConfirmFirm = () => {
    if (itemToDeleteFirm) {
      handleDeleteFirm(itemToDeleteFirm);
      setDeleteConfirmOpenFirm(false);
      setItemToDeleteFirm(null);
    }
  };

  const handleIfscCodeChange = (e) => {
    const value = e.target.value;

    // Regular expression to validate IFSC code format
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (value && !ifscRegex.test(value)) {
      setIfscCodeError(
        "Invalid IFSC code. It should be in the format: XXXX0XXXXX."
      );
    } else {
      setIfscCodeError("");
    }

    setIfscCode(value);
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
      setMobileError("");
    }

    // Update the partner's mobile number in the state - fix the field name
    partnerCopy[index] = { ...partnerCopy[index], mobile: value }; // Changed from mobileNo to mobile
    setPartners(partnerCopy);
  };

  const handleEmailChange = (e, index) => {
    const value = e.target.value;
    const partnerCopy = [...partners];

    // Regular expression to validate Gmail email format
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (value && !emailRegex.test(value)) {
      setEmailError("Invalid Gmail address");
      console.log("invalid email");
    } else {
      setEmailError("");
    }

    partnerCopy[index] = { ...partnerCopy[index], email: value };
    setPartners(partnerCopy);
  };

  const validateForm = () => {};

  const handleViewDocument = (file) => {
    if (file && file.url) {
      setViewDocument(file);
      setDocumentDialogOpen(true);
    } else {
      toast.error("No document available to view");
    }
  };
  const handleProjectSubmit = () => {
    // Validate required fields
    if (!formValues.firmName || !formValues.projectName) {
      toast.error("Firm Name and Project Name are required");
      return;
    }

    const timestamp = new Date().toLocaleString();

    // Create the project object with all form data
    const newProject = {
      timestamp: timestamp,
      firmName: formValues.firmName,
      projectName: formValues.projectName,
      projectAddress: formValues.projectAddress,
      oldSurveyNumber: formValues.oldSurveyNumber,
      newSurveyNumber: formValues.newSurveyNumber,
      village: formValues.village,
      taluka: formValues.taluka,
      district: formValues.district,
      sanctionAuthority: formValues.sanctionAuthority,
      east: formValues.east,
      west: formValues.west,
      north: formValues.north,
      south: formValues.south,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
      landmark: formValues.landmark,
      // Better phase data formatting
      phaseNo:
        phases.length > 0
          ? phases.map((phase) => phase.phaseNo || "-").join(", ")
          : "-",
      wingNo:
        phases.length > 0
          ? phases.map((phase) => phase.wingNo || "-").join(", ")
          : "-",
      mahareraNo:
        phases.length > 0
          ? phases.map((phase) => phase.mahareraNo || "-").join(", ")
          : "-",
      // Store the raw phases array for potential future use
      phases: [...phases],
    };

    // Add to projects data
    setProjectsData((prev) => [...prev, newProject]);

    // Show success message
    toast.success("Project details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form
    setFormValues({
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
    setPhases([]);
    setShowProjectForm(false);
    setProjectDialogOpen(false);
  };
  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsEditingProject(true);

    // Pre-fill the form with existing data
    setFormValues({
      firmName: project.firmName || "",
      projectName: project.projectName || "",
      projectAddress: project.projectAddress || "",
      oldSurveyNumber: project.oldSurveyNumber || "",
      newSurveyNumber: project.newSurveyNumber || "",
      village: project.village || "",
      taluka: project.taluka || "",
      district: project.district || "",
      sanctionAuthority: project.sanctionAuthority || "",
      east: project.east || "",
      west: project.west || "",
      north: project.north || "",
      south: project.south || "",
      latitude: project.latitude || "",
      longitude: project.longitude || "",
      landmark: project.landmark || "",
    });

    // Set phases if available
    if (project.phases && project.phases.length > 0) {
      setPhases(project.phases);
    } else {
      // Fallback to parsing phase data from strings
      const phasesData = [];
      if (project.phaseNo && project.phaseNo !== "-") {
        const phaseNos = project.phaseNo.split(",").map((p) => p.trim());
        const wingNos = project.wingNo?.split(",").map((w) => w.trim()) || [];
        const mahareraNos =
          project.mahareraNo?.split(",").map((m) => m.trim()) || [];

        phaseNos.forEach((phaseNo, index) => {
          phasesData.push({
            phaseNo: phaseNo,
            wingNo: wingNos[index] || "",
            mahareraNo: mahareraNos[index] || "",
          });
        });
      }
      setPhases(phasesData);
    }

    setProjectDialogOpen(true);
  };

  const handleDeleteProject = (project) => {
    const updatedData = projectsData.filter(
      (item) =>
        !(
          item.projectName === project.projectName &&
          item.firmName === project.firmName
        )
    );
    setProjectsData(updatedData);

    toast.success("Project deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const handleUpdateProject = () => {
    if (!formValues.firmName || !formValues.projectName) {
      toast.error("Firm Name and Project Name are required");
      return;
    }

    const timestamp = new Date().toLocaleString();

    const updatedProject = {
      timestamp: timestamp,
      firmName: formValues.firmName,
      projectName: formValues.projectName,
      projectAddress: formValues.projectAddress,
      oldSurveyNumber: formValues.oldSurveyNumber,
      newSurveyNumber: formValues.newSurveyNumber,
      village: formValues.village,
      taluka: formValues.taluka,
      district: formValues.district,
      sanctionAuthority: formValues.sanctionAuthority,
      east: formValues.east,
      west: formValues.west,
      north: formValues.north,
      south: formValues.south,
      latitude: formValues.latitude,
      longitude: formValues.longitude,
      landmark: formValues.landmark,
      phaseNo:
        phases.length > 0
          ? phases.map((phase) => phase.phaseNo || "-").join(", ")
          : "-",
      wingNo:
        phases.length > 0
          ? phases.map((phase) => phase.wingNo || "-").join(", ")
          : "-",
      mahareraNo:
        phases.length > 0
          ? phases.map((phase) => phase.mahareraNo || "-").join(", ")
          : "-",
      phases: [...phases],
    };

    // Remove the old project and add the updated one
    const updatedData = projectsData.filter(
      (item) =>
        !(
          item.projectName === editingProject.projectName &&
          item.firmName === editingProject.firmName
        )
    );

    setProjectsData([...updatedData, updatedProject]);

    toast.success("Project updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form and close dialog
    setFormValues({
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
    setPhases([]);
    setProjectDialogOpen(false);
    setIsEditingProject(false);
    setEditingProject(null);
  };
  const handleDeleteClickProject = (project) => {
    setItemToDeleteProject(project);
    setDeleteConfirmOpenProject(true);
  };

  const handleDeleteCancelProject = () => {
    setDeleteConfirmOpenProject(false);
    setItemToDeleteProject(null);
  };

  const handleDeleteConfirmProject = () => {
    if (itemToDeleteProject) {
      handleDeleteProject(itemToDeleteProject);
      setDeleteConfirmOpenProject(false);
      setItemToDeleteProject(null);
    }
  };

  const handleLandownerSubmit = () => {
    // Basic validation
    if (
      !landownerForm.projectName ||
      !landownerForm.landownerName ||
      !landownerForm.mobileNo
    ) {
      toast.error("Project Name, Landowner Name, and Mobile No are required");
      return false; // Return false to prevent dialog close
    }

    const timestamp = new Date().toLocaleString();

    // Create URLs for the uploaded files
    const createFileUrls = (files) => {
      if (!files || files.length === 0) return "-";
      return files.map((file) => URL.createObjectURL(file));
    };

    // Create new landowner entry with actual file URLs
    const newLandowner = {
      timestamp: timestamp,
      projectName: landownerForm.projectName,
      landownerName: landownerForm.landownerName,
      age: landownerForm.age || "-",
      occupation: landownerForm.occupation || "-",
      mobileNo: landownerForm.mobileNo,
      mailId: landownerForm.mailId || "-",
      village: landownerForm.village || "-",
      taluka: landownerForm.taluka || "-",
      district: landownerForm.district || "-",
      bankName: landownerForm.bankName || "-",
      bankAddress: landownerForm.bankAddress || "-",
      accountNo: landownerForm.accountNo || "-",
      ifscCode: landownerForm.ifscCode || "-",
      // Store actual file URLs
      residentialAddress: createFileUrls(uploadedFiles.addressFile),
      panNo: createFileUrls(uploadedFiles.panFile),
      aadhaarNo: createFileUrls(uploadedFiles.aadhaarFile),
      photo: createFileUrls(uploadedFiles.imageFile),
      lightBill: createFileUrls(uploadedFiles.lightBillFile),
      // Store the actual file objects for reference
      uploadedFiles: uploadedFiles,
    };

    // Add to landowner data
    setLandownerData((prev) => [...prev, newLandowner]);

    // Show success message
    toast.success("Landowner details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form
    setLandownerForm({
      projectName: "",
      landownerName: "",
      age: "",
      occupation: "",
      mobileNo: "",
      mailId: "",
      village: "",
      taluka: "",
      district: "",
      bankName: "",
      bankAddress: "",
      accountNo: "",
      ifscCode: "",
    });

    // Reset file names and uploaded files
    setFileNames({
      aadhaarFile: [],
      imageFile: [],
      addressFile: [],
      panFile: [],
      lightBillFile: [],
    });

    setUploadedFiles({});

    return true; // Return true to indicate success
  };
  const handleEditLandowner = (landowner) => {
    setEditingLandowner(landowner);
    setIsEditingLandowner(true);

    // Pre-fill the form with existing data
    setLandownerForm({
      projectName: landowner.projectName || "",
      landownerName: landowner.landownerName || "",
      age: landowner.age || "",
      occupation: landowner.occupation || "",
      mobileNo: landowner.mobileNo || "",
      mailId: landowner.mailId || "",
      village: landowner.village || "",
      taluka: landowner.taluka || "",
      district: landowner.district || "",
      bankName: landowner.bankName || "",
      bankAddress: landowner.bankAddress || "",
      accountNo: landowner.accountNo || "",
      ifscCode: landowner.ifscCode || "",
    });

    // Set uploaded files if available
    if (landowner.uploadedFiles) {
      setUploadedFiles(landowner.uploadedFiles);

      // Update file names for display
      const newFileNames = {};
      Object.keys(landowner.uploadedFiles).forEach((key) => {
        if (
          landowner.uploadedFiles[key] &&
          landowner.uploadedFiles[key].length > 0
        ) {
          newFileNames[key] = landowner.uploadedFiles[key].map(
            (file) => file.name
          );
        }
      });
      setFileNames(newFileNames);
    }

    // Open the dialog
    setLandownerDialogOpen(true);
  };
  const handleDeleteLandowner = (landowner) => {
    // Filter out the deleted landowner
    const updatedData = landownerData.filter(
      (item) =>
        !(
          item.projectName === landowner.projectName &&
          item.landownerName === landowner.landownerName &&
          item.mobileNo === landowner.mobileNo
        )
    );

    setLandownerData(updatedData);

    toast.success("Landowner deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  const handleUpdateLandowner = () => {
    // Basic validation
    if (
      !landownerForm.projectName ||
      !landownerForm.landownerName ||
      !landownerForm.mobileNo
    ) {
      toast.error("Project Name, Landowner Name, and Mobile No are required");
      return;
    }

    // Remove the old entry
    const updatedData = landownerData.filter(
      (item) =>
        !(
          item.projectName === editingLandowner.projectName &&
          item.landownerName === editingLandowner.landownerName &&
          item.mobileNo === editingLandowner.mobileNo
        )
    );

    const timestamp = new Date().toLocaleString();

    // Create URLs for the uploaded files
    const createFileUrls = (files) => {
      if (!files || files.length === 0) return "-";
      return files.map((file) => URL.createObjectURL(file));
    };

    // Create updated landowner entry
    const updatedLandowner = {
      timestamp: timestamp,
      projectName: landownerForm.projectName,
      landownerName: landownerForm.landownerName,
      age: landownerForm.age || "-",
      occupation: landownerForm.occupation || "-",
      mobileNo: landownerForm.mobileNo,
      mailId: landownerForm.mailId || "-",
      village: landownerForm.village || "-",
      taluka: landownerForm.taluka || "-",
      district: landownerForm.district || "-",
      bankName: landownerForm.bankName || "-",
      bankAddress: landownerForm.bankAddress || "-",
      accountNo: landownerForm.accountNo || "-",
      ifscCode: landownerForm.ifscCode || "-",
      // Store actual file URLs
      residentialAddress: createFileUrls(uploadedFiles.addressFile),
      panNo: createFileUrls(uploadedFiles.panFile),
      aadhaarNo: createFileUrls(uploadedFiles.aadhaarFile),
      photo: createFileUrls(uploadedFiles.imageFile),
      lightBill: createFileUrls(uploadedFiles.lightBillFile),
      // Store the actual file objects for reference
      uploadedFiles: uploadedFiles,
    };

    // Add the updated entry
    setLandownerData([...updatedData, updatedLandowner]);

    toast.success("Landowner updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    resetLandownerForm();
    return true;
  };
  const resetLandownerForm = () => {
    setLandownerForm({
      projectName: "",
      landownerName: "",
      age: "",
      occupation: "",
      mobileNo: "",
      mailId: "",
      village: "",
      taluka: "",
      district: "",
      bankName: "",
      bankAddress: "",
      accountNo: "",
      ifscCode: "",
    });
    setUploadedFiles({});
    setFileNames({
      aadhaarFile: [],
      imageFile: [],
      addressFile: [],
      panFile: [],
      lightBillFile: [],
    });
    setIsEditingLandowner(false);
    setEditingLandowner(null);
  };

  const handleDeleteClickLandowner = (landowner) => {
    setItemToDeleteLandowner(landowner);
    setDeleteConfirmOpenLandowner(true);
  };

  const handleDeleteCancelLandowner = () => {
    setDeleteConfirmOpenLandowner(false);
    setItemToDeleteLandowner(null);
  };

  const handleDeleteConfirmLandowner = () => {
    if (itemToDeleteLandowner) {
      handleDeleteLandowner(itemToDeleteLandowner);
      setDeleteConfirmOpenLandowner(false);
      setItemToDeleteLandowner(null);
    }
  };

  const groupFlatAllotments = (flatData) => {
    const grouped = {};

    flatData.forEach((item) => {
      const key = `${item.projectName}-${item.landownerName}-${item.mobileNo}`;

      if (!grouped[key]) {
        grouped[key] = {
          projectName: item.projectName,
          landownerName: item.landownerName,
          mobileNo: item.mobileNo,
          noOfFlatsAlloted: item.noOfFlatsAlloted,
          timestamp: item.timestamp,
          flatDetails: [],
        };
      }

      grouped[key].flatDetails.push({
        reraCarpetArea: item.reraCarpetArea,
        wing: item.wing,
        flatNo: item.flatNo,
        typeOfFlat: item.typeOfFlat,
      });
    });

    return Object.values(grouped);
  };

  const handleFlatAllotmentSubmit = () => {
    // Basic validation
    if (!selectedProject || !selectedLandowner) {
      toast.error("Project Name and Landowner Name are required");
      return;
    }

    if (!mobileNo || mobileNo.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    if (noOfFlats <= 0 || tableRows.length === 0) {
      toast.error("Please enter valid flat details");
      return;
    }

    const timestamp = new Date().toLocaleString();

    // Create separate entries for each flat
    const flatAllotmentEntries = tableRows.map((row) => ({
      timestamp: timestamp,
      projectName: selectedProject,
      landownerName: selectedLandowner,
      mobileNo: mobileNo,
      noOfFlatsAlloted: noOfFlats,
      reraCarpetArea: row.area || "-",
      wing: row.wing || "-",
      flatNo: row.flatNo || "-",
      typeOfFlat: row.flatType || "-",
    }));

    // Add to project data
    setProjectData((prev) => [...prev, ...flatAllotmentEntries]);

    // Show success message
    toast.success("Flat allotment details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form and close dialog
    resetFlatAllotmentForm();
    setFlatDialogOpen(false);
  };

  const handleEditFlatAllotment = (group) => {
    setEditingFlatAllotment(group);
    setIsEditingFlat(true);

    // Pre-fill the form with existing data
    setSelectedProject(group.projectName || "");
    setSelectedLandowner(group.landownerName || "");
    setMobileNo(group.mobileNo || "");
    setNoOfFlats(group.noOfFlatsAlloted || 0);

    // Generate table rows with existing flat details
    if (group.flatDetails && group.flatDetails.length > 0) {
      setTableRows(
        group.flatDetails.map((flat) => ({
          area: flat.reraCarpetArea || "",
          wing: flat.wing || "",
          flatNo: flat.flatNo || "",
          flatType: flat.typeOfFlat || "",
        }))
      );
    }

    // Open the dialog
    setFlatDialogOpen(true);
  };

  const handleDeleteFlatAllotment = (group) => {
    // Filter out the deleted entry
    const updatedData = projectData.filter(
      (item) =>
        !(
          item.projectName === group.projectName &&
          item.landownerName === group.landownerName &&
          item.mobileNo === group.mobileNo
        )
    );

    setProjectData(updatedData);

    toast.success("Flat allotment deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleUpdateFlatAllotment = () => {
    if (!selectedProject || !selectedLandowner) {
      toast.error("Project Name and Landowner Name are required");
      return;
    }

    // Remove the old entry
    const updatedData = projectData.filter(
      (item) =>
        !(
          item.projectName === editingFlatAllotment.projectName &&
          item.landownerName === editingFlatAllotment.landownerName &&
          item.mobileNo === editingFlatAllotment.mobileNo
        )
    );

    // Add the updated entry
    const timestamp = new Date().toLocaleString();
    const flatAllotmentEntries = tableRows.map((row) => ({
      timestamp: timestamp,
      projectName: selectedProject,
      landownerName: selectedLandowner,
      mobileNo: mobileNo,
      noOfFlatsAlloted: noOfFlats,
      reraCarpetArea: row.area || "-",
      wing: row.wing || "-",
      flatNo: row.flatNo || "-",
      typeOfFlat: row.flatType || "-",
    }));

    setProjectData([...updatedData, ...flatAllotmentEntries]);

    toast.success("Flat allotment updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    // Reset form and close dialog
    resetFlatAllotmentForm();
    setFlatDialogOpen(false);
    setIsEditingFlat(false);
    setEditingFlatAllotment(null);
  };

  const resetFlatAllotmentForm = () => {
    setSelectedProject("");
    setSelectedLandowner("");
    setMobileNo("");
    setNoOfFlats(0);
    setTableRows([]);
    setIsEditingFlat(false);
    setEditingFlatAllotment(null);
    setMobileError(""); // Reset error states too
  };
  const handleDeleteClickAllotment = (group) => {
    setItemToDeleteAllotment(group);
    setDeleteConfirmOpenAllotment(true);
  };

  const handleDeleteCancelAllotment = () => {
    setDeleteConfirmOpenAllotment(false);
    setItemToDeleteAllotment(null);
  };

  const handleDeleteConfirmAllotment = () => {
    if (itemToDeleteAllotment) {
      handleDeleteFlatAllotment(itemToDeleteAllotment);
      setDeleteConfirmOpenAllotment(false);
      setItemToDeleteAllotment(null);
    }
  };

  return (
    <div className="main-content">
      <h6>Developer Module / Basic Information Management</h6>

      <div className="d-flex flex-wrap align-items-center mb-3">
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px",
              borderRadius: "20px",
              margin: "5px",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              width:
                expandedSection === index
                  ? isMobile
                    ? "100%"
                    : "290px"
                  : "50px",
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
              style: { marginRight: "8px", color: "white" },
            })}

            {expandedSection === index ? (
              <span
                className="fw-bold text-white p-2 fs-6"
                style={{ color: "white", marginLeft: "10px" }}
              >
                {section.label}
              </span>
            ) : null}

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.2)",
                transform: "scale(0.1)",
                transition: "transform 0.3s ease",
                zIndex: -1,
              }}
            ></div>

            <div
              style={{
                "&:hover": {
                  background:
                    "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
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
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
            <div className="d-flex flex-column flex-md-row gap-2">
              <Button
                variant="contained"
                color="primary"
                style={{ background: Constants.primaryColor }}
                className="fw-bold"
                onClick={() => setFirmDialogOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                + Create Firm
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: Constants.primaryColor,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    background: Constants.primaryColor,
                  },
                }}
                onClick={handleDownloadPDFFirm}
                size={isMobile ? "small" : "medium"}
              >
                <FaFileDownload size={isMobile ? 16 : 18} />
                {isMobile ? "PDF" : "Download PDF"}
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <div ref={pdfRef} className="mt-3" style={{ overflowX: "auto" }}>
              <FirmTable
                firms={firms}
                onEdit={handleEditFirm}
                onDelete={handleDeleteClickFirm}
              />
            </div>
          </div>

          {/* Firm Dialog */}
          <Dialog
            open={firmDialogOpen}
            // onClose={() => setFirmDialogOpen(false)}
            onClose={() => {
              setFirmDialogOpen(false);
              resetFirmForm();
            }}
            fullWidth
            maxWidth="md"
            fullScreen={isMobile}
          >
            {/* <DialogTitle>Create Firm</DialogTitle> */}
            <DialogTitle>
              {isEditingFirm ? "Edit Firm" : "Create Firm"}
            </DialogTitle>{" "}
            <DialogContent>
              <div
                className="firm-form mt-2 p-1"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <Paper
                  className="p-2 p-md-3"
                  elevation={2}
                  style={{
                    borderRadius: "12px",
                    paddingBottom: "20px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Firm Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Firm Name"
                        fullWidth
                        variant="outlined"
                        value={firmName}
                        onChange={handleFirmNameChange}
                        error={!!firmNameError}
                        helperText={firmNameError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Firm Address"
                        fullWidth
                        variant="outlined"
                        value={firmFormData.address}
                        onChange={(e) =>
                          setFirmFormData({
                            ...firmFormData,
                            address: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Firm PAN No"
                        fullWidth
                        variant="outlined"
                        value={firmPan}
                        onChange={handleFirmPanChange}
                        error={!!firmPanError}
                        helperText={firmPanError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Firm GST No"
                        fullWidth
                        variant="outlined"
                        value={firmFormData.firmGstNo}
                        onChange={(e) =>
                          setFirmFormData({
                            ...firmFormData,
                            firmGstNo: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginTop={1}>
                    {[
                      {
                        label: "Firm PAN No Document",
                        key: "firmPanNoDocument",
                      },
                      {
                        label: "Firm GST No Document",
                        key: "firmGstNoDocument",
                      },
                      {
                        label: "Firm Light Bill for Address Proof Document",
                        key: "firmLightBillForAddressProof",
                      },
                    ].map((item, index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <Typography variant="body2" gutterBottom>
                          {item.label}
                        </Typography>
                        <label>
                          <Input
                            type="file"
                            multiple
                            style={{ display: "none" }}
                            id={`file-input-${index}`}
                            onChange={(e) => handleFileChange(e, item.key)}
                          />
                          <Button
                            variant="contained"
                            color="light"
                            component="span"
                            size={isMobile ? "small" : "medium"}
                          >
                            Choose File
                          </Button>
                        </label>

                        {fileNames[item.key] && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginTop: "8px", whiteSpace: "pre-line" }}
                          >
                            {fileNames[item.key].join("\n")}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="h6" className="mt-4" gutterBottom>
                    Partner Details
                  </Typography>

                  {partners.map((partner, index) => (
                    <Paper
                      key={index}
                      className="p-3 mb-3"
                      elevation={2}
                      style={{ borderRadius: "10px" }}
                    >
                      <Grid container spacing={2}>
                        {[
                          "Name",
                          "Age",
                          "Occupation",
                          "Mobile No.",
                          "Mail ID",
                          "Residential Address",
                          "PAN No.",
                          "Aadhaar No.",
                          "Residential Address Document",
                          "Pan No Document",
                          "Aadhar No Document",
                          "Photo Document",
                          "Light Bill For Address Proof Document",
                        ].map((label, i) => (
                          <Grid item xs={12} md={6} key={i}>
                            {[
                              "Residential Address Document",
                              "Pan No Document",
                              "Aadhar No Document",
                              "Photo Document",
                              "Light Bill For Address Proof Document",
                            ].includes(label) ? (
                              <>
                                <Typography variant="body2" gutterBottom>
                                  {label}{" "}
                                </Typography>
                                <label>
                                  <Input
                                    type="file"
                                    style={{ display: "none" }}
                                    id={`file-input-${label}`}
                                    onChange={(e) => handleFileChange(e, label)}
                                  />
                                  <Button
                                    variant="contained"
                                    color="light"
                                    component="span"
                                    size={isMobile ? "small" : "medium"}
                                  >
                                    Choose File
                                  </Button>
                                </label>
                                {fileNames[label] && (
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{
                                      marginTop: "8px",
                                      whiteSpace: "pre-line",
                                    }}
                                  >
                                    {fileNames[label].join("\n")}
                                  </Typography>
                                )}
                              </>
                            ) : (
                              <TextField
                                label={label}
                                fullWidth
                                variant="outlined"
                                type={label === "Age" ? "text" : "text"}
                                value={
                                  partner[label.toLowerCase().replace(/ /g, "")]
                                }
                                sx={{ border: Constants.formInputBorderColor }}
                                onChange={(e) => {
                                  if (label === "Age") {
                                    handleAgeChange(e, index);
                                  } else if (label === "Occupation") {
                                    handleOccupationChange(e, index);
                                  } else if (label === "Name") {
                                    handlePartnerNameChange(e, index);
                                  } else if (label === "Mobile No.") {
                                    handleMobileChange(e, index);
                                  } else if (label === "Mail ID") {
                                    handleEmailChange(e, index);
                                  } else if (label === "PAN No.") {
                                    handlePANChange(e, index);
                                  } else if (label === "Aadhaar No.") {
                                    const aadhaar = e.target.value;
                                    if (validateAadhaar(aadhaar)) {
                                      setAadhaarError(false);
                                      // Update to use aadhaarNo
                                      const updatedPartners = [...partners];
                                      updatedPartners[index].aadhaarNo =
                                        aadhaar;
                                      setPartners(updatedPartners);
                                    } else {
                                      setAadhaarError(true);
                                      setAadhaarErrorMessage(
                                        "Aadhaar number should be exactly 12 digits."
                                      );
                                    }
                                  }
                                }}
                                error={
                                  (label === "Name" && !!nameError) ||
                                  (label === "Mobile No." && !!mobileError) ||
                                  (label === "Mail ID" && !!emailError) ||
                                  (label === "PAN No." && !!panError) ||
                                  (label === "Age" && !!ageError) ||
                                  (label === "Occupation" &&
                                    !!occupationError) ||
                                  (label === "Aadhaar No." && aadhaarError)
                                }
                                helperText={
                                  (label === "Name" && nameError) ||
                                  (label === "Mobile No." && mobileError) ||
                                  (label === "Mail ID" && emailError) ||
                                  (label === "PAN No." && panError) ||
                                  (label === "Age" && ageError) ||
                                  (label === "Occupation" && occupationError) ||
                                  (label === "Aadhaar No." &&
                                    aadhaarError &&
                                    aadhaarErrorMessage)
                                }
                                size={isMobile ? "small" : "medium"}
                              />
                            )}
                          </Grid>
                        ))}
                      </Grid>
                    </Paper>
                  ))}

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setPartners([...partners, {}])}
                      size={isMobile ? "small" : "medium"}
                    >
                      <FaPlus /> Add Partner
                    </Button>

                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "red",
                        "&:hover": {
                          backgroundColor: "#d32f2f",
                        },
                      }}
                      onClick={handleRemovePartner}
                      size={isMobile ? "small" : "medium"}
                    >
                      Remove Partner
                    </Button>
                  </div>
                </Paper>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setFirmDialogOpen(false)}
                size={isMobile ? "small" : "medium"}
              >
                Cancel
              </Button>
              {/* <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleFirmSubmit();
                  setFirmDialogOpen(false);
                }}
                size={isMobile ? "small" : "medium"}
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                Submit
              </Button> */}
              <Button
                variant="contained"
                color="primary"
                onClick={isEditingFirm ? handleUpdateFirm : handleFirmSubmit}
                size={isMobile ? "small" : "medium"}
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                {isEditingFirm ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteConfirmOpenFirm}
            onClose={handleDeleteCancelFirm}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the firm "
                {itemToDeleteFirm?.name}" (PAN: {itemToDeleteFirm?.firmPanNo})?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancelFirm} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirmFirm}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {expandedSection === 1 && selectedTab === "display" && (
        <div className="content-container mt-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
            <div className="d-flex flex-column flex-md-row gap-2">
              <Button
                variant="contained"
                color="primary"
                style={{ background: Constants.primaryColor }}
                className="fw-bold"
                onClick={() => setProjectDialogOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                + Create Project
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: Constants.primaryColor,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    background: Constants.primaryColor,
                  },
                }}
                onClick={handleDownloadPDFProject}
                size={isMobile ? "small" : "medium"}
              >
                <FaFileDownload size={isMobile ? 16 : 18} />
                {isMobile ? "PDF" : "Download PDF"}
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <div
              ref={displayref}
              className="mt-3"
              style={{ overflowX: "auto" }}
            >
              <DisplayTable
                data={projectsData}
                onEdit={handleEditProject}
                onDelete={handleDeleteClickProject}
              />
            </div>
          </div>
          {/* Project Dialog */}
          <Dialog
            open={projectDialogOpen}
            onClose={() => setProjectDialogOpen(false)}
            fullWidth
            maxWidth="md"
            fullScreen={isMobile}
          >
            {/* <DialogTitle>Create Project</DialogTitle> */}
            <DialogTitle>
              {isEditingProject ? "Edit Project" : "Create Project"}
            </DialogTitle>
            <DialogContent>
              <div
                className="project-form mt-2 p-1"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <Paper
                  className="p-2 p-md-3"
                  elevation={2}
                  style={{
                    borderRadius: "12px",
                    paddingBottom: "20px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Project Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Firm Name"
                        fullWidth
                        variant="outlined"
                        value={formValues.firmName}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            firmName: e.target.value,
                          }))
                        }
                        error={!!errors.firmName}
                        helperText={errors.firmName}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Project Name"
                        fullWidth
                        variant="outlined"
                        value={formValues.projectName}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            projectName: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Project Address"
                        fullWidth
                        variant="outlined"
                        value={formValues.projectAddress}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            projectAddress: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Old Survey Number"
                        fullWidth
                        variant="outlined"
                        value={formValues.oldSurveyNumber}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            oldSurveyNumber: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="New Survey Number"
                        fullWidth
                        variant="outlined"
                        value={formValues.newSurveyNumber}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            newSurveyNumber: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Village"
                        fullWidth
                        variant="outlined"
                        value={formValues.village}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            village: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Taluka"
                        fullWidth
                        variant="outlined"
                        value={formValues.taluka}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            taluka: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="District"
                        fullWidth
                        variant="outlined"
                        value={formValues.district}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            district: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Sanction Authority"
                        fullWidth
                        variant="outlined"
                        value={formValues.sanctionAuthority}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            sanctionAuthority: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="East"
                        fullWidth
                        variant="outlined"
                        value={formValues.east}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            east: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="West"
                        fullWidth
                        variant="outlined"
                        value={formValues.west}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            west: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="North"
                        fullWidth
                        variant="outlined"
                        value={formValues.north}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            north: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="South"
                        fullWidth
                        variant="outlined"
                        value={formValues.south}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            south: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Latitude"
                        fullWidth
                        variant="outlined"
                        value={formValues.latitude}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            latitude: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Longitude"
                        fullWidth
                        variant="outlined"
                        value={formValues.longitude}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            longitude: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Landmark"
                        fullWidth
                        variant="outlined"
                        value={formValues.landmark}
                        onChange={(e) =>
                          setFormValues((prev) => ({
                            ...prev,
                            landmark: e.target.value,
                          }))
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  </Grid>

                  <div className="mt-4">
                    <Typography variant="h6" gutterBottom>
                      Phase Details
                    </Typography>
                    {phases.map((phase, index) => (
                      <div
                        key={index}
                        className="phase-form mb-4 p-3"
                        style={{
                          border: "1px solid #ddd",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography variant="subtitle1" gutterBottom>
                          Phase {index + 1}
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Phase No"
                              fullWidth
                              variant="outlined"
                              value={phase.phaseNo}
                              onChange={(e) => {
                                const updatedPhases = [...phases];
                                updatedPhases[index].phaseNo = e.target.value;
                                setPhases(updatedPhases);
                              }}
                              size={isMobile ? "small" : "medium"}
                              sx={{ border: Constants.formInputBorderColor }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="Wing No"
                              fullWidth
                              variant="outlined"
                              value={phase.wingNo}
                              onChange={(e) => {
                                const updatedPhases = [...phases];
                                updatedPhases[index].wingNo = e.target.value;
                                setPhases(updatedPhases);
                              }}
                              size={isMobile ? "small" : "medium"}
                              sx={{ border: Constants.formInputBorderColor }}
                            />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <TextField
                              label="MahaRERA No"
                              fullWidth
                              variant="outlined"
                              value={phase.mahareraNo}
                              onChange={(e) => {
                                const updatedPhases = [...phases];
                                updatedPhases[index].mahareraNo =
                                  e.target.value;
                                setPhases(updatedPhases);
                              }}
                              size={isMobile ? "small" : "medium"}
                              sx={{ border: Constants.formInputBorderColor }}
                            />
                          </Grid>
                        </Grid>
                        <div className="mt-2">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleRemovePhase(index)}
                            startIcon={<FaTrash />}
                            size={isMobile ? "small" : "medium"}
                          >
                            Remove Phase
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddPhase}
                      startIcon={<FaPlus />}
                      size={isMobile ? "small" : "medium"}
                      style={{ backgroundColor: Constants.primaryColor }}
                    >
                      Add Phase
                    </Button>
                  </div>
                </Paper>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setProjectDialogOpen(false)}
                size={isMobile ? "small" : "medium"}
              >
                Cancel
              </Button>
             
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isEditingProject ? handleUpdateProject : handleProjectSubmit
                }
                size={isMobile ? "small" : "medium"}
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                {isEditingProject ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
          {/* Delete confirmation dialog for projects */}
          <Dialog
            open={deleteConfirmOpenProject}
            onClose={handleDeleteCancelProject}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the project "
                {itemToDeleteProject?.projectName}" (Firm:{" "}
                {itemToDeleteProject?.firmName})?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancelProject} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirmProject}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {expandedSection === 2 && selectedTab === "landowner" && (
        <div className="content-container mt-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
            <div className="d-flex flex-column flex-md-row gap-2">
              <Button
                variant="contained"
                color="primary"
                style={{ background: Constants.primaryColor }}
                className="fw-bold"
                onClick={() => setLandownerDialogOpen(true)}
                size={isMobile ? "small" : "medium"}
              >
                + Create Landowner Info
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: Constants.primaryColor,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    background: Constants.primaryColor,
                  },
                }}
                onClick={handleDownloadPDFLandowner}
                size={isMobile ? "small" : "medium"}
              >
                <FaFileDownload size={isMobile ? 16 : 18} />
                {isMobile ? "PDF" : "Download PDF"}
              </Button>
            </div>
          </div>
          <div className="mt-3">
            <div
              ref={landowner_pdf}
              className="mt-3"
              style={{ overflowX: "auto" }}
            >
              <LandownerTable
                data={landownerData}
                onEdit={handleEditLandowner}
                onDelete={handleDeleteClickLandowner}
              />
            </div>
          </div>
          {/* Landowner Dialog */}
          <Dialog
            open={landownerDialogOpen}
            onClose={() => setLandownerDialogOpen(false)}
            fullWidth
            maxWidth="md"
            fullScreen={isMobile}
          >
            {/* <DialogTitle>Create Landowner Info</DialogTitle> */}
            <DialogTitle>
              {isEditingLandowner
                ? "Edit Landowner Info"
                : "Create Landowner Info"}
            </DialogTitle>
            <DialogContent>
              <div
                className="landowner-form mt-2 p-1"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <Paper
                  className="p-2 p-md-3"
                  elevation={2}
                  style={{
                    borderRadius: "12px",
                    paddingBottom: "20px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Landowner Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      >
                        <InputLabel>Project Name</InputLabel>
                        <Select
                          value={landownerForm.projectName}
                          onChange={(e) =>
                            setLandownerForm({
                              ...landownerForm,
                              projectName: e.target.value,
                            })
                          }
                          label="Project Name"
                          sx={{
                            "& .MuiSelect-icon": {
                              color: Constants.primaryColor,
                            },
                          }}
                        >
                          {projects.map((project, index) => (
                            <MenuItem key={index} value={project}>
                              {project}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Mobile No"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.mobileNo}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            mobileNo: value,
                          });

                          if (/[^0-9]/.test(value)) {
                            setMobileError(
                              "Mobile number should only contain digits."
                            );
                          } else if (value.length > 10) {
                            setMobileError(
                              "Mobile number cannot exceed 10 digits."
                            );
                          } else {
                            setMobileError("");
                          }
                        }}
                        error={!!mobileError}
                        helperText={mobileError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Landowner Name"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.landownerName}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            landownerName: value,
                          });

                          if (/[^a-zA-Z\s]/.test(value)) {
                            setError(
                              "Name should only contain letters and spaces."
                            );
                          } else {
                            setError("");
                          }
                        }}
                        error={!!error}
                        helperText={error}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Age"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={landownerForm.age}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            age: value,
                          });

                          if (value && (value < 0 || value > 120)) {
                            setAgeError(
                              "Please enter a valid age between 0 and 120"
                            );
                          } else {
                            setAgeError("");
                          }
                        }}
                        error={!!ageError}
                        helperText={ageError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Occupation"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.occupation}
                        onChange={(e) =>
                          setLandownerForm({
                            ...landownerForm,
                            occupation: e.target.value,
                          })
                        }
                        error={!!occupationError}
                        helperText={occupationError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        type="email"
                        value={landownerForm.mailId}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            mailId: value,
                          });

                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
                          if (value && !emailRegex.test(value)) {
                            setEmailError("Invalid email address");
                          } else {
                            setEmailError("");
                          }
                        }}
                        error={!!emailError}
                        helperText={emailError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Village"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.village}
                        onChange={(e) =>
                          setLandownerForm({
                            ...landownerForm,
                            village: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Taluka"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.taluka}
                        onChange={(e) =>
                          setLandownerForm({
                            ...landownerForm,
                            taluka: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="District"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.district}
                        onChange={(e) =>
                          setLandownerForm({
                            ...landownerForm,
                            district: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      >
                        <InputLabel id="bank-name-label">
                          Name of Bank
                        </InputLabel>
                        <Select
                          labelId="bank-name-label"
                          id="bank-name-select"
                          value={landownerForm.bankName}
                          onChange={(e) =>
                            setLandownerForm({
                              ...landownerForm,
                              bankName: e.target.value,
                            })
                          }
                          label="Name of Bank"
                          sx={{
                            "& .MuiSelect-icon": {
                              color: Constants.primaryColor,
                            },
                          }}
                        >
                          <MenuItem value="SBI Bank">SBI Bank</MenuItem>
                          <MenuItem value="Bank Of Baroda">
                            Bank Of Baroda
                          </MenuItem>
                          <MenuItem value="Canara Bank">Canara Bank</MenuItem>
                          <MenuItem value="Axis Bank">Axis Bank</MenuItem>
                          <MenuItem value="Bank of India">
                            Bank of India
                          </MenuItem>
                          <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                          <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                          <MenuItem value="Bank of Maharashtra">
                            Bank of Maharashtra
                          </MenuItem>
                          <MenuItem value="Central Bank of India">
                            Central Bank of India
                          </MenuItem>
                          <MenuItem value="Punjab National Bank">
                            Punjab National Bank
                          </MenuItem>
                          <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
                          <MenuItem value="Indian Bank">Indian Bank</MenuItem>
                          <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Bank Address"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.bankAddress}
                        onChange={(e) =>
                          setLandownerForm({
                            ...landownerForm,
                            bankAddress: e.target.value,
                          })
                        }
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Account No"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.accountNo}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            accountNo: value,
                          });

                          const accountNoRegex = /^[0-9]{10,16}$/;
                          if (value && !accountNoRegex.test(value)) {
                            setAccountNoError(
                              "Account number must be between 10 to 16 digits."
                            );
                          } else {
                            setAccountNoError("");
                          }
                        }}
                        error={!!accountNoError}
                        helperText={accountNoError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="IFSC Code"
                        fullWidth
                        variant="outlined"
                        value={landownerForm.ifscCode}
                        onChange={(e) => {
                          const value = e.target.value;
                          setLandownerForm({
                            ...landownerForm,
                            ifscCode: value,
                          });
                        }}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  </Grid>

                  {/* Document Upload Section */}
                  <Grid container spacing={2} marginTop={1}>
                    {[
                      { label: "Aadhaar No.", key: "aadhaarFile" },
                      { label: "Photo", key: "imageFile", accept: "image/*" },
                      { label: "Residential Address", key: "addressFile" },
                      { label: "PAN No.", key: "panFile" },
                      { label: "Light Bill", key: "lightBillFile" },
                    ].map((doc, index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <Typography variant="body2" gutterBottom>
                          {doc.label}
                        </Typography>
                        <label>
                          <Input
                            type="file"
                            accept={doc.accept || "*/*"}
                            style={{ display: "none" }}
                            id={`file-input-${doc.key}`}
                            onChange={(e) => handleFileChange(e, doc.key)}
                          />
                          <Button
                            variant="contained"
                            color="light"
                            component="span"
                            size={isMobile ? "small" : "medium"}
                          >
                            Choose File
                          </Button>
                        </label>
                        {fileNames[doc.key] && (
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            style={{ marginTop: "8px" }}
                          >
                            {fileNames[doc.key].join(", ")}
                          </Typography>
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setLandownerDialogOpen(false)}
                size={isMobile ? "small" : "medium"}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                // onClick={
                //   isEditingLandowner
                //     ? handleUpdateLandowner
                //     : handleLandownerSubmit
                // }
                onClick={() => {
                  const success = isEditingLandowner
                    ? handleUpdateLandowner()
                    : handleLandownerSubmit();

                  if (success) {
                    setLandownerDialogOpen(false);
                  }
                }}
                size={isMobile ? "small" : "medium"}
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                {isEditingLandowner ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
          {/* Delete confirmation dialog for landowners: */}
          <Dialog
            open={deleteConfirmOpenLandowner}
            onClose={handleDeleteCancelLandowner}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the landowner record for{" "}
                {itemToDeleteLandowner?.landownerName} (Project:{" "}
                {itemToDeleteLandowner?.projectName})?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancelLandowner} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirmLandowner}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {expandedSection === 3 && selectedTab === "allotement" && (
        <div className="content-container mt-3">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
            <div className="d-flex flex-column flex-md-row gap-2">
              <Button
                variant="contained"
                color="primary"
                style={{ background: Constants.primaryColor }}
                className="fw-bold"
                onClick={() => {
                  resetFlatAllotmentForm();
                  setFlatDialogOpen(true);
                }}
                size={isMobile ? "small" : "medium"}
              >
                + Create Flat Allotment Info
              </Button>

              <Button
                variant="contained"
                sx={{
                  background: Constants.primaryColor,
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    background: Constants.primaryColor,
                  },
                }}
                onClick={handleDownloadPDFAllotement}
                size={isMobile ? "small" : "medium"}
              >
                <FaFileDownload size={isMobile ? 16 : 18} />
                {isMobile ? "PDF" : "Download PDF"}
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <div
              ref={allotement_pdf}
              className="mt-3"
              style={{ overflowX: "auto" }}
            >
              <FlatAllotment
                data={projectData}
                onEdit={handleEditFlatAllotment}
                onDelete={handleDeleteClickAllotment}
              />
            </div>
          </div>

          {/* Flat Allotment Dialog */}
          <Dialog
            open={flatDialogOpen}
            onClose={() => {
              setFlatDialogOpen(false);
              resetFlatAllotmentForm();
            }}
            fullWidth
            maxWidth="md"
            fullScreen={isMobile}
          >
            <DialogTitle>
              {isEditingFlat
                ? "Edit Flat Allotment Info"
                : "Create Flat Allotment Info"}
            </DialogTitle>
            <DialogContent>
              <div
                className="flat-form mt-2 p-1"
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  paddingRight: "10px",
                }}
              >
                <Paper
                  className="p-2 p-md-3"
                  elevation={2}
                  style={{
                    borderRadius: "12px",
                    paddingBottom: "20px",
                    border: "none",
                    boxShadow: "none",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Flat Allotment Details
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      >
                        <InputLabel>Project Name</InputLabel>
                        <Select
                          value={selectedProject}
                          onChange={handleProjectChange}
                          label="Project Name"
                          sx={{
                            "& .MuiSelect-icon": {
                              color: Constants.primaryColor,
                            },
                          }}
                        >
                          {projects.map((project, index) => (
                            <MenuItem key={index} value={project}>
                              {project}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      >
                        <InputLabel>Name</InputLabel>
                        <Select
                          value={selectedLandowner}
                          onChange={handleLandownerChange}
                          label="Name"
                          disabled={!selectedProject}
                          sx={{
                            "& .MuiSelect-icon": {
                              color: Constants.primaryColor,
                            },
                          }}
                        >
                          {selectedProject &&
                            landowners[selectedProject]?.map(
                              (landowner, index) => (
                                <MenuItem key={index} value={landowner.name}>
                                  {landowner.name}
                                </MenuItem>
                              )
                            )}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="Mobile No"
                        fullWidth
                        variant="outlined"
                        value={mobileNo}
                        onChange={(e) => {
                          const value = e.target.value;
                          setMobileNo(value);

                          if (/[^0-9]/.test(value)) {
                            setMobileError(
                              "Mobile number should only contain digits."
                            );
                          } else if (value.length > 10) {
                            setMobileError(
                              "Mobile number cannot exceed 10 digits."
                            );
                          } else {
                            setMobileError("");
                          }
                        }}
                        error={!!mobileError}
                        helperText={mobileError}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        label="No. of Flats Allotted"
                        fullWidth
                        variant="outlined"
                        type="number"
                        value={noOfFlats}
                        onChange={(e) => {
                          const value = Math.max(
                            0,
                            parseInt(e.target.value, 10) || 0
                          );
                          setNoOfFlats(value);
                          generateTableRows(value);
                        }}
                        size={isMobile ? "small" : "medium"}
                        inputProps={{ min: 0 }}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  </Grid>

                  {/* {tableRows.length > 0 && (
                    <div className="mt-4">
                      <Typography variant="h6" gutterBottom>
                        Flat Details
                      </Typography>
                      <TableContainer
                        component={Paper}
                        style={{ overflowX: "auto" }}
                        sx={{ border: Constants.formInputBorderColor }}
                      >
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>RERA Carpet Area (SQ FT)</TableCell>
                              <TableCell>Wing</TableCell>
                              <TableCell>Flat No</TableCell>
                              <TableCell>Type of Flat</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {tableRows.map((row, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  <FormControl
                                    fullWidth
                                    size={isMobile ? "small" : "medium"}
                                  >
                                    <InputLabel>RERA Carpet Area</InputLabel>
                                    <Select
                                      value={row.area}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "area",
                                          e.target.value
                                        )
                                      }
                                      label="RERA Carpet Area"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="500-600">
                                        500-600 SQ FT
                                      </MenuItem>
                                      <MenuItem value="600-700">
                                        600-700 SQ FT
                                      </MenuItem>
                                      <MenuItem value="700-800">
                                        700-800 SQ FT
                                      </MenuItem>
                                      <MenuItem value="800-900">
                                        800-900 SQ FT
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <FormControl
                                    fullWidth
                                    size={isMobile ? "small" : "medium"}
                                  >
                                    <InputLabel>Wing</InputLabel>
                                    <Select
                                      value={row.wing}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "wing",
                                          e.target.value
                                        )
                                      }
                                      label="Wing"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="A">Wing A</MenuItem>
                                      <MenuItem value="B">Wing B</MenuItem>
                                      <MenuItem value="C">Wing C</MenuItem>
                                      <MenuItem value="D">Wing D</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <FormControl
                                    fullWidth
                                    size={isMobile ? "small" : "medium"}
                                  >
                                    <InputLabel>Flat No</InputLabel>
                                    <Select
                                      value={row.flatNo}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "flatNo",
                                          e.target.value
                                        )
                                      }
                                      label="Flat No"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="101">101</MenuItem>
                                      <MenuItem value="201">201</MenuItem>
                                      <MenuItem value="301">301</MenuItem>
                                      <MenuItem value="401">401</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                                <TableCell>
                                  <FormControl
                                    fullWidth
                                    size={isMobile ? "small" : "medium"}
                                  >
                                    <InputLabel>Type of Flat</InputLabel>
                                    <Select
                                      value={row.flatType}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "flatType",
                                          e.target.value
                                        )
                                      }
                                      label="Type of Flat"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="1BHK">1 BHK</MenuItem>

                                      <MenuItem value="2BHK">2 BHK</MenuItem>

                                      <MenuItem value="3BHK">3 BHK</MenuItem>

                                      <MenuItem value="4BHK">4 BHK</MenuItem>
                                    </Select>
                                  </FormControl>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  )} */}
                  {tableRows.length > 0 && (
                    <div className="mt-4">
                      <Typography variant="h6" gutterBottom>
                        Flat Details
                      </Typography>

                      {isMobile ? (
                        // Mobile View: Vertical Layout
                        <div className="mobile-flat-details">
                          {tableRows.map((row, index) => (
                            <Paper
                              key={index}
                              className="p-3 mb-3"
                              elevation={2}
                              style={{ borderRadius: "8px" }}
                            >
                              <Typography
                                variant="subtitle1"
                                gutterBottom
                                className="fw-bold"
                              >
                                Flat {index + 1}
                              </Typography>

                              <Grid container spacing={2}>
                                {/* RERA Carpet Area */}
                                <Grid item xs={12}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    sx={{
                                      border: Constants.formInputBorderColor,
                                    }}
                                  >
                                    <InputLabel>
                                      RERA Carpet Area (SQ FT)
                                    </InputLabel>
                                    <Select
                                      value={row.area}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "area",
                                          e.target.value
                                        )
                                      }
                                      label="RERA Carpet Area (SQ FT)"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="500-600">
                                        500-600 SQ FT
                                      </MenuItem>
                                      <MenuItem value="600-700">
                                        600-700 SQ FT
                                      </MenuItem>
                                      <MenuItem value="700-800">
                                        700-800 SQ FT
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                {/* Wing */}
                                <Grid item xs={12}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    sx={{
                                      border: Constants.formInputBorderColor,
                                    }}
                                  >
                                    <InputLabel>Wing</InputLabel>
                                    <Select
                                      value={row.wing}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "wing",
                                          e.target.value
                                        )
                                      }
                                      label="Wing"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="A">Wing A</MenuItem>
                                      <MenuItem value="B">Wing B</MenuItem>
                                      <MenuItem value="C">Wing C</MenuItem>
                                      <MenuItem value="D">Wing D</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                {/* Flat No */}
                                <Grid item xs={12}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    sx={{
                                      border: Constants.formInputBorderColor,
                                    }}
                                  >
                                    <InputLabel>Flat No</InputLabel>
                                    <Select
                                      value={row.flatNo}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "flatNo",
                                          e.target.value
                                        )
                                      }
                                      label="Flat No"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="101">101</MenuItem>
                                      <MenuItem value="102">102</MenuItem>
                                      <MenuItem value="103">103</MenuItem>
                                      <MenuItem value="104">104</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>

                                {/* Type of Flat */}
                                <Grid item xs={12}>
                                  <FormControl
                                    fullWidth
                                    size="small"
                                    sx={{
                                      border: Constants.formInputBorderColor,
                                    }}
                                  >
                                    <InputLabel>Type of Flat</InputLabel>
                                    <Select
                                      value={row.flatType}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "flatType",
                                          e.target.value
                                        )
                                      }
                                      label="Type of Flat"
                                      sx={{
                                        "& .MuiSelect-icon": {
                                          color: Constants.primaryColor,
                                        },
                                      }}
                                    >
                                      <MenuItem value="1BHK">1 BHK</MenuItem>
                                      <MenuItem value="2BHK">2 BHK</MenuItem>
                                      <MenuItem value="3BHK">3 BHK</MenuItem>
                                      <MenuItem value="4BHK">4 BHK</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Paper>
                          ))}
                        </div>
                      ) : (
                        // Desktop/Tablet View: Table Layout
                        <TableContainer
                          component={Paper}
                          style={{ overflowX: "auto" }}
                          sx={{ border: Constants.formInputBorderColor }}
                        >
                          <Table>
                            <TableHead>
                              <TableRow>
                                <TableCell>RERA Carpet Area (SQ FT)</TableCell>
                                <TableCell>Wing</TableCell>
                                <TableCell>Flat No</TableCell>
                                <TableCell>Type of Flat</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {tableRows.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    <FormControl fullWidth size="medium">
                                      <InputLabel>RERA Carpet Area</InputLabel>
                                      <Select
                                        value={row.area}
                                        onChange={(e) =>
                                          handleRowChange(
                                            index,
                                            "area",
                                            e.target.value
                                          )
                                        }
                                        label="RERA Carpet Area"
                                        sx={{
                                          "& .MuiSelect-icon": {
                                            color: Constants.primaryColor,
                                          },
                                        }}
                                      >
                                        <MenuItem value="500-600">
                                          500-600 SQ FT
                                        </MenuItem>
                                        <MenuItem value="600-700">
                                          600-700 SQ FT
                                        </MenuItem>
                                        <MenuItem value="700-800">
                                          700-800 SQ FT
                                        </MenuItem>
                                        <MenuItem value="800-900">
                                          800-900 SQ FT
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <FormControl fullWidth size="medium">
                                      <InputLabel>Wing</InputLabel>
                                      <Select
                                        value={row.wing}
                                        onChange={(e) =>
                                          handleRowChange(
                                            index,
                                            "wing",
                                            e.target.value
                                          )
                                        }
                                        label="Wing"
                                        sx={{
                                          "& .MuiSelect-icon": {
                                            color: Constants.primaryColor,
                                          },
                                        }}
                                      >
                                        <MenuItem value="A">Wing A</MenuItem>
                                        <MenuItem value="B">Wing B</MenuItem>
                                        <MenuItem value="C">Wing C</MenuItem>
                                        <MenuItem value="D">Wing D</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <FormControl fullWidth size="medium">
                                      <InputLabel>Flat No</InputLabel>
                                      <Select
                                        value={row.flatNo}
                                        onChange={(e) =>
                                          handleRowChange(
                                            index,
                                            "flatNo",
                                            e.target.value
                                          )
                                        }
                                        label="Flat No"
                                        sx={{
                                          "& .MuiSelect-icon": {
                                            color: Constants.primaryColor,
                                          },
                                        }}
                                      >
                                        <MenuItem value="101">101</MenuItem>
                                        <MenuItem value="102">102</MenuItem>
                                        <MenuItem value="103">103</MenuItem>
                                        <MenuItem value="104">104</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                  <TableCell>
                                    <FormControl fullWidth size="medium">
                                      <InputLabel>Type of Flat</InputLabel>
                                      <Select
                                        value={row.flatType}
                                        onChange={(e) =>
                                          handleRowChange(
                                            index,
                                            "flatType",
                                            e.target.value
                                          )
                                        }
                                        label="Type of Flat"
                                        sx={{
                                          "& .MuiSelect-icon": {
                                            color: Constants.primaryColor,
                                          },
                                        }}
                                      >
                                        <MenuItem value="1BHK">1 BHK</MenuItem>
                                        <MenuItem value="2BHK">2 BHK</MenuItem>
                                        <MenuItem value="3BHK">3 BHK</MenuItem>
                                        <MenuItem value="4BHK">4 BHK</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )}
                    </div>
                  )}
                </Paper>
              </div>
            </DialogContent>{" "}
            <DialogActions>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setFlatDialogOpen(false);
                  resetFlatAllotmentForm();
                }}
                size={isMobile ? "small" : "medium"}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isEditingFlat
                    ? handleUpdateFlatAllotment
                    : handleFlatAllotmentSubmit
                }
                size={isMobile ? "small" : "medium"}
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                {isEditingFlat ? "Update" : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteConfirmOpenAllotment}
            onClose={handleDeleteCancelAllotment}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete the flat allotment record for{" "}
                {itemToDeleteAllotment?.landownerName} (Project:{" "}
                {itemToDeleteAllotment?.projectName})?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteCancelAllotment} color="primary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirmAllotment}
                color="error"
                variant="contained"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      <Dialog
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div className="d-flex justify-content-between align-items-center">
            <span>Document View</span>
            <IconButton onClick={() => setDocumentDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          {viewDocument && (
            <iframe
              src={viewDocument.url}
              title="Document Viewer"
              width="100%"
              height="500px"
              frameBorder="0"
            />
          )}
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default BasicInfo;
