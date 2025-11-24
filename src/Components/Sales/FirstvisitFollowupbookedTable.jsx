import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box, TablePagination, TableFooter, useMediaQuery, useTheme, } from "@mui/material";
import Constants from "../Constants";
const FirstvisitfollowupbookedTable = ({ data }) => {
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
      <TableContainer component={Paper}
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
        }}>
        <Table aria-label="first visit followup booked table" size={isMobile ? "small" : "medium"}  >
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> LEAD NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>  NAME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >MOBILE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} > ALTERNATE CONTACT NO  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >WHATSAPP NO </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} > EMAIL  </TableCell>
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
                  colSpan={17}
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
                  <TableCell>{item.id || "N/A"}</TableCell>
                  <TableCell>{item.leadId || "N/A"}</TableCell>
                  <TableCell>{item.name || "N/A"}</TableCell>
                  <TableCell>{item.phone || "N/A"}</TableCell>
                  <TableCell>{item.alternateContactNo || "N/A"}</TableCell>
                  <TableCell>{item.phone || "N/A"}</TableCell>
                  <TableCell>{item.email || "N/A"}</TableCell>
                  <TableCell>{item.address || "N/A"}</TableCell>
                  <TableCell>{item.occupation || "N/A"}</TableCell>
                  <TableCell>{item.company || "N/A"}</TableCell>
                  <TableCell>{item.interest || "N/A"}</TableCell>
                  <TableCell>{item.budgetInLakh || "N/A"}</TableCell>
                  <TableCell>{item.purchaseReason || "N/A"}</TableCell>
                  <TableCell>{item.source || "N/A"}</TableCell>
                  <TableCell>{item.cpName || "N/A"}</TableCell>
                  <TableCell>{item.intendedPurchasePeriod || "N/A"}</TableCell>
                  <TableCell>{item.customerFeedback || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={17} sx={{ p: 0, border: "none" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                    backgroundColor: "background.paper",
                  }}
                >
                  {/* <TablePagination
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
                  /> */}
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default FirstvisitfollowupbookedTable;
