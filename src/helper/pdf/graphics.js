
import jsPDF from "jspdf";
import { drawIcon } from "./image";
/**
 * Draws a rectangle with optional fill and border styling.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {object} coords - Coordinates and dimensions of the rectangle ({ x, y, width, height }).
 * @param {object} style - Style settings ({ borderColor, borderWidth, fillColor, borderStyle }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders a rectangle on the PDF with optional border color, width, and fill. 
 * The borderStyle determines whether it is stroked, filled, or both (e.g., 'S', 'F', 'DF').
 */

export const drawRectangle = (pdf, coords = {}, style = {}) => {
    const {
        borderColor = [0, 0, 0],
        borderWidth = 1,
        fillColor = null,
        borderStyle = "S"
    } = style;
    const { x = 100, y = 50, width = 100, height = 50 } = coords
    pdf.setDrawColor(...borderColor);
    pdf.setLineWidth(borderWidth);
    if (fillColor)
        pdf.setFillColor(...fillColor);
    pdf.rect(x, y, width, height, fillColor ? borderStyle : "S");
    return { y: y + height, x: x + width }
};

/**
 * Draws a circle with optional fill and border styling.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {{
 * x:number=100,
 * y:number=100,
 * r:number=50
 * }} coords - Circle position and radius ({ x, y, r }).
 * @param {{
 * borderColor: [number, number, number]=[0,0,0],
 * borderStyle: string='S',
 * borderWidth: number=1,
 * fillColor: [number, number, number]|null=null
 * }} style - Style settings ({ borderColor, borderStyle, borderWidth, fillColor }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders a circle on the PDF with customizable border and fill styles.
 * The borderStyle defines the drawing mode ('S' for stroke, 'F' for fill, 'DF' for both).
 */

export const drawCircle = (pdf, coords = {}, style = {}) => {
    const {
        borderColor = [0, 0, 0],
        borderStyle = 'S',
        borderWidth = 1,
        fillColor = null,
    } = style;
    const { x = 100, y = 100, r = 50 } = coords
    pdf.setDrawColor(...borderColor);
    pdf.setLineWidth(borderWidth);
    if (fillColor)
        pdf.setFillColor(...fillColor);
    pdf.circle(x, y, r, fillColor ? borderStyle : 'S');
    return { y: y + r * 2, x: x + r * 2 }
};

/**
 * Draws a straight line between two points with optional dash pattern.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {{
 * x1:number,
 * y1:number,
 * x2:number,
 * y2:number
 * }} coords - Coordinates of the line ({ x1, y1, x2, y2 }).
 * @param {object} style - Style settings ({ width, color, dash }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders a simple line on the PDF with optional width and color.
 * Supports dashed lines by specifying the dash pattern as [dashLength, gapLength].
 */

export const drawLine = (pdf, coords = {}, style = {}) => {
    const {
        width = 1,
        color = [0, 0, 0], // more visible
        dash = []//dashed line [2,2] 4 dash 2 gap
    } = style;
    const { x1 = 10,
        y1 = 10,
        x2 = 100,
        y2 = 10 } = coords
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    if (dash.length > 0) {
        pdf.setLineDashPattern(dash, 0);
    }
    pdf.line(x1, y1, x2, y2);
    if (dash.length > 0) {
        pdf.setLineDashPattern([], 0);
    }
    return { y: y2 + width + 20, x: x2 }
};
/**
 * Draws two horizontal lines spaced vertically.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {object} coords - Coordinates for the lines ({ x1, y1, x2, y2 }).
 * @param {object} style - Style settings ({ color, width }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders two parallel lines (3px apart) to create a double-line effect.
 * Useful as a decorative separator in PDFs.
 */

export const drawDoubleLine = (pdf, coords = {}, style = {}) => {
    const {
        color = [0, 0, 0],
        width = 1,
    } = style
    const {
        x1 = 0,
        y1 = 0,
        x2 = 100,
        y2 = 0
    } = coords
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    pdf.line(x1, y1, x2, y2);         // First line
    pdf.line(x1, y1 + 3, x2, y1 + 3); // Second line (3px below)
    return { y: y2 + width, x: x2 }

}

/**
 * Draws a horizontal line with a centered filled dot.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {object} coords - Coordinates and dot radius ({ x1, y1, x2, y2, radius }).
 * @param {object} style - Style settings ({ color, width }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders a line split into two segments with a filled circle (dot) at the center.
 * Ideal for timeline or separator visuals.
 */

