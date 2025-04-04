




import React, { useState } from 'react';
import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from 'react-icons/fa';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import BookingStatus from './BookingStatus';
import RevisitStatusTable from './RevisitStatusTable';

import { jsPDF } from "jspdf";
import {  FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
const FirstVisitSteps = () => {
  const [activeIcon, setActiveIcon] = useState('project');
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true); // Show Project Display Table by default
  const [rows, setRows] = useState([{}]);



  const row = {
    shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'], // Example data
  };


  // const [selectedItems, setSelectedItems] = React.useState(row.shareTo || []);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const [sharedWithMeRows, setSharedWithMeRows] = useState([
    {
      sharedFrom: "Sales",
      timestamp: "2024-02-24 10:30 AM",
      shareTo: "CRM",
      documentType: "PAN Card",
      document: "pan_card.pdf",
    },
    {
      sharedFrom: "Sales",
      timestamp: "2024-02-23 02:15 PM",
      shareTo: "Sales",
      documentType: "GST Certificate",
      document: "gst_certificate.pdf",
    }
  ]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const handleToggle = (iconName) => {
    setActiveIcon(iconName);
  };

  const handleOutShare = () => {
    setShowForm(true); 
    setShowProjectTable(false); 
    
    if (activeIcon === 'shared') {
      setSharedWithMeRows([]); 
    }
  };

  
  const handleCancel = () => {
    setShowForm(false); 
    setShowProjectTable(true); 
  };

  
  const handleShareToChange = (e, index) => {
    const newRows = [...rows];
    if (e.target.checked) {
      newRows[index].shareTo = [...(newRows[index].shareTo || []), e.target.value];
    } else {
      newRows[index].shareTo = newRows[index].shareTo.filter((item) => item !== e.target.value);
    }
    setRows(newRows);
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
    handleShareToChange(event, index); // Ensure you call the provided handleShareToChange function
  };

 
  const options = [
    'Sales',
    'CRM',
    'Admin',
    'Legal',
    'Engineering',
    'Accounting',
  ];

  const handleDocumentTypeChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].documentType = e.target.value;
    setRows(newRows);
  };


  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


  // Handle file change
  const handleFileChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].document = e.target.files[0];
    setRows(newRows);
  };

  // Add new row
  const addRow = () => {
    setRows([...rows, {}]);
  };

  // Handle form submission
  const handleSubmit = () => {
    // Handle the submit action (you can send data to the server or save it)
    console.log(rows);
    setShowForm(false);
    setShowProjectTable(true);
    console.log("data submitted ");
    toast.success('Data submitted successfully!');
  };

  // Remove row
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

 
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sharedWithMeRows.slice(indexOfFirstRow, indexOfLastRow);

  
  const totalPages = Math.ceil(sharedWithMeRows.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }



  const handleDownloadPDFBooking = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  
    const tableColumn = [
      "PLANNED", "ACTUAL", "STATUS", "LOAN SECURITY", "TIME DELAY",
      "ENQUIRY NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "EMAIL",
      "OCCUPATION", "COMPANY", "INTERESTED IN", "BUDGET (APPROX.)",
      "REASON FOR PURCHASE", "REFERENCE BY / SOURCE", "NAME OF CP",
      "PLANNING TO BUY WITHIN ?", "CUSTOMER FEEDBACK"
    ];
  
    const tableRows = loans.map(row => [
      row.planned || "-",
      row.actual || "-",
      row.status || "-",
      row.loanSecurity || "-",
      row.timeDelay || "-",
      row.enquiryNo || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
      row.mobile || "-",
      row.email || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.referenceBy || "-",
      row.cpName || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-"
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("Booking_Status_Report.pdf");
  };

  // const handleDownloadPDFRevisit = () => {
  //   const doc = new jsPDF("landscape");
  //   doc.setFontSize(14);
  //   doc.text("Firm Details Report", 14, 15);
  
  //   const tableColumn = [
  //     "PLANNED", "ACTUAL", "STATUS", "LOAN SECURITY", "TIME DELAY",
  //     "ENQUIRY NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "EMAIL",
  //     "OCCUPATION", "COMPANY", "INTERESTED IN", "BUDGET (APPROX.)",
  //     "REASON FOR PURCHASE", "REFERENCE BY / SOURCE", "NAME OF CP",
  //     "PLANNING TO BUY WITHIN ?", "CUSTOMER FEEDBACK"
  //   ];
  
  //   const tableRows = loans.map(row => [
  //     row.planned || "-",
  //     row.actual || "-",
  //     row.status || "-",
  //     row.loanSecurity || "-",
  //     row.timeDelay || "-",
  //     row.enquiryNo || "-",
  //     row.salesExecutiveName || "-",
  //     row.name || "-",
  //     row.mobile || "-",
  //     row.email || "-",
  //     row.occupation || "-",
  //     row.company || "-",
  //     row.interestedIn || "-",
  //     row.budget || "-",
  //     row.reasonForPurchase || "-",
  //     row.referenceBy || "-",
  //     row.cpName || "-",
  //     row.planningToBuyWithin || "-",
  //     row.customerFeedback || "-"
  //   ]);
  
  //   console.log("Formatted Table Rows:", tableRows);
  
  //   autoTable(doc, {
  //     startY: 25,
  //     head: [tableColumn],
  //     body: tableRows,
  //     styles: { fontSize: 9, cellPadding: 3 },
  //     headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  //   });
  
  //   doc.save("Revisit_Report.pdf");
  // };
  



  return (
    <div className="container my-4">
      <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>


<div className="d-flex align-items-center gap-4">
  
  <div
    className="d-flex align-items-center gap-2 p-2"
    onClick={() => handleToggle('project')}
    style={{
      cursor: 'pointer',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      transition: 'background 0.3s ease', 
      background: activeIcon === 'project' ? '#3621a9' : '#f8f9fa', 
      padding: '8px 16px', // Padding to space out icon and label
     
    }}
  >
    <div
      className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
      style={{
        background: activeIcon === 'project' ? 'white' : '#3621a9', // Icon background changes to white when active
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FaProjectDiagram size={26} color={activeIcon === 'project' ? '#3621a9' : 'white'} /> {/* Icon color changes based on active state */}
    </div>
    <div className=''>
    <span
      style={{
        color: activeIcon === 'project' ? '#fff' : '#3621a9', // Text color changes based on active state
        fontSize: '16px',
        marginLeft: '8px', // Space between icon and label
      }}
    >
      Booking Status
    </span>
    </div>
  

  
  </div>


  {/* Share Icon and Label Together */}
  <div
    className="d-flex align-items-center gap-2 p-2"
    onClick={() => handleToggle('shared')}
    style={{
      cursor: 'pointer',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      transition: 'background 0.3s ease', // Smooth background transition
      background: activeIcon === 'shared' ? '#3621a9' : '#f8f9fa', // Same background color for both
      padding: '8px 16px', // Padding to space out icon and label
      // borderRadius: '20px', // Rounded corners for the entire container
    }}
  >
    <div
      className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
      style={{
        background: activeIcon === 'shared' ? 'white' : '#3621a9', // Icon background changes to white when active
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FaShareAlt size={26} color={activeIcon === 'shared' ? '#3621a9' : 'white'} /> {/* Icon color changes based on active state */}
    </div>
    <span
      style={{
        color: activeIcon === 'shared' ? '#fff' : '#3621a9', // Text color changes based on active state
        fontSize: '16px',
        marginLeft: '8px', // Space between icon and label
      }}
    >
      Revisit Status
    </span>
  </div>
</div>




<div className='p-1 pt-3'>
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
    onClick={handleDownloadPDFBooking}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
    </div>
   

{showProjectTable && activeIcon === 'project' && (
  <div className="mt-4">
 
<div>

<BookingStatus data={data} />
    </div>

  </div>
)}




{activeIcon === 'shared' && (
  <div className="mt-4">
  

<RevisitStatusTable data={data} />

  </div>
)}


    </div>
  );
};

export default FirstVisitSteps;

