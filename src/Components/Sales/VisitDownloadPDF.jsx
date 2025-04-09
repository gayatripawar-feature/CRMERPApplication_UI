import React from "react";
import { Table, Button } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const VisitDownloadPDF = () => {



const handleGeneratePDF = () => {
    const content = document.getElementById("table-content");
  
    html2canvas(content, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      const margin = 20; // space from all sides (top, bottom, left, right)
  
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
  
      pdf.save("VisitDetails.pdf");
    });
  };
  

  return (
    <>
    <div id="table-content" style={{ padding: "20px", fontSize: "14px",border: "2px solid black" }}>
      {/* Main Table */}
      <Table bordered>
        <thead>
          <tr>
            <th className=" " style={{ border: "2px solid black" }}>Flat Type</th>
            <th className=" " style={{ border: "2px solid black" }}>Carpet Area</th>
            <th className=" " style={{ border: "2px solid black" }}>Agreement Value</th>
            <th className=" "style={{ border: "2px solid black" }} >Stamp Duty</th>
            <th className=" "style={{ border: "2px solid black" }}>Registration Charges</th>
            <th className=" "style={{ border: "2px solid black" }}>GST</th>
            <th className=" "style={{ border: "2px solid black" }}>Total Package</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
          </tr>
          <tr>
            <td></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
          </tr>


          <tr>
            <td></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td ></td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

        </tbody>
      </Table>

      <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between" }}>
       
        <div style={{ width: "60%",paddingTop: "150px"  }}>
          <h6 className="fw-bold">Terms & Conditions :</h6>
          {/* <ul style={{ paddingLeft: "16px",fontWeight:"bold" }}> */}
          <ul style={{ 
        paddingLeft: "16px", 
        fontWeight: "bold", 
        fontSize: "14px",  // Font size 4 = 14px approx
        listStyleType: "disc"  // Bullets
      }}>
            <li>Booking Amount Rs.</li>
            <li>Parking Charges Of Rs.</li>
            <li>Taxes and required Own Contribution to be paid within 10 days from the date of booking.</li>
            <li>Agreement should be registered within 21 days from the date of booking.</li>
            <li>Home loan disbursement shall be done within 10 days from the date of the Agreement.</li>
            <li>If Payment is delayed more than 10 days from the Date of demand, Interest will be applicable as per RERA.</li>
            <li>Temporary Maintenance for 2 BHK ----- /- & 3 BHK ----- /- for 1 year to be paid before possession.</li>
            <li>Loan Through our Executives only, Contact Details: ( Name - Contact No:___ ). Home loans from outside bankers are not allowed. If the Loan is executed from outside bankers administrative charges of Rs 25,000 shall be applicable.</li>
            <li>Legal Charges of Rs. ----- to be paid before the Agreement.</li>
            <li>Internal Changes or Customization not acceptable.</li>
            <li>TDS 1% on agreement cost should be paid immediately after agreement execution and shall be payable by the home buyer.</li>
            <li>In case of cancellation a cancellation fee will be applicable as per MahaRERA guidelines.</li>
            <li>The Purchaser has received the floor plan & specification, of the said flat at the time of booking and has no
            confusion whatsoever and would not change the option confirmed by us on the date of booking.</li>
            <li>Management reserves all the rights for any changes in the above- mentioned terms and prices. The
            decision of the Management shall be final in case of any dispute.
            </li>
            <li>• Cheque in favour of  (CompanyName )______________________ .
            </li>
<li>Contact___________________</li>
          </ul>
        </div>



        {/* Summary Table */}
        <div style={{ width: "35%", paddingTop: "150px" }}>
  <Table bordered style={{ border: "2px solid black", borderCollapse: "collapse" }}>
    <tbody>
      <tr>
        <th style={{ border: "2px solid black" }}>Payment Schedules : Particulars</th>
        <th style={{ border: "2px solid black" }}>%</th>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON BOOKING</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON EXECUTION OF THE AGREEMENT</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON EXECUTION OF FOOTINGS</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF PLINTH</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF 2ND RCC SLAB</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF 5TH RCC SLAB</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF 8TH RCC SLAB</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF 11TH RCC SLAB</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF 14TH RCC SLAB</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON 100% COMPLETION OF RCC SLABS</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF BRICKWORKS</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF FLOORING, DOORS</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF STAIRCASE, SANITARY</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF EXTERNAL PLUMBING</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON COMPLETION OF LIFTS & ELECTRICAL</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}>ON POSSESSION</td>
        <td style={{ border: "2px solid black" }}></td>
      </tr>
      <tr>
        <td style={{ border: "2px solid black" }}><strong>Total</strong></td>
        <td style={{ border: "2px solid black" }}><strong>100</strong></td>
      </tr>
    </tbody>
  </Table>
</div>


       
      </div>


     <div className="visitpdftable">
     <Table  bordered className=" w-50 ">
          <thead>
            <tr>
              <th>Days</th>
              <th>Particular</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: "2px solid black" }}>Within 7 Days</td>
              <td style={{ border: "2px solid black" }}>Bank Loan Sanction Letter</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>Within 15 Days</td>
              <td style={{ border: "2px solid black" }}>Own Contribution</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>Within 21 Days</td>
              <td style={{ border: "2px solid black" }}>Stamp Duty, Registration, GST, Agreement to be done</td>
            </tr>
            <tr>
              <td style={{ border: "2px solid black" }}>Within 31 Days</td>
              <td style={{ border: "2px solid black" }}>1st Bank Disbursement shall be done as per current construction stage</td>
            </tr>
          </tbody>
        </Table>
        </div>
    </div>
     
    </>
  );
};

export default VisitDownloadPDF;
