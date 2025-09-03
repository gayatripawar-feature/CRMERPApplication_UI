



// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,TablePagination, TextField, Button ,Typography,Input,MenuItem,Tooltip,Grid,FormControl,InputLabel,Select} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import { toast } from 'react-toastify';
// import VisibilityIcon from '@mui/icons-material/Visibility';

// const LandownerTable = ({ data }) => {
//   const [editRow, setEditRow] = useState(null);
//   const [formData, setFormData] = useState({});
//     const [selectedProject, setSelectedProject] = useState('');
//      const [mobileNo, setMobileNo] = useState('');
//       const [nameError, setNameError] = useState('');
//         const [mobileError, setMobileError] = useState("");
//          const [error, setError] = useState('');
// const [emailError, setEmailError] = useState("");
//   const [selectedBank, setSelectedBank] = useState('');
//    const [accountNo, setAccountNo] = useState(""); // Initialize the account number state
//   const [accountNoError, setAccountNoError] = useState("");

//    const [fileNames, setFileNames] = useState("");
//   const [ifscCode, setIfscCode] = useState(""); 
//   const [ifscCodeError, setIfscCodeError] = useState("");

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);


//   const handleEdit = (row) => {
//     setEditRow(row);
//     setFormData(row);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e, key) => {
//     const file = e.target.files[0]; 
//     if (file) {
//       setFileNames((prevState) => ({
//         ...prevState,
//         [key]: file.name, // Update the file name for the corresponding key
//       }));
//     }
//   };
  
//   const handleIfscCodeChange = (e) => {
//     const value = e.target.value;
  
//     // Regular expression to validate IFSC code format
//     const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  
//     if (value && !ifscRegex.test(value)) {
//       setIfscCodeError("Invalid IFSC code. It should be in the format: XXXX0XXXXX.");
//     } else {
//       setIfscCodeError(""); // Clear the error if valid
//     }
  
//     // Update the IFSC code in the state
//     setIfscCode(value); // Assuming you have a state for the IFSC code
//   };
  

//   const handleAccountNoChange = (e) => {
//     const value = e.target.value;
    
//     // Regular expression to check if the value is numeric and has a valid length (e.g., 10-16 digits)
//     const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits
  
//     if (value && !accountNoRegex.test(value)) {
//       setAccountNoError("Account number must be between 10 to 16 digits.");
//     } else {
//       setAccountNoError(""); // Clear the error if valid
//     }
  
//     // Update the account number in the state
//     setAccountNo(value);
//   };

//   const handleBankChange = (event) => {
//     setSelectedBank(event.target.value);
//   };
  
//   const handleEmailChange = (e, index) => {
//     const value = e.target.value;
//     // const partnerCopy = [...partners];
  
//     // Regular expression to validate Gmail email format
//     // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/i;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
//     if (value && !emailRegex.test(value)) {
//       setEmailError("Invalid Gmail address");
//       console.log("invalid email");
//     } else {
//       setEmailError(""); // Clear the error if the value is valid
//     }
  
//     // Update the partner's email in the state
//     partnerCopy[index] = { ...partnerCopy[index], email: value };
//     setPartners(partnerCopy);
//   };

//   const handleNameChange = (event) => {
//     const value = event.target.value;

   
//     if (/[^a-zA-Z\s]/.test(value)) {
//       setError('Name should only contain letters and spaces.');
//     } else {
//       setError('');
//     }

//     setName(value);
//   };

  
//   const handleMobileNoChange = (event) => {
//     const value = event.target.value;
  

//     if (/[^0-9]/.test(value)) {
//       setMobileError('Mobile number should only contain digits.');
//     } else if (value.length > 10) {
//       setMobileError('Mobile number cannot exceed 10 digits.');
//     } else {
//       setMobileError(''); 
//     }
  
   
//     setMobileNo(value);
//   };



//   const handleUpdate = () => {
//     console.log("Updated Data:", formData);
  
//     setEditRow(null);
//     toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });
//   };

//   const handleCancel = () => {
//     setEditRow(null);
//   };

