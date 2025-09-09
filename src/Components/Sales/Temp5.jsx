


// import React, { useState,useRef,useEffect } from "react";
// import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
// import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";


// import { useReactToPrint } from "react-to-print";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TextField, Grid, Box } from '@mui/material';

// import VisitDownloadPDF from "./VisitDownloadPDF";
// import RateDownloadPDF from "./RateDownloadPDF";
// const templates = [

//   {
//     id: 1,
//     title: (
//       <div style={{ 
//         backgroundColor: '#0056b3', 
//         padding: '15px', 
//         borderRadius: '6px', 
//         marginBottom: '20px', 
//         textAlign: 'center',
//         color: 'white', 
//         fontWeight: 'bold',
//         fontSize: '18px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         letterSpacing: '1px'
//       }}>
//         At The Time of Visit
//       </div>
//     ),
//     description: "Generate payment details and schedule document for site visits.",
//     formtype: "visit",
//     displayType: "visitDisplay",
//     buttons: ["Form", "Display", "PDF"],
//   }
// , 
//   {
//     id: 2,
//     title: (
//       <div style={{ 
//         backgroundColor: '#0056b3', 
//         padding: '15px', 
//         borderRadius: '6px', 
//         marginBottom: '20px', 
//         textAlign: 'center',
//         color: 'white', 
//         fontWeight: 'bold',
//         fontSize: '18px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         letterSpacing: '1px'
//       }}>
//         At The Time of Booking
//       </div>
//     ),
//     description: "Generate booking-related documentation and payment details.",
//     formtype: "visit",
//     displayType: "visitDisplay",
//     pdfType:"visitPdf",
//     buttons: ["Form", "Display"],
//   }
// ,  
 

//   {
//     id: 3,
//     title: (
//       <div style={{ 
//         backgroundColor: '#0056b3', 
//         padding: '15px', 
//         borderRadius: '6px', 
//         marginBottom: '20px', 
//         textAlign: 'center',
//         color: 'white', 
//         fontWeight: 'bold',
//         fontSize: '18px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         letterSpacing: '1px'
//       }}>
//         Rate Approval Form
//       </div>
//     ),
//     description: "Generate rate approval documentation for property transactions.",
//     formtype: "RateDisplay",
//     displayType: "rateApprovalDisplay",
//     buttons: ["Form", "Display"],
//   }
// ,  
//   {
//     id: 4,
//     title: (
//       <div style={{ 
//         backgroundColor: '#0056b3', 
//         padding: '15px', 
//         borderRadius: '6px', 
//         marginBottom: '20px', 
//         textAlign: 'center',
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: '18px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         letterSpacing: '1px'
//       }}>
//         Negotiation Calculation (PACKAGE WISE)
//       </div>
//     ),
//     description: "Generate package-wise negotiation calculations and agreements.",
//     formtype: "Package",
//     displayType: "packageDisplay",
//     buttons: ["Form", "Display"],
//   },
  
 
//   {
//     id: 5,
//     title: (
//       <div style={{ 
//         backgroundColor: '#0056b3', 
//         padding: '15px', 
//         borderRadius: '6px', 
//         marginBottom: '20px', 
//         textAlign: 'center',
//         color: 'white', 
//         fontWeight: 'bold',
//         fontSize: '18px',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//         letterSpacing: '1px'
//       }}>
//         Negotiation Calculation (AGREEMENT VALUE WISE)
//       </div>
//     ),
//     description: "Generate agreement value-based negotiation calculations.",
//     formtype: "Agreement",
//     displayType: "agreementDisplay",
//     buttons: ["Form", "Display"],
//   }
  
// ];

// const projectData = {};

// const Template = () => {
//   const [openModal, setOpenModal] = useState(false);
//   const [modalContent, setModalContent] = useState(null);
//   const [showPdfComponent, setShowPdfComponent] = useState(false);

//   const [formData, setFormData] = useState({
//     projectName: "",
//     wing: "",
//     flatNo: "",
//     type: "",
//     date: "",
//   });

  
//   const displayRef = useRef();


//   const componentRef = useRef(); 


// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     onBeforePrint: () => console.log("🖨️ Printing started..."),
//     onAfterPrint: () => console.log("✅ Printing completed."),
//     onPrintError: (error) => console.error("❌ Printing error:", error),
    
//   });

  
// const handleOpenModal = (content) => {

//     console.log("Opening modal with content:", content);
  
//     setModalContent(content);
//     console.log("Opening modal with content:", content);
//     setOpenModal(true);
  
//     setTimeout(() => {
//       console.log("🟢 Checking modalContent:", modalContent);
  

//     if (modalContent === content) {
//         console.log("🟢 Modal is fully rendered, generating PDF...");
//         generatePDF();
//       } else {
//         console.log("⏳ Modal not ready yet, retrying...");
//         setTimeout(() => generatePDF(), 500);
//       }
//     }, 1000); 
//   };
  
  



// const handleGeneratePDF = () => {
//     const content = document.getElementById('pdf-content');
//     if (!content) return;

//     html2canvas(content, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF();
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
//       pdf.save('VisitDetails.pdf');
//     });
//   };
//   const handleGeneratePDFRate = () => {
//     const content = document.getElementById('rate_pdf');
//     if (!content) {
//       alert('No content to generate PDF');
//       return;
//     }
   
//     const pdfButton = document.getElementById('download-pdf-button');
//     if (pdfButton) {
//       pdfButton.style.display = 'none';
//     }
  
//     html2canvas(content, { scale: 2 }).then((canvas) => {
     
//       if (pdfButton) {
//         pdfButton.style.display = 'block';
//       }
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
   
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       let heightLeft = imgHeight;
//       let position = 0;
      
   
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pdfHeight;
      
    
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pdfHeight;
//       }
      
//       pdf.save("RateApproval.pdf");
//     });
//   };

//   const handleGeneratePDFRatePackage = () => {
//     const content = document.getElementById('package_pdf');
//     if (!content) {
//       alert('No content to generate PDF');
//       return;
//     }
    
//     const pdfButton = document.getElementById('download-pdf-button');
//     if (pdfButton) {
//       pdfButton.style.display = 'none';
//     }
    
//     html2canvas(content, { scale: 2 }).then((canvas) => {
     
//       if (pdfButton) {
//         pdfButton.style.display = 'block';
//       }
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
 
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       let heightLeft = imgHeight;
//       let position = 0;
      
    
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pdfHeight;
      
   
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pdfHeight;
//       }
      
//       pdf.save("Package.pdf");
//     });
//   };
  
//   const handleGeneratePDFRateAgreement = () => {
//     const content = document.getElementById('agreement_pdf');
//     if (!content) {
//       alert('No content to generate PDF');
//       return;
//     }
    
//     const pdfButton = document.getElementById('download-pdf-button');
//     if (pdfButton) {
//       pdfButton.style.display = 'none';
//     }
    
