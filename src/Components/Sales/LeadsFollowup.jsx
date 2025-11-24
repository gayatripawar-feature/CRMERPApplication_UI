import React, { useState, useEffect } from "react";
import { TextField, Grid, useMediaQuery, useTheme, Button } from "@mui/material";
import { FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import Leadsfollowup_followuphistory from "./leadsfollowup_followuphistory";
import UndefinedTable from "./UndefinedTable";
import BookedTable from "./BookedTable";
import PendingFollowuptable from "./PendingFollowuptable";
import { AiOutlineProject } from "react-icons/ai";
import { MdLocationCity } from "react-icons/md";
import { GiHouseKeys } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Constants from "../Constants";
import { useSession } from "../SessionContext";
import LostLeads from "./LostLeads";
  
const sections = [
  {
    label: "Pending Follow Up",
    icon: <FaUsers size={20} />,
    createLabel: "Create Firm",
  },
  {
    label: "Follow Up History",
    icon: <AiOutlineProject size={20} />,
    createLabel: "Create Project",
  },
  {
    label: "Undefined",
    icon: <MdLocationCity size={20} />,
    createLabel: "Create Landowner Info",
  },
  {
    label: "Visit Scheduled",
    icon: <GiHouseKeys size={20} />,
    createLabel: "Create Flat Allotment Info",
  },
  {
    label: "Lost Leads",
    icon: <GiHouseKeys size={20} />,
    createLabel: "Create lost leads",
  },
];
// const tabNames = ["pendingfollowup", "followuphistory", "undefined", "visit"];
const LeadsFollowUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  // const [loans, setLoans] = useState([]);
  const [leads, setLeads] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [selectedTab, setSelectedTab] = useState("pendingfollowup");
  // const [projectData, setProjectData] = useState([]);
  // const [FlatAllotement, setFlatAllotement] = useState([false]);
  //  const [Flatdata, setFlatdata] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);

  const { id: userId, name: userName, authenticated } = useSession() || {};
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
      fetchFollowupHistoryLeads();
    } else if (sections[index].label === "Pending Follow Up") {
      setSelectedTab("pendingfollowup");
      fetchUserLeads();
    } else if (sections[index].label === "Undefined") {
      setSelectedTab("undefined");
      fetchUndefinedLeads();
    } else if (sections[index].label === "Visit Scheduled") {
      setSelectedTab("visit");
      fetchVisitScheduledLeads();
    } else if (sections[index].label === "Lost Leads") {
      setSelectedTab("lost");
      fetchLostleads();
    }
  };

  const handleDownloadPDFPending = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Pending Follow-up Report", 14, 15);
    // Define new table columns
    const tableColumn = [
      "Last Follow Up",
      "Status",
      "Remark",
      "Next Follow Up",
      "Assign To",
      "Lead No.",
      "Name",
      "Mobile No. / WhatsApp No.",
      "You Are Looking For?",
      "Email",
      "Source Name",
    ];
    // Map data into rows
    const tableRows = leads.map((row) => [
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
      row.sourceName || "-",
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
      "WHATSAPP NO.",
    ];
    // Columns for the second page
    const secondPageColumns = [
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
      "CUSTOMER FEEDBACK",
    ];
    // Limit the number of rows to fit within 2 pages
    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage * 2);
    // Mapping data for the first page
    const firstPageRows = leads
      .slice(0, totalRows)
      .map((row) => [
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
      ]);
    // Mapping data for the second page
    const secondPageRows = leads
      .slice(0, totalRows)
      .map((row) => [
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
        row.customerFeedback || "-",
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
      margin: { top: 20 },
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
      margin: { top: 20 },
    });
    doc.save("Followup_History_Report.pdf");
  };
  const handleDownloadPDFUndefined = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Undefined Report", 14, 15);
    // Merged columns for a single page
    const tableColumns = [
      "STATUS HISTORY",
      "REMARK HISTORY",
      "LEAD NO",
      "NAME",
      "MOBILE NO.",
      "YOU ARE LOOKING FOR?",
      "EMAIL",
      "SOURCE NAME",
    ];

    // Limit the number of rows to fit within one page
    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage);

    // Mapping data for the table
    const tableRows = leads
      .slice(0, totalRows)
      .map((row) => [
        row.statusHistory || "-",
        row.remarkHistory || "-",
        row.leadNo || "-",
        row.name || "-",
        row.mobile || "-",
        row.lookingFor || "-",
        row.email || "-",
        row.sourceName || "-",
      ]);

    console.log("Formatted Table Rows:", tableRows);

    // Generate the table on a single page
    autoTable(doc, {
      startY: 25,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.save("Undefined_Report.pdf");
  };

  const handleDownloadPDFVisit = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Visit Scheduled Report", 14, 15);

    const tableColumns = [
      "TIMESTAMP",
      "LEAD NO.",
      "NAME",
      "MOBILE NO.",
      "YOU ARE LOOKING FOR?",
      "EMAIL",
      "SOURCE NAME",
      "LOCATION",
    ];

    const maxRowsPerPage = 15;
    const totalRows = Math.min(leads.length, maxRowsPerPage);

    const tableRows = leads
      .slice(0, totalRows)
      .map((row) => [
        row.statusHistory || "-",
        row.remarkHistory || "-",
        row.leadNo || "-",
        row.name || "-",
        row.mobile || "-",
        row.lookingFor || "-",
        row.email || "-",
        row.sourceName || "-",
      ]);

    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumns],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.save("VisitScheduled_Report.pdf");
  };

  const handleDownloadPDFLost = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Lost Leads Report", 14, 15);

    // Define table columns for Lost Leads
    const tableColumn = [
      "Lead No.", "Name", "Mobile No.", "Status",
      "Remark", "Source", "Last Updated"
    ];

    // Map data into rows
    const tableRows = leads.map(row => [
      row.leadNo || row.id || "-",
      row.name || "-",
      row.mobile || row.phone || "-",
      row.status || "-",
      row.remark || row.remarks || "-",
      row.source || row.sourceName || "-",
      row.lastUpdatedDate ? new Date(row.lastUpdatedDate).toLocaleDateString() : "-"
    ]);

    console.log("Formatted Lost Leads Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Lost_Leads_Report.pdf");
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);

  };



  const filteredRecords = filteredLeads.filter((lead) => {
    let leadDate = null;

    if (selectedTab === "followuphistory") {
      // ✅ SPECIAL FILTERING FOR followuphistory TAB - Use statusHistory column dates
      if (lead.statusHistory) {
        const historyEntries = lead.statusHistory.split("<br/>");
        for (let entry of historyEntries) {
          const dateMatch = entry.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
          if (dateMatch) {
            const dateStr = dateMatch[1];
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              const day = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1;
              const year =
                parseInt(parts[2]) < 100
                  ? 2000 + parseInt(parts[2])
                  : parseInt(parts[2]);
              leadDate = new Date(year, month, day);
              break;
            }
          }
        }
      }

      if (!leadDate) {
        const rawDate =
          lead.lastUpdatedDate && lead.lastUpdatedDate !== "0001-01-01T00:00:00"
            ? new Date(lead.lastUpdatedDate)
            : lead.createdDate && lead.createdDate !== "0001-01-01T00:00:00"
              ? new Date(lead.createdDate)
              : null;
        leadDate = rawDate;
      }
    } else if (selectedTab === "visit") {
      // ✅ SPECIAL FILTERING FOR visit TAB - Use timestamp column dates
      const rawDate =
        lead.lastUpdatedDate && lead.lastUpdatedDate !== "0001-01-01T00:00:00"
          ? new Date(lead.lastUpdatedDate)
          : lead.createdDate && lead.createdDate !== "0001-01-01T00:00:00"
            ? new Date(lead.createdDate)
            : null;
      leadDate = rawDate;
    } else if (selectedTab === "undefined") {
      // ✅ SPECIAL FILTERING FOR UNDEFINED TAB - Use statusHistory column dates
      console.group(
        `🔍 Filtering Undefined Lead: ${lead.name} (ID: ${lead.id})`
      );

      if (lead.statusHistory) {
        const historyEntries = lead.statusHistory.split("<br/>");
        console.log("Status History Entries:", historyEntries);

        // Find the most recent date from status history
        for (let entry of historyEntries) {
          const dateMatch = entry.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
          if (dateMatch) {
            const dateStr = dateMatch[1];
            const parts = dateStr.split("/");
            if (parts.length === 3) {
              const day = parseInt(parts[0]);
              const month = parseInt(parts[1]) - 1;
              const year =
                parseInt(parts[2]) < 100
                  ? 2000 + parseInt(parts[2])
                  : parseInt(parts[2]);
              leadDate = new Date(year, month, day);
              console.log(
                "✅ Found date in statusHistory:",
                dateStr,
                "->",
                leadDate
              );
              break;
            }
          }
        }

        if (!leadDate) {
          console.log("❌ No valid date found in statusHistory");
        }
      } else {
        console.log("❌ No statusHistory available");
      }
      console.groupEnd();
    } else if (selectedTab === "pendingfollowup") {
      // ✅ For pending followup, use nextFollowUp date
      const engagement =
        lead.leadEnagagements?.[0] || lead.leadEngagements?.[0];
      leadDate = engagement?.nextFollowUp
        ? new Date(engagement.nextFollowUp)
        : null;
    }
    // ⚠️ REMOVED: Lost Leads filtering logic - it will be handled in LostLeads component

    const start = startDate && startDate.$d ? new Date(startDate.$d) : null;
    const end = endDate && endDate.$d ? new Date(endDate.$d) : null;

    // console.group("📅 Filtering Lead");
    // console.log("Selected Tab:", selectedTab);
    // console.log("Lead Name:", lead.name);
    // console.log("Lead No:", lead.id);
    // console.log("leadDate (parsed):", leadDate);
    // console.log("Start Date (filter):", start);
    // console.log("End Date (filter):", end);

    let isWithinDateRange = true;
    if (leadDate) {
      // Reset time part for date comparison only
      const leadDateOnly = new Date(
        leadDate.getFullYear(),
        leadDate.getMonth(),
        leadDate.getDate()
      );
      const startOnly = start
        ? new Date(start.getFullYear(), start.getMonth(), start.getDate())
        : null;
      const endOnly = end
        ? new Date(end.getFullYear(), end.getMonth(), end.getDate())
        : null;

      isWithinDateRange =
        (!startOnly || leadDateOnly >= startOnly) &&
        (!endOnly || leadDateOnly <= endOnly);
    } else {
      // If no date found and we have date filters, exclude the record
      if (start || end) {
        console.log("❌ No date available but filters are active - EXCLUDING");
        isWithinDateRange = false;
      }
    }

    // console.log("✅ isWithinDateRange:", isWithinDateRange);

    const matchesSearch = searchTerm
      ? (lead.name &&
        lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ((lead.leadNo || lead.id) &&
        (lead.leadNo || lead.id)
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(searchTerm.toLowerCase().replace(/\s+/g, "")))
      : true;

    // console.log("🔍 matchesSearch:", matchesSearch);
    console.groupEnd();

    return isWithinDateRange && matchesSearch;
  });



  const fetchUserLeads = async () => {
    try {
      if (!authenticated || !userId) {
        console.warn("⚠️ No active session or user ID found");
        setFilteredLeads([]);
        return []; // ✅ return empty array for consistency
      }

      // console.log("👤 Logged-in User ID:", userId);

      // ✅ Fetch all leads from backend
      const response = await fetch("https://localhost:5289/sales/api/leads", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      // console.log("📦 All leads fetched:", data);

      // ✅ Filter leads assigned to the logged-in user
      const userLeads = data?.filter(
        (lead) =>
          lead.leadEnagagements &&
          lead.leadEnagagements.some((eng) => eng.assignedTo === userId)
      );

      // console.log("🎯 Filtered user leads:", userLeads);

      // ✅ Update state
      setFilteredLeads(userLeads);

      // ✅ Return leads so child (PendingFollowuptable) can log them
      return userLeads;
    } catch (error) {
      console.error("❌ Error fetching user leads:", error);
      return null; // return something so it never stays undefined
    }
  };

  useEffect(() => {
    fetchUserLeads();
  }, [userId, authenticated]);

  const fetchVisitScheduledLeads = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/leads", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      // console.log("🎯 All Leads:", data);

      // ✅ Filter for only visit scheduled
      const visitScheduled = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "visit_scheduled" ||
          lead.status?.toLowerCase() === "visit scheduled"
      );

      // console.log("📅 Visit Scheduled Leads:", visitScheduled);
      setFilteredLeads(visitScheduled);
      setLeads(visitScheduled);
    } catch (error) {
      console.error("❌ Error fetching Visit Scheduled leads:", error);
    }
  };

  const fetchUndefinedLeads = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/leads", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      // console.log("🎯 All Leads:", data);

      // ✅ Filter for only undefined
      const undefinedLeads = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "invalid number" ||
          lead.status?.toLowerCase() === "invalid_number" ||
          lead.status?.toLowerCase() === "invalidnumber"
      );

      // console.log("📅 Visit Scheduled Leads:", visitScheduled);
      // setFilteredLeads(visitScheduled);
      setFilteredLeads(undefinedLeads);
      // setLeads(visitScheduled);
      setLeads(undefinedLeads);
    } catch (error) {
      console.error(" Error fetching Visit Scheduled leads:", error);
    }
  };

  



  // const fetchFollowupHistoryLeads = async () => {
  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });
  //     if (!response.ok) throw new Error("Network response not ok");

  //     const data = await response.json();

  //     // Format date neatly
  //     const formatDate = (dateStr) => {
  //       if (!dateStr || dateStr === "0001-01-01T00:00:00") return "";
  //       const d = new Date(dateStr);
  //       return isNaN(d)
  //         ? ""
  //         : d.toLocaleString("en-IN", {
  //           dateStyle: "short",
  //           timeStyle: "short",
  //         });
  //     };

  //     // Roman numerals helper
  //     const toRoman = (num) => {
  //       const romans = [
  //         "i",
  //         "ii",
  //         "iii",
  //         "iv",
  //         "v",
  //         "vi",
  //         "vii",
  //         "viii",
  //         "ix",
  //         "x",
  //       ];
  //       return romans[num - 1] || num;
  //     };

  //     const sanitize = (val) => {
  //       if (
  //         !val ||
  //         val.trim() === "" ||
  //         val.trim() === "-" ||
  //         val.trim() === "---"
  //       )
  //         return "";
  //       return val.trim();
  //     };

  //     const formattedData = data.map((lead) => {
  //       const leadBase = {
  //         leadNo: lead.id || "-",
  //         name: lead.name || "-",
  //         phone: lead.phone || "-",
  //         email: lead.email || "-",
  //         source: lead.source || "-",
  //         leadDays: lead.createdDate
  //           ? Math.ceil(
  //             (new Date() - new Date(lead.createdDate)) /
  //             (1000 * 60 * 60 * 24)
  //           )
  //           : "-",
  //       };

  //       const allHistory = [];

  //       // Add current record (only if it has real values)
  //       if (
  //         sanitize(lead.status) ||
  //         sanitize(lead.remarks) ||
  //         sanitize(lead.lastUpdatedBy)
  //       ) {
  //         allHistory.push({
  //           date: lead.lastUpdatedDate || lead.createdDate,
  //           status: lead.status || "",
  //           remark: lead.remarks || "",
  //           assignedTo: lead.lastUpdatedBy || "",
  //         });
  //       }

  //       // Engagement records
  //       const engagements = lead.leadEngagements || lead.leadEnagagements || [];
  //       engagements.forEach((eng) => {
  //         const engDate =
  //           eng.timestamp ||
  //           eng.updatedDate ||
  //           eng.assignedDate ||
  //           lead.lastUpdatedDate ||
  //           lead.createdDate;

  //         // Push only if there’s any non-empty value
  //         if (
  //           sanitize(eng.status) ||
  //           sanitize(eng.remarks) ||
  //           sanitize(eng.assignedToName || eng.assignedTo)
  //         ) {
  //           allHistory.push({
  //             date: engDate,
  //             status: eng.status || "",
  //             remark: eng.remarks || "",
  //             assignedTo: eng.assignedToName || eng.assignedTo || "",
  //           });
  //         } else {
  //           // Push even if empty, but mark as "No change"
  //           allHistory.push({
  //             date: engDate,
  //             status: "No change",
  //             remark: "No change",
  //             assignedTo: "No change",
  //           });
  //         }
  //       });

  //       // Sort latest first
  //       allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

  //       // 🧩 Utility: Build each line
  //       const buildHistoryLine = (h, i, value) => {
  //         const date = formatDate(h.date);
  //         const text = sanitize(value);

  //         // Skip if both missing
  //         if (!date && !text) return null;

  //         // If only date, show "No change"
  //         // if (!text) return `${toRoman(i + 1)}. ${date} - No change`;
  //          if (!text) return `${date} - No change`;

  //         // If only text
  //         // if (!date) return `${toRoman(i + 1)}. ${text}`;
  //         if (!date) return `${date} - ${text}`;
  //         // if (!date)
  //         //   return `${toRoman(i + 1)}. ${formatDate(h.date)} - ${text}`;

  //         // Both date & text exist
  //         // return `${toRoman(i + 1)}. ${date} - ${text}`;
  //         return `${date} - ${text}`;

  //       };

  //       // Build all 3 histories cleanly
  //       const statusHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.status))
  //         .filter(Boolean)
  //         .join("<br/>");

  //       const remarkHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.remark))
  //         .filter(Boolean)
  //         .join("<br/>");

  //       const assignToHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.assignedTo))
  //         .filter(Boolean)
  //         .join("<br/>");

  //       return {
  //         ...leadBase,
  //         time: formatDate(lead.lastUpdatedDate || lead.createdDate),
  //         statusHistory,
  //         remarkHistory,
  //         assignToHistory,
  //       };
  //     });

  //     setFilteredLeads(formattedData);
  //     setLeads(formattedData);
  //   } catch (error) {
  //     console.error("Error fetching follow-up history:", error);
  //   }
  // };


