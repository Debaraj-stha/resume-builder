import jsPDF from "jspdf";
import {  drawStyledText, drawTextItems, drawWrappedLongText } from "../text";
import { pdfSize } from "../core";
import { drawLine } from "../graphics";
import { drawGridLayout } from "../layout";
const drawTrainingItem = async (pdf, training, x, y, subSubHeaderStyle, normalStyle, maxWidth,includeDate,includeLocation) => {
    const { title, organization, year, location } = training;
    // Title (e.g., training name)
    let currentPos
    currentPos = drawStyledText(pdf, title, { x, y }, subSubHeaderStyle);
    // Organization (e.g., who conducted the training)
    currentPos = await drawWrappedLongText(pdf, organization, x, currentPos.y, maxWidth, normalStyle);
    if (includeDate && includeLocation) {
        currentPos = drawTextItems(pdf, [location, year], { x, y: currentPos.y }, normalStyle)
    }
    else if (includeDate) {
        currentPos = drawStyledText(pdf, year, { x, y: currentPos.y }, normalStyle);
    }
    else if (includeLocation) {
        currentPos = drawStyledText(pdf, location, { x, y: currentPos.y }, normalStyle);
    }
    return currentPos
}

/**
 * Renders the training section in a PDF using jsPDF.
 *
 * @async
 * @function
 * @param {jsPDF} pdf - Instance of jsPDF used to render content.
 * @param {Array<object>} trainingsArray - Array of training/course objects to render.
 * @param {string} [header="Training/Course"] - Header text for the section.
 * @param {Object} coords - Coordinates for rendering.
 * @param {number} coords.x - X position to start rendering.
 * @param {number} coords.y - Y position to start rendering.
 * @param {number} coords.centeredWidth - Centered width position for header.
 * @param {Object} style - Styling information for section text.
 * @param {object} style.headerStyle - Style object for the header text.
 * @param {object} style.subHeaderStyle - Style object for subheaders (e.g., titles of individual trainings).
 * @param {object} style.normalStyle - Style object for normal/description text.
 * @param {Object} padding - Padding around the section.
 * @param {number} padding.top - Top padding.
 * @param {number} padding.left - Left padding.
 * @param {number} padding.right - Right padding.
 * @param {number} padding.bottom - Bottom padding.
 * @param {Object} props - Additional properties that may be used during rendering.
 * @returns {Promise<{x: number, y: number}>} Updated coordinates after rendering the section.
 */

export const renderTrainingsSection = async (
    pdf,
    trainingsArray,
    header = "Training/Course",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
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
        currentPos = await drawGridLayout(pdf, trainingsArray, { x, y: currentPos.y }, { gridSize, gapX }, {}, {},
            async (pdf, training, cellX, cellY, cellWidth) => {
                currentPos = await drawTrainingItem(pdf, training, cellX, cellY, subSubHeaderStyle, normalStyle, cellWidth,includeDate,includeLocation)
                return currentPos
            })
        return currentPos
    }
    // Iterate and draw each training entry
    for (const training of trainingsArray)
        currentPos = await drawTrainingItem(pdf, training, x, currentPos.y, subSubHeaderStyle, normalStyle, maxWidth,includeDate,includeLocation)

    return { x, y: currentPos.y };
};
