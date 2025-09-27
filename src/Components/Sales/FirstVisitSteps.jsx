// import React, { useState } from 'react';
// import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from 'react-icons/fa';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
// import BookingStatus from './BookingStatus';
// import RevisitStatusTable from './RevisitStatusTable';

// import { jsPDF } from "jspdf";
// import {  FaFileDownload } from "react-icons/fa";
// import autoTable from "jspdf-autotable";
// import Constants from '../Constants';
// const FirstVisitSteps = () => {
//   const [activeIcon, setActiveIcon] = useState('project');
//   const [showForm, setShowForm] = useState(false);
//   const [showProjectTable, setShowProjectTable] = useState(true); // Show Project Display Table by default
//   const [rows, setRows] = useState([{}]);



//   const row = {
//     shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'], // Example data
//   };


//   // const [selectedItems, setSelectedItems] = React.useState(row.shareTo || []);
//   const [selectedItems, setSelectedItems] = React.useState([]);

//   const [sharedWithMeRows, setSharedWithMeRows] = useState([
//     {
//       sharedFrom: "Sales",
//       timestamp: "2024-02-24 10:30 AM",
//       shareTo: "CRM",
//       documentType: "PAN Card",
//       document: "pan_card.pdf",
//     },
//     {
//       sharedFrom: "Sales",
//       timestamp: "2024-02-23 02:15 PM",
//       shareTo: "Sales",
//       documentType: "GST Certificate",
//       document: "gst_certificate.pdf",
//     }
//   ]);
  
//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [data, setData] = useState([]);
//   const handleToggle = (iconName) => {
//     setActiveIcon(iconName);
//   };

//   const handleOutShare = () => {
//     setShowForm(true); 
//     setShowProjectTable(false); 
    
//     if (activeIcon === 'shared') {
//       setSharedWithMeRows([]); 
//     }
//   };

  
//   const handleCancel = () => {
//     setShowForm(false); 
//     setShowProjectTable(true); 
//   };

  
//   const handleShareToChange = (e, index) => {
//     const newRows = [...rows];
//     if (e.target.checked) {
//       newRows[index].shareTo = [...(newRows[index].shareTo || []), e.target.value];
//     } else {
//       newRows[index].shareTo = newRows[index].shareTo.filter((item) => item !== e.target.value);
//     }
//     setRows(newRows);
//   };

//   const handleChange = (event) => {
//     const { target: { value } } = event;
//     setSelectedItems(typeof value === 'string' ? value.split(',') : value);
//     handleShareToChange(event, index); // Ensure you call the provided handleShareToChange function
//   };

 
//   const options = [
//     'Sales',
//     'CRM',
//     'Admin',
//     'Legal',
//     'Engineering',
//     'Accounting',
//   ];

//   const handleDocumentTypeChange = (e, index) => {
//     const newRows = [...rows];
//     newRows[index].documentType = e.target.value;
//     setRows(newRows);
//   };


//   const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


//   // Handle file change
//   const handleFileChange = (e, index) => {
//     const newRows = [...rows];
//     newRows[index].document = e.target.files[0];
//     setRows(newRows);
//   };

//   // Add new row
//   const addRow = () => {
//     setRows([...rows, {}]);
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     // Handle the submit action (you can send data to the server or save it)
//     console.log(rows);
//     setShowForm(false);
//     setShowProjectTable(true);
//     console.log("data submitted ");
//     toast.success('Data submitted successfully!');
//   };

//   // Remove row
//   const handleRemoveRow = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   // Handle page change
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Handle rows per page change
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1); 
//   };

 
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sharedWithMeRows.slice(indexOfFirstRow, indexOfLastRow);

  
//   const totalPages = Math.ceil(sharedWithMeRows.length / rowsPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }



//   const handleDownloadPDFBooking = () => {
//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Firm Details Report", 14, 15);
  
//     const tableColumn = [
//       "PLANNED", "ACTUAL", "STATUS", "LOAN SECURITY", "TIME DELAY",
//       "ENQUIRY NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "EMAIL",
//       "OCCUPATION", "COMPANY", "INTERESTED IN", "BUDGET (APPROX.)",
//       "REASON FOR PURCHASE", "REFERENCE BY / SOURCE", "NAME OF CP",
//       "PLANNING TO BUY WITHIN ?", "CUSTOMER FEEDBACK"
//     ];
  
