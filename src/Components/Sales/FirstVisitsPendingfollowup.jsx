

import React, { useState, useEffect } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TablePagination, useMediaQuery, useTheme, Box, Typography,
  IconButton, Tooltip, TableFooter, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select,
  MenuItem, Button, Modal, TextField, Grid
} from "@mui/material";
import { Visibility as VisibilityIcon, Edit as EditIcon, Email as EmailIcon, Assignment as AssignmentIcon, Delete as DeleteIcon, FilterList as FilterListIcon, } from "@mui/icons-material";
import { FaWhatsapp } from "react-icons/fa";
import Constants from "../Constants";
const handleOpenDocument = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};
const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const FirstVisitsPendingfollowup = ({
  // firms,
  data = [],
  onUpdate,
  onDelete,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);
  // Delete confirmation
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  // Edit functionality states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    enquiryNo: "",
    remark: "",
    name: "",
    nextFollowUp: "",
    visitType: "",
    status: "",
    visitScheduledDate: "",
  });
  const [showNextFollowUpEdit, setShowNextFollowUpEdit] = useState(false);
  const [showVisitScheduledDateEdit, setShowVisitScheduledDateEdit] =
    useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Email handler
  const handleEmail = (row) => {
    if (!row.email) return;
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${row.email}`;
    window.open(mailUrl, "_blank");
  };

  // WhatsApp handler
  const handleWhatsAppClick = (row) => {
    if (!row.whatsappNo) return;
    const whatsappUrl = `https://wa.me/${row.whatsappNo}`;
    window.open(whatsappUrl, "_blank");
  };

  // Delete functionality
  const handleDeleteClick = (item, index) => {
    setItemToDelete({ item, index });
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete && onDelete) {
      onDelete(itemToDelete.item, itemToDelete.index);
    }
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  // Edit functionality
  const handleEditClick = (item, index) => {
    setEditingItem({ ...item, index });
    setEditFormData({
      enquiryNo: item.enquiryNo || "",
      remark: item.remark || "",
      name: item.name || "",
      nextFollowUp: item.nextFollowUp || "",
      visitType: item.visitType || "",
      status: item.status || "",
      visitScheduledDate: item.visitScheduledDate || "",
    });

    // Set visibility for date fields based on status
    const statusesThatRequireNextFollowUp = [
      "Callback request",
      "Unreachable",
      "Not answered",
      "Follow up",
    ];

    const statusesThatRequireVisitScheduledDate = [
      "Re-visit",
      "Visit postponed",
    ];

    setShowNextFollowUpEdit(
      statusesThatRequireNextFollowUp.includes(item.status)
    );
    setShowVisitScheduledDateEdit(
      statusesThatRequireVisitScheduledDate.includes(item.status)
    );

    setEditModalOpen(true);
  };

  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingItem(null);
    setEditFormData({
      enquiryNo: "",
      remark: "",
      name: "",
      nextFollowUp: "",
      visitType: "",
      status: "",
      visitScheduledDate: "",
    });
  };

  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Update date field visibility when status changes
    if (field === "status") {
      const statusesThatRequireNextFollowUp = [
        "Callback request",
        "Unreachable",
        "Not answered",
        "Follow up",
      ];

      const statusesThatRequireVisitScheduledDate = [
        "Re-visit",
        "Visit postponed",
      ];

      setShowNextFollowUpEdit(statusesThatRequireNextFollowUp.includes(value));
      setShowVisitScheduledDateEdit(
        statusesThatRequireVisitScheduledDate.includes(value)
      );
    }
  };

  const handleEditSubmit = () => {
    if (editingItem && onUpdate) {
      const updatedItem = {
        ...editingItem,
        ...editFormData,
      };

      onUpdate(updatedItem, editingItem.index);
      setEditModalOpen(false);
    }
  };

  // Paginate the data
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}
        sx={{
          maxHeight: isMobile ? 400 : 400,
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            height: isMobile ? "4px" : "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: Constants.primaryColor,
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: Constants.primaryColor,
          },
        }}
      >
        <Table aria-label="followup pending table"
          size={isMobile ? "small" : "medium"} sx={{ minWidth: 2400 }}>
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", minWidth: isMobile ? "150px" : "auto" }}>   ACTION   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>  LAST FOLLOW UP    </TableCell>

              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REMARK
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NEXT FOLLOW UP
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ASSIGN TO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ENQUIRY NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LEAD NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                SALES EXECUTIVE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                MOBILE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ALTERNATE CONTACT
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                WHATSAPP
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                EMAIL
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                OCCUPATION
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                COMPANY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                INTERESTED
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                BUDGET
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REASON
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REFERENCE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME OF CP
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PLANNING TO BUY?
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                FOLLOWUP DETAILS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={25}
                  align="center"
                  sx={{
                    padding: "40px",
                    fontSize: "16px",
                    color: "text.secondary",
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                      }}
                    >
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#1976d2",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#1565c0" },
                          }}
                          onClick={() => handleEditClick(row, index)}
                        >
                          <EditIcon
                            sx={{ fontSize: isMobile ? "14px" : "18px" }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="WhatsApp">
                        <IconButton
                          color="success"
                          onClick={() => handleWhatsAppClick(row)}
                          sx={{
                            backgroundColor: "success.main",
                            color: "white",
                            p: 0.5,
                          }}
                          size={isMobile ? "small" : "medium"}
                        >
                          <FaWhatsapp
                            style={{ fontSize: isMobile ? "14px" : "18px" }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Email">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#EA4335",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#D93025" },
                          }}
                          onClick={() => handleEmail(row)}
                        >
                          <EmailIcon
                            sx={{ fontSize: isMobile ? "14px" : "18px" }}
                          />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#f44336",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#d32f2f" },
                          }}
                          onClick={() => handleDeleteClick(row, index)}
                        >
                          <DeleteIcon
                            sx={{ fontSize: isMobile ? "14px" : "18px" }}
                          />
                        </IconButton>
                      </Tooltip>


                    </div>
                  </TableCell>
                  <TableCell>{row.lastFollowUp || "-"}</TableCell>
                  <TableCell>{row.status || "-"}</TableCell>
                  <TableCell>{row.remarks || "-"}</TableCell>
                  <TableCell>
                    {row.nextFollowUp
                      ? formatDateTime(row.nextFollowUp)
                      : row.visitScheduledDate
                        ? formatDateTime(row.visitScheduledDate)
                        : "-"}
                  </TableCell>
                  <TableCell>
                    <TableCell>{row.assignedTo || "-"}</TableCell>
                  </TableCell>
                  <TableCell>{row.enquiryId || "-"}</TableCell>
                  <TableCell>{row.id || "-"}</TableCell>
                  <TableCell>{row.name || "-"}</TableCell>
                  <TableCell>{row.salesExecutive || "-"}</TableCell>
                  <TableCell>{row.phone || "-"}</TableCell>
                  <TableCell>{row.alternateContactNo || "-"}</TableCell>
                  <TableCell>{row.whatsappNo || "-"}</TableCell>
                  <TableCell>{row.email || "-"}</TableCell>
                  <TableCell>{row.address || "-"}</TableCell>
                  <TableCell>{row.occupation || "-"}</TableCell>
                  <TableCell>{row.company || "-"}</TableCell>
                  <TableCell>{row.interest || "-"}</TableCell>
                  <TableCell>{row.budget || "-"}</TableCell>
                  <TableCell>{row.reasonForPurchase || "-"}</TableCell>
                  <TableCell>{row.referenceBy || "-"}</TableCell>
                  <TableCell>{row.nameOfCP || "-"}</TableCell>
                  <TableCell>{row.planningToBuy || "-"}</TableCell>
                  <TableCell>{row.followUpDetails || "-"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={25} sx={{ p: 0, border: "none" }}>
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
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      width: "auto",
                      "& .MuiTablePagination-toolbar": {
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? 2 : 0,
                        padding: isMobile ? "8px 0" : "16px 0",
                      },
                      "& .MuiTablePagination-spacer": {
                        display: isMobile ? "none" : "block",
                        flex: "none",
                      },
                      "& .MuiTablePagination-actions": {
                        marginLeft: isMobile ? 0 : "auto",
                      },
                      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                      {
                        fontSize: isMobile ? "12px" : "14px",
                      },
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={editModalOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
      >
        <DialogTitle>Edit Follow Up</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Enquiry No"
                fullWidth
                variant="outlined"
                value={editFormData.enquiryNo}
                onChange={(e) => handleEditChange("enquiryNo", e.target.value)}
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                value={editFormData.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Remark"
                fullWidth
                variant="outlined"
                value={editFormData.remark}
                onChange={(e) => handleEditChange("remark", e.target.value)}
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              >
                <InputLabel id="edit-visit-type-label">Visit Type</InputLabel>
                <Select
                  labelId="edit-visit-type-label"
                  id="edit-visit-type"
                  label="Visit Type"
                  value={editFormData.visitType}
                  onChange={(e) =>
                    handleEditChange("visitType", e.target.value)
                  }
                  sx={{
                    "& .MuiSelect-icon": {
                      color: Constants.primaryColor,
                    },
                  }}
                >
                  <MenuItem value="hot">Hot</MenuItem>
                  <MenuItem value="warm">Warm</MenuItem>
                  <MenuItem value="cold">Cold</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="booked">Booked</MenuItem>
                  <MenuItem value="undefined">Undefined</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                variant="outlined"
                size={isMobile ? "small" : "medium"}
                sx={{ border: Constants.formInputBorderColor }}
              >
                <InputLabel id="edit-status-label">Status</InputLabel>
                <Select
                  labelId="edit-status-label"
                  id="edit-status"
                  label="Status"
                  value={editFormData.status}
                  onChange={(e) => handleEditChange("status", e.target.value)}
                  sx={{
                    "& .MuiSelect-icon": {
                      color: Constants.primaryColor,
                    },
                  }}
                >
                  <MenuItem value="Follow up">Follow up</MenuItem>
                  <MenuItem value="Not interested">Not interested</MenuItem>
                  <MenuItem value="Callback request">Callback request</MenuItem>
                  <MenuItem value="Unreachable">Unreachable</MenuItem>
                  <MenuItem value="Booked property in other project">
                    Booked property in other project
                  </MenuItem>
                  <MenuItem value="Not answered">Not answered</MenuItem>
                  <MenuItem value="Re-visit">Re-visit</MenuItem>
                  <MenuItem value="Visit postponed">Visit postponed</MenuItem>
                  <MenuItem value="Visit cancelled">Visit cancelled</MenuItem>
                  <MenuItem value="Visit done">Visit done</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {showNextFollowUpEdit && (
              <Grid item xs={12} sm={6}>
                <TextField
                  type="datetime-local"
                  label="Next Follow Up"
                  fullWidth
                  variant="outlined"
                  value={editFormData.nextFollowUp}
                  onChange={(e) =>
                    handleEditChange("nextFollowUp", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
            )}

            {showVisitScheduledDateEdit && (
              <Grid item xs={12} sm={6}>
                <TextField
                  type="datetime-local"
                  label="Visit Scheduled Date"
                  fullWidth
                  variant="outlined"
                  value={editFormData.visitScheduledDate}
                  onChange={(e) =>
                    handleEditChange("visitScheduledDate", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            variant="contained"
            style={{
              backgroundColor: Constants.primaryColor,
              color: "#ecf0f1",
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the record for{" "}
            {itemToDelete?.item?.name} (Enquiry No:{" "}
            {itemToDelete?.item?.enquiryNo})?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FirstVisitsPendingfollowup;