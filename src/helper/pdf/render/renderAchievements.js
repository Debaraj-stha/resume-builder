import jsPDF from "jspdf";
import { pdfSize } from "../core";
import { drawStyledText } from "../text";

/**
 * function to render achivement
 * @param {jsPDF} pdf -instance of jsPDF
 * @param {Array<object>} achievementsArray  -array of achievements
 * @param {{x:number,y:number}} coords -coordinates position
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
export const renderAchievementsSection = async (pdf, achievementsArray, coords = {}, style = {},padding={}, props = {}) => {
    const { x, y } = coords
    const { headerStyle, normalStyle, subHeaderStyle, subSubHeaderStyle } = style
    const { displayGrid, gridSize, applyVirticalDivider } = props
    const { pdfWidth } = pdfSize(pdf)
    let currentPos;
    currentPos = drawStyledText(pdf, "Achievements", { x: pdfWidth / 2, y }, headerStyle)
    for (let achievements of achievementsArray) {

    }

    return currentPos
}