//     html2canvas(content, { scale: 2 }).then((canvas) => {
     
//       if (pdfButton) {
//         pdfButton.style.display = 'block';
//       }
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
      
 
//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
//       let heightLeft = imgHeight;
//       let position = 0;
      
    
//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pdfHeight;
      
   
//       while (heightLeft > 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pdfHeight;
//       }
      
//       pdf.save("Agreement.pdf");
//     });
//   };


// const contentRef = useRef(null);


// const generatePDF = useReactToPrint({
//     content: () => {
//       console.log("🟢 Checking contentRef in generatePDF:", contentRef.current);
      
//       if (modalContent === content) {
//         console.log("🟢 Modal is fully rendered, generating PDF...");
//         generatePDF();
//       } 
    
//       if (!contentRef.current || !contentRef.current.innerHTML.trim()) {
//         console.error("❌ Content not ready, delaying print...");
//         setTimeout(generatePDF, 500); 
//         return null;
//       }
  
//       return contentRef.current;
//     },
//     onAfterPrint: () => console.log("✅ PDF successfully generated."),
//     onPrintError: (error) => console.error("❌ Print error:", error),
//   });
  

  

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setModalContent(null);
//   };

//   const handleDateChange = (newDate) => {
//     setFormData({
//       ...formData,
//       date: newDate,
//     });
//   };




//   const handleDownloadRatePdf = () => {
//     const input = document.getElementById("rate_pdf");

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("RateApprovalForm.pdf");
//     });
//   };

// const handleDownloadVisitPdf = async () => {
//     setShowPdfComponent(true);  
  
//     setTimeout(async () => {
//       const input = document.getElementById("pdf-content");
  
//       const canvas = await html2canvas(input, { scale: 2 });
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a3");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
//       pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//       pdf.save("VisitForm.pdf");
  
//       setShowPdfComponent(false); 
//     }, 100);  
//   };
  





// const modalTitles = {
//   visit: (
//     <div style={{
//       backgroundColor: '#007bff', 
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
//     }}>
//       Booking Form
//     </div>
//   ),
//   visitDisplay: (
//     <div style={{
//       backgroundColor: '#0056b3', 
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
//     }}>
//       At The Time of Booking - Display
//     </div>
//   ),
//   rateApprovalDisplay: (
//     <div style={{
//       backgroundColor: '#004085', 
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
//     }}>
//       Rate Approval Form
//     </div>
//   ),
//   packageDisplay: (
//     <div style={{
//       backgroundColor: '#003366', 
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
//     }}>
//       Negotiation Calculation (PACKAGE WISE)
//     </div>
//   ),
//   agreementDisplay: (
//     <div style={{
//       backgroundColor: '#002244', 
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
//     }}>
//       Negotiation Calculation (AGREEMENT VALUE WISE)
//     </div>
//   ),

// };




// const selectedTemplate = templates.find(
//     (template) =>
//       template.displayType === modalContent ||
//       template.formtype === modalContent ||
//       template.pdfType === modalContent 
//   );
  
// console.log("selectedTemplate:", selectedTemplate);

// const modalTitle = selectedTemplate ? modalTitles[selectedTemplate.displayType] || "Form" : "Form";




//   return (



//     <div className="container mt-4">
//       <h2>Sales Templates</h2>
      
      
   
     

// <div className="row g-4 mt-5">
//   {templates.map((template) => (
//     <div className="col-12 col-sm-6 col-md-4" key={template.id}>
//       <div className="card shadow-sm">
//         <div className="card-body">
//           <h5 className="card-title text-primary">{template.title}</h5>
//           <p className="card-text">{template.description}</p>
//           <div className="d-flex gap-3 justify-content-start">
//             {template.id === 1 ? (
            
// <>
// {showPdfComponent && (
//     <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
//       <div id="pdf-content">
//         <VisitDownloadPDF />
//       </div>
//     </div>
//   )}

  
// <Button variant="primary w-100" onClick={handleDownloadVisitPdf}>
//   Download PDF
// </Button>

// </>



//             ) : (
//               template.buttons.map((button, index) => (
//                 <Button
//                   key={index}   
//                   variant="primary"
//                   style={{ 
//                     minWidth: "140px",  
//                     padding: "8px 16px", 
//                     fontWeight: "bold",
//                     margin: "5px"
//                   }}
//                   onClick={() =>
//                     handleOpenModal(
//                       button === "Form"
//                         ? template.formtype
//                         : button === "Display"
//                         ? template.displayType
//                         // : "PDF"
//                         : template.pdfType
//                     )
//                   }
//                 >
//                   {button}
//                 </Button>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>


     
//       <Modal show={openModal} onHide={handleCloseModal} size="xl">
//         <Modal.Header closeButton>
         
         
// <Modal.Title>{modalTitle}</Modal.Title>

//         </Modal.Header>
//         <Modal.Body>
         
//           {modalContent === "visit" && (
//             <Form>
//               <Row>
//                 <Col sm={6}>
//                   <Form.Group controlId="formProjectName">
//                     <Form.Label>Project Name</Form.Label>
//                     <Form.Control as="select" name="projectName" value={formData.projectName} onChange={() => {}}>
//                       <option>Select Project Name</option>
//                       <option>Sohan Enterprises</option>
//                       <option>Jatin</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group controlId="formWing">
//                     <Form.Label>Wing</Form.Label>
//                     <Form.Control as="select" name="wing" value={formData.wing} onChange={() => {}}>
//                       <option>Select Wing</option>
//                       <option>Wing A</option>
//                       <option>Wing B</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mt-3">
//                 <Col sm={6}>
//                   <Form.Group controlId="formFlatNo">
//                     <Form.Label>Flat No</Form.Label>
//                     <Form.Control as="select" name="flatNo" value={formData.flatNo} onChange={() => {}}>
//                       <option>Select Flat No</option>
//                       <option>101</option>
//                       <option>102</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group controlId="formType">
//                     <Form.Label>Type</Form.Label>
//                     <Form.Control as="select" name="type" value={formData.type} onChange={() => {}}>
//                       <option>Select Type</option>
//                       <option>Type A</option>
//                       <option>Type B</option>
//                     </Form.Control>
//                   </Form.Group>
//                 </Col>
//               </Row>
//               <Row className="mt-3">
               

// <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['DatePicker']}>
//         <DatePicker label="Date" />
//       </DemoContainer>
//     </LocalizationProvider>
//               </Row>
//             </Form>
//           )}

        
// {modalContent === "visitDisplay" && (
 
// <div id="table-content">
// <Table bordered className="visit-table">
//   <tbody>
//     <tr>
//       <td className="label-cell fw-bold">PROJECT NAME</td>
//       <td className="value-cell"></td> 
//       <td className="label-cell"></td>
//     </tr>