export const drawLineWithDotAtCenter = (pdf, coords = {}, style = {}) => {
    const {
        x1 = 10,        // start x of the line
        y1 = 50,        // y position (horizontal line)
        x2 = 200,       // end x of the line,
        y2 = 50,
        radius = 2,

    } = coords;

    const {
        color = [0, 0, 0], // RGB color, default black
        width = 1          // line width
    } = style;

    // Set stroke color and line width
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    // Calculate middle x
    const xMid = (x1 + x2) / 2;

    // Draw left line (from x1 to 5 units before middle)
    pdf.line(x1, y1, xMid - 5, y2);

    // Draw filled circle at middle
    pdf.circle(xMid, y1, radius, 'F');

    // Draw right line (from 5 units after middle to x2)
    pdf.line(xMid + 5, y1, x2, y2);
    return { y: y2 + radius, x: x2 }
};
/**
 * Draws a horizontal line with a centered rectangular box.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {object} coords - Coordinates and box size ({ x1, y1, x2, y2, boxSize }).
 * @param {object} style - Style settings ({ color, width }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Draws a horizontal line interrupted by a centered rectangle (box).
 * Useful for timelines or label-style separators.
 */

export const drawLineWithBoxAtCenter = (pdf, coords = {}, style = {}) => {
    const {
        x1 = 10,        // start x of the line
        y1 = 50,        // y position (horizontal line)
        x2 = 200,    // end x of the line,
        y2 = 50,
        boxSize = {}
    } = coords;
    const { width = 1, color = [0, 0, 0] } = style
    const { width: boxWidth, height: boxHeight } = boxSize
    pdf.setDrawColor(...color)
    pdf.setLineWidth(width)
    const xMid = (x1 + x2) / 2
    pdf.line(x1, y1, xMid - 5, y2)
    pdf.rect(xMid - 5, y1 - 5, boxWidth, boxHeight); // 10x10 box centered
    pdf.line(xMid + 5, y1, x2, y2)
    return { y: y2 + boxHeight, x: x2 }

}
/**
 * Draws a zigzag line between two horizontal points.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {object} coords - Starting and ending coordinates ({ x1, x2, y1, y2 }).
 * @param {object} style - Style settings ({ color, width }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Creates a decorative zigzag line between x1 and x2. The direction alternates at each step.
 * Useful for dynamic or expressive visual breaks in a layout.
 */

export const drawZigZagLine = (pdf, coords = {}, style = {}) => {
    const { x1 = 10, x2 = 300, y1 = 300, y2 = 300 } = coords
    let x = x1;
    const amplitude = 3;
    const step = 6;
    let goingUp = true;
    const { color = [0, 0, 0], width = 1 } = style
    pdf.setDrawColor(...color)
    pdf.setLineWidth(width)
    while (x < x2) {
        const nextX = x + step;
        const nextY = goingUp ? y1 - amplitude : y2 + amplitude;
        pdf.line(x, y1, nextX, nextY);
        x = nextX;
        goingUp = !goingUp;
    }
    return { y: y2 + amplitude, x: x2 }

}

/**
 * Draws items in a wrapped, flexible layout like tags, with optional icons or bullets.
 * 
 * @param {jsPDF} pdf - An instance of jsPDF.
 * @param {Array} items - Array of strings or objects representing label-value pairs.
 * @param {{
 * x: number,
 * y: number,
 * }} coords

 * }} coords - Starting coordinates ({ x, y }).
 * @param {{ 
 *  gapX: number,
 * gapY: number,
 * padding: { xPadding: number, yPadding: number },
 * maxWidth: number,
 * itemHeight: number,
 * fontSize: number,
 * textColor: [number, number, number],
 * backgroundColor: [number, number, number],
 * align: string,
 * fillColor: [number, number, number] }} style - Styling options ({ gapX, gapY, padding, fontSize, colors, itemHeight, align }).
 * @param {{
 * includeIcon: boolean,
 * listStyle: string|null,
 * iconMap: object
 * }} props - Additional properties ({ includeIcon, listStyle, iconMap }).
 * @returns {{x: number, y: number}} New coordinates after drawing.
 * @description
 * Renders a grid of "pills" or badges with flexible wrapping, similar to CSS flex-wrap.
 * Can include icons (via `iconMap`) or bullets. Ideal for rendering skill lists, tags, or categories.
 */
