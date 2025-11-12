import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Typography,
  IconButton,
  TableHead,
  TableRow,
  Paper,
  Box,
  Tabs,
  Tab,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  FaEye,
  FaBuilding,
  FaFileDownload,
  FaPlus,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import FirmTable from "./FirmTable";
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from "./FlatAllotement";
import { ToastContainer, toast } from "react-toastify";
import FollowupHistoryTable from "./FollowupHistoryTable";
import UndefinedTable from "./UndefinedTable";
import BookedTable from "./BookedTable";

import FirstvisitfollowupUndefinedTable from "./FirstvisitfollowupUndefinedTable";
import FirstvisitfollowupbookedTable from "./FirstvisitfollowupbookedTable";
// import { FirstVisitFollowupPendingTable } from "./FirstVisitFollowupPendingTable";/
import { FirstVisitFollowupHistoryTable } from "./FirstVisitFollowupHistoryTable";

import {
  FaHourglassStart,
  FaHistory,
  FaUserCheck,
  FaQuestionCircle,
} from "react-icons/fa";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from "../Constants";
import { FirstVisitsPendingfollowup } from "./FirstVisitsPendingfollowup";


const formatDateTime = (dateString) => {
  if (!dateString) return "-";

  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

const sections = [
  {
    label: "Pending Follow Up",
    icon: <FaHourglassStart size={20} />,
    createLabel: "Create Firm",
  },
  {
    label: "Follow Up History",
    icon: <FaHistory size={20} />,
    createLabel: "Create Project",
  },
  {
    label: "Booked",
    icon: <FaUserCheck size={20} />,
    createLabel: "Create Landowner Info",
  },
  {
    label: "Undefined",
    icon: <FaQuestionCircle size={20} />,
    createLabel: "Create Flat Allotment Info",
  },
];
const tabNames = ["firm", "display", "landowner", "allotement"];

const FirstvisitFollowup = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [phases, setPhases] = useState([]);
  const [showLandownerForm, setShowLandownerForm] = useState(false);
  const [showFlatForm, setShowFlatForm] = useState(false);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [projectData, setProjectData] = useState([]);
  const [FlatAllotement, setFlatAllotement] = useState([false]);
  const [selectedProject, setSelectedProject] = useState("");
  const [Flatdata, setFlatdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileNoError, setMobileNoError] = useState("");
  const [panError, setPanError] = useState("");
  const [leadType, setLeadType] = useState("");
  const [firmName, setFirmName] = useState("");
  const [firmNameError, setFirmNameError] = useState("");
  const [firms, setFirms] = useState([]);

  const [statusError, setStatusError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [firmPan, setFirmPan] = useState("");
  const [firmPanError, setFirmPanError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [occupationError, setOccupationError] = useState("");

  const [closingExecutive, setClosingExecutive] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountNoError, setAccountNoError] = useState("");

  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("");
  const [status, setStatus] = useState("");
  //  New state to track whether to show next follow up field
  const [showNextFollowUp, setShowNextFollowUp] = useState(false);
  //  New state to track whether to show visit scheduled date field
  const [showVisitScheduledDate, setShowVisitScheduledDate] = useState(false);

// states for dateb filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredFirms, setFilteredFirms] = useState(firms);

  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: "",
    firmGstNoDocument: "",
    firmLightBillForAddressProof: "",
  });

  const [partners, setPartners] = useState([
    {
      name: "",
      age: "",
      occupation: "",
      mobile: "",
      email: "",
      address: "",
      pan: "",
      aadhaar: "",
    },
  ]);

  const [formData, setFormData] = useState({
    enquiryNo: "",
    remark: "",
    name: "",
    visitType: "",
    status: "",
    nextFollowUp: "",
    visitScheduledDate: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    visitType: "",
    status: "",
  });

  //  useEffect to filter data when dates change
  useEffect(() => {
    applyDateFilter();
  }, [fromDate, toDate, firms]);
  const applyDateFilter = () => {
    if (!fromDate && !toDate) {
      setFilteredFirms(firms);
      return;
    }

    const filtered = firms.filter((item) => {
      const nextFollowUpDate = item.nextFollowUp || item.visitScheduledDate;
      if (!nextFollowUpDate) return false;

      const followUpDate = new Date(nextFollowUpDate);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      // Set time to 00:00:00 for fromDate and 23:59:59 for toDate for proper comparison
      if (from) from.setHours(0, 0, 0, 0);
      if (to) to.setHours(23, 59, 59, 999);

      if (from && to) {
        return followUpDate >= from && followUpDate <= to;
      } else if (from) {
        return followUpDate >= from;
      } else if (to) {
        return followUpDate <= to;
      }
      return true;
    });

    setFilteredFirms(filtered);
  };

  const handleClearFilters = () => {
    setFromDate("");
    setToDate("");
    setFilteredFirms(firms);
  };

  useEffect(() => {
    console.log("Updated Selected Tab:", selectedTab);
    loadLoansData();
  }, []);

  //  UseEffect to monitor status changes
  useEffect(() => {
    const statusesThatRequireNextFollowUp = [
      "Callback request",
      "Unreachable",
      "Not answered",
      "Follow up",
    ];

    const statusesThatRequireVisitScheduledDate = [
      "Re-visit",
      "Visit postponed",
    ];

    setShowNextFollowUp(
      statusesThatRequireNextFollowUp.includes(formData.status)
    );

    setShowVisitScheduledDate(
      statusesThatRequireVisitScheduledDate.includes(formData.status)
    );
  }, [formData.status]);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

  const handleToggleSection = (index) => {
    if (sections[index].label === "Download PDF") {
      handleDownloadPDF();
      return;
    }
    console.log("Clicked Section Index:", index);
    console.log("Selected Tab Before Update:", selectedTab);
    setExpandedSection(index);

    if (sections[index].label === "Follow Up History") {
      setSelectedTab("followup");
    } else if (sections[index].label === "Pending Follow Up") {
      setSelectedTab("pending");
    } else if (sections[index].label === "Booked") {
      setSelectedTab("booked");
    } else if (sections[index].label === "Undefined") {
      setSelectedTab("undefined");
    }

    setShowFirmForm(false);
    setShowProjectForm(false);
    setShowLandownerForm(false);
    setShowFlatForm(false);
  };

  {
    selectedTab === "pending" && <FirstVisitsPendingfollowup />;
  }
  {
    selectedTab === "followup" && <FirstVisitFollowupHistoryTable />;
  }
  {
    selectedTab === "booked" && <FirstvisitfollowupbookedTable />;
  }
  {
    selectedTab === "undefined" && <FirstvisitfollowupUndefinedTable />;
  }

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

    if (/[^a-zA-Z\s]/.test(value)) {
      setNameError("Name should only contain letters and spaces.");
    } else {
      setNameError("");
    }

    setFormData({ ...formData, name: value });
  };

  const handleEnquiryNoChange = (e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setFirmNameError("Enquiry No should only contain digits");
    } else {
      setFirmNameError("");
    }

    setFormData({ ...formData, enquiryNo: value });
  };

  const handleDownloadPDFPending = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Pending Follow Up Details Report", 14, 15);

    // Split columns into two groups to handle the wide table
    const tableColumnPage1 = [
      "LAST FOLLOW UP",
      "STATUS",
      "REMARK",
      "NEXT FOLLOW UP",
      "ASSIGN TO",
      "ENQUIRY NO.",
      "LEAD NO.",
      "NAME",
      "SALES EXECUTIVE",
      "MOBILE",
      "ALTERNATE CONTACT",
      "WHATSAPP",
    ];

    const tableColumnPage2 = [
      "EMAIL",
      "ADDRESS",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED",
      "BUDGET",
      "REASON",
      "REFERENCE",
      "NAME OF CP",
      "PLANNING TO BUY?",
      "FOLLOWUP DETAILS",
    ];

    // Format the data for PDF - Page 1
    const tableRowsPage1 = firms.map((row) => [
      row.lastFollowUp || "-",
      row.status || "-",
      row.remark || "-",
      formatDateTime(row.nextFollowUp) ||
        formatDateTime(row.visitScheduledDate) ||
        "-",
      row.assignTo || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.salesExecutive || "-",
      row.mobileNo || "-",
      row.alternateContactNo || "-",
      row.whatsappNo || "-",
    ]);

    // Format the data for PDF - Page 2
    const tableRowsPage2 = firms.map((row) => [
      row.email || "-",
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interrestedIN || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.referenceBy || "-",
      row.nameOfCP || "-",
      row.planningToBuy || "-",
      row.followUpDetails || "-",
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
    doc.text("Pending Follow Up Details Report - Page 2", 14, 15);

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

    doc.save("Pending_Followup_Details_Report.pdf");
  };

  const handleDownloadPDFFollowup = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Followup Details Report - Page 1", 14, 15);

    const tableColumnPage1 = [
      "STATUS HISTORY",
      "REMARK HISTORY",
      "ASSIGN TO HISTORY",
      "LEAD DAYS",
      "TIMESTAMP",
      "ENQUIRY NO",
      "LEAD NO.",
      "SALES EXECUTIVE NAME",
      "NAME",
      "MOBILE",
      "ALTERNATE CONTACT NO.",
    ];

    const tableRowsPage1 = loans.map((row) => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.assignToHistory || "-",
      row.leadDays || "-",
      row.timestamp || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
      row.mobile || "-",
      row.alternateContact || "-",
    ]);

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.addPage("landscape");
    doc.text("Followup Details Report - Page 2", 14, 15);

    const tableColumnPage2 = [
      "WHATSAPP NO.",
      "EMAIL",
      "ADDRESS",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET (APPROX.)",
      "REASON FOR PURCHASE",
      "REFERENCE BY / SOURCE",
      "NAME OF CP ",
      "PLANNING TO BUY WITHIN?",
      "CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS",
    ];

    const tableRowsPage2 = loans.map((row) => [
      row.whatsapp || "-",

      row.email || "-",
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

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Followup_Details_Report.pdf");
  };

  const handleDownloadPDFBooked = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Followup Details Report - Page 1", 14, 15);

    const tableColumnPage1 = [
      "S.NO.",
      "ENQUIRY NO",
      "LEAD NO.",
      "NAME",
      "MOBILE",
      "ALTERNATE CONTACT NO.",
      "WHATSAPP NO.",
      "EMAIL",
      "ADDRESS",
    ];

    const tableRowsPage1 = loans.map((row, index) => [
      index + 1,
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.alternateContact || "-",
      row.whatsapp || "-",
      row.email || "-",
      row.address || "-",
    ]);

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.addPage("landscape");
    doc.text("Followup Details Report - Page 2", 14, 15);

    const tableColumnPage2 = [
      "S. NO.",
      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET (APPROX.)",
      "REASON FOR PURCHASE",
      "REFERENCE BY / SOURCE",
      "NAME OF CP",
      "PLANNING TO BUY WITHIN?",
      "CUSTOMER FEEDBACK",
    ];

    const tableRowsPage2 = loans.map((row, index) => [
      index + 1,
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

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Booked_Details_Report.pdf");
  };

  const handleDownloadPDFUndefined = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Followup Details Report - Page 1", 14, 15);

    const tableColumnPage1 = [
      "S. NO.",
      "STATUS HISTORY",
      "REMARK HISTORY",
      "ASSIGN TO HISTORY",
      "ENQUIRY NO.",
      "LEAD NO.",
      "NAME",
      "MOBILE",
      "ALTERNATE CONTACT NO.",
      "WHATSAPP NO.",
      "EMAIL",
    ];

    const tableRowsPage1 = loans.map((row, index) => [
      index + 1,
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.assignToHistory || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.alternateContact || "-",
      row.whatsapp || "-",
      row.email || "-",
    ]);

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage1],
      body: tableRowsPage1,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.addPage("landscape");
    doc.text("Followup Details Report - Page 2", 14, 15);

    const tableColumnPage2 = [
      "S. NO.",
      "ADDRESS",

      "OCCUPATION",
      "COMPANY",
      "INTERESTED IN",
      "BUDGET (APPROX.)",
      "REASON FOR PURCHASE.",
      "REFERENCE BY / SOURCE",
      "NAME OF CP (IF CHANNEL PARTNER)",
      "PLANNING TO BUY WITHIN ?",
      "CUSTOMER FEEDBACK",
    ];

    const tableRowsPage2 = loans.map((row, index) => [
      index + 1,
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

    autoTable(doc, {
      startY: 25,
      head: [tableColumnPage2],
      body: tableRowsPage2,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Undefined_Details_Report.pdf");
  };

  const handleSubmit = () => {
    // Validate required fields
    let hasErrors = false;
    const newErrors = {
      visitType: "",
      status: "",
    };

    if (!formData.visitType) {
      newErrors.visitType = "Visit Type is required";
      hasErrors = true;
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
      hasErrors = true;
    }

    setValidationErrors(newErrors);

    if (hasErrors) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const newFollowUp = {
      enquiryNo: formData.enquiryNo,
      remark: formData.remark,
      name: formData.name,
      nextFollowUp: formData.nextFollowUp,
      visitType: formData.visitType,
      status: formData.status,
      visitScheduledDate: formData.visitScheduledDate,
    };

    // Add to the firms array
    setFirms((prev) => [...prev, newFollowUp]);

    // Reset form data
    setFormData({
      enquiryNo: "",
      remark: "",
      name: "",
      nextFollowUp: "",
      visitType: "",
      status: "",
      visitScheduledDate: "",
    });

    // Reset validation errors
    setValidationErrors({
      visitType: "",
      status: "",
    });

    console.log("Form submitted with data:", newFollowUp);
    toast.success("Follow-up details submitted!", {
      position: "top-right",
      autoClose: 3000,
    });
    setShowFirmForm(false);
  };

  const handleUpdateFirm = (updatedFirm, index) => {
    const updatedFirms = [...firms];
    updatedFirms[index] = updatedFirm;
    setFirms(updatedFirms);
    toast.success("Details updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleDeleteFirm = (firmToDelete, index) => {
    const updatedFirms = firms.filter((firm, i) => i !== index);
    setFirms(updatedFirms);
    toast.success("Record deleted successfully!");
  };

  return (
    <div className="container my-4">
      <h6 className="mb-3 fs-6">Sales Module / Enquiry Follow Up Management</h6>

      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: Constants.primaryColor,
              padding: "8px",
              borderRadius: "20px",
              margin: "5px",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              width:
                expandedSection === index
                  ? isMobile
                    ? "180px"
                    : "220px"
                  : "50px",
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
                marginRight: expandedSection === index ? "8px" : "0",
                fontSize: isMobile
                  ? "16px"
                  : expandedSection === index
                  ? "20px"
                  : "20px",
                color: "#fff",
                transition: "font-size 0.3s ease",
              },
            })}

            {expandedSection === index ? (
              <span
                className="p-1 fw-bold"
                style={{
                  color: "white",
                  marginLeft: "5px",
                  fontSize: isMobile ? "12px" : "14px",
                }}
              >
                {section.label}
              </span>
            ) : null}

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.2)",
                transform: "scale(0.1)",
                transition: "transform 0.3s ease",
                zIndex: -1,
              }}
            ></div>

            <div
              style={{
                "&:hover": {
                  background:
                    "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
                },
                "&:hover div": {
                  transform: "scale(1)",
                },
              }}
            ></div>
          </div>
        ))}
      </div>

    {expandedSection === 0 && selectedTab === "pending" && (
  <div className="content-container mt-3">
    {/* Top row: Date Filters + PDF Button */}
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
      
      {/* Date Filter Section */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : "auto",
          mt: isMobile ? 2 : 0,
        }}
      >
        <TextField
          label="From Date"
          type="date"
          size="small"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: isMobile ? "100%" : 150,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: Constants.primaryColor },
              "&:hover fieldset": { borderColor: Constants.primaryColor },
              "&.Mui-focused fieldset": { borderColor: Constants.primaryColor },
            },
          }}
        />
        <TextField
          label="To Date"
          type="date"
          size="small"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            width: isMobile ? "100%" : 150,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: Constants.primaryColor },
              "&:hover fieldset": { borderColor: Constants.primaryColor },
              "&.Mui-focused fieldset": { borderColor: Constants.primaryColor },
            },
          }}
        />
        <Button
          variant="outlined"
          onClick={handleClearFilters}
          size="small"
          sx={{
            width: isMobile ? "100%" : "auto",
            background: Constants.primaryColor,
            color: "#fff",
            "&:hover": { background: Constants.primaryColor },
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Download PDF Button */}
      <Button
        variant="contained"
        sx={{
          background: Constants.primaryColor,
          color: "#fff",
          fontWeight: "bold",
          textTransform: "none",
          padding: isMobile ? "6px 12px" : "8px 16px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          "&:hover": { background: Constants.primaryColor },
          marginTop: isMobile ? 8 : 0,
        }}
        onClick={handleDownloadPDFPending}
        size={isMobile ? "small" : "medium"}
      >
        <FaFileDownload size={isMobile ? 16 : 18} />
        {isMobile ? "PDF" : "Download PDF"}
      </Button>
    </div>

    {/* Table Section */}
    <div className="mt-3">
      <FirstVisitsPendingfollowup
        firms={filteredFirms}
        isMobile={isMobile}
        isTablet={isTablet}
        onUpdate={handleUpdateFirm}
        onDelete={handleDeleteFirm}
      />
    </div>
  </div>
)}


     {expandedSection === 1 && selectedTab === "followup" && (
  <div className="content-container mt-3">
    {!showProjectForm ? (
      <>
        {/* Top Row: Title + Download PDF Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          
          {/* Section Title */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            sx={{
              fontWeight: "bold",
              paddingTop: "6px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Enquiry History
          </Typography>

          {/* Download PDF Button */}
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
              justifyContent: "center",
              gap: "8px",
              "&:hover": { background: Constants.primaryColor },
              marginTop: isMobile ? 8 : 0,
            }}
            onClick={handleDownloadPDFFollowup}
            size={isMobile ? "small" : "medium"}
          >
            <FaFileDownload size={isMobile ? 16 : 18} />
            {isMobile ? "PDF" : "Download PDF"}
          </Button>
        </div>

        {/* Table Section */}
        <div className="mt-3">
          <FirstVisitFollowupHistoryTable
            data={projectData}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </>
    ) : (
      <div></div>
    )}
  </div>
)}


    {expandedSection === 2 && selectedTab === "booked" && (
  <div className="content-container mt-3">
    {!showLandownerForm ? (
      <>
        {/* Top Row: Title + Download PDF Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          
          {/* Section Title */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            sx={{
              fontWeight: "bold",
              paddingTop: "8px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Booked Enquiries
          </Typography>

          {/* Download PDF Button */}
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
              justifyContent: "center",
              gap: "8px",
              "&:hover": { background: Constants.primaryColor },
              marginTop: isMobile ? 8 : 0,
            }}
            onClick={handleDownloadPDFBooked}
            size={isMobile ? "small" : "medium"}
          >
            <FaFileDownload size={isMobile ? 16 : 18} />
            {isMobile ? "PDF" : "Download PDF"}
          </Button>
        </div>

        {/* Table Section */}
        <div className="mt-3">
          <FirstvisitfollowupbookedTable
            data={projectData}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </>
    ) : (
      <div></div>
    )}
  </div>
)}


{expandedSection === 3 && selectedTab === "undefined" && (
  <div className="content-container mt-3">
    {!showFlatForm ? (
      <>
        {/* Top Row: Title + Download PDF Button */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
          
          {/* Section Title */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="h2"
            sx={{
              fontWeight: "bold",
              paddingTop: "6px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Lost Enquiries
          </Typography>

          {/* Download PDF Button */}
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
              justifyContent: "center",
              gap: "8px",
              "&:hover": { background: Constants.primaryColor },
              marginTop: isMobile ? 8 : 0,
            }}
            onClick={handleDownloadPDFUndefined}
            size={isMobile ? "small" : "medium"}
          >
            <FaFileDownload size={isMobile ? 16 : 18} />
            {isMobile ? "PDF" : "Download PDF"}
          </Button>
        </div>

        {/* Table Section */}
        <div className="mt-3">
          <FirstvisitfollowupUndefinedTable
            data={projectData}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      </>
    ) : (
      <div></div>
    )}
  </div>
)}

    
    

      <ToastContainer />
    </div>
  );
};

export default FirstvisitFollowup;
