import React ,{useState} from "react";
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper ,IconButton,Tooltip, } from "@mui/material";
import { Edit, WhatsApp, Email } from "@mui/icons-material";
import { Visibility } from "@mui/icons-material";

import { Modal } from '@mui/material';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { toast } from 'react-toastify';

const openDocument = (url) => {
  if (!url) return; 

  window.open(url, "_blank");
};


const handleEditClick = (item) => {
  setSelectedItem(item);
  setOpenEditModal(true);
};

  const handleUpdate = () => {
    console.log("Updated Data:", selectedItem);
    // setOpenEditModal(false);
    setTimeout(() => {
      setOpenEditModal(false); // Close modal after 3 seconds
    }, 3000);
  };

const BookingFormTable= ({ data }) => {

  const [openEditModal, setOpenEditModal] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);
 const [firmName, setFirmName] = useState("");
    const [firmNameError, setFirmNameError] = useState("");
    const [dateOfFlatBooking, setDateOfFlatBooking] = useState(null);
      const [closingExecutive, setClosingExecutive] = useState('');
   const [firmPan, setFirmPan] = useState("");
    const [firmPanError, setFirmPanError] = useState("");
  const [leadType, setLeadType] = useState("");
  const [panNumber, setPanNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileNoError, setMobileNoError] = useState('');
    const [panError, setPanError] = useState("");
    const [aadharNo, setAadharNo] = useState('');
    const[aadhaar,setAadhar] =useState(false);
    const [aadharNo2, setAadharNo2] = useState('');
    const [aadharNo2Error, setAadharNo2Error] = useState('');
      const [alternateMobileNo, setAlternateMobileNo] = useState('');  // Define state for alternate mobile number
      const [alternateMobileError, setAlternateMobileError] = useState('');
const [aadharNumber, setAadharNumber] = useState('');
const [whatsAppNo, setWhatsAppNo] = useState('');
const [whatsAppError, setWhatsAppError] = useState('');

   const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState("");
  const [emailId1, setEmailId1] = useState("");
const [aadharError, setAadharError] = useState('');
    const [panCardFiles, setPanCardFiles] = useState([]); 
    const [address, setAddress] = useState('');
    const [coAllotteeName, setCoAllotteeName] = useState('');
    const [coAllotteeDob, setCoAllotteeDob] = useState('');
    const [coAllotteeOccupation, setCoAllotteeOccupation] = useState('');
    const [coAllotteePan, setCoAllotteePan] = useState(""); 
    const [coAllotteeAadhar, setCoAllotteeAadhar] = useState("");
    const [coAllotteeAadharError, setCoAllotteeAadharError] = useState("");
  const [mobileEmail, setMobileEmail] = useState('');
  
      const [carpetArea, setCarpetArea] = useState('');
        const [showFirmForm, setShowFirmForm] = useState(false);
        const [wing, setWing] = useState('');
        const [flatNo, setFlatNo] = useState('');
          const [type, setType] = useState('');
          const [soldRate, setSoldRate] = useState('');
          const [enclosedBalcony, setEnclosedBalcony] = useState('');
          const [openBalcony, setOpenBalcony] = useState('');
          const [terrace, setTerrace] = useState('');
          const [parking, setParking] = useState('');
          const [floor, setFloor] = useState('');
          const [bookingAmount, setBookingAmount] = useState('');
            const [totalConsideration, setTotalConsideration] = useState('');
            const [stampDuty, setStampDuty] = useState('');
            const [registrationFee, setRegistrationFee] = useState('');
            const [gstAmount, setGstAmount] = useState('');
          
            // State for Section 4: Documents
            const [panCard, setPanCard] = useState('');
            const [aadhaarCard, setAadhaarCard] = useState('');
            const [marriageCertificate, setMarriageCertificate] = useState('');
            const [passportPhoto, setPassportPhoto] = useState('');
            const [otherDocuments, setOtherDocuments] = useState('');
           
            // State for Section 5: Booking Payment Mode
            const [paymentMode, setPaymentMode] = useState('');
            const [chequeNo, setChequeNo] = useState('');
            const [chequeDate, setChequeDate] = useState('');
            const [bankName, setBankName] = useState('');
            const [bankDetails, setBankDetails] = useState('');
           
  const handlePanCardChange = (e) => {
    const files = Array.from(e.target.files);  // Convert FileList to Array
    // setPanCardFiles(files);
    setPanCardFiles((prev) => [...prev, ...files]);

  };


  const handleWhatsAppChange = (e) => {
    const value = e.target.value;
    if (value.length > 10) {
      setWhatsAppNoError('WhatsApp No. cannot exceed 10 digits');
    } else {
      setWhatsAppNoError('');
    }
    setWhatsAppNo(value);
  };
 

  const handleEmailChange = (e, index) => {
    const value = e.target.value;
    const partnerCopy = [...partners];
  
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  
    if (value && !emailRegex.test(value)) {
      setEmailError("Invalid Gmail address");
      console.log("invalid email");
    } else {
      setEmailError(""); 
    }
  
    partnerCopy[index] = { ...partnerCopy[index], email: value };
    setPartners(partnerCopy);
  };

  const handleEmailChange1 = (event) => {
    const value = event.target.value;
  
    // Email Regex for all domain validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid Email ID');
    } else {
      setEmailError('');
    }
  
    setEmailId1(value);
  };
    
  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase(); 
  

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  
    if (value.length > 10) {
      setPanError("PAN No. must be exactly 10 characters");
    } else if (value.length === 10 && !panRegex.test(value)) {
      setPanError("Invalid PAN No. format");
    } else {
      setPanError(""); 
    }
  
    setPanNumber(value);
  };

   // For second PAN field (Co-Allottee PAN)
