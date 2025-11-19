



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

// import Lostleadstable from "./Lostleadstable";
// import LostVisitTable from './LostVisitTable';
// import { jsPDF } from "jspdf";

// import autoTable from "jspdf-autotable";

// const sections = [
//     { label: "Pending Follow Up", icon: <FaBuilding size={20} />, createLabel: "Create Firm" },
    
//   ];
//   const tabNames = [ "firm"]; 

// const SalesLostVisits = () => {


     
//     const [loans, setLoans] = useState([]);
//     const [leadType, setLeadType] = useState("");
//     const [assignedTo, setAssignedTo] = useState(""); 
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
  
//   const [data, setData] = useState([]); 
// const [submittedData, setSubmittedData] = useState([]);

  
//   const dummyData = [
//     {
//       action: "Edit",
//       lastFollowUp: "",
//       status: "",
//       remark: "",
//       nextFollowUp: "",
//       assignTo: "",
//       enquiryNo: "",
//       leadNo: "",
//       name: "",
//       salesExe: "",
//       mobile: "",
//       whatsapp: "",
//       alternateContact: "",
//       email: "",
//       address: "",
//       occupation: "",
//       company: "",
//       interested: "",
//       budget: "",
//       reason: "",
//       reference: "",
//       nameOfCP: "",
//       planningToBuy: "",
//       followupDetails: "",
//     },
//   ];



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
  
    
//      {/* Table Section */}
//      {selectedTab === "firm" && <FirmTable />}
   
  
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
//       setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); // Add default empty phase
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
      
//       // Validate PAN No.
//       const isValidPAN = validatePAN(updatedPartner.pan);
//       if (!isValidPAN) {
//         setPanError("Invalid PAN number format.");
//       } else {
//         setPanError(""); // Clear error if valid
//       }
    
//       // Update partner state
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
  
//       setName(value);
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
    
//     const handleNoChange = (e) => {
//       setFirmName(e.target.value);
//     };
    
//     const handleAccountNoChange = (e) => {
//       const value = e.target.value;
      
//       // Regular expression to check if the value is numeric and has a valid length (e.g., 10-16 digits)
//       const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
    
//       if (value && !accountNoRegex.test(value)) {
//         setAccountNoError("Account number must be between 10 to 16 digits.");
//       } else {
//         setAccountNoError(""); // Clear the error if valid
//       }
    
//       // Update the account number in the state
//       setAccountNo(value);
//     };
  
    
   
//     const validatePAN = (pan) => {
//       const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format: 5 letters, 4 digits, 1 letter
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
  
    
//       if (/\d/.test(value)) {
//         setFirmNameError("Firm Name should only contain letters"); 
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
  
   
//     const [errors, setErrors] = useState({
//       firmName: "",
//     });
    
  
//     const handleChange = (e, label, partnerIndex) => {
//       const { value } = e.target;
    
//       const updatedPartners = [...partners];
//       updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
//       setPartners(updatedPartners);
    
      
//       if (label === 'Firm Name') {
//         // Check if the input contains only letters and spaces
//         if (!/^[A-Za-z\s]*$/.test(value)) {
//           setErrors((prev) => ({
//             ...prev,
//             firmName: 'Firm Name should only contain letters and spaces',
//           }));
//         } else {
//           setErrors((prev) => ({
//             ...prev,
//             firmName: '', // Clear the error if valid
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
    
//       // Regular expression to validate IFSC code format
//       const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    
//       if (value && !ifscRegex.test(value)) {
//         setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
//       } else {
//         setIfscCodeError(""); // Clear the error if valid
//       }
    
//       // Update the IFSC code in the state
//       setIfscCode(value); // Assuming you have a state for the IFSC code
//     };
    
  
//     const handleMobileChange = (e, index) => {
//       const value = e.target.value;
//       const partnerCopy = [...partners];
    