const fetchFollowupHistoryLeads = async () => {
  try {
    const response = await fetch("https://localhost:5289/sales/api/leads", {
      credentials: "include",
    });
    if (!response.ok) throw new Error("Network response not ok");

    const data = await response.json();

    // OGGED-IN USER DETAILS FROM SESSION
    const loggedUserId = userId;   
    const loggedUserName = userName;
    
    //  Helper: Convert ID → Name (only for logged-in user)
    const getAssignedToName = (id) => {
      if (!id) return "";

      // If ID matches logged-in user → return logged-in name
      if (String(id).trim() === String(loggedUserId).trim()) {
        return loggedUserName;
      }

      // Otherwise return id (because no users table exists)
      return id;
    };
    //  FILTERING LOGIC for leads to lognied sales person
    const filteredByUser = data.filter((lead) => {
      const assignedMain =
        lead.assignedTo === userId ||
        lead.lastUpdatedBy === userId ||
        lead.createdBy === userId;

      const assignedInEngagements =
        lead.leadEnagagements &&
        lead.leadEnagagements.some((eng) => eng.assignedTo === userId);

      return assignedMain || assignedInEngagements;
    });

    // Format date neatly
    const formatDate = (dateStr) => {
      if (!dateStr || dateStr === "0001-01-01T00:00:00") return "";
      const d = new Date(dateStr);
      return isNaN(d)
        ? ""
        : d.toLocaleString("en-IN", {
            dateStyle: "short",
            timeStyle: "short",
          });
    };

    const sanitize = (val) => {
      if (!val || val.trim() === "" || val.trim() === "-" || val.trim() === "---")
        return "";
      return val.trim();
    };

    const formattedData = filteredByUser.map((lead) => {
      const leadBase = {
        leadNo: lead.id || "-",
        name: lead.name || "-",
        phone: lead.phone || "-",
        email: lead.email || "-",
        source: lead.source || "-",
        leadDays: lead.createdDate
          ? Math.ceil(
              (new Date() - new Date(lead.createdDate)) /
                (1000 * 60 * 60 * 24)
            )
          : "-",
      };

      const allHistory = [];

      // Push current record
      if (
        sanitize(lead.status) ||
        sanitize(lead.remarks) ||
        sanitize(lead.lastUpdatedBy)
      ) {
        allHistory.push({
          date: lead.lastUpdatedDate || lead.createdDate,
          status: lead.status || "",
          remark: lead.remarks || "",
          // assignedTo: lead.lastUpdatedBy || "",
           assignedTo: getAssignedToName(lead.lastUpdatedBy),
        });
      }

      // Engagements
      const engagements =
        lead.leadEngagements || lead.leadEnagagements || [];
      engagements.forEach((eng) => {
        const engDate =
          eng.timestamp ||
          eng.updatedDate ||
          eng.assignedDate ||
          lead.lastUpdatedDate ||
          lead.createdDate;

        if (
          sanitize(eng.status) ||
          sanitize(eng.remarks) ||
          sanitize(eng.assignedToName || eng.assignedTo)
        ) {
          allHistory.push({
            date: engDate,
            status: eng.status || "",
            remark: eng.remarks || "",
            // assignedTo: eng.assignedToName || eng.assignedTo || "",
              assignedTo: getAssignedToName(eng.assignedTo),
          });
        } else {
          allHistory.push({
            date: engDate,
            status: "No change",
            remark: "No change",
            assignedTo: "No change",
          });
        }
      });

      // Sort latest first
      allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Build lines
      const buildHistoryLine = (h, i, value) => {
        const date = formatDate(h.date);
        const text = sanitize(value);

        if (!date && !text) return null;
        if (!text) return `${date} - No change`;
        if (!date) return `${date} - ${text}`;
        return `${date} - ${text}`;
      };

      // Build final 3 columns
      const statusHistory = allHistory
        .map((h, i) => buildHistoryLine(h, i, h.status))
        .filter(Boolean)
        .join("<br/>");

      const remarkHistory = allHistory
        .map((h, i) => buildHistoryLine(h, i, h.remark))
        .filter(Boolean)
        .join("<br/>");

      const assignToHistory = allHistory
        .map((h, i) => buildHistoryLine(h, i, h.assignedTo))
        .filter(Boolean)
        .join("<br/>");

      return {
        ...leadBase,
        time: formatDate(lead.lastUpdatedDate || lead.createdDate),
        statusHistory,
        remarkHistory,
        assignToHistory,
      };
    });

    setFilteredLeads(formattedData);
    setLeads(formattedData);
  } catch (error) {
    console.error("Error fetching follow-up history:", error);
  }
};

  const fetchLostleads = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/leads", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();

      const lostLeads = data.filter((lead) => {
        const status = lead.status?.toLowerCase().trim();

        return (
          status === "lost" ||
          status === "booked_another_property" ||
          status === "booked another property" ||
          status === "booked in another project" ||
          status === "booked_in_another_project" ||
          status === "booked property in other project"
        );
      });

      console.log(
        "📉 Lost Leads (including booked in another project):",
        lostLeads
      );

      setFilteredLeads(lostLeads);
      setLeads(lostLeads);
    } catch (error) {
      console.error("❌ Error fetching Lost Leads:", error);
    }
  };
  // console.log("13. Component rendering - current state:");
  // console.log("  - expandedSection:", expandedSection);
  // console.log("  - selectedTab:", selectedTab);
  // console.log("  - filteredLeads:", filteredLeads);
  // console.log("  - filteredRecords:", filteredRecords);
  // console.log("  - searchTerm:", searchTerm);

  return (
    <div className="container my-2">
      <h6 className="mb-3 fs-6">Sales Module / Lead Follow Up Management</h6>
      <div
        className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-3"
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
            </div>
          ))}
        </div>

        <button
          className="btn"
          onClick={() => {
            if (selectedTab === "pendingfollowup") handleDownloadPDFPending();
            else if (selectedTab === "followuphistory")
              handleDownloadPDFHistory();
            else if (selectedTab === "undefined") handleDownloadPDFUndefined();
            else if (selectedTab === "visit") handleDownloadPDFVisit();
            else if (selectedTab === "lost") handleDownloadPDFLost();
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
        {/* Left side — Only show for non-Lost Leads tabs */}
        {selectedTab !== "lost" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
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
            {/* Clear Filters Button */}
            <Button
              variant="contained"
              color="primary"
              style={{
                background: Constants.primaryColor,
                width: isMobile ? "100%" : "auto",
              }}
              className="fw-bold"
              size={isMobile ? "small" : "medium"}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </div>
        )}
        {/* Only show search for non-Lost Leads tabs and Pagination also */}
        {selectedTab !== "lost" && (
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
                width: "180px",
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
        )}
      </div>

      {expandedSection === 0 && selectedTab === "pendingfollowup" && (
        <div className="content-container mt-3">
          <div className="mt-3">
            <PendingFollowuptable
              // data={filteredLeads}
              data={filteredRecords}
              onSelectLead={setSelectedLead}
              isMobile={isMobile}
              isTablet={isTablet}
              fetchUserLeads={fetchUserLeads}
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
              // data={filteredLeads}
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
              // data={filteredLeads}
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
              // data={filteredLeads}
              data={filteredRecords}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          </div>
        </div>
      )}

      {expandedSection === 4 && selectedTab === "lost" && (
        <div className="content-container mt-3">
          <div className="mt-3">
            <LostLeads
              data={filteredLeads}
              // data={filteredRecords}
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
  );
};

export default LeadsFollowUp;
