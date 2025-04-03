






import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
// import { FaEye, FaBuilding, FaFileDownload, FaPlus, FaTrash,FaUpload } from "react-icons/fa";
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import { jsPDF } from "jspdf";
// import "jspdf-autotable";
// import { FaUsers, FaHome } from 'react-icons/fa'; // FontAwesome
// import { AiOutlineFileSearch } from 'react-icons/ai'; // AntDesign
// import { IoIosBuild } from 'react-icons/io'; // Ionicons
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

import { FaBuilding, FaHome, FaUsers } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai'; 
import { MdBusiness, MdDescription, MdApartment } from 'react-icons/md';   // Material Design Icons
import { GiOfficeChair } from 'react-icons/gi'; // For office or business-related
import { HiOutlineDocumentDownload } from 'react-icons/hi'; // For download-related

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};




// const sections = [
//     { label: "Firm Display", icon: <FaBuilding size={20} color="purple" />, createLabel: "Create Firm" },
//     { label: "Project Display", icon: <AiOutlineFileSearch size={20} color="orange" />, createLabel: "Create Project" },
//     { label: "LandOwner Display", icon: <FaUsers size={20} color="green" />, createLabel: "Create Landowner Info" },  // Updated icon
//     { label: "Flat Allotment Display", icon: <FaHome size={20} color="blue" />, createLabel: "Create Flat Allotment Info" },  // Updated icon
//     { label: "Download PDF", icon: <FaFileDownload size={20} color="red" />, createLabel: "" }  // Updated icon
//   ];
const sections = [
  // Updated icon for "Firm Display"
  // { label: "Firm Display", icon: <MdBusiness size={30} color="purple" />, createLabel: "Create Firm" }, 

  // Updated icon for "Project Display"
  { label: "Project Display", icon: <MdDescription size={30} color="orange" />, createLabel: "Create Project" },  
  { label: "Firm Display", icon: <MdBusiness size={30} color="purple" />, createLabel: "Create Firm" }, 
  // Updated icon for "LandOwner Display"
  { label: "LandOwner Display", icon: <GiOfficeChair size={30} color="green" />, createLabel: "Create Landowner Info" },  

  // Updated icon for "Flat Allotment Display"
  { label: "Flat Allotment Display", icon: <MdApartment size={30} color="blue" />, createLabel: "Create Flat Allotment Info" },

  // Updated icon for "Download PDF"
  // { label: "Download PDF", icon: <HiOutlineDocumentDownload size={30} color="red" />, createLabel: "" }
];

const tabNames = [ "display", "firm", "landowner","allotement"]; 
// const tabNames = [ "firm", "display", "landowner","allotement"]; 
  
const SharedbyDeveloper = () => {
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0); // Ensure expandedSection is defined here
  const [showFirmForm, setShowFirmForm] = useState(false);
  // const [partners, setPartners] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [phases, setPhases] = useState([]);
  const [showLandownerForm, setShowLandownerForm] = useState(false); 
  const [showFlatForm, setShowFlatForm] = useState(false); 
  const [selectedTab, setSelectedTab] = useState("display");
  const [projectData, setProjectData] = useState([]);
  const[FlatAllotement , setFlatAllotement] = useState([false]);
  const [selectedProject, setSelectedProject] = useState('');
  const [Flatdata, setFlatdata] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  const [fileNames, setFileNames] = useState({
    firmPanNoDocument: "",
    firmGstNoDocument: "",
    firmLightBillForAddressProof: "",
  });

   // Handle file selection and update the state with the file name
   const handleFileChange = (e, key) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      setFileNames((prevState) => ({
        ...prevState,
        [key]: file.name, // Update the file name for the corresponding key
      }));
    }
  };


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


