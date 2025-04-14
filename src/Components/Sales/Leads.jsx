






import React, { useState, useRef , useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem ,Box,Tooltip,IconButton} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { Inventory } from '@mui/icons-material';
import InventoryTable from './InventoryTable';

import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';

import {  FaChevronDown, FaChevronUp } from "react-icons/fa";
import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";


const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};


const statusOptions = ["Approved", "Unapproved"];
const owners = ["Landowner", "Developer", "Investor"];
const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
const unitTypes = ["Actual Site", "Hoarding","Facebook","Instagram","Website","Print Media","Radio","Google add","Exhibition","Online Portal","Direct call","Pamphlet","Channel Partner","References","Other"];




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
  
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('')
  // const [inventoryData, setInventoryData] = useState([]);

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
  
  const [tableData, setTableData] = useState([]);

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
  
  
  const [inventoryData, setInventoryData] = useState([
    {
     
    },
    {
     
    },
  ]);

  
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
    validateEmail(value);
    setFormData({ ...formData, email: e.target.value });
  };

  const handleDownloadPDFLeads = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Leads Report", 14, 15);
  
   
    const tableColumn = [
      "Timestamp", "Assign To", "Lead No", "Name", "Mobile / WhatsApp",
      "Looking For", "Email", "Source Name", "Location"
    ];
  
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
  


  // const handleFormSubmit = () => {
  //   console.log("Form Submit Triggered");
  //   console.log("Form Data Before Submit:", formData);
  
  //   const newLead = {
  //     ...formData,
  //     timestamp: new Date().toLocaleString(),
  //     assignTo: '',
  //     leadNo: `LD${Date.now()}`,
  //   };
  
  //   console.log("New Lead Entry:", newLead);
  
  //   setTableData(prev => {
  //     const updatedData = [...prev, newLead];
  //     console.log("Updated Table Data:", updatedData);
  //     return updatedData;
  //   });
  
  //   setFormData({
  //     name: '',
  //     mobile: '',
  //     email: '',
  //     location: '',
  //     sourceName: '',
  //     lookingFor: '',
  //     partners: [],
  //   });
  
  //   toast.success("Leads details are submitted!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });
  // };
  
  
  const handleFormSubmit = () => {
    console.log("submit");
    
    // Create a new lead object with a unique leadNo
    const newLead = {
      ...formData,
      timestamp: new Date().toLocaleString(),
      assignTo: '', // Default empty or set dynamically if needed
      leadNo: `LD${Date.now()}`, // Unique Lead No.
    };
    
    // Add the new lead to the inventoryData state
    setInventoryData([...inventoryData, newLead]);
    
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
    
    toast.success("Leads details are submitted!", {
      position: "top-right",
      autoClose: 3000,
    });
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
        width: expandedSection === index ? '200px' : '50px',  
        height: '50px',                
        transition: 'width 0.3s ease', 
        background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', 
        boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)', // Shadow for depth
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

      {/* Label */}
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
      alignItems: "center",  
      gap: "8px",  
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    
    onClick={handleDownloadPDFLeads}
  >
    <FaFileDownload size={18} />  
    Download PDF
  </Button>
  </div>
                
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

<Grid item xs={4}>
  <TextField
    label="Name"
    fullWidth
    required
    value={formData.name}
   onChange={handleChange}
    name="name"
        error={!!error}  
        helperText={error}  
  />
</Grid>

<Grid item xs={4}>
  <TextField
    label="You Are Looking For?"
    fullWidth
    required
    value={formData.lookingFor}
    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    label="Mobile No. / WhatsApp No."
    fullWidth
    required
  
    value={mobile}
    onChange={handleMobileChange}
    error={!!mobileError} 
    helperText={mobileError} 
  />
</Grid>

<Grid item xs={4}>
  <TextField
    label="Email"
    required
    fullWidth
    value={email}
          onChange={handleEmailChange}
          error={!!emailError} 
          helperText={emailError} 
  />
</Grid>

<Grid item xs={4}>
  <TextField
    type="text"
    label="Location"
    fullWidth
    value={formData.location}
    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
  />
</Grid>

<Grid item xs={4}>
  <TextField
    select
    label="Source Name"
    fullWidth
    value={formData.sourceName}
    onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
  >
    {unitTypes.map((type, idx) => (
      <MenuItem key={idx} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
</Grid>

</Grid>

           
              

             

          

<Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    handleFormSubmit();
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

{/* {expandedSection === 1 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  + Inventory Info
                </Button>
                
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

               
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

              
                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                
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

               
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

              
                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

               
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

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
      )} */}
    </div>
  );
};

export default Leads;
