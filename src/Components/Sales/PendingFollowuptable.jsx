


import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton,
  MenuItem, TextField, Button ,FormControl,InputLabel,Select,Typography,Grid} from '@mui/material';
import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import {toast } from 'react-toastify';
const PendingFollowuptable = () => {
  const [editingIndex, setEditingIndex] = useState(null); // State to track which row is being edited
  const [selectedItem, setSelectedItem] = useState(null); // State to track selected item for display in detail view
 const [closingExecutive, setClosingExecutive] = useState('');
 
     const [firmPan, setFirmPan] = useState("");
     const [showFirmForm, setShowFirmForm] = useState(true)
         const [firmPanError, setFirmPanError] = useState("");
  const firms = [
    {
      timestamp: '2025-03-22',
      name: 'John Doe',
      address: '1234 Street Name',
      firmPanNo: 'ABCDE1234F',
      firmGstNo: 'GST12345',
      firmPan: 'ABCDE1234',
      firmGst: 'GST123',
      firmLightBill: '1000',
      partner: 'Jane Doe',
      aadhaarNo: '1234 5678 9012',
      age: '30',
      occupation: 'Software Engineer',
      mobileNo: '9876543210',
      mailId: 'johndoe@example.com',
      residentialAddress: '5678 Another Street',
      panNo: 'ABCDE1234F',
      lightBill: '500',
    },
  ];

  const handleEditClick = (index) => {
    setEditingIndex(index);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleClosingExecutiveChange = (event) => {
    setClosingExecutive(event.target.value);
  };
  
  const handleFirmPanChange = (e) => {
    const value = e.target.value;
    setFirmPan(value);
    
    const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
    if (!panRegex.test(value)) {
      setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
    } else {
      setFirmPanError(""); 
    }
  };


  // const handleSubmit = () => {
  //   // Create new firm data
  //   const newFirm = {
  //     leadNo: firmName,  // example, make sure to map your form data to appropriate fields
  //     closingExecutive,
  //     firmPan,
  //     status,
  //     assignTo,
  //     leadType,
  //     nextFollowUp
  //   };
  
  //   // Add new firm data to the firms state
  //   setFirms(prevFirms => [...prevFirms, newFirm]);
  
  //   // Show success toast
  //   toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
  
  //   // Reset form after submission
  //   setFirmName('');
  //   setClosingExecutive('');
  //   setFirmPan('');
  //   setStatus('');
  //   setAssignTo('');
  //   setLeadType('');
  //   setNextFollowUp('');
  // };
  const handleSubmit = () => {
    const newFirm = {
      firmName: formData.firmName,
      closingExecutive: formData.closingExecutive,
      firmPanNo: formData.firmPan, // Match with firmPanNo
      status: formData.status,
      assignTo: formData.assignTo,
      leadType: formData.leadType,
      nextFollowUp: formData.nextFollowUp,
      mobileNo: formData.mobileNo,
      mailId: formData.mailId,
      address: formData.address,
      residentialAddress: formData.residentialAddress,
      panNo: formData.panNo,
      name: formData.firmPan, // Optional: Map firmPan to name if needed
      occupation: formData.occupation || '', // Add if used in table
      partner: formData.partner || '',       // Add if used in table
      timestamp: new Date().toLocaleString(),
    };
  
    console.log("Form submitted with data:", newFirm);
  
    setFirms((prevFirms) => [...prevFirms, newFirm]);
  
    toast.success("Details are submitted!", {
      position: "top-right",
      autoClose: 3000,
    });
  
    setFormData({
      firmName: '',
      closingExecutive: '',
      firmPan: '',
      status: '',
      assignTo: '',
      leadType: '',
      nextFollowUp: '',
      mobileNo: '',
      mailId: '',
      address: '',
      residentialAddress: '',
      panNo: '',
      occupation: '',
      partner: '',
    });
  };
  
  return (
    <TableContainer component={Paper}>
      {showFirmForm && selectedItem ? (
        // Display selected item details
        <div
          className="project-form mt-4 p-3"
          style={{
            maxHeight: '500px',
            overflowY: 'auto',
            paddingRight: '10px',
          }}
        >
          <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  
                </Typography>
          
               
                
                <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Lead No"
                fullWidth
                variant="outlined"
                
              />
            </Grid>
         
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="closing-executive-label">Closing Executive</InputLabel>
                  <Select
                    labelId="closing-executive-label"
                    id="closing-executive"
                    value={closingExecutive}
                    onChange={handleClosingExecutiveChange}
                    label="Closing Executive"
                  >
                    
                    <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
                    <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
                    <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
                    <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
                    <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
                    <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
                    <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
                    <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
           
        
          
            <Grid item xs={6}>
              <TextField
                label="Remark"
                fullWidth
                variant="outlined"
                value={firmPan}
                      onChange={handleFirmPanChange}
                      error={!!firmPanError}  
                      helperText={firmPanError}
              />
            </Grid>
        
        
            <Grid item xs={6}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={firmPan}
                     />
            </Grid>
        
            <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              label="Status"
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Follow Up">Follow Up</MenuItem>
              <MenuItem value="Not Interested">Not Interested</MenuItem>
              <MenuItem value="Callback Request">Callback Request</MenuItem>
              <MenuItem value="Unreachable">Unreachable</MenuItem>
              <MenuItem value="Booked History in Other Project">Booked History in Other Project</MenuItem>
              <MenuItem value="Not Answer">Not Answer</MenuItem>
              <MenuItem value="Invalid Number">Invalid Number</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
           
            <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="assign-to-label">Assign To</InputLabel>
            <Select
              labelId="assign-to-label"
              id="assign-to"
              label="Assign To"
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
              <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
              <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
              <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
              <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
              <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
              <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
              <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
            
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="lead-type-label">Lead Type</InputLabel>
            <Select
              labelId="lead-type-label"
              id="lead-type"
              label="Lead Type"
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Hot">Hot</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
              <MenuItem value="Warm">Warm</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        
        
        <Grid item xs={6}>
          <TextField
            type="date"
            label="Next Follow Up"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true, 
            }}
          />
        </Grid>
        
          </Grid>
          
          
        
          
          
          
          
          <Button
  variant="contained"
  className="m-3"
  color="success"
  onClick={() => {
    
    toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
    
   
    setShowFirmForm(false); 
  }}
>
  Update
</Button>

              </Paper>

        </div>
      ) : (
     
        <Table>
          <TableHead>
            <TableRow sx={{ background: '#3621a9' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACTION</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LAST FOLLOW UP</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>STATUS</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>REMARK</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NEXT FOLLOW UP</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ASSIGN TO</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO. / WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>YOU ARE LOOKING FOR?</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>EMAIL</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>SOURCE NAME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firms.map((firm, index) => (
              <TableRow key={index} onClick={() => handleSelectItem(firm)}>
                <TableCell sx={{ padding: '15px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditClick(index)}
                        sx={{
                          backgroundColor: 'primary.main',
                          padding: '5px',
                          borderRadius: '50%',
                          color: 'white',
                          fontSize: '18px',
                        }}
                      >
                        <FaEdit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="WhatsApp" arrow>
                      <IconButton
                        color="success"
                        onClick={() => window.open(`https://wa.me/${firm.mobileNo || ''}`, '_blank')}
                        sx={{
                          backgroundColor: 'success.main',
                          padding: '5px',
                          borderRadius: '50%',
                          color: 'white',
                          fontSize: '18px',
                        }}
                      >
                        <FaWhatsapp />
                      </IconButton>
                    </Tooltip>
                 
                    <Tooltip title="Email" arrow>
  <IconButton
    color="primary"
    onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${firm.mailId || ''}`, '_blank')}
    sx={{
      backgroundColor: 'primary.main',
      padding: '5px',
      borderRadius: '50%',
      color: 'white',
      fontSize: '18px',
    }}
  >
    <FaEnvelope />
  </IconButton>
</Tooltip>

                  </div>
                </TableCell>
                <TableCell>{firm.timestamp || '-'}</TableCell>
                <TableCell>{firm.name || '-'}</TableCell>
                <TableCell>{firm.address || '-'}</TableCell>
                <TableCell>{firm.timestamp || '-'}</TableCell>
                <TableCell>{firm.partner || '-'}</TableCell>
                <TableCell>{firm.firmPanNo || '-'}</TableCell>
                <TableCell>{firm.panNo || '-'}</TableCell>
                <TableCell>{firm.mobileNo || '-'}</TableCell>
                <TableCell>{firm.occupation || '-'}</TableCell>
                <TableCell>{firm.mailId || '-'}</TableCell>
                <TableCell>{firm.residentialAddress || '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default PendingFollowuptable;

