


// import React, { useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton , TablePagination,Grid,TextField,FormControl,
//   InputLabel,Select,MenuItem,Button} from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';

// import { toast } from 'react-toastify'; 

// import VisibilityIcon from '@mui/icons-material/Visibility';


// const FlatAllotment = () => {
//   const [editFlat, setEditFlat] = useState(null);
// const [error, setError] = useState('');
// const [mobileNo, setMobileNo] = useState('');
// const [mobileError, setMobileError] = useState("");
// const [flats, setFlats] = useState(''); 
// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(5);

// // const [formData, setFormData] = useState({
// //     area: "",
// //     wing: "",
// //     flatNumber: "",
// //     flatType: "",
// //   });

//   const [formData, setFormData] = useState({
//     projectName: '',
//     name: '',
//     mobileNo: '',
//     flats: '',
//     area: '',
//     wing: '',
//     flatNumber: '',
//     flatType: ''
//   });

//   const nameData = ["John Doe", "Jane Smith", "Emily Brown"];


//   const handleFlatChange = (event) => {
//     setFlats(event.target.value); // Update flats state on change
//   };

//   const handleEdit = (row) => {
//     if (editFlat === row) {
//       setEditFlat(null); 
//     } else {
//       setEditFlat(row);
//     }
//   };


  
//   const handleChange = (e, label, partnerIndex) => {
//     const { value } = e.target;
  
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));


//     // Update the partners array with the new value for the specific field
//     const updatedPartners = [...partners];
//     updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
//     setPartners(updatedPartners);
  
//     // Apply validation for the 'firmName' field
//     if (label === 'Firm Name') {
//       // Check if the input contains only letters and spaces
//       if (!/^[A-Za-z\s]*$/.test(value)) {
//         setErrors((prev) => ({
//           ...prev,
//           firmName: 'Firm Name should only contain letters and spaces',
//         }));
//       } else {
//         setErrors((prev) => ({
//           ...prev,
//           firmName: '', // Clear the error if valid
//         }));
//       }
//     }
//   };

//   const handleProjectNameChange = (e) => {
//     const { value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       projectName: value
//     }));

//     if (value && formData.name) {
//       const selectedProject = projectData[value];
//       setFormData((prev) => ({
//         ...prev,
//         mobileNo: selectedProject?.mobileNo || '',
//         flats: selectedProject?.flatsAllotted || '',
//         // Optionally populate table fields with default data
//         area: selectedProject?.defaultFlats[0]?.area || '',
//         wing: selectedProject?.defaultFlats[0]?.wing || '',
//         flatNumber: selectedProject?.defaultFlats[0]?.flatNumber || '',
//         flatType: selectedProject?.defaultFlats[0]?.flatType || ''
//       }));
//     }
//   };


//   const handleNameChange = (e) => {
//     const { value } = e.target;

//     // Validate the input to ensure only letters and spaces are allowed
//     if (/[^a-zA-Z\s]/.test(value)) {
//       setError('Name should only contain letters and spaces.');
//     } else {
//       setError(''); // Clear error if valid
//     }

//     setFormData((prev) => ({
//       ...prev,
//       name: value
//     }));

//     // Update mobileNo and flats data dynamically based on the selected name
//     if (formData.projectName && value) {
//       const selectedProject = projectData[formData.projectName];
//       setFormData((prev) => ({
//         ...prev,
//         mobileNo: selectedProject?.mobileNo || '',
//         flats: selectedProject?.flatsAllotted || '',
//         // Optionally populate table fields with default data
//         area: selectedProject?.defaultFlats[0]?.area || '',
//         wing: selectedProject?.defaultFlats[0]?.wing || '',
//         flatNumber: selectedProject?.defaultFlats[0]?.flatNumber || '',
//         flatType: selectedProject?.defaultFlats[0]?.flatType || ''
//       }));
//     }
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

 
//   const projectData = {
//     "Project A": { mobileNo: "1234567890", flatsAllotted: 10, defaultFlats: [{ area: "1000", wing: "A", flatNumber: "101", flatType: "2 BHK" }] },
//     "Project B": { mobileNo: "0987654321", flatsAllotted: 5, defaultFlats: [{ area: "1200", wing: "B", flatNumber: "202", flatType: "3 BHK" }] },
//     "Project C": { mobileNo: "1122334455", flatsAllotted: 20, defaultFlats: [{ area: "800", wing: "C", flatNumber: "303", flatType: "1 BHK" }] },
//   };
//   const data = [
//     {
//       timestamp: '2025-04-01 12:00:00',
//       projectName: 'Sunshine Apartments',
//       landownerName: 'John Doe',
//       age: 45,
//       occupation: 'Businessman',
//       mobileNo: '+1234567890',
//       mailId: 'john.doe@email.com',
//       village: 'Springfield',
//       taluka: 'North Taluka',
//       district: 'Example District',
//     },
   
