
import React, { useState, useEffect ,useRef} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, TextField ,IconButton,Dialog, DialogTitle, 
  DialogContent, DialogActions,FormGroup,FormControlLabel , Box, Checkbox} from '@mui/material';
import { FaEye,FaUpload,} from 'react-icons/fa'; 
import { FaRegUser } from 'react-icons/fa';
import EditIcon from "@mui/icons-material/Edit";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Typography } from '@mui/material';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { HomeIcon } from 'lucide-react';
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

import CloseIcon from "@mui/icons-material/Close";





const Registration = () => {
  
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
 
  const [flatType, setFlatType] = useState('');
  const [parking, setParking] = useState('');
  const [floor, setFloor] = useState('');
  const [rate, setRate] = useState('');
  const [items, setItems] = useState([]);  // or any initial value
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openModal, setOpenModal] = useState(false);  // For controlling modal visibility
  
  const [open, setOpen] = useState(false);
  // const [data, setData] = useState([]); // Ensure data is initialized

  // State to toggle filter visibility
  const [showFilters, setShowFilters] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [filterType, setFilterType] = useState(''); // For the filter selection
  const [filterValue, setFilterValue] = useState(''); // For the selected filter value
 const [isExpanded, setIsExpanded] = useState(true);
 const [isEditable, setIsEditable] = useState(false); 
 const [registrationNumber, setRegistrationNumber] = useState("");
 const [selectedFile, setSelectedFile] = useState(null);


 
  const [isEditableRow, setIsEditableRow] = useState(null);

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);


  const [registrationNumbers, setRegistrationNumbers] = useState({});

  const [checklistData, setChecklistData] = useState({});
  const [activeChecklist, setActiveChecklist] = useState(null);
  

  const handleRegistrationChange = (id, value) => {
    setRegistrationNumbers((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  
  // Handle Edit Icon Click
  const handleEditClick = (id) => {
    setIsEditableRow(id);
  };

 const fileInputRef = useRef(null);
  const sampleLoans = [
    {
      flatNo: "A101",
      nameOfAllotee: "John Doe",
      nameOfCoAllotee: "Jane Doe",
      type: "2 BHK",
      floor: "1st",
      emailId: "john.doe@example.com",
      whatsappMobileNo: "+91 9876543210",
      rate: "₹75,00,000",
      agreementValue: "₹70,00,000",
      dateOfBooking: "2024-02-01",
      parking: "Yes",
      registrationNumber: "REG12345",
      checklistOfDocumentCollection: "Pending",
      uploadIndex2: "Uploaded",
      documentHandover: "No",
    },{
      flatNo: "A101",
      nameOfAllotee: "John Doe",
      nameOfCoAllotee: "Jane Doe",
      type: "2 BHK",
      floor: "1st",
      emailId: "john.doe@example.com",
      whatsappMobileNo: "+91 9876543210",
      rate: "₹75,00,000",
      agreementValue: "₹70,00,000",
      dateOfBooking: "2024-02-01",
      parking: "Yes",
      registrationNumber: "REG12345",
      checklistOfDocumentCollection: "Pending",
      uploadIndex2: "Uploaded",
      documentHandover: "No",
    },
    {
      flatNo: "A101",
      nameOfAllotee: "John Doe",
      nameOfCoAllotee: "Jane Doe",
      type: "2 BHK",
      floor: "1st",
      emailId: "john.doe@example.com",
      whatsappMobileNo: "+91 9876543210",
      rate: "₹75,00,000",
      agreementValue: "₹70,00,000",
      dateOfBooking: "2024-02-01",
      parking: "Yes",
      registrationNumber: "REG12345",
      checklistOfDocumentCollection: "Pending",
      uploadIndex2: "Uploaded",
      documentHandover: "No",
    }
  ]

  useEffect(() => {
    loadLoansData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredLoans.length / rowsPerPage));
  }, [filteredLoans, rowsPerPage]);

 
  
  const [loansData, setLoansData] = useState(sampleLoans);
  
  const [beforeAgreementChecklist, setBeforeAgreementChecklist] = useState([]);



const saveChecklist = () => {
  console.log("Checklist Data Saved:", checklistData);
  closeChecklist();
};



const handleOpenModal = (index) => {
  setSelectedRowIndex(index);
  setOpenModal(true);

  setBeforeAgreementChecklist((prev) => ({
    ...prev,
    [index]: prev[index] || { taskOne: false, taskTwo: false, taskThree: false },
  }));
};


// new
const openChecklist = (index) => {
  setActiveChecklist(index);
}


const closeChecklist = () => {
  setActiveChecklist(null);
}


const updateChecklist = (e, index) => {
  const { name, checked } = e.target;

  setChecklistData((prevData) => {
    const updatedData = {
      ...prevData,
      [index]: {
        ...prevData[index],
        [name]: checked,
      },
    };
    console.log("Updated Checklist Data:", updatedData); // Always latest data
    return updatedData;
  });
};




const updateBeforeAgreementChecklist = (e) => {
  const { name, checked } = e.target;

  setBeforeAgreementChecklist((prev) => ({
    ...prev,
    [selectedRowIndex]: {
      ...prev[selectedRowIndex],
      [name]: checked,
    },
  }));
};


const getBeforeAgreementChecklistStatusColor = () => {
  const totalTasks = 3;
  
  const checklist = beforeAgreementChecklist[selectedRowIndex] || {};

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  if (checkedCount === 0) {
    return "gray";
  } else if (checkedCount === totalTasks) {
    return "green";
  } else {
    return "red";
  }
};


  


  const openChecklistDialog = (index) => {
    console.log("Opening Dialog for index:", index);
    setSelectedIndex(index); 
    setOpen(true); 
  };
  
  const closeChecklistDialog = () => {
    console.log("Closing Dialog");
    setOpen(false); 
    setSelectedIndex(null); 
    
    
    setDialogOpen(true);
  };

  const resetForm = () => {
    setCheckedItems(initialState);
  };
  
const handleToggle = () => {
  setIsExpanded((prev) => !prev);
};
 




const handleCheckboxChange = (event) => {
  setCheckedItems({
    ...checkedItems,
    [event.target.name]: event.target.checked,
  });
};


const openItemDetailsModal = (item) => {
  setSelectedItem(item);  
  setOpenModal(true);     
};



const handleSave = () => {
  console.log("Save button clicked");
  
  resetForm(); 
  closeChecklistDialog(); 
};



  const loadLoansData = async () => {
    try {
      const data = await fetchLoansData();
      setLoans(data);
      setFilteredLoans(data);
    } catch (error) {
      console.error("Error fetching data, using sample data:", error);
      setLoans(sampleLoans);
      setFilteredLoans(sampleLoans);
    }
  };
  
  const getFilterOptions = (type) => {
    switch (type) {
      case "Flat Type":
        return ["1BHK", "2BHK", "3BHK", "Studio"];
      case "Parking":
        return ["Basement", "Parking 1", "Parking 2"];
      case "Floor":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
      case "Rate":
        let rates = [];
        for (let i = 50000; i <= 6000000; i += 50000) {
          rates.push(`₹${i.toLocaleString()}`);
        }
        return rates;
      default:
        return [];
    }
  };

  const filterLoansByDate = () => {
    const filtered = loans.filter(loan => {
      const loanDate = new Date(loan.dateOfBooking);
      const start = startDate ? new Date(startDate) : new Date(0);
      const end = endDate ? new Date(endDate) : new Date();

      const matchesFilters =
        (!flatType || loan.type === flatType) &&
        (!parking || loan.parking === parking) &&
        (!floor || loan.floor === floor) &&
        (!rate || loan.rate === rate);

      return loanDate >= start && loanDate <= end && matchesFilters;
    });

    setFilteredLoans(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setStartDate('');
    setEndDate('');
    setFlatType('');
    setParking('');
    setFloor('');
    setRate('');
    setFilteredLoans(loans);
    setCurrentPage(1);
    setFilterType('');
    setFilterValue('');
  };

  


const handleUpload = (index) => {
  console.log(`Uploading document for row ID: ${index}`);
  if (fileInputRef.current) {
    fileInputRef.current.click();  
  }
};
const handleFileUpload = (file, index) => {
  const updatedData = [...loansData];
  updatedData[index].selectedFile = file; 
  setLoansData(updatedData);
};


 
 const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file.name);
    setSelectedFile(file);  
  }
};
  const onUpload = (id) => {
    console.log(`Uploading document for row ID: ${id}`);
    
  };
  
  const handlePagination = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setCurrentPage(1); // Reset to first page whenever rows per page is changed
  };

  const start = (currentPage - 1) * rowsPerPage;
  const end = Math.min(start + rowsPerPage, filteredLoans.length);

  const displayLoans = () => {
    return filteredLoans.slice(start, end).map((loan, index) => (
  

      <TableRow >
  <TableCell >{loan.flatNo}</TableCell>
  <TableCell >{loan.nameOfAllotee}</TableCell>
  <TableCell >{loan.nameOfCoAllotee}</TableCell>
  <TableCell >{loan.type}</TableCell>
  <TableCell >{loan.floor}</TableCell>
  <TableCell >{loan.emailId}</TableCell>
  <TableCell >{loan.whatsappMobileNo}</TableCell>
  <TableCell>{loan.rate}</TableCell>
  <TableCell>{loan.agreementValue}</TableCell>
  <TableCell>{loan.dateOfBooking}</TableCell>
  <TableCell>{loan.parking}</TableCell>
  <TableCell>{loan.registrationNumber}</TableCell> 
  <TableCell>{loan.checklistOfDocumentCollection}</TableCell> 
  <TableCell>{loan.uploadIndex2}</TableCell> 
  <TableCell>{loan.documentHandover}</TableCell> 
</TableRow>

    ));
  };

  const updateLoanStatus = (flatNo, newStatus) => {
   
    console.log(`Updating loan ${flatNo} status to ${newStatus}`);
  };

  
  const handleCollapseToggle = () => {
    setIsCollapsed(prev => !prev);
  };


  const handleDownloadPDFRegistration = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Registration Report", 14, 15);
  
    // Define the first-page columns
    const firstPageColumns = [
      "S.No.", "FLAT NO.", "NAME OF ALLOTEE", "NAME OF CO-ALLOTEE", "TYPE", "FLOOR"
    ];
  
  
    const secondPageColumns = [
      "S.No.", "EMAIL ID", "WHATSAPP MOBILE NO.", "RATE", "AGREEMENT VALUE", "DATE OF BOOKING", "PARKING"
    ];
  
   
    const firstPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.flatNo || "-",
      row.nameOfAllotee || "-",
      row.nameOfCoAllotee || "-",
      row.type || "-",
      row.floor || "-"
    ]);
  
  
    const secondPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.emailId || "-",
      row.whatsappMobileNo || "-",
      row.rate || "-",
      row.agreementValue || "-",
      row.dateOfBooking || "-",
      row.parking || "-"
    ]);
  
    console.log("First Page Rows:", firstPageRows);
    console.log("Second Page Rows:", secondPageRows);
  
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    
    doc.addPage();
  
   
    doc.setFontSize(14);
    doc.text("Registration Report - Continued", 14, 15);
  
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("Registration_Report.pdf");
  };
  const getChecklistStatusColor = (index) => {
    const checklist = checklistData[index] || {};
    const totalTasks = 9; // total number of checkboxes (tasks)
    const checkedCount = Object.values(checklist).filter(Boolean).length;
  
    if (checkedCount === 0) {
      return "gray";  
    } else if (checkedCount === totalTasks) {
      return "green"; 
    } else {
      return "red";   
    }
  };
  

  return (
    <div className="main-content">
      <h6 className='mb-3'>Sales Module / Registration Management</h6>

     
     
   <div className='d-flex gap-3'>


     
<Button
      variant="contained"
      color="success"
      sx={{
        borderRadius: "20px",
        transition: "width 0.3s ease, background 0.3s ease",
        width: isExpanded ? "160px" : "50px",
        minWidth: "50px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "10px 15px",
        marginTop: "20px",
        marginBottom: "28px",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        position: "relative",
        // background: "linear-gradient(0deg, rgba(22,9,240,1) 0%, rgba(49,110,244,1) 100%)",
        background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
        boxShadow:
          "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
        "&:hover": {
          // background: "linear-gradient(0deg, rgba(2,126,251,1) 0%, rgba(0,3,255,1) 100%)",
          background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.2)",
          transform: "scale(0.1)",
          transition: "transform 0.3s ease",
          zIndex: -1,
        },
        "&:hover::after": {
          transform: "scale(1)",
        },
      }}
      onClick={handleToggle}
      startIcon={isExpanded ? <FaRegUser/> : <FaRegUser />}
    >
      {isExpanded && "Registration"}
    </Button>

       <Button
       variant="contained"
       sx={{
         background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
         color: "white",
         fontWeight: "bold",
       
         textTransform: "none",
         marginTop :"24px",
        
         minHeight: "unset",  
         height: "39px",   
         fontSize: "12px",
         borderRadius: "20px",
         display: "inline-flex",  
         alignItems: "center",
         gap: "6px",
         lineHeight: "1",  
         "&:hover": {
           background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
         },
       }}
       disableElevation  
       disableRipple 
       onClick={handleDownloadPDFRegistration}
     >
       <FaFileDownload size={14} />
       Download PDF
     </Button>