//     <tr>
//       <td className="label-cell fw-bold">MAHARERA NO</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Firm Name / PROJECT NAME / WING NO E / UNIT NO 208 - fn/P</td>
//       <td className="value-cell"></td> 
//       <td className="label-cell">Date :</td>
//     </tr>

//     <tr>
//       <td className="label-cell">UNIT No</td>
//       <td className="value-cell"></td> 
//       <td className="label-cell">WING:</td>
//     </tr>

//     <tr>
//       <td className="label-cell">CARPET</td>
//       <td className="value-cell"></td> 
//       <td className="label-cell">UNIT TYPE:</td>
//     </tr>

//     <tr>
//       <td className="label-cell">OPEN/ENCLOSED BALCONY AS SANCTIONED</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">TERRACE</td>
//       <td className="label-cell">ATT. TERRACE CARPET AREA</td>
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">SITOUT</td>
//       <td className="value-cell">	BALCONY AREA/ SITOUR CARPET AREA</td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">PODIUM GARDEN</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">PORCH</td>
//       <td className="value-cell">	PORCH AREA</td> 
//       <td className="value-cell"></td> 
//     </tr>

    
//     <tr>
//       <td className="label-cell">TOP TERRACE</td>
//       <td className="value-cell">TOP TERRACE CARPET AREA</td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">TOTAL USABLE AREA</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">Agreement value</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">STAMP DUTY (AS APPLICABLE)</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">REGISTRATION (AS APPLICABLE)</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">GST @%</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Grand Total</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//     <tr>
//       <td className="label-cell">This Cost Sheet is valid till (15 days from the date of booking)-</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Booking Cheque Favouring -</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Taxes Cheque Favouring -</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">STAMP DUTY AND REGISTRATION CHARGES TO BE PAID IMM</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Agreement should be registered within 21 days from the date of Ap</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Prior to agreement, the client should submit the loan sanction lette</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//     <tr>
//       <td className="label-cell">Execution of agreement will be subject to realisation of the payme</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">TDS (As Applicable)</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//     <tr>
//       <td className="label-cell">Government Charges/taxes are subject to change & would be ap</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//     <tr>
//       <td className="label-cell">Lumpsum Advance Maintenance Deposit shall be collected at the </td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//     <tr>
//       <td className="label-cell">Rates are subject to change without prior notice.</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Govt taxes to be paid by the buyer as per prevailing rates.</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>


//     <tr>
//       <td className="label-cell">The above mentioned cost is based on the tentative area, the exac</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">This is purely conceptual & not a legal offering Company reserves</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Source of Enquiry</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">Agent Agent/Broker Name:</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>

//     <tr>
//       <td className="label-cell">If any case, for any reason the unit is cancelled after registration, t</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">1st Applicant Name:</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell">Sign :</td> 
//     </tr>
    
//     <tr>
//       <td className="label-cell">Manager Name:</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell">Sign :</td> 
//     </tr>
//     <tr>
//       <td className="label-cell">  ***We are concerned about accuracy and timely payment, so customer has been made aware that while making payment be sure that you have made payment only</td>
//       <td className="value-cell"></td> 
//       <td className="value-cell"></td> 
//     </tr>
//   </tbody>
// </Table>
// <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDF}>
//         Download PDF
//       </Button>
     
//        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
//    <div id="pdf-content" style={{ fontSize: '28px' }}>
//       <VisitDownloadPDF />
//    </div>
// </div>

// </div>
// )}




// <Modal.Body>
  

  
// {modalContent === "rateApprovalDisplay" && (
//   <div style={{ maxWidth: '90%', margin: '0 auto' }}>
//     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
   
     
//     </div>
//     <div id="rate_pdf">
//     <h6 className="text-black text-center mb-2">RATE APPROVAL FORM (FOR OFFICE USE ONLY)</h6>
//   <Table bordered style={{ width: "100%" }}>
//                   <tbody>
//                     <tr>
//                       <td
//                         colSpan="4"
//                         style={{
//                           textAlign: "center",
//                           fontWeight: "bold",
//                           fontSize: "1rem",
//                         }}
//                       >
//                         PROJECT NAME
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         From :
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.from || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         Date :
//                       </td>
//                       <td style={{ width: "25%" ,fontWeight:"bold"}}>
//                         {projectData?.date || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         NAME 1:
//                       </td>
//                       <td style={{ width: "25%" ,fontWeight:"bold"}}>
//                         {projectData?.name1 || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold" }}>DOB:</td>
//                       <td style={{ width: "25%" }}>{projectData?.dob || ""}</td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>AGE:</td>
//                       <td style={{ width: "25%" }}>{projectData?.age || ""}</td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         PAN 1:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.pan1 || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         OCCUPATION:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.occupation || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         ADDRESS:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.address || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold" }}>
//                         CURRENT ADDRESS:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.currentAddress || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         ANNIVERSARY:
//                       </td>
//                       <td style={{ width: "25%" ,fontWeight:"bold"}}>
//                         {projectData?.anniversary || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         Email:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.email || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         MOBILE NO.:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.mobile || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         ALTERNATE MOBILE NO.:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.altMobile || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         WHATSAPP NO.:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.whatsapp || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan="4" style={{ height: "10px" }}></td>
//                     </tr>
//                     <tr>
//                       <td
//                         colSpan="4"
//                         style={{ fontWeight: "bold", fontSize: "1rem" ,fontWeight:"bold"}}
//                       >
//                         To
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         Company Name:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.companyName || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         Address:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.companyAddress || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>Sir</td>
//                     </tr>
//                     <tr>
//                       <td colSpan="4" style={{ fontSize: "0.9rem" ,fontWeight:"bold"}}>
//                         I/We hereby intend to book a flat in your project
//                         “PROJECT NAME” at “{projectData?.projectLocation || ""}”
//                       </td>
//                     </tr>
//                     <tr>
//                       <td
//                         colSpan="4"
//                         style={{
//                           textAlign: "center",
//                           fontWeight: "bold",
//                           fontSize: "1rem",
//                         }}
//                       >
//                         AGREEMENT DETAILS
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         BUILDING (Wing):
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.building || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         BASIC RATE:
//                       </td>
//                       <td style={{ width: "25%",fontWeight:"bold" }}>
//                         {projectData?.basicRate || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         FLAT NO.:
//                       </td>
//                       <td style={{ width: "25%" ,fontWeight:"bold"}}>
//                         {projectData?.flatNo || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         PREMIUM FACING:
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.premiumFacing || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         FACING(direction)
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         DISCOUNT
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         FLAT CARPET AREA(RERA Carpet Ar)
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         ADD DISC. REF. BY
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         ATT. TERRACE CARPET AREA
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         REMARK
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         BALCONY AREA/ SITOUR CARPET A
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         INFRASTRUCTURE
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         PORCH AREA
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}></td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         TOP TERRACE CARPET AREA
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         REMARK
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
//                         SUPER BUILTUP
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         TOTAL CONSIDERATION
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         BROKER NAME (IF ANY)
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         BROKERAGE AMOUNT
//                       </td>
//                       <td style={{ width: "25%",fontWeight:"bold" }}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
//                         SOURCE OF ENQUIRY
//                       </td>
//                       <td style={{ width: "25%" }}>
//                         {projectData?.type || ""}
//                       </td>
//                       <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}></td>
//                       <td style={{ width: "25%" ,fontWeight:"bold"}}>
//                         {projectData?.floorRise || ""}
//                       </td>
//                     </tr>
//                     <tr>
//   <td colSpan="4">
//     <Table bordered style={{ width: "100%" }}>
//       <tbody>
//         <tr>
//           <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>GM</td>
//           <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>VP</td>
//           <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>CRM</td>
//           <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>A/C Dept</td>
//           <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px" ,fontWeight:"bold"}}>MD.</td>
//         </tr>
//         <tr>
//           <td style={{padding:"18px"}}></td>
//           <td style={{padding:"8px"}}></td>
//           <td style={{padding:"8px"}}></td>
//           <td style={{padding:"8px"}}></td>
//           <td style={{padding:"8px"}}></td>

