






import React, { useState, useRef , useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid,FormControl,InputLabel,Select, MenuItem ,Box,Tooltip,IconButton} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { Inventory } from '@mui/icons-material';
import InventoryTable from './InventoryTable';
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';
import DisplayEnquiryTable from './DisplayEnquiryTable';
import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jsPDF } from "jspdf";
import {  FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import FormHelperText from '@mui/material/FormHelperText';

// API Call Function
const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

// Dropdown Options
const statusOptions = ["Approved", "Unapproved"];
const owners = ["Landowner", "Developer", "Investor"];
const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
const unitTypes = ["Actual Site", "Hoarding","Facebook","Instagram","Website","Print Media","Radio","Google add","Exhibition","Online Portal","Direct call","Pamphlet","Channel Partner","References","Other"];


// // Sidebar Sections
// const sections = [
//   { label: "Display Leads", icon: <FaEye size={20} /> },
//   { label: "Sample CSV", icon: <FaFileCsv size={20}/> },
//   { label: "Upload Excel", icon: <FaUpload size={20}/> },
// ];


const sections = [
    { label: "Display Enquiries", icon: <FaEye size={24} />, bgColor: "primary.main" },
    { label: "Sample CSV", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
    { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
  ];

const FirstVisits = () => {
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showFileInput, setShowFileInput] = useState(false);
  const [leadNo, setLeadNo] = useState(''); 
  const [salesExec, setSalesExec] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [planningToBuy, setPlanningToBuy] = useState('');
  const [occupation, setOccupation] = useState('');
  const [budget, setBudget] = useState('');
  const [reasonForPurchase, setReasonForPurchase] = useState('');
  const [emailError, setEmailError] = useState('')
  
  const [nameError, setNameError] = useState(false);
  const [alternateContact, setAlternateContact] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [firms, setFirms] = useState([]);

  useEffect(() => {
    loadLoansData();
  }, []);

  const fileInputRef = useRef(null);

  const [data, setData] = useState([
   ]);


  const handleInterestedInChange = (event) => {
    setInterestedIn(event.target.value);
  };
// Handle the change for 'Budget'
const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

 // Handle the change for 'Planning To Buy Within'
 const handlePlanningToBuyChange = (event) => {
    setPlanningToBuy(event.target.value);
  };

   // Handle the change for 'Occupation'
   const handleOccupationChange = (event) => {
    setOccupation(event.target.value); // Update occupation state
  };

  const handleReasonForPurchaseChange = (event) => {
    setReasonForPurchase(event.target.value); // Update reasonForPurchase state
  };

  const handleToggleSection = (index) => {
    if (index === 1) {
      // Download Sample CSV
      downloadSampleCsv();
    } else if (index === 2) {
      // Check if file input ref is defined before clicking
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      setExpandedSection(index);
      setShowFileInput(false);
    }
  };
  
  
  const [inventoryData, setInventoryData] = useState([
    {
     
    },
    {
     
    },
  ]);

  // ✅ Function to handle deletion of a row
  const handleDelete = (index) => {
    setInventoryData(inventoryData.filter((_, i) => i !== index));
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
      setError('Name should not contain digits or spaces');
    } else {
      setError(''); 
    }

    
  };
  


  const handleSubmit = () => {
    const newFirmData = {
      leadNo,
      name,
      mobile,
      alternateContact,
      whatsappNo,
      email,
      salesExec,
      interestedIn,
      budget,
      planningToBuy,
      occupation,
      reasonForPurchase,
    };
  
    console.log("Submitting new firm data:", newFirmData);
  
    // Validation logs
    if (!name || nameError || mobileError || emailError) {
      console.log("Validation failed", {
        nameError,
        mobileError,
        emailError
      });
      toast.error("Please fix validation errors before submitting.");
      return;
    }
  
    setFirms(prev => {
      const updatedFirms = [...prev, newFirmData];
      console.log("Updated firms list after submit:", updatedFirms);
      return updatedFirms;
    });
  
    toast.success("Details are submitted!", {
      position: "top-right",
      autoClose: 3000,
    });
  
    // Reset form values
    setLeadNo("");
    setName("");
    setMobile("");
    setAlternateContact("");
    setWhatsappNo("");
    setEmail("");
    setSalesExec("");
    setInterestedIn("");
    setBudget("");
    setPlanningToBuy("");
    setOccupation("");
    setReasonForPurchase("");
  
    setShowFirmForm(false);
  };
  

  
  const handleSalesExecChange = (event) => {
    setSalesExec(event.target.value);
    setError(''); 
  };
 
  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;  
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;  // Only letters and spaces
  
    if (regex.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setName(value);
      setNameError(true);  // Show error when invalid input
    }
  };

  // Validate email format
  const validateEmail = (value) => {
    // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  // Basic email regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Handle change in mobile input
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
  };

  // Handle change in email input
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };


  const handleDownloadPDFLeads = () => {
    console.log("Loans data before mapping:", loans);

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Leads Report", 14, 15);

    // Columns for the first page
    const firstPageColumns = [
        "Timestamp", "ENQUIRY NO.", "LEAD NO.", "ASSIGN TO", "SALES EXE.",
        "NAME", "MOBILE No", "EMAIL", "ADDRESS", "OCCUPATION"
    ];

    // Columns for the second page
    const secondPageColumns = [
        "COMPANY", "INTERESTED", "BUDGET", "REASON", "REFERENCE",
        "NAME OF CP", "PLANNING TO BUY?", "FOLLOWUP DETAILS"
    ];

    // Limit the number of rows per page
    const maxRowsPerPage = 15;
    const totalRows = Math.min(loans.length, maxRowsPerPage * 2);

    // Mapping data for the first page
    const firstPageRows = loans.slice(0, totalRows).map(row => [
        row.timestamp || "-",
        row.enquiryNo || "-",
        row.leadNo || "-",
        row.assignTo || "-",
        row.salesExecutive || "-",
        row.name || "-",
        row.mobile || "-",
        row.email || "-",
        row.address || "-",
        row.occupation || "-"
    ]);

    // Mapping data for the second page
    const secondPageRows = loans.slice(0, totalRows).map(row => [
        row.company || "-",
        row.interested || "-",
        row.budget || "-",
        row.reason || "-",
        row.reference || "-",
        row.nameOfCP || "-",
        row.planningToBuy || "-",
        row.followupDetails || "-"
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
    doc.text("Leads Report (Continued)", 14, 15);

    // Generate the second page
    autoTable(doc, {
        startY: 25,
        head: [secondPageColumns],
        body: secondPageRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
        margin: { top: 20 }
    });

    doc.save("Leads_Report.pdf");
};


const handleLeadNoChange = (e) => {
  setLeadNo(e.target.value);
};


  return (
    <div className="main-content">
      <h6>Sales Module / Lead Management</h6>

    
      <div className="d-flex align-items-center mb-3">
       


<div className="d-flex align-items-center mb-3">
 

{sections.map((section, index) => (
  <Tooltip key={index} title={section.label} arrow>
    <div
      style={{
        display: 'flex',              
        alignItems: 'center',          
        justifyContent: 'flex-start',  
        backgroundColor: '#3621a9',    
        padding: '10px',
        margin: '10px',
        borderRadius: '20px',          
        color: 'white',
        fontSize: '16px',              
        width: expandedSection === index ? '200px' : '50px',  // Toggle width based on expanded state
        height: '50px',                // Make the height consistent for both collapsed and expanded
        transition: 'width 0.3s ease', // Smooth transition for the width
        background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', // Gradient background
        boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)', // Shadow for depth
      }}
    >
      {/* Icon */}
      <IconButton
        color="primary"
        onClick={() => handleToggleSection(index)}
        sx={{
          padding: 0,                   // Remove padding around icon for tight alignment
          marginRight: '8px',           // Add space between icon and label
          fontSize: '24px',             // Increased icon size
          color: 'white',               // Set the icon color to white
        }}
      >
        {section.icon}
      </IconButton>

      {/* Label */}
      <span className='text-white fw-bold'
        style={{
          color: 'white',
          fontSize: '16px',
          display: expandedSection === index ? 'inline' : 'none', // Show label only when expanded
          marginLeft: '8px',             // Add some space between icon and label
        }}
      >
        {section.label}
      </span>
    </div>
  </Tooltip>
))}



    
</div>

{/* File Upload Input */}
{showFileInput && (
  <div className="m-3">
    <input type="file" accept=".csv, .xlsx" />
  </div>
)}

 {/* Hidden file input element */}
 <input
        type="file"
        accept=".csv, .xlsx"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hidden input element
        onChange={(e) => {
          console.log('File selected:', e.target.files[0]);
        }}
      />



      </div>

      {/* Display Inventory Section */}
      {expandedSection === 0 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
            
              <div className="button-container">
                <div className='d-flex gap-3'>
                <Button variant="contained" color="primary" style={{ background: '#272ba8' }} onClick={() => setShowFirmForm(true)}>
                  + New Enquiry
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
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFLeads}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
                </div>
              
                {/* Pagination Buttons */}
                <div className="right-buttons">
                  <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              {/* <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} /> */}
              {/* <NewLeads inventoryData={inventoryData} handleDelete={handleDelete} /> */}
              
              <DisplayEnquiryTable data= {data} />
           </div>
            </>
          ) : (
 

<div
  className="firm-form mt-4 p-3 border rounded"
  style={{
    maxHeight: "500px",
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
  }}
>
  <Grid container spacing={2}>
    {/* Lead No. Field */}
    <Grid item xs={4}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>Lead No.</InputLabel>
        <Select value={leadNo} onChange={handleLeadNoChange} label="Lead No.">
          <MenuItem value="Lead 9">Lead 9</MenuItem>
          <MenuItem value="Lead 16">Lead 16</MenuItem>
          <MenuItem value="Lead 25">Lead 25</MenuItem>
          <MenuItem value="Lead 26">Lead 26</MenuItem>
          <MenuItem value="Lead 27">Lead 27</MenuItem>
          <MenuItem value="Lead 4">Lead 4</MenuItem>
          <MenuItem value="Lead 3">Lead 3</MenuItem>
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Grid>

    <Grid item xs={4}>
  <TextField
    label="Name"
    fullWidth
    value={name}
    onChange={handleNameChange}
    error={nameError}
    helperText={nameError ? "Only letters are allowed" : ""}
  />
</Grid>


  
    <Grid item xs={4}>
      <TextField
        label="Mobile No."
        fullWidth
        value={mobile}
        onChange={handleMobileChange}
        error={!!mobileError} 
        helperText={mobileError} 
      />
    </Grid>

    <Grid item xs={4}>
  <TextField
    label="Alternate Contact No."
    fullWidth
    value={alternateContact}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only numbers and limit to 10 digits
      if (/^\d{0,10}$/.test(value)) {
        setAlternateContact(value);
      }
    }}
    error={alternateContact.length > 0 && alternateContact.length < 10}
    helperText={
      alternateContact.length > 0 && alternateContact.length < 10
        ? "Mobile number must be 10 digits"
        : ""
    }
  />
