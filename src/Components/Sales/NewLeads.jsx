



// import React from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton ,Tooltip} from "@mui/material";
// import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from "react-icons/fa";

// const NewLeads = ({ inventoryData, handleDelete }) => {
//   return (
//     <TableContainer component={Paper} sx={{ mt: 3 }}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: "linear-gradient(180deg, #3621a9 0%,rgb(139, 115, 243) 100%)" }}>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ACTION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>TIMESTAMP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ASSIGN TO</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LEAD NO</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>MOBILE / WHATSAPP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOOKING FOR</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>EMAIL</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>SOURCE NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOCATION</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {inventoryData.map((item, index) => (
//             <TableRow key={index}>
//               {/* Action Column */}
//               <TableCell sx={{ padding: "15px" }}>
               



// <div style={{ display: "flex", gap: "5px" }}>
      
//       <Tooltip title="Edit" arrow>
//         <IconButton 
//           color="primary" 
//           onClick={() => console.log("Edit clicked")} 
//           sx={{
//             backgroundColor: "primary.main", 
//             padding: "5px",  
//             borderRadius: "50%", 
//             color: "white", 
//             fontSize: "18px" 
//           }}
//         >
//           <FaEdit />
//         </IconButton>
//       </Tooltip>

//       <Tooltip title="WhatsApp" arrow>
//         <IconButton 
//           color="success" 
//           onClick={() => window.open(`https://wa.me/${item.mobileNo}`, "_blank")}
//           sx={{
//             backgroundColor: "success.main", 
//             padding: "5px",  
//             borderRadius: "50%", 
//             color: "white", 
//             fontSize: "18px" 
//           }}
//         >
//           <FaWhatsapp />
//         </IconButton>
//       </Tooltip>

   
//       <Tooltip title="Email" arrow>
//         <IconButton 
//           color="primary" 
//           onClick={() => window.location.href = `mailto:${item.email}`}
//           sx={{
//             backgroundColor: "primary.main", 
//             padding: "5px",  
//             borderRadius: "50%", 
//             color: "white", 
//             fontSize: "18px"
//           }}
//         >
//           <FaEnvelope />
//         </IconButton>
//       </Tooltip>

   
//       <Tooltip title="Assign To" arrow>
//         <IconButton 
//           color="secondary" 
//           onClick={() => console.log("Assign To clicked")}
//           sx={{
//             backgroundColor: "#FFD700", 
//             padding: "5px",  
//             borderRadius: "50%", 
//             color: "white", 
//             fontSize: "18px"
//           }}
//         >
//           <FaUserCircle />
//         </IconButton>
//       </Tooltip>
//     </div>
//       </TableCell>

//               {/* Correct TableCell values */}
//               <TableCell sx={{ padding: "15px" }}>{item.timestamp}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.assignTo}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.leadNo}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.name}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.mobile}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.lookingFor}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.email}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.sourceName}</TableCell>
//               <TableCell sx={{ padding: "15px" }}>{item.location}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default NewLeads;




// ----------------------

// import React, { useState } from "react";
// import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Tooltip, Modal, Select, MenuItem, Button } from "@mui/material";
// import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from "react-icons/fa";

// const NewLeads = ({ inventoryData }) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [assignedTo, setAssignedTo] = useState("");
//   const [successModalOpen, setSuccessModalOpen] = useState(false); // State for the success modal
//   const [selectedLead, setSelectedLead] = useState(null); // To store the selected lead details

//   const handleAssignClick = (item) => {
//     setModalOpen(true);
//     setSelectedLead(item); // Store the selected lead details for later use
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSuccessModalOpen(false); // Close the success modal
//   };

//   const handleDropdownSelect = (selectedValue) => {
//     setAssignedTo(selectedValue);
//     setSuccessModalOpen(true); // Open success modal when assignment is done
//     setModalOpen(false); // Close the assign modal after selection
//   };

//   return (
//     <>
//       <TableContainer component={Paper} sx={{ mt: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ background: "linear-gradient(180deg, #3621a9 0%,rgb(139, 115, 243) 100%)" }}>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ACTION</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>TIMESTAMP</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ASSIGN TO</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LEAD NO</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>NAME</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>MOBILE / WHATSAPP</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOOKING FOR</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>EMAIL</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>SOURCE NAME</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOCATION</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {inventoryData.map((item, index) => (
//               <TableRow key={index}>
//                 {/* Action Column */}
//                 <TableCell sx={{ padding: "15px" }}>
//                   <div style={{ display: "flex", gap: "5px" }}>
//                     <Tooltip title="Edit" arrow>
//                       <IconButton
//                         color="primary"
//                         onClick={() => console.log("Edit clicked")}
//                         sx={{
//                           backgroundColor: "primary.main",
//                           padding: "5px",
//                           borderRadius: "50%",
//                           color: "white",
//                           fontSize: "18px"
//                         }}
//                       >
//                         <FaEdit />
//                       </IconButton>
//                     </Tooltip>