const handleTabClick = (index) => {
    console.log("Clicked Section Index:", index);
    console.log("Selected Tab Before Update:", selectedTab);
    setSelectedTab(tabNames[index]); 
};

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
  };


  const handleToggleSection = (index) => {
    if (sections[index].label === "Download PDF") {
      handleDownloadPDF();
      return;
    }
    console.log("Clicked Section Index:", index);
    console.log("Selected Tab Before Update:", selectedTab);
    setExpandedSection(index);  

//     console.log("Clicked Section Index:", index);
// console.log("Sections Array:", sections);
// console.log("Label at index 3:", sections[3]?.label);
// console.log("Label length at index 3:", sections[3]?.label.length);
// console.log("Label at index 3:", `"${sections[3]?.label}"`);

//   if (sections[index].label === "Project Display") {
//     setSelectedTab("display");
//   } else if (sections[index].label === "Firm Display") {
//     setSelectedTab("firm");
//   } else if (sections[index].label === "LandOwner Display") {
//     setSelectedTab("landowner");
//   } else if (sections[index].label === "Flat Allotement Display") {
//     setExpandedSection(index);
//     setSelectedTab("allotement");
//   }else {
//     console.error("Unrecognized section label:", sections[index].label);
//   }


  
//     setShowFirmForm(false);
//     setShowProjectForm(false); 
//     setShowLandownerForm(false); 
    
//     setShowFlatForm(false);

console.log("Clicked Section Index:", index);
console.log("Sections Array:", sections);
console.log("Label at index 3:", `"${sections[3]?.label}"`);
console.log("Label length at index 3:", sections[3]?.label?.length);

if (sections[index] && sections[index].label === "Project Display") {
  setSelectedTab("display");
} else if (sections[index] && sections[index].label === "Firm Display") {
  setSelectedTab("firm");
} else if (sections[index] && sections[index].label === "LandOwner Display") {
  setSelectedTab("landowner");
} else if (sections[index] && sections[index].label === "Flat Allotment Display") {
  console.log("Flat Allotment Display matched at index:", index);
  setExpandedSection(index);
  setSelectedTab("allotement");
  setShowFlatForm(true); // Ensure this is triggered to show the flat allotment table
} else {
  console.error("Unrecognized section label:", sections[index]?.label);
}

// Reset other forms
setShowFirmForm(false);
setShowProjectForm(false);
setShowLandownerForm(false);
setShowFlatForm(false); // Ensure this is not reset elsewhere if you want the table to show

  };

  const [newPhase, setNewPhase] = useState({
    phaseNo: '',
    wingNo: '',
    mahareraNo: ''
  });

  
   {/* Table Section */}
   {selectedTab === "firm" && <FirmTable />}
   {selectedTab === "display" && <DisplayTable />}
   {selectedTab === "landowner" && <LandownerTable />}
   {selectedTab === "allotement" && <FlatAllotement/>}

 


  // const handleDownloadPDF = () => {
  //   // Create a new jsPDF instance
  //   const doc = new jsPDF();
  
  //   // Data you want to add to the PDF
  //   const timestamp = new Date().toLocaleDateString();  // Current date (e.g., "3/29/2025")

  //   const projectName = "";
  //   const name = "";
  //   const mobileNo = "";
  //   const flatsAlloted = "";  // Example number of flats allotted
  //   const reraCarpetArea = "";  // Example RERA Carpet Area
  //   const wing = "";
  //   const flatNo = "";
  //   const typeOfFlat = "";
  
  //   // Column headers and data
  //   const columns = [
  //     "Timestamp", "Project Name", "Name", "Mobile No", 
  //     "No of Flats Allotted", "RERA Carpet Area", "Wing", "Flat No", "Type of Flat"
  //   ];
  
  //   const data = [
  //     timestamp, projectName, name, mobileNo, 
  //     flatsAlloted, reraCarpetArea, wing, flatNo, typeOfFlat
  //   ];
  
  //   // Add title to the PDF
  //   doc.setFontSize(18);
  //   doc.text("Flat Allotment Information", 10, 10);
  
  //   // Set font for table
  //   doc.setFontSize(12);
  
  //   // Set column widths (adjust to fit the page width)
  //   const columnWidths = [25, 30, 20, 20, 20, 20, 20, 20, 20]; // Adjust these to fit your content
  
  //   // Function to split text into multiple lines if it exceeds column width
  //   const splitTextToFit = (text, maxWidth) => {
  //     const lines = doc.splitTextToSize(text, maxWidth);
  //     return lines;
  //   };
  //   const rowHeight = 15;  // Row height, increase to add padding inside rows

  // // Extra padding between rows
  // const extraRowSpacing = 5; 
  
  //   // Draw column headers
  //   let xPos = 10;
  //   let yPos = 40;
  
  //   columns.forEach((col, index) => {
  //     doc.rect(xPos, yPos, columnWidths[index], 20); // Draw a rectangle for header
  //     let headerLines = splitTextToFit(col, columnWidths[index] - 4); // Adjusting padding
  //     doc.text(headerLines, xPos + 2, yPos + 7); // Add column header text (split if necessary)
  //     xPos += columnWidths[index]; // Move x position for next column
  //   });
  
  //   // Draw data rows
  //   xPos = 10;
  //   yPos += 20;
  
  //   data.forEach((value, index) => {
  //     doc.rect(xPos, yPos, columnWidths[index], 10); // Draw a rectangle for data
  //     let dataLines = splitTextToFit(value, columnWidths[index] - 4); // Adjusting padding
  //     doc.text(dataLines, xPos + 2, yPos + 7); // Add data text (split if necessary)
  //     xPos += columnWidths[index]; // Move x position for next column
  //   });
  
  //      // Add extra spacing between rows
  //      yPos += rowHeight + extraRowSpacing;
  //   // Save or download the generated PDF
  //   doc.save("Flat_Allotment_Info.pdf");
  // };
  
  const handleAddPartner = () => {
    setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
  };

  const handleRemovePartner = (index) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  const handleAddPhase = () => {
    setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); // Add default empty phase
  };

  const handleRemovePhase = (index) => {
    setPhases(phases.filter((_, i) => i !== index));
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCreateFirm = () => {
    setShowFirmForm(false);
    setShowProjectForm(false);
  };

  const handleCreateProject = () => {
    setShowProjectForm(true);
  };

  const documentLabels = [
    "Residential Address Document",
    "PAN No Document",
    "Aadhaar No Document",
    "Photo Document",
    "Light Bill for Address Proof",
  ];

  const handleBankChange = (event) => {
    setSelectedBank(event.target.value);
  };

  

  const handleNameChange = (event) => {
    const value = event.target.value;


    if (/[^a-zA-Z\s]/.test(value)) {
      setError('Name should only contain letters and spaces.');
    } else {
      setError(''); 
    }

    setName(value); 
  };
  const handleMobileNoChange = (event) => {
    const value = event.target.value;
    
    if (/[^0-9]/.test(value)) {
      toast.error('Mobile number should only contain digits.');
    } else if (value.length > 10) {
      toast.error('Mobile number cannot exceed 10 digits.');
    }
    setMobileNo(value);
  };


  const handleMobileChange = (event, partnerIndex) => {
    const value = event.target.value;

    // If the value exceeds 10 digits, show a toast and prevent the change
    if (value.length > 10) {
      toast.error("Mobile number cannot exceed 10 digits!");
    } else {
      // Update the partner state or handle other changes here
      const updatedPartners = [...partners];
      updatedPartners[partnerIndex].mobile = value;
      setPartners(updatedPartners);
    }
  };

  const handleChange = (e, label, partnerIndex) => {
    const { value } = e.target;
  
    // Update the partners array with the new value for the specific field
    const updatedPartners = [...partners];
    updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
    setPartners(updatedPartners);
  
    // Apply validation for the 'firmName' field
    if (label === 'Firm Name') {
      // Check if the input contains only letters and spaces
      if (!/^[A-Za-z\s]*$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          firmName: 'Firm Name should only contain letters and spaces',
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          firmName: '', 
        }));
      }
    }
  };
  
  
      
  const handleDownloadPDFFirm = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  
    // Define columns for the first page
    const firstPageColumns = [
      "S.No", "Timestamp", "Firm Name", "Project Name", "Project Address",
      "Old Survey No", "New Survey No", "Village", "Taluka", "District"
    ];
  
    // Define columns for the second page
    const secondPageColumns = [
      "S.No", "Sanction Authority", "East", "West", "North", "South",
      "Latitude", "Longitude", "Landmark", "Phase No", "Wing No", "MahaRERA No"
    ];
  
    // Map data for first page
    const firstPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.timestamp || "-",
      row.name || "-",
      row.projectName || "-",
      row.projectAddress || "-",
      row.oldSurveyNumber || "-",
      row.newSurveyNumber || "-",
      row.village || "-",
      row.taluka || "-",
      row.district || "-"
    ]);
  
    // Map data for second page
    const secondPageRows = loans.map((row, index) => [
      index + 1, // Serial Number
      row.sanctionAuthority || "-",
      row.east || "-",
      row.west || "-",
      row.north || "-",
      row.south || "-",
      row.latitude || "-",
      row.longitude || "-",
      row.landmark || "-",
      row.phaseNo || "-",
      row.wingNo || "-",
      row.mahaRERANo || "-"
    ]);
  
    console.log("Formatted First Page Rows:", firstPageRows);
    console.log("Formatted Second Page Rows:", secondPageRows);
  
    // Generate first page table
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Add a new page for additional columns
    doc.addPage();
  
    // Generate second page table
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("Project_Display_Report.pdf");
  };
  
  const handleDownloadPDFProject = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Project Display Report", 14, 15);
  
    // Define columns for the first page
    const firstPageColumns = [
      "S.No", "Timestamp", "Firm Name", "Firm Address", "Firm PAN No", "Firm GST No",
      "Name", "Age", "Occupation"
    ];
  
    // Define columns for the second page
    const secondPageColumns = [
      "S.No", "Mobile No.", "Mail ID", "Residential Address", "PAN No", "Aadhaar No"
    ];
  
    // Function to map data into table format
    const mapLoanData = (row, index, columns) => {
      return columns.map(column => {
        if (column === "S.No") return index + 1; // Serial Number
        return row[getKeyFromColumn(column)] || "-";
      });
    };
  
    // Helper function to map column names to object keys
    const getKeyFromColumn = (column) => {
      const mapping = {
        "Timestamp": "timestamp",
        "Firm Name": "firmName",
        "Firm Address": "firmAddress",
        "Firm PAN No": "firmPanNo",
        "Firm GST No": "firmGstNo",
        "Name": "name",
        "Age": "age",
        "Occupation": "occupation",
        "Mobile No.": "mobileNo",
        "Mail ID": "mailId",
        "Residential Address": "residentialAddress",
        "PAN No": "panNo",
        "Aadhaar No": "aadhaarNo"
      };
      return mapping[column] || column; // Return key from mapping or the same value if not found
    };
  
    const firstPageRows = loans.map((row, index) => mapLoanData(row, index, firstPageColumns));
    const secondPageRows = loans.map((row, index) => mapLoanData(row, index, secondPageColumns));
  
    console.log("Formatted First Page Rows:", firstPageRows);
    console.log("Formatted Second Page Rows:", secondPageRows);
  
    // Generate first page table
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.addPage();
  
    // Generate second page table
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("Firm_Display_Report.pdf");
  };


  const handleDownloadPDFLandowner = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Landowner Display Report", 14, 15);
  
    // Define balanced columns for the first page
    const firstPageColumns = [
      "Sr.No", "Timestamp", "Project Name", "Name", "Age", "Occupation", "Mobile No", "Mail ID"
    ];
  
    // Define balanced columns for the second page
    const secondPageColumns = [
      "Sr.No", "Village", "Taluka", "District", "Name of Bank", "Bank Address", "Account No", "IFSC Code"
    ];
  
    // Function to map data into table format
    const mapLoanData = (row, index, columns) => {
      return columns.map(column => {
        if (column === "S.No") return index + 1; // Serial Number
        return row[getKeyFromColumn(column)] || "-";
      });
    };
  
    // Helper function to map column names to object keys
    const getKeyFromColumn = (column) => {
      const mapping = {
        "Timestamp": "timestamp",
        "Project Name": "projectName",
        "Name": "name",
        "Age": "age",
        "Occupation": "occupation",
        "Mobile No": "mobileNo",
        "Mail ID": "mailId",
        "Village": "village",
        "Taluka": "taluka",
        "District": "district",
        "Name of Bank": "bankName",
        "Bank Address": "bankAddress",
        "Account No": "accountNo",
        "IFSC Code": "ifscCode"
      };
      return mapping[column] || column; // Return key from mapping or the same value if not found
    };
  
    const firstPageRows = loans.map((row, index) => mapLoanData(row, index, firstPageColumns));
    const secondPageRows = loans.map((row, index) => mapLoanData(row, index, secondPageColumns));
  
    console.log("Formatted First Page Rows:", firstPageRows);
    console.log("Formatted Second Page Rows:", secondPageRows);
  
    // Generate first page table
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.addPage();
  
    // Generate second page table
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("Landowner_Display_Report.pdf");
  };
  
  
  const handleDownloadPDFFlatAllotement = () => {
    console.log("Loans data before mapping:", loans);
  
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Flat Allotment Display Report", 14, 15);
  
    // Define balanced columns for the first page
    const firstPageColumns = [
      "Sr.No", "Timestamp", "Project Name", "Landowner Name", "Age", "Occupation", "Mobile No", "Mail ID", 
      "Village", "Taluka", "District", "Residential Address"
    ];
  
    // Define balanced columns for the second page
    const secondPageColumns = [
      "Sr.No", "PAN No", "Aadhaar", "Photo", "Light Bill", "Name of Bank", "Bank Address", "Account No", "IFSC Code"
    ];
  
    // Function to map data into table format
    const mapLoanData = (row, index, columns) => {
      return columns.map(column => {
        if (column === "Sr.No") return index + 1; // Serial Number
        return row[getKeyFromColumn(column)] || "-";
      });
    };
  
    // Helper function to map column names to object keys
    const getKeyFromColumn = (column) => {
      const mapping = {
        "Timestamp": "timestamp",
        "Project Name": "projectName",
        "Landowner Name": "landownerName",
        "Age": "age",
        "Occupation": "occupation",
        "Mobile No": "mobileNo",
        "Mail ID": "mailId",
        "Village": "village",
        "Taluka": "taluka",
        "District": "district",
        "Residential Address": "residentialAddress",
        "PAN No": "panNo",
        "Aadhaar": "aadhaar",
        "Photo": "photo",
        "Light Bill": "lightBill",
        "Name of Bank": "bankName",
        "Bank Address": "bankAddress",
        "Account No": "accountNo",
        "IFSC Code": "ifscCode"
      };
      return mapping[column] || column; // Return key from mapping or the same value if not found
    };
  
    const firstPageRows = loans.map((row, index) => mapLoanData(row, index, firstPageColumns));
    const secondPageRows = loans.map((row, index) => mapLoanData(row, index, secondPageColumns));
  
    console.log("Formatted First Page Rows:", firstPageRows);
    console.log("Formatted Second Page Rows:", secondPageRows);
  
    // Generate first page table
    autoTable(doc, {
      startY: 25,
      head: [firstPageColumns],
      body: firstPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.addPage();
  
    // Generate second page table
    autoTable(doc, {
      startY: 25,
      head: [secondPageColumns],
      body: secondPageRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    // Save the PDF
    doc.save("FlatAllotment_Display_Report.pdf");
  };
  
  
  
  return (

    

    <div className="main-content">
      <h6>Sales Module / Shared by Developer</h6>
     
   
 
    


   <div className="d-flex align-items-center mb-3">
      

{sections.map((section, index) => (
  <div 
    key={index} 
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: '#3621a9', 
      padding: '8px', 
      borderRadius: '20px',  // borderRadius changed to 20px from 10%
      margin: '5px',
      cursor: 'pointer',    // Add pointer cursor for better UX
      transition: "width 0.3s ease, background 0.3s ease",
      width: expandedSection === index ? "200px" : "50px", // Toggle width based on expanded state
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      
     
      justifyContent: "center",
      textTransform: "none",
      position: "relative",
      background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)", // Gradient background
      boxShadow:
        "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    }}
    onClick={() => handleToggleSection(index)}  // onClick function for handling clicks
  >
    {React.cloneElement(section.icon, { style: { marginRight: '8px',color: 'white' } })}  {/* Add some margin to separate icon from label */}
    
    {/* Conditionally display label based on expandedSection */}
    {expandedSection === index ? (
      <span className="fw-bold text-white fs-6"style={{ color: 'white', marginLeft: '10px' }}>{section.label}</span>
    ) : null}

    {/* Hover effects */}
    <div style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255, 255, 255, 0.2)",
      transform: "scale(0.1)",
      transition: "transform 0.3s ease",
      zIndex: -1,
    }}></div>

    <div 
      style={{
        "&:hover": {
          background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
        },
        "&:hover div": {
          transform: "scale(1)",
        },
      }}
    ></div>

  </div>
))}




      </div>  









     
{expandedSection === 0 && selectedTab === "display" && (
  <div className="content-container mt-3">
    {!showFirmForm ? (
      <>
        <div className='button-container'>
     
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
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFFirm}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>

          
        </div>

        <div className="mt-3">
          {/* <FirmTable firms={loans} /> */}
          <DisplayTable data={projectData} />
        </div>
      </>
    ) : null }
  </div>
)}







