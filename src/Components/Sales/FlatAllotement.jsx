
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FlatAllotment = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      {/* <Table>
        <TableHead>
          
        
           <TableRow sx={{background:"#3621a9"}}>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>PROJECT NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>LANDOWNER NAME</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>AGE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MOBILE NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MAIL ID</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>VILLAGE</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TALUKA</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DISTRICT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RESIDENTIAL ADDRESS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ADDHAAR</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PHOTO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>LIGHT BILL</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NAME OF BANK</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BANK ADDRESS</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ACCOUNT NO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>IFSC CODE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.action || 'N/A'}</TableCell>
                <TableCell>{row.timestamp || 'N/A'}</TableCell>
                <TableCell>{row.projectName || 'N/A'}</TableCell>
                <TableCell>{row.landownerName || 'N/A'}</TableCell>
                <TableCell>{row.age || 'N/A'}</TableCell>
                <TableCell>{row.occupation || 'N/A'}</TableCell>
                <TableCell>{row.mobileNo || 'N/A'}</TableCell>
                <TableCell>{row.mailId || 'N/A'}</TableCell>
                <TableCell>{row.village || 'N/A'}</TableCell>
                <TableCell>{row.taluka || 'N/A'}</TableCell>
                <TableCell>{row.district || 'N/A'}</TableCell>
                <TableCell>{row.residentialAddress || 'N/A'}</TableCell>
                <TableCell>{row.panNo || 'N/A'}</TableCell>
                <TableCell>{row.addhaar || 'N/A'}</TableCell>
                <TableCell>{row.photo || 'N/A'}</TableCell>
                <TableCell>{row.lightBill || 'N/A'}</TableCell>
                <TableCell>{row.bankName || 'N/A'}</TableCell>
                <TableCell>{row.bankAddress || 'N/A'}</TableCell>
                <TableCell>{row.accountNo || 'N/A'}</TableCell>
                <TableCell>{row.ifscCode || 'N/A'}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              
            </TableRow>
          )}
        </TableBody>
      </Table> */}


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
