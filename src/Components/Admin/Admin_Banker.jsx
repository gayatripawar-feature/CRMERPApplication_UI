




import React, { useState ,useEffect} from "react";
import { FaPlus } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton ,Box,Tooltip,Typography} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

import {

  TextField,

 
  Grid,
  Input,
} from "@mui/material";
import { Button, Modal } from "react-bootstrap";
import {  toast } from "react-toastify";
import { Visibility } from '@mui/icons-material'; 
import { FaFileDownload } from 'react-icons/fa';
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";
const Admin_Banker = () => {
  const [showForm, setShowForm] = useState(false);
  // const [bankers, setBankers] = useState([]);
  const [bankers, setBankers] = useState([{ bankerName: '', bankerMobile: '' }]);
  const [error, setError] = useState('');
  const [bankerErrors, setBankerErrors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });


  const [editClicked, setEditClicked] = useState(false);
  const [selectedBanker, setSelectedBanker] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  useEffect(() => {
    console.log("Modal state changed:", editClicked); 
  }, [editClicked]);



  const handleEditClick = (banker) => {
    console.log("edit clicked");
    setSelectedBanker(banker); 
    setEditClicked(true);
    console.log("Modal state changed:", true);
  };
  
  const handleClose = () => {
    console.log("Modal closed");
    setEditClicked(false);
    setSelectedBanker(null); 
    setShowForm(false); 
  };
  
  const label = "APF Letter"; 

  const handleAddNew = () => setShowForm(true);
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddBanker = () => {
    setBankers([...bankers, { bankerName: "", bankerMobile: "" }]);
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
  
  
  const handleViewClick = (url) => {
    window.open(url, "_blank");
  };


  
  const handleRemoveBanker = (index) => {
    const updatedBankers = bankers.filter((_, i) => i !== index);
    setBankers(updatedBankers);
  };


  const openModal = () => {
    
  };

  const closeModal = () => {
    console.log("Modal closed");
    setSelectedBanker(null);  
  };
  const handleCancel = () => {
    console.log("Modal canceled");
    setSelectedBanker(null);  
    setShowForm(false); 
  };
  

  useEffect(() => {
    if (showForm) {
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        joiningDate: "",
        status: "Active", // Optional, set default if necessary
      });
    }
  }, [showForm]); 


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    toast.success("Data submitted successfully!");
  };
  
  const handleBankerName = (index, field, value) => {
    if (field === "bankerName") {
      const regex = /^[A-Za-z\s]*$/; // Allows only letters and spaces
  
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
          newErrors[index] = ""; // Clear error if valid
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
  
    const tableRows = bankers.map(row => [
      row.timestamp || "-",
      row.bankName || "-",
      row.address || "-",
      row.bankerName || "-",
      row.mobileNo || "-"
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
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
    const newFilesArray = Array.from(e.target.files).map((file) => file.name);
  
    setFileNames((prevFiles) => {
      const mergedFiles = [...prevFiles.split(', '), ...newFilesArray];
      const uniqueFiles = Array.from(new Set(mergedFiles));  
      return uniqueFiles.join(', ');
    });
  };
  
  
  

  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col-md-6 d-flex flex-column align-items-start">
          <h2 className="mb-2 fs-6 pb-2">Admin Module / Banker Details Management</h2>
          {!showForm && (

<div className="d-flex gap-3">
 
  <button
    className="btn btn-primary d-flex align-items-center fw-bold"
    onClick={handleAddNew}
    style={{ background: '#272ba8' }}
  >
    <FaPlus className="me-2" />
    Add Banker Details
  </button>


  <Button
    onClick={handleDownloadPDFBanker}
    style={{
      background: 'linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}
    onMouseOver={(e) => {
      e.target.style.background = 'linear-gradient(45deg, #ff8e53, #ff6b6b)';
    }}
    onMouseOut={(e) => {
      e.target.style.background = 'linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))';
    }}
  >
    <FaFileDownload size={18} />
    Download PDF
  </Button>
</div>


          )}
        </div>
        {!showForm && (
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <input type="text" className="form-control w-50" placeholder="Search..." />
          </div>
        )}
      </div>


{showForm ? (
  <>
    <Button variant="primary" onClick={openModal}>Add Banker Details</Button>
 
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
      }}
    >
      <div
        className="modal-dialog modal-lg"
        style={{
          position: "relative",
          margin: "auto",
          top: "50%",
          transform: "translateY(-50%)",
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
            className="modal-header bg-primary text-white"
            style={{
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <h5 className="modal-title">Add Banker Details</h5>
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
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
      border: '1px solid #c4c4c4',
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

    {fileNames && (
      <Typography variant="body2" mt={1} color="text.secondary" noWrap>
        {fileNames}
      </Typography>
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
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Mobile No"
                    value={banker.bankerMobile}
                    onChange={(e) => handleBankerChange(index, "bankerMobile", e.target.value)}
                    required
                  />
                </Grid>
              </Grid>

              {index > 0 && (
                <Grid item xs={12} mt={1} textAlign="right">
                  <Button className="bg-danger"
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveBanker(index)}
                  >
                    Remove
                  </Button>
                </Grid>
              )}
            </React.Fragment>
          ))}

          {/* Add Banker Button */}
          <Grid item xs={12} mt={2} textAlign="center">
            <Button className="bg-info"
              variant="outlined"
              onClick={handleAddBanker}
              sx={{ backgroundColor: "#e0f7fa", color: "#00796b", border: "1px solid #00796b" }}
            >
              + Add Another Banker
            </Button>
          </Grid>

          {/* Submit & Cancel Buttons */}
          <Grid item xs={12} textAlign="center" mt={2}>
            <Button className="bg-primary m-3 text-white"
              variant="contained"
              color="success"
              type="submit"
              sx={{ mr: 2 }}
            >
              Submit
            </Button>

            <Button className="bg-dark text-white"
              variant="outlined"
              color="error"
              onClick={handleCancel}
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
  </>
) : null}


   


{!showForm && (
  <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
    <Table>
      <TableHead>
        <TableRow sx={{ background: "#3621a9" }}>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>TIMESTAMP</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>BANK NAME</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>ADDRESS</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>BANKER NAME</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>MOBILE NO</TableCell>
          <TableCell sx={{ color: "white", fontWeight: "bold" }}>APF LETTER</TableCell>
        </TableRow>
      </TableHead>
      

<TableBody>
  {bankers.map((banker, index) => (
    <TableRow key={index} style={{ position: "relative" }}>
      <TableCell>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton
            color="primary"
            style={{
              backgroundColor: "#1976d2",
              borderRadius: "50%",
              padding: "6px",
            }}
            onClick={() => handleEditClick(banker)}
          >
            <EditIcon style={{ color: "white" }} />
          </IconButton>

          <IconButton
            color="error"
            style={{
              backgroundColor: "#d32f2f",
              borderRadius: "50%",
              padding: "6px",
            }}
          >
            <DeleteIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </TableCell>

    
      {selectedBanker === banker && (
  <div
    style={{
      position: "fixed",  
      top: "40%",  
      left: "50%",
      transform: "translate(-50%, -50%)",  // Center the modal
      backgroundColor: "white",  // Background color for the modal
      padding: "20px",  // Padding inside the modal
      borderRadius: "8px",  // Optional: rounded corners
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",  // Optional: shadow to make it pop
      zIndex: 9999,  // Ensure it's above all other content
      width: "800px",  // Set a fixed width for the modal
    }}
  >
    {/* Modal Header */}
    <div
      className="modal-header bg-primary text-white"
      style={{
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        padding: "15px 20px",  // Adding padding for better spacing
        height: "80px",
        display: "flex",  // Use flex to align items
        justifyContent: "space-between",  // Space out the title and close button
        alignItems: "center",
      }}
    >
      <h5 className="modal-title ">Add Banker Details</h5>
      <button type="button" className="btn-close" onClick={closeModal}></button>
      

    </div>

    
    <div className="modal-body">
      <div className="container">
        <div
          className="p-3"
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <form className="pt-4">
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">APF Letter</label>
                <input
                  type="file"
                  className="form-control"
                  name="apfLetter"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Loop through the bankers */}
            {bankers.map((banker, index) => (
              <div className="row mb-3" key={index}>
                <div className="col-md-4">
                  <label className="form-label">Banker Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={banker.bankerName}
                    onChange={(e) => handleBankerName(index, "bankerName", e.target.value)}
                    required
                  />
                  {bankerErrors[index] && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {bankerErrors[index]}
                    </p>
                  )}
                </div>
                <div className="col-md-4">
                  <label className="form-label">Mobile No:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={banker.bankerMobile}
                    onChange={(e) => handleBankerChange(index, "bankerMobile", e.target.value)}
                    required
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                {index > 0 && (
                  <div className="col-md-4 pt-4">
                    <button
                      type="button"
                      className="btn btn-danger mt-2"
                      onClick={() => handleRemoveBanker(index)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Add Another Banker Button */}
            <div className="mb-3 text-center pt-3 pb-3">
              <button type="button" className="btn btn-primary" onClick={handleAddBanker}>
                + Add Another Banker
              </button>
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
 <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title="View Document" arrow>
                  <IconButton
                    sx={{
                      background: "#1976D2",
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      p: 0.5,
                      border: "none",
                    }}
                    onClick={() => handleViewClick(bankers.website)}
                  >
                    <Visibility sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>


    </TableRow>
  ))}
</TableBody>


    </Table>
  </TableContainer>
)}







    </div>
  );
};

export default Admin_Banker;
