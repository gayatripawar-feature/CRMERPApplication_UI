

// import React, { useState } from "react";
// import { Button, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton,Tooltip ,Grid} from "@mui/material";
// import { FaEye, FaEdit } from "react-icons/fa";
// import { MenuItem } from '@mui/material'; 
// import { ToastContainer, toast } from "react-toastify";
// import { FaRegAddressCard } from 'react-icons/fa';

// import EditIcon from '@mui/icons-material/Edit';

// const Marketing = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [showForm, setShowForm] = useState(false);
 

//   const [editingIndex, setEditingIndex] = useState(null);
// const [editedData, setEditedData] = useState({
//   timestamp: '',
//   sourceName: '',
//   startDate: '',
//   endDate: '',
//   expense: '',
//   target: '',
//   noOfLeads: '',
//   costPerLead: '',
//   noOfVisit: '',
//   costPerVisit: '',
//   noOfBookings: '',
//   costPerBooking: '',
// });


//   const [selectedRow, setSelectedRow] = useState(null); 
//   const [formValues, setFormValues] = useState({}); 

// const handleEdit = (index) => {
//   const rowToEdit = marketingData[index];
//   setSelectedRow(index); 
//   setFormValues(marketingData[index]); 
  
//   setEditingIndex(index);  
//   setEditedData({
//     timestamp: rowToEdit.timestamp,
//     sourceName: rowToEdit.sourceName,
//     startDate: rowToEdit.startDate,
//     endDate: rowToEdit.endDate,
//     expense: rowToEdit.expense,
//     target: rowToEdit.target,
//     noOfLeads: rowToEdit.noOfLeads,
//     costPerLead: rowToEdit.costPerLead,
//     noOfVisit: rowToEdit.noOfVisit,
//     costPerVisit: rowToEdit.costPerVisit,
//     noOfBookings: rowToEdit.noOfBookings,
//     costPerBooking: rowToEdit.costPerBooking,
//   });
// };


// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormValues((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// const handleSave = () => {
//   const updatedData = [...marketingData];
//   updatedData[selectedRow] = formValues;

//   console.log('Updated Data:', updatedData);
//   setShowForm(false); 
// };


// const handleSubmitEdit = (e) => {
//   e.preventDefault();
//   const updatedMarketingData = [...marketingData];
//   updatedMarketingData[editingIndex] = editedData;  
//   setMarketingData(updatedMarketingData);  
//   setEditingIndex(null); 
// };


//   const [formData, setFormData] = useState({
//     sourceName: '', 
//     startDate: '',
//     endDate: '',
//     expense: '',
//     target: '',
//     marketingDescription: '',
//   });
  
//   const marketingData = [
//     {
//       action: "Edit",
//       timestamp: "2025-03-05 12:00:00",
//       sourceName: "Facebook Ads",
//       startDate: "2025-03-01",
//       endDate: "2025-03-10",
//       expense: "$500",
//       target: "1000 People",
//       noOfLeads: 50,
//       costPerLead: "$10",
//       noOfVisit: 30,
//       costPerVisit: "$16.67",
//       noOfBookings: 5,
//       costPerBooking: "$100",
//     },
//   ];

//   const handleToggle = () => {
//     setIsExpanded(!isExpanded);
//   };

//   const handleCreateMarketingInfo = () => {
//     setShowForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Marketing Info Submitted:", formData);
//     setShowForm(false);
//   };

//   const handleCancel = () => {
//     setShowForm(false);
//   };

  

//   return (
//     <div className="p-4 border rounded-lg shadow-md w-96 bg-white">
//       <h2 className="fs-6 mb-4">Developer Module / Marketing Management</h2>

      
// <div className="d-flex align-items-center mb-3">
//   <Button
//     onClick={handleToggle}
//     variant="outlined"
//     color="success"
//     className="m-3"
//     style={{
//       display: 'flex',
//       alignItems: 'center',
//       backgroundColor: '#3621a9',
//       padding: '8px',
//       borderRadius: '20px',  
//       margin: '5px',
//       cursor: 'pointer',     
//       transition: 'width 0.3s ease, background 0.3s ease',
//       width: isExpanded ? '180px' : '50px',  
//       minWidth: '50px',
//       overflow: 'hidden',
//       whiteSpace: 'nowrap',
//       fontSize: '14px',
//       justifyContent: 'flex-start', 
//       textTransform: 'none',
//       position: 'relative',
//       background: 'linear-gradient(0deg, #4b2ac2 0%, #5c39d3 100%)', 
//       boxShadow:
//         'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
//     }}
//   >
//     {/* Hover effects */}
//     <div
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         background: 'rgba(255, 255, 255, 0.2)',
//         transform: 'scale(0.1)',
//         transition: 'transform 0.3s ease',
//         zIndex: -1,
//       }}
//     ></div>

