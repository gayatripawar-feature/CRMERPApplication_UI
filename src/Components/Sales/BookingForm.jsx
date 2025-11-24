



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
// import BookingFormTable from './BookingFormTable';


// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { FaRegUser } from "react-icons/fa";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; 
// import Constants from '../Constants';

// const sections = [
//     { label: "Booking Display", icon: <FaBuilding size={20} />, createLabel: "Create Firm" },
    
//   ];
//   const tabNames = [ "firm"]; 

// const  BookingForm = () => {


     
//     const [loans, setLoans] = useState([]);
//     const [leadType, setLeadType] = useState("");
//     const [assignedTo, setAssignedTo] = useState(""); 
   
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
//   const [emailId1, setEmailId1] = useState("");

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
//   const [panNumber, setPanNumber] = useState('');
//   const [aadharNumber, setAadharNumber] = useState('');

// const [dateOfBirth, setDateOfBirth] = useState('');
//  const [mobileEmail, setMobileEmail] = useState('');




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
  
 
//     const [carpetArea, setCarpetArea] = useState('');
//   const [wing, setWing] = useState('');
//   const [flatNo, setFlatNo] = useState('');
//   const [type, setType] = useState('');
//   const [soldRate, setSoldRate] = useState('');
//   const [enclosedBalcony, setEnclosedBalcony] = useState('');
//   const [openBalcony, setOpenBalcony] = useState('');
//   const [terrace, setTerrace] = useState('');
//   const [parking, setParking] = useState('');
//   const [floor, setFloor] = useState('');
//   const [mobileNumber, setMobileNumber] = useState('');
 
//   const [bookingAmount, setBookingAmount] = useState('');
//   const [totalConsideration, setTotalConsideration] = useState('');
//   const [stampDuty, setStampDuty] = useState('');
//   const [registrationFee, setRegistrationFee] = useState('');
//   const [gstAmount, setGstAmount] = useState('');


//   const [panCard, setPanCard] = useState('');
//   const [aadhaarCard, setAadhaarCard] = useState('');
//   const [marriageCertificate, setMarriageCertificate] = useState('');
//   const [passportPhoto, setPassportPhoto] = useState('');
//   const [otherDocuments, setOtherDocuments] = useState('');
 
  
//   const [paymentMode, setPaymentMode] = useState('');
//   const [chequeNo, setChequeNo] = useState('');
//   const [chequeDate, setChequeDate] = useState('');
//   const [bankName, setBankName] = useState('');
//   const [bankDetails, setBankDetails] = useState('');
//   const [alternateMobileNo, setAlternateMobileNo] = useState('');  // Define state for alternate mobile number
//   const [alternateMobileError, setAlternateMobileError] = useState('');
//   const [dateOfFlatBooking, setDateOfFlatBooking] = useState(null);
//   const [aadharNo, setAadharNo] = useState('');
// const [aadharError, setAadharError] = useState('');
// const [whatsAppNo, setWhatsAppNo] = useState('');
// const [whatsAppError, setWhatsAppError] = useState('');
// const [emailId, setEmailId] = useState('');
// const [address, setAddress] = useState('');
// const [coAllotteeName, setCoAllotteeName] = useState('');
// const [coAllotteeDob, setCoAllotteeDob] = useState('');
// const [coAllotteeOccupation, setCoAllotteeOccupation] = useState('');
// const [coAllotteePan, setCoAllotteePan] = useState(""); 
// const [coAllotteeAadhar, setCoAllotteeAadhar] = useState("");
// const [coAllotteeAadharError, setCoAllotteeAadharError] = useState("");


// const [expandedSection, setExpandedSection] = useState(0);
// const [isExpanded, setIsExpanded] = useState(false);




// const[aadhaar,setAadhar] =useState(false);
// const [aadharNo2, setAadharNo2] = useState('');
// const [aadharNo2Error, setAadharNo2Error] = useState('');

// const [panCardFiles, setPanCardFiles] = useState([]); 
 
//   const calculateStampDuty = () => {
//    };

//   const calculateRegistrationFee = () => {
//   };

//   const calculateGstAmount = () => {
//  };

  

//   const handlePanCardChange = (e) => {
//     const files = Array.from(e.target.files);  
//     setPanCardFiles((prev) => [...prev, ...files]);

//   };

//   const handleWhatsAppChange = (e) => {
//     const value = e.target.value;
//     if (value.length > 10) {
//       setWhatsAppNoError('WhatsApp No. cannot exceed 10 digits');
//     } else {
//       setWhatsAppNoError('');
//     }
//     setWhatsAppNo(value);
//   };
 
  
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
  
//     const handleChangeDateOfBirth = (e) => {
//         setDateOfBirth(e.target.value);  
//       };
     


//       const handleAlternateMobileChange = (e) => {
//         const value = e.target.value;
    
       
//         if (/^\d{0,10}$/.test(value)) {
//           setAlternateMobileNo(value);
//           setAlternateMobileError('');
//         } else {
//           setAlternateMobileError('Mobile number cannot exceed 10 digits');
//         }
//       };
    
     
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
//   // For second PAN field (Co-Allottee PAN)
// const handleCoAllotteePanChange = (e) => {
//   setCoAllotteePan(e.target.value);
// };

// const handleCoAllotteeAadharChange = (e) => {
//   const value = e.target.value;
//   if (value.length > 12) {
//     setCoAllotteeAadharError("AADHAR No. cannot exceed 12 digits");
//   } else {
//     setCoAllotteeAadharError("");
//   }
//   setCoAllotteeAadhar(value);
// };
  
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
//       // setExpandedSection(index);  
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
  
   
    
//     const handlePanChange = (e) => {
//       const value = e.target.value.toUpperCase(); 
    

//       const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    
//       if (value.length > 10) {
//         setPanError("PAN No. must be exactly 10 characters");
//       } else if (value.length === 10 && !panRegex.test(value)) {
//         setPanError("Invalid PAN No. format");
//       } else {
//         setPanError(""); 
//       }
    
//       setPanNumber(value);
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
    
//     const handleAadharCoChange =() =>{

//     }
  
//     // const handleNameChange = (event) => {
//     //   const value = event.target.value;
  
     
//     //   if (/[^a-zA-Z\s]/.test(value)) {
//     //     setError('Name should only contain letters and spaces.');
//     //   } else {
//     //     setError('');
//     //   }
  
//     //   setName(value);
//     // };
//     const handleNameChange = (e) => {
//       const value = e.target.value;
    
//       // Check if input contains only alphabets and spaces
//       if (/[^a-zA-Z\s]/.test(value)) {
//         setFirmPanError('Name should only contain letters and spaces.');
//       } else {
//         setFirmPanError('');
//       }
    
//       setFirmPan(value);
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
      
//       // Regular expression to check if the value is numeric and has a valid length (e.g., 10-16 digits)
//       const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
    
//       if (value && !accountNoRegex.test(value)) {
//         setAccountNoError("Account number must be between 10 to 16 digits.");
//       } else {
//         setAccountNoError(""); // Clear the error if valid
//       }
    
      
//       setAccountNo(value);
//     };
  
    
   
//     const validatePAN = (pan) => {
//       const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; 
//       return panPattern.test(pan);
//     };
  

//     const handleAadharChange = (e) => {
//       const value = e.target.value;
    
//       if (!/^\d*$/.test(value)) {
//         // If non-numeric value is entered
//         setAadharError('Only numbers are allowed');
//       } else if (value.length < 12) {
//         setAadharError('Aadhar number must be 12 digits');
//       } else {
//         setAadharError('');
//       }
    
//       setAadharNo(value);
//     };
    
//     const handleAadharNo2Change = (e) => {
//       const value = e.target.value;
    
//       if (!/^\d*$/.test(value)) {
//         setAadharNo2Error('Only numbers are allowed');
//       } else if (value.length < 12) {
//         setAadharNo2Error('Aadhar number must be 12 digits');
//       } else {
//         setAadharNo2Error('');
//       }
    
//       setAadharNo2(value);
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
  
//     // const handleEmailChange1 = (e) => {
//     //   setEmailId1(e.target.value); // Update email state correctly
//     // };
  
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
  
//     // State to store validation errors
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
    
//     // const handleAadharChange = (e) => {
//     //   const value = e.target.value;
    
//     //   // Allow only numbers
//     //   if (!/^\d*$/.test(value)) {
//     //     return; // Skip if non-numeric
//     //   }
    
//     //   // Set error if length is not 12
//     //   if (value.length === 12) {
//     //     setAadharError('');
//     //   } else if (value.length > 0 && value.length < 12) {
//     //     setAadharError('Aadhar number must be 12 digits');
//     //   } else {
//     //     setAadharError('');
//     //   }
    
//     //   setAadharNumber(value);
//     // };
    
  
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
    
//     const handleClosingExecutiveChange = (event) => {
//         setClosingExecutive(event.target.value);
//       };
    
      
      
//   const handleToggle = () => {
    
//     setIsExpanded((prev) => !prev);
   

//   };
//   const handleEmailChange1 = (event) => {
//     const value = event.target.value;
  
//     // Email Regex for all domain validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
//     if (!emailRegex.test(value)) {
//       setEmailError('Please enter a valid Email ID');
//     } else {
//       setEmailError('');
//     }
  
//     setEmailId1(value);
//   };
  
