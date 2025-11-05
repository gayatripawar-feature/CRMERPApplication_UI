import React, { useState, useEffect } from "react";
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
  Grid,
  TextField,
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
import CloseIcon from "@mui/icons-material/Close";
import { useSession } from "../SessionContext";
const NewLeads = ({ inventoryData, setInventoryData, isMobile, isTablet, handleDelete, fetchLeadsData, paginatedFilteredData }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const session = useSession();


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

  //  Source options for the select dropdown
  const sourceOptions = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition", "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];


  // const salesExecutives = [
  //   "Main Sales",
  //   "Ranjeet Rajkumar Kambale",
  //   "Yogita Satish Dalvi",
  //   "Shubhangi Omkar Patil",
  //   "Ajay Ravindra Kate",
  //   "Tester",
  // ];

  const salesExecutives = [
    { id: "fa98e40f-8e1e-4d1f-9b9b-84319e31afec", name: "Ranjeet Rajkumar Kamble" },
    { id: "c923aa2b-8a44-4b73-81b8-71f59ab54ef4", name: "Yogita Satish Dalvi" },
    { id: "da4210d5-f9b2-47ad-a1d5-22a2ec3f7b14", name: "Shubhangi Omkar Patil" },
    { id: "b039b32f-d061-4454-b79b-ebad3e6f5e75", name: "Ashwini Gaikwad" },
  ];

  // const assignedToName = salesExecutives.find(u => u.id === lead.assignedTo)?.name || "-";

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
      console.log("Assign mode");
      //  Call API to save assignment
      try {
        console.log("Calling API to assign lead...");
        // const response = await fetch(`/api/leads/${selectedLead.id}/assignments`, {


        // ✅ find the selected user by name before making the API call
        const selectedUser = salesExecutives.find(u => u.name === assignedTo);
        console.log("✅ selectedUser:", selectedUser);


        const response = await fetch(`https://localhost:5289/sales/api/leads/${selectedLead.id}/assignments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            // assignedTo: assignedTo,
            assignedTo: selectedUser?.id,
            assignedBy: session.id,
            leadId: selectedLead.id
          }),


        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to assign lead: ${errorText}`);
        }

        //  Fetch updated leads from backend
        const latestData = await fetchLeadsData(); // backend have already leadEnagagements
        setInventoryData(latestData);

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



    if (editMode && editedLead) {
      try {
        console.log("➡️ Edit mode: updating lead...");


        let updatedSourceDetails = "";

        if (editedLead.source === "Channel Partner") {
          updatedSourceDetails = [editedLead.firmName, editedLead.personName, editedLead.partnerMobile]
            .filter(Boolean)
            .join(";");
        } else if (editedLead.source === "References") {
          updatedSourceDetails = editedLead.referenceName || "";
        } else if (editedLead.source === "Other") {
          updatedSourceDetails = editedLead.otherSource || "";
        } else {
          // updatedSourceDetails = editedLead.sourceDetails || "";
          // For all other sources (like Direct Call), clear sourceDetails
          updatedSourceDetails = "";
        }


        //  PATCH API call
        // const response = await fetch(`/api/leads/${editedLead.id}`, {
        const response = await fetch(`https://localhost:5289/sales/api/leads/${editedLead.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify({
            ...editedLead,
            sourceDetails: updatedSourceDetails,
            updatedBy: "Admin"
          }),
        });
        console.log("patch api");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to update lead: ${errorText}`);
        }

        const updatedLead = await response.json(); // backend returns updated lead

        //  Update UI with latest backend data
        const updatedInventoryData = inventoryData.map((item) =>
          item.id === updatedLead.id ? updatedLead : item
        );
        setInventoryData(updatedInventoryData);

        toast.success("Lead updated successfully!");
        //  Fetch latest data from backend to update UI
        const latestData = await fetchLeadsData(); // make sure fetchLeadsData returns full array
        setInventoryData(latestData);
        //  Reset edit state
        setEditMode(false);
        setEditedLead(null);
        setModalOpen(false);
      } catch (error) {
        console.error("API update error:", error);
        toast.error(`Failed to update lead. ${error.message}`);
      }
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
    const email = editedLead?.email || ""; // safely get email
    if (!emailRegex.test(email)) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };



  const handleMobileBlur = () => {
    const mobile = editedLead?.phone || "";
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setMobileError(true);
      setMobileHelperText("Please enter a valid 10-digit mobile number.");
    } else {
      setMobileError(false);
      setMobileHelperText("");
    }
  };


  const handleEditClick = async (item) => {
    try {
      setEditMode(true);
      // const response = await fetch(`/api/leads/${item.id}`); // GET lead by Id
      const response = await fetch(`https://localhost:5289/sales/api/leads/${item.id}`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!response.ok) throw new Error("Failed to fetch lead details");
      const leadData = await response.json();
      console.log("edit icon clicked");
      // ====== Parse sourceDetails for edit form ======
      let firmName = "", personName = "", partnerMobile = "", referenceName = "", otherSource = "";
      if (leadData.source === "Channel Partner") {
        [firmName, personName, partnerMobile] = (leadData.sourceDetails || "").split(";").map(s => s.trim());
      } else if (leadData.source === "References") {
        referenceName = leadData.sourceDetails || "";
      } else if (leadData.source === "Other") {
        otherSource = leadData.sourceDetails || "";
      }

      setEditedLead({
        ...leadData,
        firmName,
        personName,
        partnerMobile,
        referenceName,
        otherSource
      });
      // setEditedLead(leadData); // populate modal with backend data
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching lead details:", error);
      toast.error("Failed to load lead details.");
    }
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
              verticalAlign: "middle",
              // border: "1px solid #ddd", // 🔹 adds border to every cell
              // padding: "8px 12px",

            }
          }}
        >
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Actions</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Assign To</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Lead No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Mobile / WhatsApp</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Looking For</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Email</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Source Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Location</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Source Details</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Timestamp</TableCell>
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
              paginatedFilteredData.map((item, index) => (
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
                          // onClick={() => handleDeleteClick(item)}
                          onClick={() => handleDelete(item.id)}

                          sx={{ backgroundColor: Constants.primaryColor, color: "white", p: 0.5 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaTrash style={{ fontSize: isMobile ? "14px" : "18px" }} />
                        </IconButton>
                      </Tooltip>
                    </div>

                  </TableCell>

                  {/* To shows the lastest data of asssignmenet */}
                  {/* <TableCell>
  {item.leadEnagagements && item.leadEnagagements.length > 0
    ? item.leadEnagagements.reduce((latest, curr) =>
        new Date(curr.assignedDate) > new Date(latest.assignedDate) ? curr : latest
      ).assignedTo
    : (
      <Typography variant="body2" color="textSecondary">
        Not assigned
      </Typography>
    )}
</TableCell> */}
                  {/* As lead assignment will be done only once  */}
                  {/* <TableCell>
                    {item.leadEnagagements && item.leadEnagagements.length > 0
                      ? item.leadEnagagements[0].assignedTo
                      : (
                        <Typography variant="body2" color="textSecondary">
                          Not assigned
                        </Typography>
                      )}
                  </TableCell> */}




                  <TableCell>
                    {item.leadEnagagements && item.leadEnagagements.length > 0 ? (
                      salesExecutives.find(
                        (user) => user.id === item.leadEnagagements[0].assignedTo
                      )?.name || item.leadEnagagements[0].assignedTo
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Not assigned
                      </Typography>
                    )}
                  </TableCell>



                  <TableCell>{`Lead - ${String(item.id).padStart(2, '0')}`}</TableCell>

                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone?.toString() || "-"}</TableCell>
                  <TableCell>{item.interest}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>{item.address}</TableCell>

                  <TableCell>
                    {item.sourceDetails && item.sourceDetails.trim() !== ""
                      ? item.sourceDetails
                      : "-"}
                  </TableCell>

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
              <TableCell colSpan={10} sx={{ p: 0, border: "none" }}> </TableCell>
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
        <DialogTitle sx={{
          background: Constants.primaryColor, color: "#fff", display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
        }}>
          {editMode ? "Edit Lead Details" : "Assign Lead To"}
          <IconButton
            onClick={() => {
              setModalOpen(false);
              setEditMode(false);
              setEditedLead(null);
              setAssignedTo("");
            }}
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
            }}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {editMode ? (
            <Box
              sx={{
                // maxWidth: 300,   // max width for the select box
                width: "100%",   // make it responsive on mobile
                // margin: "0 auto",
                mt: 2
              }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={editedLead?.name || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, name: e.target.value })
                    }
                    margin="normal"
                    size={isMobile ? "small" : "medium"}
                    sx={{

                      border: Constants.formInputBorderColor
                    }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>

                  <TextField
                    label="Mobile"
                    fullWidth
                    value={editedLead?.phone || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, phone: e.target.value })
                    }
                    onBlur={handleMobileBlur}
                    error={mobileError}
                    helperText={mobileHelperText}
                    margin="normal"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>

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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Looking For"
                    fullWidth
                    value={editedLead?.interest || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, interest: e.target.value })
                    }
                    margin="normal"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Source Name"
                    fullWidth
                    value={editedLead?.source || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, source: e.target.value })
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Location"
                    fullWidth
                    value={editedLead?.address || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, address: e.target.value })
                    }
                    margin="normal"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>
                {/* Conditional fields for special sources */}
                {editedLead?.source === "Channel Partner" && (
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Firm Name"
                        fullWidth
                        value={editedLead?.firmName || ""}
                        onChange={(e) =>
                          setEditedLead({ ...editedLead, firmName: e.target.value })
                        }
                        margin="normal"
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Person Name"
                        fullWidth
                        value={editedLead?.personName || ""}
                        onChange={(e) =>
                          setEditedLead({ ...editedLead, personName: e.target.value })
                        }
                        margin="normal"
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Partner Mobile"
                        fullWidth
                        value={editedLead?.partnerMobile || ""}
                        onChange={(e) =>
                          setEditedLead({ ...editedLead, partnerMobile: e.target.value })
                        }
                        margin="normal"
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  </>
                )}

                {editedLead?.source === "References" && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Reference Name"
                      fullWidth
                      value={editedLead?.referenceName || ""}
                      onChange={(e) =>
                        setEditedLead({ ...editedLead, referenceName: e.target.value })
                      }
                      margin="normal"
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
                )}

                {editedLead?.source === "Other" && (
                  <TextField
                    label="Other Source"
                    fullWidth
                    value={editedLead?.otherSource || ""}
                    onChange={(e) =>
                      setEditedLead({ ...editedLead, otherSource: e.target.value })
                    }
                    margin="normal"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                )}
              </Grid>
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


                {/* {salesExecutives.map((name, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))} */}

                {salesExecutives.map((user) => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}

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
            <strong style={{ display: "block", textAlign: "center", fontSize: "1.1rem", paddingBottom: "10px", }}>Lead Details:</strong>

            <p><strong className="">Lead No:</strong> {selectedLead?.id}</p>
            <p><strong>Name:</strong> {selectedLead?.name}</p>
            <p><strong>Assigned To:</strong> {assignedTo}</p>
          </div>
          <Button onClick={handleSuccessModalClose} fullWidth sx={{ backgroundColor: Constants.primaryColor, color: "#fff" }}>
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