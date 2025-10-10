// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Paper,
//   IconButton,
//   Tooltip,
//   TablePagination,
//   Input,
//   TextField,
//   Button,
//   Typography,
//   Grid,
// } from "@mui/material";
// import { Edit, Visibility } from "@mui/icons-material";
// import EditIcon from "@mui/icons-material/Edit";
// import {
//   FaEye,
//   FaBuilding,
//   FaFileDownload,
//   FaPlus,
//   FaTrash,
//   FaUpload,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Constants from "../Constants";
// const FirmTable = () => {
//   const [firmName, setFirmName] = useState("");
//   const [firmNameError, setFirmNameError] = useState("");
//   const [firmPan, setFirmPan] = useState("");
//   const [firmPanError, setFirmPanError] = useState("");
//   const [selectedTab, setSelectedTab] = useState("firm");
//   const [error, setError] = useState("");
//   const [name, setName] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [nameError, setNameError] = useState("");
//   const [mobileNoError, setMobileNoError] = useState("");
//   const [panError, setPanError] = useState("");
//   const [ageError, setAgeError] = useState("");
//   const [occupationError, setOccupationError] = useState("");
//   const [mobileError, setMobileError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [firmData, setFirmData] = useState([]);
//   const [showFirmForm, setShowFirmForm] = useState(false);
//   const [aadhaarError, setAadhaarError] = useState(false);
//   const [aadhaarErrorMessage, setAadhaarErrorMessage] = useState("");

//   const [page, setPage] = useState(0);
//   const rowsPerPage = 8; 


//   const [fileNames, setFileNames] = useState({
//     firmPanNoDocument: "",
//     firmGstNoDocument: "",
//     firmLightBillForAddressProof: "",
//     partners: [],
//   });

//   const [partners, setPartners] = useState([
//     {
//       name: "",
//       age: "",
//       occupation: "",
//       mobile: "",
//       email: "",
//       address: "",
//       pan: "",
//       aadhaar: "",
//     },
//   ]);

//   useEffect(() => {
//     console.log("Updated Selected Tab:", selectedTab);
//     loadLoansData();
//   }, []);

//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoans(data);
//   };

//   const [firms, setFirms] = useState([
//     {
//       id: 1,
//       timestamp: "2025-03-31 12:00 PM",
//       name: "ABC Pvt. Ltd.",
//       address: "123 Street, City, State",
//       firmPan: "path/to/firm-pan.pdf",
//       firmGst: "path/to/firm-gst.pdf",
//       firmLightBill: "path/to/firm-light-bill.pdf",
//       residentialAddress: "456 Residence, City, State",
//       panNo: "AABCF1234X",
//       aadhaarNo: "1234-5678-9101",
//       photo: "path/to/photo.jpg",
//       lightBill: "path/to/light-bill.pdf",
//     },
//     {
//       id: 2,
//       timestamp: "2025-03-30 02:30 PM",
//       name: "XYZ Enterprises",
//       address: "789 Avenue, City, State",
//       firmPan: "path/to/firm-pan2.pdf",
//       firmGst: "path/to/firm-gst2.pdf",
//       firmLightBill: "path/to/firm-light-bill2.pdf",
//       residentialAddress: "123 Residence, City, State",
//       panNo: "XYZAB1234P",
//       aadhaarNo: "9876-5432-1011",
//       photo: "path/to/photo2.jpg",
//       lightBill: "path/to/light-bill2.pdf",
//     },
//   ]);

//   const [editFirm, setEditFirm] = useState(null);

//   const handleEdit = (firm) => {
//     setEditFirm(firm);
//   };
//   const handleDelete = (id) => {
//     setFirms((prev) => prev.filter((firm) => firm.id !== id));
//      toast.success("Row deleted successfully!", {
//        position: "top-right",
//        autoClose: 3000,
//      });
//   };

//   const handleChange = (e) => {
//     setEditFirm({ ...editFirm, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     setFirms((prev) =>
//       prev.map((firm) => (firm.id === editFirm.id ? editFirm : firm))
//     );
//     setEditFirm(null);
//   };

//   const validateAadhaar = (aadhaar) => {
//     const aadhaarRegex = /^[0-9]{12}$/; // Regex to check if it's exactly 12 digits
//     return aadhaarRegex.test(aadhaar);
//   };

//   const handleRemovePartner = () => {
//     setPartners(partners.slice(0, partners.length - 1)); // Remove the last partner
//   };

