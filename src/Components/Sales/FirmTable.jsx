import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,IconButton } from '@mui/material';
import { Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import VisibilityIcon from '@mui/icons-material/Visibility';
const firms = [
  {
    timestamp: "2025-03-28 10:30 AM",
    name: "ABC Enterprises",
    address: "123 Business St, Cityville",
    firmPanNo: "ABCDE1234F",
    firmGstNo: "22ABCDE1234F1Z5",
    firmPan: "ABCDE1234F",
    firmGst: "22ABCDE1234F1Z5",
    firmLightBill: "Paid",
    partner: "John Doe",
    aadhaarNo: "1234 5678 9012",
    age: 45,
    occupation: "Businessman",
    mobileNo: "9876543210",
    mailId: "abc@enterprises.com",
    residentialAddress: "456 Market Rd, Cityville",
    panNo: "ABCDE1234F",
    photo: "", 
    lightBill: "Yes",
  },
  {
    timestamp:"",
    name :"",
  }

,{
  timestamp :" ",
  name :" ",
}
 
];

const handleOpenDocument = (url) => {
  if (url) {
    window.open(url, "_blank"); // Always open a new tab
  }
};

const FirmTable = ( ) => {
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
      
         <TableRow sx={{background:"#3621a9"}}>
        
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>FIRM NAME</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM ADDRESS</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM PAN NO</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM GST NO</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM PAN</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM GST</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FIRM LIGHT BILL</TableCell>
       
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NAME</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AGE</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MOBILE NO.</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MAIL ID</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RESIDENTIAL ADDRESS</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN NO</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AADHAAR NO</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RESIDENTIAL ADDRESS</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AADHAAR </TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PHOTO</TableCell>
          <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>LIGHT BILL</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {firms.map((firm, index) => (
            <TableRow key={index}>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.timestamp || " "}</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.name || " "}</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.address || " "}</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.firmPanNo || " "}</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.firmGstNo || " "}</TableCell>
              <TableCell>
  <Tooltip title="View Document">
    <IconButton onClick={() => { 
      console.log(firm.firmPan); // Correct field name
      handleOpenDocument(firm.firmPan); 
    }}>
      <VisibilityIcon sx={{ color: "blue" }} />
    </IconButton>
  </Tooltip>
</TableCell>

<TableCell>
  <Tooltip title="View Document">
    <IconButton onClick={() => handleOpenDocument(firm.firmGst)}>
      <VisibilityIcon sx={{ color: "blue" }} />
    </IconButton>
  </Tooltip>
</TableCell>

<TableCell>
  <Tooltip title="View Document">
    <IconButton onClick={() => handleOpenDocument(firm.firmLightBill)}>
      <VisibilityIcon sx={{ color: "blue" }} />
    </IconButton>
  </Tooltip>
</TableCell>

              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.partner || " "}</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.age}</TableCell>
          

<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>



              {/* Visibility Icon for Residential Address */}
              <TableCell>
                <Tooltip title="View Document">
                  <IconButton onClick={() => handleOpenDocument(firm.residentialAddress)}>
                    <VisibilityIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>

              {/* Visibility Icon for PAN */}
              <TableCell>
                <Tooltip title="View PAN">
                  <IconButton onClick={() => handleOpenDocument(firm.panNo)}>
                    <VisibilityIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>

              {/* Visibility Icon for Aadhaar */}
              <TableCell>
                <Tooltip title="View Aadhaar">
                  <IconButton onClick={() => handleOpenDocument(firm.aadhaarNo)}>
                    <VisibilityIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>

              {/* Visibility Icon for Photo */}
              <TableCell>
                <Tooltip title="View Photo">
                  <IconButton onClick={() => handleOpenDocument(firm.photo)}>
                    <VisibilityIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>

              {/* Visibility Icon for Light Bill */}
              <TableCell>
                <Tooltip title="View Light Bill">
                  <IconButton onClick={() => handleOpenDocument(firm.lightBill)}>
                    <VisibilityIcon sx={{ color: "blue" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
    </Table>
  </TableContainer>
  
  );
};

export default FirmTable;
