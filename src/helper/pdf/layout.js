import jsPDF from "jspdf";
import { pdfSize } from "./core";
import { drawBulletText, drawStyledText, drawWrappedLongText } from "./text";

/**
 * @function drawTwoColumnsLayout
 * @param {jsPDF} pdf - An instance of jsPDF used to render the layout.
 * @param {object} contents - Functions for rendering content in the left and right columns.
 * @param {function} contents.leftContent - Function that renders the left column content. Receives ({ x, y, width }) as an argument.
 * @param {function} contents.rightContent - Function that renders the right column content. Receives ({ x, y, width }) as an argument.
 * 
 * @param {object} style - Styling options for columns.
 * @param {Array<number>} style.leftColor - RGB color for the left column background (default: [255, 255, 255]).
 * @param {Array<number>} style.rightColor - RGB color for the right column background (default: [255, 255, 255]).
 * @param {object} style.padding - Padding values.
 * @param {number} style.padding.xPadding - Horizontal padding inside columns (default: 20).
 * @param {number} style.padding.yPadding - Vertical padding inside columns (default: 20).
 * 
 * @param {object} size - Sizing for columns.
 * @param {number} size.leftSize - Width of the left column in PDF units (default: 50% of page width).
 * @param {number} size.rightSize - Width of the right column in PDF units (default: remaining width).
 * 
 * @param {object} coords - Optional positioning coordinates.
 * @param {number} coords.x1 - X-coordinate of the left column start (default: 0).
 * @param {number} coords.y1 - Y-coordinate of the left column start (default: 0).
 * @param {number} coords.y2 - Y-coordinate of the right column start (default: 0).
 * 
 * @returns {object} - Final Y positions of left and right columns after content is drawn:
 *   {
 *     leftFinalY: number,
 *     rightFinalY: number
 *   }
 * 
 * @description
 * Draws a two-column layout on the PDF with customizable background colors, widths, paddings,
 * and optional starting coordinates. Executes custom rendering logic in each column
 * by invoking `leftContent` and `rightContent` functions with layout info.
 */


export const drawTwoColumnsLayout = (pdf, contents, style = {}, size = {}, coords = {}) => {
  const {
    leftColor = [255, 255, 255],
    rightColor = [255, 255, 255],
    padding = {
      xPadding: 20,
      yPadding: 20
    },
  } = style;

  const {
    leftContent = () => { },
    rightContent = () => { }
  } = contents;
  const { x1 = 0, y1 = 0, y2 = 0 } = coords

  const { leftSize, rightSize } = size
  const { xPadding, yPadding } = padding;

  const { pdfWidth, pdfHeight } = pdfSize()

  const leftWidth = leftSize || pdfWidth * 0.5;
  const rightWidth = rightSize || (pdfWidth - leftWidth);

  // Draw left column
  pdf.setFillColor(...leftColor);
  pdf.rect(x1, y1, leftWidth, pdfHeight, "F");

  // Draw right column
  pdf.setFillColor(...rightColor);
  pdf.rect(leftWidth, y2, rightWidth, pdfHeight, "F");


  // Left column content
  const leftX = xPadding;
  const leftY = yPadding;
  const leftMaxWidth = leftWidth - 2 * xPadding;
  // Right column content
  const rightX = leftWidth + xPadding;
  const rightY = yPadding;
  const rightMaxWidth = rightWidth - 2 * xPadding;
  const leftFinalY = leftContent(pdf, { x: leftX, y: leftY, width: leftMaxWidth });
  const rightFinalY = rightContent(pdf, { x: rightX, y: rightY, width: rightMaxWidth });

  return { leftFinalY, rightFinalY };
};

/**
 * Renders a vertical divider layout with two main columns and a line between them.
 * 
 * @param {jsPDF} pdf - The jsPDF instance.
 * @param {object} content - The content to render.
 * @param {Array} content.leftSection - Array of { text, style } for the left column.
 * @param {Array} content.mainSection - Array of { text, style } for the right column.
 * @param {Array} content.achievements - Array of { value } objects for the right column list.
 * @param {object} config - Configuration for positioning.
 * @param {number} config.x - Left starting x-coordinate.
 * @param {number} config.y - Starting y-coordinate.
 * @param {number} config.maxWidth - Total width available for rendering.
 * @param {object} config.styles - Object with bullet style.
 * @param {string|null} config.listStyle - e.g., "bullet"
 * @returns {{x: number, y: number}} - The new cursor position after rendering
 */

export const drawVerticalDividerLayout = async (pdf, content, config) => {

  const {
    leftSection = [],
    mainSection = [],
    achievements = [],
  } = content;

  const {
    x,
    y,
    maxWidth,
    styles,
    listStyle,
    lineWidth = 1
  } = config;

  const leftWidth = maxWidth * 0.2;
  const dividerWidth = 10;
  const rightWidth = maxWidth * 0.7;
  const gap = 10;

  let currentLeftPos = {
    x, y
  };
  let currentRightPos = { x, y };

  // Render left section
  for (const { text, style } of leftSection) {
    currentLeftPos = drawStyledText(pdf, text, { x: x, y: currentLeftPos.y }, style);
  }

  // Render right section
  const rightStartX = leftWidth + gap + dividerWidth + x;
  let currentX = rightStartX;
  currentRightPos.y = y

  for (const { text, style } of mainSection) {
    currentRightPos = await drawWrappedLongText(pdf, text, currentX, currentRightPos.y, rightWidth, style);
  }

  // Render achievements
  for (const { value } of achievements) {
    if (listStyle === "bullet") {
      currentRightPos = await drawBulletText(
        pdf,
        value,
        currentX,
        currentRightPos.y - 10,
        rightWidth,
        styles.bullet
      );
    } else {
      currentRightPos = await drawWrappedLongText(
        pdf,
        value,
        currentX,
        currentRightPos.y,
        rightWidth,
        styles.bullet
      );
    }
  }
  // Draw vertical divider line
  const dividerX = x + leftWidth + gap / 2;
  const lineTop = y;
  const lineBottom = Math.max(currentLeftPos.y, currentRightPos.y + 5) + 5;
  pdf.setDrawColor(0o00);
  pdf.setLineWidth(lineWidth);
  pdf.circle(dividerX, lineTop - 6, 2, "F");
  pdf.line(dividerX, lineTop - 4, dividerX, lineBottom - 25);

  const finalY = Math.max(currentLeftPos.y, currentRightPos.y);
  return { x, y: finalY + 10 };
};
