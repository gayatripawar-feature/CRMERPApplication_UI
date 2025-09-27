




// import React, { useState } from "react";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   IconButton,
//   Tooltip,
//   Modal,
//   Select,
//   MenuItem,
//   Button,
//   TextField,
//   TablePagination,
//   Box,
// } from "@mui/material";
// import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Constants from "../Constants";

// const NewLeads = ({ inventoryData , setInventoryData}) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [assignedTo, setAssignedTo] = useState("");
//   const [successModalOpen, setSuccessModalOpen] = useState(false);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [editedLead, setEditedLead] = useState(null);

//   const [emailError, setEmailError] = useState(false); 
//   const [emailHelperText, setEmailHelperText] = useState("");

//   const [mobileError, setMobileError] = useState(false); 
//   const [mobileHelperText, setMobileHelperText] = useState("");
  


//   const handleAssignClick = (item) => {
//      setAssignedTo(item.assignTo || "");
//     setModalOpen(true);
//     setSelectedLead(item);
//   };

  
// const handleCloseModal = () => {
//   console.log("🔹 Handle close modal triggered");

//   // Show toast notification
//   toast.success("Details updated successfully!", {
//     position: "top-right",
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//   });

//   // Log modal state before closing
//   console.log("🔹 Closing modal...");

//   // Close modals
//   setModalOpen(false);
//   setSuccessModalOpen(false);

//   // Log current editedLead
//   console.log("🔹 Edited lead:", editedLead);

//   // Update inventoryData array
//   const updatedInventoryData = inventoryData.map((item) => {
//     if (item.leadNo === editedLead?.leadNo) {
//       console.log("🔸 Updating lead:", item.leadNo);
//       return editedLead;
//     }
//     return item;
//   });

//   // Log updated inventoryData
//   console.log("🔹 Updated inventory data:", updatedInventoryData);

//   // Set new inventoryData state
//   setInventoryData(updatedInventoryData);

//   // Reset edit mode
//   setEditMode(false);
//   console.log("🔹 Edit mode turned off");

//   // Clear edited lead
//   setEditedLead(null);
//   console.log("🔹 Edited lead cleared");
// };

//   const handleEmailBlur = () => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailRegex.test(editedLead.email)) {
//       setEmailError(true);
//       setEmailHelperText("Please enter a valid email address.");
//     } else {
//       setEmailError(false);
//       setEmailHelperText("");
//     }
//   };


//   const handleMobileBlur = () => {
//     const mobileRegex = /^[0-9]{10,15}$/; // Regex to allow 10-15 digits (including country code)
//     if (!mobileRegex.test(editedLead.mobile)) {
//       setMobileError(true);
//       setMobileHelperText("Please enter a valid mobile number.");
//     } else {
//       setMobileError(false);
//       setMobileHelperText("");
//     }
//   };
//   const handleDropdownSelect = (selectedValue) => {
//     setAssignedTo(selectedValue);
//   if (selectedLead) {
//     const updatedInventoryData = inventoryData.map((item) => {
//       if (item.leadNo === selectedLead.leadNo) {
//         return { ...item, assignTo: selectedValue }; // update assignTo
//       }
//       return item;
//     });
//     setInventoryData(updatedInventoryData); // update state
//   }

//     setSuccessModalOpen(true);
//     setModalOpen(false);
//   };

//   const handleEditClick = (item) => {
//     setEditMode(true);
//     setEditedLead({ ...item });
//   };

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0); // Reset to the first page when changing rows per page
//   };


//   return (
//     <>
//       {!editMode ? (
//         <TableContainer component={Paper} sx={{ mt: 3 }}>
//           <Table>
//             <TableHead>
              
