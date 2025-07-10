import jsPDF from "jspdf"
import { drawStyledText, drawWrappedLongText } from "../text"
import { drawLine } from "../graphics"
import { pdfSize } from "../core"
import capitalize from "../../capitalize"
/**
 * render summary 
 * @param {jsPDF} pdf -jsPDF instance
 * @param {string} summary -summary text to be draw
 * @param {string} [header="Summary"] - Header text for the section.
 * @param {{
 * x:number,
 * y:number ,
 * centeredWidth:number
 * }} coords  - coordinates point
 *  @param {number} maxWidth -maximum width available to render summary
 * @param {object} style  -style
 * @param {{
 * top:number,
 * left:number,
 * right:number,
 * bottom:number
 * }} padding -page padding
 * @param {object} props  -optional props
 * @returns {x:number,y:number}
 */
 const renderSummarySection = (pdf, summary, coords = {}, maxWidth, style = {}, padding = {}, props = {}, header = "Summary",) => {
    try {
        const { } = props
        const { x, y, centeredWidth, xPadding } = coords
        const { normalStyle, headerStyle } = style
        let currentPos;
        currentPos = drawStyledText(pdf, capitalize(header), { x: centeredWidth, y }, headerStyle)
        const { pdfWidth } = pdfSize(pdf)
        const x2 = pdfWidth - xPadding / 2
        currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: x2, y2: currentPos.y },)
        currentPos = drawWrappedLongText(pdf, summary, x, currentPos.y, maxWidth, normalStyle)
        return currentPos
    } catch (error) {
        console.error("Error rendering summary section:", error);
        return { x: coords.x, y: coords.y };
    }
}
export default renderSummarySection;