</div>

<div className="d-flex align-items-center justify-content-between mb-3">
  <div className="d-flex align-items-center gap-3">
    <label>Filter By:</label>
    <TextField
      select
      variant="outlined"
      size="small"
      style={{ width: '150px' }}
      value={filterType}
      className="bg-white"
      onChange={(e) => {
        setFilterType(e.target.value);
        setFilterValue('');
      }}
    >
      <MenuItem value="">Select Filter</MenuItem>
      <MenuItem value="Flat Type">Flat Type</MenuItem>
      <MenuItem value="Parking">Parking</MenuItem>
      <MenuItem value="Floor">Floor</MenuItem>
      <MenuItem value="Rate">Rate</MenuItem>
    </TextField>

    {/* Start Date */}
 
  {/* </div> */}

  {filterType && (
    <div className="d-flex align-items-center gap-3">
      <label>{filterType}:</label>
      <TextField
        select
        variant="outlined"
        size="small"
        className="bg-white"
        style={{ width: '150px' }}
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        {getFilterOptions(filterType).map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginLeft: '10px' }}
        onClick={resetFilters}
      >
        Reset
      </Button>
    </div>
  )}

  
   <div className="d-flex align-items-center">
               <label style={{ marginRight: '5px' }}>Start Date:</label>
               <TextField
                 type="date"
                 variant="outlined"
                 size="small"
                 style={{ width: '150px', textAlign: 'center' }}
                 value={startDate}
                 onChange={(e) => setStartDate(e.target.value)}
               />
             </div>
         
             
             <div className="d-flex align-items-center">
               <label style={{ marginRight: '5px' }}>End Date:</label>
               <TextField
                 type="date"
                 variant="outlined"
                 size="small"
                 style={{ width: '150px', textAlign: 'center' }}
                 value={endDate}
                 onChange={(e) => setEndDate(e.target.value)}
               />
             </div>
             

 
  <div className="d-flex align-items-center gap-3">
    <label className="me-2">Rows per page:</label>
    <input
      type="number"
      className="form-control"
      value={rowsPerPage}
      onChange={handleRowsPerPageChange}
      style={{ width: '80px' }}
    />
  </div>
