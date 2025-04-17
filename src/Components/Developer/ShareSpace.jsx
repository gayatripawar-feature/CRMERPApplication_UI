




// import React, { useState,useRef } from 'react';
// import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from 'react-icons/fa';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { jsPDF } from "jspdf";
// import autoTable from "jspdf-autotable";
// import { FaFileDownload } from "react-icons/fa";

// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,IconButton ,Button,Tooltip} from '@mui/material';


// import { ToastContainer, toast } from 'react-toastify';
// const ShareSpace = () => {
//   const [activeIcon, setActiveIcon] = useState('project');
//   const [showForm, setShowForm] = useState(false);
//   const [showProjectTable, setShowProjectTable] = useState(true); 
//   const [rows, setRows] = useState([{}]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState(null); 

//   const row = {
//     shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'], 
//   };


  
//   const [selectedItems, setSelectedItems] = React.useState([]);

//   const [sharedWithMeRows, setSharedWithMeRows] = useState([
//     {
//       sharedFrom: "Sales",
//       timestamp: "2024-02-24 10:30 AM",
//       shareTo: "CRM",
//       documentType: "PAN Card",
//       document: "pan_card.pdf",
//     },
//     {
//       sharedFrom: "Sales",
//       timestamp: "2024-02-23 02:15 PM",
//       shareTo: "Sales",
//       documentType: "GST Certificate",
//       document: "gst_certificate.pdf",
//     }
//   ]);
  
 
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleToggle = (iconName) => {
//     setActiveIcon(iconName);

//     if (activeIcon === 'shared') {
//       setShowForm(false);
//     }
//   };

//   const handleOutShare = () => {
//     setShowForm(true); 
//     setShowProjectTable(false); 
    
//     if (activeIcon === 'shared') {
//       setSharedWithMeRows([]); 
//     }
//   };

//   const project_pdf = useRef();
//   const shared_with = useRef();

//   const handleEdit = (row) => {
//     setEditData(row);  
//     setIsEditing(true); 
//   };
  
//   const handleSave = (e) => {
//     e.preventDefault();
//     console.log("Updated Data:", editData);
//     setIsEditing(false); 
//   };
//   const handleCancel = () => {
//     setShowForm(false); 
//     setShowProjectTable(true); 
//     setIsEditing(false);
//   };

  
//   const handleShareToChange = (e, index) => {
//     const newRows = [...rows];
//     if (e.target.checked) {
//       newRows[index].shareTo = [...(newRows[index].shareTo || []), e.target.value];
//     } else {
//       newRows[index].shareTo = newRows[index].shareTo.filter((item) => item !== e.target.value);
//     }
//     setRows(newRows);
//   };

//   const handleChange = (event) => {
//     const { target: { value } } = event;
//     setSelectedItems(typeof value === 'string' ? value.split(',') : value);
//     handleShareToChange(event, index); 
//   };

 
//   const options = [
//     'Sales',
//     'CRM',
//     'Admin',
//     'Legal',
//     'Engineering',
//     'Accounting',
//   ];

//   const handleDocumentTypeChange = (e, index) => {
//     const newRows = [...rows];
//     newRows[index].documentType = e.target.value;
//     setRows(newRows);
//   };


//   const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


 
//   const handleFileChange = (e, index) => {
//     const newRows = [...rows];
//     newRows[index].document = e.target.files[0];
//     setRows(newRows);
//   };

 
//   const addRow = () => {
//     setRows([...rows, {}]);
//   };

 
//   const handleUpdate =() =>{
//     toast.success('Data Updated successfully!');
//     setIsEditing(false);
//   }
//   const handleSubmit = () => {
    
//     console.log(rows);
//     setShowForm(false);
//     setShowProjectTable(true);
//     console.log("data submitted ");
//     toast.success('Data submitted successfully!');
//   };

  
//   const handleRemoveRow = (index) => {
//     const newRows = rows.filter((_, i) => i !== index);
//     setRows(newRows);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

  
//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(Number(e.target.value));
//     setCurrentPage(1); 
//   };

 
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = sharedWithMeRows.slice(indexOfFirstRow, indexOfLastRow);

  
//   const totalPages = Math.ceil(sharedWithMeRows.length / rowsPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }



//   const handleDownloadPDFProject = () => {
//     if (!currentRows || currentRows.length === 0) {
//         console.error("No data available for PDF generation");
//         return;
//     }

//     const doc = new jsPDF("landscape");
//     doc.setFontSize(14);
//     doc.text("Project Share Details Report", 14, 15);

//     const tableColumn = [
//         "Timestamp", "Share To", "Type of Document", "Document"
//     ];

//     const tableRows = currentRows.map(row => [
//         row.timestamp || "-",
//         row.shareTo || "-",
//         row.documentType || "-",
//         row.document || "-"
//     ]);

//     autoTable(doc, {
//         startY: 25,
//         head: [tableColumn],
//         body: tableRows,
//         styles: { fontSize: 10, cellPadding: 3 },
//         headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//     });

//     doc.save("Project_Share_Details_Report.pdf");
// };


// const handleDownloadPDFShared = () => {
//   if (!currentRows || currentRows.length === 0) {
//       console.error("No data available for PDF generation");
//       return;
//   }

//   const doc = new jsPDF("landscape");
//   doc.setFontSize(14);
//   doc.text("Project Share Details Report", 14, 15);

//   const tableColumn = [
//       "Shared From", "Timestamp", "Share To", "Type of Document", "Document"
//   ];

//   const tableRows = currentRows.map(row => [
//       row.sharedFrom || "-",
//       row.timestamp || "-",
//       row.shareTo || "-",
//       row.documentType || "-",
//       row.document || "-"
//   ]);

//   autoTable(doc, {
//       startY: 25,
//       head: [tableColumn],
//       body: tableRows,
//       styles: { fontSize: 10, cellPadding: 3 },
//       headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
//   });

//   doc.save("Project_Share_Details_Report.pdf");
// };

//   return (
//     <div className="container my-4">
//       <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>

    
      
//       <div className="d-flex align-items-center gap-4">
 
//   <div
//     className="d-flex align-items-center gap-2 p-2"
//     onClick={() => handleToggle('project')}
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: '#3621a9',
//       padding: '8px',
//       borderRadius: '20px',
//       margin: '5px',
//       cursor: 'pointer',
//       transition: "width 0.3s ease, background 0.3s ease",
//       width: activeIcon === 'project' ? "200px" : "50px",
//       minWidth: "50px",
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       fontSize: "14px",
//       justifyContent: "center",
//       textTransform: "none",
//       position: "relative",
//       background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
//       boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//     }}
//   >
//     <div className="d-flex justify-content-center align-items-center rounded-circle  p-2 shadow">
//       <FaProjectDiagram size={26} color="#ff5733" />
//     </div>
//     {activeIcon === 'project' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Project Display</span>}
//   </div>

  
//   <div
//     className="d-flex align-items-center gap-2 p-2"
//     onClick={() => handleToggle('shared')}
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: '#3621a9',
//       padding: '8px',
//       borderRadius: '20px',
//       margin: '5px',
//       cursor: 'pointer',
//       transition: "width 0.3s ease, background 0.3s ease",
//       width: activeIcon === 'shared' ? "200px" : "50px",
//       minWidth: "50px",
//       overflow: "hidden",
//       whiteSpace: "nowrap",
//       fontSize: "14px",
//       justifyContent: "center",
//       textTransform: "none",
//       position: "relative",
//       background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
//       boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
//     }}
//   >
//     <div className="d-flex justify-content-center align-items-center rounded-circle  p-2 shadow">
//       <FaShareAlt size={26} color="#28a745" />
//     </div>
//     {activeIcon === 'shared' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Shared With Me</span>}
//   </div>
// </div>


//       <div className="d-flex justify-content-between align-items-center mt-4">
       
  

// {activeIcon === "project" && (
//   <div className='d-flex gap-2'>
//   <Button 
//     variant="contained" 
//     onClick={handleOutShare} 
//     sx={{ background: "#3621a9", color: "#fff", '&:hover': { background: "#2a1983" } }}
//   >
//     Out Share
//   </Button>
//   <Button
//       variant="contained"
//       sx={{
//         background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//         color: "white",
//         fontWeight: "bold",
//         textTransform: "none",
//         padding: "8px 16px",
//         borderRadius: "8px",
//         display: "flex",
//         alignItems: "center",  
//         gap: "8px",  
//         "&:hover": {
//           background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//         },
       
//       }}
      
//       onClick={handleDownloadPDFProject}
//     >
//       <FaFileDownload size={18} />  
//       Download PDF
//     </Button>
// </div>
// )}

// {activeIcon === "shared" && (
//   <Button
//     variant="contained"
//     sx={{
//       background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       padding: "8px 16px",
//       borderRadius: "8px",
//       display: "flex",
//       alignItems: "center", 
//       gap: "8px", 
//       "&:hover": {
//         background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
//       },
//     }}
//     onClick={handleDownloadPDFShared} 
//   >
//     Download PDF
//   </Button>
// )}



       
//         <div className="d-flex align-items-center">
//           <label className="me-2">Rows per page:</label>
//           <input
//             type="number"
//             className="form-control"
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             style={{ width: '80px' }}
//           />

     
     

// <button
//   className="btn btn-secondary ms-2" style ={{backgroundColor:"#800080"}}
//   disabled={currentPage === 1}
//   onClick={() => handlePageChange(currentPage - 1)}
// >
//   Previous
// </button>

// <span className="ms-2">
//   {currentPage} of {totalPages}
// </span>




// <button
//   className="btn btn-secondary ms-2" style ={{backgroundColor:"#800080"}}
//   disabled={currentPage === totalPages}
//   onClick={() => handlePageChange(currentPage + 1)}
// >
//   Next
// </button>
// </div>
// </div>


//       {showForm && activeIcon === 'project' && (
//         <div className="mt-4">
//           <h4>Add Share Information</h4>
//           <form>
            
//             <table className="table table-bordered table-sm">
//               <thead>
//                 <tr>
//                   <th className='fw-bold bg-primary text-center fs-5 '>Share To</th>
//                   <th className='fw-bold bg-primary text-center fs-5 '>Type of Document</th>
//                   <th className='fw-bold bg-primary text-center fs-5 '>Document</th>
//                   <th className='fw-bold bg-primary text-center fs-5 '>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, index) => (
//                   <tr key={index}>
//                     <td>
                
                     
// <div className="d-flex flex-column gap-2">
//       <FormControl sx={{ m: 1, width: 300 }}>
//         <InputLabel id="select-share-to-label">Share To</InputLabel>
//         <Select
//           labelId="select-share-to-label"
//           id="select-share-to"
//           multiple
//           value={selectedItems}
//           onChange={handleChange}
//           input={<OutlinedInput label="Share To" />}
//           renderValue={(selected) => selected.join(', ')}
//           MenuProps={MenuProps}
//         >
//           {options.map((option) => (
//             <MenuItem key={option} value={option}>
//               <Checkbox checked={selectedItems.includes(option)} />
//               <ListItemText primary={option} />
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//                     </td>
//                     <td>
                      
//                       <select
//                         className="form-control"
//                         value={row.documentType || ''}
//                         onChange={(e) => handleDocumentTypeChange(e, index)}
//                       >
//                        <option value="">Select Type</option>
//                           <option value="MCA certificate">MCA certificate</option>
//                           <option value="PAN Card">PAN Card</option>
//                           <option value="Shop Act (Form G)">Shop Act (Form G)</option>
//                           <option value="Shop Act (Form F)">Shop Act (Form F)</option>
//                           <option value="Udhyam Aadhar">Udhyam Aadhar</option>
//                           <option value="TAN Certificate">TAN Certificate</option>
//                           <option value="GST Certifiacte">GST Certifiacte</option>
//                           <option value="RERA Bank Account Details">RERA Bank Account Details</option>
//                           <option value="7/12">7/12</option>
//                           <option value="Paper Notice">Paper Notice</option>
//                           <option value="Sale Deed">Sale Deed</option>
//                           <option value="POA">POA</option>
//                           <option value="Mutation Entry">Mutation Entry</option>
//                           <option value="Development Agreement">Development Agreement</option>
//                           <option value="Power of Attorney">Power of Attorney</option>
//                           <option value="Garden NOC">Garden NOC</option>
//                           <option value="Water NOC<">Water NOC</option>
//                           <option value="Drainage  NOC">Drainage  NOC</option>
//                           <option value="Fire NOC">Fire NOC</option>
//                           <option value="Pollution NOC">Pollution NOC</option>
//                           <option value="Highway Authority">Highway Authority</option>
//                           <option value="EC (IA)">EC (IA)</option>
//                           <option value="Aviation NOC">Aviation NOC</option>
//                           <option value=">NA Order">NA Order</option>
//                           <option value="Brouchure">Brouchure</option>
//                           <option value="Google Location">Google Location</option>
//                           <option value="Demarcation Plan">Demarcation Plan</option>
//                           <option value="Sanctioned Plan">Sanctioned Plan</option>
//                           <option value="Draft Agreement">Draft Agreement</option>
//                           <option value="TAX NOC<">TAX NOC</option>
//                           <option value="Soil Testing Report">Soil Testing Report</option>
//                         <option value="DP Opinion">DP Opinion</option>                         <option value="Zone Certificate">Zone Certificate</option>

//                           <option value="Rain Water Harvesting Certificate">Rain Water Harvesting Certificate</option>
//                          <option value="Solar Installation Certificate">Solar Installation Certificate</option>
//                          <option value="STP Plant Installation Certificate">STP Plant Installation Certificate</option>
//                          <option value="Plinth Level certificate">Plinth Level certificate</option>
//                           <option value="PMC Work Order">PMC Work Order</option>
//                          <option value="Certificate Of Incorporation">Certificate Of Incorporation</option>
//                           <option value="Partnership Deed">Partnership Deed</option>
//                           <option value="Supplementary Deed">Supplementary Deed</option>
//                           <option value="Search and Title Report">Search and Title Report</option>
//                               <option value="Letterhead">Letterhead</option>
//                               <option value="Commencement Certificate">Commencement Certificate</option>
//                               <option value="IOD Issue Copy">IOD Issue Copy</option>
//                              <option value="Google Plot Image">Google Plot Image</option>
//                               <option value="Rent Agreement">Rent Agreement</option>
//                               <option value="Table F">Table F</option>
//                               <option value="Old Legal Documents SD">Old Legal Documents SD</option>
//                               <option value="ITR">ITR</option>
//                               <option value="Sales MIS">Sales MIS</option>
//                               <option value="Cash flow & Schedule">Cash flow & Schedule</option>
//                              <option value="CF Data">CF Data</option>
//                               <option value="SRO Certificate">SRO Certificate</option>
//                               <option value="MOU Attach Annexure">MOU Attach Annexure</option>
//                               <option value="Cost sheet">Cost sheet</option>
//                               <option value="Mail">Mail</option>
//                               <option value="Old to New Certifiacte All">Old to New Certifiacte All</option>
//                               <option value="Architect Certificate(Quartely) ">Architect Certificate(Quartely) </option>
//                               <option value="Engineer Certificate(Quartely) ">Engineer Certificate(Quartely) </option>
//                             <option value="CA Certificate(Quartely) ">CA Certificate(Quartely) </option>
//                       </select>
//                     </td>
//                     <td>
                     
//                       <input
//                         type="file"
//                         className="form-control"
//                         onChange={(e) => handleFileChange(e, index)}
//                       />
//                     </td>
//                     <td>
                 
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleRemoveRow(index)}
//                       >
//                         Remove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </form>

         
//           <button className="btn btn-secondary me-2" onClick={addRow}>Add Row</button>
        