//       // Validate Mobile No. to ensure it doesn't exceed 10 digits
//       if (/[^0-9]/.test(value)) {
//         setMobileError("Mobile number should only contain digits");
//       } else if (value.length > 10) {
//         setMobileError("Mobile number cannot exceed 10 digits");
//       } else {
//         setMobileError(""); // Clear the error if the value is valid
//       }
    
//       // Update the partner's mobile number in the state
//       partnerCopy[index] = { ...partnerCopy[index], mobileNo: value };
//       setPartners(partnerCopy);
//     };
    
//     const handleEmailChange = (e, index) => {
//       const value = e.target.value;
//       const partnerCopy = [...partners];
    
//       // Regular expression to validate Gmail email format
//       // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/i;

//       if (value && !emailRegex.test(value)) {
//         setEmailError("Invalid Gmail address");
//         console.log("invalid email");
//       } else {
//         setEmailError(""); // Clear the error if the value is valid
//       }
    
//       // Update the partner's email in the state
//       partnerCopy[index] = { ...partnerCopy[index], email: value };
//       setPartners(partnerCopy);
//     };
  
  
  
//     const validateForm = () => {
      
//     };
    
//     const handleClosingExecutiveChange = (event) => {
//         setClosingExecutive(event.target.value);
//       };
    
//       const handleDownloadPDFLost = () => {
//         const doc = new jsPDF("landscape", "pt", "a4"); // "pt" for better layout control
      
//         doc.setFontSize(14);
//         doc.text("Lost Visit Report", 40, 30);
      
//         const tableColumn = [
//           "LAST FOLLOW UP", "STATUS", "REMARK", "NEXT FOLLOW UP", "ENQUIRY NO.",
//           "LEAD NO.", "NAME", "SALES EXE.", "MOBILE", "EMAIL", "OCCUPATION", "COMPANY",
//           "INTERESTED", "BUDGET", "REASON", "REFERENCE", "NAME OF CP", "PLANNING TO BUY?", "FOLLOWUP DETAILS"
//         ];
      
//         const tableRows = data.map((item) => [
//           item.lastFollowUp || "-",
//           item.status || "-",
//           item.remark || "-",
//           item.nextFollowUp || "-",
//           item.enquiryNo || "-",
//           item.leadNo || "-",
//           item.name || "-",
//           item.salesExe || "-",
//           item.mobile || "-",
//           item.email || "-",
//           item.occupation || "-",
//           item.company || "-",
//           item.interested || "-",
//           item.budget || "-",
//           item.reason || "-",
//           item.reference || "-",
//           item.nameOfCP || "-",
//           item.planningToBuy || "-",
//           item.followupDetails || "-"
//         ]);
      
//         autoTable(doc, {
//           startY: 40,
//           head: [tableColumn],
//           body: tableRows,
//           margin: { top: 40, bottom: 30 },
//           styles: { fontSize: 8, cellPadding: 3 },
//           headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//           didDrawPage: (data) => {
//             doc.setFontSize(10);
//             doc.text(`Page ${doc.internal.getNumberOfPages()}`, doc.internal.pageSize.getWidth() - 60, 20);
//           },
//         });
      
//         doc.save("Lost_Visit_Report.pdf");
//       };
      

      
      

//     return (
//       <div className="main-content">
//         <h6>Sales Module / Lost Enquiry Follow Up Management</h6>
       
     
   
      
  
  
      
// <div className="d-flex align-items-center mb-3">
//       {sections.map((section, index) => (
//         <Button
//           key={index}
//           onClick={() => handleToggleSection(index)}  // Toggle the section
//           variant="outlined"
//           color="success"
//           className="m-3"
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             backgroundColor: '#3621a9',  // Background color
//             padding: '8px',
//             borderRadius: '20px',  // Border radius
//             margin: '5px',
//             cursor: 'pointer',  // Add pointer cursor for better UX
//             transition: 'width 0.3s ease, background 0.3s ease',
//             width: expandedSection === index ? '200px' : '50px',  // Toggle width based on expanded state
//             minWidth: '50px',
//             overflow: 'hidden',
//             whiteSpace: 'nowrap',
//             fontSize: '14px',
//             justifyContent: 'flex-start',  // Align items to the left
//             textTransform: 'none',
//             position: 'relative',
//             background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', // Gradient background
//             boxShadow:
//               'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
//           }}
//           startIcon={<FaEye size={24} color="white" />}  // Use a white icon with larger size
//         >
//           {/* Show the label only when the section is expanded */}
//           {expandedSection === index && (
//             <span style={{ color: 'white', fontSize: '16px', marginLeft: '8px' }}>
//               {section.label}
//             </span>
//           )}
//         </Button>
//       ))}
//     </div>




  
       
