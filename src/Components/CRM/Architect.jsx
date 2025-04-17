





import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton,Typography,TextField, Modal, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FaEye } from "react-icons/fa";
import FoundationIcon from '@mui/icons-material/Foundation';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import jsPDF from "jspdf";

import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import VisibilityIcon from '@mui/icons-material/Visibility';
const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};


const Architect = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
   const [isExpanded, setIsExpanded] = useState(true);
const [isCollapsed, setIsCollapsed] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [slab, setSlab] = useState('');

  const rowsPerPage = 10;
  
  // State for Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => {
    loadLoansData();
  }, []);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
    setFilteredLoans(data);
  };

  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLoan(null);
  };

  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };


  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log("Form submitted!");
  // };
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
    
    
  //   console.log("Form submitted!");
  
  //   toast.success("Data Submitted Successfully!");
  //   handleCloseModal(false);
    
  // };
  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent the default form submission behavior
    console.log("Slab Value: ", slab);  // Log the 'slab' field value
    console.log("Letter Type Value: ", letterType);  // Log the 'letterType' field value
    console.log("Selected Files: ", selectedFiles);  
    // Create a new row with the form data
    const newRow = {
      timestamp: new Date().toLocaleString(),  // Add timestamp
      slab,  // Form field 'slab'
      letterType,  // Form field 'letterType'
      document: selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null, // If files exist, create URL for first file
    };
  
    // Update the state with the new row
    setCurrentRows((prevRows) => [...prevRows, newRow]);
  
    // Close the modal after submission
    setOpenModal(false);
    
    // Optionally log the form submission
    console.log("Form submitted!");
  
    // Display a success message (assuming you're using react-toastify or a similar library)
    toast.success("Data Submitted Successfully!");
  
    // Close the modal after submission
    handleCloseModal();  // It's fine to call it without arguments if it sets 'openModal' to false
  };
  
   
const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};


  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredLoans.length / rowsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleResetFilters = () => {
    setFilterType('');
    setFilterValue('');
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  // const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);
  const [currentRows, setCurrentRows] = useState([]);
 
  const [selectedSlab, setSelectedSlab] = useState('');
const [letterType, setLetterType] = useState('');
const [selectedFiles, setSelectedFiles] = useState([]);

  // Dummy Data
const rows = [
  {
    flatNo: "A-101",
    nameOfAllotee: "John Doe",
    timestamp: "2024-04-01",
    slab: "1st Slab",
    letterType: "Demand",
    document: "",
  },
  {
    flatNo: "A-102",
    nameOfAllotee: "Jane Doe",
    timestamp: "2024-04-02",
    slab: "2nd Slab",
    letterType: "Reminder",
    document: "",
  },
];

useEffect(() => {
  setCurrentRows(rows);
}, []);


  const getFilterOptions = (type) => {
    switch (type) {
      case 'Flat Type':
        return ['1BHK', '2BHK', '3BHK'];
      case 'Parking':
        return ['Basement', 'Parking 1','Parking 2'];
      case 'Floor':
        // return ['1', 'First', 'Second'];
        return Array.from({ length: 15 }, (_, i) => (i + 1).toString());
      case 'Rate':
        return Array.from({ length: 120 }, (_, i) => (50000 * (i + 1)).toLocaleString()); // Generates values from 50,000 to 6,000,000
      case 'Slab':
        return ['OCR', 'GST', 'Stamp Duty', 'Registration', 'Booking', 'Plinth Amount Received', '1st Slab Level', '2nd Slab Level', '3rd Slab Level', '5th Slab Level', '7th Slab Level', '10th Slab Level', 'Brick Level', 'External Plaster Level', 'Flooring Level', 'Staircase Level', 'Lift Level', 'Possession Level'];
      default:
        return [];
    }
  };

  const handleDownloadPDFArchitect = () => {
    console.log("Loans data before mapping:", loans);

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);

    // Updated column names
    const tableColumn = ["ACTION", "TIMESTAMP", "SLAB", "LETTER TYPE", "DOCUMENT"];

    const tableRows = loans.map(row => [
      row.action || "-",
      row.timestamp || "-",
      row.slab || "-",
      row.letterType || "-",
      row.document || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("EngineerArchitect_Report.pdf");
};

// const handleOpenEditModal = (loan) => {
//   setSelectedRow(loan);
//   setIsEditModalOpen(true);
// };
const handleOpenEditModal = (row) => {
  // Set the selected row when clicking the edit icon
  setSelectedRow(row);  // Set the current row's data to state
  setIsEditModalOpen(true);  // Open the modal
};

// const handleCloseEditModal = () => {
//   setIsEditModalOpen(false);
// };

const handleCloseEditModal = () => {
  setSelectedSlab('');
  setLetterType('');
  setSelectedFiles([]);
  setIsEditModalOpen(false);  // Close Modal
};

const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files);
  setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
};


