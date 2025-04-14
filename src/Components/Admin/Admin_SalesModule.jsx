


// import React, { useState ,useEffect} from "react";
// import { FaPlus } from "react-icons/fa";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton ,Box} from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
// import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl,NativeSelect } from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
// import jsPDF from "jspdf";
// import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// import { FaFileDownload } from "react-icons/fa";
// import autoTable from "jspdf-autotable";

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

// const Admin_SalesModule = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [openEditModal, setOpenEditModal] = useState(false);
// const [editRowData, setEditRowData] = useState({});
// const [editIndex, setEditIndex] = useState(null);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     designation: "",
//     joiningDate: "",
//     status: "Active",
//   });
//   // const [salesPersons, setSalesPersons] = useState([]); 
//   const [salesPersons, setSalesPersons] = useState([
//     {
//       name: '',
//       email: '',
//       mobile: '',
//       designation: '',
//       joiningDate: '',
//       status: '',
//     },
    
//   ]);
//   const [emailError, setEmailError] = useState(''); 
//   const [nameError, setNameError] = useState(''); 
//   const [error, setError] = useState({
//     mobile: '',
    
//   });
//   const handleAddNew = () => {
//     setShowForm(true);
//   };

  

  





// const handleChange = (e) => {
//   const { name, value } = e.target;

//   console.log(`Handling change for ${name}: ${value}`); 

 
//   if (name === "name") {
//     const regex = /^[A-Za-z\s]*$/;  
//     if (regex.test(value) || value === "") {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//       setNameError(''); 
//     } else {
//       setNameError("Invalid input: Only letters and spaces are allowed in Name.");
//     }
//   }

  
//   else if (name === "mobile") {
//     const regex = /^[0-9]*$/;  
//     let errorMessage = '';

    
//     if (!regex.test(value) && value.length > 0) {
//       errorMessage = "Invalid input: Only digits are allowed in Mobile.";
//     } else if (value.length > 10) {
//       errorMessage = "Invalid input: Please enter a valid 10-digit mobile number.";
//     } else if (value.length < 10 && value.length > 0) {
//       errorMessage = "Mobile number must be 10 digits.";
//     }

//     setError((prevErrors) => ({
//       ...prevErrors,
//       [name]: errorMessage,
//     }));

//     // Update state with value regardless of the validation (allow user to keep typing)
//     console.log("Updating:", name, "to:", value);
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
      
      
//     }));
//   }

 

//   else if (name === "email") {
//     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
//     const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,  // Always update the input value
//     }));
  
//     if (!emailRegex.test(value) && value.length > 0) {
//       setEmailError("Invalid email format: Please enter a valid email address.");
//     } else {
//       setEmailError("");  
//     }
//   }
//   // Handle other fields (Designation, Joining Date, etc.)
//   else {
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   }
// };


// const handleEmailBlur = () => {
//   const email = formData.email;
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Basic email validation regex

//   // If the email is invalid, show the error message in the form
//   if (email && !emailRegex.test(email)) {
//     console.log("invalid email");
//     setEmailError("Invalid email: Please enter a valid email address.");
//   } else {
//     setEmailError(''); // Clear error if the email is valid
//   }
// };
  
//   useEffect(() => {
//     if (showForm) {
  
//       setFormData({
//         name: "",
//         email: "",
//         mobile: "",
//         designation: "",
//         joiningDate: "",
//         status: "Active",
//       });
//     }
//   }, [showForm]); 

  


//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     if (editIndex !== null) {
//       // Update Mode
//       const updatedData = [...salesPersons];
//       updatedData[editIndex] = formData;  // Replace old data with updated formData
//       setSalesPersons(updatedData);
//       setEditIndex(null);  // Reset to Add mode
//     } else {
//       // Add Mode
//       setSalesPersons([...salesPersons, formData]);
//     }
  
//     setShowForm(false);
  
//     setFormData({
//       name: "",
//       email: "",
//       mobile: "",
//       designation: "",
//       joiningDate: "",
//       status: "",
//     });
  
//     toast.success("Data submitted successfully");
//   };
  
//   const handleCancel = () => {
//     setShowForm(false); 
//   };

//   const handleDownloadPDFSales = () => {

//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Sales Person Report", 14, 15);
  
//     const tableColumn = [
//       "Name", "Email", "Mobile", "Designation", "Joining Date", "Status"
//     ];
  