//   const handleView = (document) => {
//     window.open(document, "_blank");
//   };

//   const handleFileChange = (e, partnerIndex, key) => {
//     const file = e.target.files[0];
//     if (file) {
//       const updatedPartners = [...fileNames.partners];

//       updatedPartners[partnerIndex] = {
//         ...updatedPartners[partnerIndex],
//         [key]: file.name || "Unknown file",
//       };

//       setFileNames((prevState) => ({
//         ...prevState,
//         partners: updatedPartners,
//       }));
//     }
//   };

//   const handlePartnerChange = (e, index, label) => {
//     const newPartners = [...partners];
//     newPartners[index] = {
//       ...newPartners[index],
//       [label.toLowerCase().replace(/ /g, "")]: e.target.value,
//     };
//     setPartners(newPartners);
//   };

//   const handleFirmNameChange = (e) => {
//     const value = e.target.value;

//     if (/\d/.test(value)) {
//       setFirmNameError("Firm Name should only contain letters");
//     } else {
//       setFirmNameError("");
//     }

//     setFirmName(value);
//   };

//   const handleFirmPanChange = (e) => {
//     const value = e.target.value;
//     setFirmPan(value);

//     const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
//     if (!panRegex.test(value)) {
//       setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
//     } else {
//       setFirmPanError("");
//     }
//   };

//   const handlePANChange = (e, index) => {
//     const updatedPartner = { ...partners[index], pan: e.target.value };

//     // Validate PAN No.
//     const isValidPAN = validatePAN(updatedPartner.pan);
//     if (!isValidPAN) {
//       setPanError("Invalid PAN number format.");
//     } else {
//       setPanError(""); // Clear error if valid
//     }
//   };

//   const handlePartnerNameChange = (e, index) => {
//     const value = e.target.value;
//     const partnerCopy = [...partners];

//     // Regex to check if the value contains any numbers
//     if (/\d/.test(value)) {
//       setNameError("Name should only contain letters"); // Error message if numbers are present
//     } else {
//       setNameError(""); // Clear error message if the value is valid
//     }

//     // Update the partner's name in the state
//     partnerCopy[index] = { ...partnerCopy[index], name: value };
//     setPartners(partnerCopy);
//   };
//   const handleAgeChange = (e, index) => {
//     const value = e.target.value;
//     const updatedPartners = [...partners];
//     updatedPartners[index].age = value; // Update the age of the specific partner
//     setPartners(updatedPartners); // Update the state

//     // Validate the age value
//     validateAge(value); // You should already have this function defined
//   };

//   const validateAge = (age) => {
//     if (!age || age < 0 || age > 120) {
//       setAgeError("Please enter a valid age between 0 and 120");
//     } else {
//       setAgeError("");
//     }
//   };

//   const handleEmailChange = (e, index) => {
//     const value = e.target.value;
//     const partnerCopy = [...partners];

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/i;

//     if (value && !emailRegex.test(value)) {
//       setEmailError("Invalid Gmail address");
//       console.log("invalid email");
//     } else {
//       setEmailError("");
//     }

//     partnerCopy[index] = { ...partnerCopy[index], email: value };
//     setPartners(partnerCopy);
//   };

//   const validatePAN = (pan) => {
//     const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format: 5 letters, 4 digits, 1 letter
//     return panPattern.test(pan);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//   return (
//     <TableContainer component={Paper} sx={{}}>
//       {editFirm ? (
//         <div
//           className="firm-form mt-4 p-3"
//           style={{
//             maxHeight: "500px",
//             overflowY: "auto",
//             paddingRight: "10px",
//           }}
//         >
//           <Paper
//             className="p-4"
//             elevation={4}
//             style={{ borderRadius: "12px", paddingBottom: "20px" }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Firm Details
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <TextField
//                   label="Firm Name"
//                   fullWidth
//                   variant="outlined"
//                   value={firmName}
//                   onChange={handleFirmNameChange}
//                   error={!!firmNameError}
//                   helperText={firmNameError}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Firm Address" fullWidth variant="outlined" />
//               </Grid>

