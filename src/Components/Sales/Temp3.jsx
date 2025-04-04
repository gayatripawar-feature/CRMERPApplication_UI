import React, { useState,useRef,useEffect } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import {TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Typography } from '@mui/material';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import {  FaFileDownload } from "react-icons/fa";
// import { useReactToPrint } from "react-to-print";
import { useReactToPrint } from "react-to-print";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';



import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, Grid, Box } from '@mui/material';



import autoTable from "jspdf-autotable";

const templates = [

  {
    id: 1,
    title: (
      <div style={{ 
        backgroundColor: '#0056b3', 
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
        backgroundColor: '#0056b3', 
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
    buttons: ["Form", "Display", "PDF"],
  }
,  
 

  {
    id: 3,
    title: (
      <div style={{ 
        backgroundColor: '#0056b3', 
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
    buttons: ["Form", "Display", "PDF"],
  }
,  
 
  {
    id: 4,
    title: (
      <div style={{ 
        backgroundColor: '#0056b3', 
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
    buttons: ["Form", "Display", "PDF"],
  },
  
 
 
  {
    id: 5,
    title: (
      <div style={{ 
        backgroundColor: '#0056b3', 
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
    buttons: ["Form", "Display", "PDF"],
  }
  
];

const projectData = {};

const Template = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
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
    const content = document.getElementById('table-content');
  
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
      
      // Calculate the dimensions for the image in the PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add extra pages if necessary
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Booking.pdf");
    });
  };

  const handleGeneratePDFRate = () => {
    const content = document.getElementById('rate_pdf');
    if (!content) {
      alert('No content to generate PDF');
      return;
    }
    // Temporarily hide the Download PDF button
    const pdfButton = document.getElementById('download-pdf-button');
    if (pdfButton) {
      pdfButton.style.display = 'none';
    }
    // Capture the content as an image using html2canvas
    html2canvas(content, { scale: 2 }).then((canvas) => {
      // Restore the button visibility
      if (pdfButton) {
        pdfButton.style.display = 'block';
      }
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate the dimensions for the image in the PDF
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;
      
      // Add the first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
      
      // Add extra pages if necessary
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save("Rate.pdf");
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
      // Wait for content to be ready
      if (!contentRef.current || !contentRef.current.innerHTML.trim()) {
        console.error("❌ Content not ready, delaying print...");
        setTimeout(generatePDF, 500); // Wait 500ms and retry
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












const modalTitles = {
  visit: (
    <div style={{
      backgroundColor: '#007bff', // Bluish color
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
      backgroundColor: '#0056b3', // Bluish color
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
      backgroundColor: '#004085', // Bluish color
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
      backgroundColor: '#003366', // Bluish color
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
      backgroundColor: '#002244', // Bluish color
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
//   PDF: (
//     <div style={{
//       backgroundColor: '#1d3e6a', // Bluish color
//       padding: '10px',
//       borderRadius: '4px',
//       color: 'white',
//       fontWeight: 'bold',
//       fontSize: '16px',
//       textAlign: 'center',
//       width: '100%',
     
//     }}
//     onClick={() => {
//       console.log('Button clicked');  
//       generatePDF();  // Calling the function to generate PDF
//     }}
    
//     >
//     </div>
//   ),
};


// const selectedTemplate = templates.find(
//   (template) => template.displayType === modalContent || template.formtype === modalContent || template.pdfType === modalContent
  

// );

const selectedTemplate = templates.find(
    (template) =>
      template.displayType === modalContent ||
      template.formtype === modalContent ||
      template.pdfType === modalContent // ✅ Now it checks for pdType
  );
  
console.log("selectedTemplate:", selectedTemplate);

const modalTitle = selectedTemplate ? modalTitles[selectedTemplate.displayType] || "Form" : "Form";




  return (



    <div className="container mt-4">
      <h2>Sales Templates</h2>
      
      
   <div className="d-flex gap-3">
   <Button
  variant="contained"
  style={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <FaFileDownload size={18} />
  Visit -  PDF
</Button>

<Button
  variant="contained"
  id="download-pdf-button"
  style={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
  onClick={(e) => {
    console.log("Button Pressed!", e);
    handleGeneratePDF();
  }}
>
  <FaFileDownload size={18} />
  Booking - PDF
</Button>

<Button
  variant="contained"
  style={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
  onClick={handleGeneratePDFRate}
>
  <FaFileDownload size={18} />
  Rate Approval - PDF
</Button>

<Button
  variant="contained"
  style={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <FaFileDownload size={18} />
  Package Negotiation PDF
</Button>

  
<Button
  variant="contained"
  style={{
    background: "linear-gradient(45deg, rgb(139, 107, 255), rgb(178, 83, 255))",
    color: "white",
    fontWeight: "bold",
    textTransform: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
  onClick={handleGeneratePDFRatePackage}
>
  <FaFileDownload size={18} />
 Agreement Negotiation PDF
</Button>



   </div>


<div className="row g-4 mt-5">
  {templates.map((template) => (
    <div className="col-12 col-sm-6 col-md-4" key={template.id}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title text-primary">{template.title}</h5>
          <p className="card-text">{template.description}</p>
          <div className="d-flex gap-3 justify-content-start">
            {template.id === 1 ? (
             
 <Button variant="primary" onClick={() => handleOpenModal("PDF")}>
      Download PDF
    </Button>

            ) : (
              template.buttons.map((button, index) => (
                <Button
                  key={index}   
                  variant="primary"
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
<Table bordered className="visit-table" >
  <tbody>
    <tr>
      <td className="label-cell">PROJECT NAME</td>
      <td className="value-cell"></td> 
      <td className="label-cell"></td>
    </tr>

    <tr>
      <td className="label-cell">MAHARERA NO</td>
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
      <td className="label-cell">***We are concerned about accuracy and timely payment, so custo Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</td>
      <td className="value-cell"></td> 
      <td className="value-cell"></td> 
    </tr>
  </tbody>
</Table>
<Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDF}>
        Download PDF
      </Button>
</div>
)}



<Modal.Body>
  

  
{modalContent === "rateApprovalDisplay" && (
  <div style={{ maxWidth: '80%', margin: '0 auto' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
      <h6>RATE APPROVAL FORM (FOR OFFICE USE ONLY)</h6>
      <button style={{ border: 'none', background: 'transparent', fontSize: '24px' }} onClick={() => {/* close modal function */}}>×</button>
    </div>
    <div id="rate_pdf">
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
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        From :
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.from || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        Date :
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.date || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        NAME 1:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.name1 || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>DOB:</td>
                      <td style={{ width: "25%" }}>{projectData?.dob || ""}</td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>AGE:</td>
                      <td style={{ width: "25%" }}>{projectData?.age || ""}</td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        PAN 1:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.pan1 || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        OCCUPATION:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.occupation || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        ADDRESS:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.address || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        CURRENT ADDRESS:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.currentAddress || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        ANNIVERSARY:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.anniversary || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        Email:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.email || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        MOBILE NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.mobile || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        ALTERNATE MOBILE NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.altMobile || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
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
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        Company Name:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.companyName || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        Address:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.companyAddress || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>Sir</td>
                    </tr>
                    <tr>
                      <td colSpan="4" style={{ fontSize: "0.9rem" }}>
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
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        BUILDING (Wing):
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.building || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        BASIC RATE:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.basicRate || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        FLAT NO.:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.flatNo || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        PREMIUM FACING:
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.premiumFacing || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        FACING(direction)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        DISCOUNT
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        FLAT CARPET AREA(RERA Carpet Ar)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        ADD DISC. REF. BY
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        ATT. TERRACE CARPET AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        REMARK
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        BALCONY AREA/ SITOUR CARPET A
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        INFRASTRUCTURE
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        PORCH AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}></td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        TOP TERRACE CARPET AREA
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        REMARK
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        SUPER BUILTUP
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        TOTAL CONSIDERATION
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        BROKER NAME (IF ANY)
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        BROKERAGE AMOUNT
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}>
                        SOURCE OF ENQUIRY
                      </td>
                      <td style={{ width: "25%" }}>
                        {projectData?.type || ""}
                      </td>
                      <td style={{ fontSize: "0.9rem", width: "30%" }}></td>
                      <td style={{ width: "25%" }}>
                        {projectData?.floorRise || ""}
                      </td>
                    </tr>
                    <tr>
                      <td>GM</td>
                      <td>VP</td>
                      <td>CRM</td>
                      <td>A/C Dept</td>
                      <td>MD.</td>
                    </tr>
                  </tbody>
                </Table>
                <Button variant="primary" id="download-pdf-button" onClick={handleGeneratePDFRate}>
        Download PDF
      </Button>
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

  {/* Agreement Value Wise Form (5th Card) */}
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
            <TableCell style={{ width: '50%' }}></TableCell> {/* Empty Column */}
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