//     const tableRows = salesPersons.map(row => [
//       row.name || "-",
//       row.email || "-",
//       row.mobile || "-",
//       row.designation || "-",
//       row.joiningDate || "-",
//       row.status || "-"
//     ]);
  
//     console.log("Formatted Table Rows:", tableRows);
  
//     autoTable(doc, {
//       startY: 25,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//     });
  
//     doc.save("SalesPerson_Report.pdf");
//   };
  
  
  
//   const handleEdit = (row) => {
//     setEditRowData(row);  // Pass that row data
//     setFormData(row);
//     setOpenEditModal(true); // Open Modal


//     setEditIndex(index);   
//   };
//   const handleSaveEdit = () => {
//     // Update your main data here
//     const updatedData = [...yourData];  // yourData = main table data array
//     updatedData[editRowIndex] = editRowData;
  
//     setYourData(updatedData);
//     setOpenEditModal(false);
//   };
  
//   const handleDelete = (id) => {
//     toast.info(
//       <div>
//         <p>Are you sure you want to delete?</p>
//         <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//           <button
//             onClick={() => {
//               deleteRow(id);
//               toast.dismiss();  // Close toast after action
//             }}
//             style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
//           >
//             Yes
//           </button>
//           <button
//             onClick={() => toast.dismiss()}
//             style={{ background: "grey", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
//           >
//             No
//           </button>
//         </div>
//       </div>,
//       {
//         position: "top-center",
//         autoClose: false,
//         closeOnClick: false,
//         draggable: false,
//       }
//     );
//   };
  
//   const deleteRow = (id) => {
//     const updatedData = salesPersons.filter((person) => person.id !== id);
//     setSalesPersons(updatedData);
  
//     toast.success("Row deleted successfully!", {
//       position: "top-center",
//       autoClose: 1500,
//     });
//   };
//   return (
//     <div className="container my-4">
//       <div className="row mb-3">
//         <div className="col-md-6 d-flex flex-column align-items-start">
//           <h2 className="mb-3 fs-6">Admin Module / Sales Person Management</h2>
//           {!showForm && (
//             <div className="d-flex gap-3">
//             <button className="btn btn-primary d-flex align-items-center" onClick={handleAddNew} style={{ background: '#272ba8' }} >
//               <FaPlus className="me-2"  />
//               Add Sales Person
//             </button>

//             <Button
//     variant="contained"
//     sx={{
//       background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center",  // Align icon and text
//       gap: "8px",  // Space between icon and text
//       "&:hover": {
//         background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//       },
     
//     }}
//     // onClick={() => handledow(firms)}
//     onClick={handleDownloadPDFSales}
//   >
//     <FaFileDownload size={18} />  {/* Added download icon */}
//     Download PDF
//   </Button>
//             </div>
//           )}
//         </div>
//         {!showForm && (
//           <div className="col-md-6 d-flex justify-content-end align-items-center">
//             <input type="text" className="form-control w-50" placeholder="Search..." />
//           </div>
//         )}
//       </div>



// {showForm && (
//   <div
//     className="modal"
//     style={{
//       display: showForm ? "block" : "none",
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       zIndex: 9999,
//     }}
//   >
//     {/* Modal Content */}
//     <div
//       className="modal-dialog modal-lg"
//       style={{
//         position: "relative",
//         margin: "auto",
//         top: "50%",
//         transform: "translateY(-50%)",
//       }}
//     >
//       <div
//         className="modal-content p-3"
//         style={{
//           boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
//           borderRadius: "10px",
//         }}
//       >
      
//         <div
//           className="modal-header bg-primary text-white"
//           style={{
//             borderTopLeftRadius: "10px",
//             borderTopRightRadius: "10px",
//           }}
//         >
//           <h5 className="modal-title">Add New Sales Person</h5>
//           <button type="button" className="btn-close" onClick={handleCancel} ></button>
//         </div>

       
//         <div className="modal-body">
//           <div className="container">
//             <div
//               className="p-3"
//               style={{
//                 border: "1px solid #ddd",
//                 borderRadius: "8px",
//                 backgroundColor: "white",
//               }}
//             >
//               <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={6}>
//                     <TextField
//                       label="Name"
//                       fullWidth
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       sx={{ marginTop: '10px' }} 
//                       // helperText="* Required"
//                     />
//                       {/* Display the error message below the name input */}
//         {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
//                   </Grid>

                  
//                   <Grid item xs={6}>
//   <TextField
//     label="Email"
//     fullWidth
//     type="email"
//     name="email"
//     value={formData.email}  
//     onChange={handleChange}  
//     onBlur={handleEmailBlur}  
//     required
//     sx={{ marginTop: '10px' }}
//   />
//   {emailError && <p style={{ color: 'red' }}>{emailError}</p>}  
// </Grid>