//         </tr>



//       </tbody>
//     </Table>
//   </td>
// </tr>




//                   </tbody>
//                 </Table>
//                 <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRate}>
//         Download PDF
//       </Button>

//       <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
//    <div id="pdf-content" style={{ fontSize: '28px' }}>
//       <RateDownloadPDF />
//    </div>
// </div>
// </div>

//   </div>
// )}






// {modalContent === "RateDisplay" && (
//   <Form>
//     <Row>
//       <Col sm={6}>
//         <Form.Group controlId="formProjectName">
//           <Form.Label>Project Name</Form.Label>
//           <Form.Control type="text" placeholder="Enter Project Name" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formWing">
//           <Form.Label>Wing</Form.Label>
//           <Form.Control type="text" placeholder="Enter Wing" />
//         </Form.Group>
//       </Col>
//     </Row>
//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formFlatNo">
//           <Form.Label>Flat No.</Form.Label>
//           <Form.Control type="text" placeholder="Enter Flat No." />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formType">
//           <Form.Label>Type</Form.Label>
//           <Form.Control type="text" placeholder="Enter Type" />
//         </Form.Group>
//       </Col>
//     </Row>
//     <Row className="mt-3">
      
//          <Col sm={6} style={{ display: 'flex', flexDirection: 'column', padding: 6 }}>
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DemoContainer components={['DatePicker']} style={{ width: '100%' }}>
          
//           <DatePicker
//   label="Date"
//   fullWidth
  
//   onChange={handleDateChange}
// />

//         </DemoContainer>
//       </LocalizationProvider>
//     </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>FACING (Direction)</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>


    


//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formDate">
//           <Form.Label>BROKER NAME (IF ANY)</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>BASIC RATE</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>

//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formDate">
//           <Form.Label>PREMIUM FACING</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>FLOOR RISE</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>

//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formDate">
//           <Form.Label>DISCOUNT</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>ADD DISC. REF. BY</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>

//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formDate">
//           <Form.Label>REMARK</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>INFRASTRUCTURE</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>

//     <Row className="mt-3">
//       <Col sm={6}>
//         <Form.Group controlId="formDate">
//           <Form.Label>TOTAL CONSIDERATION</Form.Label>
//           <Form.Control type="text" />
//         </Form.Group>
//       </Col>
//       <Col sm={6}>
//         <Form.Group controlId="formFacing">
//           <Form.Label>BROKERAGE AMOUNT</Form.Label>
//           <Form.Control type="text" placeholder="Enter Facing Direction" />
//         </Form.Group>
//       </Col>
//     </Row>
//   </Form>
// )}




// {modalContent === "packageDisplay" && (
//   <>
    
   
//      <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
     
//       {/* Table Heading with Background Color */}
//       <div style={{ backgroundColor: '#007BFF', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
//         <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
//           Negotiation Calculation (Package Wise)
//         </Typography>
//       </div>
//       <div id="package_pdf">
//       <Table bordered hover responsive>
//         <TableHead style={{ backgroundColor: '#0056b3', color: 'white' }}>
//           <TableRow>
            
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[ 
//             { label: 'Package' },
//             { label: 'Registration' },
//             { label: 'Balance' },
//             { label: 'Tax Cut' },
//             { label: 'Balance' },
//             { label: 'Agreement Value' },
//             { label: 'Stamp Duty' },
//             { label: 'Registration Charges' },
//             { label: 'GST' },
//             { label: 'Total' },
//             { label: 'Carpet Area' },
//             { label: 'Saleable Area' },
//             { label: 'Per Sq. Ft' },
//           ].map((row, index) => (
//             <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#e0efff' }}>
//               <TableCell style={{ width: '50%' }}>{row.label}</TableCell>
//               <TableCell style={{ width: '50%' }}></TableCell> {/* Empty Column */}
//             </TableRow>
//           ))}

// <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRatePackage}>
//         Download PDF
//       </Button>
//         </TableBody>
//       </Table>
//       </div>

//     </TableContainer>
//   </>
// )}

// {modalContent === "Package" && (
//     <Form>
//       <Row>
//         <Col sm={6}>
//           <Form.Group controlId="formPackage">
//             <Form.Label>Package</Form.Label>
//             <Form.Control type="text" placeholder="Enter Package Details" />
//           </Form.Group>
//         </Col>
//         <Col sm={6}>
//           <Form.Group controlId="formCarpetArea">
//             <Form.Label>Carpet Area</Form.Label>
//             <Form.Control type="number" placeholder="Enter Carpet Area" />
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   )} 

//   {modalContent === "Agreement" && (
//     <Form>
//       <Row>
//         <Col sm={6}>
//           <Form.Group controlId="formAgreementValue">
//             <Form.Label>Agreement Value</Form.Label>
//             <Form.Control type="number" placeholder="Enter Agreement Value" />
//           </Form.Group>
//         </Col>
//         <Col sm={6}>
//           <Form.Group controlId="formAgreementCarpetArea">
//             <Form.Label>Agreement Carpet Area</Form.Label>
//             <Form.Control type="number" placeholder="Enter Carpet Area" />
//           </Form.Group>
//         </Col>
//       </Row>
//     </Form>
//   )}

// {modalContent === "agreementDisplay" && (
   
//     <div id="agreement_pdf">
//     <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
     
