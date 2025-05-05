






import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Box, Button, MenuItem, TextField ,Tooltip,IconButton,Typography} from '@mui/material';
import { FaEye,FaEyeSlash } from 'react-icons/fa'; 
import EditIcon from '@mui/icons-material/Edit';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MdDashboard } from 'react-icons/md';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid'; // For Material-UI Grid
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";


const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const CRM = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
  const [selectedAadharFiles, setSelectedAadharFiles] = useState([]);
  const [flatType, setFlatType] = useState('');
  const [parking, setParking] = useState('');
  const [floor, setFloor] = useState('');
  const [rate, setRate] = useState('');
  const [ProjectType,setProjectType] = useState('');
  
  const [showFilters, setShowFilters] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [filterType, setFilterType] = useState(''); 
  const [filterValue, setFilterValue] = useState(''); 

  
    const [expanded, setExpanded] = useState(false); // For collapsing
    const [editingIndex, setEditingIndex] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [isExpanded, setIsExpanded] = useState(true); 
    const [showForm, setShowForm] = useState(false);
    const [passportPhotos, setPassportPhotos] = useState([]);
      const [dateOfFlatBooking, setDateOfFlatBooking] = useState(null);
        const [closingExecutive, setClosingExecutive] = useState('');
        const [email, setEmail] = useState('');
        const [error, setError] = useState(false);
        const [helperText, setHelperText] = useState('');

        const [pan, setPan] = useState('');
        const [panError, setPanError] = useState(false);
        const [panHelperText, setPanHelperText] = useState('');
        const [aadhar, setAadhar] = useState('');
        const [aadharError, setAadharError] = useState(false);
        const [aadharHelperText, setAadharHelperText] = useState('');

        const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState('');

  const [coTitle, setCoTitle] = useState('');
  const [coName, setCoName] = useState('');
  const [coNameError, setCoNameError] = useState(false);
  const [coNameHelperText, setCoNameHelperText] = useState('');
  const [selectedMarriageFiles, setSelectedMarriageFiles] = useState([]);


  const [coPan, setCoPan] = useState('');
  const [coPanError, setCoPanError] = useState(false);
  const [coPanHelperText, setCoPanHelperText] = useState('');
  const [coAadhar, setCoAadhar] = useState('');
  const [coAadharError, setCoAadharError] = useState(false);
  const [coAadharHelperText, setCoAadharHelperText] = useState('');
  const [coMobile, setCoMobile] = useState('');
  const [coMobileError, setCoMobileError] = useState(false);
  const [coMobileHelperText, setCoMobileHelperText] = useState('');

  const [coEmail, setCoEmail] = useState('');
  const [coEmailError, setCoEmailError] = useState(false);
  const [coEmailHelperText, setCoEmailHelperText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  useEffect(() => {
    loadLoansData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredLoans.length / rowsPerPage));
  }, [filteredLoans, rowsPerPage]);

  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
    setFilteredLoans(data);
  };

  const handleCoAadharChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setCoAadhar(value);

    if (value.length === 0) {
      setCoAadharError(false);
      setCoAadharHelperText('');
    } else if (value.length !== 12) {
      setCoAadharError(true);
      setCoAadharHelperText('Only 12 digits must be entered.');
    } else {
      setCoAadharError(false);
      setCoAadharHelperText('');
    }
  };
  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  

  const handleAadharChange = (e) => {
    const value = e.target.value.replace(/\s/g, ''); // remove spaces
    setAadhar(value);

    const aadharRegex = /^[0-9]{12}$/;

    if (value === '') {
      setAadharError(false);
      setAadharHelperText('');
    } else if (!aadharRegex.test(value)) {
      setAadharError(true);
      setAadharHelperText('Enter a valid 12-digit Aadhar number');
    } else {
      setAadharError(false);
      setAadharHelperText('');
    }
  };

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  
  const handleAadharFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedAadharFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...newFiles];
      // Remove duplicates by file name
      const uniqueFiles = Array.from(new Map(allFiles.map(file => [file.name, file])).values());
      return uniqueFiles;
    });
  };
  
  const handleFileSelection = (event) => {
    const selectedFiles = Array.from(event.target.files);
    
    setUploadedFiles((prevFiles) => [...prevFiles, ...selectedFiles.map((file) => file.name)]);
  };
  const handleClose = () => {
    setShowForm(false);  
  };

  const handleMarriageFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedMarriageFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...newFiles];
      const uniqueFiles = Array.from(new Map(allFiles.map(file => [file.name, file])).values());
      return uniqueFiles;
    });
  };
  
  const handleClosingExecutiveChange = (event) => {
    setClosingExecutive(event.target.value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regex to match email with domains like gmail.com, .in, .org, or any custom domain
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|in|org|[a-zA-Z]{2,})$/;

    if (value === '') {
      setError(false);
      setHelperText('');
    } else if (!emailRegex.test(value)) {
      setError(true);
      setHelperText('Enter a valid email (e.g. user@gmail.com, user@customdomain.in)');
    } else {
      setError(false);
      setHelperText('');
    }
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCoMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCoMobile(value);

    if (value.length === 10) {
      setCoMobileError(false);
      setCoMobileHelperText('');
    } else {
      setCoMobileError(true);
      setCoMobileHelperText('Enter a valid 10-digit mobile number.');
    }
  };

  const handleCoEmailChange = (e) => {
    const value = e.target.value;
    setCoEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|org|[a-z]{2,})$/i;

    if (value === '') {
      setCoEmailError(false);
      setCoEmailHelperText('');
    } else if (!emailRegex.test(value)) {
      setCoEmailError(true);
      setCoEmailHelperText('Enter a valid email (e.g. name@gmail.com, .in, .org, etc.)');
    } else {
      setCoEmailError(false);
      setCoEmailHelperText('');
    }
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;

    setName(value);

    if (value === '') {
      setNameError(false);
      setNameHelperText('');
    } else if (!nameRegex.test(value)) {
      setNameError(true);
      setNameHelperText('Name can only contain letters and spaces');
    } else {
      setNameError(false);
      setNameHelperText('');
    }
  };

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase(); // PAN is usually uppercase
    setPan(value);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (value === '') {
      setPanError(false);
      setPanHelperText('');
    } else if (!panRegex.test(value)) {
      setPanError(true);
      setPanHelperText('Enter valid PAN format (e.g. ABCDE1234F)');
    } else {
      setPanError(false);
      setPanHelperText('');
    }
  };
  const handleCoTitleChange = (e) => {
    setCoTitle(e.target.value);
  };


  const handleCoPanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setCoPan(value);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (value === '') {
      setCoPanError(false);
      setCoPanHelperText('');
    } else if (!panRegex.test(value)) {
      setCoPanError(true);
      setCoPanHelperText('Invalid PAN format (e.g., ABCDE1234F)');
    } else {
      setCoPanError(false);
      setCoPanHelperText('');
    }
  };

  const handleCoNameChange = (e) => {
    const value = e.target.value;
    const nameRegex = /^[A-Za-z\s]+$/;

    setCoName(value);

    if (value === '') {
      setCoNameError(false);
      setCoNameHelperText('');
    } else if (!nameRegex.test(value)) {
      setCoNameError(true);
      setCoNameHelperText('Name can only contain letters and spaces');
    } else {
      setCoNameError(false);
      setCoNameHelperText('');
    }
  };

  const handlePhotoFileChange = (e) => {
    const newFiles = Array.from(e.target.files); // Get new files
    setPassportPhotos((prevFiles) => [...prevFiles, ...newFiles]); // Append new files to the existing ones
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
      case "Project Type":
        return ["Shubh Aarambh", "Elara", "Infini", "Serenity", "Prime", "PYB", "Onella Tower", "Aradhyam", "Stella"];
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
    setProjectType('');  // Added this line for Project Type
    setFilteredLoans(loans);
    setCurrentPage(1);
    setFilterType('');
    setFilterValue('');
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
    <TableRow key={loan.flatNo}>
      <TableCell>{loan.action}</TableCell> {/* New column */}
      <TableCell>{loan.timestamp}</TableCell> {/* New column */}
      <TableCell>{loan.enquiryNo}</TableCell> {/* New column */}
      <TableCell>{loan.projectName}</TableCell> {/* New column */}
      <TableCell>{loan.dateOfFlatBooking}</TableCell> {/* New column */}
      <TableCell>{loan.nameOfAllotee}</TableCell>
      <TableCell>{loan.sourceName}</TableCell> {/* New column */}
      <TableCell>{loan.dateOfBirth}</TableCell> {/* New column */}
      <TableCell>{loan.occupation}</TableCell> {/* New column */}
      <TableCell>{loan.panNo}</TableCell> {/* New column */}
      <TableCell>{loan.aadharNo}</TableCell> {/* New column */}
      <TableCell>{loan.mobileNo}</TableCell>
      <TableCell>{loan.alternateMobileNo}</TableCell> {/* New column */}
      <TableCell>{loan.whatsappNo}</TableCell>
      <TableCell>{loan.emailId}</TableCell>
      <TableCell>{loan.address}</TableCell> {/* New column */}
      <TableCell>{loan.nameOfCoAllotee}</TableCell>
      <TableCell>{loan.dobCoAllotee}</TableCell> {/* New column */}
      <TableCell>{loan.occupationCoAllotee}</TableCell> {/* New column */}
      <TableCell>{loan.panNoCoAllotee}</TableCell> {/* New column */}
      <TableCell>{loan.aadharNoCoAllotee}</TableCell> {/* New column */}
      <TableCell>{loan.mobileEmailCoAllotee}</TableCell> {/* New column */}
      <TableCell>{loan.flatNo}</TableCell>
      <TableCell>{loan.type}</TableCell>
      <TableCell>{loan.wing}</TableCell> {/* New column */}
      <TableCell>{loan.soldRate}</TableCell> {/* New column */}
      <TableCell>{loan.carpetArea}</TableCell> {/* New column */}
      <TableCell>{loan.enclosedBalcony}</TableCell> {/* New column */}
      <TableCell>{loan.openBalcony}</TableCell> {/* New column */}
      <TableCell>{loan.terrace}</TableCell> {/* New column */}
      <TableCell>{loan.parking}</TableCell>
      <TableCell>{loan.floor}</TableCell>
      <TableCell>{loan.totalConsideration}</TableCell> {/* New column */}
      <TableCell>{loan.bookingAmount}</TableCell> {/* New column */}
      <TableCell>{loan.stampDuty}</TableCell> {/* New column */}
      <TableCell>{loan.registrationFee}</TableCell> {/* New column */}
      <TableCell>{loan.gstAmount}</TableCell> {/* New column */}
      <TableCell>{loan.panCard}</TableCell> {/* New column */}
      <TableCell>{loan.aadharCard}</TableCell> {/* New column */}
      <TableCell>{loan.marriageCertificate}</TableCell> {/* New column */}
      <TableCell>{loan.passportSizePhoto}</TableCell> {/* New column */}
      <TableCell>{loan.anyOther}</TableCell> {/* New column */}
      <TableCell>{loan.bookingAmount}</TableCell>
      <TableCell>{loan.paymentMode}</TableCell> {/* New column */}
      <TableCell>{loan.chequeTrnNo}</TableCell> {/* New column */}
      <TableCell>{loan.chequeTrnDate}</TableCell> {/* New column */}
      <TableCell>{loan.bankName}</TableCell>
      <TableCell>{loan.bankDetails}</TableCell> {/* New column */}
      
     <TableCell>
        <div style={{ display: "flex", gap: "5px" }}>
          <Tooltip title="Edit" arrow>
            <IconButton 
              color="primary" 
              onClick={() => handleEdit(loan)} 
              sx={{
                backgroundColor: "primary.main", 
                padding: "5px",  
                borderRadius: "50%", 
                color: "white", 
                fontSize: "18px"
              }}
            >
              <FaEdit />
            </IconButton>
          </Tooltip>

          <Tooltip title="WhatsApp" arrow>
            <IconButton 
              color="success" 
              onClick={() => window.open(`https://wa.me/${loan.mobileNo}`, "_blank")}
              sx={{
                backgroundColor: "success.main", 
                padding: "5px",  
                borderRadius: "50%", 
                color: "white", 
                fontSize: "18px"
              }}
            >
              <FaWhatsapp />
            </IconButton>
          </Tooltip>

          <Tooltip title="Email" arrow>
            <IconButton 
              color="primary" 
              onClick={() => window.location.href = `mailto:${loan.emailId}`}
              sx={{
                backgroundColor: "primary.main", 
                padding: "5px",  
                borderRadius: "50%", 
                color: "white", 
                fontSize: "18px"
              }}
            >
              <FaEnvelope />
            </IconButton>
          </Tooltip>

          <Tooltip title="Assign To" arrow>
            <IconButton 
              color="secondary" 
              onClick={() => console.log("Assign To clicked")}
              sx={{
                backgroundColor: "#FFD700", 
                padding: "5px",  
                borderRadius: "50%", 
                color: "white", 
                fontSize: "18px"
              }}
            >
              <FaUserCircle />
            </IconButton>
          </Tooltip>
        </div>
      </TableCell> 
   

    </TableRow>
  ));
};


  const handleEdit = (item) => {
    console.log("Edit item:", item);
  };
  
  const handleWhatsapp = (item) => {
    console.log("Whatsapp item:", item);
  };
  
  const handleEmail = (item) => {
    console.log("Email item:", item);
  };

  
  const updateLoanStatus = (flatNo, newStatus) => {
  
    console.log(`Updating loan ${flatNo} status to ${newStatus}`);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(prev => !prev);
  };

  const handleOpenDocument = () => {
    const documentUrl = "https://your-document-url.com"; // Replace with actual document URL
    window.open(documentUrl, "_blank"); // Opens in a new tab
  };

  