const handleCoAllotteePanChange = (e) => {
  setCoAllotteePan(e.target.value);
};

const handleCoAllotteeAadharChange = (e) => {
  const value = e.target.value;
  if (value.length > 12) {
    setCoAllotteeAadharError("AADHAR No. cannot exceed 12 digits");
  } else {
    setCoAllotteeAadharError("");
  }
  setCoAllotteeAadhar(value);
};
  
    const handleOccupationChange = (e, index) => {
      const value = e.target.value;
      const updatedPartners = [...partners];
      updatedPartners[index].occupation = value; 
      setPartners(updatedPartners); 
    };
  

  const handleAadharChange = (e) => {
    const value = e.target.value;
  
    if (!/^\d*$/.test(value)) {
      // If non-numeric value is entered
      setAadharError('Only numbers are allowed');
    } else if (value.length < 12) {
      setAadharError('Aadhar number must be 12 digits');
    } else {
      setAadharError('');
    }
  
    setAadharNo(value);
  };
  
  const handleAadharNo2Change = (e) => {
    const value = e.target.value;
  
    if (!/^\d*$/.test(value)) {
      setAadharNo2Error('Only numbers are allowed');
    } else if (value.length < 12) {
      setAadharNo2Error('Aadhar number must be 12 digits');
    } else {
      setAadharNo2Error('');
    }
  
    setAadharNo2(value);
  };
  

  const handlePartnerNameChange = (e, index) => {
    const value = e.target.value;
    const partnerCopy = [...partners];
    
   
    if (/\d/.test(value)) {
      setNameError("Name should only contain letters"); 
    } else {
      setNameError(""); 
    }

    partnerCopy[index] = { ...partnerCopy[index], name: value };
    setPartners(partnerCopy);
  };


 

  // const handleEmailChange1 = (e) => {
  //   setEmailId1(e.target.value); // Update email state correctly
  // };

  const validateFirmName = () => {
    if (!firmName.trim()) {
      setFirmNameError("Firm Name is required.");
      return false;
    }
    setFirmNameError("");
    return true;
  };




    const handleNameChange = (e) => {
      const value = e.target.value;
    
      // Check if input contains only alphabets and spaces
      if (/[^a-zA-Z\s]/.test(value)) {
        setFirmPanError('Name should only contain letters and spaces.');
      } else {
        setFirmPanError('');
      }
    
      setFirmPan(value);
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

    const handleClosingExecutiveChange = (event) => {
      setClosingExecutive(event.target.value);
    };


   
  return (
    <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          {/* <TableRow sx={{ bgcolor: "primary.main" }}> */}
           <TableRow sx={{background:"#3621a9"}}>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ACTION</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PROJECT NAME</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF FLAT BOOKING</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF ALOTEE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SOURCE NAME</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BIRTH</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>OCCUPATION</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PAN NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AADHAR NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MOBILE NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ALTERNATE MOBILE NO</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WHATSAPP NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>EMAIL ID</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ADDRESS</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF CO-ALOTEE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BIRTH (CO-ALOTEE)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>OCCUPATION (CO-ALOTEE)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PAN NO. (CO-ALOTEE)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AADHAR NO. (CO-ALOTEE)</TableCell>

            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MOBILE NO. & EMAIL (CO-ALOTEE)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLAT NO.</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TYPE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WING</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SOLD RATE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CARPET AREA IN (SQ. MTR.)</TableCell>


            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ENCLOSED BALCONY IN (SQ. MTR.)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>OPEN BALCONY IN (SQ. MTR.)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TERRACE IN (SQ. MTR.)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PARKING</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLOOR</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TOTAL CONSIDERATION /AGREEMENT VALUE	</TableCell>

            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING AMOUNT / ADVANCE PAYMENT</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>STAMP DUTY (7% OF AGREEMENT COST)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>REGISTRATION FEE(1% OF AGREEMENT COST)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>GST AMOUNT</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PAN CARD(OF BOTH)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AADHAR CARD(OF BOTH)</TableCell>


            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>MARRIAGE CERTIFICATE (IF AVAILABLE)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PASSPORT SIZE PHOTO (OF BOTH)</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ANY OTHER</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BOOKING AMOUNT</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PAYMENT MODE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CHEQUE/TRN NO.</TableCell>

            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CHEQUE/TRN DATE</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BANK NAME</TableCell>
            <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BANK DETAILS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
           
          

<TableCell sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
  <Tooltip title="Edit" arrow>
  <IconButton 
  sx={{ background: "#1976D2", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
  onClick={() => {
    setSelectedItem(item);    // set clicked row data
    setOpenEditModal(true);   // open modal
  }}
>
  <Edit sx={{ fontSize: 18 }} />
</IconButton>

  </Tooltip>

  <Tooltip title="WhatsApp" arrow>
    <IconButton 
      sx={{ background: "#25D366", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
      onClick={() => handleWhatsAppClick(item)}
    >
      <WhatsApp sx={{ fontSize: 18 }} />
    </IconButton>
  </Tooltip>

  <Tooltip title="Email" arrow>
    <IconButton 
      sx={{ background: "#D44638", color: "white", borderRadius: "50%", width: 32, height: 32, p: 0.5 }}
      onClick={() => handleEmailClick(item)}
    >
      <Email sx={{ fontSize: 18 }} />
    </IconButton>
  </Tooltip>
</TableCell>


<TableCell>{item.timestamp}</TableCell>
<TableCell>{item.enquiryNo}</TableCell>
<TableCell>{item.projectName}</TableCell>
<TableCell>{item.dateOfFlatBooking}</TableCell>
<TableCell>{item.nameOfAllotee}</TableCell>
<TableCell>{item.sourceName}</TableCell>
<TableCell>{item.dateOfBirth}</TableCell>
<TableCell>{item.occupation}</TableCell>
<TableCell>{item.panNo}</TableCell>
<TableCell>{item.aadharNo}</TableCell>
<TableCell>{item.mobileNo}</TableCell>
<TableCell>{item.alternateMobileNo}</TableCell>
<TableCell>{item.whatsappNo}</TableCell>
<TableCell>{item.emailId}</TableCell>
<TableCell>{item.address}</TableCell>
<TableCell>{item.nameOfCoAllotee}</TableCell>
<TableCell>{item.dateOfBirthCoAllotee}</TableCell>
<TableCell>{item.occupationCoAllotee}</TableCell>
<TableCell>{item.panNoCoAllotee}</TableCell>
<TableCell>{item.aadharNoCoAllotee}</TableCell>
<TableCell>{item.mobileEmailCoAllotee}</TableCell>
<TableCell>{item.flatNo}</TableCell>
<TableCell>{item.type}</TableCell>
<TableCell>{item.wing}</TableCell>
<TableCell>{item.soldRate}</TableCell>
<TableCell>{item.carpetAreaSqMtr}</TableCell>
<TableCell>{item.enclosedBalconySqMtr}</TableCell>
<TableCell>{item.openBalconySqMtr}</TableCell>
<TableCell>{item.terraceSqMtr}</TableCell>
<TableCell>{item.parking}</TableCell>
<TableCell>{item.floor}</TableCell>
<TableCell>{item.totalConsideration}</TableCell>
<TableCell>{item.bookingAmount}</TableCell>
<TableCell>{item.stampDuty}</TableCell>
<TableCell>{item.registrationFee}</TableCell>
<TableCell>{item.gstAmount}</TableCell>

 <TableCell>
  <IconButton 
    sx={{ color: "#1976D2" }} 
    onClick={() => openDocument(item.panCardBoth)}
  >
    <Visibility />
  </IconButton>
</TableCell> 


<TableCell>
  <IconButton 
    sx={{ color: "#1976D2" }} 
    onClick={() => openDocument(item.aadharCardBoth)}
  >
    <Visibility />
  </IconButton>
</TableCell>


<TableCell>
  <IconButton 
    sx={{ color: "#1976D2" }} 
    onClick={() => openDocument(item.marriageCertificate)}
  >
    <Visibility />
  </IconButton>
</TableCell>

<TableCell>
  <IconButton 
    sx={{ color: "#1976D2" }} 
    onClick={() => openDocument(item.passportSizePhotoBoth)}
  >
    <Visibility />
  </IconButton>
</TableCell>

<TableCell>
  <IconButton 
    sx={{ color: "#1976D2" }} 
    onClick={() => openDocument(item.anyOther)}
  >
    <Visibility />
  </IconButton>
</TableCell>
<TableCell>{item.bookingAmount}</TableCell>
<TableCell>{item.paymentMode}</TableCell>
<TableCell>{item.chequeTrnNo}</TableCell>
<TableCell>{item.chequeTrnDate}</TableCell>
<TableCell>{item.bankName}</TableCell>
<TableCell>{item.bankDetails}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>



<Modal
  open={openEditModal}
  onClose={() => setOpenEditModal(false)}
>
<div className="firm-form mt-4 p-5" style={{ maxHeight: "700px", overflowY: "auto", paddingRight: "10px" }}>
      <Paper className="p-4" elevation={4} style={{ borderRadius: "12px", paddingBottom: "20px" }}>
        <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 1: Personal Information
        </Typography>
  
       
        
        <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        label="Enquiry No."
        fullWidth
        variant="outlined"
        value={firmName}
        onChange={handleFirmNameChange} 
        error={!!firmNameError} 
        helperText={firmNameError} 
        required 
      />
    </Grid>
   
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel id="closing-executive-label">Project Name</InputLabel>
          <Select
            labelId="closing-executive-label"
            id="closing-executive"
            value={closingExecutive}
            onChange={handleClosingExecutiveChange}
            label="Select Sales Person"
          >
            {/* Sales Person options */}
            <MenuItem value="Shilpha Mewada 1">Project Name</MenuItem>
            <MenuItem value="Tic Tac Toe Sohan">Project Name</MenuItem>
            <MenuItem value="Shilpha Mewada">Sohan Enterprised</MenuItem>
           
          </Select>
        </FormControl>
      </Grid>
   

  
    

<Grid item xs={6}>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label="Date Of Flat Booking"
      value={dateOfFlatBooking}
      onChange={(newValue) => setDateOfFlatBooking(newValue)}
      renderInput={(params) => (
        <TextField 
          {...params} 
          fullWidth 
          variant="outlined" 
        />
      )}
    />
  </LocalizationProvider>
</Grid>
<Grid item xs={6}>
  <TextField
    label="NAME OF ALOTEE"
    fullWidth
    variant="outlined"
    value={firmPan}
    onChange={handleNameChange}   // Replaced Function Name
    error={!!firmPanError}        // Show error if there is an error
    helperText={firmPanError}
    required
  />
</Grid>

    
    
    <Grid item xs={6}>
  <TextField
    type="datetime-local" 
    label="Source Name"
    fullWidth
    variant="outlined"
    required 
    InputLabelProps={{
      shrink: true, 
    }}
  />
</Grid>


<Grid item xs={6}>
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
      label="Date Of Birth"
      value={dateOfFlatBooking}
      onChange={(newValue) => setDateOfFlatBooking(newValue)}
      renderInput={(params) => (
        <TextField 
          {...params} 
          fullWidth 
          variant="outlined" 
        />
      )}
    />
  </LocalizationProvider>
</Grid>

<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel htmlFor="occupation">Occupation</InputLabel>
    <TextField
      id="occupation"
      label="Occupation"
      variant="outlined"
      value={leadType} // Bind to state for the occupation value
      onChange={(e) => setLeadType(e.target.value)} // Update the state on change
      required
    />
  </FormControl>
</Grid>


<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <TextField
      label="PAN No."
      variant="outlined"
      value={panNumber}
      onChange={handlePanChange}  // Validation Function
      error={!!panError}         // Show error if invalid
      helperText={panError}      // Show error message
      inputProps={{ maxLength: 10 }}  // PAN has 10 characters
    />
  </FormControl>
</Grid>

<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <TextField
      label="AADHAR No."
      variant="outlined"
      value={aadharNo2}
      onChange={handleAadharNo2Change}
      error={!!aadharNo2Error}
      helperText={aadharNo2Error}
      inputProps={{ maxLength: 12 }} 
    />
  </FormControl>
</Grid>



<Grid item xs={6}>
  <TextField
    label="Mobile No"
    fullWidth
    variant="outlined"
    value={alternateMobileNo}
    onChange={(e) => {
      const value = e.target.value;

      
      if (value.length <= 10) {
        setAlternateMobileNo(value); 
        setAlternateMobileError(""); 
      } else {
        setAlternateMobileError("Mobile number cannot exceed 10 digits"); 
      }
    }}
    error={!!alternateMobileError} 
    helperText={alternateMobileError} 
    inputProps={{
      maxLength: 10, 
    }}
  />
</Grid>
<Grid item xs={6}>
  <TextField
    label="Alternate Mobile No"
    fullWidth
    variant="outlined"
    value={alternateMobileNo}
    onChange={(e) => {
      const value = e.target.value;

     
      if (value.length <= 10) {
        setAlternateMobileNo(value);
        setAlternateMobileError(""); 
      } else {
        setAlternateMobileError("Mobile number cannot exceed 10 digits"); 
      }
    }}
    error={!!alternateMobileError} 
    helperText={alternateMobileError} 
    inputProps={{
      maxLength: 10, 
    }}
  />
</Grid>

<Grid item xs={6}>
  <TextField
    label="WhatsApp No."
    fullWidth
    variant="outlined"
    value={whatsAppNo}
    onChange={handleWhatsAppChange}
    error={!!whatsAppError} 
    helperText={whatsAppError} 
    inputProps={{
      maxLength: 10, 
    }}
  />
</Grid>


<Grid item xs={6}>
  <TextField
    label="Email ID"
    fullWidth
    variant="outlined"
    value={emailId1} 
    onChange={handleEmailChange1} 
    error={!!emailError}
    helperText={emailError}
  />
</Grid>



<Grid item xs={6}>
  <TextField
    label="AADHAR No."
    fullWidth
    variant="outlined"
    value={aadharNo}
    onChange={handleAadharChange}  // Handle the change
    error={!!aadharError}          // Show error if there's a validation error
    helperText={aadharError}       // Display the error message
    inputProps={{
      maxLength: 12,               // Limit to 12 digits
      inputMode: 'numeric',        // Mobile-friendly number keyboard
    }}
  />
</Grid>


<Grid item xs={6}>
  <TextField
    label="Address"
    fullWidth
    variant="outlined"
    value={address}
    onChange={(e) => setAddress(e.target.value)} // Update state with entered value
  />
</Grid>


<Grid item xs={6}>
  <TextField
    label="Name of Co-Allottee"
    fullWidth
    variant="outlined"
    value={coAllotteeName}
    onChange={(e) => setCoAllotteeName(e.target.value)} // Update state with entered value
  />
</Grid>


<Grid item xs={6}>
  <TextField
    label="Date Of Birth (Co-Allottee)"
    fullWidth
    variant="outlined"
    type="date"
    value={coAllotteeDob} // Make sure to define this state in your component
    onChange={(e) => setCoAllotteeDob(e.target.value)} // Updates state with the entered value
    InputLabelProps={{
      shrink: true, // Ensures the label stays above the field when a date is selected
    }}
  />
</Grid>


<Grid item xs={6}>
  <TextField
    label="Occupation (Co-Allottee)"
    fullWidth
    variant="outlined"
    value={coAllotteeOccupation} // Make sure to define this state in your component
    onChange={(e) => setCoAllotteeOccupation(e.target.value)} // Updates state with the entered value
  />
</Grid>

<Grid item xs={6}>
  <TextField
    label="PAN No. (Co-Allottee)"
    fullWidth
    variant="outlined"
    value={coAllotteePan} // Uses second PAN-specific state
    onChange={handleCoAllotteePanChange} // Second PAN handler
  />
</Grid>

<Grid item xs={6}>
  <TextField
    label="AADHAR No. (Co-Allottee)"
    fullWidth
    variant="outlined"
    value={coAllotteeAadhar} // Uses second AADHAR-specific state
    onChange={handleCoAllotteeAadharChange} // Second AADHAR handler
    error={!!coAllotteeAadharError} // Shows error if validation fails
    helperText={coAllotteeAadharError} // Displays error message
    inputProps={{ maxLength: 12 }} // Ensures AADHAR No. can't exceed 12 digits
  />
</Grid>


<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="status-label"></InputLabel>
    <TextField
      id="mobile-email"
      label="MOBILE No. & EMAIL (Co-Alotee)"
      variant="outlined"
      value={mobileEmail}
      onChange={(e) => setMobileEmail(e.target.value)} // Update the state with the input value
    />
  </FormControl>
</Grid>
</Grid>
<hr/>

<Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
Section 2: Particulars of Flat
        </Typography>

        <Grid container spacing={2}>
  {/* Carpet Area (Sq. Mtr.) */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="carpet-area-label">Carpet Area in (Sq. Mtr.)</InputLabel>
      <Select
        labelId="carpet-area-label"
        id="carpet-area"
        value={carpetArea}
        onChange={(e) => setCarpetArea(e.target.value)}
        label="Carpet Area in (Sq. Mtr.)"
      >
        <MenuItem value="100">100</MenuItem>
        <MenuItem value="150">150</MenuItem>
        <MenuItem value="200">200</MenuItem>
        <MenuItem value="250">250</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Wing */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="wing-label">Wing</InputLabel>
      <Select
        labelId="wing-label"
        id="wing"
        value={wing}
        onChange={(e) => setWing(e.target.value)}
        label="Wing"
      >
        <MenuItem value="A">A</MenuItem>
        <MenuItem value="B">B</MenuItem>
        <MenuItem value="C">C</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Flat No. */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="flat-no-label">FLAT No.</InputLabel>
      <Select
        labelId="flat-no-label"
        id="flat-no"
        value={flatNo}
        onChange={(e) => setFlatNo(e.target.value)}
        label="FLAT No."
      >
        <MenuItem value="101">101</MenuItem>
        <MenuItem value="102">102</MenuItem>
        <MenuItem value="103">103</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Type */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="type-label">Type</InputLabel>
      <Select
        labelId="type-label"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        label="Type"
      >
        <MenuItem value="2BHK">2BHK</MenuItem>
        <MenuItem value="3BHK">3BHK</MenuItem>
        <MenuItem value="4BHK">4BHK</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Sold Rate */}
  <Grid item xs={6}>
    <TextField
      label="Sold Rate"
      fullWidth
      variant="outlined"
      value={soldRate}
      onChange={(e) => setSoldRate(e.target.value)}
      type="number"
    />
  </Grid>

  {/* Enclosed Balcony (Sq. Mtr.) */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="enclosed-balcony-label">Enclosed Balcony in (Sq. Mtr.)</InputLabel>
      <Select
        labelId="enclosed-balcony-label"
        id="enclosed-balcony"
        value={enclosedBalcony}
        onChange={(e) => setEnclosedBalcony(e.target.value)}
        label="Enclosed Balcony in (Sq. Mtr.)"
      >
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
        <MenuItem value="20">20</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Open Balcony (Sq. Mtr.) */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="open-balcony-label">Open Balcony in (Sq. Mtr.)</InputLabel>
      <Select
        labelId="open-balcony-label"
        id="open-balcony"
        value={openBalcony}
        onChange={(e) => setOpenBalcony(e.target.value)}
        label="Open Balcony in (Sq. Mtr.)"
      >
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Terrace (Sq. Mtr.) */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="terrace-label">Terrace in (Sq. Mtr.)</InputLabel>
      <Select
        labelId="terrace-label"
        id="terrace"
        value={terrace}
        onChange={(e) => setTerrace(e.target.value)}
        label="Terrace in (Sq. Mtr.)"
      >
        <MenuItem value="30">30</MenuItem>
        <MenuItem value="40">40</MenuItem>
        <MenuItem value="50">50</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Parking */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="parking-label">Parking</InputLabel>
      <Select
        labelId="parking-label"
        id="parking"
        value={parking}
        onChange={(e) => setParking(e.target.value)}
        label="Parking"
      >
        <MenuItem value="Stack Parking">Stack Parking</MenuItem>
        <MenuItem value="Open car parking">Open car parking</MenuItem>
        <MenuItem value="Covered car parking">Covered car parking</MenuItem>
        <MenuItem value="Basement car parking">Basement car parking</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Floor */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="floor-label">Floor</InputLabel>
      <Select
        labelId="floor-label"
        id="floor"
        value={floor}
        onChange={(e) => setFloor(e.target.value)}
        label="Floor"
      >
        <MenuItem value="1st">1st</MenuItem>
        <MenuItem value="2nd">2nd</MenuItem>
        <MenuItem value="3rd">3rd</MenuItem>
        <MenuItem value="4th">4th</MenuItem>
        <MenuItem value="5th">5th</MenuItem>
        <MenuItem value="6th">6th</MenuItem>
        <MenuItem value="7th">7th</MenuItem>
        <MenuItem value="8th">8th</MenuItem>
        <MenuItem value="9th">9th</MenuItem>
        <MenuItem value="10th">10th</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>

<hr/>
  
  

<Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 3: Consideration
      </Typography>

      <Grid container spacing={2}>
      
        <Grid item xs={6}>
          <TextField
            label="Total Consideration / Agreement Value"
            fullWidth
            variant="outlined"
            value={totalConsideration}
            onChange={(e) => setTotalConsideration(e.target.value)}
            type="number"
          />
        </Grid>

        {/* Booking Amount / Advance Payment */}
        <Grid item xs={6}>
          <TextField
            label="Booking Amount / Advance Payment"
            fullWidth
            variant="outlined"
            value={bookingAmount}
            onChange={(e) => setBookingAmount(e.target.value)}
            type="number"
          />
        </Grid>

        <Grid item xs={6}>
  <TextField
    label="Stamp Duty (7% of Agreement Cost)"
    fullWidth
    variant="outlined"
    value={stampDuty} // Bind state to allow manual input
    onChange={(e) => setStampDuty(e.target.value)} // Update state on input
  />
</Grid>


         
  <Grid item xs={6}>
    <TextField
      label="Registration Fee (Auto Calculated)"
      fullWidth
      variant="outlined"
      value={registrationFee}
      onChange={(e) => setRegistrationFee(e.target.value)}
    />
  </Grid>

  
  <Grid item xs={6}>
    <TextField
      label="GST Amount (Auto Calculated)"
      fullWidth
      variant="outlined"
      value={gstAmount}
      onChange={(e) => setGstAmount(e.target.value)}
    />
  </Grid>
     
      </Grid>

      {/* Section 4: Documents */}
      <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 4: Documents
      </Typography>

      <Grid container spacing={2}>
 
  <Grid item xs={6}>
  <Typography variant="body1">PAN Card (of both)</Typography>

  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: "white",
      color: "black",
      "&:hover": { backgroundColor: "#f0f0f0" },
    }}
  >
    Choose File
    <input
      type="file"
      multiple
      hidden
      onChange={handlePanCardChange}
    />
  </Button>

  {panCardFiles.length > 0 && (
  <div>
    <Typography variant="body2">Selected Files:</Typography>

    {panCardFiles.map((file, index) => (
      <Typography key={index} variant="body2">
        {file.name}
      </Typography>
    ))}
  </div>
)}

</Grid>



<Grid item xs={6}>
  <Typography variant="body1">AADHAR Card (of both)</Typography>

  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: "white",
      color: "black",
      "&:hover": { backgroundColor: "#f0f0f0" },
    }}
  >
    Choose File
    <input
      type="file"
      multiple
      hidden
    
      onChange={(e) =>
        setAadhaarCard((prev) => [...prev, ...Array.from(e.target.files)])
      }
      
    />
  </Button>

  {aadhaarCard.length > 0 && (
    <div>
      <Typography variant="body2">Selected Files:</Typography>

      {aadhaarCard.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </div>
  )}
</Grid>


  <Grid item xs={6}>
  <Typography variant="body1">MARRIAGE CERTIFICATE (If Available)</Typography>
  <Button
    variant="contained"
    component="label"
    sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
  >
    Choose Files
    <input
      type="file"
      multiple
      hidden
     
      onChange={(e) => setMarriageCertificate(prev => [...prev, ...Array.from(e.target.files)])}


    />
  </Button>

  {marriageCertificate?.length > 0 &&
    marriageCertificate.map((file, index) => (
      <Typography key={index} variant="body2">
        {file.name}
      </Typography>
    ))}
</Grid>


<Grid item xs={6}>
  <Typography variant="body1">PASSPORT SIZE PHOTO (of both)</Typography>

  <Button 
    variant="contained" 
    component="label"
    sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
  >
    Choose Files
    <input 
      type="file" 
      multiple
      hidden 
      onChange={(e) => setPassportPhoto((prev) => [...prev, ...Array.from(e.target.files)])}

    />
  </Button>

  {passportPhoto.length > 0 && (
    <>
      {passportPhoto.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </>
  )}
</Grid>

 
  <Grid item xs={6}>
  <Typography variant="body1">Any Other</Typography>

  <Button 
    variant="contained" 
    component="label"
    sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
  >
    Choose Files
    <input 
      type="file" 
      multiple 
      hidden 
      onChange={(e) => setOtherDocuments((prev) => [...prev, ...Array.from(e.target.files)])} 
    />
  </Button>

  {otherDocuments.length > 0 && (
    <>
      {otherDocuments.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </>
  )}
</Grid>
</Grid>


      {/* Section 5: Booking Payment Mode */}
      <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 5: Booking Payment Mode
      </Typography>

      <Grid container spacing={2}>
        {/* Booking Amount */}
        <Grid item xs={6}>
          <TextField
            label="Booking Amount"
            fullWidth
            variant="outlined"
            value={bookingAmount}
            onChange={(e) => setBookingAmount(e.target.value)}
            type="number"
            
          />
        </Grid>

        {/* Payment Mode */}
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="payment-mode-label">Payment Mode</InputLabel>
            <Select
              labelId="payment-mode-label"
              id="payment-mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              label="Payment Mode"
            >
              <MenuItem value="Cheque">Cheque</MenuItem>
              <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Cheque/TRN No. */}
        <Grid item xs={6}>
          <TextField
            label="Cheque/TRN No."
            fullWidth
            variant="outlined"
            value={chequeNo}
            onChange={(e) => setChequeNo(e.target.value)}
          />
        </Grid>

      
       
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <Grid item xs={6}>
    <DatePicker
      label="Cheque/TRN Date"
      value={chequeDate}
      onChange={(newValue) => setChequeDate(newValue)} 
      renderInput={(params) => (
        <TextField 
          {...params} 
          fullWidth 
          variant="outlined" 
          sx={{ width: '100%' }} 
        />
      )}
    />
  </Grid>
</LocalizationProvider>

       
        <Grid item xs={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel id="bank-name-label">Bank Name</InputLabel>
    <Select
      labelId="bank-name-label"
      id="bank-name"
      value={bankName}
      onChange={(e) => setBankName(e.target.value)}
      label="Bank Name"
    >
      <MenuItem value="State Bank of India (SBI)">State Bank of India (SBI)</MenuItem>
      <MenuItem value="HDFC">HDFC Bank</MenuItem>
      <MenuItem value="ICICI Bank">ICICI Bank</MenuItem>
      <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
      <MenuItem value="Bank of Baroda">Bank of Baroda</MenuItem>
      <MenuItem value="Axis Bank">Axis Bank</MenuItem>
      <MenuItem value="Canara Bank">Canara Bank</MenuItem>
      <MenuItem value="Union Bank of India">Union Bank of India</MenuItem>
      <MenuItem value="Bank of India">Bank of India</MenuItem>
      <MenuItem value="Kotak Mahindra Bank">Kotak Mahindra Bank</MenuItem>
      <MenuItem value="IndusInd Bank">IndusInd Bank</MenuItem>
      <MenuItem value="Yes Bank">Yes Bank</MenuItem>
      <MenuItem value="IDBI Bank">IDBI Bank</MenuItem>
      <MenuItem value="Indian Bank">Indian Bank</MenuItem>
      <MenuItem value="Central Bank of India">Central Bank of India</MenuItem>
      <MenuItem value="Indian Overseas Bank">Indian Overseas Bank</MenuItem>
      <MenuItem value="Federal Bank">Federal Bank</MenuItem>
      <MenuItem value="UCO Bank">UCO Bank</MenuItem>
      <MenuItem value="Bandhan Bank">Bandhan Bank</MenuItem>
    </Select>
  </FormControl>
</Grid>


        {/* Bank Details */}
        <Grid item xs={6}>
          <TextField
            label="Bank Details"
            fullWidth
            variant="outlined"
            value={bankDetails}
            onChange={(e) => setBankDetails(e.target.value)}
          />
        </Grid>
        </Grid>
      
  
  
  
  
        <Button
          variant="contained"
          className="m-3"
          color="success"
          onClick={() => {
            // Simply show the toast message without calling validation functions
            toast.success("Details are submitted!", { position: "top-right", autoClose: 3000 });
            
            // If you want to close the form (or any other logic), you can add it here
            setOpenEditModal(false); // Example of hiding the form after submission
          }}
        >
        Update
        </Button>
      </Paper>
    </div>
</Modal>

</>

  );
};

export default BookingFormTable;