export const drawFlexWrappedItems = async (pdf, items = [], coords = {}, style = {}, props = {}) => {
    const { x: startX = 20, y: startY = 20 } = coords;
    const {
        gapX = 8,
        gapY = 8,
        padding = {},
        maxWidth = 500,
        itemHeight = 12,
        fontSize = 12,
        textColor = [0, 0, 0],
        backgroundColor = [255, 255, 255],
        align = "left",
        fillColor = [0, 0, 0],
    } = style;
    const { includeIcon = false, listStyle = null, iconMap = {} } = props;
    const { xPadding = 40, yPadding = 20 } = padding;

    if (!items || items.length === 0) {
        console.warn("No items to draw");
        return { y: startY, x: startX };
    }

    pdf.setFontSize(fontSize);

    let y = startY;
    let rows = [];
    let currentRow = [];
    let currentRowWidth = 0;

    //Break into rows
    for (let item of items) {
        // Normalize item to string or object with value/label
        const displayText = typeof item === "string" ? item.trim() : item.value || item.label || item.toString();
        //compute width of the item
        const itemWidth = pdf.getTextWidth(displayText) + xPadding;
        // Check if the item is too wide to fit in a single row
        const spacing = currentRow.length > 0 ? gapX : 0;
        const predictedWidth = currentRowWidth + spacing + itemWidth;

        if (predictedWidth > maxWidth && currentRow.length > 0) {
            rows.push(currentRow);
            currentRow = [];
            currentRowWidth = 0;
        }

        currentRow.push({ item, displayText, width: itemWidth });
        currentRowWidth += itemWidth + spacing;
    }
    // Add the last row if it has items
    if (currentRow.length > 0) {
        rows.push(currentRow);
    }

    //  Render each row
    for (let row of rows) {
        const rowWidth = row.reduce((acc, { width }) => acc + width, 0) + gapX * (row.length - 1);
        // Center only if align is center and row is not full
        let x = align === "center"
            ? startX + (maxWidth - rowWidth) / 2 - xPadding
            : startX;

        for (let { item, displayText, width: itemWidth } of row) {
            pdf.setFillColor(...backgroundColor);
            pdf.rect(x, y, itemWidth, itemHeight, "F");
            pdf.setTextColor(...textColor);

            if (includeIcon) {
                const icon = iconMap?.[item.type] || iconMap?.[item.toLowerCase()] || null;
                await drawIcon(pdf, icon, { x: x + 10, y: y + itemHeight / 2 - 5 }, { width: 10, height: 10 });
            } else if (listStyle) {
                drawCircle(pdf, { x: x + 5, y: y + itemHeight / 2 + 1, r: 2 }, { fillColor, borderStyle: "F" });
            }

            const textX = includeIcon ? x + 22 : x + 10;
            const textY = y + itemHeight / 2 + fontSize / 3 - (includeIcon ? 2 : 0);
            pdf.text(displayText, textX, textY);

            x += itemWidth + gapX;
        }

        y += itemHeight + gapY;
    }

    return { x: startX, y: y + itemHeight };
};
/**
 * Draws a progress bar on the PDF.
 * @param {jsPDF} pdf - Instance of jsPDF
 * @param {number} [progress=0] - Progress value (0 to 1)
 * @param {number} [height=5] - Height of the progress bar
 * @param {number} [width=50] - Total width of the progress bar
 * @param {{ x1: number, y1: number, x2?: number, y2?: number }} coords - Coordinates for bar (uses x1, y1)
 * @param {{ drawColor?: number[], fillColor?: number[], completedColor?: number[],labelColor?:number[],borderRadius?:number }} style - Optional style config
 * @param {boolean} showLabel -optional flag to include label in progressbar
 * @returns {{ x: number, y: number }} - Next coordinates
 */
export const drawProgressBar = (
    pdf,
    progress = 0,
    height = 5,
    width = 50,
    coords = {},
    style = {},
    showLabel = false,
) => {
    const { x1 = 10, y1 = 10 } = coords;
    const {
        drawColor = [0, 0, 0],
        fillColor = [255, 255, 255],
        completedColor = [70, 255, 167],
        borderRadius = 2,
        labelColor = [0, 0, 0],
    } = style;

    const lineWidth = 0.5;
    pdf.setLineWidth(lineWidth);
    pdf.setDrawColor(...drawColor);
    pdf.setFillColor(...fillColor);

    // Draw background with rounded corners
    pdf.roundedRect(x1, y1, width, height, borderRadius, borderRadius, 'FD');

    // Draw filled portion
    const clampedProgress = Math.max(0, Math.min(progress, 100));
    const filledWidth = (clampedProgress / 100) * width;
    pdf.setFillColor(...completedColor);
    pdf.roundedRect(x1, y1, filledWidth, height, borderRadius, borderRadius, 'F');

    // Optional text label inside the bar
    if (showLabel) {
        pdf.setTextColor(...labelColor);
        pdf.setFontSize(8);
        pdf.text(`${clampedProgress}%`, x1 + width + 2, y1 + height - 1); // right of bar
    }
    // Inside drawProgressBar after filled bar
    if (style.thumbSize) {
        const thumbSize = style.thumbSize || 14;
        const thumbColor = style?.thumbColor || "#ffffff";
        const thumbBorderColor = style?.thumbBorderColor || fillColor;
        const thumbX = x1 + filledWidth - thumbSize / 2;
        const thumbY = y1 + height / 2 - thumbSize / 2;
        pdf.setFillColor(...thumbColor);
        pdf.setDrawColor(...thumbBorderColor);
        pdf.circle(thumbX + thumbSize / 2, thumbY + thumbSize / 2, thumbSize / 2, "FD");
    }


    return {
        x: x1 + width + 5,
        y: y1 + height + 5,
    };
};