//               <Grid item xs={6}>
//                 <TextField
//                   label="Firm PAN No"
//                   fullWidth
//                   variant="outlined"
//                   value={firmPan}
//                   onChange={handleFirmPanChange}
//                   error={!!firmPanError} // Show error if there is an error
//                   helperText={firmPanError}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField label="Firm GST No" fullWidth variant="outlined" />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               {[
//                 { label: "Firm PAN No Document", key: "firmPanNoDocument" },
//                 { label: "Firm GST No Document", key: "firmGstNoDocument" },
//                 {
//                   label: "Firm Light Bill for Address Proof Document",
//                   key: "firmLightBillForAddressProof",
//                 },
//               ].map((item, index) => (
//                 <Grid item xs={6} key={index}>
//                   <Typography
//                     variant="body2"
//                     gutterBottom
//                     style={{ paddingTop: "16px" }}
//                   >
//                     {item.label}
//                   </Typography>
//                   <label>
//                     <Input
//                       type="file"
//                       style={{ display: "none" }}
//                       id={`file-input-firm-${index}`}
//                       onChange={(e) => handleFileChange(e, 0, item.key)}
//                     />
//                     <Button variant="contained" color="light" component="span">
//                       Choose File
//                     </Button>
//                   </label>

//                   {fileNames.partners[0]?.[item.key] && (
//                     <Typography
//                       variant="body2"
//                       color="textSecondary"
//                       style={{ marginTop: "8px" }}
//                     >
//                       {fileNames.partners[0][item.key]}
//                     </Typography>
//                   )}
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Partner Details Section */}
//             <Typography variant="h5" className="mt-4" gutterBottom>
//               Partner Details
//             </Typography>

//             {partners.map((partner, index) => (
//               <Paper
//                 key={index}
//                 className="p-3 mb-3"
//                 elevation={2}
//                 style={{ borderRadius: "10px" }}
//               >
//                 <Grid container spacing={2}>
//                   {[
//                     "Name",
//                     "Age",
//                     "Occupation",
//                     "Mobile No.",
//                     "Mail ID",
//                     "Residential Address",
//                     "PAN No.",
//                     "Aadhaar No.",
//                     "Residential Address Document",
//                     "Pan No Document",
//                     "Aadhar No Document",
//                     "Photo Document",
//                     "Light Bill For Address Proof Document",
//                   ].map((label, i) => (
//                     <Grid item xs={6} key={i}>
//                       {[
//                         "Residential Address Document",
//                         "Pan No Document",
//                         "Aadhar No Document",
//                         "Photo Document",
//                         "Light Bill For Address Proof Document",
//                       ].includes(label) ? (
//                         <>
//                           <Typography variant="body2" gutterBottom>
//                             {label}
//                           </Typography>
//                           <label>
//                             <Input
//                               type="file"
//                               style={{ display: "none" }}
//                               id={`file-input-partner-${index}-${label}`}
//                               onChange={(e) =>
//                                 handleFileChange(e, index, label)
//                               }
//                             />
//                             <Button
//                               variant="contained"
//                               color="light"
//                               component="span"
//                             >
//                               Choose File
//                             </Button>
//                           </label>

//                           {fileNames.partners[index]?.[label] && (
//                             <Typography
//                               variant="body2"
//                               color="textSecondary"
//                               style={{ marginTop: "8px" }}
//                             >
//                               {fileNames.partners[index][label]}
//                             </Typography>
//                           )}
//                         </>
//                       ) : (
//                         <TextField
//                           label={label}
//                           fullWidth
//                           variant="outlined"
//                           type={label === "Age" ? "text" : "text"} // You can adjust the type based on the label
//                           value={partner[label.toLowerCase().replace(/ /g, "")]}
//                           onChange={(e) => {
//                             if (label === "Age") {
//                               handleAgeChange(e, index);
//                             } else if (label === "Occupation") {
//                               handleOccupationChange(e, index);
//                             } else if (label === "Name") {
//                               handlePartnerNameChange(e, index);
//                             } else if (label === "Mobile No.") {
//                               handleMobileChange(e, index);
//                             } else if (label === "Mail ID") {
//                               handleEmailChange(e, index);
//                             } else if (label === "PAN No.") {
//                               handlePANChange(e, index);
//                             } else if (label === "Aadhaar No.") {
//                               const aadhaar = e.target.value;
//                               if (validateAadhaar(aadhaar)) {
//                                 setAadhaarError(false); // Reset error if valid
//                                 handleAadhaarChange(e, index); // Custom handler for Aadhaar field
//                               } else {
//                                 setAadhaarError(true); // Set error if invalid
//                                 setAadhaarErrorMessage(
//                                   "Aadhaar number should be exactly 12 digits."
//                                 );
//                               }
//                             }
//                           }}
//                           error={
//                             (label === "Name" && nameError) ||
//                             (label === "Mobile No." && mobileError) ||
//                             (label === "Mail ID" && emailError) ||
//                             (label === "PAN No." && panError) ||
//                             (label === "Age" && ageError) ||
//                             (label === "Occupation" && occupationError) ||
//                             (label === "Aadhaar No." && aadhaarError)
//                           }
//                           helperText={
//                             (label === "Name" && nameError) ||
//                             (label === "Mobile No." && mobileError) ||
//                             (label === "Mail ID" && emailError) ||
//                             (label === "PAN No." && panError) ||
//                             (label === "Age" && ageError) ||
//                             (label === "Occupation" && occupationError) ||
//                             (label === "Aadhaar No." &&
//                               aadhaarError &&
//                               aadhaarErrorMessage)
//                           }
//                         />
//                       )}
//                     </Grid>
//                   ))}
//                 </Grid>
//               </Paper>
//             ))}