</div>

</div>


<TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 , maxHeight: 400,overflowY: 'auto'}}>
  <Table sx={{ tableLayout: 'auto', width: '100%' }}>
    <TableHead >
    
 <TableRow sx={{background:"#3621a9"}}>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"}}>FLAT NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF ALLOTEE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>TYPE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLOOR</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>EMAIL ID</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>WHATSAPP MOBILE NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>RATE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AGREEMENT VALUE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BOOKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>PARKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>REGISTRATION NUMBER</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>CHECKLIST OF DOCUMENT COLLECTION (AFTER AGREEMENT)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>UPLOAD INDEX 2</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DOCUMENT HANDOVER</TableCell>
      </TableRow>
    </TableHead>

    

<TableBody>
  {/* {sampleLoans.map((item, index) => ( */}
  
  {loansData.map((item, index) => (
    <TableRow key={index}>
      {/* Other columns */}
      <TableCell className='text-black'></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>

      
 <TableCell>
        {isEditableRow === index ? (
          <TextField
            value={item.registrationNumber}
            onChange={(e) => {
              const updatedData = [...loansData];
              updatedData[index].registrationNumber = e.target.value;
              setLoansData(updatedData);
            }}
            onBlur={() => setIsEditableRow(null)}
            placeholder="Enter Registration Number"
          />
        ) : (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {item.registrationNumber || "Enter Registration Number"}
            <IconButton onClick={() => setIsEditableRow(index)}>
              <EditIcon />
            </IconButton>
          </span>
        )}
      </TableCell>

      <TableCell>
  
<IconButton onClick={() => handleOpenModal(index)} size="small">

  <AssignmentTurnedInIcon style={{ color: getBeforeAgreementChecklistStatusColor(index) }} />
</IconButton>


 

</TableCell>


<Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
  <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#1976d2", color: "white", padding: "12px 16px" }}>
    Before Agreement Checklist
    <IconButton onClick={() => setOpenModal(false)} size="small">
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent>
    
    
<Box>
  <FormControlLabel
    control={
      <Checkbox 
        checked={beforeAgreementChecklist[selectedRowIndex]?.taskOne || false}
        onChange={updateBeforeAgreementChecklist}
        name="taskOne"
      />
    }
    label="Agreement with Signature"
    sx={{ display: "block" }}
  />

  <FormControlLabel
    control={
      <Checkbox 
        checked={beforeAgreementChecklist[selectedRowIndex]?.taskTwo || false}
        onChange={updateBeforeAgreementChecklist}
        name="taskTwo"
      />
    }
    label="Agreement Receipt"
    sx={{ display: "block" }}
  />

  <FormControlLabel
    control={
      <Checkbox 
        checked={beforeAgreementChecklist[selectedRowIndex]?.taskThree || false}
        onChange={updateBeforeAgreementChecklist}
        name="taskThree"
      />
    }
    label="Index II"
    sx={{ display: "block" }}
  />
</Box>

  </DialogContent>

  <DialogActions>
    <Button variant="contained" color="primary" onClick={() => setOpenModal(false)}>Save</Button>
  </DialogActions>
</Dialog>

<TableCell>
  <IconButton component="label">
    <FaUpload style={{ color: "blue" }} />
    <input
      type="file"
      hidden
      onChange={(e) => handleFileUpload(e.target.files[0], index)}
    />
  </IconButton>

  {item.selectedFile && (
    <IconButton
      onClick={() => window.open(URL.createObjectURL(item.selectedFile), "_blank")}
    >
      <FaEye style={{ color: "green" }} />
    </IconButton>
  )}
</TableCell>

        
          <input
            ref={fileInputRef}  
            type="file"
            style={{ display: "none" }}  
            onChange={handleFileChange}  
          />
      <TableCell>

     
       <IconButton onClick={() => openChecklist(index)}>
  <AssignmentTurnedInIcon style={{ color: getChecklistStatusColor(index) }} />
</IconButton>

       
    </TableCell>
      
    <Dialog open={activeChecklist === index} onClose={closeChecklist} fullWidth maxWidth="sm">
        <DialogTitle 
          sx={{ 
            display: "flex", justifyContent: "space-between", alignItems: "center", 
            backgroundColor: "#1976d2", color: "white", padding: "12px 16px" 
          }}
        >
          {/* Task Checklist - Row {index + 1} */}
          Document Handover Checklist
          <IconButton onClick={closeChecklist} size="small">
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={1}>  
            {/* <FormControlLabel control={<Checkbox checked={checklistData.taskOne || false} onChange={(e) => updateChecklist(e, index)} name="taskOne" />} label="Agreement with Signature" /> */}
            <FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskOne || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskOne"
    />
  }
  label="Agreement with Signature"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskTwo || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskTwo"
    />
  }
  label="Agreement Receipt"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskThree || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskThree"
    />
  }
  label="Original Document"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskFour || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskFour"
    />
  }
  label="Payment Receipt"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskFive || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskFive"
    />
  }
  label="NOC"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskSix || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskSix"
    />
  }
  label="Demand Letter"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskSeven || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskSeven"
    />
  }
  label="GST Letter"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskEight || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskEight"
    />
  }
  label="Index 2"
/>

<FormControlLabel
  control={
    <Checkbox
      checked={checklistData[index]?.taskNine || false}
      onChange={(e) => updateChecklist(e, index)}
      name="taskNine"
    />
  }
  label="Document Receipt"
/>

          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "flex-end", padding: "12px 24px" }}>
          <Button variant="contained" color="primary" onClick={saveChecklist}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      
       
    </TableRow>
  ))}
</TableBody>

  </Table>
</TableContainer> 





  
{/* </div> */}
</div>
  );
};

export default Registration;

