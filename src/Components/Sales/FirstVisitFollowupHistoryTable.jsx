import React, { useState, useEffect } from "react";
import {TableContainer,Table,TableHead, TableBody, TableRow, TableCell, Paper, Box,
  Button,useMediaQuery,useTheme} from "@mui/material";
import Constants from "../Constants";
export const FirstVisitFollowupHistoryTable = ({ data, fetchVisitFollowUpHistory }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [visitFollowupHistory, setVisitFollowupHistory] = useState([]);
  const [filteredVisitFollowupHistory, setFilteredVisitFollowupHistory] = useState([]);
const [expandedRows, setExpandedRows] = useState({});
const [showAllRows, setShowAllRows] = useState(false);
const displayedRows = showAllRows ? visitFollowupHistory : visitFollowupHistory.slice(0, 3);
// Maintain expand state per enquiry row



  useEffect(() => {
    console.log(" Child Mounted - FollowUp Table");
  }, []);
  // Receive data from parent
  useEffect(() => {
    console.log(" Data received in Table:", data);
    if (data && data.length > 0) {
      setVisitFollowupHistory(data);
      setFilteredVisitFollowupHistory(data);
    }
  }, [data]);

  useEffect(() => {
    console.log(" fetchVisitFollowUpHistory function received:", fetchVisitFollowUpHistory);
  }, [fetchVisitFollowUpHistory]);




  return (
    <>
    <Box sx={{ pb: 6 }}>
      <TableContainer  component={Paper}
           sx={{
            pb:3,
              maxHeight: isMobile ? 400 : 420,
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: isMobile ? "4px" : "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: Constants.primaryColor,
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: Constants.primaryColor,
          },
        }}>
      <Table  aria-label="followup history table" size={isMobile ? "small" : "medium"} >
       <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} > STATUS HISTORY  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> REMARK HISTORY </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} > ASSIGN TO HISTORY  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >LEAD DAYS   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >  TIMESTAMP   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>  ENQUIRY NO  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}  > LEAD NO  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>   SALES EXECUTIVE NAME   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> NAME   </TableCell>
              <TableCell sx={{color: "white",fontWeight: "bold",  whiteSpace: "nowrap" }}>   MOBILE   </TableCell>
             <TableCell  sx={{ color: "white",  fontWeight: "bold",  whiteSpace: "nowrap" }}>    ALTERNATE CONTACT NO.  </TableCell>
               <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"   }}>   WHATSAPP NO.   </TableCell>
           <TableCell   sx={{ color: "white",   fontWeight: "bold", whiteSpace: "nowrap" }}>   EMAIL    </TableCell>
              <TableCell   sx={{color: "white",   fontWeight: "bold", whiteSpace: "nowrap" }}>    ADDRESS </TableCell>
     <TableCell  sx={{color: "white", fontWeight: "bold",whiteSpace: "nowrap"}}>  OCCUPATION  </TableCell>
      <TableCell  sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap"  }}> COMPANY  </TableCell>
       <TableCell sx={{ color: "white", fontWeight: "bold",  whiteSpace: "nowrap" }}  >  INTERESTED IN </TableCell>
      <TableCell   sx={{ color: "white",fontWeight: "bold", whiteSpace: "nowrap"   }}>  BUDGET(APPROX.)  </TableCell>
       <TableCell  sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap"  }}>  REASON FOR PURCHASE   </TableCell>
      <TableCell   sx={{color: "white",fontWeight: "bold",whiteSpace: "nowrap" }}>REFERENCE BY/SOURCE </TableCell>
      <TableCell  sx={{ color: "white",fontWeight: "bold",whiteSpace: "nowrap" }} >  NAME OF CP(IF CHANNEL PARTNER)   </TableCell>
     <TableCell  sx={{ color: "white",  fontWeight: "bold",  whiteSpace: "nowrap"  }}>    PLANNING TO BUY WITHIN?   </TableCell>
    <TableCell  sx={{ color: "white",fontWeight: "bold", whiteSpace: "nowrap" }} > CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS </TableCell>
     </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (

              <TableRow>
                <TableCell
                  colSpan={23}
                  align="center"
                  sx={{
                    padding: "40px",
                    fontSize: "16px",
                    color: "text.secondary",
                  }}
                >
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              // paginatedData.map((row, index) => (
              filteredVisitFollowupHistory.map((row, index) => (
                <TableRow key={index} hover>

                 <TableCell sx={{ whiteSpace: "nowrap" }}>
  <div
    dangerouslySetInnerHTML={{
      __html: (row.statusHistory || row.status || "N/A")
    }}
  />
</TableCell>




                 <TableCell sx={{ whiteSpace: "nowrap" }}>
  <div
    dangerouslySetInnerHTML={{
      __html: (row.remarkHistory || row.remarks || "N/A")
    }}
  />
</TableCell>



                 <TableCell sx={{ whiteSpace: "nowrap" }}>
  <div
    dangerouslySetInnerHTML={{
      __html: (row.assignToHistory || "N/A")
    }}
  />
</TableCell>



                  <TableCell>{row.leadDays || "N/A"}</TableCell>
                  <TableCell>{row.lastUpdatedDate || "N/A"}</TableCell>

                  <TableCell>{row.enquiryId || "N/A"}</TableCell>
                  <TableCell>{row.leadId || "N/A"}</TableCell>
                  <TableCell>{row.assignedTo || "N/A"}</TableCell>
                  <TableCell>{row.name || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.alternateContactNo || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.email || "N/A"}</TableCell>
                  <TableCell>{row.address || "N/A"}</TableCell>
                  <TableCell>{row.occupation || "N/A"}</TableCell>
                  <TableCell>{row.company || "N/A"}</TableCell>
                  <TableCell>{row.interest || "N/A"}</TableCell>
                  <TableCell>{row.budgetInLakh|| "N/A"}</TableCell>
                  <TableCell>{row.purchaseReason || "N/A"}</TableCell>
                  <TableCell>{row.source || "N/A"}</TableCell>
                  <TableCell>{row.nameofCP || "N/A"}</TableCell>
                  <TableCell>{row.intendedPurchasePeriod || "N/A"}</TableCell>
                  <TableCell>{row.customerFeedback || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>



        </Table>


      </TableContainer>
      </Box>
    </>
  );
};


// Incomplete code :
// import React, { useState, useEffect } from "react";
// import {
// TableContainer,
// Table,
// TableHead,
// TableBody,
// TableRow,
// TableCell,
// Paper,
// Box,
// Button,
// Dialog,
// DialogTitle,
// DialogContent,
// useMediaQuery,
// useTheme
// } from "@mui/material";
// import Constants from "../Constants";

// export const FirstVisitFollowupHistoryTable = ({ data }) => {
// const theme = useTheme();
// const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
// const [visitFollowupHistory, setVisitFollowupHistory] = useState([]);
// const [dialogOpen, setDialogOpen] = useState(false);
// const [selectedRowFollowups, setSelectedRowFollowups] = useState({
// status: [],
// remark: [],
// assignTo: []
// });

// useEffect(() => {
// if (data && data.length > 0) setVisitFollowupHistory(data);
// }, [data]);

// // const parseFollowups = (str) => (str || "").split(/\n|,||/).filter(Boolean);
// const parseFollowups = (str) => (str || "").split(/\n|,|\|/).filter(Boolean);


// const handleShowAllFollowups = (row) => {
// setSelectedRowFollowups({
// status: parseFollowups(row.statusHistory || row.status),
// remark: parseFollowups(row.remarkHistory || row.remarks),
// assignTo: parseFollowups(row.assignToHistory)
// });
// setDialogOpen(true);
// };

// return (
// <>
// <Box sx={{ pb: 6 }}>
// <TableContainer
// component={Paper}
// sx={{
// pb: 3,
// maxHeight: isMobile ? 400 : 420,
// width: "100%",
// overflow: "auto",
// "&::-webkit-scrollbar": {
// width: "8px",
// height: isMobile ? "4px" : "6px"
// },
// "&::-webkit-scrollbar-track": {
// background: "#f1f1f1"
// },
// "&::-webkit-scrollbar-thumb": {
// background: Constants.primaryColor,
// borderRadius: "3px"
// },
// "&::-webkit-scrollbar-thumb:hover": {
// background: Constants.primaryColor
// }
// }}
// >
// <Table aria-label="followup history table" size={isMobile ? "small" : "medium"} stickyHeader> <TableHead>
// <TableRow sx={{ background: Constants.primaryColor }}>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS HISTORY</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REMARK HISTORY</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO HISTORY</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD DAYS</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXECUTIVE NAME</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CONTACT NO.</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP NO.</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED IN</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET(APPROX.)</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON FOR PURCHASE</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE BY/SOURCE</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP(IF CHANNEL PARTNER)</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY WITHIN?</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell> </TableRow> </TableHead> <TableBody>
// {visitFollowupHistory.length === 0 ? ( <TableRow>
// <TableCell colSpan={23} align="center" sx={{ padding: "40px", fontSize: "16px", color: "text.secondary" }}>
// No data available </TableCell> </TableRow>
// ) : (
// visitFollowupHistory.map((row, index) => {
// const statusFollowups = parseFollowups(row.statusHistory || row.status);
// const remarkFollowups = parseFollowups(row.remarkHistory || row.remarks);
// const assignToFollowups = parseFollowups(row.assignToHistory);


//               const displayStatus = statusFollowups.slice(0, 3);
//               const displayRemark = remarkFollowups.slice(0, 3);
//               const displayAssignTo = assignToFollowups.slice(0, 3);

//               const hasMoreFollowups =
//                 statusFollowups.length > 3 || remarkFollowups.length > 3 || assignToFollowups.length > 3;

//               return (
//                 <TableRow key={index} hover>
//                   <TableCell>
//                     {displayStatus.map((f, i) => (<div key={i}>{f}</div>))}
//                     {hasMoreFollowups && <Button size="small" onClick={() => handleShowAllFollowups(row)}>Check All Follow-ups</Button>}
//                   </TableCell>

//                   <TableCell>{displayRemark.map((f, i) => (<div key={i}>{f}</div>))}</TableCell>
//                   <TableCell>{displayAssignTo.map((f, i) => (<div key={i}>{f}</div>))}</TableCell>

//                   <TableCell>{row.leadDays || "N/A"}</TableCell>
//                   <TableCell>{row.lastUpdatedDate || "N/A"}</TableCell>
//                   <TableCell>{row.enquiryId || "N/A"}</TableCell>
//                   <TableCell>{row.leadId || "N/A"}</TableCell>
//                   <TableCell>{row.assignedTo || "N/A"}</TableCell>
//                   <TableCell>{row.name || "N/A"}</TableCell>
//                   <TableCell>{row.phone || "N/A"}</TableCell>
//                   <TableCell>{row.alternateContactNo || "N/A"}</TableCell>
//                   <TableCell>{row.phone || "N/A"}</TableCell>
//                   <TableCell>{row.email || "N/A"}</TableCell>
//                   <TableCell>{row.address || "N/A"}</TableCell>
//                   <TableCell>{row.occupation || "N/A"}</TableCell>
//                   <TableCell>{row.company || "N/A"}</TableCell>
//                   <TableCell>{row.interest || "N/A"}</TableCell>
//                   <TableCell>{row.budgetInLakh || "N/A"}</TableCell>
//                   <TableCell>{row.purchaseReason || "N/A"}</TableCell>
//                   <TableCell>{row.source || "N/A"}</TableCell>
//                   <TableCell>{row.nameofCP || "N/A"}</TableCell>
//                   <TableCell>{row.intendedPurchasePeriod || "N/A"}</TableCell>
//                   <TableCell>{row.customerFeedback || "N/A"}</TableCell>
//                 </TableRow>
//               );
//             })
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </Box>

//   <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
//     <DialogTitle>All Follow-ups</DialogTitle>
//     <DialogContent>
//       <strong>Status:</strong>
//       {selectedRowFollowups.status.map((f, i) => (<div key={i}>{f}</div>))}
//       <strong>Remark:</strong>
//       {selectedRowFollowups.remark.map((f, i) => (<div key={i}>{f}</div>))}
//       <strong>Assign To:</strong>
//       {selectedRowFollowups.assignTo.map((f, i) => (<div key={i}>{f}</div>))}
//     </DialogContent>
//   </Dialog>
// </>

// );
// };

