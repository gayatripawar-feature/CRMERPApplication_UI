import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, TableFooter,Tooltip, Typography, TablePagination, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";
import { TextField, Grid } from "@mui/material";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { Visibility } from '@mui/icons-material';
import { FaFileDownload, FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useMediaQuery, useTheme } from '@mui/material';
import Constants from "../Constants";
const Admin_Banker = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showForm, setShowForm] = useState(false);
  const [bankers, setBankers] = useState([{ bankerName: '', bankerMobile: '' }]);
  const [error, setError] = useState('');
  const [bankerErrors, setBankerErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBanker, setSelectedBanker] = useState(null);
  const [files, setFiles] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [viewDocument, setViewDocument] = useState(null);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = (parentData, parentIndex) => {
    // Set form data for editing
    setFormData({
      name: parentData.name || "",
      address: parentData.address || "",
      apfLetter: parentData.apfLetter || "",
    });
    // Set bankers for editing
 setBankers(parentData.bankers || [{ bankerName: "", bankerMobile: "" }]);
    // Set files for editing
    setFiles(parentData.apfLetter || []);
    // Set editing state
    setEditIndex(parentIndex);
    setIsEditing(true);
    // Open the form
    setShowForm(true);
  };
const handleDeleteClick = (parentIndex, bankerIndex) => {
    const updatedData = [...submittedData];
     if (updatedData[parentIndex].bankers.length === 1) {
      updatedData.splice(parentIndex, 1);
    } else {
      updatedData[parentIndex].bankers.splice(bankerIndex, 1);
    }
    setSubmittedData(updatedData);
    toast.success("Banker details deleted successfully!");
  };
const handleClose = () => {
    setSelectedBanker(null);
    setShowForm(false);
    setIsEditing(false);
    setEditIndex(null);
    setFormData({
      name: "",
      address: "",
      mobile: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    });
    setBankers([{ bankerName: "", bankerMobile: "" }]);
    setFiles([]);
  };

  const handleAddNew = () => {
    setIsEditing(false);
    setEditIndex(null);
    setFormData({
      name: "",
      address: "",
      mobile: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    });
    setBankers([{ bankerName: "", bankerMobile: "" }]);
    setFiles([]);
    setShowForm(true);
  };
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
 const handleAddBanker = () => {
    // setBankers([...bankers, { bankerName: "", bankerMobile: "" }]);
    setBankers([...bankers, { bankerName: name, bankerMobile: mobile }]);

  };
const handleBankerChange = (index, field, value) => {
    const regex = /^[0-9]*$/;
    if (regex.test(value)) {
      if (value.length > 10) {
        setError('Invalid input: Please enter a valid 10-digit contact number.');
      } else {
        setError('');
        setBankers((prevBankers) => {
          const updatedBankers = [...prevBankers];
          updatedBankers[index][field] = value;
          return updatedBankers;
        });
      }
    } else {
      console.log("Invalid input: Only digits are allowed.");
    }
  };
  const handleViewDocument = (file) => {
    if (file && file.url) {
      setViewDocument(file);
      setDocumentDialogOpen(true);
    } else {
      toast.error("No document available to view");
    }
  };
  const handleRemoveBanker = (index) => {
    const updatedBankers = bankers.filter((_, i) => i !== index);
    setBankers(updatedBankers);
  };

  const handleCancel = () => {
    handleClose();
  };
  useEffect(() => {
    if (showForm && !isEditing) {
      setFormData({
        name: "",
        address: "",
        mobile: "",
        designation: "",
        joiningDate: "",
        status: "Active",
      });
    }
  }, [showForm, isEditing]);