//   const handleDownloadPDFBooking = () => {
//     console.log("Loans data before mapping:", loans); // Use loans instead of firms
  
   
  
//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Firm Details Report", 14, 15);
  
//     const tableColumn = [
//       "Timestamp", "Firm Name", "Firm Address", "Firm PAN No",
//       "Firm GST No", "Residential Address", "PAN No", "Aadhaar No",
//       "Photo", "Light Bill"
//     ];
  
//     const tableRows = loans.map(row => [
//       row.timestamp || "-",
//       row.name || "-",
//       row.address || "-",
//       row.firmPanNo || "-",
//       row.firmGstNo || "-",
//       row.residentialAddress || "-",
//       row.panNo || "-",
//       row.aadhaarNo || "-",
//       row.photo || "-",
//       row.lightBill || "-"
//     ]);
  
//     console.log("Formatted Table Rows:", tableRows);
  
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//     });
  
//     doc.save("Booking_Details_Report.pdf");
//   };
  
//     return (
//       <div className="main-content">
//         <h6 className='pb-3'>Sales Module / Booking Management</h6>
       
  
      

//          <div className="d-flex align-items-center mb-3">
//   {sections.map((section, index) => (
//     <Button
//       key={index}
//       onClick={() => handleToggleSection(index)}
//       variant="contained"
//       color="primary"
//       className="m-3"
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "flex-start",
//         gap: 1,
//         borderRadius: "20px",
//         width: "200px",  // Always expanded
//         minWidth: "200px", 
//         padding: "10px 15px",
//         textTransform: "none",
//         transition: "background 0.3s ease",
//         background: Constants.primaryColor,
//         boxShadow:
//           "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//         cursor: "pointer",
//       }}
//       startIcon={<FaEye size={20} color="white" />}
//     >
//       <span style={{ color: "white", fontSize: "16px" }}>{section.label}</span> 
//     </Button>
//   ))}
// </div> 



  
       
//   {expandedSection === 0 && selectedTab === "firm" && (
//     <div className="content-container mt-3">

// <div className="mt-3">
          
// <div className='button-container'>
//   <div className='d-flex gap-3'>
//   <Button 
//               variant="contained" 
//               color="primary" 
//               style={{ background: Constants.primaryColor }} 
//               className='fw-bold'
//               onClick={() => setShowFirmForm(true)}
//             >
//               + New Booking
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
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: Constants.primaryColor,
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFBooking}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//     </div>

         
  
          
//             <div className="right-buttons">
//               <Button variant="contained" color="secondary" onClick={handlePrevious}>
//                 Previous
//               </Button>
//               <Button variant="contained" color="secondary" onClick={handleNext}>
//                 Next
//               </Button>
//             </div>
//           </div>
       
//           {/* <BookingFormTable data ={dummyData} /> */}
//           {!showFirmForm && (
//     <div className="mt-3">
//       <BookingFormTable data={dummyData} />
//     </div>
//   )}
//           </div>

//       {!showFirmForm ? (
//         <>
         
  
          
//         </>
//       ) : (
     
  
//       <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
//       <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
//         <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
//         Section 1: Personal Information
//         </Typography>
  
       
        
//         <Grid container spacing={2}>
//     <Grid item xs={6}>
//       <TextField
//         label="Enquiry No."
//         fullWidth
//         variant="outlined"
//         value={firmName}
//         onChange={handleFirmNameChange} 
//         error={!!firmNameError} 
//         helperText={firmNameError} 
//         required 
//       />
//     </Grid>
   
//       <Grid item xs={6}>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="closing-executive-label">Project Name</InputLabel>
//           <Select
//             labelId="closing-executive-label"
//             id="closing-executive"
//             value={closingExecutive}
//             onChange={handleClosingExecutiveChange}
//             label="Select Sales Person"
//           >
//             {/* Sales Person options */}
//             <MenuItem value="Shilpha Mewada 1">Project Name</MenuItem>
//             <MenuItem value="Tic Tac Toe Sohan">Project Name</MenuItem>
//             <MenuItem value="Shilpha Mewada">Sohan Enterprised</MenuItem>
           
//           </Select>
//         </FormControl>
//       </Grid>
   

  
    

// <Grid item xs={6}>
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <DatePicker
//       label="Date Of Flat Booking"
//       value={dateOfFlatBooking}
//       onChange={(newValue) => setDateOfFlatBooking(newValue)}
//       renderInput={(params) => (
//         <TextField 
//           {...params} 
//           fullWidth 
//           variant="outlined" 
//         />
//       )}
//     />
//   </LocalizationProvider>
// </Grid>
// <Grid item xs={6}>
//   <TextField
//     label="NAME OF ALOTEE"
//     fullWidth
//     variant="outlined"
//     value={firmPan}
//     onChange={handleNameChange}   // Replaced Function Name
//     error={!!firmPanError}        // Show error if there is an error
//     helperText={firmPanError}
//     required
//   />
// </Grid>

    
    
//     <Grid item xs={6}>
//   <TextField
//     type="datetime-local" 
//     label="Source Name"
//     fullWidth
//     variant="outlined"
//     required 
//     InputLabelProps={{
//       shrink: true, 
//     }}
//   />
// </Grid>


// <Grid item xs={6}>
//   <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <DatePicker
//       label="Date Of Birth"
//       value={dateOfFlatBooking}
//       onChange={(newValue) => setDateOfFlatBooking(newValue)}
//       renderInput={(params) => (
//         <TextField 
//           {...params} 
//           fullWidth 
//           variant="outlined" 
//         />
//       )}
//     />
//   </LocalizationProvider>
// </Grid>

// <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel htmlFor="occupation">Occupation</InputLabel>
//     <TextField
//       id="occupation"
//       label="Occupation"
//       variant="outlined"
//       value={leadType} // Bind to state for the occupation value
//       onChange={(e) => setLeadType(e.target.value)} // Update the state on change
//       required
//     />
//   </FormControl>
// </Grid>


// <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <TextField
//       label="PAN No."
//       variant="outlined"
//       value={panNumber}
//       onChange={handlePanChange}  // Validation Function
//       error={!!panError}         // Show error if invalid
//       helperText={panError}      // Show error message
//       inputProps={{ maxLength: 10 }}  // PAN has 10 characters
//     />
//   </FormControl>
// </Grid>


// <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <TextField
//       label="AADHAR No."
//       variant="outlined"
//       value={aadharNo2}
//       onChange={handleAadharNo2Change}
//       error={!!aadharNo2Error}
//       helperText={aadharNo2Error}
//       inputProps={{ maxLength: 12 }} 
//     />
//   </FormControl>
// </Grid>



// <Grid item xs={6}>
//   <TextField
//     label="Mobile No"
//     fullWidth
//     variant="outlined"
//     value={alternateMobileNo}
//     onChange={(e) => {
//       const value = e.target.value;

      
//       if (value.length <= 10) {
//         setAlternateMobileNo(value); 
//         setAlternateMobileError(""); 
//       } else {
//         setAlternateMobileError("Mobile number cannot exceed 10 digits"); 
//       }
//     }}
//     error={!!alternateMobileError} 
//     helperText={alternateMobileError} 
//     inputProps={{
//       maxLength: 10, 
//     }}
//   />
// </Grid>
// <Grid item xs={6}>
//   <TextField
//     label="Alternate Mobile No"
//     fullWidth
//     variant="outlined"
//     value={alternateMobileNo}
//     onChange={(e) => {
//       const value = e.target.value;

     
//       if (value.length <= 10) {
//         setAlternateMobileNo(value);
//         setAlternateMobileError(""); 
//       } else {
//         setAlternateMobileError("Mobile number cannot exceed 10 digits"); 
//       }
//     }}
//     error={!!alternateMobileError} 
//     helperText={alternateMobileError} 
//     inputProps={{
//       maxLength: 10, 
//     }}
//   />
// </Grid>

// <Grid item xs={6}>
//   <TextField
//     label="WhatsApp No."
//     fullWidth
//     variant="outlined"
//     value={whatsAppNo}
//     onChange={handleWhatsAppChange}
//     error={!!whatsAppError} 
//     helperText={whatsAppError} 
//     inputProps={{
//       maxLength: 10, 
//     }}
//   />
// </Grid>


// <Grid item xs={6}>
//   <TextField
//     label="Email ID"
//     fullWidth
//     variant="outlined"
//     value={emailId1} 
//     onChange={handleEmailChange1} 
//     error={!!emailError}
//     helperText={emailError}
//   />
// </Grid>



// <Grid item xs={6}>
//   <TextField
//     label="AADHAR No."
//     fullWidth
//     variant="outlined"
//     value={aadharNo}
//     onChange={handleAadharChange}  // Handle the change
//     error={!!aadharError}          // Show error if there's a validation error
//     helperText={aadharError}       // Display the error message
//     inputProps={{
//       maxLength: 12,               // Limit to 12 digits
//       inputMode: 'numeric',        // Mobile-friendly number keyboard
//     }}
//   />
// </Grid>


// <Grid item xs={6}>
//   <TextField
//     label="Address"
//     fullWidth
//     variant="outlined"
//     value={address}
//     onChange={(e) => setAddress(e.target.value)} // Update state with entered value
//   />
// </Grid>