//   // Dummy data row
//   const dummyData = [
//     {
//       timestamp: "2024-04-01 10:00:00",
//       projectName: "Project Alpha",
//       landownerName: "John Doe",
//       age: 45,
//       occupation: "Farmer",
//       mobileNo: "9876543210",
//       mailId: "john.doe@example.com",
//       village: "Greenfield",
//       taluka: "Central",
//       district: "Metro",
//       residentialAddress: "",
//       panNo: "",
//       aadhaar: "",
//       photo: "",
//       lightBill: "",
//       bankName: "XYZ Bank",
//       bankAddress: "456 Bank St, Metro",
//       accountNo: "123456789012",
//       ifscCode: "XYZB0001234",
//     },
//   ];

//   const displayData = data && data.length > 0 ? data : dummyData;


//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = event => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // const displayData = landowners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   return (
//     <TableContainer component={Paper}>
//       {editRow ? (
//          <div
//          className="landowner-form mt-4 p-3 border rounded"
        
//          style={{
//            maxHeight: "500px",
//            overflowY: "auto",
//            backgroundColor: "#f8f9fa", 
//            border: "1px solid #ccc", 
//          }}
//        >
//          <h5>Landowner Details</h5>
//          <Grid container spacing={2}>
//            {/* <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid> */}
//            <Grid item xs={4}>
//          <FormControl fullWidth variant="outlined">
//            <InputLabel id="project-name-label">Project Name</InputLabel>
//            <Select
//              labelId="project-name-label"
//              id="project-name-select"
//              value={selectedProject}
//              onChange={handleChange}
//              label="Project Name"
//            >
//              <MenuItem value="Project Name 1">Project Name 1</MenuItem>
//              <MenuItem value="Project Name 121">Project Name 121</MenuItem>
//              <MenuItem value="11">11</MenuItem>
//              <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
//              <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
//              <MenuItem value="Sohan Enterprised">Sohan Enterprised</MenuItem>
//            </Select>
//          </FormControl>
//        </Grid>
//            {/* <Grid item xs={4}><TextField label="Mobile No." fullWidth value={mobileNo}
//              onChange={handleMobileChange}
//              error={!!mobileError} // Show error state if there is a mobile error
//                  helperText={mobileError}
//                  /></Grid> */}
 
 
//                  {/* Mobile No. with Validation */}
//                  <Grid item xs={4}>
//        <TextField
//          label="Mobile No."
//          fullWidth
//          value={mobileNo}
//          onChange={handleMobileNoChange}
//          error={!!mobileError} // Show error if there is a mobileError
//          helperText={mobileError} // Display error message if any
//        />
//      </Grid>
 
 
//            <Grid item xs={4}><TextField label="Landowner Name" fullWidth value={name} onChange={handleNameChange}
//             error={!!error} // Show error if there is an error message
//             helperText={error}
//            /></Grid>
//            <Grid item xs={4}><TextField type="number" label="Age" fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//            {/* <Grid item xs={4}><TextField label="Mail ID" fullWidth   onChange={handleEmailChange}/></Grid> */}
 
//            {/* <Grid item xs={4}>
//    <TextField
//      label="Mail ID"
//      fullWidth
//      value={email}
//      onChange={(e) => handleEmailChange(e)} // pass the correct index if needed
//      error={!!emailError} // Show error if there's an error message
//      helperText={emailError} // Display error message if any
//    />
//  </Grid> */}
//  <Grid item xs={4}>
//    <TextField
//      label="Mail ID"
//      fullWidth
//      // Bind the input value to the `email` state
//      onChange={handleEmailChange} // Trigger the handleEmailChange function on input change
//      error={!!emailError} // Show error if `emailError` is not an empty string
//      helperText={emailError} // Display the error message if there is one
//    />
//  </Grid>
 
 
//            <Grid item xs={4}><TextField label="Village" fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="District" fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="Taluka" fullWidth /></Grid>
//            {/* <Grid item xs={4}><TextField label="Name of Bank" fullWidth /></Grid> */}
//            <Grid item xs={4}>
//          <FormControl fullWidth variant="outlined">
//            <InputLabel id="bank-name-label">Name of Bank</InputLabel>
//            <Select
//              labelId="bank-name-label"
//              id="bank-name-select"
//              value={selectedBank}
//              onChange={handleBankChange}
//              label="Name of Bank"
//            >
//              <MenuItem value="SBI Bank">SBI Bank</MenuItem>
//              <MenuItem value="Bank Of Baroda">Bank Of Baroda</MenuItem>
//              <MenuItem value="Canara Bank">Canara Bank</MenuItem>
//              <MenuItem value="Axis Bank">Axis Bank</MenuItem>
//              <MenuItem value="Bank of India">Bank of India</MenuItem>
//              <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
//              <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
//              <MenuItem value="Bank of Maharashtra">Bank of Maharashtra</MenuItem>
//              <MenuItem value="Central Bank of India">Central Bank of India</MenuItem>
//              <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
//              <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
//              <MenuItem value="Indian Bank">Indian Bank</MenuItem>
//              <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
//            </Select>
//          </FormControl>
//        </Grid>
//            <Grid item xs={4}><TextField label="Bank Address" fullWidth /></Grid>
           
