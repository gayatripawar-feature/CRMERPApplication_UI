

import { toast, ToastContainer } from "react-toastify";
import React, { useState } from "react";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@mui/material";
import { FaEye } from "react-icons/fa";

const CostSheet = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const data = [
    { reraCarpetArea: "1000", config: "2 BHK" },
    { reraCarpetArea: "1200", config: "3 BHK" },
  ];

  return (
    <div className="cost-sheet">
      
      {showForm ? (
      

<div style={{ 
  border: "1px solid #ccc", 
  marginTop: "50px",
  padding: "30px", 
  borderRadius: "10px", 
  margin: "auto",  
  backgroundColor: "#f8f9fa",  
  width: "550px",  
  display: "flex",
  flexDirection: "column",
  alignItems: "center",  
}}>
  <h3 className="text-center p-3">Developer Information Form</h3>
  
  <TextField 
    type="number" 
    fullWidth 
    label="Carpet Area Rate for At the time Of Visit" 
    variant="outlined" 
    sx={{ mb: 2, width: "100%" }} 
  />
  <TextField 
    type="number" 
    fullWidth 
    label="Carpet Area Rate for At the time Of Booking" 
    variant="outlined" 
    sx={{ mb: 2, width: "100%" }} 
  />
  <TextField 
    type="number" 
    fullWidth 
    label="Stamp Duty" 
    variant="outlined" 
    sx={{ mb: 2, width: "100%" }} 
  />

  <div style={{ display: "flex", justifyContent: "space-between", width: "90%" }}>
  <Button className=""
    onClick={() => toast.success("Form details submitted successfully!", { position: "top-right", autoClose: 3000 })} 
    variant="contained" 
    color="primary"
  >
    Save
  </Button>
    <Button onClick={handleCloseForm} variant="contained" color="error">
      Cancel
    </Button>
 
 
  </div>
</div>


      ) : (
        <>
       
          {/* <div className="d-flex align-items-center mb-3">
            <Button
              onClick={handleToggle}
              variant="outlined"
              color="success"
              className="m-3"
              style={{
                borderRadius: "20px",
                minWidth: isExpanded ? "auto" : "50px",
                padding: isExpanded ? "6px 16px" : "6px",
                
              }}
              startIcon={<FaEye size={20} color="#28a745" />}
            >
              {isExpanded && <span className="text-success">Cost Sheet</span>}
            </Button>
          </div> */}


<div className="d-flex align-items-center mb-3">
  <Button
    onClick={handleToggle}
    variant="outlined"
    color="success"
    className="m-3"
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#3621a9',
      padding: '8px',
      borderRadius: '20px',  // Border radius applied here
      margin: '5px',
      cursor: 'pointer',     // Add pointer cursor for better UX
      transition: 'width 0.3s ease, background 0.3s ease',
      width: isExpanded ? '180px' : '50px',  // Toggle width based on expanded state
      minWidth: '50px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      justifyContent: 'flex-start', // Align items to the left
      textTransform: 'none',
      position: 'relative',
      background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)',  // Gradient background
      boxShadow:
        'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
    }}
  >
    {/* Hover effects */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'scale(0.1)',
        transition: 'transform 0.3s ease',
        zIndex: -1,
      }}
    ></div>

    {/* Button Icon and Text */}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <FaEye size={24} color="white" /> {/* Increased icon size and changed color to white */}
      {isExpanded && <span style={{ color: 'white', fontSize: '16px', marginLeft: '8px' }}>Cost Sheet</span>} {/* Increased font size and set text color to white */}
    </div>
  </Button>
</div>

    
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h3 style={{ margin: 0 }}>Cost Information</h3>

            <div>
              <Button variant="contained" sx={{ mr: 1, backgroundColor: "#6a0dad", color: "white", "&:hover": { backgroundColor: "#4b0082" } }}>
                Previous
              </Button>

              <Button variant="contained" sx={{ mr: 1, backgroundColor: "#6a0dad", color: "white", "&:hover": { backgroundColor: "#4b0082" } }}>
                Next
              </Button>

              <span style={{ marginLeft: "10px" }}>Rows per Page:</span>
              <select style={{ marginLeft: "5px", padding: "5px", borderRadius: "5px" }}>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </select>
            </div>
          </div>

          {/* Table Display */}
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
            <Table sx={{ tableLayout: "auto", width: "100%" }}>
              <TableHead>
                {/* <TableRow sx={{ bgcolor: "primary.main" }}> */}
                 <TableRow sx={{background:"#3621a9"}}>
                  {["RERA CARPET AREA (SQ FT)", "CONFIG (2 BHK, 3 BHK, 4 BHK)"].map((header, index) => (
                    <TableCell key={index} sx={{ color: "white", fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.reraCarpetArea}</TableCell>
                    <TableCell>{row.config}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

  



<h3 className="pt-5 pb-3">Developer Entries</h3>
<div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Button 
    onClick={handleShowForm} 
    variant="contained" 
   
    className="fw-bold"  style={{ background: '#272ba8' }}
  >
   +  Create Developer Info
  </Button>

  <div className="right-buttons" style={{ display: 'flex', alignItems: 'center' }}>
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    >
      Previous
    </Button>
    <Button 
      variant="contained" 
      color="secondary" 
      onClick={() => setCurrentPage(prev => prev + 1)}
    >
      Next
    </Button>
    
   
    <div style={{ marginLeft: '20px' }}>
        Rows Per Page:
      <select 
        value={rowsPerPage} 
        onChange={(e) => setRowsPerPage(e.target.value)} 
        style={{ padding: '8px' }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
      </select>
    </div>
  </div>
</div>





<TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
        
          <TableHead>
            {/* <TableRow sx={{ bgcolor: "primary.main" }}> */}
 <TableRow sx={{background:"#3621a9"}}>

              <TableCell  sx={{ color: "white", fontWeight: "bold" }}>TIMESTAMP</TableCell>
              <TableCell  sx={{ color: "white", fontWeight: "bold" }}>VISIT RATE</TableCell>
              <TableCell  sx={{ color: "white", fontWeight: "bold" }}>BOOKING RATE</TableCell>
              <TableCell  sx={{ color: "white", fontWeight: "bold" }}>STAMP DUTY</TableCell>
            </TableRow>
          </TableHead>

      
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.timestamp}</TableCell>
                <TableCell>{row.visitRate}</TableCell>
                <TableCell>{row.bookingRate}</TableCell>
                <TableCell>{row.stampDuty}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


        </>
      )}
    </div>
  );
};

export default CostSheet;



