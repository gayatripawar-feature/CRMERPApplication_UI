
import React, { useState } from "react";
import {
  TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,
  IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Box
} from "@mui/material";
import { Edit, WhatsApp, Email, Visibility, Close } from "@mui/icons-material";
import { FaUpload, FaTrash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Constants from "../Constants";

// Helper function to get all documents of a specific type
const getAllDocumentsByType = (item, documentType) => {
  const documents = [];

  // Add main allottee documents
  const mainDocKey = `allottee${documentType.charAt(0).toUpperCase() + documentType.slice(1)}`;
  if (item[mainDocKey] && Array.isArray(item[mainDocKey])) {
    item[mainDocKey].forEach(doc => {
      if (doc && typeof doc === 'object' && !(doc instanceof File)) {
        // Convert plain object back to File if needed
        const file = new File([], doc.name || 'document', {
          type: doc.type || 'application/octet-stream'
        });
        documents.push(file);
      } else if (doc instanceof File) {
        documents.push(doc);
      }
    });
  }

  // Add co-allottee documents
  if (item.coAllottees && Array.isArray(item.coAllottees)) {
    item.coAllottees.forEach((coAllottee, index) => {
      if (coAllottee[documentType] && Array.isArray(coAllottee[documentType])) {
        coAllottee[documentType].forEach(doc => {
          if (doc && typeof doc === 'object' && !(doc instanceof File)) {
            // Convert plain object back to File if needed
            const file = new File([], doc.name || 'document', {
              type: doc.type || 'application/octet-stream'
            });
            documents.push(file);
          } else if (doc instanceof File) {
            documents.push(doc);
          }
        });
      }
    });
  }

  return documents;
};

const BookingFormTable = ({ data, onUpdate }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Document Preview Handler - Opens each document in new tab
  const handleDocumentPreview = (item, documentType, documentLabel) => {
    const documents = getAllDocumentsByType(item, documentType);

    if (documents.length === 0) {
      toast.info(`No ${documentLabel} documents available`, { position: "top-right" });
      return;
    }

    // Open each document in a new tab
    documents.forEach((doc, index) => {
      try {
        // Create object URL for the file
        const url = URL.createObjectURL(doc);

        // Open in new tab
        const newTab = window.open(url, `_${documentType}_${index}`);

        // Revoke the object URL after the tab is loaded (with a delay to ensure it loads)
        if (newTab) {
          newTab.onload = () => {
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          };
        } else {
          // If popup blocked, revoke immediately and show message
          URL.revokeObjectURL(url);
          toast.error("Popup blocked! Please allow popups for this site to view documents.", {
            position: "top-right"
          });
        }
      } catch (error) {
        console.error(`Error opening document ${index + 1}:`, error);
        toast.error(`Error opening document ${index + 1}`, { position: "top-right" });
      }
    });

    // Show success message
    toast.success(`Opening ${documents.length} ${documentLabel} in new tabs`, {
      position: "top-right",
      autoClose: 3000
    });
  };

  // Render document cell with eye icon and count
  const renderDocumentCell = (item, documentType, documentLabel) => {
    const documents = getAllDocumentsByType(item, documentType);
    const documentCount = documents.length;

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <Tooltip title={`View ${documentLabel} (${documentCount} documents)`} arrow>
          <IconButton
            sx={{
              color: documentCount > 0 ? "#1976D2" : "#ccc",
              cursor: documentCount > 0 ? 'pointer' : 'default'
            }}
            onClick={() => documentCount > 0 && handleDocumentPreview(item, documentType, documentLabel)}
            disabled={documentCount === 0}
            size="small"
          >
            <Visibility fontSize="small" />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ minWidth: '20px', textAlign: 'center' }}>
          ({documentCount})
        </Typography>
      </Box>
    );
  };

  // Edit functionality - Using Dialog instead of Modal
  const handleEditClick = (item) => {
    setSelectedItem({
      ...item,
      // Initialize document arrays if they don't exist
      allotteePanCard: item.allotteePanCard || [],
      allotteeAadhaarCard: item.allotteeAadhaarCard || [],
      allotteeMarriageCertificate: item.allotteeMarriageCertificate || [],
      allotteePassportPhoto: item.allotteePassportPhoto || [],
      allotteeOtherDocuments: item.allotteeOtherDocuments || [],
      coAllottees: item.coAllottees?.map(coAllottee => ({
        ...coAllottee,
        panCard: coAllottee.panCard || [],
        aadhaarCard: coAllottee.aadhaarCard || [],
        marriageCertificate: coAllottee.marriageCertificate || [],
        passportPhoto: coAllottee.passportPhoto || [],
        otherDocuments: coAllottee.otherDocuments || []
      })) || []
    });
    setOpenEditDialog(true);
  };

  const handleUpdate = () => {
    if (selectedItem && onUpdate) {
      onUpdate(selectedItem);
      toast.success("Details updated successfully!", {
        position: "top-right",
        autoClose: 3000
      });
      setOpenEditDialog(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSelectChange = (field, value) => {
    setSelectedItem(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle main allottee document changes
  const handleAllotteeDocumentChange = (documentType, files) => {
    setSelectedItem(prev => ({
      ...prev,
      [documentType]: [...(prev[documentType] || []), ...files]
    }));
  };

  // Handle co-allottee document changes
  const handleCoAllotteeDocumentChange = (index, documentType, files) => {
    const updatedCoAllottees = [...selectedItem.coAllottees];
    updatedCoAllottees[index] = {
      ...updatedCoAllottees[index],
      [documentType]: [...(updatedCoAllottees[index][documentType] || []), ...files]
    };
    setSelectedItem(prev => ({
      ...prev,
      coAllottees: updatedCoAllottees
    }));
  };

  // Remove document from main allottee
  const handleRemoveAllotteeDocument = (documentType, fileIndex) => {
    setSelectedItem(prev => ({
      ...prev,
      [documentType]: prev[documentType].filter((_, index) => index !== fileIndex)
    }));
  };

  // Remove document from co-allottee
  const handleRemoveCoAllotteeDocument = (coAllotteeIndex, documentType, fileIndex) => {
    const updatedCoAllottees = [...selectedItem.coAllottees];
    updatedCoAllottees[coAllotteeIndex] = {
      ...updatedCoAllottees[coAllotteeIndex],
      [documentType]: updatedCoAllottees[coAllotteeIndex][documentType].filter((_, index) => index !== fileIndex)
    };
    setSelectedItem(prev => ({
      ...prev,
      coAllottees: updatedCoAllottees
    }));
  };

  const handleCoAllotteeChange = (index, field, value) => {
    const updatedCoAllottees = [...selectedItem.coAllottees];
    updatedCoAllottees[index] = {
      ...updatedCoAllottees[index],
      [field]: value
    };
    setSelectedItem(prev => ({
      ...prev,
      coAllottees: updatedCoAllottees
    }));
  };

  const handleAddCoAllottee = () => {
    const newCoAllottee = {
      name: "",
      dob: "",
      occupation: "",
      pan: "",
      aadhar: "",
      mobileEmail: "",
      panCard: [],
      aadhaarCard: [],
      marriageCertificate: [],
      passportPhoto: [],
      otherDocuments: []
    };
    setSelectedItem(prev => ({
      ...prev,
      coAllottees: [...prev.coAllottees, newCoAllottee]
    }));
  };

  const handleRemoveCoAllottee = (index) => {
    if (selectedItem.coAllottees.length > 1) {
      const updatedCoAllottees = selectedItem.coAllottees.filter((_, i) => i !== index);
      setSelectedItem(prev => ({
        ...prev,
        coAllottees: updatedCoAllottees
      }));
    }
  };

  const handleWhatsAppClick = (item) => {
    if (item.mobileNo) {
      const whatsappUrl = `https://wa.me/91${item.mobileNo}`;
      window.open(whatsappUrl, '_blank');
    } else {
      toast.error("No mobile number available", { position: "top-right" });
    }
  };

  const handleEmailClick = (item) => {
    if (item.emailId) {
      const mailtoUrl = `mailto:${item.emailId}`;
      window.open(mailtoUrl, '_blank');
    } else {
      toast.error("No email address available", { position: "top-right" });
    }
  };

  // Helper function to render multiple co-allottees in a single cell
  const renderMultipleCoAllottees = (coAllottees, field) => {
    if (!coAllottees || !Array.isArray(coAllottees)) {
      return '-';
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {coAllottees.map((coAllottee, index) => (
          <div key={index} style={{
            padding: '2px 4px',
            borderBottom: index < coAllottees.length - 1 ? '1px solid #e0e0e0' : 'none'
          }}>
            {coAllottee[field] || '-'}
          </div>
        ))}
      </div>
    );
  };

  // Document types for rendering
  const documentTypes = [
    { type: "panCard", label: "PAN Card" },
    { type: "aadhaarCard", label: "AADHAR Card" },
    { type: "marriageCertificate", label: "MARRIAGE CERTIFICATE (If Available)" },
    { type: "passportPhoto", label: "PASSPORT SIZE PHOTO" },
    { type: "otherDocuments", label: "Any Other" }
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PROJECT NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DATE OF FLAT BOOKING</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF ALLOTEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DATE OF BIRTH</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PAN NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AADHAR NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE MOBILE NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DATE OF BIRTH (CO-ALLOTEE)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION (CO-ALLOTEE)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PAN NO. (CO-ALLOTEE)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AADHAR NO. (CO-ALLOTEE)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO. & EMAIL (CO-ALLOTEE)</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WING</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOLD RATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CARPET AREA IN (SQ. MTR.)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENCLOSED BALCONY IN (SQ. MTR.)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OPEN BALCONY IN (SQ. MTR.)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TERRACE IN (SQ. MTR.)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARKING</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOOR</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TOTAL CONSIDERATION /AGREEMENT VALUE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BOOKING AMOUNT / ADVANCE PAYMENT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAMP DUTY (7% OF AGREEMENT COST)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REGISTRATION FEE(1% OF AGREEMENT COST)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST AMOUNT</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PAN CARD</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AADHAR CARD</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MARRIAGE CERTIFICATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PASSPORT PHOTO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OTHER Documents </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BOOKING AMOUNT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PAYMENT MODE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CHEQUE/TRN NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CHEQUE/TRN DATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BANK NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BANK DETAILS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                      minHeight: "40px"
                    }}>

                      <Tooltip title="Edit" arrow>
                        <IconButton
                          sx={{ background: "#1976D2", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
                          onClick={() => handleEditClick(item)}
                        >
                          <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="WhatsApp" arrow>
                        <IconButton
                          sx={{ background: "#25D366", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
                          onClick={() => handleWhatsAppClick(item)}
                        >
                          <WhatsApp sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Email" arrow>
                        <IconButton
                          sx={{ background: "#D44638", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
                          onClick={() => handleEmailClick(item)}
                        >
                          <Email sx={{ fontSize: 18 }} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>

                  <TableCell>{item.timestamp || '-'}</TableCell>
                  <TableCell>{item.enquiryNo || '-'}</TableCell>
                  <TableCell>{item.projectName || '-'}</TableCell>
                  <TableCell>{item.dateOfFlatBooking ? new Date(item.dateOfFlatBooking).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{item.nameOfAllottee || '-'}</TableCell>
                  <TableCell>{item.sourceName || '-'}</TableCell>
                  <TableCell>{item.dateOfBirth ? new Date(item.dateOfBirth).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{item.occupation || '-'}</TableCell>
                  <TableCell>{item.panNo || '-'}</TableCell>
                  <TableCell>{item.aadharNo || '-'}</TableCell>
                  <TableCell>{item.mobileNo || '-'}</TableCell>
                  <TableCell>{item.alternateMobileNo || '-'}</TableCell>
                  <TableCell>{item.whatsappNo || '-'}</TableCell>
                  <TableCell>{item.emailId || '-'}</TableCell>
                  <TableCell>{item.address || '-'}</TableCell>

                  <TableCell>
                    {renderMultipleCoAllottees(item.coAllottees, 'name')}
                  </TableCell>
                  <TableCell>
                    {item.coAllottees && Array.isArray(item.coAllottees) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {item.coAllottees.map((coAllottee, idx) => (
                          <div key={idx} style={{
                            padding: '2px 4px',
                            borderBottom: idx < item.coAllottees.length - 1 ? '1px solid #e0e0e0' : 'none'
                          }}>
                            {coAllottee.dob ? new Date(coAllottee.dob).toLocaleDateString() : '-'}
                          </div>
                        ))}
                      </div>
                    ) : '-'}
                  </TableCell>
                  <TableCell>
                    {renderMultipleCoAllottees(item.coAllottees, 'occupation')}
                  </TableCell>
                  <TableCell>
                    {renderMultipleCoAllottees(item.coAllottees, 'pan')}
                  </TableCell>
                  <TableCell>
                    {renderMultipleCoAllottees(item.coAllottees, 'aadhar')}
                  </TableCell>
                  <TableCell>
                    {renderMultipleCoAllottees(item.coAllottees, 'mobileEmail')}
                  </TableCell>

                  <TableCell>{item.flatNo || '-'}</TableCell>
                  <TableCell>{item.type || '-'}</TableCell>
                  <TableCell>{item.wing || '-'}</TableCell>
                  <TableCell>{item.soldRate || '-'}</TableCell>
                  <TableCell>{item.carpetAreaSqMtr || '-'}</TableCell>
                  <TableCell>{item.enclosedBalconySqMtr || '-'}</TableCell>
                  <TableCell>{item.openBalconySqMtr || '-'}</TableCell>
                  <TableCell>{item.terraceSqMtr || '-'}</TableCell>
                  <TableCell>{item.parking || '-'}</TableCell>
                  <TableCell>{item.floor || '-'}</TableCell>
                  <TableCell>{item.totalConsideration || '-'}</TableCell>
                  <TableCell>{item.bookingAmount || '-'}</TableCell>
                  <TableCell>{item.stampDuty || '-'}</TableCell>
                  <TableCell>{item.registrationFee || '-'}</TableCell>
                  <TableCell>{item.gstAmount || '-'}</TableCell>

                  <TableCell align="center">
                    {renderDocumentCell(item, 'panCard', 'PAN Card')}
                  </TableCell>
                  <TableCell align="center">
                    {renderDocumentCell(item, 'aadhaarCard', 'Aadhar Card')}
                  </TableCell>
                  <TableCell align="center">
                    {renderDocumentCell(item, 'marriageCertificate', 'Marriage Certificate')}
                  </TableCell>
                  <TableCell align="center">
                    {renderDocumentCell(item, 'passportPhoto', 'Passport Photo')}
                  </TableCell>
                  <TableCell align="center">
                    {renderDocumentCell(item, 'otherDocuments', 'Other Documents')}
                  </TableCell>
                  <TableCell>{item.bookingAmount || '-'}</TableCell>
                  <TableCell>{item.paymentMode || '-'}</TableCell>
                  <TableCell>{item.chequeTrnNo || '-'}</TableCell>
                  <TableCell>{item.chequeTrnDate ? new Date(item.chequeTrnDate).toLocaleDateString() : '-'}</TableCell>
                  <TableCell>{item.bankName || '-'}</TableCell>
                  <TableCell>{item.bankDetails || '-'}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={52}
                  align="left"
                  sx={{
                    py: 4,
                    fontSize: '16px',
                    color: 'text.secondary',
                    fontStyle: 'italic'
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            maxHeight: '90vh',
            overflow: 'auto'
          }
        }}
      >
        <DialogTitle>
          Edit Booking Details
          <IconButton
            aria-label="close"
            onClick={() => setOpenEditDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Section 1: Personal Information */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 2, color: Constants.primaryColor }}>
            Section 1: Personal Information
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Enquiry No."
                fullWidth
                variant="outlined"
                value={selectedItem?.enquiryNo || ''}
                onChange={(e) => handleInputChange("enquiryNo", e.target.value)}
                required
                 sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined"  sx={{ border: Constants.formInputBorderColor }}>
                <InputLabel id="project-name-label">Project Name</InputLabel>
                <Select
                  labelId="project-name-label"
                  value={selectedItem?.projectName || ''}
                  onChange={(e) => handleSelectChange("projectName", e.target.value)}
                  label="Project Name"
                   sx={{'& .MuiSelect-icon': {color: Constants.primaryColor}}}

                >
                  <MenuItem value="Project A">Project A</MenuItem>
                  <MenuItem value="Project B">Project B</MenuItem>
                  <MenuItem value="Project C">Project C</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date Of Flat Booking"
                fullWidth
                variant="outlined"
                value={selectedItem?.dateOfFlatBooking ? new Date(selectedItem.dateOfFlatBooking).toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange("dateOfFlatBooking", e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Name Of Allottee"
                fullWidth
                variant="outlined"
                value={selectedItem?.nameOfAllottee || ''}
                onChange={(e) => handleInputChange("nameOfAllottee", e.target.value)}
                required
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                label="Source Name"
                fullWidth
                variant="outlined"
                value={selectedItem?.sourceName || ''}
                onChange={(e) => handleInputChange("sourceName", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Date Of Birth"
                fullWidth
                variant="outlined"
                value={selectedItem?.dateOfBirth ? new Date(selectedItem.dateOfBirth).toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ border: Constants.formInputBorderColor }}>
                <InputLabel id="occupation-label">Occupation</InputLabel>
                <Select
                  labelId="occupation-label"
                  value={selectedItem?.occupation || ''}
                  onChange={(e) => handleSelectChange("occupation", e.target.value)}
                  label="Occupation"
                  sx={{'& .MuiSelect-icon': {color: Constants.primaryColor}}}

                >
                  <MenuItem value="Business">Business</MenuItem>
                  <MenuItem value="Service">Service</MenuItem>
                  <MenuItem value="Professional">Professional</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="PAN No."
                fullWidth
                variant="outlined"
                value={selectedItem?.panNo || ''}
                onChange={(e) => handleInputChange("panNo", e.target.value.toUpperCase())}
                inputProps={{ maxLength: 10 }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="AADHAR No."
                fullWidth
                variant="outlined"
                value={selectedItem?.aadharNo || ''}
                onChange={(e) => handleInputChange("aadharNo", e.target.value)}
                inputProps={{ maxLength: 12 }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Mobile No"
                fullWidth
                variant="outlined"
                value={selectedItem?.mobileNo || ''}
                onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                inputProps={{ maxLength: 10 }}
                required
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Alternate Mobile No"
                fullWidth
                variant="outlined"
                value={selectedItem?.alternateMobileNo || ''}
                onChange={(e) => handleInputChange("alternateMobileNo", e.target.value)}
                inputProps={{ maxLength: 10 }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="WhatsApp No."
                fullWidth
                variant="outlined"
                value={selectedItem?.whatsappNo || ''}
                onChange={(e) => handleInputChange("whatsappNo", e.target.value)}
                inputProps={{ maxLength: 10 }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email ID"
                fullWidth
                variant="outlined"
                value={selectedItem?.emailId || ''}
                onChange={(e) => handleInputChange("emailId", e.target.value)}
                type="email"
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                value={selectedItem?.address || ''}
                onChange={(e) => handleInputChange("address", e.target.value)}
                multiline
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>
          </Grid>

          {/* Documents for Main Allottee */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
            Main Allottee Documents
          </Typography>

          <Grid container spacing={2}>
            {documentTypes.map((doc, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography variant="body2" gutterBottom>{doc.label}</Typography>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<FaUpload />}
                >
                  Add Files
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => handleAllotteeDocumentChange(`allottee${doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}`, Array.from(e.target.files))}
                  />
                </Button>
                {selectedItem?.[`allottee${doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}`]?.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    {selectedItem[`allottee${doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}`].map((file, fileIndex) => (
                      <Box key={fileIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2" sx={{ fontSize: '0.75rem', flex: 1 }}>
                          {file.name}
                        </Typography>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRemoveAllotteeDocument(`allottee${doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}`, fileIndex)}
                        >
                          <FaTrash size={12} />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>

          {/* Section 2: Co-Allottees */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
            Section 2: Co-Allottees
          </Typography>

          {selectedItem?.coAllottees?.map((coAllottee, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ color: Constants.primaryColor }}>
                  Co-Allottee {index + 1}
                </Typography>
                {selectedItem.coAllottees.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveCoAllottee(index)}
                  >
                    Remove
                  </Button>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name of Co-Allottee"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.name || ''}
                    onChange={(e) => handleCoAllotteeChange(index, "name", e.target.value)}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    label="Date Of Birth (Co-Allottee)"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.dob ? new Date(coAllottee.dob).toISOString().split('T')[0] : ''}
                    onChange={(e) => handleCoAllotteeChange(index, "dob", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Occupation (Co-Allottee)"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.occupation || ''}
                    onChange={(e) => handleCoAllotteeChange(index, "occupation", e.target.value)}
                     sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="PAN No. (Co-Allottee)"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.pan || ''}
                    onChange={(e) => handleCoAllotteeChange(index, "pan", e.target.value.toUpperCase())}
                    inputProps={{ maxLength: 10 }}
                     sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="AADHAR No. (Co-Allottee)"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.aadhar || ''}
                    onChange={(e) => handleCoAllotteeChange(index, "aadhar", e.target.value)}
                    inputProps={{ maxLength: 12 }}
                     sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="MOBILE No. & EMAIL (Co-Allottee)"
                    fullWidth
                    variant="outlined"
                    value={coAllottee.mobileEmail || ''}
                    onChange={(e) => handleCoAllotteeChange(index, "mobileEmail", e.target.value)}
                     sx={{ border: Constants.formInputBorderColor }}
                  />
                </Grid>

                {/* Documents for each Co-Allottee */}
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom sx={{ color: Constants.primaryColor, mt: 2 }}>
                    Documents for Co-Allottee {index + 1}
                  </Typography>
                </Grid>
                {documentTypes.map((doc, docIndex) => (
                  <Grid item xs={12} sm={6} key={docIndex}>
                    <Typography variant="body2" gutterBottom>{doc.label}</Typography>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      startIcon={<FaUpload />}
                    >
                      Add Files
                      <input
                        type="file"
                        multiple
                        hidden
                        onChange={(e) => handleCoAllotteeDocumentChange(index, doc.type, Array.from(e.target.files))}
                      />
                    </Button>
                    {coAllottee[doc.type]?.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        {coAllottee[doc.type].map((file, fileIndex) => (
                          <Box key={fileIndex} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', flex: 1 }}>
                              {file.name}
                            </Typography>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleRemoveCoAllotteeDocument(index, doc.type, fileIndex)}
                            >
                              <FaTrash size={12} />
                            </IconButton>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleAddCoAllottee}
              sx={{ borderColor: Constants.primaryColor, color: Constants.primaryColor }}
            >
              Add Another Co-Allottee
            </Button>
          </Box>

          {/* Section 3: Particulars of Flat */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
            Section 3: Particulars of Flat
          </Typography>

          <Grid container spacing={2}>
            {[
              { field: "flatNo", label: "FLAT No.", type: "select", options: ["101", "102", "103"] },
              { field: "type", label: "Type", type: "select", options: ["2BHK", "3BHK", "4BHK"] },
              { field: "wing", label: "Wing", type: "select", options: ["A", "B", "C"] },
              { field: "soldRate", label: "Sold Rate", type: "number" },
              { field: "carpetAreaSqMtr", label: "Carpet Area in (Sq. Mtr.)", type: "select", options: ["100", "150", "200", "250"] },
              { field: "enclosedBalconySqMtr", label: "Enclosed Balcony in (Sq. Mtr.)", type: "select", options: ["10", "15", "20"] },
              { field: "openBalconySqMtr", label: "Open Balcony in (Sq. Mtr.)", type: "select", options: ["5", "10", "15"] },
              { field: "terraceSqMtr", label: "Terrace in (Sq. Mtr.)", type: "select", options: ["30", "40", "50"] },
              { field: "parking", label: "Parking", type: "select", options: ["Stack Parking", "Open car parking", "Covered car parking", "Basement car parking", "Other"] },
              { field: "floor", label: "Floor", type: "select", options: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"] }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                {item.type === "select" ? (
                  <FormControl fullWidth variant="outlined"  sx={{ border: Constants.formInputBorderColor }}>
                    <InputLabel>{item.label}</InputLabel>
                    <Select
                      value={selectedItem?.[item.field] || ''}
                      onChange={(e) => handleSelectChange(item.field, e.target.value)}
                      label={item.label}
                      sx={{'& .MuiSelect-icon': {color: Constants.primaryColor}}}
                    >
                      {item.options.map(option => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={item.label}
                    fullWidth
                    variant="outlined"
                    value={selectedItem?.[item.field] || ''}
                    onChange={(e) => handleInputChange(item.field, e.target.value)}
                    type={item.type}
                     sx={{ border: Constants.formInputBorderColor }}
                  />
                )}
              </Grid>
            ))}
          </Grid>

          {/* Section 4: Consideration */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
            Section 4: Consideration
          </Typography>

          <Grid container spacing={2}>
            {[
              { field: "totalConsideration", label: "Total Consideration / Agreement Value", type: "number" },
              { field: "bookingAmount", label: "Booking Amount / Advance Payment", type: "number" },
              { field: "stampDuty", label: "Stamp Duty (7% of Agreement Cost)", type: "number" },
              { field: "registrationFee", label: "Registration Fee", type: "number" },
              { field: "gstAmount", label: "GST Amount", type: "number" }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TextField
                  label={item.label}
                  fullWidth
                  variant="outlined"
                  value={selectedItem?.[item.field] || ''}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                  type={item.type}
                   sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>
            ))}
          </Grid>

          {/* Section 5: Booking Payment Mode */}
          <Typography variant="h6" gutterBottom sx={{ paddingTop: 4, color: Constants.primaryColor }}>
            Section 5: Booking Payment Mode
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Booking Amount"
                fullWidth
                variant="outlined"
                value={selectedItem?.bookingAmount || ''}
                onChange={(e) => handleInputChange("bookingAmount", e.target.value)}
                type="number"
                 sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined"  sx={{ border: Constants.formInputBorderColor }}>
                <InputLabel id="payment-mode-label">Payment Mode</InputLabel >
                <Select
                  labelId="payment-mode-label"
                  value={selectedItem?.paymentMode || ''}
                  onChange={(e) => handleSelectChange("paymentMode", e.target.value)}
                  label="Payment Mode"
                  sx={{'& .MuiSelect-icon': {color: Constants.primaryColor}}}

                >
                  <MenuItem value="Cheque">Cheque</MenuItem>
                  <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                  <MenuItem value="Cash">Cash</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Cheque/TRN No."
                fullWidth
                variant="outlined"
                value={selectedItem?.chequeTrnNo || ''}
                onChange={(e) => handleInputChange("chequeTrnNo", e.target.value)}
                sx={{ border: Constants.formInputBorderColor }}

              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                label="Cheque/TRN Date"
                fullWidth
                variant="outlined"
                value={selectedItem?.chequeTrnDate ? new Date(selectedItem.chequeTrnDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleInputChange("chequeTrnDate", e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" sx={{ border: Constants.formInputBorderColor }}>
                <InputLabel id="bank-name-label">Bank Name</InputLabel>
                <Select
                  labelId="bank-name-label"
                  value={selectedItem?.bankName || ''}
                  onChange={(e) => handleSelectChange("bankName", e.target.value)}
                  label="Bank Name"
                  sx={{'& .MuiSelect-icon': {color: Constants.primaryColor}}}
                >
                  <MenuItem value="State Bank of India (SBI)">State Bank of India (SBI)</MenuItem>
                  <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                  <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                  <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Bank Details"
                fullWidth
                variant="outlined"
                value={selectedItem?.bankDetails || ''}
                onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                sx={{ border: Constants.formInputBorderColor }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setOpenEditDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingFormTable;

