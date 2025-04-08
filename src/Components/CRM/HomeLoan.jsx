











// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, TextField, Select } from '@mui/material';
// import { FaEye } from 'react-icons/fa';

// const fetchLoansData = async () => {
//   const response = await fetch('/api/getOCRCollection');
//   return response.json();
// };

// const HomeLoan = () => {
//   const [loansData, setLoansData] = useState([
//     { id: 1, homeLoanApplicability: 'Yes' },
//     { id: 2, homeLoanApplicability: 'No' },
//   ]);
  
  
//   const [filteredLoans, setFilteredLoans] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [flatType, setFlatType] = useState('');
//   const [parking, setParking] = useState('');
//   const [floor, setFloor] = useState('');
//   const [rate, setRate] = useState('');
//   const [filterType, setFilterType] = useState('');
//   const [filterValue, setFilterValue] = useState('');
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   useEffect(() => {
//     loadLoansData();
//   }, []);

//   useEffect(() => {
//     setTotalPages(Math.ceil(filteredLoans.length / rowsPerPage));
//   }, [filteredLoans, rowsPerPage]);

//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoansData(data);
//     setFilteredLoans(data);
//   };

//   const getFilterOptions = (type) => {
//     switch (type) {
//       case "Flat Type":
//         return ["1BHK", "2BHK", "3BHK", "Studio"];
//       case "Parking":
//         return ["Basement", "Parking 1", "Parking 2"];
//       case "Floor":
//         return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
//       case "Rate":
//         let rates = [];
//         for (let i = 50000; i <= 6000000; i += 50000) {
//           rates.push(`₹${i.toLocaleString()}`);
//         }
//         return rates;
//       default:
//         return [];
//     }
//   };

//   const filterLoansByDate = () => {
//     const filtered = loansData.filter(loan => {
//       const loanDate = new Date(loan.dateOfBooking);
//       const start = startDate ? new Date(startDate) : new Date(0);
//       const end = endDate ? new Date(endDate) : new Date();

//       const matchesFilters =
//         (!flatType || loan.type === flatType) &&
//         (!parking || loan.parking === parking) &&
//         (!floor || loan.floor === floor) &&
//         (!rate || loan.rate === rate);

//       return loanDate >= start && loanDate <= end && matchesFilters;
//     });

//     setFilteredLoans(filtered);
//     setCurrentPage(1);
//   };

//   const resetFilters = () => {
//     setStartDate('');
//     setEndDate('');
//     setFlatType('');
//     setParking('');
//     setFloor('');
//     setRate('');
//     setFilteredLoans(loansData);
//     setCurrentPage(1);
//     setFilterType('');
//     setFilterValue('');
//   };

//   const handlePagination = (event, newPage) => {
//     setCurrentPage(newPage + 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
//     setCurrentPage(1); // Reset to first page whenever rows per page is changed
//   };

//   const start = (currentPage - 1) * rowsPerPage;
//   const end = Math.min(start + rowsPerPage, filteredLoans.length);

//   const displayLoans = () => {
//     return filteredLoans.slice(start, end).map((loan, index) => (
//       <TableRow key={loan.id} sx={{ background: "linear-gradient(to right, #ffd3e3, #ffebb7)" }}>
//         <TableCell>{loan.flatNo}</TableCell>
//         <TableCell>{loan.nameOfAllotee}</TableCell>
//         <TableCell>{loan.nameOfCoAllotee}</TableCell>
//         <TableCell>{loan.type}</TableCell>
//         <TableCell>{loan.floor}</TableCell>
//         <TableCell>{loan.emailId}</TableCell>
//         <TableCell>{loan.whatsappMobileNo}</TableCell>
//         <TableCell>{loan.rate}</TableCell>
//         <TableCell>{loan.agreementValue}</TableCell>
//         <TableCell>{loan.dateOfBooking}</TableCell>
//         <TableCell>{loan.parking}</TableCell>

//         {/* Replace this cell with a Select dropdown for Home Loan Applicability */}
//         <TableCell>
//           <Select
//             value={loan.homeLoanApplicability}
//             onChange={(e) => handleHomeLoanApplicabilityChange(loan.id, e.target.value)}
//             variant="outlined"
//             size="small"
//             sx={{ width: '100px' }}
//           >
//             <MenuItem value="Yes">Yes</MenuItem>
//             <MenuItem value="No">No</MenuItem>
//           </Select>
//         </TableCell>

//         <TableCell>{loan.bankName}</TableCell>
//         <TableCell>{loan.bankerName}</TableCell>
//         <TableCell>{loan.mobileNo}</TableCell>
//         <TableCell>{loan.loanAccountNo}</TableCell>
//         <TableCell>{loan.loanAmount}</TableCell>
//         <TableCell>{loan.sanctionLetter}</TableCell>
//         <TableCell>{loan.homeLoanSanctionCertificateCollected}</TableCell>
//         <TableCell>{loan.bookingCancellationReason}</TableCell>
//         <TableCell>{loan.bookingConfirmationMailSent}</TableCell>
//       </TableRow>
//     ));
//   };

//   // New function to handle changes for the homeLoanApplicability dropdown
//   const handleHomeLoanApplicabilityChange = (loanId, value) => {
//     const updatedLoans = filteredLoans.map((loan) => {
//       if (loan.id === loanId) {
//         return { ...loan, homeLoanApplicability: value };
//       }
//       return loan;
//     });

//     setFilteredLoans(updatedLoans);
//   };

//   const handleCollapseToggle = () => {
//     setIsCollapsed(prev => !prev);
//   };

//   return (
//     <div className="main-content">
//       <h6 className='mb-3'>Sales Module / Home Loan Management</h6>

//       {/* CRM Display Button */}
//       <div className="d-flex align-items-center mb-3">
//         <Button
//           onClick={handleCollapseToggle}
//           variant="outlined"
//           color="success"
//           className='m-3'
//           style={{ borderRadius: '20px' }}
//           startIcon={<FaEye size={20} color="#28a745" />}
//         >
//           {!isCollapsed && <span className="text-success">Home Loan </span>}
//         </Button>
//       </div>

//       <div className="d-flex align-items-center justify-content-between mb-3">
//         <div className="d-flex align-items-center gap-3">
//           <label>Filter By:</label>
//           <TextField
//             select
//             variant="outlined"
//             size="small"
//             style={{ width: '150px' }}
//             value={filterType}
//             className="bg-white"
//             onChange={(e) => {
//               setFilterType(e.target.value);
//               setFilterValue('');
//             }}
//           >
//             <MenuItem value="">Select Filter</MenuItem>
//             <MenuItem value="Flat Type">Flat Type</MenuItem>
//             <MenuItem value="Parking">Parking</MenuItem>
//             <MenuItem value="Floor">Floor</MenuItem>
//             <MenuItem value="Rate">Rate</MenuItem>
//           </TextField>

//           {filterType && (
//             <>
//               <label>{filterType}:</label>
//               <TextField
//                 select
//                 variant="outlined"
//                 size="small"
//                 className="bg-white"
//                 style={{ width: '150px' }}
//                 value={filterValue}
//                 onChange={(e) => setFilterValue(e.target.value)}
//               >
//                 {getFilterOptions(filterType).map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextField>

//               {/* Reset Button */}
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 style={{ marginLeft: '10px' }}
//                 onClick={resetFilters}
//               >
//                 Reset
//               </Button>
//             </>
//           )}
//         </div>

//         {/* Start Date */}
//         <div className="d-flex align-items-center">
//           <label style={{ marginRight: '5px' }}>Start Date:</label>
//           <TextField
//             type="date"
//             variant="outlined"
//             size="small"
//             style={{ width: '150px', textAlign: 'center' }}
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//         </div>

//         {/* End Date */}
//         <div className="d-flex align-items-center">
//           <label style={{ marginRight: '5px' }}>End Date:</label>
//           <TextField
//             type="date"
//             variant="outlined"
//             size="small"
//             style={{ width: '150px', textAlign: 'center' }}
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//         </div>

//         <div className="d-flex align-items-center gap-3">
//           <div className="d-flex align-items-center">
//             <label className="me-2">Rows per page:</label>
//             <input
//               type="number"
//               className="form-control"
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               style={{ width: '80px' }}
//             />
//           </div>
//         </div>
//       </div>

//       <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
//         <Table style={{ tableLayout: 'auto', width: '100%' }}>
//           <TableHead>
//             <TableRow sx={{ background: "#3621a9" }}>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Flat No.</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name Of Allotee</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name Of Co-Allotee</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Type</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Floor</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Email</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Whatsapp No.</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Rate</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Agreement Value</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Booking Date</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Parking</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Home Loan Applicability</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Bank Name</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Banker Name</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Mobile No</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Loan Acc No</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Loan Amount</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Sanction Letter</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Loan Cert</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Booking Cancellation Reason</TableCell>
//               <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Booking Confirmation Mail</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayLoans()}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination Section */}
//       <div className="d-flex justify-content-between align-items-center">
//         <Button style={{ backgroundColor: "#800080" }} className="text-white mt-3" onClick={() => handlePagination(null, currentPage - 2)} disabled={currentPage === 1}>Previous</Button>
//         <Button style={{ backgroundColor: "#800080" }} className='text-white mt-3' onClick={() => handlePagination(null, currentPage)} disabled={currentPage === totalPages}>Next</Button>
//       </div>
//     </div>
//   );
// };

// export default HomeLoan;



// -------------------



// =================

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
  // const [editingLoan, setEditingLoan] = useState(null);
  const [editingLoan, setEditingLoan] = useState({
    flatNo: '',
    nameOfAllotee: '',
    mobileNo: '',
    loanAccountNo: '',
    loanAmount: '',
    bankName: '',
    bankerName: '',
    errorFlatNo: '',
    errorNameOfAllotee: '',
    errorMobileNo: '',
    selectedFileName: ''
  });
  
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
      window.open(loan.sanctionLetter, '_blank'); // Open the document in a new browser tab
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
      error: '',  // Reset the error message as well
      errorMobileNo: '',
    });
    setSelectedFileName(''); // Clear file name if required
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

  // const handleSendMail = () => {
  //   console.log(`Sending email to ${selectedEmail}...`);
  //   setOpenMailPopup(null);
  // };

  // const handleSendMail = () => {
  //   const mailtoLink = `mailto:${selectedEmail}`;
  //   window.location.href = mailtoLink;  // Redirects to mail window
  //   handleCloseMailPopup();             // Close popup after redirect
  // };

  const handleSendMail = () => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${selectedEmail}`;
    window.open(gmailLink, '_blank');  // Open in new tab
    handleCloseMailPopup();
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

  {/* Bank Name Column */}
  

  {/* Icon Button for Bank Name */}
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
    <select className='p-2 bg-light'
      value={loan?.homeLoanSanctionCertificateCollected || ""} 
      onChange={(e) => handleStatusChange(e, loan.id)}
    >
      <option value="Collected">Collected</option>
      <option value="In Process">In Process</option>
      <option value="Self Funding">Self Funding</option>
    </select>
  </TableCell>
 
  <TableCell>
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
  
    // Generate first table (first page)
    autoTable(doc, {
      startY: 25,
      head: [firstTableColumns],
      body: firstTableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.text(`Page 1`, 280, 200); // Page Number
      }
    });
  
    // Add a new page for the second table
    doc.addPage();
  
    // Generate second table (second page)
    doc.text("Home Loan Report (Page 2)", 14, 15);
    autoTable(doc, {
      startY: 25,
      head: [secondTableColumns],
      body: secondTableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      didDrawPage: () => {
        doc.setFontSize(10);
        doc.text(`Page 2`, 280, 200); // Page Number
      }
    });
  
    // Save the PDF
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
   
    minHeight: "unset", // Removes fixed height  
    height: "39px", // Explicitly set a smaller height  
    fontSize: "12px",
    borderRadius: "20px",
    display: "inline-flex", // Ensures compact size  
    alignItems: "center",
    gap: "6px",
    lineHeight: "1", // Reduces text spacing  
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
  disableElevation // Removes shadow that might add visual space  
  disableRipple // Removes ripple effect padding  
  onClick={handleDownloadPDFHomeLoan}
>
  <FaFileDownload size={14} />
  Download PDF
</Button>



      </div>
      
     

      {/* <div className="pt-5" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ width: '200px' }}
        >
          <MenuItem value="">All Loans</MenuItem>
          <MenuItem value="Yes">Home Loan Applicable</MenuItem>
          <MenuItem value="No">No Home Loan</MenuItem>
        </Select>
      </div> */}

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Table style={{ tableLayout: 'auto', width: '100%' }}>
          




<TableHead>
  <TableRow sx={{ background: "#3621a9" }}>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Flat No.</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Name Of Allotee</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Name Of Co-Allotee</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Type</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Floor</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Email ID</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WHATSAPP MOBILE NO.</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Rate</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Agreement Value</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BOOKING</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Parking</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Home Loan Applicability</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Bank Name</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Banker Name</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Mobile No</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LOAN ACCOUNT NO.</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Loan Amount</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>Sanction Letter</TableCell> 
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>HOME LOAN SANCTION CERTIFICATE COLLECTED</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CONFIRMATION</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CANCELATION REASON</TableCell>
    <TableCell className="fs-6" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING CONFIRMATION MAIL SENT</TableCell>
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
