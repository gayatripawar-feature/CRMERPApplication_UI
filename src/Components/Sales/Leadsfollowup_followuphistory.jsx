import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,  Box} from "@mui/material";
import Constants from "../Constants";
const Leadsfollowup_followuphistory = ({ data }) => {

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
             
              {/* <TableCell>
                    {item.statusHistory
                      ?.split(",\n")
                      .map((line, i) => <div key={i}>{line}</div>)}
                  </TableCell>
       
         <TableCell>
                    {item.remarkHistory
                      ?.split(",\n")
                      .map((line, i) => <div key={i}>{line}</div>)}
                  </TableCell>
        
          <TableCell>
                    {item.assignToHistory
                      ?.split(",\n")
                      .map((line, i) => <div key={i}>{line}</div>)}
                  </TableCell> */}

                 <TableCell>
  <div
    dangerouslySetInnerHTML={{ __html: item.statusHistory }}
    style={{ whiteSpace: "no-wrap" }}
  />
</TableCell>

<TableCell>
  <div
    dangerouslySetInnerHTML={{ __html: item.remarkHistory }}
    style={{ whiteSpace: "no-wrap" }}
  />
</TableCell>

<TableCell>
  <div
    dangerouslySetInnerHTML={{ __html: item.assignToHistory }}
    style={{ whiteSpace: "no-wrap" }}
  />
</TableCell>


        <TableCell>{item.leadDays }</TableCell>
        <TableCell>{item.lastUpdatedDate }</TableCell>
        {/* <TableCell>{row.enquiryNo || 'N/A'}</TableCell> */}
     <TableCell>{item.leadNo !== "-" ? `Lead - ${item.leadNo}` : "-"}</TableCell>


        <TableCell>{item.name }</TableCell>
        <TableCell>{item.phone }</TableCell>
        <TableCell>{item.interest }</TableCell>
        <TableCell>{item.email }</TableCell>
        <TableCell>{item.source }</TableCell>
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