//              <TableRow sx={{background:Constants.primaryColor}} >
//                 <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>ACTION</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>TIMESTAMP</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ASSIGN TO</TableCell>
//                 <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>LEAD NO</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>NAME</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>MOBILE / WHATSAPP</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOOKING FOR</TableCell>
//                 <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>EMAIL</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>SOURCE NAME</TableCell>
//                 <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>LOCATION</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {/* {inventoryData.map((item, index) => ( */}
//            {inventoryData
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     .map((item, index) => (

//                 <TableRow key={index}>
//                 <TableCell>
//   <div style={{ display: "flex", gap: "5px" }}>
//     <Tooltip title="Edit" arrow>
//       <IconButton
//         color="primary"
//         onClick={() => handleEditClick(item)}
//         sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
//       >
//         <FaEdit style={{ fontSize: "18px" }} />
//       </IconButton>
//     </Tooltip>

//     <Tooltip title="WhatsApp" arrow>
//       <IconButton
//         color="success"
//         onClick={() => window.open(`https://wa.me/${item.mobile}`, "_blank")}
//         sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
//       >
//         <FaWhatsapp style={{ fontSize: "18px" }} />
//       </IconButton>
//     </Tooltip>

    
   



//     <Tooltip title="Assign To" arrow>
//       <IconButton
//         color="secondary"
//         onClick={() => handleAssignClick(item)}
//         sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
//       >
//         <FaUserCircle style={{ fontSize: "18px" }} />
//       </IconButton>
//     </Tooltip>
//   </div>
// </TableCell>

//                   <TableCell>{item.timestamp}</TableCell>
//                   <TableCell>{item.assignTo}</TableCell>
//                   <TableCell>{item.leadNo}</TableCell>
//                   <TableCell>{item.name}</TableCell>
//                   <TableCell>{item.mobile}</TableCell>
//                   <TableCell>{item.lookingFor}</TableCell>
//                   <TableCell>{item.email}</TableCell>
//                   <TableCell>{item.sourceName}</TableCell>
//                   <TableCell>{item.location}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>

//           <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={inventoryData.length} // Total number of rows
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{
//           display: 'flex',
//           justifyContent: 'flex-end', // Align pagination to the right
//           paddingTop: '16px', // Optional: Add space between table and pagination
//         }}
//       />

//         </TableContainer>
//       ) : (
//         <Paper sx={{ padding: 3, mt: 3 }}>
//         <h3>Edit Lead</h3>
      
//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <TextField
//             fullWidth
//             label="Name"
//             value={editedLead.name}
//             onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
//           />
      
//           <TextField
//             fullWidth
//             label="You are looking for"
//             value={editedLead.lookingFor}
//             onChange={(e) => setEditedLead({ ...editedLead, lookingFor: e.target.value })}
//           />
//         </Box>
      
//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <TextField
//           fullWidth
//           label="Mobile No. / WhatsApp No."
//           value={editedLead.mobile}
//           onChange={(e) => setEditedLead({ ...editedLead, mobile: e.target.value })}
//           onBlur={handleMobileBlur} // Trigger validation on blur
//           error={mobileError} // Show error if mobile is invalid
//           helperText={mobileHelperText} // Display the error message
//         />
      
//       <TextField
//         fullWidth
//         label="Email"
//         value={editedLead.email}
//         onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
//         onBlur={handleEmailBlur} // Trigger validation on blur
//         error={emailError} // Show error if email is invalid
//         helperText={emailHelperText} // Display the error message
//         sx={{ mb: 2 }}
//       />
//         </Box>
      
//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <TextField
//             fullWidth
//             label="Location"
//             value={editedLead.location}
//             onChange={(e) => setEditedLead({ ...editedLead, location: e.target.value })}
//           />
      
//           <TextField
//             fullWidth
//             select
//             label="Source Name"
//             value={editedLead.source}
//             onChange={(e) => setEditedLead({ ...editedLead, sourceName: e.target.value })}
//           >
       
//             <MenuItem value="Website">Website</MenuItem>
//   <MenuItem value="Social Media">Social Media</MenuItem>
//   <MenuItem value="Referral">Referral</MenuItem>
//   <MenuItem value="Advertisement">Advertisement</MenuItem>
//   <MenuItem value="Actual Site">Actual Site</MenuItem>
//   <MenuItem value="Hoarding">Hoarding</MenuItem>
//   <MenuItem value="Facebook">Facebook</MenuItem>
//   <MenuItem value="Instagram">Instagram</MenuItem>
//   <MenuItem value="Print Media">Print Media</MenuItem>
//   <MenuItem value="Radio">Radio</MenuItem>
//   <MenuItem value="Google Ad">Google Ad</MenuItem>
//   <MenuItem value="Exhibition">Exhibition</MenuItem>
//   <MenuItem value="Online Portal">Online Portal</MenuItem>
//   <MenuItem value="Direct Call">Direct Call</MenuItem>
//   <MenuItem value="Pamphlet">Pamphlet</MenuItem>
//   <MenuItem value="Channel Partner">Channel Partner</MenuItem>
//   <MenuItem value="Reference">Reference</MenuItem>
//   <MenuItem value="Other">Other</MenuItem>
//           </TextField>
//         </Box>
      
//         <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//           <Button variant="contained" color="primary" onClick={handleCloseModal}>
//             Update
//           </Button>
      
//           <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//         </Box>
//       </Paper>
      
      
      
      
//       )}

//       {/* Modal for "Assign To" */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
//           <h3>Assign To</h3>
//           <Select
//             value={assignedTo}
//             onChange={(e) => handleDropdownSelect(e.target.value)}
//             displayEmpty
//             fullWidth
//             variant="outlined"
//             sx={{ marginBottom: "10px" }}
//           >
//              <MenuItem value="">Select Assignee</MenuItem>
//   <MenuItem value="Shilpa Amewada 1">Shilpa Mewada 1</MenuItem>
//   <MenuItem value="Tic Tac Toe">Tic Tac Toe</MenuItem>
//   <MenuItem value="Shilpa Mewada">Shilpa Mewada</MenuItem>
//   <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
//   <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
//   <MenuItem value="A Mol Pawar">Amol Pawar</MenuItem>
//   <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
//           </Select>
//           <Button onClick={handleCloseModal} color="secondary" fullWidth>
//             Close
//           </Button>
//         </div>
//       </Modal>

//       {/* Success Modal */}
//       <Modal open={successModalOpen} onClose={handleCloseModal}>
//         <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
//           <h3 className="text-center text-primary pb-3">Assignment Successful</h3>
//           <div style={{ marginBottom: "10px" }}>
//             <strong className="text-center fs-5 pb-3">Lead Details:</strong>
//             <p><strong className="">Lead No:</strong> {selectedLead?.leadNo}</p>
//             <p><strong>Name:</strong> {selectedLead?.name}</p>
//             <p><strong>Assigned To:</strong> {assignedTo}</p>
//           </div>
//           <Button onClick={handleCloseModal} color="primary" fullWidth>
//             OK
//           </Button>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default NewLeads;









import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Select,
  MenuItem,
  Button,
  TextField,
  TablePagination,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useMediaQuery,
  useTheme,
  Typography, TableFooter
} from "@mui/material";
import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Constants from "../Constants";

const NewLeads = ({ inventoryData, setInventoryData, isMobile, isTablet, handleDelete }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [modalOpen, setModalOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState(null);

  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");

  const [mobileError, setMobileError] = useState(false);
  const [mobileHelperText, setMobileHelperText] = useState("");




  // // Source options for the select dropdown
  const sourceOptions = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition", "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];


  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the current page data
  const paginatedData = inventoryData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleAssignClick = (item) => {
    setModalOpen(true);
    setSelectedLead(item);
    setEditMode(false);
    setAssignedTo(""); // Reset assignedTo when opening the modal
  };

  const handleCloseModal = () => {
    if (!editMode && assignedTo && selectedLead) {
      const updatedInventoryData = inventoryData.map((item) => {
        if (item.leadNo === selectedLead.leadNo) {
          return { ...item, assignTo: assignedTo };
        }
        return item;
      });

      setInventoryData(updatedInventoryData);


      // Show success modal instead of toast
      setSuccessModalOpen(true);

      // Don't close the assign modal yet, let the success modal handle it
      return;
    } else if (editMode && editedLead) {
      const updatedInventoryData = inventoryData.map((item) => {
        if (item.leadNo === editedLead.leadNo) {
          return editedLead;
        }
        return item;
      });

      setInventoryData(updatedInventoryData);

      toast.success("Details updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      setEditMode(false);
      setEditedLead(null);
    }

    setModalOpen(false);
    setAssignedTo("");
  };

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setModalOpen(false);
    setAssignedTo("");
    setSelectedLead(null);
  };

  const handleEmailBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(editedLead.email)) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };

  const handleMobileBlur = () => {
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(editedLead.mobile)) {
      setMobileError(true);
      setMobileHelperText("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileError(false);
      setMobileHelperText("");
    }
  };

  const handleEditClick = (item) => {
    setEditMode(true);
    setEditedLead({ ...item });
    setModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setLeadToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (leadToDelete) {
      const index = inventoryData.findIndex(item => item.leadNo === leadToDelete.leadNo);
      if (index !== -1) {
        handleDelete(index);
        toast.success("Lead deleted successfully!");
      }
    }
    setDeleteConfirmOpen(false);
    setLeadToDelete(null);
  };

  const handleWhatsAppClick = (mobile) => {
    const whatsappUrl = `https://wa.me/${mobile}`;
    window.open(whatsappUrl, "_blank");
  };


  const handleEmailClick = (email) => {
    if (!email) return;
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(mailUrl, "_blank");
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        // sx={{
        //   maxHeight: 440,
        //   overflowX: 'auto',
        //   '& .MuiTableCell-root': {
        //     padding: isMobile ? '8px 4px' : '16px',
        //     fontSize: isMobile ? '0.75rem' : '0.875rem',
        //   }
        // }}
         sx={{
          maxHeight: isMobile ? 400 : 600,
          width: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            height: isMobile ? '4px' : '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: Constants.primaryColor,
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: Constants.primaryColor,
          }
        }}
      >
        <Table aria-label="sticky table" size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Actions</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Timestamp</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Assign To</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Lead No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Mobile / WhatsApp</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Looking For</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Source Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventoryData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                  <Typography variant="h6" color="textSecondary">
                    No leads to display
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Click on "+ New Leads" to add your first lead
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "5px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditClick(item)}
                          sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaEdit style={{ fontSize: isMobile ? "14px" : "18px" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="WhatsApp" arrow>
                        <IconButton
                          color="success"
                          onClick={() => handleWhatsAppClick(item.mobile)}
                          sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaWhatsapp style={{ fontSize: isMobile ? "14px" : "18px" }} />
                        </IconButton>
                      </Tooltip>

                   

                      <Tooltip title="Assign To" arrow>
                        <IconButton
                          color="secondary"
                          onClick={() => handleAssignClick(item)}
                          sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaUserCircle style={{ fontSize: isMobile ? "14px" : "18px" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete" arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteClick(item)}
                          sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaTrash style={{ fontSize: isMobile ? "14px" : "18px" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>
                    {item.assignTo ? (
                      item.assignTo
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Not assigned
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{item.leadNo}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.lookingFor}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.sourceName}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {/* Footer with Pagination aligned right */}
          <TableFooter>
            <TableRow>
              <TableCell colSpan={10} sx={{ p: 0, border: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    backgroundColor: "background.paper",
                  }}
                >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={inventoryData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{
                      width: 'auto',
                      '& .MuiTablePagination-toolbar': {
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        gap: isMobile ? 2 : 0,
                        padding: isMobile ? '8px 0' : '16px 0'
                      },
                      '& .MuiTablePagination-spacer': {
                        display: isMobile ? 'none' : 'block',
                        flex: 'none'
                      },
                      '& .MuiTablePagination-actions': {
                        marginLeft: isMobile ? 0 : 'auto'
                      },
                      '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        fontSize: isMobile ? '12px' : '14px'
                      }
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>


      </TableContainer>

      <Dialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditMode(false);
          setEditedLead(null);
          setAssignedTo("");
        }}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          {editMode ? "Edit Lead Details" : "Assign Lead To"}
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <Box sx={{ mt: 2 }}>
              <TextField
                label="Name"
                fullWidth
                value={editedLead?.name || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, name: e.target.value })
                }
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}

              />
              <TextField
                label="Mobile"
                fullWidth
                value={editedLead?.mobile || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, mobile: e.target.value })
                }
                onBlur={handleMobileBlur}
                error={mobileError}
                helperText={mobileHelperText}
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}

              />
              <TextField
                label="Email"
                fullWidth
                value={editedLead?.email || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, email: e.target.value })
                }
                onBlur={handleEmailBlur}
                error={emailError}
                helperText={emailHelperText}
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}

              />
              <TextField
                label="Looking For"
                fullWidth
                value={editedLead?.lookingFor || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, lookingFor: e.target.value })
                }
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}

              />

              <TextField
                select
                label="Source Name"
                fullWidth
                value={editedLead?.sourceName || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, sourceName: e.target.value })
                }
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              >
                {sourceOptions.map((type, idx) => (
                  <MenuItem key={idx} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Location"
                fullWidth
                value={editedLead?.location || ""}
                onChange={(e) =>
                  setEditedLead({ ...editedLead, location: e.target.value })
                }
                margin="normal"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Box>
          ) : (
            <Box >

              <Select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                fullWidth
                displayEmpty
                size={isMobile ? "small" : "medium"}
              >
                <MenuItem value="" disabled>
                  Select Sales Executive
                </MenuItem>
                <MenuItem value="Shilpa Amewada 1">Shilpa Mewada 1</MenuItem>
                <MenuItem value="Tic Tac Toe">Tic Tac Toe</MenuItem>
                <MenuItem value="Shilpa Mewada">Shilpa Mewada</MenuItem>
                <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
                <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
                <MenuItem value="A Mol Pawar">Amol Pawar</MenuItem>
                <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
              </Select>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModalOpen(false);
              setEditMode(false);
              setEditedLead(null);
              setAssignedTo("");
            }}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            disabled={
              editMode
                ? emailError || mobileError
                : !assignedTo
            }
            style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }}
          >
            {editMode ? "Update" : "Assign"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal for Assignment */}
      <Modal open={successModalOpen} onClose={handleSuccessModalClose}>
        <div style={{
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "100px",
          outline: "none"
        }}>
          <h3 className="text-center text-primary pb-3">Assignment Successful</h3>
          <div style={{ marginBottom: "10px" }}>
            <strong className="text-center fs-5 pb-3">Lead Details:</strong>
            <p><strong className="">Lead No:</strong> {selectedLead?.leadNo}</p>
            <p><strong>Name:</strong> {selectedLead?.name}</p>
            <p><strong>Assigned To:</strong> {assignedTo}</p>
          </div>
          <Button onClick={handleSuccessModalClose} color="primary" fullWidth>
            OK
          </Button>
        </div>
      </Modal>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the lead for {leadToDelete?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewLeads;