


import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import Tooltip from '@mui/material/Tooltip';


const data = [
  {
    mobile: '',
    email: '',
    lastFollowUp: '',
    status: '',
    remark: '',
    nextFollowUp: '',
    assignTo: '',
    enquiryNo: '',
    leadNo: '',
    name: '',
    salesExe: '',
    whatsapp: '',
    alternateContact: '',
    address: '',
    occupation: '',
    company: '',
    interested: '',
    budget: '',
    reason: '',
    reference: '',
    nameOfCP: '',
    planningToBuy: '',
    followupDetails: ''
  },
];



const LostVisitTable = ({data}) => {
  console.log(data);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LAST FOLLOW UP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NEXT FOLLOW UP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXE.</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CON.</TableCell>
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
          {data.map((item, index) => (
            <TableRow key={index}>
              {/* ACTION Column with Icons */}
              <TableCell>
                <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                  <Tooltip title="Edit">
                    <IconButton 
                      size="small" 
                      sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }} 
                      onClick={() => console.log("Edit clicked")}
                    >
                      <EditIcon sx={{ fontSize: "18px" }} />
                    </IconButton>
                  </Tooltip>
  
                  <Tooltip title="WhatsApp" arrow>
                    <IconButton 
                      size="small"
                      sx={{ 
                        backgroundColor: "#25D366", 
                        borderRadius: "50%", 
                        color: "white", 
                        "&:hover": { backgroundColor: "#1EBE57" },
                        width: "32px", height: "32px"
                      }} 
                      onClick={() => window.open(`https://wa.me/${item.mobile}`, '_blank')}
                    >
                      <WhatsAppIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Email" arrow>
                    <IconButton 
                      size="small"
                      sx={{ 
                        backgroundColor: "#EA4335", 
                        borderRadius: "50%", 
                        color: "white", 
                        "&:hover": { backgroundColor: "#D93025" },
                        width: "32px", height: "32px"
                      }} 
                      onClick={() => window.open(`mailto:${item.email}`, '_blank')}
                    >
                      <EmailIcon sx={{ fontSize: "20px" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell>{item.lastFollowUp || ""}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.remark}</TableCell>
              <TableCell>{item.nextFollowUp}</TableCell>
              <TableCell>{item.assignTo}</TableCell>
              <TableCell>{item.enquiryNo}</TableCell>
              <TableCell>{item.leadNo}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.salesExe}</TableCell>
              <TableCell>{item.mobile  || ""}</TableCell>
              <TableCell>{item.whatsapp  || ""}</TableCell>
              <TableCell>{item.alternateContact}</TableCell>
              <TableCell>{item.email  || ""}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.occupation}</TableCell>
              <TableCell>{item.company}</TableCell>
              <TableCell>{item.interested}</TableCell>
              <TableCell>{item.budget}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.reference}</TableCell>
              <TableCell>{item.nameOfCP}</TableCell>
              <TableCell>{item.planningToBuy}</TableCell>
              <TableCell>{item.followupDetails}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LostVisitTable;