//   ];

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

  
//   return (
//     <TableContainer component={Paper}>
//       {editFlat ? (
//    <div className="landowner-form mt-4 p-3 border rounded" style={{
//     backgroundColor: "#f8f9fa", 
//     border: "1px solid #ccc", 
   
//   }}>
//     <Grid container spacing={2}>
//       {/* Project Name Dropdown */}
//       <Grid item xs={4}>
//         <TextField
//           label="Project Name"
//           fullWidth
//           value={formData.projectName}
//           onChange={handleProjectNameChange}
//           select
//           SelectProps={{
//             native: true
//           }}
//         >
//           <option value=""></option>
//           {Object.keys(projectData).map((project) => (
//             <option key={project} value={project}>
//               {project}
//             </option>
//           ))}
//         </TextField>
//       </Grid>

//       {/* Name Dropdown with Dummy Data */}
//       <Grid item xs={4}>
//         <TextField
//           label="Name"
//           fullWidth
//           value={formData.name}
//           onChange={handleNameChange}
//           error={!!error}
//           helperText={error}
//           select
//           SelectProps={{
//             native: true
//           }}
//         >
//           <option value=""></option>
//           {nameData.map((name, index) => (
//             <option key={index} value={name}>
//               {name}
//             </option>
//           ))}
//         </TextField>
//       </Grid>

//       {/* Mobile No. */}
//       <Grid item xs={4}>
//         <TextField
//           label="Mobile No."
//           fullWidth
//           value={formData.mobileNo}
//           onChange={handleChange}
//           name="mobileNo"
//           error={!!mobileError}
//           helperText={mobileError}
//         />
//       </Grid>

//       {/* No of Flats Allotted */}
//       <Grid item xs={4}>
//         <TextField
//           label="No of Flats Allotted"
//           fullWidth
//           value={formData.flats}
//           onChange={handleChange}
//           name="flats"
//           error={!!error}
//           helperText={error}
//         />
//       </Grid>
//     </Grid>

//     <h4 className="pt-3">Flat Details</h4>
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ bgcolor: "primary.main" }}>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>RERA CARPET AREA (SQ FT)</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>WING</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>FLAT NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold" }}>TYPE OF FLAT</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           <TableRow>
//             <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//               <TextField
//                 name="area"
//                 value={formData.area}
//                 onChange={handleChange}
//                 label="RERA CARPET AREA (SQ FT)"
//                 fullWidth
//               />
//             </TableCell>
//             <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//               <TextField
//                 name="wing"
//                 value={formData.wing}
//                 onChange={handleChange}
//                 label="WING"
//                 fullWidth
//               />
//             </TableCell>
//             <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//               <TextField
//                 name="flatNumber"
//                 value={formData.flatNumber}
//                 onChange={handleChange}
//                 label="FLAT NO."
//                 fullWidth
//               />
//             </TableCell>
//             <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//               <TextField
//                 name="flatType"
//                 value={formData.flatType}
//                 onChange={handleChange}
//                 label="TYPE OF FLAT"
//                 fullWidth
//               />
//             </TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </TableContainer>

//     <Button
//       variant="contained"
//       className="mt-3 m-1"
//       color="success"
//       onClick={() => {
//         toast.success("Details are updated!", { position: "top-right", autoClose: 3000 });
//         setEditFlat(null); 
//       }}
//     >
//       Update
//     </Button>

