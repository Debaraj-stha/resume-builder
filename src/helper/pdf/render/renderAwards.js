import jsPDF from "jspdf";
import {  drawStyledText, drawTextItems, drawWrappedLongText } from "../text";
import { pdfSize } from "../core";
import { drawLine } from "../graphics";
import { drawGridLayout } from "../layout";
const drawAwardItem = async (pdf, award, x, y, subSubHeaderStyle, normalStyle, maxWidth,includeDate) => {
    const { title, organization, year } = award;
    // Title (e.g., award name)
    let currentPos
    currentPos = drawStyledText(pdf, title, { x, y }, subSubHeaderStyle);
    // Organization (e.g., who conducted the award)
    currentPos = await drawWrappedLongText(pdf, organization, x, currentPos.y, maxWidth, normalStyle);
    if (includeDate) {
        currentPos = drawStyledText(pdf, year, { x, y: currentPos.y }, normalStyle);
    }
 
    return currentPos
}

/**
 * Renders the awards section in a PDF using jsPDF.
 *
 * @function
 * @param {jsPDF} pdf - Instance of jsPDF used to render content.
 * @param {Array<object>} awardsArray - Array of award objects to display.
 * @param {string} [header="Awards"] - Header text for the section.
 * @param {Object} coords - Coordinates for positioning content.
 * @param {number} coords.x - X position to start rendering.
 * @param {number} coords.y - Y position to start rendering.
 * @param {number} coords.centeredWidth - X position for centered header text.
 * @param {Object} style - Styling information for the text.
 * @param {object} style.headerStyle - Style for the section header.
 * @param {object} style.subSubHeaderStyle - Style for award titles or subtitles.
 * @param {object} style.normalStyle - Style for award descriptions or content.
 * @param {Object} padding - Padding around the section content.
 * @param {number} padding.top - Top padding.
 * @param {number} padding.left - Left padding.
 * @param {number} padding.right - Right padding.
 * @param {number} padding.bottom - Bottom padding.
 * @param {Object} props - Additional props used for custom behavior or configuration.
 * @returns {Object|undefined} Coordinates `{ x, y }` after rendering the section, or undefined if not implemented.
 */

export const renderAwardsSection = async(pdf, awardsArray, header = "Awards", coords = {}, style = {}, padding = {}, props = {}) => {
 const { x, y, centeredWidth } = coords;
    const { headerStyle, subSubHeaderStyle, normalStyle } = style;
    const { left = 40, right = 40 } = padding;
    const {
        includeLocation = false,
        includeDate = false,
        grid = false,
        gridSize = 2,
        gapX = 10

    } = props
    const { pdfWidth } = pdfSize(pdf)
    let currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle);
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y });

    const maxWidth = pdfWidth - left - right
    if (grid) {
        currentPos = await drawGridLayout(pdf, awardsArray, { x, y: currentPos.y }, { gridSize, gapX }, {}, {},
            async (pdf, award, cellX, cellY, cellWidth) => {
                currentPos = await drawAwardItem(pdf, award, cellX, cellY, subSubHeaderStyle, normalStyle, cellWidth,includeDate)
                return currentPos
            })
        return currentPos
    }
    // Iterate and draw each award entry
    for (const award of awardsArray)
        currentPos = await drawAwardItem(pdf, award, x, currentPos.y, subSubHeaderStyle, normalStyle, maxWidth,includeDate)

    return { x, y: currentPos.y };
}