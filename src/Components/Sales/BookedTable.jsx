import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import Constants from "../Constants";
import { useSession } from "../SessionContext";
const BookedTable = ({ data }) => {
   const { id: userId, name: userName, authenticated } = useSession() || {};

   const getAssignedToName = (assignedId) => {
    if (!assignedId) return "-";

    // Match ID with logged-in user
    if (String(assignedId).trim() === String(userId).trim()) {
      return userName;
    }

    return assignedId; // no user table, return id
  };

  return (
    <>
      <TableContainer component={Paper} sx={{maxHeight: 400,overflowY: "auto"}}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE/WHATSAPP NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> LOOKING FOR?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LOCATION</TableCell>
              <TableCell sx={{color:"white",fontWeight:"bold",whiteSpace:"nowrap"}}>ASSIGN TO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell style={{ whiteSpace: "nowrap"}}>{item.lastUpdatedDate}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap"}}>{item.name}</TableCell>
                <TableCell>{item.phone}</TableCell>
                 <TableCell>{item.interest}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell style={{ whiteSpace: "nowrap"}}>{item.source}</TableCell>
                <TableCell>{item.address || "-"}</TableCell>
               
                {/* <TableCell>
        {item.leadEnagagements?.length > 0
          ? item.leadEnagagements[0].assignedTo
          : "-"}
      </TableCell> */}
      <TableCell style={{ whiteSpace: "nowrap"}}>
  {getAssignedToName(
    item.leadEnagagements?.length > 0
      ? item.leadEnagagements[0].assignedTo
      : ""
  )}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookedTable;
