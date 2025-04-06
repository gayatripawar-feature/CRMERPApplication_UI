





import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, InputLabel, FormControl, TextField, Modal, Box } from '@mui/material';
import { Grid ,IconButton,Dialog, DialogTitle, 
  DialogContent, DialogActions,FormGroup, FormControlLabel, Checkbox} from '@mui/material';
  import { } from "@mui/material";
// import { Modal, Container, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { ToastContainer } from 'react-toastify';
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
// import ContractIcon from '@mui/icons-material/Contract';
import { FaFileSignature } from 'react-icons/fa';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { FaFileDownload } from "react-icons/fa";


import "jspdf-autotable";

import autoTable from "jspdf-autotable";



const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const getFilterOptions = (type) => {
  switch (type) {
    case "Flat Type":
      return ["1BHK", "2BHK", "3BHK", "Studio"];
    case "Parking":
      return ["Basement", "Parking 1", "Parking 2"];
    case "Floor":
      return Array.from({ length: 15 }, (_, i) => (i + 1).toString());
    case "Rate":
      return Array.from({ length: 121 }, (_, i) => `₹${(i * 50000).toLocaleString()}`);
    default:
      return [];
  }
};




const currentData = [
  {
    flatNo: "101",
    nameOfAllotee: "John Doe",
    nameOfCoAllotee: "Jane Doe",
    type: "2 BHK",
    floor: "1st Floor",
    emailId: "johndoe@example.com",
    whatsappMobileNo: "+1234567890",
    rate: "₹50,000",
    agreementValue: "₹5,00,000",
    dateOfBooking: "01/01/2023",
    parking: "Yes",
    agreementDraftGeneration: "Generated",
    agreementStatus: "",
    checklistBeforeAgreement: "",
    addressOfAgreement: "123 Street, City, Country",
    agreementDate: "", // Add this field for the date
    time: "10:00:00",
  },
  {
    flatNo: "102",
    nameOfAllotee: "Alice Smith",
    nameOfCoAllotee: "Bob Smith",
    type: "3 BHK",
    floor: "2nd Floor",
    emailId: "alicesmith@example.com",
    whatsappMobileNo: "+1987654321",
    rate: "₹60,000",
    agreementValue: "₹6,00,000",
    dateOfBooking: "05/02/2023",
    parking: "No",
    agreementDraftGeneration: "Not Generated",
    agreementStatus: "",
    checklistBeforeAgreement: "",
    addressOfAgreement: "456 Avenue, City, Country",
    agreementDate: "", // Add this field for the date
    time: "12:00:00",
  },
  // Add more rows as needed...
];



const Agreement = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
   const [isExpanded, setIsExpanded] = useState(true);
  const rowsPerPage = 10;
  
  // State for Modal
  const [openModal, setOpenModal] = useState(false);
  // const [selectedLoan, setSelectedLoan] = useState(null);

  const [open, setOpen] = useState(false);
  // const [updatedChecklist, setUpdatedChecklist] = useState(loan.checklistBeforeAgreement || "");
  const [updatedChecklist, setUpdatedChecklist] = useState("");

  const [checkedItems, setCheckedItems] = useState({
    item1: false,
    item2: false,
    item3: false
  });
  const initialState = {
    checkedItems: {
      item1: false,  // Checking Draft Details Once
      item2: false,  // Parking
      item3: false,  // Sq. Ft (All Area)
      item4: false,  // 7/12 (Latest Three Months)
      item5: false,  // Attach Search and Title Report
      item6: false,  // Attach Commencement Certificate
      item7: false,  // Attach NA Order
      item8: false,  // Attach RERA Certificate
      item9: false,  // Stamp Approval (1st Page Sanction Plan)
      item10: false, // Attach Mark Flat Layout on Draw
      item11: false, // Company PAN
      item12: false, // Promoter KYC
      item13: false, // Customer KYC
      item14: false, // Attach Photos - (Customer / Promoter)
      item15: false  // Sign, Photo and Thumb (Customer and Promoter)
    }
  };
  
  const [selectedLoan, setSelectedLoan] = useState({
    date: "",
    flatNo: "",
    titleAllotee: "",
    nameOfAllotee: "",
    alloteeDOB: "",
    alloteeAge: "",
    a1Occupation: "",
    a1PanNo: "",
    a1AadharNo: "",
    title: "",
    nameOfCoAllotee: "",
  });
  
  // useEffect(() => {
  //   if (selectedLoan.alloteeDOB) {
  //     const dob = new Date(selectedLoan.alloteeDOB);
  //     const diff = Date.now() - dob.getTime();
  //     const age = new Date(diff).getUTCFullYear() - 1970;
  //     handleInputChange("alloteeAge", age >= 0 ? age : "");
  //   }
  // }, [selectedLoan.alloteeDOB]);


  useEffect(() => {
    loadLoansData();
  }, []);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
    setFilteredLoans(data);
  };

  
  