const loansData = [
  {
    enquiryNo: "ENQ001",
    timestamp: "2025-03-18",
    projectName: " ",
    flatBookingDate: "2025-03-15",
    aloteeName: "John Doe",
    sourceName: "Source 1, suiopvhujghuuygbb",
    dob: "1990-01-01",
    occupation: "Engineer",
    panNo: "ABCD1234",
    aadharNo: "1234-5678-9101",
    mobileNo: "9876543210",
    alternateMobileNo: "9876543211",
    whatsappNo: "9876543212",
    email: "johndoe@email.com",
    address: "123 Street, City",
    coAloteeName: "Jane Doe",
    coAloteeDob: "1992-05-10",
    coAloteeOccupation: "Teacher",
    coAloteePanNo: "XYZ9876",
    coAloteeAadharNo: "9876-5432-1098",
    coAloteeMobileEmail: "9876543213 / jane@email.com",
    flatNo: "",
    type: "",
    wing: "",
    soldRate: "",
    carpetArea: "",
    enclosedBalcony: "50",
    openBalcony: "30",
    terrace: "20",
    parking: "1",
    floor: "1st",
    totalConsideration: "",
    bookingAmount: "",
    stampDuty: "",
    registrationFee: "",
    gstAmount: "",
    panCard: "",
    aadharCard: "",
    marriageCertificate: "",
    passportPhoto: "",
    otherDocuments: "None",
    paymentMode: "Cheque",
    chequeNo: "CH12345",
    chequeDate: "2025-03-17",
    bankName: "Bank ABC",
    bankDetails: "Branch XYZ",
  },
  {},
  
];


