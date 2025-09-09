import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from "react";
import {  FaProjectDiagram, FaUserTie, FaHome, } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable"; 
import { GetApp as GetAppIcon } from '@mui/icons-material';
import { PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';
import html2canvas from "html2canvas";
import Constants from '../Constants';
const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const sections = [
  { label: "Firm Display", icon: <FaProjectDiagram size={20} />, createLabel: "Create Firm" },
  { label: "Project Display", icon: <FaHome size={20} />, createLabel: "Create Project" },
  { label: "Landowner Display", icon: <FaUserTie size={20} />, createLabel: "Create Landowner Info" },
  { label: "Landowner Flat Allotement Display", icon: <FaBuilding size={20} />, createLabel: "Create Flat Allotment Info" },
  ];
const tabNames = [ "firm", "display", "landowner","allotement"]; 
  const BasicInfo = () => {
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0); 
  const [showFirmForm, setShowFirmForm] = useState(false);
  
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
  const[  firmgstno, setFirmGstNo] = useState("");
  const [firmName, setFirmName] = useState("");
  const [firmNameError, setFirmNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState('');
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

 // Initialize as an empty array
const projects = ["Project A", "Project B", "Project C"];
const landowners = {
  "Project A": [{ name: "John Doe", mobile: "9876543210", flats: 2 }],
  "Project B": [{ name: "Jane Smith", mobile: "8765432109", flats: 3 }],
  "Project C": [{ name: "Mike Johnson", mobile: "7654321098", flats: 1 }]
};
const handleProjectChange = (event) => {
  setSelectedProject(event.target.value);
  setSelectedLandowner("");
  setMobileNo("");
  setNoOfFlats(0);
  setTableRows([]);
};

// Handles landowner selection and auto-fills data
const handleLandownerChange = (event) => {
  const landowner = landowners[selectedProject].find(l => l.name === event.target.value);
  setSelectedLandowner(event.target.value);
  setMobileNo(landowner?.mobile || "");
  setNoOfFlats(landowner?.flats || 0);
  generateTableRows(landowner?.flats || 0);
};

// Generates rows dynamically based on No. of Flats Allotted
const generateTableRows = (num) => {
  setTableRows(new Array(num).fill({
    area: "",
    wing: "",
    flatNo: "",
    flatType: ""
  }));
};

// Handles changes in the dropdown fields inside the table
const handleRowChange = (index, field, value) => {
  const updatedRows = [...tableRows];
  updatedRows[index][field] = value;
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
    const newFiles = Array.from(event.target.files).map(file => file.name);
  
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

      // Set selected tab dynamically based on the section clicked
  if (sections[index].label === "Project Display") {
    setSelectedTab("display");
  } else if (sections[index].label === "Firm Display") {
    setSelectedTab("firm");
  } else if (sections[index].label === "Landowner Display") {
    setSelectedTab("landowner");
  } else if (sections[index].label === "Landowner Flat Allotement Display") {
    setSelectedTab("allotement");
  }
   setShowFirmForm(false);
    setShowProjectForm(false); 
    setShowLandownerForm(false); 
     setShowFlatForm(false);
  };

  const [newPhase, setNewPhase] = useState({
    phaseNo: '',
    wingNo: '',
    mahareraNo: ''
  });

  const pdfRef = useRef(); 
 
   {selectedTab === "firm" && <FirmTable />}
   {selectedTab === "display" && <DisplayTable />}
   {selectedTab === "landowner" && <LandownerTable />}
   {selectedTab === "allotement" && <FlatAllotement/>}

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
        "Timestamp", "Project Name", "Name", "Mobile No", 
        "No of Flats Allotted", "RERA Carpet Area", "Wing", "Flat No", "Type of Flat"
      ];
      const data = [
        timestamp, projectName, name, mobileNo, 
        flatsAlloted, reraCarpetArea, wing, flatNo, typeOfFlat
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
        "Timestamp", "Firm Name", "Firm Address", "Firm PAN No",
        "Firm GST No", "Residential Address", "PAN No", "Aadhaar No",
        "Photo", "Light Bill"
      ];
    
      const tableRows = loans.map(row => [
        row.timestamp || "-",
        row.name || "-",
        row.address || "-",
        row.firmPanNo || "-",
        row.firmGstNo || "-",
        row.residentialAddress || "-",
        row.panNo || "-",
        row.aadhaarNo || "-",
        row.photo || "-",
        row.lightBill || "-"
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
    
    const handleDownloadPDFProject = () => {
      if (!displayref.current) {
        console.error("DisplayTable ref is not available.");
        return;
      }
      console.log("Loans data before mapping:", loans); 
    
      const doc = new jsPDF("landscape");
      doc.setFontSize(14);
      doc.text("Project Display Report", 14, 15);
    
      const tableColumn = [
        "Timestamp", "Firm Name", "Project Name", "Project Address",
        "Old Survey No", "New Survey No", "Village", "Taluka",
        "District", "Sanction Authority", "East", "West",
        "North", "South", "Latitude", "Longitude",
        "Landmark", "Phase No", "Wing No", "MahaRERA No"
      ];
    
      const tableRows = loans.map(row => [
        row.timestamp || "-",
        row.firmName || "-",
        row.projectName || "-",
        row.projectAddress || "-",
        row.oldSurveyNo || "-",
        row.newSurveyNo || "-",
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
        row.mahareraNo || "-"
      ]);
    
      console.log("Formatted Table Rows:", tableRows);
    
      
    
      autoTable(doc, {
        startY: 25,
        head: [tableColumn],
        body: tableRows,
        margin: { top: 20 },
        styles: { overflow: 'linebreak' },
        didDrawPage: (data) => {
          doc.text("Project Display Report", 14, 10);
        }
      });
      doc.save("Project_Display_Report.pdf");
     
    };
    

    const landowner_pdf =useRef();


    const handleDownloadPDFLandowner = () => {
      if (!landowner_pdf.current) {
        console.error("LandownerTable ref is not available.");
        return;
      }
    
      console.log("Project Data:", projectData);
    
      
    
      const doc = new jsPDF("landscape");
      doc.setFontSize(14);
      doc.text("Landowner Display Report", 14, 15);
    
      // ✅ Columns that match the actual data
      const tableColumn = [
        "Timestamp", "Project Name", "Landowner Name", "Age", "Occupation",
        "Mobile No", "Mail ID", "Village", "Taluka", "District",
        "Bank Name", "Bank Address", "Account No.", "IFSC Code"
      ];
    
      // ✅ Ensure column mapping is correct
      const tableRows = projectData.map(row => [
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
        row.ifscCode || "-"
      ]);
    
      console.log("Formatted Table Rows:", tableRows); // Debugging
    
      autoTable(doc, {
        startY: 25,
        head: [tableColumn],
        body: tableRows,
        margin: { top: 20 },
        styles: { overflow: 'linebreak' },
        didDrawPage: (data) => {
          doc.text("Landowner Display Report", 14, 10);
        }
      });
    
      // ✅ Save the PDF
      doc.save("Landowner_Display_Report.pdf");
    };


    const allotement_pdf = useRef();
    
    const handleDownloadPDFAllotement = () => {
      if (!allotement_pdf.current) {
          console.error("LandownerTable ref is not available.");
          return;
      }
  
      console.log("Project Data:", projectData);
  
      const doc = new jsPDF("landscape");
      doc.setFontSize(14);
     
      const tableColumn = [
          "Timestamp", 
          "Project Name", 
          "Flat Allottee Name", 
          "Mobile No.", 
          "No. of Flats Allotted", 
          "RERA Carpet Area (SQ FT)", 
          "Wing", 
          "Flat No.", 
          "Type of Flat"
      ];
  
      // ✅ Mapping data correctly to the new columns
      const tableRows = projectData.map(row => [
          row.timestamp || "-",
          row.projectName || "-",
          row.flatAllotteeName || "-",  
          row.mobileNo || "-",
          row.noOfFlatsAllotted || "-", 
          row.reraCarpetArea || "-",    
          row.wing || "-",
          row.flatNo || "-",
          row.typeOfFlat || "-"         
      ]);
  
      console.log("Formatted Table Rows:", tableRows); 
  
      autoTable(doc, {
          startY: 25,
          head: [tableColumn],
          body: tableRows,
          margin: { top: 20 },
          styles: { overflow: 'linebreak' },
          didDrawPage: (data) => {
              doc.text("Flat Allotment Display Report", 14, 10);
          }
      });
  
      
      doc.save("flat_allotment_display.pdf");
  };
  
  const handleAddPartner = () => {
    setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
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
      setError('Name should only contain letters and spaces.');
    } else {
      setError('');
    }

    setName(value);
  };

 
  const handleMobileNoChange = (event) => {
    const value = event.target.value;
  

    if (/[^0-9]/.test(value)) {
      setMobileError('Mobile number should only contain digits.');
    } else if (value.length > 10) {
      setMobileError('Mobile number cannot exceed 10 digits.');
    } else {
      setMobileError(''); 
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
  


  
  const handleChange = (e, label) => {
    const { value } = e.target;
  
    setFormValues((prevValues) => ({
      ...prevValues,
      [label.toLowerCase().replace(/ /g, "")]: value,
    }));
  
    if (label === 'Firm Name') {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          firmName: 'Firm Name should only contain letters and spaces',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          firmName: '',
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
  
  const [firmFormData, setFirmFormData] = useState({
  name: '',
  address: '',
  firmPanNo: '',
  firmGstNo: '',
  firmPan: null,
  firmGst: null,
  firmLightBill: null,
  
});


const handleFirmSubmit = () => {
  const timestamp = new Date().toLocaleString(); 

  const newFirm = {
    name: firmName,
    address: firmFormData.address,
    firmPanNo: firmPan,
    firmGstNo: firmFormData.firmGstNo,
    firmPan: firmFormData.firmPan,          
    firmGst: firmFormData.firmGst,           
    firmLightBill: firmFormData.firmLightBill, 
    partners: partners,
    timestamp,
  };

  setFirms((prevFirms) => [...prevFirms, newFirm]);

  toast.success("Details are submitted!", {
    position: "top-right",
    autoClose: 3000,
  });

  // Reset all relevant states
  setFirmFormData({
    name: '',
    address: '',
    firmPanNo: '',
    firmGstNo: '',
    firmPan: null,
    firmGst: null,
    firmLightBill: null,
  });

  setFirmName('');
  setFirmPan('');
  setFirmPanError('');
  setFirmGstNo('');
  setPartners([]);
  setFileNames({});
  setShowFirmForm(false);
  
};



  const handleIfscCodeChange = (e) => {
    const value = e.target.value;
  
    // Regular expression to validate IFSC code format
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
    if (value && !ifscRegex.test(value)) {
      setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
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
  
    // Update the partner's mobile number in the state
    partnerCopy[index] = { ...partnerCopy[index], mobileNo: value };
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



  const validateForm = () => {
 };
  

 
  
  return (
    <div className="main-content">
      <h6>Developer Module / Basic Information Management</h6>
     
   
 
    


      <div className="d-flex align-items-center mb-3">
      
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
      width: expandedSection === index ? "290px" : "50px", 
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      
     
      justifyContent: "center",
      textTransform: "none",
      position: "relative",
      background: Constants.primaryColor, // Gradient background
      boxShadow:
        "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    }}
    onClick={() => handleToggleSection(index)}  // onClick function for handling clicks
  >
    {React.cloneElement(section.icon, { style: { marginRight: '8px',color: 'white' } })}  {/* Add some margin to separate icon from label */}
    
    {/* Conditionally display label based on expandedSection */}
    {expandedSection === index ? (
      <span className="fw-bold text-white p-2 fs-6" style={{ color: 'white', marginLeft: '10px' }}>{section.label}</span>
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
    <div className="d-flex gap-3">  
  <Button 
    variant="contained" 
    color="primary" 
    style={{ background: Constants.primaryColor }} 
    className="fw-bold"
    onClick={() => setShowFirmForm(true)}
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
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  
      gap: "8px",  
      "&:hover": {
        background: Constants.primaryColor,
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFFirm}
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
        <div ref={pdfRef} className="mt-3">
          <FirmTable firms={loans} />
        

          </div>
        </div>
      </>
    ) : (
    <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
    <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Firm Details
      </Typography>

    
      <Grid container spacing={2}>
  <Grid item xs={6}>
    <TextField
      label="Firm Name"
      fullWidth
      variant="outlined"
      value={firmName}
      onChange={handleFirmNameChange} 
      error={!!firmNameError} 
      helperText={firmNameError} 
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      label="Firm Address"
      fullWidth
      variant="outlined"
      value={firmFormData.address}
  onChange={(e) => setFirmFormData({ ...firmFormData, address: e.target.value })}

    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Firm PAN No"
      fullWidth
      variant="outlined"
      value={firmPan}
            onChange={handleFirmPanChange}
            error={!!firmPanError}  
            helperText={firmPanError}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      label="Firm GST No"
      fullWidth
      variant="outlined"
       value={firmFormData.firmGstNo}
  onChange={(e) => setFirmFormData({ ...firmFormData, firmGstNo: e.target.value })}
    />
  </Grid>
</Grid>


   

<Grid container spacing={2}>
  {[{ label: "Firm PAN No Document", key: "firmPanNoDocument" },
    { label: "Firm GST No Document", key: "firmGstNoDocument" },
    { label: "Firm Light Bill for Address Proof Document", key: "firmLightBillForAddressProof" }]
    .map((item, index) => (
      <Grid item xs={6} key={index}>
        <Typography variant="body2" gutterBottom style={{ paddingTop: "16px" }}>
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
          <Button variant="contained" color="light" component="span">
            Choose File
          </Button>
        </label>

        
 {fileNames[item.key] && (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" , whiteSpace: "pre-line" }}>
            
            {fileNames[item.key].join('\n')}
          </Typography>
        )} 
  
      </Grid>
    ))}
</Grid>

      <Typography variant="h5" className="mt-4" gutterBottom>
        Partner Details
      </Typography>





{partners.map((partner, index) => (
  <Paper key={index} className="p-3 mb-3" elevation={2} style={{ borderRadius: "10px" }}>
    <Grid container spacing={2}>
      {["Name", "Age", "Occupation", "Mobile No.", "Mail ID", "Residential Address", "PAN No.", "Aadhaar No.",
        "Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"]
        .map((label, i) => (
          <Grid item xs={6} key={i}>
            {/* Check if the label is one of the document fields to show file input */}
            {["Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"].includes(label) ? (
              <>
                <Typography variant="body2" gutterBottom>{label}</Typography>
                <label>
                  <Input
                    type="file"
                    style={{ display: "none" }} 
                    id={`file-input-${label}`} 
                    onChange={(e) => handleFileChange(e, label)} 
                  />
                  <Button variant="contained" color="light" component="span">
                    Choose File
                  </Button>
                </label>
                {/* Display selected file name */}
                {fileNames[label] && (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" , whiteSpace: "pre-line" }}>
                    {fileNames[label].join('\n')}
                  </Typography>
                )}
              </>
            ) : (
              <TextField
                label={label}
                fullWidth
                variant="outlined"
                type={label === "Age" ? "text" : "text"} 
                value={partner[label.toLowerCase().replace(/ /g, "")]} 
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
                      handleAadhaarChange(e, index); 
                    } else {
                      setAadhaarError(true); 
                      setAadhaarErrorMessage("Aadhaar number should be exactly 12 digits.");
                    }
                  }
                }}
                error={ 
                  (label === "Name" && !!nameError) ||
                  (label === "Mobile No." && !!mobileError) ||
                  (label === "Mail ID" && !!emailError) ||
                  (label === "PAN No." && !!panError) ||
                  (label === "Age" && !!ageError) ||
                  (label === "Occupation" && !!occupationError)  || // Check for Occupation error
                  (label === "Aadhaar No." && aadhaarError)
                }
                helperText={ 
                  (label === "Name" && nameError) ||
                  (label === "Mobile No." && mobileError) ||
                  (label === "Mail ID" && emailError) ||
                  (label === "PAN No." && panError) ||
                  (label === "Age" && ageError) ||
                  (label === "Occupation" && occupationError)  || // Show Occupation error
                  (label === "Aadhaar No." && aadhaarError && aadhaarErrorMessage)
                }
              />
            )}
          </Grid>
        ))}
    </Grid>
  </Paper>
))}


      <Button className="m-3 m-2" variant="contained" color="primary" onClick={() => setPartners([...partners, {}])}>
        <FaPlus /> Add Partner
      </Button>

      
<Button
  variant="contained"
  sx={{
    backgroundColor: 'red', 
    '&:hover': {
      backgroundColor: '#d32f2f', 
    }
  }}
  onClick={handleRemovePartner} 
  className="m-2"
>
  Remove Partner
</Button>

  
      <Button
  variant="contained"
  className="m-3"
  color="success"
  onClick={handleFirmSubmit}
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
      
<div className='button-container'>
  <div className='d-flex gap-3'>
  <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} className='fw-bold'
onClick={() => {
   console.log("Before:", showProjectForm);
   setShowProjectForm(true);
   console.log("After:", showProjectForm);
}}>
+ Create Project
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
      alignItems: "center",  
      gap: "8px",  
      "&:hover": {
        background:Constants.primaryColor,
      },
    }}
    onClick={() => {
      console.log("Download PDF button clicked");
      handleDownloadPDFProject();
    }}

  >
    <FaFileDownload size={18} /> 
    Download PDF
  </Button>
  </div>



 <div className="right-buttons">
      <Button variant="contained" color="secondary" onClick={handlePrevious}>
        Previous
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNext}>
        Next
      </Button>
    </div>
    </div>

<div className='mt-3' ref={displayref}>
<DisplayTable data={projectData} />
</div>
   </>
    ) : (
     


      <div
  className="project-form mt-4 p-3"
  style={{
    maxHeight: "500px", 
    overflowY: "auto",
    paddingRight: "10px",
  }}
>
  <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
    <Typography variant="h5" gutterBottom>
      Project Details
    </Typography>

   

<Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Firm Name"
              fullWidth
              variant="outlined"
              value={firmName}
              onChange={handleFirmNameChange} 
              error={!!firmNameError} 
              helperText={firmNameError} 
            />
          </Grid>

          {/* Other fields */}
          {[
            'Project Name',
            'Project Address',
            'Old Survey Number',
            'New Survey Number',
            'Village',
            'Taluka',
            'District',
            'Sanction Authority',
            'East',
            'West',
            'North',
            'South',
            'Latitude',
            'Longitude',
            'Landmark',
          ].map((label, index) => (
            <Grid item xs={6} key={index}>
              <TextField
                label={label}
                fullWidth
                variant="outlined"
                value={formValues[label.toLowerCase().replace(/ /g, '')]} 
                onChange={(e) => handleChange(e, label)} 
              />
            </Grid>
          ))}
        </Grid>
    

    <Typography variant="h5" className="mt-4" gutterBottom>
      Phase Details
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Phase No</TableCell>
            <TableCell>Wing No</TableCell>
            <TableCell>Maharera No</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {phases.map((phase, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  fullWidth
                  value={phase.phaseNo}
                  onChange={(e) =>
                    setPhases(
                      phases.map((p, i) =>
                        i === index ? { ...p, phaseNo: e.target.value } : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={phase.wingNo}
                  onChange={(e) =>
                    setPhases(
                      phases.map((p, i) =>
                        i === index ? { ...p, wingNo: e.target.value } : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  fullWidth
                  value={phase.mahareraNo}
                  onChange={(e) =>
                    setPhases(
                      phases.map((p, i) =>
                        i === index ? { ...p, mahareraNo: e.target.value } : p
                      )
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemovePhase(index)}
                >
                  <FaTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      <Button className="m-2" variant="contained" color="primary" onClick={handleAddPhase}>
        <FaPlus /> Add Row
      </Button>

   
 <Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    setShowFirmForm(false);
    toast.success("details are submitted!", { position: "top-right", autoClose: 3000 });
  }}
>
  Submit
</Button>
  
    </div>
  </Paper>
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

        <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} className='fw-bold'


onClick={() => {
  console.log("Before:", showLandownerForm);
  setShowLandownerForm(true);
  console.log("After:", showLandownerForm);
}}>

+ Create Landowner Info
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
      alignItems: "center",  
      gap: "8px",  
      "&:hover": {
        background: Constants.primaryColor,
      },
    }}
    onClick={handleDownloadPDFLandowner}
    
  >
    <FaFileDownload size={18} />  
    Download PDF
  </Button>
        </div>
      
  
  <div className="right-buttons">
      <Button variant="contained" color="secondary" onClick={handlePrevious}>
        Previous
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNext}>
        Next
      </Button>
    </div>
    </div>
<div className='mt-3' ref={landowner_pdf}>
<LandownerTable data={projectData} />
</div>
</>

    ) : (
      <div
        className="landowner-form mt-4 p-3 border rounded"
       
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          backgroundColor: "#f8f9fa", 
          border: "1px solid #ccc", 
        }}
      >
        <h5>Landowner Details</h5>
        <Grid container spacing={2}>
          {/* <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid> */}
          <Grid item xs={4}>
        {/* <FormControl fullWidth variant="outlined">
          <InputLabel id="project-name-label">Project Name</InputLabel>
          <Select
            labelId="project-name-label"
            id="project-name-select"
            value={selectedProject}
            onChange={handleChange}
            label="Project Name"
          >
            <MenuItem value="Project Name 1">Project Name 1</MenuItem>
            <MenuItem value="Project Name 121">Project Name 121</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
            <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
            <MenuItem value="Sohan Enterprised">Sohan Enterprised</MenuItem>
          </Select>
        </FormControl> */}
         <FormControl fullWidth variant="outlined">
          <InputLabel id="project-name-label">Project Name</InputLabel>
          <Select
            labelId="project-name-label"
            id="project-name-select"
            value={selectedProject}
            // onChange={handleChange}
            onChange={handleProjectChange}
            label="Project Name"
          >
            <MenuItem value="Project Name 1">Project Name 1</MenuItem>
            <MenuItem value="Project Name 121">Project Name 121</MenuItem>
            <MenuItem value="11">11</MenuItem>
            <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
            <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
            <MenuItem value="Sohan Enterprised">Sohan Enterprised</MenuItem>
          </Select>
        </FormControl>
      </Grid>
          
                <Grid item xs={4}>
      <TextField
        label="Mobile No."
        fullWidth
        value={mobileNo}
        onChange={handleMobileNoChange}
        error={!!mobileError} 
        helperText={mobileError} 
      />
    </Grid>


          <Grid item xs={4}><TextField label="Landowner Name" fullWidth value={name} onChange={handleNameChange}
           error={!!error} 
           helperText={error}
          /></Grid>
          <Grid item xs={4}><TextField type="number" label="Age" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
         

          
<Grid item xs={4}>
  <TextField
    label="Mail ID"
    fullWidth
   
    onChange={handleEmailChange} 
    error={!!emailError} 
    helperText={emailError} 
  />
</Grid>


          <Grid item xs={4}><TextField label="Village" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="District" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Taluka" fullWidth /></Grid>
        
          <Grid item xs={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="bank-name-label">Name of Bank</InputLabel>
          <Select
            labelId="bank-name-label"
            id="bank-name-select"
            value={selectedBank}
            onChange={handleBankChange}
            label="Name of Bank"
          >
            <MenuItem value="SBI Bank">SBI Bank</MenuItem>
            <MenuItem value="Bank Of Baroda">Bank Of Baroda</MenuItem>
            <MenuItem value="Canara Bank">Canara Bank</MenuItem>
            <MenuItem value="Axis Bank">Axis Bank</MenuItem>
            <MenuItem value="Bank of India">Bank of India</MenuItem>
            <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
            <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
            <MenuItem value="Bank of Maharashtra">Bank of Maharashtra</MenuItem>
            <MenuItem value="Central Bank of India">Central Bank of India</MenuItem>
            <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
            <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
            <MenuItem value="Indian Bank">Indian Bank</MenuItem>
            <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
          </Select>
        </FormControl>
      </Grid>
          <Grid item xs={4}><TextField label="Bank Address" fullWidth /></Grid>
          
          {/* <Grid item xs={4}><TextField label="Account No." fullWidth /></Grid> */}
          <Grid item xs={4}>
  <TextField
    label="Account No."
    fullWidth
    value={accountNo} // Bind the value of the account number state
    onChange={handleAccountNoChange} // Trigger onChange handler
    error={!!accountNoError} // Show error if there's an accountNoError
    helperText={accountNoError} // Display error message if any
  />
</Grid>

   
    <Grid item xs={4}>
  <TextField
    label="IFSC Code"
    fullWidth
    value={ifscCode} 
    onChange={handleIfscCodeChange} 
    error={!!ifscCodeError} 
    helperText={ifscCodeError} 
  />
</Grid>

 
<Grid item xs={4}>
  <Typography variant="body2" gutterBottom>
    Aadhaar No.
  </Typography>

  <label>
    <Input
      type="file"
      style={{ display: "none" }}
      id="file-input-aadhaar"
      multiple  // ✅ Allow multiple file selection
      onChange={(e) => handleFileChange(e, "aadhaarFile")} // ✅ Correct key
    />
    
    <Button
      variant="contained"
      color="light"
      component="span"
    >
      Choose Files
    </Button>
  </label>

  {Array.isArray(fileNames.aadhaarFile) && fileNames.aadhaarFile.length > 0 && (
    <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
      {fileNames.aadhaarFile.map((file, index) => (
        <div key={index}>{file}</div> // ✅ Keeps adding new files
      ))}
    </Typography>
  )}
</Grid>

          <Grid item xs={4}>
            <Typography variant="body2" gutterBottom>
            Photo
            </Typography>
            <label>
              <Input
                type="file"
                accept="image/*"
                style={{ display: "none" }} // Hide the default input
                id="file-input-image" // Unique ID for the file input
                onChange={(e) => handleFileChange(e, "imageFile")} // Handle file selection
              />
              <Button
                variant="contained"
                color="light"
                component="span"
              >
                Choose File
              </Button>
            </label>
            {fileNames.imageFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.imageFile} 
              </Typography>
            )}
          </Grid>


          <Grid item xs={4} sx={{ marginTop: "6px"}}>
            <Typography variant="body2" gutterBottom>
              Residential Address
            </Typography>
            <label>
              <Input
                type="file"
                style={{ display: "none" }}
                id="file-input-address"
                onChange={(e) => handleFileChange(e, "addressFile")}
              />
              <Button
                variant="contained"
                color="light"
                component="span"
                // onClick={() => document.getElementById("file-input-address").click()}
              >
                Choose File
              </Button>
            </label>
            {fileNames.addressFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.addressFile}
              </Typography>
            )}
          </Grid>

          {/* PAN No. File Upload */}
          <Grid item xs={4} sx={{ marginTop: "6px"}}>
            <Typography variant="body2" gutterBottom>
              PAN No.
            </Typography>
            <label>
              <Input
                type="file"
                style={{ display: "none" }}
                id="file-input-pan"
                onChange={(e) => handleFileChange(e, "panFile")}
              />
              <Button
                variant="contained"
                color="light"
                component="span"
                // onClick={() => document.getElementById("file-input-pan").click()}
              >
                Choose File
              </Button>
            </label>
            {fileNames.panFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.panFile}
              </Typography>
            )}
          </Grid>

          
          <Grid item xs={4} sx={{ marginTop: "6px"}}>
            <Typography variant="body2" gutterBottom>
              Light Bill
            </Typography>
            <label>
              <Input
                type="file"
                multiple
                style={{ display: "none" }}
                id="file-input-lightbill"
                onChange={(e) => handleFileChange(e, "lightBillFile")}
              />
              <Button
                variant="contained"
                color="light"
                component="span"
                
              >
                Choose File
              </Button>
            </label>
            {fileNames.lightBillFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.lightBillFile}
              </Typography>
            )}
          </Grid>

        
        </Grid>

        

       
        
<Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    setShowFirmForm(false);
    toast.success("details are submitted!", { position: "top-right", autoClose: 3000 });
  }}
>
Submit Landowner Info
</Button>
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
    <Button variant="contained" color="primary" style={{ background: Constants.primaryColor}} className='fw-bold'
    onClick={() => setShowFlatForm(true)}>
      + Flat Allotment Info
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
    onClick={handleDownloadPDFAllotement}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
  </div>

    <div className="right-buttons">
      <Button variant="contained" color="secondary" onClick={handlePrevious}>
        Previous
      </Button>
      <Button variant="contained" color="secondary" onClick={handleNext}>
        Next
      </Button>
    </div>
  </div>


        <div className="mt-3" ref={allotement_pdf}>
          <FlatAllotment data={Flatdata} />
        </div>
      </>
    ) : (

   


<div className="landowner-form mt-4 p-3 border rounded" style={{ backgroundColor: "#f8f9fa", border: "1px solid #ccc"  }}>
      <h5>Flat Allotment Display</h5>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel>Project Name</InputLabel>
            <Select value={selectedProject} onChange={handleProjectChange}>
              {projects.map((proj) => <MenuItem key={proj} value={proj}>{proj}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth disabled={!selectedProject}>
            <InputLabel> Landowner Name</InputLabel>
            <Select value={selectedLandowner} onChange={handleLandownerChange}>
              {selectedProject && landowners[selectedProject]?.map((owner) => (
                <MenuItem key={owner.name} value={owner.name}>{owner.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <TextField label="Mobile No." fullWidth value={mobileNo} disabled />
        </Grid>

        <Grid item xs={4}>
  <TextField
    type="number"
    label="No. of Flats Allotted"
    fullWidth
    value={noOfFlats}
    onChange={(e) => {
      const value = Math.max(1, parseInt(e.target.value, 10) || 0); // Ensure at least 1
      setNoOfFlats(value);
      generateTableRows(value); // Update table rows dynamically
    }}
  />
</Grid>

      </Grid>

      <h4 className="pt-3">Flat Details</h4>
      {/* <TableContainer component={Paper}> */}
      <TableContainer component={Paper} style={{   maxHeight: '400px',overflowY: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main" }}>
              {["RERA CARPET AREA (SQ FT)", "WING", "FLAT NO.", "TYPE OF FLAT"].map((col) => (
                <TableCell key={col} sx={{ color: "white", fontWeight: "bold" }}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>RERA CARPET AREA (SQ FT)</InputLabel>
                    <Select value={row.area} onChange={(e) => handleRowChange(index, "area", e.target.value)}>
                      
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>WING</InputLabel>
                    <Select value={row.wing} onChange={(e) => handleRowChange(index, "wing", e.target.value)}>
                    
                     
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>FLAT NO.</InputLabel>
                    <Select value={row.flatNo} onChange={(e) => handleRowChange(index, "flatNo", e.target.value)}>
                     
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>TYPE OF FLAT</InputLabel>
                    <Select value={row.flatType} onChange={(e) => handleRowChange(index, "flatType", e.target.value)}>
                     
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        className="mt-3"
        color="success"
        onClick={() => {
          toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
        }}
      >
        Submit Flat Allotment Info
      </Button>
    </div>
    )}
  </div>
)}



  </div>
  )
}
   
 


export default BasicInfo;