// <Grid item xs={6}>
//   <TextField
//     label="Name of Co-Allottee"
//     fullWidth
//     variant="outlined"
//     value={coAllotteeName}
//     onChange={(e) => setCoAllotteeName(e.target.value)} // Update state with entered value
//   />
// </Grid>


// <Grid item xs={6}>
//   <TextField
//     label="Date Of Birth (Co-Allottee)"
//     fullWidth
//     variant="outlined"
//     type="date"
//     value={coAllotteeDob} // Make sure to define this state in your component
//     onChange={(e) => setCoAllotteeDob(e.target.value)} // Updates state with the entered value
//     InputLabelProps={{
//       shrink: true, // Ensures the label stays above the field when a date is selected
//     }}
//   />
// </Grid>


// <Grid item xs={6}>
//   <TextField
//     label="Occupation (Co-Allottee)"
//     fullWidth
//     variant="outlined"
//     value={coAllotteeOccupation} // Make sure to define this state in your component
//     onChange={(e) => setCoAllotteeOccupation(e.target.value)} // Updates state with the entered value
//   />
// </Grid>

// <Grid item xs={6}>
//   <TextField
//     label="PAN No. (Co-Allottee)"
//     fullWidth
//     variant="outlined"
//     value={coAllotteePan} // Uses second PAN-specific state
//     onChange={handleCoAllotteePanChange} // Second PAN handler
//   />
// </Grid>

// <Grid item xs={6}>
//   <TextField
//     label="AADHAR No. (Co-Allottee)"
//     fullWidth
//     variant="outlined"
//     value={coAllotteeAadhar} // Uses second AADHAR-specific state
//     onChange={handleCoAllotteeAadharChange} // Second AADHAR handler
//     error={!!coAllotteeAadharError} // Shows error if validation fails
//     helperText={coAllotteeAadharError} // Displays error message
//     inputProps={{ maxLength: 12 }} // Ensures AADHAR No. can't exceed 12 digits
//   />
// </Grid>


// <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="status-label"></InputLabel>
//     <TextField
//       id="mobile-email"
//       label="MOBILE No. & EMAIL (Co-Alotee)"
//       variant="outlined"
//       value={mobileEmail}
//       onChange={(e) => setMobileEmail(e.target.value)} // Update the state with the input value
//     />
//   </FormControl>
// </Grid>
// </Grid>
// <hr/>

// <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
// Section 2: Particulars of Flat
//         </Typography>

//         <Grid container spacing={2}>
//   {/* Carpet Area (Sq. Mtr.) */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="carpet-area-label">Carpet Area in (Sq. Mtr.)</InputLabel>
//       <Select
//         labelId="carpet-area-label"
//         id="carpet-area"
//         value={carpetArea}
//         onChange={(e) => setCarpetArea(e.target.value)}
//         label="Carpet Area in (Sq. Mtr.)"
//       >
//         <MenuItem value="100">100</MenuItem>
//         <MenuItem value="150">150</MenuItem>
//         <MenuItem value="200">200</MenuItem>
//         <MenuItem value="250">250</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Wing */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="wing-label">Wing</InputLabel>
//       <Select
//         labelId="wing-label"
//         id="wing"
//         value={wing}
//         onChange={(e) => setWing(e.target.value)}
//         label="Wing"
//       >
//         <MenuItem value="A">A</MenuItem>
//         <MenuItem value="B">B</MenuItem>
//         <MenuItem value="C">C</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Flat No. */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="flat-no-label">FLAT No.</InputLabel>
//       <Select
//         labelId="flat-no-label"
//         id="flat-no"
//         value={flatNo}
//         onChange={(e) => setFlatNo(e.target.value)}
//         label="FLAT No."
//       >
//         <MenuItem value="101">101</MenuItem>
//         <MenuItem value="102">102</MenuItem>
//         <MenuItem value="103">103</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Type */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="type-label">Type</InputLabel>
//       <Select
//         labelId="type-label"
//         id="type"
//         value={type}
//         onChange={(e) => setType(e.target.value)}
//         label="Type"
//       >
//         <MenuItem value="2BHK">2BHK</MenuItem>
//         <MenuItem value="3BHK">3BHK</MenuItem>
//         <MenuItem value="4BHK">4BHK</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Sold Rate */}
//   <Grid item xs={6}>
//     <TextField
//       label="Sold Rate"
//       fullWidth
//       variant="outlined"
//       value={soldRate}
//       onChange={(e) => setSoldRate(e.target.value)}
//       type="number"
//     />
//   </Grid>

//   {/* Enclosed Balcony (Sq. Mtr.) */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="enclosed-balcony-label">Enclosed Balcony in (Sq. Mtr.)</InputLabel>
//       <Select
//         labelId="enclosed-balcony-label"
//         id="enclosed-balcony"
//         value={enclosedBalcony}
//         onChange={(e) => setEnclosedBalcony(e.target.value)}
//         label="Enclosed Balcony in (Sq. Mtr.)"
//       >
//         <MenuItem value="10">10</MenuItem>
//         <MenuItem value="15">15</MenuItem>
//         <MenuItem value="20">20</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Open Balcony (Sq. Mtr.) */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="open-balcony-label">Open Balcony in (Sq. Mtr.)</InputLabel>
//       <Select
//         labelId="open-balcony-label"
//         id="open-balcony"
//         value={openBalcony}
//         onChange={(e) => setOpenBalcony(e.target.value)}
//         label="Open Balcony in (Sq. Mtr.)"
//       >
//         <MenuItem value="5">5</MenuItem>
//         <MenuItem value="10">10</MenuItem>
//         <MenuItem value="15">15</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Terrace (Sq. Mtr.) */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="terrace-label">Terrace in (Sq. Mtr.)</InputLabel>
//       <Select
//         labelId="terrace-label"
//         id="terrace"
//         value={terrace}
//         onChange={(e) => setTerrace(e.target.value)}
//         label="Terrace in (Sq. Mtr.)"
//       >
//         <MenuItem value="30">30</MenuItem>
//         <MenuItem value="40">40</MenuItem>
//         <MenuItem value="50">50</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Parking */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="parking-label">Parking</InputLabel>
//       <Select
//         labelId="parking-label"
//         id="parking"
//         value={parking}
//         onChange={(e) => setParking(e.target.value)}
//         label="Parking"
//       >
//         <MenuItem value="Stack Parking">Stack Parking</MenuItem>
//         <MenuItem value="Open car parking">Open car parking</MenuItem>
//         <MenuItem value="Covered car parking">Covered car parking</MenuItem>
//         <MenuItem value="Basement car parking">Basement car parking</MenuItem>
//         <MenuItem value="Other">Other</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>

//   {/* Floor */}
//   <Grid item xs={6}>
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="floor-label">Floor</InputLabel>
//       <Select
//         labelId="floor-label"
//         id="floor"
//         value={floor}
//         onChange={(e) => setFloor(e.target.value)}
//         label="Floor"
//       >
//         <MenuItem value="1st">1st</MenuItem>
//         <MenuItem value="2nd">2nd</MenuItem>
//         <MenuItem value="3rd">3rd</MenuItem>
//         <MenuItem value="4th">4th</MenuItem>
//         <MenuItem value="5th">5th</MenuItem>
//         <MenuItem value="6th">6th</MenuItem>
//         <MenuItem value="7th">7th</MenuItem>
//         <MenuItem value="8th">8th</MenuItem>
//         <MenuItem value="9th">9th</MenuItem>
//         <MenuItem value="10th">10th</MenuItem>
//       </Select>
//     </FormControl>
//   </Grid>
// </Grid>

// <hr/>
  
  
// {/*   
// <Typography variant="h5" gutterBottom>
// Section 3: Consideration
//         </Typography> */}
// {/* Section 3: Consideration */}
// <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
//         Section 3: Consideration
//       </Typography>

//       <Grid container spacing={2}>
//         {/* Total Consideration (Auto Calculated) */}
//         <Grid item xs={6}>
//           <TextField
//             label="Total Consideration / Agreement Value"
//             fullWidth
//             variant="outlined"
//             value={totalConsideration}
//             onChange={(e) => setTotalConsideration(e.target.value)}
//             type="number"
//           />
//         </Grid>

//         {/* Booking Amount / Advance Payment */}
//         <Grid item xs={6}>
//           <TextField
//             label="Booking Amount / Advance Payment"
//             fullWidth
//             variant="outlined"
//             value={bookingAmount}
//             onChange={(e) => setBookingAmount(e.target.value)}
//             type="number"
//           />
//         </Grid>

//         <Grid item xs={6}>
//   <TextField
//     label="Stamp Duty (7% of Agreement Cost)"
//     fullWidth
//     variant="outlined"
//     value={stampDuty} // Bind state to allow manual input
//     onChange={(e) => setStampDuty(e.target.value)} // Update state on input
//   />
// </Grid>


//          {/* Registration Fee */}
//   <Grid item xs={6}>
//     <TextField
//       label="Registration Fee (Auto Calculated)"
//       fullWidth
//       variant="outlined"
//       value={registrationFee}
//       onChange={(e) => setRegistrationFee(e.target.value)}
//     />
//   </Grid>

//   {/* GST Amount */}
//   <Grid item xs={6}>
//     <TextField
//       label="GST Amount (Auto Calculated)"
//       fullWidth
//       variant="outlined"
//       value={gstAmount}
//       onChange={(e) => setGstAmount(e.target.value)}
//     />
//   </Grid>
     
