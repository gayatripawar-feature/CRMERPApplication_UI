import React, { useState } from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, useMediaQuery, useTheme } from "@mui/material";
import Constants from "../Constants";
const FirstvisitfollowupUndefinedTable = ({ data }) => {
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
        }} >
        <Table aria-label="undefined history table" size={isMobile ? "small" : "medium"}  >
          <TableHead>
            <TableRow sx={{ background: Constants.primaryColor }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", }}>    STATUS HISTORY   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", }} >    REMARK HISTORY   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}    >     ASSIGN TO HISTORY   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}  > ENQUIRY NO </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>   LEAD NO  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}  >   NAME  </TableCell>

              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >  MOBILE  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >     ALTERNATE CONTACT NO.   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >      WHATSAPP NO   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >  EMAIL  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}  >  ADDRESS   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >    OCCUPATION   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>  COMPANY   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}   >      INTERESTED IN   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", }} > BUDGET (APPROX.)    </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >   REASON FOR PURCHASE  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >  REFERENCE BY / SOURCE  </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }} >   NAME OF CP (IF CHANNEL PARTNER)   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY WITHIN?   </TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}  > CUSTOMER FEEDBACK & COMPLETE FOLLOWUP DETAILS  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={21} align="center"
                  sx={{ padding: "40px", fontSize: "16px", color: "text.secondary" }}   >  No data available  </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, index) => (
                <TableRow key={index} hover>
                  {/* <TableCell>{row.status || "N/A"}</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (row.statusHistory || row.status || "N/A")
                      }}
                    />
                  </TableCell>
                  {/* <TableCell>{row.remarks || "N/A"}</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (row.remarkHistory || row.remarks || "N/A")
                      }}
                    />
                  </TableCell>
                  {/* <TableCell>{row.assignedTo || "N/A"}</TableCell> */}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: (row.assignToHistory || "N/A")
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.id || "N/A"}</TableCell>
                  <TableCell>{row.leadId || "N/A"}</TableCell>
                  <TableCell style={{ whiteSpace: "nowrap" }}>{row.name || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.alternateContactNo || "N/A"}</TableCell>
                  <TableCell>{row.phone || "N/A"}</TableCell>
                  <TableCell>{row.email || "N/A"}</TableCell>
                  <TableCell>{row.address || "N/A"}</TableCell>
                  <TableCell>{row.occupation || "N/A"}</TableCell>
                  <TableCell>{row.company || "N/A"}</TableCell>
                  <TableCell>{row.interest || "N/A"}</TableCell>
                  <TableCell>{row.budgetInLakh || "N/A"}</TableCell>
                  <TableCell>{row.reason || "N/A"}</TableCell>
                  <TableCell>{row.source || "N/A"}</TableCell>
                  <TableCell>{row.cpName || "N/A"}</TableCell>
                  <TableCell>{row.intendedPurchasePeriodMonths || "N/A"}</TableCell>
                  <TableCell>{row.feedback || "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </>
  );
};

export default FirstvisitfollowupUndefinedTable;