//   {expandedSection === 0 && selectedTab === "firm" && (
//     <div className="content-container mt-3">
//       {!showFirmForm ? (
//         <>
//           <div className='button-container'>
//             <div className='d-flex gap-3'>
//             <Button 
//               variant="contained" 
//               color="primary" 
//               style={{ background: '#272ba8' }} 
//               className='fw-bold'
//               onClick={() => setShowFirmForm(true)}
//             >
//               + New Follow UP
//             </Button>

//             <Button
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
//     onClick={handleDownloadPDFLost}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//             </div>
  
          
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
          

//           {/* <LostVisitTable data={data} /> */}
//           {/* <LostVisitTable data={dummyData} /> */}
//           <LostVisitTable data={submittedData} />

        

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
//         label="Enquiry No."
//         fullWidth
//         variant="outlined"
//         value={firmName}
//         onChange={handleNoChange}   // Calling function
//         error={!!firmNameError}
//         helperText={firmNameError}
//         required 
//       />
//     </Grid>
   
//       <Grid item xs={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="closing-executive-label">Sales Person</InputLabel>
//           <Select
//             labelId="closing-executive-label"
//             id="closing-executive"
//             value={closingExecutive}
//             onChange={handleClosingExecutiveChange}
//             label="Select Sales Person"
//           >
//             {/* Sales Person options */}
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
//     {/* </Grid> */}

  
//     <Grid item xs={6}>
//       <TextField
//         label="Remark"
//         fullWidth
//         variant="outlined"
//         value={firmPan}
//          onChange={(e) => setFirmPan(e.target.value)}
//               // onChange={handleFirmPanChange}
//               // error={!!firmPanError}  // Show error if there is an error
//               // helperText={firmPanError}
//       />
//     </Grid>

//     <Grid item xs={6}>
//       <TextField
//         label="Name"
//         fullWidth
//         variant="outlined"
//         value={name}
//     onChange={handleNameChange}   // using handleNameChange here
//     error={!!nameError}
//     helperText={nameError}
//               required 
//       />
//     </Grid>
   
    
//     <Grid item xs={6}>
//   <TextField
//     type="datetime-local" // Use datetime-local for date and time input
//     label="Next Follow Up"
//     fullWidth
//     variant="outlined"
//     required // Correct way to add required prop
//     InputLabelProps={{
//       shrink: true, // Ensures label is above the input
//     }}
//   />
// </Grid>


//     <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="assign-to-label">Assign To</InputLabel>
//     <Select
//       labelId="assign-to-label"
//       id="assign-to"
//       value={assignedTo} // Manage the state for "Assign To"
//       onChange={(e) => setAssignedTo(e.target.value)} // Update the state with the selected value
//       label="Assign To"
//       required 
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

    


//     <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="lead-type-label ">Lead type</InputLabel>
//     <Select
//       labelId="lead-type-label"
//       id="lead-type"
//       value={leadType}
//       onChange={(e) => setLeadType(e.target.value)} // Update the state with the selected value
//       label="Lead type"
      
//     >
//       <MenuItem value="Hot">Hot</MenuItem>
//       <MenuItem value="Warm">Warm</MenuItem>
//       <MenuItem value="Lost">Lost</MenuItem>
//       <MenuItem value="Cold">Cold</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>



