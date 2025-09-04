import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography ,Box} from "@mui/material";
const FollowupHistoryTable = ({ data }) => {
  return (
    <>
     <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
           <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD DAYS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE/WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>YOU ARE LOOKING FOR?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>	EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
              <TableCell>{row.statusHistory || 'N/A'}</TableCell>
        <TableCell>{row.remarkHistory || 'N/A'}</TableCell>
        <TableCell>{row.assignToHistory || 'N/A'}</TableCell>
        <TableCell>{row.leadDays || 'N/A'}</TableCell>
        <TableCell>{row.timestamp || 'N/A'}</TableCell>
        <TableCell>{row.enquiryNo || 'N/A'}</TableCell>
        <TableCell>{row.leadNo || 'N/A'}</TableCell>
        <TableCell>{row.name || 'N/A'}</TableCell>
        <TableCell>{row.mobileNo || 'N/A'}</TableCell>
        <TableCell>{row.lookingFor || 'N/A'}</TableCell>
        <TableCell>{row.email || 'N/A'}</TableCell>
        <TableCell>{row.sourceName || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  );
};

export default FollowupHistoryTable;