//       </Grid>

//       {/* Section 4: Documents */}
//       <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
//         Section 4: Documents
//       </Typography>

//       <Grid container spacing={2}>
 
//   {/* <Grid item xs={6}>
//     <Typography variant="body1">PAN Card (of both)</Typography>
//     <Button 
//       variant="contained" 
//       component="label"
//       sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//     >
//       Choose File
//       <input type="file" multiple hidden onChange={(e) => setPanCard(e.target.files[0])} />
//     </Button>
//     {panCard && <Typography variant="body2">{panCard.name}</Typography>}
//   </Grid> */}
//   <Grid item xs={6}>
//   <Typography variant="body1">PAN Card (of both)</Typography>

//   <Button
//     variant="contained"
//     component="label"
//     sx={{
//       backgroundColor: "white",
//       color: "black",
//       "&:hover": { backgroundColor: "#f0f0f0" },
//     }}
//   >
//     Choose File
//     <input
//       type="file"
//       multiple
//       hidden
//       onChange={handlePanCardChange}
//     />
//   </Button>

//   {/* Show Selected Files */}
//   {panCardFiles.length > 0 && (
//   <div>
//     <Typography variant="body2">Selected Files:</Typography>

//     {panCardFiles.map((file, index) => (
//       <Typography key={index} variant="body2">
//         {file.name}
//       </Typography>
//     ))}
//   </div>
// )}

// </Grid>


//   {/* AADHAR Card */}
//   {/* <Grid item xs={6}>
//     <Typography variant="body1">AADHAR Card (of both)</Typography>
//     <Button 
//       variant="contained" 
//       component="label"
//       sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//     >
//       Choose File
//       <input type="file" hidden onChange={(e) => setAadhaarCard(e.target.files[0])} />
//     </Button>
//     {aadhaarCard && <Typography variant="body2">{aadhaarCard.name}</Typography>}
//   </Grid> */}

// <Grid item xs={6}>
//   <Typography variant="body1">AADHAR Card (of both)</Typography>

//   <Button
//     variant="contained"
//     component="label"
//     sx={{
//       backgroundColor: "white",
//       color: "black",
//       "&:hover": { backgroundColor: "#f0f0f0" },
//     }}
//   >
//     Choose File
//     <input
//       type="file"
//       multiple
//       hidden
//       // onChange={(e) => setAadhaarCard(Array.from(e.target.files))}
//       onChange={(e) =>
//         setAadhaarCard((prev) => [...prev, ...Array.from(e.target.files)])
//       }
      
//     />
//   </Button>

//   {aadhaarCard.length > 0 && (
//     <div>
//       <Typography variant="body2">Selected Files:</Typography>

//       {aadhaarCard.map((file, index) => (
//         <Typography key={index} variant="body2">
//           {file.name}
//         </Typography>
//       ))}
//     </div>
//   )}
// </Grid>


//   {/* Marriage Certificate */}
//   {/* <Grid item xs={6}>
//     <Typography variant="body1">MARRIAGE CERTIFICATE (If Available)</Typography>
//     <Button 
//       variant="contained" 
//       component="label"
//       sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//     >
//       Choose File
//       <input type="file" hidden onChange={(e) => setMarriageCertificate(e.target.files[0])} />
//     </Button>
//     {marriageCertificate && <Typography variant="body2">{marriageCertificate.name}</Typography>}
//   </Grid> */}
//   <Grid item xs={6}>
//   <Typography variant="body1">MARRIAGE CERTIFICATE (If Available)</Typography>
//   <Button
//     variant="contained"
//     component="label"
//     sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//   >
//     Choose Files
//     <input
//       type="file"
//       multiple
//       hidden
//       // onChange={(e) => setMarriageCertificate(Array.from(e.target.files))}
//       onChange={(e) => setMarriageCertificate(prev => [...prev, ...Array.from(e.target.files)])}


//     />
//   </Button>

//   {marriageCertificate?.length > 0 &&
//     marriageCertificate.map((file, index) => (
//       <Typography key={index} variant="body2">
//         {file.name}
//       </Typography>
//     ))}
// </Grid>


//   {/* Passport Size Photo */}
//   {/* <Grid item xs={6}>
//     <Typography variant="body1">PASSPORT SIZE PHOTO (of both)</Typography>
//     <Button 
//       variant="contained" 
//       component="label"
//       sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//     >
//       Choose File
//       <input type="file" hidden onChange={(e) => setPassportPhoto(e.target.files[0])} />
//     </Button>
//     {passportPhoto && <Typography variant="body2">{passportPhoto.name}</Typography>}
//   </Grid> */}

// <Grid item xs={6}>
//   <Typography variant="body1">PASSPORT SIZE PHOTO (of both)</Typography>

//   <Button 
//     variant="contained" 
//     component="label"
//     sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//   >
//     Choose Files
//     <input 
//       type="file" 
//       multiple
//       hidden 
//       onChange={(e) => setPassportPhoto((prev) => [...prev, ...Array.from(e.target.files)])}

//     />
//   </Button>

//   {passportPhoto.length > 0 && (
//     <>
//       {passportPhoto.map((file, index) => (
//         <Typography key={index} variant="body2">
//           {file.name}
//         </Typography>
//       ))}
//     </>
//   )}
// </Grid>

//   {/* Any Other Documents */}
//   <Grid item xs={6}>
//   <Typography variant="body1">Any Other</Typography>

//   <Button 
//     variant="contained" 
//     component="label"
//     sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
//   >
//     Choose Files
//     <input 
//       type="file" 
//       multiple 
//       hidden 
//       onChange={(e) => setOtherDocuments((prev) => [...prev, ...Array.from(e.target.files)])} 
//     />
//   </Button>

//   {otherDocuments.length > 0 && (
//     <>
//       {otherDocuments.map((file, index) => (
//         <Typography key={index} variant="body2">
//           {file.name}
//         </Typography>
//       ))}
//     </>
//   )}
// </Grid>
// </Grid>


//       {/* Section 5: Booking Payment Mode */}
//       <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
//         Section 5: Booking Payment Mode
//       </Typography>

//       <Grid container spacing={2}>
//         {/* Booking Amount */}
//         <Grid item xs={6}>
//           <TextField
//             label="Booking Amount"
//             fullWidth
//             variant="outlined"
//             value={bookingAmount}
//             onChange={(e) => setBookingAmount(e.target.value)}
//             type="number"
            
//           />
//         </Grid>

//         {/* Payment Mode */}
//         <Grid item xs={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
//             <Select
//               labelId="payment-mode-label"
//               id="payment-mode"
//               value={paymentMode}
//               onChange={(e) => setPaymentMode(e.target.value)}
//               label="Payment Mode"
//             >
//               <MenuItem value="Cheque">Cheque</MenuItem>
//               <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
//               <MenuItem value="Cash">Cash</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Cheque/TRN No. */}
//         <Grid item xs={6}>
//           <TextField
//             label="Cheque/TRN No."
//             fullWidth
//             variant="outlined"
//             value={chequeNo}
//             onChange={(e) => setChequeNo(e.target.value)}
//           />
//         </Grid>

      
       
// <LocalizationProvider dateAdapter={AdapterDateFns}>
//   <Grid item xs={6}>
//     <DatePicker
//       label="Cheque/TRN Date"
//       value={chequeDate}
//       onChange={(newValue) => setChequeDate(newValue)} 
//       renderInput={(params) => (
//         <TextField 
//           {...params} 
//           fullWidth 
//           variant="outlined" 
//           sx={{ width: '100%' }} 
//         />
//       )}
//     />
//   </Grid>
// </LocalizationProvider>

       
//         <Grid item xs={6}>
//   <FormControl fullWidth variant="outlined">
//     <InputLabel id="bank-name-label">Bank Name</InputLabel>
//     <Select
//       labelId="bank-name-label"
//       id="bank-name"
//       value={bankName}
//       onChange={(e) => setBankName(e.target.value)}
//       label="Bank Name"
//     >
//       <MenuItem value="State Bank of India (SBI)">State Bank of India (SBI)</MenuItem>
//       <MenuItem value="HDFC">HDFC Bank</MenuItem>
//       <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
//       <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
//       <MenuItem value="Bank of Baroda">Bank of Baroda</MenuItem>
//       <MenuItem value="Axis Bank">Axis Bank</MenuItem>
//       <MenuItem value="Canara Bank">Canara Bank</MenuItem>
//       <MenuItem value="Union Bank of India">Union Bank of India</MenuItem>
//       <MenuItem value="Bank of India">Bank of India</MenuItem>
//       <MenuItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</MenuItem>
//       <MenuItem value="IndusInd Bank">IndusInd Bank</MenuItem>
//       <MenuItem value="Yes Bank">Yes Bank</MenuItem>
//       <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
//       <MenuItem value="Indian Bank">Indian Bank</MenuItem>
//       <MenuItem value="Central Bank of India">Central Bank of India</MenuItem>
//       <MenuItem value="Indian Overseas Bank">Indian Overseas Bank</MenuItem>
//       <MenuItem value="Federal Bank">Federal Bank</MenuItem>
//       <MenuItem value="UCO Bank">UCO Bank</MenuItem>
//       <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>


