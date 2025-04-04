


// import React from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper,Typography } from "@mui/material";

// const FirstvisitfollowupbookedTable = ({ data }) => {
//   return (
//     <>
//       <Typography variant="h5" component="h2" sx={{ marginBottom: "16px", color: "", fontWeight: "bold" }}>
//     Booked Enquiries
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: "#3621a9" }}>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP NO.</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>YALTERNATE CONTACT NO.</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED IN</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET (APPROX.)</TableCell>

//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON FOR PURCHASE</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE BY / SOURCE</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP (IF CHANNEL PARTNER)</TableCell>
           
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BY WITHIN ?</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell>
           
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell>{item.timestamp}</TableCell>
//                 <TableCell>{item.leadNo}</TableCell>
//                 <TableCell>{item.name}</TableCell>
//                 <TableCell>{item.mobile}</TableCell>
//                 <TableCell>{item.whatsappNo}</TableCell>
//                 <TableCell>{item.youAreLookingFor}</TableCell>
//                 <TableCell>{item.email}</TableCell>
//                 <TableCell>{item.sourceName}</TableCell>
//                 <TableCell>{item.location}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// };

// export default FirstvisitfollowupbookedTable;


import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from "@mui/material";

const FirstvisitfollowupbookedTable = ({ data }) => {
  return (
    <>
      {/* <Typography variant="h5" component="h2" sx={{ marginBottom: "16px", fontWeight: "bold" }}>
        Booked Enquiries
      </Typography> */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
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
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY WITHIN?</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell>
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
                <TableCell>{item.referenceSource}</TableCell>
                <TableCell>{item.cpName}</TableCell>
                <TableCell>{item.planningToBuy}</TableCell>
                <TableCell>{item.customerFeedback}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default FirstvisitfollowupbookedTable;
