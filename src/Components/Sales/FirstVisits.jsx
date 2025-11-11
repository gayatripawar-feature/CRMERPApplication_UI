// import React, { useState, useRef , useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid,FormControl,InputLabel,Select, MenuItem ,Box,Tooltip,IconButton} from '@mui/material';
// import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
// import { Inventory } from '@mui/icons-material';
// import InventoryTable from './InventoryTable';
// import { ToastContainer, toast } from "react-toastify";
// import NewLeads from './NewLeads';
// import DisplayEnquiryTable from './DisplayEnquiryTable';
// import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import {  FaFileDownload } from "react-icons/fa";
// import autoTable from "jspdf-autotable";
// import FormHelperText from '@mui/material/FormHelperText';
// import Constants from '../Constants';

// // API Call Function
// const fetchLoansData = async () => {
//   const response = await fetch('/api/getOCRCollection');
//   return response.json();
// };

// // Dropdown Options
// const statusOptions = ["Approved", "Unapproved"];
// const owners = ["Landowner", "Developer", "Investor"];
// const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
// const unitTypes = ["Actual Site", "Hoarding","Facebook","Instagram","Website","Print Media","Radio","Google add","Exhibition","Online Portal","Direct call","Pamphlet","Channel Partner","References","Other"];




// const sections = [
//     { label: "Display Enquiries", icon: <FaEye size={24} />, bgColor: "primary.main" },
//     { label: "Sample CSV", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
//     { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
//   ];

// const FirstVisits = () => {
//   const [loans, setLoans] = useState([]);
//   const [expandedSection, setExpandedSection] = useState(0);
//   const [showFirmForm, setShowFirmForm] = useState(false);
//   const [partners, setPartners] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [showFileInput, setShowFileInput] = useState(false);
//   const [leadNo, setLeadNo] = useState(''); 
//   const [salesExec, setSalesExec] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileError, setMobileError] = useState('');
//   const [interestedIn, setInterestedIn] = useState('');
//   const [planningToBuy, setPlanningToBuy] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [budget, setBudget] = useState('');
//   const [reasonForPurchase, setReasonForPurchase] = useState('');
//   const [emailError, setEmailError] = useState('')

//   const [nameError, setNameError] = useState(false);
//   const [alternateContact, setAlternateContact] = useState("");
//   const [whatsappNo, setWhatsappNo] = useState("");
//   const [firms, setFirms] = useState([]);

//   useEffect(() => {
//     loadLoansData();
//   }, []);

//   const fileInputRef = useRef(null);

//   const [data, setData] = useState([
//    ]);


//   const handleInterestedInChange = (event) => {
//     setInterestedIn(event.target.value);
//   };
// // Handle the change for 'Budget'
// const handleBudgetChange = (event) => {
//     setBudget(event.target.value);
//   };

//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoans(data);
//   };

//  // Handle the change for 'Planning To Buy Within'
//  const handlePlanningToBuyChange = (event) => {
//     setPlanningToBuy(event.target.value);
//   };

//    // Handle the change for 'Occupation'
//    const handleOccupationChange = (event) => {
//     setOccupation(event.target.value); // Update occupation state
//   };

//   const handleReasonForPurchaseChange = (event) => {
//     setReasonForPurchase(event.target.value); // Update reasonForPurchase state
//   };

//   const handleToggleSection = (index) => {
//     if (index === 1) {
//       // Download Sample CSV
//       downloadSampleCsv();
//     } else if (index === 2) {
//       // Check if file input ref is defined before clicking
//       if (fileInputRef.current) {
//         fileInputRef.current.click();
//       }
//     } else {
//       setExpandedSection(index);
//       setShowFileInput(false);
//     }
//   };
//   const [inventoryData, setInventoryData] = useState([]);

//   // ✅ Function to handle deletion of a row
//   const handleDelete = (index) => {
//     setInventoryData(inventoryData.filter((_, i) => i !== index));
//   };

//   const downloadSampleCsv = () => {
//     const sampleData = `Sales Exp.,Name,Mobile,Alternate Mobile Number,WhatsApp No.,Email,Address,Occupation,Company,Interested In,Budget,Reason,Reference,Name of CP,Planning to Buy,Follow Up Details\n`;

//     const blob = new Blob([sampleData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "lead_template.csv";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };


//   const handleChange = (e) => {
//     const value = e.target.value;


//     const regex = /[\d\s]/;


//     if (regex.test(value)) {
//       setError('Name should not contain digits or spaces');
//     } else {
//       setError(''); 
//     }


//   };



//   const handleSubmit = () => {
//     const newFirmData = {
//       leadNo,
//       name,
//       mobile,
//       alternateContact,
//       whatsappNo,
//       email,
//       salesExec,
//       interestedIn,
//       budget,
//       planningToBuy,
//       occupation,
//       reasonForPurchase,
//     };

//     console.log("Submitting new firm data:", newFirmData);

//     // Validation logs
//     if (!name || nameError || mobileError || emailError) {
//       console.log("Validation failed", {
//         nameError,
//         mobileError,
//         emailError
//       });
//       toast.error("Please fix validation errors before submitting.");
//       return;
//     }

//     setFirms(prev => {
//       const updatedFirms = [...prev, newFirmData];
//       console.log("Updated firms list after submit:", updatedFirms);
//       return updatedFirms;
//     });

//     toast.success("Details are submitted!", {
//       position: "top-right",
//       autoClose: 3000,
//     });

//     // Reset form values
//     setLeadNo("");
//     setName("");
//     setMobile("");
//     setAlternateContact("");
//     setWhatsappNo("");
//     setEmail("");
//     setSalesExec("");
//     setInterestedIn("");
//     setBudget("");
//     setPlanningToBuy("");
//     setOccupation("");
//     setReasonForPurchase("");

