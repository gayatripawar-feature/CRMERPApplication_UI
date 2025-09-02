import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,   Dialog, DialogActions, DialogContent, DialogTitle, Button,TextField, Modal, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FaEye } from "react-icons/fa";
import { jsPDF } from "jspdf";
import EditIcon from '@mui/icons-material/Edit'; 
import { ToastContainer, toast } from 'react-toastify';
import { MonetizationOn } from "@mui/icons-material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';  
import autoTable from "jspdf-autotable";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FaFileDownload } from "react-icons/fa";



import "jspdf-autotable";

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};


const DailyCollection= () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
   const [isExpanded, setIsExpanded] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [isCollapsed, setIsCollapsed] = useState(false);

const [selectedDate, setSelectedDate] = useState(null);
const [openForm, setOpenForm] = useState(false)
const [setAmount, setSetAmount] = useState(false);  
const [setAmountForm, setSetAmountForm] = useState(false);
const [selectedTitle, setSelectedTitle] = useState("Mr."); 
const [error, setError] = useState(false);
const [chequeNoError, setChequeNoError] = useState(false);
const [receiptNoError, setReceiptNoError] = useState(false);
const [dailyCollectionData, setDailyCollectionData] = useState([]);
const [selectedDates, setSelectedDates] = useState({});
const [selectedRowId, setSelectedRowId] = useState(null);
const [openAmount, setOpenAmount] = useState(false);

  const rowsPerPage = 10;
  
 
  const [openModal, setOpenModal] = useState(false);
  

  const [selectedLoan, setSelectedLoan] = useState({
    chequeNo: '', 
    receiptNo: '' 
  });
  
  const [selectedLevel, setSelectedLevel] = useState("");
  useEffect(() => {
    loadLoansData();
  }, []);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
    setFilteredLoans(data);
  };
 

  useEffect(() => {
    const dummyData = [
      {
        timestamp: "2025-04-11 10:00 AM",
        receiptNo: "RCPT001",
        customerName: "John Doe",
        demandLevel: "High",
        chequeNo: "CHQ123",
        bankName: "HDFC Bank",
        dateReceived: "2025-04-11",
        amountReceived: 10000,
        towards: "Loan Payment",
        paymentMode: "Cheque",
      },
      {
        timestamp: "2025-04-11 11:00 AM",
        receiptNo: "RCPT002",
        customerName: "Ramesh Kumar",
        demandLevel: "Medium",
        chequeNo: "CHQ124",
        bankName: "ICICI Bank",
        dateReceived: "2025-04-11",
        amountReceived: 15000,
        towards: "EMI Payment",
        paymentMode: "Cash",
      },
    ];
  
    setDailyCollectionData(dummyData);
  }, []);
  
  const handleEdit = (loan) => {
    setSelectedLoan(loan);  
    setSetAmount(true);     
  };
  

  const handleEditClick = () => {
    setOpenForm(true); 
  };
  const handleCloseForm = () => {
    e.stopPropagation();
    setOpenForm(false); 
  };

  const handleOpenModal = (loan) => {
    console.log('Opening modal for loan:', loan)
    setSelectedLoan(loan);
    setOpenModal(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); 
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenForm(false);
    setSelectedLoan(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };
 
  
  const handleOpen = (rowId) => {
    console.log("Opening Modal for Row Id:", rowId);
    setSelectedRowId(rowId);  
  
   
    setSetAmount(true);
    setSetAmountForm(true);
  };
  
  const handleClose = () => {
   
    setSetAmount(false); 
    setSetAmountForm(false);  
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

  const resetFilters = () => {
    setFilterType('');
    setFilterValue('');
    setStartDate('');
    setEndDate('');
  };
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);


  
const handleRowsPerPageChange = (e) => {
  const value = parseInt(e.target.value, 10);
  if (!isNaN(value) && value > 0) {
    setRowsPerPage(value);
  }
};

 
const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};

  const getFilterOptions = (type) => {
    switch (type) {
      case 'Flat Type':
        return ['1BHK', '2BHK', '3BHK'];
      case 'Parking':
        return ['Basement', 'Parking 1','Parking 2'];
      case 'Floor':
       
        return Array.from({ length: 15 }, (_, i) => (i + 1).toString());
      case 'Rate':
        return Array.from({ length: 120 }, (_, i) => (50000 * (i + 1)).toLocaleString()); 
      case 'Slab':
        return ['OCR', 'GST', 'Stamp Duty', 'Registration', 'Booking', 'Plinth Amount Received', '1st Slab Level', '2nd Slab Level', '3rd Slab Level', '5th Slab Level', '7th Slab Level', '10th Slab Level', 'Brick Level', 'External Plaster Level', 'Flooring Level', 'Staircase Level', 'Lift Level', 'Possession Level'];
      default:
        return [];
    }
  };

 

  const handleChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
     
      setSelectedLoan({ ...selectedLoan, flatNo: value });
      setSelectedLevel(event.target.value);
      setError(false);
    } else {
     
      setError(true);
    }
  };
 
  const handleChequeno = (e) => {
    const value = e.target.value;
  
    
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setSelectedLoan({ ...selectedLoan, chequeNo: value });
      setChequeNoError(false); 
    } else {
      setChequeNoError(true); 
    }
  };
  
  
  
  const handleReceiptNo = (e) => {
    const value = e.target.value;
  
 
    if (/^\d*$/.test(value)) {
      setSelectedLoan({ ...selectedLoan, receiptNo: value });
      setReceiptNoError(false); 
    } else {
      setReceiptNoError(true); 
    }
  };
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // if (!selectedLoan.receivedDate) {
    //   toast.error("Please select received date");
    //   return;
    // }
  
    setSelectedDates(prev => ({
      ...prev,
      [selectedRowId]: selectedLoan.receivedDate,
    }));
  
    handleClose();
    toast.success("Saved Successfully");
  };
  
  
  const generatePDF = () => {
    toast.info("PDF generation in progress...");
    
    const {
      flatNo,
      nameOfAllotee,
      coAlloteeName,
      totalAgreementValue,
      demandRaising,
      totalDuePayment,
      paymentReceived,
      paymentBalance,
      paymentBalanceWords,
    } = selectedLoan;
  
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Demand Letter", 20, 20);
  
    let y = 40; // Start position for text
  
    doc.text(`Flat No: ${flatNo}`, 20, y);
    y += 10;
    doc.text(`Name Of Allotee: ${nameOfAllotee}`, 20, y);
    y += 10;
    doc.text(`Name Of Co-Allotee: ${coAlloteeName}`, 20, y);
    y += 10;
    doc.text(`Total Agreement Value: ${totalAgreementValue}`, 20, y);
    y += 10;
    doc.text(`% Of Demand Raising: ${demandRaising}`, 20, y);
    y += 10;
    doc.text(`Total Due Payment: ${totalDuePayment}`, 20, y);
    y += 10;
    doc.text(`Payment Received Till Date: ${paymentReceived}`, 20, y);
    y += 10;
    doc.text(`Payment Balance Till Date: ${paymentBalance}`, 20, y);
    y += 10;
    doc.text(`Payment Balance (In Words): ${paymentBalanceWords}`, 20, y);
  
    doc.save("demand-letter.pdf");
  };
  
 


  // const handleDownloadPDFDailyCollection= () => {
  //   console.log("Loans data before mapping:", loans); // Use loans instead of firms
  
   
  
  //   const doc = new jsPDF("landscape");
  //   doc.setFontSize(14);
  //   doc.text("Firm Details Report", 14, 15);
  
  //   const tableColumn = [
  //     "Timestamp", "Firm Name", "Firm Address", "Firm PAN No",
  //     "Firm GST No", "Residential Address", "PAN No", "Aadhaar No",
  //     "Photo", "Light Bill"
  //   ];
  
  //   const tableRows = loans.map(row => [
  //     row.timestamp || "-",
  //     row.name || "-",
  //     row.address || "-",
  //     row.firmPanNo || "-",
  //     row.firmGstNo || "-",
  //     row.residentialAddress || "-",
  //     row.panNo || "-",
  //     row.aadhaarNo || "-",
  //     row.photo || "-",
  //     row.lightBill || "-"
  //   ]);
  
  //   console.log("Formatted Table Rows:", tableRows);
  
  //   autoTable(doc, {
  //     startY: 25,
  //     head: [tableColumn],
  //     body: tableRows,
  //     styles: { fontSize: 10, cellPadding: 3 },
  //     headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  //   });
  
  //   doc.save("DailyCollection_Report.pdf");
  // };


  const handleDownloadPDFDailyCollection = () => {
    console.log("Loans data before mapping:", loans); // Use loans instead of firms
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  
    // Define the columns for the first page
    const firstPageColumns = [
      "Timestamp", "Firm Name", "Firm Address", "Firm PAN No",
      "Firm GST No", "Residential Address", "PAN No", "Aadhaar No"
    ];
  
    // Define the columns for the second page
    const secondPageColumns = [
      "Photo", "Light Bill"
    ];
  
    // Prepare rows for the first page (general info)
    const firstPageRows = loans.map(row => [
      row.timestamp || "-",
      row.name || "-",
      row.address || "-",
      row.firmPanNo || "-",
      row.firmGstNo || "-",
      row.residentialAddress || "-",
      row.panNo || "-",
      row.aadhaarNo || "-"
    ]);
  
    // Prepare rows for the second page (photo and light bill info)
    const secondPageRows = loans.map(row => [
      row.photo || "-",
      row.lightBill || "-"
    ]);
  
    console.log("First Page Rows:", firstPageRows);
    console.log("Second Page Rows:", secondPageRows);
  
    // Add the first table (general info)
    autoTable(doc, {
      startY: 25, // Start position for the table
      head: [firstPageColumns], // Column headers
      body: firstPageRows, // Table rows (data)
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Add a new page for the second table (photo and light bill info)
    doc.addPage();
  
    // Add the second table (photo and light bill info)
    autoTable(doc, {
      startY: 25, // Start position for the table
      head: [secondPageColumns], // Column headers
      body: secondPageRows, // Table rows (data)
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF with the given filename
    doc.save("DailyCollection_Report.pdf");
  };
  return (
    <div className="main-content">
       {!openModal ? (
        <>
      <h6>Sales Module / Daily Collection</h6>


      

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
  startIcon={< MonetizationOn />}
>
  {isExpanded && "Display Collections"}
</Button>


      

<div className="d-flex align-items-center justify-content-between my-3 pt-4 pb-3">
  <div>
  <Button variant="contained" className="text-nowrap  m-2" style={{ minWidth: "150px" ,background:"#272ba8"}} color="primary" onClick={() => handleOpenModal(null)}>
   Add Collection
  </Button>

          <Button
        variant="contained"
        sx={{
          background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
          color: "white",
          
          fontWeight: "900",
          textTransform: "none",
          marginTop :"px",
         
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
        onClick={handleDownloadPDFDailyCollection}
      >
        <FaFileDownload size={14} />
        Download PDF
      </Button>
      
  </div>
 

 
             


</div>


<TableContainer component={Paper} className="mt-4" sx={{ mt: 2, boxShadow: 3, borderRadius: 2,maxHeight: 400, overflowY: 'auto' }}>
      <Table >
        <TableHead>
        <TableRow sx={{background:"#3621a9"}}>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>ACTION</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>	TIMESTAMP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RECEIPT NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>CUSTOMER NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>DEMAND LEVEL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>	CHEQUE NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BANK NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>DATE RECEIVED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AMOUNT RECEIVED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOWARDS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAYMENT MODE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND PERCENTAGE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PLANNED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ACTUAL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AMOUNT RECEIVED BY ACCOUNT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF RECEIVED AMOUNT (A/C)</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIME DELAY</TableCell>
           
           
          </TableRow>
        </TableHead>
        <TableBody>
        {dailyCollectionData.map((row, index) => (
 
  <TableRow key={row.id}>
    <TableCell>
 
  <IconButton
    onClick={handleEditClick}
    sx={{
      backgroundColor: "#3621a9",  
      color: "white",              
      fontSize: "14px",            
      padding: "6px",              
      '&:hover': {
        backgroundColor: "#2c1880",  
      }
    }}
  >
    <EditIcon />
  </IconButton>
</TableCell>



    <TableCell>{row.timestamp}</TableCell> 
    <TableCell>{row.receiptNo}</TableCell> 
    <TableCell>{row.customerName}</TableCell> 
    <TableCell>{row.demandLevel}</TableCell> 
    <TableCell>{row.chequeNo}</TableCell> 
    <TableCell>{row.bankName}</TableCell> 
    <TableCell>{row.dateReceived}</TableCell>
    <TableCell>{row.amountReceived}</TableCell> 
    <TableCell>{row.towards}</TableCell> 
    <TableCell>{row.paymentMode}</TableCell> 
    <TableCell></TableCell> 
    <TableCell></TableCell> 
    <TableCell></TableCell> 
    <TableCell></TableCell> 
  
   
        
       

<TableCell>
  <IconButton 
    onClick={() => handleOpen(row.id)} 
    style={{ backgroundColor: '#3621a9' }}
  >
    <InfoIcon style={{ color: '#fff', fontSize: 18 }} />
  </IconButton>

 


{selectedDates[row.id] ? (
  <span style={{ marginLeft: '8px', color: '#1976d2', fontWeight: 'bold' }}>
    {new Date(selectedDates[row.id]).toLocaleDateString()}  
   
  </span>
) : (
  <span style={{ marginLeft: '8px', color: 'gray', fontStyle: 'italic' }}>
    Please select a date
  </span>
)}





</TableCell>




    <TableCell></TableCell> 
  </TableRow>

    ))}
</TableBody>

      </Table>
    </TableContainer>

  
  


  
<Modal open={openForm} onClose={handleCloseForm}>
  <Box
    sx={{
      width: 870,
      bgcolor: "background.paper",
      borderRadius: 2,
      p: 4,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: 24,
    }}
  >
   
  
     <div style={{ backgroundColor: "#1976d2", padding: "8px 16px",marginBottom:"10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h5 style={{ margin: 0, color: "#fff" }}>Daily Collection</h5>
      <Button 
        onClick={handleCloseModal} 
        
        style={{ fontSize: "16px", color: "#fff", fontWeight: "bold", minWidth: "auto" }}>
        ✖
      </Button>
    </div>
   

    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
      
<TextField
  label="Receipt No"
  fullWidth
  value={selectedLoan?.receiptNo || ""}  
  onChange={handleReceiptNo}  // use handleReceiptNo for Receipt No
  error={receiptNoError}  // Use receiptNoError for error display
  helperText={receiptNoError ? "Only numbers are allowed" : ""}
/>


<FormControl fullWidth>
  <InputLabel>Name of Customer</InputLabel>
  <Select
    value={selectedLoan?.nameOfAllotee || ""}
    onChange={(e) => setSelectedLoan({ ...selectedLoan, nameOfAllotee: e.target.value })}
  >
    <MenuItem value="">Select Customer</MenuItem>
   
  </Select>
</FormControl>
      </div>
 

      <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Demand Level</InputLabel>
          <Select
            value={selectedLoan?.demandLevel || ""}
            onChange={(e) => setSelectedLoan({ ...selectedLoan, demandLevel: e.target.value })}
          >
            
            <MenuItem value="OCR">OCR</MenuItem>
            <MenuItem value="GST">GST</MenuItem>
            <MenuItem value="Stamp Duty">Stamp Duty</MenuItem>
            <MenuItem value="Registration">Registration</MenuItem>
            <MenuItem value="Booking">Booking</MenuItem>
            <MenuItem value="Plinth Level Amount Received">Plinth Level Amount Received</MenuItem>
            <MenuItem value="1st Slab Disbursement - Amount Received">1st Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="2nd Slab Disbursement - Amount Received">2nd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="3rd Slab Disbursement - Amount Received">3rd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="5th Slab Disbursement">5th Slab Disbursement - Amount Received </MenuItem>
            <MenuItem value="7th Slab Disbursement">7th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="10th Slab Disbursement">10th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="Brick Work Disbursement">Brick Work Disbursement - Amount Received</MenuItem>
            <MenuItem value="External Plaster Disbursement">External Plaster Disbursement -- Amount Received</MenuItem>
            <MenuItem value="Flooring Level Disbursement">Flooring Level Disbursement- - Amount Received</MenuItem>
            <MenuItem value="Staircase Level Disbursement - Amount Received">Staircase Level Disbursement - Amount Received</MenuItem>
            <MenuItem value="Possession Level Disbursement - Amount Received">Possession Level Disbursement - Amount Received</MenuItem>
          </Select>
        </FormControl>

<div style={{ display: "flex", gap: "20px" }}>
  
 

<TextField
  label="Cheque No"
  fullWidth
  value={selectedLoan?.chequeNo || ""}  // bind to chequeNo
  onChange={handleChequeno}  // use handleChequeno for Cheque No
  error={chequeNoError}  // Use chequeNoError for error display
  helperText={chequeNoError ? "Only alphanumeric characters are allowed" : ""}
/>




</div>





      <div style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Bank Name"
          fullWidth
          value={selectedLoan?.demandRaising || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, demandRaising: e.target.value })}
        />
 
<FormControl fullWidth>
      <InputLabel shrink>Date of Received</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date of Received"
          value={selectedLoan?.totalDuePayment || null} // Use null if no date selected
          onChange={(date) => setSelectedLoan({ ...selectedLoan, totalDuePayment: date })}
          renderInput={(params) => <TextField {...params} />} // Render the TextField inside the DatePicker
        />
      </LocalizationProvider>
    </FormControl>

      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <TextField type="number"
          label="Amount Received by CRM"
          fullWidth
          value={selectedLoan?.paymentReceived || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentReceived: e.target.value })}
        />
        <TextField
          label="
Towards"
          fullWidth
          value={selectedLoan?.paymentBalance || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentBalance: e.target.value })}
        />
      </div>

      
<div style={{ display: "flex", gap: "20px", width: "100%" }}>
  <FormControl sx={{ width: "100%" }}>
    <InputLabel>Mode of Payment</InputLabel>
    <Select
      value={selectedLoan?.paymentBalanceWords || ""}
      onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentBalanceWords: e.target.value })}
    >
      <MenuItem value="Cash">Cash</MenuItem>
      <MenuItem value="Cheque">Cheque</MenuItem>
      <MenuItem value="NEFT">NEFT</MenuItem>
      <MenuItem value="RTGS">RTGS</MenuItem>
      <MenuItem value="UPI">UPI</MenuItem>
    </Select>
  </FormControl>
</div>

      
<div style={{ display: "flex", gap: "20px" }}>
  
  

 
  <TextField
  type="number"
    label="Demand Raised Percentage"
    fullWidth
    value={selectedLoan?.coAlloteeName || ""}
    onChange={(e) => setSelectedLoan({ ...selectedLoan, coAlloteeName: e.target.value })}
  />
</div>
    </div>

 

<div>
    
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}  
        >
         Update
        </Button>
       
      </div>

     
      <ToastContainer />
    </div>


  </Box>
</Modal>


{/* Modal for Form */}
<Modal
        open={setAmount}
        // open={openAmount} 
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            width: 600,
          }}
        >
          {/* Form Title */}
          <div style={{ backgroundColor: "#1976d2", padding: "8px 16px", marginBottom: "10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h5 style={{ margin: 0, color: "#fff" }}>Amount Received by Account</h5>
            <Button 
              onClick={handleClose} 
              style={{ fontSize: "16px", color: "#fff", fontWeight: "bold", minWidth: "auto" }}>
              ✖
            </Button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Receipt No. */}
              <TextField
                label="Receipt No."
                fullWidth
                value={selectedLoan?.receiptNo || ""}
                onChange={(e) => setSelectedLoan({ ...selectedLoan, receiptNo: e.target.value })}
              />
              
              {/* Customer Name */}
              {/* <TextField
                label="Customer Name"
                fullWidth
                value={selectedLoan?.customerName || ""}
                onChange={(e) => setSelectedLoan({ ...selectedLoan, customerName: e.target.value })}
              /> */}
 <TextField
  label="Customer Name"
  fullWidth
  value={selectedLoan?.customerName || ""}
  onChange={(e) => {
    const value = e.target.value;
    setSelectedLoan({ ...selectedLoan, customerName: value });
  }}
/>

{/* Show Error Message when invalid input */}
{selectedLoan?.customerName && !/^[a-zA-Z\s]*$/.test(selectedLoan?.customerName) && (
  <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
    Only letters and spaces are allowed.
  </p>
)}


              
              {/* Demand Level Dropdown */}
              <FormControl fullWidth>
                <InputLabel>Demand Level</InputLabel>
                <Select
                  value={selectedLoan?.demandLevel || ""}
                  onChange={(e) => setSelectedLoan({ ...selectedLoan, demandLevel: e.target.value })}
                >
                  <MenuItem value="OCR">OCR</MenuItem>
            <MenuItem value="GST">GST</MenuItem>
            <MenuItem value="Stamp Duty">Stamp Duty</MenuItem>
            <MenuItem value="Registration">Registration</MenuItem>
            <MenuItem value="Booking">Booking</MenuItem>
            <MenuItem value="Plinth Level Amount Received">Plinth - Amount Received</MenuItem>
            <MenuItem value="1st Slab Disbursement - Amount Received">1st Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="2nd Slab Disbursement - Amount Received">2nd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="3rd Slab Disbursement - Amount Received">3rd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="5th Slab Disbursement">5th Slab Disbursement - Amount Received </MenuItem>
            <MenuItem value="7th Slab Disbursement">7th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="10th Slab Disbursement">10th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="Brick Work Disbursement">Brick Level Disbursement - Amount Received</MenuItem>
            <MenuItem value="Brick Work Disbursement">External Plaster Level Disbursement - Amount Received</MenuItem>
            <MenuItem value="External Plaster Disbursement">Flooring Level Disbursement -- Amount Received</MenuItem>
            <MenuItem value="Flooring Level Disbursement">Staircase Level Disbursement- - Amount Received</MenuItem>
            <MenuItem value="Staircase Level Disbursement - Amount Received">Lift Level Disbursement - Amount Received</MenuItem>
            <MenuItem value="Possession Level Disbursement - Amount Received">Possession Level Disbursement - Amount Received</MenuItem>
                </Select>
              </FormControl>

              {/* Amount Received */}
              <TextField
                type="number"
                label="Amount Received"
                fullWidth
                value={selectedLoan?.amountReceived || ""}
                onChange={(e) => setSelectedLoan({ ...selectedLoan, amountReceived: e.target.value })}
              />

             
              <LocalizationProvider dateAdapter={AdapterDateFns}> {/* Localization Provider wrapping the component */}
      <div style={{ width: '90%' }}>
        
        {/* <DesktopDatePicker
          label="Received Date"
          inputFormat="yyyy-MM-dd" // Date format
          value={selectedLoan.receivedDate}
          onChange={(date) => setSelectedLoan({ ...selectedLoan, receivedDate: date })}
          renderInput={(params) => <TextField {...params} fullWidth />} // Use MUI TextField for input
        /> */}
       

       <DesktopDatePicker
  label="Received Date"
  inputFormat="yyyy-MM-dd"
  value={selectedLoan.receivedDate || null}
  onChange={(date) => {
    setSelectedLoan(prev => ({
      ...prev,
      receivedDate: date,
    }))
  }}
  renderInput={(params) => <TextField {...params} fullWidth />}
/>


      </div>
    </LocalizationProvider>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "20px", marginTop: "20px", justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              {/* <Button variant="contained" color="primary" type="submit">Submit</Button> */}
              <Button
  variant="contained"
  color="primary"
  type="submit"
  onClick={() => {
    toast.success("Amount Received date Successfully!", {
      position: "top-center",
      autoClose: 2000,
    });
  }}
>
  Submit
</Button>

            </div>
          </form>
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
       ):(


<Modal open={openModal} onClose={handleCloseModal}>
  <Box
    sx={{
      width: 870,
      bgcolor: "background.paper",
      borderRadius: 2,
      p: 4,
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      boxShadow: 24,
    }}
  >
   
  
     <div style={{ backgroundColor: "#1976d2", padding: "8px 16px",marginBottom:"10px", borderRadius: "5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h5 style={{ margin: 0, color: "#fff" }}>Daily Collection</h5>
      <Button 
        onClick={handleCloseModal} 
        style={{ fontSize: "16px", color: "#fff", fontWeight: "bold", minWidth: "auto" }}>
        ✖
      </Button>
    </div>
   

    {/* Form Fields with two per row */}
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Receipt No"
          fullWidth
          required
          value={selectedLoan?.flatNo || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, flatNo: e.target.value })}
        />
       

<FormControl fullWidth>
  <InputLabel>Name of Customer</InputLabel>
  <Select
  label="Name Of Customer"
    value={selectedLoan?.nameOfAllotee || ""}
    onChange={(e) => setSelectedLoan({ ...selectedLoan, nameOfAllotee: e.target.value })}
  >
    <MenuItem value="">Select Customer</MenuItem>
   
  </Select>
</FormControl>
      </div>
 

      <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Demand Level</InputLabel>
          <Select
          label="Demand Level"
            value={selectedLoan?.demandLevel || ""}
            onChange={(e) => setSelectedLoan({ ...selectedLoan, demandLevel: e.target.value })}
          >
            
            <MenuItem value="OCR">OCR</MenuItem>
            <MenuItem value="GST">GST</MenuItem>
            <MenuItem value="Stamp Duty">Stamp Duty</MenuItem>
            <MenuItem value="Registration">Registration</MenuItem>
            <MenuItem value="Booking">Booking</MenuItem>
            <MenuItem value="Plinth Level Amount Received">Plinth Level Amount Received</MenuItem>
            <MenuItem value="1st Slab Disbursement - Amount Received">1st Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="2nd Slab Disbursement - Amount Received">2nd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="3rd Slab Disbursement - Amount Received">3rd Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="5th Slab Disbursement">5th Slab Disbursement - Amount Received </MenuItem>
            <MenuItem value="7th Slab Disbursement">7th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="10th Slab Disbursement">10th Slab Disbursement - Amount Received</MenuItem>
            <MenuItem value="Brick Work Disbursement">Brick Work Disbursement - Amount Received</MenuItem>
            <MenuItem value="External Plaster Disbursement">External Plaster Disbursement -- Amount Received</MenuItem>
            <MenuItem value="Flooring Level Disbursement">Flooring Level Disbursement- - Amount Received</MenuItem>
            <MenuItem value="Staircase Level Disbursement - Amount Received">Staircase Level Disbursement - Amount Received</MenuItem>
            <MenuItem value="Possession Level Disbursement - Amount Received">Possession Level Disbursement - Amount Received</MenuItem>
          </Select>
        </FormControl>
   
<div style={{ display: "flex", gap: "20px" }}>
  <TextField
    label="Cheque No."
    required
    fullWidth
    value={selectedLoan?.chequeNo || ""}
    onChange={(e) =>
      setSelectedLoan({ ...selectedLoan, chequeNo: e.target.value })
    }
  />
</div>


      <div style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Bank Name"
          fullWidth
          required
          value={selectedLoan?.demandRaising || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, demandRaising: e.target.value })}
        />
     

