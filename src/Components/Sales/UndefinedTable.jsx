import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Box } from "@mui/material";
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
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO / WHATSAPP NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>YOU ARE LOOKING FOR?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>	EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
                </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.statushistory}</TableCell>
                <TableCell>{item.remarkhistory}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.interest}</TableCell>
                <TableCell>{item.email || '-'}</TableCell>
                <TableCell>{item.source}</TableCell>
               
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
