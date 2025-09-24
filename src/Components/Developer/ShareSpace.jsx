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

// import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper,IconButton ,Button,Tooltip,TablePagination,} from '@mui/material';


// import { ToastContainer, toast } from 'react-toastify';
// import Constants from '../Constants';
// const ShareSpace = () => {
//   const [activeIcon, setActiveIcon] = useState('project');
//   const [showForm, setShowForm] = useState(false);
//   const [showProjectTable, setShowProjectTable] = useState(true); 
//   const [rows, setRows] = useState([{}]);

//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState(null); 
// const [editIndex, setEditIndex] = useState(null);

// const [page, setPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(8);


//   const row = {
//     shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'], 
//   };



//   const [selectedItems, setSelectedItems] = React.useState([]);

//   const [sharedWithMeRows, setSharedWithMeRows] = useState([
//     {
      
//     },
//     {
     
//     }
//   ]);
  
  
//   const [currentPage, setCurrentPage] = useState(1);
 

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
//   const handleEdit = (row, index) => {
//   setIsEditing(true);
//   setEditIndex(index); 
//   setRows([row]); 
//   setSelectedItems(row.shareTo ? row.shareTo.split(', ') : []);
// };

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
//     const file = e.target.files[0];
//     if (file) {
//       const documentUrl = URL.createObjectURL(file); 
//       const updatedRows = [...rows];
//       updatedRows[index].document = file;
//       updatedRows[index].documentName = file.name;
//       updatedRows[index].documentUrl = documentUrl; 
//       setRows(updatedRows);
//     }
//   };
  
 
//   const addRow = () => {
//     setRows([...rows, {}]);
//   };

 
  
//   const handleUpdate = () => {
  
//   const updatedRow = {
//     timestamp: new Date().toLocaleString(),
//     shareTo: selectedItems.join(', '),
//     documentType: rows[editIndex]?.documentType || '',
//     document: rows[editIndex]?.document || '',
//     documentName: rows[editIndex]?.documentName || '',
//     documentUrl: rows[editIndex]?.documentUrl || '',
//   };
  
//   setSharedWithMeRows(prev => {
//     const updatedRows = [...prev];
//     updatedRows[editIndex] = updatedRow; 
//     return updatedRows;
//   });

//   toast.success('Data Updated successfully!');
//   setIsEditing(false);
//   setEditIndex(null);
// };



//   const handleSubmit = () => {
//     const timestamp = new Date().toLocaleString();
  
//     const newRows = rows.map((row) => ({
//       ...row,
//       shareTo: selectedItems.join(', '),
//       timestamp,
//     }));
  
//     // ✅ This is what your table listens to
//     setSharedWithMeRows(prev => [...prev, ...newRows]);
  
//     // Optional cleanup
//     setShowProjectTable(true);
//     setRows([{}]); 
//     setSelectedItems([]);
//     // setShowForm(false);
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

// const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

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
//       padding: '6px',
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
//     {activeIcon === 'project' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Shared By Me</span>}
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
//     sx={{ background: Constants.primaryColor, color: "#fff", '&:hover': { background: "#2a1983" } }}
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
//     <>
//     <TableContainer component={Paper} className="mt-4">
//       <Table>
//         <TableHead style={{ backgroundColor: Constants.primaryColor }}>
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
//                     // onClick={() => handleEdit(row)}
//                     onClick={() => handleEdit(row, index)}

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
//                   // onClick={() => console.log('Viewing document:', row.document)}
//                   onClick={() => {
//                     if (row.documentUrl) {
//                       window.open(row.documentUrl, '_blank');
//                     } else {
//                       toast.error("Document not available!");
//                     }
//                   }}
//                 >
//                   <FaEye size={20} />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         component="div"
//         count={currentRows.length}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         sx={{ mt: 1, backgroundColor: "#fff", borderRadius: 1 }}
//       />
//     </TableContainer>
    
