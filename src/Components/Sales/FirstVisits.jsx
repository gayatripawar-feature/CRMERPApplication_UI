import React, { useState, useRef, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, FormControl, InputLabel,
  Select, MenuItem, Box, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash, FaFileDownload } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import DisplayEnquiryTable from "./DisplayEnquiryTable";
import { FaHourglassStart, FaHistory, FaUserCheck, FaQuestionCircle } from 'react-icons/fa';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import FormHelperText from "@mui/material/FormHelperText";
import Constants from "../Constants";
import FirstvisitfollowupUndefinedTable from "./FirstvisitfollowupUndefinedTable";
// import FirstvisitfollowupbookedTable from "./FirstvisitfollowupbookedTable";
import FirstvisitfollowupbookedTable from "./FirstvisitFollowupbookedTable";
import { FirstVisitFollowupHistoryTable } from "./FirstVisitFollowupHistoryTable";

const statusOptions = ["Approved", "Unapproved"];
const owners = ["Landowner", "Developer", "Investor"];
const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
const unitTypes = ["Actual Site", "Hoarding", "Facebook", "Instagram", "Website", "Print Media", "Radio", "Google add", "Exhibition",
  "Online Portal", "Direct call", "Pamphlet", "Channel Partner", "References", "Other"];
const sections = [
  {
    label: "Display Enquiries",
    icon: <FaEye size={24} />,
    bgColor: "primary.main",
  },
  // {
  //   label: "Sample CSV",
  //   icon: <FaFileCsv size={24} />,
  //   bgColor: "success.main",
  // },
  // {
  //   label: "Upload Excel",
  //   icon: <FaUpload size={24} />,
  //   bgColor: "secondary.main",
  // },
  // {
  //   label: "Pending Follow Up",
  //   icon: <FaHourglassStart size={20} />,
  //   createLabel: "Create Firm",
  // },
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

const FirstVisits = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [partners, setPartners] = useState([]);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);
  const [leadNo, setLeadNo] = useState("");
  const [salesExec, setSalesExec] = useState("");
  const [projectData, setProjectData] = useState([]);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [interestedIn, setInterestedIn] = useState("");
  const [planningToBuy, setPlanningToBuy] = useState("");
  const [occupation, setOccupation] = useState("");
  const [budget, setBudget] = useState("");
  const [reasonForPurchase, setReasonForPurchase] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState(false);
  const [alternateContact, setAlternateContact] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [firms, setFirms] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [referenceBySource, setReferenceBySource] = useState("");
  const [nameOfCp, setNameOfCp] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState("");
  const [showLandownerForm, setShowLandownerForm] = useState(false);
  //  const [leads, setLeads] = useState([]);
  const [leads, setLeads] = useState({ scheduled: [], done: [] });
  const [remarks, setRemarks] = useState();
  const [selectedLead, setSelectedLead] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showFlatForm, setShowFlatForm] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [visitFollowupHistory, setVisitFollowupHistory] = useState([]);
  const [filteredVisitFollowupHistory, setFilteredVisitFollowupHistory] = useState([]);
  const [undefinedData, setUndefinedData] = useState([]);

  useEffect(() => {
    console.log("fetching visit Scheduled leads ");
    console.log(" FIRMS VALUE RIGHT NOW =", firms, "TYPE =", typeof firms);

    fetchVisitScheduledLeads();
    fetchEnquiries();
  }, []);
  const fileInputRef = useRef(null);
  const [data, setData] = useState([]);
  const handleInterestedInChange = (event) => {
    setInterestedIn(event.target.value);
  };
  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };
  const handlePlanningToBuyChange = (event) => {
    setPlanningToBuy(event.target.value);
  };
  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };
  const handleToggleSection = (index) => {
    setExpandedSection(index);
    setShowFileInput(false);
    // if (index === 1) {
    //   fetchVisitFollowupHistory();
    // }
    if (index === 1) {
      fetchVisitFollowupHistory().then((data) => {
        console.log("SETTING visitFollowupHistory:", data);
        setVisitFollowupHistory(data);
        if (index === 2) {
          console.log("booked clicked");
          fetchBookedEnquiries();
        }
      });
    }

  };
  const handleChange = (e) => {
    const value = e.target.value;
    const regex = /[\d\s]/;
    if (regex.test(value)) {
      setError("Name should not contain digits or spaces");
    } else {
      setError("");
    }
  };
  //correct
  //  const fetchEnquiries = async () => {
  //     try {
  //       const response = await fetch("https://localhost:5289/sales/api/enquiries", {
  //         credentials: "include",
  //       });
  //       if (!response.ok) throw new Error("Failed");
  //        const data = await response.json();
  //       setFirms(data);
  //       // If not set belwo line then it wont shows the submitted enquiries.
  //       setEnquiries(data);
  //       return data;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //after project fixing :
  // const fetchEnquiries = async () => {
  //   try {
  //     const response = await fetch("https://localhost:5289/sales/api/enquiries", {
  //       credentials: "include",
  //     });

  //     if (!response.ok) throw new Error("Failed");

  //     const data = await response.json();

  //     // 🔥 FIX: Convert single object → array
  //     const arr = Array.isArray(data) ? data : [data];

  //     setFirms(arr);      // always an array
  //     setEnquiries(arr);  // always an array

  //     return arr;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };


  const fetchEnquiries = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();

      console.log("🔥 RAW API RESPONSE:", data);

      // FINAL NORMALIZATION
      const arr = Array.isArray(data.pagedRecords)
        ? data.pagedRecords
        : [];

      console.log("💚 Normalized enquiries:", arr);

      setFirms(arr);
      setEnquiries(arr);

      return arr;

    } catch (err) {
      console.error(err);
    }
  };


  const normalizeBudget = (value) => {
    if (!value) return 0;
    const num = parseInt(value); // takes "45 L - 50 L" → 45
    return isNaN(num) ? 0 : num;
  };

  const handleSubmit = async () => {


    if (!leadNo) return toast.error("Lead No. is required");
    //  Check if enquiry for this lead already exists
    // const existingEnquiry = firms.find(f => f.leadNo === leadNo);
    // const existingEnquiry = firms.find(
    //   f => String(f.leadNo) === String(leadNo)
    // );

    //after:
    const existingEnquiry = firms.find(
      f => String(f.leadId) === String(leadNo)
    );

    // Prepare payload
    const payload = {
      leadId: Number(leadNo),
      name: name || "",
      phone: mobile ? parseInt(mobile) : 0,
      whatsapp: whatsappNo ? parseInt(whatsappNo) : 0,
      email: email || "",
      address: address || "",
      occupation: occupation || "",
      company: company || "",
      interest: interestedIn || "",
      // budgetInLakh: budget ? parseFloat(budget) : 0,
      budgetInLakh: budget ? Number(budget) : 0,
      // intendedPurchasePeriodMonths: planningToBuy ? parseInt(planningToBuy) : 0,
      intendedPurchasePeriod: planningToBuy || "",
      purchaseReason: "",
      lastSiteVisit: new Date().toISOString(),
      source: referenceBySource || "",
      remarks: remarks || "",
      status: "New Enquiry",
      // lastUpdatedBy: "system",
      // lastUpdatedDate: new Date().toISOString(),
      enquiryRequest: {
        id: 0,
        assignedTo: "system",
        assignedBy: "system",
        assignedDate: new Date().toISOString(),
        enquiryId: 0,
        // nextFollowUp: new Date().toISOString(),
        nextFollowUpDate: new Date().toISOString(),
        lastVisitDate: new Date().toISOString(),
        nextVisitScheduledDate: new Date().toISOString(),
        status: "New Enquiry",
        remarks: remarks || "",
        lastUpdatedDate: new Date().toISOString(),

      }
    };
    console.log("lead no is", leadNo);
    try {
      let response;
      if (existingEnquiry) {

        // const updatePayload = {
        //   id: existingEnquiry.id,
        //   leadId: Number(leadNo),
        //   name: name || existingEnquiry.name,
        //   phone: mobile ? Number(mobile) : existingEnquiry.phone,
        //   whatsapp: whatsappNo ? Number(whatsappNo) : existingEnquiry.whatsapp,
        //   email: email || existingEnquiry.email,
        //   address: address || existingEnquiry.address,
        //   occupation: occupation || existingEnquiry.occupation,
        //   company: company || existingEnquiry.company,
        //   interest: interestedIn || existingEnquiry.interest,

        //   // REQUIRED numeric field
        //   budgetInLakh: budget
        //     ? Number(budget)
        //     : Number(existingEnquiry.budgetInLakh) || 0,

        //   // REQUIRED fields
        //   intendedPurchasePeriod:
        //     planningToBuy || existingEnquiry.intendedPurchasePeriod || "",
        //   purchaseReason:
        //     existingEnquiry.purchaseReason || "",

        //   lastSiteVisit: existingEnquiry.lastSiteVisit,
        //   source: referenceBySource || existingEnquiry.source,
        //   remarks: remarks || existingEnquiry.remarks,
        //   status: existingEnquiry.status,

        //   enquiryRequest: {
        //     id: existingEnquiry.enquiryRequest?.id || 0,
        //     assignedTo: existingEnquiry.enquiryRequest?.assignedTo || "system",
        //     assignedBy: existingEnquiry.enquiryRequest?.assignedBy || "system",
        //     assignedDate:
        //       existingEnquiry.enquiryRequest?.assignedDate ||
        //       new Date().toISOString(),
        //     enquiryId: existingEnquiry.id,

        //     nextFollowUpDate:
        //       existingEnquiry.enquiryRequest?.nextFollowUpDate ||
        //       new Date().toISOString(),
        //     lastVisitDate:
        //       existingEnquiry.enquiryRequest?.lastVisitDate ||
        //       new Date().toISOString(),
        //     nextVisitScheduledDate:
        //       existingEnquiry.enquiryRequest?.nextVisitScheduledDate ||
        //       new Date().toISOString(),

        //     status: existingEnquiry.enquiryRequest?.status || "New Enquiry",
        //     remarks: remarks || existingEnquiry.enquiryRequest?.remarks || "",

        //     purchaseReason:
        //       existingEnquiry.enquiryRequest?.purchaseReason || "",
        //     intendedPurchasePeriod:
        //       planningToBuy ||
        //       existingEnquiry.enquiryRequest?.intendedPurchasePeriod ||
        //       "",

        //     lastUpdatedDate: new Date().toISOString(),
        //   }
        // };

        const updatePayload = {
          id: existingEnquiry.id,
          leadId: Number(leadNo),

          name: name || existingEnquiry.name,
          phone: mobile ? Number(mobile) : Number(existingEnquiry.phone) || 0,
          whatsapp: whatsappNo ? Number(whatsappNo) : Number(existingEnquiry.whatsapp) || 0,
          email: email || existingEnquiry.email,
          address: address || existingEnquiry.address,
          occupation: occupation || existingEnquiry.occupation,
          company: company || existingEnquiry.company,
          interest: interestedIn || existingEnquiry.interest,

          budgetInLakh: normalizeBudget(budget || existingEnquiry.budgetInLakh),

          intendedPurchasePeriod:
            planningToBuy || existingEnquiry.intendedPurchasePeriod || "",

          purchaseReason: existingEnquiry.purchaseReason || "",
          lastSiteVisit: existingEnquiry.lastSiteVisit,
          source: referenceBySource || existingEnquiry.source,
          remarks: remarks || existingEnquiry.remarks,
          status: existingEnquiry.status,

          enquiryRequest: {
            id: existingEnquiry.enquiryRequest?.id || 0,
            assignedTo: existingEnquiry.enquiryRequest?.assignedTo || "system",
            assignedBy: existingEnquiry.enquiryRequest?.assignedBy || "system",
            assignedDate:
              existingEnquiry.enquiryRequest?.assignedDate ||
              new Date().toISOString(),

            enquiryId: existingEnquiry.id,

            nextFollowUpDate:
              existingEnquiry.enquiryRequest?.nextFollowUpDate ||
              new Date().toISOString(),

            lastVisitDate:
              existingEnquiry.enquiryRequest?.lastVisitDate ||
              new Date().toISOString(),

            nextVisitScheduledDate:
              existingEnquiry.enquiryRequest?.nextVisitScheduledDate ||
              new Date().toISOString(),

            status: existingEnquiry.enquiryRequest?.status || "New Enquiry",
            remarks: remarks || existingEnquiry.enquiryRequest?.remarks || "",

            intendedPurchasePeriod:
              planningToBuy ||
              existingEnquiry.enquiryRequest?.intendedPurchasePeriod ||
              "",

            lastUpdatedDate: new Date().toISOString(),
          }
        };
        console.log("FINAL PAYLOAD SENT TO API:", updatePayload);

        //  UPDATE existing enquiry
        console.log(" Updating existing enquiry:", existingEnquiry.id);
        response = await fetch(
          `https://localhost:5289/sales/api/enquiries/${existingEnquiry.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            // body: JSON.stringify(payload),
            body: JSON.stringify(updatePayload),
          }
        );
        toast.success("Enquiry updated successfully!");
      } else {
        //  CREATE new enquiry
        console.log(" Creating new enquiry");
        response = await fetch(
          "https://localhost:5289/sales/api/enquiries",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),

          }
        );
        const saved = await response.json();        //  GET NEW ENQUIRY
        setEnquiries(prev => [...prev, saved]);
        toast.success("Enquiry added successfully!");
      }

      if (!response.ok) throw new Error(await response.text());
      //       fetchEnquiries();          
      //  fetchVisitScheduledLeads();
      const updated = await fetchEnquiries();   // waits for updated data
      // const updatedEnquiry = updated.find(f => String(f.leadNo) === String(leadNo));
      const updatedEnquiry = updated.find(
        f => Number(f.leadId) === Number(selectedLead?.id)
      );
      console.log(" Fresh enquiry from server:", updatedEnquiry);
      console.log("leadNo:", leadNo);
      console.log("existingEnquiry.leadNo:", existingEnquiry?.leadNo);
      console.log("existingEnquiry.leadNo:", updatedEnquiry?.leadNo);
      // Reset form
      setLeadNo("");
      setName("");
      setMobile("");
      setWhatsappNo("");
      setEmail("");
      setAddress("");
      setCompany("");
      setInterestedIn("");
      setBudget("");
      setOccupation("");
      setReferenceBySource("");
      setPlanningToBuy("");
      setRemarks("");
      setShowFirmForm(false);
      fetchEnquiries(); // refresh table
    } catch (err) {
      console.error(" Error:", err);
      toast.error("Failed to submit enquiry");
    }
  };

  const availableLeads = (leads.scheduled || []).filter(
    lead => !firms.some(enq => Number(enq.leadId) === Number(lead.id))
  );
  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) {
      setMobileError("Mobile number should contain exactly 10 digits");
    } else {
      setMobileError("");
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;
    if (regex.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setName(value);
      setNameError(true);
    }
  };
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
  const handleDownloadPDF_Enquiries = () => {
    if (firms.length === 0) {
      toast.info("No data available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("First Visit Report", 14, 15);
    const firstPageColumns = [
      "Timestamp",
      "Enquiry No",
      "Lead No",
      "Name",
      "Mobile",
      "Whatsapp",
      "Email",
      "Address",
    ];
    const secondPageColumns = [
      "Occupation",
      "Company",
      "Interested In",
      "Budget",
      "Reference",
      "Name Of CP",
      "Planning To Buy",
      "FollowUp Details",
    ];
    const firstPageRows = firms.map((row) => [
      row.timestamp || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.whatsappNo || "-",
      row.email || "-",
      row.address || "-",
    ]);


    const secondPageRows = firms.map((row) => [
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.referenceBySource || "-",
      row.nameOfCp || "-",
      row.planningToBuyWithin || "-",
      row.followupDetails || "-",
    ]);


    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });


    doc.addPage("landscape");
    doc.text("First Visit Report (Continued)", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });


    doc.save("FirstVisit_Enquiries_Report.pdf");

    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };



  const handleDownloadPDF_History = () => {
    if (firms.length === 0) {
      toast.info("No data available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("First Visit Pending Follow Up Report", 14, 15);

    const firstPageColumns = [
      "Status History",
      "Remark History",
      "Assign To History",
      "Timestamp",
      "Enquiry No",
      "Lead No",
      "Sales Executive Name",
      "Name",
    ];


    const secondPageColumns = [
      "Mobile",
      "Whatsapp No",
      "Address",
      "Occupation",
      "Company",
      "Interested In",
      "Budget",
      "Reason For Purchase",
      "Customer Feedback",
    ];


    const firstPageRows = firms.map((row) => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.assignToHistory || "-",
      row.timestamp || "-",
      row.enquiryNo || "-",
      row.leadNo || "-",
      row.salesExecutiveName || "-",
      row.name || "-",
    ]);


    const secondPageRows = firms.map((row) => [
      row.mobile || "-",
      row.whatsappNo || "-",
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.customerFeedback || "-",
    ]);


    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });


    doc.addPage("landscape");
    doc.text("First Visit Pending Follow Up Report (Continued)", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });


    doc.save("FirstVisit_Followup_Report.pdf");

    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const handleDownloadPDF_Booked = () => {
    if (firms.length === 0) {
      toast.info("No data available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("First Visit Booked Report", 14, 15);


    const firstPageColumns = [
      "Enquiry No",
      "Name",
      "Mobile",
      "Alternate Contact No",
      "Email",
      "Address",
      "Occupation",
      "Company",
    ];


    const secondPageColumns = [
      "Interested In",
      "Budget",
      "Reason For Purchase",
      "Reference By",
      "Planning To Buy Within",
      "Customer Feedback",
    ];


    const firstPageRows = firms.map((row) => [
      row.enquiryNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.whatsappNo || "-",
      row.email || "-",
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
    ]);


    const secondPageRows = firms.map((row) => [
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.referenceBySource || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-",
    ]);


    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.addPage("landscape");
    doc.text("First Visit Booked Report (Continued)", 14, 15);

    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });


    doc.save("FirstVisit_Booked_Report.pdf");

    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const handleDownloadPDF_Undefined = () => {
    if (firms.length === 0) {
      toast.info("No data available to download", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("First Visit Undefined Report", 14, 15);

    // Columns for the first page
    const firstPageColumns = [
      "Status History",
      "Remark History",
      "Assign To History",

      "Enquiry No",
      "Lead No",
      "Name",
      "Mobile No",
      "Email",
    ];

    // Columns for the second page
    const secondPageColumns = [
      "Address",
      "Occupation",
      "Company",
      "Interested In",
      "Budget",
      "Reason For Purchase",
      "Planning to Buy within",
      "Customer Feedback"

    ];

    // Mapping data for the first page
    const firstPageRows = firms.map((row) => [
      row.statusHistory || "-",
      row.remarkHistory || "-",
      row.assignToHistory || "-",

      row.enquiryNo || "-",
      row.leadNo || "-",
      row.name || "-",
      row.mobile || "-",
      row.email || "-",
    ]);

    // Mapping data for the second page
    const secondPageRows = firms.map((row) => [
      row.address || "-",
      row.occupation || "-",
      row.company || "-",
      row.interestedIn || "-",
      row.budget || "-",
      row.reasonForPurchase || "-",
      row.planningToBuyWithin || "-",
      row.customerFeedback || "-",
    ]);


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
    doc.addPage("landscape");
    doc.text("Visits Report (Continued)", 14, 15);

    // Generate the second page
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20 },
    });

    doc.save("FirstVisit_Undefined_Report.pdf");

    toast.success("PDF downloaded successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const scheduledLeads =
    Array.isArray(leads.scheduled) ? leads.scheduled : [];

  const handleLeadNoChange = (e) => {
    const selectedLeadNo = e.target.value;

    console.log(" DROPDOWN CHANGED — Selected Lead No:", selectedLeadNo);
    console.log(" firms loaded (Enquiries count):", firms.length, firms);

    setLeadNo(selectedLeadNo);

    //  Check enquiry using the NEW value directly
    console.log("🔍 Searching enquiry for LeadNo:", selectedLeadNo);

    const existingEnquiry = firms.find(
      (f) => Number(f.leadId) === Number(selectedLeadNo)
    );

    console.log("🧾 Matched enquiry:", existingEnquiry);

    if (existingEnquiry) {
      console.log("🟢 FOUND existing enquiry → loading enquiry data");

      setName(existingEnquiry.name);
      setMobile(existingEnquiry.phone);
      setWhatsappNo(existingEnquiry.whatsapp);
      setEmail(existingEnquiry.email);
      setAddress(existingEnquiry.address);
      setCompany(existingEnquiry.company);
      setInterestedIn(existingEnquiry.interest);
      setBudget(existingEnquiry.budgetInLakh);
      setOccupation(existingEnquiry.occupation);
      setReferenceBySource(existingEnquiry.source);
      setPlanningToBuy(existingEnquiry.intendedPurchasePeriodMonths);
      setRemarks(existingEnquiry.remarks);
      return;
    }

    //  If no enquiry found → load scheduled lead
    const lead = leads.scheduled.find(
      (l) => Number(l.id) === Number(selectedLeadNo)
    );

    console.log(" NO ENQUIRY FOUND → loading scheduled lead:", lead);

    setSelectedLead(lead);

    setName(lead?.name || "");
    setMobile(lead?.phone || "");
    setWhatsappNo(lead?.whatsapp || "");
    setEmail(lead?.email || "");
    setAddress(lead?.address || "");
    setCompany(lead?.company || "");
    setInterestedIn(lead?.interest || "");
    setBudget(lead?.budgetInLakh || "");
    setOccupation(lead?.occupation || "");
    setReferenceBySource(lead?.source || "");
    setPlanningToBuy(lead?.intendedPurchasePeriodMonths || "");
    setRemarks("");
  };


  const handleDeleteFirm = (firmToDelete, index) => {
    // Use index to delete the specific row
    setFirms((prev) => prev.filter((firm, i) => i !== index));

    toast.success("Record deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleUpdateFirm = (updatedFirm, index) => {
    setFirms((prev) => {
      const updatedFirms = [...prev];
      // Update the specific firm at the given index
      if (index !== null && index >= 0 && index < updatedFirms.length) {
        updatedFirms[index] = {
          ...updatedFirms[index],
          ...updatedFirm,
          // Keep the original timestamp if it exists, otherwise add new one
          remarkHistory:
            updatedFirm.remarkHistory || updatedFirms[index].remarkHistory,
        };
      } else {
        // Fallback: find by leadNo if index is not available
        const firmIndex = updatedFirms.findIndex(
          (f) => f.leadNo === updatedFirm.leadNo
        );
        if (firmIndex !== -1) {
          updatedFirms[firmIndex] = {
            ...updatedFirms[firmIndex],
            ...updatedFirm,
            remarkHistory:
              updatedFirm.remarkHistory ||
              updatedFirms[firmIndex].remarkHistory,
          };
        }
      }
      return updatedFirms;
    });

    toast.success("Details updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };



  const fetchVisitScheduledLeads = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/leads", {
        // const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch leads");

      const data = await response.json();
      console.log("🔍 All Lead Statuses from API:");
      data.forEach((lead, i) => {
        // console.log(
        //   `🧩 Lead[${i}] - id: ${lead.id}, leadNo: ${lead.leadNo}, status: ${lead.status}`
        // );
      });
      // Filter Visit Scheduled leads (for dropdown)
      const visitScheduledLeads = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "visit scheduled" ||
          lead.status?.toLowerCase() === "visit_scheduled"
      );

      // Filter Visit Done leads (for table)
      const visitDoneLeads = data.filter(
        (lead) =>
          lead.status?.toLowerCase() === "visit done" ||
          lead.status?.toLowerCase() === "visit_done"
      );

      setLeads({
        scheduled: visitScheduledLeads,
        done: visitDoneLeads,
      });

      console.log("✅ Visit Scheduled (for dropdown):", visitScheduledLeads);
      console.log("✅ Visit Done (for table):", visitDoneLeads);
    } catch (error) {
      console.error("❌ Error fetching Visit Scheduled/Done leads:", error);
    }
  };



  //  Fetch ONLY follow-up history entries for a given enquiryId
  // const fetchVisitFollowUpHistory = async (enquiryId) => {
  //   try {
  //     const res = await fetch(
  //       `https://localhost:5289/sales/api/enquiries/${enquiryId}`,
  //       { credentials: "include" }
  //     );

  //     if (!res.ok) throw new Error("Failed to load history");

  //     const data = await res.json();
  //     console.log("folow up clicked", data);
  //     // Extract history from enquiry response
  //     return data.salesEngagements || [];

  //   } catch (err) {
  //     console.error("❌ Error loading history:", err);
  //     return [];
  //   }
  // };



  // const fetchVisitFollowupHistory = async () => {
  //   try {
  //     console.log("follow up");

  //     const response = await fetch(
  //       "https://localhost:5289/sales/api/enquiries",
  //       { credentials: "include" }
  //     );

  //     const data = await response.json();

  //     // Extract all engagements from all enquiries
  //     const allEngagements = data.pagedRecords.flatMap(enq =>
  //       enq.enquiryEnagagements.map(e => ({
  //         enquiryId: enq.id,
  //         name: enq.name,
  //         phone: enq.phone,
  //         source: enq.source,
  //         status: enq.status,

  //         // engagement fields
  //         assignedDate: e.assignedDate,
  //         assignedTo: e.assignedTo,
  //         nextFollowUpDate: e.nextFollowUpDate,
  //         remarks: e.remarks,
  //         type: e.type
  //       }))
  //     );

  //     console.log("Flattened Engagements:", allEngagements);

  //     return allEngagements;

  //   } catch (err) {
  //     console.error("Error fetching follow-up history:", err);
  //     return [];
  //   }
  // };


  const fetchVisitFollowupHistory = async () => {
    try {
      console.log("follow up");

      const response = await fetch(
        "https://localhost:5289/sales/api/enquiries",
        { credentials: "include" }
      );

      const data = await response.json();

      const grouped = {};

      data.pagedRecords.forEach((enq) => {
        const engagements = enq.enquiryEnagagements || [];

        if (!grouped[enq.id]) {
          grouped[enq.id] = {
            enquiryId: enq.id,
            leadId: enq.leadId,
            name: enq.name,
            phone: enq.phone,
            source: enq.source,
            status: enq.status,

            statusHistory: "",
            remarkHistory: "",
            assignToHistory: "",
          };
        }

        engagements.forEach((e) => {
          const date = e.assignedDate
            ? new Date(e.assignedDate).toLocaleString("en-GB")
            : "-";

          grouped[enq.id].statusHistory =
            `${date} - ${e.type}<br/>` + grouped[enq.id].statusHistory;

          grouped[enq.id].remarkHistory =
            `${date} - ${e.remarks || "No remarks"}<br/>` +
            grouped[enq.id].remarkHistory;

          grouped[enq.id].assignToHistory =
            `${date} - ${e.assignedTo || "No change"}<br/>` +
            grouped[enq.id].assignToHistory;
        });
      });

      // ⬅️ SORT ENQUIRIES BY LATEST FIRST
      const finalData = Object.values(grouped).sort((a, b) => b.enquiryId - a.enquiryId);

      console.log("FINAL GROUPED ENQUIRY HISTORY:", finalData);
      return finalData;

    } catch (err) {
      console.error("Error fetching follow-up history:", err);
      return [];
    }
  };



  const fetchUndefinedEnquiries = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to fetch enquiries");
        return;
      }

      const data = await response.json();

      // FILTER ONLY NOT INTERESTED

      const filtered = data.pagedRecords.filter((item) =>
        item.enquiryEnagagements?.some(
          (eng) => eng.status?.toLowerCase() === "not interested"
        )
      );
      setUndefinedData(filtered);
      console.log("undefined data ", filtered);
    } catch (error) {
      console.error("API Error:", error);

    }
  };


  // 🔥 SINGLE FUNCTION — CALL API + FILTER BOOKED ENQUIRIES
  const fetchBookedEnquiries = async () => {
    try {
      const response = await fetch("https://localhost:5289/sales/api/enquiries", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch enquiries");

      const data = await response.json();

      console.log("🔥 RAW API RESPONSE:", data);

      const allEnquiries = Array.isArray(data.pagedRecords)
        ? data.pagedRecords
        : [];

      console.log("💚 Normalized enquiries:", allEnquiries);

      const booked = allEnquiries.filter(
        (item) => String(item.type)?.toLowerCase().trim() === "booked"
      );

      console.log("📘 FINAL BOOKED ENQUIRIES:", booked);

      // update state
      setEnquiries(booked);
      setFirms(booked);
      setProjectData(booked);

      return booked;
    } catch (err) {
      console.error(" Error fetching booked enquiries:", err);
    }
  };


  useEffect(() => {
    fetchUndefinedEnquiries();
  }, []);


  // Searching and pagination states for Display Enquiries
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Search handler function for Display Enquiries
  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(0); // Reset to first page when searching
  };

  // Handle rows per page change for Display Enquiries
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(0); // Reset to first page when changing rows per page 
  };

  // Handle page navigation for Display Enquiries
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Filter enquiries based on search term for Display Enquiries
  const filteredEnquiries = enquiries.filter((enquiry) => {
    const searchTerm = searchName.toLowerCase();

    return (
      enquiry.name?.toLowerCase().includes(searchTerm) ||
      enquiry.id?.toString().includes(searchTerm) || // Enquiry No
      enquiry.leadId?.toString().includes(searchTerm) || // Lead No
      enquiry.leadNo?.toString().includes(searchTerm) // Alternative lead number field 
    );
  });

  // Filter leads based on search term for Display Enquiries
  const filteredLeads = leads.done.filter((lead) => {
    const searchTerm = searchName.toLowerCase();

    return (
      lead.name?.toLowerCase().includes(searchTerm) ||
      lead.id?.toString().includes(searchTerm) || // Lead ID
      lead.leadNo?.toString().includes(searchTerm) // Lead No
    );
  });

  // Combine filtered data for Display Enquiries
  const combinedFilteredData = [...filteredEnquiries, ...filteredLeads];

  // Calculate pagination values for Display Enquiries
  const totalEntries = combinedFilteredData.length;
  const startEntry = totalEntries === 0 ? 0 : currentPage * rowsPerPage + 1;
  const endEntry = Math.min((currentPage + 1) * rowsPerPage, totalEntries);
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  // Get current page data for Display Enquiries
  const currentPageData = combinedFilteredData.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );



  return (
    <div className="container my-2">
      <h6 className="mb-2 fs-6">Sales Module / Enquiry Management</h6>

      <div
        className="d-flex flex-md-row flex-column justify-content-between align-items-center mb-3"
        style={{ width: "100%" }}
      >
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mb-1">
          {sections.map((section, index) => (
            <Tooltip key={index} title={section.label} arrow>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  backgroundColor: Constants.primaryColor,
                  padding: isMobile ? "8px" : "10px",
                  marginRight: isMobile ? "5px" : "10px",
                  marginTop: "10px",
                  borderRadius: "20px",
                  color: "white",
                  fontSize: isMobile ? "14px" : "16px",
                  width:
                    expandedSection === index
                      ? isMobile
                        ? "180px"
                        : "200px"
                      : isMobile
                        ? "40px"
                        : "50px",
                  height: isMobile ? "40px" : "50px",
                  transition: "width 0.3s ease",
                  background: Constants.primaryColor,
                  boxShadow:
                    "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
                }}
              >
                <IconButton
                  color="primary"
                  onClick={() => handleToggleSection(index)}
                  sx={{
                    padding: 0,
                    marginRight: isMobile ? "4px" : "8px",
                    fontSize: isMobile ? "20px" : "24px",
                    color: "white",
                  }}
                >
                  {section.icon}
                </IconButton>

                <span
                  className="text-white fw-bold"
                  style={{
                    color: "white",
                    fontSize: isMobile ? "14px" : "16px",
                    display: expandedSection === index ? "inline" : "none",
                    marginLeft: isMobile ? "4px" : "8px",
                  }}
                >
                  {section.label}
                </span>
              </div>
            </Tooltip>
          ))}

          {showFileInput && (
            <div className="m-3">
              <input type="file" accept=".csv, .xlsx" />
            </div>
          )}

          <input
            type="file"
            accept=".csv, .xlsx"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              console.log("File selected:", e.target.files[0]);
            }}
          />
        </div>
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
            "&:hover": {
              background: Constants.primaryColor,
            },
            marginTop: isMobile ? "10px" : "0px",
          }}
          onClick={() => {
            if (expandedSection === 0) handleDownloadPDF_Enquiries();
            if (expandedSection === 1) handleDownloadPDF_History();
            if (expandedSection === 2) handleDownloadPDF_Booked();
            if (expandedSection === 3) handleDownloadPDF_Undefined();
          }}
        >
          Download PDF
        </Button>

      </div>
      {expandedSection === 0 && (
        <div className="content-container mt-0">
          {!showFirmForm ? (
            <>
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
                <div
                  className={`d-flex ${isMobile ? "flex-column" : "flex-row"
                    } gap-2 `}
                //here is removed that w-100 =>w-100
                >
                  <Button
                    variant="contained"
                    color="primary"
                    style={{
                      background: Constants.primaryColor,
                      width: isMobile ? "100%" : "auto",
                      fontWeight: "bold",
                    }}
                    onClick={() => setShowFirmForm(true)}
                  >
                    + New Enquiry
                  </Button>
                </div>
                {/* Right Side - Search and Pagination */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: isMobile ? "wrap" : "nowrap",
                    // flexWrap: "nowrap",
                    marginTop: isMobile ? "8px" : "0",
                  }}
                >
                  {/* Search Box */}
                  <TextField
                    size="small"
                    placeholder="Search"
                    value={searchName}
                    onChange={handleSearchChange}
                    sx={{
                      width: "180px",
                      "& .MuiInputBase-root": { padding: "0px 8px" },
                      border: Constants.formInputBorderColor,
                    }}
                  />

                  {/* Pagination Controls */}
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
                      value={rowsPerPage}
                      onChange={handleRowsPerPageChange}
                      style={{
                        border: "1px solid #800000",
                        borderRadius: "4px",
                        padding: "2px 6px",
                        outline: "none",
                        color: "#800000",
                      }}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                    </select>

                    <span>
                      {totalEntries === 0 ? "0–0" : `${startEntry}–${endEntry}`}{" "}
                      of {totalEntries}
                    </span>

                    {/* Navigation arrows */}
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(0, currentPage - 1))
                      }
                      disabled={currentPage === 0}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: currentPage === 0 ? "not-allowed" : "pointer",
                        color: currentPage === 0 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8249;
                    </button>
                    <button
                      onClick={() =>
                        handlePageChange(
                          Math.min(totalPages - 1, currentPage + 1)
                        )
                      }
                      disabled={currentPage >= totalPages - 1}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor:
                          currentPage >= totalPages - 1
                            ? "not-allowed"
                            : "pointer",
                        color:
                          currentPage >= totalPages - 1 ? "gray" : "#800000",
                        fontSize: "18px",
                        padding: "0 4px",
                      }}
                    >
                      &#8250;
                    </button>
                  </div>

                </div>
              </div>
              <div className="mt-3">
                <DisplayEnquiryTable

                  //  data={loans}
                  // data={leads}
                  // data={leads.done}
                  // data={[...firms, ...leads.done]}
                  // leads.done means only leads whose status is visist done and 

                  // data={leads.done}

                  data={[...enquiries, ...leads.done]}

                  // data={currentPageData} 
                  fetchEnquiries={fetchEnquiries}


                  isMobile={isMobile}
                  isTablet={isTablet}
                  onDelete={(item, index) => handleDeleteFirm(item, index)} // Pass index
                  onUpdate={handleUpdateFirm}
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
              scroll="paper"
            >
              <DialogTitle>New Enquiry</DialogTitle>

              <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {/* Row 1 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      error={!!error}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Lead No.</InputLabel>
                      {/* <Select
                        value={leadNo}
                        onChange={handleLeadNoChange}
                        label="Lead No."
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Lead 9">Lead 9</MenuItem>
                        <MenuItem value="Lead 16">Lead 16</MenuItem>
                        <MenuItem value="Lead 25">Lead 25</MenuItem>
                        
                      </Select> */}
                      {/* <Select
                        value={leadNo}
                        onChange={handleLeadNoChange}
                        label="Lead No."
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        {leads.scheduled.length > 0 ? (
                          leads.scheduled.map((lead) => (
                            <MenuItem key={lead.id} value={lead.id}>
                              {lead.leadNo || lead.id}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Visit Scheduled Leads</MenuItem>
                        )}
                      </Select> */}
                      <Select
                        value={leadNo}
                        onChange={handleLeadNoChange}
                      >
                        {availableLeads.map((lead) => (
                          <MenuItem key={lead.id} value={lead.id}>
                            {lead.id}
                          </MenuItem>
                        ))}

                      </Select>


                      {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={name}
                      onChange={handleNameChange}
                      error={nameError}
                      helperText={nameError ? "Only letters are allowed" : ""}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Mobile No."
                      fullWidth
                      value={mobile}
                      onChange={handleMobileChange}
                      error={!!mobileError}
                      helperText={mobileError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 2 */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="text"
                      label="WhatsApp No"
                      fullWidth
                      value={whatsappNo}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,10}$/.test(value)) {
                          setWhatsappNo(value);
                        }
                      }}
                      error={whatsappNo.length > 0 && whatsappNo.length < 10}
                      helperText={
                        whatsappNo.length > 0 && whatsappNo.length < 10
                          ? "Mobile number must be 10 digits"
                          : ""
                      }
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Email"
                      fullWidth
                      value={email}
                      onChange={handleEmailChange}
                      error={!!emailError}
                      helperText={emailError}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Address"
                      fullWidth
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 3 */}

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Company"
                      fullWidth
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Reference by / Source"
                      fullWidth
                      value={referenceBySource}
                      onChange={(e) => setReferenceBySource(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Name of CP (if Channel Partner)"
                      fullWidth
                      value={nameOfCp}
                      onChange={(e) => setNameOfCp(e.target.value)}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>

                  {/* Row 4 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Interested In</InputLabel>
                      <Select
                        value={interestedIn}
                        onChange={handleInterestedInChange}
                        label="Interested In"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >

                        <MenuItem value="2 BHK">2BHK</MenuItem>
                        <MenuItem value="3 BHK">3BHK</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    >
                      <InputLabel>Budget (Approx.)</InputLabel>
                      <Select
                        value={budget}
                        onChange={handleBudgetChange}
                        label="Budget (Approx.)"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
                        <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
                        <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
                        <MenuItem value="61-65 L">61-65 L</MenuItem>
                        <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
                        <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    >
                      <InputLabel>Planning To Buy Within?</InputLabel>
                      <Select
                        value={planningToBuy}
                        onChange={handlePlanningToBuyChange}
                        label="Planning To Buy Within?"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Immediately">Immediately</MenuItem>
                        <MenuItem value="Within Week">Within Week</MenuItem>
                        <MenuItem value="Within 1 Month">
                          Within 1 Month
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Row 5 */}
                  <Grid item xs={12} sm={4}>
                    <FormControl
                      fullWidth
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                      required
                    >
                      <InputLabel>Occupation</InputLabel>
                      <Select
                        value={occupation}
                        onChange={handleOccupationChange}
                        label="Occupation"
                        sx={{
                          "& .MuiSelect-icon": {
                            color: Constants.primaryColor,
                          },
                        }}
                      >
                        <MenuItem value="Service / Job">Service / Job</MenuItem>
                        <MenuItem value="Business / Self employed">
                          Business / Self employed
                        </MenuItem>
                        <MenuItem value="Professional">Professional</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Full-width field for the last row */}
                  <Grid item xs={12}>
                    <TextField
                      label="Customer Feedback & Complete Followup Details"
                      fullWidth
                      multiline
                      rows={3}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
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
                  style={{
                    backgroundColor: Constants.primaryColor,
                    color: "#ecf0f1",
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </div>
      )}

      {expandedSection === 1 && (
        <>
          <div className="content-container mt-3">
            {!showProjectForm ? (
              <>
                <div className="d-flex flex-column mb-3 gap-2">
                  {/* First Row — Title on Left, Search + Pagination on Right */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", width: "100%" }}>
                    {/* LEFT SIDE — TITLE */}
                    <Typography variant={isMobile ? "h6" : "h5"} component="h2" sx={{ fontWeight: "bold", paddingTop: "8px", }} >
                      Enquiry History
                    </Typography>

                    {/* RIGHT SIDE — SEARCH + PAGINATION */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap",
                        justifyContent: "flex-end",
                      }}
                    >
                      {/* Search Bar */}
                      <TextField
                        size="small"
                        placeholder="Search"
                        sx={{
                          width: "180px",
                          "& .MuiInputBase-root": { padding: "0px 8px" },
                          border: Constants.formInputBorderColor,
                        }}
                      />

                      {/* Pagination */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "14px",
                          color: "#800000",
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
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                        </select>

                        <span>0–0 of 0</span>

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
                </div>
                <div className="mt-3">
                  <FirstVisitFollowupHistoryTable
                    // data={filteredLeads}
                    fetchVisitFollowUpHistory={fetchVisitFollowupHistory}
                    // data={projectData}

                    data={visitFollowupHistory}          //working 

                    isMobile={isMobile}
                    isTablet={isTablet}

                  />
                </div>
              </>
            ) : (
              <div></div>
            )}
          </div>
        </>
      )}

      {expandedSection === 2 && (
        <div className="content-container mt-3">
          {!showLandownerForm ? (
            <>
              <div className="d-flex flex-column mb-3 gap-2">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", width: "100%", }}>
                  {/* LEFT SIDE — TITLE */}
                  <Typography variant={isMobile ? "h6" : "h5"} component="h2" sx={{ fontWeight: "bold", paddingTop: "8px", }} >
                    Booked Enquiries
                  </Typography>
                  {/* RIGHT SIDE — SEARCH + PAGINATION */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* Search Bar */}
                    <TextField
                      size="small"
                      placeholder="Search"
                      sx={{
                        width: "180px",
                        "& .MuiInputBase-root": { padding: "0px 8px" },
                        border: Constants.formInputBorderColor,
                      }}
                    />

                    {/* Pagination */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        color: "#800000",
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
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                      </select>

                      <span>0–0 of 0</span>

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



      {expandedSection === 3 && (
        <div className="content-container mt-3">
          {!showFlatForm ? (
            <>

              <div className="d-flex flex-column mb-3 gap-2">
                {/* First Row - Section Title */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  {/* Left Side – Title */}
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    component="h2"
                    sx={{
                      fontWeight: "bold",
                      paddingTop: "8px",
                    }}
                  >
                    Lost Enquiries
                  </Typography>

                  {/* Right Side – Search + Pagination */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                      justifyContent: "flex-end",
                    }}
                  >
                    <TextField
                      size="small"
                      placeholder="Search"
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
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                      </select>

                      <span>0–0 of 0</span>

                      {/* Navigation Arrows */}
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
              </div>


              {/* Table Section */}
              <div className="mt-3">
                <FirstvisitfollowupUndefinedTable
                  // data={projectData}
                  data={undefinedData}            // working
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

export default FirstVisits;