//           <button className="btn btn-success me-2" onClick={handleSubmit}>Submit</button>
       
//           <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

           
        
//         </div>
//       )}

   


// {showProjectTable && activeIcon === 'project' && !isEditing && (
//   <div className='mt-4' ref={project_pdf}>
//     <TableContainer component={Paper} className="mt-4">
//       <Table>
//         <TableHead style={{ backgroundColor: '#3621a9' }}>
//           <TableRow>
//             <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>ACTION</TableCell>
//             <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>TIMESTAMP</TableCell>
//             <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>SHARE TO</TableCell>
//             <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>TYPE OF DOCUMENT</TableCell>
//             <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>DOCUMENT</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {currentRows.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>
//                 <Tooltip title="Edit">
//                   <IconButton 
//                     size="small" 
//                     sx={{ 
//                       backgroundColor: "#1976D2", 
//                       color: "white", 
//                       borderRadius: "50%", 
//                       padding: "6px", 
//                       "&:hover": { backgroundColor: "#1565C0" } 
//                     }} 
//                     onClick={() => handleEdit(row)}
//                   >
//                     <FaEdit size={18} />
//                   </IconButton>
//                 </Tooltip>
//               </TableCell>
//               <TableCell>{row.timestamp}</TableCell>
//               <TableCell>{row.shareTo}</TableCell>
//               <TableCell>{row.documentType}</TableCell>
//               <TableCell>
//                 <IconButton
//                   color="info"
//                   size="small"
//                   onClick={() => console.log('Viewing document:', row.document)}
//                 >
//                   <FaEye size={20} />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </div>
// )}


