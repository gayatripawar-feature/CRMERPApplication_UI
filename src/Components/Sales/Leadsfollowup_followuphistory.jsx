import React from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography ,Box,TablePagination} from "@mui/material";
import Constants from "../Constants";
const Leadsfollowup_followuphistory = ({ data }) => {

  const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5); // default rows per page

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
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
        {/* <TableCell>{row.enquiryNo || 'N/A'}</TableCell> */}
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
</Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
     

      <TablePagination
  component="div"
  // count={firms.length}
   count={data.length} 
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[]} 
  showFirstButton
  showLastButton
/>

      </Box>
      </TableContainer>
      </Box>
    </>
  );
};

export default Leadsfollowup_followuphistory;
