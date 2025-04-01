// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const LandownerTable = ({ data }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
         
//            <TableRow sx={{background:"#3621a9"}}>
        
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}} >TIMESTAMP</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PROJECT NAME</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>NAME</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}> AGE</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MOBILE NO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MAIL ID</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>VILLAGE</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TALUKA</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DISTRICT</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>RESIDENTIAL ADDRESS</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PAN NO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ADDHAAR</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PHOTO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>LIGHT BILL</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF BANK</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BANK ADDRESS</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ACCOUNT NO</TableCell>
// <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>IFSC CODE</TableCell>

//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data && data.length > 0 ? (
//             data.map((landowner, index) => (
//               <TableRow key={index}>
//                <TableCell>ACTION</TableCell>
// <TableCell>TIMESTAMP</TableCell>
// <TableCell>PROJECT NAME</TableCell>
// <TableCell>LANDOWNER NAME</TableCell>
// <TableCell>AGE</TableCell>
// <TableCell>OCCUPATION</TableCell>
// <TableCell>MOBILE NO</TableCell>
// <TableCell>MAIL ID</TableCell>
// <TableCell>VILLAGE</TableCell>
// <TableCell>TALUKA</TableCell>
// <TableCell>DISTRICT</TableCell>
// <TableCell>RESIDENTIAL ADDRESS</TableCell>
// <TableCell>PAN NO</TableCell>
// <TableCell>ADDHAAR</TableCell>
// <TableCell>PHOTO</TableCell>
// <TableCell>LIGHT BILL</TableCell>
// <TableCell>NAME OF BANK</TableCell>
// <TableCell>BANK ADDRESS</TableCell>
// <TableCell>ACCOUNT NO</TableCell>
// <TableCell>IFSC CODE</TableCell>

//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               {/* <TableCell colSpan={5} style={{ textAlign: 'center' }}>No Landowner Data Available</TableCell> */}
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default LandownerTable;




import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const LandownerTable = ({ data }) => {
  const handleOpenDocument = (document) => {
    if (document) {
      // Open document in a new tab
      window.open(document, '_blank');
    }
  };

 
  const dummyData = [
    {
      timestamp: '2025-04-01 10:00 AM',
      projectName: 'Project A',
      landownerName: 'John Doe',
      age: 45,
      occupation: 'Farmer',
      mobileNo: '1234567890',
      mailId: 'john@example.com',
      village: 'Village A',
      taluka: 'Taluka A',
      district: 'District A',
      residentialAddress: 'https://via.placeholder.com/150',
      panNo: 'https://via.placeholder.com/150',
      aadhaarNo: 'https://via.placeholder.com/150',
      photo: 'https://via.placeholder.com/150',
      lightBill: 'https://via.placeholder.com/150',
      bankName: 'Bank A',
      bankAddress: '123 Bank Street, City',
      accountNo: '9876543210',
      ifscCode: 'BANK1234'
    },
    {
      timestamp: '2025-04-02 11:00 AM',
      projectName: 'Project B',
      landownerName: 'Jane Doe',
      age: 40,
      occupation: 'Teacher',
      mobileNo: '0987654321',
      mailId: 'jane@example.com',
      village: 'Village B',
      taluka: 'Taluka B',
      district: 'District B',
      residentialAddress: 'https://via.placeholder.com/150',
      panNo: 'https://via.placeholder.com/150',
      aadhaarNo: 'https://via.placeholder.com/150',
      photo: 'https://via.placeholder.com/150',
      lightBill: 'https://via.placeholder.com/150',
      bankName: 'Bank B',
      bankAddress: '456 Bank Avenue, City',
      accountNo: '1122334455',
      ifscCode: 'BANK5678'
    }

  ];

  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: '#3621a9' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>TIMESTAMP</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PROJECT NAME</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}> NAME</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>AGE</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>OCCUPATION</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MOBILE NO</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>MAIL ID</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>VILLAGE</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>TALUKA</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>DISTRICT</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>RESIDENTIAL ADDRESS</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PAN NO</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>AADHAAR</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>PHOTO</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>LIGHT BILL</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NAME OF BANK</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>BANK ADDRESS</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>ACCOUNT NO</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' }}>IFSC CODE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((landowner, index) => (
            <TableRow key={index}>
              <TableCell>{landowner.timestamp}</TableCell>
              <TableCell>{landowner.projectName}</TableCell>
              <TableCell>{landowner.landownerName}</TableCell>
              <TableCell>{landowner.age}</TableCell>
              <TableCell>{landowner.occupation}</TableCell>
              <TableCell>{landowner.mobileNo}</TableCell>
              <TableCell>{landowner.mailId}</TableCell>
              <TableCell>{landowner.village}</TableCell>
              <TableCell>{landowner.taluka}</TableCell>
              <TableCell>{landowner.district}</TableCell>
              <TableCell>
                <Tooltip title="View Document">
                  <IconButton onClick={() => handleOpenDocument(landowner.residentialAddress)}>
                    <VisibilityIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="View PAN">
                  <IconButton onClick={() => handleOpenDocument(landowner.panNo)}>
                    <VisibilityIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="View AADHAAR">
                  <IconButton onClick={() => handleOpenDocument(landowner.aadhaarNo)}>
                    <VisibilityIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="View Photo">
                  <IconButton onClick={() => handleOpenDocument(landowner.photo)}>
                    <VisibilityIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="View Light Bill">
                  <IconButton onClick={() => handleOpenDocument(landowner.lightBill)}>
                    <VisibilityIcon sx={{ color: 'blue' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{landowner.bankName}</TableCell>
              <TableCell>{landowner.bankAddress}</TableCell>
              <TableCell>{landowner.accountNo}</TableCell>
              <TableCell>{landowner.ifscCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LandownerTable;
