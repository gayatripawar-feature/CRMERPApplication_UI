import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,MenuItem,
} from "@mui/material";
import {  FaHandshake } from 'react-icons/fa';
import { ToastContainer, toast } from "react-toastify";
import ChannelPartnerTable from "./ChannelPartnerTable";
import { jsPDF } from "jspdf";
import {  FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
 const ChannelPartner = () => {
  const [isExpanded, setIsExpanded] = useState(true); 
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [data, setData] = useState([]);
  const [pincodeError, setPincodeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [firms, setFirms] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
   const [formData, setFormData] = useState({
    enquiryNo: "",
    cpExecutiveName: "",
    designation: "",
    mobileNo: "",
    website: "",
    email: "",
    postal: "",
    pincode: "",
    location: "",
    city: "",
    zone: "",
  });

  useEffect(() => {
    console.log("Updated Selected Tab:");
  }, []);

  
  const handleToggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'pincode') {
      const regex = /^[0-9\b]*$/;
  
      if (!regex.test(value)) {
        setPincodeError('Only numbers are allowed');
        return;
      } else {
        setPincodeError('');
      }
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (value && !emailRegex.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
    if (name === 'MobileNo') {
      const regex = /^[0-9\b]*$/; // Only numbers allowed
  
      if (!regex.test(value)) {
        setMobileError('Only numbers are allowed');
        return;
      } else if (value.length > 10) {
        setMobileError('Only 10 digits are allowed');
        return;
      } else {
        setMobileError('');
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    console.log("Submitting form data:", formData);
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({
      cpFirmName: "",
      cpexecutivename: "",
      Designation: "",
      MobileNo: "",
      website: "",
      email: "",
      postal: "",
      pincode: "",
      location: "",
      city: "",
      zone: "",
    });
    setShowBookingForm(false)
  };
  const handleDownloadPDFChannel = (data) => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  
    const tableColumn = [
      "TIMESTAMP", "CP Firm Name", "CP Executive Name", "Designation",
      "Mobile No", "Email ID", "Postal Address", "Pin-code",
      "Location", "City", "Zone", "Status"
    ];
  
    const tableRows = data.map(row => [
      row.timestamp || "-",
      row.cpFirmName || "-",
      row.cpExecutiveName || "-",
      row.designation || "-",
      row.mobileNo || "-",
      row.email || "-",
      row.postalAddress || "-",
      row.pinCode || "-",
      row.location || "-",
      row.city || "-",
      row.zone || "-",
      row.status || "-"
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("ChannelPartner_Report.pdf");
  };
  
  

  return (
    <Box className="main-content" sx={{ padding: 3 }}>
      <Typography variant="h6">Sales Module / Channel Partner</Typography>

     
      <Button
  variant="contained"
  color="primary"
  className="mt-3 mb-3"
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    gap: 1,
    borderRadius: '20px',  
    width: isExpanded ? '200px' : '50px',  
    minWidth: '50px',
    padding: '10px 15px',
    textTransform: 'none',
    transition: 'width 0.3s ease, background 0.3s ease',
    background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', 
    boxShadow:
      'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
    cursor: 'pointer',  
    marginBottom: 2,
  }}
  onClick={handleToggleSidebar}
  startIcon={<FaHandshake size={24} color="white" />} 
>
  {isExpanded && <span style={{ color: 'white', fontSize: '16px' }}>Channel Partner</span>} 
</Button>


      <Box className="content-container mt-4">
      

<Box className="content-container mt-4">
 
  {!showBookingForm && (
   
       <Box className="button-container" sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
         <div className="d-flex gap-3">
      <Button
        variant="contained"
        color="primary"
        sx={{ background: "#272ba8" }}
        onClick={() => setShowBookingForm(true)}
      >
        + CP Details Form
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
   
    onClick={() => handleDownloadPDFChannel(data)}

  >
    <FaFileDownload size={18} />  
    Download PDF
  </Button>
  </div>
  </Box>
    
   
  )}
  </Box>

       
   
        {!showBookingForm && <ChannelPartnerTable data={submittedData} />}

        {showBookingForm && (
          <Box className="firm-form mt-4 p-3" sx={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
            <Paper elevation={4} sx={{ borderRadius: "12px", padding: 3 }}>
            
            

            
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="CP Firm Name"
                    name="cpFirmName"
                    fullWidth
                    variant="outlined"
                    value={formData.cpFirmName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="CP Executive Name (as per Rera)"
                    name="cpExecutiveName"
                    fullWidth
                    variant="outlined"
                    value={formData.cpExecutiveName}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    label="Designation"
                    name="designation"
                    fullWidth
                    variant="outlined"
                    value={formData.designation}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mobile No"
                    name="mobileNo"
                    fullWidth
                    variant="outlined"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    error={Boolean(mobileError)}
                    helperText={mobileError}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Website Address"
                    name="website"
                    fullWidth
                    variant="outlined"
                    value={formData.website}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
              
                   <Grid item xs={6}>
                  <TextField
                    label="Email ID"
                    name="email"
                    fullWidth
                    variant="outlined"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={Boolean(emailError)}
                    helperText={emailError}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Postal Address"
                    name="postal"
                    fullWidth
                    variant="outlined"
                    value={formData.postal}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Pin-code"
                    name="pincode"
                    fullWidth
                    variant="outlined"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    error={Boolean(pincodeError)}
                    helperText={pincodeError}
                 
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Location"
                    name="location"
                    fullWidth
                    variant="outlined"
                    value={formData.location}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="city"
                    fullWidth
                    variant="outlined"
                    value={formData.city}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel>Zone</InputLabel>
    <Select
      label="Zone"
      name="zone"
      value={formData.zone}
      onChange={handleInputChange}
    >
      <MenuItem value="East">East</MenuItem>
      <MenuItem value="West">West</MenuItem>
      <MenuItem value="North">North</MenuItem>
      <MenuItem value="South">South</MenuItem>
    </Select>
  </FormControl>
</Grid>

              </Grid>

              
              <Button variant="contained" color="success" className="m-3" onClick={handleFormSubmit}>
                Submit
              </Button>

              <Button variant="contained" color="light" Name="m-3" onClick={() => setShowBookingForm(false)}>
  Cancel
</Button>

            </Paper>
          </Box>
        )}
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default ChannelPartner;
