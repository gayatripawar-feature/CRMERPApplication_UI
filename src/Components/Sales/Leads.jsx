// import React, { useState, useRef , useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem ,Box,Tooltip,IconButton} from '@mui/material';
// import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
// import { Inventory } from '@mui/icons-material';
// import InventoryTable from './InventoryTable';
// import { ToastContainer, toast } from "react-toastify";
// import NewLeads from './NewLeads';
// import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { jsPDF } from "jspdf";
// import { FaFileDownload } from "react-icons/fa";
// import autoTable from "jspdf-autotable";
// import Constants from '../Constants';
// const fetchLoansData = async () => {
//   const response = await fetch('/api/getOCRCollection');
//   return response.json();
// };
// const statusOptions = ["Approved", "Unapproved"];
// const owners = ["Landowner", "Developer", "Investor"];
// const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
// const unitTypes = ["Actual Site", "Hoarding","Facebook","Instagram","Website","Print Media","Radio","Google add","Exhibition","Online Portal","Direct call","Pamphlet","Channel Partner","References","Other"];




// const sections = [
//     { label: "Display Leads", icon: <FaEye size={24} />, bgColor: "primary.main" },
//     { label: "Sample CSV", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
//     { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
//   ];

// const Leads = () => {
//   const [loans, setLoans] = useState([]);
//   const [expandedSection, setExpandedSection] = useState(0);
//   const [showFirmForm, setShowFirmForm] = useState(false);
//   const [partners, setPartners] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [name, setName] = useState('');
//   const [error, setError] = useState('');
//   const [showFileInput, setShowFileInput] = useState(false);

//   const [mobile, setMobile] = useState('');
  
//   const [email, setEmail] = useState('');
//   const [mobileError, setMobileError] = useState('');
//   const [emailError, setEmailError] = useState('')
//   // const [inventoryData, setInventoryData] = useState([]);

//   useEffect(() => {
//     loadLoansData();
//   }, []);

//   const fileInputRef = useRef(null);



//   const [formData, setFormData] = useState({
//     name: '',
//     mobile: '',
//     email: '',
//     location: '',
//     sourceName: '',
//     lookingFor: '',
//     partners: [],
//   });
  
//   const [tableData, setTableData] = useState([]);

//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoans(data);
//   };

  

//   const handleToggleSection = (index) => {
//     if (index === 1) {
     
//       downloadSampleCsv();
//     } else if (index === 2) {
      
//       if (fileInputRef.current) {
//         fileInputRef.current.click();
//       }
//     } else {
//       setExpandedSection(index);
//       setShowFileInput(false);
//     }
//   };
  
  
//   const [inventoryData, setInventoryData] = useState([
//     {
     
//     },
//     {
     
//     },
//   ]);

  
//   const handleDelete = (index) => {
//     setInventoryData(inventoryData.filter((_, i) => i !== index));
//   };


//   const downloadSampleCsv = () => {
    
//     const headers = "Name,Mobile No.,Source Name,Location,Are You Looking For\n";
//     const sampleData = "\n";
    
   
//     const blob = new Blob([headers + sampleData], { type: "text/csv" });
  
    
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
    
    
//     const regex = /\d/;

  
//     if (regex.test(value)) {
//       setError('Name should not contain digits');
//     } else {
//       setError('');
//     }

