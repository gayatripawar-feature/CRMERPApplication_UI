






// import React, { useState, useRef , useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem } from '@mui/material';
// import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
// import { Inventory } from '@mui/icons-material';
// import InventoryTable from './InventoryTable';

// import { ToastContainer, toast } from "react-toastify";
// import { FaFileDownload } from "react-icons/fa";
// import { jsPDF } from "jspdf";

// import autoTable from "jspdf-autotable";



// const fetchLoansData = async () => {
//   const response = await fetch('/api/getOCRCollection');
//   return response.json();
// };


// const statusOptions = ["Approved", "Unapproved"];
// const owners = ["Landowner", "Developer", "Investor"];
// const configurations = ["1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "3.5 BHK", "4 BHK", "4.5 BHK", "Flat", "Shop"];
// const unitTypes = ["Residential", "Commercial"];


// const sections = [
//   { label: "Display Inventory", icon: <FaEye size={20} /> },
//   { label: "Sample CSV", icon: <FaFileCsv size={20}/> },
//   { label: "Upload Excel", icon: <FaUpload size={20}/> },
// ];

// const ProjectInventory = () => {

//   const inventoryRef = useRef();
//   const [loans, setLoans] = useState([]);
//   const [expandedSection, setExpandedSection] = useState(0);
//   const [showFirmForm, setShowFirmForm] = useState(false);
//   const [partners, setPartners] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);

//   const [showFileInput, setShowFileInput] = useState(false);
//   useEffect(() => {
//     loadLoansData();
//   }, []);

//   const fileInputRef = useRef(null);


//   const loadLoansData = async () => {
//     const data = await fetchLoansData();
//     setLoans(data);
//   };

  

//   const handleToggleSection = (index) => {
//     if (index === 1) {
    
//       downloadSampleCsv();
//     } else if (index === 2) {
    
//       if (fileInputRef.current) {
//         fileInputRef.current.click();
//       }
//     } else {
//       setExpandedSection(index);
//       setShowFileInput(false);
//     }
//   };
  
  
//   const [inventoryData, setInventoryData] = useState([
//     {
     
//     },
//     {
     
//     },
//   ]);

 
//   const handleDelete = (index) => {
//     setInventoryData(inventoryData.filter((_, i) => i !== index));
//   };


  
//   const downloadSampleCsv = () => {
//     const sampleData = `Project Name,Wing,Floor,Flat No,RERA Carpet Area (Sq m),RERA Carpet Area (Sq ft),Total Saleable Area,Saleable Ratio,Unit Type,Configuration,Status,Ownership,Att Terrace Carpet Area,Balcony Area,Porch Area, Top Terrace Carpet Area,Super BuiltUp,Open /Enclosed balcony as sanctioned,Podium Garde\n`;
  
//     const blob = new Blob([sampleData], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
  
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "inventory_template.csv";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   };
  
 
  
  
//   const handleDownloadPDFInventory = () => {
//     if (!inventoryData || inventoryData.length === 0) {
//       console.error("No data available for PDF generation");
//       return;
//     }
  
//     const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
  
//     doc.text("Inventory Report", 14, 15);
  
//     const firstTableColumn = [
//       "TIMESTAMP", "PROJECT NAME", "WING", "FLOOR", "FLAT NO",
//       "RERA CARPET AREA (Sq Mtr)", "RERA CARPET AREA (Sq Ft)", "TOTAL SALEABLE AREA (Sq. Fts)",
//       "SALEABLE RATIO", "UNIT TYPE"
//     ];
  
//     const secondTableColumn = [
//       "CONFIGURATION", "STATUS", "OWNERSHIP", "ATT. TERRACE CARPET AREA", 
//       "BALCONY AREA/SITOUT CARPET AREA", "PORCH AREA", "TOP TERRACE CARPET AREA", 
//       "SUPER BUILTUP AREA", "OPEN/ENCLOSED BALCONY AS SANCTIONED", "PODIUM GRADE"
//     ];
  
    
//     const firstTableRows = inventoryData.map((item) => [
//       item.timestamp, item.projectName, item.wing, item.floor, item.flatNo,
//       item.reraCarpetAreaSqMtr, item.reraCarpetAreaSqFt, item.totalSaleableAreaSqFt,
//       item.saleableRatio, item.unitType
//     ]);
  
