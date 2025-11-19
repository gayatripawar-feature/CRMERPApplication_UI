
// import React, { useState } from "react";
// import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from "react-icons/fa";

// import { Button, useMediaQuery, useTheme } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import BookingStatus from "./BookingStatus";
// import RevisitStatusTable from "./RevisitStatusTable";

// import { jsPDF } from "jspdf";
// import { FaFileDownload } from "react-icons/fa";
// import autoTable from "jspdf-autotable";
// import Constants from "../Constants";

// const FirstVisitSteps = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
//   const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

//   const [activeIcon, setActiveIcon] = useState("project");
//   const [showForm, setShowForm] = useState(false);
//   const [showProjectTable, setShowProjectTable] = useState(true);
//   const [rows, setRows] = useState([{}]);

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
//     },
//   ]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [data, setData] = useState([]);

//   const handleToggle = (iconName) => {
//     setActiveIcon(iconName);
//   };

//   const handleOutShare = () => {
//     setShowForm(true);
//     setShowProjectTable(false);

//     if (activeIcon === "shared") {
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
//       newRows[index].shareTo = [
//         ...(newRows[index].shareTo || []),
//         e.target.value,
//       ];
//     } else {
//       newRows[index].shareTo = newRows[index].shareTo.filter(
//         (item) => item !== e.target.value
//       );
//     }
//     setRows(newRows);
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
//     doc.text("Booking Status Report", 14, 15);

//     // Split columns into two groups to handle the wide table
//     const tableColumnPage1 = [
//       "PLANNED",
//       "ACTUAL",
//       "STATUS",
//       "LOAN SECURITY",
//       "TIME DELAY",
//       "ENQUIRY NO.",
//       "SALES EXECUTIVE NAME",
//       "NAME",
//       "MOBILE",
//       "WHATSAPP NO.",
//       "ALTERNATE CONTACT NO.",
//       "EMAIL",
//     ];

//     const tableColumnPage2 = [
//       "ADDRESS",
//       "OCCUPATION",
//       "COMPANY",
//       "INTERESTED IN",
//       "BUDGET (APPROX.)",
//       "REASON FOR PURCHASE",
//       "REFERENCE BY / SOURCE",
//       "NAME OF CP",
//       "PLANNING TO BUY WITHIN ?",
//       "CUSTOMER FEEDBACK",
//     ];

//     // Format the data for PDF - Page 1
//     const tableRowsPage1 = data.map((row) => [
//       row.planned || "-",
//       row.actual || "-",
//       row.status || "-",
//       row.loanSecurity || "-",
//       row.timeDelay || "-",
//       row.enquiryNo || "-",
//       row.salesExecutiveName || "-",
//       row.name || "-",
//       row.mobile || "-",
//       row.whatsappNo || "-",
//       row.alternateContactNo || "-",
//       row.email || "-",
//     ]);

//     // Format the data for PDF - Page 2
//     const tableRowsPage2 = data.map((row) => [
//       row.address || "-",
//       row.occupation || "-",
//       row.company || "-",
//       row.interestedIn || "-",
//       row.budget || "-",
//       row.reasonForPurchase || "-",
//       row.referenceBy || "-",
//       row.cpName || "-",
//       row.planningToBuyWithin || "-",
//       row.customerFeedback || "-",
//     ]);

//     // First page
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumnPage1],
//       body: tableRowsPage1,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//         overflow: "linebreak",
//       },
//       headStyles: {
//         fillColor: [139, 107, 255],
//         textColor: [255, 255, 255],
//         fontSize: 9,
//       },
//       margin: { left: 5, right: 5 },
//     });

//     // Add a new page for the second set of columns
//     doc.addPage("landscape");
//     doc.text("Booking Status Report - Page 2", 14, 15);

//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumnPage2],
//       body: tableRowsPage2,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//         overflow: "linebreak",
//       },
//       headStyles: {
//         fillColor: [139, 107, 255],
//         textColor: [255, 255, 255],
//         fontSize: 9,
//       },
//       margin: { left: 5, right: 5 },
//     });