//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <FaRegAddressCard size={24} color="white" /> 
//       {isExpanded && <span style={{ color: 'white', fontSize: '16px', marginLeft: '8px' }}>Display Marketing</span>} 
//     </div>
//   </Button>
// </div>
//       {!showForm && (
//         <div>
//           <button className=" text-white fw-bold py-2 px-4 rounded border border-info" style={{background:"#272ba8"}} onClick={handleCreateMarketingInfo}>
//             + Create Marketing Info
//           </button>
//         </div>
//       )}

//       {!showForm && (

        
//         <div className="mt-4">
//           <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
//             <Table>
//               <TableHead>
               
//                  <TableRow sx={{background:"#3621a9"}}>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>ACTION</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
//                   <TableCell className="fw-bold"  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SOURCE NAME</TableCell>
//                   <TableCell className="fw-bold"  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>START DATE</TableCell>
//                   <TableCell className="fw-bold"  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>END DATE</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>EXPENSE</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TARGET</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NO. OF LEADS</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>COST PER LEAD</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NO OF VISIT</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>COST PER VISIT</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NO OF BOOKINGS</TableCell>
//                   <TableCell className="fw-bold" sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>COST PER BOOKING</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {marketingData.map((row, index) => (
//                   <TableRow key={index}>
//                      <TableCell>
//                                     <Tooltip title="Edit">
//                                       <IconButton
//                                         size="small"
//                                         sx={{
//                                           backgroundColor: '#1976D2',
//                                           color: 'white',
//                                           borderRadius: '50%',
//                                           '&:hover': { backgroundColor: '#1565C0' },
//                                         }}
//                                         onClick={() => handleEdit(index)} 
//                                       >
//                                         <EditIcon sx={{ fontSize: '18px' }} />
//                                       </IconButton>
//                                     </Tooltip>
//                                   </TableCell>
//                     <TableCell>{row.timestamp}</TableCell>
//                     <TableCell>{row.sourceName}</TableCell>
//                     <TableCell>{row.startDate}</TableCell>
//                     <TableCell>{row.endDate}</TableCell>
//                     <TableCell>{row.expense}</TableCell>
//                     <TableCell>{row.target}</TableCell>
//                     <TableCell>{row.noOfLeads}</TableCell>
//                     <TableCell>{row.costPerLead}</TableCell>
//                     <TableCell>{row.noOfVisit}</TableCell>
//                     <TableCell>{row.costPerVisit}</TableCell>
//                     <TableCell>{row.noOfBookings}</TableCell>
//                     <TableCell>{row.costPerBooking}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
          
//         </div>
//       )}



// {showForm && (
//   <div
//     className="p-4 bg-white"
//     style={{
   
//       borderRadius: "12px",
//       boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
//       maxWidth: "700px",
//       margin: "auto",
//     }}
//   >
//     <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
     
//       <div className="d-flex justify-content-center w-100 mb-3" >
//         <div className="col-8 m-2">
//           <TextField
//             label="Source Name"
//             name="sourceName"
//             value={formData.sourceName}
//             onChange={handleChange}
//             select
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: "#fff", borderRadius: "8px" }}
//             InputLabelProps={{ shrink: true, style: {  width: "100%" } }}
//           >
//             <MenuItem value="Actual Site">Actual Site</MenuItem>
//             <MenuItem value="Hoarding">Hoarding</MenuItem>
//             <MenuItem value="Facebook">Facebook</MenuItem>
//             <MenuItem value="Facebook">Insta</MenuItem>
//             <MenuItem value="Facebook">Website</MenuItem>

//             <MenuItem value="Facebook">Print Media</MenuItem>
//             <MenuItem value="Facebook">Radio</MenuItem>
//             <MenuItem value="Facebook">Google Add</MenuItem>
//             <MenuItem value="Facebook">Exhibition</MenuItem>
//             <MenuItem value="Facebook">Online Portal</MenuItem>
//             <MenuItem value="Facebook">Direct Call</MenuItem>
//             <MenuItem value="Facebook">Pamphlet</MenuItem>
//             <MenuItem value="Facebook">Channel Partner</MenuItem>
//             <MenuItem value="Facebook">Reference</MenuItem>
//             <MenuItem value="Facebook">Other</MenuItem>