//     const secondTableRows = inventoryData.map((item) => [
//       item.configuration, item.status, item.ownership, item.attTerraceCarpetArea,
//       item.balconySitoutCarpetArea, item.porchArea, item.topTerraceCarpetArea,
//       item.superBuiltupArea, item.openEnclosedBalconySanctioned, item.podiumGrade
//     ]);
  
   
//     autoTable(doc, {
//       startY: 25,
//       head: [firstTableColumn],
//       body: firstTableRows,
//       styles: { fontSize: 8, cellPadding: 2 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//       margin: { top: 20, left: 5, right: 5 }
//     });
  
   
//     doc.addPage();
//     doc.text("Inventory Report - Part 2", 14, 15);
  
    
//     autoTable(doc, {
//       startY: 25,
//       head: [secondTableColumn],
//       body: secondTableRows,
//       styles: { fontSize: 8, cellPadding: 2 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//       margin: { top: 20, left: 5, right: 5 }
//     });
  
//     doc.save("Inventory_Report.pdf");
//   };
   
  


//   return (
//     <div className="main-content">
//       <h6>Dashboard / Developer Module / Project Inventory</h6>

     
//       <div className="d-flex align-items-center mb-3">
       


// <div className="d-flex align-items-center mb-3">
 

//   {sections.map((section, index) => (
//     <div 
//       key={index} 
//       style={{ 
//         display: 'flex', 
//         alignItems: 'center', 
//         backgroundColor: '#3621a9', 
//         padding: '8px', 
//         borderRadius: '20px',  
//         margin: '5px',
//         cursor: 'pointer',    
//         transition: "width 0.3s ease, background 0.3s ease",
//         width: expandedSection === index ? "250px" : "50px", 
//         minWidth: "50px",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         fontSize: "14px",
        
       
//         justifyContent: "center",
//         textTransform: "none",
//         position: "relative",
//         background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)", 
//         boxShadow:
//           "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//       }}
//       onClick={() => handleToggleSection(index)} 
//     >
//       {React.cloneElement(section.icon, { style: { marginRight: '8px',color: 'white' } })}  
      
     
//       {expandedSection === index ? (
//         <span className="fw-bold text-white p-2 fs-6" style={{ color: 'white', marginLeft: '10px' }}>{section.label}</span>
//       ) : null}
  
//       <div style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(255, 255, 255, 0.2)",
//         transform: "scale(0.1)",
//         transition: "transform 0.3s ease",
//         zIndex: -1,
//       }}></div>
  
//       <div 
//         style={{
//           "&:hover": {
//             background: "linear-gradient(0deg, rgb(230, 4, 255) 0%, rgb(245, 182, 24) 100%)",
//           },
//           "&:hover div": {
//             transform: "scale(1)",
//           },
//         }}
//       ></div>
  
//     </div>
//   ))}
// </div>


// {showFileInput && (
//   <div className="m-3">
//     <input type="file" accept=".csv, .xlsx" />
//   </div>
// )}


//  <input
//         type="file"
//         accept=".csv, .xlsx"
//         ref={fileInputRef}
//         style={{ display: 'none' }}
//         onChange={(e) => {
//           console.log('File selected:', e.target.files[0]);
//         }}
//       />



//       </div>

     
//       {expandedSection === 0 && (
//         <div className="content-container mt-3">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container">
//                 <div className='d-flex gap-3'>
//                 <Button variant="contained" color="primary" style={{ background: '#272ba8' }} onClick={() => setShowFirmForm(true)}>
//                   + Inventory Info
//                 </Button>
//                 <Button
//                    variant="contained"
//                    sx={{
//                      background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//                      color: "white",
//                      fontWeight: "bold",
//                      textTransform: "none",
//                      padding: "8px 16px",
//                      borderRadius: "8px",
//                      display: "flex",
//                      alignItems: "center",  
//                      gap: "8px",  
//                      "&:hover": {
//                        background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//                      },
//                    }}
//                    onClick={() => {
//                      console.log("Download PDF button clicked");
//                      handleDownloadPDFInventory();
//                    }}
               
