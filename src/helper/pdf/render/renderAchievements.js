import jsPDF from "jspdf";
import { pdfSize } from "../core";
import { drawStyledText, drawWrappedLongText } from "../text";
import { drawLine } from "../graphics";
import { drawGridLayout } from "../layout";
import { drawIcon } from "../image";
import { FaTrophy } from "react-icons/fa";

/**
 * function to render achivement
 * @param {jsPDF} pdf -instance of jsPDF
 * @param {Array<object>} achievementsArray  -array of achievements
 * @param {string} [header="Achievement"] - Header text for the section.
 * @param {{x:number,y:number,centeredWidth:number}} coords -coordinates position
 * @param {object} style -style object
 * @param {{
 * top:number,
 * left:number,
 * right:number,
 * bottom:number
 * }} padding -page padding
 * @param {object} props -optional props
 * 
 * @returns {Promise<{x:number,y:number}>}
 */
export const renderAchievementsSection = async (
    pdf,
    achievementsArray,
    header="Achievement",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x, y, centeredWidth } = coords;
    const { headerStyle, normalStyle, subHeaderStyle, subSubHeaderStyle } = style;
    const { left, right } = padding;
    const {
        displayGrid = false,
        gridSize = 3,
        shouldIncludeDate = false,
        shouldIncludeIcon = false,
        gapX = 10,
        gapY = 20,
        cellPadding = {
            xPadding: 5,
            yPadding: 5
        }
    } = props;

    const { pdfWidth } = pdfSize(pdf);
    const maxWidth = pdfWidth - left - right;

    // Draw Section Header
    let currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle);
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y });

    // Grid Layout Mode
    if (displayGrid) {
        const gridCoords = { x, y: currentPos.y + 5 };
        const gridConfig = { gridSize, gapX, gapY }
        const gridStyle = {
            width: (maxWidth - (gridSize - 1) * gridConfig.gapX) / gridSize, // Equal cell width with 10px gap
        };
        currentPos = await drawGridLayout(
            pdf,
            achievementsArray,
            gridCoords,
            gridConfig,
            gridStyle,
            cellPadding,
            async (pdf, achievement, x, y, width) => {
                const { acheivement, field, date } = achievement;

                // Render wrapped text
                let pos = await drawWrappedLongText(pdf, acheivement, x, y, width, subHeaderStyle);

                // Render field
                pos = drawStyledText(pdf, field, { x, y: pos.y }, subSubHeaderStyle);

                // Optional date
                if (shouldIncludeDate) {
                    pos = drawStyledText(pdf, date, { x, y: pos.y }, normalStyle);
                }

                return pos;
            }
        );

        currentPos.y += 10;
        return currentPos;
    }

    // Standard Vertical List Mode
    for (let achievement of achievementsArray) {
        const { acheivement, field, date } = achievement;

        let iconX = x;
        let iconY = currentPos.y;

        // Optional icon
        if (shouldIncludeIcon) {
            const iconPos = await drawIcon(pdf, FaTrophy, { x, y: currentPos.y }, { color: "orange" });
            iconX = iconPos.x;
            iconY = iconPos.y;
        }
        currentPos = await drawWrappedLongText(pdf, acheivement, iconX, iconY, maxWidth, {
            ...subHeaderStyle,
            align: "left",
        });

        currentPos = drawStyledText(pdf, field, { x: iconX, y: currentPos.y }, subSubHeaderStyle);

        if (shouldIncludeDate) {
            currentPos = drawStyledText(pdf, date, { x: iconX, y: currentPos.y }, normalStyle);
        }

        currentPos.y += 10; // space after each achievement
    }

    currentPos.y += 5; // bottom padding
    return currentPos;
};