//     <div style={{ backgroundColor: '#007BFF', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
//       <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
//         Negotiation Calculation (Agreement Wise)
//       </Typography>
//     </div>
//     <Table bordered hover responsive>
//       <TableHead style={{ backgroundColor: '#0056b3', color: 'white' }}>
//         <TableRow>
          
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {[ 
//           { label: 'Package' },
//           { label: 'Registration' },
//           { label: 'Balance' },
//           { label: 'Tax Cut' },
//           { label: 'Balance' },
//           { label: 'Agreement Value' },
//           { label: 'Stamp Duty' },
//           { label: 'Registration Charges' },
//           { label: 'GST' },
//           { label: 'Total' },
//           { label: 'Carpet Area' },
//           { label: ' Area' },
//           { label: 'Per Sq. Ft' },
//         ].map((row, index) => (
//           <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#e0efff' }}>
//             <TableCell style={{ width: '50%' }}>{row.label}</TableCell>
//             <TableCell style={{ width: '50%' }}></TableCell> {/* Empty Column */}
//           </TableRow>
//         ))}

// <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRateAgreement}>
//         Download PDF
//       </Button>
//       </TableBody>
//     </Table>
//   </TableContainer>


//   </div>
//   )}

// </Modal.Body>


//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cancel
//           </Button>
//           <Button className="btn btn-primary" variant="" onClick={handleCloseModal}>
//            Submit
//           </Button>
      
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Template;

// ----------------------------------------------------------------------------------------------


import React, { useState,useRef,useEffect } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { FaFileDownload } from 'react-icons/fa';

import { useReactToPrint } from "react-to-print";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Grid, Box } from '@mui/material';

import VisitDownloadPDF from "./VisitDownloadPDF";
import RateDownloadPDF from "./RateDownloadPDF";
import AgreementDownload from "./AgreementDownload";
import PackageDownloadPdf from "./PackageDownloadPdf";
import Constants from "../Constants";


const templates = [

  {
    id: 1,
    title: (
      <div style={{ 
        backgroundColor: Constants.primaryColor, 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1px'
      }}>
        At The Time of Visit
      </div>
    ),
    description: "Generate payment details and schedule document for site visits.",
    formtype: "visit",
    displayType: "visitDisplay",
    buttons: ["Form", "Display", "PDF"],
  }
, 
  {
    id: 2,
    title: (
      <div style={{ 
        backgroundColor: Constants.primaryColor,
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1px'
      }}>
        At The Time of Booking
      </div>
    ),
    description: "Generate booking-related documentation and payment details.",
    formtype: "visit",
    displayType: "visitDisplay",
    pdfType:"visitPdf",
    buttons: ["Form", "Display"],
  }
,  
 

  {
    id: 3,
    title: (
      <div style={{ 
        backgroundColor: Constants.primaryColor,
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1px'
      }}>
        Rate Approval Form
      </div>
    ),
    description: "Generate rate approval documentation for property transactions.",
    formtype: "RateDisplay",
    displayType: "rateApprovalDisplay",
    buttons: ["Form", "Display"],
  }
,  
  {
    id: 4,
    title: (
      <div style={{ 
        backgroundColor: Constants.primaryColor,
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1px'
      }}>
        Negotiation Calculation (PACKAGE WISE)
      </div>
    ),
    description: "Generate package-wise negotiation calculations and agreements.",
    formtype: "Package",
    displayType: "packageDisplay",
    buttons: ["Form", "Display"],
  },
  
 
  {
    id: 5,
    title: (
      <div style={{ 
        backgroundColor:Constants.primaryColor,
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '20px', 
        textAlign: 'center',
        color: 'white', 
        fontWeight: 'bold',
        fontSize: '18px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        letterSpacing: '1px'
      }}>
        Negotiation Calculation (AGREEMENT VALUE WISE)
      </div>
    ),
    description: "Generate agreement value-based negotiation calculations.",
    formtype: "Agreement",
    displayType: "agreementDisplay",
    buttons: ["Form", "Display"],
  }
  
];

const projectData = {};

const Template = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showPdfComponent, setShowPdfComponent] = useState(false);

  const [formData, setFormData] = useState({
    projectName: "",
    wing: "",
    flatNo: "",
    type: "",
    date: "",
  });

  
  const displayRef = useRef();


  const componentRef = useRef(); 


const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforePrint: () => console.log("🖨️ Printing started..."),
    onAfterPrint: () => console.log("✅ Printing completed."),
    onPrintError: (error) => console.error("❌ Printing error:", error),
    
  });

  
const handleOpenModal = (content) => {

    console.log("Opening modal with content:", content);
  
    setModalContent(content);
    console.log("Opening modal with content:", content);
    setOpenModal(true);
  
    setTimeout(() => {
      console.log("🟢 Checking modalContent:", modalContent);
  

    if (modalContent === content) {
        console.log("🟢 Modal is fully rendered, generating PDF...");
        generatePDF();
      } else {
        console.log("⏳ Modal not ready yet, retrying...");
        setTimeout(() => generatePDF(), 500);
      }
    }, 1000); 
  };
  
  



const handleGeneratePDF = () => {
    // const content = document.getElementById('pdf-content');
     const content = document.getElementById('table-content');
      const downloadBtn = document.getElementById('download-pdf-button');
        if (downloadBtn) downloadBtn.style.display = 'none';
    if (!content) return;

    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save('VisitDetails.pdf');
    });
  };
  const handleGeneratePDFRate = () => {
    const content = document.getElementById('rate_pdf');
    if (!content) {
      alert('No content to generate PDF');
      return;
    }
   
    const pdfButton = document.getElementById('download-pdf-button');
    if (pdfButton) {
      pdfButton.style.display = 'none';
    }
  
    html2canvas(content, { scale: 2 }).then((canvas) => {
     
      if (pdfButton) {
        pdfButton.style.display = 'block';
      }
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
   
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
   
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
    
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("RateApproval.pdf");
    });
  };

  const handleGeneratePDFRatePackage = () => {
    const content = document.getElementById('package_pdf');
    if (!content) {
      alert('No content to generate PDF');
      return;
    }
    
    const pdfButton = document.getElementById('download-pdf-button');
    if (pdfButton) {
      pdfButton.style.display = 'none';
    }
    
    html2canvas(content, { scale: 2 }).then((canvas) => {
     
      if (pdfButton) {
        pdfButton.style.display = 'block';
      }
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
 
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
    
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
   
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Package.pdf");
    });
  };
  
  const handleGeneratePDFRateAgreement = () => {
    const content = document.getElementById('agreement_pdf');
    if (!content) {
      alert('No content to generate PDF');
      return;
    }
    
    const pdfButton = document.getElementById('download-pdf-button');
    if (pdfButton) {
      pdfButton.style.display = 'none';
    }
    
    html2canvas(content, { scale: 2 }).then((canvas) => {
     
      if (pdfButton) {
        pdfButton.style.display = 'block';
      }
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
 
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
    
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
   
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Agreement.pdf");
    });
  };


const contentRef = useRef(null);