//         {/* Bank Details */}
//         <Grid item xs={6}>
//           <TextField
//             label="Bank Details"
//             fullWidth
//             variant="outlined"
//             value={bankDetails}
//             onChange={(e) => setBankDetails(e.target.value)}
//           />
//         </Grid>
//         </Grid>
      
  
  
  
  
//         <Button
//           variant="contained"
//           className="m-3"
//           color="success"
//           onClick={() => {
//             // Simply show the toast message without calling validation functions
//             toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
            
//             // If you want to close the form (or any other logic), you can add it here
//             setShowFirmForm(false); // Example of hiding the form after submission
//           }}
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
     
   
    


// export default BookingForm;





import React, { useState, useEffect } from 'react';
import {
  Input, Table, TableBody, TableCell, TableContainer, Typography, IconButton,
  TableHead, TableRow, Paper, Box, Tabs, Tab, Button, TextField, Grid,
  MenuItem, FormControl, Select, InputLabel, useMediaQuery, useTheme,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import FollowupHistoryTable from './FollowupHistoryTable';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';
import Lostleadstable from "./Lostleadstable";
import LostVisitTable from './LostVisitTable';
import BookingFormTable from './BookingFormTable';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FaRegUser } from "react-icons/fa";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Constants from '../Constants';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const sections = [
  { label: "Booking Display", icon: <FaBuilding size={20} />, createLabel: "Create Firm" },
];
const tabNames = ["firm"];

const BookingForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Main state management
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("firm");

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Form data state
  const [formData, setFormData] = useState({
    enquiryNo: "",
    projectName: "",
    dateOfFlatBooking: "",
    nameOfAllottee: "",
    sourceName: "",
    dateOfBirth: "",
    occupation: "",
    panNo: "",
    aadharNo: "",
    mobileNo: "",
    alternateMobileNo: "",
    whatsAppNo: "",
    emailId: "",
    address: "",

    mobileEmail: "",
    carpetArea: "",
    wing: "",
    flatNo: "",
    type: "",
    soldRate: "",
    enclosedBalcony: "",
    openBalcony: "",
    terrace: "",
    parking: "",
    floor: "",
    totalConsideration: "",
    bookingAmount: "",
    stampDuty: "",
    registrationFee: "",
    gstAmount: "",
    paymentMode: "",
    chequeNo: "",
    chequeDate: "",
    bankName: "",
    bankDetails: ""
  });


  //  State variables for documents of main allottee
const [allotteeDocuments, setAllotteeDocuments] = useState({
  panCard: [],
  aadhaarCard: [],
  marriageCertificate: [],
  passportPhoto: [],
  otherDocuments: []
});

 //  State variables for documents of co-allottees
const [coAllotteesDocuments, setCoAllotteesDocuments] = useState([
  {
    panCard: [],
    aadhaarCard: [],
    marriageCertificate: [],
    passportPhoto: [],
    otherDocuments: []
  }
]);

  // State for managing multiple co-allottees
  const [coAllottees, setCoAllottees] = useState([
  {
    name: "",
    dob: "",
    occupation: "",
    pan: "",
    aadhar: "",
    mobileEmail: ""
  }
]);


  // File states
  const [panCardFiles, setPanCardFiles] = useState([]);
  const [aadhaarCard, setAadhaarCard] = useState([]);
  const [marriageCertificate, setMarriageCertificate] = useState([]);
  const [passportPhoto, setPassportPhoto] = useState([]);
  const [otherDocuments, setOtherDocuments] = useState([]);

  // Error states
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Initialize filtered data
  useEffect(() => {
    setFilteredData(submittedData);
    setCurrentPage(0);
  }, [submittedData]);

  // Handle search
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

    setCurrentPage(0);
  };

  // Combined filtering effect
  // useEffect(() => {
  //   let filtered = submittedData;

  //   // Apply date filters
  //   if (fromDate || toDate) {
  //     filtered = filtered.filter(item => {
  //       const itemDate = item.dateOfFlatBooking ? new Date(item.dateOfFlatBooking) : null;
  //       if (!itemDate) return false;

  //       const from = fromDate ? new Date(fromDate) : null;
  //       const to = toDate ? new Date(toDate) : null;

  //       let valid = true;
  //       if (from) valid = valid && itemDate >= from;
  //       if (to) {
  //         const toDateEnd = new Date(to);
  //         toDateEnd.setHours(23, 59, 59, 999);
  //         valid = valid && itemDate <= toDateEnd;
  //       }
  //       return valid;
  //     });
  //   }

  //   // Apply search filter
  //   if (searchTerm.trim()) {
  //     const lowercasedTerm = searchTerm.toLowerCase();
  //     filtered = filtered.filter(item =>
  //       (item.enquiryNo && item.enquiryNo.toString().toLowerCase().includes(lowercasedTerm)) ||
  //       (item.nameOfAllottee && item.nameOfAllottee.toLowerCase().includes(lowercasedTerm)) ||
  //       (item.mobileNo && item.mobileNo.toString().toLowerCase().includes(lowercasedTerm))
  //     );
  //   }

  //   setFilteredData(filtered);
  //   setCurrentPage(0);
  // }, [fromDate, toDate, searchTerm, submittedData]);
  useEffect(() => {
  let filtered = submittedData;

  // Apply date filters first
  if (fromDate || toDate) {
    filtered = filtered.filter(item => {
      const itemDate = item.dateOfFlatBooking ? new Date(item.dateOfFlatBooking) : null;
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

  // Apply search filter on the date-filtered data
  if (searchTerm.trim()) {
    const lowercasedTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(item =>
      (item.enquiryNo && item.enquiryNo.toString().toLowerCase().includes(lowercasedTerm)) ||
      (item.nameOfAllottee && item.nameOfAllottee.toLowerCase().includes(lowercasedTerm)) ||
      (item.mobileNo && item.mobileNo.toString().toLowerCase().includes(lowercasedTerm)) ||
      (item.emailId && item.emailId.toLowerCase().includes(lowercasedTerm)) ||
      (item.flatNo && item.flatNo.toString().toLowerCase().includes(lowercasedTerm))
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
    setCurrentPage(0);
  };

  const handleToggleSection = (index) => {
    setExpandedSection(index);
    setShowFirmForm(false);
  };


  //  Handlers for co-allottees
// const handleAddCoAllottee = () => {
//   setCoAllottees([
//     ...coAllottees,
//     {
//       name: "",
//       dob: "",
//       occupation: "",
//       pan: "",
//       aadhar: "",
//       mobileEmail: ""
//     }
//   ]);
// };
const handleAddCoAllottee = () => {
  setCoAllottees([
    ...coAllottees,
    {
      name: "",
      dob: "",
      occupation: "",
      pan: "",
      aadhar: "",
      mobileEmail: ""
    }
  ]);

  setCoAllotteesDocuments([
    ...coAllotteesDocuments,
    {
      panCard: [],
      aadhaarCard: [],
      marriageCertificate: [],
      passportPhoto: [],
      otherDocuments: []
    }
  ]);
};


// Handler for  main allottee documents
const handleAllotteeDocumentChange = (documentType, files) => {
  setAllotteeDocuments(prev => ({
    ...prev,
    [documentType]: [...prev[documentType], ...files]
  }));
};

// Handler for  co-allottee documents
const handleCoAllotteeDocumentChange = (index, documentType, files) => {
  const updatedCoAllotteesDocuments = [...coAllotteesDocuments];
  updatedCoAllotteesDocuments[index] = {
    ...updatedCoAllotteesDocuments[index],
    [documentType]: [...updatedCoAllotteesDocuments[index][documentType], ...files]
  };
  setCoAllotteesDocuments(updatedCoAllotteesDocuments);
};


// const handleRemoveCoAllottee = (index) => {
//   if (coAllottees.length > 1) {
//     setCoAllottees(coAllottees.filter((_, i) => i !== index));
//   }
// };
const handleRemoveCoAllottee = (index) => {
  if (coAllottees.length > 1) {
    setCoAllottees(coAllottees.filter((_, i) => i !== index));
    setCoAllotteesDocuments(coAllotteesDocuments.filter((_, i) => i !== index));
  }
};

const handleCoAllotteeChange = (index, field, value) => {
  const updatedCoAllottees = [...coAllottees];
  updatedCoAllottees[index][field] = value;
  setCoAllottees(updatedCoAllottees);

  // Clear error when user starts typing
  if (errors[`coAllottee${field}${index}`]) {
    setErrors(prev => ({
      ...prev,
      [`coAllottee${field}${index}`]: ""
    }));
  }

  // Validation for specific fields
  if (field === "aadhar" && value.length > 12) {
    setErrors(prev => ({
      ...prev,
      [`coAllotteeAadhar${index}`]: "Aadhar number cannot exceed 12 digits."
    }));
  }
};


  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }

    // Validation for specific fields
    if (field === "nameOfAllottee" && /[^a-zA-Z\s]/.test(value)) {
      setErrors(prev => ({
        ...prev,
        nameOfAllottee: "Name should only contain letters and spaces."
      }));
    }

    if (field === "mobileNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        mobileNo: "Mobile number cannot exceed 10 digits."
      }));
    }

    if (field === "alternateMobileNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        alternateMobileNo: "Alternate mobile number cannot exceed 10 digits."
      }));
    }

    if (field === "whatsAppNo" && value.length > 10) {
      setErrors(prev => ({
        ...prev,
        whatsAppNo: "WhatsApp number cannot exceed 10 digits."
      }));
    }

    if (field === "aadharNo" && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        aadharNo: "Aadhar number cannot exceed 12 digits."
      }));
    }

    if (field === "coAllotteeAadhar" && value.length > 12) {
      setErrors(prev => ({
        ...prev,
        coAllotteeAadhar: "Co-allottee Aadhar number cannot exceed 12 digits."
      }));
    }

    if (field === "panNo") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (value.length === 10 && !panRegex.test(value)) {
        setErrors(prev => ({
          ...prev,
          panNo: "Invalid PAN format. Format should be: AAAAA1234A"
        }));
      }
    }
  };

  // Handle select changes
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // File handlers
  const handlePanCardChange = (e) => {
    const files = Array.from(e.target.files);
    setPanCardFiles(prev => [...prev, ...files]);
  };

  const handleAadhaarCardChange = (e) => {
    const files = Array.from(e.target.files);
    setAadhaarCard(prev => [...prev, ...files]);
  };

  const handleMarriageCertificateChange = (e) => {
    const files = Array.from(e.target.files);
    setMarriageCertificate(prev => [...prev, ...files]);
  };

  const handlePassportPhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPassportPhoto(prev => [...prev, ...files]);
  };

  const handleOtherDocumentsChange = (e) => {
    const files = Array.from(e.target.files);
    setOtherDocuments(prev => [...prev, ...files]);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.enquiryNo.trim()) newErrors.enquiryNo = "Enquiry number is required";
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
    if (!formData.nameOfAllottee.trim()) newErrors.nameOfAllottee = "Name of allottee is required";
    if (!formData.mobileNo.trim()) newErrors.mobileNo = "Mobile number is required";
    if (!formData.dateOfFlatBooking) newErrors.dateOfFlatBooking = "Date of flat booking is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };




