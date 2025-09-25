


// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton,TablePagination,Box,
//   MenuItem, TextField, Button ,FormControl,InputLabel,Select,Typography,Grid} from '@mui/material';
// import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from 'react-icons/fa';
// import {toast } from 'react-toastify';
// import Constants from '../Constants';
// const PendingFollowuptable = ({firms, setFirms}) => {
//   const [editingIndex, setEditingIndex] = useState(null); 
//   const [selectedItem, setSelectedItem] = useState(null); 
//  const [closingExecutive, setClosingExecutive] = useState('');
 
//      const [firmPan, setFirmPan] = useState("");
//      const [showFirmForm, setShowFirmForm] = useState(true)
//          const [firmPanError, setFirmPanError] = useState("");
//   const [page, setPage] = useState(0); // Current page
//   const [rowsPerPage, setRowsPerPage] = useState(6);

 

//   const [formData, setFormData] = useState({
//     firmName: '',
//     closingExecutive: '',
//     firmPan: '',
//     status: '',
//     assignTo: '',
//     leadType: '',
//     nextFollowUp: '',
//     lastFollowUp: '',
//     remark: '',
//     leadNo: '',
//     mobileNo: '',
//     mailId: '',
//     sourceName: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault(); 

    
//     console.log('Form submitted with data:', formData);

   
//     setFirms([...firms, { ...formData, timestamp: new Date().toLocaleDateString() }]);

    
//     setFormData({
//       firmName: '',
//       closingExecutive: '',
//       firmPan: '',
//       status: '',
//       assignTo: '',
//       leadType: '',
//       nextFollowUp: '',
//       lastFollowUp: '',
//       remark: '',
//       leadNo: '',
//       mobileNo: '',
//       mailId: '',
//       sourceName: '',
//     });

   
//     toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
//     setShowFirmForm(false);
//   };
//   const handleEditClick = (index) => {
//     setEditingIndex(index);
//   };

//   const handleSelectItem = (item) => {
//     setSelectedItem(item);
//   };

//   const handleCancelEdit = () => {
//     setEditingIndex(null);
//   };

//   const handleClosingExecutiveChange = (event) => {
//     setClosingExecutive(event.target.value);
//   };
  
//   const handleFirmPanChange = (e) => {
//     const value = e.target.value;
//     setFirmPan(value);
    
//     const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
//     if (!panRegex.test(value)) {
//       setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
//     } else {
//       setFirmPanError(""); 
//     }
//   };

// const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

  
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0); 
//   };

  
  
//   return (
//     <>
//     <TableContainer component={Paper}>
//       {showFirmForm && selectedItem ? (
       
//         <div
//           className="project-form mt-3 p-3"
//           style={{
//             maxHeight: '500px',
//             overflowY: 'auto',
//             paddingRight: '10px',
//           }}
//         >
//           <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
//                 <Typography variant="h5" gutterBottom>
                  
//                 </Typography>
          
               
                
//                 <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Lead No"
//                 fullWidth
//                 variant="outlined"
                
//               />
//             </Grid>
         
//               <Grid item xs={6}>
//                 <FormControl fullWidth variant="outlined">
//                   <InputLabel id="closing-executive-label">Closing Executive</InputLabel>
//                   <Select
//                     labelId="closing-executive-label"
//                     id="closing-executive"
//                     value={closingExecutive}
//                     onChange={handleClosingExecutiveChange}
//                     label="Closing Executive"
//                   >
                    
//                     <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
//                     <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
//                     <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
//                     <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
//                     <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//                     <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
//                     <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
//                     <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
           
        
          
//             <Grid item xs={6}>
//               <TextField
//                 label="Remark"
//                 fullWidth
//                 variant="outlined"
//                 value={firmPan}
//                       onChange={handleFirmPanChange}
//                       error={!!firmPanError}  
//                       helperText={firmPanError}
//               />
//             </Grid>
        
        
//             <Grid item xs={6}>
//               <TextField
//                 label="Name"
//                 fullWidth
//                 variant="outlined"
//                 value={firmPan}
//                      />
//             </Grid>
        
