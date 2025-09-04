
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FlatAllotment = ({ data }) => {
  return (
    <TableContainer component={Paper}>
<Table>
  <TableHead>
    <TableRow sx={{ background: "#3621a9" }}>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PROJECT NAME</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NO. OF FLATS ALLOTED</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RERA CARPET AREA</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WING</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
      <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TYPE OF FLAT</TableCell>
    </TableRow>
  </TableHead>

  <TableBody>
    {data && data.length > 0 ? (
      data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.timestamp || 'N/A'}</TableCell>
          <TableCell>{row.projectName || 'N/A'}</TableCell>
          <TableCell>{row.landownerName || 'N/A'}</TableCell>
          <TableCell>{row.mobileNo || 'N/A'}</TableCell>
          <TableCell>{row.noOfFlatsAlloted || 'N/A'}</TableCell>
          <TableCell>{row.reraCarpetArea || 'N/A'}</TableCell>
          <TableCell>{row.wing || 'N/A'}</TableCell>
          <TableCell>{row.flatNo || 'N/A'}</TableCell>
          <TableCell>{row.typeOfFlat || 'N/A'}</TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={9} align="center">
          No Data Found
        </TableCell>
      </TableRow>
    )}
  </TableBody>
</Table>

    </TableContainer>
  );
};

export default FlatAllotment;
