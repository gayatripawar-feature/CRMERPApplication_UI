


// import React from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from "@mui/material";
// import Constants from "../Constants";

// const BookingStatus = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: Constants.primaryColor }}>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNED</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTUAL</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STATUS</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LOAN SECURITY (IF APPLICABLE)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIME DELAY</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXECUTIVE NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CONTACT NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED IN</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET (APPROX.)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON FOR PURCHASE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE BY / SOURCE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP (IF CHANNEL PARTNER)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY WITHIN ?</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
//               <TableCell>{item.planned}</TableCell>
//               <TableCell>{item.actual}</TableCell>
//               <TableCell>{item.status}</TableCell>
//               <TableCell>{item.loanSecurity}</TableCell>
//               <TableCell>{item.timeDelay}</TableCell>
//               <TableCell>{item.enquiryNo}</TableCell>
//               <TableCell>{item.salesExecutive}</TableCell>
//               <TableCell>{item.name}</TableCell>
//               <TableCell>{item.mobile}</TableCell>
//               <TableCell>{item.whatsappNo}</TableCell>
//               <TableCell>{item.alternateContactNo}</TableCell>
//               <TableCell>{item.email}</TableCell>
//               <TableCell>{item.address}</TableCell>
//               <TableCell>{item.occupation}</TableCell>
//               <TableCell>{item.company}</TableCell>
//               <TableCell>{item.interestedIn}</TableCell>
//               <TableCell>{item.budget}</TableCell>
//               <TableCell>{item.reasonForPurchase}</TableCell>
//               <TableCell>{item.referenceSource}</TableCell>
//               <TableCell>{item.cpName}</TableCell>
//               <TableCell>{item.planningToBuy}</TableCell>
//               <TableCell>{item.customerFeedback}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default BookingStatus;


import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  TableFooter,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Constants from "../Constants";

const BookingStatus = ({ data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: isMobile ? 400 : 600,
          width: "100%",
          overflow: "auto",
          "&::-webkit-scrollbar": {
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
        }}
      >
        <Table
          aria-label="booking status table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PLANNED
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ACTUAL
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                STATUS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LOAN SECURITY (IF APPLICABLE)
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                TIME DELAY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ENQUIRY NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                SALES EXECUTIVE NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                MOBILE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                WHATSAPP NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ALTERNATE CONTACT NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                EMAIL
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ADDRESS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                OCCUPATION
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                COMPANY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                INTERESTED IN
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                BUDGET (APPROX.)
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REASON FOR PURCHASE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REFERENCE BY / SOURCE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME OF CP (IF CHANNEL PARTNER)
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PLANNING TO BUY WITHIN ?
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={22}
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
              paginatedData.map((item, index) => (
                <TableRow key={index} hover>
                  <TableCell>{item.planned || "N/A"}</TableCell>
                  <TableCell>{item.actual || "N/A"}</TableCell>
                  <TableCell>{item.status || "N/A"}</TableCell>
                  <TableCell>{item.loanSecurity || "N/A"}</TableCell>
                  <TableCell>{item.timeDelay || "N/A"}</TableCell>
                  <TableCell>{item.enquiryNo || "N/A"}</TableCell>
                  <TableCell>{item.salesExecutive || "N/A"}</TableCell>
                  <TableCell>{item.name || "N/A"}</TableCell>
                  <TableCell>{item.mobile || "N/A"}</TableCell>
                  <TableCell>{item.whatsappNo || "N/A"}</TableCell>
                  <TableCell>{item.alternateContactNo || "N/A"}</TableCell>
                  <TableCell>{item.email || "N/A"}</TableCell>
                  <TableCell>{item.address || "N/A"}</TableCell>
                  <TableCell>{item.occupation || "N/A"}</TableCell>
                  <TableCell>{item.company || "N/A"}</TableCell>
                  <TableCell>{item.interestedIn || "N/A"}</TableCell>
                  <TableCell>{item.budget || "N/A"}</TableCell>
                  <TableCell>{item.reasonForPurchase || "N/A"}</TableCell>
                  <TableCell>{item.referenceSource || "N/A"}</TableCell>
                  <TableCell>{item.cpName || "N/A"}</TableCell>
                  <TableCell>{item.planningToBuy || "N/A"}</TableCell>
                  <TableCell>{item.customerFeedback || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={22} sx={{ p: 0, border: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    backgroundColor: "background.paper",
                  }}
                >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      width: "auto",
                      "& .MuiTablePagination-toolbar": {
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? 2 : 0,
                        padding: isMobile ? "8px 0" : "16px 0",
                      },
                      "& .MuiTablePagination-spacer": {
                        display: isMobile ? "none" : "block",
                        flex: "none",
                      },
                      "& .MuiTablePagination-actions": {
                        marginLeft: isMobile ? 0 : "auto",
                      },
                      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                        {
                          fontSize: isMobile ? "12px" : "14px",
                        },
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default BookingStatus;