// {isEditing && (
//   <div className="mt-4">
//   <h4>Add Share Information</h4>
//   <form>
    
//     <table className="table table-bordered table-sm">
//       <thead>
//         <tr>
//           <th className='fw-bold bg-primary text-center fs-5 '>Share To</th>
//           <th className='fw-bold bg-primary text-center fs-5 '>Type of Document</th>
//           <th className='fw-bold bg-primary text-center fs-5 '>Document</th>
//           <th className='fw-bold bg-primary text-center fs-5 '>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {rows.map((row, index) => (
//           <tr key={index}>
//             <td>
        
             
// <div className="d-flex flex-column gap-2">
// <FormControl sx={{ m: 1, width: 300 }}>
// <InputLabel id="select-share-to-label">Share To</InputLabel>
// <Select
//   labelId="select-share-to-label"
//   id="select-share-to"
//   multiple
//   value={selectedItems}
//   onChange={handleChange}
//   input={<OutlinedInput label="Share To" />}
//   renderValue={(selected) => selected.join(', ')}
//   MenuProps={MenuProps}
// >
//   {options.map((option) => (
//     <MenuItem key={option} value={option}>
//       <Checkbox checked={selectedItems.includes(option)} />
//       <ListItemText primary={option} />
//     </MenuItem>
//   ))}
// </Select>
// </FormControl>
// </div>
//             </td>
//             <td>
              
