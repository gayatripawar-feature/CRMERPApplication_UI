


import React ,{useState,useEffect} from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, MenuItem, Box,FormControl,InputLabel,Select } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import Tooltip from '@mui/material/Tooltip';
import { Dialog, DialogTitle, DialogContent, TextField, Button,Grid } from '@mui/material';


const data = [
  {
    mobile: '',
    email: '',
    lastFollowUp: '',
    status: '',
    remark: '',
    nextFollowUp: '',
    assignTo: '',
    enquiryNo: '',
    leadNo: '',
    name: '',
    salesExe: '',
    whatsapp: '',
    alternateContact: '',
    address: '',
    occupation: '',
    company: '',
    interested: '',
    budget: '',
    reason: '',
    reference: '',
    nameOfCP: '',
    planningToBuy: '',
    followupDetails: ''
  },
];



const LostVisitTable = ({data}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [closingExecutive, setClosingExecutive] = useState('');
   const [firmPan, setFirmPan] = useState("");
      const [firmPanError, setFirmPanError] = useState("");
          const [nameError, setNameError] = useState('');
           const [leadType, setLeadType] = useState("");
           const [status, setStatus] = useState("");
const [editableRow, setEditableRow] = useState({});
          const [assignedTo, setAssignedTo] = useState(""); 


              useEffect(() => {
  if (selectedRow) {
    setEditableRow(selectedRow);
  }
}, [selectedRow]);
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

      const handleNameChange = (event) => {
        const value = event.target.value;
    
       
        if (/[^a-zA-Z\s]/.test(value)) {
          setError('Name should only contain letters and spaces.');
        } else {
          setError('');
        }
    
        setName(value);
      };

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClosingExecutiveChange = (e, row) => {
    // Your logic here
    console.log('Selected Closing Executive:', e.target.value);
    console.log('Row Data:', row);
  }
  

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleChange = (e) => {
    setSelectedRow({ ...selectedRow, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    console.log("Updated Data", selectedRow);
    setOpen(false);
  };
  console.log(data);
  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LAST FOLLOW UP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NEXT FOLLOW UP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXE.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CON.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY?</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FOLLOWUP DETAILS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {/* ACTION Column with Icons */}
              <TableCell>
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  <Tooltip title="Edit">
                    {/* <IconButton onClick={() => handleEditClick(row)}
                      size="small" 
                      sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }} 
                  
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
                      onClick={() => handleEditClick(item)}
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
                        width: "32px", height: "32px"
                      }} 
                      onClick={() => window.open(`https://wa.me/${item.mobile}`, '_blank')}
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
                        width: "32px", height: "32px"
                      }} 
                      onClick={() => window.open(`mailto:${item.email}`, '_blank')}
                    >
                      <EmailIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell>{item.lastFollowUp || ""}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.remark}</TableCell>
              <TableCell>{item.nextFollowUp}</TableCell>
              <TableCell>{item.assignTo}</TableCell>
              <TableCell>{item.enquiryNo}</TableCell>
              <TableCell>{item.leadNo}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.salesExe}</TableCell>
              <TableCell>{item.mobile  || ""}</TableCell>
              <TableCell>{item.whatsapp  || ""}</TableCell>
              <TableCell>{item.alternateContact}</TableCell>
              <TableCell>{item.email  || ""}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.occupation}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.interested}</TableCell>
              <TableCell>{item.budget}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.reference}</TableCell>
              <TableCell>{item.nameOfCP}</TableCell>
              <TableCell>{item.planningToBuy}</TableCell>
              <TableCell>{item.followupDetails}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
  <DialogContent>
    <div
      className="firm-form mt-4 p-3"
      style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}
    >
      <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
        <Grid container spacing={2}>
          {/* Enquiry No */}
        <Grid item xs={6}>
            <TextField label="Enquiry No." fullWidth variant="outlined" required 
            value={editableRow?.enquiryNo || ""}

            onChange={(e) =>
  setEditableRow({ ...editableRow, enquiryNo : e.target.value })
}
            
            />
          </Grid>

          {/* Sales Person */}
         <Grid item xs={6}>
  <FormControl
    fullWidth
    variant="outlined"
    
  >
    <InputLabel>Sales Person</InputLabel>
    <Select
      value={editableRow?.closingExecutive || ""}
      onChange={(e) =>
        setEditableRow({ ...editableRow, closingExecutive: e.target.value })
      }
      label="Sales Person"
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
    value={editableRow?.remark || ""}
    onChange={(e) =>
      setEditableRow({ ...editableRow, remark: e.target.value })
    }
    
  />
</Grid>

          {/* Name */}
        <Grid item xs={6}>
  <TextField
    label="Name"
    fullWidth
    variant="outlined"
    value={editableRow?.name || ""}
    onChange={(e) =>
      setEditableRow({ ...editableRow, name: e.target.value })
    }
    error={!!nameError}
    helperText={nameError}
    required
   
  />
</Grid>


          {/* Next Follow Up */}
        <Grid item xs={6}>
  <TextField
    type="datetime-local"
    label="Next Follow Up"
    fullWidth
    variant="outlined"
    required
    value={editableRow?.nextFollowUp || ""}
    onChange={(e) =>
      setEditableRow({ ...editableRow, nextFollowUp: e.target.value })
    }
    InputLabelProps={{ shrink: true }}
    
  />
</Grid>

         <Grid item xs={6}>
  <FormControl fullWidth variant="outlined" >
    <InputLabel>Assign To</InputLabel>
    <Select
      value={editableRow?.assignedTo || " "}
      onChange={(e) => setEditableRow({ ...editableRow, assignedTo: e.target.value })}
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


          {/* Lead Type */}
        <Grid item xs={6}>
  <FormControl fullWidth variant="outlined" >
    <InputLabel>Lead Type</InputLabel>
    <Select
      value={editableRow?.leadType || " "}
      onChange={(e) => setEditableRow({ ...editableRow, leadType: e.target.value })}
      label="Lead Type"
    >
      <MenuItem value="Hot">Hot</MenuItem>
      <MenuItem value="Warm">Warm</MenuItem>
      <MenuItem value="Lost">Lost</MenuItem>
      <MenuItem value="Cold">Cold</MenuItem>
    </Select>
  </FormControl>
</Grid>


          {/* Status */}
        <Grid item xs={6}>
  <FormControl fullWidth variant="outlined" >
    <InputLabel>Status</InputLabel>
    <Select
      value={editableRow?.status || " "}
      onChange={(e) => setEditableRow({ ...editableRow, status: e.target.value })}
      label="Status"
    >
      <MenuItem value="Follow Up">Follow Up</MenuItem>
      <MenuItem value="Not Interested">Not Interested</MenuItem>
      <MenuItem value="Callback Request">Callback Request</MenuItem>
      <MenuItem value="Unreachable">Unreachable</MenuItem>
      <MenuItem value="Booked Property In Other Project">Booked Property In Other Project</MenuItem>
      <MenuItem value="Not Answer">Not Answer</MenuItem>
      <MenuItem value="Invalid Number">Invalid Number</MenuItem>
    </Select>
  </FormControl>
</Grid>
        </Grid>

        <Button onClick={handleUpdate} variant="contained" sx={{ mt: 4, float: "left" }}>
          Update
        </Button>
      </Paper>
    </div>
  </DialogContent>
</Dialog>


      </>
  
  );
};

export default LostVisitTable;