//                   <Grid item xs={6}>
//                     <TextField
//                       label="Mobile"
//                       fullWidth
//                       name="mobile"
//                       value={formData.mobile}
//                       onChange={handleChange}
//                       onBlur={handleEmailBlur}
//                       required
//                       // helperText="* Required"
//                       sx={{ marginTop: '10px' }} 
//                     />
                    
//                       {error.mobile && <p style={{ color: 'red' }}>{error.mobile}</p>}
//                   </Grid>
                 


//                   <Grid item xs={6}>
//                     <TextField
//                       label="Designation"
//                       fullWidth
//                       name="designation"
//                       value={formData.designation}
//                       onChange={handleChange}
//                       sx={{ marginTop: '10px' }} 
//                     />
//                   </Grid>

                 
// <Grid item xs={6}>
//   <TextField
//     label="Joining Date"
//     fullWidth
//     type="date"
//     name="joiningDate"
//     value={formData.joiningDate}
//     onChange={handleChange}
//     sx={{ marginTop: '10px' }} 
//     InputLabelProps={{
//       shrink: true,
//     }}
//   />
// </Grid>

//                   <Grid item xs={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         label="Status"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                         sx={{ marginTop: '10px' }} 
//                       >
//                         <MenuItem value="Active">Active</MenuItem>
//                         <MenuItem value="Inactive">Inactive</MenuItem>
//                       </Select>
//                     </FormControl>
    
   

//                   </Grid>
//                 </Grid>

               
//                 <div className="d-flex gap-2 justify-content-center mt-4">
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     color="success"
//                     onClick={handleSubmit}
//                   >
//                     Submit
//                   </Button>
//                   <Button
//                     type="button"
//                     variant="outlined"
//                     color="secondary"
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )}

//       {/* Sales Person Table */}
//       {!showForm && (
//         <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
//           <Table>
//             <TableHead >
//               {/* <TableRow> */}
//                <TableRow sx={{background:"#3621a9"}}>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>NAME</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>EMAIL</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>MOBILE</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>DESIGNATION</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>JOINING DATE</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {salesPersons.map((person, index) => (
//                 <TableRow key={index}>
                 
// <TableCell>
//   <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    
   
// <IconButton
//   color="primary"
//   style={{
//     backgroundColor: "#1976d2",
//     borderRadius: "50%",
//     padding: "6px",
//   }}
//   onClick={() => handleEdit(person)}   // Correct this line
// >
//   <EditIcon style={{ color: "white" }} />
// </IconButton>


// {/* 
//     <IconButton
//       color="error"
//       style={{
//         backgroundColor: "#d32f2f", 
//         borderRadius: "50%", 
//         padding: "6px", 
//       }}
//     >
//       <DeleteIcon style={{ color: "white" }} /> 
//     </IconButton> */}

// <IconButton
//             color="error"
//             style={{
//               backgroundColor: "#d32f2f",
//               borderRadius: "50%",
//               padding: "6px",
//             }}
//             onClick={() => handleDelete(person.id)}  // Delete
//           >
//             <DeleteIcon style={{ color: "white" }} />
//           </IconButton>
//   </div>
// </TableCell>

//                   <TableCell>{person.name}</TableCell>
//                   <TableCell>{person.email}</TableCell>
//                   <TableCell>{person.mobile}</TableCell>
//                   <TableCell>{person.designation}</TableCell>
//                   <TableCell>{person.joiningDate}</TableCell>
//                   <TableCell>{person.status}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}



// <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth maxWidth="sm">
//   <DialogTitle>Edit Details</DialogTitle>

//   <DialogContent>
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
        
