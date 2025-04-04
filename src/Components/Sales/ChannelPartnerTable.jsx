


import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Tooltip, Button } from "@mui/material";
import { Edit, WhatsApp, Email, Visibility } from "@mui/icons-material";

const ChannelPartnerTable = ({ data =[] }) => {
  const [status, setStatus] = useState("Active"); 
  
  const handleStatusChange = (id, newStatus) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    setData(updatedData);
  };


  const dummyData = [{
    timestamp: "2025-03-24 ",
    cpFirmName: "ABC Corp",
    cpExecutiveName: "John Doe",
    designation: "Manager",
    mobileNo: "+1234567890",
    website: "https://www.w3.org/WAI/WCAG21/quickref/WCAG-Quick-Reference-2018.pdf", 
    email: "contact@abccorp.com",
    postalAddress: "123 Street, City",
    pinCode: "12345",
    location: "Location A",
    city: "City A",
    zone: "East",
    status: "Active"
  }];

  
  const handleViewClick = (url) => {
    window.open(url, "_blank");
  };

  // const handleStatusChange = (newStatus) => {
  //   setStatus(newStatus); // Update the status when a button is clicked
  // };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>TIMESTAMP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>CP Firm Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>CP Executive Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Designation</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Mobile No</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Website Address</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Email ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Postal Address</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Pin-code</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Location</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>City</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Zone</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", textAlign: "center" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.5, borderBottom: "none" }}>
                <Tooltip title="Edit" arrow>
                  <IconButton
                    sx={{
                      background: "#1976D2",
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      p: 0.5,
                      border: "none",
                    }}
                    onClick={() => alert('Edit clicked')}
                  >
                    <Edit sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="WhatsApp" arrow>
                  <IconButton
                    sx={{
                      background: "#25D366",
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      p: 0.5,
                      border: "none",
                    }}
                    onClick={() => alert('WhatsApp clicked')}
                  >
                    <WhatsApp sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Email" arrow>
                  <IconButton
                    sx={{
                      background: "#D44638",
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      p: 0.5,
                      border: "none",
                    }}
                    onClick={() => alert('Email clicked')}
                  >
                    <Email sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>

              <TableCell sx={{ textAlign: "center" }}>{item.timestamp}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.cpFirmName}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.cpExecutiveName}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.designation}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.mobileNo}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>
                <Tooltip title="View Document" arrow>
                  <IconButton
                    sx={{
                      background: "#1976D2",
                      color: "white",
                      borderRadius: "50%",
                      width: 32,
                      height: 32,
                      p: 0.5,
                      border: "none",
                    }}
                    onClick={() => handleViewClick(item.website)}
                  >
                    <Visibility sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.email}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.postalAddress}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.pinCode}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.location}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.city}</TableCell>
              <TableCell sx={{ textAlign: "center" }}>{item.zone}</TableCell>

              <TableCell sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="m-1"
                  variant={status === "Active" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => handleStatusChange("Active")}
                >
                  Active
                </Button>
                <Button
                  className="m-1"
                  variant={status === "Inactive" ? "contained" : "outlined"}
                  color="secondary"
                  onClick={() => handleStatusChange("Inactive")}
                >
                  Inactive
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChannelPartnerTable;
