import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton, Box, Modal, Grid, TextField, MenuItem, Button
} from '@mui/material';
import { FaEdit, FaWhatsapp } from 'react-icons/fa';
import Constants from '../Constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from '../SessionContext';
import { FaPhoneAlt } from "react-icons/fa";

const PendingFollowuptable = ({ data, onSelectLead, fetchUserLeads }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { id: userId, name: userName } = useSession() || {};

  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    remark: '',
    leadType: '',
    status: '',
    nextFollowUpDate: '',
    visitScheduledDate: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [firms] = useState([
    {
      leadNo: 'LD001',
      name: 'John Doe',
      mobileNo: '9876543210',
      mailId: 'john@example.com',
      nextFollowUp: '2025-09-28',
      lastFollowUp: '2025-09-20',
      status: 'Pending',
      remark: 'Call scheduled',
      assignTo: 'Manager 1',
      leadType: '2 BHK',
      sourceName: 'Facebook Ads',
    },
  ]);


  const [visitDoneModalOpen, setVisitDoneModalOpen] = useState(false);
  const [visitDoneData, setVisitDoneData] = useState({
    occupation: "",
    interestedIn: "",
  });


  const handleEditClick = (firm) => {
    // console.group("🟢 HANDLE EDIT CLICK");
    // console.log("➡️ firm received from table:", firm);
    // console.log("🧩 Checking firm before opening modal:", JSON.stringify(firm, null, 2));
    if (!firm) {
      console.warn("⚠️ No firm data passed to handleEditClick");
      return;
    }
    // Check if DB data fields exist
    // console.log("🧩 firm fields check:", {
    //   id: firm.id,
    //   name: firm.name,
    //   remark: firm.remark,
    //   leadType: firm.leadType,
    //   status: firm.status,
    //   nextFollowUp: firm.nextFollowUp,
    //   // leadEngagements: firm.leadEnagagements,
    //   leadEngagements: firm.leadEngagements || firm.leadEnagagements,

    // });

    setEditingItem(firm);
    // Extract engagement info from backend response 
    const engagements = firm.leadEngagements || firm.leadEnagagements;
    const latestEng = engagements?.[engagements.length - 1] || null;
    // console.log("🧾 latestEng from firm:", latestEng);
    // console.log("🔍 Keys in latestEng:", Object.keys(latestEng));
    // console.log("🧩 Checking Type value:", latestEng?.type || latestEng?.Type);

    // console.log("🔍 Type field check:", latestEng.type, latestEng.Type);
    // console.log("🧾 All engagements for firm:", firm.leadEngagements);

    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return "";

      // ✅ Adjust to local time instead of UTC
      const offset = d.getTimezoneOffset();
      const localDate = new Date(d.getTime() - offset * 60 * 1000);
      return localDate.toISOString().slice(0, 16);
    };

    // Fill edit form from either root lead data or latest engagement
    setEditFormData({
      id: firm.id || latestEng?.leadId || "",
      name: firm.name || "",
      remark: firm.remark || latestEng?.remarks || "",
      // leadType: latestEng?.type || '', 
      leadType: normalizeLeadType(latestEng?.type),
      status: normalizeStatus(firm.status || latestEng?.status),
      nextFollowUpDate: formatDateForInput(latestEng?.nextFollowUp || firm.nextFollowUp),
      // visitScheduledDate: latestEng?.visitScheduledDate || "",
      visitScheduledDate: formatDateForInput(latestEng?.visitScheduledDate || ""),
    });
    // console.log("📋 Final editFormData set to:", {
    //   id: firm.id || latestEng?.leadId || "",
    //   name: firm.name || "",
    //   remark: firm.remark || latestEng?.remarks || "",
    //   leadType: firm.leadType || latestEng?.type || "",
    //   status: firm.status || latestEng?.status || "",
    //   nextFollowUpDate:
    //     firm.nextFollowUp ||
    //     latestEng?.nextFollowUp ||
    //     "",
    //   visitScheduledDate: latestEng?.visitScheduledDate || "",
    // });
    onSelectLead(firm);
    console.log("🧩 Final computed leadType (to be shown in modal):", firm.leadType || latestEng?.type);
    setModalOpen(true);
    console.groupEnd();
  };
  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditingItem(null);
  };


  const filteredFirms = firms.filter((firm) => {
    if (!startDate && !endDate) return true;
    const nextFollowUpDate = new Date(firm.nextFollowUp);
    if (startDate && nextFollowUpDate < new Date(startDate)) return false;
    if (endDate && nextFollowUpDate > new Date(endDate)) return false;
    return true;
  });


  const normalizeLeadType = (type) => {
    if (!type) return "";
    const t = type.toUpperCase();
    if (t === "HOT") return "hot";
    if (t === "WARM") return "warm";
    if (t === "COLD") return "cold";
    if (t === "LOST") return "lost";
    return "undefined";
  };

  const normalizeStatus = (status) => {
    if (!status) return "";
    const s = status.toUpperCase().replace(/_/g, " ");
    if (s === "FOLLOW UP") return "Follow Up";
    if (s === "NOT INTERESTED") return "Not Interested";
    // if (s === "BOOKED PROPERTY IN OTHER PROJECT") return "Booked property In Other Project";
    if (s === "BOOKED PROPERTY IN OTHER PROJECT" || s === "BOOKED ANOTHER PROPERTY")
      return "Booked property In Other Project";
    if (s === "INVALID NUMBER") return "Invalid Number";
    if (s === "VISIT SCHEDULED") return "Visit Scheduled";
    if (s === "VISIT DONE") return "Visit Done";
    return "";
  };

  const handleSave = async () => {
    // console.group("🔍 HANDLE SAVE TRIGGERED");

    // console.log(" editFormData:", editFormData);
    // console.log(" userId:", userId, " | userName:", userName);
    // console.log("🧩 Constants.baseURL:", Constants?.baseURL);

    // ✅ Basic validation
    if (
      !editFormData.status ||
      !editFormData.leadType ||
      (editFormData.status === "Follow Up" && !editFormData.nextFollowUpDate) ||
      (editFormData.status === "Visit Scheduled" && !editFormData.visitScheduledDate)
    ) {
      console.warn("⚠️ Validation failed:", editFormData);
      toast.error("Please fill all required fields!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      //  Prepare payload (matches backend DTO: LeadEngagementRequest)
      const payload = {
        id: editFormData.id, // Engagement ID
        leadId: editFormData.leadId || editFormData.id, // Lead ID 
        // status: editFormData.status.trim().replace(/\s+/g, "_").toUpperCase(),
        status:
          editFormData.status === "Booked property In Other Project"
            ? "BOOKED_ANOTHER_PROPERTY"
            : editFormData.status.trim().replace(/\s+/g, "_").toUpperCase(),

        type: editFormData.leadType.trim().toUpperCase(),
        remarks: editFormData.remark?.trim() || "",
        nextFollowUp: editFormData.nextFollowUpDate || null,
        visitScheduledDate: editFormData.visitScheduledDate || null,
        updatedBy: userName || "System",
      };

      console.log("🧾 Sending payload:", payload);
      console.log("📤 JSON body being sent to API:", JSON.stringify(payload, null, 2));

      // 
      const response = await fetch(
        `https://localhost:5289/sales/api/leads/${payload.leadId}/engagements`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );

      console.log("📡 Response Status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Update failed. Response:", errorText);
        throw new Error("Update failed");
      }

      //  If update successful — parse response
      const updatedLead = await response.json();
      console.log(" Updated Lead:", updatedLead);


      if (editFormData.status === "Visit Done") {
  console.log("🟢 Lead marked as Visit Done – adding to Enquiries table...");

  const enquiryPayload = {
    id: editingItem?.id,
    name: editingItem?.name,
    phone: editingItem?.phone,
    whatsapp: editingItem?.whatsapp,
    email: editingItem?.email,
    address: editingItem?.address,
    occupation: visitDoneData?.occupation || editingItem?.occupation || "N/A",
    company: editingItem?.company,
    interest: visitDoneData?.interestedIn || editingItem?.interest || "",
    budgetInLakh: editingItem?.budgetInLakh || 0,
    intendedPurchasePeriodMonths: editingItem?.intendedPurchasePeriodMonths || 0,
    lastSiteVisit: new Date().toISOString(),
    source: editingItem?.source || "N/A",
    remarks: editFormData.remark || editingItem?.remarks || "",
    status: "Visit Done",
    salesEngagement: {
      assignedTo: userName || "system",
      assignedBy: userName || "system",
      assignedDate: new Date().toISOString(),
      nextFollowUp: new Date().toISOString(),
      enquiryId: editingItem?.id,
      status: "Active",
      remarks: "Auto-created from Visit Done lead",
    },
  };

  console.log("📤 Sending Enquiry POST Request:", enquiryPayload);

  try {
    const enquiryResponse = await fetch(
      "https://localhost:5289/sales/api/enquiries",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(enquiryPayload),
      }
    );

    if (!enquiryResponse.ok) {
      const errText = await enquiryResponse.text();
      console.error("❌ Failed to save enquiry:", errText);
      toast.error("Failed to add lead to Enquiry table!");
    } else {
      const enquiryResult = await enquiryResponse.json();
      console.log("✅ Enquiry saved successfully:", enquiryResult);
      toast.success("Lead added to Enquiry table!");
    }
  } catch (err) {
    console.error("🚨 Error saving enquiry:", err);
    toast.error("Error while saving enquiry!");
  }
}


      // . Update local form state immediately (instant UI feedback)
      setEditFormData((prev) => ({
        ...prev,
        status: normalizeStatus(payload.status || prev.status),
        remark: payload.remarks || prev.remark,
        nextFollowUpDate: payload.nextFollowUp,
        visitScheduledDate: payload.visitScheduledDate,
        leadType: payload.type, //  make sure type updates in the form instantly
      }));
      toast.success("Follow-up updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      //  Refresh table after saving
      if (fetchUserLeads) {
        console.log("🔄 Refetching latest leads...");
        console.log("🔄 Refetching latest leads...");
        const refreshed = await fetchUserLeads();
        console.log("✅ Refetched Data:", refreshed);
      }

      setEditFormData((prev) => ({
        ...prev,
        // status: payload.status,
        // remark: payload.remarks,
        // status: normalizeStatus(payload.status || latestEng?.status),
        status: normalizeStatus(payload.status || editingItem?.status),
        // remark: payload.remark || latestEng?.remarks || "",
        remark: payload.remark || editingItem?.remarks || "",
        nextFollowUpDate: payload.nextFollowUp,
        visitScheduledDate: payload.visitScheduledDate
      }));
      setModalOpen(false);
    } catch (error) {
      console.error("🚨 Error updating follow-up:", error);
      toast.error("Failed to update follow-up", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      console.groupEnd();
    }
  };




  const filteredLeads = data.filter(
    (lead) => lead.status?.toUpperCase() !== "VISIT_SCHEDULED"
  );

 


//   const handleUpdateEnquiry = async () => {
//   try {
//   const payload = {
//   id: editingItem.id,
//   name: editingItem.name,
//   phone: editingItem.phone,
//   whatsapp: editingItem.whatsapp,
//   email: editingItem.email,
//   address: editingItem.address,
//   occupation: visitDoneData.occupation,
//   company: editingItem.company,
//   interest: visitDoneData.interestedIn,
//   budgetInLakh: editingItem.budgetInLakh || 0,
//   intendedPurchasePeriodMonths: editingItem.intendedPurchasePeriodMonths || 0,
//   lastSiteVisit: editingItem.lastSiteVisit || new Date().toISOString(),
//   source: editingItem.source || "N/A",
//   remarks: editingItem.remarks || "",
//   status: editingItem.status || "Visit Done",
//   salesEngagement: {
//     assignedTo: editingItem.salesEngagement?.assignedTo || "system",
//     assignedBy: editingItem.salesEngagement?.assignedBy || "system",
//     assignedDate: editingItem.salesEngagement?.assignedDate || new Date().toISOString(),
//     nextFollowUp: editingItem.salesEngagement?.nextFollowUp || new Date().toISOString(),
//     enquiryId: editingItem.id,
//     status: editingItem.salesEngagement?.status || "Active",
//     remarks: editingItem.salesEngagement?.remarks || "Updated from Visit Done modal",
//   },
// };


//     const response = await fetch(
//       `https://localhost:5289/sales/api/enquiries/${editingItem.id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Accept": "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       }
//     );

//     if (!response.ok) {
//       const errText = await response.text();
//       console.error("❌ Backend error text:", errText);
//       throw new Error(`Failed to update enquiry (status ${response.status})`);
//     }

//     const updated = await response.json();
//     console.log("✅ Enquiry updated successfully:", updated);
//     toast.success("Enquiry updated successfully!");
//     setVisitDoneModalOpen(false);
//     fetchUserLeads && fetchUserLeads();
//   } catch (error) {
//     console.error("❌ Error updating enquiry:", error);
//     toast.error("Failed to update enquiry");
//   }
// };


// const handleUpdateEnquiry = async () => {
//   try {
//      console.group("🟢 handleUpdateEnquiry Triggered");
//     console.log("✳️ Editing Item:", editingItem);
//     console.log("✳️ Visit Done Data:", visitDoneData);

//     const payload = {
//       id: editingItem.id,
//       name: editingItem.name,
//       phone: editingItem.phone,
//       whatsapp: editingItem.whatsapp,
//       email: editingItem.email,
//       address: editingItem.address,
//       occupation: visitDoneData.occupation,
//       company: editingItem.company,
//       interest: visitDoneData.interestedIn,
//       budgetInLakh: editingItem.budgetInLakh || 0,
//       intendedPurchasePeriodMonths: editingItem.intendedPurchasePeriodMonths || 0,
//       lastSiteVisit: editingItem.lastSiteVisit || new Date().toISOString(),
//       source: editingItem.source || "N/A",
//       remarks: editingItem.remarks || "",
//       status: editingItem.status || "Visit Done",
//       salesEngagement: {
//         assignedTo: editingItem.salesEngagement?.assignedTo || "system",
//         assignedBy: editingItem.salesEngagement?.assignedBy || "system",
//         assignedDate:
//           editingItem.salesEngagement?.assignedDate || new Date().toISOString(),
//         nextFollowUp:
//           editingItem.salesEngagement?.nextFollowUp || new Date().toISOString(),
//         enquiryId: editingItem.id,
//         status: editingItem.salesEngagement?.status || "Active",
//         remarks:
//           editingItem.salesEngagement?.remarks ||
//           "Updated from Visit Done modal",
//       },
//     };

//     console.log("📤 Sending PATCH request:", payload);
     

//     const response = await fetch(
//       `https://localhost:5289/sales/api/enquiries/${editingItem.id}`,
//       {
//         method: "PATCH",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(payload),
//       }
//     );

//       console.log("📡 Response Status:", response.status);

//     if (!response.ok) {
//       const errText = await response.text();
//       console.error("❌ Backend error text:", errText);
//       throw new Error(`Failed to update enquiry (status ${response.status})`);
//     }

//     // ✅ Handle empty or non-JSON responses safely
//     const text = await response.text();
//     let updated = null;
//     if (text) {
//       try {
//         updated = JSON.parse(text);
//       } catch (err) {
//         console.warn("⚠️ Response is not valid JSON, ignoring parse error.");
//       }
//     }

//     console.log("✅ Enquiry updated successfully:", updated);
//     toast.success("Enquiry updated successfully!");

//     // Close modal and refresh list
//     setVisitDoneModalOpen(false);
//     if (fetchUserLeads) {
//       fetchUserLeads();
//     }
//   } catch (error) {
//     console.error("❌ Error updating enquiry:", error);
//     toast.error("Failed to update enquiry");
//   }
// };

  return (
    <>
      <TableContainer component={Paper}>
        <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: Constants.primaryColor }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACTION</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LEAD NO</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO / WHATSAPP NO</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>EMAIL</TableCell>

                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LAST FOLLOW UP</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NEXT FOLLOW UP</TableCell>
                {/* <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>STATUS</TableCell> */}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>REMARK</TableCell>
                {/* <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ASSIGN TO</TableCell> */}
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}> LOOKING FOR?</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>SOURCE NAME</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* {data.map((firm, index) => { */}
              {filteredLeads.map((firm, index) => {

                console.group(`🧩 Lead Row [${index}]`);
                console.log("➡️ Full firm object:", firm);
                // console.log("🔑 Keys in firm:", Object.keys(firm));
                // console.log("📎 leadEnagagements:", firm.leadEnagagements);
                // console.log("📎 leadEngagements:", firm.leadEngagements);

                // console.log("📌 leadEnagagements?.length:", firm.leadEnagagements?.length);
                // console.log("🔎 firm.leadEnagagements[0]:", firm.leadEnagagements?.[0]);


                console.groupEnd();
                return (
                  <TableRow key={index} onClick={() => handleSelectItem(firm)}>
                    <TableCell sx={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <Tooltip title="Edit" arrow>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditClick(firm)}
                            sx={{
                              backgroundColor: Constants.primaryColor,
                              padding: '5px',
                              borderRadius: '50%',
                              color: 'white',
                              fontSize: '16px',
                            }}
                          >
                            <FaPhoneAlt />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="WhatsApp" arrow>
                          <IconButton
                            color="success"
                            onClick={() => window.open(`https://wa.me/${firm.mobileNo || ''}`, '_blank')}
                            sx={{
                              backgroundColor: Constants.primaryColor,
                              padding: '5px',
                              borderRadius: '50%',
                              color: 'white',
                              fontSize: '18px',
                            }}
                          >
                            <FaWhatsapp />
                          </IconButton>
                        </Tooltip>

                      </div>
                    </TableCell>


                    {/* <TableCell>{firm.id || '-'}</TableCell> */}
                    <TableCell sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>{firm.id ? `Lead - ${firm.id}` : '-'}</TableCell>

                    <TableCell>{firm.name || '-'}</TableCell>
                    <TableCell>{firm.phone || '-'}</TableCell>
                    <TableCell>{firm.email || '-'}</TableCell>

                    {/* <TableCell>{firm.lastFollowUp || '-'}</TableCell>
                  <TableCell>{firm.nextFollowUp || '-'}</TableCell> */}


                    {/* <TableCell>
  {firm.leadEnagagements?.[0]?.visitScheduledDate
    ? new Date(firm.leadEnagagements[0].visitScheduledDate).toLocaleDateString()
    : "-"}
</TableCell> */}
                    {/* 🕓 Last Follow Up - only previous follow up date */}
                    <TableCell>
                      {firm.leadEnagagements?.length > 1
                        ? new Date(
                          firm.leadEnagagements[firm.leadEnagagements.length - 2]?.nextFollowUp
                        ).toLocaleDateString()
                        : "-"}
                    </TableCell>

                    {/* <TableCell>
  {firm.leadEnagagements?.[0]?.nextFollowUp
    ? new Date(firm.leadEnagagements[0].nextFollowUp).toLocaleDateString()
    : "-"}
</TableCell> */}
                    {/* 🗓️ Next Follow Up - show nextFollowUp or visitScheduledDate */}
                    <TableCell>
                      {firm.leadEnagagements?.[firm.leadEnagagements.length - 1]?.nextFollowUp
                        ? new Date(
                          firm.leadEnagagements[firm.leadEnagagements.length - 1]?.nextFollowUp
                        ).toLocaleDateString()
                        : firm.leadEnagagements?.[firm.leadEnagagements.length - 1]
                          ?.visitScheduledDate
                          ? new Date(
                            firm.leadEnagagements[firm.leadEnagagements.length - 1]
                              ?.visitScheduledDate
                          ).toLocaleDateString()
                          : "-"}
                    </TableCell>

                    {/* <TableCell>{firm.status || '-'}</TableCell> */}
                    {/* <TableCell>{firm.remark || '-'}</TableCell> */}
                    <TableCell>{firm.leadEnagagements?.[0]?.remarks || "-"}</TableCell>
                    {/* <TableCell>{firm.assignTo || '-'}</TableCell> */}
                    {/* <TableCell>{firm.leadEnagagements?.[0]?.assignedTo || "-"}</TableCell> */}
                    <TableCell>{firm.interest || '-'}</TableCell>
                    <TableCell>{firm.source || '-'}</TableCell>
                  </TableRow>
                );
              })}

            </TableBody>
          </Table>

        </Box>
      </TableContainer>

      {/* <Modal open={modalOpen} onClose={handleModalClose}> */}
      <Modal
        open={modalOpen}
        onClose={() => { }} //  Disable default close when clicking backdrop or pressing Esc
        disableEscapeKeyDown
        disableEnforceFocus
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            // width: 950,
            width: { xs: "90%", sm: "80%", md: "950px" },
            maxWidth: "95vw",
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
          }}
        >
          {editingItem && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Lead No."
                  value={editFormData.id}
                  onChange={(e) => setEditFormData({ ...editFormData, id: e.target.value })}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Remark"
                  value={editFormData.remark}
                  onChange={(e) => setEditFormData({ ...editFormData, remark: e.target.value })}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>

                <TextField
                  select
                  fullWidth
                  label="Lead Type"
                  value={editFormData.leadType}
                  onChange={(e) => setEditFormData({ ...editFormData, leadType: e.target.value })}
                  sx={{ border: Constants.formInputBorderColor }}
                  required
                >
                  <MenuItem value="">Select Lead Type</MenuItem>
                  <MenuItem value="hot">Hot</MenuItem>
                  <MenuItem value="warm">Warm</MenuItem>
                  <MenuItem value="cold">Cold</MenuItem>
                  <MenuItem value="lost">Lost</MenuItem>
                  <MenuItem value="undefined">Undefined</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Status"
                  value={editFormData.status}
                  // onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    setEditFormData({ ...editFormData, status: newStatus });

                    if (newStatus === "Visit Done") {
                      setVisitDoneModalOpen(true);
                    }
                  }}
                  required
                  sx={{ border: Constants.formInputBorderColor }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Follow Up">Follow Up</MenuItem>
                  <MenuItem value="Not Interested">Not Interested</MenuItem>
                  <MenuItem value="Booked property In Other Project">Booked property In Other Project</MenuItem>
                  <MenuItem value="Invalid Number">Invalid Number</MenuItem>
                  <MenuItem value="Visit Scheduled">Visit Scheduled</MenuItem>
                  <MenuItem value="Visit Done">Visit Done</MenuItem>
                  <MenuItem value="booked">Booked</MenuItem>
                </TextField>
              </Grid>

              {/* ✅ Conditional Fields Based on Status */}
              {editFormData.status === "Visit Scheduled" && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Visit Scheduled Date"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={editFormData.visitScheduledDate}
                    required
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, visitScheduledDate: e.target.value })
                    }
                  />
                </Grid>
              )}

              {editFormData.status === "Follow Up" && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Next Follow Up Date"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={editFormData.nextFollowUpDate}
                    required
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, nextFollowUpDate: e.target.value })
                    }
                  />
                </Grid>
              )}

              {/* Buttons */}
              <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: Constants.primaryColor }}
                  onClick={handleSave}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </Box></Modal>


      {/* <Modal
        open={visitDoneModalOpen}
        onClose={() => setVisitDoneModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: { xs: "90%", sm: "400px" },
          }}
        >
          <h3 style={{ marginBottom: "15px", color: Constants.primaryColor }}>
            Customer Information
          </h3>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Occupation"
                value={visitDoneData.occupation}
                onChange={(e) =>
                  setVisitDoneData({ ...visitDoneData, occupation: e.target.value })
                }
                sx={{ border: Constants.formInputBorderColor }}
              >
                <MenuItem value="Service / Job">Service / Job</MenuItem>
                <MenuItem value="Business / Self employed">Business / Self employed</MenuItem>
                <MenuItem value="Professional">Professional</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Interested In"
                value={visitDoneData.interestedIn}
                onChange={(e) =>
                  setVisitDoneData({
                    ...visitDoneData,
                    interestedIn: e.target.value,
                  })

                }
                sx={{ border: Constants.formInputBorderColor }}
              >
                <MenuItem value="1 BHK">1 BHK</MenuItem>
                <MenuItem value="2 BHK">2 BHK</MenuItem>
                <MenuItem value="3 BHK">3 BHK</MenuItem>
                <MenuItem value="4 BHK">4 BHK</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: Constants.primaryColor }}
                onClick={() => {
                  console.log("✅ Visit Done Data:", visitDoneData);
                  setVisitDoneModalOpen(false);
                }}
                // onClick={handleUpdateEnquiry}
              >
                Save
              </Button>


              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setVisitDoneModalOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal> */}

      <ToastContainer />
    </>
  );
};

export default PendingFollowuptable;


