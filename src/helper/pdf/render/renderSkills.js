import jsPDF from "jspdf"
import { drawJustifyTextItems, drawStyledText, drawTextItems } from "../text"
import { pdfSize } from "../core"
import { drawLine } from "../graphics"
/**
 * function to render skill section
 * @param {jsPDF} pdf -jsPDF instance
 * @param {Array<object>} skillsArray  -array of object of skills
 * @param {string} [header="Skill"] - Header text for the section.
 * @param {{x:number,y:number,centeredWidth:number}} coords  -coordinates position
 * @param {{
 * headerStyle:object,
 * subHeaderStyle:object,
 * subSubHeaderStyle:object,
 * normalStyle:object
 * }} style  -styles
 * @param {{top:number,left:number,right:number,bottom:number}} padding -padding applied to page
 * @param {object} props -optional properties
 * @returns {Promise<{x:number,y:number}>}
 */
export const renderSkillsSection = (pdf, skillsArray,header="Skills",coords = {}, style = {}, padding, props = {}) => {
    const {
        shouldIncludeField = false,
        borderBox = false,
        borderBottom = false } = props
    const { x, y } = coords
    const { headerStyle,  subSubHeaderStyle, normalStyle } = style
    const { pdfWidth } = pdfSize(pdf)
    const { right, left } = padding
    let currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y },)
    if (!shouldIncludeField) {
        const items = skillsArray.flatMap(skill => skill.items)
        currentPos = drawTextItems(pdf,
            items,
            { x: x, y: currentPos.y },
            {...normalStyle,gapX:14,
             gapY:10
            },
            pdfWidth - (left + right),
            { borderBottom, borderBox })
        return currentPos
    }
    for (let skill of skillsArray) {
        const { field, items } = skill
        let rowPos
        if (shouldIncludeField) {
            rowPos = drawStyledText(pdf, field + ": ", { x, y: currentPos.y }, subSubHeaderStyle)
            currentPos = drawTextItems(pdf, items, { x: rowPos.x, y: currentPos.y }, normalStyle, pdfWidth - (left + right))
        }

        // currentPos = drawJustifyTextItems(pdf, items, { x: rowPos.x, y: currentPos.y, maxWidth: pdfWidth - (left + right) - rowPos.x }, normalStyle)

    }

    return currentPos
}