</Grid>


   
    <Grid item xs={4}>
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
  />
</Grid>


  
    <Grid item xs={4}>
      <TextField label="Email" fullWidth 
      value={email}
      onChange={handleEmailChange}
      error={!!emailError} 
      helperText={emailError}
      />
    </Grid>

   
    <Grid item xs={4}>
      <TextField label="Address" fullWidth />
    </Grid>

    
    <Grid item xs={4}>
      <TextField label="Company" fullWidth />
    </Grid>

    <Grid item xs={4}>
      <TextField label="Reference by / Source" fullWidth />
    </Grid>

    
    <Grid item xs={4}>
      <TextField label="Name of CP (if Channel Partner)" fullWidth />
    </Grid>

    
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Sales Executive Name</InputLabel>
        <Select
          value={salesExec}
          onChange={handleSalesExecChange}
          label="Sales Executive Name"
        >
          <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
          <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
          <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
          <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
          <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
          <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
          <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
          <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

    {/* Interested In Field */}
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Interested In</InputLabel>
        <Select
          value={interestedIn}
          onChange={handleInterestedInChange}
          label="Interested In"
        >
          <MenuItem value="2 BHK (Under construction)">2 BHK (Under construction)</MenuItem>
          <MenuItem value="3 BHK (Under Construction)">3 BHK (Under Construction)</MenuItem>
          <MenuItem value="2BHK">2BHK</MenuItem>
          <MenuItem value="3BHK">3BHK</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

   
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Budget (Approx.)</InputLabel>
        <Select value={budget} onChange={handleBudgetChange} label="Budget (Approx.)">
          <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
          <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
          <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
          <MenuItem value="61-65 L">61-65 L</MenuItem>
          <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
          <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

  
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Planning To Buy Within?</InputLabel>
        <Select
          value={planningToBuy}
          onChange={handlePlanningToBuyChange}
          label="Planning To Buy Within?"
        >
          <MenuItem value="Immediately">Immediately</MenuItem>
          <MenuItem value="Within Week">Within Week</MenuItem>
          <MenuItem value="Within 1 Month">Within 1 Month</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

    
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Occupation</InputLabel>
        <Select value={occupation} onChange={handleOccupationChange} label="Occupation">
          <MenuItem value="Service / Job">Service / Job</MenuItem>
          <MenuItem value="Business / Self employed">Business / Self employed</MenuItem>
          <MenuItem value="Professional">Professional</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

   
    <Grid item xs={4}>
      <FormControl fullWidth >
        <InputLabel>Reason For Purchase</InputLabel>
        <Select
          value={reasonForPurchase}
          onChange={handleReasonForPurchaseChange}
          label="Reason For Purchase"
        >
          <MenuItem value="End Use">End Use</MenuItem>
          <MenuItem value="Investment">Investment</MenuItem>
        </Select>
        {/* {error && <FormHelperText>{error}</FormHelperText>} */}
      </FormControl>
    </Grid>

    
    <Grid item xs={4}>
      <TextField label="Customer Feedback & Complete Followup Details" fullWidth />
    </Grid>
  </Grid>

  <Button
    variant="contained"
    className="mt-3"
    color="success"
    // onClick={() => {
    //   setShowFirmForm(false);
    //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
    // onClick={() => {
    //   const newFirmData = {
    //     leadNo,
    //     name,
    //     mobile,
    //     alternateContact,
    //     whatsappNo,
    //     email,
    //     salesExec,
    //     interestedIn,
    //     budget,
    //     planningToBuy,
    //     occupation,
    //     reasonForPurchase,
    //     // Include others as needed...
    //   };
    
    //   setFirms(prev => [...prev, newFirmData]);
    //   setShowFirmForm(false);
    //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
   onClick={handleSubmit}
    
    // }}
  >
    Submit
  </Button>