//     setShowFirmForm(false);
//   };

// const handleUpdateItem = (index, updatedItem) => {
//   const updatedData = [...inventoryData];
//   updatedData[index] = updatedItem;
//   setInventoryData(updatedData);
//   console.log("Updated inventoryData:", updatedData);

// };


//   const handleSalesExecChange = (event) => {
//     setSalesExec(event.target.value);
//     setError(''); 
//   };

//   const validateMobile = (value) => {
//     const regex = /^[0-9]{10}$/;  
//     if (!regex.test(value)) {
//       setMobileError('Mobile number should contain exactly 10 digits');
//     } else {
//       setMobileError('');
//     }
//   };

//   const handleNameChange = (e) => {
//     const value = e.target.value;
//     const regex = /^[A-Za-z\s]*$/;  // Only letters and spaces

//     if (regex.test(value)) {
//       setName(value);
//       setNameError(false);
//     } else {
//       setName(value);
//       setNameError(true);  // Show error when invalid input
//     }
//   };

//   // Validate email format
//   const validateEmail = (value) => {
//     // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Basic email regex
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!regex.test(value)) {
//       setEmailError('Please enter a valid email address');
//     } else {
//       setEmailError('');
//     }
//   };

//   // Handle change in mobile input
//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     setMobile(value);
//     validateMobile(value);
//   };

//   // Handle change in email input
//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     validateEmail(value);
//   };


//   const handleDownloadPDFLeads = () => {
//     console.log("Loans data before mapping:", loans);

//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Leads Report", 14, 15);

//     // Columns for the first page
//     const firstPageColumns = [
//         "Timestamp", "ENQUIRY NO.", "LEAD NO.", "ASSIGN TO", "SALES EXE.",
//         "NAME", "MOBILE No", "EMAIL", "ADDRESS", "OCCUPATION"
//     ];

//     // Columns for the second page
//     const secondPageColumns = [
//         "COMPANY", "INTERESTED", "BUDGET", "REASON", "REFERENCE",
//         "NAME OF CP", "PLANNING TO BUY?", "FOLLOWUP DETAILS"
//     ];

//     // Limit the number of rows per page
//     const maxRowsPerPage = 15;
//     const totalRows = Math.min(loans.length, maxRowsPerPage * 2);

//     // Mapping data for the first page
//     const firstPageRows = loans.slice(0, totalRows).map(row => [
//         row.timestamp || "-",
//         row.enquiryNo || "-",
//         row.leadNo || "-",
//         row.assignTo || "-",
//         row.salesExecutive || "-",
//         row.name || "-",
//         row.mobile || "-",
//         row.email || "-",
//         row.address || "-",
//         row.occupation || "-"
//     ]);

//     // Mapping data for the second page
//     const secondPageRows = loans.slice(0, totalRows).map(row => [
//         row.company || "-",
//         row.interested || "-",
//         row.budget || "-",
//         row.reason || "-",
//         row.reference || "-",
//         row.nameOfCP || "-",
//         row.planningToBuy || "-",
//         row.followupDetails || "-"
//     ]);

//     console.log("Formatted Table Rows for First Page:", firstPageRows);
//     console.log("Formatted Table Rows for Second Page:", secondPageRows);

//     // Generate the first page
//     autoTable(doc, {
//         startY: 25,
//         head: [firstPageColumns],
//         body: firstPageRows,
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//         margin: { top: 20 }
//     });

//     // Add a new page for the remaining columns
//     doc.addPage();
//     doc.text("Leads Report (Continued)", 14, 15);

//     // Generate the second page
//     autoTable(doc, {
//         startY: 25,
//         head: [secondPageColumns],
//         body: secondPageRows,
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//         margin: { top: 20 }
//     });

//     doc.save("Leads_Report.pdf");
// };


// const handleLeadNoChange = (e) => {
//   setLeadNo(e.target.value);
// };


//   return (
//     <div className="main-content">
//       <h6>Sales Module / Lead Management</h6>


//       <div className="d-flex align-items-center mb-3">



// <div className="d-flex align-items-center mb-3">


// {sections.map((section, index) => (
//   <Tooltip key={index} title={section.label} arrow>
//     <div
//       style={{
//         display: 'flex',              
//         alignItems: 'center',          
//         justifyContent: 'flex-start',  
//         backgroundColor: Constants.primaryColor,
//         padding: '10px',
//         margin: '10px',
//         borderRadius: '20px',          
//         color: 'white',
//         fontSize: '16px',              
//         width: expandedSection === index ? '200px' : '50px',  // Toggle width based on expanded state
//         height: '50px',                // Make the height consistent for both collapsed and expanded
//         transition: 'width 0.3s ease', // Smooth transition for the width
//         background:Constants.primaryColor,
//         boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)', // Shadow for depth
//       }}
//     >
//       {/* Icon */}
//       <IconButton
//         color="primary"
//         onClick={() => handleToggleSection(index)}
//         sx={{
//           padding: 0,                   // Remove padding around icon for tight alignment
//           marginRight: '8px',           // Add space between icon and label
//           fontSize: '24px',             // Increased icon size
//           color: 'white',               // Set the icon color to white
//         }}
//       >
//         {section.icon}
//       </IconButton>

//       {/* Label */}
//       <span className='text-white fw-bold'
//         style={{
//           color: 'white',
//           fontSize: '16px',
//           display: expandedSection === index ? 'inline' : 'none', // Show label only when expanded
//           marginLeft: '8px',             // Add some space between icon and label
//         }}
//       >
//         {section.label}
//       </span>
//     </div>
//   </Tooltip>
// ))}




// </div>

// {/* File Upload Input */}
// {showFileInput && (
//   <div className="m-3">
//     <input type="file" accept=".csv, .xlsx" />
//   </div>
// )}

//  {/* Hidden file input element */}
//  <input
//         type="file"
//         accept=".csv, .xlsx"
//         ref={fileInputRef}
//         style={{ display: 'none' }} // Hidden input element
//         onChange={(e) => {
//           console.log('File selected:', e.target.files[0]);
//         }}
//       />



//       </div>

//       {/* Display Inventory Section */}
//       {expandedSection === 0 && (
//         <div className="content-container mt-0">
//           {!showFirmForm ? (
//             <>

//               <div className="button-container">
//                 <div className='d-flex gap-3'>
//                 <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} onClick={() => setShowFirmForm(true)}>
//                   + New Enquiry
//                 </Button>

//                 <Button
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
//     onClick={handleDownloadPDFLeads}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//                 </div>

//                 {/* Pagination Buttons */}
//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">

//               <DisplayEnquiryTable data={firms} />

//            </div>
//             </>
//           ) : (


// <div
//   className="firm-form mt-4 p-3 border rounded"
//   style={{
//     maxHeight: "500px",
//     overflowY: "auto",
//     backgroundColor: "#f8f9fa",
//     border: "1px solid #ccc",
//   }}
// >
//   <Grid container spacing={2}>
//     {/* Lead No. Field */}
//     <Grid item xs={4}>
//       <FormControl fullWidth error={!!error}>
//         <InputLabel>Lead No.</InputLabel>
//         <Select value={leadNo} onChange={handleLeadNoChange} label="Lead No.">
//           <MenuItem value="Lead 9">Lead 9</MenuItem>
//           <MenuItem value="Lead 16">Lead 16</MenuItem>
//           <MenuItem value="Lead 25">Lead 25</MenuItem>
//           <MenuItem value="Lead 26">Lead 26</MenuItem>
//           <MenuItem value="Lead 27">Lead 27</MenuItem>
//           <MenuItem value="Lead 4">Lead 4</MenuItem>
//           <MenuItem value="Lead 3">Lead 3</MenuItem>
//         </Select>
//         {error && <FormHelperText>{error}</FormHelperText>}
//       </FormControl>
//     </Grid>

//     <Grid item xs={4}>
//   <TextField
//     label="Name"
//     fullWidth
//     value={name}
//     onChange={handleNameChange}
//     error={nameError}
//     helperText={nameError ? "Only letters are allowed" : ""}
//   />
// </Grid>



//     <Grid item xs={4}>
//       <TextField
//         label="Mobile No."
//         fullWidth
//         value={mobile}
//         onChange={handleMobileChange}
//         error={!!mobileError} 
//         helperText={mobileError} 
//       />
//     </Grid>

//     <Grid item xs={4}>
//   <TextField
//     label="Alternate Contact No."
//     fullWidth
//     value={alternateContact}
//     onChange={(e) => {
//       const value = e.target.value;
//       // Allow only numbers and limit to 10 digits
//       if (/^\d{0,10}$/.test(value)) {
//         setAlternateContact(value);
//       }
//     }}
//     error={alternateContact.length > 0 && alternateContact.length < 10}
//     helperText={
//       alternateContact.length > 0 && alternateContact.length < 10
//         ? "Mobile number must be 10 digits"
//         : ""
//     }
//   />
// </Grid>



//     <Grid item xs={4}>
//   <TextField
//     type="text"
//     label="WhatsApp No"
//     fullWidth
//     value={whatsappNo}
//     onChange={(e) => {
//       const value = e.target.value;

//       if (/^\d{0,10}$/.test(value)) {
//         setWhatsappNo(value);
//       }
//     }}
//     error={whatsappNo.length > 0 && whatsappNo.length < 10}
//     helperText={
//       whatsappNo.length > 0 && whatsappNo.length < 10
//         ? "Mobile number must be 10 digits"
//         : ""
//     }
//   />
// </Grid>



//     <Grid item xs={4}>
//       <TextField label="Email" fullWidth 
//       value={email}
//       onChange={handleEmailChange}
//       error={!!emailError} 
//       helperText={emailError}
//       />
//     </Grid>


//     <Grid item xs={4}>
//       <TextField label="Address" fullWidth />
//     </Grid>


//     <Grid item xs={4}>
//       <TextField label="Company" fullWidth />
//     </Grid>

//     <Grid item xs={4}>
//       <TextField label="Reference by / Source" fullWidth />
//     </Grid>


//     <Grid item xs={4}>
//       <TextField label="Name of CP (if Channel Partner)" fullWidth />
//     </Grid>


//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Sales Executive Name</InputLabel>
//         <Select
//           value={salesExec}
//           onChange={handleSalesExecChange}
//           label="Sales Executive Name"
//         >
//           <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
//           <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
//           <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
//           <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
//           <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//           <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
//           <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
//           <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>

//     {/* Interested In Field */}
//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Interested In</InputLabel>
//         <Select
//           value={interestedIn}
//           onChange={handleInterestedInChange}
//           label="Interested In"
//         >
//           <MenuItem value="2 BHK (Under construction)">2 BHK (Under construction)</MenuItem>
//           <MenuItem value="3 BHK (Under Construction)">3 BHK (Under Construction)</MenuItem>
//           <MenuItem value="2BHK">2BHK</MenuItem>
//           <MenuItem value="3BHK">3BHK</MenuItem>
//           <MenuItem value="Other">Other</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>


//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Budget (Approx.)</InputLabel>
//         <Select value={budget} onChange={handleBudgetChange} label="Budget (Approx.)">
//           <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
//           <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
//           <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
//           <MenuItem value="61-65 L">61-65 L</MenuItem>
//           <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
//           <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
//           <MenuItem value="Other">Other</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>


//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Planning To Buy Within?</InputLabel>
//         <Select
//           value={planningToBuy}
//           onChange={handlePlanningToBuyChange}
//           label="Planning To Buy Within?"
//         >
//           <MenuItem value="Immediately">Immediately</MenuItem>
//           <MenuItem value="Within Week">Within Week</MenuItem>
//           <MenuItem value="Within 1 Month">Within 1 Month</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>


//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Occupation</InputLabel>
//         <Select value={occupation} onChange={handleOccupationChange} label="Occupation">
//           <MenuItem value="Service / Job">Service / Job</MenuItem>
//           <MenuItem value="Business / Self employed">Business / Self employed</MenuItem>
//           <MenuItem value="Professional">Professional</MenuItem>
//           <MenuItem value="Other">Other</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>


//     <Grid item xs={4}>
//       <FormControl fullWidth >
//         <InputLabel>Reason For Purchase</InputLabel>
//         <Select
//           value={reasonForPurchase}
//           onChange={handleReasonForPurchaseChange}
//           label="Reason For Purchase"
//         >
//           <MenuItem value="End Use">End Use</MenuItem>
//           <MenuItem value="Investment">Investment</MenuItem>
//         </Select>
//         {/* {error && <FormHelperText>{error}</FormHelperText>} */}
//       </FormControl>
//     </Grid>


//     <Grid item xs={4}>
//       <TextField label="Customer Feedback & Complete Followup Details" fullWidth />
//     </Grid>
//   </Grid>

//   <Button
//     variant="contained"
//     className="mt-3"
//     color="success"
//     // onClick={() => {
//     //   setShowFirmForm(false);
//     //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//     // onClick={() => {
//     //   const newFirmData = {
//     //     leadNo,
//     //     name,
//     //     mobile,
//     //     alternateContact,
//     //     whatsappNo,
//     //     email,
//     //     salesExec,
//     //     interestedIn,
//     //     budget,
//     //     planningToBuy,
//     //     occupation,
//     //     reasonForPurchase,
//     //     // Include others as needed...
//     //   };

//     //   setFirms(prev => [...prev, newFirmData]);
//     //   setShowFirmForm(false);
//     //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//    onClick={handleSubmit}

//     // }}
//   >
//     Submit
//   </Button>
// </div>




//           )}
//         </div>
//       )}

// {/* {expandedSection === 1 && (
//         <div className="content-container mt-3">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container">
//                 <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>

//                 </Button>

//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">
//               <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />

//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded" 
//             style={{
//               backgroundColor: "#f8f9fa", 
//               border: "1px solid #ccc",
//             }}
//             >

//               <Grid container spacing={2}>
//                 <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Type of Units" fullWidth>
//                     {unitTypes.map((type, idx) => (
//                       <MenuItem key={idx} value={type}>{type}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Configuration" fullWidth>
//                     {configurations.map((config, idx) => (
//                       <MenuItem key={idx} value={config}>{config}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <TextField select label="Status" fullWidth>
//                     {statusOptions.map((status, idx) => (
//                       <MenuItem key={idx} value={status}>{status}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Select Owner" fullWidth>
//                     {owners.map((owner, idx) => (
//                       <MenuItem key={idx} value={owner}>{owner}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="ATT. Terrace Carpet Area (Sq Ft)"
//     fullWidth
//     inputProps={{ step: "0.01", min: "0.01" }}
//   />
// </Grid>

//                 <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
//               </Grid>



//               {partners.map((_, index) => (
//                 <Grid container spacing={2} key={index}>
//                   <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//                   <Grid item xs={4}>
//                     <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
//                       <FaTrash />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}



//               <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
//                 Submit
//               </Button>


//             </div> 




//           )}
//         </div>
//       )} */}


// {/* {expandedSection === 2 && (
//         <div className="content-container mt-3">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container">
//                 <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
//                   + Display Inventory
//                 </Button>

//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">
//               <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />
//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded">

//               <Grid container spacing={2}>
//                 <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Type of Units" fullWidth>
//                     {unitTypes.map((type, idx) => (
//                       <MenuItem key={idx} value={type}>{type}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Configuration" fullWidth>
//                     {configurations.map((config, idx) => (
//                       <MenuItem key={idx} value={config}>{config}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Status" fullWidth>
//                     {statusOptions.map((status, idx) => (
//                       <MenuItem key={idx} value={status}>{status}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//                   <TextField select label="Select Owner" fullWidth>
//                     {owners.map((owner, idx) => (
//                       <MenuItem key={idx} value={owner}>{owner}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>


//                 <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="ATT. Terrace Carpet Area (Sq Ft)"
//     fullWidth
//     inputProps={{ step: "0.01", min: "0.01" }}
//   />
// </Grid>

//                 <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
//               </Grid>



//               {partners.map((_, index) => (
//                 <Grid container spacing={2} key={index}>
//                   <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//                   <Grid item xs={4}>
//                     <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
//                       <FaTrash />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}



//               <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
//                 Submit
//               </Button>
//             </div> 




//           )}
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default FirstVisits;




import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  FaEye,
  FaFileCsv,
  FaUpload,
  FaPlus,
  FaTrash,
  FaFileDownload,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import DisplayEnquiryTable from "./DisplayEnquiryTable";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import FormHelperText from "@mui/material/FormHelperText";
import Constants from "../Constants";

// API Call Function
const fetchLoansData = async () => {
  const response = await fetch("/api/getOCRCollection");
  return response.json();
};

// Dropdown Options
const statusOptions = ["Approved", "Unapproved"];
const owners = ["Landowner", "Developer", "Investor"];
const configurations = [
  "1 BHK",
  "1.5 BHK",
  "2 BHK",
  "2.5 BHK",
  "3 BHK",
  "3.5 BHK",
  "4 BHK",
  "4.5 BHK",
  "Flat",
  "Shop",
];
const unitTypes = [
  "Actual Site",
  "Hoarding",
  "Facebook",
  "Instagram",
  "Website",
  "Print Media",
  "Radio",
  "Google add",
  "Exhibition",
  "Online Portal",
  "Direct call",
  "Pamphlet",
  "Channel Partner",
  "References",
  "Other",
];

const sections = [
  {
    label: "Display Enquiries",
    icon: <FaEye size={24} />,
    bgColor: "primary.main",
  },
  {
    label: "Sample CSV",
    icon: <FaFileCsv size={24} />,
    bgColor: "success.main",
  },
  {
    label: "Upload Excel",
    icon: <FaUpload size={24} />,
    bgColor: "secondary.main",
  },
];

const FirstVisits = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);
  const [leadNo, setLeadNo] = useState("");
  const [salesExec, setSalesExec] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [planningToBuy, setPlanningToBuy] = useState("");
  const [occupation, setOccupation] = useState("");
  const [budget, setBudget] = useState("");
  const [reasonForPurchase, setReasonForPurchase] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [alternateContact, setAlternateContact] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [firms, setFirms] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [referenceBySource, setReferenceBySource] = useState("");
  const [nameOfCp, setNameOfCp] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState("");
  //  const [leads, setLeads] = useState([]);
  const [leads, setLeads] = useState({ scheduled: [], done: [] });
  const [remarks, setRemarks] = useState();



  useEffect(() => {
    console.log("fetching visit Scheduled leads ");
    fetchVisitScheduledLeads();
  }, []);

  const fileInputRef = useRef(null);

  const [data, setData] = useState([]);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

  const handleInterestedInChange = (event) => {
    setInterestedIn(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const handlePlanningToBuyChange = (event) => {
    setPlanningToBuy(event.target.value);
  };

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const handleToggleSection = (index) => {
    if (index === 1) {
      downloadSampleCsv();
    } else if (index === 2) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      setExpandedSection(index);
      setShowFileInput(false);
    }
  };

  const downloadSampleCsv = () => {
    const sampleData = `Sales Exp.,Name,Mobile,Alternate Mobile Number,WhatsApp No.,Email,Address,Occupation,Company,Interested In,Budget,Reason,Reference,Name of CP,Planning to Buy,Follow Up Details\n`;

    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "lead_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /[\d\s]/;

    if (regex.test(value)) {
      setError("Name should not contain digits or spaces");
    } else {
      setError("");
    }
  };
  // first
  // const handleSubmit = () => {
  //   // Validate required fields
  //   if (!leadNo) {
  //     toast.error("Lead No. is required", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   if (!interestedIn) {
  //     toast.error("Interested In is required", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   if (!occupation) {
  //     toast.error("Occupation is required", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   if (!referenceBySource) {
  //     toast.error("Reference by/Source is required", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   const newFirmData = {
  //     // Map form fields to table expected properties
  //     remarkHistory: new Date().toLocaleString("en-IN", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //       hour12: true,
  //     }),
  //     enquiryNo: "",
  //     leadNo: leadNo,
  //     assignToHistory: "",
  //     name: name,
  //     mobile: mobile,
  //     whatsappNo: whatsappNo,
  //     email: email,
  //     address: address,
  //     occupation: occupation,
  //     company: company,
  //     interestedIn: interestedIn,
  //     budget: budget,
  //     referenceBySource: referenceBySource,
  //     nameOfCp: nameOfCp,
  //     planningToBuyWithin: planningToBuy,
  //   };

  //   console.log("Submitting new firm data:", newFirmData);

  //   setFirms((prev) => {
  //     const updatedFirms = [newFirmData, ...prev]; // New item first
  //     console.log("Updated firms list after submit:", updatedFirms);
  //     return updatedFirms;
  //   });

  //   toast.success("Details are submitted!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   // Reset form values
  //   setLeadNo("");
  //   setName("");
  //   setMobile("");
  //   setWhatsappNo("");
  //   setEmail("");
  //   setInterestedIn("");
  //   setBudget("");
  //   setPlanningToBuy("");
  //   setOccupation("");
  //   setReasonForPurchase("");
  //   setAddress("");
  //   setCompany("");
  //   setReferenceBySource("");
  //   setNameOfCp("");

  //   setShowFirmForm(false);
  // };

  // second :
  // const handleSubmit = async () => {
  //   // ✅ Step 1: Validate required fields
  //   if (!leadNo) return toast.error("Lead No. is required");
  //   if (!interestedIn) return toast.error("Interested In is required");
  //   if (!occupation) return toast.error("Occupation is required");
  //   if (!referenceBySource) return toast.error("Reference by/Source is required");

  //   // ✅ Step 2: Prepare payload
  //   const payload = {
  //     leadNo,
  //     name,
  //     mobile,
  //     whatsappNo,
  //     email,
  //     address,
  //     occupation,
  //     company,
  //     interestedIn,
  //     budget,
  //     referenceBySource,
  //     nameOfCp,
  //     planningToBuyWithin: planningToBuy,
  //     remarkHistory: new Date().toISOString(),
  //   };

  //   console.log("📤 Sending Enquiry POST Request:", payload);

  //   // ✅ Step 3: Send API call
  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/enquiries", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Server responded with ${response.status}: ${errorText}`);
  //     }

  //     const newLead = await response.json();
  //     console.log("✅ Enquiry saved successfully:", newLead);

  //     // ✅ Step 4: Add to local leads list (Visit Done)
  //     setLeads((prev) => ({
  //       ...prev,
  //       done: [...prev.done, newLead],
  //     }));

  //     toast.success("Enquiry submitted successfully!");

  //     // ✅ Step 5: Reset fields
  //     setLeadNo("");
  //     setName("");
  //     setMobile("");
  //     setWhatsappNo("");
  //     setEmail("");
  //     setInterestedIn("");
  //     setBudget("");
  //     setPlanningToBuy("");
  //     setOccupation("");
  //     setReasonForPurchase("");
  //     setAddress("");
  //     setCompany("");
  //     setReferenceBySource("");
  //     setNameOfCp("");
  //     setRemarks("");

  //     setShowFirmForm(false);

  //     // ✅ Step 6: Refresh leads (optional)
  //     fetchVisitScheduledLeads();
  //   } catch (error) {
  //     console.error("❌ Error submitting enquiry:", error);
  //     toast.error("Failed to submit enquiry. Please try again.");
  //   }
  // };


  const fetchEnquiries = async () => {
  try {
    const response = await fetch("https://localhost:5289/sales/api/enquiries", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch enquiries");

    const data = await response.json();
    console.log("📥 Enquiries fetched from backend:", data);
    setFirms(data); // Update your table state
  } catch (error) {
    console.error("❌ Error fetching enquiries:", error);
  }
};


  const handleSubmit = async () => {
    if (!leadNo) return toast.error("Lead No. is required");
    if (!interestedIn) return toast.error("Interested In is required");
    if (!occupation) return toast.error("Occupation is required");
    if (!referenceBySource) return toast.error("Reference by/Source is required");

    const now = new Date().toISOString();

    // const payload = {
    //   id: 0,
    //   name: name || "",
    //   phone: mobile ? parseInt(mobile) : 0,
    //   whatsapp: whatsappNo ? parseInt(whatsappNo) : 0,
    //   email: email || "unknown@example.com", // ✅ required
    //   address: address || "N/A", // ✅ required
    //   occupation: occupation || "N/A", // ✅ required
    //   company: company || "N/A", // ✅ required
    //   interest: interestedIn || "N/A", // ✅ required
    //   budgetInLakh: budget ? parseFloat(budget) : 0,
    //   intendedPurchasePeriodMonths: planningToBuy ? parseInt(planningToBuy) : 0,
    //   lastSiteVisit: now,
    //   source: referenceBySource || "Walk-in", // ✅ required
    //   remarks: remarks || "Visit done", // ✅ required
    //   status: "Visit Done", // ✅ required
    //   updatedBy: "system",

    //   // ✅ required nested object
    //   salesEnagagement: {
    //     id: 0,
    //     assignedTo: "b", // replace with logged-in user ID
    //     assignedDate: now,
    //     assignedBy: "system",
    //     enquiryId: 0,
    //     nextFollowUp: now,
    //     status: "Visit Done",
    //     remarks: remarks || "Visit completed",

    //     // ✅ fully populated enquiry object to satisfy backend model
    //     enquiry: {
    //       id: 0,
    //       name: name || "",
    //       phone: mobile ? parseInt(mobile) : 0,
    //       email: email || "unknown@example.com",
    //       address: address || "N/A",
    //       company: company || "N/A",
    //       occupation: occupation || "N/A",
    //       interest: interestedIn || "N/A",
    //       status: "Visit Done",
    //       source: referenceBySource || "Walk-in",
    //       remarks: remarks || "Visit done",
    //       bookings: [], // ✅ empty array required by backend
    //       lastUpdatedBy: "system", // ✅ required
    //       salesEnagagements: [], // ✅ empty array required by backend
    //       createdDate: now,
    //       updatedDate: now,
    //     },
    //   },
    // };


    const payload = {
      id: 0,
      name: name || "",
      phone: mobile ? parseInt(mobile) : 0,
      whatsapp: whatsappNo ? parseInt(whatsappNo) : 0,
      email: email || "unknown@example.com",
      address: address || "N/A",
      occupation: occupation || "N/A",
      company: company || "N/A",
      interest: interestedIn || "N/A",
      budgetInLakh: budget ? parseFloat(budget) : 0,
      intendedPurchasePeriodMonths: planningToBuy ? parseInt(planningToBuy) : 0,
      lastSiteVisit: new Date().toISOString(),
      source: referenceBySource || "Walk-in",
      remarks: remarks || "Visit done",
      status: "Visit Done",
      lastUpdatedBy: "system",
      lastUpdatedDate: new Date().toISOString(),

      // ✅ The backend expects a list of SalesEnagagement objects
      // ✅ correct
      SalesEngagement: {
        id: 0,
        assignedTo: "b",
        assignedDate: new Date().toISOString(),
        assignedBy: "system",
        enquiryId: 0,
        nextFollowUp: new Date().toISOString(),
        status: "Visit Done",
        remarks: remarks || "Visit completed"
      }

    };

    console.log("📤 Sending Enquiry POST Request:", payload);

    try {
      const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }

      const newLead = await response.json();
      console.log(" Enquiry saved successfully:", newLead);

      setLeads((prev) => ({
        ...prev,
        done: [...(prev.done || []), newLead],
      }));

      setFirms((prev) => [newLead, ...prev]);
      console.log("✅ Saving data into table (firms):", newLead);
      console.log("🧾 Updated firms list:", firms);
      toast.success("Enquiry submitted successfully!");

      // Reset
      setLeadNo("");
      setName("");
      setMobile("");
      setWhatsappNo("");
      setEmail("");
      setInterestedIn("");
      setBudget("");
      setPlanningToBuy("");
      setOccupation("");
      setReasonForPurchase("");
      setAddress("");
      setCompany("");
      setReferenceBySource("");
      setNameOfCp("");
      setRemarks("");
      setShowFirmForm(false);

      // fetchVisitScheduledLeads();
      fetchEnquiries();
    } catch (error) {
      console.error("❌ Error submitting enquiry:", error);
      toast.error("Failed to submit enquiry. Please try again.");
    }
  };






  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) {
      setMobileError("Mobile number should contain exactly 10 digits");
    } else {
      setMobileError("");
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;

    if (regex.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setName(value);
      setNameError(true);
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleDownloadPDFLeads = () => {
    if (firms.length === 0) {
      toast.info("No data available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Leads Report", 14, 15);

    // Columns for the first page
    const firstPageColumns = [
      "Timestamp",
      "Enquiry No",
      "LEAD NO.",
      "Assign To",
      "NAME",
      "MOBILE",
      "WHATSAPP",
      "EMAIL",
      "ADDRESS",
    ];

    // Columns for the second page
    const secondPageColumns = [
      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET",
      "REFERENCE",
      "NAME OF CP",
      "PLANNING TO BUY",
      "FollowUp Details",
    ];

    // Mapping data for the first page
    const firstPageRows = firms.map((row) => [
      row.remarkHistory || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.assignToHistory || "-",
      row.name || "-",
      row.mobile || "-",
      row.whatsappNo || "-",
      row.email || "-",
      row.address || "-",
    ]);

    // Mapping data for the second page
    const secondPageRows = firms.map((row) => [
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.referenceBySource || "-",
      row.nameOfCp || "-",
      row.planningToBuyWithin || "-",
      "-",
    ]);

    // Generate the first page
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    // Add a new page for the remaining columns
    doc.addPage("landscape");
    doc.text("Leads Report (Continued)", 14, 15);

    // Generate the second page
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.save("Leads_Report.pdf");

    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // const handleLeadNoChange = (e) => {
  //   setLeadNo(e.target.value);
  // };

  const handleLeadNoChange = (e) => {
    const selectedId = e.target.value;
    setLeadNo(selectedId);

    // find selected lead details from leads.scheduled
    const selectedLead = leads.scheduled.find((lead) => lead.id === selectedId);

    if (selectedLead) {
      setName(selectedLead.name || "");

      setMobile(selectedLead.phone?.toString() || "");
      setWhatsappNo(selectedLead.phone?.toString() || "");
      setEmail(selectedLead.email || "");
      setAddress(selectedLead.address || "");
      setCompany(selectedLead.company || "");
      setInterestedIn(selectedLead.interest || "");
      setBudget(selectedLead.budget || "");
      setOccupation(selectedLead.occupation || "");
      setReferenceBySource(selectedLead.source || "");
      setNameOfCp(selectedLead.nameOfCp || "");
      setPlanningToBuy(selectedLead.planningToBuyWithin || "");
      setRemarks(selectedLead.remarks || "");

    }
  };


  const handleDeleteFirm = (firmToDelete, index) => {
    // Use index to delete the specific row
    setFirms((prev) => prev.filter((firm, i) => i !== index));

    toast.success("Record deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleUpdateFirm = (updatedFirm, index) => {
    setFirms((prev) => {
      const updatedFirms = [...prev];
      // Update the specific firm at the given index
      if (index !== null && index >= 0 && index < updatedFirms.length) {
        updatedFirms[index] = {
          ...updatedFirms[index],
          ...updatedFirm,
          // Keep the original timestamp if it exists, otherwise add new one
          remarkHistory:
            updatedFirm.remarkHistory || updatedFirms[index].remarkHistory,
        };
      } else {
        // Fallback: find by leadNo if index is not available
        const firmIndex = updatedFirms.findIndex(
          (f) => f.leadNo === updatedFirm.leadNo
        );
        if (firmIndex !== -1) {
          updatedFirms[firmIndex] = {
            ...updatedFirms[firmIndex],
            ...updatedFirm,
            remarkHistory:
              updatedFirm.remarkHistory ||
              updatedFirms[firmIndex].remarkHistory,
          };
        }
      }
      return updatedFirms;
    });

    toast.success("Details updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };



  const fetchVisitScheduledLeads = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/leads", {
      // const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      console.log("🔍 All Lead Statuses from API:");
      data.forEach((lead) => {
        console.log(`Lead ID: ${lead.id}, Status: "${lead.status}"`);
      });
      // Filter Visit Scheduled leads (for dropdown)
      const visitScheduledLeads = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "visit scheduled" ||
          lead.status?.toLowerCase() === "visit_scheduled"
      );

      // Filter Visit Done leads (for table)
      const visitDoneLeads = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "visit done" ||
          lead.status?.toLowerCase() === "visit_done"
      );

      setLeads({
        scheduled: visitScheduledLeads,
        done: visitDoneLeads,
      });

      console.log("✅ Visit Scheduled (for dropdown):", visitScheduledLeads);
      console.log("✅ Visit Done (for table):", visitDoneLeads);
    } catch (error) {
      console.error("❌ Error fetching Visit Scheduled/Done leads:", error);
    }
  };



  return (
    <div className="container my-4">
      <h6 className="mb-3 fs-6">Sales Module / Lead Management</h6>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
        {sections.map((section, index) => (
          <Tooltip key={index} title={section.label} arrow>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                backgroundColor: Constants.primaryColor,
                padding: isMobile ? "8px" : "10px",
                marginRight: isMobile ? "5px" : "10px",
                marginTop: "10px",
                borderRadius: "20px",
                color: "white",
                fontSize: isMobile ? "14px" : "16px",
                width:
                  expandedSection === index
                    ? isMobile
                      ? "180px"
                      : "200px"
                    : isMobile
                      ? "40px"
                      : "50px",
                height: isMobile ? "40px" : "50px",
                transition: "width 0.3s ease",
                background: Constants.primaryColor,
                boxShadow:
                  "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
              }}
            >
              <IconButton
                color="primary"
                onClick={() => handleToggleSection(index)}
                sx={{
                  padding: 0,
                  marginRight: isMobile ? "4px" : "8px",
                  fontSize: isMobile ? "20px" : "24px",
                  color: "white",
                }}
              >
                {section.icon}
              </IconButton>

              <span
                className="text-white fw-bold"
                style={{
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  display: expandedSection === index ? "inline" : "none",
                  marginLeft: isMobile ? "4px" : "8px",
                }}
              >
                {section.label}
              </span>
            </div>
          </Tooltip>
        ))}

        {showFileInput && (
          <div className="m-3">
            <input type="file" accept=".csv, .xlsx" />
          </div>
        )}

        <input
          type="file"
          accept=".csv, .xlsx"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            console.log("File selected:", e.target.files[0]);
          }}
        />
      </div>

      {expandedSection === 0 && (
        <div className="content-container mt-0">
          {!showFirmForm ? (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div
                  className={`d-flex ${isMobile ? "flex-column" : "flex-row"
                    } gap-2 w-100`}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: Constants.primaryColor,
                      width: isMobile ? "100%" : "auto",
                      fontWeight: "bold",
                    }}
                    onClick={() => setShowFirmForm(true)}
                  >
                    + New Enquiry
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
                      width: isMobile ? "100%" : "auto",
                    }}
                    onClick={handleDownloadPDFLeads}
                  >
                    <FaFileDownload size={18} />
                    {isMobile ? "PDF" : "Download PDF"}
                  </Button>
                </div>
              </div>
              <div className="mt-3">
                <DisplayEnquiryTable

                  //  data={loans}
                  // data={leads}
                  // data={leads.done}
                  data={[...firms, ...leads.done]}


                  isMobile={isMobile}
                  isTablet={isTablet}
                  onDelete={(item, index) => handleDeleteFirm(item, index)} // Pass index
                  onUpdate={handleUpdateFirm}
                />
              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => setShowFirmForm(false)}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
              scroll="paper"
            >
              <DialogTitle>New Enquiry</DialogTitle>

              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {/* Row 1 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      error={!!error}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Lead No.</InputLabel>
                      {/* <Select
                        value={leadNo}
                        onChange={handleLeadNoChange}
                        label="Lead No."
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Lead 9">Lead 9</MenuItem>
                        <MenuItem value="Lead 16">Lead 16</MenuItem>
                        <MenuItem value="Lead 25">Lead 25</MenuItem>
                        
                      </Select> */}
                      <Select
                        value={leadNo}
                        onChange={handleLeadNoChange}
                        label="Lead No."
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        {leads.scheduled.length > 0 ? (
                          leads.scheduled.map((lead) => (
                            <MenuItem key={lead.id} value={lead.id}>
                              {lead.leadNo || lead.id}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Visit Scheduled Leads</MenuItem>
                        )}
                      </Select>

                      {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={handleNameChange}
                      error={nameError}
                      helperText={nameError ? "Only letters are allowed" : ""}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Mobile No."
                      fullWidth
                      value={mobile}
                      onChange={handleMobileChange}
                      error={!!mobileError}
                      helperText={mobileError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 2 */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="text"
                      label="WhatsApp No"
                      fullWidth
                      value={whatsappNo}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          setWhatsappNo(value);
                        }
                      }}
                      error={whatsappNo.length > 0 && whatsappNo.length < 10}
                      helperText={
                        whatsappNo.length > 0 && whatsappNo.length < 10
                          ? "Mobile number must be 10 digits"
                          : ""
                      }
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      error={!!emailError}
                      helperText={emailError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Address"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 3 */}

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Company"
                      fullWidth
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Reference by / Source"
                      fullWidth
                      value={referenceBySource}
                      onChange={(e) => setReferenceBySource(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name of CP (if Channel Partner)"
                      fullWidth
                      value={nameOfCp}
                      onChange={(e) => setNameOfCp(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 4 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Interested In</InputLabel>
                      <Select
                        value={interestedIn}
                        onChange={handleInterestedInChange}
                        label="Interested In"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >

                        <MenuItem value="2 BHK">2BHK</MenuItem>
                        <MenuItem value="3 BHK">3BHK</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    >
                      <InputLabel>Budget (Approx.)</InputLabel>
                      <Select
                        value={budget}
                        onChange={handleBudgetChange}
                        label="Budget (Approx.)"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
                        <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
                        <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
                        <MenuItem value="61-65 L">61-65 L</MenuItem>
                        <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
                        <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    >
                      <InputLabel>Planning To Buy Within?</InputLabel>
                      <Select
                        value={planningToBuy}
                        onChange={handlePlanningToBuyChange}
                        label="Planning To Buy Within?"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Immediately">Immediately</MenuItem>
                        <MenuItem value="Within Week">Within Week</MenuItem>
                        <MenuItem value="Within 1 Month">
                          Within 1 Month
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Row 5 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        value={occupation}
                        onChange={handleOccupationChange}
                        label="Occupation"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Service / Job">Service / Job</MenuItem>
                        <MenuItem value="Business / Self employed">
                          Business / Self employed
                        </MenuItem>
                        <MenuItem value="Professional">Professional</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Full-width field for the last row */}
                  <Grid item xs={12}>
                    <TextField
                      label="Customer Feedback & Complete Followup Details"
                      fullWidth
                      multiline
                      rows={3}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowFirmForm(false)}
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
  );
};

export default FirstVisits;