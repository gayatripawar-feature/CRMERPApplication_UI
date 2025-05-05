

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, TextField,Typography, IconButton,Select, InputAdornment,Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaEye} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import AccountCircle from '@mui/icons-material/AccountCircle'; 
import { Link } from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { HomeIcon } from 'lucide-react';
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";


const HomeLoan = () => {
  const [loansData, setLoansData] = useState([
    { 
      id: 1, flatNo: "", nameOfAllotee: "", nameOfCoAllotee: "", type: "", 
      floor: "1", emailId: "johndoe@example.com", whatsappMobileNo: "", rate: "", 
      agreementValue: "₹60,00,000", dateOfBooking: "2024-03-01", parking: "", homeLoanApplicability: "Yes", 
      bankName: "", bankerName: "", mobileNo: "", loanAccountNo: "", 
      loanAmount: "", sanctionLetter: "Yes", homeLoanSanctionCertificateCollected: "", 
      bookingCancellationReason: "-", bookingConfirmationMailSent: "Yes"
    },
   
  ]);

  const [openMailPopup, setOpenMailPopup] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState("");


  
  const [filteredLoans, setFilteredLoans] = useState(loansData);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [isEditingBankName, setIsEditingBankName] = useState(false);
  const [bankName, setBankName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [isExpanded, setIsExpanded] = useState(true);
   const [selectedFileNames, setSelectedFileNames] = useState([]);
  //  const [loanData, setLoanData] = useState([]);
  
  // const [editingLoan, setEditingLoan] = useState(null);
  // const [editingLoan, setEditingLoan] = useState({
  //   flatNo: '',
  //   nameOfAllotee: '',
  //   mobileNo: '',
  //   loanAccountNo: '',
  //   loanAmount: '',
  //   bankName: '',
  //   bankerName: '',
  //   errorFlatNo: '',
  //   errorNameOfAllotee: '',
  //   errorMobileNo: '',
  //   selectedFileName: ''
  // });
  
  const [editingLoan, setEditingLoan] = useState([]);
  // const [editingLoans, setEditingLoans] = useState([]);


  const [selectedFileName, setSelectedFileName] = useState(''); 
  
  useEffect(() => {
    setTotalPages(Math.ceil(filteredLoans.length / rowsPerPage));
  }, [filteredLoans, rowsPerPage]);

  useEffect(() => {
    let filtered = loansData;

    
    if (startDate && endDate) {
      filtered = filtered.filter((loan) => {
        const bookingDate = new Date(loan.dateOfBooking);
        return bookingDate >= new Date(startDate) && bookingDate <= new Date(endDate);
      });
    }



   
   
    if (filterValue) {
      filtered = filtered.filter((loan) => loan.homeLoanApplicability === filterValue);
    }

    setFilteredLoans(filtered);
    setTotalPages(Math.ceil(filtered.length / rowsPerPage)); 
  }, [startDate, endDate, filterValue, loansData, rowsPerPage]);

  const handlePagination = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };



  
const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const toggleFormVisibility = () => {
    setIsEditingBankName(!isEditingBankName);
  };

  const handleLoanAmountChange = (e) => {
    const { value } = e.target; 
    setEditingLoan(prevState => ({
      ...prevState, 
      loanAmount: value, 
    }));
  };
  
  const handleOpenDialog = (loanId) => {
    const loanToEdit = loansData.find(loan => loan.id === loanId);
    setEditingLoan(loanToEdit);  
    setIsDialogOpen(true);
  };


  const handleCollapseToggle = () => {
        setIsCollapsed(prev => !prev);
      };


  const handleCloseDialog = () => {
    resetForm();
    setIsDialogOpen(false);
    setEditingLoan(null);  
  };

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setEditingLoan(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  const handleLoanAccountChange = (e) => {
    const { value } = e.target; 
    setEditingLoan(prevState => ({
      ...prevState,  
      loanAccountNo: value,  
    }));
  };
  
  


  const handleNameChange = (e) => {
    const { value } = e.target;
  
    const isValid = /^[A-Za-z\s]*$/.test(value); 
  
    if (isValid) {
      
      setEditingLoan(prevState => ({
        ...prevState,
        nameOfAllotee: value,  
        error: ''  
      }));
    } else {
     
      setEditingLoan(prevState => ({
        ...prevState,
        nameOfAllotee: value,  
        error: 'Only letters and spaces are allowed'  
      }));
    }
  };
  
  const handleSave = () => {
    const updatedLoans = loansData.map(loan => {
      if (loan.id === editingLoan.id) {
        return editingLoan;  
      }
      return loan;
    });
    setLoansData(updatedLoans);
    toast.success("Data submitted successfully!"); 
    resetForm();
    handleCloseDialog();
  };

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);  
  };

  const handleFlatNoChange = (e) => {
    const { value } = e.target;
  
    
    const isValid = /^[0-9]*$/.test(value); 
  
    if (isValid) {
      setEditingLoan(prevState => ({
        ...prevState,
        flatNo: value, 
      }));
    } else {
     
      setEditingLoan(prevState => ({
        ...prevState,
        flatNo: value,
        error: 'Only numbers allowed', 
      }));
    }
  };

  const handleMobileNoChange = (e) => {
    const { value } = e.target;
  
    const isValid = /^[0-9]{0,10}$/.test(value); 
  
   
    if (isValid) {
      setEditingLoan(prevState => ({
        ...prevState,
        mobileNo: value,
        errorMobileNo: '' 
      }));
    } else {
      
      setEditingLoan(prevState => ({
        ...prevState,
        mobileNo: value,
        errorMobileNo: 'Only numbers are allowed and up to 10 digits' 
      }));
    }
  };
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileNames = files.map((file) => file.name);
  
    setSelectedFileNames((prev) => [...prev, ...fileNames]);
  };
  
  const handleOpenDocument = (loanId) => {
    const loan = loansData.find((loan) => loan.id === loanId);
    if (loan && loan.sanctionLetter) {
      window.open(loan.sanctionLetter, '_blank'); 
    }
  };

  const resetForm = () => {
    setEditingLoan({
      flatNo: '',
      nameOfAllotee: '',
      bankName: '',
      bankerName: '',
      mobileNo: '',
      loanAccountNo: '',
      loanAmount: '',
      sanctionLetter: null,
      error: '',  
      errorMobileNo: '',
    });
    setSelectedFileName('');
  };
  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, filteredLoans.length);


  const handleOpenMailPopup = (loanId, email) => {
    setOpenMailPopup(loanId);
    setSelectedEmail(email);
  };

  const handleCloseMailPopup = () => {
    setOpenMailPopup(null);
    setSelectedEmail("");
  };

 
  
  
 

  const handleSendMail = () => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedEmail}`;
    window.open(gmailLink, '_blank');  // Open in new tab
    handleCloseMailPopup();
  };
  
 

 
  
  const handleStatusChange = (e, id) => {
    const { value } = e.target;
    setLoansData((prevData) =>
      prevData.map((loan) =>
        loan.id === id ? { ...loan, homeLoanSanctionCertificateCollected: value } : loan
      )
    );
  };


  // const handleBookingConfirmationChange = (id, value) => {
  //   setEditingLoan((prevData) =>
  //     prevData.map((loan) =>
  //       loan.id === id ? { ...loan, bookingCancellationReason: value } : loan
  //     )
  //   );
  // };

  // const handleBookingConfirmationChange = (id, value) => {
  //   setEditingLoan(prev =>
  //     prev.map(loan =>
  //       loan.id === id ? { ...loan, bookingConfirmation: value } : loan
  //     )
  //   );
  // };
  
  // const handleBookingConfirmationChange = (id, value) => {
  //   setEditingLoan(prev =>
  //     prev.map(loan =>
  //       loan.id === id ? { ...loan, bookingConfirmation: value } : loan
  //     )
  //   );
  // };
  
  

  // const handleBookingCancellationChange = (id, value) => {
  //   setEditingLoan((prev) =>
  //     prev.map((loan) =>
  //       loan.id === id
  //         ? { ...loan, bookingCancellationReason: value }
  //         : loan
  //     )
  //   );
  // };
  const handleBookingConfirmationChange = (id, value) => {
    setLoansData((prevData) =>
      prevData.map((loan) =>
        loan.id === id ? { ...loan, bookingConfirmation: value } : loan
      )
    );
  };
  const handleBookingCancellationChange = (id, value) => {
    setLoansData((prevData) =>
      prevData.map((loan) =>
        loan.id === id ? { ...loan, bookingCancellationReason: value } : loan
      )
    );
  };
  
const displayLoans = () => {
  return filteredLoans.slice(start, end).map((loan) => (

    

<TableRow key={loan.id}>
 
  <TableCell>{loan.flatNo}</TableCell>
  <TableCell>{loan.nameOfAllotee}</TableCell>
  <TableCell>{loan.nameOfCoAllotee}</TableCell>
  <TableCell>{loan.type}</TableCell>
  <TableCell>{loan.floor}</TableCell>
  <TableCell>{loan.emailId}</TableCell>
  <TableCell>{loan.whatsappMobileNo}</TableCell>
  <TableCell>{loan.rate}</TableCell>
  <TableCell>{loan.agreementValue}</TableCell>
  <TableCell>{loan.dateOfBooking}</TableCell>
  <TableCell>{loan.parking}</TableCell>

  <TableCell>
    <Select
      value={loan.homeLoanApplicability}
      onChange={(e) => handleHomeLoanApplicabilityChange(loan.id, e.target.value)}
      variant="outlined"
      size="small"
      sx={{ width: '100px' }}
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </Select>
  </TableCell>

 
  

  
  <TableCell>
    <IconButton onClick={() => handleOpenDialog(loan.id)} color="primary">
      <AccountCircle fontSize="medium" />
    </IconButton>
  </TableCell>




  <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
   <DialogTitle>Edit Loan Details</DialogTitle>
   <DialogContent>
    
 <TextField
     value={editingLoan?.flatNo || ''}
     onChange={handleFlatNoChange} 
     label="Flat No."
     variant="outlined"
     size="small"
     fullWidth
     error={editingLoan?.flatNo && !/^[0-9]*$/.test(editingLoan?.flatNo)} 
     helperText={editingLoan?.flatNo && !/^[0-9]*$/.test(editingLoan?.flatNo) ? 'Only numbers allowed' : ''} 
     sx={{ mb: 2 }}
   />

    


<TextField
   value={editingLoan?.nameOfAllotee || ''}
   onChange={(e) => handleNameChange(e)}
   label="Name of Allotee"
  variant="outlined"
  size="small"
  fullWidth
  error={!!editingLoan?.error}  
  helperText={editingLoan?.error || ''}  
  sx={{ mb: 2 }}
/>
    <div style={{ marginBottom: '8px' }}>Bank Name</div>
    <Select
      value={editingLoan?.bankName || ''}
      onChange={(e) => handleInputChange(e, 'bankName')}
      fullWidth
      size="small"
      sx={{ mb: 2 }} 
    >
       <MenuItem value="Loan Approved">Loan Approved</MenuItem>
       <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
       <MenuItem value="State Bank of India">State Bank of India</MenuItem>
       <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
       <MenuItem value="Axis Bank">Axis Bank</MenuItem>
       <MenuItem value="Bank of Maharashtra">Bank of Maharashtra</MenuItem>
    </Select>

   
    <div style={{ marginBottom: '8px' }}>Banker Name</div>
    <Select
      value={editingLoan?.bankerName || ''}
      onChange={(e) => handleInputChange(e, 'bankerName')}
      fullWidth
      size="small"
      sx={{ mb: 2 }} 
    >
     
    </Select>

     <TextField
  value={editingLoan?.mobileNo || ''}
  onChange={(e) => handleMobileNoChange(e)} 
  label="Mobile No."
  variant="outlined"
  size="small"
  fullWidth
  type="tel" 
  error={!!editingLoan?.errorMobileNo} 
  helperText={editingLoan?.errorMobileNo || ''} 
  sx={{ mb: 2 }} 
/>


   
     <TextField
      value={editingLoan?.loanAccountNo || ''}
      onChange={(e) => handleLoanAccountChange(e)} 
      label="Loan Account No."
      variant="outlined"
      size="small"
      fullWidth
      type="text"
      sx={{ mb: 2 }} 
    />

   
    <TextField
      value={editingLoan?.loanAmount || ''}
      onChange={(e) => handleLoanAmountChange(e)} 
      label="Loan Amount"
      variant="outlined"
      size="small"
      fullWidth
      type="number"
      InputProps={{
        inputMode: 'numeric', 
        pattern: '[0-9]*', 
      }}
      sx={{ mb: 2 }} 
    />

 <div style={{ marginBottom: '8px', fontWeight: '' }}>Sanction Letter</div>
     <Button
      variant="contained"
      color=""
      component="span"
      sx={{ mb: 2 }}
      onClick={() => document.getElementById('sanction-letter-input').click()} 
    >
      Choose File
    </Button>
    <input
      id="sanction-letter-input"
      type="file"
      multiple
      onChange={(e) => handleFileChange(e)}
      style={{ display: 'none' }} 
    />
      
     
         {selectedFileNames.length > 0 && (
        <div>
          {selectedFileNames.map((name, index) => (
            <Typography key={index} variant="body2" sx={{ mt: 1 }}>
              Selected File: {name}
            </Typography>
          ))}
        </div>
      )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDialog} color="secondary">
      Cancel
    </Button>
    <Button onClick={handleSave} color="primary" variant="contained">
      Save
    </Button>
  </DialogActions>
</Dialog>

  
  <TableCell>{loan.bankerName}</TableCell>
  <TableCell>{loan.mobileNo}</TableCell>
  <TableCell>{loan.loanAccountNo}</TableCell>
  <TableCell>{loan.loanAmount}</TableCell>



   <TableCell>
    {loan.sanctionLetter ? (
      <IconButton onClick={() => handleOpenDocument(loan.id)} color="primary">
        <FaEye fontSize="large" />
      </IconButton>
    ) : (
      <Typography variant="body2">No Document</Typography>
    )}
  </TableCell>

  
 
 <TableCell>
      <select
        className="p-2 bg-light"
        value={loan?.homeLoanSanctionCertificateCollected || ""}
        onChange={(e) => handleStatusChange(e, loan.id)}
      >
        <option value="" disabled>Select Status</option>
        <option value="Collected">Collected</option>
        <option value="In Process">In Process</option>
        <option value="Self Funding">Self Funding</option>
      </select>
    </TableCell>

  {/* <TableCell>
  <Select
    value={loan.bookingConfirmation || ""}
    onChange={(e) => handleBookingConfirmationChange(loan.id, e.target.value)}
    variant="outlined"
    size="small"
    sx={{ width: "120px" }} // Adjust width if needed
  >
    <MenuItem value="Booked">Booked</MenuItem>
    <MenuItem value="Cancelled">Cancelled</MenuItem>
  </Select>
</TableCell> */}
  {/* <TableCell>
      <Select
        value={loan.bookingConfirmation || ""}
        onChange={(e) => handleBookingConfirmationChange(loan.id, e.target.value)}
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
      >
         <MenuItem value="" disabled>
    Select Reason
  </MenuItem>
        <MenuItem value="Booked">Booked</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>
    </TableCell> */}
  



  <TableCell>
      <Select
        value={loan.bookingConfirmation || ""}
        onChange={(e) => handleBookingConfirmationChange(loan.id, e.target.value)}
        variant="outlined"
        size="small"
        sx={{ width: "120px" }}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select Reason
        </MenuItem>
        <MenuItem value="Booked">Booked</MenuItem>
        <MenuItem value="Cancelled">Cancelled</MenuItem>
      </Select>
    </TableCell>
<TableCell>
  <Select
    value={loan.bookingCancellationReason || ""}
    onChange={(e) => handleBookingCancellationChange(loan.id, e.target.value)}
    variant="outlined"
    size="small"
    sx={{ width: "150px" }} // Adjust width if needed
  >
   
    <MenuItem value="Loan Issue">Loan Issue</MenuItem>
    <MenuItem value="Not Satisfied">Not Satisfied</MenuItem>
  </Select>
</TableCell>

<TableCell>
  <Link 
    component="button"
    variant="body2"
    onClick={() => handleOpenMailPopup(loan.id, loan.emailId)} 
    sx={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
  >
    Send Mail
  </Link>

  {/* Confirmation Popup */}
  <Dialog open={openMailPopup === loan.id} onClose={handleCloseMailPopup}>
    <DialogTitle>Send Mail Confirmation</DialogTitle>
    <DialogContent>
      <Typography>Do you want to send the mail to {selectedEmail}?</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseMailPopup} color="secondary">No</Button>
      <Button onClick={handleSendMail} color="primary" variant="contained">Yes</Button>
    </DialogActions>
  </Dialog>
</TableCell>

</TableRow>

  ));
};

  const handleHomeLoanApplicabilityChange = (loanId, value) => {
    const updatedLoans = filteredLoans.map((loan) => {
      if (loan.id === loanId) {
        return { ...loan, homeLoanApplicability: value };
      }
      return loan;
    });
    setFilteredLoans(updatedLoans);
  };

  const handleDownloadPDFHomeLoan = () => {
    const doc = new jsPDF("landscape");
  
    doc.setFontSize(14);
    doc.text("Home Loan Report", 14, 15);
  
    // Split columns into two sets for two pages
    const firstTableColumns = [
      "S.No", "Flat No.", "Name Of Allotee", "Name Of Co-Allotee", 
      "Type", "Floor", "Email ID", "WHATSAPP MOBILE NO", "Rate", "Agreement Value"
    ];
  
    const secondTableColumns = [
      "S.No", "DATE OF BOOKING", "Parking", "Home Loan Applicability", 
      "Banker Name", "Mobile No", "LOAN ACCOUNT NO.", "HOME LOAN SANCTION CERTIFICATE COLLECTED",
      "BOOKING CONFIRMATION", "BOOKING CANCELATION REASON"
    ];
  
    // Prepare table rows for both tables
    const firstTableRows = filteredLoans.map((loan, index) => [
      index + 1,
      loan.flatNo || "-",
      loan.nameOfAllotee || "-",
      loan.nameOfCoAllotee || "-",
      loan.type || "-",
      loan.floor || "-",
      loan.emailId || "-",
      loan.whatsappMobileNo || "-",
      loan.rate || "-",
      loan.agreementValue || "-"
    ]);
  
    const secondTableRows = filteredLoans.map((loan, index) => [
      index + 1,
      loan.dateOfBooking || "-",
      loan.parking || "-",
      loan.homeLoanApplicability || "-",
      loan.bankerName || "-",
      loan.mobileNo || "-",
      loan.loanAccountNo || "-",
      loan.homeLoanSanctionCertificateCollected || "-",
      loan.bookingConfirmation || "-",
      loan.bookingCancelationReason || "-"
    ]);
  
  
    autoTable(doc, {
      startY: 25,
      head: [firstTableColumns],
      body: firstTableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.text(`Page 1`, 280, 200); 
      }
    });
  
   
    doc.addPage();
  
   
    doc.text("Home Loan Report (Page 2)", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [secondTableColumns],
      body: secondTableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.text(`Page 2`, 280, 200); 
      }
    });
  
   
    doc.save("HomeLoan_Report.pdf");
  };
  


  
  return (
    <div className="main-content">
      <h6 className="mb-3">Sales Module / Home Loan Management</h6>
  
  
     
      <div className='d-flex gap-3'>
      <Button
        variant="contained"
        color="success"
        sx={{
          borderRadius: "20px",
          transition: "width 0.3s ease, background 0.3s ease",
          width: isExpanded ? "160px" : "50px",
          minWidth: "50px",
          fontWeight: "700",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "10px 10px",
          marginTop: "20px",
          marginBottom: "12px", 
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
        startIcon={< HomeIcon/>}
      >
        {isExpanded && "Home Loan"}
      </Button>
      <Button
  variant="contained"
  sx={{
    background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    fontWeight: "900",
    textTransform: "none",
    marginTop :"24px",
   
    minHeight: "unset",  
    height: "39px",   
    fontSize: "12px",
    borderRadius: "20px",
    display: "inline-flex",   
    alignItems: "center",
    gap: "6px",
    lineHeight: "1",  
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
  disableElevation   
  disableRipple  
  onClick={handleDownloadPDFHomeLoan}
>
  <FaFileDownload size={14} />
  Download PDF
</Button>



      </div>
      
     

      
      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 , maxHeight: 400,overflowY: 'auto'}}>
        <Table style={{ tableLayout: 'auto', width: '100%' }}>
          
<TableHead>
  <TableRow sx={{ background: "#3621a9" }}>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLAT NO.</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF ALLOTEE</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF CO-ALLOTEE</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TYPE</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLOOR</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>EMAIL ID</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WHATSAPP MOBILE NO.</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>RATE</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AGREEMENT VALUE</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BOOKING</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PARKING</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>HOME LOAN APPLICABILITY</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BANK NAME</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BANKER NAME</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MOBILE NO</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LOAN ACCOUNT NO.</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LOAN AMOUNT</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SANCTION LETTER</TableCell> 
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>HOME LOAN SANCTION CERTIFICATE COLLECTED</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CONFIRMATION</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CANCELATION REASON</TableCell>
    <TableCell className="" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CONFIRMATION MAIL SENT</TableCell>
  </TableRow>
</TableHead>

          <TableBody>
            {displayLoans()}
          </TableBody>
        </Table>
      </TableContainer>



    </div>
  );
};

export default HomeLoan;
