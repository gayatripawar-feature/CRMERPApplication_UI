import React, { useState ,useMemo} from "react";
import {
    Button,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    TablePagination
  } from "@mui/material";
  import { FaEye } from "react-icons/fa";
  import { FaFileDownload } from "react-icons/fa";
  import { jsPDF } from "jspdf";
  
  import autoTable from "jspdf-autotable";

  // import { AgGridReact } from 'ag-grid-react';
  import { AgGridReact } from '@ag-grid-community/react';  
  import { ModuleRegistry } from '@ag-grid-community/core';
  import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
  import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

  
  
const Salesmis = (Data) => {
      const [isExpanded, setIsExpanded] = useState(false);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedWing, setSelectedWing] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
   
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(8);
   
    ModuleRegistry.registerModules([ClientSideRowModelModule]);
    const projects = [
        "Shubh Arambh", "Shubh Elara", "Infini", "Serenity", 
        "Prime", "PYB", "Onella Tower", "Aradhyam", "Stella"
      ];
    const wings = ["Wing 1", "Wing 2", "Wing 3", "Wing 4"];
  
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
      };

      const handleDownloadPDF = () => {
        const link = document.createElement("a");
        link.href = "/path/to/demand_letter.pdf"; 
        link.download = "Demand_Letter.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };



     
      const columns = [
        { label: "TIMESTAMP", key: "timestamp" },
        { label: "PROJECT NAME", key: "project" },
        { label: "WING", key: "wing" },
        { label: "FLOOR", key: "floor" },
        { label: "FLAT NO.", key: "flatNo" },
        { label: "RERA CARPET AREA (SQ MTR)", key: "reraCarpetAreaMtr" },
        { label: "RERA CARPET AREA (SQ FT)", key: "reraCarpetAreaFt" },
        { label: "TOTAL SALEABLE AREA (SQ. FTS)", key: "totalSaleableArea" },
        { label: "SALEABLE TO CARPET AREA RATIO (SQ. FTS)", key: "saleableToCarpetAreaRatio" },
        { label: "TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)", key: "type" },
        { label: "CONFIG (2 BHK, 3 BHK, 4 BHK)", key: "config" },
        { label: "APPROVED / UNAPPROVED", key: "status" },
        { label: "LANDOWNER / DEVELOPER", key: "owner" },
        { label: "SOLD/UNSOLD", key: "soldStatus" },
        { label: "NAME OF THE BUYER", key: "buyerName" },
        { label: "DATE OF BOOKING", key: "bookingDate" },
        { label: "AGREEMENT VALUE", key: "agreementValue" },
        { label: "AMOUNT RECEIVED", key: "amountReceived" },
        { label: "BALANCE", key: "balance" },
        { label: "% COLLECTIONS", key: "percentCollections" },
      ];
      // const columns = useMemo(() => [
      //   { headerName: "TIMESTAMP", field: "timestamp", filter: true, sortable: true },
      //   { headerName: "PROJECT NAME", field: "project", filter: true, sortable: true },
      //   { headerName: "WING", field: "wing", filter: true, sortable: true },
      //   { headerName: "FLOOR", field: "floor", filter: true, sortable: true },
      //   { headerName: "FLAT NO.", field: "flatNo", filter: true, sortable: true },
      //   { headerName: "RERA CARPET AREA (SQ MTR)", field: "reraCarpetAreaMtr", filter: true, sortable: true },
      //   { headerName: "RERA CARPET AREA (SQ FT)", field: "reraCarpetAreaFt", filter: true, sortable: true },
      //   { headerName: "TOTAL SALEABLE AREA (SQ. FTS)", field: "totalSaleableArea", filter: true, sortable: true },
      //   { headerName: "SALEABLE TO CARPET AREA RATIO (SQ. FTS)", field: "saleableToCarpetAreaRatio", filter: true, sortable: true },
      //   { headerName: "TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)", field: "type", filter: true, sortable: true },
      //   { headerName: "CONFIG (2 BHK, 3 BHK, 4 BHK)", field: "config", filter: true, sortable: true },
      //   { headerName: "APPROVED / UNAPPROVED", field: "status", filter: true, sortable: true },
      //   { headerName: "LANDOWNER / DEVELOPER", field: "owner", filter: true, sortable: true },
      //   { headerName: "SOLD/UNSOLD", field: "soldStatus", filter: true, sortable: true },
      //   { headerName: "NAME OF THE BUYER", field: "buyerName", filter: true, sortable: true },
      //   { headerName: "DATE OF BOOKING", field: "bookingDate", filter: true, sortable: true },
      //   { headerName: "AGREEMENT VALUE", field: "agreementValue", filter: true, sortable: true },
      //   { headerName: "AMOUNT RECEIVED", field: "amountReceived", filter: true, sortable: true },
      //   { headerName: "BALANCE", field: "balance", filter: true, sortable: true },
      //   { headerName: "% COLLECTIONS", field: "percentCollections", filter: true, sortable: true },
      // ], []);
    
  const data = [
    { id: 1, timestamp: "2025-03-01", project: "Shubh Arambh", wing: "Wing 1", floor: 5, flatNo: "501", reraCarpetAreaMtr: 100, reraCarpetAreaFt: 1076, totalSaleableArea: 1500, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "John Doe", soldStatus: "Sold", buyerName: "John Doe", bookingDate: "2025-01-15", agreementValue: 5000000, amountReceived: 2000000, balance: 3000000, percentCollections: 40 },
    { id: 2, timestamp: "2025-03-02", project: "Skyline Heights", wing: "Wing 2", floor: 3, flatNo: "302", reraCarpetAreaMtr: 90, reraCarpetAreaFt: 968, totalSaleableArea: 1400, saleableToCarpetAreaRatio: 1.45, type: "Residential", config: "3 BHK", status: "Available", owner: "N/A", soldStatus: "Unsold", buyerName: "N/A", bookingDate: "-", agreementValue: 0, amountReceived: 0, balance: 0, percentCollections: 0 },
    { id: 3, timestamp: "2025-03-03", project: "Urban Nest", wing: "Wing A", floor: 6, flatNo: "604", reraCarpetAreaMtr: 85, reraCarpetAreaFt: 915, totalSaleableArea: 1300, saleableToCarpetAreaRatio: 1.52, type: "Residential", config: "2 BHK", status: "Sold", owner: "Emma Watson", soldStatus: "Sold", buyerName: "Emma Watson", bookingDate: "2025-02-01", agreementValue: 4500000, amountReceived: 2500000, balance: 2000000, percentCollections: 55 },
    { id: 4, timestamp: "2025-03-04", project: "Sunrise Residency", wing: "Wing B", floor: 4, flatNo: "402", reraCarpetAreaMtr: 110, reraCarpetAreaFt: 1184, totalSaleableArea: 1600, saleableToCarpetAreaRatio: 1.35, type: "Residential", config: "3 BHK", status: "Available", owner: "N/A", soldStatus: "Unsold", buyerName: "N/A", bookingDate: "-", agreementValue: 0, amountReceived: 0, balance: 0, percentCollections: 0 },
    { id: 5, timestamp: "2025-03-05", project: "Emerald Towers", wing: "Wing C", floor: 2, flatNo: "203", reraCarpetAreaMtr: 95, reraCarpetAreaFt: 1022, totalSaleableArea: 1450, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "Michael Smith", soldStatus: "Sold", buyerName: "Michael Smith", bookingDate: "2025-02-10", agreementValue: 4200000, amountReceived: 3000000, balance: 1200000, percentCollections: 71 },
  
  // { id: 5, timestamp: "2025-03-05", project: "Emerald Towers", wing: "Wing C", floor: 2, flatNo: "203", reraCarpetAreaMtr: 95, reraCarpetAreaFt: 1022, totalSaleableArea: 1450, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "Michael Smith", soldStatus: "Sold", buyerName: "Michael Smith", bookingDate: "2025-02-10", agreementValue: 4200000, amountReceived: 3000000, balance: 1200000, percentCollections: 71 },
  ]
  

  for (let i = 6; i <= 50; i++) {
    data.push({
      id: i,
      timestamp: `2025-03-${i < 10 ? "0" + i : i}`,
      project: `Project ${i}`,
      wing: `Wing ${String.fromCharCode(64 + (i % 4) + 1)}`, // A, B, C, D looping
      floor: (i % 10) + 1,
      flatNo: `${i}0${i % 5}`,
      reraCarpetAreaMtr: 80 + (i % 20),
      reraCarpetAreaFt: 860 + (i % 200),
      totalSaleableArea: 1300 + (i % 300),
      saleableToCarpetAreaRatio: (1.3 + (i % 5) * 0.1).toFixed(2),
      type: "Residential",
      config: `${(i % 3) + 2} BHK`,
      status: i % 2 === 0 ? "Sold" : "Available",
      owner: i % 2 === 0 ? `Owner ${i}` : "N/A",
      soldStatus: i % 2 === 0 ? "Sold" : "Unsold",
      buyerName: i % 2 === 0 ? `Buyer ${i}` : "N/A",
      bookingDate: i % 2 === 0 ? `2025-02-${i < 10 ? "0" + (i - 1) : i - 1}` : "-",
      agreementValue: i % 2 === 0 ? 4000000 + i * 10000 : 0,
      amountReceived: i % 2 === 0 ? 2000000 + i * 5000 : 0,
      balance: i % 2 === 0 ? 2000000 - i * 5000 : 0,
      percentCollections: i % 2 === 0 ? Math.min(100, 50 + i) : 0,
    });
  }
  
  console.log(data);
  

  const addSerialNumbers = (data) => {
    return data.map((item, index) => ({
      serialNo: index + 1, 
      ...item, 
    }));
  };

  

  const handleDownloadPDFSales_MIS = () => {
    if (!data || data.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }

  const dataWithSerialNo = addSerialNumbers(data);
  
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
  
    doc.text("Sales MIS Report - Page 1", 14, 15);
  
  
    const firstTableColumns = [
      "S.No","TIMESTAMP", "PROJECT NAME", "WING", "FLOOR", "FLAT NO.",
      "RERA CARPET AREA (SQ MTR)", "RERA CARPET AREA (SQ FT)", "TOTAL SALEABLE AREA (SQ. FTS)",
      "SALEABLE TO CARPET AREA RATIO (SQ. FTS)", "TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)"
    ];
  
   
    const secondTableColumns = [
     "S.No", "CONFIG (2 BHK, 3 BHK, 4 BHK)", "STATUS", "CHOOSE OWNER", "SOLD/UNSOLD",
      "NAME OF THE BUYER", "DATE OF BOOKING", "AGREEMENT VALUE", "AMOUNT RECEIVED",
      "BALANCE", "% COLLECTIONS"
    ];
  
   
const firstTableRows = dataWithSerialNo.map((item) => [
  item.serialNo, 
  item.timestamp, 
  item.projectName, 
  item.wing, 
  item.floor, 
  item.flatNo,
  item.reraCarpetAreaSqMtr, 
  item.reraCarpetAreaSqFt, 
  item.totalSaleableAreaSqFt,
  item.saleableToCarpetAreaRatio, 
  item.typeOfUnits
]);


const secondTableRows = dataWithSerialNo.map((item) => [
  item.serialNo, 
  item.config, 
  item.status, 
  item.chooseOwner, 
  item.soldUnsold,
  item.buyerName, 
  item.bookingDate, 
  item.agreementValue, 
  item.amountReceived,
  item.balance, 
  item.percentageCollections
]);

  
   
    autoTable(doc, {
      startY: 25,
      head: [firstTableColumns],
      body: firstTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
    
    doc.addPage();
    doc.text("Sales MIS Report - Page 2", 14, 15);
  
   
    autoTable(doc, {
      startY: 25,
      head: [secondTableColumns],
      body: secondTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "_");
    doc.save(`SalesMIS_Report_${timestamp}.pdf`);
  };
  

  const totalPages = Math.ceil(data.length / rowsPerPage);

 


  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rows per page is changed
  };

  // Slice data for pagination
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);



 
  // const columnDefs = useMemo(
  //   () =>
  //     columns.map((col) => ({
  //       headerName: col.headerName,  // Corrected from `label`
  //       field: col.field,  // Corrected from `key`
  //       filter: true,
  //       sortable: true,
  //       resizable: true,
  //       cellStyle: { whiteSpace: 'nowrap' },
  //     })),
  //   [columns]
  // );
  

  // const defaultColDef = useMemo(() => ({
  //   flex: 1,
  //   minWidth: 100,
  //   filter: true,
  //   sortable: true,
  //   resizable: true,
  // }), []);




    return (
      <div className="p-4 border rounded-lg shadow-md w-96 bg-white ">
        <h2 className="fs-6  mb-4">Developer Module / Sales MIS</h2>
        
        <div className="d-flex space-x-5">
          <div className="w-1/2 m-3 ">
            <label className="block text-sm font-medium mb-1">Select Project:</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select Project --</option>
              {projects.map((project, index) => (
                <option key={index} value={project}>{project}</option>
              ))}
            </select>
          </div>
          
          <div className="w-1/2 m-3">
            <label className="block text-sm font-medium mb-1">Select Wing:</label>
            <select
              value={selectedWing}
              onChange={(e) => setSelectedWing(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select Wing --</option>
              {wings.map((wing, index) => (
                <option key={index} value={wing}>{wing}</option>
              ))}
            </select>
          </div>



<Button
  variant="contained"
  sx={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    marginTop :"20px",
    padding: "4px 10px", 
    fontSize: "12px", 
    minWidth: "auto", 
    height: "30px", 
    borderRadius: "6px", 
    display: "flex",
    alignItems: "center", 
    gap: "4px", 
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
  onClick={() => {
    console.log("Download PDF button clicked");
    handleDownloadPDFSales_MIS();
  }}
>
  <FaFileDownload size={14} /> 
  Download PDF
</Button>

        </div>

       
        {/* <TableContainer
  component={Paper}
  className="pt-2 hide-scrollbar" 
  sx={{
    maxHeight: "400px",
    overflowY: "auto", 
    overflowX: "auto", 
    scrollbarWidth: "none", 
    msOverflowStyle: "none" 
  }}
>


    <Table stickyHeader>
        <TableHead 
         
         sx={{
           position: "sticky",
           top: 0, 
           zIndex: 2, 
           backgroundColor: "#3621a9", 
         }}
        >
          
             <TableRow sx={{background:"#3621a9"}}>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"  }}>TIMESTAMP</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap", backgroundColor: "#3621a9 !important" }}>PROJECT NAME</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap", backgroundColor: "#3621a9 !important" }}>WING</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>FLOOR</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>FLAT NO.</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>RERA CARPET AREA (SQ MTR)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>RERA CARPET AREA (SQ FT)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>TOTAL SALEABLE AREA (SQ. FTS)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>SALEABLE TO CARPET AREA RATIO (SQ. FTS)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>CONFIG ( 2 BHK, 3 BHK, 4 BHK)</TableCell>
                
                   <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>APPROVED / UNAPPROVED</TableCell>
                   <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>LANDOWNER / DEVELOPER</TableCell>
               
               
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>SOLD/UNSOLD</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>NAME OF THE BUYER</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>DATE OF BOOKING</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>AGREEMENT VALUE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>AMOUNT RECEIVED</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>BALANCE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>% COLLECTIONS</TableCell>
            </TableRow>
        </TableHead>
       
        <TableBody>
  {data.map((row, index) => (
    <TableRow key={index}>
      <TableCell>{row.timestamp || "-"}</TableCell>
      <TableCell>{row.project || "-"}</TableCell>
      <TableCell>{row.wing || "-"}</TableCell>
      <TableCell>{row.floor || "-"}</TableCell>
      <TableCell>{row.flatNo || "-"}</TableCell>
      <TableCell>{row.reraCarpetAreaMtr || "-"}</TableCell>
      <TableCell>{row.reraCarpetAreaFt || "-"}</TableCell>
      <TableCell>{row.totalSaleableArea || "-"}</TableCell>
      <TableCell>{row.saleableToCarpetAreaRatio || "-"}</TableCell>
      <TableCell>{row.type || "-"}</TableCell>
      <TableCell>{row.config || "-"}</TableCell>
      <TableCell>{row.status || "-"}</TableCell>
      <TableCell>{row.owner || "-"}</TableCell>
      <TableCell>{row.soldStatus || "-"}</TableCell>
      <TableCell>{row.buyerName || "-"}</TableCell>
      <TableCell>{row.bookingDate || "-"}</TableCell>
      <TableCell>{row.agreementValue || "-"}</TableCell>
      <TableCell>{row.amountReceived || "-"}</TableCell>
      <TableCell>{row.balance || "-"}</TableCell>
      <TableCell>{row.percentCollections || "-"}</TableCell>
    </TableRow>
  ))}
</TableBody>



  
    </Table>
   
</TableContainer> */}


{/* <TableContainer
  component={Paper}
  className="pt-2 hide-scrollbar"
  sx={{
    maxHeight: "400px",
    overflowY: "auto",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  }}
>
  <Table stickyHeader>
    <TableHead
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "#3621a9",
      }}
    >
      <TableRow sx={{ background: "#3621a9" }}>
        {columns.map((col, idx) => (
          <TableCell
            key={idx}
            sx={{
              color: "white",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              backgroundColor: "#3621a9 !important",
            }}
          >
            {col.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {data.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((col, colIndex) => (
            <TableCell key={colIndex}>
              {row[col.key] || "-"}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer> */}


{/* ----------------- */}
 <TableContainer
      component={Paper}
      className="pt-2 hide-scrollbar"
      sx={{
        maxHeight: '400px',
        overflowY: 'auto',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <Table stickyHeader>
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            backgroundColor: '#3621a9',
          }}
        >
          <TableRow sx={{ background: '#3621a9' }}>
            {columns.map((col, idx) => (
              <TableCell
                key={idx}
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  backgroundColor: '#3621a9 !important',
                }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((col, colIndex) => (
                <TableCell key={colIndex}>{row[col.key] || '-'}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for number of rows per page
        component="div"
        count={data.length} // Total number of rows
        rowsPerPage={rowsPerPage} // Rows per page state
        page={page} // Current page state
        onPageChange={handleChangePage} // Page change handler
        onRowsPerPageChange={handleChangeRowsPerPage} // Rows per page change handler
      />
    </TableContainer>
     


   
   



      {/* <div className="d-flex justify-content-between align-items-center">
        <Button style={{backgroundColor:"#800080"}} className="text-white mt-3" onClick={handlePagination} disabled={currentPage === 1}>Previous</Button>
        <Button style={{backgroundColor:"#800080"}} className='text-white mt-3' onClick={handlePagination} disabled={currentPage === totalPages}>Next</Button>
      </div> */}
      </div>
    );
  };


export default Salesmis;
