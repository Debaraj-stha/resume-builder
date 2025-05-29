import { applyStyle } from "./pdf/core";
import { drawIcon } from "./pdf/image";

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