//                     <Tooltip title="WhatsApp" arrow>
//                       <IconButton
//                         color="success"
//                         onClick={() => window.open(`https://wa.me/${item.mobileNo}`, "_blank")}
//                         sx={{
//                           backgroundColor: "success.main",
//                           padding: "5px",
//                           borderRadius: "50%",
//                           color: "white",
//                           fontSize: "18px"
//                         }}
//                       >
//                         <FaWhatsapp />
//                       </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Email" arrow>
//                       <IconButton
//                         color="primary"
//                         onClick={() => window.location.href = `mailto:${item.email}`}
//                         sx={{
//                           backgroundColor: "primary.main",
//                           padding: "5px",
//                           borderRadius: "50%",
//                           color: "white",
//                           fontSize: "18px"
//                         }}
//                       >
//                         <FaEnvelope />
//                       </IconButton>
//                     </Tooltip>

//                     <Tooltip title="Assign To" arrow>
//                       <IconButton
//                         color="secondary"
//                         onClick={() => handleAssignClick(item)} // Open modal when clicked
//                         sx={{
//                           backgroundColor: "#FFD700",
//                           padding: "5px",
//                           borderRadius: "50%",
//                           color: "white",
//                           fontSize: "18px"
//                         }}
//                       >
//                         <FaUserCircle />
//                       </IconButton>
//                     </Tooltip>
//                   </div>
//                 </TableCell>

//                 {/* Correct TableCell values */}
//                 <TableCell sx={{ padding: "15px" }}>{item.timestamp}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.assignTo}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.leadNo}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.name}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.mobile}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.lookingFor}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.email}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.sourceName}</TableCell>
//                 <TableCell sx={{ padding: "15px" }}>{item.location}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Modal for "Assign To" */}
//       <Modal open={modalOpen} onClose={handleCloseModal}>
//         <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
//           <h3>Assign To</h3>
//           <Select
//             value={assignedTo}
//             onChange={(e) => handleDropdownSelect(e.target.value)}
//             displayEmpty
//             fullWidth
//             variant="outlined"
//             sx={{ marginBottom: "10px" }}
//           >
//             <MenuItem value="">Select Assignee</MenuItem>
//             <MenuItem value="Shilpa Amewada">Shilpa Amewada</MenuItem>
//             <MenuItem value="Tic Tac Toe">Tic Tac Toe</MenuItem>
//             {/* Add more dropdown options as needed */}
//           </Select>
//           <Button onClick={handleCloseModal} color="secondary" fullWidth>
//             Close
//           </Button>
//         </div>
//       </Modal>

//       {/* Success Modal */}
//       <Modal open={successModalOpen} onClose={handleCloseModal}>
//         <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
//           <h3>Assignment Successful</h3>
//           <div style={{ marginBottom: "10px" }}>
//             <strong>Lead Details:</strong>
//             <p><strong>Lead No:</strong> {selectedLead?.leadNo}</p>
//             <p><strong>Name:</strong> {selectedLead?.name}</p>
//             <p><strong>Assigned To:</strong> {assignedTo}</p>
//           </div>
//           <Button onClick={handleCloseModal} color="primary" fullWidth>
//             OK
//           </Button>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default NewLeads;