//     <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="status-label">Status</InputLabel>
//     <Select
//       labelId="status-label"
//       id="status"
//       value={status}
//       onChange={(e) => setStatus(e.target.value)} // Update the state with the selected value
//       label="Status"
//     >
//       <MenuItem value="Follow Up">Follow Up</MenuItem>
//       <MenuItem value="Not interested">Not interested</MenuItem>
//       <MenuItem value="Callback Request">Callback Request</MenuItem>
//       <MenuItem value="Unreachable">Unreachable</MenuItem>
//       <MenuItem value="Booked property in other project">Booked property in other project</MenuItem>
//       <MenuItem value="Not Answer">Not Answer</MenuItem>
//       <MenuItem value="Invalid number">Invalid number</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>

//   </Grid>
  
  

  
  
  
  
//         <Button
//           variant="contained"
//           className="m-3"
//           color="success"
//           // onClick={() => {
           
//           //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
            
         
//           //   setShowFirmForm(false); 
//           // }}
//           onClick={() => {
//   const newRecord = {
//     enquiryNo: firmName,
//     closingExecutive,
//     remark: firmPan,
//     name,
//     nextFollowUp: new Date().toISOString(), // replace with actual input value if needed
//     assignedTo,
//     leadType,
//     status
//   };

//   setSubmittedData((prevData) => [...prevData, newRecord]);

//   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//   setShowFirmForm(false);
// }}

//         >
//           Submit
//         </Button>
//       </Paper>
//     </div>
      
//       )}
//     </div>
//   )}
  
  
  
 
  
  
  
  
  
  
  
  
  
  
  
  
//     </div>
//     )
//   };
     
   
    


// export default SalesLostVisits;




import React, { useState, useEffect } from "react";
import {
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
  Typography,
  Box,
} from "@mui/material";
import { FaEye, FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import LostVisitTable from "./LostVisitTable";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from "../Constants";

const sections = [
  {
    label: "Pending Follow Up",
    icon: <FaEye size={20} />,
    createLabel: "Create Firm",
  },
];

const SalesLostVisits = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Main state management
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("firm");
  const [submittedData, setSubmittedData] = useState([]);

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Date filter state
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Follow-up form states
  const [formData, setFormData] = useState({
    enquiryNo: "",
    salesExe: "",
    remark: "",
    name: "",
    nextFollowUp: "",
    assignTo: "",
    leadType: "",
    status: "",
  });

  // Error states
  const [errors, setErrors] = useState({
    name: "",
    enquiryNo: "",
  });

  // Initialize filtered data when submittedData changes
  useEffect(() => {
    setFilteredData(submittedData);
    setCurrentPage(0); // Reset to first page when data changes
  }, [submittedData]);



  // Simplified search handler
const handleSearch = (term) => {
  setSearchTerm(term);

};

  // Handle date filter changes
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };



  const handleClearFilters = () => {
  setFromDate("");
  setToDate("");
  setSearchTerm("");
  setCurrentPage(0);
};


  // Combined filtering effect