//               <select
//                 className="form-control"
//                 value={row.documentType || ''}
//                 onChange={(e) => handleDocumentTypeChange(e, index)}
//               >
//                <option value="">Select Type</option>
//                   <option value="MCA certificate">MCA certificate</option>
//                   <option value="PAN Card">PAN Card</option>
//                   <option value="Shop Act (Form G)">Shop Act (Form G)</option>
//                   <option value="Shop Act (Form F)">Shop Act (Form F)</option>
//                   <option value="Udhyam Aadhar">Udhyam Aadhar</option>
//                   <option value="TAN Certificate">TAN Certificate</option>
//                   <option value="GST Certifiacte">GST Certifiacte</option>
//                   <option value="RERA Bank Account Details">RERA Bank Account Details</option>
//                   <option value="7/12">7/12</option>
//                   <option value="Paper Notice">Paper Notice</option>
//                   <option value="Sale Deed">Sale Deed</option>
//                   <option value="POA">POA</option>
//                   <option value="Mutation Entry">Mutation Entry</option>
//                   <option value="Development Agreement">Development Agreement</option>
//                   <option value="Power of Attorney">Power of Attorney</option>
//                   <option value="Garden NOC">Garden NOC</option>
//                   <option value="Water NOC<">Water NOC</option>
//                   <option value="Drainage  NOC">Drainage  NOC</option>
//                   <option value="Fire NOC">Fire NOC</option>
//                   <option value="Pollution NOC">Pollution NOC</option>
//                   <option value="Highway Authority">Highway Authority</option>
//                   <option value="EC (IA)">EC (IA)</option>
//                   <option value="Aviation NOC">Aviation NOC</option>
//                   <option value=">NA Order">NA Order</option>
//                   <option value="Brouchure">Brouchure</option>
//                   <option value="Google Location">Google Location</option>
//                   <option value="Demarcation Plan">Demarcation Plan</option>
//                   <option value="Sanctioned Plan">Sanctioned Plan</option>
//                   <option value="Draft Agreement">Draft Agreement</option>
//                   <option value="TAX NOC<">TAX NOC</option>
//                   <option value="Soil Testing Report">Soil Testing Report</option>
//                 <option value="DP Opinion">DP Opinion</option>                         <option value="Zone Certificate">Zone Certificate</option>

//                   <option value="Rain Water Harvesting Certificate">Rain Water Harvesting Certificate</option>
//                  <option value="Solar Installation Certificate">Solar Installation Certificate</option>
//                  <option value="STP Plant Installation Certificate">STP Plant Installation Certificate</option>
//                  <option value="Plinth Level certificate">Plinth Level certificate</option>
//                   <option value="PMC Work Order">PMC Work Order</option>
//                  <option value="Certificate Of Incorporation">Certificate Of Incorporation</option>
//                   <option value="Partnership Deed">Partnership Deed</option>
//                   <option value="Supplementary Deed">Supplementary Deed</option>
//                   <option value="Search and Title Report">Search and Title Report</option>
//                       <option value="Letterhead">Letterhead</option>
//                       <option value="Commencement Certificate">Commencement Certificate</option>
//                       <option value="IOD Issue Copy">IOD Issue Copy</option>
//                      <option value="Google Plot Image">Google Plot Image</option>
//                       <option value="Rent Agreement">Rent Agreement</option>
//                       <option value="Table F">Table F</option>
//                       <option value="Old Legal Documents SD">Old Legal Documents SD</option>
//                       <option value="ITR">ITR</option>
//                       <option value="Sales MIS">Sales MIS</option>
//                       <option value="Cash flow & Schedule">Cash flow & Schedule</option>
//                      <option value="CF Data">CF Data</option>
//                       <option value="SRO Certificate">SRO Certificate</option>
//                       <option value="MOU Attach Annexure">MOU Attach Annexure</option>
//                       <option value="Cost sheet">Cost sheet</option>
//                       <option value="Mail">Mail</option>
//                       <option value="Old to New Certifiacte All">Old to New Certifiacte All</option>
//                       <option value="Architect Certificate(Quartely) ">Architect Certificate(Quartely) </option>
//                       <option value="Engineer Certificate(Quartely) ">Engineer Certificate(Quartely) </option>
//                     <option value="CA Certificate(Quartely) ">CA Certificate(Quartely) </option>
//               </select>
//             </td>
//             <td>
             
//               <input
//                 type="file"
//                 className="form-control"
//                 onChange={(e) => handleFileChange(e, index)}
//               />
//             </td>
//             <td>
         
//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={() => handleRemoveRow(index)}
//               >
//                 Remove
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </form>


//   <button className="btn btn-secondary me-2" onClick={addRow}>Add Row</button>
 
//   <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>

//   <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

   

// </div>
// )}


// {activeIcon === 'shared' && (

