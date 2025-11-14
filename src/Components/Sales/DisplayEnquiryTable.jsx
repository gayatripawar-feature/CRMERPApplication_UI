import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  useMediaQuery,
  useTheme,
  TableCell,
  Paper,
  Tooltip,
  IconButton,
  TextField,
  Button,
  TablePagination,
  Box,
  Grid,
  FormControl,
  InputLabel, Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Constants from "../Constants";
import { toast } from "react-toastify";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
const data = [
  {
    remarkHistory: "2024-03-28 10:30 AM",
    enquiryNo: "ENQ12345",
    leadNo: "LD98765",
    assignToHistory: "John Doe",
    salesExecutiveName: "Jane Smith",
    name: "Alice Johnson",
    mobile: "9876543210",
    alternateContactNo: "9876543200",
    whatsappNo: "9876543210",
    email: "alice@example.com",
    address: "123 Main Street, City",
    occupation: "Software Engineer",
    company: "Tech Solutions",
    interestedIn: "3 BHK",
    budget: "₹75 Lakh",
    reasonForPurchase: "Relocation",
    referenceBySource: "Google Ads",
    nameOfCp: "XYZ Realtors",
    planningToBuyWithin: "3 Months",
    customerFeedback: "Looking for more options.",
  },
];

const DisplayEnquiryTable = ({ data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState('');

  const [leadNo, setLeadNo] = useState('');
  const [salesExec, setSalesExec] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [planningToBuy, setPlanningToBuy] = useState('');
  const [occupation, setOccupation] = useState('');
  const [budget, setBudget] = useState('');
  const [reasonForPurchase, setReasonForPurchase] = useState('');
  const [emailError, setEmailError] = useState('')
  const [nameError, setNameError] = useState(false);
  const [alternateContact, setAlternateContact] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [CPName, setCPName] = useState(" ");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


  //  Sales Engagement-related fields
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [engagementStatus, setEngagementStatus] = useState("");
  const [engagementRemarks, setEngagementRemarks] = useState("");
  const [intendedPurchasePeriodMonths, setIntendedPurchasePeriodMonths] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    enquiryNo: "",
    remark: "",
    name: "",
    nextFollowUp: "",
    visitType: "",
    status: "",
    visitScheduledDate: "",
  });

  const [showNextFollowUpEdit, setShowNextFollowUpEdit] = useState(false);
  const [showVisitScheduledDateEdit, setShowVisitScheduledDateEdit] =
    useState(false);
  const handleEditClose = () => {
    setEditModalOpen(false);
    setEditingItem(null);
    setEditFormData({
      enquiryNo: "",
      remark: "",
      name: "",
      nextFollowUp: "",
      visitType: "",
      status: "",
      visitScheduledDate: "",
    });
  };
  // const handleEdit = (row) => {
  //   setSelectedItem(row);
  //   setIsEditing(true);
  // };
  // const handleEdit = async (row) => {
  //   try {
  //     setIsEditing(true);
  //     setSelectedItem(row);

  //     // Fetch full enquiry details by ID
  //     // const response = await fetch(`/api/enquiries/${row.id}`);
  //     const response = await fetch("https://localhost:5289/sales/api/enquiries/${row.id}");
  //     if (!response.ok) throw new Error("Failed to fetch enquiry details");

  //     const data = await response.json();

  //     // ✅ Auto-fill all fields with fresh data from backend
  //     setLeadNo(data.leadNo || data.id || "");
  //     setName(data.name || "");
  //     setMobile(data.phone?.toString() || "");
  //     setAlternateContact(data.alternateContactNo?.toString() || "");
  //     setWhatsappNo(data.whatsappNo?.toString() || "");
  //     setEmail(data.email || "");
  //     setOccupation(data.occupation || "");
  //     setBudget(data.budgetInLakh || data.budget || "");
  //     setInterestedIn(data.interest || "");
  //     setCompany(data.company || "");
  //     setReasonForPurchase(data.reasonForPurchase || "");
  //     setPlanningToBuy(data.intendedPurchasePeriodMonths || data.planningToBuyWithin || "");
  //     setSalesExec(data.salesExecutiveName || data.assignedTo || "");

  //   } catch (error) {
  //     console.error("Error fetching enquiry:", error);
  //     alert("Failed to load enquiry details. Please try again.");
  //     setIsEditing(false);
  //   }
  // };


  const handleEdit = async (row) => {
    try {
      setIsEditing(true);
      setSelectedItem(row);

      // ✅ Call your backend correctly
      const response = await fetch(`https://localhost:5289/sales/api/enquiries/${row.id}`, {
        method: "GET",
        credentials: "include", // ensures cookies/session are sent
      });

      if (!response.ok) throw new Error("Failed to fetch enquiry details");

      const data = await response.json();

      // ✅ Auto-fill all form fields using API response
      setLeadNo(data.id || "");
      setName(data.name || "");
      setMobile(data.phone?.toString() || "");
      setWhatsappNo(data.whatsapp?.toString() || "");
      setEmail(data.email || "");
      setAddress(data.address || "");
      setOccupation(data.occupation || "");
      setCompany(data.company || "");
      setInterestedIn(data.interest || "");
      setBudget(data.budgetInLakh?.toString() || "");
      setPlanningToBuy(data.intendedPurchasePeriodMonths || "");
      setReasonForPurchase(data.remarks || ""); // since remarks describe “Visit done”
      setStatus(data.status || "");
      setSource(data.source || "");
      setSalesExec(data.lastUpdatedBy || ""); // or whoever updated last

    } catch (error) {
      console.error("Error fetching enquiry:", error);
      alert("Failed to load enquiry details. Please try again.");
      setIsEditing(false);
    }
  };


  const handleEmail = (row) => {
    console.log("Email clicked for", row);
  };

  const handleAssign = (row) => {
    console.log("Assign clicked for", row);
  };


  const handleChange = (e) => {
    const value = e.target.value;


    const regex = /[\d\s]/;


    if (regex.test(value)) {
      setError('Name should not contain digits or spaces');
    } else {
      setError('');
    }

    setName(value);
  };


  // const handleSave = () => {
  //   console.log("Form saved for", selectedItem);
  //   setIsEditing(false);
  //   setSelectedItem(null);
  // };

  const handleUpdate = async () => {
    if (!selectedItem || !selectedItem.id) {
      alert("No enquiry selected to update");
      return;
    }

    try {
      console.log("🟡 Updating enquiry details...");

      // ✅ Define updatedPayload here — this is what will be sent to your backend
      const updatedPayload = {
        id: selectedItem.id,
        name: name || "",
        phone: Number(mobile) || 0,
        whatsapp: Number(whatsappNo) || 0,
        email: email || "",
        address: address || "",
        occupation: occupation || "",
        company: company || "",
        interest: interestedIn || "",
        budgetInLakh: Number(budget) || 0,
        // intendedPurchasePeriodMonths: Number(purchasePeriod) || 0,
        //  intendedPurchasePeriodMonths: Number(planningToBuy) || 0,
        intendedPurchasePeriodMonths: Number(intendedPurchasePeriodMonths) || 0,
        lastSiteVisit: new Date().toISOString(),
        source: source || "",
        remarks: reasonForPurchase || "",
        status: status || "NEW",

        // nested object
        salesEngagement: {
          assignedTo: assignedTo || "",
          assignedDate: new Date().toISOString(),
          assignedBy: assignedBy || "",
          enquiryId: selectedItem.id,
          nextFollowUp: nextFollowUpDate || new Date().toISOString(),
          status: engagementStatus || "",
          remarks: engagementRemarks || "",
        },
      };

      // ✅ PATCH request to update enquiry
      const response = await fetch(`https://localhost:5289/sales/api/enquiries/${selectedItem.id}`, {
        // const response = await fetch(`https://localhost:5289/sales/api/enquiries/${row.id}`,{

        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedPayload),
      });

      if (!response.ok) throw new Error("Failed to update enquiry");

      const updatedData = await response.json();
      console.log("✅ Updated Enquiry Details:", updatedData);

      //  Update local state with response
      setLeadNo(updatedData.id || "");
      setName(updatedData.name || "");
      setMobile(updatedData.phone?.toString() || "");
      setWhatsappNo(updatedData.whatsappNo?.toString() || "");
      setEmail(updatedData.email || "");
      setAddress(updatedData.address || "");
      setOccupation(updatedData.occupation || "");
      setCompany(updatedData.company || "");
      setInterestedIn(updatedData.interest || "");
      setBudget(updatedData.budgetInLakh?.toString() || "");
      setPlanningToBuy(updatedData.intendedPurchasePeriodMonths || "");
      setReasonForPurchase(updatedData.reasonForPurchase || "");
      setStatus(updatedData.status || "");
      setSource(updatedData.source || "");
      setSalesExec(updatedData.lastUpdatedBy || "");

      alert("✅ Enquiry updated successfully!");
      setIsEditing(false);
      setSelectedItem(null);
    } catch (error) {
      console.error("❌ Error updating enquiry:", error);
      alert("Failed to update enquiry details. Please try again.");
    }
  };



  const handleCancel = () => {
    setIsEditing(false);
    setSelectedItem(null);
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
  };


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };


  const handleSalesExecChange = (event) => {
    setSalesExec(event.target.value);
    setError('');
  };

  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };

  const handleInterestedInChange = (event) => {
    setInterestedIn(event.target.value);
  };

  const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;

    if (regex.test(value)) {
      setName(value);
      setNameError(false);
    } else {
      setNameError(true);
    }
  };




  const handlePlanningToBuyChange = (event) => {
    setPlanningToBuy(event.target.value);
  };



  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const handleReasonForPurchaseChange = (event) => {
    setReasonForPurchase(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEditSubmit = () => {
    if (editingItem && onUpdate) {
      const updatedItem = {
        ...editingItem,
        ...editFormData,
      };

      onUpdate(updatedItem, editingItem.index);
      setEditModalOpen(false);
    }
  };

  const handlefollowupClick = (item, index) => {
    setEditingItem({ ...item, index });
    setEditFormData({
      enquiryNo: item.enquiryNo || "",
      remark: item.remark || "",
      name: item.name || "",
      nextFollowUp: item.nextFollowUp || "",
      visitType: item.visitType || "",
      status: item.status || "",
      visitScheduledDate: item.visitScheduledDate || "",
    });

    // Set visibility for date fields based on status
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

    setShowNextFollowUpEdit(
      statusesThatRequireNextFollowUp.includes(item.status)
    );
    setShowVisitScheduledDateEdit(
      statusesThatRequireVisitScheduledDate.includes(item.status)
    );

    setEditModalOpen(true);
  };

  // const handlefollowupClick = async (item, index) => {
  //   try {
  //     setEditingItem({ ...item, index });
  //       console.log("ITEM CLICKED:", item);

  //       const enquiryId =
  //   item.id ||
  //   item.enquiryId ||
  //   item.enquiryNo ||
  //   item.leadId ||
  //   (item.leadEnagagements?.[0]?.leadId ?? undefined);

  // console.log("RESOLVED ENQUIRY ID:", enquiryId);

  // if (!enquiryId) {
  //   console.error("❌ No Enquiry ID found in item:", item);
  //   toast.error("No enquiry ID available");
  //   return;
  // }
  //     // 🔥 1) CALL API WITH CREDENTIALS INCLUDED
  //     const res = await fetch(
  //       `https://localhost:5289/api/enquiries/${enquiryId}`,
  //       {
  //         method: "GET",
  //         credentials: "include",   // <-- HERE
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("API returned error: " + res.status);
  //     }

  //     const enquiry = await res.json();

  //     // 🔥 2) AUTO POPULATE FORM
  //     setEditFormData({
  //       enquiryNo: enquiry.enquiryNo || "",
  //       remark: enquiry.remark || "",
  //       name: enquiry.name || "",
  //       nextFollowUp: enquiry.nextFollowUp || "",
  //       visitType: enquiry.visitType || "",
  //       status: enquiry.status || "",
  //       visitScheduledDate: enquiry.visitScheduledDate || "",
  //     });

  //     // 🔥 3) Set visibility based on status
  //     const statusesThatRequireNextFollowUp = [
  //       "Callback request",
  //       "Unreachable",
  //       "Not answered",
  //       "Follow up",
  //     ];

  //     const statusesThatRequireVisitScheduledDate = [
  //       "Re-visit",
  //       "Visit postponed",
  //     ];

  //     setShowNextFollowUpEdit(
  //       statusesThatRequireNextFollowUp.includes(enquiry.status)
  //     );

  //     setShowVisitScheduledDateEdit(
  //       statusesThatRequireVisitScheduledDate.includes(enquiry.status)
  //     );

  //     // 🔥 4) Open modal


  //     setEditModalOpen(true);
  //   } catch (error) {
  //     console.error("❌ Fetch Error:", error);
  //     toast.error("Failed to load enquiry details");
  //   }
  // };


  const handleEditChange = (field, value) => {
    setEditFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // --- logic for Status field ---
    if (field === "status") {
      const nextFollowUpStatuses = [
        "Follow up",
        "Unreachable",
        "Not answered",
        "Callback request"
      ];

      const visitScheduledStatuses = [
        "Re-visit",
        "Visit postponed"
      ];

      setShowNextFollowUpEdit(nextFollowUpStatuses.includes(value));
      setShowVisitScheduledDateEdit(visitScheduledStatuses.includes(value));
    }
  };



  return (
    <div>
      {isEditing ? (


        //         <div
        //   className="firm-form mt-4 p-3 border rounded"
        //   style={{
        //     maxHeight: "500px",
        //     overflowY: "auto",
        //     backgroundColor: "#f8f9fa",
        //     border: "1px solid #ccc",
        //   }}
        // >
        // <Dialog open={open}
        <Dialog open={isEditing}
          onClose={handleCancel}
          maxWidth="md" fullWidth>
          <DialogTitle sx={{ background: Constants.primaryColor, color: "#fff" }}>Edit Enquiry</DialogTitle>
          <DialogContent dividers sx={{ maxHeight: "70vh" }}>
            <Grid container spacing={2}>

              {/* <Grid item xs={4}> */}
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Lead No.</InputLabel>
                  <Select value={leadNo} onChange={handleChange} label="Lead No.">
                    <MenuItem value="Lead 9">Lead 9</MenuItem>
                    <MenuItem value="Lead 16">Lead 16</MenuItem>
                    <MenuItem value="Lead 25">Lead 25</MenuItem>
                    <MenuItem value="Lead 26">Lead 26</MenuItem>
                    <MenuItem value="Lead 27">Lead 27</MenuItem>
                    <MenuItem value="Lead 4">Lead 4</MenuItem>
                    <MenuItem value="Lead 3">Lead 3</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>


              {/* <Grid item xs={4}> */}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Name"
                  fullWidth
                  value={name}
                  onChange={handleNameChange}
                  error={nameError}
                  helperText={nameError ? "Only letters are allowed" : ""}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>



              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Mobile No."
                  fullWidth
                  value={mobile}
                  onChange={handleMobileChange}
                  error={!!mobileError}
                  helperText={mobileError}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Alternate Contact No."
                  fullWidth
                  value={alternateContact}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (/^\d{0,10}$/.test(value)) {
                      setAlternateContact(value);
                    }
                  }}
                  error={alternateContact.length > 0 && alternateContact.length < 10}
                  helperText={
                    alternateContact.length > 0 && alternateContact.length < 10
                      ? "Mobile number must be 10 digits"
                      : ""
                  }
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>



              <Grid item xs={12} sm={6} md={4}>
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
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Email" fullWidth
                  value={email}
                  onChange={handleEmailChange}
                  error={!!emailError}
                  helperText={emailError}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Address"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Company"
                  fullWidth
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>



              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Reference by / Source"
                  fullWidth
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Name of CP (if Channel Partner)"
                  fullWidth
                  // Create a new state variable if needed: const [cpName, setCpName] = useState("");
                  value={CPName}
                  onChange={(e) => setCPName(e.target.value)}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Sales Executive Name</InputLabel>
                  <Select
                    value={salesExec}
                    onChange={handleSalesExecChange}
                    label="Sales Executive Name"
                  >
                    <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
                    <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
                    <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
                    <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
                    <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
                    <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
                    <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
                    <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Interested In</InputLabel>
                  <Select
                    value={interestedIn}
                    onChange={handleInterestedInChange}
                    label="Interested In"
                  >

                    <MenuItem value="2 BHK">2BHK</MenuItem>
                    <MenuItem value="3 BHK">3BHK</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>




              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Budget (Approx.)</InputLabel>
                  <Select value={budget} onChange={handleBudgetChange} label="Budget (Approx.)">
                    <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
                    <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
                    <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
                    <MenuItem value="61-65 L">61-65 L</MenuItem>
                    <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
                    <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Planning To Buy Within?</InputLabel>
                  <Select
                    value={planningToBuy}
                    onChange={handlePlanningToBuyChange}
                    label="Planning To Buy Within?"
                  >
                    <MenuItem value="Immediately">Immediately</MenuItem>
                    <MenuItem value="Within Week">Within Week</MenuItem>
                    <MenuItem value="Within 1 Month">Within 1 Month</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Occupation</InputLabel>
                  <Select value={occupation} onChange={handleOccupationChange} label="Occupation">
                    <MenuItem value="Service / Job">Service / Job</MenuItem>
                    <MenuItem value="Business / Self employed">Business / Self employed</MenuItem>
                    <MenuItem value="Professional">Professional</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth error={!!error} sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Reason For Purchase</InputLabel>
                  <Select
                    value={reasonForPurchase}
                    onChange={handleReasonForPurchaseChange}
                    label="Reason For Purchase"
                  >
                    <MenuItem value="End Use">End Use</MenuItem>
                    <MenuItem value="Investment">Investment</MenuItem>
                  </Select>
                  {error && <FormHelperText>{error}</FormHelperText>}
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <TextField label="Customer Feedback & Complete Followup Details" fullWidth sx={{ border: Constants.formInputBorderColor }} />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <div className="mt-3">
              {/* <Button variant="contained" onClick={handleSave} sx={{ background: Constants.primaryColor }}> */}
              <Button variant="contained" onClick={handleUpdate} sx={{ background: Constants.primaryColor }}>
                Update
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel} style={{ marginLeft: "8px" }}>
                Cancel
              </Button>
            </div>
          </DialogActions>
        </Dialog>


      ) : (
        <TableContainer component={Paper}>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                  {/* Header Cells */}
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell> */}
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXE.</TableCell> */}
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CO. No</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY?</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FOLLOWUP DETAILS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {data.map((item, index) => ( */}
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: Constants.primaryColor,
                                color: "white",
                                borderRadius: "50%",
                                "&:hover": { backgroundColor: Constants.primaryColor },
                              }}
                              onClick={() => handleEdit(item)}
                            >
                              <EditIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="followup">
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: Constants.primaryColor,// WhatsApp green
                                color: "white",
                                borderRadius: "50%",
                                "&:hover": { backgroundColor: Constants.primaryColor },
                              }}
                              onClick={() => handlefollowupClick(item, index)}
                            >
                              <AccessTimeIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="WhatsApp">
                            <IconButton
                              size="small"
                              sx={{
                                backgroundColor: Constants.primaryColor,// WhatsApp green
                                color: "white",
                                borderRadius: "50%",
                                "&:hover": { backgroundColor: Constants.primaryColor },
                              }}
                              onClick={() => {
                                const phone = item.mobileNo?.replace(/\D/g, ""); // remove non-digits
                                const message = encodeURIComponent("Hello, I’m contacting you regarding your lead.");
                                window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
                              }}
                            >
                              <WhatsAppIcon sx={{ fontSize: "18px" }} />
                            </IconButton>
                          </Tooltip>




                          {/* <Tooltip title="Assign To">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#FFC107",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#E0A800" },
                          }}
                          onClick={() => handleAssign(item)}
                        >
                          <AssignmentIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Tooltip> */}
                        </div>
                      </TableCell>

                      {/* Other table cells */}
                      <TableCell>{item.lastUpdatedDate}</TableCell>
                      <TableCell>{item.id}</TableCell>
                      {/* <TableCell>{item.id}</TableCell> */}
                      {/* <TableCell>{item.id || "-"}</TableCell> */}
                      <TableCell>{item.leadNo || item.id || "-"}</TableCell>
                      {/* <TableCell>{item.assignedTo}</TableCell>
                      <TableCell>{item.salesExecutiveName}</TableCell> */}
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.alternateContactNo}</TableCell>
                      <TableCell>{item.whatsappNo}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.occupation}</TableCell>
                      <TableCell>{item.company}</TableCell>
                      <TableCell>{item.interest}</TableCell>
                      <TableCell>{item.budget}</TableCell>
                      <TableCell>{item.reasonForPurchase}</TableCell>
                      <TableCell>{item.source}</TableCell>
                      <TableCell>{item.nameOfCp}</TableCell>
                      <TableCell>{item.planningToBuyWithin}</TableCell>
                      <TableCell>{item.customerFeedback}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setPage(0);
              }}
            />
          </Box>


          <Dialog
            open={editModalOpen}
            onClose={handleEditClose}
            fullWidth
            maxWidth="md"
            fullScreen={fullScreen}
          >
            <DialogTitle>Edit Follow Up</DialogTitle>
            <DialogContent>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Enquiry No"
                    fullWidth
                    variant="outlined"
                    value={editFormData.enquiryNo}
                    onChange={(e) => handleEditChange("enquiryNo", e.target.value)}
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={editFormData.name}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Remark"
                    fullWidth
                    variant="outlined"
                    value={editFormData.remark}
                    onChange={(e) => handleEditChange("remark", e.target.value)}
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  >
                    <InputLabel id="edit-visit-type-label">Visit Type</InputLabel>
                    <Select
                      labelId="edit-visit-type-label"
                      id="edit-visit-type"
                      label="Visit Type"
                      value={editFormData.visitType}
                      onChange={(e) =>
                        handleEditChange("visitType", e.target.value)
                      }
                      sx={{
                        "& .MuiSelect-icon": {
                          color: Constants.primaryColor,
                        },
                      }}
                    >
                      <MenuItem value="hot">Hot</MenuItem>
                      <MenuItem value="warm">Warm</MenuItem>
                      <MenuItem value="cold">Cold</MenuItem>
                      <MenuItem value="lost">Lost</MenuItem>
                      <MenuItem value="booked">Booked</MenuItem>
                      <MenuItem value="undefined">Undefined</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    size={isMobile ? "small" : "medium"}
                    sx={{ border: Constants.formInputBorderColor }}
                  >
                    <InputLabel id="edit-status-label">Status</InputLabel>
                    <Select
                      labelId="edit-status-label"
                      id="edit-status"
                      label="Status"
                      value={editFormData.status}
                      onChange={(e) => handleEditChange("status", e.target.value)}
                      sx={{
                        "& .MuiSelect-icon": {
                          color: Constants.primaryColor,
                        },
                      }}
                    >
                      <MenuItem value="Follow up">Follow up</MenuItem>
                      <MenuItem value="Not interested">Not interested </MenuItem>
                      <MenuItem value="Booked Other project">Booked Property In Other Project </MenuItem>
                      <MenuItem value="Re-visit">Re-visit</MenuItem>
                      <MenuItem value="Visit postponed">Visit postponed</MenuItem>

                      <MenuItem value="Visit done">Visit done</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {showNextFollowUpEdit && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      label="Next Follow Up"
                      fullWidth
                      variant="outlined"
                      value={editFormData.nextFollowUp}
                      onChange={(e) =>
                        handleEditChange("nextFollowUp", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
                )}

                {showVisitScheduledDateEdit && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="datetime-local"
                      label="Visit Scheduled Date"
                      fullWidth
                      variant="outlined"
                      value={editFormData.visitScheduledDate}
                      onChange={(e) =>
                        handleEditChange("visitScheduledDate", e.target.value)
                      }
                      InputLabelProps={{ shrink: true }}
                      size={isMobile ? "small" : "medium"}
                      sx={{ border: Constants.formInputBorderColor }}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose} color="secondary">
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                variant="contained"
                style={{
                  backgroundColor: Constants.primaryColor,
                  color: "#ecf0f1",
                }}
              >
                Update
              </Button>
            </DialogActions>
          </Dialog>
        </TableContainer>

      )}


    </div>
  );
};

export default DisplayEnquiryTable;