useEffect(() => {
  let filtered = submittedData;

  // Apply date filters first
  if (fromDate || toDate) {
    filtered = filtered.filter(item => {
      const itemDate = item.nextFollowUp ? new Date(item.nextFollowUp) : null;
      if (!itemDate) return false;

      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      let valid = true;
      if (from) valid = valid && itemDate >= from;
      if (to) {
        const toDateEnd = new Date(to);
        toDateEnd.setHours(23, 59, 59, 999);
        valid = valid && itemDate <= toDateEnd;
      }
      return valid;
    });
  }

  // Then apply search filter
  if (searchTerm.trim()) {
    const lowercasedTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(item =>
      (item.enquiryNo && item.enquiryNo.toString().toLowerCase().includes(lowercasedTerm)) ||
      (item.leadNo && item.leadNo.toString().toLowerCase().includes(lowercasedTerm)) ||
      (item.name && item.name.toLowerCase().includes(lowercasedTerm))
    );
  }

  setFilteredData(filtered);
  setCurrentPage(0);
}, [fromDate, toDate, searchTerm, submittedData]);



  // Pagination calculations
  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / rowsPerPage);
  const startEntry = totalEntries === 0 ? 0 : currentPage * rowsPerPage + 1;
  const endEntry = Math.min((currentPage + 1) * rowsPerPage, totalEntries);
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  // Pagination handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(0); // Reset to first page when changing rows per page
  };

  useEffect(() => {
    loadLoansData();
  }, []);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
  };

  const fetchLoansData = async () => {
    return [];
  };

  const handleToggleSection = (index) => {
    setExpandedSection(index);
    setShowFirmForm(false);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (field === "name") {
      if (/[^a-zA-Z\s]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name should only contain letters and spaces.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          name: "",
        }));
      }
    }

    if (field === "enquiryNo" && !value.trim()) {
      setErrors((prev) => ({
        ...prev,
        enquiryNo: "Enquiry number is required",
      }));
    }
  };

  // Handle select changes
  const handleSelectChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.enquiryNo.trim()) {
      newErrors.enquiryNo = "Enquiry number is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.nextFollowUp) {
      newErrors.nextFollowUp = "Next follow-up date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      enquiryNo: "",
      salesExe: "",
      remark: "",
      name: "",
      nextFollowUp: "",
      assignTo: "",
      leadType: "",
      status: "",
    });
    setErrors({});
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields!", {
        position: "top-right",
      });
      return;
    }

    const newRecord = {
      id: Date.now(),
      ...formData,
      nextFollowUp: formData.nextFollowUp
        ? new Date(formData.nextFollowUp).toISOString()
        : "",
    };

    setSubmittedData((prevData) => [...prevData, newRecord]);

    toast.success("Follow-up details submitted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    resetForm();
    setShowFirmForm(false);
  };

  // Handle record update from child component
  const handleUpdateRecord = (updatedRecord) => {
    setSubmittedData((prev) =>
      prev.map((record) =>
        record.id === updatedRecord.id
          ? {
              ...record,
              ...updatedRecord,
              nextFollowUp: updatedRecord.nextFollowUp
                ? new Date(updatedRecord.nextFollowUp).toISOString()
                : record.nextFollowUp,
            }
          : record
      )
    );
    toast.success("Details updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  // PDF download functionality - Updated to use filtered data
const handleDownloadPDFLost = () => {
  // Use filteredData instead of submittedData
  const dataToDownload = filteredData.length > 0 ? filteredData : submittedData;

  if (dataToDownload.length === 0) {
    toast.info("No data available to download", {
      position: "top-right",
    });
    return;
  }

  const doc = new jsPDF("landscape");
  doc.setFontSize(14);

  // Add filter information to the PDF header
  let headerText = "Lost Visit Report";
  if (fromDate || toDate || searchTerm) {
    headerText += " (Filtered Data)";
  }
  doc.text(headerText, 14, 15);

  // Add filter details if any filters are applied
  let filterDetails = "";
  if (fromDate || toDate) {
    filterDetails += `Date Range: ${fromDate || "Any"} to ${toDate || "Any"}`;
  }
  if (searchTerm) {
    filterDetails += `${filterDetails ? " | " : ""}Search: "${searchTerm}"`;
  }

  if (filterDetails) {
    doc.setFontSize(10);
    doc.text(filterDetails, 14, 25);
  }

  // Page 1 columns
  const tableColumnPage1 = [
    "S.NO.",
    "LAST FOLLOW UP",
    "STATUS",
    "REMARK",
    "NEXT FOLLOW UP",
    "ASSIGN TO",
    "ENQUIRY NO",
    "LEAD NO.",
    "NAME",
    "SALES EXE.",
    "MOBILE",
    "WHATSAPP",
    "ALTERNATE CON",
  ];

  // Page 1 data - using filtered data
  const tableRowsPage1 = dataToDownload.map((row, index) => [
    index + 1,
    row.lastFollowUp || "-",
    row.status || "-",
    row.remark || "-",
    row.nextFollowUp ? new Date(row.nextFollowUp).toLocaleDateString() : "-",
    row.assignTo || "-",
    row.enquiryNo || "-",
    row.leadNo || "-",
    row.name || "-",
    row.salesExe || "-",
    row.mobile || "-",
    row.whatsapp || "-",
    row.alternateContact || "-",
  ]);

  autoTable(doc, {
    startY: filterDetails ? 35 : 25, // Adjust start position based on filter details
    head: [tableColumnPage1],
    body: tableRowsPage1,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  });

  // Add second page if there's data
  if (dataToDownload.length > 0) {
    doc.addPage("landscape");
    doc.setFontSize(14);
    doc.text("Lost Visit Report - Page 2", 14, 15);

    if (filterDetails) {
      doc.setFontSize(10);
      doc.text(filterDetails, 14, 25);
    }

    // Page 2 columns
    const tableColumnPage2 = [
      "S. NO.",
      "EMAIL",
      "ADDRESS",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED",
      "BUDGET",
      "REASON",
      "REFERENCE",
      "NAME OF CP",
      "PLANNING TO BUY?",
      "FOLLOWUP DETAILS",
    ];

    // Page 2 data - using filtered data
    const tableRowsPage2 = dataToDownload.map((row, index) => [
      index + 1,
      row.email || "-",
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interested || "-",
      row.budget || "-",
      row.reason || "-",
      row.reference || "-",
      row.nameOfCP || "-",
      row.planningToBuy || "-",
      row.followupDetails || "-",
    ]);

    autoTable(doc, {
      startY: filterDetails ? 35 : 25, // Adjust start position based on filter details
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  }

  // Generate filename based on filters
  let filename = "Lost_Visit_Report";
  if (fromDate || toDate || searchTerm) {
    filename += "_Filtered";
  }
  if (fromDate && toDate) {
    filename += `_${fromDate}_to_${toDate}`;
  }
  if (searchTerm) {
    filename += `_search_${searchTerm.substring(0, 10)}`;
  }

  doc.save(`${filename}.pdf`);

  // Show success message with filter info
  let successMessage = "PDF downloaded successfully";
  if (fromDate || toDate || searchTerm) {
    successMessage += " with applied filters";
  }
  toast.success(successMessage, {
    position: "top-right",
    autoClose: 3000,
  });
};

  return (
    <div
      className="main-content"
      style={{ padding: isMobile ? "10px" : "20px" }}
    >
      <h6
        style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "15px" }}
      >
        Sales Module / Lost Enquiry Follow Up Management
      </h6>

      {/* Section Header with Download PDF Button */}
     <div
  className="d-flex align-items-center justify-content-between mb-3"
  style={{
    flexWrap: isMobile ? "wrap" : "nowrap",
    gap: isMobile ? "10px" : "15px",
  }}
>
  <div
    className="d-flex align-items-center"
    style={{
      flex: isMobile ? "0 0 100%" : 1,
      marginBottom: isMobile ? "10px" : "0"
    }}
  >
    {sections.map((section, index) => (
      <Button
        key={index}
        onClick={() => handleToggleSection(index)}
        variant="outlined"
        color="success"
        className="my-3"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: Constants.primaryColor,
          padding: isMobile ? "6px 12px" : "8px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          transition: "width 0.3s ease, background 0.3s ease",
          minWidth: isMobile ? "40px" : "50px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: isMobile ? "12px" : "14px",
          justifyContent: "flex-start",
          textTransform: "none",
          boxShadow:
            "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
          width:
            expandedSection === index
              ? isMobile
                ? "160px"
                : isTablet
                ? "180px"
                : "200px"
              : isMobile
              ? "40px"
              : "50px",
          height: isMobile ? "40px" : "auto",
        }}
        startIcon={<FaEye size={isMobile ? 18 : 24} color="white" />}
      >
        {expandedSection === index && (
          <span
            style={{
              color: "white",
              fontSize: isMobile ? "12px" : "16px",
              marginLeft: isMobile ? "4px" : "8px",
            }}
          >
            {section.label}
          </span>
        )}
      </Button>
    ))}
  </div>

  {/* Download PDF Button - Full width on mobile */}
  <Button
    variant="contained"
    sx={{
      background: Constants.primaryColor,
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: isMobile ? "8px 16px" : "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      width: isMobile ? "100%" : "auto",
      minWidth: isMobile ? "100%" : "auto",
      marginLeft: isMobile ? "0" : "auto",
    }}
    onClick={handleDownloadPDFLost}
    size={isMobile ? "small" : "medium"}
  >
    <FaFileDownload size={isMobile ? 16 : 18} />
    {isMobile ? "Download PDF" : "Download PDF"}
  </Button>
</div>

      {expandedSection === 0 && selectedTab === "firm" && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div
                className={`d-flex ${
                  isMobile ? "flex-column" : "flex-row"
                } gap-2 w-100 align-items-${isMobile ? "stretch" : "center"}`}
                style={{
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  className={`d-flex ${
                    isMobile ? "flex-column" : "flex-row"
                  } gap-2 align-items-center`}
                  style={{ width: isMobile ? "100%" : "auto", flexWrap: "wrap" }}
                >
                  {/* New Follow Up Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: Constants.primaryColor,
                      width: isMobile ? "100%" : "auto",
                    }}
                    className="fw-bold"
                    onClick={() => setShowFirmForm(true)}
                    size={isMobile ? "small" : "medium"}
                  >
                    + New Follow UP
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                      flexDirection: isMobile ? "column" : "row",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <TextField
                      label="From"
                      type="date"
                      size="small"
                      value={fromDate}
                      onChange={handleFromDateChange}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: isMobile ? "100%" : 150,
                        border: Constants.formInputBorderColor,
                      }}
                    />
                    <TextField
                      label="To"
                      type="date"
                      size="small"
                      value={toDate}
                      onChange={handleToDateChange}
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        width: isMobile ? "100%" : 150,
                        border: Constants.formInputBorderColor,
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      style={{
                        background: Constants.primaryColor,
                        width: isMobile ? "100%" : "auto",
                      }}
                      className="fw-bold"
                      onClick={handleClearFilters}
                      size={isMobile ? "small" : "medium"}
                    >
                      Clear
                    </Button>
                  </Box>


                </div>

                {/* Search and Pagination Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                    justifyContent: isMobile ? "flex-start" : "flex-end",
                    width: isMobile ? "100%" : "auto",
                    marginTop: isMobile ? "10px" : "0",
                  }}
                >
                  <TextField
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    size="small"
                    sx={{
                      width: isMobile ? "100%" : "180px",
                      "& .MuiInputBase-root": {
                        padding: "0px 8px",
                      },
                      border: Constants.formInputBorderColor,
                    }}
                  />

                  {/* Pagination Controls */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "14px",
                      color: "#800000",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span style={{ fontWeight: "500" }}>Rows per page:</span>

                    <select
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      style={{
                        border: "1px solid #800000",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        outline: "none",
                        color: "#800000",
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>

                    <span>
                      {totalEntries === 0 ? "0–0" : `${startEntry}–${endEntry}`}{" "}
                      of {totalEntries}
                      {searchTerm && ` (filtered from ${submittedData.length})`} entries

                    </span>

                    {/* Navigation arrows */}
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(0, currentPage - 1))
                      }
                      disabled={currentPage === 0}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: currentPage === 0 ? "not-allowed" : "pointer",
                        color: currentPage === 0 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={() =>
                        handlePageChange(
                          Math.min(totalPages - 1, currentPage + 1)
                        )
                      }
                      disabled={currentPage >= totalPages - 1}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor:
                          currentPage >= totalPages - 1
                            ? "not-allowed"
                            : "pointer",
                        color:
                          currentPage >= totalPages - 1 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="mt-3"
                style={{ overflowX: "auto", width: "100%" }}
              >
                <LostVisitTable
                  data={paginatedData}
                  onUpdate={handleUpdateRecord}
                />
              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => {
                setShowFirmForm(false);
                resetForm();
              }}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
            >
              <DialogTitle>Add New Follow Up</DialogTitle>
              <DialogContent>
                <Grid container spacing={isMobile ? 1 : 2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Enquiry No."
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      value={formData.enquiryNo}
                      onChange={(e) =>
                        handleInputChange("enquiryNo", e.target.value)
                      }
                      error={!!errors.enquiryNo}
                      helperText={errors.enquiryNo}
                      required
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    >
                      <InputLabel id="sales-executive-label">
                        Sales Person
                      </InputLabel>
                      <Select
                        labelId="sales-executive-label"
                        value={formData.salesExe}
                        onChange={(e) =>
                          handleSelectChange("salesExe", e.target.value)
                        }
                        label="Sales Person"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Shilpha Mewada 1">
                          Shilpha Mewada 1
                        </MenuItem>
                        <MenuItem value="Tic Tac Toe Sohan">
                          Tic Tac Toe Sohan
                        </MenuItem>
                        <MenuItem value="Shilpha Mewada">
                          Shilpha Mewada
                        </MenuItem>
                        <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
                        <MenuItem value="Shubham Taware">
                          Shubham Taware
                        </MenuItem>
                        <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
                        <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
                        <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Remark"
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      value={formData.remark}
                      onChange={(e) =>
                        handleInputChange("remark", e.target.value)
                      }
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      label="Next Follow Up"
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      required
                      value={formData.nextFollowUp}
                      onChange={(e) =>
                        handleInputChange("nextFollowUp", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.nextFollowUp}
                      helperText={errors.nextFollowUp}
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    >
                      <InputLabel id="assign-to-label">Assign To</InputLabel>
                      <Select
                        labelId="assign-to-label"
                        value={formData.assignTo}
                        onChange={(e) =>
                          handleSelectChange("assignTo", e.target.value)
                        }
                        label="Assign To"
                        required
                        error={!!errors.assignTo}
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Shilpha Mewada 1">
                          Shilpha Mewada 1
                        </MenuItem>
                        <MenuItem value="Tic Tac Toe Sohan">
                          Tic Tac Toe Sohan
                        </MenuItem>
                        <MenuItem value="Shilpha Mewada">
                          Shilpha Mewada
                        </MenuItem>
                        <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
                        <MenuItem value="Shubham Taware">
                          Shubham Taware
                        </MenuItem>
                        <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
                        <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
                        <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    >
                      <InputLabel id="lead-type-label">Lead Type</InputLabel>
                      <Select
                        labelId="lead-type-label"
                        value={formData.leadType}
                        onChange={(e) =>
                          handleSelectChange("leadType", e.target.value)
                        }
                        label="Lead Type"
                        required
                        error={!!errors.leadType}
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Hot">Hot</MenuItem>
                        <MenuItem value="Warm">Warm</MenuItem>
                        <MenuItem value="Lost">Lost</MenuItem>
                        <MenuItem value="Cold">Cold</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                      size={isMobile ? "small" : "medium"}
                      sx={{
                        border: Constants.formInputBorderColor,
                      }}
                    >
                      <InputLabel id="status-label">Status</InputLabel>
                      <Select
                        labelId="status-label"
                        value={formData.status}
                        onChange={(e) =>
                          handleSelectChange("status", e.target.value)
                        }
                        label="Status"
                        required
                        error={!!errors.status}
                      >
                        <MenuItem value="Follow Up">Follow Up</MenuItem>
                        <MenuItem value="Not Interested">
                          Not Interested
                        </MenuItem>
                        <MenuItem value="Callback Request">
                          Callback Request
                        </MenuItem>
                        <MenuItem value="Unreachable">Unreachable</MenuItem>
                        <MenuItem value="Booked Property In Other Project">
                          Booked Property In Other Project
                        </MenuItem>
                        <MenuItem value="Not Answer">Not Answer</MenuItem>
                        <MenuItem value="Invalid Number">
                          Invalid Number
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => {
                    setShowFirmForm(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: Constants.primaryColor,
                    color: "#ecf0f1",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SalesLostVisits;