//       </>
//   </div>
// )}

// {/* Edit Form */}
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
//           <TableRow sx={{ background: Constants.primaryColor }}> 
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
//               {/* <TableCell>{row.document}</TableCell> */}
//               {/* <TableCell align="center">
//                 <Button
//                   variant="contained"
//                   color="info"
//                   size="small"
//                   onClick={() => console.log("Viewing document:", row.document)}
//                 >
//                   <FaEye size={20} />
//                 </Button>
//               </TableCell>  */}
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
//       <TablePagination
//         component="div"
//         count={currentRows.length}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         rowsPerPageOptions={[5, 10, 25]}
//         sx={{ mt: 1, backgroundColor: "#fff", borderRadius: 1 }}
//       />
//     </TableContainer>
//   </div>
// )}


//     </div>
//   );
// };

// export default ShareSpace;











import React, { useState, useRef } from 'react';
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
import { useMediaQuery, useTheme } from '@mui/material';

import {
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  Paper, IconButton, Button, Tooltip, TablePagination, TextField,
  Dialog, DialogTitle, DialogContent, Box, Typography
} from '@mui/material';

import { ToastContainer, toast } from 'react-toastify';
import Constants from '../Constants';

const ShareSpace = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [activeIcon, setActiveIcon] = useState('project');
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true);
  const [rows, setRows] = useState([{
    shareTo: [],
    documentType: '',
    document: null,
    documentName: '',
    documentUrl: ''
  }]);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [sharedWithMeRows, setSharedWithMeRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false);
  const [viewDocument, setViewDocument] = useState(null);

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

  const handleEdit = (row, index) => {
    setIsEditing(true);
    setEditIndex(index);
    setEditData(row);
    setRows([{
      shareTo: row.shareTo ? row.shareTo.split(', ') : [],
      documentType: row.documentType || '',
      document: row.document || null,
      documentName: row.documentName || '',
      documentUrl: row.documentUrl || ''
    }]);
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

  const handleChange = (event, index) => {
    const { target: { value } } = event;
    const newRows = [...rows];
    newRows[index].shareTo = typeof value === 'string' ? value.split(',') : value;
    setRows(newRows);
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

  const handleRemoveFromTable = (index) => {
    const newRows = [...sharedWithMeRows];
    newRows.splice(index, 1);
    setSharedWithMeRows(newRows);
    setIsEditing(false);
    toast.success('Row removed successfully!');
  };

  const handleUpdate = () => {
    if (!rows[0]?.shareTo?.length || !rows[0]?.documentType || !rows[0]?.document) {
      toast.error('Please fill in all fields before updating');
      return;
    }

    const updatedRow = {
      timestamp: new Date().toLocaleString(),
      shareTo: rows[0].shareTo.join(', '),
      documentType: rows[0]?.documentType || '',
      document: rows[0]?.document || '',
      documentName: rows[0]?.documentName || '',
      documentUrl: rows[0]?.documentUrl || '',
    };

    setSharedWithMeRows(prev => {
      const updatedRows = [...prev];
      updatedRows[editIndex] = updatedRow;
      return updatedRows;
    });

    toast.success('Data updated successfully!');
    setIsEditing(false);
    setEditIndex(null);
    setShowProjectTable(true);
  };

  const handleSubmit = () => {
    const validRows = rows.filter(row =>
      row.shareTo && row.shareTo.length > 0 &&
      row.documentType &&
      row.document
    );

    if (validRows.length === 0) {
      toast.error('Please fill in all fields before submitting');
      return;
    }

    const timestamp = new Date().toLocaleString();
    const newRows = validRows.map(row => ({
      ...row,
      shareTo: row.shareTo.join(', '),
      timestamp,
    }));

    setSharedWithMeRows(prev => [...prev, ...newRows]);
    setShowForm(false);
    setShowProjectTable(true);
    setRows([{
      shareTo: [],
      documentType: '',
      document: null,
      documentName: '',
      documentUrl: ''
    }]);
    toast.success('Data submitted successfully!');
  };

  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleViewDocument = (documentUrl) => {
    if (documentUrl) {
      setViewDocument(documentUrl);
      setDocumentDialogOpen(true);
    } else {
      toast.error("Document not available!");
    }
  };

  const handleDownloadPDFProject = () => {
    if (!sharedWithMeRows || sharedWithMeRows.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Project Share Details Report", 14, 15);

    const tableColumn = [
      "Timestamp", "Share To", "Type of Document", "Document"
    ];

    const tableRows = sharedWithMeRows.map(row => [
      row.timestamp || "-",
      row.shareTo || "-",
      row.documentType || "-",
      row.documentName || "-"
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
    if (!sharedWithMeRows || sharedWithMeRows.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }

    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Shared With Me Report", 14, 15);

    const tableColumn = [
      "Shared From", "Timestamp", "Share To", "Type of Document", "Document"
    ];

    const tableRows = sharedWithMeRows.map(row => [
      row.sharedFrom || "-",
      row.timestamp || "-",
      row.shareTo || "-",
      row.documentType || "-",
      row.documentName || "-"
    ]);

    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Shared_With_Me_Report.pdf");
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modified to search only by "Share To" column
  const filteredData = sharedWithMeRows.filter(data =>
    data.shareTo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      
    {/* <div className="container my-4" > */}
    <div className="container my-4" style={{ minHeight: "100vh" }}>

      <h2 className="fs-6 mb-3">Developer Module / Share Space</h2>
    
      <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-2 gap-md-4 mb-3">
        <div
          className="d-flex align-items-center gap-2 p-2"
          onClick={() => handleToggle('project')}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '20px',
            margin: '5px',
            cursor: 'pointer',
            transition: "width 0.3s ease, background 0.3s ease",
            width: activeIcon === 'project' ? (isMobile ? "160px" : "200px") : "50px",
            minWidth: "50px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: "14px",
            justifyContent: "center",
            textTransform: "none",
            position: "relative",
            background: Constants.primaryColor,
            boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
          }}
        >
          <div className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow">
            <FaProjectDiagram size={isMobile ? 20 : 26} color="#ff5733" />
          </div>
          {activeIcon === 'project' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Shared By Me</span>}
        </div>


        <div
          className="d-flex align-items-center gap-2 p-2"
          onClick={() => handleToggle('shared')}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '20px',
            margin: '5px',
            cursor: 'pointer',
            transition: "width 0.3s ease, background 0.3s ease",
            width: activeIcon === 'shared' ? (isMobile ? "160px" : "200px") : "50px",
                // height: activeIcon === 'shared' ? (isMobile ? "160px" : "200px") : "50px",
            minWidth: "50px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: "14px",
            justifyContent: "center",
            textTransform: "none",
            position: "relative",
            background: Constants.primaryColor,
            boxShadow: "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
          }}
        >
          <div className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow">
            <FaShareAlt size={isMobile ? 20 : 26} color="#28a745" />
          </div>
          {activeIcon === 'shared' && <span className="fw-bold text-white fs-6" style={{ marginLeft: '10px' }}>Shared With Me</span>}
        </div>
      </div>
 
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2 mt-4">
        {activeIcon === "project" && (
          <div className='d-flex flex-column flex-md-row gap-2 w-100 w-md-auto'>
            <Button
              variant="contained"
              onClick={handleOutShare}
              size={isMobile ? "small" : "medium"}
              sx={{
                background: Constants.primaryColor,
                color: "#fff",
                minWidth: isMobile ? '100%' : 'auto'
              }}
            >
              {isMobile ? 'Share' : 'Out Share'}
            </Button>
            <Button
              variant="contained"
              sx={{
                background: Constants.primaryColor,
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minWidth: isMobile ? '100%' : 'auto'
              }}
              onClick={handleDownloadPDFProject}
              size={isMobile ? "small" : "medium"}
            >
              <FaFileDownload size={18} />
              {isMobile ? 'PDF' : 'Download PDF'}
            </Button>
          </div>
        )}

        {activeIcon === "shared" && (
          <Button
            variant="contained"
            sx={{
              background: Constants.primaryColor,
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: isMobile ? '100%' : 'auto'
            }}
            onClick={handleDownloadPDFShared}
            size={isMobile ? "small" : "medium"}
          >
            <FaFileDownload size={18} />
            {isMobile ? 'PDF' : 'Download PDF'}
          </Button>
        )}

        {!showForm && (
          <TextField
            size="small"
            placeholder="Search by Share To..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: isMobile ? '100%' : isTablet ? '70%' : '50%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                "& fieldset": {
                  borderColor: Constants.primaryColor,
                },
                "&:hover fieldset": {
                  borderColor: Constants.primaryColor,
                },
                "&.Mui-focused fieldset": {
                  borderColor: Constants.primaryColor,
                },
              }
            }}
          />
        )}
      </div>

    
      {showForm && activeIcon === 'project' && (
  <div className="mt-4">
    <h4>Add Share Information</h4>
    <div className="table-responsive" style={{ overflowX: 'auto' }}>
      <table className="table table-bordered table-sm" style={{ minWidth: isMobile ? '600px' : '100%' }}>
        <thead>
          <tr>
            <th style={{ 
              backgroundColor: Constants.primaryColor, 
              color: "#ecf0f1",
              minWidth: isMobile ? '150px' : 'auto'
            }} className='fw-bold text-center fs-5'>Share To</th>
            <th style={{ 
              backgroundColor: Constants.primaryColor, 
              color: "#ecf0f1",
              minWidth: isMobile ? '150px' : 'auto'
            }} className='fw-bold text-center fs-5'>Type of Document</th>
            <th style={{ 
              backgroundColor: Constants.primaryColor, 
              color: "#ecf0f1",
              minWidth: isMobile ? '150px' : 'auto'
            }} className='fw-bold text-center fs-5'>Document</th>
            <th style={{ 
              backgroundColor: Constants.primaryColor, 
              color: "#ecf0f1",
              minWidth: isMobile ? '100px' : 'auto'
            }} className='fw-bold text-center fs-5'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                <FormControl sx={{ width: '100%' }} size="small">
                  <InputLabel id={`select-share-to-label-${index}`}>Share To</InputLabel>
                  <Select
                    labelId={`select-share-to-label-${index}`}
                    id={`select-share-to-${index}`}
                    multiple
                    value={row.shareTo || []}
                    onChange={(e) => handleChange(e, index)}
                    input={<OutlinedInput label="Share To" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    size="small"
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        <Checkbox checked={row.shareTo?.includes(option) || false} />
                        <ListItemText primary={option} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </td>
              <td style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                <select
                  className="form-control form-control-sm"
                  value={row.documentType || ''}
                  onChange={(e) => handleDocumentTypeChange(e, index)}
                  style={{ width: '100%' }}
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
                        <option value="Water NOC">Water NOC</option>
                        <option value="Drainage NOC">Drainage NOC</option>
                        <option value="Fire NOC">Fire NOC</option>
                        <option value="Pollution NOC">Pollution NOC</option>
                        <option value="Highway Authority">Highway Authority</option>
                        <option value="EC (IA)">EC (IA)</option>
                        <option value="Aviation NOC">Aviation NOC</option>
                        <option value="NA Order">NA Order</option>
                        <option value="Brouchure">Brouchure</option>
                        <option value="Google Location">Google Location</option>
                        <option value="Demarcation Plan">Demarcation Plan</option>
                        <option value="Sanctioned Plan">Sanctioned Plan</option>
                        <option value="Draft Agreement">Draft Agreement</option>
                        <option value="TAX NOC">TAX NOC</option>
                        <option value="Soil Testing Report">Soil Testing Report</option>
                        <option value="DP Opinion">DP Opinion</option>
                        <option value="Zone Certificate">Zone Certificate</option>
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
                        <option value="Architect Certificate(Qu22artely)">Architect Certificate(Quartely)</option>
                        <option value="Engineer Certificate(Quartely)">Engineer Certificate(Quartely)</option>
                        <option value="CA Certificate(Quartely)">CA Certificate(Quartely)</option>
                </select>
              </td>
              <td style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                <input
                  type="file"
                  className="form-control form-control-sm"
                  onChange={(e) => handleFileChange(e, index)}
                  style={{ width: '100%'}}
                />
              </td>
              <td style={{ minWidth: isMobile ? '100px' : 'auto' }}>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleRemoveRow(index)}
                  style={{ width: '100%' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="d-flex flex-column flex-md-row gap-2 mt-2">
      <button style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }} className="btn" onClick={addRow}>
        Add Row
      </button>
      <button style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }} className="btn" onClick={handleSubmit}>
        Submit
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  </div>
)}

      {showProjectTable && activeIcon === 'project' && !isEditing && (
        <div className='mt-4' ref={project_pdf}>
          <TableContainer component={Paper} className="mt-4" >
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead style={{ backgroundColor: Constants.primaryColor }}>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold', color: 'white', minWidth: isMobile ? 80 : 100 }}>ACTION</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold', color: 'white', minWidth: 120 }}>TIMESTAMP</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold', color: 'white', minWidth: 100 }}>SHARE TO</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold', color: 'white', minWidth: 150 }}>TYPE OF DOCUMENT</TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold', color: 'white', minWidth: isMobile ? 80 : 100 }}>DOCUMENT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
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
                            onClick={() => handleEdit(row, index)}
                          >
                            <FaEdit size={isMobile ? 16 : 18} />
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
                          onClick={() => handleViewDocument(row.documentUrl)}
                        >
                          <FaEye size={isMobile ? 16 : 20} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      No data available. Click "Out Share" to add data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                mt: 1,
                backgroundColor: "#fff",
                borderRadius: 1,
                '& .MuiTablePagination-toolbar': {
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? '10px' : '0',
                }
              }}
            />
          </TableContainer>
        </div>
      )}

      {isEditing && (
        <div className="mt-4">
          <h4>Edit Share Information</h4>
          <div className="table-responsive" style={{ overflowX: 'auto' }}>
            <table className="table table-bordered table-sm" style={{ minWidth: isMobile ? '600px' : '100%' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1",  minWidth: isMobile ? '150px' : 'auto' }} className='fw-bold  text-center fs-5 '>Share To</th>
                  <th style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" ,  minWidth: isMobile ? '150px' : 'auto'}} className='fw-bold  text-center fs-5 '>Type of Document</th>
                  <th style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" ,  minWidth: isMobile ? '150px' : 'auto'}}  className='fw-bold  text-center fs-5 '>Document</th>
                  <th style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1",  minWidth: isMobile ? '150px' : 'auto' }} className='fw-bold  text-center fs-5 '>Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                      <FormControl sx={{ width: '100%' }} size="small">
                        <InputLabel id="select-share-to-label">Share To</InputLabel>
                        <Select
                          labelId="select-share-to-label"
                          id="select-share-to"
                          multiple
                          value={rows[0]?.shareTo || []}
                          onChange={(e) => handleChange(e, 0)}
                          input={<OutlinedInput label="Share To" />}
                          renderValue={(selected) => selected.join(', ')}
                          MenuProps={MenuProps}
                          size="small"
                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              <Checkbox checked={rows[0]?.shareTo?.includes(option) || false} />
                              <ListItemText primary={option} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </td>
                    <td style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                      <select
                        className="form-control form-control-sm"
                        value={row.documentType || ''}
                        onChange={(e) => handleDocumentTypeChange(e, index)}
                          style={{ width: '100%' }}
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
                        <option value="Water NOC">Water NOC</option>
                        <option value="Drainage NOC">Drainage NOC</option>
                        <option value="Fire NOC">Fire NOC</option>
                        <option value="Pollution NOC">Pollution NOC</option>
                        <option value="Highway Authority">Highway Authority</option>
                        <option value="EC (IA)">EC (IA)</option>
                        <option value="Aviation NOC">Aviation NOC</option>
                        <option value="NA Order">NA Order</option>
                        <option value="Brouchure">Brouchure</option>
                        <option value="Google Location">Google Location</option>
                        <option value="Demarcation Plan">Demarcation Plan</option>5556
                        <option value="Sanctioned Plan">Sanctioned Plan</option>
                        <option value="Draft Agreement">Draft Agreement</option>
                        <option value="TAX NOC">TAX NOC</option>
                        <option value="Soil Testing Report">Soil Testing Report</option>
                        <option value="DP Opinion">DP Opinion</option>
                        <option value="Zone Certificate">Zone Certificate</option>
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
                        <option value="Architect Certificate(Quartely)">Architect Certificate(Quartely)</option>
                        <option value="Engineer Certificate(Quartely)">Engineer Certificate(Quartely)</option>
                        <option value="CA Certificate(Quartely)">CA Certificate(Quartely)</option>
                      </select>
                    </td>
                    <td  style={{ minWidth: isMobile ? '150px' : 'auto' }}>
                      <input
                        type="file"
                        className="form-control form-control-sm"
                        onChange={(e) => handleFileChange(e, index)}
                         style={{ width: '100%' }}
                      />
                    </td>
                    <td style={{ minWidth: isMobile ? '100px' : 'auto' }}>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveFromTable(editIndex)}
                         style={{ width: '100%' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-md-row gap-2 mt-2">
            {/* <button className="btn btn-secondary" onClick={addRow}>Add Row</button> */}
            <button style={{ backgroundColor: Constants.primaryColor, color: "#ecf0f1" }} className="btn " onClick={handleUpdate}>Update</button>
            <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

      {activeIcon === 'shared' && (
        <div className="mt-4" ref={shared_with}>
          <TableContainer component={Paper}>
            <Table size={isMobile ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white", minWidth: isMobile ? 100 : 120 }}>SHARED FROM</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white", minWidth: 120 }}>TIMESTAMP</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white", minWidth: 100 }}>SHARE TO</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white", minWidth: 150 }}>TYPE OF DOCUMENT</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold", color: "white", minWidth: isMobile ? 80 : 100 }}>DOCUMENT</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.sharedFrom || "-"}</TableCell>
                      <TableCell>{row.timestamp}</TableCell>
                      <TableCell>{row.shareTo}</TableCell>
                      <TableCell>{row.documentType}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleViewDocument(row.documentUrl)}
                          size="small"
                        >
                          <FaEye size={isMobile ? 16 : 20} color="blue" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      No documents shared with you yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                mt: 1,
                backgroundColor: "#fff",
                borderRadius: 1,
                '& .MuiTablePagination-toolbar': {
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: isMobile ? 'flex-start' : 'center',
                  gap: isMobile ? '10px' : '0',
                }
              }}
            />
          </TableContainer>
        </div>
      )}
 
      <Dialog
        open={documentDialogOpen}
        onClose={() => setDocumentDialogOpen(false)}
        maxWidth="lg"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Document Preview</Typography>
            <Button onClick={() => setDocumentDialogOpen(false)}>Close</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
          {viewDocument && (
            <iframe
              src={viewDocument}
              title="Document Preview"
              width="100%"
              height={isMobile ? "400px" : "600px"}
              frameBorder="0"
            />
          )}
        </DialogContent>
      </Dialog>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    
    </div>
    
   </>
  );
};

export default ShareSpace;