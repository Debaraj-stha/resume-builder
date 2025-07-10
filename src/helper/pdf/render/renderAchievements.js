import jsPDF from "jspdf";
import { pdfSize } from "../core";
import { drawStyledText, drawWrappedLongText } from "../text";
import { drawLine } from "../graphics";
import { drawGridLayout } from "../layout";
import { drawIcon } from "../image";
import { FaTrophy } from "react-icons/fa";
import capitalize from "../../capitalize";

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
 const renderAchievementsSection = async (
    pdf,
    achievementsArray,
    header = "Achievement",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x, y, centeredWidth } = coords;
    const { headerStyle, normalStyle, subHeaderStyle, subSubHeaderStyle } = style;
    const { left, right } = padding;
    const {
        grid = false,
        gridSize = 2,
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
    let currentPos = drawStyledText(pdf,capitalize(header), { x: centeredWidth, y }, headerStyle);
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y });

    // Grid Layout Mode
    if (grid) {
        console.log("drawing achivement in grid mode");
        const gridCoords = { x, y: currentPos.y }; // Start below the header
        const gridConfig = { gridSize, gapX, gapY }
        const gridStyle = {
            width: (maxWidth - (gridSize - 1) * gridConfig.gapX) / gridSize, // Equal cell width with 10px gap
        };
        console.log("x,y", x, y)
        console.log("currentPos", currentPos)
        currentPos = await drawGridLayout(
            pdf,
            achievementsArray,
            gridCoords,
            gridConfig,
            gridStyle,
            cellPadding,
            async (pdf, achievements, cellX, cellY, width) => {
                const { achievement, field, date } = achievements
                let cellPos = drawWrappedLongText(pdf, achievement, cellX, cellY, width, subHeaderStyle);
                cellPos = drawStyledText(pdf, field, { x: cellX, y: cellPos.y }, subSubHeaderStyle);

                if (shouldIncludeDate) {
                    cellPos = drawStyledText(pdf, date, { x: cellX, y: cellPos.y }, normalStyle);
                }

                return cellPos;

            }
        );

        currentPos.y += 10;
        console.log("currentPos after grid", currentPos);
        return currentPos;
    }
    console.log("drawing achivement in standard mode");

    // Standard Vertical List Mode
    for (let achievements of achievementsArray) {
        const { achievement, field, date } = achievements
        let iconX = x;
        let iconY = currentPos.y;

        // Optional icon
        if (shouldIncludeIcon) {
            const iconPos = await drawIcon(pdf, FaTrophy, { x, y: currentPos.y }, { color: "orange" });
            iconX = iconPos.x;
            iconY = iconPos.y;
        }
        currentPos = drawWrappedLongText(pdf, achievement, iconX, iconY, maxWidth, {
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
export default renderAchievementsSection;