</div>




          )}
        </div>
      )}

{expandedSection === 1 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  
                </Button>
                {/* Pagination Buttons */}
                <div className="right-buttons">
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />
              {/* <NewLeads /> */}
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded" 
            style={{
              backgroundColor: "#f8f9fa", 
              border: "1px solid #ccc",
            }}
            >
             
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

                {/* Type of Units Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Configuration Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Status Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Select Owner Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* <Grid item xs={4}><TextField type="number" label="ATT. Terrace Carpet Area (Sq Ft)" fullWidth /></Grid> */}
                <Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
              </Grid>

              {/* Partner Details */}
           
              {partners.map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              ))}

             

              <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
                Submit
              </Button>
             

            </div> 




          )}
        </div>
      )}


{expandedSection === 2 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  + Display Inventory
                </Button>
                {/* Pagination Buttons */}
                <div className="right-buttons">
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded">
              {/* <h5></h5> */}
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

                {/* Type of Units Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Configuration Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Status Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Select Owner Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* <Grid item xs={4}><TextField type="number" label="ATT. Terrace Carpet Area (Sq Ft)" fullWidth /></Grid> */}
                <Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
              </Grid>

              {/* Partner Details */}
           
              {partners.map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              ))}

             

              <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
                Submit
              </Button>
            </div> 




          )}
        </div>
      )}
    </div>
  );
};

export default FirstVisits;