import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Select,
  MenuItem,
  Button,
  TextField,
  TablePagination,
  Box,
} from "@mui/material";
import { FaEdit, FaWhatsapp, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const NewLeads = ({ inventoryData , setInventoryData}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedLead, setEditedLead] = useState(null);

  const [emailError, setEmailError] = useState(false); 
  const [emailHelperText, setEmailHelperText] = useState("");

  const [mobileError, setMobileError] = useState(false); 
  const [mobileHelperText, setMobileHelperText] = useState("");
  


  const handleAssignClick = (item) => {
    setModalOpen(true);
    setSelectedLead(item);
  };

  // const handleCloseModal = () => {

  //   toast.success("Details updated successfully!", {
  //     position: "top-right", // Position of the toast
  //     autoClose: 5000, // Time before the toast disappears
  //     hideProgressBar: false, // Option to hide the progress bar
  //     closeOnClick: true, 
  //     pauseOnHover: true, 
  //   });

   
  //   setModalOpen(false);
  //   setSuccessModalOpen(false);


      
  
  //   setEditMode(false);
  //   setEditedLead(null);
  // };

//   const handleCloseModal = () => {
//     console.log("Handle close modal triggered");
    
//     toast.success("Details updated successfully!", {
//       position: "top-right", 
//       autoClose: 5000, 
//       hideProgressBar: false, 
//       closeOnClick: true, 
//       pauseOnHover: true, 
//     });
//   setModalOpen(false);
//     setSuccessModalOpen(false);
// const updatedInventoryData = inventoryData.map((item) =>
//       item.leadNo === editedLead.leadNo ? editedLead : item
//     );
//     setInventoryData(updatedInventoryData);
  
    
//     setEditMode(false);
//     setEditedLead(null);  
//   };
  
const handleCloseModal = () => {
  console.log("🔹 Handle close modal triggered");

  // Show toast notification
  toast.success("Details updated successfully!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });

  // Log modal state before closing
  console.log("🔹 Closing modal...");

  // Close modals
  setModalOpen(false);
  setSuccessModalOpen(false);

  // Log current editedLead
  console.log("🔹 Edited lead:", editedLead);

  // Update inventoryData array
  const updatedInventoryData = inventoryData.map((item) => {
    if (item.leadNo === editedLead?.leadNo) {
      console.log("🔸 Updating lead:", item.leadNo);
      return editedLead;
    }
    return item;
  });

  // Log updated inventoryData
  console.log("🔹 Updated inventory data:", updatedInventoryData);

  // Set new inventoryData state
  setInventoryData(updatedInventoryData);

  // Reset edit mode
  setEditMode(false);
  console.log("🔹 Edit mode turned off");

  // Clear edited lead
  setEditedLead(null);
  console.log("🔹 Edited lead cleared");
};

  const handleEmailBlur = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(editedLead.email)) {
      setEmailError(true);
      setEmailHelperText("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }
  };


  const handleMobileBlur = () => {
    const mobileRegex = /^[0-9]{10,15}$/; // Regex to allow 10-15 digits (including country code)
    if (!mobileRegex.test(editedLead.mobile)) {
      setMobileError(true);
      setMobileHelperText("Please enter a valid mobile number.");
    } else {
      setMobileError(false);
      setMobileHelperText("");
    }
  };
  const handleDropdownSelect = (selectedValue) => {
    setAssignedTo(selectedValue);
    setSuccessModalOpen(true);
    setModalOpen(false);
  };

  const handleEditClick = (item) => {
    setEditMode(true);
    setEditedLead({ ...item });
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when changing rows per page
  };


  return (
    <>
      {!editMode ? (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              
             <TableRow sx={{background:"#3621a9"}} >
                <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>ACTION</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>TIMESTAMP</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>ASSIGN TO</TableCell>
                <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>LEAD NO</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>NAME</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>MOBILE / WHATSAPP</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>LOOKING FOR</TableCell>
                <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>EMAIL</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px" }}>SOURCE NAME</TableCell>
                <TableCell sx={{color: "white", fontWeight: "bold", whiteSpace: "nowrap", padding: "15px"}}>LOCATION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryData.map((item, index) => (
           

                <TableRow key={index}>
                <TableCell>
  <div style={{ display: "flex", gap: "5px" }}>
    <Tooltip title="Edit" arrow>
      <IconButton
        color="primary"
        onClick={() => handleEditClick(item)}
        sx={{ backgroundColor: "primary.main", color: "white", p: 0.5 }}
      >
        <FaEdit style={{ fontSize: "18px" }} />
      </IconButton>
    </Tooltip>

    <Tooltip title="WhatsApp" arrow>
      <IconButton
        color="success"
        onClick={() => window.open(`https://wa.me/${item.mobile}`, "_blank")}
        sx={{ backgroundColor: "success.main", color: "white", p: 0.5 }}
      >
        <FaWhatsapp style={{ fontSize: "18px" }} />
      </IconButton>
    </Tooltip>

    
   <Tooltip title="Email" arrow>
  <IconButton
    color="primary"
    onClick={() =>
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${item.email}`, "_blank")
    }
    sx={{ backgroundColor: "primary.main", color: "white", p: 0.5 }}
  >
    <FaEnvelope style={{ fontSize: "18px" }} />
  </IconButton>
</Tooltip>



    <Tooltip title="Assign To" arrow>
      <IconButton
        color="secondary"
        onClick={() => handleAssignClick(item)}
        sx={{ backgroundColor: "#FFD700", color: "white", p: 0.5 }}
      >
        <FaUserCircle style={{ fontSize: "18px" }} />
      </IconButton>
    </Tooltip>
  </div>
</TableCell>

                  <TableCell>{item.timestamp}</TableCell>
                  <TableCell>{item.assignTo}</TableCell>
                  <TableCell>{item.leadNo}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.lookingFor}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.sourceName}</TableCell>
                  <TableCell>{item.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={inventoryData.length} // Total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end', // Align pagination to the right
          paddingTop: '16px', // Optional: Add space between table and pagination
        }}
      />

        </TableContainer>
      ) : (
        <Paper sx={{ padding: 3, mt: 3 }}>
        <h3>Edit Lead</h3>
      
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={editedLead.name}
            onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
          />
      
          <TextField
            fullWidth
            label="You are looking for"
            value={editedLead.lookingFor}
            onChange={(e) => setEditedLead({ ...editedLead, lookingFor: e.target.value })}
          />
        </Box>
      
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Mobile No. / WhatsApp No."
          value={editedLead.mobile}
          onChange={(e) => setEditedLead({ ...editedLead, mobile: e.target.value })}
          onBlur={handleMobileBlur} // Trigger validation on blur
          error={mobileError} // Show error if mobile is invalid
          helperText={mobileHelperText} // Display the error message
        />
      
      <TextField
        fullWidth
        label="Email"
        value={editedLead.email}
        onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
        onBlur={handleEmailBlur} // Trigger validation on blur
        error={emailError} // Show error if email is invalid
        helperText={emailHelperText} // Display the error message
        sx={{ mb: 2 }}
      />
        </Box>
      
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            label="Location"
            value={editedLead.location}
            onChange={(e) => setEditedLead({ ...editedLead, location: e.target.value })}
          />
      
          <TextField
            fullWidth
            select
            label="Source Name"
            value={editedLead.source}
            onChange={(e) => setEditedLead({ ...editedLead, sourceName: e.target.value })}
          >
       
            <MenuItem value="Website">Website</MenuItem>
  <MenuItem value="Social Media">Social Media</MenuItem>
  <MenuItem value="Referral">Referral</MenuItem>
  <MenuItem value="Advertisement">Advertisement</MenuItem>
  <MenuItem value="Actual Site">Actual Site</MenuItem>
  <MenuItem value="Hoarding">Hoarding</MenuItem>
  <MenuItem value="Facebook">Facebook</MenuItem>
  <MenuItem value="Instagram">Instagram</MenuItem>
  <MenuItem value="Print Media">Print Media</MenuItem>
  <MenuItem value="Radio">Radio</MenuItem>
  <MenuItem value="Google Ad">Google Ad</MenuItem>
  <MenuItem value="Exhibition">Exhibition</MenuItem>
  <MenuItem value="Online Portal">Online Portal</MenuItem>
  <MenuItem value="Direct Call">Direct Call</MenuItem>
  <MenuItem value="Pamphlet">Pamphlet</MenuItem>
  <MenuItem value="Channel Partner">Channel Partner</MenuItem>
  <MenuItem value="Reference">Reference</MenuItem>
  <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Box>
      
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleCloseModal}>
            Update
          </Button>
      
          <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
        </Box>
      </Paper>
      
      
      
      
      )}

      {/* Modal for "Assign To" */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
          <h3>Assign To</h3>
          <Select
            value={assignedTo}
            onChange={(e) => handleDropdownSelect(e.target.value)}
            displayEmpty
            fullWidth
            variant="outlined"
            sx={{ marginBottom: "10px" }}
          >
             <MenuItem value="">Select Assignee</MenuItem>
  <MenuItem value="Shilpa Amewada 1">Shilpa Mewada 1</MenuItem>
  <MenuItem value="Tic Tac Toe">Tic Tac Toe</MenuItem>
  <MenuItem value="Shilpa Mewada">Shilpa Mewada</MenuItem>
  <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
  <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
  <MenuItem value="A Mol Pawar">Amol Pawar</MenuItem>
  <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
          </Select>
          <Button onClick={handleCloseModal} color="secondary" fullWidth>
            Close
          </Button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal open={successModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
          <h3 className="text-center text-primary pb-3">Assignment Successful</h3>
          <div style={{ marginBottom: "10px" }}>
            <strong className="text-center fs-5 pb-3">Lead Details:</strong>
            <p><strong className="">Lead No:</strong> {selectedLead?.leadNo}</p>
            <p><strong>Name:</strong> {selectedLead?.name}</p>
            <p><strong>Assigned To:</strong> {assignedTo}</p>
          </div>
          <Button onClick={handleCloseModal} color="primary" fullWidth>
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default NewLeads;
