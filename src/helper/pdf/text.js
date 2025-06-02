import jsPDF from "jspdf";
import { applyStyle } from "./core";
import { drawIcon } from "./image";
import { drawCircle } from "./graphics";
/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {string} text the text to be drawn
 * @param {{
 * x: number,
 * y: number
 * }} coords an object containing x and y coordinates for the text
 * @param {object} style an object containing style properties for the text
 * @returns  {{
 * x: number,
 * y: number
 * }} an object containing the new coordinates after drawing the text
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
export const drawWrappedLongText = async (pdf, text, x, y, maxWidth, style = {}) => {
  
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

    cursorY += lineHeight * 0.1; // spacing between paragraphs
  }
  return { y: cursorY, x: x + maxWidth + 10 };
};
/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {React.ComponentType} icon - A React component representing the icon to be drawn.
 * @param {string} text - The text to be drawn alongside the icon.
 * @param {{x:number,y:number}} coords  - An object containing x and y coordinates for the icon and text.
 * @param {object} style - An object containing style properties for the icon and text. 
 * @returns 
 */
export const drawTextWithIcon = async (pdf, icon, text, coords = {}, style = {}) => {
  const { x = 40, y = 40 } = coords;
  const { iconSize = 12, iconPadding = 5, ...rest } = style;
  applyStyle(pdf, rest);

  // Draw the icon

  const currentPos = await drawIcon(pdf, icon, { x: x - 2, y }, { width: iconSize, height: iconSize })
  // Draw the text
  pdf.text(text, currentPos.x, currentPos.y - 2);

  return { x: x + pdf.getTextWidth(text) + 6, y: y + iconSize + 10 };
}


/**
 * Draws a bullet point aligned with wrapped text.
 *
 * @param {jsPDF} pdf
 * @param {string} text
 * @param {number} x - Left edge (bullet will be here)
 * @param {number} y - Top y of the line
 * @param {number} maxWidth
 * @param {object} textStyle - { fontSize, font, fontStyle, textColor }
 * @param {number} bulletRadius
 * @param {object} bulletStyle
 * @returns {Promise<{x: number, y: number}>}
 */
export const drawBulletText = async (
  pdf,
  text,
  x,
  y,
  maxWidth,
  textStyle,
  bulletRadius = 2,
  bulletStyle = { fillColor: [0, 0, 0], borderStyle: "F" }
) => {
  const lineHeight = textStyle.fontSize * 1.2;

  // Draw bullet centered to first line of text
  const bulletY = y + bulletRadius;
  let currentPos
  currentPos = drawCircle(pdf, { x, y: bulletY, r: bulletRadius }, bulletStyle);

  // Text indent: leave room for bullet + margin
  const indentX = x + bulletRadius * 2 + 4;

  // Draw the wrapped text next to bullet
  currentPos = await drawWrappedLongText(
    pdf,
    text,
    indentX,
    currentPos.y,
    maxWidth - (indentX - x),
    textStyle
  );

  return currentPos;
};
/**
 * Draws multiple text items spaced evenly across a line (justify-between style).
 * 
 * @param {jsPDF} pdf - The jsPDF instance.
 * @param {Array<string>} items - Array of text items to draw.
 * @param {{x:number,y:number,maxWidth:number}} area - Drawing area { x, y, maxWidth }.
 * @param {Array<object>} style - Style object: { font, fontStyle, fontSize, textColor }.
 * @param {number} lineHeightFactor - Line height multiplier.
 * @returns {{x: number, y: number}} - Updated position after rendering.
 */
export const drawJustifyTextItems = (
  pdf,
  items,
  area,
  style = [],
  lineHeightFactor = 1.2
) => {
  const { x, y, maxWidth } = area;
  let fontSize
  if (Array.isArray(style)) {
    fontSize = style[0]?.fontSize || 12;
  } else {
    fontSize = style?.fontSize || 12;
  }

  // Measure all text widths
  const textWidths = items.map(text => pdf.getTextWidth(text));
  const totalTextWidth = textWidths.reduce((a, b) => a + b, 0);

  const spaceCount = items.length - 1;
  const space = spaceCount > 0
    ? (maxWidth - totalTextWidth) / spaceCount
    : 0;

  let currentX = x;

  // Draw each item spaced evenly
  for (let i = 0; i < items.length; i++) {
    applyStyle(pdf, style[i]);
    if (style[i]?.fontSize) {
      if (fontSize < style[i].fontSize) {
        fontSize = style[i].fontSize;
      }
    }
    pdf.text(items[i], currentX, y);
    currentX += textWidths[i] + space;
  }

  return {
    x,
    y: y + fontSize * lineHeightFactor
  };
};
/**
 * Draws multiple text items horizontally in the same row, wrapping to the next line if maxWidth is exceeded.
 *
 * @param {jsPDF} pdf - jsPDF instance
 * @param {Array<string>} textItems - Array of text strings to render
 * @param {{x:number,y:number}} coords - Starting coordinates
 * @param {object} style - Style object passed to drawStyledText (supports fontSize and optional gap)
 * @param {number} [maxWidth=pdf.internal.pageSize.getWidth()] - Maximum width before wrapping to next line
 * @param {object} props -opional props
 * @returns {{x:number, y:number}} - Final coordinates after rendering
 */
export const drawTextItems = (
  pdf,
  textItems,
  coords,
  style = {},
  maxWidth = pdf.internal.pageSize.getWidth(),
  props = {}
) => {
  let { x, y } = coords;
  const {
    borderBox,
    borderBottom
  } = props
  const startX = x;
  const gap = style.gapX ?? 8;
  const fontSize = style.fontSize ?? 12;
  pdf.setFontSize(fontSize);
  const lineHeight = fontSize * 1.2;
  const drawColor = style?.borderColor || "#000000"
  const fillColor = style?.fillColor || "#333333"
  for (const item of textItems) {
    const textWidth = pdf.getTextWidth(item);
    // If adding this item exceeds the max width, wrap to next line
    const maxRight = startX + maxWidth; // where text drawing must stop

    if (x + textWidth > maxRight) {
      x = startX;
      y += lineHeight + (style?.gapY || 0)
    }
    if (borderBottom || borderBox) {
      pdf.setDrawColor(...drawColor)
      pdf.setFillColor(...fillColor)
    }
    if (borderBox) {
      pdf.rect(x, y - lineHeight / 1.5, textWidth + 6, lineHeight)
      drawStyledText(pdf, item, { x: x + 3, y }, style);
    }
    else if (borderBottom) {
      pdf.line(x, y + (style?.gapY / 2 || 4), x + textWidth + 6, y + (style.gapY / 2|| 4));
      drawStyledText(pdf, item, { x: x + 3, y }, style);

    }
    else {

      drawStyledText(pdf, item, { x: x, y }, style);
    }


    // Advance x for the next item
    x += textWidth + gap;
  }

  return { x, y: y + lineHeight };
};
