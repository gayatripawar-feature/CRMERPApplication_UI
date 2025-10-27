import React, { useState, useEffect } from 'react';
import {
  Input, Table, TableBody, TableCell, TableContainer, Typography,
  IconButton, TableHead, TableRow, Paper, Box, Tabs, Tab, Button,
  TextField, Grid, MenuItem, FormControl, Select, InputLabel,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash, FaUpload } from "react-icons/fa";
import FirmTable from './FirstVisitsPendingfollowup';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
// import FollowupHistoryTable from './FollowupHistoryTable';
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
const tabNames = ["pendingfollowup", "followuphistory", "undefined", "visit"];

const LeadsFollowUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [phases, setPhases] = useState([]);
  const [showLandownerForm, setShowLandownerForm] = useState(false);
  const [showFlatForm, setShowFlatForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("pendingfollowup");
  const [projectData, setProjectData] = useState([]);
  const [FlatAllotement, setFlatAllotement] = useState([false]);
  const [selectedProject, setSelectedProject] = useState('');
  const [Flatdata, setFlatdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [panError, setPanError] = useState("");

  const [firmName, setFirmName] = useState("");
  const [leadNoError, setLeadNoError] = useState("");
  const [firmNameError, setFirmNameError] = useState("");

  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");

  const [firmPan, setFirmPan] = useState("");

  const [ageError, setAgeError] = useState("");
  const [occupationError, setOccupationError] = useState("");

  const [closingExecutive, setClosingExecutive] = useState('');
  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [status, setStatus] = useState({});
  const [firms, setFirms] = useState([]);
const [startDate, setStartDate] = useState(null);
const [endDate, setEndDate] = useState(null);
const [searchTerm, setSearchTerm] = useState('');

  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: "",
    firmGstNoDocument: "",
    firmLightBillForAddressProof: "",
  });


  //  state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    leadType: '',
    status: ''
  });


  const handleLeadNoChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setLeadNoError("Lead No should only contain digits");
    } else {
      setLeadNoError("");
    }

    setFormData({ ...formData, leadNo: value });
  };


  useEffect(() => {
    console.log("Updated Selected Tab:", selectedTab);
   
  }, []);

  




 

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


    setShowFirmForm(false);
    setShowProjectForm(false);
    setShowLandownerForm(false);

    setShowFlatForm(false);
  };

    { selectedTab === "pendingfollowup" && <PendingFollowuptable /> }
 
   { selectedTab === "followuphistory" && <Leadsfollowup_followuphistory /> }
  { selectedTab === "undefined" && <LandownerTable /> }
  { selectedTab === "visit" && <FlatAllotement /> }

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/path/to/demand_letter.pdf";
    link.download = "Demand_Letter.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  const handleNameChange = (e) => {
    const value = e.target.value;

    // Validation: Only letters and spaces allowed
    if (/[^a-zA-Z\s]/.test(value)) {
      setNameError('Name should only contain letters and spaces.');
    } else {
      setNameError('');
    }

    setFormData({ ...formData, name: value });
  };




  const [formData, setFormData] = useState({
    leadNo: '',
    closingExecutive: '',
    remark: '',
    name: '',
    status: '',
    assignTo: '',
    leadType: '',
    nextFollowUp: '',
  });




  const handleDownloadPDFPending = () => {
    console.log("Loans data before mapping:", loans);

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
    const tableRows = loans.map(row => [
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
    console.log("Loans data before mapping:", loans);

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Pending Follow-up Report", 14, 15);

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
    const totalRows = Math.min(loans.length, maxRowsPerPage * 2);

    // Mapping data for the first page
    const firstPageRows = loans.slice(0, totalRows).map(row => [
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
    const secondPageRows = loans.slice(0, totalRows).map(row => [
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
    doc.text("Pending Follow-up Report", 14, 15);

    // Merged columns for a single page
    const tableColumns = [
      "STATUS HISTORY", "REMARK HISTORY", "LEAD NO", "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME"
    ];

    // Limit the number of rows to fit within one page
    const maxRowsPerPage = 15;
    const totalRows = Math.min(loans.length, maxRowsPerPage);

    // Mapping data for the table
    const tableRows = loans.slice(0, totalRows).map(row => [
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
    doc.text("Pending Follow-up Report", 14, 15);


    const tableColumns = [
      "TIMESTAMP", "LEAD NO.", "NAME", "MOBILE NO.",
      "YOU ARE LOOKING FOR?", "EMAIL", "SOURCE NAME", "LOCATION"
    ];


    const maxRowsPerPage = 15;
    const totalRows = Math.min(loans.length, maxRowsPerPage);

    const tableRows = loans.slice(0, totalRows).map(row => [
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

  


  // Handle Assign To Change
  const handleAssignToChange = (e) => {
    setAssignTo(e.target.value);
  };

  // Handle Lead Type Change
  const handleLeadTypeChange = (e) => {
    setLeadType(e.target.value);
  };

  // Handle Next Follow Up Date Change
  const handleNextFollowUpChange = (newValue) => {
    setNextFollowUp(newValue ? newValue.format('YYYY-MM-DD') : '');
  };






  const handleSubmit = () => {
    // Validate required fields
    let hasErrors = false;
    const newErrors = {
      leadType: '',
      status: ''
    };

    if (!formData.leadType) {
      newErrors.leadType = 'Lead Type is required';
      hasErrors = true;
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
      hasErrors = true;
    }

    setValidationErrors(newErrors);

    if (hasErrors) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000
      });
      return;
    }

    const newFollowUp = {
      leadNo: formData.leadNo,
      name: formData.name,
      remark: formData.remark,
      leadType: formData.leadType,
      status: formData.status,

    };

    // Add to the loans array
    setLoans((prev) => [...prev, newFollowUp]);

    // Reset form data
    setFormData({
      leadNo: '',
      name: '',
      remark: '',
      leadType: '',
      status: '',
    });

    // Reset validation errors
    setValidationErrors({
      leadType: '',
      status: ''
    });

    console.log("Form submitted with data:", newFollowUp);
    toast.success("Follow-up details submitted!", { position: "top-right", autoClose: 3000 });
    setShowFirmForm(false);
  };



    // Filter loans based on startDate, endDate, and searchTerm
const filteredLoans = loans.filter(loan => {
  const nextFollowUp = loan.nextFollowUp ? dayjs(loan.nextFollowUp) : null;

  const isWithinDateRange = nextFollowUp
    ? (!startDate || nextFollowUp.isSameOrAfter(startDate, 'day')) &&
      (!endDate || nextFollowUp.isSameOrBefore(endDate, 'day'))
    : false; // if no nextFollowUp date, exclude it

  const matchesSearch = searchTerm
    ? loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loan.leadNo && loan.leadNo.toString().includes(searchTerm))
    : true;

  return isWithinDateRange && matchesSearch;
});

  return (
    <div className="container my-2">
      <h6 className="mb-3 fs-6">Sales Module / Lead Follow Up Management</h6>

     
<div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3" 
 style={{
    justifyContent: "space-between", // ✅ Tabs left, button right
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

{/* Right: PDF button + Date Pickers + Search */}
  
  {/* ✅ One Centralized Download PDF Button */}
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

  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      label="Start Date"
      value={startDate}
      onChange={(newValue) => setStartDate(newValue)}
      slotProps={{
        textField: {
          size: 'small',
          sx: { 
             minWidth: { xs: '120px', sm: '150px', md: '180px' },
            '& .MuiInputBase-root': { 
           border:Constants.formInputBorderColor,
            padding:"0px 8px",
          }} // small height
        }
      }}
    />
    <DatePicker
      label="End Date"
      value={endDate}
      onChange={(newValue) => setEndDate(newValue)}
      slotProps={{
        textField: {
          size: 'small',
          sx: { 
             minWidth: { xs: '120px', sm: '150px', md: '180px' },
             '& .MuiInputBase-root': { 
              border:Constants.formInputBorderColor,
            padding:"0px 8px",  } 
          },
           '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: Constants.formInputBorderColor, // normal border color
          },
          '&:hover fieldset': {
            borderColor: Constants.formInputBorderColor, // hover border color
          },
          '&.Mui-focused fieldset': {
            borderColor: Constants.formInputBorderColor, // focused border color
          },
        },
        }
      }}
    />
  </LocalizationProvider>

  <TextField
    size="small"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{ 
       minWidth: { xs: '120px', sm: '150px', md: '180px' },
      '& .MuiInputBase-root': { padding:"0px 8px"},border:Constants.formInputBorderColor }}
  />
</div>



  
      {expandedSection === 0 && selectedTab === "pendingfollowup" && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="mt-3">
                {/* <PendingFollowuptable firms={loans} setFirms={setLoans} isMobile={isMobile} isTablet={isTablet} /> */}
                <PendingFollowuptable firms={filteredLoans} setFirms={setLoans} isMobile={isMobile} isTablet={isTablet} />

              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => setShowFirmForm(false)}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}
            >
            </Dialog>
          )}
        </div>
      )}
      {expandedSection === 1 && selectedTab === "followuphistory" && (
        <div className="content-container mt-3">
          {!showProjectForm ? (
            <>
              <div className='mt-3'>
                {/* <FollowupHistoryTable data={projectData} isMobile={isMobile} isTablet={isTablet} /> */}
                        <Leadsfollowup_followuphistory data={projectData} isMobile={isMobile} isTablet={isTablet} />
              </div>
            </>
          ) : (
            <div>
            </div>
          )}
        </div>
      )}
      {expandedSection === 2 && selectedTab === "undefined" && (
        <div className="content-container mt-3">
          {!showLandownerForm ? (
            <>
             

              <div className='mt-3'>
                <UndefinedTable data={Flatdata} isMobile={isMobile} isTablet={isTablet} />
              </div>
            </>
          ) : (
            <div>
            </div>
          )}
        </div>
      )}
      {expandedSection === 3 && selectedTab === "visit" && (
        <div className="content-container mt-3">
          {!showFlatForm ? (
            <>
             

              <div className='mt-3'>
                <BookedTable data={projectData} isMobile={isMobile} isTablet={isTablet} />
              </div>
            </>
          ) : (
            <div>

            </div>
          )}
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