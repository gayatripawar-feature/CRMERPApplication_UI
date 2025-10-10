import React, { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Row, Col, Table } from "react-bootstrap";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
// import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FaFileDownload } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import VisitDownloadPDF from "./VisitDownloadPDF";
import RateDownloadPDF from "./RateDownloadPDF";
import AgreementDownload from "./AgreementDownload";
import PackageDownloadPdf from "./PackageDownloadPdf";
import Constants from "../Constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
const templates = [
  {
    id: 1,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        At The Time of Visit
      </div>
    ),
    description:
      "Generate payment details and schedule document for site visits.",
    formtype: "visit",
    displayType: "visitDisplay",
    buttons: ["Form", "Display", "PDF"],
  },
  {
    id: 2,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        At The Time of Booking
      </div>
    ),
    description: "Generate booking-related documentation and payment details.",
    formtype: "visit",
    displayType: "visitDisplay",
    pdfType: "visitPdf",
    buttons: ["Form", "Display"],
  },
  {
    id: 3,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        Rate Approval Form
      </div>
    ),
    description:
      "Generate rate approval documentation for property transactions.",
    formtype: "RateDisplay",
    displayType: "rateApprovalDisplay",
    buttons: ["Form", "Display"],
  },
  {
    id: 4,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        Negotiation Calculation (PACKAGE WISE)
      </div>
    ),
    description:
      "Generate package-wise negotiation calculations and agreements.",
    formtype: "Package",
    displayType: "packageDisplay",
    buttons: ["Form", "Display"],
  },
  {
    id: 5,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        Negotiation Calculation (AGREEMENT VALUE WISE)
      </div>
    ),
    description: "Generate agreement value-based negotiation calculations.",
    formtype: "Agreement",
    displayType: "agreementDisplay",
    buttons: ["Form", "Display"],
  },
  {
    id: 6,
    title: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "15px",
          borderRadius: "6px",
          marginBottom: "20px",
          textAlign: "center",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          letterSpacing: "1px",
        }}
      >
        Home Loan Eligibility Check
      </div>
    ),
    description: "Check how much load amount you can get.",
    formtype: "homeLoanEligibility",
    displayType: "homeLoanEligibilityDisplay",
    buttons: ["Check"],
  },
];

const projectData = {};

