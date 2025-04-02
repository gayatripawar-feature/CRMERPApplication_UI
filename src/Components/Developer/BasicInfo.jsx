

import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';

import {  FaProjectDiagram, FaUserTie, FaHome, } from 'react-icons/fa';
import { jsPDF } from "jspdf";

import { GetApp as GetAppIcon } from '@mui/icons-material';
import { PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const sections = [
  { label: "Firm Display", icon: <FaProjectDiagram size={20} />, createLabel: "Create Firm" },
  { label: "Project Display", icon: <FaHome size={20} />, createLabel: "Create Project" },
  { label: "Landowner Display", icon: <FaUserTie size={20} />, createLabel: "Create Landowner Info" },
  { label: "Flat Allotement Display", icon: <FaBuilding size={20} />, createLabel: "Create Flat Allotment Info" },
  { label: "Download PDF", icon: <  PictureAsPdfIcon  size={20} />, createLabel: "" }
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
 const [aadhaarError, setAadhaarError] = useState(false);
const [aadhaarErrorMessage, setAadhaarErrorMessage] = useState("");

  const [accountNo, setAccountNo] = useState(""); // Initialize the account number state
const [accountNoError, setAccountNoError] = useState("");

const [ifscCode, setIfscCode] = useState(""); 
const [ifscCodeError, setIfscCodeError] = useState("");


  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: "",
    firmGstNoDocument: "",
    firmLightBillForAddressProof: "",
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
    const aadhaarRegex = /^[0-9]{12}$/; // Regex to check if it's exactly 12 digits
    return aadhaarRegex.test(aadhaar);
  };
   const handleFileChange = (e, key) => {
    const file = e.target.files[0]; 
    if (file) {
      setFileNames((prevState) => ({
        ...prevState,
        [key]: file.name, // Update the file name for the corresponding key
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

      // Set selected tab dynamically based on the section clicked
  if (sections[index].label === "Project Display") {
    setSelectedTab("display");
  } else if (sections[index].label === "Firm Display") {
    setSelectedTab("firm");
  } else if (sections[index].label === "Landowner Display") {
    setSelectedTab("landowner");
  } else if (sections[index].label === "Flat Allotement Display") {
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

 
    
  const handleAddPartner = () => {
    setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
  };

  
  
  const handleRemovePartner = () => {
    setPartners(partners.slice(0, partners.length - 1)); // Remove the last partner
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
      backgroundColor: '#3621a9', 
      padding: '8px', 
      borderRadius: '20px',  
      margin: '5px',
      cursor: 'pointer',    
      transition: "width 0.3s ease, background 0.3s ease",
      width: expandedSection === index ? "250px" : "50px", 
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
    {/* <div className='d-flex '>
    <Button 
            variant="contained" 
            color="primary" 
            style={{ background: '#272ba8' }} 
            className='fw-bold'
            onClick={() => setShowFirmForm(true)}
          >
            + Create Firm
          </Button>
          <Button className=''
  variant="contained"
  sx={{
    background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
>
  Download PDF
</Button>


    </div> */}

<div className="d-flex gap-3">  {/* Added gap between buttons */}
  <Button 
    variant="contained" 
    color="primary" 
    style={{ background: "#272ba8" }} 
    className="fw-bold"
    onClick={() => setShowFirmForm(true)}
  >
    + Create Firm
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
          <FirmTable firms={loans} />
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
      onChange={handleFirmNameChange} // Handle Firm Name change with validation
      error={!!firmNameError} // Show error state for Firm Name field
      helperText={firmNameError} // Display error message if any
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      label="Firm Address"
      fullWidth
      variant="outlined"
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Firm PAN No"
      fullWidth
      variant="outlined"
      value={firmPan}
            onChange={handleFirmPanChange}
            error={!!firmPanError}  // Show error if there is an error
            helperText={firmPanError}
    />
  </Grid>
  <Grid item xs={6}>
    <TextField
      label="Firm GST No"
      fullWidth
      variant="outlined"
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
            style={{ display: "none" }} // Hide the default input
            id={`file-input-${index}`} // Unique ID for each input
            onChange={(e) => handleFileChange(e, item.key)} // Handle file change
          />
          <Button variant="contained" color="light" component="span">
            Choose File
          </Button>
        </label>

        {/* Display selected file name */}
        {fileNames[item.key] && (
          <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
            {fileNames[item.key]}
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
                    style={{ display: "none" }} // Hide default file input
                    id={`file-input-${label}`} // Unique ID for each file input
                    onChange={(e) => handleFileChange(e, label)} // Handle file change
                  />
                  <Button variant="contained" color="light" component="span">
                    Choose File
                  </Button>
                </label>
                {/* Display selected file name */}
                {fileNames[label] && (
                  <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                    {fileNames[label]}
                  </Typography>
                )}
              </>
            ) : (
              <TextField
                label={label}
                fullWidth
                variant="outlined"
                type={label === "Age" ? "text" : "text"} // Keep text type for simplicity
                value={partner[label.toLowerCase().replace(/ /g, "")]} // Dynamically map to partner data
                onChange={(e) => {
                  if (label === "Age") {
                    handleAgeChange(e, index); // Handle Age change and validation
                  } else if (label === "Occupation") {
                    handleOccupationChange(e, index); // Handle Occupation change
                  } else if (label === "Name") {
                    handlePartnerNameChange(e, index); // Handle Name change
                  } else if (label === "Mobile No.") {
                    handleMobileChange(e, index); // Handle Mobile No. change
                  } else if (label === "Mail ID") {
                    handleEmailChange(e, index); // Handle Mail ID change
                  } else if (label === "PAN No.") {
                    handlePANChange(e, index); // Handle PAN No. change
                  } else if (label === "Aadhaar No.") {
                    const aadhaar = e.target.value;
                    if (validateAadhaar(aadhaar)) {
                      setAadhaarError(false); // Reset error if valid
                      handleAadhaarChange(e, index); // Custom handler for Aadhaar field
                    } else {
                      setAadhaarError(true); // Set error if invalid
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
    backgroundColor: 'red', // Red background
    '&:hover': {
      backgroundColor: '#d32f2f', // Darker red on hover
    }
  }}
  onClick={handleRemovePartner} // Pass the index to remove the partner
  className="m-2"
>
  Remove Partner
</Button>

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
      
<div className='button-container'>
  <div className='d-flex gap-3'>
  <Button variant="contained" color="primary" style={{ background: '#272ba8' }} className='fw-bold'
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

<div className='mt-3'>
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
              onChange={handleFirmNameChange} // Handle Firm Name change with validation
              error={!!firmNameError} // Show error state for Firm Name field
              helperText={firmNameError} // Display error message if any
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
                value={formValues[label.toLowerCase().replace(/ /g, '')]} // Dynamically bind value
                onChange={(e) => handleChange(e, label)} // Handle change for other fields
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

        <Button variant="contained" color="primary" style={{ background: '#272ba8' }} className='fw-bold'
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
<div className='mt-3'>
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
        <FormControl fullWidth variant="outlined">
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
        </FormControl>
      </Grid>
          {/* <Grid item xs={4}><TextField label="Mobile No." fullWidth value={mobileNo}
            onChange={handleMobileChange}
            error={!!mobileError} // Show error state if there is a mobile error
                helperText={mobileError}
                /></Grid> */}


                {/* Mobile No. with Validation */}
                <Grid item xs={4}>
      <TextField
        label="Mobile No."
        fullWidth
        value={mobileNo}
        onChange={handleMobileNoChange}
        error={!!mobileError} // Show error if there is a mobileError
        helperText={mobileError} // Display error message if any
      />
    </Grid>


          <Grid item xs={4}><TextField label="Landowner Name" fullWidth value={name} onChange={handleNameChange}
           error={!!error} // Show error if there is an error message
           helperText={error}
          /></Grid>
          <Grid item xs={4}><TextField type="number" label="Age" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
          {/* <Grid item xs={4}><TextField label="Mail ID" fullWidth   onChange={handleEmailChange}/></Grid> */}

          {/* <Grid item xs={4}>
  <TextField
    label="Mail ID"
    fullWidth
    value={email}
    onChange={(e) => handleEmailChange(e)} // pass the correct index if needed
    error={!!emailError} // Show error if there's an error message
    helperText={emailError} // Display error message if any
  />
</Grid> */}
<Grid item xs={4}>
  <TextField
    label="Mail ID"
    fullWidth
    // Bind the input value to the `email` state
    onChange={handleEmailChange} // Trigger the handleEmailChange function on input change
    error={!!emailError} // Show error if `emailError` is not an empty string
    helperText={emailError} // Display the error message if there is one
  />
</Grid>


          <Grid item xs={4}><TextField label="Village" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="District" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Taluka" fullWidth /></Grid>
          {/* <Grid item xs={4}><TextField label="Name of Bank" fullWidth /></Grid> */}
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

          {/* <Grid item xs={4}><TextField label="IFSC Code" sx={{
      marginTop: "13px",
      
    }} fullWidth /></Grid> */}
    <Grid item xs={4}>
  <TextField
    label="IFSC Code"
    fullWidth
    value={ifscCode} // Bind the state value for the IFSC code
    onChange={handleIfscCodeChange} // Handle change and validation
    error={!!ifscCodeError} // Show error if there's an error
    helperText={ifscCodeError} // Display error message if any
  />
</Grid>

          {/* <Grid item xs={4}><TextField label="Aadhaar No." fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Residential Address" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="PAN No." fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Light Bill" fullWidth /></Grid> */}
          {/* <Grid item xs={4}>
            <TextField type="file" accept="image/*" />
          </Grid> */}

<Grid item xs={4}>
            <Typography variant="body2" gutterBottom>
              Aadhaar No.
            </Typography>
            <label>
              <Input
                type="file"
                style={{ display: "none" }} // Hide the default input
                id="file-input-aadhaar" // Unique ID for the file input
                onChange={(e) => handleFileChange(e, "aadhaarFile")} // Handle file selection
              />
              <Button
                variant="contained"
                color="light"
                component="span"
                // onClick={() => document.getElementById("file-input-aadhaar").click()} // Trigger the file input
              >
                Choose File
              </Button>
            </label>
            {fileNames.aadhaarFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.aadhaarFile} {/* Display the selected file name */}
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
                // onClick={() => document.getElementById("file-input-image").click()} // Trigger the file input
              >
                Choose File
              </Button>
            </label>
            {fileNames.imageFile && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.imageFile} {/* Display the selected file name */}
              </Typography>
            )}
          </Grid>


          {/* Residential Address File Upload */}
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

          {/* Light Bill File Upload */}
          <Grid item xs={4} sx={{ marginTop: "6px"}}>
            <Typography variant="body2" gutterBottom>
              Light Bill
            </Typography>
            <label>
              <Input
                type="file"
                style={{ display: "none" }}
                id="file-input-lightbill"
                onChange={(e) => handleFileChange(e, "lightBillFile")}
              />
              <Button
                variant="contained"
                color="light"
                component="span"
                // onClick={() => document.getElementById("file-input-lightbill").click()}
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

        {/* <h5 className="mt-4">Bank Details</h5> */}
        {/* <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Select a Bank" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Bank Address" fullWidth /></Grid>
          <Grid item xs={4}><TextField label="Account No." fullWidth /></Grid>
          
        </Grid> */}

       
        
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
    <Button variant="contained" color="primary" style={{ background: '#272ba8' }} className='fw-bold'
    onClick={() => setShowFlatForm(true)}>
      + Flat Allotment Info
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


        <div className="mt-3">
          <FlatAllotment data={Flatdata} />
        </div>
      </>
    ) : (
      <div className="landowner-form mt-4 p-3 border rounded" style={{
        backgroundColor: "#f8f9fa", 
        border: "1px solid #ccc", 
      }}>
        <h5>Flat Allotement Display </h5>
        <Grid container spacing={2}>
          <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
          {/* <Grid item xs={4}><TextField label="Name" fullWidth /></Grid> */}
          {/* <Grid item xs={4}>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
        />
      </Grid> */}
        <Grid item xs={4}><TextField label="Landowner Name" fullWidth value={name} onChange={handleNameChange}
           error={!!error} // Show error if there is an error message
           helperText={error}
          /></Grid>
          {/* <Grid item xs={4}><TextField label="Mobile No." fullWidth /></Grid> */}
          {/* <Grid item xs={4}>
        <TextField
          label="Mobile No."
          fullWidth
          value={mobileNo}
          onChange={handleMobileNoChange}
          error={!!mobileNoError}
          helperText={mobileNoError}
        />
      </Grid> */}

<Grid item xs={4}>
      <TextField
        label="Mobile No."
        fullWidth
        value={mobileNo}
        onChange={handleMobileNoChange}
        error={!!mobileError} // Show error if there is a mobileError
        helperText={mobileError} // Display error message if any
      />
    </Grid>

          <Grid item xs={4}><TextField type="number" label="No. of Flats Alloted" fullWidth /></Grid>
        </Grid>
        <h4 className="pt-3">Flat Details</h4>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "primary.main" }}>
                <TableCell  sx={{ color: "white", fontWeight: "bold" }}>RERA CARPET AREA (SQ FT)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" }}>WING</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" }}>FLAT NO.</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" }}> TYPE OF FLAT</TableCell>
              </TableRow>

{/* <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>RERA CARPET AREA</InputLabel>
                <Select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value="500">500 SQ FT</MenuItem>
                  <MenuItem value="1000">1000 SQ FT</MenuItem>
                  <MenuItem value="1500">1500 SQ FT</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>WING</InputLabel>
                <Select
                  name="wing"
                  value={formData.wing}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value="A">A</MenuItem>
                  <MenuItem value="B">B</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>FLAT NO.</InputLabel>
                <Select
                  name="flatNumber"
                  value={formData.flatNumber}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value="101">101</MenuItem>
                  <MenuItem value="102">102</MenuItem>
                  <MenuItem value="103">103</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>TYPE OF FLAT</InputLabel>
                <Select
                  name="flatType"
                  value={formData.flatType}
                  onChange={handleChange}
                  sx={{ color: "white" }}
                >
                  <MenuItem value="2 BHK">2 BHK</MenuItem>
                  <MenuItem value="3 BHK">3 BHK</MenuItem>
                  <MenuItem value="4 BHK">4 BHK</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow> */}
            </TableHead>
            <TableBody>
            {/* <TableRow>
            <TableCell><TextField fullWidth variant="outlined" /></TableCell>
        <TableCell><TextField fullWidth variant="outlined" /></TableCell>
        <TableCell><TextField fullWidth variant="outlined" /></TableCell>
        <TableCell><TextField fullWidth variant="outlined" /></TableCell>
      </TableRow> */}
      <TableRow >
      <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>RERA CARPET AREA (SQ FT)</InputLabel>
                <Select
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  label="RERA CARPET AREA (SQ FT)"
                >
                  <MenuItem value="">RERA CARPET AREA (SQ FT)</MenuItem>
                 
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>WING</InputLabel>
                <Select
                  name="wing"
                  value={formData.wing}
                  onChange={handleChange}
                  label="WING"
                >
                  <MenuItem value="A">Wing</MenuItem>
                
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>FLAT NO.</InputLabel>
                <Select
                  name="flatNumber"
                  value={formData.flatNumber}
                  onChange={handleChange}
                  label="FLAT NO."
                >
                  <MenuItem value="101">Flat No</MenuItem>
                
                </Select>
              </FormControl>
            </TableCell>
            <TableCell sx={{ color: "black", fontWeight: "bold" }}>
              <FormControl fullWidth>
                <InputLabel>TYPE OF FLAT</InputLabel>
                <Select
                  name="flatType"
                  value={formData.flatType}
                  onChange={handleChange}
                  label="TYPE OF FLAT"
                >
                  <MenuItem value="2 BHK">TYPE OF FLAT</MenuItem>
                 
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

       

<Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    setShowFirmForm(false);
    toast.success("details are submitted!", { position: "top-right", autoClose: 3000 });
  }}
>
Submit Flat Allotement Info
</Button>
      </div>
    )}
  </div>
)}



  </div>
  )
}
   
 


export default BasicInfo;