//         <Grid item xs={6}>
//           <TextField
//             label="Name"
//             fullWidth
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             sx={{ marginTop: '10px' }}
//           />
//           {nameError && <p style={{ color: 'red', margin: 0 }}>{nameError}</p>}
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             label="Email"
//             fullWidth
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             onBlur={handleEmailBlur}
//             required
//             sx={{ marginTop: '10px' }}
//           />
//           {emailError && <p style={{ color: 'red', margin: 0 }}>{emailError}</p>}
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             label="Mobile"
//             fullWidth
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             required
//             sx={{ marginTop: '10px' }}
//           />
//           {error.mobile && <p style={{ color: 'red', margin: 0 }}>{error.mobile}</p>}
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             label="Designation"
//             fullWidth
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             sx={{ marginTop: '10px' }}
//           />
//         </Grid>
                 
       
// <LocalizationProvider dateAdapter={AdapterDayjs}>
//   <Grid item xs={6}>
//     <DatePicker
//       label="Joining Date"
//       value={dayjs(formData.joiningDate)}
//       onChange={(newValue) => {
//         setFormData({ ...formData, joiningDate: dayjs(newValue).format('YYYY-MM-DD') });
//       }}
//       renderInput={(params) => (
//         <TextField 
//           {...params} 
//           fullWidth 
//           sx={{marginTop :"20px"}}   // Top padding 8px
//           error={false}    // Red border hatane ke liye
//         />
//       )}
//     />
//   </Grid>
// </LocalizationProvider>



//                   <Grid item xs={6}>
//                     <FormControl fullWidth>
//                       <InputLabel>Status</InputLabel>
//                       <Select
//                         label="Status"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                         sx={{ marginTop: '10px' }} 
//                       >
//                         <MenuItem value="Active">Active</MenuItem>
//                         <MenuItem value="Inactive">Inactive</MenuItem>
//                       </Select>
//                     </FormControl>
    
   

//                   </Grid>
//       </Grid>

//       <DialogActions sx={{ marginTop: '20px' }}>
//         <Button onClick={() => setOpenEditModal(false)} color="secondary">
//           Cancel
//         </Button>
//         <Button  onClick ={() => setOpenEditModal(false)} type="submit" variant="contained" color="primary">
//           Update
//         </Button>
//       </DialogActions>
//     </form>
//   </DialogContent>
// </Dialog>



// <ToastContainer />
// </div>

  
//   );
// };
 

// export default Admin_SalesModule;

import React, { useState ,useEffect} from "react";
import { FaPlus } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton ,Box} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl,NativeSelect } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import jsPDF from "jspdf";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Admin_SalesModule = () => {
  const [showForm, setShowForm] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

const [editRowData, setEditRowData] = useState({});

const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    joiningDate: "",
    status: "Active",
  });
  // const [salesPersons, setSalesPersons] = useState([]); 
  const [salesPersons, setSalesPersons] = useState([
    {
      name: '',
      email: '',
      mobile: '',
      designation: '',
      joiningDate: '',
      status: '',
    },
    
  ]);
  const [emailError, setEmailError] = useState(''); 
  const [nameError, setNameError] = useState(''); 
  const [error, setError] = useState({
    mobile: '',
    
  });
  const handleAddNew = () => {
    setShowForm(true);
  };

  

  





const handleChange = (e) => {
  const { name, value } = e.target;

  console.log(`Handling change for ${name}: ${value}`); 

 
  if (name === "name") {
    const regex = /^[A-Za-z\s]*$/;  
    if (regex.test(value) || value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setNameError(''); 
    } else {
      setNameError("Invalid input: Only letters and spaces are allowed in Name.");
    }
  }

  
  else if (name === "mobile") {
    const regex = /^[0-9]*$/;  
    let errorMessage = '';

    
    if (!regex.test(value) && value.length > 0) {
      errorMessage = "Invalid input: Only digits are allowed in Mobile.";
    } else if (value.length > 10) {
      errorMessage = "Invalid input: Please enter a valid 10-digit mobile number.";
    } else if (value.length < 10 && value.length > 0) {
      errorMessage = "Mobile number must be 10 digits.";
    }

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    
    console.log("Updating:", name, "to:", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      
      
    }));
  }

 

  else if (name === "email") {

    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  
    }));
  
    if (!emailRegex.test(value) && value.length > 0) {
      setEmailError("Invalid email format: Please enter a valid email address.");
    } else {
      setEmailError("");  
    }
  }
  
  else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
};


