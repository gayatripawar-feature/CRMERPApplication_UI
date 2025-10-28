import React, { useState, useEffect } from 'react';
import {TextField, Grid, useMediaQuery, useTheme,} from '@mui/material';
import {  FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import Leadsfollowup_followuphistory from './leadsfollowup_followuphistory';
import UndefinedTable from './UndefinedTable';
import BookedTable from './BookedTable';
import PendingFollowuptable from './PendingFollowuptable';
import { AiOutlineProject } from 'react-icons/ai';
import { MdLocationCity } from 'react-icons/md';
import { GiHouseKeys } from 'react-icons/gi';
import { FaUsers } from 'react-icons/fa';
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Constants from '../Constants';
const sections = [
  { label: "Pending Follow Up", icon: <FaUsers size={20} />, createLabel: "Create Firm" },
  { label: "Follow Up History", icon: <AiOutlineProject size={20} />, createLabel: "Create Project" },
  { label: "Undefined", icon: <MdLocationCity size={20} />, createLabel: "Create Landowner Info" },
  { label: "Visit Scheduled", icon: <GiHouseKeys size={20} />, createLabel: "Create Flat Allotment Info" },
];
// const tabNames = ["pendingfollowup", "followuphistory", "undefined", "visit"];
const LeadsFollowUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  // const [loans, setLoans] = useState([]);
  const[leads,setLeads] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [selectedTab, setSelectedTab] = useState("pendingfollowup");
  // const [projectData, setProjectData] = useState([]);
  // const [FlatAllotement, setFlatAllotement] = useState([false]);
//  const [Flatdata, setFlatdata] = useState([]);
 const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

  const handleToggleSection = (index) => {
    if (sections[index].label === "Download PDF") {
      handleDownloadPDF();
      return;
    }
    console.log("Clicked Section Index:", index);
    console.log("Selected Tab Before Update:", selectedTab);
    setExpandedSection(index);
   if (sections[index].label === "Follow Up History") {
      setSelectedTab("followuphistory");
    } else if (sections[index].label === "Pending Follow Up") {
      setSelectedTab("pendingfollowup");
    } else if (sections[index].label === "Undefined") {
      setSelectedTab("undefined");
    } else if (sections[index].label === "Visit Scheduled") {
      setSelectedTab("visit");
    }
     };

 
const handleDownloadPDFPending = () => {
    
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Pending Follow-up Report", 14, 15);
    // Define new table columns
    const tableColumn = [
      "Last Follow Up", "Status", "Remark", "Next Follow Up",
      "Assign To", "Lead No.", "Name", "Mobile No. / WhatsApp No.",
      "You Are Looking For?", "Email", "Source Name"
    ];
   // Map data into rows
    const tableRows = leads.map(row => [
      row.lastFollowUp || "-",
      row.status || "-",
      row.remark || "-",
      row.nextFollowUp || "-",
      row.assignTo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.lookingFor || "-",
      row.email || "-",
      row.sourceName || "-"
    ]);
  console.log("Formatted Table Rows:", tableRows);
  autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  doc.save("PendingFollowup_Report.pdf");
  };
const handleDownloadPDFHistory = () => {
    console.log("Leads data before mapping:", leads);
   const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Follow-up History Report", 14, 15);
    // Columns for the first page
    const firstPageColumns = [
      "STATUS HISTORY", "REMARK HISTORY", "ASSIGN TO HISTORY", "LEAD DAYS", "TIMESTAMP",
      "ENQUIRY NO", "LEAD NO.", "SALES EXECUTIVE NAME", "NAME", "MOBILE", "WHATSAPP NO."
    ];
   // Columns for the second page
    const secondPageColumns = [
      "EMAIL", "ADDRESS", "OCCUPATION", "COMPANY",
      "INTERESTED IN", "BUDGET (APPROX.)", "REASON FOR PURCHASE", "REFERENCE BY / SOURCE",
      "NAME OF CP ", "PLANNING TO BUY WITHIN?", "CUSTOMER FEEDBACK"
    ];
   // Limit the number of rows to fit within 2 pages
    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage * 2);
 // Mapping data for the first page
    const firstPageRows = leads.slice(0, totalRows).map(row => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.assignToHistory || "-",
      row.leadDays || "-",
      row.timestamp || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
      row.mobile || "-"
    ]);
 // Mapping data for the second page
    const secondPageRows = leads.slice(0, totalRows).map(row => [
      row.whatsappNo || "-",
      row.alternateContactNo || "-",
      row.email || "-",
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budgetApprox || "-",
      row.reasonForPurchase || "-",
      row.referenceBySource || "-",
      row.nameOfCP || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-"
    ]);

    console.log("Formatted Table Rows for First Page:", firstPageRows);
    console.log("Formatted Table Rows for Second Page:", secondPageRows);