//             <Button
//               className="m-3 m-2"
//               variant="contained"
//               color="primary"
//               onClick={() => setPartners([...partners, {}])}
//             >
//               <FaPlus /> Add Partner
//             </Button>

//             <Button
//               variant="contained"
//               sx={{
//                 backgroundColor: "red", // Red background
//                 "&:hover": {
//                   backgroundColor: "#d32f2f", // Darker red on hover
//                 },
//               }}
//               onClick={handleRemovePartner} // Pass the index to remove the partner
//               className="m-2"
//             >
//               Remove Partner
//             </Button>
//             <br />

//             {/* <Button
//             variant="contained"
//             className="m-3"
//             color="success"
//             onClick={() => {

//               toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });

//               setShowFirmForm(false);
//             }}
//           >
//         Update
//           </Button> */}

//             <Button
//               variant="contained"
//               className="m-3"
//               color="success"
//               onClick={() => {
//                 handleSave(); // First update the firm details
//                 toast.success("Details are Updated!", {
//                   position: "top-right",
//                   autoClose: 3000,
//                 });
//                 setShowFirmForm(false); // Then close the form
//               }}
//             >
//               Update
//             </Button>
//           </Paper>
//         </div>
//       ) : (
//         <Box sx={{ position: "relative", height: "400px", overflow: "auto" }}>
//           <Box
//             sx={{
//               maxHeight: "400px",
//               overflow: "auto",
//               border: "1px solid #ccc",
//               display: "block",
//             }}
//           ></Box>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: Constants.primaryColor }}>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   ACTION
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   TIMESTAMP
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM NAME
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM ADDRESS
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM PAN NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM GST NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM PAN
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM GST
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   FIRM LIGHT BILL
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PARTNER NAME
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   AGE
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   OCCUPATION
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   MOBILE NO.
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   MAIL ID
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   RESIDENTIAL ADDRESS
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PAN NO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   AADHAAR NO
//                 </TableCell>

//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   RESIDENTIAL ADDRESS
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PAN{" "}
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   AADHAAR
//                 </TableCell>