//   <div className="mt-4" useRef = {shared_with}>
     

// <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ background: "#3621a9" }}> 
//             <TableCell align="center" sx={{ fontWeight: "bold",color: "white" }}>SHARED FROM</TableCell>
//             <TableCell align="center" sx={{ fontWeight: "bold",  color: "white" }}>TIMESTAMP</TableCell>
//             <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>SHARE TO</TableCell>
//             <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>TYPE OF DOCUMENT</TableCell>
//             <TableCell align="center" sx={{ fontWeight: "bold",  color: "white" }}>DOCUMENT</TableCell>
          
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {currentRows.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row.sharedFrom}</TableCell>
//               <TableCell>{row.timestamp}</TableCell>
//               <TableCell>{row.shareTo}</TableCell>
//               <TableCell>{row.documentType}</TableCell>
             
//                <TableCell align="center">
//   <IconButton
//     onClick={() => window.open(row.document, '_blank')}
//   >
//     <FaEye size={20} color="blue" />
//   </IconButton>
// </TableCell> 
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   </div>
// )}


//     </div>
//   );
// };

// export default ShareSpace;

import React, { useState,useRef } from 'react';
import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from 'react-icons/fa';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFileDownload } from "react-icons/fa";

import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,IconButton ,Button,Tooltip,TablePagination,} from '@mui/material';


import { ToastContainer, toast } from 'react-toastify';
const ShareSpace = () => {
  const [activeIcon, setActiveIcon] = useState('project');
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true); 
  const [rows, setRows] = useState([{}]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null); 
const [editIndex, setEditIndex] = useState(null);

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(8);


  const row = {
    shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'], 
  };



  const [selectedItems, setSelectedItems] = React.useState([]);

  const [sharedWithMeRows, setSharedWithMeRows] = useState([
    {
      // sharedFrom: "Sales",
      // timestamp: "2024-02-24 10:30 AM",
      // shareTo: "CRM",
      // documentType: "PAN Card",
      // document: "pan_card.pdf",
    },
    {
      // sharedFrom: "Sales",
      // timestamp: "2024-02-23 02:15 PM",
      // shareTo: "Sales",
      // documentType: "GST Certificate",
      // document: "gst_certificate.pdf",
    }
  ]);
  
  
  const [currentPage, setCurrentPage] = useState(1);
 

  const handleToggle = (iconName) => {
    setActiveIcon(iconName);

    if (activeIcon === 'shared') {
      setShowForm(false);
    }
  };

  const handleOutShare = () => {
    setShowForm(true); 
    setShowProjectTable(false); 
    
    if (activeIcon === 'shared') {
      setSharedWithMeRows([]); 
    }
  };

  const project_pdf = useRef();
  const shared_with = useRef();

  // const handleEdit = (row) => {
  //   setEditData(row);  
  //   setIsEditing(true); 
  // };
  

  const handleEdit = (row, index) => {
  setIsEditing(true);
  setEditIndex(index); 
  setRows([row]); 
  setSelectedItems(row.shareTo ? row.shareTo.split(', ') : []);
};



  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated Data:", editData);
    setIsEditing(false); 
  };
  const handleCancel = () => {
    setShowForm(false); 
    setShowProjectTable(true); 
    setIsEditing(false);
  };

  
  const handleShareToChange = (e, index) => {
    const newRows = [...rows];
    if (e.target.checked) {
      newRows[index].shareTo = [...(newRows[index].shareTo || []), e.target.value];
    } else {
      newRows[index].shareTo = newRows[index].shareTo.filter((item) => item !== e.target.value);
    }
    setRows(newRows);
  };

  const handleChange = (event) => {
    const { target: { value } } = event;
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
    handleShareToChange(event, index); 
  };

 
  const options = [
    'Sales',
    'CRM',
    'Admin',
    'Legal',
    'Engineering',
    'Accounting',
  ];

  const handleDocumentTypeChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].documentType = e.target.value;
    setRows(newRows);
  };


  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


  
  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const documentUrl = URL.createObjectURL(file); 
      const updatedRows = [...rows];
      updatedRows[index].document = file;
      updatedRows[index].documentName = file.name;
      updatedRows[index].documentUrl = documentUrl; 
      setRows(updatedRows);
    }
  };
  
 
  const addRow = () => {
    setRows([...rows, {}]);
  };

 
  
  const handleUpdate = () => {
  
  const updatedRow = {
    timestamp: new Date().toLocaleString(),
    shareTo: selectedItems.join(', '),
    documentType: rows[editIndex]?.documentType || '',
    document: rows[editIndex]?.document || '',
    documentName: rows[editIndex]?.documentName || '',
    documentUrl: rows[editIndex]?.documentUrl || '',
  };
  
  setSharedWithMeRows(prev => {
    const updatedRows = [...prev];
    updatedRows[editIndex] = updatedRow; 
    return updatedRows;
  });

  toast.success('Data Updated successfully!');
  setIsEditing(false);
  setEditIndex(null);
};



  const handleSubmit = () => {
    const timestamp = new Date().toLocaleString();
  
    const newRows = rows.map((row) => ({
      ...row,
      shareTo: selectedItems.join(', '),
      timestamp,
    }));
  
    // ✅ This is what your table listens to
    setSharedWithMeRows(prev => [...prev, ...newRows]);
  
    // Optional cleanup
    setShowProjectTable(true);
    setRows([{}]); 
    setSelectedItems([]);
    // setShowForm(false);
  };
  
  
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

 
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sharedWithMeRows.slice(indexOfFirstRow, indexOfLastRow);

  
  const totalPages = Math.ceil(sharedWithMeRows.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }



  const handleDownloadPDFProject = () => {
    if (!currentRows || currentRows.length === 0) {
        console.error("No data available for PDF generation");
        return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Project Share Details Report", 14, 15);

    const tableColumn = [
        "Timestamp", "Share To", "Type of Document", "Document"
    ];

    const tableRows = currentRows.map(row => [
        row.timestamp || "-",
        row.shareTo || "-",
        row.documentType || "-",
        row.document || "-"
    ]);

    autoTable(doc, {
        startY: 25,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Project_Share_Details_Report.pdf");
};


const handleDownloadPDFShared = () => {
  if (!currentRows || currentRows.length === 0) {
      console.error("No data available for PDF generation");
      return;
  }

  const doc = new jsPDF("landscape");
  doc.setFontSize(14);
  doc.text("Project Share Details Report", 14, 15);

  const tableColumn = [
      "Shared From", "Timestamp", "Share To", "Type of Document", "Document"
  ];

  const tableRows = currentRows.map(row => [
      row.sharedFrom || "-",
      row.timestamp || "-",
      row.shareTo || "-",
      row.documentType || "-",
      row.document || "-"
  ]);

  autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
  });

  doc.save("Project_Share_Details_Report.pdf");
};

const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container my-4">
      <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>

    
      
      <div className="d-flex align-items-center gap-4">
 
  <div
    className="d-flex align-items-center gap-2 p-2"
    onClick={() => handleToggle('project')}
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#3621a9',
      padding: '8px',
      borderRadius: '20px',
      margin: '5px',
      cursor: 'pointer',
      transition: "width 0.3s ease, background 0.3s ease",
      width: activeIcon === 'project' ? "200px" : "50px",
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      justifyContent: "center",
      textTransform: "none",
      position: "relative",
      background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
      boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    }}
  >
    <div className="d-flex justify-content-center align-items-center rounded-circle  p-2 shadow">
      <FaProjectDiagram size={26} color="#ff5733" />
    </div>
    {activeIcon === 'project' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Project Display</span>}
  </div>

 
  <div
    className="d-flex align-items-center gap-2 p-2"
    onClick={() => handleToggle('shared')}
    style={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#3621a9',
      padding: '8px',
      borderRadius: '20px',
      margin: '5px',
      cursor: 'pointer',
      transition: "width 0.3s ease, background 0.3s ease",
      width: activeIcon === 'shared' ? "200px" : "50px",
      minWidth: "50px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontSize: "14px",
      justifyContent: "center",
      textTransform: "none",
      position: "relative",
      background: "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)",
      boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
    }}
  >
    <div className="d-flex justify-content-center align-items-center rounded-circle  p-2 shadow">
      <FaShareAlt size={26} color="#28a745" />
    </div>
    {activeIcon === 'shared' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Shared With Me</span>}
  </div>