<FormControl fullWidth>
  <InputLabel shrink>Date of Received</InputLabel>
  <TextField
    type="date"
    fullWidth
    value={selectedLoan?.totalDuePayment || ""}
    onChange={(e) => setSelectedLoan({ ...selectedLoan, totalDuePayment: e.target.value })}
  />
</FormControl>


      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <TextField type="number"
          label="Amount Received by CRM"
          fullWidth
          value={selectedLoan?.paymentReceived || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentReceived: e.target.value })}
        />
        <TextField
          label="
Towards"
          fullWidth
          value={selectedLoan?.paymentBalance || ""}
          onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentBalance: e.target.value })}
        />
      </div>

      
<div style={{ display: "flex", gap: "20px", width: "100%" }}>
  <FormControl sx={{ width: "100%" }}>
    <InputLabel>Mode of Payment</InputLabel>
    <Select
    label="Mode Of Payment"
      value={selectedLoan?.paymentBalanceWords || ""}
      onChange={(e) => setSelectedLoan({ ...selectedLoan, paymentBalanceWords: e.target.value })}
    >
      <MenuItem value="Cash">Cash</MenuItem>
      <MenuItem value="Cheque">Cheque</MenuItem>
      <MenuItem value="NEFT">NEFT</MenuItem>
      <MenuItem value="RTGS">RTGS</MenuItem>
      <MenuItem value="UPI">UPI</MenuItem>
    </Select>
  </FormControl>
</div>

      
{/* <div style={{ display: "flex", gap: "20px" }}>
  
  <TextField
  type="number"
    label="Demand Raised Percentage"
    fullWidth
    value={selectedLoan?.coAlloteeName || ""}
    onChange={(e) => setSelectedLoan({ ...selectedLoan, coAlloteeName: e.target.value })}
  />
</div> */}

<div style={{ display: "flex", gap: "20px" }}>
  <TextField
    type="number"
    label="Demand Raised Percentage"
    fullWidth
    value={selectedLoan?.demandRaisedPercentage || ""}
    onChange={(e) =>
      setSelectedLoan({ ...selectedLoan, demandRaisedPercentage: e.target.value })
    }
  />
</div>
    </div>

 

<div>
    
      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}  
        >
          Submit
        </Button>
       
      </div>

     
      <ToastContainer />
    </div>


  </Box>
</Modal>
       
  
  

       
       )
      }

      </div>
    
   
  
      

  
  );
};

export default DailyCollection;

