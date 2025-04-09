import React from "react";
import { Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VisitDownloadPDF = () => {

  const handleGeneratePDF = () => {
    const content = document.getElementById("table-content");
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, imgHeight);
      pdf.save("VisitDetails.pdf");
    });
  };

  return (
    <>
      <div id="table-content">
     
   <div id="table-content" className="flex justify-center">
  <div className="bg-secondary text-white p-1 rounded-md shadow-md text-center">
    <h5 className="fs-6 label-cell text-base font-small mb-1">PROJECT NAME</h5>
    <h5 className="fs-6 label-cell text-base font-small">MAHARERA NO</h5>
  </div>
</div>


     
       
        <Table bordered className="visit-table fs-5">
          <tbody>
           
        
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
              <td className="label-cell fw-bold fs-5">TOTAL USABLE AREA</td>
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
              <td className="label-cell fw-bold fs-5">Grand Total</td>
              <td className="value-cell"></td> 
              <td className="value-cell"></td> 
            </tr>
          
              <tr className="label-cell">This Cost Sheet is valid till (15 days from the date of booking)-</tr>
           
           
        
         
              <tr className="label-cell">Booking Cheque Favouring -</tr>
              
            
        
          
              <tr className="label-cell">Taxes Cheque Favouring -</tr>
             
        
        
           
              <tr className="label-cell">STAMP DUTY AND REGISTRATION CHARGES TO BE PAID IMMEDIATELY</tr>
             
         
        
            
              <tr className="label-cell">Agreement should be registered within 21 days from the date of Applications</tr>
          
           
        
            
              <tr className="label-cell">Prior to agreement, the client should submit the loan sanction letter from the bank,if availing any.</tr>
             
      
            
              <tr className="label-cell">Execution of agreement will be subject to realisation of the payment made by the client.</tr>
            
        
          
              <tr className="label-cell">TDS (As Applicable)</tr>
            
          
            
            <tr className="label-cell">Government Charges/taxes are subject to change & would be applicable at actuals.</tr>
             
            
            
              <tr className="label-cell">Lumpsum Advance Maintenance Deposit shall be collected at the time of Possession for initial 
                24 months as per the agreement Rs._____________ MNGL Security Deposit Rs._________________.
              </tr>
             
          
           
              <tr className="label-cell">Rates are subject to change without prior notice.</tr>
             
        
        
            
              <tr className="label-cell">Govt taxes to be paid by the buyer as per prevailing rates.</tr>
             
       
        
        
            
              <tr className="label-cell">The above mentioned cost is based on the tentative area, the exact area & agreement cost will be reconfirmed at the time of agreement.</tr>
           
          
        
            
              <tr className="label-cell">This is purely conceptual & not a legal offering Company reserves the right to add, delete, or alter any details in its endeavour
              to make improvements as & when required</tr>
            
           
        
          
              <tr className="label-cell">Source of Enquiry</tr>
            
           
        
           
              <tr className="label-cell">Agent Agent/Broker Name:</tr>
          
        
        
            
              <tr className="label-cell">If any case, for any reason the unit is cancelled after registration, then brokerage paid to the broker by the company will be
deducted from the amount paid and the balance will be refunded as per terms & conditions mentioned in the application for
allotment of the said unit,
</tr>
              
           
            
            <tr>
              <td className="label-cell">1st Applicant Name:</td>
             
              <td className="value-cell">Sign :</td> 
            </tr>
            
            <tr>
              <td className="label-cell">Manager Name:</td>
           
              <td className="value-cell">Sign :</td> 
            </tr>
          
          </tbody>
        </Table>

        <p> ***We are concerned about accuracy and timely payment, so customer has been made aware that while making payment be
sure that you have made payment only via bank transfer by using the correct Account number and IFSCode of the Company
or via POS machine (either card swipe or by scanning QR code only on POS machine) or by way of DD/Cheque addressed to
Company's name as mentioned in the demand letter. Payment received through these method will be considered as payment done by customer </p>
      </div>

     
    </>
  );
};

export default VisitDownloadPDF;