//                  >
//                    <FaFileDownload size={18} />  
//                    Download PDF
//                  </Button>
//                 </div>
               
              
                
//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">
             
//               <InventoryTable ref={inventoryRef} inventoryData={inventoryData} handleDelete={handleDelete} />
//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded" 
//             style={{
//               maxHeight: "500px",
//               overflowY: "auto",
//               backgroundColor: "#f8f9fa", 
//               border: "1px solid #ccc", 
//             }}
//             >
              
//               <Grid container spacing={2}>
//                 <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

               
//                 <Grid item xs={4}>
//                   <TextField select label="Type of Units" fullWidth>
//                     {unitTypes.map((type, idx) => (
//                       <MenuItem key={idx} value={type}>{type}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

                
//                 <Grid item xs={4}>
//                   <TextField select label="Configuration" fullWidth>
//                     {configurations.map((config, idx) => (
//                       <MenuItem key={idx} value={config}>{config}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

               
//                 <Grid item xs={4}>
//                   <TextField select label="Status" fullWidth>
//                     {statusOptions.map((status, idx) => (
//                       <MenuItem key={idx} value={status}>{status}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

             
//                 <Grid item xs={4}>
//                   <TextField select label="Select Owner" fullWidth>
//                     {owners.map((owner, idx) => (
//                       <MenuItem key={idx} value={owner}>{owner}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

               
//                 <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="ATT. Terrace Carpet Area (Sq Ft)"
//     fullWidth
//     inputProps={{ step: "0.01", min: "0.01" }}
//   />
// </Grid>

//                 <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
//               </Grid>

             
           
//               {partners.map((_, index) => (
//                 <Grid container spacing={2} key={index}>
//                   <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//                   <Grid item xs={4}>
//                     <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
//                       <FaTrash />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}

             

          

// <Button
//   variant="contained"
//   className="mt-3"
//   color="success"
//   onClick={() => {
//     setShowFirmForm(false);
//     toast.success("Firm details are submitted!", { position: "top-right", autoClose: 3000 });
//   }}
// >
//   Submit
// </Button>


//             </div> 




//           )}
//         </div>
//       )}

// {expandedSection === 1 && (
//         <div className="content-container mt-3">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container ">
//                 <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
//                   + Inventory Info
//                 </Button>

//                 <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
//                   + Download PDF
//                 </Button>

              
//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">
//               <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} InventoryRef={InventoryRef}/>
//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded" 
//             style={{
//               backgroundColor: "#f8f9fa", 
//               border: "1px solid #ccc", 
//             }}
//             >
           
//               <Grid container spacing={2}>
//                 <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

             
//                 <Grid item xs={4}>
//                   <TextField select label="Type of Units" fullWidth>
//                     {unitTypes.map((type, idx) => (
//                       <MenuItem key={idx} value={type}>{type}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

                
//                 <Grid item xs={4}>
//                   <TextField select label="Configuration" fullWidth>
//                     {configurations.map((config, idx) => (
//                       <MenuItem key={idx} value={config}>{config}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

               
//                 <Grid item xs={4}>
//                   <TextField select label="Status" fullWidth>
//                     {statusOptions.map((status, idx) => (
//                       <MenuItem key={idx} value={status}>{status}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

              
//                 <Grid item xs={4}>
//                   <TextField select label="Select Owner" fullWidth>
//                     {owners.map((owner, idx) => (
//                       <MenuItem key={idx} value={owner}>{owner}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

              
//                 <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="ATT. Terrace Carpet Area (Sq Ft)"
//     fullWidth
//     inputProps={{ step: "0.01", min: "0.01" }}
//   />
// </Grid>

//                 <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
//               </Grid>

             
           
//               {partners.map((_, index) => (
//                 <Grid container spacing={2} key={index}>
//                   <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//                   <Grid item xs={4}>
//                     <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
//                       <FaTrash />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}

             

