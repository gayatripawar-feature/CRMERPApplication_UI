import React from 'react';
import jsPDF from 'jspdf';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

const AgreementDownloadPDF = ({ modalContent }) => {
    // const handleGeneratePDFRateAgreement = () => {
    //     const doc = new jsPDF("p", "mm", "a4"); // A4 portrait
    //     const pageHeight = doc.internal.pageSize.getHeight();
    //     const leftMargin = 20;
    //     const topMargin = 20;
    //     let y = topMargin;
      
    //     // Title
    //     doc.setFontSize(16);
    //     doc.text("Negotiation Calculation (Agreement Wise)", leftMargin, y);
    //     y += 15;
      
    //     // Content Fields
    //     const fields = [
    //       "Package",
    //       "Registration",
    //       "Balance",
    //       "Tax Cut",
    //       "Balance",
    //       "Agreement Value",
    //       "Stamp Duty",
    //       "Registration Charges",
    //       "GST",
    //       "Total",  
    //       "Carpet Area",
    //       "Area",
    //       "Per Sq. Ft",
    //     ];
      
    //     doc.setFontSize(12);
      
    //     fields.forEach((label, index) => {
    //       if (y > pageHeight - 20) {
    //         doc.addPage(); // Add new page if space is running out
    //         y = topMargin;
    //       }
      
    //       doc.text(`${label}: ____________________`, leftMargin, y);
    //       y += 10;
    //     });
      
    //     doc.save("agreement-details.pdf");
    //   };
    const handleGeneratePDFRateAgreement = () => {
        const doc = new jsPDF("p", "mm", "a4");
        const pageHeight = doc.internal.pageSize.getHeight();
        const pageWidth = doc.internal.pageSize.getWidth();
      
        let y = 20; // Starting vertical position
        const lineHeight = 12;
        const leftMargin = 20;
      
        // Title Section
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Negotiation Calculation (Agreement Wise)", pageWidth / 2, y, { align: "center" });
        y += lineHeight + 5;
      
        // Define Field Label and Placeholder Values
        const fields = [
          { label: "Package", value: "" },
          { label: "Registration", value: "" },
          { label: "Balance", value: "" },
          { label: "Tax Cut", value: "" },
          { label: "Balance", value: "" },
          { label: "Agreement Value", value: "" },
          { label: "Stamp Duty", value: "" },
          { label: "Registration Charges", value: "" },
          { label: "GST", value: "" },
          { label: "Total", value: "" },
          { label: "Carpet Area", value: "" },
          { label: "Area", value: "" },
          { label: "Per Sq. Ft", value: "" },
        ];
      
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
      
        fields.forEach((field) => {
          if (y + lineHeight > pageHeight - 20) {
            doc.addPage();
            y = 20;
          }
      
          // Adjust layout as needed: Label left, blank line right
          doc.text(`${field.label}:`, leftMargin, y);
          doc.text("_________________________", leftMargin + 50, y);
          y += lineHeight;
        });
      
        // Save the PDF
        doc.save("AgreementDetails.pdf");
      };
      
      
        

  if (modalContent !== "agreementDisplay") return null;

  return (
    <div id="agreement_pdf">
      <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
        <div style={{ backgroundColor: '#007BFF', padding: '10px', borderRadius: '4px', marginBottom: '20px' }}>
          <Typography variant="h6" style={{ color: 'white', textAlign: 'center' }}>
            Negotiation Calculation (Agreement Wise)
          </Typography>
        </div>

        <Table bordered="true" hover="true" responsive="true">
          <TableHead style={{ backgroundColor: '#0056b3', color: 'white' }}>
            <TableRow>
              <TableCell style={{ color: 'white' }}>Label</TableCell>
              <TableCell style={{ color: 'white' }}>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              'Package',
              'Registration',
              'Balance',
              'Tax Cut',
              'Balance',
              'Agreement Value',
              'Stamp Duty',
              'Registration Charges',
              'GST',
              'Total',
              'Carpet Area',
              'Area',
              'Per Sq. Ft'
            ].map((label, index) => (
              <TableRow
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#e0efff'
                }}
              >
                <TableCell style={{ width: '50%' }}>{label}</TableCell>
                <TableCell style={{ width: '50%' }}></TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  id="download-pdf-button"
                  onClick={handleGeneratePDFRateAgreement}
                >
                  Download PDF
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AgreementDownloadPDF;