</div>


      <div className="d-flex justify-content-between align-items-center mt-4">
       
  

{activeIcon === "project" && (
  <div className='d-flex gap-2'>
  <Button 
    variant="contained" 
    onClick={handleOutShare} 
    sx={{ background: "#3621a9", color: "#fff", '&:hover': { background: "#2a1983" } }}
  >
    Out Share
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
     
      onClick={handleDownloadPDFProject}
    >
      <FaFileDownload size={18} />
      Download PDF
    </Button>
</div>
)}

{activeIcon === "shared" && (
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
    onClick={handleDownloadPDFShared} 
  >
    Download PDF
  </Button>
)}



     
        <div className="d-flex align-items-center">
          <label className="me-2">Rows per page:</label>
          <input
            type="number"
            className="form-control"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            style={{ width: '80px' }}
          />

     
     

<button
  className="btn btn-secondary ms-2" style ={{backgroundColor:"#800080"}}
  disabled={currentPage === 1}
  onClick={() => handlePageChange(currentPage - 1)}
>
  Previous
</button>

<span className="ms-2">
  {currentPage} of {totalPages}
</span>




<button
  className="btn btn-secondary ms-2" style ={{backgroundColor:"#800080"}}
  disabled={currentPage === totalPages}
  onClick={() => handlePageChange(currentPage + 1)}
>
  Next