const resetForm = () => {
  setFormData({
    enquiryNo: "",
    projectName: "",
    dateOfFlatBooking: "",
    nameOfAllottee: "",
    sourceName: "",
    dateOfBirth: "",
    occupation: "",
    panNo: "",
    aadharNo: "",
    mobileNo: "",
    alternateMobileNo: "",
    whatsAppNo: "",
    emailId: "",
    address: "",
    carpetArea: "",
    wing: "",
    flatNo: "",
    type: "",
    soldRate: "",
    enclosedBalcony: "",
    openBalcony: "",
    terrace: "",
    parking: "",
    floor: "",
    totalConsideration: "",
    bookingAmount: "",
    stampDuty: "",
    registrationFee: "",
    gstAmount: "",
    paymentMode: "",
    chequeNo: "",
    chequeDate: "",
    bankName: "",
    bankDetails: ""
  });

  setCoAllottees([{
    name: "",
    dob: "",
    occupation: "",
    pan: "",
    aadhar: "",
    mobileEmail: ""
  }]);

  setAllotteeDocuments({
    panCard: [],
    aadhaarCard: [],
    marriageCertificate: [],
    passportPhoto: [],
    otherDocuments: []
  });

  setCoAllotteesDocuments([{
    panCard: [],
    aadhaarCard: [],
    marriageCertificate: [],
    passportPhoto: [],
    otherDocuments: []
  }]);

  setErrors({});
};





// const handleSubmit = () => {
//   if (!validateForm()) {
//     toast.error("Please fill all required fields!", { position: "top-right" });
//     return;
//   }

//   const newRecord = {
//     id: Date.now(),
//     timestamp: new Date().toLocaleString(),
//     enquiryNo: formData.enquiryNo,
//     projectName: formData.projectName,
//     dateOfFlatBooking: formData.dateOfFlatBooking,
//     nameOfAllottee: formData.nameOfAllottee,
//     sourceName: formData.sourceName,
//     dateOfBirth: formData.dateOfBirth,
//     occupation: formData.occupation,
//     panNo: formData.panNo,
//     aadharNo: formData.aadharNo,
//     mobileNo: formData.mobileNo,
//     alternateMobileNo: formData.alternateMobileNo,
//     whatsappNo: formData.whatsAppNo,
//     emailId: formData.emailId,
//     address: formData.address,
//     // Multiple co-allottees
//     coAllottees: coAllottees,
//     flatNo: formData.flatNo,
//     type: formData.type,
//     wing: formData.wing,
//     soldRate: formData.soldRate,
//     carpetAreaSqMtr: formData.carpetArea,
//     enclosedBalconySqMtr: formData.enclosedBalcony,
//     openBalconySqMtr: formData.openBalcony,
//     terraceSqMtr: formData.terrace,
//     parking: formData.parking,
//     floor: formData.floor,
//     totalConsideration: formData.totalConsideration,
//     bookingAmount: formData.bookingAmount,
//     stampDuty: formData.stampDuty,
//     registrationFee: formData.registrationFee,
//     gstAmount: formData.gstAmount,
//     paymentMode: formData.paymentMode,
//     chequeTrnNo: formData.chequeNo,
//     chequeTrnDate: formData.chequeDate,
//     bankName: formData.bankName,
//     bankDetails: formData.bankDetails,
//     // File references
//     panCardBoth: panCardFiles.map(file => file.name).join(', '),
//     aadharCardBoth: aadhaarCard.map(file => file.name).join(', '),
//     marriageCertificate: marriageCertificate.map(file => file.name).join(', '),
//     passportSizePhotoBoth: passportPhoto.map(file => file.name).join(', '),
//     anyOther: otherDocuments.map(file => file.name).join(', ')
//   };

//   setSubmittedData(prev => [...prev, newRecord]);

//   toast.success("Booking details submitted successfully!", {
//     position: "top-right",
//     autoClose: 3000,
//   });

//   resetForm();
//   setShowFirmForm(false);
// };

// const handleSubmit = () => {
//   if (!validateForm()) {
//     toast.error("Please fill all required fields!", { position: "top-right" });
//     return;
//   }

//   const newRecord = {
//     id: Date.now(),
//     timestamp: new Date().toLocaleString(),
//     enquiryNo: formData.enquiryNo,
//     projectName: formData.projectName,
//     dateOfFlatBooking: formData.dateOfFlatBooking,
//     nameOfAllottee: formData.nameOfAllottee,
//     sourceName: formData.sourceName,
//     dateOfBirth: formData.dateOfBirth,
//     occupation: formData.occupation,
//     panNo: formData.panNo,
//     aadharNo: formData.aadharNo,
//     mobileNo: formData.mobileNo,
//     alternateMobileNo: formData.alternateMobileNo,
//     whatsappNo: formData.whatsAppNo,
//     emailId: formData.emailId,
//     address: formData.address,

//     // Allottee documents
//     allotteePanCard: allotteeDocuments.panCard.map(file => file.name).join(', '),
//     allotteeAadhaarCard: allotteeDocuments.aadhaarCard.map(file => file.name).join(', '),
//     allotteeMarriageCertificate: allotteeDocuments.marriageCertificate.map(file => file.name).join(', '),
//     allotteePassportPhoto: allotteeDocuments.passportPhoto.map(file => file.name).join(', '),
//     allotteeOtherDocuments: allotteeDocuments.otherDocuments.map(file => file.name).join(', '),

//     // Co-allottees with their documents
//     coAllottees: coAllottees.map((coAllottee, index) => ({
//       ...coAllottee,
//       panCard: coAllotteesDocuments[index]?.panCard.map(file => file.name).join(', ') || '',
//       aadhaarCard: coAllotteesDocuments[index]?.aadhaarCard.map(file => file.name).join(', ') || '',
//       marriageCertificate: coAllotteesDocuments[index]?.marriageCertificate.map(file => file.name).join(', ') || '',
//       passportPhoto: coAllotteesDocuments[index]?.passportPhoto.map(file => file.name).join(', ') || '',
//       otherDocuments: coAllotteesDocuments[index]?.otherDocuments.map(file => file.name).join(', ') || ''
//     })),

//     flatNo: formData.flatNo,
//     type: formData.type,
//     wing: formData.wing,
//     soldRate: formData.soldRate,
//     carpetAreaSqMtr: formData.carpetArea,
//     enclosedBalconySqMtr: formData.enclosedBalcony,
//     openBalconySqMtr: formData.openBalcony,
//     terraceSqMtr: formData.terrace,
//     parking: formData.parking,
//     floor: formData.floor,
//     totalConsideration: formData.totalConsideration,
//     bookingAmount: formData.bookingAmount,
//     stampDuty: formData.stampDuty,
//     registrationFee: formData.registrationFee,
//     gstAmount: formData.gstAmount,
//     paymentMode: formData.paymentMode,
//     chequeTrnNo: formData.chequeNo,
//     chequeTrnDate: formData.chequeDate,
//     bankName: formData.bankName,
//     bankDetails: formData.bankDetails
//   };

//   setSubmittedData(prev => [...prev, newRecord]);

//   toast.success("Booking details submitted successfully!", {
//     position: "top-right",
//     autoClose: 3000,
//   });