//     const tableRows = loans.map(row => [
//       row.planned || "-",
//       row.actual || "-",
//       row.status || "-",
//       row.loanSecurity || "-",
//       row.timeDelay || "-",
//       row.enquiryNo || "-",
//       row.salesExecutiveName || "-",
//       row.name || "-",
//       row.mobile || "-",
//       row.email || "-",
//       row.occupation || "-",
//       row.company || "-",
//       row.interestedIn || "-",
//       row.budget || "-",
//       row.reasonForPurchase || "-",
//       row.referenceBy || "-",
//       row.cpName || "-",
//       row.planningToBuyWithin || "-",
//       row.customerFeedback || "-"
//     ]);
  
//     console.log("Formatted Table Rows:", tableRows);
  
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 9, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//     });
  
//     doc.save("Booking_Status_Report.pdf");
//   };




//   return (
//     <div className="container my-4">
//       <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>


// <div className="d-flex align-items-center gap-4">
  
//   <div
//     className="d-flex align-items-center gap-2 p-2"
//     onClick={() => handleToggle('project')}
//     style={{
//       cursor: 'pointer',
//       borderRadius: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       transition: 'background 0.3s ease', 
//       background: activeIcon === 'project' ? Constants.primaryColor : '#f8f9fa', 
//       padding: '8px 16px', // Padding to space out icon and label
     
//     }}
//   >
//     <div
//       className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
//       style={{
//         background: activeIcon === 'project' ? 'white' : Constants.primaryColor, // Icon background changes to white when active
//         padding: '10px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <FaProjectDiagram size={26} color={activeIcon === 'project' ? Constants.primaryColor : 'white'} /> {/* Icon color changes based on active state */}
//     </div>
//     <div className=''>
//     <span
//       style={{
//         color: activeIcon === 'project' ? '#fff' :Constants.primaryColor, // Text color changes based on active state
//         fontSize: '16px',
//         marginLeft: '8px', // Space between icon and label
//       }}
//     >
//       Booking Status
//     </span>
//     </div>
  

  
//   </div>


//   {/* Share Icon and Label Together */}
//   <div
//     className="d-flex align-items-center gap-2 p-2"
//     onClick={() => handleToggle('shared')}
//     style={{
//       cursor: 'pointer',
//       borderRadius: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       transition: 'background 0.3s ease', // Smooth background transition
//       background: activeIcon === 'shared' ? Constants.primaryColor : '#f8f9fa', // Same background color for both
//       padding: '8px 16px', // Padding to space out icon and label
//       // borderRadius: '20px', // Rounded corners for the entire container
//     }}
//   >
//     <div
//       className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
//       style={{
//         background: activeIcon === 'shared' ? 'white' : Constants.primaryColor, // Icon background changes to white when active
//         padding: '10px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <FaShareAlt size={26} color={activeIcon === 'shared' ? '#3621a9' : 'white'} /> {/* Icon color changes based on active state */}
//     </div>
//     <span
//       style={{
//         color: activeIcon === 'shared' ? '#fff' : Constants.primaryColor, // Text color changes based on active state
//         fontSize: '16px',
//         marginLeft: '8px', // Space between icon and label
//       }}
//     >
//       Revisit Status
//     </span>
//   </div>
// </div>




// <div className='p-1 pt-3'>
//     <Button
//     variant="contained"
//     sx={{
//       background:Constants.primaryColor,
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: Constants.primaryColor,
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFBooking}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//     </div>
   

// {showProjectTable && activeIcon === 'project' && (
//   <div className="mt-4">
 
// <div>

// <BookingStatus data={data} />
//     </div>

//   </div>
// )}




// {activeIcon === 'shared' && (
//   <div className="mt-4">
  

// <RevisitStatusTable data={data} />

//   </div>
// )}


//     </div>
//   );
// };

// export default FirstVisitSteps;






import React, { useState } from "react";
import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from "react-icons/fa";

