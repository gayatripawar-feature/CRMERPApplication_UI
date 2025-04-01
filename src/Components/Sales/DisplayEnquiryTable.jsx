

// import React from "react";
// import {
//   TableContainer,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Paper,
//   Tooltip,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import EmailIcon from "@mui/icons-material/Email";
// import AssignmentIcon from "@mui/icons-material/Assignment";

// const data = [
//   {
//     remarkHistory: "2024-03-28 10:30 AM",
//     enquiryNo: "ENQ12345",
//     leadNo: "LD98765",
//     assignToHistory: "John Doe",
//     salesExecutiveName: "Jane Smith",
//     name: "Alice Johnson",
//     mobile: "9876543210",
//     alternateContactNo: "9876543200",
//     whatsappNo: "9876543210",
//     email: "alice@example.com",
//     address: "123 Main Street, City",
//     occupation: "Software Engineer",
//     company: "Tech Solutions",
//     interestedIn: "3 BHK",
//     budget: "₹75 Lakh",
//     reasonForPurchase: "Relocation",
//     referenceBySource: "Google Ads",
//     nameOfCp: "XYZ Realtors",
//     planningToBuyWithin: "3 Months",
//     customerFeedback: "Looking for more options.",
//   },
  
// ];



// const DisplayEnquiryTable = () => {
  
//   // Handlers for each action (Edit, Email, Assign)
//   const handleEdit = (row) => {
//     console.log("Edit clicked for", row);
//   };

//   const handleEmail = (row) => {
//     console.log("Email clicked for", row);
//   };

//   const handleAssign = (row) => {
//     console.log("Assign clicked for", row);
//   };

//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: "#3621a9" }}>
//             {/* Header Cells */}
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXE.</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CO. No</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY?</TableCell>
//             <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FOLLOWUP DETAILS</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {data.map((item, index) => (
//             <TableRow key={index}>
             

// <TableCell>
//   <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
  
//     <Tooltip title="Edit">
//   <IconButton 
//     size="small" 
//     sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }} 
//     onClick={() => handleEdit(item)}
//   >
//     <EditIcon sx={{ fontSize: "18px" }} />
//   </IconButton>
// </Tooltip>


//     <Tooltip title="Email">
//       <IconButton 
//         size="small" 
//         sx={{ backgroundColor: "#EA4335", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#D93025" } }} 
//         onClick={() => handleEmail(item)}
//       >
//         <EmailIcon sx={{ fontSize: "18px" }} />
//       </IconButton>
//     </Tooltip>

//     <Tooltip title="Assign To">
//       <IconButton 
//         size="small" 
//         sx={{ backgroundColor: "#FFC107", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#E0A800" } }} 
//         onClick={() => handleAssign(item)}
//       >
//         <AssignmentIcon sx={{ fontSize: "18px" }} />
//       </IconButton>
//     </Tooltip>
//   </div>
// </TableCell>

              
//               {/* TIMESTAMP */}
//               <TableCell>{item.remarkHistory}</TableCell>
//               {/* ENQUIRY NO. */}
//               <TableCell>{item.enquiryNo}</TableCell>
//               {/* LEAD NO. */}
//               <TableCell>{item.leadNo}</TableCell>
//               {/* ASSIGN TO */}
//               <TableCell>{item.assignToHistory}</TableCell>
//               {/* SALES EXE. */}
//               <TableCell>{item.salesExecutiveName}</TableCell>
//               {/* NAME */}
//               <TableCell>{item.name}</TableCell>
//               {/* MOBILE */}
//               <TableCell>{item.mobile}</TableCell>
//               {/* ALTERNATE CONTACT NO */}
//               <TableCell>{item.alternateContactNo}</TableCell>
//               {/* WHATSAPP */}
//               <TableCell>{item.whatsappNo}</TableCell>
//               {/* EMAIL */}
//               <TableCell>{item.email}</TableCell>
//               {/* ADDRESS */}
//               <TableCell>{item.address}</TableCell>
//               {/* OCCUPATION */}
//               <TableCell>{item.occupation}</TableCell>
//               {/* COMPANY */}
//               <TableCell>{item.company}</TableCell>
//               {/* INTERESTED */}
//               <TableCell>{item.interestedIn}</TableCell>
//               {/* BUDGET */}
//               <TableCell>{item.budget}</TableCell>
//               {/* REASON */}
//               <TableCell>{item.reasonForPurchase}</TableCell>
//               {/* REFERENCE */}
//               <TableCell>{item.referenceBySource}</TableCell>
//               {/* NAME OF CP */}
//               <TableCell>{item.nameOfCp}</TableCell>
//               {/* PLANNING TO BUY */}
//               <TableCell>{item.planningToBuyWithin}</TableCell>
//               {/* FOLLOWUP DETAILS */}
//               <TableCell>{item.customerFeedback}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default DisplayEnquiryTable;




