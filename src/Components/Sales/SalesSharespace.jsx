

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
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper ,IconButton,Button} from '@mui/material';
import { FaRegClipboard, FaRegShareSquare } from 'react-icons/fa';


const SalesSharespace = () => {
  const [activeIcon, setActiveIcon] = useState('project');
  const [showForm, setShowForm] = useState(false);
  const [showProjectTable, setShowProjectTable] = useState(true); 
  const [rows, setRows] = useState([{}]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null); // Assuming it's from state
  const [isEditing, setIsEditing] = useState(false);
const [expanded, setExpanded] = useState(false); // For collapsing
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
  
  // Handle file change
  const handleFileChange = (e, index) => {
    const newRows = [...rows];
    newRows[index].document = e.target.files[0];
    setRows(newRows);
  };

  // Add new row
  const addRow = () => {
    setRows([...rows, {}]);
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log(rows);
    setShowForm(false);
    setShowProjectTable(true);
    toast.success('Data submitted successfully!');
  };

  // Remove row
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
        ? "linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)"
        : 'transparent',
      boxShadow:
        "inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)",
      transition: "width 0.3s ease, background 0.3s ease",
    }}
  >
    
  <div
  className="d-flex justify-content-center align-items-center rounded-circle p-2 shadow"
  style={{
    background: (activeIcon === 'project' || isCollapsed) ? "#3621a9" : "transparent", 
    padding: '12px', 
  }}
>
     
      <FaRegClipboard size={26} color="#fff" />
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
        backgroundColor: activeIcon === 'shared' ? "#3621a9" : "transparent",  // Icon background when active
        padding: '12px',
      }}
    >
      {/* Icon */}
      <FaRegShareSquare size={26} color="white" /> 
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

<div className="d-flex justify-content-between align-items-center mt-4">
  {activeIcon !== 'shared' && (
    <button
      className="btn"
      onClick={handleOutShare}
      style={{ background: "#3621a9", color: "white", padding: "10px 20px", borderRadius: "5px", border: "none" }}
    >
      Out Share
    </button>
  )}
</div>

      {/* {showForm && activeIcon === 'project' && (
        <div className="mt-4">
          <h4>Add Share Information</h4>
          <form>
            <table className=" table-bordered table-sm">
              <thead>
                <tr >
                  <th className="fw-bold bg-primary text-center fs-5 ">Share To</th>
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
          <button className="btn btn-success me-2 mt-3" onClick={handleSubmit}>Submit</button>
          <button className="btn btn-secondary mt-3" onClick={handleCancel}>Cancel</button>
        </div>
      )} */}

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

    {/* Conditionally render Submit or Update button */}
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
          <TableRow sx={{ background: "#3621a9" }}>
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
                    backgroundColor: "#4CAF50",
                    color: "white",
                    borderRadius: "50%",
                    padding: "5px",
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
        href={row.document || "#"} // If no document, prevent broken link
        target={row.document ? "_blank" : "_self"} // Open in new tab only if there's a document
        rel="noopener noreferrer"
        style={{ pointerEvents: row.document ? "auto" : "none" }} // Disable click if no document
    >
        {/* <FaEye size={20} color={row.document ? "blue" : "gray"} style={{ cursor: "pointer" }} /> */}
        <FaEye size={20} color="blue" style={{ cursor: "pointer" }} />

    </a>
</TableCell>


            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)}


      
      
{activeIcon === 'shared' && (
    <TableContainer component={Paper} className="mt-4">
        <Table size="small" aria-label="shared table">
            {/* Table Head */}
            <TableHead>
                <TableRow sx={{ background: "#3621a9" }}>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Shared From</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Timestamp</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Share To</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Type Of Document</TableCell>
                    <TableCell sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Document</TableCell>
                </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
                {currentRows.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell align="center">{row.sharedFrom}</TableCell>
                        <TableCell align="center">{row.timestamp}</TableCell>
                        <TableCell align="center">{row.shareTo}</TableCell>
                        <TableCell align="center">{row.documentType}</TableCell>

                        {/* Document Column */}
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
    </TableContainer>
)}


      <ToastContainer />
    </div>
  );
};

export default SalesSharespace;
