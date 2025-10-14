import React, { useState, useRef, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Grid, MenuItem, Box, Tooltip, IconButton,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload ,FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';
import { FaTimes } from 'react-icons/fa';
import * as XLSX from "xlsx";
const unitTypes = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition", "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];
const sections = [
  { label: "Display Leads", icon: <FaEye size={24} />, bgColor: "primary.main" },
  { label: "Sample Excel", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
  { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
];

// To get the data from api/leads:
const fetchLeadsData = async () => {
  try {
    // const response = await fetch('http://localhost:5174/api/Leads'); // hosted API URL

    //  const response = await fetch('/api/Leads');
   const response = await fetch('/api/leads');
    if (!response.ok) {
      console.log('checking api response');
      console.log(await response.text());
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

// to submit the data or post API-api/leads:
const createLead = async (leadData) => {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit lead: ${errorText}`);
    }

    const savedLead = await response.json();
    return savedLead;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

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
  // const [mobile, setMobile] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
  const loadLeads = async () => {
    const data = await fetchLeadsData();
    // setLoans(data); // or setInventoryData(data) if you want to show in your table
    setInventoryData(data);
  };

  loadLeads();
}, []);



const fileInputRef = useRef(null);
const [formData, setFormData] = useState({
    name: '',
    // mobile: '',
     phone: '',
    email: '',
    location: '',
    sourceName: '',
    lookingFor: '',
    partners: [],
     SourceDetails: "",

      firmName: '',
  personName: '',
  partnerMobile: '',
  referenceName: '',
  otherSource: '',
  });
 const [inventoryData, setInventoryData] = useState([]);
 const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };
   const handleToggleSection = (index) => {
  if (index === 1) {
    // Sample CSV action
    downloadSampleCsv();
    setExpandedSection(index); // just expand the button for visual effect
    return; // don’t switch content
  }

  if (index === 2) {
    // Upload Excel action
    if (fileInputRef.current) fileInputRef.current.click();
    setExpandedSection(index); // just expand the button for visual effect
    return; // don’t switch content
  }

  // For the first tab (Display Leads) — show its content
  setExpandedSection(index);
  setShowFileInput(false);
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
    console.log("handleChange:", e.target.name, value, formData);
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
    // setFormData({ ...formData, mobile: e.target.value });
    setFormData({ ...formData, phone: e.target.value });
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

useEffect(() => {
  console.log("Table data updated:", inventoryData);
}, [inventoryData]);



  const handleFormSubmit = async () => {
  // Validate required fields
  console.log("Submitting formData:", formData);
  if (!formData.name || !formData.phone || !formData.lookingFor || !formData.sourceName) {
    toast.error("Please fill in all required fields", { position: "top-right", autoClose: 3000 });
    return;
  }

  const newCounter = leadCounter + 1;
  setLeadCounter(newCounter);
  const formattedLeadNo = `LEAD-${String(newCounter).padStart(2, '0')}`;


  let sourceDetails = "";

if (formData.sourceName === "Channel Partner") {
  sourceDetails = `${formData.firmName || ""}; ${formData.personName || ""}; ${formData.partnerMobile || ""}`;
} else if (formData.sourceName === "References") {
  sourceDetails = formData.referenceName || "";
} else if (formData.sourceName === "Other") {
  sourceDetails = formData.otherSource || "";
}
 
const newLead = {
  Name: formData.name,
  
// Mobile: formData.phone,

   phone: Number(formData.phone),
  Email: formData.email,
  Address: formData.location,
  Interest: formData.lookingFor,
  Source: formData.sourceName,
  // SourceDetails: formData.SourceDetails,  
  SourceDetails: sourceDetails, 
  UpdatedBy: "System",
  // Timestamp: new Date().toISOString(),
  // AssignTo: '',
  // LeadNo: formattedLeadNo,
  


  // 
  firmName: formData.firmName || "",
  personName: formData.personName || "",
  partnerMobile: formData.partnerMobile || "",
  referenceName: formData.referenceName || "",
  otherSource: formData.otherSource || "",
};


  try {
    const savedLead = await createLead(newLead); // call external function
    console.log("Saved lead from API:", savedLead); 
    setInventoryData([savedLead, ...inventoryData]);
    
//     setInventoryData([{
//   ...savedLead,
//   phone: savedLead.Phone
// }, ...inventoryData]);
 


    setFormData({
      // name: '',
      
      // email: '',
      // location: '',
      // sourceName: '',
      // lookingFor: '',
      // partners: [],
      // SourceDetails: '',

        name: "",
    phone: "",
    email: "",
    location: "",
    sourceName: "",
    lookingFor: "",
    firmName: "",
    personName: "",
    partnerMobile: "",
    referenceName: "",
    otherSource: "",
    SourceDetails: "",
    });
    setName('');
    // setMobile('');
    setPhone('');
    setEmail('');

    toast.success("Lead submitted successfully!", { position: "top-right", autoClose: 3000 });
    setShowFirmForm(false);

  } catch (error) {
    toast.error("Failed to submit lead. Please try again.", { position: "top-right", autoClose: 3000 });
  }
};

// const handleFileUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = async (evt) => {
//     const bstr = evt.target.result;
//     const workbook = XLSX.read(bstr, { type: "binary" });

//     // Assuming first sheet
//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     // Convert sheet to JSON
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
//     console.log("Excel data:", jsonData);

//     // Loop through each row and send to API
//     for (let row of jsonData) {
//       // Map Excel columns to DB columns
//       const sourceDetails = row["Source Name"] === "Channel Partner"
//         ? `${row["Firm Name"] || ""}; ${row["Person Name"] || ""}; ${row["Partner Mobile"] || ""}`
//         : row["Source Name"] === "References"
//         ? row["Reference Name"] || ""
//         : row["Source Name"] === "Other"
//         ? row["Other Source"] || ""
//         : "";


//          // Use Excel timestamp if present, otherwise use current time
//       const timestamp = row["Timestamp"] 
//         ? new Date(row["Timestamp"]).toISOString() 
//         : new Date().toISOString();

//       const leadData = {
//         Name: row["Name"] || "",
//         Phone: Number(row["Mobile No."] || 0),
//         Email: row["Email"] || "",
//         Address: row["Location"] || "",
//         Interest: row["Are You Looking For"] || "",
//         Source: row["Source Name"] || "",
//         SourceDetails: sourceDetails,
//         UpdatedBy: "System",
//         LeadNo: `LEAD-${String(leadCounter + 1).padStart(2, "0")}`,
//         AssignTo: "",
//          Timestamp: timestamp,
//       };

//       try {
//         const savedLead = await createLead(leadData);
//         setInventoryData((prev) => [savedLead, ...prev]);
//         setLeadCounter((prev) => prev + 1);
//       } catch (err) {
//         console.error("Error uploading lead:", err);
//       }
//     }

//     toast.success("Excel data uploaded successfully!", { position: "top-right", autoClose: 3000 });
//   };

//   reader.readAsBinaryString(file);
// };


// const handleFileUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();
//   reader.onload = async (evt) => {
//     const arrayBuffer = evt.target.result;
//     const workbook = XLSX.read(arrayBuffer, { type: "array" }); // use type 'array'

//     const sheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[sheetName];

//     // Convert sheet to JSON
//     const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
//     console.log("Excel data:", jsonData);

//     for (let row of jsonData) {
//       console.log("Processing row:", row);

//       const sourceDetails = row["Source Name"] === "Channel Partner"
//         ? `${row["Firm Name"] || ""}; ${row["Person Name"] || ""}; ${row["Partner Mobile"] || ""}`
//         : row["Source Name"] === "References"
//         ? row["Reference Name"] || ""
//         : row["Source Name"] === "Other"
//         ? row["Other Source"] || ""
//         : "";

//       // Use Excel timestamp exactly as-is
//       const timestamp = row["Timestamp"] || new Date().toISOString();
//       console.log("Final Timestamp for API:", timestamp);

//       const leadData = {
//         Name: row["Name"] || "",
//         Phone: Number(row["Mobile No."] || 0),
//         Email: row["Email"] || "",
//         Address: row["Location"] || "",
//         Interest: row["Are You Looking For"] || "",
//         Source: row["Source Name"] || "",
//         SourceDetails: sourceDetails,
//         UpdatedBy: "System",
//         LeadNo: `LEAD-${String(leadCounter + 1).padStart(2, "0")}`,
//         AssignTo: "",
//         Timestamp: timestamp, // <-- raw value from Excel
//       };

//       try {
//         const savedLead = await createLead(leadData);
//         setInventoryData((prev) => [savedLead, ...prev]);
//         setLeadCounter((prev) => prev + 1);
//       } catch (err) {
//         console.error("Error uploading lead:", err);
//       }
//     }

//     toast.success("Excel data uploaded successfully!", { position: "top-right", autoClose: 3000 });
//   };

//   reader.readAsArrayBuffer(file);
// };

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async (evt) => {
    const arrayBuffer = evt.target.result;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    console.log("Excel data:", jsonData);

    for (let row of jsonData) {
      console.log("Processing row:", row);

      const sourceDetails = row["Source Name"] === "Channel Partner"
        ? `${row["Firm Name"] || ""}; ${row["Person Name"] || ""}; ${row["Partner Mobile"] || ""}`
        : row["Source Name"] === "References"
        ? row["Reference Name"] || ""
        : row["Source Name"] === "Other"
        ? row["Other Source"] || ""
        : "";

      // Use Excel timestamp if present, else fallback to system timestamp
      const timestamp = row["Timestamp"] ? row["Timestamp"] : new Date().toISOString();
      console.log("Final Timestamp for API:", timestamp);

      const leadData = {
        Name: row["Name"] || "",
        Phone: Number(row["Mobile No."] || 0),
        Email: row["Email"] || "",
        Address: row["Location"] || "",
        Interest: row["Are You Looking For"] || "",
        Source: row["Source Name"] || "",
        SourceDetails: sourceDetails,
        UpdatedBy: "System",
        LeadNo: `LEAD-${String(leadCounter + 1).padStart(2, "0")}`,
        AssignTo: "",
        Timestamp: timestamp, 
      frontendTimestamp: timestamp
      };

      try {
        const savedLead = await createLead(leadData);
        // overwrite timestamp only in frontend table
        setInventoryData((prev) => [
          { ...savedLead, Timestamp: timestamp },
          ...prev,
        ]);
        setLeadCounter((prev) => prev + 1);
      } catch (err) {
        console.error("Error uploading lead:", err);
      }
    }

    toast.success("Excel data uploaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  reader.readAsArrayBuffer(file);
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
          onChange={handleFileUpload}
        />
      </div>

      
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
                 

  <TextField
  label="Search Lead"
  variant="outlined"
  size="small"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
  sx={{
    minWidth: isMobile ? "100%" : "300px",
    border: Constants.formInputBorderColor,
  }}
/>
              </div>
               
              <div className="mt-3">
                {/* <NewLeads
                  // inventoryData={inventoryData.filter(item => Object.keys(item).length > 0)}
                  inventoryData={inventoryData.filter(item => item.visible !== false)}

                  handleDelete={handleDelete}
                  setInventoryData={setInventoryData}
                  isMobile={isMobile}
                  isTablet={isTablet}
                /> */}
              
                {/* <NewLeads
  inventoryData={inventoryData.filter((item) => {
    const query = searchQuery.trim();
    if (!query) return true;

    inventoryData.forEach(item => {
  if (!item.phone && !item.Mobile) {
    console.warn("Missing phone/Mobile in lead:", item);
  }
});

  const firmName = item.firmName?.toLowerCase() || "";
  const channelPartnerName = item.personName?.toLowerCase() || "";
  const sourceDetails = item.sourceDetails?.toLowerCase() || "";
    firmName.includes(query) ||
    channelPartnerName.includes(query) ||
    sourceDetails.includes(query)
    return (
      item.name?.toLowerCase().includes(query) ||
      String(item.phone || '').toLowerCase().includes(query) 

      
    );
  })}
  handleDelete={handleDelete}
  setInventoryData={setInventoryData}
  isMobile={isMobile}
  isTablet={isTablet}
/> */}

{/* Searching by only lead name, phone, Channel partner name */}
<NewLeads
  inventoryData={inventoryData.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;

    // Optional: log if phone is missing
    if (!item.phone && !item.Mobile) {
      console.warn("Missing phone/Mobile in lead:", item);
    }

    // const firmName = item.firmName?.toLowerCase() || "";
    const channelPartnerName = item.personName?.toLowerCase() || "";
    // const sourceDetails = item.sourceDetails?.toLowerCase() || "";
    const name = item.name?.toLowerCase() || "";
    const phone = String(item.phone || "").toLowerCase();

    return (
      name.includes(query) ||
      phone.includes(query) ||
      // firmName.includes(query) ||
      channelPartnerName.includes(query) 
      // sourceDetails.includes(query)
    );
  })}
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
              <DialogTitle sx={{
    backgroundColor: Constants.primaryColor,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
  }}>Add New Lead
    <IconButton
    onClick={() => setShowFirmForm(false)}
    sx={{ color: 'white' }}
  >
    <FaTimes />
  </IconButton>
  </DialogTitle>
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
  value={formData.phone}
  onChange={(e) => {
    const value = e.target.value;
    setFormData({ ...formData, phone: value });
    validateMobile(value);
  }}
  error={!!mobileError}
  helperText={mobileError}
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




{/* Conditional fields based on sourceName */}
{formData.sourceName === "Channel Partner" && (
  <>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Firm Name"
        fullWidth
        required
        value={formData.firmName || ""}
        onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
        size={isMobile ? "small" : "medium"}
        sx={{ border: Constants.formInputBorderColor }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Person Name"
        fullWidth
        value={formData.personName || ""}
        onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
        size={isMobile ? "small" : "medium"}
        sx={{ border: Constants.formInputBorderColor }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Mobile No."
        fullWidth
        value={formData.partnerMobile || ""}
        onChange={(e) => setFormData({ ...formData, partnerMobile: e.target.value })}
        size={isMobile ? "small" : "medium"}
        sx={{ border: Constants.formInputBorderColor }}
      />
    </Grid>
  </>
)}

{formData.sourceName === "References" && (
  <Grid item xs={12} sm={6}>
    <TextField
      label="Reference Name"
      fullWidth
      value={formData.referenceName || ""}
      required
      onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
      size={isMobile ? "small" : "medium"}
      sx={{ border: Constants.formInputBorderColor }}
    />
  </Grid>
)}

{formData.sourceName === "Other" && (
  <Grid item xs={12} sm={6}>
    <TextField
      label="Other Source Name"
      fullWidth
      value={formData.otherSource || ""}
      required
      onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
      size={isMobile ? "small" : "medium"}
      sx={{ border: Constants.formInputBorderColor }}
    />
  </Grid>
)}
                 
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
      {/* // )} */}
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