import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Tooltip,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import AssignmentIcon from "@mui/icons-material/Assignment";

const data = [
  {
    remarkHistory: "2024-03-28 10:30 AM",
    enquiryNo: "ENQ12345",
    leadNo: "LD98765",
    assignToHistory: "John Doe",
    salesExecutiveName: "Jane Smith",
    name: "Alice Johnson",
    mobile: "9876543210",
    alternateContactNo: "9876543200",
    whatsappNo: "9876543210",
    email: "alice@example.com",
    address: "123 Main Street, City",
    occupation: "Software Engineer",
    company: "Tech Solutions",
    interestedIn: "3 BHK",
    budget: "₹75 Lakh",
    reasonForPurchase: "Relocation",
    referenceBySource: "Google Ads",
    nameOfCp: "XYZ Realtors",
    planningToBuyWithin: "3 Months",
    customerFeedback: "Looking for more options.",
  },
];

const DisplayEnquiryTable = () => {
  const [isEditing, setIsEditing] = useState(false); // To toggle between table and form
  const [selectedItem, setSelectedItem] = useState(null); // To track the item being edited

  // Handlers for each action (Edit, Email, Assign)
  const handleEdit = (row) => {
    setSelectedItem(row); // Set the item to be edited
    setIsEditing(true); // Show the form
  };

  const handleEmail = (row) => {
    console.log("Email clicked for", row);
  };

  const handleAssign = (row) => {
    console.log("Assign clicked for", row);
  };

  const handleSave = () => {
    console.log("Form saved for", selectedItem);
    setIsEditing(false); // Close the form after saving
    setSelectedItem(null); // Reset the selected item
  };

  const handleCancel = () => {
    setIsEditing(false); // Close the form without saving
    setSelectedItem(null); // Reset the selected item
  };

  return (
    <div>
      {isEditing ? (
        <div>
          {/* Form view */}
          <h3>Edit Enquiry</h3>
          <TextField
            label="Remark History"
            value={selectedItem.remarkHistory}
            onChange={(e) => setSelectedItem({ ...selectedItem, remarkHistory: e.target.value })}
            fullWidth
          />
          <TextField
            label="Enquiry No."
            value={selectedItem.enquiryNo}
            onChange={(e) => setSelectedItem({ ...selectedItem, enquiryNo: e.target.value })}
            fullWidth
          />
          {/* Add more fields as necessary */}
          <div>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#3621a9" }}>
                {/* Header Cells */}
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEAD NO.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ASSIGN TO</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALES EXE.</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALTERNATE CO. No</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>WHATSAPP</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>COMPANY</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>INTERESTED</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BUDGET</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REASON</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REFERENCE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CP</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLANNING TO BUY?</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FOLLOWUP DETAILS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#1976D2",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#1565C0" },
                          }}
                          onClick={() => handleEdit(item)}
                        >
                          <EditIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Email">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#EA4335",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#D93025" },
                          }}
                          onClick={() => handleEmail(item)}
                        >
                          <EmailIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Assign To">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: "#FFC107",
                            color: "white",
                            borderRadius: "50%",
                            "&:hover": { backgroundColor: "#E0A800" },
                          }}
                          onClick={() => handleAssign(item)}
                        >
                          <AssignmentIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>

                  {/* Other table cells */}
                  <TableCell>{item.remarkHistory}</TableCell>
                  <TableCell>{item.enquiryNo}</TableCell>
                  <TableCell>{item.leadNo}</TableCell>
                  <TableCell>{item.assignToHistory}</TableCell>
                  <TableCell>{item.salesExecutiveName}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.mobile}</TableCell>
                  <TableCell>{item.alternateContactNo}</TableCell>
                  <TableCell>{item.whatsappNo}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.address}</TableCell>
                  <TableCell>{item.occupation}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.interestedIn}</TableCell>
                  <TableCell>{item.budget}</TableCell>
                  <TableCell>{item.reasonForPurchase}</TableCell>
                  <TableCell>{item.referenceBySource}</TableCell>
                  <TableCell>{item.nameOfCp}</TableCell>
                  <TableCell>{item.planningToBuyWithin}</TableCell>
                  <TableCell>{item.customerFeedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DisplayEnquiryTable;
