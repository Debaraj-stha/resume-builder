import { FaFire } from "react-icons/fa";
import { pdfSize } from "../core";
import { drawLine } from "../graphics";
import { drawIcon } from "../image";
import { drawStyledText, drawWrappedLongText } from "../text";
import { drawGridLayout } from "../layout";
const drawPassionItem = async (pdf, x, y, passion, style, iconStyle, shouldIncludeIcon, maxWidth) => {
    let iconX = x;
    console.log(x, y, passion)
    let currentPos;
    if (shouldIncludeIcon) {
        const iconPos = await drawIcon(pdf, FaFire, {
            x,
            y: y - (style?.fontSize || 12) / 2
        }, iconStyle);
        iconX = iconPos.x;
    }
    currentPos = await drawWrappedLongText(pdf, passion, iconX, y, maxWidth, style);
    currentPos.y += 5; // spacing between passions
    return currentPos
}
/**
 * Renders the "Passions" section of a resume in a PDF.
 *
 * @param {jsPDF} pdf - Instance of jsPDF
 * @param {Array<string>} passionArray - Array of passion strings to display.
 * @param {{x:number, y:number, centeredWidth:number}} [coords={}] - Positioning info.
 * @param {{headerStyle:object, subHeaderStyle:object, subSubHeaderStyle:object}} [style={}] - Style config.
 * @param {{top:number, left:number, right:number, bottom:number}} [padding={}] - Padding around section.
 * @param {object} [props={}] - Optional rendering props (icons, grid, etc).
 */
export const renderPassionsSection = async (
    pdf,
    passionArray,
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x = 40, y = 40, centeredWidth = x } = coords;
    const {
        headerStyle = {},
        subSubHeaderStyle = {}
    } = style;
    const { left = 0, right = 0 } = padding;

    const {
        shouldIncludeIcon = false,
        grid = false,
        gridSize = 2,
        gapX = 10,
        gapY = 0,
        cellPadding = {
            xPadding: 5,
            yPadding: 0
        },
        iconStyle = {}
    } = props;

    const { pdfWidth } = pdfSize(pdf);

    // Draw section header
    let currentPos = drawStyledText(pdf, "Passions", { x: centeredWidth, y }, headerStyle);

    // Draw underline
    currentPos = drawLine(pdf, {
        x1: x,
        y1: currentPos.y,
        x2: pdfWidth - right,
        y2: currentPos.y
    });

    // Grid mode not implemented yet
    if (grid) {
        const gridCoords = { x, y: currentPos.y + 5 };
        const gridConfig = { gridSize, gapX, gapY };
        const maxWidth = pdfWidth - right - left;

        const gridStyle = {
            width: (maxWidth - (gridSize - 1) * gridConfig.gapX) / gridSize
        };

        currentPos = await drawGridLayout(
            pdf,
            passionArray,
            gridCoords,
            gridConfig,
            gridStyle,
            cellPadding,
            async (pdf, passion, cellX, cellY, cellWidth) => drawPassionItem(
                pdf,
                cellX,
                cellY,
                passion,
                subSubHeaderStyle,
                iconStyle,          
                shouldIncludeIcon,  
                cellWidth
            )

        );
        return currentPos
    }
    // Render each passion item
    const maxWidth = pdfWidth - left - right
    for (let passion of passionArray)
        currentPos = await drawPassionItem(pdf, x, currentPos.y, passion, subSubHeaderStyle, iconStyle, shouldIncludeIcon, maxWidth)
    return currentPos;
};
