import jsPDF from "jspdf"
import { drawStyledText, drawWrappedLongText } from "../text"
import { pdfSize } from "../core"
/**
 * render summary 
 * @param {jsPDF} pdf -jsPDF instance
 * @param {string} summary -summary text to be draw
 * @param {{
 * x:number,
 * y:number 
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
export const renderSummarySection = async (pdf, summary, coords = {}, maxWidth, style = {}, padding = {}, props = {}) => {
    const { } = props
    const { x, y } = coords
    const { normalStyle, headerStyle } = style
    let currentPos;
    const { pdfWidth } = pdfSize(pdf)
    currentPos = drawStyledText(pdf, "Summary", { x: pdfWidth / 2, y }, headerStyle)
    currentPos = await drawWrappedLongText(pdf, summary, x, currentPos.y, maxWidth, normalStyle)
    return currentPos
}
