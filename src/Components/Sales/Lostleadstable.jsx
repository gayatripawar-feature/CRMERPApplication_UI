




import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, MenuItem,TextField, Button,Grid,FormControl,InputLabel,Select} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { Tooltip } from '@mui/material';
import { Typography } from 'antd';
import { toast } from 'react-toastify';

const firms = [
  {
    action: "Edit",
    lastFollowUp: "2025-03-10 15:30",
    status: "Follow Up",
    remark: "Interested in property",
    nextFollowUp: "2025-03-20 10:00",
    assignTo: "Shilpha Mewada",
    leadNo: "L12345",
    name: "John Doe",
    mobileNo: "+91 1234567890",
    lookingFor: "2 BHK",
    email: "john@example.com",
    sourceName: "Google Ads",
  },
];

const Lostleadstable = ({firms}) => {
  const [isEditing, setIsEditing] = useState(false); // State to track whether we are editing
  const [selectedFirm, setSelectedFirm] = useState(null); 
  const [remark, setRemark] = useState('');
      const [firmName, setFirmName] = useState("");
      const [firmNameError, setFirmNameError] = useState("");
       const [closingExecutive, setClosingExecutive] = useState('');
       
        const [firmPan, setFirmPan] = useState("");
           const [firmPanError, setFirmPanError] = useState("");
            const [assignedTo, setAssignedTo] = useState("");
              const [leadType, setLeadType] = useState("");
              const [nameError, setNameError] = useState("");

           
// const [editData, setEditData] = useState(null);
const [editData, setEditData] = useState({
  firmName: '',
  closingExecutive: '',
  firmPan: '',
  name: '',
  newFollowUp: '',
  assignedTo: '',
  leadType: '',
  status: '',
});



  // Handles clicking the Edit icon
  const handleEdit = (firm) => {
    setIsEditing(true); // Set editing state to true
    setSelectedFirm(firm); // Set the selected firm for editing
    setRemark(firm.remark); // Prepopulate the remark field
    setEditData({
      firmName: data.firmName,
      closingExecutive: data.closingExecutive,
      firmPan: data.firmPan,
      name: data.name,
      newFollowUp: data.newFollowUp,
      assignedTo: data.assignedTo,
      leadType: data.leadType,
      status: data.status
    });
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
  
  const handleClosingExecutiveChange = (event) => {
    setClosingExecutive(event.target.value);
  };

  const handleFirmNameChange = (e) => {
    const value = e.target.value;

    // Regex to check if the value contains any numbers
    if (/\d/.test(value)) {
      setFirmNameError("Firm Name should only contain letters"); // Error message if numbers are present
    } else {
      setFirmNameError(""); // Clear error message if the value is valid
    }

    // Update the firm name in the state
    setFirmName(value);
  };


  // Handles saving the form
  const handleSave = () => {
    // You can add your save logic here (e.g., update the firm data in a database)
    console.log("Saved Remark:", remark);
    setIsEditing(false); // Hide the form after saving
  };

  // Handles canceling the edit and closing the form
  const handleCancel = () => {
    setIsEditing(false); // Hide the form when canceled
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]*$/;  // Only Alphabets & Space allowed
  
    if (!regex.test(value)) {
      setNameError("Only alphabets are allowed");
    } else {
      setNameError("");
    }
  
    setName(value);
  };
  
  return (
    <TableContainer component={Paper}>
      {isEditing  ? (
     
        <div style={{ padding: '20px' }}>
          <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
                  <Typography variant="h5" gutterBottom>
                
                  </Typography>
            
                 
                  
                  <Grid container spacing={2}>
              {/* <Grid item xs={6}>
                <TextField
                  label="Lead No"
                  fullWidth
                  variant="outlined"
                  value={firmName}
                  onChange={handleFirmNameChange} 
                  error={!!firmNameError} 
                  helperText={firmNameError} 
                  required 
                />
              </Grid> */}
              <Grid item xs={6}>
  <TextField
    label="Lead No"
    fullWidth
    variant="outlined"
    value={isEditing ? editData?.firmName : firmName}  // Conditionally set the value based on editing state
    onChange={(e) => {
      isEditing
        ? setEditData({ ...editData, firmName: e.target.value })  // Update editData if in edit mode
        : handleFirmNameChange(e);  // Use regular handler if not in edit mode
    }}
    error={!!firmNameError} 
    helperText={firmNameError} 
    required 
  />
</Grid>

             
               
              <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="closing-executive-label">Sales Person</InputLabel>
    <Select
      labelId="closing-executive-label"
      id="closing-executive"
      value={isEditing ? editData?.closingExecutive : closingExecutive}  // Conditionally set the value
      onChange={(e) => {
        isEditing
          ? setEditData({ ...editData, closingExecutive: e.target.value })  // Update editData if in edit mode
          : handleClosingExecutiveChange(e);  // Use regular handler if not in edit mode
      }}
      label="Select Sales Person"
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

          
            
              {/* <Grid item xs={6}>
                <TextField
                  label="Remark"
                  fullWidth
                  variant="outlined"
                  value={firmPan}
                        onChange={handleFirmPanChange}
                        error={!!firmPanError}  // Show error if there is an error
                        helperText={firmPanError}
                />
              </Grid> */}
              <Grid item xs={6}>
  <TextField
    label="Remark"
    fullWidth
    variant="outlined"
    value={isEditing ? editData?.firmPan : firmPan}  // Conditionally set the value
    onChange={(e) => {
      isEditing
        ? setEditData({ ...editData, firmPan: e.target.value })  // Update editData if in edit mode
        : handleFirmPanChange(e);  // Use regular handler if not in edit mode
    }}
    error={!!firmPanError}  // Show error if there is an error
    helperText={firmPanError}
  />
</Grid>

          
              {/* <Grid item xs={6}>
                <TextField
                  label="Name"
                  fullWidth
                  variant="outlined"
                  onChange={handleNameChange}
                  error={!!nameError}  // show error if validation fails
                  helperText={nameError} 
                        required 
                />
              </Grid> */}
             <Grid item xs={6}>
  <TextField
    label="Name"
    fullWidth
    variant="outlined"
    value={isEditing ? editData?.name : name}  // Conditionally set the value
    onChange={(e) => {
      isEditing
        ? setEditData({ ...editData, name: e.target.value })  // Update editData if in edit mode
        : handleNameChange(e);  // Use regular handler if not in edit mode
    }}
    error={!!nameError}  // Show error if there is an error
    helperText={nameError}
    required
  />
</Grid>

              
              {/* <Grid item xs={6}>
            <TextField
              type="datetime-local" // Use datetime-local for date and time input
              label="New Follow Up"
              fullWidth
              variant="outlined"
              required // Correct way to add required prop
              InputLabelProps={{
                shrink: true, // Ensures label is above the input
              }}
            />
          </Grid> */}
          
          <Grid item xs={6}>
  <TextField
    type="datetime-local"  // Use datetime-local for date and time input
    label="New Follow Up"
    fullWidth
    variant="outlined"
    value={isEditing ? editData?.newFollowUp : newFollowUp}  // Conditionally set the value
    onChange={(e) => {
      isEditing
        ? setEditData({ ...editData, newFollowUp: e.target.value })  // Update editData if in edit mode
        : setNewFollowUp(e.target.value);  // Use regular handler if not in edit mode
    }}
    required // Correct way to add required prop
    InputLabelProps={{
      shrink: true, // Ensures label is above the input
    }}
  />
</Grid>

              {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="assign-to-label">Assign To</InputLabel>
              <Select
                labelId="assign-to-label"
                id="assign-to"
                value={assignedTo} // Manage the state for "Assign To"
                onChange={(e) => setAssignedTo(e.target.value)} // Update the state with the selected value
                label="Assign To"
                required 
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
          </Grid> */}
          
          <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="assign-to-label">Assign To</InputLabel>
    <Select
      labelId="assign-to-label"
      id="assign-to"
      value={isEditing ? editData?.assignedTo : assignedTo}  // Conditionally set the value
      onChange={(e) => {
        isEditing
          ? setEditData({ ...editData, assignedTo: e.target.value })  // Update editData if in edit mode
          : setAssignedTo(e.target.value);  // Use regular handler if not in edit mode
      }}
      label="Assign To"
      required
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

          
          
              {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="lead-type-label ">Lead type</InputLabel>
              <Select
                labelId="lead-type-label"
                id="lead-type"
                value={leadType}
                onChange={(e) => setLeadType(e.target.value)} // Update the state with the selected value
                label="Lead type"
                
              >
                <MenuItem value="Hot">Hot</MenuItem>
                <MenuItem value="Warm">Warm</MenuItem>
                <MenuItem value="Lost">Lost</MenuItem>
                <MenuItem value="Cold">Cold</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
          
          <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="lead-type-label">Lead Type</InputLabel>
    <Select
      labelId="lead-type-label"
      id="lead-type"
      value={isEditing ? editData?.leadType : leadType}  // Conditionally set the value
      onChange={(e) => {
        isEditing
          ? setEditData({ ...editData, leadType: e.target.value })  // Update editData if in edit mode
          : setLeadType(e.target.value);  // Use regular handler if not in edit mode
      }}
      label="Lead Type"
    >
      <MenuItem value="Hot">Hot</MenuItem>
      <MenuItem value="Warm">Warm</MenuItem>
      <MenuItem value="Lost">Lost</MenuItem>
      <MenuItem value="Cold">Cold</MenuItem>
    </Select>
  </FormControl>
</Grid>

          
              {/* <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)} // Update the state with the selected value
                label="Status"
              >
                <MenuItem value="Follow Up">Follow Up</MenuItem>
                <MenuItem value="Not interested">Not interested</MenuItem>
                <MenuItem value="Callback Request">Callback Request</MenuItem>
                <MenuItem value="Unreachable">Unreachable</MenuItem>
                <MenuItem value="Booked property in other project">Booked property in other project</MenuItem>
                <MenuItem value="Not Answer">Not Answer</MenuItem>
                <MenuItem value="Invalid number">Invalid number</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}

<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="status-label">Status</InputLabel>
    <Select
      labelId="status-label"
      id="status"
      value={isEditing ? editData?.status : status}  // Conditionally set the value
      onChange={(e) => {
        isEditing
          ? setEditData({ ...editData, status: e.target.value })  // Update editData if in edit mode
          : setStatus(e.target.value);  // Use regular handler if not in edit mode
      }}
      label="Status"
    >
      <MenuItem value="Follow Up">Follow Up</MenuItem>
      <MenuItem value="Not interested">Not interested</MenuItem>
      <MenuItem value="Callback Request">Callback Request</MenuItem>
      <MenuItem value="Unreachable">Unreachable</MenuItem>
      <MenuItem value="Booked property in other project">Booked property in other project</MenuItem>
      <MenuItem value="Not Answer">Not Answer</MenuItem>
      <MenuItem value="Invalid number">Invalid number</MenuItem>
    </Select>
  </FormControl>
</Grid>

          
            </Grid>
            
            
          
            
            
            
            
            <Button
  variant="contained"
  className="m-3"
  color="success"
  onClick={() => {
    // Simply show the toast message without calling validation functions
    toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
    
    // Close the form after submission
    // setShowFirmForm(false); // Close the form after update
   
      setIsEditing(false); 
    
  }}
>
  Update
</Button>

                </Paper>
          </div>
       
      ) : (
        
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LAST FOLLOW UP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NEXT FOLLOW UP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO. / WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>YOU ARE LOOKING FOR?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {firms.map((firm, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                    <Tooltip title="Edit">
                      {/* <IconButton
                        size="small"
                        sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }}
                        onClick={() => 
                          handleEdit(firm)
                        }
                      >
                        <EditIcon sx={{ fontSize: "18px" }} />
                      </IconButton> */}
                      <IconButton
  size="small"
  sx={{
    backgroundColor: "#1976D2",
    color: "white",
    borderRadius: "50%",
    "&:hover": { backgroundColor: "#1565C0" },
  }}
  onClick={() => {
    handleEdit(firm);
    setEditData(firm);  // Assuming 'firm' is the correct row object
    setIsEditing(true);
  }}
>
  <EditIcon sx={{ fontSize: "18px" }} />
</IconButton>

                    </Tooltip>

                    <Tooltip title="WhatsApp" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#25D366",
                          borderRadius: "50%",
                          color: "white",
                          "&:hover": { backgroundColor: "#1EBE57" },
                          width: "32px",
                          height: "32px"
                        }}
                      >
                        <WhatsAppIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Email" arrow>
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#EA4335",
                          borderRadius: "50%",
                          color: "white",
                          "&:hover": { backgroundColor: "#D93025" },
                          width: "32px",
                          height: "32px"
                        }}
                      >
                        <EmailIcon sx={{ fontSize: "20px" }} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>

                <TableCell>{firm.lastFollowUp}</TableCell> {/* Last Follow Up */}
                <TableCell>{firm.status}</TableCell> {/* Status */}
                <TableCell>{firm.remark}</TableCell> {/* Remark */}
                <TableCell>{firm.nextFollowUp}</TableCell> {/* Next Follow Up */}
                <TableCell>{firm.assignTo}</TableCell> {/* Assign To */}
                <TableCell>{firm.leadNo}</TableCell> {/* Lead No */}
                <TableCell>{firm.name}</TableCell> {/* Name */}
                <TableCell>{firm.mobileNo}</TableCell> {/* Mobile No / WhatsApp No */}
                <TableCell>{firm.lookingFor}</TableCell> {/* You Are Looking For? */}
                <TableCell>{firm.email}</TableCell> {/* Email */}
                <TableCell>{firm.sourceName}</TableCell> {/* Source Name */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
    
  );
};

export default Lostleadstable;