</button>
</div>
</div>


      {showForm && activeIcon === 'project' && (
        <div className="mt-4">
          <h4>Add Share Information</h4>  
          <form>
            
            <table className="table table-bordered table-sm">
              <thead>
                <tr>
                  <th className='fw-bold bg-primary text-center fs-5 '>Share To</th>
                  <th className='fw-bold bg-primary text-center fs-5 '>Type of Document</th>
                  <th className='fw-bold bg-primary text-center fs-5 '>Document</th>
                  <th className='fw-bold bg-primary text-center fs-5 '>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>
                
                     
<div className="d-flex flex-column gap-2">
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-share-to-label">Share To</InputLabel>
        <Select
          labelId="select-share-to-label"
          id="select-share-to"
          multiple
          value={selectedItems}
          onChange={handleChange}
          input={<OutlinedInput label="Share To" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedItems.includes(option)} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
                    </td>
                    <td>
                      
                      <select
                        className="form-control"
                        value={row.documentType || ''}
                        onChange={(e) => handleDocumentTypeChange(e, index)}
                      >
                       <option value="">Select Type</option>
                          <option value="MCA certificate">MCA certificate</option>
                          <option value="PAN Card">PAN Card</option>
                          <option value="Shop Act (Form G)">Shop Act (Form G)</option>
                          <option value="Shop Act (Form F)">Shop Act (Form F)</option>
                          <option value="Udhyam Aadhar">Udhyam Aadhar</option>
                          <option value="TAN Certificate">TAN Certificate</option>
                          <option value="GST Certifiacte">GST Certifiacte</option>
                          <option value="RERA Bank Account Details">RERA Bank Account Details</option>
                          <option value="7/12">7/12</option>
                          <option value="Paper Notice">Paper Notice</option>
                          <option value="Sale Deed">Sale Deed</option>
                          <option value="POA">POA</option>
                          <option value="Mutation Entry">Mutation Entry</option>
                          <option value="Development Agreement">Development Agreement</option>
                          <option value="Power of Attorney">Power of Attorney</option>
                          <option value="Garden NOC">Garden NOC</option>
                          <option value="Water NOC<">Water NOC</option>
                          <option value="Drainage  NOC">Drainage  NOC</option>
                          <option value="Fire NOC">Fire NOC</option>
                          <option value="Pollution NOC">Pollution NOC</option>
                          <option value="Highway Authority">Highway Authority</option>
                          <option value="EC (IA)">EC (IA)</option>
                          <option value="Aviation NOC">Aviation NOC</option>
                          <option value=">NA Order">NA Order</option>
                          <option value="Brouchure">Brouchure</option>
                          <option value="Google Location">Google Location</option>
                          <option value="Demarcation Plan">Demarcation Plan</option>
                          <option value="Sanctioned Plan">Sanctioned Plan</option>
                          <option value="Draft Agreement">Draft Agreement</option>
                          <option value="TAX NOC<">TAX NOC</option>
                          <option value="Soil Testing Report">Soil Testing Report</option>
                        <option value="DP Opinion">DP Opinion</option>                         <option value="Zone Certificate">Zone Certificate</option>

                          <option value="Rain Water Harvesting Certificate">Rain Water Harvesting Certificate</option>
                         <option value="Solar Installation Certificate">Solar Installation Certificate</option>
                         <option value="STP Plant Installation Certificate">STP Plant Installation Certificate</option>
                         <option value="Plinth Level certificate">Plinth Level certificate</option>
                          <option value="PMC Work Order">PMC Work Order</option>
                         <option value="Certificate Of Incorporation">Certificate Of Incorporation</option>
                          <option value="Partnership Deed">Partnership Deed</option>
                          <option value="Supplementary Deed">Supplementary Deed</option>
                          <option value="Search and Title Report">Search and Title Report</option>
                              <option value="Letterhead">Letterhead</option>
                              <option value="Commencement Certificate">Commencement Certificate</option>
                              <option value="IOD Issue Copy">IOD Issue Copy</option>
                             <option value="Google Plot Image">Google Plot Image</option>
                              <option value="Rent Agreement">Rent Agreement</option>
                              <option value="Table F">Table F</option>
                              <option value="Old Legal Documents SD">Old Legal Documents SD</option>
                              <option value="ITR">ITR</option>
                              <option value="Sales MIS">Sales MIS</option>
                              <option value="Cash flow & Schedule">Cash flow & Schedule</option>
                             <option value="CF Data">CF Data</option>
                              <option value="SRO Certificate">SRO Certificate</option>
                              <option value="MOU Attach Annexure">MOU Attach Annexure</option>
                              <option value="Cost sheet">Cost sheet</option>
                              <option value="Mail">Mail</option>
                              <option value="Old to New Certifiacte All">Old to New Certifiacte All</option>
                              <option value="Architect Certificate(Quartely) ">Architect Certificate(Quartely) </option>
                              <option value="Engineer Certificate(Quartely) ">Engineer Certificate(Quartely) </option>
                            <option value="CA Certificate(Quartely) ">CA Certificate(Quartely) </option>
                      </select>
                    </td>
                    <td>
                     
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </td>
                    <td>
                 
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>

         
          <button className="btn btn-secondary me-2" onClick={addRow}>Add Row</button>
       
          <button className="btn btn-success me-2" onClick={handleSubmit}>Submit</button>
       
          <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

           
        
        </div>
      )}

   


{showProjectTable && activeIcon === 'project' && !isEditing && (
  <div className='mt-4' ref={project_pdf}>
    <>
    <TableContainer component={Paper} className="mt-4">
      <Table>
        <TableHead style={{ backgroundColor: '#3621a9' }}>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>ACTION</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>TIMESTAMP</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>SHARE TO</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>TYPE OF DOCUMENT</TableCell>
            <TableCell align="center" style={{ fontWeight: 'bold', color: 'white' }}>DOCUMENT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton 
                    size="small" 
                    sx={{ 
                      backgroundColor: "#1976D2", 
                      color: "white", 
                      borderRadius: "50%", 
                      padding: "6px", 
                      "&:hover": { backgroundColor: "#1565C0" } 
                    }} 
                    // onClick={() => handleEdit(row)}
                    onClick={() => handleEdit(row, index)}

                  >
                    <FaEdit size={18} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.shareTo}</TableCell>
              <TableCell>{row.documentType}</TableCell>
              <TableCell>
                <IconButton
                  color="info"
                  size="small"
                  // onClick={() => console.log('Viewing document:', row.document)}
                  onClick={() => {
                    if (row.documentUrl) {
                      window.open(row.documentUrl, '_blank');
                    } else {
                      toast.error("Document not available!");
                    }
                  }}
                >
                  <FaEye size={20} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={currentRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 1, backgroundColor: "#fff", borderRadius: 1 }}
      />
    </TableContainer>
    
      </>
  </div>
)}