//     setName(value); 
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

 
//   const validateMobile = (value) => {
//     const regex = /^[0-9]{10}$/; 
//     if (!regex.test(value)) {
//       setMobileError('Mobile number should contain exactly 10 digits');
//     } else {
//       setMobileError('');
//     }
//   };
  

  
//   const validateEmail = (value) => {
     
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!regex.test(value)) {
//       setEmailError('Please enter a valid email address');
//     } else {
//       setEmailError('');
//     }
//   };


//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     setMobile(value);
//     validateMobile(value);
//     setFormData({ ...formData, mobile: e.target.value });
//   };

  
//   const handleEmailChange = (e) => {
//     const value = e.target.value;
//     setEmail(value);
//     validateEmail(value);
//     setFormData({ ...formData, email: e.target.value });
//   };

//   const handleDownloadPDFLeads = () => {
//     console.log("Loans data before mapping:", loans);
  
//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Leads Report", 14, 15);
  
   
//     const tableColumn = [
//       "Timestamp", "Assign To", "Lead No", "Name", "Mobile / WhatsApp",
//       "Looking For", "Email", "Source Name", "Location"
//     ];
  
//     const tableRows = loans.map(row => [
//       row.timestamp || "-",
//       row.assignTo || "-",
//       row.leadNo || "-",
//       row.name || "-",
//       row.mobile || "-",
//       row.lookingFor || "-",
//       row.email || "-",
//       row.sourceName || "-",
//       row.location || "-"
//     ]);
  
//     console.log("Formatted Table Rows:", tableRows);
  
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//     });
  
//     doc.save("Leads_Report.pdf");
//   };
   
//   const handleFormSubmit = () => {
//     console.log("submit");
    
//     // Create a new lead object with a unique leadNo
//     const newLead = {
//       ...formData,
//       timestamp: new Date().toLocaleString(),
//       assignTo: '', // Default empty or set dynamically if needed
//       leadNo: `LD${Date.now()}`, // Unique Lead No.
//     };
    
//     // Add the new lead to the inventoryData state
//     setInventoryData([...inventoryData, newLead]);
    
//     // Clear form data after submission
//     setFormData({
//       name: '',
//       mobile: '',
//       email: '',
//       location: '',
//       sourceName: '',
//       lookingFor: '',
//       partners: [],
//     });
//      };
//   return (
//     <div className="main-content">
//       <h6>Sales Module / Lead Management</h6>
//       <div className="d-flex align-items-center ">
//       <div className="d-flex align-items-center">
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
//         width: expandedSection === index ? '200px' : '50px',  
//         height: '50px',                
//         transition: 'width 0.3s ease', 
//         background: Constants.primaryColor,
//         boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)', // Shadow for depth
//       }}
//     >
      
//       <IconButton
//         color="primary"
//         onClick={() => handleToggleSection(index)}
//         sx={{
//           padding: 0,                   
//           marginRight: '8px',           
//           fontSize: '24px',             
//           color: 'white',               
//         }}
//       >
//         {section.icon}
//       </IconButton>

//       {/* Label */}
//       <span className='fw-bold'
//         style={{
//           color: 'white',
//           fontSize: '16px',
//           display: expandedSection === index ? 'inline' : 'none', 
//           marginLeft: '8px',             
//         }}
//       >
//         {section.label}
//       </span>
//     </div>
//   </Tooltip>
// ))}
// </div>
// {showFileInput && (
//   <div className="m-3">
//     <input type="file" accept=".csv, .xlsx" />
//   </div>
// )}
//  <input
//         type="file"
//         accept=".csv, .xlsx"
//         ref={fileInputRef}
//         style={{ display: 'none' }} 
//         onChange={(e) => {
//           console.log('File selected:', e.target.files[0]);
//         }}
//       />
// </div>
//  {expandedSection === 0 && (
//         <div className="content-container mt-1">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container">
//                 <div className='d-flex gap-3'>
//                 <Button variant="contained" color="primary" style={{ background: Constants.primaryColor }} onClick={() => setShowFirmForm(true)}>
//                   + New Leads
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
//       alignItems: "center",  
//       gap: "8px",  
//       "&:hover": {
//         background: Constants.primaryColor,
//       },
     
//     }}
    
//     onClick={handleDownloadPDFLeads}
//   >
//     <FaFileDownload size={18} />  
//     Download PDF
//   </Button>
//   </div>
                
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
              
//               <NewLeads inventoryData={inventoryData} handleDelete={handleDelete}  setInventoryData={setInventoryData}/>
//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded" 
//             style={{
//               maxHeight: "500px",
//               overflowY: "auto",
//               backgroundColor: "#f8f9fa", 
//               border: "1px solid #ccc", 
//             }}
//             >
              
              

// <Grid container spacing={2}>

// <Grid item xs={4}>
//   <TextField
//     label="Name"
//     fullWidth
//     required
//     value={formData.name}
//    onChange={handleChange}
//     name="name"
//         error={!!error}  
//         helperText={error}  
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     label="You Are Looking For?"
//     fullWidth
//     required
//     value={formData.lookingFor}
//     onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     label="Mobile No. / WhatsApp No."
//     fullWidth
//     required
  
//     value={mobile}
//     onChange={handleMobileChange}
//     error={!!mobileError} 
//     helperText={mobileError} 
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     label="Email"
//     required
//     fullWidth
//     value={email}
//           onChange={handleEmailChange}
//           error={!!emailError} 
//           helperText={emailError} 
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     type="text"
//     label="Location"
//     fullWidth
//     value={formData.location}
//     onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//   />
// </Grid>

// <Grid item xs={4}>
//   <TextField
//     select
//     label="Source Name"
//     fullWidth
//     value={formData.sourceName}
//     onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
//   >
//     {unitTypes.map((type, idx) => (
//       <MenuItem key={idx} value={type}>
//         {type}
//       </MenuItem>
//     ))}
//   </TextField>
// </Grid>

// </Grid>

           
              

             

          

// <Button
//   variant="contained"
//   className="mt-3"
//   color="success"
//   onClick={() => {
//     handleFormSubmit();
//     setShowFirmForm(false);
//     toast.success("Leads details are submitted!", { position: "top-right", autoClose: 3000 });
//   }}
// >
//   Submit
// </Button>


//             </div> 




//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default Leads;



import React, { useState, useRef, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Grid, MenuItem, Box, Tooltip, IconButton,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';
import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const unitTypes = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition", "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];

const sections = [
  { label: "Display Leads", icon: <FaEye size={24} />, bgColor: "primary.main" },
  { label: "Sample CSV", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
  { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
];

const Leads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
 const [leadCounter, setLeadCounter] = useState(0);

  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showFileInput, setShowFileInput] = useState(false);
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    loadLoansData();
  }, []);

  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    sourceName: '',
    lookingFor: '',
    partners: [],
  });

  const [inventoryData, setInventoryData] = useState([]);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
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

  const handleDelete = (index) => {
    setInventoryData(inventoryData.filter((_, i) => i !== index));
  };

  const downloadSampleCsv = () => {
    const headers = "Name,Mobile No.,Source Name,Location,Are You Looking For\n";
    const sampleData = "\n";
    const blob = new Blob([headers + sampleData], { type: "text/csv" });
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
    const regex = /\d/;

    if (regex.test(value)) {
      setError('Name should not contain digits');
    } else {
      setError('');
    }

    setName(value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
    setFormData({ ...formData, mobile: e.target.value });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // validateEmail(value);
    setFormData({ ...formData, email: e.target.value });
  };

 
  const handleDownloadPDFLeads = () => {
  // Use inventoryData instead of loans
  console.log("Inventory data before mapping:", inventoryData);

  // Check if there's data to export
  if (inventoryData.length === 0) {
    toast.error("No leads data to download", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  const doc = new jsPDF("landscape");
  doc.setFontSize(14);
  doc.text("Leads Report", 14, 15);

  const tableColumn = [
    "Timestamp", "Assign To", "Lead No", "Name", "Mobile / WhatsApp",
    "Looking For", "Email", "Source Name", "Location"
  ];

  const tableRows = inventoryData.map(row => [
    row.timestamp || "-",
    row.assignTo || "-",
    row.leadNo || "-",
    row.name || "-",
    row.mobile || "-",
    row.lookingFor || "-",
    row.email || "-",
    row.sourceName || "-",
    row.location || "-"
  ]);

  console.log("Formatted Table Rows:", tableRows);

  autoTable(doc, {
    startY: 25,
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  });

  doc.save("Leads_Report.pdf");
  
  toast.success("PDF downloaded successfully!", {
    position: "top-right",
    autoClose: 3000,
  });
};
  const handleFormSubmit = () => {
    console.log("submit");

    // Validate required fields
    if (!formData.name || !formData.mobile || !formData.lookingFor || !formData.sourceName) {
      toast.error("Please fill in all required fields", { position: "top-right", autoClose: 3000 });
      return;
    }
     
    // Increment counter
  const newCounter = leadCounter + 1;
  setLeadCounter(newCounter);

  // Format lead number with leading zeros
  const formattedLeadNo = `LEAD-${String(newCounter).padStart(2, '0')}`;

    // Create a new lead object with a unique leadNo
    const newLead = {
      ...formData,
      timestamp: new Date().toLocaleString(),
      assignTo: '',
      // leadNo: `LD${Date.now()}`,
      leadNo: formattedLeadNo,
    };

    // Add the new lead to the BEGINNING of the inventoryData state (top of table)
    setInventoryData([newLead, ...inventoryData]);

    // Clear form data after submission
    setFormData({
      name: '',
      mobile: '',
      email: '',
      location: '',
      sourceName: '',
      lookingFor: '',
      partners: [],
    });

    // Clear individual state variables
    setName('');
    setMobile('');
    setEmail('');

    // Show success message
    toast.success("Leads details are submitted!", {
      position: "top-right",
      autoClose: 3000,
    });
    // Close form only after successful submission
  setShowFirmForm(false);
  };

  

  return (
    <div className="container my-2">
      <h6 className="mb-2 fs-6">Sales Module / Lead Management</h6>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
        <div className="d-flex flex-wrap gap-2 mb-2 mb-md-0">
          {sections.map((section, index) => (
            <Tooltip key={index} title={section.label} arrow>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: Constants.primaryColor,
                  padding: '10px',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '16px',
                  width: expandedSection === index ? (isMobile ? '100%' : '200px') : '50px',
                  height: '50px',
                  transition: 'width 0.3s ease',
                  background: Constants.primaryColor,
                  boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
                  margin: '5px',
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleToggleSection(index)}
                  sx={{
                    padding: 0,
                    marginRight: '8px',
                    fontSize: '24px',
                    color: 'white',
                  }}
                >
                  {section.icon}
                </IconButton>

                <span className='fw-bold'
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    display: expandedSection === index ? 'inline' : 'none',
                    marginLeft: '8px',
                  }}
                >
                  {section.label}
                </span>
              </div>
            </Tooltip>
          ))}
        </div>

        {showFileInput && (
          <div className="m-3">
            <input type="file" accept=".csv, .xlsx" />
          </div>
        )}

        <input
          type="file"
          accept=".csv, .xlsx"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            console.log('File selected:', e.target.files[0]);
          }}
        />
      </div>

      {expandedSection === 0 && (
        <div className="content-container mt-1">
          {!showFirmForm ? (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Button
                    variant="contained"
                    style={{ background: Constants.primaryColor, minWidth: isMobile ? '100%' : 'auto' }}
                    onClick={() => setShowFirmForm(true)}
                  >
                    + New Leads
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
                      "&:hover": { background: Constants.primaryColor },
                      minWidth: isMobile ? '100%' : 'auto',
                    }}
                    onClick={handleDownloadPDFLeads}
                    // disabled={inventoryData.length === 0}
                  >
                    <FaFileDownload size={18} />
                    {isMobile ? 'PDF' : 'Download PDF'}
                  </Button>
                </div>
                 {/* Right side: Search Box */}
  <TextField
    label="Search Leads"
    variant="outlined"
   size="small"
  sx={{ minWidth: isMobile ? '100%' : '250px' ,
    border:Constants.formInputBorderColor,
  }}
    onChange={(e) => {
      const value = e.target.value.toLowerCase();
      // Filter inventoryData based on name, mobile, or lookingFor- serach for the leadno,name,mobile,lookingFor
      setInventoryData(prev => 
        prev.map(item => ({
          ...item,
          visible: !value || 
            (item.leadNo?.toLowerCase().includes(value)) ||
            (item.name?.toLowerCase().includes(value)) ||
            (item.mobile?.toLowerCase().includes(value)) ||
            (item.lookingFor?.toLowerCase().includes(value))
        }))
      );
    }}
  />
              </div>
              <div className="mt-3">
                <NewLeads
                  // inventoryData={inventoryData.filter(item => Object.keys(item).length > 0)}
                  inventoryData={inventoryData.filter(item => item.visible !== false)}

                  handleDelete={handleDelete}
                  setInventoryData={setInventoryData}
                  isMobile={isMobile}
                  isTablet={isTablet}
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
            >
              <DialogTitle>Add New Lead</DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      error={!!error}
                      helperText={error}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="You Are Looking For?"
                      fullWidth
                      required
                      value={formData.lookingFor}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mobile No. / WhatsApp No."
                      fullWidth
                      required
                      value={mobile}
                      onChange={handleMobileChange}
                      error={!!mobileError}
                      helperText={mobileError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      // error={!!emailError}
                      // helperText={emailError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Location"
                      fullWidth
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Source Name"
                      fullWidth
                      required
                      value={formData.sourceName}
                      onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    >
                      {unitTypes.map((type, idx) => (
                        <MenuItem key={idx} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
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
                  // color="success"
                  style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }}
                  onClick={() => {
                    handleFormSubmit();
                    // setShowFirmForm(false);
                  }}
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

export default Leads;