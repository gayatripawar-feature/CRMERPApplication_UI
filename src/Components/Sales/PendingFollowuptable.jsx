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
      <TableContainer component={Paper}>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
    
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
                    backgroundColor:Constants.primaryColor,
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
                    backgroundColor: Constants.primaryColor,
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
            // width: 950,
              width: { xs: "90%", sm: "80%", md: "950px" },
                maxWidth: "95vw",
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