const generatePDF = useReactToPrint({
    content: () => {
      console.log("🟢 Checking contentRef in generatePDF:", contentRef.current);
      
      if (modalContent === content) {
        console.log("🟢 Modal is fully rendered, generating PDF...");
        generatePDF();
      } 
    
      if (!contentRef.current || !contentRef.current.innerHTML.trim()) {
        console.error("❌ Content not ready, delaying print...");
        setTimeout(generatePDF, 500); 
        return null;
      }
  
      return contentRef.current;
    },
    onAfterPrint: () => console.log("✅ PDF successfully generated."),
    onPrintError: (error) => console.error("❌ Print error:", error),
  });
  

  

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalContent(null);
  };

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      date: newDate,
    });
  };




  const handleDownloadRatePdf = () => {
    const input = document.getElementById("rate_pdf");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("RateApprovalForm.pdf");
    });
  };

const handleDownloadVisitPdf = async () => {
    setShowPdfComponent(true);  
  
    setTimeout(async () => {
      const input = document.getElementById("pdf-content");
  
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a3");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("VisitForm.pdf");
  
      setShowPdfComponent(false); 
    }, 100);  
  };
  





const modalTitles = {
  visit: (
    <div style={{
      backgroundColor: Constants.primaryColor,
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
    }}>
      Booking Form
    </div>
  ),
  visitDisplay: (
    <div style={{
      backgroundColor: Constants.primaryColor, 
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
    }}>
      At The Time of Booking - Display
    </div>
  ),
  rateApprovalDisplay: (
    <div style={{
      backgroundColor: Constants.primaryColor,
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
    }}>
      Rate Approval Form
    </div>
  ),
  packageDisplay: (
    <div style={{
      backgroundColor: Constants.primaryColor,
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
    }}>
      Negotiation Calculation (PACKAGE WISE)
    </div>
  ),
  agreementDisplay: (
    <div style={{
      backgroundColor: Constants.primaryColor,
      padding: '10px',
      borderRadius: '4px',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      textAlign: 'center',
      width: '100%',
    }}>
      Negotiation Calculation (AGREEMENT VALUE WISE)
    </div>
  ),

};




const selectedTemplate = templates.find(
    (template) =>
      template.displayType === modalContent ||
      template.formtype === modalContent ||
      template.pdfType === modalContent 
  );
  
console.log("selectedTemplate:", selectedTemplate);

const modalTitle = selectedTemplate ? modalTitles[selectedTemplate.displayType] || "Form" : "Form";




const handleBookingPDF = () => {
  const doc = new jsPDF();
  doc.text("Booking Details", 10, 10);
 
  doc.save("booking.pdf");
};


const handleAgreementPDF = async () => {
  setShowPdfComponent(true);

  setTimeout(async () => {
    const input = document.getElementById("agreement_pdf");

    if (input) {
      const canvas = await html2canvas(input, {
        scale: 3, 
        useCORS: true, 
        backgroundColor: '#fff', 
      });

      const imgData = canvas.toDataURL("image/png");

      
      const pdf = new jsPDF("p", "mm", "a3");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

     
      const marginX = 10;
      const marginY = 10;
      const contentWidth = pdfWidth - marginX * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", marginX, marginY, contentWidth, contentHeight);
      pdf.save("AgreementDetails.pdf");
    }

    setShowPdfComponent(false);
  }, 300); 
};



