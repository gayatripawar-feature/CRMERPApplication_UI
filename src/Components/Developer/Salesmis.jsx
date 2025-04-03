import React, { useState } from "react";
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
  } from "@mui/material";
  import { FaEye } from "react-icons/fa";
  import { FaFileDownload } from "react-icons/fa";
  import { jsPDF } from "jspdf";
  // import "jspdf-autotable";
  import autoTable from "jspdf-autotable";
const Salesmis = (Data) => {
      const [isExpanded, setIsExpanded] = useState(false);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedWing, setSelectedWing] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [data, setData] = useState([]);
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

   
  // const data = [
  //   { id: 1, timestamp: "2025-03-01", project: "Shubh Arambh", wing: "Wing 1", floor: 5, flatNo: "501", reraCarpetAreaMtr: 100, reraCarpetAreaFt: 1076, totalSaleableArea: 1500, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "John Doe", soldStatus: "Sold", buyerName: "John Doe", bookingDate: "2025-01-15", agreementValue: 5000000, amountReceived: 2000000, balance: 3000000, percentCollections: 40 },
    
  // ];

  const data = [
    { id: 1, timestamp: "2025-03-01", project: "Shubh Arambh", wing: "Wing 1", floor: 5, flatNo: "501", reraCarpetAreaMtr: 100, reraCarpetAreaFt: 1076, totalSaleableArea: 1500, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "John Doe", soldStatus: "Sold", buyerName: "John Doe", bookingDate: "2025-01-15", agreementValue: 5000000, amountReceived: 2000000, balance: 3000000, percentCollections: 40 },
    { id: 2, timestamp: "2025-03-02", project: "Skyline Heights", wing: "Wing 2", floor: 3, flatNo: "302", reraCarpetAreaMtr: 90, reraCarpetAreaFt: 968, totalSaleableArea: 1400, saleableToCarpetAreaRatio: 1.45, type: "Residential", config: "3 BHK", status: "Available", owner: "N/A", soldStatus: "Unsold", buyerName: "N/A", bookingDate: "-", agreementValue: 0, amountReceived: 0, balance: 0, percentCollections: 0 },
    { id: 3, timestamp: "2025-03-03", project: "Urban Nest", wing: "Wing A", floor: 6, flatNo: "604", reraCarpetAreaMtr: 85, reraCarpetAreaFt: 915, totalSaleableArea: 1300, saleableToCarpetAreaRatio: 1.52, type: "Residential", config: "2 BHK", status: "Sold", owner: "Emma Watson", soldStatus: "Sold", buyerName: "Emma Watson", bookingDate: "2025-02-01", agreementValue: 4500000, amountReceived: 2500000, balance: 2000000, percentCollections: 55 },
    { id: 4, timestamp: "2025-03-04", project: "Sunrise Residency", wing: "Wing B", floor: 4, flatNo: "402", reraCarpetAreaMtr: 110, reraCarpetAreaFt: 1184, totalSaleableArea: 1600, saleableToCarpetAreaRatio: 1.35, type: "Residential", config: "3 BHK", status: "Available", owner: "N/A", soldStatus: "Unsold", buyerName: "N/A", bookingDate: "-", agreementValue: 0, amountReceived: 0, balance: 0, percentCollections: 0 },
    { id: 5, timestamp: "2025-03-05", project: "Emerald Towers", wing: "Wing C", floor: 2, flatNo: "203", reraCarpetAreaMtr: 95, reraCarpetAreaFt: 1022, totalSaleableArea: 1450, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "Michael Smith", soldStatus: "Sold", buyerName: "Michael Smith", bookingDate: "2025-02-10", agreementValue: 4200000, amountReceived: 3000000, balance: 1200000, percentCollections: 71 },
  ,
  { id: 5, timestamp: "2025-03-05", project: "Emerald Towers", wing: "Wing C", floor: 2, flatNo: "203", reraCarpetAreaMtr: 95, reraCarpetAreaFt: 1022, totalSaleableArea: 1450, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "Michael Smith", soldStatus: "Sold", buyerName: "Michael Smith", bookingDate: "2025-02-10", agreementValue: 4200000, amountReceived: 3000000, balance: 1200000, percentCollections: 71 },
  ]
  
  // Generate 15 more entries dynamically
  for (let i = 6; i <= 20; i++) {
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
  
  console.log(data); // Check the generated data
  

  const addSerialNumbers = (data) => {
    return data.map((item, index) => ({
      serialNo: index + 1, // Add Serial Number
      ...item, // Spread existing data
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
  
   // Map data for first table (including S.No)
const firstTableRows = dataWithSerialNo.map((item) => [
  item.serialNo, // Use serial number here
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

// Map data for second table
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

  
    // Generate first table
    autoTable(doc, {
      startY: 25,
      head: [firstTableColumns],
      body: firstTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
    // Add a second page
    doc.addPage();
    doc.text("Sales MIS Report - Page 2", 14, 15);
  
    // Generate second table
    autoTable(doc, {
      startY: 25,
      head: [secondTableColumns],
      body: secondTableRows,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
      margin: { top: 20, left: 5, right: 5 }
    });
  
    // Generate dynamic filename
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
    padding: "4px 10px", // Reduced padding
    fontSize: "12px", // Smaller font size
    minWidth: "auto", // Prevents extra width
    height: "30px", // Adjusts button height
    borderRadius: "6px", // Slightly smaller border radius
    display: "flex",
    alignItems: "center", 
    gap: "4px", // Reduced space between icon and text
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
  onClick={() => {
    console.log("Download PDF button clicked");
    handleDownloadPDFSales_MIS();
  }}
>
  <FaFileDownload size={14} /> {/* Reduced icon size */}
  Download PDF
</Button>

        </div>

        {/* <TableContainer component={Paper} className="pt-2" sx={{ maxHeight: "400px", overflowY: "auto" }}> */}
        <TableContainer
  component={Paper}
  className="pt-2 hide-scrollbar" // Keep only one className
  sx={{
    maxHeight: "400px",
    overflowY: "auto", // Allows vertical scrolling
    overflowX: "auto", // Allows horizontal scrolling
    scrollbarWidth: "none", // Hides scrollbar in Firefox
    msOverflowStyle: "none" // Hides scrollbar in IE/Edge
  }}
>


    <Table stickyHeader>
        <TableHead 
         
         sx={{
           position: "sticky",
           top: 0, // Sticks the header to the top
           zIndex: 2, // Ensures the header is above table rows
           backgroundColor: "#3621a9", // Keeps background color visible
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
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>STATUS</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap", backgroundColor: "#3621a9 !important"}}>CHOOSE OWNER</TableCell>
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
   
</TableContainer>




      {/* Pagination Section */}
      <div className="d-flex justify-content-between align-items-center">
        <Button style={{backgroundColor:"#800080"}} className="text-white mt-3" onClick={handlePagination} disabled={currentPage === 1}>Previous</Button>
        <Button style={{backgroundColor:"#800080"}} className='text-white mt-3' onClick={handlePagination} disabled={currentPage === totalPages}>Next</Button>
      </div>
      </div>
    );
  };


export default Salesmis;
