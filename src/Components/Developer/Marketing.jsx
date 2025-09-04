
import React, { useState } from 'react';
import { Button, IconButton, Tooltip, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TablePagination,TableHead, TableRow, Paper } from '@mui/material';
import { FaRegAddressCard } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Constants from '../Constants';


const MarketingModule = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    sourceName: '',
    startDate: '',
    endDate: '',
    expense: '',
    target: '',
  });
  const [marketingData, setMarketingData] = useState([
   
    {
      timestamp: '2025-04-01 12:00:00',
      sourceName: 'Facebook',
      startDate: '2025-04-01',
      endDate: '2025-04-30',
      expense: '1000',
      target: '5000',
      noOfLeads: '200',
      costPerLead: '5',
      noOfVisit: '150',
      costPerVisit: '6.67',
      noOfBookings: '50',
      costPerBooking: '20',
    },
   
  ]);

  
  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleCreateMarketingInfo = () => {
    setEditItem(null); 
    setFormData({ // Reset formData to its initial state
      sourceName: '',
      startDate: '',
      endDate: '',
      expense: '',
      target: '',
    });
    setShowForm(true);
  };
  const handleCancel = () => setShowForm(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editItem !== null) {
      // Update existing item
      const updatedData = [...marketingData];
      updatedData[editItem] = formData;
      setMarketingData(updatedData);
      toast.success('Marketing info updated successfully!');
    } else {
      // Add new item
      setMarketingData([...marketingData, formData]);
      toast.success('Marketing info created successfully!');
    }
    setShowForm(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEdit = (index) => {
    setEditItem(index); // Set the item to be edited
    setFormData(marketingData[index]); // Prepopulate the form with the selected item's data
    setShowForm(true); // Show the form
  };


  
      
  const handleDownloadPDFMarketing = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("Marketing Details Report", 14, 15);

    const tableColumn = [
        "Timestamp", "Source Name", "Start Date", "End Date",
        "Expense", "Target", "No. of Leads", "Cost per Lead",
        "No. of Visit", "Cost per Visit", "No. of Bookings", "Cost per Booking"
    ];

    const tableRows = marketingData.map(row => [
        row.timestamp || "-",
        row.sourceName || "-",
        row.startDate || "-",
        row.endDate || "-",
        row.expense || "-",
        row.target || "-",
        row.noOfLeads || "-",
        row.costPerLead || "-",
        row.noOfVisit || "-",
        row.costPerVisit || "-",
        row.noOfBookings || "-",
        row.costPerBooking || "-"
    ]);

    console.log("Formatted Table Rows:", tableRows);

    autoTable(doc, {
        startY: 25,
        head: [tableColumn],
        body: tableRows,
        styles: { fontSize: 10, cellPadding: 3 },
        headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });

    doc.save("Marketing_Details_Report.pdf");
};
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);