{/* Edit Form */}
{isEditing && (
  <div className="mt-4">
  <h4>Add Share Information</h4>
  <form>
    
    <table className="table table-bordered table-sm">
      <thead>
        <tr>
          <th className='fw-bold bg-primary text-center fs-5 '>Share To</th>
          <th className='fw-bold bg-primary text-center fs-5 '>Type of Document</th>
          <th className='fw-bold bg-primary text-center fs-5 '>Document</th>
          <th className='fw-bold bg-primary text-center fs-5 '>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td>
        
             
<div className="d-flex flex-column gap-2">
<FormControl sx={{ m: 1, width: 300 }}>
<InputLabel id="select-share-to-label">Share To</InputLabel>
<Select
  labelId="select-share-to-label"
  id="select-share-to"
  multiple
  value={selectedItems}
  onChange={handleChange}
  input={<OutlinedInput label="Share To" />}
  renderValue={(selected) => selected.join(', ')}
  MenuProps={MenuProps}
>
  {options.map((option) => (
    <MenuItem key={option} value={option}>
      <Checkbox checked={selectedItems.includes(option)} />
      <ListItemText primary={option} />
    </MenuItem>
  ))}
</Select>
</FormControl>
</div>
            </td>
            <td>
              
              <select
                className="form-control"
                value={row.documentType || ''}
                onChange={(e) => handleDocumentTypeChange(e, index)}
              >
               <option value="">Select Type</option>
                  <option value="MCA certificate">MCA certificate</option>
                  <option value="PAN Card">PAN Card</option>
                  <option value="Shop Act (Form G)">Shop Act (Form G)</option>
                  <option value="Shop Act (Form F)">Shop Act (Form F)</option>
                  <option value="Udhyam Aadhar">Udhyam Aadhar</option>
                  <option value="TAN Certificate">TAN Certificate</option>
                  <option value="GST Certifiacte">GST Certifiacte</option>
                  <option value="RERA Bank Account Details">RERA Bank Account Details</option>
                  <option value="7/12">7/12</option>
                  <option value="Paper Notice">Paper Notice</option>
                  <option value="Sale Deed">Sale Deed</option>
                  <option value="POA">POA</option>
                  <option value="Mutation Entry">Mutation Entry</option>
                  <option value="Development Agreement">Development Agreement</option>
                  <option value="Power of Attorney">Power of Attorney</option>
                  <option value="Garden NOC">Garden NOC</option>
                  <option value="Water NOC<">Water NOC</option>
                  <option value="Drainage  NOC">Drainage  NOC</option>
                  <option value="Fire NOC">Fire NOC</option>
                  <option value="Pollution NOC">Pollution NOC</option>
                  <option value="Highway Authority">Highway Authority</option>
                  <option value="EC (IA)">EC (IA)</option>
                  <option value="Aviation NOC">Aviation NOC</option>
                  <option value=">NA Order">NA Order</option>
                  <option value="Brouchure">Brouchure</option>
                  <option value="Google Location">Google Location</option>
                  <option value="Demarcation Plan">Demarcation Plan</option>
                  <option value="Sanctioned Plan">Sanctioned Plan</option>
                  <option value="Draft Agreement">Draft Agreement</option>
                  <option value="TAX NOC<">TAX NOC</option>
                  <option value="Soil Testing Report">Soil Testing Report</option>
                <option value="DP Opinion">DP Opinion</option>                         <option value="Zone Certificate">Zone Certificate</option>

                  <option value="Rain Water Harvesting Certificate">Rain Water Harvesting Certificate</option>
                 <option value="Solar Installation Certificate">Solar Installation Certificate</option>
                 <option value="STP Plant Installation Certificate">STP Plant Installation Certificate</option>
                 <option value="Plinth Level certificate">Plinth Level certificate</option>
                  <option value="PMC Work Order">PMC Work Order</option>
                 <option value="Certificate Of Incorporation">Certificate Of Incorporation</option>
                  <option value="Partnership Deed">Partnership Deed</option>
                  <option value="Supplementary Deed">Supplementary Deed</option>
                  <option value="Search and Title Report">Search and Title Report</option>
                      <option value="Letterhead">Letterhead</option>
                      <option value="Commencement Certificate">Commencement Certificate</option>
                      <option value="IOD Issue Copy">IOD Issue Copy</option>
                     <option value="Google Plot Image">Google Plot Image</option>
                      <option value="Rent Agreement">Rent Agreement</option>
                      <option value="Table F">Table F</option>
                      <option value="Old Legal Documents SD">Old Legal Documents SD</option>
                      <option value="ITR">ITR</option>
                      <option value="Sales MIS">Sales MIS</option>
                      <option value="Cash flow & Schedule">Cash flow & Schedule</option>
                     <option value="CF Data">CF Data</option>
                      <option value="SRO Certificate">SRO Certificate</option>
                      <option value="MOU Attach Annexure">MOU Attach Annexure</option>
                      <option value="Cost sheet">Cost sheet</option>
                      <option value="Mail">Mail</option>
                      <option value="Old to New Certifiacte All">Old to New Certifiacte All</option>
                      <option value="Architect Certificate(Quartely) ">Architect Certificate(Quartely) </option>
                      <option value="Engineer Certificate(Quartely) ">Engineer Certificate(Quartely) </option>
                    <option value="CA Certificate(Quartely) ">CA Certificate(Quartely) </option>
              </select>
            </td>
            <td>
             
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleFileChange(e, index)}
              />
            </td>
            <td>
         
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleRemoveRow(index)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </form>


  <button className="btn btn-secondary me-2" onClick={addRow}>Add Row</button>
 
  <button className="btn btn-success me-2" onClick={handleUpdate}>Update</button>

  <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>

   

</div>
)}


{activeIcon === 'shared' && (

  <div className="mt-4" useRef = {shared_with}>
      {/* <Button
            variant="contained"
            color="primary"
            startIcon={<FaFileDownload />}
            onClick={handleDownloadPDFShared}
            sx={{ marginBottom: 2 }}
          >
            Download PDF
          </Button> */}

<TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#3621a9" }}> 
            <TableCell align="center" sx={{ fontWeight: "bold",color: "white" }}>SHARED FROM</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold",  color: "white" }}>TIMESTAMP</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>SHARE TO</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>TYPE OF DOCUMENT</TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold",  color: "white" }}>DOCUMENT</TableCell>
      
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.sharedFrom}</TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.shareTo}</TableCell>
              <TableCell>{row.documentType}</TableCell>
              {/* <TableCell>{row.document}</TableCell> */}
              {/* <TableCell align="center">
                <Button
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => console.log("Viewing document:", row.document)}
                >
                  <FaEye size={20} />
                </Button>
              </TableCell>  */}
               <TableCell align="center">
  <IconButton
    onClick={() => window.open(row.document, '_blank')}
  >
    <FaEye size={20} color="blue" />
  </IconButton>
</TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={currentRows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ mt: 1, backgroundColor: "#fff", borderRadius: 1 }}
      />
    </TableContainer>
  </div>
)}


    </div>
  );
};

export default ShareSpace;