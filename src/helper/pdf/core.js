import jsPDF from "jspdf";
;

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
/**
 * function which add new page in pdf if current content exceed pdf height
 * @param {jsPDF} pdf -jsPDF instance
 * @param {number} currentY - current height of cuntent
 * @param {number} requiredHeight -height require to render the content
 * @param {number} topPadding  - top padding above content
 * @returns {number} -current y or topPadding
 */
export const addPageIfNeeded = (pdf, currentY, requiredHeight = 50, topPadding = 40) => {
  const pageHeight = pdf.internal.pageSize.getHeight();
  if (currentY + requiredHeight > pageHeight - 30) {
    pdf.addPage();
    return topPadding;
  }
  return currentY;
};

/**
 * Dynamically measures the vertical space required by a section before rendering it,
 * and inserts a new page into the PDF if the section would overflow the current page.
 *
 * This function works by rendering the section once on a dummy (in-memory) PDF to
 * calculate its height, then conditionally adds a new page to the actual PDF before
 * rendering it for real.
 *
 * @async
 * @function
 *
 * @param {Object} params - Parameters object
 * @param {Function} params.renderFn - The render function that draws a section on the PDF.
 *                                      Must return a position object with at least `{ y }` to indicate
 *                                      where rendering ended vertically.
 * @param {jsPDF} params.pdf - The actual jsPDF instance on which the final rendering will be done.
 * @param {any} params.data - The section data to be passed into the render function.
 * @param {{ x: number, y: number }} params.coords - Coordinates object indicating the starting position.
 * @param {Object} params.style - Style object passed into the render function.
 * @param {Object} params.padding - Padding configuration, typically includes top padding used after page break.
 * @param {Object} [params.props] - Additional props to forward to the render function.
 * @param {jsPDF} [params.dummyPdf] - (Optional) A dummy jsPDF instance used for measurement; one will be created if not provided.
 *
 * @returns {Promise<{ x: number, y: number }>} - Returns the final position after rendering the section on the actual PDF.
 *+
 */

export const measureAndRenderSection = async ({ renderFn, pdf, data, coords, style, padding, props, dummyPdf, header }) => {
  const startY = coords.y;
  const simulatedPdf = dummyPdf || new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
  const posAfterRender = await renderFn(simulatedPdf, data, header, { ...coords }, style, padding, props);
  const usedHeight = posAfterRender.y - startY;
  const pageHeight = pdf.internal.pageSize.getHeight();
  if (startY + usedHeight > pageHeight - 30) {
    pdf.addPage();
    coords.y = padding.top || 40;
  }
  return await renderFn(pdf, data, header, coords, style, padding, props);
};