//             <Grid item xs={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="status-label">Status</InputLabel>
//             <Select
//               labelId="status-label"
//               id="status"
//               label="Status"
//               fullWidth
//               variant="outlined"
//             >
//               <MenuItem value="Follow Up">Follow Up</MenuItem>
//               <MenuItem value="Not Interested">Not Interested</MenuItem>
//               <MenuItem value="Callback Request">Callback Request</MenuItem>
//               <MenuItem value="Unreachable">Unreachable</MenuItem>
//               <MenuItem value="Booked History in Other Project">Booked History in Other Project</MenuItem>
//               <MenuItem value="Not Answer">Not Answer</MenuItem>
//               <MenuItem value="Invalid Number">Invalid Number</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
        
           
//             <Grid item xs={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="assign-to-label">Assign To</InputLabel>
//             <Select
//               labelId="assign-to-label"
//               id="assign-to"
//               label="Assign To"
//               fullWidth
//               variant="outlined"
//             >
//               <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
//               <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
//               <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
//               <MenuItem value="VIVEK TAPKIR">VIVEK TAPKIR</MenuItem>
//               <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//               <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
//               <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
//               <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
        
            
//         <Grid item xs={6}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel id="lead-type-label">Lead Type</InputLabel>
//             <Select
//               labelId="lead-type-label"
//               id="lead-type"
//               label="Lead Type"
//               fullWidth
//               variant="outlined"
//             >
//               <MenuItem value="Hot">Hot</MenuItem>
//               <MenuItem value="Cold">Cold</MenuItem>
//               <MenuItem value="Warm">Warm</MenuItem>
//               <MenuItem value="Lost">Lost</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
        
        
        
//         <Grid item xs={6}>
//           <TextField
//             type="date"
//             label="Next Follow Up"
//             fullWidth
//             variant="outlined"
//             InputLabelProps={{
//               shrink: true, 
//             }}
//           />
//         </Grid>
        
//           </Grid>
          
          
        
          
          
          
          
//           <Button
//   variant="contained"
//   className="m-3"
//   color="success"
//   onClick={() => {
    
//     toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
    
   
//     setShowFirmForm(false); 
//   }}
// >
//   Update
// </Button>

//               </Paper>

//         </div>
//       ) : (
//      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: Constants.primaryColor }}>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACTION</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LAST FOLLOW UP</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>STATUS</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>REMARK</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NEXT FOLLOW UP</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ASSIGN TO</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LEAD NO.</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO. / WHATSAPP NO.</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>YOU ARE LOOKING FOR?</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>EMAIL</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>SOURCE NAME</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {firms.map((firm, index) => (
//               <TableRow key={index} onClick={() => handleSelectItem(firm)}>
//                 <TableCell sx={{ padding: '15px' }}>
//                   <div style={{ display: 'flex', gap: '5px' }}>
//                     <Tooltip title="Edit" arrow>
//                       <IconButton
//                         color="primary"
//                         onClick={() => handleEditClick(index)}
//                         sx={{
//                           backgroundColor: 'primary.main',
//                           padding: '5px',
//                           borderRadius: '50%',
//                           color: 'white',
//                           fontSize: '18px',
//                         }}
//                       >
//                         <FaEdit />
//                       </IconButton>
//                     </Tooltip>
//                     <Tooltip title="WhatsApp" arrow>
//                       <IconButton
//                         color="success"
//                         onClick={() => window.open(`https://wa.me/${firm.mobileNo || ''}`, '_blank')}
//                         sx={{
//                           backgroundColor: 'success.main',
//                           padding: '5px',
//                           borderRadius: '50%',
//                           color: 'white',
//                           fontSize: '18px',
//                         }}
//                       >
//                         <FaWhatsapp />
//                       </IconButton>
//                     </Tooltip>
                 
//                     <Tooltip title="Email" arrow>
//   <IconButton
//     color="primary"
//     onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${firm.mailId || ''}`, '_blank')}
//     sx={{
//       backgroundColor: 'primary.main',
//       padding: '5px',
//       borderRadius: '50%',
//       color: 'white',
//       fontSize: '18px',
//     }}
//   >
//     <FaEnvelope />
//   </IconButton>
// </Tooltip>

