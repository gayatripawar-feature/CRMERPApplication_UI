import React, { useState, useEffect } from 'react';
import { TextField, Grid, useMediaQuery, useTheme, } from '@mui/material';
import { FaFileDownload } from "react-icons/fa";
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
import { useSession } from "../SessionContext";
import LostLeads from './LostLeads';

const sections = [
  { label: "Pending Follow Up", icon: <FaUsers size={20} />, createLabel: "Create Firm" },
  { label: "Follow Up History", icon: <AiOutlineProject size={20} />, createLabel: "Create Project" },
  { label: "Undefined", icon: <MdLocationCity size={20} />, createLabel: "Create Landowner Info" },
  { label: "Visit Scheduled", icon: <GiHouseKeys size={20} />, createLabel: "Create Flat Allotment Info" },
  { label: "Lost Leads", icon: <GiHouseKeys size={20} />, createLabel: "Create lost leads" }
];
// const tabNames = ["pendingfollowup", "followuphistory", "undefined", "visit"];
const LeadsFollowUp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  // const [loans, setLoans] = useState([]);
  const [leads, setLeads] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [selectedTab, setSelectedTab] = useState("pendingfollowup");
  // const [projectData, setProjectData] = useState([]);
  // const [FlatAllotement, setFlatAllotement] = useState([false]);
  //  const [Flatdata, setFlatdata] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  // const filteredRecords = filteredLeads.filter((lead) => {

  //   const engagement = lead.leadEnagagements?.[0];
  //   const nextFollowUp = engagement?.nextFollowUp ? new Date(engagement.nextFollowUp) : null;

  //   // Convert MUI/Dayjs objects safely
  //   const start = startDate && startDate.$d ? new Date(startDate.$d) : null;
  //   const end = endDate && endDate.$d ? new Date(endDate.$d) : null;

  //   console.log("🟦 Checking Lead:", lead.name, "| nextFollowUp:", engagement?.nextFollowUp);
  //   console.log("Start Date (Filter):", start);
  //   console.log("End Date (Filter):", end);

  //   const isWithinDateRange = nextFollowUp
  //     ? (!start || nextFollowUp >= start) && (!end || nextFollowUp <= end)
  //     : true;

  //   const matchesSearch = searchTerm
  //     ? lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       (lead.leadNo && lead.leadNo.toString().includes(searchTerm))
  //     : true;

  //   return isWithinDateRange && matchesSearch;
  // });

  const filteredRecords = filteredLeads.filter((lead) => {
    let leadDate = null;

    if (selectedTab === "followuphistory") {
      // leadDate = lead.time ? new Date(lead.time) : null;
      const rawDate =
        lead.lastUpdatedDate && lead.lastUpdatedDate !== "0001-01-01T00:00:00"
          ? new Date(lead.lastUpdatedDate)
          : lead.createdDate && lead.createdDate !== "0001-01-01T00:00:00"
            ? new Date(lead.createdDate)
            : null;

      leadDate = rawDate;
    } else {
      const engagement = lead.leadEnagagements?.[0] || lead.leadEngagements?.[0];
      leadDate = engagement?.nextFollowUp ? new Date(engagement.nextFollowUp) : null;
    }

    const start = startDate && startDate.$d ? new Date(startDate.$d) : null;
    const end = endDate && endDate.$d ? new Date(endDate.$d) : null;

    console.group("📅 Filtering Lead");
    console.log("Selected Tab:", selectedTab);
    console.log("Lead Name:", lead.name);
    console.log("Lead No:", lead.id);
    console.log("lead.time (raw):", lead.time);
    console.log("leadDate (parsed):", leadDate);
    console.log("Start Date (filter):", start);
    console.log("End Date (filter):", end);

    let isWithinDateRange = true;
    if (leadDate) {
      isWithinDateRange =
        (!start || leadDate >= start) && (!end || leadDate <= end);
    }

    console.log("✅ isWithinDateRange:", isWithinDateRange);

    const matchesSearch = searchTerm
      ? (
        (lead.name && lead.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        ((lead.leadNo || lead.id) &&
          (lead.leadNo || lead.id)
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(searchTerm.toLowerCase().replace(/\s+/g, '')))
      )
      : true;



    console.log("🔍 matchesSearch:", matchesSearch);
    console.groupEnd();


    return isWithinDateRange && matchesSearch;
  });





  // const fetchUserLeads = async () => {
  //   try {
  //     if (!authenticated || !userId) {
  //       console.warn("⚠️ No active session or user ID found");
  //       setFilteredLeads([]);
  //       // setLoading(false);
  //       return;
  //     }

  //     console.log("👤 Logged-in User ID:", userId);

  //     // Fetch all leads from backend
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch leads");
  //     }

  //     const data = await response.json();
  //     console.log(" All leads fetched:", data);

  //     // Filter leads assigned to the logged-in user
  //     const userLeads = data?.filter(
  //       (lead) =>
  //         lead.leadEnagagements &&
  //         lead.leadEnagagements.some((eng) => eng.assignedTo === userId)
  //     );

  //     console.log("🎯 Filtered user leads:", userLeads);
  //     // console.log(JSON.stringify(userLeads, null, 2));



  //     setFilteredLeads(userLeads);
  //   } catch (error) {
  //     console.error("❌ Error fetching user leads:", error);
  //   } finally {
  //     // setLoading(false);
  //   }

  // };



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



  // correct :
  // const fetchFollowupHistoryLeads = async () => {
  //   console.log("🚀 Starting FOLLOW-UP HISTORY fetch...");

  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });

  //     if (!response.ok) throw new Error("❌ Network response was not ok");

  //     const data = await response.json();
  //     console.log("🧠 Raw API data received:", data);

  //     const formatDate = (dateStr) => {
  //       if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
  //       const d = new Date(dateStr);
  //       return isNaN(d)
  //         ? "-"
  //         : d.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "medium" });
  //     };

  //     const formattedData = data.flatMap((lead, i) => {
  //       const engagements = lead.leadEngagements || lead.leadEnagagements || [];

  //       console.group(`📋 Lead [${i}] ➡️ ID: ${lead.id}, Name: ${lead.name}`);
  //       console.log("🔁 Engagement count:", engagements.length);
  //       console.log("📅 Lead-level lastUpdatedDate:", lead.lastUpdatedDate);
  //       console.log("📅 Lead createdDate:", lead.createdDate);
  //       console.log("🧾 Lead status:", lead.status, "| remarks:", lead.remarks);
  //       console.groupEnd();

  //       // 🧭 If no engagements, still show one basic row
  //       if (engagements.length === 0) {
  //         const lastDate = lead.lastUpdatedDate || lead.createdDate || null;
  //         return [
  //           {
  //             leadNo: lead.id || "-",
  //             name: lead.name || "-",
  //             phone: lead.phone || "-",
  //             email: lead.email || "-",
  //             source: lead.source || "-",
  //             leadDays: lead.createdDate
  //               ? Math.ceil(
  //                   (new Date() - new Date(lead.createdDate)) /
  //                     (1000 * 60 * 60 * 24)
  //                 )
  //               : "-",
  //             time: formatDate(lastDate),
  //             statusHistory: `${formatDate(lastDate)} - ${lead.status || "-"}`,
  //             remarkHistory: `${formatDate(lastDate)} - ${lead.remarks || "-"}`,
  //             assignToHistory: `${formatDate(lastDate)} - ${
  //               lead.lastUpdatedBy || "-"
  //             }`,
  //           },
  //         ];
  //       }

  //       // ✅ Build full history for that lead (all follow-ups)
  //       const engagementHistory = engagements.map((eng, j) => {
  //         // 👇 check what fields we actually have in engagement
  //         console.group(`🔍 Engagement [${j}] of Lead ID ${lead.id}`);
  //         console.log("Full engagement object:", eng);
  //         console.groupEnd();

  //         const engDate =
  //           eng.timestamp ||
  //           eng.updatedDate ||
  //           eng._assignedDate ||
  //           eng.assignedDate ||
  //           lead.lastUpdatedDate ||
  //           lead.createdDate;

  //         return {
  //           leadNo: lead.id || "-",
  //           name: lead.name || "-",
  //           phone: lead.phone || "-",
  //           email: lead.email || "-",
  //           source: lead.source || "-",
  //           leadDays: lead.createdDate
  //             ? Math.ceil(
  //                 (new Date() - new Date(lead.createdDate)) /
  //                   (1000 * 60 * 60 * 24)
  //               )
  //             : "-",
  //           time: formatDate(engDate),
  //           // statusHistory: `${formatDate(engDate)} - ${eng.status || "-"}`,
  //           // remarkHistory: `${formatDate(engDate)} - ${eng.remarks || "-"}`,
  //           // assignToHistory: `${formatDate(engDate)} - ${
  //           //   eng.assignedToName || eng.assignedTo || "-"
  //           // }`,


  //         };
  //       });

  //       // 🧾 Include base info (the original lead creation)
  //       const baseEntry = {
  //         leadNo: lead.id || "-",
  //         name: lead.name || "-",
  //         phone: lead.phone || "-",
  //         email: lead.email || "-",
  //         source: lead.source || "-",
  //         leadDays: lead.createdDate
  //           ? Math.ceil(
  //               (new Date() - new Date(lead.createdDate)) /
  //                 (1000 * 60 * 60 * 24)
  //             )
  //           : "-",
  //         time: formatDate(lead.createdDate),
  //         statusHistory: `${formatDate(lead.lastUpdatedDate)} - ${
  //           lead.status || "-"
  //         }`,
  //         remarkHistory: `${formatDate(lead.lastUpdatedDate)} - ${
  //           lead.remarks || "-"
  //         }`,
  //         assignToHistory: `${formatDate(lead.lastUpdatedDate)} - ${
  //           lead.lastUpdatedBy || "-"
  //         }`,
  //       };

  //       // Combine base + all follow-ups
  //       return [baseEntry, ...engagementHistory];
  //     });

  //     console.log("✅ Final formatted data count:", formattedData.length);
  //     console.log("🧩 Sample formatted data:", formattedData.slice(0, 5));
  //     setFilteredLeads(formattedData);
  //     setLeads(formattedData);
  //   } catch (error) {
  //     console.error("🔥 Error fetching follow-up history:", error);
  //   }
  // };


  // const fetchFollowupHistoryLeads = async () => {
  //   console.log("🚀 Starting FOLLOW-UP HISTORY fetch...");

  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });

  //     if (!response.ok) throw new Error("❌ Network response was not ok");

  //     const data = await response.json();
  //     console.log("🧠 Raw API data received:", data);

  //     const formatDate = (dateStr) => {
  //       if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
  //       const d = new Date(dateStr);
  //       return isNaN(d)
  //         ? "-"
  //         : d.toLocaleString("en-IN", { dateStyle: "short", timeStyle: "medium" });
  //     };

  //     // Using map() now to ensure exactly one output row per lead
  //     const formattedData = data.map((lead, i) => {
  //       // Handle potential field name variations
  //       const engagements = lead.leadEngagements || lead.leadEnagagements || [];

  //       // Arrays to store history entries, starting with the lead's current/latest state
  //       const statusHistory = [];
  //       const remarkHistory = [];
  //       const assignToHistory = [];

  //       // 1. Add the Lead's current/latest status as the first entry
  //       const lastUpdatedDate = lead.lastUpdatedDate || lead.createdDate;
  //       const formattedLastUpdated = formatDate(lastUpdatedDate);

  //       if (lead.status || lead.remarks || lead.lastUpdatedBy) {
  //         statusHistory.push(
  //           `${formattedLastUpdated} - ${lead.status || "- "}`
  //         );
  //         remarkHistory.push(
  //           `${formattedLastUpdated} - ${lead.remarks || ""}`
  //         );
  //         assignToHistory.push(
  //           `${formattedLastUpdated} - ${lead.lastUpdatedBy || " "}`
  //         );
  //       }

  //       // 2. Aggregate all engagement history
  //       engagements.forEach((eng) => {
  //         const engDate =
  //           eng.timestamp ||
  //           eng.updatedDate ||
  //           eng._assignedDate ||
  //           eng.assignedDate ||
  //           lead.lastUpdatedDate ||
  //           lead.createdDate;

  //         const formattedEngDate = formatDate(engDate);

  //         // Add Engagement Status/Remark/Assignee
  //         statusHistory.push(`${formattedEngDate} - ${eng.status || "-"}`);
  //         remarkHistory.push(`${formattedEngDate} - ${eng.remarks || "-"}`);
  //         assignToHistory.push(
  //           `${formattedEngDate} - ${eng.assignedToName || eng.assignedTo || "-"}`
  //         );
  //       });

  //       // Define the separator string to act as a horizontal line between history items
  //       const separator = "\n---\n";

  //       // 3. Return a single aggregated object for this lead
  //       const leadDays = lead.createdDate
  //         ? Math.ceil(
  //             (new Date() - new Date(lead.createdDate)) / (1000 * 60 * 60 * 24)
  //           )
  //         : "-";

  //       return {
  //         leadNo: lead.id || "-",
  //         name: lead.name || "-",
  //         phone: lead.phone || "-",
  //         email: lead.email || "-",
  //         source: lead.source || "-",
  //         leadDays: leadDays,
  //         time: formattedLastUpdated, // Last updated time

  //         // 4. Concatenate all history entries using the separator
  //         statusHistory: statusHistory.join(separator),
  //         remarkHistory: remarkHistory.join(separator),
  //         assignToHistory: assignToHistory.join(separator),
  //       };
  //     }); // End of data.map

  //     console.log("✅ Final formatted data count:", formattedData.length);
  //     console.log("🧩 Sample formatted data:", formattedData.slice(0, 5));
  //     setFilteredLeads(formattedData);
  //     setLeads(formattedData);
  //   } catch (error) {
  //     console.error("🔥 Error fetching follow-up history:", error);
  //   }
  // };

  // const fetchFollowupHistoryLeads = async () => {
  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });
  //     if (!response.ok) throw new Error("Network response not ok");

  //     const data = await response.json();

  //     const formatDate = (dateStr) => {
  //       if (!dateStr || dateStr === "0001-01-01T00:00:00") return "-";
  //       const d = new Date(dateStr);
  //       return isNaN(d)
  //         ? "-"
  //         : d.toLocaleString("en-IN", {
  //             dateStyle: "short",
  //             timeStyle: "short",
  //           });
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
  //               (new Date() - new Date(lead.createdDate)) /
  //                 (1000 * 60 * 60 * 24)
  //             )
  //           : "-",
  //       };

  //       const allHistory = [];

  //       // Current record
  //       if (lead.lastUpdatedDate || lead.status || lead.remarks) {
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

  //         allHistory.push({
  //           date: engDate,
  //           status: eng.status || "",
  //           remark: eng.remarks || "",
  //           assignedTo: eng.assignedToName || eng.assignedTo || "",
  //         });
  //       });

  //       // Sort latest first
  //       allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));


  //       const sanitize = (val) => {
  //   if (!val || val.trim() === "" || val.trim() === "-" || val.trim() === "---") return "";
  //   return val.trim();
  // };
  //       // Create multi-line HTML (with <br/>)
  //       const statusHistory = allHistory
  //   .map((h) => `${formatDate(h.date)} - ${sanitize(h.status)}`)
  //   .filter((line) => !line.endsWith("- ")) // Remove empty values
  //   .join("<br/>");

  //       // const remarkHistory = allHistory
  //       //   .map((h) => `${formatDate(h.date)} - ${h.remark}`)
  //       //   .join("<br/>");
  //       const remarkHistory = allHistory
  //   .map((h) => {
  //     const remarkText =
  //       h.remark && h.remark.trim() && h.remark.trim() !== "---"
  //         ? h.remark.trim()
  //         : "-"; // show single dash if empty or ---
  //     return `${formatDate(h.date)} - ${remarkText}`;
  //   })
  //   .join("<br/>");


  //       // const assignToHistory = allHistory
  //       //   .map((h) => `${formatDate(h.date)} - ${h.assignedTo}`)
  //       //   .join("<br/>");
  // const assignToHistory = allHistory
  //   .map((h) => {
  //     const assignText =
  //       h.assignedTo && h.assignedTo.trim() && h.assignedTo.trim() !== "---"
  //         ? h.assignedTo.trim()
  //         : "-";
  //     return `${formatDate(h.date)} - ${assignText}`;
  //   })
  //   .join("<br/>");
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
  //             dateStyle: "short",
  //             timeStyle: "short",
  //           });
  //     };

  //     // Roman numerals helper
  //     const toRoman = (num) => {
  //       const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  //       return romans[num - 1] || num;
  //     };

  //     const sanitize = (val) => {
  //       if (!val || val.trim() === "" || val.trim() === "-" || val.trim() === "---")
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
  //               (new Date() - new Date(lead.createdDate)) / (1000 * 60 * 60 * 24)
  //             )
  //           : "-",
  //       };

  //       const allHistory = [];

  //       // Add current record
  //       if (lead.lastUpdatedDate || lead.status || lead.remarks) {
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

  //         allHistory.push({
  //           date: engDate,
  //           status: eng.status || "",
  //           remark: eng.remarks || "",
  //           assignedTo: eng.assignedToName || eng.assignedTo || "",
  //         });
  //       });

  //       // Sort latest first
  //       allHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

  //       // 🧩 Utility: Build each line (show "-" only if both date and value missing)
  //       const buildHistoryLine = (h, i, value) => {
  //         const date = formatDate(h.date);
  //         const text = sanitize(value);

  //         if (!date && !text) return `${toRoman(i + 1)}. -`;
  //         if (!date) return `${toRoman(i + 1)}. ${text}`;
  //         if (!text) return `${toRoman(i + 1)}. ${date}`;
  //         return `${toRoman(i + 1)}. ${date} - ${text}`;
  //       };

  //       // Build all 3 histories cleanly
  //       const statusHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.status))
  //         .join("<br/>");

  //       const remarkHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.remark))
  //         .join("<br/>");

  //       const assignToHistory = allHistory
  //         .map((h, i) => buildHistoryLine(h, i, h.assignedTo))
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

      // Roman numerals helper
      const toRoman = (num) => {
        const romans = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
        return romans[num - 1] || num;
      };

      const sanitize = (val) => {
        if (!val || val.trim() === "" || val.trim() === "-" || val.trim() === "---")
          return "";
        return val.trim();
      };

      const formattedData = data.map((lead) => {
        const leadBase = {
          leadNo: lead.id || "-",
          name: lead.name || "-",
          phone: lead.phone || "-",
          email: lead.email || "-",
          source: lead.source || "-",
          leadDays: lead.createdDate
            ? Math.ceil(
              (new Date() - new Date(lead.createdDate)) / (1000 * 60 * 60 * 24)
            )
            : "-",
        };

        const allHistory = [];

        // Add current record (only if it has real values)
        if (sanitize(lead.status) || sanitize(lead.remarks) || sanitize(lead.lastUpdatedBy)) {
          allHistory.push({
            date: lead.lastUpdatedDate || lead.createdDate,
            status: lead.status || "",
            remark: lead.remarks || "",
            assignedTo: lead.lastUpdatedBy || "",
          });
        }

        // Engagement records
        const engagements = lead.leadEngagements || lead.leadEnagagements || [];
        engagements.forEach((eng) => {
          const engDate =
            eng.timestamp ||
            eng.updatedDate ||
            eng.assignedDate ||
            lead.lastUpdatedDate ||
            lead.createdDate;

          // Push only if there’s any non-empty value
          if (sanitize(eng.status) || sanitize(eng.remarks) || sanitize(eng.assignedToName || eng.assignedTo)) {
            allHistory.push({
              date: engDate,
              status: eng.status || "",
              remark: eng.remarks || "",
              assignedTo: eng.assignedToName || eng.assignedTo || "",
            });
          } else {
            // Push even if empty, but mark as "No change"
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

        // 🧩 Utility: Build each line
        const buildHistoryLine = (h, i, value) => {
          const date = formatDate(h.date);
          const text = sanitize(value);

          // Skip if both missing
          if (!date && !text) return null;

          // If only date, show "No change"
          if (!text) return `${toRoman(i + 1)}. ${date} - No change`;

          // If only text
          // if (!date) return `${toRoman(i + 1)}. ${text}`;
          if (!date) return `${toRoman(i + 1)}. ${formatDate(h.date)} - ${text}`;

          // Both date & text exist
          return `${toRoman(i + 1)}. ${date} - ${text}`;
        };

        // Build all 3 histories cleanly
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


  // const fetchLostleads = async () => {
  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/leads", {
  //       credentials: "include",
  //     });
  //     if (!response.ok) throw new Error("Failed to fetch leads");

  //     const data = await response.json();

  //     // ✅ Include all "lost" variations and "booked in another project"
  //     const lostLeads = data.filter((lead) => {
  //       const status = lead.status?.toLowerCase().trim();

  //       return (
  //         status === "lost" ||
  //         status === "BOOKED_ANOTHER_PROPERTY" ||
  //         status === "BOOKED ANOTHER PROPERTY" ||
  //         status === "booked in another project" ||
  //         status === "booked_in_another_project" ||
  //         status === "BOOKED PROPERTY IN OTHER PROJECT"
  //       );
  //     });

  //     console.log("📉 Lost Leads (including booked in another project):", lostLeads);

  //     setFilteredLeads(lostLeads);
  //     setLeads(lostLeads);
  //   } catch (error) {
  //     console.error("❌ Error fetching Lost Leads:", error);
  //   }
  // };


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

    console.log("📉 Lost Leads (including booked in another project):", lostLeads);

    setFilteredLeads(lostLeads);
    setLeads(lostLeads);
  } catch (error) {
    console.error("❌ Error fetching Lost Leads:", error);
  }
};


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
  )
};

export default LeadsFollowUp;