const handleEmailBlur = () => {
  const email = formData.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  

  
  if (email && !emailRegex.test(email)) {
    console.log("invalid email");
    setEmailError("Invalid email: Please enter a valid email address.");
  } else {
    setEmailError(''); 
  }
};
  
  useEffect(() => {
    if (showForm) {
  
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        joiningDate: "",
        status: "Active",
      });
    }
  }, [showForm]); 

  



  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (editIndex !== null) {
     
      const updatedData = [...salesPersons];
      updatedData[editIndex] = formData;  
      setSalesPersons(updatedData);
      setEditIndex(null);  
    } else {
      
      setSalesPersons([...salesPersons, formData]);
    }
  
    console.log("Form Data:", formData);
    setShowForm(false); 
  
   
    setFormData({
      name: "",   
      email: "",
      mobile: "",
      designation: "",
      joiningDate: "",
      status: "",
    });
  
    toast.success("Updated successfully");
    setOpenEditModal(false);
  };
  
  
  const handleCancel = () => {
    setShowForm(false); 
  };

  const handleDownloadPDFSales = () => {

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Sales Person Report", 14, 15);
  
    const tableColumn = [
      "Name", "Email", "Mobile", "Designation", "Joining Date", "Status"
    ];
  
    const tableRows = salesPersons.map(row => [
      row.name || "-",
      row.email || "-",
      row.mobile || "-",
      row.designation || "-",
      row.joiningDate || "-",
      row.status || "-"
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("SalesPerson_Report.pdf");
  };
  
  
  
 
  const handleEdit = (person, index) => {
    console.log("Selected Row:", person);
    console.log("Selected Index:", index);  
  
    setFormData(person);
    setEditIndex(index);
    setOpenEditModal(true);
    
  };
  
  
  const handleSaveEdit = () => {
    const updatedData = [...salesPersons];  
    updatedData[editIndex] = formData;  
  
    setSalesPersons(updatedData);  
    setOpenEditModal(false);  
    toast.success(" updated successfully");
    setOpenEditModal(false);
  };
  
  
  
  const handleDelete = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete?</p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button
            onClick={() => {
              deleteRow(id);
              toast.dismiss();  
            }}
            style={{ background: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{ background: "grey", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };
  
 

  const deleteRow = (indexToDelete) => {
    const updatedData = salesPersons.filter((_, index) => index !== indexToDelete);
    setSalesPersons(updatedData);
  
    toast.success("Row deleted successfully!", {
      position: "top-center",
      autoClose: 1500,
    });
  };
  
  return (
    <div className="container my-4">
      <div className="row mb-3">
        <div className="col-md-6 d-flex flex-column align-items-start">
          <h2 className="mb-3 fs-6">Admin Module / Sales Person Management</h2>
          {!showForm && (
            <div className="d-flex gap-3">
            <button className="btn btn-primary d-flex align-items-center" onClick={handleAddNew} style={{ background: '#272ba8' }} >
              <FaPlus className="me-2"  />
              Add Sales Person
            </button>

            <Button
    variant="contained"
    sx={{
      background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
      color: "white",
      fontWeight: "bold",
      textTransform: "none",
      padding: "8px 16px",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",  
      gap: "8px",  
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
  
    onClick={handleDownloadPDFSales}
  >
    <FaFileDownload size={18} /> 
    Download PDF
  </Button>
            </div>
          )}
        </div>
        {!showForm && (
          <div className="col-md-6 d-flex justify-content-end align-items-center">
            <input type="text" className="form-control w-50" placeholder="Search..." />
          </div>
        )}
      </div>



{showForm && (
  <div
    className="modal"
    style={{
      display: showForm ? "block" : "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    }}
  >
   
    <div
      className="modal-dialog modal-lg"
      style={{
        position: "relative",
        margin: "auto",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <div
        className="modal-content p-3"
        style={{
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          borderRadius: "10px",
        }}
      >
      
        <div
          className="modal-header bg-primary text-white"
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <h5 className="modal-title">Add New Sales Person</h5>
          <button type="button" className="btn-close" onClick={handleCancel} ></button>
        </div>

       
        <div className="modal-body">
          <div className="container">
            <div
              className="p-3"
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "white",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Name"
                      fullWidth
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      sx={{ marginTop: '10px' }} 
                    
                    />
                 
        {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                  </Grid>

                  
                  <Grid item xs={6}>
  <TextField
    label="Email"
    fullWidth
    type="email"
    name="email"
    value={formData.email}  
    onChange={handleChange}  
    onBlur={handleEmailBlur}  
    required
    sx={{ marginTop: '10px' }}
  />
  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}  
</Grid>

                  <Grid item xs={6}>
                    <TextField
                      label="Mobile"
                      fullWidth
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                      required
                     
                      sx={{ marginTop: '10px' }} 
                    />
                    
                      {error.mobile && <p style={{ color: 'red' }}>{error.mobile}</p>}
                  </Grid>
                 


                  <Grid item xs={6}>
                    <TextField
                      label="Designation"
                      fullWidth
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      sx={{ marginTop: '10px' }} 
                    />
                  </Grid>

                 
<Grid item xs={6}>
  <TextField
    label="Joining Date"
    fullWidth
    type="date"
    name="joiningDate"
    value={formData.joiningDate}
    onChange={handleChange}
    sx={{ marginTop: '10px' }} 
    InputLabelProps={{
      shrink: true,
    }}
  />
</Grid>

                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        sx={{ marginTop: '10px' }} 
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
    
   

                  </Grid>
                </Grid>

               
                <div className="d-flex gap-2 justify-content-center mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                  <Button
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

   
      {!showForm && (
        <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead >
              
               <TableRow sx={{background:"#3621a9"}}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ACTION</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>NAME</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>EMAIL</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>MOBILE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>DESIGNATION</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>JOINING DATE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              </TableRow>
            </TableHead>
           


    <TableBody>
      {salesPersons.map((person, index) => {
        console.log("Mapping index:", index);  

        return (
          <TableRow key={index}>
            <TableCell>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
             
                  <IconButton
                    color="primary"
                    style={{
                      backgroundColor: "#1976d2",
                      borderRadius: "50%",
                      padding: "6px",
                    }}
                    onClick={() => handleEdit(person, index)}    
                    
                  >
                    <EditIcon style={{ color: "white" }} />
                  </IconButton>

              
                <IconButton
                  color="error"
                  style={{
                    backgroundColor: "#d32f2f",
                    borderRadius: "50%",
                    padding: "6px",
                  }}
                  onClick={() => handleDelete(index)}  // Delete using person.id
                >
                  <DeleteIcon style={{ color: "white" }} />
                </IconButton>
              </div>
            </TableCell>

       
            <TableCell>{person.name}</TableCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.mobile}</TableCell>
            <TableCell>{person.designation}</TableCell>
            <TableCell>{person.joiningDate}</TableCell>
            <TableCell>{person.status}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>

          </Table>
        </TableContainer>
      )}



<Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} fullWidth maxWidth="sm">
  <DialogTitle>Edit Details</DialogTitle>

  <DialogContent>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ marginTop: '10px' }}
          />
          {nameError && <p style={{ color: 'red', margin: 0 }}>{nameError}</p>}
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Email"
            fullWidth
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            required
            sx={{ marginTop: '10px' }}
          />
          {emailError && <p style={{ color: 'red', margin: 0 }}>{emailError}</p>}
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Mobile"
            fullWidth
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            sx={{ marginTop: '10px' }}
          />
          {error.mobile && <p style={{ color: 'red', margin: 0 }}>{error.mobile}</p>}
        </Grid>

        <Grid item xs={6}>
          <TextField
            label="Designation"
            fullWidth
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            sx={{ marginTop: '10px' }}
          />
        </Grid>
                 
       
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <Grid item xs={6}>
    <DatePicker
      label="Joining Date"
      value={dayjs(formData.joiningDate)}
      onChange={(newValue) => {
        setFormData({ ...formData, joiningDate: dayjs(newValue).format('YYYY-MM-DD') });
      }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          fullWidth 
          sx={{marginTop :"20px"}}   
          error={false}    
        />
      )}
    />
  </Grid>
</LocalizationProvider>



                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        sx={{ marginTop: '10px' }} 
                      >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                      </Select>
                    </FormControl>
    
   

                  </Grid>
      </Grid>

      <DialogActions sx={{ marginTop: '20px' }}>
        <Button onClick={() => setOpenEditModal(false)} color="secondary">
          Cancel
        </Button>
       
        <Button type="submit" variant="contained" color="primary">
  Update
</Button>

      </DialogActions>
    </form>
  </DialogContent>
</Dialog>



<ToastContainer />
</div>

  
  );
};
 

export default Admin_SalesModule;