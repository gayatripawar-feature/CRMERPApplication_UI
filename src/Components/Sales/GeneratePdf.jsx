import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const generatePDF = (templateId) => {
  console.log(`Generating PDF for card ID: templateId`);

  // Select the display section element
  const input = document.getElementById(templateId);
  if (!input) {
    console.error(`Element with ID "display-section-${templateId}" not found!`);
    return;
  }

  // Store the original display style
  const originalDisplay = input.style.display;

  // Temporarily make the display section visible
  input.style.display = "block";

  // Use html2canvas to capture the content of the display section
  html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add the captured image to the PDF
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    // Save the generated PDF
    pdf.save(`template_${templateId}.pdf`);

    // Revert the display section to its original visibility state
    input.style.display = originalDisplay;
  });
};

export default generatePDF;
