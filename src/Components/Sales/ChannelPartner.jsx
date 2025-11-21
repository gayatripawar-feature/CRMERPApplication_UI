import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Box,
  Grid,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, useTheme, useMediaQuery
} from "@mui/material";
import { FaHandshake } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import { ToastContainer, toast } from "react-toastify";
import ChannelPartnerTable from "./ChannelPartnerTable";
import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import Constants from "../Constants";
const ChannelPartner = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  // const [showBookingForm, setShowBookingForm] = useState(false);
  const [showChannelForm, setShowChannelForm] = useState(false);
  const [data, setData] = useState([]);
  const [pincodeError, setPincodeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [firms, setFirms] = useState([]);
  const [submittedData, setSubmittedData] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [formData, setFormData] = useState({
    enquiryNo: "",
    cpExecutiveName: "",
    designation: "",
    mobileNo: "",
    website: "",
    email: "",
    postal: "",
    pincode: "",
    location: "",
    city: "",
    zone: "",
  });

  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);



  // 🔹 Pagination states
  const [currentPage, setCurrentPage] = useState(0);

  // 🔹 Filter data by search
  const filteredData = submittedData.filter((item) =>
    item.cpFirmName?.toLowerCase().includes(searchName.toLowerCase())
  );

  // 🔹 Total entries after search filter
  const totalEntries = filteredData.length;

  // 🔹 Total pages
  const totalPages = Math.ceil(totalEntries / rowsPerPage);

  // 🔹 Slice data to show only current page rows
  const paginatedData = filteredData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // 🔹 Calculate start & end entry numbers
  const startEntry =
    totalEntries === 0 ? 0 : currentPage * rowsPerPage + 1;
  const endEntry = Math.min((currentPage + 1) * rowsPerPage, totalEntries);

  // 🔹 Page Change Function
  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };


  useEffect(() => {
    console.log("Updated Selected Tab:");
  }, []);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
    setCurrentPage(0);
  };
  const handleRowsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setRowsPerPage(value);
    setCurrentPage(0); // reset to first page
  };

  const handleToggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'pincode') {
      const regex = /^[0-9\b]*$/;

      if (!regex.test(value)) {
        setPincodeError('Only numbers are allowed');
        return;
      } else {
        setPincodeError('');
      }
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (value && !emailRegex.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    }
    if (name === 'MobileNo') {
      const regex = /^[0-9\b]*$/; // Only numbers allowed

      if (!regex.test(value)) {
        setMobileError('Only numbers are allowed');
        return;
      } else if (value.length > 10) {
        setMobileError('Only 10 digits are allowed');
        return;
      } else {
        setMobileError('');
      }
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = () => {
    console.log("Submitting form data:", formData);
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({
      cpFirmName: "",
      cpexecutivename: "",
      Designation: "",
      MobileNo: "",
      website: "",
      email: "",
      postal: "",
      pincode: "",
      location: "",
      city: "",
      zone: "",
    });
    // setShowBookingForm(false)
    setShowChannelForm(false);
  };
  const handleDownloadPDFChannel = (data) => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);

    const tableColumn = [
      "TIMESTAMP", "CP Firm Name", "CP Executive Name", "Designation",
      "Mobile No", "Email ID", "Postal Address", "Pin-code",
      "Location", "City", "Zone", "Status"
    ];

    const tableRows = data.map(row => [
      row.timestamp || "-",
      row.cpFirmName || "-",
      row.cpExecutiveName || "-",
      row.designation || "-",
      row.mobileNo || "-",
      row.email || "-",
      row.postalAddress || "-",
      row.pinCode || "-",
      row.location || "-",
      row.city || "-",
      row.zone || "-",
      row.status || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("ChannelPartner_Report.pdf");
  };



  return (
    <Box className="main-content" sx={{ padding: 1 }}>
      <Typography variant="h6">Sales Module / Channel Partner</Typography>



      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 1,
          marginBottom: 1
        }}
      >

        <Button
          variant="contained"
          color="primary"
          className="mt-2 mb-3"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: '20px',
            width: isExpanded ? '200px' : '50px',
            minWidth: '50px',
            padding: '10px 15px',
            textTransform: 'none',
            transition: 'width 0.3s ease',
            background: Constants.primaryColor
          }}
          onClick={handleToggleSidebar}
          startIcon={<FaHandshake size={24} color="white" />}
        >
          {isExpanded && <span style={{ color: 'white', fontSize: '16px' }}>Channel Partner </span>}
        </Button>

        {/* RIGHT SIDE: Download PDF Button */}
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
            "&:hover": { background: Constants.primaryColor }
          }}
          onClick={() => handleDownloadPDFChannel(data)}
        >
          <FaFileDownload size={18} />
          Download PDF
        </Button>
      </Box>


      <Box className="content-container mt-4">
        <Box className="content-container mt-4">


          {/* {!showBookingForm && ( */}
          {!showChannelForm && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
                width: "100%",
              }}
            >

              {/* LEFT SIDE */}
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ background: Constants.primaryColor }}
                  // onClick={() => setShowBookingForm(true)}
                  onClick={() => setShowChannelForm(true)}
                >
                  + CP Details Form
                </Button>
              </Box>

              {/* RIGHT SIDE */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: isMobile ? "wrap" : "nowrap",
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

                {/* Pagination */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    fontSize: "14px",
                    color: "#800000",
                  }}
                >
                  <span>Rows per page:</span>

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
                    {totalEntries === 0 ? "0–0" : `${startEntry}–${endEntry}`} of {totalEntries}
                  </span>

                  {/* Prev */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: currentPage === 0 ? "not-allowed" : "pointer",
                      color: currentPage === 0 ? "gray" : "#800000",
                      fontSize: "18px",
                    }}
                  >
                    &#8249;
                  </button>

                  {/* Next */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor:
                        currentPage >= totalPages - 1 ? "not-allowed" : "pointer",
                      color:
                        currentPage >= totalPages - 1 ? "gray" : "#800000",
                      fontSize: "18px",
                    }}
                  >
                    &#8250;
                  </button>
                </Box>
              </Box>

            </Box>
          )}

        </Box>

        {!showChannelForm && <ChannelPartnerTable data={submittedData} />}

        {/* {!showBookingForm && <ChannelPartnerTable data={submittedData} />} */}

        <Dialog
          // open={showBookingForm}
          open={showChannelForm}
          // onClose={() => setShowBookingForm(false)}
          onClose={(event, reason) => {
            if (reason === "backdropClick" || reason === "escapeKeyDown") {
              return; //  Prevent closing on outside click or ESC
            }
            // setShowBookingForm(false); //  Only close from Cancel button
            setShowChannelForm(false);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ background: Constants.primaryColor, color: "white" }}>
            CP Details
          </DialogTitle>

          <DialogContent dividers sx={{ maxHeight: "70vh" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="CP Firm Name"
                  name="cpFirmName"
                  fullWidth
                  variant="outlined"
                  value={formData.cpFirmName}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="CP Executive Name (as per Rera)"
                  name="cpExecutiveName"
                  fullWidth
                  variant="outlined"
                  value={formData.cpExecutiveName}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Designation"
                  name="designation"
                  fullWidth
                  variant="outlined"
                  value={formData.designation}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Mobile No"
                  name="mobileNo"
                  fullWidth
                  variant="outlined"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  error={Boolean(mobileError)}
                  helperText={mobileError}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Website Address"
                  name="website"
                  fullWidth
                  variant="outlined"
                  value={formData.website}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Email ID"
                  name="email"
                  fullWidth
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Postal Address"
                  name="postal"
                  fullWidth
                  variant="outlined"
                  value={formData.postal}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Pin-code"
                  name="pincode"
                  fullWidth
                  variant="outlined"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  error={Boolean(pincodeError)}
                  helperText={pincodeError}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Location"
                  name="location"
                  fullWidth
                  variant="outlined"
                  value={formData.location}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="City"
                  name="city"
                  fullWidth
                  variant="outlined"
                  value={formData.city}
                  onChange={handleInputChange}
                  sx={{ border: Constants.formInputBorderColor }}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" sx={{ border: Constants.formInputBorderColor }}>
                  <InputLabel>Zone</InputLabel>
                  <Select
                    label="Zone"
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}

                  >
                    <MenuItem value="East">East</MenuItem>
                    <MenuItem value="West">West</MenuItem>
                    <MenuItem value="North">North</MenuItem>
                    <MenuItem value="South">South</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button variant="contained" onClick={handleFormSubmit} sx={{ background: Constants.primaryColor, color: "white" }}>
              Submit
            </Button>

            <Button variant="outlined" color="error" onClick={() => setShowChannelForm(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

      </Box>

      <ToastContainer />
    </Box>
  );
};

export default ChannelPartner;
