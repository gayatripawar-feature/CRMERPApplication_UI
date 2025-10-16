import React, { useState, useRef, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TextField, Grid, MenuItem, Box, Tooltip, IconButton,
  useMediaQuery, useTheme, Dialog, DialogTitle, DialogContent, DialogActions,TablePagination,
} from '@mui/material';
import { FaEye, FaFileCsv, FaFileExcel,FaUpload ,FaFileDownload } from "react-icons/fa";


import { ToastContainer, toast } from "react-toastify";
import NewLeads from './NewLeads';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';
import { FaTimes } from 'react-icons/fa';
import * as XLSX from "xlsx";
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
    console.log("data",data);
    console.log("data length",data.length);
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
    }

    const savedLead = await response.json();
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
  // const [mobile, setMobile] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  // duplicate mobile no :
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
const [duplicateDetails, setDuplicateDetails] = useState([]);
const[openMonthModal,setOpenMonthModal]=useState(false);
const [selectedReportType, setSelectedReportType] = useState("");
const[selectedMonth,setSelectedMonth] =useState("");

  useEffect(() => {
  const loadLeads = async () => {
    const data = await fetchLeadsData();
    // setLoans(data); // or setInventoryData(data) if you want to show in your table 
    setInventoryData(data);
  };

  loadLeads();
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
 const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };
   const handleToggleSection = (index) => {
  if (index === 1) {
    // Sample CSV action
    downloadSampleCsv();
    setExpandedSection(index); // just expand the button for visual effect
    return; // don’t switch content
  }

  if (index === 2) {
    // Upload Excel action
    if (fileInputRef.current) fileInputRef.current.click();
    setExpandedSection(index); // just expand the button for visual effect
    return; // don’t switch content
  }

  // For the first tab (Display Leads) — show its content
  setExpandedSection(index);
  setShowFileInput(false);
};

  // const handleDelete = (index) => {
  //   setInventoryData(inventoryData.filter((_, i) => i !== index));
  // };
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
    }

    setName(value);
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
    // setFormData({ ...formData, mobile: e.target.value });
    setFormData({ ...formData, phone: e.target.value });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // validateEmail(value);
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
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const handleFormSubmit = async () => {
    //  Validate required fields
    console.log("Submitting formData:", formData);
    if (!formData.name || !formData.phone || !formData.lookingFor || !formData.sourceName) {
        toast.error("Please fill in all required fields", { position: "top-right", autoClose: 3000 });
        return;
    }

    //  Check for duplicate mobile
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

    // 3️⃣ Prepare source details
    let sourceDetails = "";
    if (formData.sourceName === "Channel Partner") {
        sourceDetails = `${formData.firmName || ""}; ${formData.personName || ""}; ${formData.partnerMobile || ""}`;
    } else if (formData.sourceName === "References") {
        sourceDetails = formData.referenceName || "";
    } else if (formData.sourceName === "Other") {
        sourceDetails = formData.otherSource || "";
    }

    // 4️⃣ Construct payload for API
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
        // 5️⃣ Call backend API
        const savedLead = await createLead(newLead); 
        console.log("Saved lead from API:", savedLead);

        // 6️⃣ Format API response for table
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

        // 7️⃣ Update state immediately
        // setInventoryData([formattedLead, ...inventoryData]);

         // ✅ REFETCH latest leads from backend
    const latestData = await fetchLeadsData();
    alert(JSON.stringify(latestData, null, 2));
    setInventoryData(latestData);

        // 8️⃣ Clear form
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

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the current page data
  // const paginatedData = inventoryData.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );
 

  

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
 console.log("paginated filtered data ",paginatedFilteredData.length);
 console.log("Inventory data",inventoryData.length);
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


// Downlaod Excel Monthewise Functions :
const handleDownloadSalesPersonExcel = (month) => {
  try {
    setOpenMonthModal(false);

    if (!month) {
      toast.error("Please select a month before downloading.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const year = new Date().getFullYear();
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

    // 🗓 Define weeks (Friday → Thursday)
    const weeks = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    const firstFriday = new Date(firstDayOfMonth);
    while (firstFriday.getDay() !== 5) firstFriday.setDate(firstFriday.getDate() - 1);

    let currentStart = new Date(firstFriday);
    while (currentStart <= lastDayOfMonth) {
      const currentEnd = new Date(currentStart);
      currentEnd.setDate(currentStart.getDate() + 6);

      const sD = String(currentStart.getDate()).padStart(2, "0");
      const sM = String(currentStart.getMonth() + 1).padStart(2, "0");
      const eD = String(currentEnd.getDate()).padStart(2, "0");
      const eM = String(currentEnd.getMonth() + 1).padStart(2, "0");

      weeks.push({
        start: new Date(currentStart),
        end: new Date(currentEnd),
        label: `Week ${weeks.length + 1} (${sD}/${sM} - ${eD}/${eM})`,
      });

      currentStart.setDate(currentStart.getDate() + 7);
    }

    // 🧩 Fixed category list
    const categorySources = {
      "Direct Walk-in": ["Actual Site", "Direct Call"],
      "Site Branding": ["Hoarding", "Exhibition", "Pamphlet", "Online Portal"],
      "Channel Partner": ["Channel Partner"],
      "Referral Program": ["References", "Reference"],
      "Digital Media": [
        "Facebook",
        "Instagram",
        "Website",
        "Print Media",
        "Radio",
        "Google Add",
      ],
    };

    // Build lowercase lookup map
    const categoryMap = {};
    Object.entries(categorySources).forEach(([cat, arr]) => {
      arr.forEach((s) => (categoryMap[s.toLowerCase()] = cat));
    });

    // Initialize counts
    const categoryCounts = {};
    Object.keys(categorySources).forEach((cat) => {
      categoryCounts[cat] = new Array(weeks.length).fill(0);
    });

    // Parse timestamp function (safe)
    const parseTimestampToDate = (ts) => {
      if (!ts) return null;
      const d1 = new Date(ts);
      if (!isNaN(d1)) return d1;

      // fallback: "14/10/2025, 10:30 AM"
      const parts = String(ts).split(",")[0].split(/[-/]/);
      if (parts.length < 3) return null;
      let [a, b, c] = parts.map((x) => parseInt(x));
      if (c < 100) c += 2000;
      const d = new Date(c, b - 1, a);
      return isNaN(d) ? null : d;
    };

    // 🔢 Count leads
    inventoryData.forEach((lead) => {
      if (!lead.timestamp || !lead.sourceName) return;
      const date = parseTimestampToDate(lead.timestamp);
      if (!date || date.getMonth() !== monthIndex) return;

      const src = lead.sourceName?.trim().toLowerCase();
      const category = categoryMap[src];
      if (!category) return;

      const weekIndex = weeks.findIndex((w) => date >= w.start && date <= w.end);
      if (weekIndex === -1) return;

      categoryCounts[category][weekIndex]++;
    });

    // 🧮 Prepare Excel Data
    const reportTitle = `Source Wise Lead Report (${month})`;
    const headerRow = ["Source Name", ...weeks.map((w) => w.label), "Expenses"];
    const data = [[reportTitle], [], headerRow];

    const fixedCategories = [
      "Direct Walk-in",
      "Site Branding",
      "Channel Partner",
      "Referral Program",
      "Digital Media",
    ];

   fixedCategories.forEach((cat) => {
  const counts = categoryCounts[cat] || new Array(weeks.length).fill(0);
  data.push([cat, ...counts, 0]); // Expenses always 0
});


    // Total row
    const totals = ["Total"];
    for (let i = 0; i < weeks.length; i++) {
      const weekTotal = Object.values(categoryCounts).reduce(
        (sum, arr) => sum + (arr[i] || 0),
        0
      );
      totals.push(weekTotal);
    }
    const grandTotal = Object.values(categoryCounts)
      .flat()
      .reduce((a, b) => a + b, 0);
totals.push(0); // Expenses total also 0
    data.push(totals);

    // 📘 Excel Creation
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: headerRow.length - 1 } },
    ];
    ws["!cols"] = headerRow.map(() => ({ wch: 22 }));

    // Apply Styles
    const headerRowIndex = 2;
    const totalRowIndex = data.length - 1;

    for (const cellAddr of Object.keys(ws)) {
      if (cellAddr[0] === "!") continue;
      const cell = ws[cellAddr];
      if (!cell.s) cell.s = {};
      const { r } = XLSX.utils.decode_cell(cellAddr);

      if (r === 0) {
        // title row
        cell.s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "305496" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
      } else if (r === headerRowIndex) {
        // header
        cell.s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      } else if (r === totalRowIndex) {
        // total row
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "FFD966" } },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      } else {
        // regular rows
        cell.s = {
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Source Report");
    XLSX.writeFile(wb, `Source_Wise_Report_${month}_${year}.xlsx`);

    toast.success(
      `Sales Person Wise Report for ${month} downloaded successfully!`,
      { position: "top-right", autoClose: 3000 }
    );
  } catch (error) {
    console.error("Excel download error:", error);
    toast.error("Error generating Excel report. Check console.", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};


const handleDownloadExcelLeads = (month) => {
  try {
    setOpenMonthModal(false);

    if (!month) {
      toast.error("Please select a month before downloading.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const year = new Date().getFullYear();
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth();

    // 🗓 Define weeks (Friday → Thursday)
    const weeks = [];
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
    const firstFriday = new Date(firstDayOfMonth);
    while (firstFriday.getDay() !== 5) firstFriday.setDate(firstFriday.getDate() - 1);

    let currentStart = new Date(firstFriday);
    while (currentStart <= lastDayOfMonth) {
      const currentEnd = new Date(currentStart);
      currentEnd.setDate(currentStart.getDate() + 6);

      const sD = String(currentStart.getDate()).padStart(2, "0");
      const sM = String(currentStart.getMonth() + 1).padStart(2, "0");
      const eD = String(currentEnd.getDate()).padStart(2, "0");
      const eM = String(currentEnd.getMonth() + 1).padStart(2, "0");

      weeks.push({
        start: new Date(currentStart),
        end: new Date(currentEnd),
        label: `Week ${weeks.length + 1} (${sD}/${sM} - ${eD}/${eM})`,
      });

      currentStart.setDate(currentStart.getDate() + 7);
    }

    // ✅ Fixed 6 source/salesperson categories
    const fixedSources = [
      "Main Sales",
      "Ranjeet Rajkumar Kamble",
      "Yogita Satish Dalvi",
      "Shubhangi Omkar Patil",
      "Ajay Ravindra Kate",
      "Tester",
    ];

    // Initialize counts
    const sourceCounts = {};
    fixedSources.forEach((src) => {
      sourceCounts[src] = new Array(weeks.length).fill(0);
    });

    // Safe timestamp parser
    const parseTimestampToDate = (ts) => {
      if (!ts) return null;
      const d1 = new Date(ts);
      if (!isNaN(d1)) return d1;

      const parts = String(ts).split(",")[0].split(/[-/]/);
      if (parts.length < 3) return null;
      let [a, b, c] = parts.map((x) => parseInt(x));
      if (c < 100) c += 2000;
      const d = new Date(c, b - 1, a);
      return isNaN(d) ? null : d;
    };

    // 🔢 Count leads per salesperson per week
    inventoryData.forEach((lead) => {
      if (!lead.timestamp || !lead.assignTo) return;
      const date = parseTimestampToDate(lead.timestamp);
      if (!date || date.getMonth() !== monthIndex) return;

      const assigned = lead.assignTo.trim();
      if (!fixedSources.includes(assigned)) return;

      const weekIndex = weeks.findIndex((w) => date >= w.start && date <= w.end);
      if (weekIndex === -1) return;

      sourceCounts[assigned][weekIndex]++;
    });

    // 🧮 Prepare Excel Data
    const reportTitle = `Sales person wise Lead Report (${month})`;
    const headerRow = ["Sales person", ...weeks.map((w) => w.label), "Expenses"];
    const data = [[reportTitle], [], headerRow];

   fixedSources.forEach((src) => {
  const counts = sourceCounts[src] || new Array(weeks.length).fill(0);
  data.push([src, ...counts, 0]); // last column = 0
});


    // Total row (sum across all 6 people)
    const totals = ["Total"];
    for (let i = 0; i < weeks.length; i++) {
      const weekTotal = Object.values(sourceCounts).reduce(
        (sum, arr) => sum + (arr[i] || 0),
        0
      );
      totals.push(weekTotal);
    }
    const grandTotal = Object.values(sourceCounts)
      .flat()
      .reduce((a, b) => a + b, 0);
totals.push(0); // Expenses total = 0
    data.push(totals);

    // 📘 Create Excel Sheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: headerRow.length - 1 } }];
    ws["!cols"] = headerRow.map(() => ({ wch: 22 }));

    // 🎨 Styles
    const headerRowIndex = 2;
    const totalRowIndex = data.length - 1;

    for (const cellAddr of Object.keys(ws)) {
      if (cellAddr[0] === "!") continue;
      const cell = ws[cellAddr];
      if (!cell.s) cell.s = {};
      const { r } = XLSX.utils.decode_cell(cellAddr);

      if (r === 0) {
        cell.s = {
          font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "305496" } },
          alignment: { horizontal: "center", vertical: "center" },
        };
      } else if (r === headerRowIndex) {
        cell.s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "4472C4" } },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      } else if (r === totalRowIndex) {
        cell.s = {
          font: { bold: true },
          fill: { fgColor: { rgb: "FFD966" } },
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      } else {
        cell.s = {
          alignment: { horizontal: "center" },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }
    }

    // 📤 Export File
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, `Sales_person_Wise_Lead_Report_${month}_${year}.xlsx`);

    toast.success(`Source Wise Lead Report for ${month} downloaded successfully!`, {
      position: "top-right",
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Excel download error:", error);
    toast.error("Error generating Source Wise Excel report. Check console.", {
      position: "top-right",
      autoClose: 3000,
    });
  }
};




  return (
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
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleToggleSection(index)}
                  sx={{
                    padding: 0,
                    marginRight: '8px',
                    fontSize: '24px',
                    color: 'white',
                  }}
                >
                  {section.icon}
                </IconButton>

                <span className='fw-bold'
                  style={{
                    color: 'white',
                    fontSize: '16px',
                    display: expandedSection === index ? 'inline' : 'none',
                    marginLeft: '8px',
                  }}
                >
                  {section.label}
                </span>
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
                    sx={{fontWeight:"bold"}}
                  >
                    + New Leads
                  </Button>
                  <Button
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
                  </Button>
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
        // 3. Set a consistent, constrained width to allow space for the pagination, even on mobile.
        width: isMobile ? "150px" : "200px", // <--- KEY CHANGE: Fixed width to prevent 100% width on mobile
        border: Constants.formInputBorderColor,
        flexShrink: 0, // Prevents the search field from shrinking too much
      }}
    />

    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={inventoryData.length} 
      // count={paginatedFilteredData.length} 
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Rows:"
      labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count} entries`}
      sx={{
        minWidth: 200, // Ensure enough space for all pagination controls
        flexShrink: 0, // Prevents the pagination control from shrinking too much
        // Original styles for internal layout
        '& .MuiTablePagination-toolbar': {
          flexDirection: 'row',
          alignItems: 'center',
          gap: '4px',
          padding: '0px',
        },
        '& .MuiTablePagination-spacer': {
          display: 'none',
        },
        '& .MuiTablePagination-actions': {
          marginLeft: '4px',
        },
        '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
          fontSize: isMobile ? '12px' : '14px',
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
              fullScreen={isMobile}
            >
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
    sx={{ color: 'white' }}
  >
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
                      sx={{ border: Constants.formInputBorderColor }}

                    />
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
                      sx={{ border: Constants.formInputBorderColor }}

                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      label="Location"
                      fullWidth
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}

                    />
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
                      sx={{ border: Constants.formInputBorderColor }}

                    >
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


<Dialog
  open={openMonthModal}
  onClose={() => setOpenMonthModal(false)}
  maxWidth="xs"
  fullWidth
  PaperProps={{
    sx: {
      borderRadius: "16px",
      padding: "10px",
      boxShadow: "0px 8px 30px rgba(0,0,0,0.2)",
      backgroundColor: "#fff",
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
  }}
>
  {/* Put both selects in one row */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: 2,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {/* Report Type */}
    <TextField
      select
      label="Select"
      fullWidth
      value={selectedReportType}
      onChange={(e) => setSelectedReportType(e.target.value)}
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
<MenuItem value="">Select</MenuItem>
<MenuItem value="sales">Source wise</MenuItem>
<MenuItem value="source">Sales person Wise</MenuItem>

    </TextField>

    {/* Month Selection */}
    <TextField
      select
      label="Month"
      fullWidth
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(e.target.value)}
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
    }}
  >
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
      }}
    >
      Cancel
    </Button>
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
    }

    // ✅ Correct logic — call the real Excel download function
if (selectedReportType === "sales") {
  handleDownloadSalesPersonExcel(selectedMonth);
} else if (selectedReportType === "source") {
  handleDownloadExcelLeads(selectedMonth);
}

    
  }}
  
>
  Download
</Button>

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
  );
};

export default Leads;