//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   PHOTO
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     color: "white",
//                     fontWeight: "bold",
//                     whiteSpace: "nowrap",
//                   }}
//                 >
//                   LIGHT BILL
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {firms.map((firm, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Tooltip title="Edit">
//                         <IconButton
//                           size="small"
//                           sx={{
//                             backgroundColor: Constants.primaryColor,
//                             color: "white",
//                             borderRadius: "50%",
//                             "&:hover": { backgroundColor: "#1565C0" },
//                           }}
//                           onClick={() => handleEdit(firm)}
//                         >
//                           <EditIcon sx={{ fontSize: "18px" }} />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton
//                           size="small"
//                           sx={{
//                             backgroundColor: Constants.primaryColor,
//                             color: "white",
//                             borderRadius: "50%",
//                             "&:hover": { backgroundColor: Constants.primaryColor },
//                           }}
//                           onClick={() => handleDelete(firm.id)}
//                         >
//                           <FaTrash style={{ fontSize: "16px" }} />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     {firm.timestamp}
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     {firm.name}
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     {firm.address}
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     {firm.firmPanNo}
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     {firm.firmGstNo}
//                   </TableCell>

//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     <IconButton
//                       onClick={() => handleView(firm.firmPan)}
//                       sx={{
//                         backgroundColor:Constants.primaryColor,
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>

//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     <IconButton
//                       onClick={() => handleView(firm.firmGst)}
//                       sx={{
//                         backgroundColor: Constants.primaryColor,
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>

//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     <IconButton
//                       onClick={() => handleView(firm.firmLightBill)}
//                       sx={{
//                         backgroundColor:Constants.primaryColor,
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//                   <TableCell></TableCell>
//            <TableCell sx={{ color: "black", fontWeight: "bold" }}> </TableCell>
//                <TableCell sx={{ color: "black", fontWeight: "bold" }}> </TableCell>
//            <TableCell sx={{ color: "black", fontWeight: "bold" }}> </TableCell>
//            <TableCell>
//                     <IconButton
//                       onClick={() => handleView(firm.residentialAddress)}
//                       sx={{
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       onClick={() => handleView(firm.residentialAddress)}
//                       sx={{
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       onClick={() => handleView(firm.residentialAddress)}
//                       sx={{
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>
//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     <IconButton
//                       onClick={() => handleView(firm.photo)}
//                       sx={{
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>

//                   <TableCell sx={{ color: "black", fontWeight: "bold" }}>
//                     <IconButton
//                       onClick={() => handleView(firm.lightBill)}
//                       sx={{
//                         backgroundColor: "blue",
//                         borderRadius: "50%",
//                         padding: "2px",
//                       }}
//                     >
//                       <Visibility sx={{ color: "white" }} />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       )}

//       <Box
//         sx={{
//           position: "sticky",
//           bottom: 0, // Fix the pagination at the bottom of the table
//           backgroundColor: "white",
//           zIndex: 1000, // Ensures pagination stays above the table
//           borderTop: "1px solid #ccc",
//           width: "100%", // Ensures the pagination spans the entire width
//         }}
//       >
//         <TablePagination
//           rowsPerPageOptions={[10]}
//           component="div"
//           count={firms.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//         />
//       </Box>
//     </TableContainer>
//   );
// };

// export default FirmTable;





import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  useMediaQuery,
  useTheme,
  Box,
  Typography,
  IconButton,
  Tooltip,
  TableFooter,
} from "@mui/material";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import Constants from "../Constants";

const handleOpenDocument = (url) => {
  if (url) {
    window.open(url, "_blank");
  }
};

const FirmTable = ({ firms, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(isMobile ? 5 : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Paginate the data
  const paginatedData = firms.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Helper function to get partner data - handles both flat and nested structures
  const getPartnerData = (firm, field) => {
    // If firm has direct fields (old structure)
    if (firm[field] !== undefined) {
      return firm[field];
    }

    // If firm has partners array (new structure)
    if (firm.partners && firm.partners.length > 0) {
      // Return data from first partner
      return firm.partners[0][field] || "";
    }

    return "";
  };

  const columnHeaders = [
    {
      label: "ACTIONS",
      key: "actions",
      isAction: true,
    },
    { label: "TIMESTAMP", key: "timestamp" },
    { label: "FIRM NAME", key: "name" },
    { label: "FIRM ADDRESS", key: "address" },
    { label: "FIRM PAN NO", key: "firmPanNo" },
    { label: "FIRM GST NO", key: "firmGstNo" },
    {
      label: "FIRM PAN DOC",
      key: "firmPan",
      isDocument: true,
    },
    {
      label: "FIRM GST DOC",
      key: "firmGst",
      isDocument: true,
    },
    {
      label: "FIRM LIGHT BILL",
      key: "firmLightBill",
      isDocument: true,
    },
    {
      label: "PARTNER NAME",
      key: "name",
      isPartner: true,
    },
    {
      label: "AGE",
      key: "age",
      isPartner: true,
    },
    {
      label: "OCCUPATION",
      key: "occupation",
      isPartner: true,
    },
    {
      label: "MOBILE NO",
      key: "mobile",
      isPartner: true,
    },
    {
      label: "EMAIL",
      key: "email",
      isPartner: true,
    },
    {
      label: "RESIDENTIAL ADDRESS",
      key: "residentialAddress",
      isPartner: true,
    },
    {
      label: "PAN NO",
      key: "pan",
      isPartner: true,
    },
    {
      label: "AADHAAR NO",
      key: "aadhaarNo",
      isPartner: true,
    },
    {
      label: "RESIDENTIAL ADDRESS DOC",
      key: "residentialAddressDoc",
      isDocument: true,
    },
    {
      label: "PAN DOC",
      key: "panDoc",
      isDocument: true,
    },
    {
      label: "AADHAAR DOC",
      key: "aadhaarDoc",
      isDocument: true,
    },
    {
      label: "PHOTO",
      key: "photo",
      isDocument: true,
    },
    {
      label: "LIGHT BILL DOC",
      key: "lightBill",
      isDocument: true,
    },
  ];

  const renderCellContent = (header, firm, index) => {
    if (header.isAction) {
      return (
        <Box sx={{ display: "flex", gap: isMobile ? 0.5 : 1 }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{
                backgroundColor: Constants.primaryColor,
                color: "white",
                borderRadius: "50%",
                "&:hover": { backgroundColor:Constants.primaryColor },
              }}
              onClick={() => onEdit && onEdit(firm)}
            >
              <EditIcon sx={{ fontSize: isMobile ? "14px" : "18px" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{
                backgroundColor: Constants.primaryColor,
                color: "white",
                borderRadius: "50%",
                "&:hover": { backgroundColor:Constants.primaryColor },
              }}
              onClick={() => onDelete && onDelete(firm)}
            >
              <DeleteIcon sx={{ fontSize: isMobile ? "14px" : "18px" }} />
            </IconButton>
          </Tooltip>
        </Box>
      );
    }

    if (header.isDocument) {
      const value = firm[header.key];
      return (
        <Tooltip title="View Document">
          <IconButton
            onClick={() => handleOpenDocument(value)}
            size="small"
            sx={{ padding: isMobile ? "4px" : "8px" }}
          >
            <VisibilityIcon
              sx={{
                color: value ? "blue" : "gray",
                fontSize: isMobile ? "16px" : "20px",
              }}
            />
          </IconButton>
        </Tooltip>
      );
    }

    // if (header.isPartner) {
    //   return getPartnerData(firm, header.key) || "-";
    // }

    if (header.isPartner) {
  return (
    <div>
      {firm.partners?.map((p, idx) => (
        <Box
          key={idx}
          sx={{
            borderBottom: idx < firm.partners.length - 1 ? "1px solid #ccc" : "none",
            paddingBottom: "4px",
            marginBottom: "4px"
          }}
        >
          {header.key === "name" && <div> {p.name || "-"}</div>}
          {header.key === "age" && <div>{p.age || "-"}</div>}
          {header.key === "occupation" && <div> {p.occupation || "-"}</div>}
          {header.key === "mobile" && <div> {p.mobile || "-"}</div>}
          {header.key === "email" && <div>{p.email || "-"}</div>}
          {header.key === "residentialAddress" && <div>{p.residentialAddress || "-"}</div>}
          {header.key === "pan" && <div><b></b> {p.pan || "-"}</div>}
          {header.key === "aadhaarNo" && <div><b></b> {p.aadhaarNo || "-"}</div>}
        </Box>
      )) || "-"}
    </div>
  );
}


    // Regular firm data
    return firm[header.key] || "-";
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        component={Paper}
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
        }}
      >
        <Table
          sx={{
            minWidth: "100%",
            tableLayout: "auto",
          }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              {columnHeaders.map((header) => (
                <TableCell
                  key={header.key}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    background: Constants.primaryColor,
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                    fontSize: isMobile ? "12px" : "14px",
                    padding: isMobile ? "8px 4px" : "12px 8px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: header.key === "actions" ? "100px" : "auto",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header.label}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((firm, index) => (
                <TableRow key={index}>
                  {columnHeaders.map((header) => (
                    <TableCell
                      key={header.key}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: isMobile ? "12px" : "14px",
                        padding: isMobile ? "6px 4px" : "8px 6px",
                        lineHeight: isMobile ? "1.2" : "1.5",
                        textAlign:
                          header.isAction || header.isDocument
                            ? "center"
                            : "left",
                      }}
                    >
                      {renderCellContent(header, firm, index)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnHeaders.length}
                  align="center"
                  sx={{ py: 4 }}
                >
                  <Typography variant="body1" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={columnHeaders.length}
                sx={{ padding: 0, border: "none" }}
              >
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <TablePagination
                    rowsPerPageOptions={isMobile ? [5, 10] : [5, 10, 25, 50]}
                    component="div"
                    count={firms.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      "& .MuiTablePagination-toolbar": {
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? 2 : 0,
                      },
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FirmTable;
