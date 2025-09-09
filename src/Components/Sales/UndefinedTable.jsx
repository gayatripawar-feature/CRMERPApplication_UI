import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";
import Constants from "../Constants";

const UndefinedTable = ({ data }) => {
  return (
    <>
     
<Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor}}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO. / WHATSAPP NO..</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>YOU ARE LOOKING FOR?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>	EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME.</TableCell>
              

															

            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.enquiryNo}</TableCell>
                <TableCell>{item.leadNo}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.whatsappNo}</TableCell>
                <TableCell>{item.alternateContactNo}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.occupation}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.interestedIn}</TableCell>
                <TableCell>{item.budget}</TableCell>
                <TableCell>{item.reasonForPurchase}</TableCell>
                <TableCell>{item.referenceBySource}</TableCell>
                <TableCell>{item.nameOfCp}</TableCell>
                <TableCell>{item.planningToBuyWithin}</TableCell>
                <TableCell>{item.customerFeedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  );
};

export default UndefinedTable;
