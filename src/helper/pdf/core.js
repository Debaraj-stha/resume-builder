import jsPDF from "jspdf";

/**
 * 
 * @param {File} file instance of File object or Blob object
 * @returns {Promise<string>} A promise that resolves to a base64-encoded string of the image.
 * @description Converts an image file to a base64-encoded string.
 * This function uses the FileReader API to read the file as a Data URL.
 * The resulting string can be used to embed the image in HTML or CSS.
 */
export const convertImageToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });

  /**
   * 
   * @param {jsPDF} pdf an instance of jsPDF 
   * @param {object} style  an object containing style properties for the PDF
   * @description Applies the given style to the jsPDF instance.
   * This function sets the font, font size, text color, fill color, and draw color
   */
export const applyStyle = (pdf, style = {}) => {
  if (style.font)
    pdf.setFont(style.font.family || "Helvetica", style.font.style || "normal");
  if (style.fontSize)
    pdf.setFontSize(style.fontSize || 12);
  if (style.color)
    pdf.setTextColor(...(style.color || [0, 0, 0]));
  if (style.fillColor)
    pdf.setFillColor(...(style.fillColor || [255, 255, 255]));
  if (style.drawColor)
    pdf.setDrawColor(...(style.drawColor || [0, 0, 0]));
};

/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @returns {Object} an object containing the width and height of the PDF page
 * @description Retrieves the dimensions of the PDF page.
 * This function uses the jsPDF internal page size to get the width and height.
 * It returns an object with `pdfWidth` and `pdfHeight` properties. 
 */
export const pdfSize = (pdf) => {
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    return { pdfWidth, pdfHeight }
}