//   resetForm();
//   setShowFirmForm(false);
// };
const handleSubmit = () => {
  if (!validateForm()) {
    toast.error("Please fill all required fields!", { position: "top-right" });
    return;
  }

  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    enquiryNo: formData.enquiryNo,
    projectName: formData.projectName,
    dateOfFlatBooking: formData.dateOfFlatBooking,
    nameOfAllottee: formData.nameOfAllottee,
    sourceName: formData.sourceName,
    dateOfBirth: formData.dateOfBirth,
    occupation: formData.occupation,
    panNo: formData.panNo,
    aadharNo: formData.aadharNo,
    mobileNo: formData.mobileNo,
    alternateMobileNo: formData.alternateMobileNo,
    whatsappNo: formData.whatsAppNo,
    emailId: formData.emailId,
    address: formData.address,

    // Allottee documents with file objects for preview
    allotteePanCard: allotteeDocuments.panCard,
    allotteeAadhaarCard: allotteeDocuments.aadhaarCard,
    allotteeMarriageCertificate: allotteeDocuments.marriageCertificate,
    allotteePassportPhoto: allotteeDocuments.passportPhoto,
    allotteeOtherDocuments: allotteeDocuments.otherDocuments,

    // Co-allottees with their documents
    coAllottees: coAllottees.map((coAllottee, index) => ({
      ...coAllottee,
      panCard: coAllotteesDocuments[index]?.panCard || [],
      aadhaarCard: coAllotteesDocuments[index]?.aadhaarCard || [],
      marriageCertificate: coAllotteesDocuments[index]?.marriageCertificate || [],
      passportPhoto: coAllotteesDocuments[index]?.passportPhoto || [],
      otherDocuments: coAllotteesDocuments[index]?.otherDocuments || []
    })),

    flatNo: formData.flatNo,
    type: formData.type,
    wing: formData.wing,
    soldRate: formData.soldRate,
    carpetAreaSqMtr: formData.carpetArea,
    enclosedBalconySqMtr: formData.enclosedBalcony,
    openBalconySqMtr: formData.openBalcony,
    terraceSqMtr: formData.terrace,
    parking: formData.parking,
    floor: formData.floor,
    totalConsideration: formData.totalConsideration,
    bookingAmount: formData.bookingAmount,
    stampDuty: formData.stampDuty,
    registrationFee: formData.registrationFee,
    gstAmount: formData.gstAmount,
    paymentMode: formData.paymentMode,
    chequeTrnNo: formData.chequeNo,
    chequeTrnDate: formData.chequeDate,
    bankName: formData.bankName,
    bankDetails: formData.bankDetails
  };

  setSubmittedData(prev => [...prev, newRecord]);

  toast.success("Booking details submitted successfully!", {
    position: "top-right",
    autoClose: 3000,
  });

  resetForm();
  setShowFirmForm(false);
};


const handleUpdateData = (updatedItem) => {
  setSubmittedData(prev =>
    prev.map(item => item.id === updatedItem.id ? updatedItem : item)
  );
};

  // PDF download functionality
  const handleDownloadPDFBooking = () => {
    const dataToDownload = filteredData.length > 0 ? filteredData : submittedData;

    if (dataToDownload.length === 0) {
      toast.info("No data available to download", { position: "top-right" });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);

    let headerText = "Booking Details Report";
    if (fromDate || toDate || searchTerm) {
      headerText += " (Filtered Data)";
    }
    doc.text(headerText, 14, 15);

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

    const tableColumn = [
      "S.NO.", "ENQUIRY NO", "PROJECT NAME", "DATE OF BOOKING", "NAME",
      "MOBILE NO", "EMAIL", "FLAT NO", "TYPE", "BOOKING AMOUNT"
    ];

    const tableRows = dataToDownload.map((row, index) => [
      index + 1,
      row.enquiryNo || "-",
      row.projectName || "-",
      row.dateOfFlatBooking ? new Date(row.dateOfFlatBooking).toLocaleDateString() : "-",
      row.nameOfAllottee || "-",
      row.mobileNo || "-",
      row.emailId || "-",
      row.flatNo || "-",
      row.type || "-",
      row.bookingAmount || "-"
    ]);

    autoTable(doc, {
      startY: filterDetails ? 35 : 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    let filename = "Booking_Details_Report";
    if (fromDate || toDate || searchTerm) {
      filename += "_Filtered";
    }
    doc.save(`${filename}.pdf`);

    let successMessage = "PDF downloaded successfully";
    if (fromDate || toDate || searchTerm) {
      successMessage += " with applied filters";
    }
    toast.success(successMessage, { position: "top-right", autoClose: 3000 });
  };

  const dummyData = [
    {
      action: "Edit",
      lastFollowUp: "",
      status: "",
      remark: "",
      nextFollowUp: "",
      assignTo: "",
      enquiryNo: "",
      leadNo: "",
      name: "",
      salesExe: "",
      mobile: "",
      whatsapp: "",
      alternateContact: "",
      email: "",
      address: "",
      occupation: "",
      company: "",
      interested: "",
      budget: "",
      reason: "",
      reference: "",
      nameOfCP: "",
      planningToBuy: "",
      followupDetails: "",
    },
  ];

  return (
    <div className="main-content" style={{ padding: isMobile ? "10px" : "20px" }}>
      <h6 style={{ fontSize: isMobile ? "14px" : "16px", marginBottom: "15px" }}>
        Sales Module / Booking Management
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

        {/* Download PDF Button */}
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
          onClick={handleDownloadPDFBooking}
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
                  {/* New Booking Button */}
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
                    + New Booking
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
                      onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
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
                      onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage >= totalPages - 1}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
                        color: currentPage >= totalPages - 1 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8250;
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3" style={{ overflowX: "auto", width: "100%" }}>

                <BookingFormTable
  data={paginatedData.length > 0 ? paginatedData : submittedData}
  onUpdate={handleUpdateData}
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
              sx={{
                '& .MuiDialog-paper': {
                  maxHeight: '90vh',
                  overflow: 'auto'
                }
              }}
            >
              <DialogTitle>New Booking Form</DialogTitle>


              <DialogContent  >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  {/* Section 1: Personal Information */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 2, color: Constants.primaryColor }}>
                    Section 1: Personal Information
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Enquiry No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.enquiryNo}
                        onChange={(e) => handleInputChange("enquiryNo", e.target.value)}
                        error={!!errors.enquiryNo}
                        helperText={errors.enquiryNo}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="project-name-label">Project Name</InputLabel>
                        <Select
                          labelId="project-name-label"
                          value={formData.projectName}
                          onChange={(e) => handleSelectChange("projectName", e.target.value)}
                          label="Project Name"
                          error={!!errors.projectName}
                        >
                          <MenuItem value="Project A">Project A</MenuItem>
                          <MenuItem value="Project B">Project B</MenuItem>
                          <MenuItem value="Project C">Project C</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6}>
  <TextField
    type="date"
    label="Date Of Flat Booking"
    fullWidth
    variant="outlined"
    size={isMobile ? "small" : "medium"}
    required
    value={formData.dateOfFlatBooking}
    onChange={(e) =>
      handleInputChange("dateOfFlatBooking", e.target.value)
    }
    InputLabelProps={{ shrink: true }}
    error={!!errors.dateOfFlatBooking}
    helperText={errors.dateOfFlatBooking}
  />
