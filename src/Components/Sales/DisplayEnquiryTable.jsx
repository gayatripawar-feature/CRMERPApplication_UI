

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
  Grid,
  FormControl,
  InputLabel,Select,
  MenuItem,
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

const DisplayEnquiryTable = ({data}) => {
  const [isEditing, setIsEditing] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [error, setError] = useState('');

  const [leadNo, setLeadNo] = useState(''); 
    const [salesExec, setSalesExec] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [interestedIn, setInterestedIn] = useState('');
    const [planningToBuy, setPlanningToBuy] = useState('');
    const [occupation, setOccupation] = useState('');
    const [budget, setBudget] = useState('');
    const [reasonForPurchase, setReasonForPurchase] = useState('');
    const [emailError, setEmailError] = useState('')
      const [nameError, setNameError] = useState(false);
      const [alternateContact, setAlternateContact] = useState("");
       const [whatsappNo, setWhatsappNo] = useState("");
       const [name, setName] = useState("");
  
  const handleEdit = (row) => {
    setSelectedItem(row); 
    setIsEditing(true); 
  };

  const handleEmail = (row) => {
    console.log("Email clicked for", row);
  };

  const handleAssign = (row) => {
    console.log("Assign clicked for", row);
  };

  
  const handleChange = (e) => {
    const value = e.target.value;
    
  
    const regex = /[\d\s]/;

   
    if (regex.test(value)) {
      setError('Name should not contain digits or spaces');
    } else {
      setError(''); 
    }

    setName(value); 
  };


  const handleSave = () => {
    console.log("Form saved for", selectedItem);
    setIsEditing(false); 
    setSelectedItem(null); 
  };

  const handleCancel = () => {
    setIsEditing(false); 
    setSelectedItem(null); 
  };

  
  const validateEmail = (value) => {
   

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!regex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  
  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    validateMobile(value);
  };

  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

 
  const handleSalesExecChange = (event) => {
    setSalesExec(event.target.value);
    setError(''); 
  };
 
  const validateMobile = (value) => {
    const regex = /^[0-9]{10}$/;  
    if (!regex.test(value)) {
      setMobileError('Mobile number should contain exactly 10 digits');
    } else {
      setMobileError('');
    }
  };
  
  const handleInterestedInChange = (event) => {
    setInterestedIn(event.target.value);
  };

const handleBudgetChange = (event) => {
    setBudget(event.target.value);
  };

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/;  
  
    if (regex.test(value)) {
      setName(value);
      setNameError(false);   
    } else {
      setNameError(true);    
    }
  };
  


 
 const handlePlanningToBuyChange = (event) => {
  setPlanningToBuy(event.target.value);
};


   
   const handleOccupationChange = (event) => {
    setOccupation(event.target.value); 
  };

  const handleReasonForPurchaseChange = (event) => {
    setReasonForPurchase(event.target.value); 
  };

  return (
    <div>
      {isEditing ? (
       

        <div
  className="firm-form mt-4 p-3 border rounded"
  style={{
    maxHeight: "500px",
    overflowY: "auto",
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
  }}
>
  <Grid container spacing={2}>
   
    <Grid item xs={4}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>Lead No.</InputLabel>
        <Select value={leadNo} onChange={handleChange} label="Lead No.">
          <MenuItem value="Lead 9">Lead 9</MenuItem>
          <MenuItem value="Lead 16">Lead 16</MenuItem>
          <MenuItem value="Lead 25">Lead 25</MenuItem>
          <MenuItem value="Lead 26">Lead 26</MenuItem>
          <MenuItem value="Lead 27">Lead 27</MenuItem>
          <MenuItem value="Lead 4">Lead 4</MenuItem>
          <MenuItem value="Lead 3">Lead 3</MenuItem>
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Grid>

   
       <Grid item xs={4}>
     <TextField
       label="Name"
       fullWidth
       value={name}
       onChange={handleNameChange}
       error={nameError}
       helperText={nameError ? "Only letters are allowed" : ""}
     />
   </Grid>
   

   
    <Grid item xs={4}>
      <TextField
        label="Mobile No."
        fullWidth
        value={mobile}
        onChange={handleMobileChange}
        error={!!mobileError}
        helperText={mobileError}
      />
    </Grid>

       <Grid item xs={4}>
     <TextField
       label="Alternate Contact No."
       fullWidth
       value={alternateContact}
       onChange={(e) => {
         const value = e.target.value;
         
         if (/^\d{0,10}$/.test(value)) {
           setAlternateContact(value);
         }
       }}
       error={alternateContact.length > 0 && alternateContact.length < 10}
       helperText={
         alternateContact.length > 0 && alternateContact.length < 10
           ? "Mobile number must be 10 digits"
           : ""
       }
     />
   </Grid>
   

   
      <Grid item xs={4}>
    <TextField
      type="text"
      label="WhatsApp No"
      fullWidth
      value={whatsappNo}
      onChange={(e) => {
        const value = e.target.value;
       
        if (/^\d{0,10}$/.test(value)) {
          setWhatsappNo(value);
        }
      }}
      error={whatsappNo.length > 0 && whatsappNo.length < 10}
      helperText={
        whatsappNo.length > 0 && whatsappNo.length < 10
          ? "Mobile number must be 10 digits"
          : ""
      }
    />
  </Grid>
  
  
    <Grid item xs={4}>
      <TextField label="Email" fullWidth 
      value={email}
      onChange={handleEmailChange}
      error={!!emailError} 
      helperText={emailError}
      />
    </Grid>

  
    <Grid item xs={4}>
      <TextField label="Address" fullWidth />
    </Grid>

    <Grid item xs={4}>
      <TextField label="Company" fullWidth />
    </Grid>

   
    <Grid item xs={4}>
      <TextField label="Reference by / Source" fullWidth />
    </Grid>

   
    <Grid item xs={4}>
      <TextField label="Name of CP (if Channel Partner)" fullWidth />
    </Grid>

  
    <Grid item xs={4}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>Sales Executive Name</InputLabel>
        <Select
          value={salesExec}
          onChange={handleSalesExecChange}
          label="Sales Executive Name"
        >
          <MenuItem value="Shilpha Mewada 1">Shilpha Mewada 1</MenuItem>
          <MenuItem value="Tic Tac Toe Sohan">Tic Tac Toe Sohan</MenuItem>
          <MenuItem value="Shilpha Mewada">Shilpha Mewada</MenuItem>
          <MenuItem value="Vivek Tapkir">Vivek Tapkir</MenuItem>
          <MenuItem value="Shubham Taware">Shubham Taware</MenuItem>
          <MenuItem value="Ashwini Khot">Ashwini Khot</MenuItem>
          <MenuItem value="Amol Pawar">Amol Pawar</MenuItem>
          <MenuItem value="Sachin Awale">Sachin Awale</MenuItem>
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Grid>

    <Grid item xs={4}>
      <FormControl fullWidth error={!!error}>
        <InputLabel>Interested In</InputLabel>
        <Select
          value={interestedIn}
          onChange={handleInterestedInChange}
          label="Interested In"
        >
          <MenuItem value="2 BHK (Under construction)">
            2 BHK (Under construction)
          </MenuItem>
          <MenuItem value="3 BHK (Under Construction)">
            3 BHK (Under Construction)
          </MenuItem>
          <MenuItem value="2BHK">2BHK</MenuItem>
          <MenuItem value="3BHK">3BHK</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </Grid>


    
    
        <Grid item xs={4}>
          <FormControl fullWidth error={!!error}>
            <InputLabel>Budget (Approx.)</InputLabel>
            <Select value={budget} onChange={handleBudgetChange} label="Budget (Approx.)">
              <MenuItem value="45 L - 50 L">45 L - 50 L</MenuItem>
              <MenuItem value="51 L - 55 L">51 L - 55 L</MenuItem>
              <MenuItem value="56 to 60 L">56 to 60 L</MenuItem>
              <MenuItem value="61-65 L">61-65 L</MenuItem>
              <MenuItem value="66 -70 L">66 - 70 L</MenuItem>
              <MenuItem value="71L -75 L">71 L - 75 L</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>
    
     
        <Grid item xs={4}>
          <FormControl fullWidth error={!!error}>
            <InputLabel>Planning To Buy Within?</InputLabel>
            <Select
              value={planningToBuy}
              onChange={handlePlanningToBuyChange}
              label="Planning To Buy Within?"
            >
              <MenuItem value="Immediately">Immediately</MenuItem>
              <MenuItem value="Within Week">Within Week</MenuItem>
              <MenuItem value="Within 1 Month">Within 1 Month</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>
    
       
        <Grid item xs={4}>
          <FormControl fullWidth error={!!error}>
            <InputLabel>Occupation</InputLabel>
            <Select value={occupation} onChange={handleOccupationChange} label="Occupation">
              <MenuItem value="Service / Job">Service / Job</MenuItem>
              <MenuItem value="Business / Self employed">Business / Self employed</MenuItem>
              <MenuItem value="Professional">Professional</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>
    
        
        <Grid item xs={4}>
          <FormControl fullWidth error={!!error}>
            <InputLabel>Reason For Purchase</InputLabel>
            <Select
              value={reasonForPurchase}
              onChange={handleReasonForPurchaseChange}
              label="Reason For Purchase"
            >
              <MenuItem value="End Use">End Use</MenuItem>
              <MenuItem value="Investment">Investment</MenuItem>
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>
    
      
        <Grid item xs={4}>
          <TextField label="Customer Feedback & Complete Followup Details" fullWidth />
        </Grid>
  </Grid>

 
  <div className="mt-3">
    <Button variant="contained" color="success" onClick={handleSave}>
 Update
    </Button>
    <Button variant="outlined" color="error" onClick={handleCancel} style={{ marginLeft: "8px" }}>
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
