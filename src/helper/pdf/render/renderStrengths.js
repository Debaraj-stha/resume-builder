import jsPDF from "jspdf";
import { drawStyledText, drawWrappedLongText } from "../text";
import { pdfSize } from "../core";
import { drawLine } from "../graphics"; // fixed typo from 'graphiics'
import { drawIcon } from "../image";
import { FaChessKnight } from "react-icons/fa";
import { drawGridLayout } from "../layout";

/**
 * Draw a strength item with optional icon, title, and wrapped description.
 * @param {*} param0 
 * @returns 
 */
const drawStrengthItem = async ({
    pdf: jsPDF,
    title: string,
    description,
    x: number,
    y,
    width,
    subHeaderStyle: object,
    normalStyle,
    shouldIncludeIcon: bolean,
    iconsStyle
}) => {
    let iconX = x;
    if (shouldIncludeIcon) {
        const iconPos = await drawIcon(pdf, FaChessKnight, {
            x,
            y: y - (subHeaderStyle?.fontSize || 12) / 2
        }, iconsStyle);
        iconX = iconPos.x;
    }

    let pos = drawStyledText(pdf, title, { x: iconX, y }, subHeaderStyle);
    pos = await drawWrappedLongText(pdf, description, iconX, pos.y, width - (iconX - x), normalStyle);
    return pos;
};
/**
 * Renders the "Strengths" section of a resume in a PDF.
 * 
 * This function draws the section title and iterates over the `strengthsArray` 
 * to render each strength with applied styles and padding.
 *
 * @param {jsPDF} pdf - Instance of jsPDF
 * @param {Array<object>} strengthsArray - An array of strength objects to display.
 * @param {string} [header="Strength"] - Header text for the section.
 * @param {{x:number,y:number,centeredWidth:number}} [coords={}] - Coordinates with `x`, `y`, and `centeredWidth` to define position and alignment.
 * @param {{headerStyle:object,normalStyle:object,subHeaderStyle:object,subSubHeaderStyle:object}} [style={}] - Style configuration object.
 * @param {{top:number,left:number,right:number,bottom:number}} [padding={}] - Padding around the section.
 * @param {object} [props={}] - Additional optional properties for rendering.
 */
export const renderStrengthsSection = async (
    pdf,
    strengthsArray,
    header="Strength",
    coords = {},
    style = {},
    padding = {},
    props = {},
) => {
    const { x = 0, y = 0, centeredWidth = x } = coords;
    const { left = 0, right = 0 } = padding;
    const { headerStyle = {}, normalStyle = {}, subHeaderStyle = {} } = style;

    const {
        side = "left",
        shouldIncludeIcon = false,
        grid = false,
        gridSize = 2,
        gapX = 10,
        gapY = 20,
        cellPadding = {
            xPadding: 5,
            yPadding: 5
        },
        iconsStyle = {}
    } = props;

    const { pdfWidth } = pdfSize(pdf);
    let currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle);

    // Draw line under header
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y });

    if (grid) {
        const gridCoords = { x, y: currentPos.y + 5 };
        const gridConfig = { gridSize, gapX, gapY };
        const maxWidth = pdfWidth - right - left;

        const gridStyle = {
            width: (maxWidth - (gridSize - 1) * gridConfig.gapX) / gridSize
        };

        currentPos = await drawGridLayout(
            pdf,
            strengthsArray,
            gridCoords,
            gridConfig,
            gridStyle,
            cellPadding,
            async (pdf, strength, cellX, cellY, cellWidth) => drawStrengthItem({
                pdf,
                ...strength,
                x: cellX,
                y: cellY,
                width: cellWidth,
                subHeaderStyle,
                normalStyle,
                shouldIncludeIcon,
                iconsStyle
            })
        );

        return currentPos;
    }

    for (let strength of strengthsArray) {
        const result = await drawStrengthItem({
            pdf,
            ...strength,
            x,
            y: currentPos.y,
            width: pdfWidth - left - right,
            subHeaderStyle,
            normalStyle,
            shouldIncludeIcon,
            iconsStyle
        });
        currentPos.y = result.y + 5;
    }

    return currentPos;
};
