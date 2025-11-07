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

  // const handleEditClick = (firm) => {
  //   setEditingItem(firm); // set the row to edit   
  // };
  const handleEditClick = (firm) => {
    setEditingItem(firm); // set the row to edit
    setEditFormData({
      id: firm.id,
      name: firm.name,
      remark: firm.remark,
      leadType: firm.leadType,
      status: firm.status,
      nextFollowUpDate: firm.nextFollowUp || '',
      visitScheduledDate: '',
    });
    onSelectLead(firm);
    setModalOpen(true);   // open modal
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



  //   const handleSave = () => {
  //   // Simple validation example
  //   if ( !editFormData.status || !editFormData.leadType || !editFormData.nextFollowUpDate || !!editFormData.visitScheduledDate) {
  //     toast.error("Please fill all required fields!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return; // DO NOT close modal
  //   }


  //   // Update the firms array
  //   const index = firms.findIndex(f => f.leadNo === editingItem.leadNo);
  //   if (index !== -1) {
  //     firms[index] = { ...firms[index], ...editFormData };
  //   }


  //   handleModalClose(); // Only close modal after valid data
  //   toast.success("Values updated successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //   });
  // };


  // const userLeads = data?.filter((lead) =>
  //   lead.leadEnagagements &&
  //   lead.leadEnagagements.some(
  //     (eng) => eng.assignedTo === userId
  //   )
  // );







  // const handleSave = async () => {
  //   console.group("🔍 HANDLE SAVE TRIGGERED");

  //   console.log(" editFormData:", editFormData);
  //   console.log(" userId:", userId, " |  userName:", userName);
  //   console.log("🧩 Constants.baseURL:", Constants?.baseURL);

  //   // ✅ Basic validation
  //   if (
  //     !editFormData.status ||
  //     !editFormData.leadType ||
  //     (editFormData.status === "Follow Up" && !editFormData.nextFollowUpDate) ||
  //     (editFormData.status === "Visit Scheduled" && !editFormData.visitScheduledDate)
  //   ) {
  //     console.warn("⚠️ Validation failed:", editFormData);
  //     toast.error("Please fill all required fields!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   try {
  //     // ✅ Prepare payload (matches backend DTO: LeadEngagementRequest)
  //     const payload = {
  //       id: editFormData.id, // Engagement ID
  //       leadId: editFormData.id, // Lead ID (same if you don’t have both yet)
  //       status: editFormData.status.replace(/\s+/g, "_").toUpperCase(),
  //       type: editFormData.leadType.toUpperCase(),
  //       remarks: editFormData.remark,
  //       nextFollowUp: editFormData.nextFollowUpDate || null,
  //       visitScheduledDate: editFormData.visitScheduledDate || null,
  //       updatedBy: userName || "System",
  //     };

  //     console.log("🧾 Sending payload:", payload);

  //     // ✅ API CALL
  //     // `https://localhost:5289/api/leads/${editFormData.id}/engagements`
  //     // const response = await fetch(`https://localhost:5289/api/leads/${editFormData.leadId}/engagements`,
  //     const response = await fetch(`https://localhost:5289/sales/api/leads/${editFormData.leadId || editFormData.id}/engagements`, {


  //         method: "POST", // ✅ matches your backend endpoint
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //         body: JSON.stringify(payload),
  //       }
  //     );

  //     console.log("📡 Response Status:", response.status);


  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       console.error("❌ Update failed. Response:", errorText);
  //       throw new Error("Update failed");
  //     }

  //     toast.success("Follow-up updated successfully!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });

  //     setModalOpen(false);
  //   } catch (error) {
  //     console.error("Error updating follow-up:", error);
  //     toast.error("Failed to update follow-up", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };






  const handleSave = async () => {
    console.group("🔍 HANDLE SAVE TRIGGERED");

    console.log(" editFormData:", editFormData);
    console.log(" userId:", userId, " | userName:", userName);
    console.log("🧩 Constants.baseURL:", Constants?.baseURL);

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
      // ✅ Prepare payload (matches backend DTO: LeadEngagementRequest)
      const payload = {
        id: editFormData.id, // Engagement ID
        leadId: editFormData.leadId || editFormData.id, // Lead ID fallback
        status: editFormData.status.trim().replace(/\s+/g, "_").toUpperCase(),
        type: editFormData.leadType.trim().toUpperCase(),
        remarks: editFormData.remark?.trim() || "",
        nextFollowUp: editFormData.nextFollowUpDate || null,
        visitScheduledDate: editFormData.visitScheduledDate || null,
        updatedBy: userName || "System",
      };

      console.log("🧾 Sending payload:", payload);

      // ✅ API CALL
      const response = await fetch(
        `https://localhost:5289/sales/api/leads/${payload.leadId}/engagements`,
        {
          method: "POST", // ✅ matches your backend endpoint
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

      // ✅ If update successful — parse response
      const updatedLead = await response.json();
      console.log("✅ Updated Lead:", updatedLead);

      // // 🔹 Update local state (if you're displaying leads in a table)
      // setLeads((prevLeads) =>
      //   prevLeads.map((lead) =>
      //     lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      //   )
      // );

      // 🔹 Update form state
      // setFormData({
      //   status: updatedLead.status,
      //   nextFollowUp: updatedLead.nextFollowUp
      //     ? dayjs(updatedLead.nextFollowUp)
      //     : null,
      //   remark: updatedLead.remark || "",
      // });

      //  await fetchUserLeads();
      if (fetchUserLeads) {
        await fetchUserLeads();
        console.log("🔄 Refetched latest leads after update");
      }

      toast.success("Follow-up updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setEditFormData((prev) => ({
        ...prev,
        status: payload.status,
        remark: payload.remarks,
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
              {/* { filteredFirms
      .map((firm, index) => ( */}
              {data.map((firm, index) => (

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

                  <TableCell>{firm.lastFollowUp || '-'}</TableCell>
                  <TableCell>{firm.nextFollowUp || '-'}</TableCell>
                  {/* <TableCell>{firm.status || '-'}</TableCell> */}
                  {/* <TableCell>{firm.remark || '-'}</TableCell> */}
                  <TableCell>{firm.leadEnagagements?.[0]?.remarks || "-"}</TableCell>
                  {/* <TableCell>{firm.assignTo || '-'}</TableCell> */}
                  {/* <TableCell>{firm.leadEnagagements?.[0]?.assignedTo || "-"}</TableCell> */}
                  <TableCell>{firm.interest || '-'}</TableCell>
                  <TableCell>{firm.source || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </Box>
      </TableContainer>

      <Modal open={modalOpen} onClose={handleModalClose}>
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
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                  required
                  sx={{ border: Constants.formInputBorderColor }}
                >
                  <MenuItem value="">Select Status</MenuItem>
                  <MenuItem value="Follow Up">Follow Up</MenuItem>
                  <MenuItem value="Not Interested">Not Interested</MenuItem>
                  <MenuItem value="Booked property In Other Project">Booked property In Other Project</MenuItem>
                  <MenuItem value="Invalid Number">Invalid Number</MenuItem>
                  <MenuItem value="Visit Scheduled">Visit Scheduled</MenuItem>
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
      <ToastContainer />
    </>
  );
};

export default PendingFollowuptable;


