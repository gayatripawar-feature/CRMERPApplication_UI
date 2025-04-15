


import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Tooltip,Box,Grid,TextField, 

  Dialog,
} from "@mui/material";
import { Edit, WhatsApp, Email, Visibility ,TrackChanges, Map} from "@mui/icons-material";
import { DialogTitle, DialogContent, DialogActions, Button, Typography, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { toast } from "react-toastify";

// const ChannelPartnerTable = ({ data =[] }) => {

  
const ChannelPartnerTable = ({ data}) => {
  const [status, setStatus] = useState("Active"); 
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedStep, setSelectedStep] = useState("");
  const [loading, setLoading] = useState(false);
  const [pincodeError, setPincodeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [tableData, setTableData] = useState([]);



  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };

  const [formData, setFormData] = useState({
    enquiryNo: "",
    projectName: "",
    designation: "",
    mobileNo: "",
    websiteAddress: "",
    emailId: "",
    postalAddress: "",
    pinCode: "",
    location: "",
    city: "",
    zone: "",
  });
  
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };
  
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
  
  
  
  const handleCloseTrackModal = () => {
    setOpen(false);
    setAction(""); // or setOpenTrackModal(false) if you are controlling by open state
  };

  const handleSubmitTrack = () => {
    if (!selectedStep) {
      toast.error("Please select a step");
      return;
    }
  
    setLoading(true); // Start loading
  
    // Simulate API call
    setTimeout(() => {
      console.log("Selected Step:", selectedStep);
      setLoading(false); // Stop loading
      toast.success("Tracking data saved successfully!");
  
      // Close modal after toast
      setTimeout(() => {
        handleCloseTrackModal();
      }, 1000);  // 1 second delay for better UX
    }, 2000);
  };
  
    
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  
  //   // API Call or Save Data Logic Here
  //   console.log("Form Data =>", formData);
  
  //   // Clear form after submit (Optional)
  //   setFormData({
  //     enquiryNo: "",
  //     projectName: "",
  //     designation: "",
  //     mobileNo: "",
  //     websiteAddress: "",
  //     emailId: "",
  //     postalAddress: "",
  //     pinCode: "",
  //     location: "",
  //     city: "",
  //     zone: "",
  //   });
  //   toast.success('Details Updated Successfully!', {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });

  //   // Close form (if you are using Dialog/Modal)
  //   setOpen(false);
  // };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Push new form data to the table data
    const newEntry = {
      timestamp: new Date().toLocaleString(),
      cpFirmName: formData.projectName, // or appropriate field
      cpExecutiveName: formData.enquiryNo,
      designation: formData.designation,
      mobileNo: formData.mobileNo,
      website: formData.websiteAddress,
      email: formData.emailId,
      postalAddress: formData.postalAddress,
      pinCode: formData.pinCode,
      location: formData.location,
      city: formData.city,
      zone: formData.zone,
      status: "Active",
      // Add other fields like option1, option2 if needed
    };
  
    setTableData(prev => [...prev, newEntry]); // Update table data
  
    // Clear the form
    setFormData({
      enquiryNo: "",
      projectName: "",
      designation: "",
      mobileNo: "",
      websiteAddress: "",
      emailId: "",
      postalAddress: "",
      pinCode: "",
      location: "",
      city: "",
      zone: "",
    });
  
    toast.success('Details Updated Successfully!', {
      position: "top-right",
      autoClose: 3000,
    });
  
    setOpen(false); // close dialog/modal
  };
  
  const dummyData = [{
    timestamp: "2025-03-24 ",
    cpFirmName: "ABC Corp",
    cpExecutiveName: "John Doe",
    designation: "Manager",
    mobileNo: "+1234567890",
    website: "https://www.w3.org/WAI/WCAG21/quickref/WCAG-Quick-Reference-2018.pdf", 
    email: "contact@abccorp.com",
    postalAddress: "123 Street, City",
    pinCode: "12345",
    location: "Location A",
    city: "City A",
    zone: "East",
    status: "Active"
  }];

  
  const handleViewClick = (url) => {
    window.open(url, "_blank");
  };

  // const handleStatusChange = (newStatus) => {
  //   setStatus(newStatus); // Update the status when a button is clicked
  // };
  const handleIconClick = (type, rowIndex) => {
    if (type === "edit" || type === "track") {
      setAction(type);
      setOpen(true);
    } else if (type === "roadmap") {
      setSelectedRow(selectedRow === rowIndex ? null : rowIndex); // Toggle Row Expansion
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAction("");
  };

  return (
    <>
    <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>TIMESTAMP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>CP Firm Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>CP Executive Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Designation</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Mobile No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Website Address</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Email ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Postal Address</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Pin-code</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Location</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>City</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Zone</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {/* {dummyData.map((item, index) => ( */}
  {/* {tableData.map((item, index) => ( */}
  {data.map((item, index) => (
  
    <React.Fragment key={index}>
      <TableRow>
        <TableCell
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            borderBottom: "none",
          }}
        >
          {/* Edit Icon */}
          <Tooltip title="Edit" arrow>
            <IconButton
              sx={{
                background: "#1976D2",
                color: "white",
                borderRadius: "50%",
                width: 32,
                height: 32,
                p: 0.5,
                border: "none",
              }}
              onClick={() => handleIconClick("edit", index)}
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Track Progress Icon */}
          <Tooltip title="Track Progress" arrow>
            <IconButton
              sx={{
                background: "#1976D2",
                color: "white",
                borderRadius: "50%",
                width: 32,
                height: 32,
                p: 0.5,
                border: "none",
              }}
              onClick={() => handleIconClick("track", index)}
            >
              <TrackChanges sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Roadmap Icon */}
          <Tooltip title="Roadmap" arrow>
            <IconButton
              sx={{
                background: "#9C27B0",
                color: "white",
                borderRadius: "50%",
                width: 32,
                height: 32,
                p: 0.5,
                border: "none",
              }}
              onClick={() => handleIconClick("roadmap", index)}
            >
              <Map sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell sx={{ textAlign: "center" }}>{item.timestamp}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.cpFirmName}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.cpExecutiveName}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.designation}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.mobileNo}</TableCell>

        <TableCell sx={{ textAlign: "center" }}>
          <Tooltip title="View Document" arrow>
            <IconButton
              sx={{
                background: "#1976D2",
                color: "white",
                borderRadius: "50%",
                width: 32,
                height: 32,
                p: 0.5,
                border: "none",
              }}
              onClick={() => handleViewClick(item.website)}
            >
              <Visibility sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </TableCell>

        <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.postalAddress}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.pinCode}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.location}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.city}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{item.zone}</TableCell>

        {/* Status Button */}
        <TableCell sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="m-1"
            variant={item.status === "Active" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleStatusChange(index, "Active")}
          >
            Active
          </Button>
          <Button
            className="m-1"
            variant={item.status === "Inactive" ? "contained" : "outlined"}
            color="secondary"
            onClick={() => handleStatusChange(index, "Inactive")}
          >
            Inactive
          </Button>
        </TableCell>
      </TableRow>

    
      {selectedRow === index && (
  <TableRow>
    <TableCell colSpan={14}>
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="flex-start" gap={16}>
          {["Call to CP", "Schedule Visit", "Office Visit", "Schedule CP Visit", "CP Visit"].map((step, idx) => (
            <Box key={idx} textAlign="center">
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#1976d2",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  mb: 0.5,
                }}
              >
                {idx + 1}
              </Box>
              <Typography fontSize="11px">{step}</Typography>

              {/* Card Below First Step */}
              {idx === 0 && (
                <Box mt={1}>
                  <Typography fontWeight="bold" fontSize="13px">
                    Date : {item.date || "undefined"}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      mt: 0.5,
                      border: "1px solid #ddd",
                      p: 1,
                      borderRadius: "8px",
                      background: "#f9f9f9",
                    }}
                  >
                    <Typography fontSize="12px">Option 1: {item.option1 || "undefined"}</Typography>
                    <Typography fontSize="12px">Option 2: {item.option2 || "undefined"}</Typography>
                    <Typography fontSize="12px">Option 3: {item.option3 || "undefined"}</Typography>
                    <Typography fontSize="12px">Option 4: {item.option4 || "undefined"}</Typography>
                    <Typography mt={0.5} fontWeight="bold" fontSize="13px">
                      Completed 4/4 Items
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* Card Below Last Step */}
              {idx === 4 && (
                <Box mt={1}>
                  <Typography fontWeight="bold" fontSize="13px">
                    Date : {new Date().toLocaleDateString()}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      mt: 0.5,
                      border: "1px solid #ddd",
                      p: 1,
                      borderRadius: "8px",
                      background: "#f9f9f9",
                    }}
                  >
                    
                    <Typography fontSize="12px"> undefined</Typography>
                    <Typography mt={0.5} fontWeight="bold" fontSize="13px">
                      Completed 1/6 Items
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </TableCell>
  </TableRow>
)}


    </React.Fragment>
  ))}
