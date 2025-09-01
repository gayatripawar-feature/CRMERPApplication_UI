








import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, Modal,TableContainer, TableHead, TableRow, TablePagination, Paper, Button, MenuItem,IconButton, Select, InputLabel, FormControl, Box, Collapse, TextField } from '@mui/material';

import { FaEye, FaEyeSlash } from "react-icons/fa";

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from "@mui/material/InputAdornment";
import Ocrtable from './Ocrtable';

import jsPDF from "jspdf";

import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

import HistoryWithCash from './HistorywithCash';
import HistoryWithoutCash from "./HistoryWithoutCash";

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const OCR = () => {



  const [historyCashValues1, setHistoryCashValues1] = useState([]);
const [historyCashValues2, setHistoryCashValues2] = useState([]);

const [expandedIndex1, setExpandedIndex1] = useState(null);
const [expandedIndex2, setExpandedIndex2] = useState(null);

const [inputValue1, setInputValue1] = useState("");
const [inputValue2, setInputValue2] = useState("");



  const [isExpanded, setIsExpanded] = useState(true);
  const [loans, setLoans] = useState([
    {
      flatNo: '',
      cashWithAV: '',
    },
    {
      flatNo: '',
      cashWithAV: '',
    },
  ]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
 
  const [flatType, setFlatType] = useState('');
  const [parking, setParking] = useState('');
  const [floor, setFloor] = useState('');
  const [rate, setRate] = useState('');
  
  
  const [showFilters, setShowFilters] = useState(false);
  const [showCRM, setShowCRM] = useState(false);  
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [filterType, setFilterType] = useState(''); 
  const [filterValue, setFilterValue] = useState(''); 

  const [editingFlatNo, setEditingFlatNo] = useState(null); 
  const [editingHistoryCashWithAV, setEditingHistoryCashWithAV] = useState('');
const [expandedCashWithAV, setExpandedCashWithAV] = useState(false);
const [expandedCashWithoutAV, setExpandedCashWithoutAV] = useState(false);

  const [historyCashValues, setHistoryCashValues] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null); 

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [expandedIndex, setExpandedIndex] = useState(null); 

  const [expanded, setExpanded] = useState(false); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [inputValue, setInputValue] = useState("");

 
const [editingIndex1, setEditingIndex1] = useState(null);
const [expanded1, setExpanded1] = useState(false);


const [editingIndex2, setEditingIndex2] = useState(null);
const [expanded2, setExpanded2] = useState(false);

 
  const [editableCashValues, setEditableCashValues] = useState([]); 
  
  



  const [editMode, setEditMode] = useState(historyCashValues.map(() => false));

  useEffect(() => {
    loadLoansData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredLoans.length / rowsPerPage));
  }, [filteredLoans, rowsPerPage]);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
    setFilteredLoans(data);
  };

  const getFilterOptions = (type) => {
    switch (type) {
      case "Flat Type":
        return ["1BHK", "2BHK", "3BHK", "Studio"];
      case "Parking":
        return ["Basement", "Parking 1", "Parking 2"];
      case "Floor":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
      case "Rate":
        let rates = [];
        for (let i = 50000; i <= 6000000; i += 50000) {
          rates.push(`₹${i.toLocaleString()}`);
        }
        return rates;
      default:
        return [];
    }
  };

  const filterLoansByDate = () => {
    const filtered = loans.filter(loan => {
      const loanDate = new Date(loan.dateOfBooking);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();

      const matchesFilters =
        (!flatType || loan.type === flatType) &&
        (!parking || loan.parking === parking) &&
        (!floor || loan.floor === floor) &&
        (!rate || loan.rate === rate);

      return loanDate >= start && loanDate <= end && matchesFilters;
    });

    setFilteredLoans(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setFlatType('');
    setParking('');
    setFloor('');
    setRate('');
    setFilteredLoans(loans);
    setCurrentPage(1);
    setFilterType('');
    setFilterValue('');
  };



  const handlePagination = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); 
    setCurrentPage(1); 
  };


const handleEditValue = (index, column) => {
  if (column === "cash") {
    setEditingIndex1(index);
    setInputValue1(historyCashValues1[index]);
    setExpanded1(true);
  } else if (column === "cashWithAV") {
    setEditingIndex2(index);
    setInputValue2(historyCashValues2[index]);
    setExpanded2(true);
  }
};

  const handleHistoryCashWithAVChange = (flatNo, value) => {
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.flatNo === flatNo ? { ...loan, historyCashWithAV: value } : loan
      )
    );
    setEditingFlatNo(null); 
  };




