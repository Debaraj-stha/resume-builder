import { applyStyle } from "./pdf/core";
import { drawElementByClassToPDF, drawIcon } from "./pdf/image";
import { drawLine } from "./pdf/graphics"
import { drawStyledText } from "./pdf/text"
import jsPDF from "jspdf";

/**
 * Draws multiple items (text and/or icon) spaced evenly across a line.
 *
 * @param {jsPDF} pdf - The jsPDF instance.
 * @param {Array<Object>} items - Each item is { text?: string, icon?: string, iconWidth?: number, iconHeight?: number }.
 * @param {{ x: number, y: number, maxWidth: number }} area - Drawing area.
 * @param {Array<Object>} styles - Style objects for text items.
 * @param {number} lineHeightFactor - Line height multiplier.
 * @returns {{ x: number, y: number }} - Updated position.
 */
export const drawJustifyContentItems = async (
  pdf,
  items,
  area,
  styles,
  lineHeightFactor = 1.2
) => {
  const { x, y, maxWidth } = area;
  let fontSize = styles[0]?.fontSize || 12;

  const itemWidths = items.map((item, i) => {
    let textWidth = 0;
    if (item.text) {
      applyStyle(pdf, styles[i]);
      textWidth = pdf.getTextWidth(item.text);
    }
    return textWidth + (item.iconWidth || 10) + (item.text && item.icon ? 2 : 0); // add spacing if both exist
  });

  const totalWidth = itemWidths.reduce((a, b) => a + b, 0);
  const spaceCount = items.length - 1;
  const space = spaceCount > 0 ? (maxWidth - totalWidth) / spaceCount : 0;

  let currentX = x;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const style = styles[i];
    applyStyle(pdf, style);
    const itemY = y;

    if (item.icon) {
      // pdf.addImage(item.icon, 'PNG', currentX, itemY - (item.iconHeight || fontSize) + 2, item.iconWidth || 6, item.iconHeight || 6);
      await drawIcon(pdf, item.icon, { x: currentX, y: itemY - (item.iconHeight || fontSize) + fontSize / 2 })
      currentX += item.iconWidth || 10;
      if (item.text) {
        currentX += 2; // spacing between icon and text
      }
    }

    if (item.text) {
      pdf.text(item.text, currentX, itemY);
      currentX += pdf.getTextWidth(item.text);
    }

    currentX += space;
  }

  return {
    x,
    y: y + fontSize * lineHeightFactor,
  };
};

export const getProficiencyPercent = (level) => {
  switch (level?.toLowerCase?.()) {
    case "beginner":
      return 25;
    case "intermediate":
      return 50;
    case "proficient":
      return 75;
    case "native":
    case "fluent":
      return 100;
    default:
      return 0;
  }
};
const dividerType = {
  "transparent_line": "TransparentLne",
  "line": "Line",
  "DividerWithStarBorder": "DividerWithStarBorder",
  "AngleGradientDivider": "AngleGradientDivider",
  "DashedLineDivider": "DashedLineDivider",
  "DottedLineDivider": "DottedLineDivider",
  "DoubleLineDivider": "DoubleLineDivider",
  "ZigzagDivider": "ZigzagDivider",
  "TransparentLineWithAngleAtCenter": "TransparentLineWithAngleAtCenter",
  "TransparentLineWithSeperatorAtEnd": "TransparentLineWithSeperatorAtEnd",
  "TransparentLineWithBox": "TransparentLineWithBox",
  "LineWithDots": "LineWithDots"
}
export const getDivider = async (divider_type, ...args) => {
  const divider = dividerType[divider_type] ?? "line"
  let currentPos
  const { pdf, coords, style = {} } = args
  if (divider === "line") {
    currentPos = drawLine(pdf, coords, style)
    return currentPos
  }
  const { className, height, width } = args
  currentPos = await drawElementByClassToPDF(pdf, className, { x: coords.x, y: coords.y, height, width })
  return currentPos
}

/**
 * Draws a styled section title on a PDF at the specified coordinates and adds a divider below it.
 *
 * @async
 * @function
 * @param {jsPDF} pdf - An instance of jsPDF used to draw on the PDF document.
 * @param {string} [title="Section Header"] - The title text to be drawn (e.g., "Education", "Experience").
 * @param {{x: number, y: number}} coords - The x and y coordinates where the title should be placed.
 * @param {object} [style={}] - Optional styling for the title text (e.g., fontSize, fontStyle, color).
 * @param {keyof typeof dividerType} [divider_type="line"] - Type of divider to draw below the title. 
 *    Valid values include: "transparent_line", "line", "DividerWithStarBorder", 
 *    "AngleGradientDivider", "DashedLineDivider", "DottedLineDivider", 
 *    "DoubleLineDivider", "ZigzagDivider", "TransparentLineWithAngleAtCenter", 
 *    "TransparentLineWithSeperatorAtEnd", "TransparentLineWithBox", "LineWithDots".
 * 
 * @returns {Promise<{x: number, y: number}>} The updated position after drawing the title (typically bottom Y coordinate).
 */

export const drawSectionTitle = async (pdf, title="Section Header", coords, style = {},divider_type="line",...args) => {
  let currentPos;
  currentPos = drawStyledText(pdf, title, coords, style)
  currentPos=await getDivider(pdf,coords,style,...args)
  return currentPos
}