//                   </div>
//                 </TableCell>
//                 <TableCell>{firm.timestamp || '-'}</TableCell>
//                 <TableCell>{firm.name || '-'}</TableCell>
//                 <TableCell>{firm.address || '-'}</TableCell>
//                 <TableCell>{firm.timestamp || '-'}</TableCell>
//                 <TableCell>{firm.partner || '-'}</TableCell>
//                 <TableCell>{firm.firmPanNo || '-'}</TableCell>
//                 <TableCell>{firm.panNo || '-'}</TableCell>
//                 <TableCell>{firm.mobileNo || '-'}</TableCell>
//                 <TableCell>{firm.occupation || '-'}</TableCell>
//                 <TableCell>{firm.mailId || '-'}</TableCell>
//                 <TableCell>{firm.residentialAddress || '-'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//         </Box>

        
//       )}
//     </TableContainer>

//     <TablePagination
//   component="div"
//   count={firms.length}
//   page={page}
//   onPageChange={handleChangePage}
//   rowsPerPage={rowsPerPage}
//   onRowsPerPageChange={handleChangeRowsPerPage}
//   rowsPerPageOptions={[5, 6, 10, 25, 50]}
// />

// </>
//   );
// };

// export default PendingFollowuptable;





import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  TablePagination,
  Box,
  Grid,
  TextField,Button,
  Modal,
  Select,MenuItem
} from '@mui/material';
import { FaEdit, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Constants from '../Constants';
import {toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PendingFollowuptable = () => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
const [modalOpen, setModalOpen] = useState(false);
const [editingItem, setEditingItem] = useState(null);
   const [firms] = useState([
    {
      leadNo: 'LD001',
      name: 'John Doe',
      mobileNo: '9876543210',
      mailId: 'john@example.com',
      nextFollowUp: '2025-09-28',
      lastFollowUp: '2025-09-20',
      status: 'Pending',
      remark: 'Call scheduled',
      assignTo: 'Manager 1',
      leadType: '2 BHK',
      sourceName: 'Facebook Ads',
    },
  ]);
  // const handleEditClick = (index) => {
  //   setEditingIndex(index);
  // };
const handleEditClick = (firm) => {
    setEditingItem(firm); // set the row to edit
     setEditFormData({
    leadNo: firm.leadNo,
    name: firm.name,
    remark: firm.remark,
    leadType: firm.leadType,
    status: firm.status,
  });
    setModalOpen(true);   // open modal
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

     const handleModalClose = () => {
    setModalOpen(false);
    setEditingItem(null);
  };

   const [editFormData, setEditFormData] = useState({
  leadNo: '',
  name: '',
  remark: '',
  leadType: '',
  status: '',
});



  //  const handleSave = () => {
    
  //   handleModalClose();
  //    setModalOpen(false);
  // setEditingItem(null);

  // toast.success("Values updated successfully!", {
  //   position: "top-right",
  //   autoClose: 3000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  // });
  // };

  const handleSave = () => {
  // Simple validation example
  if (!editFormData.leadNo || !editFormData.name || !editFormData.status || !editFormData.leadType) {
    toast.error("Please fill all required fields!", {
      position: "top-right",
      autoClose: 3000,
    });
    return; // DO NOT close modal
  }

  // Update the firms array
  const index = firms.findIndex(f => f.leadNo === editingItem.leadNo);
  if (index !== -1) {
    firms[index] = { ...firms[index], ...editFormData };
  }

  handleModalClose(); // Only close modal after valid data
  toast.success("Values updated successfully!", {
    position: "top-right",
    autoClose: 3000,
  });
};

    const filteredFirms = firms.filter((firm) => {
    if (!startDate && !endDate) return true;
    const nextFollowUpDate = new Date(firm.nextFollowUp);
    if (startDate && nextFollowUpDate < new Date(startDate)) return false;
    if (endDate && nextFollowUpDate > new Date(endDate)) return false;
    return true;
  });

  return (
    <>

     <Box sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              label="From"
              type="date"
              fullWidth
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{border:Constants.formInputBorderColor}}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="To"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{border:Constants.formInputBorderColor}}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: Constants.primaryColor }}
              onClick={() => setPage(0)} // reset page after filter
            >
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          {/* <Table>
            <TableHead>
              <TableRow sx={{ background: Constants.primaryColor }}>
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
              {firms
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((firm, index) => (
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
                            onClick={() =>
                              window.open(
                                `https://mail.google.com/mail/?view=cm&fs=1&to=${firm.mailId || ''}`,
                                '_blank'
                              )
                            }
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
          </Table> */}
 



           <Table>
  <TableHead>
    <TableRow sx={{ background: Constants.primaryColor }}>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACTION</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LEAD NO</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO. / WHATSAPP NO.</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>EMAIL</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NEXT FOLLOW UP</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LAST FOLLOW UP</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>STATUS</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>REMARK</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ASSIGN TO</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>YOU ARE LOOKING FOR?</TableCell>
      <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>SOURCE NAME</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {/* {firms */}
    { filteredFirms
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((firm, index) => (
        
        <TableRow key={index} onClick={() => handleSelectItem(firm)}>
          {/* ACTION buttons */}
          <TableCell sx={{ padding: '15px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Tooltip title="Edit" arrow>
                <IconButton
                  color="primary"
                  // onClick={() => handleEditClick(index)}
                  onClick={() => handleEditClick(firm)} 
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
             
            </div>
          </TableCell>

          {/* Data cells in correct order */}
          <TableCell>{firm.leadNo || '-'}</TableCell>
          <TableCell>{firm.name || '-'}</TableCell>
          <TableCell>{firm.mobileNo || '-'}</TableCell>
          <TableCell>{firm.mailId || '-'}</TableCell>
          <TableCell>{firm.nextFollowUp || '-'}</TableCell>
          <TableCell>{firm.lastFollowUp || '-'}</TableCell>
          <TableCell>{firm.status || '-'}</TableCell>
          <TableCell>{firm.remark || '-'}</TableCell>
          <TableCell>{firm.assignTo || '-'}</TableCell>
          <TableCell>{firm.leadType || '-'}</TableCell>
          <TableCell>{firm.sourceName || '-'}</TableCell>
        </TableRow>



      


      ))}
  </TableBody>
</Table>

</Box>

 <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
     

      <TablePagination
  component="div"
  // count={firms.length}
   count={filteredFirms.length} 
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[]} 
  showFirstButton
  showLastButton
/>

      </Box>
        
      </TableContainer>


{/* Modal for editing */}
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 950,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
         {editingItem && (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
   <TextField
  fullWidth
  label="Lead No."
  value={editFormData.leadNo}
  onChange={(e) => setEditFormData({ ...editFormData, leadNo: e.target.value })}
  sx={{ border: Constants.formInputBorderColor }}
/>
    </Grid>
    <Grid item xs={12} sm={6}>
     <TextField
  fullWidth
  label="Name"
  value={editFormData.name}
  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
  sx={{ border: Constants.formInputBorderColor }}
/>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
  fullWidth
  label="Remark"
  value={editFormData.remark}
  onChange={(e) => setEditFormData({ ...editFormData, remark: e.target.value })}
  sx={{ border: Constants.formInputBorderColor }}
/>
    </Grid>
    <Grid item xs={12} sm={6}>
     
     <TextField
  select
  fullWidth
  label="Lead Type"
  value={editFormData.leadType}
  onChange={(e) => setEditFormData({ ...editFormData, leadType: e.target.value })}
  sx={{ border: Constants.formInputBorderColor }}
>
  <MenuItem value="">Select Lead Type</MenuItem>
  <MenuItem value="hot">Hot</MenuItem>
  <MenuItem value="warm">Warm</MenuItem>
  <MenuItem value="cold">Cold</MenuItem>
  <MenuItem value="lost">Lost</MenuItem>
  <MenuItem value="undefined">Undefined</MenuItem>
</TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
    <TextField
  select
  fullWidth
  label="Status"
  value={editFormData.status}
  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
  sx={{ border: Constants.formInputBorderColor }}
>
  <MenuItem value="">Select Status</MenuItem>
  <MenuItem value="hot">Follow UP</MenuItem>
  <MenuItem value="warm">Not Interested</MenuItem>
  <MenuItem value="cold">Booked property In Other Project</MenuItem>
  <MenuItem value="lost">Invalid Number</MenuItem>
  <MenuItem value="undefined">Visit Scheduled</MenuItem>
</TextField>
    </Grid>
    {/* Buttons */}
    <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        sx={{ backgroundColor: Constants.primaryColor }}
        onClick={handleSave}
      >
        Update
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => setModalOpen(false)}
      >
        Cancel
      </Button>
    </Grid>
  </Grid>
)}
        </Box>
      </Modal>

     
     <ToastContainer/>
    </>
  );
};

export default PendingFollowuptable;
