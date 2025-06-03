import capitalize from "../../capitalize";
import { getProficiencyPercent } from "../../helper"
import { pdfSize } from "../core"
import { drawLine, drawProgressBar } from "../graphics"
import { drawGridLayout } from "../layout";
import { drawStyledText } from "../text"
const drawLanguageItem = (
    pdf,
    languageObj,
    x,
    y,
    maxWidth,
    style = {},
    options = {}
) => {
    const { language, proficiency } = languageObj;
    const percent = getProficiencyPercent(proficiency);
    const { side = "left", shouldIncludeProficiency = true } = options;
    const subHeaderStyle = style.subSubHeaderStyle || {};
    let currentPos;

    // Language Label
    currentPos = drawStyledText(pdf, language, { x, y }, subHeaderStyle);

    // Optional Proficiency Label
    if (shouldIncludeProficiency) {
        pdf.setFontSize(subHeaderStyle.fontSize || 10);
        pdf.setTextColor(...(subHeaderStyle.color || [0, 0, 0]));

        const labelText = capitalize(proficiency);
        const labelWidth = pdf.getTextWidth(labelText);
        const textX =
            side === "right" ? x + maxWidth - labelWidth : x + 100 + 10; // push to right

        pdf.text(labelText, textX, currentPos.y);
    }

    // Progress bar
    currentPos = drawProgressBar(
        pdf,
        percent,
        6,
        100,
        { x1: x, y1: currentPos.y - 10 },
        {
            drawColor: [0, 0, 0],
            fillColor: [230, 230, 230],
            completedColor: [0, 150, 0],
            borderRadius: 3,
        }
    );

    currentPos.y += 10;
    return currentPos;
};

/**
 * Renders the Languages section in a PDF, including a header, optional grid layout, and progress bars
 * for each language's proficiency.
 *
 * @param {jsPDF} pdf - Instance of jsPDF used for drawing.
 * @param {Array<Object>} languagesArray - Array of language objects, each containing `language` and `proficiency`.
 * @param {string} [header="Language"] - Title/header of the section.
 * @param {{ x?: number, y?: number, centeredWidth?: number }} [coords={}] - Coordinates for placement. `x` and `y` specify the top-left of the section, `centeredWidth` for centered header.
 * @param {{
 *   headerStyle?: Object,
 *   subSubHeaderStyle?: Object
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

export const renderLanguagesSection = (
    pdf,
    languagesArray,
    header = "Language",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {

    const { x, y, centeredWidth } = coords
    const { left, right } = padding
    const { grid,
        gridConfig = {
            gridSize: 2,
            gapX:10,
            gapY:20
        },
        gridpadding = {
            xPadding: 5,
            yPadding: 5
        }
    } = props
    const { headerStyle, subSubHeaderStyle } = style
    let currentPos;
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    const { pdfWidth } = pdfSize(pdf)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y });
    if (grid) {
        currentPos = drawGridLayout(
            pdf,
            languagesArray,
            { x, y: currentPos.y },
            gridConfig,
            {},
            gridpadding,
            async (pdf, language, cellX, cellY, cellWidth) => {
                currentPos = drawLanguageItem(
                    pdf,
                    language,
                    cellX,
                    cellY,
                    cellWidth,
                    { subSubHeaderStyle },
                    props)
                return currentPos
            })
        return currentPos
    }
    for (let language of languagesArray)
        currentPos = drawLanguageItem(
            pdf,
            language,
            x,
            currentPos.y,
            pdfWidth - left - right,
            { subSubHeaderStyle },
            props)
    return currentPos
}