//               <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
//                 Submit
//               </Button>
             

//             </div> 




//           )}
//         </div>
//       )}


// {expandedSection === 2 && (
//         <div className="content-container mt-3">
//           {!showFirmForm ? (
//             <>
//               <div className="button-container">
//                 <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
//                   + Display Inventory
//                 </Button>
               
//                 <div className="right-buttons">
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
//                     Previous
//                   </Button>
//                   <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
//                     Next
//                   </Button>
//                 </div>
//               </div>
//               <div className="mt-3">
//               <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />
//            </div>
//             </>
//           ) : (
//             <div className="firm-form mt-4 p-3 border rounded">
//               {/* <h5></h5> */}
//               <Grid container spacing={2}>
//                 <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

               
//                 <Grid item xs={4}>
//                   <TextField select label="Type of Units" fullWidth>
//                     {unitTypes.map((type, idx) => (
//                       <MenuItem key={idx} value={type}>{type}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

              
//                 <Grid item xs={4}>
//                   <TextField select label="Configuration" fullWidth>
//                     {configurations.map((config, idx) => (
//                       <MenuItem key={idx} value={config}>{config}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <TextField select label="Status" fullWidth>
//                     {statusOptions.map((status, idx) => (
//                       <MenuItem key={idx} value={status}>{status}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

               
//                 <Grid item xs={4}>
//                   <TextField select label="Select Owner" fullWidth>
//                     {owners.map((owner, idx) => (
//                       <MenuItem key={idx} value={owner}>{owner}</MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>

              
//                 <Grid item xs={4}>
//   <TextField
//     type="number"
//     label="ATT. Terrace Carpet Area (Sq Ft)"
//     fullWidth
//     inputProps={{ step: "0.01", min: "0.01" }}
//   />
// </Grid>

//                 <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
//                 inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
//                 <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
//                 /></Grid>
//                 <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
//                 <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
//               </Grid>

          
           
//               {partners.map((_, index) => (
//                 <Grid container spacing={2} key={index}>
//                   <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
//                   <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
//                   <Grid item xs={4}>
//                     <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
//                       <FaTrash />
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}

             

//               <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
//                 Submit
//               </Button>
//             </div> 




//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProjectInventory;


