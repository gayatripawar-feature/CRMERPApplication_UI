import React, { useState, useRef, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Grid, MenuItem, Box, Tooltip, IconButton,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, TablePagination,
} from '@mui/material';
import { FaEye, FaFileCsv, FaFileExcel, FaUpload, FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';
import { FaTimes } from 'react-icons/fa';
import * as XLSX from "xlsx";

import ExcelJS from 'exceljs';
const unitTypes = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition", "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];
const sections = [
  { label: "Display Leads", icon: <FaEye size={24} />, bgColor: "primary.main" },
  { label: "Sample Excel", icon: <FaFileExcel size={24} />, bgColor: "success.main" },
  { label: "Upload Excel", icon: <FaUpload size={24} />, bgColor: "secondary.main" },
];

// To get the data from api/leads:
const fetchLeadsData = async () => {
  try {
    // const response = await fetch('http://localhost:5174/api/Leads'); // hosted API URL
    //  const response = await fetch('/api/Leads');
    const response = await fetch('/api/leads');
    if (!response.ok) {
      console.log('checking api response');
      console.log(await response.text());
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log("data", data);
    console.log("data length", data.length);
    return data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
};

// to submit the data or post API-api/leads:
const createLead = async (leadData) => {
  try {
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit lead: ${errorText}`);
    } const savedLead = await response.json();
    return savedLead;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Leads = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [leadCounter, setLeadCounter] = useState(0);
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [showFileInput, setShowFileInput] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  // duplicate mobile no :
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateDetails, setDuplicateDetails] = useState([]);
  const [openMonthModal, setOpenMonthModal] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  useEffect(() => {
    // const loadLeads = async () => {
    const allLeads = async () => {
      const data = await fetchLeadsData();
      console.log("Fetched leads:", data);       // Entire array
      console.log("Total leads count:", data.length);
      setInventoryData(data);
    };
    allLeads();
  }, []);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    // mobile: '',
    phone: '',
    email: '',
    location: '',
    sourceName: '',
    lookingFor: '',
    partners: [],
    SourceDetails: "",
    firmName: '',
    personName: '',
    partnerMobile: '',
    referenceName: '',
    otherSource: '',
  });
  const [inventoryData, setInventoryData] = useState([]);
  const handleToggleSection = (index) => {
    if (index === 1) {
      downloadSampleCsv();
      setExpandedSection(index); // just expand the button
      return; // don’t switch content
    }
    if (index === 2) {
      // Upload Excel action
      if (fileInputRef.current) fileInputRef.current.click();
      setExpandedSection(index);
      return;
    }
    // For the first tab (Display Leads) — show its content
    setExpandedSection(index);
    setShowFileInput(false);
  };
  const handleDelete = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    const success = await deleteLeadApi(leadId);
    console.log("backend delete called");
    if (success) {
      setInventoryData(inventoryData.filter((lead) => lead.id !== leadId));
      toast.success("Lead deleted successfully!", { position: "top-right", autoClose: 3000 });
    }
  };
  const downloadSampleCsv = () => {
    const headers = "Name,Mobile No.,Source Name,Location,Are You Looking For\n";
    const sampleData = "\n";
    const blob = new Blob([headers + sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lead_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /\d/;
    if (regex.test(value)) {
      setError('Name should not contain digits');
    } else {
      setError('');
    } setName(value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("handleChange:", e.target.name, value, formData);
  };
  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
    setFormData({ ...formData, phone: e.target.value });
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setFormData({ ...formData, email: e.target.value });
  };
  const handleDownloadPDFLeads = () => {
    console.log("Inventory data before mapping:", inventoryData);
    if (inventoryData.length === 0) {
      toast.error("No leads data to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.text("Leads Report", pageWidth / 2, 15, { align: "center" });
    const tableColumn = [
      "Timestamp",
      "Assign To",
      "Lead No",
      "Name",
      "Mobile / WhatsApp",
      "Looking For",
      "Email",
      "Source Name",
      "Location",
    ];
    console.log("Sample lead record:", inventoryData[0]);
    const tableRows = inventoryData.map((row) => [
      row.lastUpdatedDate || "-",
      row.AssignTo || "-",
      row.id ? `LEAD-${row.id}` : "-",
      row.name || "-",
      row.phone || "-",
      row.interest || "-",
      row.email || "-",
      row.source || "-",
      row.address || "-",
    ]);
    console.log("Formatted Table Rows:", tableRows);
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [128, 0, 0], textColor: [255, 255, 255] },
      didDrawPage: function (data) {
        // Add centered page number at the bottom
        const pageCount = doc.internal.getNumberOfPages();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageNumberText = `Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`;
        doc.setFontSize(10);
        doc.text(pageNumberText, pageWidth / 2, pageHeight - 10, { align: "center" });
      },
    });
    doc.save("Leads_Report.pdf");
    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };
  useEffect(() => {
    console.log("Table data updated:", inventoryData);
    console.log("inventoryData length:", inventoryData.length);
    console.log("inventoryData IDs:", inventoryData.map(l => l.id || l._id));
  }, [inventoryData]);
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const arrayBuffer = evt.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
      console.log("Excel data:", jsonData);
      const duplicatesFromFile = [];
      for (let row of jsonData) {
        const phone = String(row["Mobile No."] || "").trim();
        // Check if phone already exists in inventoryData
        const existingLead = inventoryData.find(lead => String(lead.phone) === phone);
        if (existingLead) {
          duplicatesFromFile.push({
            id: existingLead.id || "-",
            name: existingLead.name || "-",
            source: existingLead.source || "-",
            sourceDetails: existingLead.sourceDetails || "-",
          });
          continue; // skip this row
        }
        // Build source details
        const sourceDetails = row["Source Name"] === "Channel Partner"
          ? `${row["Firm Name"] || ""}; ${row["Person Name"] || ""}; ${row["Partner Mobile"] || ""}`
          : row["Source Name"] === "References"
            ? row["Reference Name"] || ""
            : row["Source Name"] === "Other"
              ? row["Other Source"] || ""
              : "";
        const timestamp = row["Timestamp"] ? row["Timestamp"] : new Date().toISOString();
        const leadData = {
          Name: row["Name"] || "",
          Phone: Number(phone || 0),
          Email: row["Email"] || "",
          Address: row["Location"] || "",
          Interest: row["Are You Looking For"] || "",
          Source: row["Source Name"] || "",
          SourceDetails: sourceDetails,
          UpdatedBy: "System",
          LeadNo: `LEAD-${String(leadCounter + 1).padStart(2, "0")}`,
          AssignTo: "",
          Timestamp: timestamp,
          frontendTimestamp: timestamp,
        };
        try {
          const savedLead = await createLead(leadData);
          setInventoryData((prev) => [
            { ...savedLead, Timestamp: timestamp },
            ...prev,
          ]);
          setLeadCounter((prev) => prev + 1);
        } catch (err) {
          console.error("Error uploading lead:", err);
        }
      }
      // Show duplicate modal if any duplicates were found
      if (duplicatesFromFile.length > 0) {
        setDuplicateDetails(duplicatesFromFile);
        setShowDuplicateModal(true);
      }
      toast.success("Excel data uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    };
    reader.readAsArrayBuffer(file);
  };
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const handleFormSubmit = async () => {
    //  Validate required fields
    console.log("Submitting formData:", formData);
    if (!formData.name || !formData.phone || !formData.lookingFor || !formData.sourceName) {
      toast.error("Please fill in all required fields", { position: "top-right", autoClose: 3000 });
      return;
    } //  Check for duplicate mobile
    const existingLead = inventoryData.find(
      (lead) => String(lead.phone) === String(formData.phone)
    );
    if (existingLead) {
      setFormData({
        name: "", phone: "", email: "", location: "", sourceName: "",
        lookingFor: "", firmName: "", personName: "", partnerMobile: "",
        referenceName: "", otherSource: "", SourceDetails: "",
      });
      setDuplicateDetails([{
        id: existingLead.id || "-",
        name: existingLead.name || "-",
        sourceDetails: existingLead.sourceDetails || "-",
        source: existingLead.source || "-",
      }]);
      setShowDuplicateModal(true);
      return;
    }
    //  Prepare source details
    let sourceDetails = "";
    if (formData.sourceName === "Channel Partner") {
      sourceDetails = `${formData.firmName || ""}; ${formData.personName || ""}; ${formData.partnerMobile || ""}`;
    } else if (formData.sourceName === "References") {
      sourceDetails = formData.referenceName || "";
    } else if (formData.sourceName === "Other") {
      sourceDetails = formData.otherSource || "";
    }
    //  Construct payload for API
    const newLead = {
      Name: formData.name,
      phone: Number(formData.phone),
      Email: formData.email,
      Address: formData.location,
      Interest: formData.lookingFor,
      Source: formData.sourceName,
      SourceDetails: sourceDetails,
      UpdatedBy: "System",
      firmName: formData.firmName || "",
      personName: formData.personName || "",
      partnerMobile: formData.partnerMobile || "",
      referenceName: formData.referenceName || "",
      otherSource: formData.otherSource || "",
    };
    try {
      //  Call backend API
      const savedLead = await createLead(newLead);
      console.log("Saved lead from API:", savedLead);
      //  Format API response for table
      const formattedLead = {
        id: savedLead.id || savedLead._id,
        name: savedLead.Name,
        phone: savedLead.phone || savedLead.Mobile,
        email: savedLead.Email,
        location: savedLead.Address,
        lookingFor: savedLead.Interest,
        source: savedLead.Source,
        sourceDetails: savedLead.SourceDetails,
        LeadNo: savedLead.LeadNo ? `LEAD-${String(savedLead.LeadNo).padStart(2, '0')}` : "-",
        Timestamp: savedLead.Timestamp,
        UpdatedBy: savedLead.UpdatedBy,
        firmName: savedLead.firmName || '',
        personName: savedLead.personName || '',
        partnerMobile: savedLead.partnerMobile || '',
        referenceName: savedLead.referenceName || '',
        otherSource: savedLead.otherSource || '',
      };
      // REFETCH latest leads from backend
      const latestData = await fetchLeadsData();
      alert(JSON.stringify(latestData, null, 2));
      setInventoryData(latestData);
      console.log(latestData[1]);
      //  Clear form
      setFormData({
        name: "", phone: "", email: "", location: "", sourceName: "",
        lookingFor: "", firmName: "", personName: "", partnerMobile: "",
        referenceName: "", otherSource: "", SourceDetails: "",
      });
      setName('');
      setPhone('');
      setEmail('');
      setShowFirmForm(false);
      toast.success("Lead submitted successfully!", { position: "top-right", autoClose: 3000 });
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit lead. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };
  // pagination :
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const filteredData = inventoryData.filter((item) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    const channelPartnerName = item.personName?.toLowerCase() || "";
    const sourceDetails = item.sourceDetails?.toLowerCase() || "";
    const name = item.name?.toLowerCase() || "";
    const phone = String(item.phone || "").toLowerCase();
    return (
      name.includes(query) ||
      phone.includes(query) ||
      channelPartnerName.includes(query) ||
      sourceDetails.includes(query)
    );
  });
  const paginatedFilteredData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  console.log("paginated filtered data ", paginatedFilteredData.length);
  console.log("Inventory data", inventoryData.length);
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // delete lead api :
  const deleteLeadApi = async (id) => {
    try {
      const response = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete lead: ${errorText}`);
      }
      return true; // deletion successful
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete lead. Please try again.", { position: "top-right", autoClose: 3000 });
      return false;
    }
  };
  console.log("Filtered data count:", filteredData.length);
  console.log("Filtered data IDs:", filteredData.map(l => l.id || l._id));
  console.log("Paginated data count:", paginatedFilteredData.length);
  console.log("Paginated data IDs:", paginatedFilteredData.map(l => l.id || l._id));

  const handleDownloadExcelSource = (month) => {
    try {
      if (!month) {
        toast.error("Please select a month", { position: "top-right" });
        return;
      }
      const year = new Date().getFullYear();
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
      // Computed weeks (Friday → Thursday) 
      const weeks = [];
      const firstDayOfMonth = new Date(year, monthIndex, 1);
      const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
      // Find the first Friday ON or BEFORE the first day of month
      const firstFriday = new Date(firstDayOfMonth);
      while (firstFriday.getDay() !== 5) {
        firstFriday.setDate(firstFriday.getDate() - 1);
      }
      let currentStart = new Date(firstFriday);
      while (currentStart <= lastDayOfMonth) {
        const currentEnd = new Date(currentStart);
        currentEnd.setDate(currentStart.getDate() + 6);
        weeks.push({
          start: new Date(currentStart),
          end: new Date(currentEnd),
          label: `Week ${weeks.length + 1} (${currentStart.getDate()}/${currentStart.getMonth() + 1} - ${currentEnd.getDate()}/${currentEnd.getMonth() + 1})`,
        });
        currentStart.setDate(currentStart.getDate() + 7);
      } console.log("Computed weeks:", weeks);
      //  Category mapping 
      const categorySources = {
        "Direct Walk-in": ["Direct call", "Actual Visit", "Walk-in"],
        "Site Branding": ["Hoarding", "Exhibition", "Pamphlet", "Online Portal"],
        "Channel Partner": ["Channel Partner"],
        "Referral Program": ["References", "Referral"],
        "Digital Media": ["Facebook", "Instagram", "Website", "Print Media", "Radio", "Google Add"],
      };
      const categoryMap = {};
      Object.entries(categorySources).forEach(([cat, arr]) => {
        arr.forEach((src) => (categoryMap[src.toLowerCase()] = cat));
      });
      console.log("Category map:", categoryMap);
      console.log("Sample lead data:", inventoryData[0]);
      // Initialize count
      const categoryCounts = {};
      Object.keys(categorySources).forEach((cat) => {
        categoryCounts[cat] = new Array(weeks.length).fill(0);
      });


      // ===== Helper: normalize date safely =====
      const normalizeDate = (ts) => {
        if (!ts) return null;
        if (typeof ts === "string" && ts.includes("/")) {
          // handles dd/mm/yyyy or d/m/yyyy
          const [day, month, year] = ts.split("/").map(Number);
          return new Date(year, month - 1, day);
        }
        const d = new Date(ts);
        if (isNaN(d)) return null;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      };

      // ===== Count leads per week =====
      inventoryData.forEach((lead, idx) => {
        const dateValue =
          lead.lastUpdatedDate ||
          lead.Timestamp ||
          lead.timestamp ||
          lead.CreatedAt ||
          lead.createdAt ||
          lead.Date ||
          lead.date;
        const date = normalizeDate(dateValue);
        if (!date || isNaN(date)) {
          console.log(`Lead ${idx + 1}: Invalid date`, dateValue);
          return;
        }
        // Skip if outside visible month range
        if (date < weeks[0].start || date > weeks[weeks.length - 1].end) {
          console.log(`Lead ${idx + 1}: Out of range → ${date.toDateString()}`);
          return;
        }

        // Determine category
        let category = "Unknown";
        if (lead.source) {
          const lowerSource = lead.source.toLowerCase();
          for (const [srcKey, cat] of Object.entries(categoryMap)) {
            if (lowerSource.includes(srcKey)) {
              category = cat;
              break;
            }
          }
        }
        // Find week index with inclusive boundaries
        const weekIndex = weeks.findIndex(
          (w) =>
            date >= new Date(w.start.setHours(0, 0, 0, 0)) &&
            date <= new Date(w.end.setHours(23, 59, 59, 999))
        );
        if (category !== "Unknown" && weekIndex !== -1) {
          categoryCounts[category][weekIndex]++;
        }
        console.log(
          `Lead ${idx + 1}: Date=${date.toDateString()} → ${category} → ${weekIndex !== -1 ? weeks[weekIndex].label : "No match"
          }`
        );
      });

      console.log("Final category counts:", categoryCounts);
      // ===== Generate Excel with ExcelJS =====
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Monthly Report");

      // ===== Add Report Title Row =====
      const reportTitle = `Sourcewise Report for ${month} ${year}`;
      const titleRow = worksheet.addRow([reportTitle]);

      // Merge cells for title across all columns
      worksheet.mergeCells(1, 1, 1, weeks.length + 2);

      // Style the title
      titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: "FFFFFF" } };
      titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
      titleRow.getCell(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }, // dark blue background
      };
      titleRow.height = 25;

      worksheet.addRow([]);

      // Add Header Row
      worksheet.addRow(["Category", ...weeks.map((w) => w.label), "Expense"]);

      // Apply header styles
      const headerRow = worksheet.getRow(3);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "3c0008" },  //maroon background
        };
        cell.font = { color: { argb: "FFFFFF" }, bold: true, size: 12 }; // White bold text
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Add Data Rows
      Object.entries(categoryCounts).forEach(([category, counts]) => {
        worksheet.addRow([category, ...counts]);
      });
      const totalRowValues = ["Total"];
      // Calculate week-wise totals
      for (let i = 0; i < weeks.length; i++) {
        let weekTotal = 0;
        Object.values(categoryCounts).forEach((counts) => {
          weekTotal += counts[i];
        });
        totalRowValues.push(weekTotal);
      }
      // Add empty value for Expense column
      totalRowValues.push("");

      // Add total row to sheet
      const totalRow = worksheet.addRow(totalRowValues);

      // Style the Total row
      totalRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "000000" }, size: 12 };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFDE21" }, // Light blue background
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
      // Set column widths
      worksheet.columns = [
        { width: 25 },
        ...weeks.map(() => ({ width: 25 })),
        { width: 12 },
      ];

      // ✅ Save Excel File
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${month}_SourceWise_Report.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      });


      toast.success("Excel report generated successfully!", { position: "top-right" });
    } catch (err) {
      console.error("Error generating Excel report:", err);
      toast.error("Failed to generate report. Check console.", { position: "top-right" });
    }
  };




  const handleDownloadSalesPersonExcel = async (month) => {
    try {
      if (!month) {
        toast.error("Please select a month", { position: "top-right" });
        return;
      }

      const year = new Date().getFullYear();
      const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

      // ===== Compute Weeks (Friday → Thursday)
      const weeks = [];
      const firstDayOfMonth = new Date(year, monthIndex, 1);
      const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
      const firstFriday = new Date(firstDayOfMonth);
      while (firstFriday.getDay() !== 5) {
        firstFriday.setDate(firstFriday.getDate() - 1);
      }
      let currentStart = new Date(firstFriday);
      while (currentStart <= lastDayOfMonth) {
        const currentEnd = new Date(currentStart);
        currentEnd.setDate(currentStart.getDate() + 6);
        weeks.push({
          start: new Date(currentStart),
          end: new Date(currentEnd),
          label: `Week ${weeks.length + 1} (${currentStart.getDate()}/${currentStart.getMonth() + 1} - ${currentEnd.getDate()}/${currentEnd.getMonth() + 1})`,
        });
        currentStart.setDate(currentStart.getDate() + 7);
      }

      // ===== Salesperson List
      const salesPersons = [
        "Main Sales",
        "Ranjeet Rajkumar Kambale",
        "Yogita Satish Dalvi",
        "Shubhangi Omkar Patil",
        "Ajay Ravindra Kate",
        "Tester",
      ];

      // ===== Normalize Date Function
      const normalizeDate = (ts) => {
        if (!ts) return null;
        if (typeof ts === "string" && ts.includes("/")) {
          const [day, month, year] = ts.split("/").map(Number);
          return new Date(year, month - 1, day);
        }
        const d = new Date(ts);
        if (isNaN(d)) return null;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
      };

      // ===== Initialize Counts
      const salesCounts = {};
      salesPersons.forEach((person) => {
        salesCounts[person] = new Array(weeks.length).fill(0);
      });

      // ===== Count leads per week
      inventoryData.forEach((lead, idx) => {
        const dateValue =
          lead.lastUpdatedDate ||
          lead.Timestamp ||
          lead.timestamp ||
          lead.CreatedAt ||
          lead.createdAt ||
          lead.Date ||
          lead.date;

        const date = normalizeDate(dateValue);
        if (!date || isNaN(date)) return;

        if (date < weeks[0].start || date > weeks[weeks.length - 1].end) return;

        const weekIndex = weeks.findIndex((w) => {
          const start = new Date(w.start);
          const end = new Date(w.end);
          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);
          return date >= start && date <= end;
        });

        const person =
          lead.assignTo?.trim() ||
          lead.leadEnagagements?.[0]?.assignedTo?.trim() ||
          "Unassigned";

        if (salesCounts[person] && weekIndex !== -1) {
          salesCounts[person][weekIndex]++;
        }
      });

      console.log("Final salesperson counts:", salesCounts);

      // ===== Generate Excel with ExcelJS
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Salesperson Report");

      // ===== Title Row
      const titleText = `Salesperson-wise Report for ${month} ${year}`;
      const titleRow = worksheet.addRow([titleText]);
      worksheet.mergeCells(1, 1, 1, weeks.length + 1);
      titleRow.getCell(1).font = { bold: true, size: 16, color: { argb: "FFFFFF" } };
      titleRow.getCell(1).alignment = { horizontal: "center", vertical: "middle" };
      titleRow.getCell(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "1F4E78" }, // dark blue
      };
      titleRow.height = 25;

      worksheet.addRow([]); // blank line after title

      // ===== Header Row
      worksheet.addRow(["Sales Person", ...weeks.map((w) => w.label)]);
      const headerRow = worksheet.getRow(3);
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "3C0008" }, // maroon background
        };
        cell.font = { color: { argb: "FFFFFF" }, bold: true, size: 12 };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // ===== Data Rows
      salesPersons.forEach((person) => {
        worksheet.addRow([person, ...salesCounts[person]]);
      });

      // ===== Total Row
      const totalRowValues = ["Total"];
      for (let i = 0; i < weeks.length; i++) {
        let weekTotal = 0;
        Object.values(salesCounts).forEach((counts) => {
          weekTotal += counts[i];
        });
        totalRowValues.push(weekTotal);
      }

      const totalRow = worksheet.addRow(totalRowValues);
      totalRow.eachCell((cell) => {
        cell.font = { bold: true, color: { argb: "000000" }, size: 12 };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFDE21" }, // yellow
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // ===== Column Widths
      worksheet.columns = [
        { width: 30 },
        ...weeks.map(() => ({ width: 20 })),
      ];

      // ===== Save File
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${month}_SalesPersonWise_Report.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success("Salesperson Excel report generated successfully!", {
        position: "top-right",
      });
    } catch (err) {
      console.error("Error generating salesperson Excel report:", err);
      toast.error("Failed to generate salesperson report. Check console.", {
        position: "top-right",
      });
    }
  };


  return (
    <>
      <div className="container my-2">
        <h6 className="mb-2 fs-6">Sales Module / Lead Management</h6>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3">
          <div className="d-flex flex-wrap gap-2 mb-2 mb-md-0">
            {sections.map((section, index) => (
              <Tooltip key={index} title={section.label} arrow>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    backgroundColor: Constants.primaryColor,
                    padding: '10px',
                    borderRadius: '20px',
                    color: 'white',
                    fontSize: '16px',
                    width: expandedSection === index ? (isMobile ? '100%' : '200px') : '50px',
                    height: '50px',
                    transition: 'width 0.3s ease',
                    background: Constants.primaryColor,
                    boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
                    margin: '5px',
                  }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleToggleSection(index)}
                    sx={{
                      padding: 0,
                      marginRight: '8px',
                      fontSize: '24px',
                      color: 'white',
                    }}> {section.icon}</IconButton>
                  <span className='fw-bold'
                    style={{
                      color: 'white',
                      fontSize: '16px',
                      display: expandedSection === index ? 'inline' : 'none',
                      marginLeft: '8px',
                    }}> {section.label} </span>
                </div>
              </Tooltip>
            ))}
          </div>
          {showFileInput && (
            <div className="m-3">
              <input type="file" accept=".csv, .xlsx" />
            </div>
          )}
          <input
            type="file"
            accept=".csv, .xlsx"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
        </div>
        <div className="content-container mt-1">
          {!showFirmForm ? (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div className="d-flex flex-column flex-md-row gap-2">
                  <Button
                    variant="contained"
                    style={{ background: Constants.primaryColor, minWidth: isMobile ? '100%' : 'auto' }}
                    onClick={() => setShowFirmForm(true)}
                    sx={{ fontWeight: "bold" }}
                  >
                    + New Leads
                  </Button>
                  {/* <Button
                    variant="contained"
                    sx={{
                      background: Constants.primaryColor,
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&:hover": { background: Constants.primaryColor },
                      minWidth: isMobile ? '100%' : 'auto',
                    }}
                    onClick={handleDownloadPDFLeads}
                    
                  >
                    <FaFileDownload size={18} />
                    {isMobile ? 'PDF' : 'Download Table PDF'}
                  </Button> */}
                  <Button
                    variant="contained"
                    sx={{
                      background: "#800020",
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      "&:hover": { background: "#800020" },
                      minWidth: isMobile ? '100%' : 'auto',
                    }}
                    onClick={() => setOpenMonthModal(true)}
                  >
                    <FaFileDownload size={18} />
                    {isMobile ? 'Excel' : 'Download Monthwise Report'}
                  </Button>
                </div>


                <div
                  className="d-flex align-items-center mb-3"
                  style={{
                    justifyContent: isMobile ? "flex-start" : "flex-end",
                    gap: "8px",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                  }}
                >
                  <TextField
                    label="Search Lead"
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                    sx={{

                      width: isMobile ? "150px" : "200px",
                      border: Constants.formInputBorderColor,
                      flexShrink: 0,
                    }} />
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Rows per page:"
                    labelDisplayedRows={({ from, to, count }) => `${from}–${to} of ${count} entries`}
                    sx={{
                      "& .MuiTablePagination-toolbar": {
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "nowrap",
                        minHeight: "36px",
                        padding: 0,
                      },
                      "& .MuiTablePagination-spacer": { display: "none" },
                      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                        whiteSpace: "nowrap",
                        fontSize: "0.9rem",
                        color: "#800020",
                        fontWeight: 600,
                        lineHeight: "1.2rem",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      },
                      "& .MuiTablePagination-input": {
                        display: "inline-flex",
                        alignItems: "center",
                        margin: 0,
                        height: "32px",
                      },
                      "& .MuiTablePagination-input .MuiInputBase-root": {
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        padding: 0,
                        margin: 0,
                      },
                      "& .MuiTablePagination-input .MuiSelect-select": {
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        display: "flex",
                        alignItems: "center",
                      },
                      "& .MuiTablePagination-actions": {
                        marginLeft: "8px",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  />
                </div>
              </div>
              <div className="mt-2 mb-5">
                <NewLeads
                  inventoryData={paginatedFilteredData}
                  paginatedFilteredData={paginatedFilteredData}
                  handleDelete={handleDelete}
                  setInventoryData={setInventoryData}
                  fetchLeadsData={fetchLeadsData}
                  isMobile={isMobile}
                  isTablet={isTablet}
                />
              </div>
            </>
          ) : (
            <Dialog
              open={showFirmForm}
              onClose={() => setShowFirmForm(false)}
              fullWidth
              maxWidth="md"
              fullScreen={isMobile}>
              <DialogTitle sx={{
                backgroundColor: Constants.primaryColor,
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 16px',
              }}>Add New Lead
                <IconButton
                  onClick={() => setShowFirmForm(false)}
                  sx={{ color: 'white' }}>
                  <FaTimes />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={handleChange}
                      name="name"
                      error={!!error}
                      helperText={error}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="You Are Looking For?"
                      fullWidth
                      required
                      value={formData.lookingFor}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mobile No. / WhatsApp No."
                      fullWidth
                      required
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({ ...formData, phone: value });
                        validateMobile(value);
                      }}
                      error={!!mobileError}
                      helperText={mobileError}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Location"
                      fullWidth
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      label="Source Name"
                      fullWidth
                      required
                      value={formData.sourceName}
                      onChange={(e) => setFormData({ ...formData, sourceName: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}  >
                      {unitTypes.map((type, idx) => (
                        <MenuItem key={idx} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {/* Conditional fields based on sourceName */}
                  {formData.sourceName === "Channel Partner" && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Firm Name"
                          fullWidth
                          required
                          value={formData.firmName || ""}
                          onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                          size={isMobile ? "small" : "medium"}
                          sx={{ border: Constants.formInputBorderColor }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Person Name"
                          fullWidth
                          value={formData.personName || ""}
                          onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                          size={isMobile ? "small" : "medium"}
                          sx={{ border: Constants.formInputBorderColor }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Mobile No."
                          fullWidth
                          value={formData.partnerMobile || ""}
                          onChange={(e) => setFormData({ ...formData, partnerMobile: e.target.value })}
                          size={isMobile ? "small" : "medium"}
                          sx={{ border: Constants.formInputBorderColor }}
                        />
                      </Grid>
                    </>
                  )}

                  {formData.sourceName === "References" && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Reference Name"
                        fullWidth
                        value={formData.referenceName || ""}
                        required
                        onChange={(e) => setFormData({ ...formData, referenceName: e.target.value })}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  )}

                  {formData.sourceName === "Other" && (
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Other Source Name"
                        fullWidth
                        value={formData.otherSource || ""}
                        required
                        onChange={(e) => setFormData({ ...formData, otherSource: e.target.value })}
                        size={isMobile ? "small" : "medium"}
                        sx={{ border: Constants.formInputBorderColor }}
                      />
                    </Grid>
                  )}

                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowFirmForm(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  // color="success"
                  style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }}
                  onClick={() => {
                    handleFormSubmit();
                    // setShowFirmForm(false);
                  }}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
        <Dialog open={showDuplicateModal} onClose={() => setShowDuplicateModal(false)}>
          <DialogTitle>Duplicate Mobile Number</DialogTitle>
          <DialogContent>
            <p>The mobile number you entered already exists For:</p>
            {duplicateDetails.map((lead, idx) => {
              console.log("Duplicate lead details (modal):", lead);
              return (
                <Box key={idx} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                  <div><strong>Lead ID:</strong> {lead.id || "-"}</div>
                  <div><strong>Name:</strong> {lead.name || "-"}</div>
                  <div><strong>Source :</strong> {lead.source || "-"}</div>
                  <div><strong>Source Details:</strong> {lead.sourceDetails || "-"}</div>
                </Box>
              );
            })}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDuplicateModal(false)} variant="contained" color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {/* To download the excel report  */}
        <Dialog
          open={openMonthModal}
          onClose={() => setOpenMonthModal(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: "16px",
              padding: "10px",
              overflow: "visible",
              boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
              backgroundColor: "#fff",
              width: { xs: "95%", sm: "auto" },
              mx: "auto",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              color: Constants.primaryColor,
              textAlign: "center",
              borderBottom: "1px solid #eee",
              paddingBottom: "10px",
            }}
          >
            Select Report Details
          </DialogTitle>
          <DialogContent
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              overflow: "visible",
            }}>
            {/* Put both selects in one row */}
            <Box
              sx={{
                display: "flex",
                // flexDirection: "row",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                overflow: "visible",
              }}>

              {/* Report Type */}
              <TextField
                select
                label="Select"
                fullWidth
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                SelectProps={{
                  MenuProps: { disablePortal: true }, // ✅ prevents hiding under dialog
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: Constants.primaryColor,
                    fontWeight: 600,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: Constants.primaryColor },
                    "&:hover fieldset": { borderColor: "#a33344" },
                    "&.Mui-focused fieldset": {
                      borderColor: Constants.primaryColor,
                      borderWidth: "2px",
                    },
                  },
                }}>
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="sourcewise">Source wise</MenuItem>
                <MenuItem value="salespersonwise">Sales person Wise</MenuItem>
              </TextField>
              {/* Month Selection */}
              <TextField
                select
                label="Month"
                fullWidth
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                SelectProps={{
                  MenuProps: { disablePortal: true }, // ✅ keeps dropdown above modal
                }}
                sx={{
                  "& .MuiInputLabel-root": {
                    color: Constants.primaryColor,
                    fontWeight: 600,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": { borderColor: Constants.primaryColor },
                    "&:hover fieldset": { borderColor: "#a33344" },
                    "&.Mui-focused fieldset": {
                      borderColor: Constants.primaryColor,
                      borderWidth: "2px",
                    },
                  },
                }}
              >
                {monthNames.map((month, idx) => (
                  <MenuItem key={idx} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              pb: 2,
              gap: 2,
              flexWrap: "wrap",
            }}>
            <Button
              onClick={() => setOpenMonthModal(false)}
              variant="outlined"
              sx={{
                borderColor: Constants.primaryColor,
                color: Constants.primaryColor,
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
              }}>    Cancel </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: Constants.primaryColor,
                color: "#fff",
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                "&:hover": { backgroundColor: Constants.primaryColor, opacity: 0.9 },
              }}
              onClick={() => {
                if (!selectedReportType) {
                  toast.error("Please select report type", { position: "top-right" });
                  return;
                }
                if (!selectedMonth) {
                  toast.error("Please select a month", { position: "top-right" });
                  return;
                } if (selectedReportType === "sourcewise") {
                  handleDownloadExcelSource(selectedMonth);
                } else if (selectedReportType === "salespersonwise") {
                  handleDownloadSalesPersonExcel(selectedMonth);
                }
              }}  > Download </Button>
          </DialogActions>
        </Dialog>
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

    </>
  );
};

export default Leads;