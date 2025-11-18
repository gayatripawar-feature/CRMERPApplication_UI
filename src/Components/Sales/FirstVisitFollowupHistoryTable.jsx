import React, { useState ,useEffect} from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box,
  TablePagination,
  TableFooter,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Constants from "../Constants";

export const FirstVisitFollowupHistoryTable = ({ data,fetchVisitFollowUpHistory}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
const [visitFollowupHistory, setVisitFollowupHistory] = useState([]);
const [filteredVisitFollowupHistory, setFilteredVisitFollowupHistory] = useState([]);

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const paginatedData = data.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );


  
  useEffect(() => {
  console.log("🟦 Child Mounted - FollowUp Table");
}, []);




useEffect(() => {
  console.log(" Data received in Table:", data);
  if (data && data.length > 0) {
    setVisitFollowupHistory(data);
    setFilteredVisitFollowupHistory(data);  
  }
}, [data]);

useEffect(() => {
  console.log("🟧 fetchVisitFollowUpHistory function received:", fetchVisitFollowUpHistory);
}, [fetchVisitFollowUpHistory]);

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
          aria-label="followup history table"
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
                STATUS HISTORY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                REMARK HISTORY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ASSIGN TO HISTORY
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LEAD DAYS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                TIMESTAMP
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ENQUIRY NO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LEAD NO.
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
                ALTERNATE CONTACT NO.
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
                BUDGET(APPROX.)
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
                REFERENCE BY/SOURCE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME OF CP(IF CHANNEL PARTNER)
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PLANNING TO BUY WITHIN?
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
                filteredVisitFollowupHistory.map((row,index) =>(
                <TableRow key={index} hover>
                  <TableCell>{row.statusHistory || "N/A"}</TableCell>
                  <TableCell>{row.remarkHistory || "N/A"}</TableCell>
                  <TableCell>{row.assignToHistory || "N/A"}</TableCell>
                  <TableCell>{row.leadDays || "N/A"}</TableCell>
                  <TableCell>{row.timestamp || "N/A"}</TableCell>
                 
                  <TableCell>{row.id || "N/A"}</TableCell>
                  <TableCell>{row.leadNo || "N/A"}</TableCell>
                  <TableCell>{row.salesExecutiveName || "N/A"}</TableCell>
                  <TableCell>{row.name || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.alternateContactNo || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.email || "N/A"}</TableCell>
                  <TableCell>{row.address || "N/A"}</TableCell>
                  <TableCell>{row.occupation || "N/A"}</TableCell>
                  <TableCell>{row.company || "N/A"}</TableCell>
                  <TableCell>{row.interestedIn || "N/A"}</TableCell>
                  <TableCell>{row.budget || "N/A"}</TableCell>
                  <TableCell>{row.reasonForPurchase || "N/A"}</TableCell>
                  <TableCell>{row.referenceBY || "N/A"}</TableCell>
                  <TableCell>{row.nameofCP || "N/A"}</TableCell>
                  <TableCell>{row.planningToBuyWithin || "N/A"}</TableCell>
                  <TableCell>{row.customerFeedback || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={23} sx={{ p: 0, border: "none" }}>
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
          </TableFooter> */}
        </Table>
      </TableContainer>
    </>
  );
};
