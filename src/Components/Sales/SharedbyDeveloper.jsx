






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
  { label: "Download PDF", icon: <HiOutlineDocumentDownload size={30} color="red" />, createLabel: "" }
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

 


  const handleDownloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
  
    // Data you want to add to the PDF
    const timestamp = new Date().toLocaleDateString();  // Current date (e.g., "3/29/2025")

    const projectName = "";
    const name = "";
    const mobileNo = "";
    const flatsAlloted = "";  // Example number of flats allotted
    const reraCarpetArea = "";  // Example RERA Carpet Area
    const wing = "";
    const flatNo = "";
    const typeOfFlat = "";
  
    // Column headers and data
    const columns = [
      "Timestamp", "Project Name", "Name", "Mobile No", 
      "No of Flats Allotted", "RERA Carpet Area", "Wing", "Flat No", "Type of Flat"
    ];
  
    const data = [
      timestamp, projectName, name, mobileNo, 
      flatsAlloted, reraCarpetArea, wing, flatNo, typeOfFlat
    ];
  
    // Add title to the PDF
    doc.setFontSize(18);
    doc.text("Flat Allotment Information", 10, 10);
  
    // Set font for table
    doc.setFontSize(12);
  
    // Set column widths (adjust to fit the page width)
    const columnWidths = [25, 30, 20, 20, 20, 20, 20, 20, 20]; // Adjust these to fit your content
  
    // Function to split text into multiple lines if it exceeds column width
    const splitTextToFit = (text, maxWidth) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      return lines;
    };
    const rowHeight = 15;  // Row height, increase to add padding inside rows

  // Extra padding between rows
  const extraRowSpacing = 5; 
  
    // Draw column headers
    let xPos = 10;
    let yPos = 40;
  
    columns.forEach((col, index) => {
      doc.rect(xPos, yPos, columnWidths[index], 20); // Draw a rectangle for header
      let headerLines = splitTextToFit(col, columnWidths[index] - 4); // Adjusting padding
      doc.text(headerLines, xPos + 2, yPos + 7); // Add column header text (split if necessary)
      xPos += columnWidths[index]; // Move x position for next column
    });
  
    // Draw data rows
    xPos = 10;
    yPos += 20;
  
    data.forEach((value, index) => {
      doc.rect(xPos, yPos, columnWidths[index], 10); // Draw a rectangle for data
      let dataLines = splitTextToFit(value, columnWidths[index] - 4); // Adjusting padding
      doc.text(dataLines, xPos + 2, yPos + 7); // Add data text (split if necessary)
      xPos += columnWidths[index]; // Move x position for next column
    });
  
       // Add extra spacing between rows
       yPos += rowHeight + extraRowSpacing;
    // Save or download the generated PDF
    doc.save("Flat_Allotment_Info.pdf");
  };
  
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
  

 
  
  return (

    

    <div className="main-content">
      <h6>Sales Module / Shared by Developer</h6>
     
   
 
    


   <div className="d-flex align-items-center mb-3">
        {/* {sections.map((section, index) => (
            

          <Button
            key={index}
            onClick={() => handleToggleSection(index)}
            variant="outlined"
            color="success"
            className='m-3'
            // style={{ borderRadius: '20px' }}
            style={{
                borderRadius: '20px',
                border: 'none' 
              }}
            startIcon={section.icon}
            
          >
            {expandedSection === index ? section.label : null}
          </Button>
        ))} */}

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