// const handleUpdate = () => {


//   toast.success('Details Updated Successfully!', {
//     position: 'top-right',
//     autoClose: 2000,
//   });

//   handleCloseEditModal();  
// };
const handleUpdate = () => {
  // Prepare the updated row object with the new details from the selected row
  const updatedRow = {
    ...selectedRow,
    document: selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : selectedRow.document,  // Handle file change if any
  };
console.log("update");
  // Update the row in the current rows state
  setCurrentRows((prevRows) =>
    prevRows.map((row) =>
      row.timestamp === updatedRow.timestamp ? updatedRow : row  // Replace the row with updated data
    )
  );

  // Show a success toast after updating
  toast.success('Details Updated Successfully!', {
    position: 'top-right',
    autoClose: 2000,
  });

  // Close the edit modal after the update
  handleCloseEditModal();  
};


  return (
    <div className="main-content">
       {!openModal ? (
        <>
      <h6>Letter Module / Engineer & Architect Letters</h6>




         

<Button
  variant="contained"
  color="success"
  sx={{
    borderRadius: "20px",
    transition: "width 0.3s ease, background 0.3s ease",
    width: isExpanded ? "160px" : "50px",
    minWidth: "50px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    padding: "10px 15px",
    marginTop: "20px",
    marginBottom: "12px", // Updated margin-bottom
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "none",
    position: "relative",
    background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
    boxShadow:
      "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    "&:hover": {
      background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      transform: "scale(0.1)",
      transition: "transform 0.3s ease",
      zIndex: -1,
    },
    "&:hover::after": {
      transform: "scale(1)",
    },
  }}
  onClick={handleToggle}
  startIcon={<FoundationIcon />}
>
  {isExpanded && "Display Letters"}
</Button>


      {/* {isCollapsed && (
        <> */}
        <div className='d-flex gap-3'>
      <div className="d-flex align-items-center justify-content-between my-3 pt-4 pb-3">
        <Button variant="contained" className="text-nowrap m-1" style={{ minWidth: "180px", background:"#272ba8"}} color="primary" onClick={() => handleOpenModal(null)}>
          Add Letter
        </Button>
        <Button
    variant="contained"
    sx={{
      background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFArchitect}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        </div>

       
        
        <div className="d-flex align-items-center gap-2">
  {/* Filter By */}
  <FormControl style={{ minWidth: "180px" }}>
    <InputLabel>Filter By</InputLabel>
    <Select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
      <MenuItem value="Flat Type">Flat Type</MenuItem>
      <MenuItem value="Parking">Parking</MenuItem>
      <MenuItem value="Floor">Floor</MenuItem>
      <MenuItem value="Rate">Rate</MenuItem>
      <MenuItem value="Slab">Slab</MenuItem>
      <MenuItem value="Date">Date</MenuItem>
      <MenuItem value="Week">Week</MenuItem>
    </Select>
  </FormControl>

  {/* Filter Value (Dropdown or Date Picker) */}
  {filterType === "Date" ? (
    <TextField
      type="date"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      style={{ minWidth: "180px" }}
    />
  ) : filterType === "Week" ? (
    <TextField
      type="week"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
      style={{ minWidth: "180px" }}
    />
  ) : (
    <FormControl style={{ minWidth: "180px" }}>
      <InputLabel>Value</InputLabel>
      <Select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        disabled={!filterType}
      >
        {getFilterOptions(filterType).map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )}

  {/* Reset Button */}
  <Button
    className="text-white"
    style={{ backgroundColor: "#800080", padding: "10px 15px", borderRadius: "5px" }}
    variant="outlined"
    color="secondary"
    onClick={handleResetFilters}
  >
    Reset
  </Button>

  {/* Rows per page */}
  <div className="d-flex align-items-center gap-1">
    <label className="fw-bold">Rows per page:</label>
    <input
      type="number"
      className="form-control"
      value={rowsPerPage}
      onChange={(e) => setRowsPerPage(e.target.value)}
      style={{ width: "80px", padding: "6px" }}
    />
  </div>
</div>

      
      </div>

      <TableContainer component={Paper} className="mt-4" sx={{ mt: 2, boxShadow: 3, borderRadius: 2 ,maxHeight: 400, overflowY: 'auto'}}>
        <Table>
          <TableHead>
            
                     <TableRow sx={{background:"#3621a9"}}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>TIMESTAMP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SLAB</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>LETTER TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DOCUMENT</TableCell>
            </TableRow>
          </TableHead>
         
            <TableBody>
          {currentRows.map((loan, index) => (
            <TableRow key={index}>
          

<TableCell>
  <IconButton
    onClick={() => handleOpenEditModal(loan)}
    sx={{
      backgroundColor: "#3621a9",  
      color: "white",              
      fontSize: "10px",            
      padding: "3px",              
      '&:hover': {
        backgroundColor: "#2c1880",  
      }
    }}
  >
    <EditIcon />
  </IconButton>
</TableCell>


              <TableCell>{loan.timestamp}</TableCell>
              <TableCell>{loan.slab}</TableCell>
              <TableCell>{loan.letterType}</TableCell>
              {/* <TableCell>{loan.document}</TableCell> */}
              <TableCell>
  <a
    href={loan.document ? loan.document : "https://example.com/no-document"}  // Replace with your default link
    target="_blank"
    rel="noopener noreferrer"
  >
    <VisibilityIcon
      sx={{
        color: "#3621a9",  // Always Blue Icon
        cursor: "pointer",
      }}
    />
  </a>
</TableCell>

            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>



      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
  <Box 
    sx={{ 
      width: 400, 
      bgcolor: 'background.paper', 
      p: 4, 
      m: 'auto', 
      mt: 10, 
      borderRadius: 2 
    }}
  >
    <div 
      className="modal-body" 
      style={{ 
        marginTop: '16px', 
        padding: '10px', 
        backgroundColor: 'white', 
        borderRadius: '8px' 
      }}
    >
      <h5 className='pb-4'>Edit Details </h5>

      <h6 style={{ marginBottom: '8px', fontWeight: 600 }}>Select Slab</h6>

      <TextField
        select
        label="Select Slab"
        fullWidth
        variant="outlined"
        value={selectedRow?.slab || ""}  // Pre-fill the value
        onChange={(e) => setSelectedRow({ ...selectedRow, slab: e.target.value })} 
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '6px' }}
      >
        {[
          'OCR', 'GST', 'Stamp Duty', 'Registration', 'Booking', 'Plinth Amount Received',
          '1st Slab Level', '2nd Slab Level', '3rd Slab Level', '5th Slab Level',
          '7th Slab Level', '10th Slab Level', 'Brick Level', 'External Plaster Level',
          'Flooring Level', 'Staircase Level', 'Lift Level', 'Possession Level'
        ].map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>

      <h6 style={{ marginBottom: '8px', fontWeight: 600 }}>Letter Type</h6>

      <TextField
        select
        label="Letter Type"
        fullWidth
        variant="outlined"
        value={selectedRow?.letterType || ""}  // Pre-fill the value
        onChange={(e) => setSelectedRow({ ...selectedRow, letterType: e.target.value })}
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '6px' }}
      >
        {['Engineer', 'Architect'].map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>
  
      <h6 style={{ marginBottom: '8px', fontWeight: 600 ,}}>Upload Document</h6>
      
      <Button
            variant="contained"
            color="light"
            component="label"
            sx={{ mb: 2 }}
            >
        Choose Files
        <input
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Button>
      
      {/* Show Selected File Names */}
      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {selectedFiles.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
      <div className='d-flex justify-content-between gap-2'>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={handleUpdate}
      >
        Update
      </Button>
      <Button 
        variant="contained" 
        color="inherit" 
        fullWidth 
        onClick={handleCloseEditModal}
      >
      cancel
      </Button>
      </div>
     
    </div>
  </Box>
</Modal>



      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button 
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ borderRadius: '5px', padding: '13px 20px' ,backgroundColor:"#800080"}}
        >
          Previous
        </button>


        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(filteredLoans.length / rowsPerPage)}
          style={{ borderRadius: '5px', padding: '13px 20px',backgroundColor:"#800080" }}
        >
          Next
        </button>
      </div>



</>
) : (


    
    


<Modal
  open={openModal}
  onClose={handleCloseModal}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <Box
    sx={{
      width: 500,
      margin: 'auto',
      padding: 3,
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
      border: '1px solid #ddd',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {/* Modal Header */}
    <div
      className="modal-header"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '12px',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f9f9f9',
        padding: '10px',
        borderRadius: '10px 10px 0 0'
      }}
    >
      
    

<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1976d2', 
    padding: '10px',
    width: '100%', 
  }}
>
  <h5
    id="modal-title"
    style={{
      margin: 0,
      fontWeight: 600,
      color: 'white',
    }}
  >
    Add Letter
  </h5>

  <Button
    onClick={handleCloseModal}
    style={{
      padding: '6px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white', 
    }}
  >
    X
  </Button>
</div>
</div>

    
    <div className="modal-body" style={{ marginTop: '16px', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      
   
      <h6 style={{ marginBottom: '8px', fontWeight: 600 }}>Select Slab</h6>
      <TextField
        select
        label="Select Slab"
        fullWidth
        variant="outlined"
        value={slab} 
        onChange={(e) => setSlab(e.target.value)}
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '6px' }}
      >
        {[
          'OCR', 'GST', 'Stamp Duty', 'Registration', 'Booking', 'Plinth Amount Received',
          '1st Slab Level', '2nd Slab Level', '3rd Slab Level', '5th Slab Level',
          '7th Slab Level', '10th Slab Level', 'Brick Level', 'External Plaster Level',
          'Flooring Level', 'Staircase Level', 'Lift Level', 'Possession Level'
        ].map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>

      
      <h6 style={{ marginBottom: '8px', fontWeight: 600 }}>Letter Type</h6>
      <TextField
        select
        label="Letter Type"
        fullWidth
        variant="outlined"
        value={letterType}  // Bind to the 'letterType' state
        onChange={(e) => setLetterType(e.target.value)}
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '6px' }}
      >
        {['Engineer', 'Architect'].map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </TextField>

      {/* Section: Upload Document */}
      {/* <h6 style={{ marginBottom: '8px', fontWeight: 600 }}>Upload Document</h6>
      <TextField
        type="file"
        fullWidth
        variant="outlined"
        onChange={handleFileChange}
        sx={{ mb: 3, backgroundColor: 'white', borderRadius: '6px' }}
      /> */}
      <h6 style={{ marginBottom: '8px', fontWeight: 600 ,}}>Upload Document</h6>
      
      <Button
            variant="contained"
            color="light"
            component="label"
            sx={{ mb: 2 }}
            >
        Choose Files
        <input
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Button>
      
      {/* Show Selected File Names */}
      {selectedFiles.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {selectedFiles.map((file, index) => (
            <Typography key={index} variant="body2">
              {file.name}
            </Typography>
          ))}
        </Box>
      )}
    </div>

    {/* Modal Footer */}
    <div className="modal-footer" style={{ textAlign: 'right', borderTop: '1px solid #ddd', paddingTop: '10px', backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '0 0 10px 10px' }}>
      <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ mr: 1 }}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  </Box>
</Modal>

      )
    }

    </div>
      
  );
};

export default Architect;