// Generate the first page
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 }
    });
// Add a new page for the remaining columns
    doc.addPage();
    doc.text("Pending Follow-up Report (Continued)", 14, 15);

    // Generate the second page
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 }
    });
  doc.save("Followup_History_Report.pdf");
  };
  const handleDownloadPDFUndefined = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Undefined Report", 14, 15);
     // Merged columns for a single page
    const tableColumns = [
      "STATUS HISTORY", "REMARK HISTORY", "LEAD NO", "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME"
    ];

    // Limit the number of rows to fit within one page
    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage);

    // Mapping data for the table
    const tableRows = leads.slice(0, totalRows).map(row => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.lookingFor || "-",
      row.email || "-",
      row.sourceName || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);

    // Generate the table on a single page
    autoTable(doc, {
      startY: 25,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 }
    });

    doc.save("Undefined_Report.pdf");
  };

  const handleDownloadPDFVisit = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Visit Scheduled Report", 14, 15);


    const tableColumns = [
      "TIMESTAMP", "LEAD NO.", "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME", "LOCATION"
    ];


    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage);

    const tableRows = leads.slice(0, totalRows).map(row => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.lookingFor || "-",
      row.email || "-",
      row.sourceName || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);


    autoTable(doc, {
      startY: 25,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 }
    });

    doc.save("VisitScheduled_Report.pdf");
  };

 


    // Filter records based on startDate, endDate, and searchTerm
const filteredRecords = leads.filter(lead => {
  const nextFollowUp = lead.nextFollowUp ? dayjs(lead.nextFollowUp) : null;

  const isWithinDateRange = nextFollowUp
    ? (!startDate || nextFollowUp.isSameOrAfter(startDate, 'day')) &&
      (!endDate || nextFollowUp.isSameOrBefore(endDate, 'day'))
    // : false; // if no nextFollowUp date, exclude it
    :true //show all when no date range applied

  const matchesSearch = searchTerm
    ? lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.leadNo && lead.leadNo.toString().includes(searchTerm))
    : true;

  return isWithinDateRange && matchesSearch;
}); 

  return (
    <div className="container my-2">
      <h6 className="mb-3 fs-6">Sales Module / Lead Follow Up Management</h6>
<div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3" 
 style={{
    justifyContent: "space-between", 
    width: "100%",
  }}
>

<div className="d-flex flex-wrap">
  {sections.map((section, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Constants.primaryColor,
        padding: '8px',
        borderRadius: '20px',
        margin: '5px',
        cursor: 'pointer',
        transition: "width 0.3s ease, background 0.3s ease",
        width: expandedSection === index ? (isMobile ? "180px" : "220px") : "50px",
        minWidth: "50px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: isMobile ? "12px" : "14px",
        justifyContent: "center",
        textTransform: "none",
        position: "relative",
        background: Constants.primaryColor,
        boxShadow:
          "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
      }}
      onClick={() => handleToggleSection(index)}
    >
      {React.cloneElement(section.icon, {
        style: {
          marginRight: expandedSection === index ? '8px' : '0',
          fontSize: isMobile ? '16px' : (expandedSection === index ? '20px' : '20px'),
          color: '#fff',
          transition: "font-size 0.3s ease",
        }
      })}

      {expandedSection === index ? (
        <span className="p-1 fw-bold" style={{
          color: 'white',
          marginLeft: '5px',
          fontSize: isMobile ? '12px' : '14px'
        }}>
          {section.label}
        </span>
      ) : null}
    </div>
  ))}
