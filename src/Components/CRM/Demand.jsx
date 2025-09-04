import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Modal, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { FaEye } from "react-icons/fa";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import { MonetizationOn } from "@mui/icons-material";
import { FaFileDownload } from "react-icons/fa";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { IconButton } from "@mui/material";
const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};


const Demand = () => {
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


const [selectedTitle, setSelectedTitle] = useState("Mr."); 
  const rowsPerPage = 10;
  
  // State for Modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("");
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

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update state when date is selected
  };
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLoan(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };


  const handleCollapseToggle = () => {
    setIsCollapsed((prev) => !prev);
  };
  const handleChange = (event) => {
    setSelectedLevel(event.target.value);
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


  // / Handle Rows per page change
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


  
  const handleSubmit = () => {
    // Show success toast
   
    toast.success("Form submitted successfully!");
  };

  const generatePDF = () => {
    toast.info("PDF generation in progress...");
  
    // Check if selectedLoan is null or undefined, and return early if it is
    if (!selectedLoan) {
      toast.error("No data available to generate PDF.");
      return;
    }
  
    // Now safely destructure selectedLoan properties
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
    doc.setFont("helvetica", "normal");
  
    // Add text for each field
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
  
    // Generate the PDF
    doc.save("demand-letter.pdf");
  };
  
  
  const handleDownloadPDFDemand = () => {
    console.log("Loans data before mapping:", loans);

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Demand Report", 14, 15);

    
    const firstPageColumns = [
        "S.No", "FLAT NO.", "NAME OF ALLOTEE", "NAME OF CO-ALLOTEE",
        "TYPE", "FLOOR", "EMAIL ID", "WHATSAPP MOBILE NO."
    ];

    const secondPageColumns = [
        "S.No", "RATE", "AGREEMENT VALUE", "DATE OF BOOKING",
        "PARKING", "Date of Demand Raised", "Demand Level",
        "Demand Stage (In %)", "Demand Amount",
        "Received Against Agreement Value", "Total Received",
        "Balance Against Agreement Value"
    ];

   
    const firstPageRows = loans.map((row, index) => [
        index + 1, // Serial Number
        row.flatNo || "-",
        row.allotteeName || "-",
        row.coAllotteeName || "-",
        row.type || "-",
        row.floor || "-",
        row.email || "-",
        row.whatsappMobileNo || "-"
    ]);

    const secondPageRows = loans.map((row, index) => [
        index + 1, // Serial Number
        row.rate || "-",
        row.agreementValue || "-",
        row.dateOfBooking || "-",
        row.parking || "-",
        row.dateOfDemandRaised || "-",
        row.demandLevel || "-",
        row.demandStage || "-",
        row.demandAmount || "-",
        row.receivedAgainstAgreementValue || "-",
        row.totalReceived || "-",
        row.balanceAgainstAgreementValue || "-"
    ]);

    console.log("First Page Rows:", firstPageRows);
    console.log("Second Page Rows:", secondPageRows);

   
    autoTable(doc, {
        startY: 25,
        head: [firstPageColumns],
        body: firstPageRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

   
    doc.addPage();

   
    autoTable(doc, {
        startY: 25,
        head: [secondPageColumns],
        body: secondPageRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Demand_Report.pdf");
};
  

const handleDemandLevelChange = (newLevel, index) => {
  const updatedData = [...data];
  updatedData[index].demandLevel = newLevel;
  setData(updatedData);
};


const [data, setData] = useState([
  {
    flatNo: "A-101",
    nameOfAllotee: "John Doe",
    nameOfCoAllotee: "Jane Doe",
    type: "3BHK",
    floor: "1st",
    email: "john@example.com",
    whatsappNo: "9876543210",
    rate: "5000",
    agreementValue: "50 Lakhs",
    dateOfBooking: "2023-04-01",
    parking: "Yes",
    receivedDate: null,
    demandLetter: "Issued",
    demandLevel: 10,
  },
  
]);

  return (
    <div className="main-content">
       {!openModal ? (
        <>
      <h6>Sales Module / Demand Raised Management</h6>


      

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
  startIcon={< MonetizationOn />}
>
  {isExpanded && "Demand Letter"}
</Button>


      

<div className="d-flex align-items-center justify-content-between my-3 pt-4 pb-3">
  <div className='d-flex gap-3'>
  <Button variant="contained" className="text-nowrap" style={{ minWidth: "150px" ,background:"#272ba8"}} color="primary" onClick={() => handleOpenModal(null)}>
    Demand Letter
  </Button>
        <Button
    variant="contained"
    sx={{
      background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
      color: "white",
      // fontWeight: "bold",
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
    onClick={handleDownloadPDFDemand}
  >
    <FaFileDownload size={14} />
    Download PDF
  </Button>
  
  </div>
  

  <div className="d-flex align-items-center justify-content-between mb-3 m-3">
           <div className="d-flex align-items-center gap-3">
             <label>Filter By:</label>
             <TextField
               select
               variant="outlined"
               size="small"
               style={{ width: '150px' }}
               value={filterType}
               className="bg-white"
               onChange={(e) => {
                 setFilterType(e.target.value);
                 setFilterValue('');
               }}
             >
               <MenuItem value="">Select Filter</MenuItem>
               <MenuItem value="Flat Type">Flat Type</MenuItem>
               <MenuItem value="Parking">Parking</MenuItem>
               <MenuItem value="Floor">Floor</MenuItem>
               <MenuItem value="Rate">Rate</MenuItem>
             </TextField>
         
             
         
           {filterType && (
             <div className="d-flex align-items-center gap-1">
               <label>{filterType}:</label>
               <TextField
                 select
                 variant="outlined"
                 size="small"
                 className="bg-white"
                 style={{ width: '150px'  }}
                 value={filterValue}
                 onChange={(e) => setFilterValue(e.target.value)}
               >
                 {getFilterOptions(filterType).map((option) => (
                   <MenuItem key={option} value={option}>
                     {option}
                   </MenuItem>
                 ))}
               </TextField>
         
               {/* Reset Button */}
               <Button
                 variant="contained"
                 color="secondary"
                 style={{ marginLeft: '10px' }}
                 onClick={resetFilters}
               >
                 Reset
               </Button>
             </div>
           )}
         
         {/* Start Date */}
         <div className="d-flex align-items-center">
               <label style={{ marginRight: '5px' }}>Start Date:</label>
               <TextField
                 type="date"
                 variant="outlined"
                 size="small"
                 style={{ width: '150px', textAlign: 'center' }}
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
               />
             </div>
         
             {/* End Date */}
             <div className="d-flex align-items-center">
               <label style={{ marginRight: '5px' }}>End Date:</label>
               <TextField
                 type="date"
                 variant="outlined"
                 size="small"
                 style={{ width: '150px', textAlign: 'center' }}
                 value={endDate}
                 onChange={(e) => setEndDate(e.target.value)}
               />
             </div>
           </div>

           
        
          
         </div>
             


</div>



<TableContainer component={Paper} className="mt-4" sx={{ mt: 2, boxShadow: 3, borderRadius: 2 , overflowY: 'auto',maxHeight: 400}}>
      <Table >
        <TableHead>
        <TableRow sx={{background:"#3621a9"}}>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>FLAT NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>NAME OF ALLOTEE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>TYPE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>FLOOR</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>EMAIL ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WHATSAPP MOBILE NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>RATE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AGREEMENT VALUE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF BOOKING</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PARKING</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF DEMAND RAISED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND LEVEL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND STAGE (In %)</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND AMOUNT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RECEIVED AGAINST AGREEMENT VALUE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOTAL RECEIVED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DUE AS PER WORK STAGE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND LETTER</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CERTIFICATE FOR ENGINEER</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CERTIFICATE FOR ARCHITECT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DEMAND LETTER MAIL SENT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>EXPECTED DATE OF DEMAND COLLECTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BALANCE AGAINST AGREEMENT VALUE</TableCell>
          </TableRow>
        </TableHead>
      

<TableBody>
  {data.map((row, index) => (
    <TableRow key={index}>
      <TableCell>{row.flatNo}</TableCell>
      <TableCell>{row.nameOfAllotee}</TableCell>
      <TableCell>{row.nameOfCoAllotee}</TableCell>
      <TableCell>{row.type}</TableCell>
      <TableCell>{row.floor}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.whatsappNo}</TableCell>
      <TableCell>{row.rate}</TableCell>
      <TableCell>{row.agreementValue}</TableCell>
      <TableCell>{row.dateOfBooking}</TableCell>
      <TableCell>{row.parking}</TableCell>
        
        <TableCell>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={row.receivedDate}
            onChange={(newDate) => handleDateChange(newDate, index)}
             format="dd/MM/yyyy"
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </LocalizationProvider>
      </TableCell>

    
      <TableCell>
        <FormControl fullWidth size="medium">
          <InputLabel>Demand Level</InputLabel>
          <Select
            value={row.demandLevel}
            onChange={(e) => handleDemandLevelChange(e.target.value, index)}
          >
            <MenuItem value={10}>Booking Level (10%)</MenuItem>
            <MenuItem value={20}>Agreement Level (20%)</MenuItem>
            <MenuItem value={35}>Plinth Level (35%)</MenuItem>
            <MenuItem value={40}>1st Slab Level (40%)</MenuItem>
            <MenuItem value={45}>2nd Slab Level (45%)</MenuItem>
            <MenuItem value={50}>3rd Slab Level (50%)</MenuItem>
            <MenuItem value={55}>5th Slab Level (55%)</MenuItem>
            <MenuItem value={60}>7th Slab Level (60%)</MenuItem>
            <MenuItem value={65}>9th Slab Level (65%)</MenuItem>
            <MenuItem value={70}>10th Slab Level (70%)</MenuItem>
            <MenuItem value={75}>Brick Work Level (75%)</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell >
 
</TableCell>
<TableCell></TableCell>

<TableCell>
  <IconButton 
    
    onClick={() => window.open('URL_TO_YOUR_PDF', '_blank')}
  >
   
    <VisibilityIcon 
     sx={{ color: "#3621a9" }}  />

  </IconButton>
</TableCell>


<TableCell>
  <IconButton 
    
    onClick={() => window.open('URL_TO_YOUR_PDF', '_blank')}
  >
   
    <VisibilityIcon 
     sx={{ color: "#3621a9" }}  />
  </IconButton>
</TableCell>

<TableCell>
  <IconButton 
   
    onClick={() => window.open('URL_TO_YOUR_PDF', '_blank')}
  >
    
    <VisibilityIcon 
     sx={{ color: "#3621a9" }}   />
  </IconButton>
</TableCell>

<TableCell></TableCell>
<TableCell>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label="Select Date"
      value={selectedDate}
      onChange={handleDateChange}
       format="dd/MM/yyyy"
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          InputProps={{
            disableUnderline: true, 
          }}
          sx={{
            "& .MuiInputBase-root": {
              border: "none", 
            },
            "& .MuiOutlinedInput-notchedOutline": {
              display: "none", 
            },
            "& .MuiInputBase-input": {
              backgroundColor: "transparent", 
              padding: "8px 0", 
            },
          }}
        />
      )}
    />
  </LocalizationProvider>
</TableCell>

    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>


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
      width: 1070,
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
      <h5 style={{ margin: 0, color: "#fff" }}>Demand Letter</h5>
      <Button 
        onClick={handleCloseModal} 
        style={{ fontSize: "16px", color: "#fff", fontWeight: "bold", minWidth: "auto" }}>
        ✖
      </Button>
    </div>
   

<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
 
<div className='d-flex' style={{ gap: '20px', padding: '10px' }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Select Date"
      value={selectedDate}
      onChange={(newValue) => setSelectedDate(newValue)}
       format="dd/MM/yyyy"
      renderInput={(params) => <TextField {...params} fullWidth />}
      style={{ width: '200%' }}
    />
  </LocalizationProvider>

  <TextField
    label="Flat No"
    fullWidth
    value={selectedLoan?.flatNo || ""}
    onChange={(e) =>
      setSelectedLoan({ ...selectedLoan, flatNo: e.target.value })
    }
    style={{ width: '100%' }}
  />
</div>

   
  


<div className='d-flex' style={{ gap: '20px', padding: '10px' }}>
  {/* Title for Allotee */}
  <FormControl sx={{ minWidth: 100 }}>
    <InputLabel>Title</InputLabel>
    <Select
      value={selectedLoan?.alloteeTitle || ""}
      onChange={(e) =>
        setSelectedLoan({ ...selectedLoan, alloteeTitle: e.target.value })
      }
    >
      <MenuItem value="Mr">Mr</MenuItem>
      <MenuItem value="Mrs">Mrs</MenuItem>
      <MenuItem value="Miss">Miss</MenuItem>
    </Select>
  </FormControl>

  {/* Name Of Allotee */}
  <TextField
    label="Name Of Allotee"
    fullWidth
    value={selectedLoan?.nameOfAllotee || ""}
    onChange={(e) =>
      setSelectedLoan({ ...selectedLoan, nameOfAllotee: e.target.value })
    }
  />

  {/* Title for Co-Allotee */}
  <FormControl sx={{ minWidth: 100 }}>
    <InputLabel>Title</InputLabel>
    <Select
      value={selectedLoan?.coAlloteeTitle || ""}
      onChange={(e) =>
        setSelectedLoan({ ...selectedLoan, coAlloteeTitle: e.target.value })
      }
    >
      <MenuItem value="Mr">Mr</MenuItem>
      <MenuItem value="Mrs">Mrs</MenuItem>
      <MenuItem value="Miss">Miss</MenuItem>
    </Select>
  </FormControl>

  {/* Name Of Co-Allotee */}
  <TextField
    label="Name Of Co-Allotee"
    fullWidth
    value={selectedLoan?.coAlloteeName || ""}
    onChange={(e) =>
      setSelectedLoan({ ...selectedLoan, coAlloteeName: e.target.value })
    }
  />
</div>

<div  style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Address"
          fullWidth
          value={selectedLoan?.address || ""}
          onChange={(e) =>
            setSelectedLoan({ ...selectedLoan, address: e.target.value })
          }
        />

        <TextField
          label="Floor"
          fullWidth
          value={selectedLoan?.floor || ""}
          onChange={(e) =>
            setSelectedLoan({ ...selectedLoan, floor: e.target.value })
          }
        />
      </div>

      {/* Total Agreement, Stage of Completion, % Demand, Total Due Payment */}
      <div style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Total Agreement Value"
          fullWidth
          value={selectedLoan?.totalAgreement || ""}
          onChange={(e) =>
            setSelectedLoan({ ...selectedLoan, totalAgreement: e.target.value })
          }
        />

        <TextField
          label="Stage Of Completion"
          fullWidth
          value={selectedLoan?.stageOfCompletion || ""}
          onChange={(e) =>
            setSelectedLoan({
              ...selectedLoan,
              stageOfCompletion: e.target.value,
            })
          }
        />
</div>
<div  style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="% Of Demand Raising"
          fullWidth
          value={selectedLoan?.percentageDemand || ""}
          onChange={(e) =>
            setSelectedLoan({
              ...selectedLoan,
              percentageDemand: e.target.value,
            })
          }
        />

        <TextField
          label="Total Due Payment"
          fullWidth
          value={selectedLoan?.totalDuePayment || ""}
          onChange={(e) =>
            setSelectedLoan({
              ...selectedLoan,
              totalDuePayment: e.target.value,
            })
          }
        />
      </div>

      {/* Payment Received, Payment Balance */}
      <div style={{ display: "flex", gap: "20px" }}>
        <TextField
          label="Payment Received Till Date"
          fullWidth
          value={selectedLoan?.paymentReceived || ""}
          onChange={(e) =>
            setSelectedLoan({
              ...selectedLoan,
              paymentReceived: e.target.value,
            })
          }
        />

        <TextField
          label="Payment Balance Till Date"
          fullWidth
          value={selectedLoan?.paymentBalance || ""}
          onChange={(e) =>
            setSelectedLoan({
              ...selectedLoan,
              paymentBalance: e.target.value,
            })
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
        <Button
          className="m-2"
          variant="contained"
          color="primary"
          onClick={generatePDF}
        >
          Generate PDF
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

export default Demand;