//     <Button
//   variant="contained"
//   className="mt-3 m-1 btn btn-secondary" // Bootstrap's secondary button style
//   onClick={() => setEditFlat(false)} // Close the form when clicked
// >
//   Cancel
// </Button>

//   </div>



//       ) : (
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: '#3621a9' }}>
//               <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ACTION</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//       <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>PROJECT NAME</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>FLAT ALOTEE NAME</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>MOBILE NO</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NO. OF FLATS ALLOTED</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>RERA CARPET AREA (SQ FT)</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WING</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
//        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TYPE OF FLAT</TableCell>

//             </TableRow>
//           </TableHead>
//           {/* <TableBody>
//             {data && data.length > 0 ? (
//               data.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Tooltip title="Edit">
//                       <IconButton
//                         size="small"
//                         sx={{
//                           backgroundColor: '#1976D2',
//                           color: 'white',
//                           borderRadius: '50%',
//                           '&:hover': { backgroundColor: '#1565C0' },
//                         }}
//                         onClick={() => handleEdit(row)}
//                       >
//                         <EditIcon sx={{ fontSize: '18px' }} />
//                       </IconButton>
//                     </Tooltip>
//                   </TableCell>
//                   <TableCell>{row.timestamp || 'N/A'}</TableCell>
//                             <TableCell>{row.projectName || 'N/A'}</TableCell>
//            <TableCell>{row.landownerName || 'N/A'}</TableCell>
//            <TableCell>{row.age || 'N/A'}</TableCell>
//            <TableCell>{row.occupation || 'N/A'}</TableCell>
//            <TableCell>{row.mobileNo || 'N/A'}</TableCell>
//            <TableCell>{row.mailId || 'N/A'}</TableCell>
//            <TableCell>{row.village || 'N/A'}</TableCell>
//            <TableCell>{row.taluka || 'N/A'}</TableCell>
//            <TableCell>{row.district || 'N/A'}</TableCell>
//            <TableCell>{row.residentialAddress || 'N/A'}</TableCell>
//            <TableCell>{row.panNo || 'N/A'}</TableCell>
//            <TableCell>{row.addhaar || 'N/A'}</TableCell>
//            <TableCell>{row.photo || 'N/A'}</TableCell>
//            <TableCell>{row.lightBill || 'N/A'}</TableCell>
//            <TableCell>{row.bankName || 'N/A'}</TableCell>
//            <TableCell>{row.bankAddress || 'N/A'}</TableCell>
//            <TableCell>{row.accountNo || 'N/A'}</TableCell>
//            <TableCell>{row.ifscCode || 'N/A'}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={11} style={{ textAlign: 'center' }}>
//                   No data available
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody> */}
//            <TableBody>
//   {data && data.length > 0 ? (
//     data.map((row, index) => (
//       <TableRow key={index}>
//         <TableCell>
//           <Tooltip title="Edit">
//             <IconButton
//               size="small"
//               sx={{ backgroundColor: '#1976D2', color: 'white' }}
//               onClick={() => handleEdit(row)}
//             >
//               <EditIcon />
//             </IconButton>
//           </Tooltip>
//         </TableCell>

//         <TableCell>{row.timestamp}</TableCell>
//         <TableCell>{row.projectName}</TableCell>
//         <TableCell>{row.flatAlloteeName}</TableCell>
//         <TableCell>{row.mobileNo}</TableCell>
//         <TableCell>{row.noOfFlatsAlloted}</TableCell>
//         <TableCell>{row.reraCarpetArea}</TableCell>
//         <TableCell>{row.wing}</TableCell>
//         <TableCell>{row.flatNo}</TableCell>
//         <TableCell>{row.typeOfFlat}</TableCell>

       

//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell colSpan={11} align="center">
//         No Data Found
//       </TableCell>
//     </TableRow>
//   )}
// </TableBody>

//         </Table>
//       )}
//     </TableContainer>
//   );
// };

// export default FlatAllotment;


import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  TablePagination,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { FaTrash } from "react-icons/fa";