const handleChangePage = (event, newPage) => {
  setPage(newPage);
};
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};
      
  return (
    <div className="p-4 border rounded-lg shadow-md w-96 bg-white">
      <h2 className="fs-6 mb-4">Developer Module / Marketing Management</h2>

      <div className="d-flex align-items-center mb-3">
        <Button
          onClick={handleToggle}
          variant="outlined"
          color="success"
          className=""
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#3621a9',
            padding: '8px',
            borderRadius: '20px',
            margin: '5px',
            cursor: 'pointer',
            transition: 'width 0.3s ease, background 0.3s ease',
            width: isExpanded ? '180px' : '50px',
            minWidth: '50px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            fontSize: '14px',
            justifyContent: 'flex-start',
            textTransform: 'none',
            position: 'relative',
            background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)',
            boxShadow:
              'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.2)',
              transform: 'scale(0.1)',
              transition: 'transform 0.3s ease',
              zIndex: -1,
            }}
          ></div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaRegAddressCard size={24} color="white" />
            {isExpanded && <span style={{ color: 'white', fontSize: '16px', marginLeft: '8px' }}>Display Marketing</span>}
          </div>
        </Button>
      </div>

      {!showForm && (
        <div className='d-flex gap-3'>
          <button
            className="text-white fw-bold py-2 px-4 rounded border border-info"
            style={{ background: '#272ba8' }}
            onClick={handleCreateMarketingInfo}
          >
            + Create Marketing Info
          </button>
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
    onClick={handleDownloadPDFMarketing}
  >
    <FaFileDownload size={18} />  {/* Added download icon */}
    Download PDF
  </Button>
        
        </div>
      )}

      {!showForm && (
        <div className="mt-4">
          <Paper sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <div 
  style={{ 
    maxHeight: "400px", 
    overflowY: "auto", 
    overflowX:"auto",
    scrollbarWidth: "none",  
    msOverflowStyle: "none"  
  }} 
  className="hide-scrollbar"
>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ background: Constants.primaryColor }}>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    ACTION
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: Constants.primaryColor }}>
                    TIMESTAMP
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',  backgroundColor: Constants.primaryColor }}>
                    SOURCE NAME
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: Constants.primaryColor }}>
                    START DATE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    END DATE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',  backgroundColor: Constants.primaryColor }}>
                    EXPENSE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    TARGET
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: Constants.primaryColor }}>
                    NO. OF LEADS
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    COST PER LEAD
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: Constants.primaryColor }}>
                    NO OF VISIT
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    COST PER VISIT
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: Constants.primaryColor}}>
                    NO OF BOOKINGS
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,  backgroundColor: Constants.primaryColor}}>
                    COST PER BOOKING
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marketingData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            backgroundColor: Constants.primaryColor,
                            color: 'white',
                            borderRadius: '50%',
                            '&:hover': { backgroundColor: '#1565C0' },
                          }}
                          onClick={() => handleEdit(index)}
                        >
                          <EditIcon sx={{ fontSize: '18px' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                    <TableCell>{row.sourceName}</TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>{row.expense}</TableCell>
                    <TableCell>{row.target}</TableCell>
                    <TableCell>{row.noOfLeads}</TableCell>
                    <TableCell>{row.costPerLead}</TableCell>
                    <TableCell>{row.noOfVisit}</TableCell>
                    <TableCell>{row.costPerVisit}</TableCell>
                    <TableCell>{row.noOfBookings}</TableCell>
                    <TableCell>{row.costPerBooking}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            </div>
          </TableContainer>
          <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={marketingData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
          </div>
       
      )}

      {showForm && (
        <div
          className="p-4 bg-white"
          style={{
            borderRadius: '12px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            maxWidth: '700px',
            margin: 'auto',
          }}
        >
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
            <div className="d-flex justify-content-center w-100 mb-3">
              <div className="col-8 m-2">
                <TextField
                  label="Source Name"
                  name="sourceName"
                  value={formData.sourceName}
                  onChange={handleChange}
                  select
                  fullWidth
                  variant="outlined"
                  style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  InputLabelProps={{ shrink: true, style: { width: '100%' } }}
                >
                  <MenuItem value="Actual Site">Actual Site</MenuItem>
                  <MenuItem value="Hoarding">Hoarding</MenuItem>
                  <MenuItem value="Facebook">Facebook</MenuItem>
                  <MenuItem value="Insta">Insta</MenuItem>
                  <MenuItem value="Website">Website</MenuItem>
                  <MenuItem value="Print Media">Print Media</MenuItem>
                  <MenuItem value="Radio">Radio</MenuItem>
                  <MenuItem value="Google Add">Google Add</MenuItem>
                  <MenuItem value="Exhibition">Exhibition</MenuItem>
                  <MenuItem value="Online Portal">Online Portal</MenuItem>
                  <MenuItem value="Direct Call">Direct Call</MenuItem>
                  <MenuItem value="Pamphlet">Pamphlet</MenuItem>
                  <MenuItem value="Channel Partner">Channel Partner</MenuItem>
                  <MenuItem value="Reference">Reference</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </div>
            </div>

            <div className="d-flex justify-content-center w-100 mb-3">
              <div className="col-6 pr-2 m-2">
             
                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Start Date"
    value={formData.startDate ? dayjs(formData.startDate) : null}
    onChange={(newValue) => {
      setFormData({ ...formData, startDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
    }}
     format="DD-MM-YYYY"
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        variant="outlined"
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
</LocalizationProvider> */}
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Start Date"
    value={formData.startDate ? dayjs(formData.startDate, 'DD-MM-YYYY') : null}
    onChange={(newValue) => {
      setFormData({ 
        ...formData, 
        startDate: newValue ? newValue.format('DD-MM-YYYY') : '' 
      });
    }}
    format="DD-MM-YYYY"
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        variant="outlined"
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
</LocalizationProvider>

              </div>
              <div className="col-6 pl-2 m-2">
               
                 {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="End Date"
    value={formData.startDate ? dayjs(formData.startDate) : null}
    onChange={(newValue) => {
      setFormData({ ...formData, startDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
    }}
    format="DD-MM-YYYY"
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        variant="outlined"
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
</LocalizationProvider> */}

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="End Date"
    value={formData.endDate ? dayjs(formData.endDate, 'DD-MM-YYYY') : null} // Use formData.endDate
    onChange={(newValue) => {
      setFormData({ 
        ...formData, 
        endDate: newValue ? newValue.format('DD-MM-YYYY') : '' // Update endDate instead of startDate
      });
    }}
    format="DD-MM-YYYY"
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        variant="outlined"
        style={{ backgroundColor: '#fff', borderRadius: '8px' }}
        InputLabelProps={{ shrink: true }}
      />
    )}
  />
</LocalizationProvider>
              </div>
            </div>

            <div className="d-flex justify-content-center w-100 mb-3">
              <div className="col-6 pr-2 m-2">
                <TextField
                  label="Expense"
                  name="expense"
                  value={formData.expense}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  InputLabelProps={{ shrink: true, style: { width: '100%' } }}
                />
              </div>
              <div className="col-6 pl-2 m-2">
                <TextField
                  name="target"
                  value={formData.target}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  InputLabelProps={{ shrink: true, style: { width: '100%' } }}
                  inputProps={{ style: { textAlign: 'center' } }}
                  label="Target"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center w-100 mt-3">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="mr-2 m-3"
              
                style={{
                  backgroundColor: '#007bff',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  transition: '0.3s',
                }}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                className="ml-2 m-3"
                style={{
                  borderColor: '#007bff',
                  color: '#007bff',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  transition: '0.3s',
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MarketingModule;