const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};
 
// Handle checkbox change
const handleCheckboxChange = (event) => {
  setCheckedItems({
    ...checkedItems,
    [event.target.name]: event.target.checked
  });
};
  const handleInputChange = (field, value) => {
    // Handle Age field validation
    if (field === "alloteeAge") {
      // Ensure that the value entered is a number and within an acceptable range
      if (!isNaN(value) && value >= 0 && value <= 120) {  // Allow only numbers between 0 and 120 for age
        setSelectedLoan((prev) => ({
          ...prev,
          [field]: value,
        }));
      } else {
        toast.error("Invalid input: Please enter a valid age.");
        console.log("Invalid input: Please enter a valid age.");
      }
    } else if (field === "nameOfAllotee" || field === "coAlloteeName") {
      // Handle Allotee Name and Co-Allotee Name (letters and spaces only)
      const regex = /^[A-Za-z\s]*$/;
  
      if (regex.test(value) || value === "") {  // Allowing empty input initially
        setSelectedLoan((prev) => ({
          ...prev,
          [field]: value,
        }));
      } else {
        // Show error toast if the input is invalid (non-alphabetical characters)
        toast.error("Invalid input: Only letters and spaces are allowed.");
        console.log("Invalid input: Only letters and spaces are allowed.");
      }
    } else if (field === "contact") {
      // Handle Contact field (only 10 digits allowed)
      const regex = /^[0-9]{0,10}$/;  // Allow only numbers and restrict to 10 digits
  
      if (regex.test(value)) {
        setSelectedLoan((prev) => ({
          ...prev,
          [field]: value,
        }));
      } else {
        toast.error("Invalid input: Please enter a valid 10-digit contact number.");
        console.log("Invalid input: Please enter a valid 10-digit contact number.");
      }
    } 
    else {
      // For other fields, just update the state
      setSelectedLoan((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };
  
  const openChecklistDialog = (index) => {
    setSelectedIndex(index); // Set the current index of the selected row
    setOpen(true); // Open the dialog
  };
  
  const closeChecklistDialog = () => {
    setOpen(false); // Close the dialog
    setSelectedIndex(null); // Reset the selected index when closing
  };

  const resetForm = () => {
    setCheckedItems(initialState);
  };
  
  const handleTimeChange = (newTime, index) => {
    console.log("Selected Time:", newTime.format("HH:mm:ss")); // Handle update logic here
  };
  
  const handleDateChange = (newValue, index) => {
    console.log("Selected Date:", newValue.format("YYYY-MM-DD")); // Handle update logic here
  };

  const handleStatusChange = (event, index) => {
    const newStatus = event.target.value;
    console.log("Selected Status:", newStatus);
    // Handle update logic here
  };
  

  const filterLoans = () => {
    const filtered = loans.filter(loan => {
      const loanDate = new Date(loan.dateOfBooking);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();
      const matchesFilters =
        (!filterType || !filterValue || loan[filterType.toLowerCase().replace(' ', '')] === filterValue);
      return loanDate >= start && loanDate <= end && matchesFilters;
    });
    setFilteredLoans(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    filterLoans();
  }, [startDate, endDate, filterType, filterValue]);

  const handleOpenModal = (loan) => {
    setSelectedLoan(loan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLoan(null);
  };

  const handleSubmit = () => {
  
  toast.success("Data submitted successfully!", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000, 
  });

 
  handleCloseModal();
};





const generatePDF = () => {
 

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

  // Toast Notification
  toast.success("PDF generated successfully!", {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 3000,
  });
};



  // Open & close modal
  // const handleOpen = () => setOpen(true);
  const handleOpen = (index) => {
    // Set the current loan index and open the modal
    setSelectedIndex(index); // Store the index of the current loan
    setUpdatedChecklist(currentData[index].checklistBeforeAgreement); // Get the checklist data for the selected loan
    setOpen(true); // Open the modal
  };
  
  const handleClose = () => setOpen(false);

  
  // const handleSave = () => {
  //   handleChecklistUpdate(index, updatedChecklist); // Update parent state
  //   handleClose();
  // };


  // const handleSave = () => {
  //   console.log("Data Submitted:", checkedItems); // Simulating save action
  //   resetForm(); // Reset form
  //   closeChecklistDialog(); // Close the dialog
  // };
  const handleSave = () => {
    console.log("Data Submitted:", checkedItems);
    resetForm();
    setTimeout(() => {
      closeChecklistDialog(); // Ensuring dialog closes
    }, 0);
  };
  

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setFlatType('');
    setParking('');
    setFloor('');
    setRate('');
    setFilteredLoans(loans); // Reset loans filter if necessary
    setCurrentPage(1);
    setFilterType('');  // Reset the select dropdown value
    setFilterValue(''); // Reset the select dropdown value
  };
  
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredLoans.slice(indexOfFirstRow, indexOfLastRow);


 


  const handleDownloadPDFAgreement = () => {
    console.log("Loans data before mapping:", loans); 
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Agreement Report", 14, 15);
  
    // First set of columns (Page 1)
    const firstPageColumns = [
      "S.No.", "Flat No.", "Name Of Allotee", "NAME OF CO-ALLOTEE", "TYPE", "FLOOR", 
      "EMAIL ID", "WHATSAPP MOBILE NO.", "RATE", "AGREEMENT VALUE", "DATE OF BOOKING", "PARKING"
    ];
  
    // Second set of columns (Page 2)
    const secondPageColumns = [
      "S.No.", "AGGREMENT DRAFT GENERATION", "AGREEMENT STATUS", "AGREEMENT DATE"
    ];
  
    // Extracting data for the first set of columns with serial numbers
    const firstPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.flatNo || "-",
      row.nameOfAllotee || "-",
      row.nameOfCoAllotee || "-",
      row.type || "-",
      row.floor || "-",
      row.emailId || "-",
      row.whatsappMobileNo || "-",
      row.rate || "-",
      row.agreementValue || "-",
      row.dateOfBooking || "-",
      row.parking || "-"
    ]);
  
    // Extracting data for the second set of columns with serial numbers
    const secondPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.agreementDraftGeneration || "-",
      row.agreementStatus || "-",
      row.agreementDate || "-"
    ]);
  
    console.log("First Page Rows:", firstPageRows);
    console.log("Second Page Rows:", secondPageRows);
  
    // Generate the first table (Page 1)
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Add a new page
    doc.addPage();
  
    // Generate the second table (Page 2)
    doc.setFontSize(14);
    doc.text("Agreement Report - Continued", 14, 15);
    
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("Agreement_Report.pdf");
  };
  
  
  




  return (
    <div className="main-content">
          {!openModal ? (
      <>
      <h6>CRM Module / Agreement Management</h6>


<div className='d-flex gap-3'>
         
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
        marginBottom: "28px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        position: "relative",
        // background: "linear-gradient(0deg, rgba(22,9,240,1) 0%, rgba(49,110,244,1) 100%)",
        background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
        boxShadow:
          "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
        "&:hover": {
          // background: "linear-gradient(0deg, rgba(2,126,251,1) 0%, rgba(0,3,255,1) 100%)",
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
      startIcon={isExpanded ? <FaFileSignature /> : <FaFileSignature />}
    >
      {isExpanded && "Agreement"}
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
   onClick={handleDownloadPDFAgreement}
 >
   <FaFileDownload size={14} />
   Download PDF
 </Button>


</div>


      <div className="d-flex align-items-center gap-3 my-3 pt-4 pb-3">
        {/* Button Section in One Row */}
        <Button variant="contained"  className="text-nowrap "
    style={{ minWidth: "180px" ,background:"#272ba8"}}  color="primary" onClick={() => handleOpenModal(null)}>
          Agreement Draft
        </Button>

       

<TextField
  label="Start Date"
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  fullWidth
  InputLabelProps={{ shrink: true }}
  placeholder="Enter your start date" // Add placeholder
/>

<TextField
  label="End Date"
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  fullWidth
  InputLabelProps={{ shrink: true }}
  placeholder="Enter your end date" // Add placeholder
/>


        
        <FormControl fullWidth>
  <InputLabel>Filter By</InputLabel>
  <Select
    value={filterType} 
    onChange={(e) => setFilterType(e.target.value)}
  >
    <MenuItem value="Flat Type">Flat Type</MenuItem>
    <MenuItem value="Parking">Parking</MenuItem>
    <MenuItem value="Floor">Floor</MenuItem>
    <MenuItem value="Rate">Rate</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
  <InputLabel>Value</InputLabel>
  <Select
    value={filterValue} 
    onChange={(e) => setFilterValue(e.target.value)}
    disabled={!filterType} 
  >
    {getFilterOptions(filterType).map((option, index) => (
      <MenuItem key={index} value={option}>{option}</MenuItem>
    ))}
  </Select>
</FormControl>




        <Button variant="contained" color="primary" onClick={resetFilters}>
          Reset
        </Button>

        <FormControl fullWidth>
          <InputLabel>Rows Per Page</InputLabel>
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* <TableContainer component={Paper} className="mt-4" sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
         
 
         

            <TableRow sx={{background:"#3621a9"}}>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Flat No.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Name Of Allotee</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Allotee Date Of Birth</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Allotee Age</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>A1-Occupation</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>A1-Pan No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>A1-Aadhar No</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Name of Co-Allotee</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Co-Allotee Date Of Birth</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Co-Allotee Age</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Co-Occupation</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Co-Pan No.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Co-Aadhar No .</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Address</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Contact</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Floor</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Total Agreement Value (In words)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Payment Schedule</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Booking</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Execution Of Aggrement</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of Plinth</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 1st Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 2nd Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 3rd Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 5th Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 7th Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 9th Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of 10th Slab</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of Walls</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of Internal Plaster</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Completion Of Lifts</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>Possession</TableCell>
            </TableRow> 


          </TableHead>
          <TableBody>
            {currentRows.map((loan, index) => (
              <TableRow key={index}>
                <TableCell>{loan.flatNo}</TableCell>
                <TableCell>{loan.nameOfAllotee}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleOpenModal(loan)}>
                    Open Draft
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

<TableContainer component={Paper} className="mt-4" sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
  <Table>
    <TableHead>
      <TableRow sx={{ background: "#3621a9" }}>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Flat No.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Name Of Allotee</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TYPE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOOR</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL ID</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP MOBILE NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RATE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT VALUE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DATE OF BOOKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGGREMENT DRAFT GENERATION</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT STATUS</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CHECKLIST BEFORE AGREEMENT</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS OF AGREEMENT</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT DATE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIME(00:00:00)</TableCell>
      </TableRow>
    </TableHead>
   

<TableBody>
  {currentData.map((loan, index) => {
    console.log("Loan Data:", loan); 
    return (
      <TableRow key={index}>
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
        <TableCell>{loan.agreementDraftGeneration}</TableCell>
        {/* <TableCell>{loan.agreementStatus}</TableCell> */}
        <TableCell>
  <FormControl fullWidth size="small">
  <Select
  value={loan.agreementStatus || ""}
  onChange={(event) => handleStatusChange(event, index)}
  displayEmpty
  renderValue={(selected) => (selected ? selected : "Select Status")} 
  variant="outlined"
>
  <MenuItem disabled value="">
    Select Status
  </MenuItem>
  <MenuItem value="Yes">Yes</MenuItem>
  <MenuItem value="No">No</MenuItem>
</Select>

  </FormControl>
</TableCell>
       
<TableCell>
  {loan.checklistBeforeAgreement}

  <IconButton onClick={() => openChecklistDialog(index)} size="small">
    <AssignmentTurnedInIcon color="primary" />
  </IconButton>
</TableCell>



      


<Dialog
  open={open}
  onClose={() => {
    resetForm(); 
    closeChecklistDialog(); 
  }}
>

  {/* <DialogTitle>
    Before Agreement Checklist */}
    <DialogTitle 
    sx={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center",
      backgroundColor: "#1976d2", // Change this to any color you like
      color: "white", // Text color
      padding: "12px 16px",
    }}
  >
    Before Agreement Checklist
    <IconButton
      aria-label="close"
      // onClick={closeChecklistDialog}
      onClick={() => {
        resetForm(); // Reset when dialog is closed
        closeChecklistDialog();
      }}
      sx={{ position: "absolute", right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent>
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item1 || false}
            onChange={handleCheckboxChange}
            name="item1"
          />
        }
        label="Checking Draft Details Once"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item2 || false}
            onChange={handleCheckboxChange}
            name="item2"
          />
        }
        label="Parking"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item3 || false}
            onChange={handleCheckboxChange}
            name="item3"
          />
        }
        label="Sq. Ft (All Area)"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item4 || false}
            onChange={handleCheckboxChange}
            name="item4"
          />
        }
        label="7/12 (Latest Three Months)"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item5 || false}
            onChange={handleCheckboxChange}
            name="item5"
          />
        }
        label="Attach Search and Title Report"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item6 || false}
            onChange={handleCheckboxChange}
            name="item6"
          />
        }
        label="Attach Commencement Certificate"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item7 || false}
            onChange={handleCheckboxChange}
            name="item7"
          />
        }
        label="Attach NA Order"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item8 || false}
            onChange={handleCheckboxChange}
            name="item8"
          />
        }
        label="Attach RERA Certificate"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item9 || false}
            onChange={handleCheckboxChange}
            name="item9"
          />
        }
        label="Stamp Approval (1st Page Sanction Plan)"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item10 || false}
            onChange={handleCheckboxChange}
            name="item10"
          />
        }
        label="Attach Mark Flat Layout on Draw"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item11 || false}
            onChange={handleCheckboxChange}
            name="item11"
          />
        }
        label="Company PAN"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item12 || false}
            onChange={handleCheckboxChange}
            name="item12"
          />
        }
        label="Promoter KYC"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item13 || false}
            onChange={handleCheckboxChange}
            name="item13"
          />
        }
        label="Customer KYC"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item14 || false}
            onChange={handleCheckboxChange}
            name="item14"
          />
        }
        label="Attach Photos - (Customer / Promoter)"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={checkedItems.item15 || false}
            onChange={handleCheckboxChange}
            name="item15"
          />
        }
        label="Sign, Photo and Thumb (Customer and Promoter)"
      />
    </FormGroup>
  </DialogContent>

  <DialogActions>
 
    <Button
      onClick={handleSave}
      variant="contained"
      color="primary"
      className="btn btn-primary"
    >
      Save
    </Button>
  </DialogActions>