//           </TextField>
//         </div>
//       </div>

  
//       <div className="d-flex justify-content-center w-100 mb-3">
//         <div className="col-6 pr-2 m-2">
//           <TextField
//             label="Start Date"
//             name="startDate"
//             type="date"
//             value={formData.startDate}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: "#fff", borderRadius: "8px" }}
//             InputLabelProps={{ shrink: true, style: {  width: "100%" } }}
//           />
//         </div>
//         <div className="col-6 pl-2 m-2">
//           <TextField
//             label="End Date"
//             name="endDate"
//             type="date"
//             value={formData.endDate}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: "#fff", borderRadius: "8px" }}
//             InputLabelProps={{ shrink: true, style: {  width: "100%" } }}
//           /> 
          

//         </div>
//       </div>

      
//       <div className="d-flex justify-content-center w-100 mb-3">
//         <div className="col-6 pr-2 m-2">
//           <TextField
//             label="Expense"
//             name="expense"
//             value={formData.expense}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: "#fff", borderRadius: "8px" }}
//             InputLabelProps={{ shrink: true, style: {  width: "100%" } }}
//           />
//         </div>
//         <div className="col-6 pl-2 m-2">
//           <TextField
//             name="target"
//             value={formData.target}
//             onChange={handleChange}
//             fullWidth
//             variant="outlined"
//             style={{ backgroundColor: "#fff", borderRadius: "8px"}}
//             InputLabelProps={{ shrink: true, style: {  width: "100%" } }}
//             inputProps={{ style: { textAlign: "center" } }}
//             label="Target"
//           />
//         </div>
//       </div>

//       <div className="d-flex justify-content-center w-100 mt-3">
//       <Button
//   variant="contained"
//   color="primary"
//   type="submit"
//   className="mr-2 m-3"
//   onClick={() => toast.success("Form submitted successfully!", {
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "colored",
//   })}
//   style={{
//     backgroundColor: "#007bff",
//     borderRadius: "8px",
//     padding: "10px 20px",
//     transition: "0.3s",
//   }}
// >
//   Submit
// </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           onClick={handleCancel}
//           className="ml-2 m-3"
//           style={{
//             borderColor: "#007bff",
//             color: "#007bff",
//             borderRadius: "8px",
//             padding: "10px 20px",
//             transition: "0.3s",
//           }}
//         >
//           Cancel
//         </Button>
//       </div>
//     </form>
//   </div>
// )}



//     </div>
//   );
// };



// export default Marketing;



import React, { useState } from 'react';
import { Button, IconButton, Tooltip, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaRegAddressCard } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


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
    // Sample data to test the table rendering
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
    // More sample rows can be added here
  ]);

  
  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleCreateMarketingInfo = () => {
    setEditItem(null); // Reset editItem when cr
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


      
  return (
    <div className="p-4 border rounded-lg shadow-md w-96 bg-white">
      <h2 className="fs-6 mb-4">Developer Module / Marketing Management</h2>

      <div className="d-flex align-items-center mb-3">
        <Button
          onClick={handleToggle}
          variant="outlined"
          color="success"
          className="m-3"
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
         
          <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 3, borderRadius: 2 }}>
          <div 
  style={{ 
    maxHeight: "400px", 
    overflowY: "auto", 
    overflowX:"auto",
    scrollbarWidth: "none",  // Firefox: Hide scrollbar
    msOverflowStyle: "none"  // IE/Edge: Hide scrollbar
  }} 
  className="hide-scrollbar"
>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ background: '#3621a9 !important' }}>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    ACTION
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    TIMESTAMP
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    SOURCE NAME
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    START DATE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    END DATE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    EXPENSE
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    TARGET
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    NO. OF LEADS
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    COST PER LEAD
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap',   backgroundColor: "#3621a9 !important", }}>
                    NO OF VISIT
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    COST PER VISIT
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
                    NO OF BOOKINGS
                  </TableCell>
                  <TableCell className="fw-bold" sx={{ color: 'white', fontWeight: 'bold', whiteSpace: 'nowrap' ,   backgroundColor: "#3621a9 !important",}}>
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
                            backgroundColor: '#1976D2',
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
                {/* <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  InputLabelProps={{ shrink: true, style: { width: '100%' } }}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Start Date"
    value={formData.startDate ? dayjs(formData.startDate) : null}
    onChange={(newValue) => {
      setFormData({ ...formData, startDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
    }}
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
                {/* <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  style={{ backgroundColor: '#fff', borderRadius: '8px' }}
                  InputLabelProps={{ shrink: true, style: { width: '100%' } }}
                /> */}
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="End Date"
    value={formData.startDate ? dayjs(formData.startDate) : null}
    onChange={(newValue) => {
      setFormData({ ...formData, startDate: newValue ? newValue.format('YYYY-MM-DD') : '' });
    }}
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
