import React, { useState, useRef , useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem,Box ,Stack} from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { Inventory } from '@mui/icons-material';
import InventoryTable from './InventoryTable';
import { ToastContainer, toast } from "react-toastify";
import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Constants from '../Constants';
import {useMediaQuery,useTheme} from "@mui/material";
const fetchLoansData = async () => {
  const response = await fetch('/api/getOCRCollection');
  return response.json();
};
const statusOptions = ["Approved", "Unapproved"];
const owners = ["Landowner", "Developer", "Investor"];
const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
const unitTypes = ["Residential", "Commercial"];
const sections = [
  { label: "Display Inventory", icon: <FaEye size={20} /> },
  { label: "Sample CSV", icon: <FaFileCsv size={20}/> },
  { label: "Upload Excel", icon: <FaUpload size={20}/> },
];

const ProjectInventory = () => {

  const inventoryRef = useRef();
  const [loans, setLoans] = useState([]);
  const [expandedSection, setExpandedSection] = useState(0);
  const [showFirmForm, setShowFirmForm] = useState(false);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // true if screen < 600px
  const [showFileInput, setShowFileInput] = useState(false);
  useEffect(() => {
    loadLoansData();
  }, []);

  const fileInputRef = useRef(null);
  const loadLoansData = async () => {
    const data = await fetchLoansData();
    setLoans(data);
  };

  const handleToggleSection = (index) => {
    if (index === 1) {
      downloadSampleCsv();   // csv download
    } else if (index === 2) {
       if (fileInputRef.current) {
        fileInputRef.current.click();  //opens filr chooser
      }  
    } else {
      setExpandedSection(index);
      setShowFileInput(false);
    }
  };
  
  const [inventoryData, setInventoryData] = useState([
    {
     
    },
  ]);
  const handleDelete = (index) => {
    setInventoryData(inventoryData.filter((_, i) => i !== index));
  };
  const downloadSampleCsv = () => {
    const sampleData = `Project Name,Wing,Floor,Flat No,RERA Carpet Area (Sq m),RERA Carpet Area (Sq ft),Total Saleable Area,Saleable Ratio,Unit Type,Configuration,Status,Ownership,Att Terrace Carpet Area,Balcony Area,Porch Area, Top Terrace Carpet Area,Super BuiltUp,Open /Enclosed balcony as sanctioned,Podium Garde\n`;
    const blob = new Blob([sampleData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory_template.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  const handleDownloadPDFInventory = () => {
    if (!inventoryData || inventoryData.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }
   const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
   doc.text("Inventory Report", 14, 15);
  const firstTableColumn = [
      "TIMESTAMP", "PROJECT NAME", "WING", "FLOOR", "FLAT NO",
      "RERA CARPET AREA (Sq Mtr)", "RERA CARPET AREA (Sq Ft)", "TOTAL SALEABLE AREA (Sq. Fts)",
      "SALEABLE RATIO", "UNIT TYPE"
    ];
  const secondTableColumn = [
      "CONFIGURATION", "STATUS", "OWNERSHIP", "ATT. TERRACE CARPET AREA", 
      "BALCONY AREA/SITOUT CARPET AREA", "PORCH AREA", "TOP TERRACE CARPET AREA", 
      "SUPER BUILTUP AREA", "OPEN/ENCLOSED BALCONY AS SANCTIONED", "PODIUM GRADE"
    ];
  
   
    const firstTableRows = inventoryData.map((item) => [
      item.timestamp, item.projectName, item.wing, item.floor, item.flatNo,
      item.reraCarpetAreaSqMtr, item.reraCarpetAreaSqFt, item.totalSaleableAreaSqFt,
      item.saleableRatio, item.unitType
    ]);
  
    const secondTableRows = inventoryData.map((item) => [
      item.configuration, item.status, item.ownership, item.attTerraceCarpetArea,
      item.balconySitoutCarpetArea, item.porchArea, item.topTerraceCarpetArea,
      item.superBuiltupArea, item.openEnclosedBalconySanctioned, item.podiumGrade
    ]);
  
   
    autoTable(doc, {
      startY: 25,
      head: [firstTableColumn],
      body: firstTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
 
    doc.addPage();
    doc.text("Inventory Report - Part 2", 14, 15);
  
  
    autoTable(doc, {
      startY: 25,
      head: [secondTableColumn],
      body: secondTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
    doc.save("Inventory_Report.pdf");
  };
  const [formValues, setFormValues] = useState({
    projectName: '',
    wing: '',
    floor: '',
    flatNo: '',
    reraCarpetAreaSqMtr: '',
    reraCarpetAreaSqFt: '',
    totalSaleableArea: '',
    saleableToCarpetRatio: '',
    unitType: '',
    configuration: '',
    status: '',
    owner: '',
    terraceArea: '',
    balconyArea: '',
    porchArea: '',
    topTerraceArea: '',
    superBuiltupArea: '',
    balconySanctioned: '',
    podiumGarde: ''
  });
  
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
    const handleFormSubmit = () => {
    const newItem = {
      projectName: formValues.projectName,
      wing: formValues.wing,
      floor: formValues.floor,
      flatNo: formValues.flatNo,
      reraCarpetAreaSqMtr: formValues.reraCarpetAreaSqMtr,
      reraCarpetAreaSqFt: formValues.reraCarpetAreaSqFt,
      totalSaleableArea: formValues.totalSaleableArea,
      saleableToCarpetRatio: formValues.saleableToCarpetRatio,  
      unitType: formValues.unitType,
      configuration: formValues.configuration,
      status: formValues.status,
      owner: formValues.owner,
      terraceArea: formValues.terraceArea,
      balconyArea: formValues.balconyArea,
      porchArea: formValues.porchArea,
      topTerraceArea: formValues.topTerraceArea,
      superBuiltupArea: formValues.superBuiltupArea,
      balconySanctioned: formValues.balconySanctioned,
      podiumGarde: formValues.podiumGarde,
      timestamp: new Date().toISOString(),
    };
    // reset the form 
     setFormValues({
      projectName: '',
      wing: '',
      floor: '',
      flatNo: '',
      reraCarpetAreaSqMtr: '',
      reraCarpetAreaSqFt: '',
      totalSaleableArea: '',
      saleableToCarpetRatio: '',
      unitType: '',
      configuration: '',
      status: '',
      owner: '',
      terraceArea: '',
      balconyArea: '',
      porchArea: '',
      topTerraceArea: '',
      superBuiltupArea: '',
      balconySanctioned: '',
      podiumGarde: ''
    });
  setInventoryData([...inventoryData, newItem]); 
    setPartners([{ name: '', age: '', occupation: '' }]);
  setShowFirmForm(false);
  };
  

 
  
  return (
    <div className="main-content">
      <h6 className='col-12'>Dashboard / Developer Module / Project Inventory</h6>
 <div className="d-flex align-items-center mb-2">
       <div className="d-flex align-items-center justify-content-between mb-2" style={{ width: "100%" }}>
<div className="d-flex align-items-center ">


 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: Constants.primaryColor,
            padding: "8px",
            borderRadius: "20px",
            margin: "5px",
            cursor: "pointer",
            transition: "width 0.3s ease, background 0.3s ease",
            width:
              expandedSection === index
                ? isMobile
                  ? "160px" // expanded on mobile
                  : "250px" // expanded on desktop
                : isMobile
                ? "40px" // collapsed on mobile
                : "50px", // collapsed on desktop
            minWidth: isMobile ? "40px" : "50px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: isMobile ? "12px" : "14px", // smaller text on mobile
            justifyContent: "center",
            textTransform: "none",
            position: "relative",
            background: Constants.primaryColor,
            boxShadow:
              "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
          }}
          onClick={() => handleToggleSection(index)}
        >
          {React.cloneElement(section.icon, {
            style: { marginRight: "8px", color: "white" },
          })}

          {expandedSection === index ? (
            <span
              className="fw-bold text-white p-2 fs-6"
              style={{ color: "white", marginLeft: "10px" }}
            >
              {section.label}
            </span>
          ) : null}
        </div>
      ))}
    </Box>


</div>

</div>
{/* File Upload Input */}
{showFileInput && (
  <div className="m-3">
    <input type="file" accept=".csv, .xlsx" 
    sx={{
         width: isMobile ? "160px" : "250px", // expanded
            minWidth: isMobile ? "40px" : "50px",
    }}
    />
  </div>
)}

 {/* Hidden file input element */}
 <input
        type="file"
        accept=".csv, .xlsx"
        ref={fileInputRef}
        style={{ display: 'none' }} // Hidden input element
        onChange={(e) => {
          console.log('File selected:', e.target.files[0]);
        }}
      />
</div>


      {expandedSection === 0 && (
        <div className="content-container">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                   <Stack 
      direction={isMobile ? "column" : "row"} 
      spacing={2} // gap
    >
               
                <Button variant="contained" color="primary" 
                 onClick={() => setShowFirmForm(true)}
          
              sx={{
    background: Constants.primaryColor,
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",       // 🚀 keeps "+ Inventory Info" on one line
    width: isMobile ? "100%" : "auto",  // full width on mobile, auto-fit on desktop

    minWidth: "120px",          // ensures button isn’t too small
    "&:hover": {
      background: Constants.primaryColor,
    },
  }}
                >
                  + Inventory Info
                </Button>
                <Button
                   variant="contained"
                   sx={{
                    background:Constants.primaryColor,
                     color: "white",
                    //  fontWeight: "bold",
                     textTransform: "none",
                     padding: "8px 16px",
                     borderRadius: "8px",
                     display: "flex",
                     alignItems: "center",  
                    //  width: isMobile ? "100%" : "160px",
                     whiteSpace: "nowrap",
                     width: isMobile ? "100%" : "auto",
                    //  minWidth: "40px" ,
                     minWidth: "120px",
                   
                     gap: "8px",  
                     "&:hover": {
                       background:Constants.primaryColor,
                     },
                   }}
                   onClick={() => {
                     console.log("Download PDF button clicked");
                     handleDownloadPDFInventory();
                   }}
               
                 >
                   <FaFileDownload size={18} />  
                   Download PDF
                 </Button>
              
              </Stack> 
              
              
             
                <div className='right-buttons'>
                   <TextField
    variant="outlined"
    placeholder="Search Inventory..."
    size="small"
    style={{ width: "250px" }}
    sx={{border:Constants.formInputBorderColor,
      display:isMobile ? "none":"block",
    }}
  />
                </div>
              </div>
              <div className="">
            
              <InventoryTable ref={inventoryRef} inventoryData={inventoryData} handleDelete={handleDelete} />
           </div>
            </>
          ) : (
            <div className="projectinventory-form mt-4 p-3 border rounded" 
            style={{
                overflowY: "auto",
              border: "1px solid #ccc", 
}}
            >

              
              <Grid container spacing={2}>
                
                <Grid item xs={12} sm={6} md={4}>
                <TextField
  label="Project Name"
  fullWidth
  name="projectName"
  value={formValues.projectName}
  onChange={handleFormChange}
  sx={{border:Constants.formInputBorderColor}}
/>
</Grid> 
                
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Wing"
    fullWidth
    name="wing"
    value={formValues.wing}
    onChange={handleFormChange}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

               <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Floor"
    fullWidth
    name="floor"
    value={formValues.floor}
    onChange={handleFormChange}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

                
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="Flat No."
    fullWidth
    name="flatNo"
    value={formValues.flatNo}
    onChange={handleFormChange}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>


              
<Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="RERA Carpet Area (Sq Mtr)"
    fullWidth
    name="reraCarpetAreaSqMtr"
    value={formValues.reraCarpetAreaSqMtr}
    onChange={handleFormChange}
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

               
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="RERA Carpet Area (Sq Ft)"
    fullWidth
    name="reraCarpetAreaSqFt" 
    value={formValues.reraCarpetAreaSqFt} 
    onChange={handleFormChange}
    inputProps={{
      step: "0.01", 
      min: "0.01", 
    }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

                

<Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Total Saleable Area (Sq. Fts)"
    fullWidth
    name="totalSaleableArea" 
    value={formValues.totalSaleableArea} 
    onChange={handleFormChange} 
    inputProps={{
      step: "0.01", 
      min: "0.01", 
    }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

              
              <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Saleable to Carpet Area Ratio (Sq. Fts)"
    fullWidth
    name="saleableToCarpetRatio" 
    value={formValues.saleableToCarpetRatio} 
    onChange={handleFormChange} 
    inputProps={{
      step: "0.01", 
      min: "0.01",
    }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

              
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    select
    label="Type of Units"
    fullWidth
    name="unitType" 
    value={formValues.unitType} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  >
    {unitTypes.map((type, idx) => (
      <MenuItem key={idx} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
</Grid>


                

<Grid item xs={12} sm={6} md={4}>
  <TextField
    select
    label="Configuration"
    fullWidth
    name="configuration" 
    value={formValues.configuration} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  >
    {configurations.map((config, idx) => (
      <MenuItem key={idx} value={config}>
        {config}
      </MenuItem>
    ))}
  </TextField>
</Grid>


               
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    select
    label="Status"
    fullWidth
    name="status" 
    value={formValues.status} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  >
    {statusOptions.map((status, idx) => (
      <MenuItem key={idx} value={status}>
        {status}
      </MenuItem>
    ))}
  </TextField>
</Grid>

                <Grid item xs={12} sm={6} md={4}>
  <TextField
    select
    label="Select Owner"
    fullWidth
    name="owner" 
    value={formValues.owner} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  >
    {owners.map((owner, idx) => (
      <MenuItem key={idx} value={owner}>
        {owner}
      </MenuItem>
    ))}
  </TextField>
</Grid>


           
<Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    name="terraceArea" 
    value={formValues.terraceArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>


               <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Balcony Area/Sitout Carpet Area (Sq Ft)"
    fullWidth
    name="balconyArea" 
    value={formValues.balconyArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

              
               <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Porch Area (Sq Ft)"
    fullWidth
    name="porchArea" 
    value={formValues.porchArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

              
                <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Top Terrace Carpet Area (Sq Ft)"
    fullWidth
    name="topTerraceArea" 
    value={formValues.topTerraceArea}
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

                <Grid item xs={12} sm={6} md={4}>
  <TextField
    type="number"
    label="Super Built-up Area (Sq Ft)"
    fullWidth
    name="superBuiltupArea" 
    value={formValues.superBuiltupArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

                
             <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="OPEN/ENCLOSED BALCONY AS SANCTIONED"
    fullWidth
    name="balconySanctioned" 
    value={formValues.balconySanctioned} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

               <Grid item xs={12} sm={6} md={4}>
  <TextField
    label="PODIUM GARDE"
    fullWidth
    name="podiumGarde" 
    value={formValues.podiumGarde} 
    onChange={handleFormChange} 
     sx={{border:Constants.formInputBorderColor}}
  />
</Grid>

              </Grid>

    
<Button
  variant="contained"
  className="mt-3"
  sx={{backgroundColor:Constants.primaryColor}}
  onClick={() => {
    handleFormSubmit();
    setShowFirmForm(false);
    toast.success("Inventory details are submitted!", { position: "top-right", autoClose: 3000,
      className:"successToast",
      progressClassName: "successToastProgress",
      });
  }}
>
  Submit
</Button>
  </div> 
          )}
        </div>
      )}

    </div>
  );
};

export default ProjectInventory;