//            {/* <Grid item xs={4}><TextField label="Account No." fullWidth /></Grid> */}
//            <Grid item xs={4}>
//    <TextField
//      label="Account No."
//      fullWidth
//      value={accountNo} // Bind the value of the account number state
//      onChange={handleAccountNoChange} // Trigger onChange handler
//      error={!!accountNoError} // Show error if there's an accountNoError
//      helperText={accountNoError} // Display error message if any
//    />
//  </Grid>
 
//            {/* <Grid item xs={4}><TextField label="IFSC Code" sx={{
//        marginTop: "13px",
       
//      }} fullWidth /></Grid> */}
//      <Grid item xs={4}>
//    <TextField
//      label="IFSC Code"
//      fullWidth
//      value={ifscCode} // Bind the state value for the IFSC code
//      onChange={handleIfscCodeChange} // Handle change and validation
//      error={!!ifscCodeError} // Show error if there's an error
//      helperText={ifscCodeError} // Display error message if any
//    />
//  </Grid>
 
//            {/* <Grid item xs={4}><TextField label="Aadhaar No." fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="Residential Address" fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="PAN No." fullWidth /></Grid>
//            <Grid item xs={4}><TextField label="Light Bill" fullWidth /></Grid> */}
//            {/* <Grid item xs={4}>
//              <TextField type="file" accept="image/*" />
//            </Grid> */}
 
//  <Grid item xs={4}>
//              <Typography variant="body2" gutterBottom>
//                Aadhaar No.
//              </Typography>
//              <label>
//                <Input
//                  type="file"
//                  style={{ display: "none" }} // Hide the default input
//                  id="file-input-aadhaar" // Unique ID for the file input
//                  onChange={(e) => handleFileChange(e, "aadhaarFile")} // Handle file selection
//                />
//                <Button
//                  variant="contained"
//                  color="light"
//                  component="span"
//                  // onClick={() => document.getElementById("file-input-aadhaar").click()} // Trigger the file input
                 
//                >
//                  Choose File
//                </Button>
//              </label>
//              {fileNames.aadhaarFile && (
//                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                  {fileNames.aadhaarFile} {/* Display the selected file name */}
//                </Typography>
//              )}
//            </Grid>
 
 
 
//            <Grid item xs={4}>
//              <Typography variant="body2" gutterBottom>
//              Photo
//              </Typography>
//              <label>
//                <Input
//                  type="file"
//                  accept="image/*"
//                  style={{ display: "none" }} // Hide the default input
//                  id="file-input-image" // Unique ID for the file input
//                  onChange={(e) => handleFileChange(e, "imageFile")} // Handle file selection
//                />
//                <Button
//                  variant="contained"
//                  color="light"
//                  component="span"
//                  // onClick={() => document.getElementById("file-input-image").click()} // Trigger the file input
//                >
//                  Choose File
//                </Button>
//              </label>
//              {fileNames.imageFile && (
//                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                  {fileNames.imageFile} {/* Display the selected file name */}
//                </Typography>
//              )}
//            </Grid>
 
 
//            {/* Residential Address File Upload */}
//            <Grid item xs={4} sx={{ marginTop: "6px"}}>
//              <Typography variant="body2" gutterBottom>
//                Residential Address
//              </Typography>
//              <label>
//                <Input
//                  type="file"
//                  style={{ display: "none" }}
//                  id="file-input-address"
//                  onChange={(e) => handleFileChange(e, "addressFile")}
//                />
//                <Button
//                  variant="contained"
//                  color="light"
//                  component="span"
//                  // onClick={() => document.getElementById("file-input-address").click()}
//                >
//                  Choose File
//                </Button>
//              </label>
//              {fileNames.addressFile && (
//                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                  {fileNames.addressFile}
//                </Typography>
//              )}
//            </Grid>
 
