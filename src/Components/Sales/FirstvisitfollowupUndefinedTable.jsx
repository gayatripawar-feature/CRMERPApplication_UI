


import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Typography } from "@mui/material";

const FirstvisitfollowupUndefinedTable = ({ data }) => {
  return (
    <>
      {/* <Typography variant="h5" component="h2" sx={{ marginBottom: "16px", color: "", fontWeight: "bold" }}>
      Lost Enquiries
      </Typography> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>
              STATUS HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CONTACT NO.</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED IN</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET (APPROX.)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON FOR PURCHASE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE BY / SOURCE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP (IF CHANNEL PARTNER)</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BY WITHIN ?</TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS
														
</TableCell>




            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.timestamp}</TableCell>
                <TableCell>{item.leadNo}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.whatsappNo}</TableCell>
                <TableCell>{item.youAreLookingFor}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.sourceName}</TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FirstvisitfollowupUndefinedTable;
