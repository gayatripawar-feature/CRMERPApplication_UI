

import React, { useState } from 'react';
import { FaProjectDiagram, FaShareAlt, FaEdit, FaEye } from 'react-icons/fa';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import { FaArrowRight } from 'react-icons/fa'; 
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,IconButton,Button,TablePagination} from '@mui/material';
import { FaRegClipboard, FaRegShareSquare } from 'react-icons/fa';
import { FaFileDownload } from "react-icons/fa";
import autoTable from "jspdf-autotable";

import { jsPDF } from "jspdf";
import Constants from '../Constants';

const SalesSharespace = () => {
  const [activeIcon, setActiveIcon] = useState('project');
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true); 
  const [rows, setRows] = useState([{}]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
const [expanded, setExpanded] = useState(false); 
const [isExpanded, setIsExpanded] = useState(false);
  const [sharedWithMeRows, setSharedWithMeRows] = useState([
    {
      sharedFrom: "Sales",
      timestamp: "2024-02-24 10:30 AM",
      shareTo: "CRM",
      documentType: "PAN Card",
      document: "pan_card.pdf",
    },
    {
      sharedFrom: "Sales",
      timestamp: "2024-02-23 02:15 PM",
      shareTo: "Sales",
      documentType: "GST Certificate",
      document: "gst_certificate.pdf",
    }
  ]);

  const row = {
    shareTo: ['Sales', 'CRM','Admin','Legal','Engineering','Accounting'],
  };

  const options = [
    'Sales', 'CRM', 'Admin', 'Legal', 'Engineering', 'Accounting',
  ];

  const handleToggle = (iconName) => {
    setActiveIcon(iconName);
  };

  const handleOutShare = () => {
    setShowForm(true);
    setShowProjectTable(false); 
    if (activeIcon === 'shared') {
      setSharedWithMeRows([]); 
    }
    if (activeIcon === 'project') {
      setShowForm(true);
      setShowProjectTable(false);
    }
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
}



  const handleCancel = () => {
    setShowForm(false); 
    setShowProjectTable(true); 
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
    setSelectedItems(typeof value === 'string' ? value.split(',') : value);
    handleShareToChange(event, index);
  };

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

  const handleUpdate = () => {
    
    
    setShowForm(false);     
    setIsEditing(false);    
        
  };
  
 
  const handleEdit = () => {
    setShowForm(true); 
    setIsEditing(true);
    setSelectedRow(row);
  };

  const handleAddShare = () => {
    setIsEditing(false);
    setShowForm(true);
  };
  

  const handleFileChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].document = e.target.files[0];
    setRows(newRows);
  };

 
  const addRow = () => {
    setRows([...rows, {}]);
  };

 
  const handleSubmit = () => {
    console.log(rows);
    setShowForm(false);
    setShowProjectTable(true);
    toast.success('Data submitted successfully!');
  };

  
  const handleRemoveRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  
  const handleCollapseToggle = () => {
    setIsCollapsed(prev => !prev);
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
   const [isCollapsed, setIsCollapsed] = useState(false); 
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sharedWithMeRows.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sharedWithMeRows.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }




  
  const handleDownloadPDFProject = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  
    const tableColumn = ["Timestamp", "Share To", "Type of Document"];
  
    const tableRows = rows.map(row => [
      row.timestamp || "",
      row.shareTo || "",
      row.typeOfDocument || ""
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("Out_Share_displayReport.pdf");
  };
  

    
  const handleDownloadPDFCollect = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Firm Details Report", 14, 15);
  

    const tableColumn = ["Shared From", "Timestamp", "Share To", "Type of Document"];
  
    const tableRows = rows.map(row => [
      row.sharedFrom || "",
      row.timestamp || "",
      row.shareTo || "",
      row.typeOfDocument || ""
    ]);
  
    console.log("Formatted Table Rows:", tableRows);
  
    autoTable(doc, {
      startY: 25,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("Collect_Document_Report.pdf");
  };
  
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
      cursor: 'pointer',
      borderRadius: '20px',
      width: activeIcon === 'project' ? "190px" : "50px", 
      minWidth: "50px",
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '10px 15px',
      marginTop: '20px',
      marginBottom: '28px',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'none',
      position: 'relative',
      background: activeIcon === 'project'
        ? Constants.primaryColor
        : 'transparent',
      boxShadow:
        "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
      transition: "width 0.3s ease, background 0.3s ease",
    }}
  >
    
  <div
  className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
  style={{
    background: (activeIcon === 'project' || isCollapsed) ? Constants.primaryColor : "transparent", 
    padding: '12px', 
  }}
>
     
      <FaRegClipboard size={26} color="black" />
    </div>
    
    {activeIcon === 'project' && <span className='text-white fs-6 fw-bold'>Out Share Display</span>}
  </div>

  
   
  <div
  className="d-flex align-items-center gap-2 p-2"
  onClick={() => handleToggle('shared')}
  style={{
    cursor: 'pointer',
    borderRadius: '20px',
   
    backgroundColor: activeIcon === 'shared' || isCollapsed ? "#3621a9" : "transparent",
    transition: "all 0.3s ease",
  
    padding: '5px 10px',  
    height: '58px', 
  }}
>
 
  <div
    className="d-flex align-items-center gap-2"
    style={{
      backgroundColor: activeIcon === 'shared' ? "#3621a9" : "transparent",  
      borderRadius: '20px',  
      padding: '8px 12px', 
      transition: 'all 0.3s ease', 
      alignItems: 'center',
    }}
  >
    
    <div
      className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
      style={{
        backgroundColor: activeIcon === 'shared' ? "#3621a9" : "transparent",  
        padding: '12px',
      }}
    >
      
      <FaRegShareSquare size={26} color="black" /> 
    </div>

 
    {activeIcon === 'shared' && (
      <span
        style={{
          color: "white", 
          padding: '2px 8px',
          borderRadius: '8px',
        }}
      >
        Collect Docs
      </span>
    )}
  </div>
</div>


</div>

<div className="d-flex justify-content-between align-items-center ">
  {activeIcon !== 'shared' && (
    <div className='d-flex gap-3'>
    <button
      className="btn"
      onClick={handleOutShare}
      style={{ background:Constants.primaryColor, color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
    >
      Out Share
    </button>
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
          "&:hover": {
            background: Constants.primaryColor,
          },
         
        }}
       
        onClick={handleDownloadPDFProject}
      >
        <FaFileDownload size={18} />  
        Download PDF
      </Button>
</div>
  )}
</div>

      

{showForm && activeIcon === 'project' && (
  <div className="mt-4">
    <h4>{isEditing ? "Edit Share Information" : "Add Share Information"}</h4>
    <form>
      <table className="table-bordered table-sm">
        <thead>
          <tr>
            <th className="fw-bold bg-primary text-center fs-5">Share To</th>
            <th className="fw-bold bg-primary text-center fs-5">Type of Document</th>
            <th className="fw-bold bg-primary text-center fs-5">Document</th>
            <th className="fw-bold bg-primary text-center fs-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel id="select-share-to-label">Share To</InputLabel>
                  <Select
                    labelId="select-share-to-label"
                    id="select-share-to"
                    multiple
                    value={selectedItems}
                    onChange={(e) => handleChange(e, index)}
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
                <button className="btn btn-sm btn-danger" onClick={() => handleRemoveRow(index)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>

    <button className="btn btn-secondary me-2 mt-3" onClick={addRow}>Add Row</button>

   
    {isEditing ? (
      <button className="btn btn-warning me-2 mt-3" onClick={handleUpdate}>Update</button>
    ) : (
      <button className="btn btn-success me-2 mt-3" onClick={handleSubmit}>Submit</button>
    )}

    <button className="btn btn-secondary mt-3" onClick={handleCancel}>Cancel</button>
  </div>
)}



{showProjectTable && activeIcon === 'project' && !showForm && ( 
  <div className="mt-4">
    <TableContainer component={Paper}>
      <Table className="" size="small" aria-label="project table">
        <TableHead>
          <TableRow sx={{ background: Constants.primaryColor }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ACTION</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SHARE TO</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TYPE OF DOCUMENT</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>DOCUMENT</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => handleEdit(row)}
                  sx={{
                    // backgroundColor: "#4CAF50",
                    backgroundColor:Constants.primaryColor,
                    color: "white",
                    borderRadius: "50%",
                    padding: "4px",
                    "&:hover": { backgroundColor: "#388E3C" },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell>{row.timestamp}</TableCell>
              <TableCell>{row.shareTo}</TableCell>
              <TableCell>{row.documentType}</TableCell>
             
<TableCell>
    <a
        href={row.document || "#"} 
        target={row.document ? "_blank" : "_self"} 
        rel="noopener noreferrer"
        style={{ pointerEvents: row.document ? "auto" : "none" }} 
    >
        
        <FaEye size={20} color="blue" style={{ cursor: "pointer" }} />

    </a>
</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

    </TableContainer>
  </div>
)}


      
      
{activeIcon === 'shared' && (

<div>
  
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
      "&:hover": {
        background:Constants.primaryColor,
      },
     
    }}
   
    onClick={handleDownloadPDFCollect}
  >
    <FaFileDownload size={18} />  
    Download PDF
  </Button>


    <TableContainer component={Paper} className="mt-4">

        <Table size="small" aria-label="shared table">
          
            <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Shared From</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Timestamp</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Share To</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Type Of Document</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Document</TableCell>
                </TableRow>
            </TableHead>

          
            <TableBody>
                {currentRows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell align="center">{row.sharedFrom}</TableCell>
                        <TableCell align="center">{row.timestamp}</TableCell>
                        <TableCell align="center">{row.shareTo}</TableCell>
                        <TableCell align="center">{row.documentType}</TableCell>

                     
                        <TableCell align="center">
                            <a
                                href={row.document || "#"}
                                target={row.document ? "_blank" : "_self"}
                                rel="noopener noreferrer"
                                style={{ pointerEvents: row.document ? "auto" : "none" }}
                            >
                                <FaEye size={20} color={row.document ? "blue" : "gray"} style={{ cursor: "pointer" }} />
                            </a>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
    </TableContainer>
    </div>
)}


      <ToastContainer />
      </div>
   
    
  );
};

export default SalesSharespace;