//     doc.save("Booking_Status_Report.pdf");
//   };
//   const handleDownloadPDFRevisit = () => {
//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Revisit Status Report", 14, 15);

//     // Split columns into two groups to handle the wide table
//     const tableColumnPage1 = [
//       "PLANNED",
//       "TIME DELAY",
//       "STATUS",
//       "ACTUAL TIMESTAMP",
//       "ENQUIRY NO.",
//       "TIMESTAMP",
//       "SALES EXECUTIVE NAME",
//       "NAME",
//       "MOBILE",
//       "WHATSAPP NO.",
//       "ALTERNATE CONTACT NO.",
//       "EMAIL",
//     ];

//     const tableColumnPage2 = [
//       "ADDRESS",
//       "OCCUPATION",
//       "COMPANY",
//       "INTERESTED IN",
//       "BUDGET (APPROX.)",
//       "REASON FOR PURCHASE",
//       "REFERENCE BY / SOURCE",
//       "NAME OF CP",
//       "PLANNING TO BUY WITHIN ?",
//       "CUSTOMER FEEDBACK",
//     ];

//     // Format the data for PDF - Page 1
//     const tableRowsPage1 = data.map((row) => [
//       row.planned || "-",
//       row.timeDelay || "-",
//       row.status || "-",
//       row.actualTimestamp || "-",
//       row.enquiryNo || "-",
//       row.timestamp || "-",
//       row.salesExecutiveName || "-",
//       row.name || "-",
//       row.mobile || "-",
//       row.whatsappNo || "-",
//       row.alternateContactNo || "-",
//       row.email || "-",
//     ]);

//     // Format the data for PDF - Page 2
//     const tableRowsPage2 = data.map((row) => [
//       row.address || "-",
//       row.occupation || "-",
//       row.company || "-",
//       row.interestedIn || "-",
//       row.budget || "-",
//       row.reasonForPurchase || "-",
//       row.referenceBy || "-",
//       row.cpName || "-",
//       row.planningToBuyWithin || "-",
//       row.customerFeedback || "-",
//     ]);

//     // First page
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumnPage1],
//       body: tableRowsPage1,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//         overflow: "linebreak",
//       },
//       headStyles: {
//         fillColor: [139, 107, 255],
//         textColor: [255, 255, 255],
//         fontSize: 9,
//       },
//       margin: { left: 5, right: 5 },
//     });

//     // Add a new page for the second set of columns
//     doc.addPage("landscape");
//     doc.text("Revisit Status Report - Page 2", 14, 15);

//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumnPage2],
//       body: tableRowsPage2,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//         overflow: "linebreak",
//       },
//       headStyles: {
//         fillColor: [139, 107, 255],
//         textColor: [255, 255, 255],
//         fontSize: 9,
//       },
//       margin: { left: 5, right: 5 },
//     });

//     doc.save("Revisit_Status_Report.pdf");
//   };

//   return (
//     <div className="container my-4">
//       <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>

//       {/* Main row containing both navigation buttons and download button */}
//       <div
//         className={`d-flex ${
//           isMobile
//             ? "flex-column"
//             : "align-items-center justify-content-between"
//         } gap-3 mb-3`}
//       >
//         {/* Navigation buttons container */}
//         <div
//           className={`d-flex ${
//             isMobile ? "flex-column" : "align-items-center"
//           } gap-3`}
//           style={{ flex: 1 }}
//         >
//           {/* Booking Status Icon */}
//           <div
//             className="d-flex align-items-center p-2"
//             onClick={() => handleToggle("project")}
//             style={{
//               cursor: "pointer",
//               borderRadius: "20px",
//               transition: "background 0.3s ease",
//               background:
//                 activeIcon === "project" ? Constants.primaryColor : "null",
//               padding: isMobile ? "6px 12px" : "8px 16px",
//               width: isMobile
//                 ? "100%"
//                 : activeIcon === "project"
//                 ? isTablet
//                   ? "200px"
//                   : "220px"
//                 : "auto",
//               minWidth: isMobile ? "auto" : "50px",
//               justifyContent: isMobile ? "center" : "flex-start",
//             }}
//           >
//             <div
//               className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
//               style={{
//                 background:
//                   activeIcon === "project" ? "white" : Constants.primaryColor,
//                 padding: isMobile ? "8px" : "10px",
//               }}
//             >
//               <FaProjectDiagram
//                 size={isMobile ? 20 : 26}
//                 color={
//                   activeIcon === "project" ? Constants.primaryColor : "white"
//                 }
//               />
//             </div>
//             {activeIcon === "project" && (
//               <span
//                 style={{
//                   color: "#fff",
//                   fontSize: isMobile ? "14px" : "16px",
//                   marginLeft: "8px",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 Booking Status
//               </span>
//             )}
//           </div>