const handleAddClick = (column) => {
  if (column === "cash") {
    setEditingIndex1(null);
    setInputValue1("");
    setExpanded1(true);
  } else if (column === "cashWithAV") {
    setEditingIndex2(null);
    setInputValue2("");
    setExpanded2(true);
  }
};



const handleSave = (column) => {
  if (column === "cash") {
    if (editingIndex1 !== null) {
      const updated = [...historyCashValues1];
      updated[editingIndex1] = inputValue1;
      setHistoryCashValues1(updated);
    } else {
      setHistoryCashValues1([...historyCashValues1, inputValue1]);
    }
    setExpanded1(false);
    setInputValue1("");
    setEditingIndex1(null);
  } else if (column === "cashWithAV") {
    if (editingIndex2 !== null) {
      const updated = [...historyCashValues2];
      updated[editingIndex2] = inputValue2;
      setHistoryCashValues2(updated);
    } else {
      setHistoryCashValues2([...historyCashValues2, inputValue2]);
    }
    setExpanded2(false);
    setInputValue2("");
    setEditingIndex2(null);
  }
};



const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};


  const handleCashWithAVChange = (flatNo, value) => {
  
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.flatNo === flatNo ? { ...loan, cashWithAV: value } : loan
      )
    );
  };

 
  
  

  const displayLoans = () => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = Math.min(start + rowsPerPage, filteredLoans.length);
    return filteredLoans.slice(start, end).map((loan, index) => (
      <TableRow key={loan.flatNo}>
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
        <TableCell>{loan.parkingNo}</TableCell>
        <TableCell>
          <select
            className="minimal-select"
            value={loan.loanStatus}
            onChange={(e) => updateLoanStatus(loan.flatNo, e.target.value)}
          >
            <option value="">{loan.loanStatus || 'Select Status'}</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Non Sanction">Non Sanction</option>
          </select>
        </TableCell>


        <TableCell>{loan.ocrAmount}</TableCell>
        <TableCell>{loan.ocrReceivedAmount}</TableCell>
        <TableCell>{loan.ocrBalance}</TableCell>
        <TableCell>{loan.online}</TableCell>
        <TableCell>{loan.cashWithAV}</TableCell>
        
        <TableCell>{loan.historyCashWithAV}</TableCell>
        <TableCell>{loan.balanceCashWithAV}</TableCell>
        <TableCell>{loan.cashWithoutAV}</TableCell>
        <TableCell>{loan.historyCashWithoutAV}</TableCell>
        <TableCell>{loan.balanceCashWithoutAV}</TableCell>
        <TableCell>{loan.receivedAsPerStage}</TableCell>
        <TableCell>{loan.stampDutyTotal}</TableCell>
        <TableCell>{loan.stampDutyReceived}</TableCell>
        <TableCell>{loan.stampDutyBalance}</TableCell>
        <TableCell>{loan.regTotal}</TableCell>
        <TableCell>{loan.regReceived}</TableCell>
        <TableCell>{loan.regBalance}</TableCell>
        <TableCell>{loan.gstTotal}</TableCell>
        <TableCell>{loan.gstReceived}</TableCell>
        <TableCell>{loan.balanceGst}</TableCell>
        <TableCell>{loan.legalChargesReceived}</TableCell>
      </TableRow>
    ));
  };

  const updateLoanStatus = (flatNo, newStatus) => {
    
    console.log(`Updating loan ${flatNo} status to ${newStatus}`);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(prev => !prev);
  };

  const handleDownloadPDFOCR = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("OCR Details Report", 14, 15);
  
   
    const tableColumnPage1 = [
      "Flat No.", "Name Of Allotee", "Name Of Co-Allotee", "Type", "Floor",
      "Email", "Whatsapp No.", "Rate", "Agreement Value", "Booking Date",
      "Parking No", "Loan Status"
    ];
  
   
    const tableColumnPage2 = [
      "OCR Amount", "OCR Received", "OCR Balance", "Received As Per Stage",
      "Stamp Duty Total", "Stamp Duty Received", "Stamp Duty Balance",
      "Reg Total", "Reg Received", "Reg Balance",
      "GST Total", "GST Received", "Balance GST"
    ];
  
   
    const tableRowsPage1 = loans.map(row => [
      row.flatNo || "-",
      row.nameOfAllotee || "-",
      row.nameOfCoAllotee || "-",
      row.type || "-",
      row.floor || "-",
      row.email || "-",
      row.whatsappNo || "-",
      row.rate || "-",
      row.agreementValue || "-",
      row.bookingDate || "-",
      row.parkingNo || "-",
      row.loanStatus || "-"
    ]);
  
    
    const tableRowsPage2 = loans.map(row => [
      row.ocrAmount || "-",
      row.ocrReceived || "-",
      row.ocrBalance || "-",
      row.receivedAsPerStage || "-",
      row.stampDutyTotal || "-",
      row.stampDutyReceived || "-",
      row.stampDutyBalance || "-",
      row.regTotal || "-",
      row.regReceived || "-",
      row.regBalance || "-",
      row.gstTotal || "-",
      row.gstReceived || "-",
      row.balanceGST || "-"
    ]);
  
    console.log("Formatted Table Rows (Page 1):", tableRowsPage1);
    console.log("Formatted Table Rows (Page 2):", tableRowsPage2);
  
   
    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    
    doc.addPage();
    doc.setFontSize(14);
    doc.text("OCR Details Report (Continued)", 14, 15);
  
    
    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("OCR_Details_Report.pdf");
  };
  
  

  return (
    <div className="main-content">
      <h6 className='pt-3'>Sales Module / OCR Collection Management</h6>


    

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
      startIcon={isExpanded ? <FaEyeSlash /> : <FaEyeSlash />}
    >
      {isExpanded && "OCR Collection"}
    </Button>

        <Button
     variant="contained"
     sx={{
       background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
       color: "white",
       fontWeight: "bold",
      //  fontWeight: "900",
       textTransform: "none",
       marginTop :"23px",
      padding:"18px",
     
       minHeight: "unset",  
       height: "41px",  
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
     onClick={handleDownloadPDFOCR}
   >
     <FaFileDownload size={14} />
     Download PDF
   </Button>

</div>
         <div className="d-flex align-items-center justify-content-between mb-3">
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
             <div className="d-flex align-items-center gap-3">
               <label>{filterType}:</label>
               <TextField
                 select
                 variant="outlined"
                 size="small"
                 className="bg-white"
                 style={{ width: '150px' }}
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


           {/* Rows per page */}
           <div className="d-flex align-items-center gap-3">
             <label className="me-2">Rows per page:</label>
             <input
               type="number"
               className="form-control"
               value={rowsPerPage}
               onChange={handleRowsPerPageChange}
               style={{ width: '80px' }}
             />
           </div>
         </div>
             



     
    


<TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
      <Table style={{ tableLayout: 'auto', width: '100%' }}>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLAT NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF ALLOTEE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TYPE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOOR</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WhatsApp MOBILE NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RATE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT VALUE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DATE OF BOOKING</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARKING</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARKING NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LOAN STATUS</TableCell>


            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>10 % of Amount ( If Non Sanction) OCR</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>Loan Amount ( Sanction )	</TableCell>

            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR AMOUNT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR RECEIVED AMOUNT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCR BALANCE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ONLINE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CASH WITH AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>HISTORY CASH WITH AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BALANCE CASH WITH AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CASH WITHOUT AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>HISTORY CASH WITHOUT AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BALANCE CASH WITHOUT AV</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RECEIVED AS PER STAGE OF CONSTRUCTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAMP DUTY TOTAL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAMP DUTY RECEIVE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAMP DUTY BALANCE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REG TOTAL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REG RECEIVE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REG BALANCE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST TOTAL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST RECEIVED</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BALANCE GST</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEGAL CHARGES RECEIVED</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loans.map((loan) => (
            <TableRow key={loan.flatNo}>
              <TableCell>{loan.flatNo}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <select
                  style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  <option value="">{'Select Status'}</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Non Sanction">Non Sanction</option>
                </select>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <input
                  type="number"
                  // value={loan.cashWithAV}
                  onChange={(e) => handleCashWithAVChange(loan.flatNo, e.target.value)}
                  style={{
                    padding: '8px',
                    backgroundColor: 'white',
                    border: '1px solid black',
                    borderRadius: '4px',
                    fontSize: '14px',
                    width: '100%',
                  }}
                />
              </TableCell>
             
 



<TableCell>
  <HistoryWithCash />
</TableCell>
<TableCell></TableCell>
  
<TableCell>
  <input
    type="number"
    placeholder=""
    style={{
      padding: "8px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      width: "100%", 
    }}
  />
</TableCell>


<TableCell>
  <HistoryWithoutCash />
</TableCell>


<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell><TableCell></TableCell>

<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>

<TableCell>
  <input
    type="number"
    placeholder=""
    style={{
      padding: "8px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      width: "100%", 
    }}
  />
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 

      <div className="d-flex justify-content-between align-items-center">
              <Button style={{backgroundColor:"#800080"}} className="text-white mt-3" onClick={handlePagination} disabled={currentPage === 1}>Previous</Button>
              <Button style={{backgroundColor:"#800080"}} className='text-white mt-3' onClick={handlePagination} disabled={currentPage === totalPages}>Next</Button>
            </div>
    </div>
  );
};

export default OCR;
