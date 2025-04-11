// import React from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Typography } from "@mui/material";

// const FollowupHistoryTable = ({ data }) => {
//   return (
   
//   <>
//     <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "bold" }}>
//     Enquiry History
//   </Typography>

  
//     <TableContainer component={Paper}>
   
//       <Table>
//         <TableHead>
//           {/* <TableRow sx={{ bgcolor: "primary.main" }}> */}
//            <TableRow sx={{background:"#3621a9"}}>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>STATUS HISTORY</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LEAD DAYS</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ENQUIRY NO</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LEAD NO.</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SALES EXECUTIVE NAME</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MOBILE</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WHATSAPP NO.</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ALTERNATE CONTACT NO.</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>EMAIL</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>	ADDRESS</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>OCCUPATION</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>COMPANY</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>INTERESTED IN</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BUDGET (APPROX.)</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>REASON FOR PURCHASE</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>REFERENCE BY / SOURCE</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF CP (IF CHANNEL PARTNER)</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PLANNING TO BUY WITHIN?</TableCell>
//             <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell>
           
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.action}</TableCell>
//               <TableCell>{item.firmName}</TableCell>
//               <TableCell>{item.timestamp}</TableCell>
//               <TableCell>{item.projectName}</TableCell>
//               <TableCell>{item.projectAddress}</TableCell>
//               <TableCell>{item.oldSurveyNumber}</TableCell>
//               <TableCell>{item.newSurveyNumber}</TableCell>
//               <TableCell>{item.village}</TableCell>
//               <TableCell>{item.taluka}</TableCell>
//               <TableCell>{item.district}</TableCell>
//               <TableCell>{item.sanctionAuthority}</TableCell>
//               <TableCell>{item.east}</TableCell>
//               <TableCell>{item.west}</TableCell>
//               <TableCell>{item.north}</TableCell>
//               <TableCell>{item.south}</TableCell>
//               <TableCell>{item.latitude}</TableCell>
//               <TableCell>{item.longitude}</TableCell>
//               <TableCell>{item.landmark}</TableCell>
//               <TableCell>{item.phaseNo}</TableCell>
//               <TableCell>{item.wingNo}</TableCell>
//               <TableCell>{item.mahareraNo}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//     </>
//   );
// };

// export default FollowupHistoryTable ;

import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";

const FollowupHistoryTable = ({ data }) => {
  return (
    <>
      {/* <Typography variant="h5" sx={{ marginBottom: "16px", fontWeight: "bold" }}>
        Enquiry History
      </Typography> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {/* <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD DAYS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXECUTIVE NAME</TableCell>
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
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY WITHIN?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell>
            </TableRow> */}

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
    </>
  );
};

export default FollowupHistoryTable;