//            {/* PAN No. File Upload */}
//            <Grid item xs={4} sx={{ marginTop: "6px"}}>
//              <Typography variant="body2" gutterBottom>
//                PAN No.
//              </Typography>
//              <label>
//                <Input
//                  type="file"
//                  style={{ display: "none" }}
//                  id="file-input-pan"
//                  onChange={(e) => handleFileChange(e, "panFile")}
//                />
//                <Button
//                  variant="contained"
//                  color="light"
//                  component="span"
//                  // onClick={() => document.getElementById("file-input-pan").click()}
//                >
//                  Choose File
//                </Button>
//              </label>
//              {fileNames.panFile && (
//                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                  {fileNames.panFile}
//                </Typography>
//              )}
//            </Grid>
 
//            {/* Light Bill File Upload */}
//            <Grid item xs={4} sx={{ marginTop: "6px"}}>
//              <Typography variant="body2" gutterBottom>
//                Light Bill
//              </Typography>
//              <label>
//                <Input
//                  type="file"
//                  style={{ display: "none" }}
//                  id="file-input-lightbill"
//                  onChange={(e) => handleFileChange(e, "lightBillFile")}
//                />
//                <Button
//                  variant="contained"
//                  color="light"
//                  component="span"
//                  // onClick={() => document.getElementById("file-input-lightbill").click()}
//                >
//                  Choose File
//                </Button>
//              </label>
//              {fileNames.lightBillFile && (
//                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
//                  {fileNames.lightBillFile}
//                </Typography>
//              )}
//            </Grid>
 
         
//          </Grid>
 
       
 
        
         
//  {/* <Button
//    variant="contained"
//    className="mt-3"
//    color="success"
//    onClick={() => {
//      setShowFirmForm(false);
//      toast.success("Details are Updated !", { position: "top-right", autoClose: 3000 });
//    }}
//  >
//  Update
//  </Button> */}

// <Button
//         variant="contained"
//         className="mt-3"
//         color="success"
//         onClick={handleUpdate}
//       >
//         Update
//       </Button>
//   <Button
//    variant="contained"
//    className="mt-3 m-1 btn btn-secondary" // Bootstrap's secondary button style
//    onClick={() => setEditRow(false)} // Close the form when clicked
//  >
//    Cancel
//  </Button>