const Template = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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

  //  State for home loan eligibility form
  const [loanData, setLoanData] = useState({
    takeHomeSalary: "",
    currentEmis: "",
    interestRate: "",
    loanTenure: "",
  });
  const [eligibilityResult, setEligibilityResult] = useState(null);

  //  Function to calculate loan eligibility
  const calculateLoanEligibility = () => {
    const salary = parseFloat(loanData.takeHomeSalary) || 0;
    const emis = parseFloat(loanData.currentEmis) || 0;
    const interestRate = parseFloat(loanData.interestRate) || 0;
    const tenure = parseFloat(loanData.loanTenure) || 0;

    if (!salary || !interestRate || !tenure || !emis) {
      alert("Please fill all required fields");
      return;
    }
    setEligibilityResult(true);
  };

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
    setOpenModal(true);
  };

  const handleGeneratePDF = () => {
    const content = document.getElementById("table-content");
    const downloadBtn = document.getElementById("download-pdf-button");

    if (downloadBtn) downloadBtn.style.display = "none";
    if (!content) {
      console.error("No content found for PDF generation");
      if (downloadBtn) downloadBtn.style.display = "block";
      return;
    }

    // Create a temporary container with proper styling
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "794px";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.padding = "20px";

    // Header section
    const headerDiv = document.createElement("div");
    headerDiv.innerHTML = `
    <div style="
      background-color: ${Constants.primaryColor};
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      letter-spacing: 1px;
    ">
      At The Time of Booking - Display
    </div>
  `;

    // Clone the content and ensure proper table styling
    const clonedContent = content.cloneNode(true);

    // Ensure table has proper borders
    const table = clonedContent.querySelector("table");
    if (table) {
      table.style.border = "2px solid #000";
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";

      // Style all table cells
      const cells = table.querySelectorAll("td, th");
      cells.forEach((cell) => {
        cell.style.border = "1px solid #000";
        cell.style.padding = "8px";
        cell.style.borderCollapse = "collapse";
      });

      // Style table rows for better visibility
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        row.style.border = "1px  #000";
      });
    }
    tempContainer.appendChild(headerDiv);
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    setTimeout(() => {
      html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
        .then((canvas) => {
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          // Add first page
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // Add additional pages if content is longer than one page
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }

          pdf.save("VisitDetails.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";
          alert("Error generating PDF. Please try again.");
        });
    }, 1000);
  };

  // const handleGeneratePDFRate = () => {
  //   const content = document.getElementById("rate_pdf");
  //   if (!content) {
  //     alert("No content to generate PDF");
  //     return;
  //   }

  //   const pdfButton = document.getElementById("download-pdf-button");
  //   if (pdfButton) {
  //     pdfButton.style.display = "none";
  //   }

  //   html2canvas(content, { scale: 2 }).then((canvas) => {
  //     if (pdfButton) {
  //       pdfButton.style.display = "block";
  //     }
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pdfWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pdfHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pdfHeight;
  //     }

  //     pdf.save("RateApproval.pdf");
  //   });
  // };
  const handleGeneratePDFRate = () => {
    const content = document.getElementById("rate_pdf");
    const pdfButton = document.getElementById("download-pdf-button");

    if (pdfButton) pdfButton.style.display = "none";
    if (!content) {
      console.error("No content found for PDF generation");
      if (pdfButton) pdfButton.style.display = "block";
      return;
    }

    // Create a temporary container with proper styling
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "794px";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.padding = "10px";

    // Header section
    //   const headerDiv = document.createElement("div");
    //   headerDiv.innerHTML = `
    //   <div style="
    //     background-color: ${Constants.primaryColor};
    //     padding: 15px;
    //     border-radius: 6px;
    //     margin-bottom: 20px;
    //     text-align: center;
    //     color: white;
    //     font-weight: bold;
    //     font-size: 18px;
    //     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    //     letter-spacing: 1px;
    //   ">
    //     Rate Approval Form
    //   </div>
    // `;

    // Clone the content and ensure proper styling
    const clonedContent = content.cloneNode(true);

    // Ensure tables have proper borders if they exist
    const tables = clonedContent.querySelectorAll("table");
    tables.forEach((table) => {
      table.style.border = "2px solid #000";
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";

      // Style all table cells
      const cells = table.querySelectorAll("td, th");
      cells.forEach((cell) => {
        cell.style.border = "1px solid #000";
        cell.style.padding = "8px";
        cell.style.borderCollapse = "collapse";
      });

      // Style table rows for better visibility
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        row.style.border = "1px  #000";
      });
    });

    // tempContainer.appendChild(headerDiv);
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    setTimeout(() => {
      html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
        .then((canvas) => {
          document.body.removeChild(tempContainer);
          if (pdfButton) pdfButton.style.display = "block";

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          // Add first page
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // Add additional pages if content is longer than one page
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }

          pdf.save("RateApproval.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          document.body.removeChild(tempContainer);
          if (pdfButton) pdfButton.style.display = "block";
          alert("Error generating PDF. Please try again.");
        });
    }, 1000);
  };

  // const handleGeneratePDFRatePackage = () => {
  //   const content = document.getElementById("package_pdf");
  //   if (!content) {
  //     alert("No content to generate PDF");
  //     return;
  //   }

  //   const pdfButton = document.getElementById("download-pdf-button");
  //   if (pdfButton) {
  //     pdfButton.style.display = "none";
  //   }

  //   html2canvas(content, { scale: 2 }).then((canvas) => {
  //     if (pdfButton) {
  //       pdfButton.style.display = "block";
  //     }
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pdfWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pdfHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pdfHeight;
  //     }

  //     pdf.save("Package.pdf");
  //   });
  // };
  const handleGeneratePDFRatePackage = () => {
    const content = document.getElementById("package_pdf");
    const downloadBtn = document.getElementById("download-pdf-button");

    if (downloadBtn) downloadBtn.style.display = "none";
    if (!content) {
      console.error("No content found for PDF generation");
      if (downloadBtn) downloadBtn.style.display = "block";
      return;
    }

    // Create a temporary container with proper styling
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "794px";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.padding = "20px";

    // Header section
    const headerDiv = document.createElement("div");
    headerDiv.innerHTML = `
    <div style="
      background-color: ${Constants.primaryColor};
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      letter-spacing: 1px;
    ">
Negotiation Calculation(Package Wise)
    </div>
  `;

    // Clone the content and ensure proper styling
    const clonedContent = content.cloneNode(true);

    // Ensure tables have proper borders if they exist
    const tables = clonedContent.querySelectorAll("table");
    tables.forEach((table) => {
      table.style.border = "2px solid #000";
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";

      // Style all table cells
      const cells = table.querySelectorAll("td, th");
      cells.forEach((cell) => {
        cell.style.border = "1px solid #000";
        cell.style.padding = "8px";
        cell.style.borderCollapse = "collapse";
      });

      // Style table rows for better visibility
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        row.style.border = "1px  #000";
      });
    });

    tempContainer.appendChild(headerDiv);
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    setTimeout(() => {
      html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
        .then((canvas) => {
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          // Add first page
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // Add additional pages if content is longer than one page
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }

          pdf.save("Package.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";
          alert("Error generating PDF. Please try again.");
        });
    }, 1000);
  };

  // const handleGeneratePDFRateAgreement = () => {
  //   const content = document.getElementById("agreement_pdf");
  //   if (!content) {
  //     alert("No content to generate PDF");
  //     return;
  //   }

  //   const pdfButton = document.getElementById("download-pdf-button");
  //   if (pdfButton) {
  //     pdfButton.style.display = "none";
  //   }

  //   html2canvas(content, { scale: 2 }).then((canvas) => {
  //     if (pdfButton) {
  //       pdfButton.style.display = "block";
  //     }
  //     const imgData = canvas.toDataURL("image/png");
  //     const pdf = new jsPDF("p", "mm", "a4");
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();

  //     const imgWidth = pdfWidth;
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     let heightLeft = imgHeight;
  //     let position = 0;

  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pdfHeight;

  //     while (heightLeft > 0) {
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //       heightLeft -= pdfHeight;
  //     }

  //     pdf.save("Agreement.pdf");
  //   });
  // };
  const handleGeneratePDFRateAgreement = () => {
    const content = document.getElementById("agreement_pdf");
    const downloadBtn = document.getElementById("download-pdf-button");

    if (downloadBtn) downloadBtn.style.display = "none";
    if (!content) {
      console.error("No content found for PDF generation");
      if (downloadBtn) downloadBtn.style.display = "block";
      return;
    }

    // Create a temporary container with proper styling
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "794px";
    tempContainer.style.backgroundColor = "white";
    tempContainer.style.padding = "20px";

    // Header section
    const headerDiv = document.createElement("div");
    headerDiv.innerHTML = `
    <div style="
      background-color: ${Constants.primaryColor};
      padding: 15px;
      border-radius: 6px;
      margin-bottom: 20px;
      text-align: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      letter-spacing: 1px;
    ">
      Negotiation Calculation(Agreement Value Wise)
    </div>
  `;

    // Clone the content and ensure proper styling
    const clonedContent = content.cloneNode(true);

    // Ensure tables have proper borders if they exist
    const tables = clonedContent.querySelectorAll("table");
    tables.forEach((table) => {
      table.style.border = "2px solid #000";
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";

      // Style all table cells
      const cells = table.querySelectorAll("td, th");
      cells.forEach((cell) => {
        cell.style.border = "1px solid #000";
        cell.style.padding = "8px";
        cell.style.borderCollapse = "collapse";
      });

      // Style table rows for better visibility
      const rows = table.querySelectorAll("tr");
      rows.forEach((row) => {
        row.style.border = "1px  #000";
      });
    });

    tempContainer.appendChild(headerDiv);
    tempContainer.appendChild(clonedContent);
    document.body.appendChild(tempContainer);

    setTimeout(() => {
      html2canvas(tempContainer, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      })
        .then((canvas) => {
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();

          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          // Add first page
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;

          // Add additional pages if content is longer than one page
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }

          pdf.save("Agreement.pdf");
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          document.body.removeChild(tempContainer);
          if (downloadBtn) downloadBtn.style.display = "block";
          alert("Error generating PDF. Please try again.");
        });
    }, 1000);
  };

  const contentRef = useRef(null);

  const generatePDF = useReactToPrint({
    content: () => {
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
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Booking Form
      </div>
    ),
    visitDisplay: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        At The Time of Booking - Display
      </div>
    ),
    rateApprovalDisplay: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Rate Approval Form
      </div>
    ),
    packageDisplay: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Negotiation Calculation (PACKAGE WISE)
      </div>
    ),
    agreementDisplay: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Negotiation Calculation (AGREEMENT VALUE WISE)
      </div>
    ),

    homeLoanEligibilityDisplay: (
      <div
        style={{
          backgroundColor: Constants.primaryColor,
          padding: "10px",
          borderRadius: "4px",
          color: "white",
          fontWeight: "bold",
          fontSize: isMobile ? "14px" : "16px",
          textAlign: "center",
          width: "100%",
        }}
      >
        Home Loan Eligibility Check
      </div>
    ),
  };

  const selectedTemplate = templates.find(
    (template) =>
      template.displayType === modalContent ||
      template.formtype === modalContent ||
      template.pdfType === modalContent
  );

  const modalTitle = selectedTemplate
    ? modalTitles[selectedTemplate.displayType] || "Form"
    : "Form";

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
          backgroundColor: "#fff",
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a3");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        const marginX = 10;
        const marginY = 10;
        const contentWidth = pdfWidth - marginX * 2;
        const contentHeight = (canvas.height * contentWidth) / canvas.width;

        pdf.addImage(
          imgData,
          "PNG",
          marginX,
          marginY,
          contentWidth,
          contentHeight
        );
        pdf.save("AgreementDetails.pdf");
      }
      setShowPdfComponent(false);
    }, 300);
  };

  const handleGeneratePDFPackage = async () => {
    if (modalContent !== "packageDisplay") {
      console.error("Content is not ready!");
      return;
    }

    const input = document.getElementById("package_pdf");
    if (!input) {
      console.error("Element #package_pdf is not found!");
      return;
    }

    setShowPdfComponent(true);
    setTimeout(async () => {
      const canvas = await html2canvas(input, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#fff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      const marginX = 10;
      const marginY = 10;
      const contentWidth = pdfWidth - marginX * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        marginX,
        marginY,
        contentWidth,
        contentHeight
      );
      pdf.save("PackageDetails.pdf");
      setShowPdfComponent(false);
    }, 300);
  };

  return (
    <div
      className="container mt-2"
      style={{ padding: isMobile ? "10px" : "20px" }}
    >
      <h5
        style={{ fontSize: isMobile ? "16px" : "20px", marginBottom: "20px" }}
      >
        Sales Templates
      </h5>
      <div className="row g-3">
        {templates.map((template) => (
          <div
            className={
              isMobile ? "col-12" : isTablet ? "col-6" : "col-12 col-md-4"
            }
            key={template.id}
          >
            <div
              className="card shadow-sm h-100"
              style={{
                marginBottom: isMobile ? "15px" : "20px",
                minHeight: isMobile ? "200px" : "220px",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title text-primary"
                  style={{ fontSize: isMobile ? "14px" : "16px" }}
                >
                  {template.title}
                </h5>
                <p
                  className="card-text flex-grow-1"
                  style={{ fontSize: isMobile ? "12px" : "14px" }}
                >
                  {template.description}
                </p>
                <div
                  className={`d-flex ${
                    isMobile ? "flex-column" : "flex-row"
                  } gap-2 justify-content-start flex-wrap`}
                >
                  {template.id === 1 ? (
                    <>
                      {showPdfComponent && (
                        <div
                          style={{
                            position: "absolute",
                            top: "-9999px",
                            left: "-9999px",
                          }}
                        >
                          <div id="pdf-content">
                            <VisitDownloadPDF />
                          </div>
                        </div>
                      )}
                      <Button
                        variant="contained"
                        className="w-100"
                        style={{
                          backgroundColor: Constants.primaryColor,
                          color: "#ecf0f1",
                          fontSize: isMobile ? "12px" : "16px",
                          padding: isMobile ? "6px 12px" : "8px 16px",
                          fontWeight:"12px",
                        }}
                        onClick={handleDownloadVisitPdf}
                      >
                        Download PDF
                      </Button>
                    </>
                  ) : (
                    template.buttons.map((button, index) => (
                      <Button
                        key={index}
                        variant="primary"
                        // className="flex-grow-1"
                        className={`${
                          button === "Check" ? "w-100" : "flex-grow-1"
                        }`}
                        style={{
                          minWidth: isMobile
                            ? "100%"
                            : isTablet
                            ? "120px"
                            : "140px",
                          padding: "8px 12px",
                          fontWeight: "bold",
                          margin: "2px",
                          backgroundColor: Constants.primaryColor,
                          color: "#ecf0f1",
                          fontSize: isMobile ? "0.9rem" : "1rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          border: "none",
                        }}
                        onClick={() => {
                          const modalType =
                            button === "Form"
                              ? template.formtype
                              : button === "Display"
                              ? template.displayType
                              : button === "Check"
                              ? template.formtype
                              : template.pdfType;
                          handleOpenModal(modalType);
                        }}
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

      {/* All Forms and Display Forms */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box sx={{ width: "100%" }}>{modalTitle}</Box>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              maxHeight: isMobile ? "calc(100vh - 140px)" : "70vh",
              // overflow: "auto",
              padding: isMobile ? "5px" : "10px",
            }}
          >
            {modalContent === "visit" && (
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="formProjectName" className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        as="select"
                        name="projectName"
                        value={formData.projectName}
                        onChange={() => {}}
                        size={isMobile ? "sm" : "md"}
                      >
                        <option>Select Project Name</option>
                        <option>Sohan Enterprises</option>
                        <option>Jatin</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formWing" className="mb-3">
                      <Form.Label>Wing</Form.Label>
                      <Form.Control
                        as="select"
                        name="wing"
                        value={formData.wing}
                        onChange={() => {}}
                        size={isMobile ? "sm" : "md"}
                      >
                        <option>Select Wing</option>
                        <option>Wing A</option>
                        <option>Wing B</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formFlatNo" className="mb-3">
                      <Form.Label>Flat No</Form.Label>
                      <Form.Control
                        as="select"
                        name="flatNo"
                        value={formData.flatNo}
                        onChange={() => {}}
                        size={isMobile ? "sm" : "md"}
                      >
                        <option>Select Flat No</option>
                        <option>101</option>
                        <option>102</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formType" className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        as="select"
                        name="type"
                        value={formData.type}
                        onChange={() => {}}
                        size={isMobile ? "sm" : "md"}
                      >
                        <option>Select Type</option>
                        <option>Type A</option>
                        <option>Type B</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formDate" className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Date"
                            slotProps={{
                              textField: {
                                size: isMobile ? "small" : "medium",
                                fullWidth: true,
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}

            {modalContent === "visitDisplay" && (
              <Box sx={{ overflowX: "auto" }}>
                <div id="table-content">
                  <Table
                    bordered
                    className="visit-table"
                    size={isMobile ? "sm" : "md"}
                  >
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
                        <td className="label-cell">
                          Firm Name / PROJECT NAME / WING NO E / UNIT NO 208 -
                          fn/P
                        </td>
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
                        <td className="label-cell">
                          OPEN/ENCLOSED BALCONY AS SANCTIONED
                        </td>
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
                        <td className="value-cell">
                          BALCONY AREA/ SITOUR CARPET AREA
                        </td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">PODIUM GARDEN</td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">PORCH</td>
                        <td className="value-cell">PORCH AREA</td>
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
                        <td className="label-cell">
                          STAMP DUTY (AS APPLICABLE)
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          REGISTRATION (AS APPLICABLE)
                        </td>
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
                        <td className="label-cell">
                          This Cost Sheet is valid till (15 days from the date
                          of booking)-
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Booking Cheque Favouring -
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">Taxes Cheque Favouring -</td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          STAMP DUTY AND REGISTRATION CHARGES TO BE PAID IMM
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Agreement should be registered within 21 days from the
                          date of Ap
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Prior to agreement, the client should submit the loan
                          sanction lette
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Execution of agreement will be subject to realisation
                          of the payme
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">TDS (As Applicable)</td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Government Charges/taxes are subject to change & would
                          be ap
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Lumpsum Advance Maintenance Deposit shall be collected
                          at the
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Rates are subject to change without prior notice.
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          Govt taxes to be paid by the buyer as per prevailing
                          rates.
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          The above mentioned cost is based on the tentative
                          area, the exac
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                      <tr>
                        <td className="label-cell">
                          This is purely conceptual & not a legal offering
                          Company reserves
                        </td>
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
                        <td className="label-cell">
                          If any case, for any reason the unit is cancelled
                          after registration, t
                        </td>
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
                        <td className="label-cell">
                          ***We are concerned about accuracy and timely payment,
                          so customer has been made aware that while making
                          payment be sure that you have made payment only
                        </td>
                        <td className="value-cell"></td>
                        <td className="value-cell"></td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="primary"
                    id="download-pdf-button"
                    onClick={handleGeneratePDF}
                    size={isMobile ? "sm" : "md"}
                    className="mt-2"
                    style={{
                      backgroundColor: Constants.primaryColor,
                      color: "#ecf0f1",
                      border: "none",
                    }}
                  >
                    Download PDF
                  </Button>
                </div>
              </Box>
            )}

            {modalContent === "rateApprovalDisplay" && (
              <Box sx={{ overflowX: "auto" }}>
                <div id="rate_pdf">
                  <h6
                    className="text-black text-center mb-2"
                    style={{ fontSize: isMobile ? "14px" : "16px" }}
                  >
                    RATE APPROVAL FORM (FOR OFFICE USE ONLY)
                  </h6>
                  <Table
                    bordered
                    style={{
                      width: "100%",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td
                          colSpan="4"
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          PROJECT NAME
                        </td>
                      </tr>
                      <tr>
                        <td style={{ width: "30%", fontWeight: "bold" }}>
                          From :
                        </td>
                        <td style={{ width: "25%" }}>
                          {projectData?.from || ""}
                        </td>
                        <td style={{ width: "30%", fontWeight: "bold" }}>
                          Date :
                        </td>
                        <td style={{ width: "25%", fontWeight: "bold" }}>
                          {projectData?.date || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>NAME 1:</td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.name1 || ""}
                        </td>
                        <td style={{ fontWeight: "bold" }}>DOB:</td>
                        <td>{projectData?.dob || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>AGE:</td>
                        <td>{projectData?.age || ""}</td>
                        <td style={{ fontWeight: "bold" }}>PAN 1:</td>
                        <td>{projectData?.pan1 || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>OCCUPATION:</td>
                        <td>{projectData?.occupation || ""}</td>
                        <td style={{ fontWeight: "bold" }}>ADDRESS:</td>
                        <td>{projectData?.address || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>CURRENT ADDRESS:</td>
                        <td>{projectData?.currentAddress || ""}</td>
                        <td style={{ fontWeight: "bold" }}>ANNIVERSARY:</td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.anniversary || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Email:</td>
                        <td>{projectData?.email || ""}</td>
                        <td style={{ fontWeight: "bold" }}>MOBILE NO.:</td>
                        <td>{projectData?.mobile || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          ALTERNATE MOBILE NO.:
                        </td>
                        <td>{projectData?.altMobile || ""}</td>
                        <td style={{ fontWeight: "bold" }}>WHATSAPP NO.:</td>
                        <td>{projectData?.whatsapp || ""}</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{ height: "10px" }}></td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{ fontWeight: "bold" }}>
                          To
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Company Name:</td>
                        <td>{projectData?.companyName || ""}</td>
                        <td style={{ fontWeight: "bold" }}>Address:</td>
                        <td>{projectData?.companyAddress || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Sir</td>
                      </tr>
                      <tr>
                        <td colSpan="4" style={{ fontWeight: "bold" }}>
                          I/We hereby intend to book a flat in your project
                          "PROJECT NAME" at "
                          {projectData?.projectLocation || ""}"
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan="4"
                          style={{ textAlign: "center", fontWeight: "bold" }}
                        >
                          AGREEMENT DETAILS
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>BUILDING (Wing):</td>
                        <td>{projectData?.building || ""}</td>
                        <td style={{ fontWeight: "bold" }}>BASIC RATE:</td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.basicRate || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>FLAT NO.:</td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.flatNo || ""}
                        </td>
                        <td style={{ fontWeight: "bold" }}>PREMIUM FACING:</td>
                        <td>{projectData?.premiumFacing || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          FACING(direction)
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>DISCOUNT</td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          FLAT CARPET AREA(RERA Carpet Ar)
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>
                          ADD DISC. REF. BY
                        </td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          ATT. TERRACE CARPET AREA
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>REMARK</td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          BALCONY AREA/ SITOUR CARPET A
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>INFRASTRUCTURE</td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>PORCH AREA</td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}></td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          TOP TERRACE CARPET AREA
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>REMARK</td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>SUPER BUILTUP</td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>
                          TOTAL CONSIDERATION
                        </td>
                        <td>{projectData?.floorRise || ""}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          BROKER NAME (IF ANY)
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}>BROKERAGE AMOUNT</td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.floorRise || ""}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>
                          SOURCE OF ENQUIRY
                        </td>
                        <td>{projectData?.type || ""}</td>
                        <td style={{ fontWeight: "bold" }}></td>
                        <td style={{ fontWeight: "bold" }}>
                          {projectData?.floorRise || ""}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="4">
                          <Table bordered style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  GM
                                </td>
                                <td
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  VP
                                </td>
                                <td
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  CRM
                                </td>
                                <td
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  A/C Dept
                                </td>
                                <td
                                  style={{
                                    width: "20%",
                                    textAlign: "center",
                                    padding: "8px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  MD.
                                </td>
                              </tr>
                              <tr>
                                <td style={{ padding: "18px" }}></td>
                                <td style={{ padding: "8px" }}></td>
                                <td style={{ padding: "8px" }}></td>
                                <td style={{ padding: "8px" }}></td>
                                <td style={{ padding: "8px" }}></td>
                              </tr>
                            </tbody>
                          </Table>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                  <Button
                    variant="primary"
                    id="download-pdf-button"
                    onClick={handleGeneratePDFRate}
                    size={isMobile ? "sm" : "md"}
                    className="mt-2"
                    style={{
                      backgroundColor: Constants.primaryColor,
                      color: "#ecf0f1",
                      border: "none",
                    }}
                  >
                    Download PDF
                  </Button>
                </div>
              </Box>
            )}

            {modalContent === "RateDisplay" && (
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="formProjectName" className="mb-3">
                      <Form.Label>Project Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Project Name"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formWing" className="mb-3">
                      <Form.Label>Wing</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Wing"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formFlatNo" className="mb-3">
                      <Form.Label>Flat No.</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Flat No."
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formType" className="mb-3">
                      <Form.Label>Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Type"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  {/* <Col sm={6}>
                    <Form.Group controlId="formDate" className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Date"
                            slotProps={{
                              textField: {
                                size: isMobile ? "small" : "medium",
                                fullWidth: true,
                              },
                            }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Form.Group>
                  </Col> */}
                  <Col sm={6}>
                    <Form.Group controlId="formDate" className="mb-3">
                      <Form.Label>Date</Form.Label>
                      <Form.Control type="date" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formFacing" className="mb-3">
                      <Form.Label>FACING (Direction)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Facing Direction"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formBrokerName" className="mb-3">
                      <Form.Label>BROKER NAME (IF ANY)</Form.Label>
                      <Form.Control type="text" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formBasicRate" className="mb-3">
                      <Form.Label>BASIC RATE</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Basic Rate"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formPremiumFacing" className="mb-3">
                      <Form.Label>PREMIUM FACING</Form.Label>
                      <Form.Control type="text" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formFloorRise" className="mb-3">
                      <Form.Label>FLOOR RISE</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Floor Rise"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formDiscount" className="mb-3">
                      <Form.Label>DISCOUNT</Form.Label>
                      <Form.Control type="text" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formAddDisc" className="mb-3">
                      <Form.Label>ADD DISC. REF. BY</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Reference"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group controlId="formRemark" className="mb-3">
                      <Form.Label>REMARK</Form.Label>
                      <Form.Control type="text" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formInfrastructure" className="mb-3">
                      <Form.Label>INFRASTRUCTURE</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Infrastructure"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col sm={6}>
                    <Form.Group
                      controlId="formTotalConsideration"
                      className="mb-3"
                    >
                      <Form.Label>TOTAL CONSIDERATION</Form.Label>
                      <Form.Control type="text" size={isMobile ? "sm" : "md"} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      controlId="formBrokerageAmount"
                      className="mb-3"
                    >
                      <Form.Label>BROKERAGE AMOUNT</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Brokerage Amount"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}

            {modalContent === "packageDisplay" && (
              <Box sx={{ overflowX: "auto" }}>
                <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
                  <div id="package_pdf">
                    <Table
                      bordered
                      hover
                      responsive
                      size={isMobile ? "sm" : "md"}
                    >
                      <TableHead
                        style={{ backgroundColor: "#0056b3", color: "white" }}
                      >
                        <TableRow></TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { label: "Package" },
                          { label: "Registration" },
                          { label: "Balance" },
                          { label: "Tax Cut" },
                          { label: "Balance" },
                          { label: "Agreement Value" },
                          { label: "Stamp Duty" },
                          { label: "Registration Charges" },
                          { label: "GST" },
                          { label: "Total" },
                          { label: "Carpet Area" },
                          { label: "Saleable Area" },
                          { label: "Per Sq. Ft" },
                        ].map((row, index) => (
                          <TableRow
                            key={index}
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? "#f1f8ff" : "#e0efff",
                            }}
                          >
                            <TableCell style={{ width: "50%" }}>
                              {row.label}
                            </TableCell>
                            <TableCell style={{ width: "50%" }}></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="primary"
                      id="download-pdf-button"
                      onClick={handleGeneratePDFRatePackage}
                      size={isMobile ? "sm" : "md"}
                      className="mt-2"
                      style={{
                        backgroundColor: Constants.primaryColor,
                        color: "#ecf0f1",
                        border: "none",
                      }}
                    >
                      Download PDF
                    </Button>
                  </div>
                </TableContainer>
              </Box>
            )}

            {modalContent === "Package" && (
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="formPackage" className="mb-3">
                      <Form.Label>Package</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Package Details"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="formCarpetArea" className="mb-3">
                      <Form.Label>Carpet Area</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Carpet Area"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}

            {modalContent === "Agreement" && (
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group controlId="formAgreementValue" className="mb-3">
                      <Form.Label>Agreement Value</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Agreement Value"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group
                      controlId="formAgreementCarpetArea"
                      className="mb-3"
                    >
                      <Form.Label>Agreement Carpet Area</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Carpet Area"
                        size={isMobile ? "sm" : "md"}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            )}

            {modalContent === "agreementDisplay" && (
              <Box sx={{ overflowX: "auto" }}>
                <div id="agreement_pdf">
                  <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
                    {/* <div
                      style={{
                        backgroundColor: Constants.primaryColor,
                        padding: "10px",
                        borderRadius: "4px",
                        marginBottom: "20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: isMobile ? "14px" : "16px",
                        }}
                      >
                        Negotiation Calculation (Agreement Wise)
                      </Typography>
                    </div> */}
                    <Table
                      bordered
                      hover
                      responsive
                      size={isMobile ? "sm" : "md"}
                    >
                      <TableHead
                        style={{ backgroundColor: "#0056b3", color: "white" }}
                      >
                        <TableRow></TableRow>
                      </TableHead>
                      <TableBody>
                        {[
                          { label: "Package" },
                          { label: "Registration" },
                          { label: "Balance" },
                          { label: "Tax Cut" },
                          { label: "Balance" },
                          { label: "Agreement Value" },
                          { label: "Stamp Duty" },
                          { label: "Registration Charges" },
                          { label: "GST" },
                          { label: "Total" },
                          { label: "Carpet Area" },
                          { label: " Area" },
                          { label: "Per Sq. Ft" },
                        ].map((row, index) => (
                          <TableRow
                            key={index}
                            style={{
                              backgroundColor:
                                index % 2 === 0 ? "#f1f8ff" : "#e0efff",
                            }}
                          >
                            <TableCell style={{ width: "50%" }}>
                              {row.label}
                            </TableCell>
                            <TableCell style={{ width: "50%" }}></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Button
                      variant="primary"
                      id="download-pdf-button"
                      onClick={handleGeneratePDFRateAgreement}
                      size={isMobile ? "sm" : "md"}
                      className="mt-2"
                      style={{
                        backgroundColor: Constants.primaryColor,
                        color: "#ecf0f1",
                        border: "none",
                      }}
                    >
                      Download PDF
                    </Button>
                  </TableContainer>
                </div>
              </Box>
            )}
            {modalContent === "homeLoanEligibility" && (
              <div style={{ padding: "20px" }}>
                <Form>
                  <Row>
                    <Col sm={6}>
                      <Form.Group
                        controlId="formTakeHomeSalary"
                        className="mb-3"
                      >
                        <Form.Label>
                          Take Home Salary<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          // placeholder="Enter monthly take home salary"
                          value={loanData.takeHomeSalary}
                          onChange={(e) =>
                            setLoanData({
                              ...loanData,
                              takeHomeSalary: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formCurrentEmis" className="mb-3">
                        <Form.Label>
                          Current EMIs<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          // placeholder="Enter total current EMIs"
                          value={loanData.currentEmis}
                          onChange={(e) =>
                            setLoanData({
                              ...loanData,
                              currentEmis: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={6}>
                      <Form.Group controlId="formInterestRate" className="mb-3">
                        <Form.Label>
                          Interest Rate<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          step="0.1"
                          // placeholder="Enter expected interest rate"
                          value={loanData.interestRate}
                          onChange={(e) =>
                            setLoanData({
                              ...loanData,
                              interestRate: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group controlId="formLoanTenure" className="mb-3">
                        <Form.Label>
                          Loan Tenure (Years)
                          <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          type="number"
                          // placeholder="Enter loan tenure in years"
                          value={loanData.loanTenure}
                          onChange={(e) =>
                            setLoanData({
                              ...loanData,
                              loanTenure: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button
                      variant="primary"
                      onClick={calculateLoanEligibility}
                      style={{
                        backgroundColor: Constants.primaryColor,
                        color: "#ecf0f1",
                        padding: "10px 30px",
                        fontSize: "16px",
                        border: "none",
                      }}
                    >
                      Calculate
                    </Button>
                  </div>
                </Form>

                {eligibilityResult && (
                  <div
                    className="mt-4"
                    style={{ fontSize: "12px", color: "#6c757d" }}
                  >
                    <p>
                      You are Eligible for Home Loan of Rs<strong>__</strong>
                      and you EMI will be <strong>__</strong> .
                    </p>
                  </div>
                )}
              </div>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseModal}
            size={isMobile ? "small" : "medium"}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            style={{
              backgroundColor: Constants.primaryColor,
              color: "#ecf0f1",
            }}
            size={isMobile ? "small" : "medium"}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Template;
