


import React, { useState,useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip, Input,TextField, Button ,Typography,Grid} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import { toast } from 'react-toastify';
const FirmTable = () => {

   const [firmName, setFirmName] = useState("");
    const [firmNameError, setFirmNameError] = useState("");
     const [firmPan, setFirmPan] = useState("");
      const [firmPanError, setFirmPanError] = useState("");
        const [selectedTab, setSelectedTab] = useState("firm");
         const [error, setError] = useState('');
          const [name, setName] = useState('');
          const [mobileNo, setMobileNo] = useState('');
          const [nameError, setNameError] = useState('');
          const [mobileNoError, setMobileNoError] = useState('');
          const [panError, setPanError] = useState("");
          const [ageError, setAgeError] = useState("");
            const [occupationError, setOccupationError] = useState(""); 
            const [mobileError, setMobileError] = useState("");
            const [emailError, setEmailError] = useState("");
            const [firmData, setFirmData] = useState([]); 
      const [showFirmForm, setShowFirmForm] = useState(false);
            const [aadhaarError, setAadhaarError] = useState(false);
const [aadhaarErrorMessage, setAadhaarErrorMessage] = useState("");



// useEffect(() => {
//   console.log("Firm Data Updated:", firms);
//   setFirmData(firms);
// }, [firms])
       
        const [fileNames, setFileNames] = useState({
          firmPanNoDocument: "",
          firmGstNoDocument: "",
          firmLightBillForAddressProof: "",
          partners: [], 
        });
        
        
        
          const [partners, setPartners] = useState([
            { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }
          ]);
          
          useEffect(() => {
              console.log("Updated Selected Tab:", selectedTab);
              loadLoansData();
            }, []);
          
            const loadLoansData = async () => {
              const data = await fetchLoansData();
              setLoans(data);
            };
          
         
  const [firms, setFirms] = useState([
    {
      id: 1,
      timestamp: "2025-03-31 12:00 PM",
      name: "ABC Pvt. Ltd.",
      address: "123 Street, City, State",
      firmPan: "path/to/firm-pan.pdf",
      firmGst: "path/to/firm-gst.pdf",
      firmLightBill: "path/to/firm-light-bill.pdf",
      residentialAddress: "456 Residence, City, State",
      panNo: "AABCF1234X",
      aadhaarNo: "1234-5678-9101",
      photo: "path/to/photo.jpg",
      lightBill: "path/to/light-bill.pdf",
    },
    {
      id: 2,
      timestamp: "2025-03-30 02:30 PM",
      name: "XYZ Enterprises",
      address: "789 Avenue, City, State",
      firmPan: "path/to/firm-pan2.pdf",
      firmGst: "path/to/firm-gst2.pdf",
      firmLightBill: "path/to/firm-light-bill2.pdf",
      residentialAddress: "123 Residence, City, State",
      panNo: "XYZAB1234P",
      aadhaarNo: "9876-5432-1011",
      photo: "path/to/photo2.jpg",
      lightBill: "path/to/light-bill2.pdf",
    },
  ]);


  
  const [editFirm, setEditFirm] = useState(null);

  const handleEdit = (firm) => {
    setEditFirm(firm);
  };

  const handleChange = (e) => {
    setEditFirm({ ...editFirm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setFirms((prev) => prev.map((firm) => (firm.id === editFirm.id ? editFirm : firm)));
    setEditFirm(null);
  };

  const validateAadhaar = (aadhaar) => {
    const aadhaarRegex = /^[0-9]{12}$/; // Regex to check if it's exactly 12 digits
    return aadhaarRegex.test(aadhaar);
  };
  
  
  const handleRemovePartner = () => {
    setPartners(partners.slice(0, partners.length - 1)); // Remove the last partner
  };
  
  const handleView = (document) => {
    window.open(document, '_blank');
  };

  const handleFileChange = (e, partnerIndex, key) => {
    const file = e.target.files[0]; 
    if (file) {
      
      const updatedPartners = [...fileNames.partners];
      
   
      updatedPartners[partnerIndex] = {
        ...updatedPartners[partnerIndex], 
        [key]: file.name || "Unknown file",
      };
      
      
      setFileNames((prevState) => ({
        ...prevState,
        partners: updatedPartners, 
      }));
    }
  };
  
  
  


  const handlePartnerChange = (e, index, label) => {
    const newPartners = [...partners];
    newPartners[index] = {
      ...newPartners[index],
      [label.toLowerCase().replace(/ /g, "")]: e.target.value,
    };
    setPartners(newPartners);
  };
  
  const handleFirmNameChange = (e) => {
    const value = e.target.value;


    if (/\d/.test(value)) {
      setFirmNameError("Firm Name should only contain letters"); 
    } else {
      setFirmNameError(""); 
    }

    
    setFirmName(value);
  };

  
  
  const handleFirmPanChange = (e) => {
    const value = e.target.value;
    setFirmPan(value);
 
    const panRegex = /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/;
    if (!panRegex.test(value)) {
      setFirmPanError("Invalid PAN format. Format should be: AAAAA1234A");
    } else {
      setFirmPanError("");  
    }
  };


  
  const handlePANChange = (e, index) => {
    const updatedPartner = { ...partners[index], pan: e.target.value };
    
    // Validate PAN No.
    const isValidPAN = validatePAN(updatedPartner.pan);
    if (!isValidPAN) {
      setPanError("Invalid PAN number format.");
    } else {
      setPanError(""); // Clear error if valid
    }
  };
  
  
  const handlePartnerNameChange = (e, index) => {
    const value = e.target.value;
    const partnerCopy = [...partners];
    
    // Regex to check if the value contains any numbers
    if (/\d/.test(value)) {
      setNameError("Name should only contain letters"); // Error message if numbers are present
    } else {
      setNameError(""); // Clear error message if the value is valid
    }

    // Update the partner's name in the state
    partnerCopy[index] = { ...partnerCopy[index], name: value };
    setPartners(partnerCopy);
  };
  const handleAgeChange = (e, index) => {
    const value = e.target.value;
    const updatedPartners = [...partners];
    updatedPartners[index].age = value; // Update the age of the specific partner
    setPartners(updatedPartners); // Update the state
  
    // Validate the age value
    validateAge(value); // You should already have this function defined
  };

  

  const validateAge = (age) => {
    if (!age || age < 0 || age > 120) {
      setAgeError("Please enter a valid age between 0 and 120");
    } else {
      setAgeError("");
    }
  };

  const handleEmailChange = (e, index) => {
    const value = e.target.value;
    const partnerCopy = [...partners];
  

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/i;


  
    if (value && !emailRegex.test(value)) {
      setEmailError("Invalid Gmail address");
      console.log("invalid email");
    } else {
      setEmailError(""); 
    }
  
    
    partnerCopy[index] = { ...partnerCopy[index], email: value };
    setPartners(partnerCopy);
  };
 
  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format: 5 letters, 4 digits, 1 letter
    return panPattern.test(pan);
  };
  return (



    <TableContainer component={Paper} sx={{  }}>
      {editFirm ? (
     
        <div className="firm-form mt-4 p-3" style={{ maxHeight: "500px", overflowY: "auto", paddingRight: "10px" }}>
        <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Firm Details
          </Typography>
    
        
          <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField
          label="Firm Name"
          fullWidth
          variant="outlined"
          value={firmName}
          onChange={handleFirmNameChange} 
          error={!!firmNameError} 
          helperText={firmNameError} 
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Firm Address"
          fullWidth
          variant="outlined"
        />
      </Grid>
    
      <Grid item xs={6}>
        <TextField
          label="Firm PAN No"
          fullWidth
          variant="outlined"
          value={firmPan}
                onChange={handleFirmPanChange}
                error={!!firmPanError}  // Show error if there is an error
                helperText={firmPanError}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Firm GST No"
          fullWidth
          variant="outlined"
        />
      </Grid>
    </Grid>
    
    
       
    
      <Grid container spacing={2}>
      {[{ label: "Firm PAN No Document", key: "firmPanNoDocument" },
        { label: "Firm GST No Document", key: "firmGstNoDocument" },
        { label: "Firm Light Bill for Address Proof Document", key: "firmLightBillForAddressProof" }]
        .map((item, index) => (
          <Grid item xs={6} key={index}>
            <Typography variant="body2" gutterBottom style={{ paddingTop: "16px" }}>
              {item.label}
            </Typography>
            <label>
              <Input
                type="file"
                style={{ display: "none" }}
                id={`file-input-firm-${index}`}
                onChange={(e) => handleFileChange(e, 0, item.key)} 
              />
              <Button variant="contained" color="light" component="span">
                Choose File
              </Button>
            </label>

      
            {fileNames.partners[0]?.[item.key] && (
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {fileNames.partners[0][item.key]}
              </Typography>
            )}
          </Grid>
        ))}
          </Grid>
        
       {/* Partner Details Section */}
       <Typography variant="h5" className="mt-4" gutterBottom>
      Partner Details
    </Typography>

  
    {partners.map((partner, index) => (
      <Paper key={index} className="p-3 mb-3" elevation={2} style={{ borderRadius: "10px" }}>
        <Grid container spacing={2}>
          {["Name", "Age", "Occupation", "Mobile No.", "Mail ID", "Residential Address", "PAN No.", "Aadhaar No.",
            "Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"]
            .map((label, i) => (
              <Grid item xs={6} key={i}>
               
                {["Residential Address Document", "Pan No Document", "Aadhar No Document", "Photo Document", "Light Bill For Address Proof Document"].includes(label) ? (
                  <>
                    <Typography variant="body2" gutterBottom>{label}</Typography>
                    <label>
                      <Input
                        type="file"
                        style={{ display: "none" }} 
                        id={`file-input-partner-${index}-${label}`} 
                        onChange={(e) => handleFileChange(e, index, label)} 
                      />
                      <Button variant="contained" color="light" component="span">
                        Choose File
                      </Button>
                    </label>
                    
                
                    {fileNames.partners[index]?.[label] && (
  <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
    {fileNames.partners[index][label]} 
  </Typography>
)}

                  </>
                ) : (
                 

                  <TextField
  label={label}
  fullWidth
  variant="outlined"
  type={label === "Age" ? "text" : "text"} // You can adjust the type based on the label
  value={partner[label.toLowerCase().replace(/ /g, "")]} 
  onChange={(e) => {
    if (label === "Age") {
      handleAgeChange(e, index);  
    } else if (label === "Occupation") {
      handleOccupationChange(e, index); 
    } else if (label === "Name") {
      handlePartnerNameChange(e, index); 
    } else if (label === "Mobile No.") {
      handleMobileChange(e, index); 
    } else if (label === "Mail ID") {
      handleEmailChange(e, index); 
    } else if (label === "PAN No.") {
      handlePANChange(e, index); 
    } else if (label === "Aadhaar No.") {
      const aadhaar = e.target.value;
      if (validateAadhaar(aadhaar)) {
        setAadhaarError(false); // Reset error if valid
        handleAadhaarChange(e, index); // Custom handler for Aadhaar field
      } else {
        setAadhaarError(true); // Set error if invalid
        setAadhaarErrorMessage("Aadhaar number should be exactly 12 digits.");
      }
    }
  }}
  error={ 
    (label === "Name" && nameError) ||
    (label === "Mobile No." && mobileError) ||
    (label === "Mail ID" && emailError) ||
    (label === "PAN No." && panError) ||
    (label === "Age" && ageError) ||
    (label === "Occupation" && occupationError) ||
    (label === "Aadhaar No." && aadhaarError)
  }
  helperText={ 
    (label === "Name" && nameError) ||
    (label === "Mobile No." && mobileError) ||
    (label === "Mail ID" && emailError) ||
    (label === "PAN No." && panError) ||
    (label === "Age" && ageError) ||
    (label === "Occupation" && occupationError) ||
    (label === "Aadhaar No." && aadhaarError && aadhaarErrorMessage)
  }
/>

                
                )}
              </Grid>
            ))}
        </Grid>
      </Paper>
    ))}
    
    
          <Button className="m-3 m-2" variant="contained" color="primary" onClick={() => setPartners([...partners, {}])}>
            <FaPlus /> Add Partner
          </Button>
            
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'red', // Red background
              '&:hover': {
                backgroundColor: '#d32f2f', // Darker red on hover
              }
            }}
            onClick={handleRemovePartner} // Pass the index to remove the partner
            className="m-2"
          >
            Remove Partner
          </Button>
    <br/>

    {/* <Button
            variant="contained"
            className="m-3"
            color="success"
            onClick={() => {
             
              toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });
    
              setShowFirmForm(false); 
            }}
          >
        Update
          </Button> */}

<Button
  variant="contained"
  className="m-3"
  color="success"
  onClick={() => {
    handleSave(); // First update the firm details
    toast.success("Details are Updated!", { position: "top-right", autoClose: 3000 });
    setShowFirmForm(false);  // Then close the form
  }}
>
  Update
</Button>


       
        
        </Paper>
      </div>
      ) : (
        <Table>
          <TableHead>
          <TableRow sx={{ background: "#3621a9" }}>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM NAME</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM ADDRESS</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM PAN NO</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM GST NO</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM PAN</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM GST</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FIRM LIGHT BILL</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARTNER NAME</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGE</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MOBILE NO.</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>MAIL ID</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RESIDENTIAL ADDRESS</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PAN NO</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AADHAAR NO</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PHOTO</TableCell>
  <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LIGHT BILL</TableCell>
</TableRow>

          </TableHead>
          <TableBody>
            {firms.map((firm,index) => (
              
  <TableRow key={index}>
    <TableCell>
      <Tooltip title="Edit">
        <IconButton 
          size="small" 
          sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }} 
          onClick={() => handleEdit(firm)}
        >
          <EditIcon sx={{ fontSize: "18px" }} />
        </IconButton>
      </Tooltip>
    </TableCell>
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.timestamp}</TableCell>
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.name}</TableCell>
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.address}</TableCell>
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.firmPanNo}</TableCell>
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>{firm.firmGstNo}</TableCell>

  
    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.firmPan)} 
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.firmGst)} 
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.firmLightBill)}
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>
<TableCell></TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.residentialAddress)} 
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.panNo)} 
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.aadhaarNo)} 
         sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.photo)}
        sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>

    <TableCell sx={{ color: "black", fontWeight: "bold" }}>
      <IconButton onClick={() => handleView(firm.lightBill)}
        sx={{ backgroundColor: "blue", borderRadius: "50%", padding: "3px" }}>
        <Visibility sx={{ color: "white" }} />
      </IconButton>
    </TableCell>
  </TableRow>
))}
         
          </TableBody>
        </Table>
      )}
    </TableContainer>

   
  );
};

export default FirmTable;