//        </div>
//       ) : (
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: '#3621a9' }}>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>ACTION</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold',whiteSpace: "nowrap"  }}>PROJECT NAME</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>LANDOWNER NAME</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>AGE</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold',whiteSpace: "nowrap"  }}>MOBILE NO</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>MAIL ID</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>VILLAGE</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold',whiteSpace: "nowrap"  }}>TALUKA</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>DISTRICT</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>RESIDENTIAL ADDRESS</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>PAN NO</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>AADHAAR</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>PHOTO</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>LIGHT BILL</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>NAME OF BANK</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>BANK ADDRESS</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>ACCOUNT NO</TableCell>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' ,whiteSpace: "nowrap" }}>IFSC CODE</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {displayData.map((landowner, index) => (
//               <TableRow key={index}>
//                 <TableCell>
//                   <Tooltip title="Edit">
//                     <IconButton
//                       size="small"
//                       sx={{
//                         backgroundColor: '#1976D2',
//                         color: 'white',
//                         borderRadius: '50%',
//                         '&:hover': { backgroundColor: '#1565C0' },
//                       }}
//                       onClick={() => handleEdit(landowner)}
//                     >
//                       <EditIcon sx={{ fontSize: '18px' }} />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//                 <TableCell>{landowner.timestamp }</TableCell>
//                 <TableCell>{landowner.projectName }</TableCell>
//                 <TableCell>{landowner.landownerName }</TableCell>
//                 <TableCell>{landowner.age}</TableCell>
//                 <TableCell>{landowner.occupation}</TableCell>
//                 <TableCell>{landowner.mobileNo }</TableCell>
//                 <TableCell>{landowner.mailId }</TableCell>
//                 <TableCell>{landowner.village }</TableCell>
//                 <TableCell>{landowner.taluka }</TableCell>
//                 <TableCell>{landowner.district }</TableCell>
//                 {/* <TableCell>{landowner.residentialAddress || 'N/A'}</TableCell>
//                 <TableCell>{landowner.panNo || 'N/A'}</TableCell>
//                 <TableCell>{landowner.aadhaar || 'N/A'}</TableCell>
//                 <TableCell>{landowner.photo || 'N/A'}</TableCell>
                
//                 <TableCell>{landowner.lightBill || 'N/A'}</TableCell> */}
//                <TableCell>
//   <IconButton
//     onClick={() => window.open(landowner.residentialAddress, '_blank')}
//     color="primary"
//   >
//     <VisibilityIcon />
//   </IconButton>
// </TableCell>



// <TableCell>
// <IconButton
//     onClick={() => landowner.panNo  && window.open(landowner.panNo , '_blank')}
//     color="primary"
//   >
//     <VisibilityIcon />
//   </IconButton>
//   </TableCell>
// <TableCell>
//   <IconButton
//     onClick={() => landowner.aadhaar && window.open(landowner.aadhaar, '_blank')}
//     color="primary"
//   >
//     <VisibilityIcon />
//   </IconButton>
// </TableCell>


// <TableCell>
 
//     <IconButton
//       onClick={() => landowner.photo && window.open(landowner.photo, '_blank')}
//       color="primary"
//     >
//       <VisibilityIcon />
//     </IconButton>
  
// </TableCell>

// <TableCell>

//     <IconButton
//       onClick={() =>landowner.lightBill && window.open(landowner.lightBill, '_blank')}
//       color="primary"
//     >
//       <VisibilityIcon />
//     </IconButton>

// </TableCell>


//                 <TableCell>{landowner.bankName || 'N/A'}</TableCell>
//                 <TableCell>{landowner.bankAddress || 'N/A'}</TableCell>
//                 <TableCell>{landowner.accountNo || 'N/A'}</TableCell>
//                 <TableCell>{landowner.ifscCode || 'N/A'}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </TableContainer>
//   );
// };

// export default LandownerTable;




import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TextField,
  Button,
  Typography,
  Input,
  MenuItem,
  Tooltip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FaTrash } from "react-icons/fa";


const LandownerTable = ({ data }) => {
  const [editRow, setEditRow] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedProject, setSelectedProject] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNo, setAccountNo] = useState(""); // Initialize the account number state
  const [accountNoError, setAccountNoError] = useState("");

  const [fileNames, setFileNames] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (row) => {
    setEditRow(row);
    setFormData(row);
  };
  const handleDelete = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    toast.success("Row deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFileNames((prevState) => ({
        ...prevState,
        [key]: file.name, // Update the file name for the corresponding key
      }));
    }
  };

  const handleIfscCodeChange = (e) => {
    const value = e.target.value;

    // Regular expression to validate IFSC code format
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;

    if (value && !ifscRegex.test(value)) {
      setIfscCodeError(
        "Invalid IFSC code. It should be in the format: XXXX0XXXXX."
      );
    } else {
      setIfscCodeError(""); // Clear the error if valid
    }

    // Update the IFSC code in the state
    setIfscCode(value); // Assuming you have a state for the IFSC code
  };

  const handleAccountNoChange = (e) => {
    const value = e.target.value;

    // Regular expression to check if the value is numeric and has a valid length (e.g., 10-16 digits)
    const accountNoRegex = /^[0-9]{10,16}$/; // 10 to 16 digits

    if (value && !accountNoRegex.test(value)) {
      setAccountNoError("Account number must be between 10 to 16 digits.");
    } else {
      setAccountNoError(""); // Clear the error if valid
    }

    // Update the account number in the state
    setAccountNo(value);
  };

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  const handleEmailChange = (e, index) => {
    const value = e.target.value;
    // const partnerCopy = [...partners];

    // Regular expression to validate Gmail email format
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/i;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (value && !emailRegex.test(value)) {
      setEmailError("Invalid Gmail address");
      console.log("invalid email");
    } else {
      setEmailError(""); // Clear the error if the value is valid
    }

    // Update the partner's email in the state
    partnerCopy[index] = { ...partnerCopy[index], email: value };
    setPartners(partnerCopy);
  };

  const handleNameChange = (event) => {
    const value = event.target.value;

    if (/[^a-zA-Z\s]/.test(value)) {
      setError("Name should only contain letters and spaces.");
    } else {
      setError("");
    }

    setName(value);
  };

  const handleMobileNoChange = (event) => {
    const value = event.target.value;

    if (/[^0-9]/.test(value)) {
      setMobileError("Mobile number should only contain digits.");
    } else if (value.length > 10) {
      setMobileError("Mobile number cannot exceed 10 digits.");
    } else {
      setMobileError("");
    }

    setMobileNo(value);
  };

  const handleUpdate = () => {
    console.log("Updated Data:", formData);

    setEditRow(null);
    toast.success("Details are Updated!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleCancel = () => {
    setEditRow(null);
  };

  // Dummy data row
  const dummyData = [
    {
      timestamp: "2024-04-01 10:00:00",
      projectName: "Project Alpha",
      landownerName: "John Doe",
      age: 45,
      occupation: "Farmer",
      mobileNo: "9876543210",
      mailId: "john.doe@example.com",
      village: "Greenfield",
      taluka: "Central",
      district: "Metro",
      residentialAddress: "",
      panNo: "",
      aadhaar: "",
      photo: "",
      lightBill: "",
      bankName: "XYZ Bank",
      bankAddress: "456 Bank St, Metro",
      accountNo: "123456789012",
      ifscCode: "XYZB0001234",
    },
  ];

  // const displayData = data && data.length > 0 ? data : dummyData;
  const [rows, setRows] = useState(data && data.length > 0 ? data : dummyData);


  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const displayData = landowners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  return (
    <TableContainer component={Paper}>
      {editRow ? (
        <div
          className="landowner-form mt-4 p-3 border rounded"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            backgroundColor: "#f8f9fa",
            border: "1px solid #ccc",
          }}
        >
          <h5>Landowner Details</h5>
          <Grid container spacing={2}>
            {/* <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid> */}
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="project-name-label">Project Name</InputLabel>
                <Select
                  labelId="project-name-label"
                  id="project-name-select"
                  value={selectedProject}
                  onChange={handleChange}
                  label="Project Name"
                >
                  <MenuItem value="Project Name 1">Project Name 1</MenuItem>
                  <MenuItem value="Project Name 121">Project Name 121</MenuItem>
                  <MenuItem value="11">11</MenuItem>
                  <MenuItem value="PROJECT NAME">PROJECT NAME</MenuItem>
                  <MenuItem value="Shubh Elara">Shubh Elara</MenuItem>
                  <MenuItem value="Sohan Enterprised">
                    Sohan Enterprised
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/* <Grid item xs={4}><TextField label="Mobile No." fullWidth value={mobileNo}
             onChange={handleMobileChange}
             error={!!mobileError} // Show error state if there is a mobile error
                 helperText={mobileError}
                 /></Grid> */}

            {/* Mobile No. with Validation */}
            <Grid item xs={4}>
              <TextField
                label="Mobile No."
                fullWidth
                value={mobileNo}
                onChange={handleMobileNoChange}
                error={!!mobileError} // Show error if there is a mobileError
                helperText={mobileError} // Display error message if any
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Landowner Name"
                fullWidth
                value={name}
                onChange={handleNameChange}
                error={!!error} // Show error if there is an error message
                helperText={error}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField type="number" label="Age" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Occupation" fullWidth />
            </Grid>
            {/* <Grid item xs={4}><TextField label="Mail ID" fullWidth   onChange={handleEmailChange}/></Grid> */}

            {/* <Grid item xs={4}>
   <TextField
     label="Mail ID"
     fullWidth
     value={email}
     onChange={(e) => handleEmailChange(e)} // pass the correct index if needed
     error={!!emailError} // Show error if there's an error message
     helperText={emailError} // Display error message if any
   />
 </Grid> */}
            <Grid item xs={4}>
              <TextField
                label="Mail ID"
                fullWidth
                // Bind the input value to the `email` state
                onChange={handleEmailChange} // Trigger the handleEmailChange function on input change
                error={!!emailError} // Show error if `emailError` is not an empty string
                helperText={emailError} // Display the error message if there is one
              />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Village" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="District" fullWidth />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Taluka" fullWidth />
            </Grid>
            {/* <Grid item xs={4}><TextField label="Name of Bank" fullWidth /></Grid> */}
            <Grid item xs={4}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="bank-name-label">Name of Bank</InputLabel>
                <Select
                  labelId="bank-name-label"
                  id="bank-name-select"
                  value={selectedBank}
                  onChange={handleBankChange}
                  label="Name of Bank"
                >
                  <MenuItem value="SBI Bank">SBI Bank</MenuItem>
                  <MenuItem value="Bank Of Baroda">Bank Of Baroda</MenuItem>
                  <MenuItem value="Canara Bank">Canara Bank</MenuItem>
                  <MenuItem value="Axis Bank">Axis Bank</MenuItem>
                  <MenuItem value="Bank of India">Bank of India</MenuItem>
                  <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
                  <MenuItem value="HDFC Bank">HDFC Bank</MenuItem>
                  <MenuItem value="Bank of Maharashtra">
                    Bank of Maharashtra
                  </MenuItem>
                  <MenuItem value="Central Bank of India">
                    Central Bank of India
                  </MenuItem>
                  <MenuItem value="Punjab National Bank">
                    Punjab National Bank
                  </MenuItem>
                  <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
                  <MenuItem value="Indian Bank">Indian Bank</MenuItem>
                  <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField label="Bank Address" fullWidth />
            </Grid>

            {/* <Grid item xs={4}><TextField label="Account No." fullWidth /></Grid> */}
            <Grid item xs={4}>
              <TextField
                label="Account No."
                fullWidth
                value={accountNo} // Bind the value of the account number state
                onChange={handleAccountNoChange} // Trigger onChange handler
                error={!!accountNoError} // Show error if there's an accountNoError
                helperText={accountNoError} // Display error message if any
              />
            </Grid>

            {/* <Grid item xs={4}><TextField label="IFSC Code" sx={{
       marginTop: "13px",

     }} fullWidth /></Grid> */}
            <Grid item xs={4}>
              <TextField
                label="IFSC Code"
                fullWidth
                value={ifscCode} // Bind the state value for the IFSC code
                onChange={handleIfscCodeChange} // Handle change and validation
                error={!!ifscCodeError} // Show error if there's an error
                helperText={ifscCodeError} // Display error message if any
              />
            </Grid>

            {/* <Grid item xs={4}><TextField label="Aadhaar No." fullWidth /></Grid>
           <Grid item xs={4}><TextField label="Residential Address" fullWidth /></Grid>
           <Grid item xs={4}><TextField label="PAN No." fullWidth /></Grid>
           <Grid item xs={4}><TextField label="Light Bill" fullWidth /></Grid> */}
            {/* <Grid item xs={4}>
             <TextField type="file" accept="image/*" />
           </Grid> */}

            <Grid item xs={4}>
              <Typography variant="body2" gutterBottom>
                Aadhaar No.
              </Typography>
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }} // Hide the default input
                  id="file-input-aadhaar" // Unique ID for the file input
                  onChange={(e) => handleFileChange(e, "aadhaarFile")} // Handle file selection
                />
                <Button
                  variant="contained"
                  color="light"
                  component="span"
                  // onClick={() => document.getElementById("file-input-aadhaar").click()} // Trigger the file input
                >
                  Choose File
                </Button>
              </label>
              {fileNames.aadhaarFile && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "8px" }}
                >
                  {fileNames.aadhaarFile} {/* Display the selected file name */}
                </Typography>
              )}
            </Grid>

            <Grid item xs={4}>
              <Typography variant="body2" gutterBottom>
                Photo
              </Typography>
              <label>
                <Input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // Hide the default input
                  id="file-input-image" // Unique ID for the file input
                  onChange={(e) => handleFileChange(e, "imageFile")} // Handle file selection
                />
                <Button
                  variant="contained"
                  color="light"
                  component="span"
                  // onClick={() => document.getElementById("file-input-image").click()} // Trigger the file input
                >
                  Choose File
                </Button>
              </label>
              {fileNames.imageFile && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "8px" }}
                >
                  {fileNames.imageFile} {/* Display the selected file name */}
                </Typography>
              )}
            </Grid>

            {/* Residential Address File Upload */}
            <Grid item xs={4} sx={{ marginTop: "6px" }}>
              <Typography variant="body2" gutterBottom>
                Residential Address
              </Typography>
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  id="file-input-address"
                  onChange={(e) => handleFileChange(e, "addressFile")}
                />
                <Button
                  variant="contained"
                  color="light"
                  component="span"
                  // onClick={() => document.getElementById("file-input-address").click()}
                >
                  Choose File
                </Button>
              </label>
              {fileNames.addressFile && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "8px" }}
                >
                  {fileNames.addressFile}
                </Typography>
              )}
            </Grid>

            {/* PAN No. File Upload */}
            <Grid item xs={4} sx={{ marginTop: "6px" }}>
              <Typography variant="body2" gutterBottom>
                PAN No.
              </Typography>
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  id="file-input-pan"
                  onChange={(e) => handleFileChange(e, "panFile")}
                />
                <Button
                  variant="contained"
                  color="light"
                  component="span"
                  // onClick={() => document.getElementById("file-input-pan").click()}
                >
                  Choose File
                </Button>
              </label>
              {fileNames.panFile && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "8px" }}
                >
                  {fileNames.panFile}
                </Typography>
              )}
            </Grid>

            {/* Light Bill File Upload */}
            <Grid item xs={4} sx={{ marginTop: "6px" }}>
              <Typography variant="body2" gutterBottom>
                Light Bill
              </Typography>
              <label>
                <Input
                  type="file"
                  style={{ display: "none" }}
                  id="file-input-lightbill"
                  onChange={(e) => handleFileChange(e, "lightBillFile")}
                />
                <Button
                  variant="contained"
                  color="light"
                  component="span"
                  // onClick={() => document.getElementById("file-input-lightbill").click()}
                >
                  Choose File
                </Button>
              </label>
              {fileNames.lightBillFile && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ marginTop: "8px" }}
                >
                  {fileNames.lightBillFile}
                </Typography>
              )}
            </Grid>
          </Grid>

          {/* <Button
   variant="contained"
   className="mt-3"
   color="success"
   onClick={() => {
     setShowFirmForm(false);
     toast.success("Details are Updated !", { position: "top-right", autoClose: 3000 });
   }}
 >
 Update
 </Button> */}

          <Button
            variant="contained"
            className="mt-3"
            color="success"
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="contained"
            className="mt-3 m-1 btn btn-secondary" // Bootstrap's secondary button style
            onClick={() => setEditRow(false)} // Close the form when clicked
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ACTION
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
                PROJECT NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LANDOWNER NAME
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                AGE
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
                MOBILE NO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                MAIL ID
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                VILLAGE
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                TALUKA
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                DISTRICT
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                RESIDENTIAL ADDRESS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PAN NO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                AADHAAR
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                PHOTO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                LIGHT BILL
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                NAME OF BANK
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                BANK ADDRESS
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                ACCOUNT NO
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                IFSC CODE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((landowner, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "#1976D2",
                          color: "white",
                          borderRadius: "50%",
                          "&:hover": { backgroundColor: "#1565C0" },
                        }}
                        onClick={() => handleEdit(landowner)}
                      >
                        <EditIcon sx={{ fontSize: "18px" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: "red",
                          color: "white",
                          borderRadius: "50%",
                          "&:hover": { backgroundColor: "#b71c1c" },
                        }}
                        onClick={() => handleDelete(index)}
                      >
                        <FaTrash style={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
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
                {/* <TableCell>{landowner.residentialAddress || 'N/A'}</TableCell>
                <TableCell>{landowner.panNo || 'N/A'}</TableCell>
                <TableCell>{landowner.aadhaar || 'N/A'}</TableCell>
                <TableCell>{landowner.photo || 'N/A'}</TableCell>

                <TableCell>{landowner.lightBill || 'N/A'}</TableCell> */}
                <TableCell>
                  <IconButton
                    onClick={() =>
                      window.open(landowner.residentialAddress, "_blank")
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() =>
                      landowner.panNo && window.open(landowner.panNo, "_blank")
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      landowner.aadhaar &&
                      window.open(landowner.aadhaar, "_blank")
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() =>
                      landowner.photo && window.open(landowner.photo, "_blank")
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>

                <TableCell>
                  <IconButton
                    onClick={() =>
                      landowner.lightBill &&
                      window.open(landowner.lightBill, "_blank")
                    }
                    color="primary"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>

                <TableCell>{landowner.bankName || "N/A"}</TableCell>
                <TableCell>{landowner.bankAddress || "N/A"}</TableCell>
                <TableCell>{landowner.accountNo || "N/A"}</TableCell>
                <TableCell>{landowner.ifscCode || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LandownerTable;