const handleGeneratePDFPackage = async () => {
  console.log("modalContent:", modalContent);  

  if (modalContent !== "packageDisplay") {
    console.error("Content is not ready!");
    return; 
  }

  const input = document.getElementById("package_pdf");
  console.log(input);  

  if (!input) {
    console.error("Element #package_pdf is not found!");
    return;
  }

  setShowPdfComponent(true);

  setTimeout(async () => {
    const canvas = await html2canvas(input, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#fff',
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const marginX = 10;
    const marginY = 10;
    const contentWidth = pdfWidth - marginX * 2;
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", marginX, marginY, contentWidth, contentHeight);
    pdf.save("PackageDetails.pdf");

    setShowPdfComponent(false);
  }, 300);
};




  return (



    <div className="container mt-4">
      <h5>Sales Templates</h5>
      
      
{/*    
<div className="d-flex m-2">
  <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", padding: "6px" }}>
  <Button
        variant="contained"
        sx={{
          background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
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
        onClick={handleDownloadVisitPdf}
      >
        <FaFileDownload size={18} />
        Visit
      </Button>

    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
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
      onClick={handleBookingPDF}
    >
      <FaFileDownload size={18} />
      Booking
    </Button>

    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
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
      onClick={handleDownloadRatePdf}
    >
      <FaFileDownload size={18} />
      Rate Approval
    </Button>

    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
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
      onClick={handleGeneratePDFPackage}
    >
      <FaFileDownload size={18} />
      Package
    </Button>

    <Button
      variant="contained"
      sx={{
        background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
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
      onClick={handleAgreementPDF}
    >
      <FaFileDownload size={18} />
      Agreement
    </Button>
  </div>
  </div> */}

<div className="row g-4 mt-5">
  {templates.map((template) => (
    <div className="col-12 col-sm-6 col-md-4" key={template.id}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">{template.title}</h5>
          <p className="card-text">{template.description}</p>
          <div className="d-flex gap-3 justify-content-start">
            {template.id === 1 ? (
            
<>
{showPdfComponent && (
    <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
      <div id="pdf-content">
        <VisitDownloadPDF />
      </div>
    </div>
  )}

{showPdfComponent && (
  <AgreementDownload modalContent="agreementDisplay" />
)}

{showPdfComponent && modalContent === "packageDisplay" && (
  <PackageDownloadPdf handleGeneratePDFPackage={handleGeneratePDFPackage} />
)}

  
<Button variant="primary w-100" onClick={handleDownloadVisitPdf}>
  Download PDF
</Button>

</>



            ) : (
              template.buttons.map((button, index) => (
                <Button
                  key={index}   
                  variant="primary"
                  style={{ 
                    minWidth: "140px",  
                    padding: "8px 16px", 
                    fontWeight: "bold",
                    margin: "5px"
                  }}
                  onClick={() =>
                    handleOpenModal(
                      button === "Form"
                        ? template.formtype
                        : button === "Display"
                        ? template.displayType
                        // : "PDF"
                        : template.pdfType
                    )
                  }
                >
                  {button}
                </Button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


     
      <Modal show={openModal} onHide={handleCloseModal} size="xl">
        <Modal.Header closeButton>
         
         
<Modal.Title>{modalTitle}</Modal.Title>

        </Modal.Header>
        <Modal.Body>
         
          {modalContent === "visit" && (
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId="formProjectName">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control as="select" name="projectName" value={formData.projectName} onChange={() => {}}>
                      <option>Select Project Name</option>
                      <option>Sohan Enterprises</option>
                      <option>Jatin</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formWing">
                    <Form.Label>Wing</Form.Label>
                    <Form.Control as="select" name="wing" value={formData.wing} onChange={() => {}}>
                      <option>Select Wing</option>
                      <option>Wing A</option>
                      <option>Wing B</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm={6}>
                  <Form.Group controlId="formFlatNo">
                    <Form.Label>Flat No</Form.Label>
                    <Form.Control as="select" name="flatNo" value={formData.flatNo} onChange={() => {}}>
                      <option>Select Flat No</option>
                      <option>101</option>
                      <option>102</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="formType">
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name="type" value={formData.type} onChange={() => {}}>
                      <option>Select Type</option>
                      <option>Type A</option>
                      <option>Type B</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3">
               

<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Date" />
      </DemoContainer>
    </LocalizationProvider>
              </Row>
            </Form>
          )}

        
{modalContent === "visitDisplay" && (
 
<div id="table-content">
<Table bordered className="visit-table">
  <tbody>
    <tr>
      <td className="label-cell fw-bold">PROJECT NAME</td>
      <td className="value-cell"></td> 
      <td className="label-cell"></td>
    </tr>

    <tr>
      <td className="label-cell fw-bold">MAHARERA NO</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Firm Name / PROJECT NAME / WING NO E / UNIT NO 208 - fn/P</td>
      <td className="value-cell"></td> 
      <td className="label-cell">Date :</td>
    </tr>

    <tr>
      <td className="label-cell">UNIT No</td>
      <td className="value-cell"></td> 
      <td className="label-cell">WING:</td>
    </tr>

    <tr>
      <td className="label-cell">CARPET</td>
      <td className="value-cell"></td> 
      <td className="label-cell">UNIT TYPE:</td>
    </tr>

    <tr>
      <td className="label-cell">OPEN/ENCLOSED BALCONY AS SANCTIONED</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">TERRACE</td>
      <td className="label-cell">ATT. TERRACE CARPET AREA</td>
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">SITOUT</td>
      <td className="value-cell">	BALCONY AREA/ SITOUR CARPET AREA</td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">PODIUM GARDEN</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">PORCH</td>
      <td className="value-cell">	PORCH AREA</td> 
      <td className="value-cell"></td> 
    </tr>

    
    <tr>
      <td className="label-cell">TOP TERRACE</td>
      <td className="value-cell">TOP TERRACE CARPET AREA</td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">TOTAL USABLE AREA</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">Agreement value</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">STAMP DUTY (AS APPLICABLE)</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">REGISTRATION (AS APPLICABLE)</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">GST @%</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Grand Total</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    <tr>
      <td className="label-cell">This Cost Sheet is valid till (15 days from the date of booking)-</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Booking Cheque Favouring -</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Taxes Cheque Favouring -</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">STAMP DUTY AND REGISTRATION CHARGES TO BE PAID IMM</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Agreement should be registered within 21 days from the date of Ap</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Prior to agreement, the client should submit the loan sanction lette</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    <tr>
      <td className="label-cell">Execution of agreement will be subject to realisation of the payme</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">TDS (As Applicable)</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    <tr>
      <td className="label-cell">Government Charges/taxes are subject to change & would be ap</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    <tr>
      <td className="label-cell">Lumpsum Advance Maintenance Deposit shall be collected at the </td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    <tr>
      <td className="label-cell">Rates are subject to change without prior notice.</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Govt taxes to be paid by the buyer as per prevailing rates.</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>


    <tr>
      <td className="label-cell">The above mentioned cost is based on the tentative area, the exac</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">This is purely conceptual & not a legal offering Company reserves</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Source of Enquiry</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">Agent Agent/Broker Name:</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>

    <tr>
      <td className="label-cell">If any case, for any reason the unit is cancelled after registration, t</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
    
    <tr>
      <td className="label-cell">1st Applicant Name:</td>
      <td className="value-cell"></td> 
      <td className="value-cell">Sign :</td> 
    </tr>
    
    <tr>
      <td className="label-cell">Manager Name:</td>
      <td className="value-cell"></td> 
      <td className="value-cell">Sign :</td> 
    </tr>
    <tr>
      <td className="label-cell">  ***We are concerned about accuracy and timely payment, so customer has been made aware that while making payment be sure that you have made payment only</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
  </tbody>
</Table>
<Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDF}>
        Download PDF
      </Button>
       {/* Hidden Component for PDF generation */}
       <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
   <div id="pdf-content" style={{ fontSize: '28px' }}>
      <VisitDownloadPDF />
   </div>
</div>

</div>
)}




<Modal.Body>
  

  
{modalContent === "rateApprovalDisplay" && (
  <div style={{ maxWidth: '90%', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
   
     
    </div>
    <div id="rate_pdf">
    <h6 className="text-black text-center mb-2">RATE APPROVAL FORM (FOR OFFICE USE ONLY)</h6>
  <Table bordered style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        PROJECT NAME
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        From :
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.from || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        Date :
                      </td>
                      <td style={{ width: "25%" ,fontWeight:"bold"}}>
                        {projectData?.date || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        NAME 1:
                      </td>
                      <td style={{ width: "25%" ,fontWeight:"bold"}}>
                        {projectData?.name1 || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold" }}>DOB:</td>
                      <td style={{ width: "25%" }}>{projectData?.dob || ""}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>AGE:</td>
                      <td style={{ width: "25%" }}>{projectData?.age || ""}</td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        PAN 1:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.pan1 || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        OCCUPATION:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.occupation || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        ADDRESS:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.address || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold" }}>
                        CURRENT ADDRESS:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.currentAddress || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        ANNIVERSARY:
                      </td>
                      <td style={{ width: "25%" ,fontWeight:"bold"}}>
                        {projectData?.anniversary || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        Email:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.email || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        MOBILE NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.mobile || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        ALTERNATE MOBILE NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.altMobile || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        WHATSAPP NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.whatsapp || ""}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ height: "10px" }}></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="4"
                        style={{ fontWeight: "bold", fontSize: "1rem" }}
                      >
                        To
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        Company Name:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.companyName || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        Address:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.companyAddress || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>Sir</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ fontSize: "0.9rem" ,fontWeight:"bold"}}>
                        I/We hereby intend to book a flat in your project
                        “PROJECT NAME” at “{projectData?.projectLocation || ""}”
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        AGREEMENT DETAILS
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        BUILDING (Wing):
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.building || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        BASIC RATE:
                      </td>
                      <td style={{ width: "25%",fontWeight:"bold" }}>
                        {projectData?.basicRate || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        FLAT NO.:
                      </td>
                      <td style={{ width: "25%" ,fontWeight:"bold"}}>
                        {projectData?.flatNo || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        PREMIUM FACING:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.premiumFacing || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        FACING(direction)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        DISCOUNT
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        FLAT CARPET AREA(RERA Carpet Ar)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        ADD DISC. REF. BY
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        ATT. TERRACE CARPET AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        REMARK
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        BALCONY AREA/ SITOUR CARPET A
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        INFRASTRUCTURE
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        PORCH AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}></td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        TOP TERRACE CARPET AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        REMARK
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%",fontWeight:"bold" }}>
                        SUPER BUILTUP
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        TOTAL CONSIDERATION
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        BROKER NAME (IF ANY)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        BROKERAGE AMOUNT
                      </td>
                      <td style={{ width: "25%",fontWeight:"bold" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}>
                        SOURCE OF ENQUIRY
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" ,fontWeight:"bold"}}></td>
                      <td style={{ width: "25%" ,fontWeight:"bold"}}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
  <td colSpan="4">
    <Table bordered style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>GM</td>
          <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>VP</td>
          <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>CRM</td>
          <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px",fontWeight:"bold" }}>A/C Dept</td>
          <td style={{ width: "20%", fontSize: "0.9rem", textAlign: "center", padding: "8px" ,fontWeight:"bold"}}>MD.</td>
        </tr>
        <tr>
          <td style={{padding:"18px"}}></td>
          <td style={{padding:"8px"}}></td>
          <td style={{padding:"8px"}}></td>
          <td style={{padding:"8px"}}></td>
          <td style={{padding:"8px"}}></td>

        </tr>



      </tbody>
    </Table>
  </td>
</tr>




                  </tbody>
                </Table>
                <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRate}>
        Download PDF
      </Button>

      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
   <div id="pdf-content" style={{ fontSize: '28px' }}>
      <RateDownloadPDF />
   </div>
</div>
</div>

  </div>
)}






{modalContent === "RateDisplay" && (
  <Form>
    <Row>
      <Col sm={6}>
        <Form.Group controlId="formProjectName">
          <Form.Label>Project Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Project Name" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formWing">
          <Form.Label>Wing</Form.Label>
          <Form.Control type="text" placeholder="Enter Wing" />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formFlatNo">
          <Form.Label>Flat No.</Form.Label>
          <Form.Control type="text" placeholder="Enter Flat No." />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formType">
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" placeholder="Enter Type" />
        </Form.Group>
      </Col>
    </Row>
    <Row className="mt-3">
      
         <Col sm={6} style={{ display: 'flex', flexDirection: 'column', padding: 6 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']} style={{ width: '100%' }}>
          
          <DatePicker
  label="Date"
  fullWidth
  
  onChange={handleDateChange}
/>

        </DemoContainer>
      </LocalizationProvider>
    </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>FACING (Direction)</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>


    


    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formDate">
          <Form.Label>BROKER NAME (IF ANY)</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>BASIC RATE</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formDate">
          <Form.Label>PREMIUM FACING</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>FLOOR RISE</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formDate">
          <Form.Label>DISCOUNT</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>ADD DISC. REF. BY</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formDate">
          <Form.Label>REMARK</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>INFRASTRUCTURE</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>

    <Row className="mt-3">
      <Col sm={6}>
        <Form.Group controlId="formDate">
          <Form.Label>TOTAL CONSIDERATION</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Col>
      <Col sm={6}>
        <Form.Group controlId="formFacing">
          <Form.Label>BROKERAGE AMOUNT</Form.Label>
          <Form.Control type="text" placeholder="Enter Facing Direction" />
        </Form.Group>
      </Col>
    </Row>
  </Form>
)}




{modalContent === "packageDisplay" && (
  <>
    
   
     <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
     
      {/* Table Heading with Background Color */}
      <div style={{ backgroundColor: '#007BFF', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
        <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
          Negotiation Calculation (Package Wise)
        </Typography>
      </div>
      <div id="package_pdf">
      <Table bordered hover responsive>
        <TableHead style={{ backgroundColor: '#0056b3', color: 'white' }}>
          <TableRow>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {[ 
            { label: 'Package' },
            { label: 'Registration' },
            { label: 'Balance' },
            { label: 'Tax Cut' },
            { label: 'Balance' },
            { label: 'Agreement Value' },
            { label: 'Stamp Duty' },
            { label: 'Registration Charges' },
            { label: 'GST' },
            { label: 'Total' },
            { label: 'Carpet Area' },
            { label: 'Saleable Area' },
            { label: 'Per Sq. Ft' },
          ].map((row, index) => (
            <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#e0efff' }}>
              <TableCell style={{ width: '50%' }}>{row.label}</TableCell>
              <TableCell style={{ width: '50%' }}></TableCell> {/* Empty Column */}
            </TableRow>
          ))}

<Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRatePackage}>
        Download PDF
      </Button>
        </TableBody>
      </Table>
      </div>

    </TableContainer>
  </>
)}

{modalContent === "Package" && (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Group controlId="formPackage">
            <Form.Label>Package</Form.Label>
            <Form.Control type="text" placeholder="Enter Package Details" />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="formCarpetArea">
            <Form.Label>Carpet Area</Form.Label>
            <Form.Control type="number" placeholder="Enter Carpet Area" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )} 

  {modalContent === "Agreement" && (
    <Form>
      <Row>
        <Col sm={6}>
          <Form.Group controlId="formAgreementValue">
            <Form.Label>Agreement Value</Form.Label>
            <Form.Control type="number" placeholder="Enter Agreement Value" />
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group controlId="formAgreementCarpetArea">
            <Form.Label>Agreement Carpet Area</Form.Label>
            <Form.Control type="number" placeholder="Enter Carpet Area" />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  )}

{modalContent === "agreementDisplay" && (
   
    <div id="agreement_pdf">
    <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
     
    <div style={{ backgroundColor: '#007BFF', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
      <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
        Negotiation Calculation (Agreement Wise)
      </Typography>
    </div>
    <Table bordered hover responsive>
      <TableHead style={{ backgroundColor: '#0056b3', color: 'white' }}>
        <TableRow>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {[ 
          { label: 'Package' },
          { label: 'Registration' },
          { label: 'Balance' },
          { label: 'Tax Cut' },
          { label: 'Balance' },
          { label: 'Agreement Value' },
          { label: 'Stamp Duty' },
          { label: 'Registration Charges' },
          { label: 'GST' },
          { label: 'Total' },
          { label: 'Carpet Area' },
          { label: ' Area' },
          { label: 'Per Sq. Ft' },
        ].map((row, index) => (
          <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#e0efff' }}>
            <TableCell style={{ width: '50%' }}>{row.label}</TableCell>
            <TableCell style={{ width: '50%' }}></TableCell> 
          </TableRow>
        ))}

<Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRateAgreement}>
        Download PDF
      </Button>
      </TableBody>
    </Table>
  </TableContainer>


  </div>
  )}

</Modal.Body>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button className="btn btn-primary" variant="" onClick={handleCloseModal}>
           Submit
          </Button>
         
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Template;