// const handleSubmit = (e) => {
//     e.preventDefault();
//    const newBank = {
//       name: formData.name,
//       address: formData.address,
//       apfLetter: files.length > 0 ? files : [],
//       bankers: bankers,
//       timestamp: isEditing ? submittedData[editIndex].timestamp : new Date().toLocaleString()
//     };
//       if (isEditing && editIndex !== null && editIndex !== undefined) {
//       const updatedList = [...submittedData];
//       updatedList[editIndex] = newBank;
//       setSubmittedData(updatedList);
//       toast.success("Banker details updated successfully!");
//     } else {
//       setSubmittedData((prev) => [...prev, newBank]);
//       toast.success("Data submitted successfully!");
//     }
//    handleClose();
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: formData.name,
    address: formData.address,
    mobile: formData.mobile,
    designation: formData.designation,
    // joiningDate: formData.joiningDate,
    status: formData.status,
    apfLetter: files.length > 0 ? files : [],
    bankers: bankers,
    timestamp: isEditing
      ? submittedData[editIndex].timestamp
      : new Date().toLocaleString(),
  };

  try {
    if (isEditing && editIndex !== null) {
      // UPDATE existing banker
      const bankerId = submittedData[editIndex].id;
      const res = await fetch(`http://localhost:5000/bankers/${bankerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
          
      if (!res.ok) throw new Error("Update failed");
      toast.success("Banker details updated successfully!");
    } else {
      // ADD new banker
      const res = await fetch("http://localhost:5000/bankers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (!res.ok) throw new Error("Insert failed");
      toast.success("Data submitted successfully!");
    }

    // Refetch updated list after save
    const refreshed = await fetch("http://localhost:5000/bankers");
    const data = await refreshed.json();
    setSubmittedData(data);

    handleClose();
  } catch (err) {
    console.error("Error saving banker:", err);
    toast.error("Error saving banker");
  }
};

  const handleBankerName = (index, field, value) => {
    if (field === "bankerName") {
      const regex = /^[A-Za-z\s]*$/;
         if (!regex.test(value)) {
        setBankerErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = "Only characters and spaces are allowed.";
          return newErrors;
        });
        return;
      } else {
        setBankerErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          newErrors[index] = "";
          return newErrors;
        });
      }
    }
    setBankers((prevBankers) =>
      prevBankers.map((banker, i) =>
        i === index ? { ...banker, [field]: value } : banker
      )
    );
  };

  const handleDownloadPDFBanker = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Banker Details Report", 14, 15);
    const tableColumn = [
      "Timestamp", "Bank Name", "Address", "Banker Name", "Mobile No"
    ];
     const tableRows = submittedData.flatMap(data => 
      data.bankers.map(banker => [
        data.timestamp || "-",
        data.name || "-",
        data.address || "-",
        banker.bankerName || "-",
        banker.bankerMobile || "-"
      ])
    );
   autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
   doc.save("Banker_Details_Report.pdf");
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
     if (newFiles.length > 0) {
      const updatedFiles = newFiles.map(file => ({
        file: file,
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      
      setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
      toast.success("Files uploaded successfully!");
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return <FaFilePdf style={{ color: '#e74c3c', fontSize: '20px' }} />;
    if (fileType.includes('image')) return <FaFileImage style={{ color: '#3498db', fontSize: '20px' }} />;
    return <FaFileAlt style={{ color: '#95a5a6', fontSize: '20px' }} />;
  };
  
  const handleChangePage = (event, newPage) => setPage(newPage);
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = submittedData.filter(data =>
    data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    data.bankers.some(banker => 
      banker.bankerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      banker.bankerMobile.includes(searchQuery)
    )
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col-12 col-md-6 d-flex flex-column align-items-start mb-2 mb-md-0">
          <h2 className="mb-2 fs-6 pb-2">Admin Module / Banker Details Management</h2>
          {!showForm && (
            <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 w-100">
              <button
                className="btn d-flex align-items-center justify-content-center fw-bold"
                onClick={handleAddNew}
                style={{ background: Constants.primaryColor, color: "#fff", minWidth: isMobile ? '100%' : 'auto' }}
              >
                <FaPlus className="me-2" />
                {isMobile ? 'Add' : 'Add Banker Details'}
              </button>

              <Button
                onClick={handleDownloadPDFBanker}
                style={{
                  background: 'linear-gradient(45deg, rgba(126, 13, 27, 1), rgba(121, 13, 38, 1))',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minWidth: isMobile ? '100%' : 'auto',
                }}
              >
                <FaFileDownload size={18} />
                {isMobile ? 'PDF' : 'Download PDF'}
              </Button>
            </div>
          )}
        </div>
        {!showForm && (
          <div className="col-12 col-md-6 d-flex justify-content-start justify-content-md-end align-items-center mt-2 mt-md-0">
            <TextField
              size="small"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: isMobile ? '100%' : isTablet ? '70%' : '50%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  "& fieldset": {
                    borderColor: Constants.primaryColor,
                  },
                  "&:hover fieldset": {
                    borderColor: Constants.primaryColor,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Constants.primaryColor,
                  },
                }
              }}
            />
          </div>
        )}
      </div>

      {showForm && (
        <div
          className="modal"
          style={{
            display: showForm ? "block" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            overflowY: 'auto',
          }}
        >
          <div
            className="modal-dialog modal-lg"
            style={{
              position: "relative",
              margin: isMobile ? "10px auto" : "auto",
              top: isMobile ? "0" : "50%",
              transform: isMobile ? "none" : "translateY(-50%)",
              maxWidth: isMobile ? "95%" : "800px",
            }}
          >
            <div
              className="modal-content p-3"
              style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                borderRadius: "10px",
              }}
            >

              <div
                className="modal-header  text-white"
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                   backgroundColor: Constants.primaryColor,
                }}
              >
                <h5 className="modal-title">{isEditing ? 'Edit' : 'Add'} Banker Details</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>

              <Box className="modal-body">
                <Box className="container">
                  <Paper elevation={3} sx={{ p: 3, backgroundColor: "white", borderRadius: "8px" }}>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Bank Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              size={isMobile ? "small" : "medium"}
                              sx={{ border: Constants.formInputBorderColor }}
                            />
                          </Grid>

                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              label="Address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              size={isMobile ? "small" : "medium"}
                              sx={{ border: Constants.formInputBorderColor }}
                            />
                          </Grid>
                        </Grid>

                        {/* APF Letter Upload */}
                        <Grid item xs={12} mt={2}>
                          <Typography variant="body2" gutterBottom>
                            APF Letter
                          </Typography>

                          <Box
                            sx={{
                              border: Constants.formInputBorderColor,
                              borderRadius: '4px',
                              padding: '8px',
                              backgroundColor: 'white',
                            }}
                          >
                            <input
                              type="file"
                              multiple
                              onChange={handleFileChange}
                              style={{ width: '100%' }}
                            />

                            {files.length > 0 && (
                              <Box mt={1}>
                                <Typography variant="body2" color="text.secondary">
                                  Uploaded Files:
                                </Typography>
                                {files.map((file, index) => (
                                  <Box key={index} display="flex" alignItems="center" mt={0.5}>
                                    {getFileIcon(file.type)}
                                    <Typography variant="body2" ml={1} noWrap sx={{ maxWidth: '200px' }}>
                                      {file.name}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        </Grid>

                        {/* Banker List */}
                        {bankers.map((banker, index) => (
                          <React.Fragment key={index}>
                            <Grid container spacing={2} mt={2}>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Banker Name"
                                  value={banker.bankerName}
                                  onChange={(e) => handleBankerName(index, "bankerName", e.target.value)}
                                  required
                                  size={isMobile ? "small" : "medium"}
                                  sx={{ border: Constants.formInputBorderColor }}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  fullWidth
                                  label="Mobile No"
                                  value={banker.bankerMobile}
                                  onChange={(e) => handleBankerChange(index, "bankerMobile", e.target.value)}
                                  required
                                  size={isMobile ? "small" : "medium"}
                                  sx={{ border: Constants.formInputBorderColor }}
                                />
                              </Grid>
                            </Grid>

                            {index > 0 && (
                              <Grid item xs={12} mt={1} textAlign="right">
                                <Button className="bg-danger"
                                  variant="contained"
                                  color="error"
                                  onClick={() => handleRemoveBanker(index)}
                                  size={isMobile ? "small" : "medium"}
                                >
                                  Remove
                                </Button>
                              </Grid>
                            )}
                          </React.Fragment>
                        ))}

                        {/* Add Banker Button */}
                        <Grid item xs={12} mt={2} textAlign="center">
                          <Button
                            variant="outlined"
                            onClick={handleAddBanker}
                            size={isMobile ? "small" : "medium"}
                            style={{ backgroundColor: Constants.primaryColor, color: "white",}}
                          >
                            + Add Another Banker
                          </Button>
                        </Grid>

                        {/* Submit & Cancel Buttons */}
                        <Grid item xs={12} textAlign="center" mt={2}>
                          <Button className="m-3 text-white"
                            variant="contained"
                            color="success"
                            type="submit"
                            size={isMobile ? "small" : "medium"}
                            style={{ marginRight: '16px',background: Constants.primaryColor }}
                          >
                            {isEditing ? 'Update' : 'Submit'}
                          </Button>

                          <Button className="bg-dark text-white"
                            variant="outlined"
                            color="error"
                           
                            onClick={handleCancel}
                            size={isMobile ? "small" : "medium"}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </Box>
              </Box>

              <div
                className="modal-footer"
                style={{
                  borderTop: "1px solid #ddd",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2, overflowY: "auto",overflowX:"auto" }}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 80 : 100 }}>ACTION</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 120 }}>TIMESTAMP</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 120 }}>BANK NAME</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 150 }}>ADDRESS</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 100 : 120 }}>BANKER NAME</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 100 : 120 }}>MOBILE NO</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 80 : 100 }}>APF LETTER</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.flatMap((data, index) =>
                    data.bankers.map((banker, bIndex) => (
                      <TableRow key={`${index}-${bIndex}`}>
                        <TableCell>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                            <IconButton
                              color="primary"
                              style={{
                                backgroundColor: Constants.primaryColor,
                                borderRadius: "50%",
                                padding: isMobile ? "4px" : "6px",
                              }}
                              onClick={() => handleEditClick(data, index)}
                              size="small"
                            >
                              <EditIcon style={{ color: "white", fontSize: isMobile ? "16px" : "20px" }} />
                            </IconButton>

                            <IconButton
                              color="error"
                              style={{
                                backgroundColor: Constants.primaryColor,
                                borderRadius: "50%",
                                padding: isMobile ? "4px" : "6px",
                              }}
                              onClick={() => handleDeleteClick(index, bIndex)}
                              size="small"
                            >
                              <DeleteIcon style={{ color: "white", fontSize: isMobile ? "16px" : "20px" }} />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell>{data.timestamp || "-"}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.address}</TableCell>
                        <TableCell>{banker.bankerName}</TableCell>
                        <TableCell>{banker.bankerMobile}</TableCell>

                        <TableCell sx={{ textAlign: "center" }}>
                          {data.apfLetter && data.apfLetter.length > 0 ? (
                            <Tooltip title="View Document" arrow>
                              <IconButton
                                sx={{
                                  background: Constants.primaryColor,
                                  color: "white",
                                  borderRadius: "50%",
                                  width: isMobile ? 28 : 32,
                                  height: isMobile ? 28 : 32,
                                  p: 0.5,
                                  border: "none",
                                }}
                                onClick={() => handleViewDocument(data.apfLetter[0])}
                                size="small"
                              >
                                <Visibility sx={{ fontSize: isMobile ? 16 : 18 }} />
                              </IconButton>
                            </Tooltip>
                          ) : (
                            <Typography variant="body2" color="textSecondary">
                              No file
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                      No banker details found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
        
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            "& .MuiTablePagination-toolbar": {
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-end" : "center",
              gap: isMobile ? "10px" : "0",
            },
          }}
        />
      </TableRow>
    </TableFooter>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Document Viewer Dialog */}
      <Dialog
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">APF Letter Document</Typography>
            <IconButton onClick={() => setDocumentDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {viewDocument && (
            <Box sx={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {viewDocument.type?.includes('pdf') ? (
                <embed
                  src={viewDocument.url}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                />
              ) : viewDocument.type?.includes('image') ? (
                <img
                  src={viewDocument.url}
                  alt={viewDocument.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                />
              ) : (
                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                  <FaFileAlt style={{ fontSize: '48px', color: '#95a5a6', marginBottom: '16px' }} />
                  <Typography variant="body1" gutterBottom>
                    This file format cannot be previewed
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => window.open(viewDocument.url, '_blank')}
                    sx={{ mt: 2 }}
                  >
                    Download File
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin_Banker;