import React, { useState, useRef , useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Grid, MenuItem } from '@mui/material';
import { FaEye, FaFileCsv, FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import { Inventory } from '@mui/icons-material';
import InventoryTable from './InventoryTable';
// import { toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import { FaFileDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";


// API Call Function
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
      // Download Sample CSV
      downloadSampleCsv();
    } else if (index === 2) {
      // Check if file input ref is defined before clicking
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      setExpandedSection(index);
      setShowFileInput(false);
    }
  };
  
  const [inventoryData, setInventoryData] = useState([
    {
      // timestamp: '2025-04-01T10:00:00Z',
      // projectName: 'Project 1',
      // wing: 'A',
      // floor: '3',
      // flatNo: '301',
      // reraCarpetAreaSqMtr: '80',
      // reraCarpetAreaSqFt: '861',
      // totalSaleableArea: '120',
      // saleableToCarpetRatio: '1.5',
      // unitType: '2BHK',
      // configuration: 'Standard',
      // status: 'Available',
      // owner: 'Owner 1',
      // terraceArea: '50',
      // balconyArea: '15',
      // porchArea: '10',
      // topTerraceArea: '30',
      // superBuiltupArea: '150',
      // balconySanctioned: 'Yes',
      // podiumGarde: 'No',
    },
  ]);
  
  

  // ✅ Function to handle deletion of a row
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
  // const handleFormSubmit = () => {
  //   const newEntry = {
  //     id: Date.now(), // unique ID
  //     ...formValues
  //   };
  
  //   setInventoryData(prev => [...prev, newEntry]);
  //   setShowFirmForm(false);
  //   setFormValues({  // reset
  //     projectName: '',
  //     wing: '',
  //     floor: '',
  //     flatNo: '',
  //     reraCarpetAreaSqMtr: '',
  //     reraCarpetAreaSqFt: '',
  //     totalSaleableArea: '',
  //     saleableToCarpetRatio: '',
  //     unitType: '',
  //     configuration: '',
  //     status: '',
  //     owner: '',
  //     terraceArea: '',
  //     balconyArea: '',
  //     porchArea: '',
  //     topTerraceArea: '',
  //     superBuiltupArea: '',
  //     balconySanctioned: '',
  //     podiumGarde: ''
  //   });
  // };
    
  const handleFormSubmit = () => {
    const newItem = {
      projectName: formValues.projectName,
      wing: formValues.wing,
      floor: formValues.floor,
      flatNo: formValues.flatNo,
      reraCarpetAreaSqMtr: formValues.reraCarpetAreaSqMtr,
      reraCarpetAreaSqFt: formValues.reraCarpetAreaSqFt,
      totalSaleableArea: formValues.totalSaleableArea,
      saleableToCarpetRatio: formValues.saleableToCarpetRatio,  // Corrected field name
      unitType: formValues.unitType,
      configuration: formValues.configuration,
      status: formValues.status,
      owner: formValues.owner,  // Corrected field name
      terraceArea: formValues.terraceArea,
      balconyArea: formValues.balconyArea,
      porchArea: formValues.porchArea,
      topTerraceArea: formValues.topTerraceArea,
      superBuiltupArea: formValues.superBuiltupArea,
      balconySanctioned: formValues.balconySanctioned,
      podiumGarde: formValues.podiumGarde,
      timestamp: new Date().toISOString(),
    };
  
    setInventoryData([...inventoryData, newItem]); // Update the inventory data with the new item
    toast.success("Firm details are submitted!", { position: "top-right", autoClose: 3000 });
    setShowFirmForm(false);
  };
  
  
  return (
    <div className="main-content">
      <h6>Dashboard / Developer Module / Project Inventory</h6>

    
      <div className="d-flex align-items-center mb-3">
       


<div className="d-flex align-items-center mb-3">
 

  {sections.map((section, index) => (
    <div 
      key={index} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: '#3621a9', 
        padding: '8px', 
        borderRadius: '20px',  
        margin: '5px',
        cursor: 'pointer',    
        transition: "width 0.3s ease, background 0.3s ease",
        width: expandedSection === index ? "250px" : "50px", 
        minWidth: "50px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "14px",
        
       
        justifyContent: "center",
        textTransform: "none",
        position: "relative",
        background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)", 
        boxShadow:
          "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
      }}
      onClick={() => handleToggleSection(index)} 
    >
      {React.cloneElement(section.icon, { style: { marginRight: '8px',color: 'white' } })}  {/* Add some margin to separate icon from label */}
      
      {/* Conditionally display label based on expandedSection */}
      {expandedSection === index ? (
        <span className="fw-bold text-white p-2 fs-6" style={{ color: 'white', marginLeft: '10px' }}>{section.label}</span>
      ) : null}
  
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

{/* File Upload Input */}
{showFileInput && (
  <div className="m-3">
    <input type="file" accept=".csv, .xlsx" />
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
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                <div className='d-flex gap-3'>
                <Button variant="contained" color="primary" style={{ background: '#272ba8' }} onClick={() => setShowFirmForm(true)}>
                  + Inventory Info
                </Button>
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
                     alignItems: "center",  
                     gap: "8px",  
                     "&:hover": {
                       background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
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
                </div>
               
              
              
                <div className="right-buttons">
                  <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary"  onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              {/* <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} /> */}
              <InventoryTable ref={inventoryRef} inventoryData={inventoryData} handleDelete={handleDelete} />
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded" 
            style={{
              maxHeight: "500px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa", 
              border: "1px solid #ccc", 
            }}
            >
              
              <Grid container spacing={2}>
                
                <Grid item xs={4}>
                <TextField
  label="Project Name"
  fullWidth
  name="projectName"
  value={formValues.projectName}
  onChange={handleFormChange}
/>
</Grid> 
                
                <Grid item xs={4}>
  <TextField
    label="Wing"
    fullWidth
    name="wing"
    value={formValues.wing}
    onChange={handleFormChange}
  />
</Grid>

                <Grid item xs={4}>
  <TextField
    label="Floor"
    fullWidth
    name="floor"
    value={formValues.floor}
    onChange={handleFormChange}
  />
</Grid>

                
                <Grid item xs={4}>
  <TextField
    label="Flat No."
    fullWidth
    name="flatNo"
    value={formValues.flatNo}
    onChange={handleFormChange}
  />
</Grid>


              
<Grid item xs={4}>
  <TextField
    type="number"
    label="RERA Carpet Area (Sq Mtr)"
    fullWidth
    name="reraCarpetAreaSqMtr"
    value={formValues.reraCarpetAreaSqMtr}
    onChange={handleFormChange}
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

               
                <Grid item xs={4}>
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
  />
</Grid>

                

<Grid item xs={4}>
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
  />
</Grid>

              
                <Grid item xs={4}>
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
  />
</Grid>

              
                <Grid item xs={4}>
  <TextField
    select
    label="Type of Units"
    fullWidth
    name="unitType" 
    value={formValues.unitType} 
    onChange={handleFormChange} 
  >
    {unitTypes.map((type, idx) => (
      <MenuItem key={idx} value={type}>
        {type}
      </MenuItem>
    ))}
  </TextField>
</Grid>


                

<Grid item xs={4}>
  <TextField
    select
    label="Configuration"
    fullWidth
    name="configuration" 
    value={formValues.configuration} 
    onChange={handleFormChange} 
  >
    {configurations.map((config, idx) => (
      <MenuItem key={idx} value={config}>
        {config}
      </MenuItem>
    ))}
  </TextField>
</Grid>


               
                <Grid item xs={4}>
  <TextField
    select
    label="Status"
    fullWidth
    name="status" 
    value={formValues.status} 
    onChange={handleFormChange} 
  >
    {statusOptions.map((status, idx) => (
      <MenuItem key={idx} value={status}>
        {status}
      </MenuItem>
    ))}
  </TextField>
</Grid>

                <Grid item xs={4}>
  <TextField
    select
    label="Select Owner"
    fullWidth
    name="owner" 
    value={formValues.owner} 
    onChange={handleFormChange} 
  >
    {owners.map((owner, idx) => (
      <MenuItem key={idx} value={owner}>
        {owner}
      </MenuItem>
    ))}
  </TextField>
</Grid>


           
<Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    name="terraceArea" 
    value={formValues.terraceArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>


                <Grid item xs={4}>
  <TextField
    type="number"
    label="Balcony Area/Sitout Carpet Area (Sq Ft)"
    fullWidth
    name="balconyArea" 
    value={formValues.balconyArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

              
                <Grid item xs={4}>
  <TextField
    type="number"
    label="Porch Area (Sq Ft)"
    fullWidth
    name="porchArea" 
    value={formValues.porchArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

              
                <Grid item xs={4}>
  <TextField
    type="number"
    label="Top Terrace Carpet Area (Sq Ft)"
    fullWidth
    name="topTerraceArea" 
    value={formValues.topTerraceArea}
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                <Grid item xs={4}>
  <TextField
    type="number"
    label="Super Built-up Area (Sq Ft)"
    fullWidth
    name="superBuiltupArea" 
    value={formValues.superBuiltupArea} 
    onChange={handleFormChange} 
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                
                <Grid item xs={4}>
  <TextField
    label="OPEN/ENCLOSED BALCONY AS SANCTIONED"
    fullWidth
    name="balconySanctioned" 
    value={formValues.balconySanctioned} 
    onChange={handleFormChange} 
  />
</Grid>

                <Grid item xs={4}>
  <TextField
    label="PODIUM GARDE"
    fullWidth
    name="podiumGarde" 
    value={formValues.podiumGarde} 
    onChange={handleFormChange} 
  />
</Grid>

              </Grid>

           
           
              {partners.map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              ))}

             

    
<Button
  variant="contained"
  className="mt-3"
  color="success"
  onClick={() => {
    handleFormSubmit();
    setShowFirmForm(false);
    toast.success("Inventory details are submitted!", { position: "top-right", autoClose: 3000 });
  }}
>
  Submit
</Button>




            </div> 




          )}
        </div>
      )}

{expandedSection === 1 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container ">
                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  + Inventory Info
                </Button>

                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  + Download PDF
                </Button>

           
                <div className="right-buttons">
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} InventoryRef={InventoryRef}/>
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded" 
            style={{
              backgroundColor: "#f8f9fa", 
              border: "1px solid #ccc", 
            }}
            >
             
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

             
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

              
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                
                <Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
              </Grid>

           
              {partners.map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              ))}

             

              <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
                Submit
              </Button>
             

            </div> 




          )}
        </div>
      )}