</Grid>



                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Name Of Allottee"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.nameOfAllottee}
                        onChange={(e) => handleInputChange("nameOfAllottee", e.target.value)}
                        error={!!errors.nameOfAllottee}
                        helperText={errors.nameOfAllottee}
                        required
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        type="datetime-local"
                        label="Source Name"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.sourceName}
                        onChange={(e) => handleInputChange("sourceName", e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
  <TextField
    type="date"
    label="Date Of Birth"
    fullWidth
    variant="outlined"
    size={isMobile ? "small" : "medium"}
    required
    value={formData.dateOfBirth}
    onChange={(e) =>
      handleInputChange("dateOfBirth", e.target.value)
    }
    InputLabelProps={{ shrink: true }}
    error={!!errors?.dateOfBirth}
    helperText={errors?.dateOfBirth}
  />
</Grid>


                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="occupation-label">Occupation</InputLabel>
                        <Select
                          labelId="occupation-label"
                          value={formData.occupation}
                          onChange={(e) => handleSelectChange("occupation", e.target.value)}
                          label="Occupation"
                        >
                          <MenuItem value="Business">Business</MenuItem>
                          <MenuItem value="Service">Service</MenuItem>
                          <MenuItem value="Professional">Professional</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="PAN No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.panNo}
                        onChange={(e) => handleInputChange("panNo", e.target.value.toUpperCase())}
                        error={!!errors.panNo}
                        helperText={errors.panNo}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="AADHAR No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.aadharNo}
                        onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                        error={!!errors.aadharNo}
                        helperText={errors.aadharNo}
                        inputProps={{ maxLength: 12 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Mobile No"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.mobileNo}
                        onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                        error={!!errors.mobileNo}
                        helperText={errors.mobileNo}
                        required
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Alternate Mobile No"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.alternateMobileNo}
                        onChange={(e) => handleInputChange("alternateMobileNo", e.target.value)}
                        error={!!errors.alternateMobileNo}
                        helperText={errors.alternateMobileNo}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="WhatsApp No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.whatsAppNo}
                        onChange={(e) => handleInputChange("whatsAppNo", e.target.value)}
                        error={!!errors.whatsAppNo}
                        helperText={errors.whatsAppNo}
                        inputProps={{ maxLength: 10 }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Email ID"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.emailId}
                        onChange={(e) => handleInputChange("emailId", e.target.value)}
                        type="email"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Address"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        multiline
                        // rows={1}
                      />
                    </Grid>

                                      {/* Documents for Main Allottee */}

                     {[
    { type: "panCard", label: "PAN Card" },
    { type: "aadhaarCard", label: "AADHAR Card" },
    { type: "marriageCertificate", label: "MARRIAGE CERTIFICATE (If Available)" },
    { type: "passportPhoto", label: "PASSPORT SIZE PHOTO" },
    { type: "otherDocuments", label: "Any Other" }
  ].map((doc, index) => (
    <Grid item xs={12} sm={6} key={index}>
      <Typography variant="body2" gutterBottom>{doc.label}</Typography>
      <Button
        variant="outlined"
        component="label"
        size={isMobile ? "small" : "medium"}
        fullWidth
        startIcon={<FaUpload />}
      >
        Choose Files
        <input
          type="file"
          multiple
          hidden
          onChange={(e) => handleAllotteeDocumentChange(doc.type, Array.from(e.target.files))}
        />
      </Button>
      {allotteeDocuments[doc.type].length > 0 && (
        <Box sx={{ mt: 1 }}>
          {allotteeDocuments[doc.type].map((file, fileIndex) => (
            <Typography key={fileIndex} variant="body2" sx={{ fontSize: '0.75rem' }}>
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </Grid>
  ))}


                  </Grid>

{/* Section 2: Co-Allottees with Documents */}
<Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
  Section 2: Co-Allottees
</Typography>

{coAllottees.map((coAllottee, index) => (
  <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="subtitle1" sx={{ color: Constants.primaryColor }}>
        Co-Allottee {index + 1}
      </Typography>
      {coAllottees.length > 1 && (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleRemoveCoAllottee(index)}
        >
          Remove
        </Button>
      )}
    </Box>

    <Grid container spacing={isMobile ? 1 : 2}>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Name of Co-Allottee"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.name}
          onChange={(e) => handleCoAllotteeChange(index, "name", e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          type="date"
          label="Date Of Birth (Co-Allottee)"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.dob}
          onChange={(e) => handleCoAllotteeChange(index, "dob", e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="Occupation (Co-Allottee)"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.occupation}
          onChange={(e) => handleCoAllotteeChange(index, "occupation", e.target.value)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="PAN No. (Co-Allottee)"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.pan}
          onChange={(e) => handleCoAllotteeChange(index, "pan", e.target.value.toUpperCase())}
          inputProps={{ maxLength: 10 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="AADHAR No. (Co-Allottee)"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.aadhar}
          onChange={(e) => handleCoAllotteeChange(index, "aadhar", e.target.value)}
          error={!!errors[`coAllotteeAadhar${index}`]}
          helperText={errors[`coAllotteeAadhar${index}`]}
          inputProps={{ maxLength: 12 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          label="MOBILE No. & EMAIL (Co-Allottee)"
          fullWidth
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          value={coAllottee.mobileEmail}
          onChange={(e) => handleCoAllotteeChange(index, "mobileEmail", e.target.value)}
        />
      </Grid>

      {/* Documents for each Co-Allottee */}
      {[
        { type: "panCard", label: "PAN Card" },
        { type: "aadhaarCard", label: "AADHAR Card" },
        { type: "marriageCertificate", label: "MARRIAGE CERTIFICATE (If Available)" },
        { type: "passportPhoto", label: "PASSPORT SIZE PHOTO" },
        { type: "otherDocuments", label: "Any Other" }
      ].map((doc, docIndex) => (
        <Grid item xs={12} sm={6} key={docIndex}>
          <Typography variant="body2" gutterBottom>{doc.label} (Co-Allottee {index + 1})</Typography>
          <Button
            variant="outlined"
            component="label"
            size={isMobile ? "small" : "medium"}
            fullWidth
            startIcon={<FaUpload />}
          >
            Choose Files
            <input
              type="file"
              multiple
              hidden
              onChange={(e) => handleCoAllotteeDocumentChange(index, doc.type, Array.from(e.target.files))}
            />
          </Button>
          {coAllotteesDocuments[index]?.[doc.type]?.length > 0 && (
            <Box sx={{ mt: 1 }}>
              {coAllotteesDocuments[index][doc.type].map((file, fileIndex) => (
                <Typography key={fileIndex} variant="body2" sx={{ fontSize: '0.75rem' }}>
                  {file.name}
                </Typography>
              ))}
            </Box>
          )}
        </Grid>
      ))}
    </Grid>
  </Box>
))}

<Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
  <Button
    variant="outlined"
    onClick={handleAddCoAllottee}
    startIcon={<FaPlus />}
    sx={{ borderColor: Constants.primaryColor, color: Constants.primaryColor }}
  >
    Add Another Co-Allottee
  </Button>
</Box>



                    {/* Section 3: Particulars of Flat */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 3: Particulars of Flat
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                      { field: "carpetArea", label: "Carpet Area in (Sq. Mtr.)", type: "select", options: ["100", "150", "200", "250"] },
                      { field: "wing", label: "Wing", type: "select", options: ["A", "B", "C"] },
                      { field: "flatNo", label: "FLAT No.", type: "select", options: ["101", "102", "103"] },
                      { field: "type", label: "Type", type: "select", options: ["2BHK", "3BHK", "4BHK"] },
                      { field: "soldRate", label: "Sold Rate", type: "number" },
                      { field: "enclosedBalcony", label: "Enclosed Balcony in (Sq. Mtr.)", type: "select", options: ["10", "15", "20"] },
                      { field: "openBalcony", label: "Open Balcony in (Sq. Mtr.)", type: "select", options: ["5", "10", "15"] },
                      { field: "terrace", label: "Terrace in (Sq. Mtr.)", type: "select", options: ["30", "40", "50"] },
                      { field: "parking", label: "Parking", type: "select", options: ["Stack Parking", "Open car parking", "Covered car parking", "Basement car parking", "Other"] },
                      { field: "floor", label: "Floor", type: "select", options: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"] }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        {item.type === "select" ? (
                          <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                            <InputLabel>{item.label}</InputLabel>
                            <Select
                              value={formData[item.field]}
                              onChange={(e) => handleSelectChange(item.field, e.target.value)}
                              label={item.label}
                            >
                              {item.options.map(option => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <TextField
                            label={item.label}
                            fullWidth
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                            value={formData[item.field]}
                            onChange={(e) => handleInputChange(item.field, e.target.value)}
                            type={item.type}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>

                  {/* Section 4: Consideration */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 4: Consideration
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    {[
                      { field: "totalConsideration", label: "Total Consideration / Agreement Value", type: "number" },
                      { field: "bookingAmount", label: "Booking Amount / Advance Payment", type: "number" },
                      { field: "stampDuty", label: "Stamp Duty (7% of Agreement Cost)", type: "number" },
                      { field: "registrationFee", label: "Registration Fee(Auto Calculated)", type: "number" },
                      { field: "gstAmount", label: "GST Amount(Auto Calculated)", type: "number" }
                    ].map((item, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <TextField
                          label={item.label}
                          fullWidth
                          variant="outlined"
                          size={isMobile ? "small" : "medium"}
                          value={formData[item.field]}
                          onChange={(e) => handleInputChange(item.field, e.target.value)}
                          type={item.type}
                        />
                      </Grid>
                    ))}
                  </Grid>


                    {/* Section 5: Booking Payment Mode */}
                  <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
                    Section 5: Booking Payment Mode
                  </Typography>

                  <Grid container spacing={isMobile ? 1 : 2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Booking Amount"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.bookingAmount}
                        onChange={(e) => handleInputChange("bookingAmount", e.target.value)}
                        type="number"
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
                        <Select
                          labelId="payment-mode-label"
                          value={formData.paymentMode}
                          onChange={(e) => handleSelectChange("paymentMode", e.target.value)}
                          label="Payment Mode"
                        >
                          <MenuItem value="Cheque">Cheque</MenuItem>
                          <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                          <MenuItem value="Cash">Cash</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cheque/TRN No."
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.chequeNo}
                        onChange={(e) => handleInputChange("chequeNo", e.target.value)}
                      />
                    </Grid>


                    <Grid item xs={12} sm={6}>
  <TextField
    type="date"
    label="Cheque/TRN Date"
    fullWidth
    variant="outlined"
    size={isMobile ? "small" : "medium"}
    required
    value={formData.chequeDate}
    onChange={(e) =>
      handleInputChange("chequeDate", e.target.value)
    }
    InputLabelProps={{ shrink: true }}
    error={!!errors?.chequeDate}
    helperText={errors?.chequeDate}
  />
</Grid>


                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth variant="outlined" size={isMobile ? "small" : "medium"}>
                        <InputLabel id="bank-name-label">Bank Name</InputLabel>
                        <Select
                          labelId="bank-name-label"
                          value={formData.bankName}
                          onChange={(e) => handleSelectChange("bankName", e.target.value)}
                          label="Bank Name"
                        >
                          <MenuItem value="State Bank of India (SBI)">State Bank of India (SBI)</MenuItem>
                          <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                          <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                          <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Bank Details"
                        fullWidth
                        variant="outlined"
                        size={isMobile ? "small" : "medium"}
                        value={formData.bankDetails}
                        onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
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

export default BookingForm;