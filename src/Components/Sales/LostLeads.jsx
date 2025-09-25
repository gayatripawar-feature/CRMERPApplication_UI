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
import autoTable from "jspdf-autotable";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { jsPDF } from "jspdf";
import Lostleadstable from "./Lostleadstable";
import Constants from '../Constants';
const sections = [
    { label: "Pending Follow Up", icon: <FaBuilding size={20} />, createLabel: "Create Firm" },
    
  ];
const tabNames = [ "firm"]; 
const LostLeads = () => {
   const [loans, setLoans] = useState([]);
    const [leadType, setLeadType] = useState("");
    const [assignedTo, setAssignedTo] = useState(""); 
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
    const [ageError, setAgeError] = useState("");
    const [occupationError, setOccupationError] = useState(""); 
  const [remark, setRemark] = useState("");
const [remarkError, setRemarkError] = useState("");
const [closingExecutive, setClosingExecutive] = useState('');
    const [accountNo, setAccountNo] = useState("");
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
      updatedPartners[index].age = value; 
      setPartners(updatedPartners); 
      validateAge(value); 
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
      updatedPartners[index].occupation = value; 
      setPartners(updatedPartners); 
    };
  const [partners, setPartners] = useState([
      { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }
    ]);
     useEffect(() => {
      console.log("Updated Selected Tab:", selectedTab);
      // loadLoansData();
    }, []);
  //  const loadLoansData = async () => {
  //     const data = await fetchLoansData();
  //     setLoans(data);
  //   };
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
    {/* Table Section */}
     {selectedTab === "firm" && <FirmTable />}
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
      
     
      if (/\d/.test(value)) {
        setNameError("Name should only contain letters"); 
      } else {
        setNameError(""); 
      }
  
      partnerCopy[index] = { ...partnerCopy[index], name: value };
      setPartners(partnerCopy);
    };
  const handleLeadNoChange = (e) => {
  const value = e.target.value;

  // Regex to allow only letters and numbers (alphanumeric)
  if (/[^a-zA-Z0-9]/.test(value)) {
    setFirmNameError("Lead No should only contain letters and numbers");
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
   const handleRemarkChange = (e) => {
  const value = e.target.value;

  // Only letters and numbers allowed
  const alphanumericRegex = /^[a-zA-Z0-9\s]*$/;

  if (!alphanumericRegex.test(value)) {
    setRemarkError("Only letters and numbers are allowed");
  } else {
    setRemarkError("");
  }

  setRemark(value);
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
    
     
      
    
      const handleDownloadPDFNew = () => {
        console.log("Loans data before mapping:", loans);
    
        const doc = new jsPDF("landscape");
        doc.setFontSize(14);
        doc.text("Follow-up Report", 14, 15);
    
        // Updated columns as per the request
        const tableColumn = [
            "LAST FOLLOW UP", "STATUS", "REMARK", "NEXT FOLLOW UP", "ASSIGN TO",
            "LEAD NO.", "NAME", "MOBILE NO.", "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME"
        ];
    
        // Map data into table rows
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
    
        doc.save("FollowUP_Report.pdf");
    };
    
    return (
      <div className="main-content">
        <h6>Sales Module / Lost Leads Follow Up Management</h6>
       

        <div className="d-flex align-items-center mb-3">
        
{sections.map((section, index) => (
  <Button
    key={index}
    onClick={() => handleToggleSection(index)}
    variant="outlined"
    color="success"
    className="m-3 fw-bold"
    style={{
      borderRadius: '20px',
      backgroundColor: Constants.primaryColor, // Add background color
      color: 'white', // Set text color to white for better contrast
      // border: '1px solid #3621a9', // Match the border to background
      transition: "background-color 0.3s ease", // Optional: Add a transition effect for the background color
    }}
    startIcon={
      <FaEye
        size={20}
        color={expandedSection === index ? "#fff" : "#28a745"} // Change icon color to white when expanded
      />
    }
  >
    {expandedSection === index ? section.label : null}
  </Button>
))}


      
        </div>
  
        
  
       
  {expandedSection === 0 && selectedTab === "firm" && (
    <div className="content-container mt-2">
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
      background:Constants.primaryColor,
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background:Constants.primaryColor,
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFNew}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>

            </div>
          

          
          
          </div>
  
          <div className="mt-3">
            {/* <FirmTable firms={loans} /> */}
          <Lostleadstable firms={loans} />
          </div>
        </>
      ) : (
     
  
      <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
     


      <Dialog
  open={showFirmForm}      // control with state
  onClose={() => {
    // Prevent closing if required fields are empty
    if (!firmName || !name || !assignedTo || !leadType || !status) {
      toast.error("Please fill all required fields!", { position: "top-right" });
      return;
    }
    setShowFirmForm(false);
  }}
  maxWidth="md"
  fullWidth
>
  <DialogTitle sx={{background:Constants.primaryColor,color:"#fff", display: "flex",
    alignItems: "center",
    justifyContent: "space-between"}}>New Follow Up
      <IconButton
    aria-label="close"
    onClick={() => setShowFirmForm(false)}
    sx={{
      color: "#fff",
    }}
  >
    <CloseIcon />
  </IconButton>
    </DialogTitle>

  <DialogContent dividers>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Lead No"
          fullWidth
          variant="outlined"
          value={firmName}
          onChange={handleLeadNoChange}
          error={!!firmNameError}
          helperText={firmNameError}
          sx={{border:Constants.formInputBorderColor}}
         
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth   sx={{border:Constants.formInputBorderColor}} >
          <InputLabel>Sales Person</InputLabel>
          <Select
            value={closingExecutive}
            onChange={handleClosingExecutiveChange}
            label="Sales Person"
          >
              <MenuItem value="mainsales">Main Sales</MenuItem>
            <MenuItem value="ranjeet">Ranjeet Kamble</MenuItem>
            <MenuItem value="yogita">Yogita Dalvi</MenuItem>
            <MenuItem value="shubhangi">Shubhangi Patil</MenuItem>
            <MenuItem value="ajay">Ajay Kate</MenuItem>
            <MenuItem value="Tester">Tester</MenuItem>
          
          </Select>
         
        </FormControl>
      </Grid>
   
   <Grid item xs={6}>
    <TextField
    label="Remark"
     fullWidth
          variant="outlined"
          value={remark}
          onChange={handleRemarkChange}
          error={!!remarkError}
          helperText={remarkError}
           sx={{border:Constants.formInputBorderColor}}
    >

    </TextField>
   </Grid>
      <Grid item xs={6}>
        <TextField
          label="Name"
          fullWidth
          variant="outlined"
          value={name}
          onChange={handleNameChange}
          error={!!nameError}
          helperText={nameError}
            sx={{border:Constants.formInputBorderColor}}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          type="datetime-local"
          label="Next Follow Up"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
           sx={{border:Constants.formInputBorderColor}}
        />
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth sx={{border:Constants.formInputBorderColor}}>
          <InputLabel>Assign To</InputLabel>
          <Select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            label="Assign To"
          >
            <MenuItem value="mainsales">Main Sales</MenuItem>
            <MenuItem value="ranjeet">Ranjeet Kamble</MenuItem>
            <MenuItem value="yogita">Yogita Dalvi</MenuItem>
            <MenuItem value="shubhangi">Shubhangi Patil</MenuItem>
            <MenuItem value="ajay">Ajay Kate</MenuItem>
            <MenuItem value="Tester">Tester</MenuItem>
          </Select>
        
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth sx={{border:Constants.formInputBorderColor}}>
          <InputLabel>Lead Type</InputLabel>
          <Select value={leadType} onChange={(e) => setLeadType(e.target.value)} label="Lead Type">
            <MenuItem value="Hot">Hot</MenuItem>
            <MenuItem value="Warm">Warm</MenuItem>
            <MenuItem value="Lost">Lost</MenuItem>
            <MenuItem value="Cold">Cold</MenuItem>
          </Select>
   
        </FormControl>
      </Grid>

      <Grid item xs={6}>
        <FormControl fullWidth error={!status} sx={{border:Constants.formInputBorderColor}}>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}
           label="Status"
            >
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Not interested">Not interested</MenuItem>
             <MenuItem value="Callback request">Callback request</MenuItem>
             <MenuItem value="Unreachable">Unreachable</MenuItem>
             <MenuItem value="booked">Booked Property In other Project</MenuItem>
              <MenuItem value="Not Answer">Not Answer</MenuItem>
              <MenuItem value="invalid number">Invalid Number</MenuItem>
          </Select>
         
        </FormControl>
      </Grid>
    </Grid>
  </DialogContent>

  <DialogActions>
    <Button
      variant="contained"
      sx={{background:Constants.primaryColor}}
      onClick={() => {
        // if (!firmName || !name || !assignedTo || !leadType || !status) {
        //   toast.error("Please fill all required fields!", { position: "top-right" });
        //   return;
        // }

        // const newEntry = {
        //   leadNo: firmName,
        //   salesPerson: closingExecutive,
        //   remark,
        //   name,
        //   assignedTo,
        //   leadType,
        //   status,
        // };
           const newEntry = {
  leadNo: firmName || "",
  salesPerson: closingExecutive || "",
  remark: remark || "",
  name: name || "",
  assignedTo: assignedTo?.name || "", // if it's an object
  leadType: leadType || "",
  status: status || "",
};

        setLoans((prev) => [...prev, newEntry]);

        toast.success("Details submitted!", { position: "top-right", autoClose: 3000 });

        setFirmName("");
        setClosingExecutive("");
        setName("");
        setAssignedTo("");
        setLeadType("");
        setStatus("");
  setRemark("");

        setShowFirmForm(false);
      }}
    >
      Submit
    </Button>
    <Button
      onClick={() => setShowFirmForm(false)}
      color="secondary"
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>

    </div>
      
      )}
    </div>
  )}
  
  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
    </div>
    )
  };
     
   
    


export default LostLeads;