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

   
  const data = [
    { id: 1, timestamp: "2025-03-01", project: "Shubh Arambh", wing: "Wing 1", floor: 5, flatNo: "501", reraCarpetAreaMtr: 100, reraCarpetAreaFt: 1076, totalSaleableArea: 1500, saleableToCarpetAreaRatio: 1.4, type: "Residential", config: "2 BHK", status: "Sold", owner: "John Doe", soldStatus: "Sold", buyerName: "John Doe", bookingDate: "2025-01-15", agreementValue: 5000000, amountReceived: 2000000, balance: 3000000, percentCollections: 40 },
    
  ];

  const handleDownloadPDFSales_MIS = () => {
    if (!Data || Data.length === 0) {
      console.error("No data available for PDF generation");
      return;
    }
  
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a3" });
  
    doc.text("Sales MIS Report - Page 1", 14, 15);
  
    // First set of columns
    const firstTableColumns = [
      "TIMESTAMP", "PROJECT NAME", "WING", "FLOOR", "FLAT NO.",
      "RERA CARPET AREA (SQ MTR)", "RERA CARPET AREA (SQ FT)", "TOTAL SALEABLE AREA (SQ. FTS)",
      "SALEABLE TO CARPET AREA RATIO (SQ. FTS)", "TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)"
    ];
  
    // Second set of columns
    const secondTableColumns = [
      "CONFIG (2 BHK, 3 BHK, 4 BHK)", "STATUS", "CHOOSE OWNER", "SOLD/UNSOLD",
      "NAME OF THE BUYER", "DATE OF BOOKING", "AGREEMENT VALUE", "AMOUNT RECEIVED",
      "BALANCE", "% COLLECTIONS"
    ];
  
    // Map data for first table
    const firstTableRows = Data.map((item) => [
      item.timestamp, item.projectName, item.wing, item.floor, item.flatNo,
      item.reraCarpetAreaSqMtr, item.reraCarpetAreaSqFt, item.totalSaleableAreaSqFt,
      item.saleableToCarpetAreaRatio, item.typeOfUnits
    ]);
  
    // Map data for second table
    const secondTableRows = Data.map((item) => [
      item.config, item.status, item.chooseOwner, item.soldUnsold,
      item.buyerName, item.bookingDate, item.agreementValue, item.amountReceived,
      item.balance, item.percentageCollections
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

        <TableContainer component={Paper} className="pt-2">
    <Table>
        <TableHead>
          
             <TableRow sx={{background:"#3621a9"}}>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>TIMESTAMP</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>PROJECT NAME</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold",whiteSpace: "nowrap" }}>WING</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLOOR</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>FLAT NO.</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>RERA CARPET AREA (SQ MTR)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>RERA CARPET AREA (SQ FT)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TOTAL SALEABLE AREA (SQ. FTS)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SALEABLE TO CARPET AREA RATIO (SQ. FTS)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>TYPE OF UNITS (RESIDENTIAL / COMMERCIAL)</TableCell>
                <TableCell  sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CONFIG ( 2 BHK, 3 BHK, 4 BHK)</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>STATUS</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>CHOOSE OWNER</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>SOLD/UNSOLD</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>NAME OF THE BUYER</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>DATE OF BOOKING</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AGREEMENT VALUE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>AMOUNT RECEIVED</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>BALANCE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" ,whiteSpace: "nowrap"}}>% COLLECTIONS</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
  {Array.isArray(Data) && Data.length > 0 ? (
    Data.map((row, index) => (
      <TableRow key={index}>
        <TableCell>{row.timestamp || "-"}</TableCell>
        <TableCell>{row.projectName || "-"}</TableCell>
        <TableCell>{row.wing || "-"}</TableCell>
        <TableCell>{row.floor || "-"}</TableCell>
        <TableCell>{row.flatNo || "-"}</TableCell>
        <TableCell>{row.reraCarpetAreaSqMtr || "-"}</TableCell>
        <TableCell>{row.reraCarpetAreaSqFt || "-"}</TableCell>
        <TableCell>{row.totalSaleableAreaSqFt || "-"}</TableCell>
        <TableCell>{row.saleableToCarpetAreaRatio || "-"}</TableCell>
        <TableCell>{row.typeOfUnits || "-"}</TableCell>
        <TableCell>{row.config || "-"}</TableCell>
        <TableCell>{row.status || "-"}</TableCell>
        <TableCell>{row.chooseOwner || "-"}</TableCell>
        <TableCell>{row.soldUnsold || "-"}</TableCell>
        <TableCell>{row.buyerName || "-"}</TableCell>
        <TableCell>{row.bookingDate || "-"}</TableCell>
        <TableCell>{row.agreementValue || "-"}</TableCell>
        <TableCell>{row.amountReceived || "-"}</TableCell>
        <TableCell>{row.balance || "-"}</TableCell>
        <TableCell>{row.percentageCollections || "-"}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={20} align="center">No data available</TableCell>
    </TableRow>
  )}
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
