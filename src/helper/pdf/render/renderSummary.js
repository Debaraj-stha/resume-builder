import jsPDF from "jspdf"
import { drawStyledText, drawWrappedLongText } from "../text"
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
export const renderSummarySection = async (pdf, summary,header="Summary", coords = {}, maxWidth, style = {}, padding = {}, props = {}) => {
    const { } = props
    const { x, y,centeredWidth } = coords
    const { normalStyle, headerStyle } = style
    let currentPos;
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    currentPos = await drawWrappedLongText(pdf, summary, x, currentPos.y, maxWidth, normalStyle)
    return currentPos
}
