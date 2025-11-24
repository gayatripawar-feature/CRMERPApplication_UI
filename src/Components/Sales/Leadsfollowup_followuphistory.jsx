import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Box } from "@mui/material";
import Constants from "../Constants";
const Leadsfollowup_followuphistory = ({ data }) => {

  const reverseHistory = (str) => {
    if (!str) return "";

    return str
      .replaceAll("<br/>", "\n")  // Convert <br/> to newline
      .split("\n")                 // Split by newline
      .map(s => s.trim())          // Remove spaces
      .filter(s => s.length > 0)   // Remove empty lines
      .reverse()                   // Reverse order
      .join("<br/>");              // Convert back to <br/> for HTML
  };

  return (
    <>
      <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <TableContainer component={Paper}>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS HISTORY</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD DAYS</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
                  {/* <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO</TableCell> */}
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE/WHATSAPP NO</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> LOOKING FOR?</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>	EMAIL</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    {console.log("STATUS HISTORY RAW => ", item.statusHistory)}
                    {console.log("REMARK HISTORY RAW => ", item.remarkHistory)}
                    {console.log("ASSIGN HISTORY RAW => ", item.assignToHistory)}

                    {/* <TableCell><div  dangerouslySetInnerHTML={{ __html: item.statusHistory }}
    style={{ whiteSpace: "no-wrap" }}/>
</TableCell> */}

                  
<TableCell
  sx={{
    whiteSpace: "nowrap",
  }}
>
  <div
    dangerouslySetInnerHTML={{
      __html: (item.statusHistory || "")
        
    }}
  />
</TableCell>



                  <TableCell sx={{ whiteSpace: "nowrap" }}>
  <div
    dangerouslySetInnerHTML={{
      __html: reverseHistory(item.remarkHistory || "")
    }}
  />
</TableCell>


                   
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
  <div
    dangerouslySetInnerHTML={{
      __html: reverseHistory(item.assignToHistory || "")
    }}
  />
</TableCell>



                    <TableCell>{item.leadDays}</TableCell>
                    <TableCell>{item.lastUpdatedDate}</TableCell>

                    <TableCell>{item.leadNo !== "-" ? `Lead - ${item.leadNo}` : "-"}</TableCell>


                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.interest}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

        </TableContainer>
      </Box>
    </>
  );
};

export default Leadsfollowup_followuphistory;
