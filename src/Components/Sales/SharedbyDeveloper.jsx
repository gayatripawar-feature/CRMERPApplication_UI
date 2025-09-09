import React, { useState, useEffect } from 'react';
import {Input, Table, TableBody, TableCell, TableContainer, Typography,IconButton,TableHead, TableRow, Paper,Box,Tabs, Tab, Button, TextField, Grid ,MenuItem,FormControl,Select, InputLabel} from '@mui/material';
import FirmTable from './FirmTable';
import DisplayTable from "./DisplayTable";
import LandownerTable from "./LandownerTable";
import FlatAllotment from './FlatAllotement';
import { ToastContainer, toast } from 'react-toastify';
import { jsPDF } from "jspdf";
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import { FaBuilding, FaHome, FaUsers } from 'react-icons/fa';
import { AiOutlineFileSearch } from 'react-icons/ai'; 
import { MdBusiness, MdDescription, MdApartment } from 'react-icons/md';  
import { GiOfficeChair } from 'react-icons/gi'; 
import { HiOutlineDocumentDownload } from 'react-icons/hi'; 
import Constants from '../Constants';

const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};

const sections = [
   { label: "Project Display", icon: <MdDescription size={30} color="orange" />, createLabel: "Create Project" },  
  { label: "Firm Display", icon: <MdBusiness size={30} color="purple" />, createLabel: "Create Firm" }, 
  { label: "LandOwner Display", icon: <GiOfficeChair size={30} color="green" />, createLabel: "Create Landowner Info" },  
   { label: "Flat Allotment Display", icon: <MdApartment size={30} color="blue" />, createLabel: "Create Flat Allotment Info" },
];
const tabNames = [ "display", "firm", "landowner","allotement"]; 
const SharedbyDeveloper = () => {
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0); 
  const [showFirmForm, setShowFirmForm] = useState(false);
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


  const handleAddPartner = () => {
    setPartners([...partners, { name: "", age: "", occupation: "", mobile: "", email: "", address: "", pan: "", aadhaar: "" }]);
  };

  const handleRemovePartner = (index) => {
    setPartners(partners.filter((_, i) => i !== index));
  };

  const handleAddPhase = () => {
    setPhases([...phases, { phaseNo: "", wingNo: "", mahareraNo: "" }]); 
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
    if (value.length > 10) {
      toast.error("Mobile number cannot exceed 10 digits!");
    } else {
    
      const updatedPartners = [...partners];
      updatedPartners[partnerIndex].mobile = value;
      setPartners(updatedPartners);
    }
  };

  const handleChange = (e, label, partnerIndex) => {
    const { value } = e.target;
  const updatedPartners = [...partners];
    updatedPartners[partnerIndex][label.toLowerCase().replace(/ /g, "")] = value;
    setPartners(updatedPartners);
   if (label === 'Firm Name') {
     
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
  
  

  const buttonSx = {
  background: Constants.primaryColor,
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  "&:hover": {
    background: Constants.primaryColor,
  },
};

  
  return (
  <div className="main-content">
      <h6>Sales Module / Shared by Developer</h6>
     <div className="d-flex align-items-center">
      


  <div className="d-flex align-items-center" style={{ justifyContent: "space-between", width: "100%" }}>
  {/* Left side: Tabs */}
  <div style={{ display: "flex", gap: "8px" }}>
    {sections.map((section, index) => (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: Constants.primaryColor,
          padding: '8px',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: "width 0.3s ease, background 0.3s ease",
          width: expandedSection === index ? "200px" : "50px",
          minWidth: "50px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontSize: "14px",
          justifyContent: "center",
          textTransform: "none",
          position: "relative",
          background:Constants.primaryColor,
          boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
          margin: 0
        }}
        onClick={() => handleToggleSection(index)}
      >
        {React.cloneElement(section.icon, { style: { marginRight: '8px', color: 'white' } })}
        {expandedSection === index && (
          <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>{section.label}</span>
        )}
      </div>
    ))}
  </div>

  {/* Right side: Download PDF button */}
  <div style={{ marginLeft: '16px', flexShrink: 0 }}>
    {(expandedSection === 0 && selectedTab === "display") && (
      <Button variant="contained" sx={buttonSx} onClick={handleDownloadPDFFirm}>
        <FaFileDownload size={18} /> Download PDF
      </Button>
    )}
    {(expandedSection === 1 && selectedTab === "firm") && (
      <Button variant="contained" sx={buttonSx} onClick={handleDownloadPDFProject}>
        <FaFileDownload size={18} /> Download PDF
      </Button>
    )}
    {(expandedSection === 2 && selectedTab === "landowner") && (
      <Button variant="contained" sx={buttonSx} onClick={handleDownloadPDFLandowner}>
        <FaFileDownload size={18} /> Download PDF
      </Button>
    )}
    {(expandedSection === 3 && selectedTab === "allotement") && (
      <Button variant="contained" sx={buttonSx} onClick={handleDownloadPDFFlatAllotement}>
        <FaFileDownload size={18} /> Download PDF
      </Button>
    )}
  </div>
</div>



  </div>









     
{expandedSection === 0 && selectedTab === "display" && (
  <div className="content-container mt-4">
    {!showFirmForm ? (
      <>
        <div className='button-container' >
       </div>

        <div className="">
         
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
       
        </div>

      
        <div className="mt-3">
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
        {/* <Button
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
   
    onClick={handleDownloadPDFLandowner}
  >
    <FaFileDownload size={18} />  
    Download PDF
  </Button> */}
        </div>

    
        <div className="mt-3">
          <LandownerTable data={projectData} />
        </div>
      </>
    ) : null }
  </div>
)}


 
 {expandedSection === 3 && selectedTab === "allotement" && (
  <div className="content-container mt-4">
    {!showFlatForm ? (
      <>
        <div>
        {/* <Button
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
   
    onClick={handleDownloadPDFFlatAllotement}
  >
    <FaFileDownload size={18} /> 
    Download PDF
  </Button> */}
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


