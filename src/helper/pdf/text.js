import jsPDF from "jspdf";
import { applyStyle } from "./core";
import { drawIcon } from "./image";
/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {string} text the text to be drawn
 * @param {Object} coords an object containing x and y coordinates for the text
 * @param {Object} style an object containing style properties for the text
 * @returns  {Object} an object containing the new coordinates after drawing the text
 * @description Draws styled text on the PDF at specified coordinates.
 * The function applies the given style to the text, draws a background rectangle if specified,
 */
export const drawStyledText = (pdf, text, coords = {}, style = {}) => {
  const { x = 40, y = 40 } = coords;
  applyStyle(pdf, style);
  const height = style.fontSize || 12;
  const width = pdf.getTextWidth(text) + 4;

  if (style.background) {
    pdf.rect(x - 2, y - height + 4, width, height, 'F');
  }

  const align = style.align || 'left';
  const xPos = align === 'center'
    ? x
    : align === 'right'
      ? x - pdf.getTextWidth(text)
      : x;

  pdf.text(text, xPos, y, { align });
  return { y: y + height, x: x + width };
};

/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {string} text the text to be drawn 
 * @param {number} x x coordinate for the text
 * @param {number} y y coordinate for the text
 * @param {number} maxWidth  maximum width for the text before wrapping
 * @param {object} style  an object containing style properties for the text
 * @returns {{x: number, y: number}} an object containing the new coordinates after drawing the text
 * @description Draws long text on the PDF, wrapping it to fit within a specified width.
 * The function handles multiple paragraphs and applies the given style to the text.
 * It splits the text into lines that fit within the maximum width and draws each line
 * at the specified coordinates, adjusting the Y position for each line.
 */
export const drawWrappedLongText = async(pdf, text, x, y, maxWidth, style = {}) => {
  applyStyle(pdf, style);
  const fontSize = style.fontSize || 12;
  const lineHeight = style.lineHeight || fontSize * 1.1;
  // Handle multiple paragraphs (split on newlines)
  const paragraphs = text.split('\n');
  let cursorY = y;

  for (const para of paragraphs) {
    const lines = pdf.splitTextToSize(para, maxWidth);

    lines.forEach(line => {
      pdf.text(line, x, cursorY);
      cursorY += lineHeight;
    });

    cursorY += lineHeight * 0.5; // spacing between paragraphs
  }

  return { y: cursorY };
};


export const drawTextWithIcon = async (pdf, icon, text, coords = {}, style = {}) => {
  const { x = 40, y = 40 } = coords;
  const { iconSize = 12, iconPadding = 5, textStyle = {} } = style;
  applyStyle(pdf, textStyle);

  // Draw the icon

 const currentPos= await drawIcon(pdf,icon, { x, y }, { width: iconSize, height: iconSize })
  // Draw the text
  pdf.text(text, currentPos.x,currentPos.y);

  return { x: x + pdf.getTextWidth(text), y: y+iconSize };
}