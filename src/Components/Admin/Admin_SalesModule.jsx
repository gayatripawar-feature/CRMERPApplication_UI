import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box, TablePagination, TableFooter, } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, NativeSelect } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import jsPDF from "jspdf";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Constants from "../Constants";
import { useMediaQuery, useTheme } from '@mui/material';
import axios from "axios";
const Admin_SalesModule = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [showForm, setShowForm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editRowData, setEditRowData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });
    const [salesPersons, setSalesPersons] = useState([]);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState({
    mobile: '',
  });
  // Filter sales persons based on search query
  const filteredSalesPersons = salesPersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.mobile.includes(searchQuery) ||
    person.designation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // UseEffect to get the records of sales_person from DB : 
  useEffect(() => {
  const fetchSalesPersons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-sales-person");
      setSalesPersons(response.data); 
    } catch (err) {
      console.error("Error fetching sales persons:", err);
      toast.error("Failed to fetch sales persons");
    }
  };

  fetchSalesPersons();
}, []);

  const handleAddNew = () => {
    setShowForm(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Handling change for ${name}: ${value}`);
    if (name === "name") {
      const regex = /^[A-Za-z\s]*$/;
      if (regex.test(value) || value === "") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setNameError('');
      } else {
        setNameError("Invalid input: Only letters and spaces are allowed in Name.");
      }
    }
    else if (name === "mobile") {
      const regex = /^[0-9]*$/;
      let errorMessage = '';
      if (!regex.test(value) && value.length > 0) {
        errorMessage = "Invalid input: Only digits are allowed in Mobile.";
      } else if (value.length > 10) {
        errorMessage = "Invalid input: Please enter a valid 10-digit mobile number.";
      } else if (value.length < 10 && value.length > 0) {
        errorMessage = "Mobile number must be 10 digits.";
      }
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
      console.log("Updating:", name, "to:", value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (!emailRegex.test(value) && value.length > 0) {
        setEmailError("Invalid email format: Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEmailBlur = () => {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      console.log("invalid email");
      setEmailError("Invalid email: Please enter a valid email address.");
    } else {
      setEmailError('');
    }
  };

  useEffect(() => {
    if (showForm) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        joiningDate: "",
        status: "Active",
      });
    }
  }, [showForm]);

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editIndex !== null) {
      // Call API for update 
     const id = salesPersons[editIndex].id; // check for each record has an id
      await axios.put(`http://localhost:5000/update-sales-person/${id}`, formData);
       // Update frontend state
      const updatedData = [...salesPersons];
      updatedData[editIndex] = { ...formData, id };
      setSalesPersons(updatedData);
      setEditIndex(null);
      toast.success("Sales Person updated successfully!");
    } else {
      // Add new record to backend
      const response = await axios.post("http://localhost:5000/sales-person", formData);
      toast.success("Sales Person saved!",);
      console.log("Saved:", response.data);
       // Update frontend table with response
      setSalesPersons([...salesPersons, { ...formData, id: response.data.id }]);
    }
    // Reset form after save
    setFormData({
      name: "",
      email: "",
      mobile: "",
      designation: "",
      joiningDate: "",
      status: "Active",
    });

    setShowForm(false);
    setOpenEditModal(false);
  } catch (error) {
    console.error("Error saving sales person:", error);
    toast.error("Failed to save data");
  }
};

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleDownloadPDFSales = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Sales Person Report", 14, 15);
    const tableColumn = [
      "Name", "Email", "Mobile", "Designation", "Joining Date", "Status"
    ];
    const tableRows = salesPersons.map(row => [
      row.name || "-",
      row.email || "-",
      row.mobile || "-",
      row.designation || "-",
      // row.joiningDate || "-",
      row.joiningDate ? dayjs(row.joiningDate).format('YYYY-MM-DD') : "-",
      row.status || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("SalesPerson_Report.pdf");
  };

  const handleEdit = (person) => {
  const index = salesPersons.findIndex(p => p.id === person.id);
  setEditIndex(index);
  setFormData({
    ...person,
    joiningDate: person.joiningDate ? dayjs(person.joiningDate).format('YYYY-MM-DD') : ''
  });
  setOpenEditModal(true);
};

  const handleSaveEdit = () => {
    const updatedData = [...salesPersons];
    updatedData[editIndex] = formData;
    setSalesPersons(updatedData);
    setOpenEditModal(false);
    toast.success(" updated successfully");
    setOpenEditModal(false);
  };

  
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = filteredSalesPersons.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const deleteRow = async (id) => {
  try {
    //  backend API to delete the record
    await axios.delete(`http://localhost:5000/delete-sales-person/${id}`);
    // Remove from frontend state
    const updatedData = salesPersons.filter((person) => person.id !== id);
    setSalesPersons(updatedData);
   toast.success("Sales Person deleted successfully!", {
      position: "top-center",
      autoClose: 1500,
    });
  } catch (error) {
    console.error("Error deleting sales person:", error);
    toast.error("Failed to delete Sales Person", {
      position: "top-center",
    });
  }
};

const handleDelete = (id) => {
  toast.info(
    <div>
      <p>Are you sure you want to delete?</p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <button
          onClick={() => {
            deleteRow(id); // id instead of index
            toast.dismiss();
          }}
          style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          style={{ background: "grey", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
        >
          No
        </button>
      </div>
    </div>,
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    }
  );
};

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col-12 col-md-6 d-flex flex-column align-items-start mb-2 mb-md-0">
          <h2 className="mb-3 fs-6">Admin Module / Sales Person Management</h2>
          {!showForm && (
            <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 w-100">
              <button
                className="btn d-flex align-items-center justify-content-center"
                onClick={handleAddNew}
                style={{ background: '#800020', color: "#fff", minWidth: isMobile ? '100%' : 'auto' }}
              >
                <FaPlus className="me-2" />
                {isMobile ? 'Add' : 'Add Sales Person'}
              </button>

              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg,rgba(107, 14, 23, 1),rgba(118, 7, 16, 1))",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  minWidth: isMobile ? '100%' : 'auto',
                }}
                onClick={handleDownloadPDFSales}
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
                    borderColor: Constants.primaryColor, // default border color
                  },
                  "&:hover fieldset": {
                    borderColor: Constants.primaryColor, // hover color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: Constants.primaryColor, // focused color
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
                className="modal-header text-white"
                style={{
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                  backgroundColor: "#800020",
                }}
              >
                <h5 className="modal-title">Add New Sales Person</h5>
                <button type="button" className="btn-close" onClick={handleCancel} ></button>
              </div>

              <div className="modal-body">
                <div className="container">
                  <div
                    className="p-3"
                    style={{
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "white",
                    }}
                  >
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Name"
                            fullWidth
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            size={isMobile ? "small" : "medium"}
                            sx={{ marginTop: '10px', border: Constants.formInputBorderColor }}
                          />
                          {nameError && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{nameError}</p>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Email"
                            fullWidth
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleEmailBlur}
                            required
                            size={isMobile ? "small" : "medium"}
                            sx={{ marginTop: '10px', border: Constants.formInputBorderColor }}
                          />
                          {emailError && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{emailError}</p>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Mobile"
                            fullWidth
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            size={isMobile ? "small" : "medium"}
                            sx={{ marginTop: '10px', border: Constants.formInputBorderColor }}
                          />
                          {error.mobile && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0' }}>{error.mobile}</p>}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Designation"
                            fullWidth
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                            required
                            size={isMobile ? "small" : "medium"}
                            sx={{ marginTop: '10px', border: Constants.formInputBorderColor }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Joining Date"
                            fullWidth
                            type="date"
                            name="joiningDate"
                            value={formData.joiningDate}
                            required
                            onChange={handleChange}
                            size={isMobile ? "small" : "medium"}
                            sx={{ marginTop: '10px', border: Constants.formInputBorderColor }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth sx={{ marginTop: '10px', border: Constants.formInputBorderColor }} size={isMobile ? "small" : "medium"}   >
                            <InputLabel>Status</InputLabel>
                            <Select
                              label="Status"
                              name="status"
                              value={formData.status}
                              onChange={handleChange}

                              required
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>

                      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center mt-4">
                        <Button
                          type="submit"
                          variant="contained"
                          color="success"
                          onClick={handleSubmit}
                          sx={{ background: Constants.primaryColor }}
                          fullWidth={isMobile}
                        >
                          Submit
                        </Button>
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                          onClick={handleCancel}
                          fullWidth={isMobile}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showForm && (
        <Paper sx={{ mt: 2, boxShadow: 3, borderRadius: 2, overflow: 'auto' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="sticky table" size={isMobile ? "small" : "medium"}>
              <TableHead >
                <TableRow sx={{ background: Constants.primaryColor }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 80 : 100 }}>ACTION</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 100 : 120 }}>NAME</TableCell>

                  <>
                    <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 150 }}>EMAIL</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 110 }}>MOBILE</TableCell>
                  </>

                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 100 : 130 }}>DESIGNATION</TableCell>

                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: 120 }}>JOINING DATE</TableCell>

                  <TableCell sx={{ color: "white", fontWeight: "bold", minWidth: isMobile ? 80 : 100 }}>STATUS</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((person, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
                          <IconButton
                            color="primary"
                            style={{
                              backgroundColor: Constants.primaryColor,
                              borderRadius: "50%",
                              padding: isMobile ? "4px" : "6px",
                            }}
                            onClick={() => handleEdit(person, index)}
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
                            // onClick={() => handleDelete(index)}
                            onClick={() => handleDelete(person.id)}
                            size="small"
                          >
                            <DeleteIcon style={{ color: "white", fontSize: isMobile ? "16px" : "20px" }} />
                          </IconButton>
                        </div>
                      </TableCell>

                      <TableCell>{person.name}</TableCell>


                      <>  
                        <TableCell>{person.email}</TableCell>
                        <TableCell>{person.mobile}</TableCell>
                      </>


                      <TableCell>{person.designation}</TableCell>


                      {/* <TableCell>{person.joiningDate}</TableCell> */}
                      <TableCell>
  {person.joiningDate ? dayjs(person.joiningDate).format('YYYY-MM-DD') : '-'}
</TableCell>



                      <TableCell>
                        <Box
                          component="span"
                          sx={{
                            padding: '4px 8px',
                            borderRadius: '8px',
                            backgroundColor: person.status === 'Active' ? '#d4edda' : '#f8d7da',
                            color: person.status === 'Active' ? '#155724' : '#721c24',
                            fontSize: isMobile ? '12px' : '14px'
                          }}
                        >
                          {person.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={isMobile ? 5 : 7} align="center" sx={{ py: 3 }}>
                      No sales persons found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
<TableFooter>
   <TableRow>
     
 <TablePagination
            rowsPerPageOptions={[5, 8, 15, 25]}
          
            count={filteredSalesPersons.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            showFirstButton
            showLastButton
            sx={{
              '& .MuiTablePagination-toolbar': {
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'flex-end' : 'center',
                justifyContent: "flex-end", 
                gap: isMobile ? '10px' : '0',
              }
            }}
          />
          
</TableRow>
          </TableFooter>
            </Table>

          </TableContainer>

         
        </Paper>
      )}

      <Dialog
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={isMobile}
      >
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Name"
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}

                />
                {nameError && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{nameError}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  required
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}

                />
                {emailError && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{emailError}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Mobile"
                  fullWidth
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}

                />
                {error.mobile && <p style={{ color: 'red', margin: 0, fontSize: '12px' }}>{error.mobile}</p>}
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Designation"
                  fullWidth
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  size={isMobile ? "small" : "medium"}
                  sx={{ border: Constants.formInputBorderColor }}

                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Joining Date"
                    value={dayjs(formData.joiningDate)}
                    onChange={(newValue) => {
                      setFormData({ ...formData, joiningDate: dayjs(newValue).format('YYYY-MM-DD') });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        size={isMobile ? "small" : "medium"}
                        error={false}
                      />
                    )}
                    sx={{ border: Constants.formInputBorderColor }}

                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size={isMobile ? "small" : "medium"} sx={{ border: Constants.formInputBorderColor }}
                >
                  <InputLabel>Status</InputLabel>
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <DialogActions sx={{ marginTop: '20px', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 1 : 0 }}>
              <Button
                onClick={() => setOpenEditModal(false)}
                type="button"
                variant="outlined"
                color="secondary"
                fullWidth={isMobile}
            
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth={isMobile}
                sx={{ background: Constants.primaryColor }}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <ToastContainer
        position={isMobile ? "top-center" : "top-right"}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Admin_SalesModule;