const handleDownloadPDFCRM = () => {
  console.log("Loans data before mapping:", loans); // Ensure 'loans' contains the correct data

  const doc = new jsPDF("landscape");
  doc.setFontSize(14);
  doc.text("CRM Report", 14, 15);

  // Define the columns for the first and second pages
  const tableColumnPage1 = [
    "TIMESTAMP", "ENQUIRY NO.", "PROJECT NAME", "DATE OF FLAT BOOKING", "NAME OF ALOTEE",
    "SOURCE NAME", "DATE OF BIRTH", "OCCUPATION", "PAN NO.", "AADHAR NO."
  ];

  const tableColumnPage2 = [
    "MOBILE NO.", "EMAIL ID", "ADDRESS", "NAME OF CO-ALOTEE", "DATE OF BIRTH (CO-ALOTEE)",
    "OCCUPATION (CO-ALOTEE)", "PAN NO. (CO-ALOTEE)", "AADHAR NO. (CO-ALOTEE)",
    "MOBILE NO. & EMAIL (CO-ALOTEE)", "FLAT NO.", "TYPE"
  ];

  // Extract data for the first page
  const tableRowsPage1 = loans.map(row => [
    row.timestamp || "-",
    row.enquiryNo || "-",
    row.projectName || "-",
    row.dateOfFlatBooking || "-",
    row.nameOfAllotee || "-",
    row.sourceName || "-",
    row.dateOfBirth || "-",
    row.occupation || "-",
    row.panNo || "-",
    row.aadharNo || "-"
  ]);

  // Extract data for the second page
  const tableRowsPage2 = loans.map(row => [
    row.mobileNo || "-",
    row.emailId || "-",
    row.address || "-",
    row.nameOfCoAllotee || "-",
    row.dateOfBirthCoAllotee || "-",
    row.occupationCoAllotee || "-",
    row.panNoCoAllotee || "-",
    row.aadharNoCoAllotee || "-",
    row.mobileEmailCoAllotee || "-",
    row.flatNo || "-",
    row.type || "-"
  ]);

  console.log("Formatted Table Rows (Page 1):", tableRowsPage1);
  console.log("Formatted Table Rows (Page 2):", tableRowsPage2);

  // Generate first table
  autoTable(doc, {
    startY: 25,
    head: [tableColumnPage1],
    body: tableRowsPage1,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  });

  // Add a new page for the second table
  doc.addPage();
  doc.setFontSize(14);
  doc.text("CRM Report (Continued)", 14, 15);

  // Generate second table
  autoTable(doc, {
    startY: 25,
    head: [tableColumnPage2],
    body: tableRowsPage2,
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  });

  // Save the PDF
  doc.save("CRM_Report.pdf");
};


  return (
    <div className="main-content">
      <h6 className='mb-3'>Sales Module / CRM Display</h6>

  
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
      startIcon={isExpanded ? <MdDashboard />: <MdDashboard />}
    >
      {isExpanded && "CRM Display"}
    </Button>

         <Button
      variant="contained"
      sx={{
        background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
        color: "white",
        fontWeight: "bold",
        fontWeight: "900",
        textTransform: "none",
        marginTop :"24px",
       
        minHeight: "unset", // Removes fixed height  
        height: "39px", // Explicitly set a smaller height  
        fontSize: "12px",
        borderRadius: "20px",
        display: "inline-flex", // Ensures compact size  
        alignItems: "center",
        gap: "6px",
        lineHeight: "1", // Reduces text spacing  
        "&:hover": {
          background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
        },
      }}
      disableElevation // Removes shadow that might add visual space  
      disableRipple // Removes ripple effect padding  
      onClick={handleDownloadPDFCRM}
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
            <MenuItem value="Project Type">Project Type</MenuItem>
          </TextField>

          {/* Filter Value */}
          {filterType && (
            <>
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
            </>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center">
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

  

<TableContainer component={Paper}  sx={{ mt: 2, boxShadow: 3, borderRadius: 2,maxHeight: 400,overflowY: 'auto' }}>
  <Table style={{ tableLayout: 'auto', width: '100%' }}>
    <TableHead>
  

      
          
       <TableRow sx={{background:"#3621a9"}}>
        <TableCell sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap"  }}>ACTION</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ENQUIRY NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PROJECT NAME</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF FLAT BOOKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NAME OF ALOTEE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SOURCE NAME</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF BIRTH</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OCCUPATION</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AADHAR NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MOBILE NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ALTERNATE MOBILE NO</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WHATSAPP NO</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>EMAIL ID</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ADDRESS</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>NAME OF CO-ALOTEE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>DATE OF BIRTH (CO-ALOTEE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OCCUPATION (CO-ALOTEE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN NO. (CO-ALOTEE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AADHAR NO. (CO-ALOTEE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MOBILE NO. & EMAIL (CO-ALOTEE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLAT NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TYPE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>WING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>SOLD RATE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CARPET AREA IN (SQ. MTR.)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ENCLOSED BALCONY IN (SQ. MTR.)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>OPEN BALCONY IN (SQ. MTR.)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TERRACE IN (SQ. MTR.)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PARKING</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>FLOOR</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>TOTAL CONSIDERATION /AGREEMENT VALUE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BOOKING AMOUNT / ADVANCE PAYMENT</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>STAMP DUTY (7% OF AGREEMENT COST)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>REGISTRATION FEE(1% OF AGREEMENT COST)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>GST AMOUNT</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAN CARD(OF BOTH)</TableCell>
       
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>AADHAR CARD(OF BOTH)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>MARRIAGE CERTIFICATE (IF AVAILABLE)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PASSPORT SIZE PHOTO (OF BOTH)</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>ANY OTHER</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BOOKING AMOUNT</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>PAYMENT MODE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CHEQUE/TRN NO.</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>CHEQUE/TRN DATE</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BANK NAME</TableCell>
        <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap" }}>BANK DETAILS</TableCell>
      </TableRow>
    </TableHead>

  

<TableBody>
  {loansData.map((item, index) => (
    <TableRow key={index}>
     
<TableCell sx={{ whiteSpace: 'nowrap' }}>
  <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-start' }}>
   

<Tooltip title="Edit" arrow>
  <IconButton
    size="small"
    sx={{ backgroundColor: "#1976D2", color: "white", borderRadius: "50%", "&:hover": { backgroundColor: "#1565C0" } }} 
    onClick={() => setShowForm(true)} 
  >
    <EditIcon />
  </IconButton>
  </Tooltip>

 {/* Modal (Dialog) */}
 <Dialog open={showForm} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Edit Personal Information</DialogTitle>
        <DialogContent>
          <Paper
            className="p-4"
            elevation={4}
            style={{ borderRadius: '12px', paddingBottom: '20px' }}
          >
          

          
        <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 1: Personal Information
        </Typography>
  
       
        
        <Grid container spacing={2}>
  <Grid item xs={6}>
    <TextField
      label="Enquiry No."
      fullWidth
      variant="outlined"
      required
    />
  </Grid>

  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="closing-executive-label">Project Name</InputLabel>
      <Select
        labelId="closing-executive-label"
        id="closing-executive"
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
        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
      />
    </LocalizationProvider>
  </Grid>

   <Grid item xs={2}>
        <FormControl fullWidth required>
          <InputLabel>Title</InputLabel>
          <Select value={title} onChange={handleTitleChange} label="Title">
            <MenuItem value="Mr.">Mr.</MenuItem>
            <MenuItem value="Mrs.">Mrs.</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="NAME OF ALLOTTEE"
          fullWidth
          variant="outlined"
          required
          value={name}
          onChange={handleNameChange}
          error={nameError}
          helperText={nameHelperText}
        />
      </Grid>


     

  <Grid item xs={6}>
    <TextField
      type="datetime-local" // Use datetime-local for date and time input
      label="Source Name"
      fullWidth
      variant="outlined"
      required
      InputLabelProps={{
        shrink: true, // Ensures label is above the input
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date Of Birth"
        renderInput={(params) => <TextField {...params} fullWidth variant="outlined" />}
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
        required
      />
    </FormControl>
  </Grid>

  <Grid item xs={6}>
      <TextField
        label="PAN No."
        variant="outlined"
        fullWidth
        value={pan}
        onChange={handlePanChange}
        inputProps={{ maxLength: 10 }}
        error={panError}
        helperText={panHelperText}
      />
    </Grid>

  {/* <Grid item xs={6}>
    <TextField
      label="AADHAR No."
      variant="outlined"
    />
  </Grid> */}
   <Grid item xs={6}>
      <TextField
        label="AADHAR No."
        variant="outlined"
        fullWidth
        value={aadhar}
        onChange={handleAadharChange}
        inputProps={{ maxLength: 12 }}
        error={aadharError}
        helperText={aadharHelperText}
      />
    </Grid>

  <Grid item xs={6}>
    <TextField
      label="Mobile No"
      fullWidth
      variant="outlined"
      inputProps={{
        maxLength: 10, // Limit to 10 digits in the input field
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Alternate Mobile No"
      fullWidth
      variant="outlined"
      inputProps={{
        maxLength: 10, // Limit to 10 digits in the input field
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="WhatsApp No."
      fullWidth
      variant="outlined"
      inputProps={{
        maxLength: 10, // Limit to 10 digits
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Email ID"
      fullWidth
      variant="outlined"
      onChange={handleEmailChange}
      error={error}
      helperText={helperText}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="AADHAR No."
      fullWidth
      variant="outlined"
      inputProps={{
        maxLength: 12, // Limit to 12 digits
      }}
    />
  </Grid>

  <Grid item xs={6}>
    <TextField
      label="Address"
      fullWidth
      variant="outlined"
    />
  </Grid>

  {/* <Grid item xs={6}>
    <TextField
      label="Name of Co-Allottee"
      fullWidth
      variant="outlined"
    />
  </Grid> */}
   <Grid item xs={2}>
        <FormControl fullWidth required>
          <InputLabel>Title</InputLabel>
          <Select value={coTitle} onChange={handleCoTitleChange} label="Title">
            <MenuItem value="Mr.">Mr.</MenuItem>
            <MenuItem value="Mrs.">Mrs.</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={4}>
        <TextField
          label="NAME OF CO-ALLOTTEE"
          fullWidth
          variant="outlined"
          required
          value={coName}
          onChange={handleCoNameChange}
          error={coNameError}
          helperText={coNameHelperText}
        />
      </Grid>

  <Grid item xs={6}>
    <TextField
      label="Date Of Birth (Co-Allottee)"
      fullWidth
      variant="outlined"
      type="date"
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
    />
  </Grid>

  {/* <Grid item xs={6}>
    <TextField
      label="PAN No. (Co-Allottee)"
      fullWidth
      variant="outlined"
    />
  </Grid> */}
  <Grid item xs={6}>
   <TextField
        label="PAN No. (Co-Allottee)"
        fullWidth
        variant="outlined"
        inputProps={{ maxLength: 10 }}
        value={coPan}
        onChange={handleCoPanChange}
        error={coPanError}
        helperText={coPanHelperText}
      />
      </Grid>

  <Grid item xs={6}>
    <TextField
      label="AADHAR No. (Co-Allottee)"
      fullWidth
      variant="outlined"
      inputProps={{ maxLength: 12 }} 
      onChange={handleCoAadharChange}
      error={coAadharError}
      helperText={coAadharHelperText}
    />
  </Grid>

  {/* <Grid item xs={6}>
    <TextField
      label="MOBILE No. & EMAIL (Co-Allottee)"
      fullWidth
      variant="outlined"
    />
  </Grid> */}
  <Grid item xs={6}>
        <TextField
          label="MOBILE No. (Co-Allottee)"
          fullWidth
          variant="outlined"
          value={coMobile}
          onChange={handleCoMobileChange}
          inputProps={{ maxLength: 10 }}
          error={coMobileError}
          helperText={coMobileHelperText}
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="EMAIL (Co-Allottee)"
          fullWidth
          variant="outlined"
          value={coEmail}
          onChange={handleCoEmailChange}
          error={coEmailError}
          helperText={coEmailHelperText}
        />
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
      <Select labelId="carpet-area-label" id="carpet-area" label="Carpet Area in (Sq. Mtr.)">
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
      <Select labelId="wing-label" id="wing" label="Wing">
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
      <Select labelId="flat-no-label" id="flat-no" label="FLAT No.">
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
      <Select labelId="type-label" id="type" label="Type">
        <MenuItem value="2BHK">2BHK</MenuItem>
        <MenuItem value="3BHK">3BHK</MenuItem>
        <MenuItem value="4BHK">4BHK</MenuItem>
      </Select>
    </FormControl>
  </Grid>

  {/* Sold Rate */}
  <Grid item xs={6}>
    <TextField label="Sold Rate" fullWidth variant="outlined" type="number" />
  </Grid>

  {/* Enclosed Balcony (Sq. Mtr.) */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="enclosed-balcony-label">Enclosed Balcony in (Sq. Mtr.)</InputLabel>
      <Select labelId="enclosed-balcony-label" id="enclosed-balcony" label="Enclosed Balcony in (Sq. Mtr.)">
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
      <Select labelId="open-balcony-label" id="open-balcony" label="Open Balcony in (Sq. Mtr.)">
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
      <Select labelId="terrace-label" id="terrace" label="Terrace in (Sq. Mtr.)">
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
      <Select labelId="parking-label" id="parking" label="Parking">
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
      <Select labelId="floor-label" id="floor" label="Floor">
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
  {/* Total Consideration (Auto Calculated) */}
  <Grid item xs={6}>
    <TextField
      label="Total Consideration / Agreement Value"
      fullWidth
      variant="outlined"
      type="number"
    />
  </Grid>

  {/* Booking Amount / Advance Payment */}
  <Grid item xs={6}>
    <TextField
      label="Booking Amount / Advance Payment"
      fullWidth
      variant="outlined"
      type="number"
    />
  </Grid>

  {/* Stamp Duty (7% of Agreement Cost) */}
  <Grid item xs={6}>
    <TextField
      label="Stamp Duty (7% of Agreement Cost)"
      fullWidth
      variant="outlined"
    />
  </Grid>

  {/* Registration Fee */}
  <Grid item xs={6}>
    <TextField
      label="Registration Fee (Auto Calculated)"
      fullWidth
      variant="outlined"
    />
  </Grid>

  {/* GST Amount */}
  <Grid item xs={6}>
    <TextField
      label="GST Amount (Auto Calculated)"
      fullWidth
      variant="outlined"
    />
  </Grid>
</Grid>


      {/* Section 4: Documents */}
      <Typography variant="h5" gutterBottom sx={{ paddingTop: 3 }}>
        Section 4: Documents
      </Typography>
      <Grid container spacing={2}>
  {/* PAN Card */}
  <Grid item xs={6}>
    <Typography variant="body1">PAN Card (of both)</Typography>
    <Button
        variant="contained"
        component="label"
        sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
      >
        Choose File
        <input
          type="file"
          hidden
          multiple
          onChange={handleFileChange}
        />
      </Button>
      <Box mt={1}>
        {selectedFiles.map((file, index) => (
          <Typography key={index} variant="body2">
            {file.name}
          </Typography>
        ))}
      </Box>
  </Grid>

  {/* AADHAR Card */}
  <Grid item xs={6}>
  <Typography variant="body1">AADHAR Card (of both)</Typography>
  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: "white",
      color: "black",
      "&:hover": { backgroundColor: "#f0f0f0" }
    }}
  >
    Choose File
    <input type="file" hidden multiple onChange={handleAadharFileChange} />
  </Button>

  {selectedAadharFiles.length > 0 && (
    <Box mt={1}>
      {selectedAadharFiles.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </Box>
  )}
</Grid>


  {/* Marriage Certificate */}
  <Grid item xs={6}>
  <Typography variant="body1">MARRIAGE CERTIFICATE (If Available)</Typography>
  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: "white",
      color: "black",
      "&:hover": { backgroundColor: "#f0f0f0" }
    }}
  >
    Choose File
    <input type="file" hidden multiple onChange={handleMarriageFileChange} />
  </Button>

  {selectedMarriageFiles.length > 0 && (
    <Box mt={1}>
      {selectedMarriageFiles.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </Box>
  )}
</Grid>


  {/* Passport Size Photo */}

  <Grid item xs={6}>
  <Typography variant="body1">PASSPORT SIZE PHOTO (of both)</Typography>
  <Button
    variant="contained"
    component="label"
    sx={{
      backgroundColor: "white",
      color: "black",
      "&:hover": { backgroundColor: "#f0f0f0" },
      mt: 1
    }}
  >
    Choose Files
    <input
      type="file"
      hidden
      multiple
      onChange={handlePhotoFileChange}
    />
  </Button>

  {passportPhotos.length > 0 && (
    <Box mt={1}>
      {passportPhotos.map((file, index) => (
        <Typography key={index} variant="body2">
          {file.name}
        </Typography>
      ))}
    </Box> 
  )}
</Grid> 

  

  {/* Any Other Documents */}
  <Grid item xs={6}>
      <Typography variant="body1">Any Other</Typography>
      <Button 
        variant="contained" 
        component="label"
        sx={{ backgroundColor: "white", color: "black", "&:hover": { backgroundColor: "#f0f0f0" } }}
      >
        Choose File
        <input 
          type="file" 
          hidden 
          multiple 
          onChange={handleFileSelection} 
        />
      </Button>

      <div>
        {uploadedFiles.length > 0 && (
          <div>
            {uploadedFiles.map((fileName, index) => (
              // Use Typography with children to display file names
              <Typography key={index} sx={{ margin: 1 }}>
                {fileName}
              </Typography>
            ))}
          </div>
        )}
      </div>
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
    />
  </Grid>

  {/* Cheque/TRN Date */}
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Grid item xs={6}>
      <DatePicker
        label="Cheque/TRN Date"
         inputFormat="dd/MM/yyyy"
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

  {/* Bank Name */}
  <Grid item xs={6}>
    <FormControl fullWidth variant="outlined">
      <InputLabel id="bank-name-label">Bank Name</InputLabel>
      <Select
        labelId="bank-name-label"
        id="bank-name"
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
    />
  </Grid>
</Grid>

  
  
  
  
        
    
          </Paper>
        </DialogContent>
       
        <DialogActions>
  <Button 
    onClick={handleClose} 
    color="primary"
    sx={{ backgroundColor: '#f0f0f0', '&:hover': { backgroundColor: '#dcdcdc' } }}
  >
    Close
  </Button>

        <Button
  variant="contained"
  className="m-3"
  color="success"
  onClick={() => {
    toast.success("Details are submitted!", { 
      position: "top-right", 
      autoClose: 3000 
    });

    handleClose();  // Close the form
  }}
>
  Submit
</Button>

</DialogActions>

      </Dialog>
   
    <Tooltip title="WhatsApp" arrow>
      <IconButton
        sx={{
          color: 'white', // Icon color white for contrast
          fontSize: '2px',
          backgroundColor: '#25D366', // WhatsApp green background
          borderRadius: '50%', // Makes the icon rounded
          padding: '2px',
          '&:hover': {
            backgroundColor: '#128C7E', // Darker green for WhatsApp on hover
          },
        }}
        onClick={() => handleWhatsapp(item)}
      >
        <WhatsAppIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Email" arrow>
      <IconButton
        sx={{
          color: 'white', // Icon color white for contrast
          fontSize: '1px',
          backgroundColor: '#007BFF', // Blue background for Email
          borderRadius: '50%', 
          padding: '4px',
          // Makes the icon rounded
          '&:hover': {
            backgroundColor: '#0056b3', // Darker blue for Email on hover
          },
        }}
        onClick={() => handleEmail(item)}
      >
        <EmailIcon />
      </IconButton>
    </Tooltip>
  </div>
</TableCell>


      {/* Map the correct data fields */}
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.timestamp}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.enquiryNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.projectName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.bookingDate}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.aloteeName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.sourceName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.dob}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.occupation}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.panNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.aadharNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.mobileNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.altMobileNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.whatsappNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.email}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.address}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteeName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteeDob}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteeOccupation}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteePan}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteeAadhar}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.coAloteeMobileEmail}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.flatNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.type}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.wing}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.soldRate}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.carpetArea}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.enclosedBalcony}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.openBalcony}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.terrace}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.parking}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.floor}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.totalConsideration}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.bookingAmount}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.stampDuty}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.registrationFee}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.gstAmount}</TableCell>
      
     


<TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
  <IconButton
    onClick={() => window.open(item.panCard, '_blank')}
    sx={{ color: 'blue' }}
    color="inherit"
  >
    <VisibilityIcon />
  </IconButton>
</TableCell>

<TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
  <IconButton
    onClick={() => window.open(item.panCard, '_blank')}
    sx={{ color:  'blue'  }} 
    color="inherit"
  >
    <VisibilityIcon />
  </IconButton>
</TableCell>



<TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
  <IconButton
    onClick={() => window.open(item.panCard, '_blank')}
    sx={{ color: 'blue' }} 
    color="inherit"
  >
    <VisibilityIcon />
  </IconButton>
</TableCell>

        
<TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
  <span>{item.passportPhoto}</span>
  <IconButton sx={{ color: 'blue', marginLeft: '8px' }} onClick={() => window.open(item.panCard, '_blank')}>
    <VisibilityIcon />
  </IconButton>
</TableCell>

<TableCell sx={{ whiteSpace: 'nowrap', textAlign: 'center' }}>
  <span>{item.anyOther}</span>
  <IconButton sx={{ color: 'blue', marginLeft: '8px' }} onClick={() => window.open(item.panCard, '_blank')}>
    <VisibilityIcon />
  </IconButton>
</TableCell>


      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.bookingAmount}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.paymentMode}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.chequeTrnNo}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.chequeTrnDate}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.bankName}</TableCell>
      <TableCell sx={{ whiteSpace: 'nowrap' }}>{item.bankDetails}</TableCell>
    </TableRow>
  ))}
</TableBody>

  </Table>
</TableContainer>

   
      <div className="d-flex justify-content-between align-items-center">
        <Button style={{backgroundColor:"#800080"}} className="text-white mt-3" onClick={handlePagination} disabled={currentPage === 1}>Previous</Button>
        <Button style={{backgroundColor:"#800080"}} className='text-white mt-3' onClick={handlePagination} disabled={currentPage === totalPages}>Next</Button>
      </div>
    </div>
  );
};

export default CRM;
