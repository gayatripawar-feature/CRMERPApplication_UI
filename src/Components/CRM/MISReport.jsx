import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { FaFileDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
const MISReport = () => {

  const [flatNo, setFlatNo] = useState('');
  const [allotteeName, setAllotteeName] = useState('');
  const [status, setStatus] = useState('');
  const [ownerType, setOwnerType] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('');
  
 
  const [coAllotteeName, setCoAllotteeName] = useState('');
  const [allotteePanNo, setAllotteePanNo] = useState('');
  const [coAllotteePanNo, setCoAllotteePanNo] = useState('');
  const [allotteeAadharNo, setAllotteeAadharNo] = useState('');
  const [coAllotteeAadharNo, setCoAllotteeAadharNo] = useState('');
  const [address, setAddress] = useState('');
  const [flatType, setFlatType] = useState('');
  const [floor, setFloor] = useState('');
  const [rate, setRate] = useState('');
  const [agreementStatus, setAgreementStatus] = useState('');
  const [agreementDateTime, setAgreementDateTime] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [emailId, setEmailId] = useState('');
  const [carpetAreaSqm, setCarpetAreaSqm] = useState('');
  const [openBalconySqm, setOpenBalconySqm] = useState('');
  const [encloseBalconySqm, setEncloseBalconySqm] = useState('');
  const [totalCarpetAreaSqm, setTotalCarpetAreaSqm] = useState('');
  const [carpetAreaSqFt, setCarpetAreaSqFt] = useState('');
  const [saleableAreaSqFt, setSaleableAreaSqFt] = useState('');
  const [stampDuty, setStampDuty] = useState('');
  const [registrationFee, setRegistrationFee] = useState('');
  const [legalFee, setLegalFee] = useState('');
  const [agreementValue, setAgreementValue] = useState('');
  const [receivedAgainstAgreement, setReceivedAgainstAgreement] = useState('');
  const [balanceAgainstAgreement, setBalanceAgainstAgreement] = useState('');
  const [gstValue, setGstValue] = useState('');
  const [receivedAgainstGst, setReceivedAgainstGst] = useState('');
  const [balanceAgainstGst, setBalanceAgainstGst] = useState('');
  const [totalDueIncludingGst, setTotalDueIncludingGst] = useState('');
  const [parking, setParking] = useState('');
  const [banker, setBanker] = useState('');
  const [booking, setBooking] = useState('');
  const [agreement, setAgreement] = useState('');
  const [plinth, setPlinth] = useState('');
  const [firstSlab, setFirstSlab] = useState('');
  const [secondSlab, setSecondSlab] = useState('');
  const [thirdSlab, setThirdSlab] = useState('');
  const [fifthSlab, setFifthSlab] = useState('');
  const [seventhSlab, setSeventhSlab] = useState('');
  const [ninthSlab, setNinthSlab] = useState('');
  const [tenthSlab, setTenthSlab] = useState('');
  const [brickWork, setBrickWork] = useState('');
  const [externalPlaster, setExternalPlaster] = useState('');
  const [flooring, setFlooring] = useState('');
  const [staircase, setStaircase] = useState('');
  const [lift, setLift] = useState('');
  const [possession, setPossession] = useState('');
  
  
  const [formData, setFormData] = useState([]);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = {
      flatNo,
      allotteeName,
      coAllotteeName,
      allotteePanNo,
      coAllotteePanNo,
      allotteeAadharNo,
      coAllotteeAadharNo,
      address,
      flatType,
      floor,
      status,
      rate,
      agreementStatus,
      agreementDateTime,
      registrationNumber,
      contactNo,
      emailId,
      carpetAreaSqm,
      openBalconySqm,
      encloseBalconySqm,
      totalCarpetAreaSqm,
      carpetAreaSqFt,
      saleableAreaSqFt,
      stampDuty,
      registrationFee,
      legalFee,
      agreementValue,
      receivedAgainstAgreement,
      balanceAgainstAgreement,
      gstValue,
      receivedAgainstGst,
      balanceAgainstGst,
      totalDueIncludingGst,
      parking,
      banker,
      booking,
      agreement,
      plinth,
      firstSlab,
      secondSlab,
      thirdSlab,
      fifthSlab,
      seventhSlab,
      ninthSlab,
      tenthSlab,
      brickWork,
      externalPlaster,
      flooring,
      staircase,
      lift,
      possession,
      ownerType,
      approvalStatus
    };

    setFormData([...formData, newFormData]); 
   
    setFlatNo('');
    setAllotteeName('');
    setCoAllotteeName('');
    setAllotteePanNo('');
    setCoAllotteePanNo('');
    setAllotteeAadharNo('');
    setCoAllotteeAadharNo('');
    setAddress('');
    setFlatType('');
    setFloor('');
    setRate('');
    setAgreementStatus('');
    setAgreementDateTime('');
    setRegistrationNumber('');
    setContactNo('');
    setEmailId('');
    setCarpetAreaSqm('');
    setOpenBalconySqm('');
    setEncloseBalconySqm('');
    setTotalCarpetAreaSqm('');
    setCarpetAreaSqFt('');
    setSaleableAreaSqFt('');
    setStampDuty('');
    setRegistrationFee('');
    setLegalFee('');
    setAgreementValue('');
    setReceivedAgainstAgreement('');
    setBalanceAgainstAgreement('');
    setGstValue('');
    setReceivedAgainstGst('');
    setBalanceAgainstGst('');
    setTotalDueIncludingGst('');
    setParking('');
    setBanker('');
    setBooking('');
    setAgreement('');
    setPlinth('');
    setFirstSlab('');
    setSecondSlab('');
    setThirdSlab('');
    setFifthSlab('');
    setSeventhSlab('');
    setNinthSlab('');
    setTenthSlab('');
    setBrickWork('');
    setExternalPlaster('');
    setFlooring('');
    setStaircase('');
    setLift('');
    setPossession('');
  };

  const handleDownloadPDFMIS = () => {
    const doc = new jsPDF("landscape");
    doc.setFontSize(14);
    doc.text("MIS Report", 14, 15);
  
    
    const tableRows = formData.map((row, index) => ([
      index + 1,  
      row.flatNo || "-",
      row.bookingDate || "-",
      row.allotteeName || "-",
      row.coAllotteeName || "-",
      row.allotteePanNo || "-",
      row.coAllotteePanNo || "-",
      row.allotteeAadharNo || "-",
      row.coAllotteeAadharNo || "-",
      row.address || "-",
      row.flatType || "-",
      row.floor || "-",
      row.status || "-",  
      row.rate || "-",
      row.agreementStatus || "-",
      row.agreementDateTime || "-",
      row.registrationNo || "-",
      row.contactNo || "-",
      row.email || "-",
      row.carpetAreaSqm || "-",
      row.openBalconySqm || "-",
      row.enclosedBalconySqm || "-",
      row.totalCarpetAreaSqm || "-",
      row.carpetAreaSqft || "-",
      row.saleableAreaSqft || "-",
      row.stampDuty || "-",
      row.registrationFee || "-",
      row.legalFee || "-",
      row.agreementValue || "-",
      row.receivedAgreement || "-",
      row.balanceAgreement || "-",
      row.gstValue || "-",
      row.receivedGst || "-",
      row.balanceGst || "-",
      row.totalDueIncludingGst || "-",
      row.parking || "-",
      row.banker || "-",
      row.bookingPercent || "-",
      row.agreementPercent || "-",
      row.plinthPercent || "-",
      row.firstSlabPercent || "-",
      row.secondSlabPercent || "-",
      row.totalPercent || "-"
    ]));
  
   
    const columnsPage1 = ["Sr No", "FLAT NO", "BOOKING DATE", "NAME OF ALLOTEE", "NAME OF CO-ALLOTEE", "ALLOTEE PAN NO.", "CO-ALLOTEE PAN NO", "ALLOTEE AADHAR NO.", "CO-ALLOTEE AADHAR NO.", "ADDRESS", "FLAT TYPE", "FLOOR", "SOLD/UNSOLD", "RATE"];
    const columnsPage2 = ["AGREEMENT STATUS", "AGREEMENT DATE AND TIME", "REGISTRATION NUMBER", "CONTACT NO", "EMAIL ID", "CARPET AREA SQM", "OPEN BALCONY SQM", "ENCLOSED BALCONY SQM", "TOTAL CARPET AREA SQM", "CARPET AREA IN SQ FT", "SALEABLE AREA SQ. FT"];
    const columnsPage3 = ["STAMP DUTY (7%)", "REGISTRATION FEE", "LEGAL FEE", "AGREEMENT VALUE", "RECEIVED AGAINST AGREEMENT", "BALANCE AGAINST AGREEMENT", "GST VALUE", "RECEIVED AGAINST GST", "BALANCE AGAINST GST", "TOTAL DUE INCLUDING GST", "PARKING", "BANKER", "BOOKING (10%)", "AGREEMENT (10%)", "PLINTH (15%)", "1ST SLAB (5%)", "2ND SLAB (5%)", "TOTAL"];
  
    autoTable(doc, {
      startY: 25,
      head: [columnsPage1],
      body: tableRows.map(row => row.slice(0, columnsPage1.length)),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.addPage();
  
    autoTable(doc, {
      head: [columnsPage2],
      body: tableRows.map(row => row.slice(columnsPage1.length, columnsPage1.length + columnsPage2.length)),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.addPage();
  
    autoTable(doc, {
      head: [columnsPage3],
      body: tableRows.map(row => row.slice(columnsPage1.length + columnsPage2.length)),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [139, 107, 255], textColor: [255, 255, 255] },
    });
  
    doc.save("MIS_Report.pdf");
  };
  
  


  return (
<>
    <h5 className='fs-6 mx-3'>Reports /MIS</h5>
    <div className="container mt-5 shadow p-4 rounded">
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          {/* Flat No */}
          <div className="col-md-2">
            <label className="form-label">Flat No:</label>
            <select
              className="form-select"
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value)}
            >
              <option value="">Select Flat No</option>
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
              <option value="104">104</option>
            </select>
          </div>

          {/* Name of Allottee */}
          <div className="col-md-3">
            <label className="form-label">Name of Allottee:</label>
            <select
              className="form-select"
              value={allotteeName}
              onChange={(e) => setAllotteeName(e.target.value)}
            >
              <option value="">Select Allottee</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Michael Johnson">Michael Johnson</option>
              <option value="Emma Brown">Emma Brown</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-2">
            <label className="form-label">Status:</label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="sold">Sold</option>
              <option value="unsold">Unsold</option>
            </select>
          </div>

          {/* Owner Type */}
          <div className="col-md-2">
            <label className="form-label">Owner Type:</label>
            <select
              className="form-select"
              value={ownerType}
              onChange={(e) => setOwnerType(e.target.value)}
            >
          <option value="">Select Owner Type</option>
<option value="Landowner">Landowner</option>

            </select>
          </div>

          {/* Approval Status */}
          <div className="col-md-3">
            <label className="form-label">Approval Status:</label>
            <select
              className="form-select"
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value)}
            >
              <option value="">Select Approval Status</option>
              <option value="approved">Approved</option>
              <option value="unapproved">Unapproved</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className='d-flex gap-3'>
        <button type="submit" className="btn btn-primary mt-4">
          Submit
        </button>
        <Button
  variant="contained"
  sx={{
    background: "linear-gradient(45deg,rgb(139, 107, 255),rgb(178, 83, 255))",
    color: "white",
    // fontWeight: "bold",
    fontWeight: "900",
    textTransform: "none",
    marginTop :"24px",
   
    minHeight: "unset",  
    height: "39px",   
    fontSize: "12px",
    borderRadius: "20px",
    display: "inline-flex",  
    alignItems: "center",
    gap: "6px",
    lineHeight: "1", 
    "&:hover": {
      background: "linear-gradient(45deg, #ff8e53, #ff6b6b)",
    },
  }}
  disableElevation   
  disableRipple   
  onClick={handleDownloadPDFMIS}
>
  <FaFileDownload size={14} />
  Download PDF
</Button>
        </div>
      
      </form>

    
     <TableContainer component={Paper}  sx={{ marginTop: '30px' }}>
        <Table sx={{ minWidth: 650 }}>
        
          <TableHead>
            <TableRow sx={{ background: "#3621a9" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SR NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLAT NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BOOKING DATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF ALLOTEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>NAME OF CO-ALLOTEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALLOTEE PAN NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CO-ALLOTEE PAN NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ALLOTEE AADHAR NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CO-ALLOTEE AADHAR NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ADDRESS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLAT TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOOR</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SOLD/UNSOLD</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RATE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT STATUS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT DATE AND TIME</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REGISTRATION NUMBER</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CONTACT NO</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EMAIL ID</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CARPET AREA SQM</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OPEN BALCONY SQM</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>ENCLOSE BALCONY SQM</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TOTAL CARPET AREA SQM</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>CARPET AREA IN SQ FT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>SALEABLE AREA SQ. FT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAMP DUTY (7%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>REGISTRATION FEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LEGAL FEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT VALUE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RECEIVED AGAINST AGREEMENT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BALANCE AGAINST AGREEMENT</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>GST VALUE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>RECEIVED AGAINST GST</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BALANCE AGAINST GST</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TOTAL DUE INCLUDING GST</TableCell>
             
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}> DUE AS PER WORK STAGE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PARKING</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BANKER</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BOOKING (10%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT (10%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLINTH (15%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>1ST SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>2ND SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>3RD SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>5TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>7TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>9TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>10TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BRICK WORK (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EXTERNAL PLASTER (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOORING (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAIRCASE (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LIFT (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>POSSESSION (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TOTAL</TableCell>



              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BOOKING (10%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>AGREEMENT (10%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>PLINTH (15%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>1ST SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>2ND SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>3RD SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>5TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>7TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>9TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>10TH SLAB (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>BRICK WORK (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>EXTERNAL PLASTER (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>FLOORING (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>STAIRCASE (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>LIFT (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>POSSESSION (5%)</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>TOTAL</TableCell>




              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>OWNER TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>APPROVED / UNAPPROVED</TableCell>
            </TableRow>
          </TableHead>
         
          <TableBody>
            {formData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.flatNo}</TableCell>
                <TableCell>{data.bookingDate}</TableCell>
                <TableCell>{data.allotteeName}</TableCell>
                <TableCell>{data.coAllotteeName}</TableCell>
                <TableCell>{data.allotteePanNo}</TableCell>
                <TableCell>{data.coAllotteePanNo}</TableCell>
                <TableCell>{data.allotteeAadharNo}</TableCell>
                <TableCell>{data.coAllotteeAadharNo}</TableCell>
                <TableCell>{data.address}</TableCell>
                <TableCell>{data.flatType}</TableCell>
                <TableCell>{data.floor}</TableCell>
                <TableCell>{data.status}</TableCell>
                <TableCell>{data.rate}</TableCell>
                <TableCell>{data.agreementStatus}</TableCell>
                <TableCell>{data.agreementDateTime}</TableCell>
                <TableCell>{data.registrationNumber}</TableCell>
                <TableCell>{data.contactNo}</TableCell>
                <TableCell>{data.emailId}</TableCell>
                <TableCell>{data.carpetAreaSqm}</TableCell>
                <TableCell>{data.openBalconySqm}</TableCell>
                <TableCell>{data.enclosedBalconySqm}</TableCell>
                <TableCell>{data.totalCarpetAreaSqm}</TableCell>
                <TableCell>{data.carpetAreaSqFt}</TableCell>
                <TableCell>{data.saleableAreaSqFt}</TableCell>
                <TableCell>{data.stampDuty}</TableCell>
                <TableCell>{data.registrationFee}</TableCell>
                <TableCell>{data.legalFee}</TableCell>
                <TableCell>{data.agreementValue}</TableCell>
                <TableCell>{data.receivedAgainstAgreement}</TableCell>
                <TableCell>{data.balanceAgainstAgreement}</TableCell>
                <TableCell>{data.gstValue}</TableCell>
                <TableCell>{data.receivedAgainstGst}</TableCell>
                <TableCell>{data.balanceAgainstGst}</TableCell>
                <TableCell>{data.totalDueIncludingGst}</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.parking}</TableCell>
                <TableCell>{data.banker}</TableCell>
                <TableCell>{data.booking}</TableCell>
                <TableCell>{data.agreement}</TableCell>
                <TableCell>{data.plinth}</TableCell>
                <TableCell>{data.firstSlab}</TableCell>
                <TableCell>{data.secondSlab}</TableCell>
                <TableCell>{data.thirdSlab}</TableCell>
                <TableCell>{data.fifthSlab}</TableCell>
                <TableCell>{data.seventhSlab}</TableCell>
                <TableCell>{data.ninthSlab}</TableCell>
                <TableCell>{data.tenthSlab}</TableCell>
                <TableCell>{data.brickWork}</TableCell>
                <TableCell>{data.externalPlaster}</TableCell>
                <TableCell>{data.flooring}</TableCell>
                <TableCell>{data.staircase}</TableCell>
                <TableCell>{data.lift}</TableCell>
                <TableCell>{data.possession}</TableCell>
                <TableCell>{data.total}</TableCell>


                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>

                <TableCell>{data.ownerType}</TableCell>
                <TableCell>{data.approvalStatus}</TableCell>
              </TableRow>
            ))}

  <TableRow sx={{ background: '#2b2b2b' }}>
  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} colSpan={2}>
    Total
  </TableCell>

 

  
  {[...Array(20)].map((_, idx) => (
    <TableCell key={idx}></TableCell>
  ))}

 
  {[...Array(72- 20)].map((_, idx) => (
    <TableCell key={idx} sx={{ color: 'white', fontWeight: 'bold' }}>0</TableCell>
  ))}
</TableRow>

          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default MISReport;
