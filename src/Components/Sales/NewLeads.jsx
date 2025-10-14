import React, { useState,useEffect } from "react";
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







  

const handleCloseModal = async () => {
  console.log("🔹 handleCloseModal called");
  console.log("editMode:", editMode);
  console.log("assignedTo:", assignedTo);
  console.log("selectedLead:", selectedLead);
  console.log("editedLead:", editedLead);
  console.log("inventoryData before update:", inventoryData);
console.log("inventoryData fetched:", inventoryData);

  // Handle Assign
  if (!editMode && assignedTo && selectedLead) {
    console.log("➡️ Assign mode");

    // 1️⃣ Update UI
    const updatedInventoryData = inventoryData.map((item) => {
      if (item.id === selectedLead.id) {
        console.log(`Updating lead id=${item.id} with assignedTo=${assignedTo}`);
        // return { ...item, assignedTo: assignedTo };
        return {
  ...item,
  leadEnagagements: [
    ...(item.leadEnagagements || []),
    {
      id: Date.now(), // or from API response
      assignedTo: assignedTo,
      assignedBy: "Admin",
      leadId: item.id,
      assignedDate: new Date().toISOString(),
      status: "Assigned"
    }
  ]
};

      }
      return item;
    });
    console.log("Updated inventoryData (UI):", updatedInventoryData);
    setInventoryData(updatedInventoryData);

    // 2️⃣ Call API to save assignment
    try {
      console.log("Calling API to assign lead...");
      const response = await fetch(`/api/leads/${selectedLead.id}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignedTo: assignedTo, 
          assignedBy: "Admin",
          leadId: selectedLead.id
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to assign lead: ${errorText}`);
      }

      const savedLead = await response.json();
      console.log("API response savedLead:", savedLead);
      toast.success("Lead assigned successfully!");
    } catch (error) {
      console.error("API assign error:", error);
      toast.error(`Failed to assign lead. ${error.message}`);
    }

    // Show success modal
    console.log("Opening success modal...");
    setSuccessModalOpen(true);
    return;
  }

  // Handle Edit
  if (editMode && editedLead) {
    console.log("➡️ Edit mode");

    const updatedInventoryData = inventoryData.map((item) => {
      if (item.leadNo === editedLead.leadNo) {
        console.log(`Updating leadNo=${item.leadNo} with editedLead`, editedLead);
        return editedLead;
      }
      return item;
    });

    console.log("Updated inventoryData (edit):", updatedInventoryData);
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

  // Cleanup
  console.log("Closing modal and resetting state...");
  setModalOpen(false);
  setAssignedTo("");
  setSelectedLead(null);
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


  
  const formatTimestamp = (timestamp) => {
  if (!timestamp) return "-";
  const date = new Date(timestamp);

  // Convert to local time in India (IST)
  return date.toLocaleString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24-hour format
  }).replace(',', ''); // remove the comma between date and time
};

  return (
    <div>
      <TableContainer
        component={Paper}
       
         sx={{
          maxHeight: isMobile ? 400 : 600,
          width: '100%',
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: isMobile ? "4px" : "6px",
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
        <Table aria-label="sticky table" size={isMobile ? "small" : "medium"}   
        sx={{
    "& .MuiTableCell-root": {
      whiteSpace: "nowrap",    
      overflow: "hidden",
      textOverflow: "ellipsis",
      verticalAlign: "middle"  
    }
  }}
  >
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Actions</TableCell>
             
              <TableCell align="center"  sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Assign To</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Lead No</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Mobile / WhatsApp</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Looking For</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Email</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Source Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Location</TableCell>
               <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Source Details</TableCell>
               <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {inventoryData.length === 0 ? ( */}
               {paginatedData.length === 0 ? (
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
{item.email && (
    <Tooltip title="Email" arrow>
      <IconButton
        color="primary"
        onClick={() => handleEmailClick(item.email)}
        sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
        size={isMobile ? "small" : "medium"}
      >
        <FaEnvelope style={{ fontSize: isMobile ? "14px" : "18px" }} />
      </IconButton>
    </Tooltip>
  )}

                   

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
                 
                 <TableCell>
  {item.leadEnagagements && item.leadEnagagements.length > 0
    ? item.leadEnagagements.reduce((latest, curr) =>
        new Date(curr.assignedDate) > new Date(latest.assignedDate) ? curr : latest
      ).assignedTo
    : (
      <Typography variant="body2" color="textSecondary">
        Not assigned
      </Typography>
    )}
</TableCell>

                
                  
                  {/* <TableCell>{item.id}</TableCell>                  */}
                  <TableCell>{`Lead- ${String(item.id).padStart(2, '0')}`}</TableCell>

<TableCell>{item.name}</TableCell>



<TableCell>{item.phone?.toString() || "-"}</TableCell>
{/* <TableCell>{item.phone && item.phone !== 0 ? item.phone.toString() : "-"}</TableCell> */}




<TableCell>{item.interest}</TableCell>
<TableCell>{item.email}</TableCell>
<TableCell>{item.source}</TableCell>
<TableCell>{item.address}</TableCell>
 
{/* 
<TableCell>
  {item.sourceName === "Channel Partner"
    ? `${item.firmName || ""}; ${item.personName || ""}; ${item.partnerMobile || ""}`
    : item.sourceName === "References"
    ? item.referenceName || "-"
    : item.sourceName === "Other"
    ? item.otherSource || "-"
    : "-"}
</TableCell> */}

<TableCell>
  {item.sourceDetails && item.sourceDetails.trim() !== ""
    ? item.sourceDetails
    : "-"}
</TableCell>

 {/* <TableCell>{formatTimestamp(item.lastUpdatedDate)}</TableCell> */}


<TableCell>
  {formatTimestamp(item.Timestamp || item.lastUpdatedDate)}
</TableCell>



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
  labelDisplayedRows={() => `${page + 1} of ${Math.ceil(inventoryData.length / rowsPerPage)}`}
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
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle>
          {editMode ? "Edit Lead Details" : "Assign Lead To"}
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <Box 
            sx={{
                maxWidth: 300,   // max width for the select box
          width: "100%",   // make it responsive on mobile
          margin: "0 auto",
               mt: 2 
               }}>
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
            <Box sx={{
    width: isMobile ? "90%" : 300,  // smaller width, responsive for mobile
    margin: "20px auto",            // centers horizontally and adds vertical spacing
  }}>

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
          <h3 className="text-center  pb-3" style={{
    backgroundColor: Constants.primaryColor,
    color: "white",
    padding: "10px",
    borderRadius: "4px",
  }}>Assignment Successful</h3>
          <div style={{ marginBottom: "10px" }}>
           <strong style={{display: "block",textAlign: "center",fontSize: "1.1rem",paddingBottom: "10px",}}>Lead Details:</strong>

            <p><strong className="">Lead No:</strong> {selectedLead?.leadNo}</p>
            <p><strong>Name:</strong> {selectedLead?.name}</p>
            <p><strong>Assigned To:</strong> {assignedTo}</p>
          </div>
          <Button onClick={handleSuccessModalClose}  fullWidth sx={{backgroundColor:Constants.primaryColor,color:"#fff"}}>
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