{expandedSection === 1 && selectedTab === "firm" && (
  <div className="content-container mt-3">
    {!showProjectForm ? (
      <>
        <div className="button-container">
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
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFProject}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        </div>

        {/* Only display the table */}
        <div className="mt-3">
          {/* <DisplayTable data={projectData} /> */}
            <FirmTable firms={loans} />
        </div>
      </>
    ) : null /* Do not show the form here when showProjectForm is true */}
  </div>
)}







{expandedSection === 2 && selectedTab === "landowner" && (
  <div className="content-container mt-3">
    {!showLandownerForm ? (
      <>
        <div className="button-container">
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
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFLandowner}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        </div>

    
        <div className="mt-3">
          <LandownerTable data={projectData} />
        </div>
      </>
    ) : null }
  </div>
)}


 
 {expandedSection === 3 && selectedTab === "allotement" && (
  <div className="content-container mt-3">
    {!showFlatForm ? (
      <>
        <div>
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
      alignItems: "center",  // Align icon and text
      gap: "8px",  // Space between icon and text
      "&:hover": {
        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
      },
     
    }}
    // onClick={() => handledow(firms)}
    onClick={handleDownloadPDFFlatAllotement}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        </div>
        <div className="mt-3">
          <FlatAllotment data={Flatdata} /> 
        </div>
      </>
    ) : null}
  </div>
)}
</div>
  )}


export default SharedbyDeveloper;


