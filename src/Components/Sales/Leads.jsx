






import React, { useState, useRef , useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem ,Box,Tooltip,IconButton} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { Inventory } from '@mui/icons-material';
import InventoryTable from './InventoryTable';
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';

import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

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
    { label: "Display Leads", icon: <FaEye size={24} />, bgColor: "primary.main" },
    { label: "Sample CSV", icon: <FaFileCsv size={24} />, bgColor: "success.main" },
    { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
  ];

const Leads = () => {
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showFileInput, setShowFileInput] = useState(false);

  const [mobile, setMobile] = useState('');
  // const [expandedSection, setExpandedSection] = useState(null);
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('')
  useEffect(() => {
    loadLoansData();
  }, []);

  const fileInputRef = useRef(null);


  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
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


  // const downloadSampleCsv = () => {
  //   const sampleData = "Name,Email,Phone\nJohn Doe,john@example.com,1234567890";
  //   const blob = new Blob([sampleData], { type: "text/csv" });
  //   const url = URL.createObjectURL(blob);

  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "lead_template.csv";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };
  const downloadSampleCsv = () => {
    // Define the headers and sample data
    const headers = "Name,Mobile No.,Source Name,Location,Are You Looking For\n";
    const sampleData = "\n";
    
    // Create a Blob with the CSV content
    const blob = new Blob([headers + sampleData], { type: "text/csv" });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element for the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead_template.csv"; // The file name
  
    // Trigger the download
    document.body.appendChild(a);
    a.click();
  
    // Clean up
    document.body.removeChild(a);
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    
    // Regular expression to check for digits or spaces
    // const regex = /[\d\s]/;
    const regex = /\d/;

    // If value contains digits or spaces, show error
    if (regex.test(value)) {
      setError('Name should not contain digits');
    } else {
      setError(''); // Clear the error if no issue
    }

    setName(value); // Update the name
  };

 
  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;  // Only exactly 10 digits allowed
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };
  

  // Validate email format
  const validateEmail = (value) => {
    // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;  
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
  
    // Define new table columns
    const tableColumn = [
      "Timestamp", "Assign To", "Lead No", "Name", "Mobile / WhatsApp",
      "Looking For", "Email", "Source Name", "Location"
    ];
  
    // Map data into rows
    const tableRows = loans.map(row => [
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
  };
  





  return (
    <div className="main-content">
      <h6>Sales Module / Lead Management</h6>

      {/* Sidebar Navigation */}
      <div className="d-flex align-items-center mb-3">
       


<div className="d-flex align-items-center mb-3">
  {/* {sections.map((section, index) => (
    <Button
      key={index}
      onClick={() => handleToggleSection(index)}
      variant="outlined"
      color="primary"
      className="m-3"
      sx={{
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        '&:hover': { backgroundColor: '#9b4dca', color: '#fff' },
        borderColor: '#9b4dca',
        color: '#9b4dca',
      }}
      startIcon={expandedSection === index ? section.icon : <FaEye size={20} color="#9b4dca" />}
    >
      {expandedSection === index ? section.label : null} 
    </Button>
  ))} */}


{/* 
{sections.map((section, index) => (
        <Tooltip key={index} title={section.label} arrow>
          <IconButton
            color="primary"
            // onClick={() => console.log(`${section.label} clicked`)}
            onClick={() => handleToggleSection(index)}
            sx={{
              backgroundColor: section.bgColor,
              padding: "10px",   
           margin :"10px",
              borderRadius: "50%",
              color: "white",
              fontSize: "24px",   // Increased icon size
            }}
          >
            {section.icon}
          </IconButton>
        </Tooltip>
      ))} */}

{sections.map((section, index) => (
  <Tooltip key={index} title={section.label} arrow>
    <div
      style={{
        display: 'flex',               // Flexbox to arrange icon and label horizontally
        alignItems: 'center',          // Align the icon and label vertically in the center
        justifyContent: 'flex-start',  // Ensure the content is aligned to the left
        backgroundColor: '#3621a9',    // Background color for the button
        padding: '10px',
        margin: '10px',
        borderRadius: '20px',          // Rounded corners for the container
        color: 'white',
        fontSize: '16px',              // Font size for the label
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
      <span className='fw-bold'
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
                  + New Leads
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
              <NewLeads inventoryData={inventoryData} handleDelete={handleDelete} />
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded" 
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa", 
              border: "1px solid #ccc", 
            }}
            >
              
              <Grid container spacing={2}>
                {/* <Grid item xs={4}><TextField label="Name " fullWidth /></Grid> */}
                <Grid item xs={4}>
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={handleChange}
        error={!!error}  // Display error if there is an error message
        helperText={error}  // Show the error message below the text field
      />
    </Grid>
                <Grid item xs={4}><TextField label="
You Are Looking For?" fullWidth /></Grid>
                {/* <Grid item xs={4}><TextField label="Mobile No. / WhatsApp No." fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Email." fullWidth /></Grid>
               */}

<Grid item xs={4}>
        <TextField
          label="Mobile No. / WhatsApp No."
          fullWidth
          value={mobile}
          onChange={handleMobileChange}
          error={!!mobileError} // Show error if validation fails
          helperText={mobileError} // Display error message
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Email."
          fullWidth
          value={email}
          onChange={handleEmailChange}
          error={!!emailError} // Show error if validation fails
          helperText={emailError} // Display error message
        />
      </Grid>
                <Grid item xs={4}><TextField type="text" label="Location" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
               
             
                <Grid item xs={4}>
                  <TextField select label="Source Name" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
             
              </Grid> 

         
           
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

             

          

<Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    setShowFirmForm(false);
    toast.success("Leads details are submitted!", { position: "top-right", autoClose: 3000 });
  }}
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
                  + Inventory Info
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
              backgroundColor: "#f8f9fa", // Light background for contrast
              border: "1px solid #ccc", // Light gray border for separation
            }}
            >
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

export default Leads;