{expandedSection === 2 && (
        <div className="content-container mt-3">
          {!showFirmForm ? (
            <>
              <div className="button-container">
                <Button variant="contained" color="primary" onClick={() => setShowFirmForm(true)}>
                  + Display Inventory
                </Button>
                {/* Pagination Buttons */}
                <div className="right-buttons">
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                    Previous
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                  </Button>
                </div>
              </div>
              <div className="mt-3">
              <InventoryTable inventoryData={inventoryData} handleDelete={handleDelete} />
           </div>
            </>
          ) : (
            <div className="firm-form mt-4 p-3 border rounded">
              {/* <h5></h5> */}
              <Grid container spacing={2}>
                <Grid item xs={4}><TextField label="Project Name" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Wing" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Floor" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="Flat No." fullWidth /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Mtr)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="RERA Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Total Saleable Area (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField  type="number" label="Saleable to Carpet Area Ratio (Sq. Fts)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}/></Grid>

                {/* Type of Units Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Type of Units" fullWidth>
                    {unitTypes.map((type, idx) => (
                      <MenuItem key={idx} value={type}>{type}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Configuration Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Configuration" fullWidth>
                    {configurations.map((config, idx) => (
                      <MenuItem key={idx} value={config}>{config}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Status Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Status" fullWidth>
                    {statusOptions.map((status, idx) => (
                      <MenuItem key={idx} value={status}>{status}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Select Owner Dropdown */}
                <Grid item xs={4}>
                  <TextField select label="Select Owner" fullWidth>
                    {owners.map((owner, idx) => (
                      <MenuItem key={idx} value={owner}>{owner}</MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* <Grid item xs={4}><TextField type="number" label="ATT. Terrace Carpet Area (Sq Ft)" fullWidth /></Grid> */}
                <Grid item xs={4}>
  <TextField
    type="number"
    label="ATT. Terrace Carpet Area (Sq Ft)"
    fullWidth
    inputProps={{ step: "0.01", min: "0.01" }}
  />
</Grid>

                <Grid item xs={4}><TextField type="number" label="Balcony Area/Sitout Carpet Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField type="number" label="Porch Area (Sq Ft)" fullWidth 
                inputProps={{ step: "0.01", min: "0.01" }}/></Grid>
                <Grid item xs={4}><TextField  type="number" label="Top Terrace Carpet Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField type="number" label="Super Built-up Area (Sq Ft)" fullWidth inputProps={{ step: "0.01", min: "0.01" }}
                /></Grid>
                <Grid item xs={4}><TextField label="OPEN/ENCLOSED BALCONY AS SANCTIONED" fullWidth /></Grid>
                <Grid item xs={4}><TextField label="PODIUM GARDE" fullWidth /></Grid>
              </Grid>

              {/* Partner Details */}
           
              {partners.map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}><TextField label="Name" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Age" fullWidth /></Grid>
                  <Grid item xs={4}><TextField label="Occupation" fullWidth /></Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" color="secondary" onClick={() => setPartners(partners.filter((_, i) => i !== index))}>
                      <FaTrash />
                    </Button>
                  </Grid>
                </Grid>
              ))}

             

              <Button variant="contained" className="mt-3" color="success" onClick={() => setShowFirmForm(false)}>
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