import { Button, useMediaQuery, useTheme } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import BookingStatus from "./BookingStatus";
import RevisitStatusTable from "./RevisitStatusTable";

import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import Constants from "../Constants";

const FirstVisitSteps = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [activeIcon, setActiveIcon] = useState("project");
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true);
  const [rows, setRows] = useState([{}]);

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
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const handleToggle = (iconName) => {
    setActiveIcon(iconName);
  };

  const handleOutShare = () => {
    setShowForm(true);
    setShowProjectTable(false);

    if (activeIcon === "shared") {
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
      newRows[index].shareTo = [
        ...(newRows[index].shareTo || []),
        e.target.value,
      ];
    } else {
      newRows[index].shareTo = newRows[index].shareTo.filter(
        (item) => item !== e.target.value
      );
    }
    setRows(newRows);
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
    doc.text("Booking Status Report", 14, 15);

    // Split columns into two groups to handle the wide table
    const tableColumnPage1 = [
      "PLANNED",
      "ACTUAL",
      "STATUS",
      "LOAN SECURITY",
      "TIME DELAY",
      "ENQUIRY NO.",
      "SALES EXECUTIVE NAME",
      "NAME",
      "MOBILE",
      "WHATSAPP NO.",
      "ALTERNATE CONTACT NO.",
      "EMAIL",
    ];

    const tableColumnPage2 = [
      "ADDRESS",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET (APPROX.)",
      "REASON FOR PURCHASE",
      "REFERENCE BY / SOURCE",
      "NAME OF CP",
      "PLANNING TO BUY WITHIN ?",
      "CUSTOMER FEEDBACK",
    ];

    // Format the data for PDF - Page 1
    const tableRowsPage1 = data.map((row) => [
      row.planned || "-",
      row.actual || "-",
      row.status || "-",
      row.loanSecurity || "-",
      row.timeDelay || "-",
      row.enquiryNo || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
      row.mobile || "-",
      row.whatsappNo || "-",
      row.alternateContactNo || "-",
      row.email || "-",
    ]);

    // Format the data for PDF - Page 2
    const tableRowsPage2 = data.map((row) => [
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.referenceBy || "-",
      row.cpName || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-",
    ]);

    // First page
    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [139, 107, 255],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      margin: { left: 5, right: 5 },
    });

    // Add a new page for the second set of columns
    doc.addPage("landscape");
    doc.text("Booking Status Report - Page 2", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [139, 107, 255],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      margin: { left: 5, right: 5 },
    });

    doc.save("Booking_Status_Report.pdf");
  };
  const handleDownloadPDFRevisit = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Revisit Status Report", 14, 15);

    // Split columns into two groups to handle the wide table
    const tableColumnPage1 = [
      "PLANNED",
      "TIME DELAY",
      "STATUS",
      "ACTUAL TIMESTAMP",
      "ENQUIRY NO.",
      "TIMESTAMP",
      "SALES EXECUTIVE NAME",
      "NAME",
      "MOBILE",
      "WHATSAPP NO.",
      "ALTERNATE CONTACT NO.",
      "EMAIL",
    ];

    const tableColumnPage2 = [
      "ADDRESS",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET (APPROX.)",
      "REASON FOR PURCHASE",
      "REFERENCE BY / SOURCE",
      "NAME OF CP",
      "PLANNING TO BUY WITHIN ?",
      "CUSTOMER FEEDBACK",
    ];

    // Format the data for PDF - Page 1
    const tableRowsPage1 = data.map((row) => [
      row.planned || "-",
      row.timeDelay || "-",
      row.status || "-",
      row.actualTimestamp || "-",
      row.enquiryNo || "-",
      row.timestamp || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
      row.mobile || "-",
      row.whatsappNo || "-",
      row.alternateContactNo || "-",
      row.email || "-",
    ]);

    // Format the data for PDF - Page 2
    const tableRowsPage2 = data.map((row) => [
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.referenceBy || "-",
      row.cpName || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-",
    ]);

    // First page
    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [139, 107, 255],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      margin: { left: 5, right: 5 },
    });

    // Add a new page for the second set of columns
    doc.addPage("landscape");
    doc.text("Revisit Status Report - Page 2", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [139, 107, 255],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      margin: { left: 5, right: 5 },
    });

    doc.save("Revisit_Status_Report.pdf");
  };

  return (
    <div className="container my-4">
      <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>

      {/* Main row containing both navigation buttons and download button */}
      <div
        className={`d-flex ${
          isMobile
            ? "flex-column"
            : "align-items-center justify-content-between"
        } gap-3 mb-3`}
      >
        {/* Navigation buttons container */}
        <div
          className={`d-flex ${
            isMobile ? "flex-column" : "align-items-center"
          } gap-3`}
          style={{ flex: 1 }}
        >
          {/* Booking Status Icon */}
          <div
            className="d-flex align-items-center p-2"
            onClick={() => handleToggle("project")}
            style={{
              cursor: "pointer",
              borderRadius: "20px",
              transition: "background 0.3s ease",
              background:
                activeIcon === "project" ? Constants.primaryColor : "null",
              padding: isMobile ? "6px 12px" : "8px 16px",
              width: isMobile
                ? "100%"
                : activeIcon === "project"
                ? isTablet
                  ? "200px"
                  : "220px"
                : "auto",
              minWidth: isMobile ? "auto" : "50px",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
              style={{
                background:
                  activeIcon === "project" ? "white" : Constants.primaryColor,
                padding: isMobile ? "8px" : "10px",
              }}
            >
              <FaProjectDiagram
                size={isMobile ? 20 : 26}
                color={
                  activeIcon === "project" ? Constants.primaryColor : "white"
                }
              />
            </div>
            {activeIcon === "project" && (
              <span
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "14px" : "16px",
                  marginLeft: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Booking Status
              </span>
            )}
          </div>

          {/* Revisit Status Icon */}
          <div
            className="d-flex align-items-center p-2"
            onClick={() => handleToggle("shared")}
            style={{
              cursor: "pointer",
              borderRadius: "20px",
              transition: "background 0.3s ease",
              background:
                activeIcon === "shared" ? Constants.primaryColor : "null",
              padding: isMobile ? "6px 12px" : "8px 16px",
              width: isMobile
                ? "100%"
                : activeIcon === "shared"
                ? isTablet
                  ? "200px"
                  : "220px"
                : "auto",
              minWidth: isMobile ? "auto" : "50px",
              justifyContent: isMobile ? "center" : "flex-start",
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
              style={{
                background:
                  activeIcon === "shared" ? "white" : Constants.primaryColor,
                padding: isMobile ? "8px" : "10px",
              }}
            >
              <FaShareAlt
                size={isMobile ? 20 : 26}
                color={
                  activeIcon === "shared" ? Constants.primaryColor : "white"
                }
              />
            </div>
            {activeIcon === "shared" && (
              <span
                style={{
                  color: "#fff",
                  fontSize: isMobile ? "14px" : "16px",
                  marginLeft: "8px",
                  whiteSpace: "nowrap",
                }}
              >
                Revisit Status
              </span>
            )}
          </div>
        </div>

        {/* Download PDF Button - Right aligned */}
        <div className={isMobile ? "mt-2" : ""}>
          <Button
            variant="contained"
            sx={{
              background: Constants.primaryColor,
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              padding: isMobile ? "6px 12px" : "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              "&:hover": {
                background: Constants.primaryColor,
              },
              width: isMobile ? "100%" : "auto",
            }}
            onClick={
              activeIcon === "project"
                ? handleDownloadPDFBooking
                : handleDownloadPDFRevisit
            }
            size={isMobile ? "small" : "medium"}
          >
            <FaFileDownload size={isMobile ? 16 : 18} />
            {isMobile ? "Download PDF" : "Download PDF"}
          </Button>
        </div>
      </div>

      {showProjectTable && activeIcon === "project" && (
        <div className="mt-4">
          <BookingStatus data={data} isMobile={isMobile} isTablet={isTablet} />
        </div>
      )}

      {activeIcon === "shared" && (
        <div className="mt-4">
          <RevisitStatusTable
            data={data}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        // rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default FirstVisitSteps;