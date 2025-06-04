import { pdfSize } from "../core"
import { drawLine, drawProgressBar } from "../graphics"
import { drawGridLayout } from "../layout";
import { drawStyledText } from "../text"

/**
 * Draws a single expertise item with a title and a progress bar
 */
export const drawIndustryExpertiseItem = async (
    pdf,
    industryExpertiseObj,
    x,
    y,
    maxWidth,
    style = {},
    props = {}
) => {
    console.log("industryExpertiseObj", industryExpertiseObj)
    const { tech, value } = industryExpertiseObj;
    const { subSubHeaderStyle = {}, progressBarStyle = { thumbSize: 8, thumbColor: [0, 0, 0] } } = style;
    let currentPos;
    // 1. Draw the technology name (centered if specified)
    currentPos = drawStyledText(pdf, tech, { x, y: y }, subSubHeaderStyle);
    // 2. Draw the progress bar (based on props.color, height, radius, etc.)
    currentPos = drawProgressBar(
        pdf,
        value,
        5,
        maxWidth,
        { x1: x, y1: currentPos.y, x2: maxWidth },
        progressBarStyle
    )
    return { x, y: currentPos.y };
};

/**
 * Renders the industry expertise section in a PDF, including a header, optional grid layout, and progress bars
 * for each industry expertise.
 *
 * @param {jsPDF} pdf - Instance of jsPDF used for drawing.
 * @param {Array<Object>} industryExpertiseArray - Array of industry expertise objects, each containing `value` and `tech`.
 * @param {string} [header="Industry Expertise"] - Title/header of the section.
 * @param {{ x?: number, y?: number, centeredWidth?: number }} [coords={}] - Coordinates for placement. `x` and `y` specify the top-left of the section, `centeredWidth` for centered header.
 * @param {{
 *   headerStyle?: Object,
 *   subSubHeaderStyle?: Object,
 * progressBarStyle?:object
 * }} [style={}] - Style configuration for header and sub-headers.
 * @param {{ left?: number, right?: number }} [padding={}] - Horizontal padding inside the section.
 * @param {{
 *   side?: "left" | "right",
 *   shouldIncludeProficiency?: boolean,
 *   grid?: boolean,
 *   gridConfig?: {
 *     gridSize?: number,
 *     gapX?:number,
 *     gapY?:number
 *   },
 *   gridpadding?: {
 *     xPadding?: number,
 *     yPadding?: number
 *   }
 * }} [props={}] - Additional configuration options.
 *   - `side`: Determines alignment of labels.
 *   - `shouldIncludeProficiency`: Whether to show proficiency labels next to language names.
 *   - `grid`: Enables grid layout if true.
 *   - `gridConfig`: Configuration for grid layout like number of columns.
 *   - `gridpadding`: Padding within grid cells.
 *
 * @returns {{ x: number, y: number }} - Coordinates after rendering the section, useful for next content positioning.
 */



export const renderIndustryExpertiseSection = async (
    pdf,
    industryExpertiseArray,
    header = "Industry Expertise",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x, y, centeredWidth } = coords
    const { headerStyle, subSubHeaderStyle, progressBarStyle } = style
    const { left, right } = padding
    const {
        grid = false,
        gridSize = 2,
        gapX = 10,
        gapY = 0,
        gridpadding = {
            xPadding: 5,
            yPadding: 5
        }
    } = props
    const { pdfWidth } = pdfSize(pdf)
    let currentPos;
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: x + pdfWidth - right, y2: currentPos.y })
    if (grid) {
        currentPos = await drawGridLayout(
            pdf,
            industryExpertiseArray,
            { x, y: currentPos.y },
            { gridSize, gapX, gapY },
            {},
            gridpadding,
            async (pdf, industryExpertise, cellX, cellY, cellWidth) => {
                currentPos = await drawIndustryExpertiseItem(
                    pdf,
                    industryExpertise,
                    cellX,
                    cellY,
                    cellWidth - right - left,
                    { subSubHeaderStyle, progressBarStyle }
                )
                return currentPos
            }
        )
        return currentPos
    }

    for (let industryExpertise of industryExpertiseArray)
        currentPos = await drawIndustryExpertiseItem(pdf, industryExpertise, x, currentPos.y, pdfWidth - left - right, { subSubHeaderStyle, progressBarStyle })

    return currentPos
}