</Dialog> 
        <TableCell>{loan.addressOfAgreement}</TableCell>
       
<TableCell>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      value={loan.agreementDate ? dayjs(loan.agreementDate) : null}
      onChange={(newValue) => handleDateChange(newValue, index)}
      format="DD/MM/YYYY" 
      slotProps={{ textField: { variant: "outlined", size: "small" } }} 
    />
  </LocalizationProvider>
</TableCell>


        <TableCell>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <TimePicker
      label="Select Time"
      value={loan.time ? dayjs(loan.time, "HH:mm:ss") : null} // Parse existing time
      onChange={(newTime) => handleTimeChange(newTime, index)}
      ampm={false} // Uses 24-hour format, set to `true` for AM/PM format
      slotProps={{ textField: { variant: "outlined", size: "small" } }} // Styled input
    />
  </LocalizationProvider>
</TableCell>
      </TableRow>
    );
  })}
</TableBody>


  </Table>
</TableContainer>

      
      </>
    ) : (






        <div
  className="modal "
  style={{
    display: openModal ? "block" : "none",
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
    className="modal-dialog pt-5"
    style={{
      position: "relative",
      margin: "auto",
      top: "50%",
      transform: "translateY(-50%)",
      width: "90%",
      maxWidth: "1200px", 
    }}
  >
    
     <div
      className="modal-content p-3"
      style={{
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        borderRadius: "10px",
        width: "100%", 
      }}
    >
      <div
        className="modal-header "
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
         
          
        }}
      >
        <h5 className="modal-title " >Agreement Draft Generation</h5>
      
 
        <button
          type="button"
          className="btn-close "
          onClick={handleCloseModal}
        ></button>
      </div>

   
      {/* <div className="modal-body">
        <div className="container">
        
          <div
            className="p-3"
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "white",
              overflowY: "auto",
              maxHeight: "70vh", 
              
            }}
          >
          
            <div className="row mb-4">
            <div className="col-md-3">
    <label className="form-label">Date</label>
    <input
      type="date"
      className="form-control"
      value={selectedLoan?.date || ""} 
      onChange={(e) => handleInputChange("date", e.target.value)} 
    />
  </div>
  

<div className="col-md-3">
      <label className="form-label">Flat No</label>
      <input
        type="number"
        className="form-control"
        value={selectedLoan?.flatNo || ""}
        onChange={(e) => handleInputChange("flatNo", e.target.value)} 
      />
    </div>



<div className="col-md-3">
  <label className="form-label">Name Of Allotee</label>
  <div className="d-flex">
    <select
      className="form-control me-2"
      style={{ width: "25%" }}
      value={selectedLoan?.titleAllotee || ""}
      onChange={(e) => handleInputChange("titleAllotee", e.target.value)}
    >
      <option value="">Select</option>
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Miss">Miss</option>
    </select>

    <input
      type="text"
      className="form-control"
      style={{ width: "75%" }}
      value={selectedLoan?.nameOfAllotee || ""}
      onChange={(e) => handleInputChange("nameOfAllotee", e.target.value)}
      pattern="[A-Za-z\s]+"
      title="Only alphabets and spaces are allowed"
      placeholder="Enter Name"
    />
  </div>
</div>


            </div>

          
          
            <div className="row mb-4">
  <div className="col-md-3">
    <label className="form-label">Allotee Date Of Birth</label>
    <input
      type="date"
      className="form-control"
      value={selectedLoan?.alloteeDOB || ""}
      onChange={(e) => handleInputChange("alloteeDOB", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Allotee Age</label>
    <input
      type="number"
      className="form-control"
      value={selectedLoan?.alloteeAge || ""}
      onChange={(e) => handleInputChange("alloteeAge", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">A1 Occupation</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.a1Occupation || ""}
      onChange={(e) => handleInputChange("a1Occupation", e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-4">
    <label className="form-label">A1-Pan No.</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.a1PanNo || ""}
      onChange={(e) => handleInputChange("a1PanNo", e.target.value)}
      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
      title="Enter a valid PAN number (e.g., ABCDE1234F)"
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">A1- Aadhar No.</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.a1AadharNo || ""}
      onChange={(e) => handleInputChange("a1AadharNo", e.target.value)}
      pattern="\d{12}"
      title="Enter a valid 12-digit Aadhar number"
    />
  </div>

 


<div className="col-md-6">
  <label className="form-label">Name Of Co-Allotee</label>
  <div className="d-flex">
    <select
      className="form-control me-2"
      style={{ width: "25%" }}
      value={selectedLoan?.title || ""}
      onChange={(e) => handleInputChange("title", e.target.value)}
    >
      <option value="">Select</option>
      <option value="Mr.">Mr.</option>
      <option value="Mrs.">Mrs.</option>
      <option value="Miss">Miss</option>
    </select>

    <input
      type="text"
      className="form-control"
      style={{ width: "75%" }}
      value={selectedLoan?.nameOfCoAllotee || ""}
      onChange={(e) => handleInputChange("nameOfCoAllotee", e.target.value)}
      pattern="[A-Za-z\s]+"
      title="Only alphabets and spaces are allowed"
      placeholder="Enter Name"
    />
  </div>
</div>



  <div className="col-md-3 mb-4">
    <label className="form-label">Co-Allotee Date Of Birth</label>
    <input
      type="date"
      className="form-control"
      value={selectedLoan?.coAlloteeDOB || ""}
      onChange={(e) => handleInputChange("coAlloteeDOB", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Co-Allotee Age</label>
    <input
      type="number"
      className="form-control"
      value={selectedLoan?.coAlloteeAge || ""}
      onChange={(e) => handleInputChange("coAlloteeAge", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Co-Occupation</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.coOccupation || ""}
      onChange={(e) => handleInputChange("coOccupation", e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-4">
    <label className="form-label">Co-Pan No</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.coPanNo || ""}
      onChange={(e) => handleInputChange("coPanNo", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Co-Aadhar No.</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.coAadharNo || ""}
      onChange={(e) => handleInputChange("coAadharNo", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Address</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.address || ""}
      onChange={(e) => handleInputChange("address", e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-4">
    <label className="form-label">Contact</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.contact || ""}
      onChange={(e) => handleInputChange("contact", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Floor</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.floor || ""}
      onChange={(e) => handleInputChange("floor", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Total Agreement Value</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.totalAgreementValue || ""}
      onChange={(e) => handleInputChange("totalAgreementValue", e.target.value)}
    />
  </div>

  <div className="col-md-3 mb-4">
    <label className="form-label">Booking Amount</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.bookingAmount || ""}
      onChange={(e) => handleInputChange("bookingAmount", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Carpet Area</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.carpetArea || ""}
      onChange={(e) => handleInputChange("carpetArea", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Open Balcony Area</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.openBalconyArea || ""}
      onChange={(e) => handleInputChange("openBalconyArea", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Enclose Balcony Area</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.encloseBalconyArea || ""}
      onChange={(e) => handleInputChange("encloseBalconyArea", e.target.value)}
    />
  </div>

  <div className="col-md-3">
    <label className="form-label">Parking</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.parking || ""}
      onChange={(e) => handleInputChange("parking", e.target.value)}
    />
  </div>

  <div className="col-md-3 mt-4">
    <label className="form-label">Booking Amount (In Words)</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.bookingAmountInWords || ""}
      onChange={(e) => handleInputChange("bookingAmountInWords", e.target.value)}
    />
  </div>

  <div className="col-md-3 mt-4">
    <label className="form-label">Total Agreement Value (In Words)</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.totalAgreementValueInWords || ""}
      onChange={(e) => handleInputChange("totalAgreementValueInWords", e.target.value)}
    />
  </div>
</div>

            <h5 className="mt-3 mt-3 mb-4">Payment Schedule</h5>
<div className="row mb-3 mb-4">
  <div className="col-md-3">
    <label className="form-label">Booking</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.booking || ""}
      onChange={(e) => handleInputChange("booking", e.target.value)}
    />
  </div>
  <div className="col-md-3 mb-4">
    <label className="form-label">Execution Of Agreement</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.executionAgreement || ""}
      onChange={(e) => handleInputChange("executionAgreement", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of Plinth</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completionPlinth || ""}
      onChange={(e) => handleInputChange("completionPlinth", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 1st Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion1stSlab || ""}
      onChange={(e) => handleInputChange("completion1stSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3 mb-4">
    <label className="form-label">Completion Of 2nd Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion2ndSlab || ""}
      onChange={(e) => handleInputChange("completion2ndSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 3rd Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion3rdSlab || ""}
      onChange={(e) => handleInputChange("completion3rdSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 5th Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion5thSlab || ""}
      onChange={(e) => handleInputChange("completion5thSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 7th Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion7thSlab || ""}
      onChange={(e) => handleInputChange("completion7thSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 9th Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion9thSlab || ""}
      onChange={(e) => handleInputChange("completion9thSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of 10th Slab</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completion10thSlab || ""}
      onChange={(e) => handleInputChange("completion10thSlab", e.target.value)}
    />
  </div>
  <div className="col-md-3 mb-4">
    <label className="form-label">Completion Of Walls</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completionWalls || ""}
      onChange={(e) => handleInputChange("completionWalls", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of Internal Plaster</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completionInternalPlaster || ""}
      onChange={(e) =>
        handleInputChange("completionInternalPlaster", e.target.value)
      }
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Completion Of Lifts</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.completionLifts || ""}
      onChange={(e) => handleInputChange("completionLifts", e.target.value)}
    />
  </div>
  <div className="col-md-3">
    <label className="form-label">Possession</label>
    <input
      type="text"
      className="form-control"
      value={selectedLoan?.possession || ""}
      onChange={(e) => handleInputChange("possession", e.target.value)}
    />
  </div>
</div>

           

            
          </div>
        </div>
      </div> */}
        {/* <Box p={3} sx={{ background: "#fff", borderRadius: 2, border: "1px solid #ddd" }}> */}
        <Box 
  p={3} 
  sx={{ 
    background: "#fff", 
    borderRadius: 2, 
    border: "1px solid #ddd", 
    overflowY: "auto", 
    maxHeight: "70vh" ,
  }}
>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Date"
    type="date"
    InputLabelProps={{ shrink: true }}
    value={selectedLoan?.date || ""}   // Safe Access
    onChange={(e) => handleInputChange("date", e.target.value)}
    required
  />
</Grid>


<Grid item xs={12} md={4}>
  <TextField
    fullWidth
    label="Flat No"
    value={selectedLoan?.flatNo || ""}   // Safe Access
    onChange={(e) => handleInputChange("flatNo", e.target.value)}
    required
  />
</Grid>



<Grid item xs={12} md={4}>
<TextField
  fullWidth
  label="DOB"
  type="date"
  InputLabelProps={{ shrink: true }}
  value={selectedLoan?.alloteeDOB || ""}  // safe access
  onChange={(e) => handleInputChange("alloteeDOB", e.target.value)}
  required
/>
</Grid>

<Grid item xs={12} md={4}>
<TextField
  fullWidth
  label="Allotee Age"
  value={selectedLoan?.alloteeAge || ""}  // Safe access
  InputProps={{ readOnly: true }}  // If only display
/>
</Grid>

<Grid item xs={12} md={4}>
<TextField
  fullWidth
  label="Occupation"
  value={selectedLoan?.a1Occupation || ""}  // Safe Access
  onChange={(e) => handleInputChange("a1Occupation", e.target.value)}
/>
</Grid>
<Grid item xs={12} md={4}>
<TextField
  fullWidth
  label="Pan No"
  value={selectedLoan?.a1PanNo || ""}  
  onChange={(e) => handleInputChange("a1PanNo", e.target.value)}
/>
</Grid>
<Grid item xs={12} md={4}>
<TextField
  fullWidth
  label="Aadhar No"
  value={selectedLoan?.a1AadharNo || ""}
  onChange={(e) => handleInputChange("a1AadharNo", e.target.value)}
/>
</Grid>
<Grid container spacing={2} mt={2} mb={2}>
  {/* Title Field */}
  <Grid item md={4} sm={6} xs={12}>
    <TextField
      select
      fullWidth
      label="Title"
      value={selectedLoan?.title || ""}
      onChange={(e) => handleInputChange("title", e.target.value)}
    >
      <MenuItem value="Mr.">Mr.</MenuItem>
      <MenuItem value="Mrs.">Mrs.</MenuItem>
      <MenuItem value="Miss">Miss</MenuItem>
    </TextField>
  </Grid>

  {/* Name of Allottee Field */}
  <Grid item md={3} sm={6} xs={12}>
    <TextField
      fullWidth
      label="Name of Allottee"
      placeholder="Enter Name"
      value={selectedLoan?.nameOfAllotee || ""}
      onChange={(e) => handleInputChange("nameOfAllotee", e.target.value)}
    />
  </Grid>
</Grid>


      </Grid>
      {/* </Grid> */}
      

      <Grid container spacing={2}>

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Co-Allotee Date Of Birth"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={selectedLoan?.coAlloteeDOB || ""}
      onChange={(e) => handleInputChange("coAlloteeDOB", e.target.value)}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Co-Allotee Age"
      type="number"
      value={selectedLoan?.coAlloteeAge || ""}
      onChange={(e) => handleInputChange("coAlloteeAge", e.target.value)}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Co-Occupation"
      value={selectedLoan?.coOccupation || ""}
      onChange={(e) => handleInputChange("coOccupation", e.target.value)}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Co-Pan No"
      value={selectedLoan?.coPanNo || ""}
      onChange={(e) => handleInputChange("coPanNo", e.target.value)}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <TextField
      fullWidth
      label="Co-Aadhar No."
      value={selectedLoan?.coAadharNo || ""}
      onChange={(e) => handleInputChange("coAadharNo", e.target.value)}
    />
  </Grid>

</Grid>
<Grid container spacing={2}>
  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Address"
      variant="outlined"
      value={selectedLoan?.address || ""}
      onChange={(e) => handleInputChange("address", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Contact"
      variant="outlined"
      value={selectedLoan?.contact || ""}
      onChange={(e) => handleInputChange("contact", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Floor"
      variant="outlined"
      value={selectedLoan?.floor || ""}
      onChange={(e) => handleInputChange("floor", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Total Agreement Value"
      variant="outlined"
      value={selectedLoan?.totalAgreementValue || ""}
      onChange={(e) => handleInputChange("totalAgreementValue", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Booking Amount"
      variant="outlined"
      value={selectedLoan?.bookingAmount || ""}
      onChange={(e) => handleInputChange("bookingAmount", e.target.value)}
    />
  </Grid>

  <Grid item md={3} xs={12}>
    <TextField
      fullWidth
      label="Carpet Area"
      variant="outlined"
      value={selectedLoan?.carpetArea || ""}
      onChange={(e) => handleInputChange("carpetArea", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Open Balcony Area"
      variant="outlined"
      value={selectedLoan?.openBalconyArea || ""}
      onChange={(e) => handleInputChange("openBalconyArea", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Enclose Balcony Area"
      variant="outlined"
      value={selectedLoan?.encloseBalconyArea || ""}
      onChange={(e) => handleInputChange("encloseBalconyArea", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Parking"
      variant="outlined"
      value={selectedLoan?.parking || ""}
      onChange={(e) => handleInputChange("parking", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Booking Amount (In Words)"
      variant="outlined"
      value={selectedLoan?.bookingAmountInWords || ""}
      onChange={(e) => handleInputChange("bookingAmountInWords", e.target.value)}
    />
  </Grid>

  <Grid item md={4} xs={12}>
    <TextField
      fullWidth
      label="Total Agreement Value (In Words)"
      variant="outlined"
      value={selectedLoan?.totalAgreementValueInWords || ""}
      onChange={(e) => handleInputChange("totalAgreementValueInWords", e.target.value)}
    />
  </Grid>
</Grid>
<h5 className="mt-3 mb-4">Payment Schedule</h5>

<div className="row">
  {[
    { key: "booking", label: "Booking" },
    { key: "executionAgreement", label: "Execution Of Agreement" },
    { key: "completionPlinth", label: "Completion Of Plinth" },
    { key: "completion1stSlab", label: "Completion Of 1st Slab" },
    { key: "completion2ndSlab", label: "Completion Of 2nd Slab" },
    { key: "completion3rdSlab", label: "Completion Of 3rd Slab" },
    { key: "completion5thSlab", label: "Completion Of 5th Slab" },
    { key: "completion7thSlab", label: "Completion Of 7th Slab" },
    { key: "completion9thSlab", label: "Completion Of 9th Slab" },
    { key: "completion10thSlab", label: "Completion Of 10th Slab" },
    { key: "completionWalls", label: "Completion Of Walls" },
    { key: "completionInternalPlaster", label: "Completion Of Internal Plaster" },
  ].map((item) => (
    <div className="col-md-4 mb-4" key={item.key}>
      <label className="form-label">{item.label}</label>
      <input
        type="text"
        className="form-control"
        value={selectedLoan?.[item.key] || ""}
        onChange={(e) => handleInputChange(item.key, e.target.value)}
      />
    </div>
  ))}
</div>

    </Box>

    
    <ToastContainer />
<div
  className="modal-footer"
  style={{
    borderTop: "1px solid #ddd",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  }}
>
  <button
    type="button"
    className="btn btn-secondary"
    onClick={handleCloseModal}
  >
    Close
  </button>
  <button
    type="button"
    className="btn btn-primary"
    onClick={generatePDF}
  >
    Generate PDF
  </button>
</div>
</div>

  </div>
</div>



      )}


   
    </div>
    
  );

};

export default Agreement;