const FlatAllotment = () => {
  const [editFlat, setEditFlat] = useState(null);
  const [error, setError] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [flats, setFlats] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [formData, setFormData] = useState({
  //     area: "",
  //     wing: "",
  //     flatNumber: "",
  //     flatType: "",
  //   });

  const [formData, setFormData] = useState({
    projectName: "",
    name: "",
    mobileNo: "",
    flats: "",
    area: "",
    wing: "",
    flatNumber: "",
    flatType: "",
  });

  const nameData = ["John Doe", "Jane Smith", "Emily Brown"];

  const handleFlatChange = (event) => {
    setFlats(event.target.value); // Update flats state on change
  };

  const handleEdit = (row) => {
    if (editFlat === row) {
      setEditFlat(null);
    } else {
      setEditFlat(row);
    }
  };
  const handleDelete = (index) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    toast.success("Row deleted successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };


  const handleChange = (e, label, partnerIndex) => {
    const { value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update the partners array with the new value for the specific field
    const updatedPartners = [...partners];
    updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] =
      value;
    setPartners(updatedPartners);

    // Apply validation for the 'firmName' field
    if (label === "Firm Name") {
      // Check if the input contains only letters and spaces
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          firmName: "Firm Name should only contain letters and spaces",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          firmName: "", // Clear the error if valid
        }));
      }
    }
  };

  const handleProjectNameChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      projectName: value,
    }));

    if (value && formData.name) {
      const selectedProject = projectData[value];
      setFormData((prev) => ({
        ...prev,
        mobileNo: selectedProject?.mobileNo || "",
        flats: selectedProject?.flatsAllotted || "",
        // Optionally populate table fields with default data
        area: selectedProject?.defaultFlats[0]?.area || "",
        wing: selectedProject?.defaultFlats[0]?.wing || "",
        flatNumber: selectedProject?.defaultFlats[0]?.flatNumber || "",
        flatType: selectedProject?.defaultFlats[0]?.flatType || "",
      }));
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;

    // Validate the input to ensure only letters and spaces are allowed
    if (/[^a-zA-Z\s]/.test(value)) {
      setError("Name should only contain letters and spaces.");
    } else {
      setError(""); // Clear error if valid
    }

    setFormData((prev) => ({
      ...prev,
      name: value,
    }));

    // Update mobileNo and flats data dynamically based on the selected name
    if (formData.projectName && value) {
      const selectedProject = projectData[formData.projectName];
      setFormData((prev) => ({
        ...prev,
        mobileNo: selectedProject?.mobileNo || "",
        flats: selectedProject?.flatsAllotted || "",
        // Optionally populate table fields with default data
        area: selectedProject?.defaultFlats[0]?.area || "",
        wing: selectedProject?.defaultFlats[0]?.wing || "",
        flatNumber: selectedProject?.defaultFlats[0]?.flatNumber || "",
        flatType: selectedProject?.defaultFlats[0]?.flatType || "",
      }));
    }
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

  const projectData = {
    "Project A": {
      mobileNo: "1234567890",
      flatsAllotted: 10,
      defaultFlats: [
        { area: "1000", wing: "A", flatNumber: "101", flatType: "2 BHK" },
      ],
    },
    "Project B": {
      mobileNo: "0987654321",
      flatsAllotted: 5,
      defaultFlats: [
        { area: "1200", wing: "B", flatNumber: "202", flatType: "3 BHK" },
      ],
    },
    "Project C": {
      mobileNo: "1122334455",
      flatsAllotted: 20,
      defaultFlats: [
        { area: "800", wing: "C", flatNumber: "303", flatType: "1 BHK" },
      ],
    },
  };
  // const data = [
  //   {
  //     timestamp: "2025-04-01 12:00:00",
  //     projectName: "Sunshine Apartments",
  //     landownerName: "John Doe",
  //     age: 45,
  //     occupation: "Businessman",
  //     mobileNo: "+1234567890",
  //     mailId: "john.doe@email.com",
  //     village: "Springfield",
  //     taluka: "North Taluka",
  //     district: "Example District",
  //   },
  // ];
  const [rows, setRows] = useState([
    {
      timestamp: "2025-04-01 12:00:00",
      projectName: "Sunshine Apartments",
      flatAlloteeName: "John Doe",
      mobileNo: "+1234567890",
      noOfFlatsAlloted: 2,
      reraCarpetArea: "1000",
      wing: "A",
      flatNo: "101",
      typeOfFlat: "2 BHK",
    },
  ]);


  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      {editFlat ? (
        <div
          className="landowner-form mt-4 p-3 border rounded"
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ccc",
          }}
        >
          <Grid container spacing={2}>
            {/* Project Name Dropdown */}
            <Grid item xs={4}>
              <TextField
                label="Project Name"
                fullWidth
                value={formData.projectName}
                onChange={handleProjectNameChange}
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {Object.keys(projectData).map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Name Dropdown with Dummy Data */}
            <Grid item xs={4}>
              <TextField
                label="Name"
                fullWidth
                value={formData.name}
                onChange={handleNameChange}
                error={!!error}
                helperText={error}
                select
                SelectProps={{
                  native: true,
                }}
              >
                <option value=""></option>
                {nameData.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Mobile No. */}
            <Grid item xs={4}>
              <TextField
                label="Mobile No."
                fullWidth
                value={formData.mobileNo}
                onChange={handleChange}
                name="mobileNo"
                error={!!mobileError}
                helperText={mobileError}
              />
            </Grid>

            {/* No of Flats Allotted */}
            <Grid item xs={4}>
              <TextField
                label="No of Flats Allotted"
                fullWidth
                value={formData.flats}
                onChange={handleChange}
                name="flats"
                error={!!error}
                helperText={error}
              />
            </Grid>
          </Grid>

          <h4 className="pt-3">Flat Details</h4>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "primary.main" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    RERA CARPET AREA (SQ FT)
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    WING
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    FLAT NO.
                  </TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                    TYPE OF FLAT
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    <TextField
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      label="RERA CARPET AREA (SQ FT)"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    <TextField
                      name="wing"
                      value={formData.wing}
                      onChange={handleChange}
                      label="WING"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    <TextField
                      name="flatNumber"
                      value={formData.flatNumber}
                      onChange={handleChange}
                      label="FLAT NO."
                      fullWidth
                    />
                  </TableCell>
                  <TableCell sx={{ color: "black", fontWeight: "bold" }}>
                    <TextField
                      name="flatType"
                      value={formData.flatType}
                      onChange={handleChange}
                      label="TYPE OF FLAT"
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            className="mt-3 m-1"
            color="success"
            onClick={() => {
              toast.success("Details are updated!", {
                position: "top-right",
                autoClose: 3000,
              });
              setEditFlat(null);
            }}
          >
            Update
          </Button>

          <Button
            variant="contained"
            className="mt-3 m-1 btn btn-secondary" // Bootstrap's secondary button style
            onClick={() => setEditFlat(false)} // Close the form when clicked
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>
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
                FLAT ALOTEE NAME
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
                NO. OF FLATS ALLOTED
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                RERA CARPET AREA (SQ FT)
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                WING
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                FLAT NO.
              </TableCell>
              <TableCell
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                TYPE OF FLAT
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {data && data.length > 0 ? (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        size="small"
                        sx={{
                          backgroundColor: '#1976D2',
                          color: 'white',
                          borderRadius: '50%',
                          '&:hover': { backgroundColor: '#1565C0' },
                        }}
                        onClick={() => handleEdit(row)}
                      >
                        <EditIcon sx={{ fontSize: '18px' }} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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
                <TableCell colSpan={11} style={{ textAlign: 'center' }}>
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody> */}
          <TableBody>
            {/* {data && data.length > 0 ? (
              data.map((row, index) => ( */}
            {rows.length > 0 ? (
              rows.map((row, index) => (
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
                          onClick={() => handleEdit(row)}
                        >
                          <EditIcon />
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

                  <TableCell>{row.timestamp}</TableCell>
                  <TableCell>{row.projectName}</TableCell>
                  <TableCell>{row.flatAlloteeName}</TableCell>
                  <TableCell>{row.mobileNo}</TableCell>
                  <TableCell>{row.noOfFlatsAlloted}</TableCell>
                  <TableCell>{row.reraCarpetArea}</TableCell>
                  <TableCell>{row.wing}</TableCell>
                  <TableCell>{row.flatNo}</TableCell>
                  <TableCell>{row.typeOfFlat}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No Data Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default FlatAllotment;