</div>


  <button
    className="btn"
    onClick={() => {
      if (selectedTab === "pendingfollowup") handleDownloadPDFPending();
      else if (selectedTab === "followuphistory") handleDownloadPDFHistory();
      else if (selectedTab === "undefined") handleDownloadPDFUndefined();
      else if (selectedTab === "visit") handleDownloadPDFVisit();
    }}
    style={{
      backgroundColor: Constants.primaryColor,
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "20px",
      padding: isMobile ? "6px 12px" : "8px 16px",
      margin: "5px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    }}
  >
    <FaFileDownload size={isMobile ? 16 : 18} />
    {isMobile ? "PDF" : "Download PDF"}
  </button>
  </div>
<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "10px",
    gap: "10px",
  }}
>
  {/*  Left side — Date Range */}
  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <DatePicker
  label="Start Date"
  value={startDate}
  onChange={(newValue) => setStartDate(newValue)}
  slotProps={{
    textField: {
      size: "small",
      sx: {
        width: "150px",
        "& .MuiInputBase-root": {
          border: `0px solid ${Constants.primaryColor}`, // ✅ primary color border
          borderRadius: "4px", 
          padding: "0px 8px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor, 
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor,
        },
        "& .MuiInputLabel-root": {
          color: Constants.primaryColor,
        },
        "& .MuiInputBase-input": {
          color: Constants.primaryColor,
        },
      },
    },
  }}
/>

      <DatePicker
  label="End Date"
  value={endDate}
  onChange={(newValue) => setEndDate(newValue)}
  slotProps={{
    textField: {
      size: "small",
      sx: {
        width: "150px",
        "& .MuiInputBase-root": {
          border: `0px solid ${Constants.primaryColor}`, 
          borderRadius: "4px",
          padding: "0px 8px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor, 
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: Constants.primaryColor,
        },
      },
    },
  }}
/>

    </LocalizationProvider>
  </div>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      flexWrap: "wrap",
    }}
  >
  
    <TextField
      size="small"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        width:"180px",
        "& .MuiInputBase-root": { padding: "0px 8px" },
        border: Constants.formInputBorderColor,
      }}
    />

   
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#800000", 
    justifyContent: "flex-end",
    marginTop: "8px",
  }}
>
  <span style={{ fontWeight: "500" }}>Rows per page:</span>

  <select
    style={{
      border: "1px solid #800000",
      borderRadius: "4px",
      padding: "2px 6px",
      outline: "none",
      color: "#800000",
    }}
    defaultValue={5}
  >
    <option value={5}>5</option>
    <option value={10}>10</option>
    <option value={25}>25</option>
  </select>

  <span>0–0 of 0 entries</span>

  {/* Navigation arrows */}
  <button
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "gray",
      fontSize: "18px",
      padding: "0 4px",
    }}
  >
    &#8249;
  </button>
  <button
    style={{
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "gray",
      fontSize: "18px",
      padding: "0 4px",
    }}
  >
    &#8250;
  </button>
</div>

  </div>
</div>


  
     
      {expandedSection === 0 && selectedTab === "pendingfollowup" && (
  <div className="content-container mt-3">
    <div className="mt-3">
      <PendingFollowuptable
        data={filteredRecords}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </div>
  </div>
)}

   {expandedSection === 1 && selectedTab === "followuphistory" && (
  <div className="content-container mt-3">
    <div className="mt-3">
      <Leadsfollowup_followuphistory
        // data={projectData}
         data={filteredRecords}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </div>
  </div>
)}

    {expandedSection === 2 && selectedTab === "undefined" && (
  <div className="content-container mt-3">
    <div className="mt-3">
      <UndefinedTable
        // data={Flatdata}
         data={filteredRecords}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </div>
  </div>
)}

     {expandedSection === 3 && selectedTab === "visit" && (
  <div className="content-container mt-3">
    <div className="mt-3">
      <BookedTable
        // data={projectData}
         data={filteredRecords}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </div>
  </div>
)}




      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
};

export default LeadsFollowUp;