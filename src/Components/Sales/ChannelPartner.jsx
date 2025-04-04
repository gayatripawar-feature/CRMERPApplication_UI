
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
  const [isExpanded, setIsExpanded] = useState(true); // Default expanded state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    enquiryNo: "",
    projectName: "",
  });

  useEffect(() => {
    console.log("Updated Selected Tab:");
  }, []);

  // Toggle the display of the icon (expanded/collapsed)
  const handleToggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleFormSubmit = () => {
    toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
    setShowBookingForm(false); // Hide the form after submission
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
    justifyContent: 'flex-start', // Align items to the left
    gap: 1,
    borderRadius: '20px',  // Border radius applied here
    width: isExpanded ? '200px' : '50px',  // Toggle width based on expanded state
    minWidth: '50px',
    padding: '10px 15px',
    textTransform: 'none',
    transition: 'width 0.3s ease, background 0.3s ease',
    background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', // Gradient background
    boxShadow:
      'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
    cursor: 'pointer',  // Add pointer cursor for better UX
    marginBottom: 2,
  }}
  onClick={handleToggleSidebar}
  startIcon={<FaHandshake size={24} color="white" />} // Increased icon size and changed color to white
>
  {isExpanded && <span style={{ color: 'white', fontSize: '16px' }}>Channel Partner</span>} {/* Increased font size and set text color to white */}
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
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={() => handleDownloadPDFChannel(data)}

  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
  </div>
  </Box>
    
   
  )}
  </Box>

       
        {/* {!showBookingForm && <BookingFormTable data={[]} />} */}
       
        {!showBookingForm && <ChannelPartnerTable data={[]} />}
        {showBookingForm && (
          <Box className="firm-form mt-4 p-3" sx={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
            <Paper elevation={4} sx={{ borderRadius: "12px", padding: 3 }}>
            
            

            
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="CP Firm Name"
                    name="enquiryNo"
                    fullWidth
                    variant="outlined"
                    value={formData.enquiryNo}
                    onChange={handleInputChange}
                   
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    label="CP Executive Name (as per Rera)"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    label="Designation"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Mobile No"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Website Address"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Email ID"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Postal Address"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Pin-code"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                 
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Location"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="projectName"
                    fullWidth
                    variant="outlined"
                    value={formData.projectName}
                    onChange={handleInputChange}
                   
                  />
                </Grid>
                <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel>Zone</InputLabel>
    <Select
      label="Zone"
      name="projectName"
      value={formData.projectName}
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

              {/* Submit Button */}
              <Button variant="contained" color="success" className="m-3" onClick={handleFormSubmit}>
                Submit
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