</TableBody>

      </Table>
      
    </TableContainer>

   </Box>
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {action === "edit" && "Edit Form"}
          {action === "track" && "Track Progress"}
        </DialogTitle>

        <DialogContent>
        {action === "edit" && (
  <Dialog open={true} onClose={handleClose} maxWidth="md" fullWidth>
  
    <DialogContent dividers>
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
                         name="cpexecutive"
                         fullWidth
                         variant="outlined"
                         value={formData.cpexecutive}
                         onChange={handleInputChange}
                         
                       />
                     </Grid>
                     
                     <Grid item xs={6}>
                       <TextField
                         label="Designation"
                         name="Designation"
                         fullWidth
                         variant="outlined"
                         value={formData.designation}
                         onChange={handleInputChange}
                        
                       />
                     </Grid>
                     <Grid item xs={6}>
  <TextField
    label="Mobile No"
    name="MobileNo"
    fullWidth
    variant="outlined"
    value={formData.MobileNo}
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
     
                   {/* Submit Button */}
                   <Button variant="contained" color="success" className="m-3" onClick={handleFormSubmit}>
                   Update
                   </Button>
                 </Paper>
               </Box>
    </DialogContent>
  </Dialog>
)}


{action === "track" && (
  <Dialog open={true} onClose={() => setAction("")} fullWidth maxWidth="sm">
    <DialogTitle>Channel Partner Tracking</DialogTitle>
    <DialogContent>
      <FormControl fullWidth>
        <InputLabel>Select Step</InputLabel>
        <Select
          value={selectedStep}
          onChange={(e) => setSelectedStep(e.target.value)}
          label="Select Step"
        >
          <MenuItem value="Call to CP">Call to CP - 1</MenuItem>
          <MenuItem value="Schedule Visit to CP Office">Schedule Visit to CP Office - 2</MenuItem>
          <MenuItem value="Visit to CP Office">Visit to CP Office - 3</MenuItem>
          <MenuItem value="Schedule Date - Visit of CP">Schedule Date - Visit of CP - 4</MenuItem>
          <MenuItem value="Visit of CP">Visit of CP - 5</MenuItem>
          <MenuItem value="Visit of CP with Customer">Visit of CP with Customer - 6</MenuItem>
          <MenuItem value="1st Follow Up of CP">1st Follow Up of CP - 7</MenuItem>
          <MenuItem value="2nd Follow Up of CP">2nd Follow Up of CP - 8</MenuItem>
          <MenuItem value="CP Visit with Customer & Booking Form Filled">CP Visit with Customer & Booking Form Filled - 9</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>

    <DialogActions>
      <Button onClick={() => setAction("")} color="error">
        Cancel
      </Button>
      <Button onClick={handleSubmitTrack} variant="contained">
        Save
      </Button>
    </DialogActions>
  </Dialog>
)}

        </DialogContent>
      </Dialog>


      </>
  );
};

export default ChannelPartnerTable;