//           {/* Revisit Status Icon */}
//           <div
//             className="d-flex align-items-center p-2"
//             onClick={() => handleToggle("shared")}
//             style={{
//               cursor: "pointer",
//               borderRadius: "20px",
//               transition: "background 0.3s ease",
//               background:
//                 activeIcon === "shared" ? Constants.primaryColor : "null",
//               padding: isMobile ? "6px 12px" : "8px 16px",
//               width: isMobile
//                 ? "100%"
//                 : activeIcon === "shared"
//                 ? isTablet
//                   ? "200px"
//                   : "220px"
//                 : "auto",
//               minWidth: isMobile ? "auto" : "50px",
//               justifyContent: isMobile ? "center" : "flex-start",
//             }}
//           >
//             <div
//               className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
//               style={{
//                 background:
//                   activeIcon === "shared" ? "white" : Constants.primaryColor,
//                 padding: isMobile ? "8px" : "10px",
//               }}
//             >
//               <FaShareAlt
//                 size={isMobile ? 20 : 26}
//                 color={
//                   activeIcon === "shared" ? Constants.primaryColor : "white"
//                 }
//               />
//             </div>
//             {activeIcon === "shared" && (
//               <span
//                 style={{
//                   color: "#fff",
//                   fontSize: isMobile ? "14px" : "16px",
//                   marginLeft: "8px",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 Revisit Status
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Download PDF Button - Right aligned */}
//         <div className={isMobile ? "mt-2" : ""}>
//           <Button
//             variant="contained"
//             sx={{
//               background: Constants.primaryColor,
//               color: "white",
//               fontWeight: "bold",
//               textTransform: "none",
//               padding: isMobile ? "6px 12px" : "8px 16px",
//               borderRadius: "8px",
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               "&:hover": {
//                 background: Constants.primaryColor,
//               },
//               width: isMobile ? "100%" : "auto",
//             }}
//             onClick={
//               activeIcon === "project"
//                 ? handleDownloadPDFBooking
//                 : handleDownloadPDFRevisit
//             }
//             size={isMobile ? "small" : "medium"}
//           >
//             <FaFileDownload size={isMobile ? 16 : 18} />
//             {isMobile ? "Download PDF" : "Download PDF"}
//           </Button>
//         </div>
//       </div>

//       {showProjectTable && activeIcon === "project" && (
//         <div className="mt-4">
//           <BookingStatus data={data} isMobile={isMobile} isTablet={isTablet} />
//         </div>
//       )}

//       {activeIcon === "shared" && (
//         <div className="mt-4">
//           <RevisitStatusTable
//             data={data}
//             isMobile={isMobile}
//             isTablet={isTablet}
//           />
//         </div>
//       )}

//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         // rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//     </div>
//   );
// };

// export default FirstVisitSteps;















import React, { useState, useEffect, useMemo } from "react";
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
  const [data, setData] = useState([]);
  // ---------- ADD below other useState declarations ----------
const [searchTerm, setSearchTerm] = useState("");
const [rowsPerPage, setRowsPerPage] = useState(10);

// If you want server-side search, set this to a prop or URL string.
// Example: pass searchEndpoint as a prop or replace with "/api/enquiry/search"
const searchEndpoint = undefined;

const [serverResults, setServerResults] = useState(null);
const [searchLoading, setSearchLoading] = useState(false);
// ------------------------------------------------------------------



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
// ---------- REPLACE previous filteredData with this ----------
const filteredData = useMemo(() => {
  if (serverResults !== null) return serverResults;
  if (!searchTerm) return data;

  const q = searchTerm.trim().toLowerCase();

  return data.filter((item) => {
    const enquiryNo = item.enquiryNo ? String(item.enquiryNo).toLowerCase() : "";
    const name = item.name ? String(item.name).toLowerCase() : "";

    if (enquiryNo.includes(q) || name.includes(q)) return true;

    return Object.values(item).some((v) =>
      String(v || "").toLowerCase().includes(q)
    );
  });
}, [data, searchTerm, serverResults]);
// ------------------------------------------------------------------


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

 // ---------- ADD: debounced server-side search effect ----------
useEffect(() => {
  if (!searchEndpoint) {
    setServerResults(null);
    return;
  }
  if (!searchTerm) {
    setServerResults(null);
    setSearchLoading(false);
    return;
  }

  const controller = new AbortController();
  const id = setTimeout(() => {
    setSearchLoading(true);
    fetch(`${searchEndpoint}?q=${encodeURIComponent(searchTerm)}&limit=200`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((json) => {
        if (Array.isArray(json)) setServerResults(json);
        else if (json && Array.isArray(json.data)) setServerResults(json.data);
        else setServerResults([]);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("Search error:", err);
        setServerResults([]);
      })
      .finally(() => setSearchLoading(false));
  }, 400);

  return () => {
    clearTimeout(id);
    controller.abort();
  };
}, [searchTerm, searchEndpoint]);
// ------------------------------------------------------------------

  const indexOfLastRow = currentPage * rowsPerPage;
const indexOfFirstRow = indexOfLastRow - rowsPerPage;
const paginatedData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
// Handlers for the styled rows-per-page block (keep currentPage as 1-based)
const handleChangeRowsPerPage = (e) => {
  const next = Number(e.target.value);
  setRowsPerPage(next);
  setCurrentPage(1); // reset to first page (1-based)
};

const handlePrevPage = () => {
  setCurrentPage((p) => Math.max(1, p - 1));
};

const handleNextPage = () => {
  // totalPages is computed later; ensure variable exists in scope (see below)
  setCurrentPage((p) => (p < totalPages ? p + 1 : p));
};

const totalPages = Math.ceil(filteredData.length / rowsPerPage);

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
  fillColor: [128, 0, 32], // #800020
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
  fillColor: [128, 0, 32], // #800020
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
  fillColor: [128, 0, 32], // #800020
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
  fillColor: [128, 0, 32], // #800020
  textColor: [255, 255, 255],
  fontSize: 9,
},

      margin: { left: 5, right: 5 },
    });

    doc.save("Revisit_Status_Report.pdf");
  };

  return (
    <div className="container my-1">
      <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>

      {/* Main row containing both navigation buttons and download button */}
      <div
        className={`d-flex ${
          isMobile
            ? "flex-column"
            : "align-items-center justify-content-between"
        } gap-3 mb-1`}
      >
        {/* Navigation buttons container */}
<div
  className={`d-flex ${
    isMobile
      ? "flex-column"
      : "align-items-center justify-content-between"
  } gap-3`}
  style={{
    marginBottom: "1px",
    alignItems: isMobile ? "flex-start" : "center" // <-- ensures left alignment on mobile
  }}
>

          {/* Booking Status Icon */}
{/* SMALL Booking Status Button */}
<div
  onClick={() => handleToggle("project")}
  style={{
    cursor: "pointer",
    background: activeIcon === "project" ? Constants.primaryColor : "#f2f2f2",
    padding: isMobile ? "10px 10px" : "10px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "auto",
    minHeight: 46
  }}
>
  <FaProjectDiagram
    size={isMobile ? 14 : 16}
    color={activeIcon === "project" ? "#fff" : Constants.primaryColor}
  />

  {activeIcon === "project" && (
    <span
      style={{
        color: "#fff",
        fontSize: isMobile ? "13px" : "14px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      Booking Status
    </span>
  )}
</div>

          {/* Revisit Status Icon */}
{/* SMALL Revisit Status Button */}
<div
  onClick={() => handleToggle("shared")}
  style={{
    cursor: "pointer",
    background: activeIcon === "shared" ? Constants.primaryColor : "#f2f2f2",
    padding: isMobile ? "6px 10px" : "6px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "auto",
    minHeight: 46
  }}
>
  <FaShareAlt
    size={isMobile ? 14 : 16}
    color={activeIcon === "shared" ? "#fff" : Constants.primaryColor}
  />

  {activeIcon === "shared" && (
    <span
      style={{
        color: "#fff",
        fontSize: isMobile ? "14px" : "14px",
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      Revisit Status
    </span>
  )}
</div>


        </div>

        {/* Download PDF Button - Right aligned */}
        <div className={isMobile ? "mt-6" : ""}>
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
            <FaFileDownload size={isMobile ? 18 : 18} />
            {isMobile ? "Download PDF" : "Download PDF"}
          </Button>
        </div>
      </div>
<div
  style={{
    display: "flex",
    marginTop:"8px",
    alignItems: "center",
    gap: isMobile ? 6 : 6,  // smaller gap
    flexWrap: "nowrap",
    justifyContent: "flex-end",
    width: isMobile ? "100%" : "auto",
  }}
>
  {/* Search box */}
  <input
    type="text"
    placeholder="Search"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      width: isMobile ? "100%" : 140,   // made narrower
      padding: "8px 8px",               // smaller padding
      border: `1px solid ${Constants.primaryColor}`,
      borderRadius: 4,
      fontSize: isMobile ? 12 : 13,     // smaller text
    }}
  />

  {/* Rows per page */}
  <label
    style={{
      fontWeight: 500,
      whiteSpace: "nowrap",
      fontSize: isMobile ? 12 : 13,
      marginLeft: 4,
    }}
  >
    Rows per page:
  </label>

  <select
    style={{
      border: "1px solid #800020",
      borderRadius: 4,
      padding: "4px 6px",
      width: isMobile ? 45 : 55,   // smaller width
      fontSize: isMobile ? 12 : 13,
      height: isMobile ? 26 : 30,  // shorter height
      background: "white",
    }}
    value={rowsPerPage}
    onChange={handleChangeRowsPerPage}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={25}>25</option>
  </select>

  {/* 0–0 of 0 */}
  <span
    style={{
      whiteSpace: "nowrap",
      fontSize: isMobile ? 11 : 12,
      marginLeft: 4,         // very tiny space
      marginRight: 4,
    }}
  >
    {filteredData.length === 0
      ? "0-0 of 0"
      : `${indexOfFirstRow + 1}-${Math.min(indexOfLastRow, filteredData.length)} of ${filteredData.length}`}
  </span>

  {/* Prev button */}
  <button
    onClick={handlePrevPage}
    disabled={currentPage === 1 || filteredData.length === 0}
    style={{
      border: "none",
      background: "transparent",
      color:
        currentPage === 1 || filteredData.length === 0 ? "lightgray" : "gray",
      fontSize: 18,
      cursor: currentPage === 1 ? "default" : "pointer",
      padding: "2px 4px",
    }}
  >
    &#8249;
  </button>

  {/* Next button */}
  <button
    onClick={handleNextPage}
    disabled={currentPage >= totalPages || filteredData.length === 0}
    style={{
      border: "none",
      background: "transparent",
      color:
        currentPage >= totalPages || filteredData.length === 0
          ? "lightgray"
          : "gray",
      fontSize: 18,
      cursor: currentPage >= totalPages ? "default" : "pointer",
      padding: "2px 4px",
    }}
  >
    &#8250;
  </button>






    

  </div>


      {showProjectTable && activeIcon === "project" && (
<div style={{ marginTop: "20px" }}>
<BookingStatus
  data={data}
  isMobile={isMobile}
  isTablet={isTablet}
  showPagination={false}   // <- add this
/>
        </div>
      )}

      {activeIcon === "shared" && (
<div style={{ marginTop: "20px" }}>
<RevisitStatusTable
  data={data}
  isMobile={isMobile}
  isTablet={isTablet}
  showPagination={false}
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