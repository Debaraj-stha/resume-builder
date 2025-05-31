import jsPDF from "jspdf";
import { drawJustifyTextItems, drawStyledText } from "../text";
import { drawLine } from "../graphics";
import { pdfSize } from "../core";

import { LiaMapMarkerSolid } from "react-icons/lia";
import { BiCalendar, BiCalendarAlt } from "react-icons/bi";
import { justifyType } from "../../../constant";
import { drawJustifyContentItems } from "../../helper";
import { drawIcon } from "../image";
import { drawVerticalDividerLayout } from "../layout";


/**
 * function to render education  section
 * @param {jsPDF} pdf -instance of jsPDF
 * @param {Array<object>} educationsArray -array of object of educations
 * @param {string} [header="Education"] - Header text for the section.
 * @param {{
 * x:number,
 * y:number,
 * centeredWidth:number
 * }} coords  -coordinate position
 * @param {{
 * headerStyle:object,
 * normalStyle:object,
 * subHeaderStyle:object,
 * subSubHeaderStyle:object
 * }} style -style object to apply on
 * @param {{
 * top:number,
 * left:number,
 * right:number,
 * bottom:number
 * }} padding -page padding
 * @param {object} props -optional properties
 * @returns {Promise<{x:number,y:number}>} -updates coordinates after rendering this section
 */
const renderEducationSection = async (pdf, educationsArray, header="Education",coords = {}, style = {}, padding = {}, props = {}) => {
    const { x, y ,centeredWidth} = coords
    const { headerStyle, normalStyle, subHeaderStyle, subSubHeaderStyle } = style
    const { top, left, bottom, right } = padding
    const {
        swapPosition = false,
        applyFlex = false,
        shouldIncludeIcon = false,
        applyVerticalDivider = false,
        side = false,
        shouldIncludeGPA = false,
        flexIcons = false,
        shouldIncludeAddress = false,
        shouldIncludeDate = false
    } = props
    let currentPos;
    const { pdfWidth } = pdfSize(pdf)
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y: y }, headerStyle)
    const x2 = pdfWidth - (left + right)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: x2, y2: currentPos.y },)


    for (let education of educationsArray) {
        const { degree, university, start_year, end_year, address, gpa } = education;
        let start_complete = ""
        if (start_year) {
            start_complete += " " + start_year
        }
        if (end_year) {
            start_complete += " " + end_year
        }
        const { pdfWidth } = pdfSize(pdf)
        const universityText = swapPosition ? degree : university
        const degreeText = swapPosition ? university : degree

        if (applyVerticalDivider) {
            const maxWidth = pdfWidth - left * 2;
            currentPos = await drawVerticalDividerLayout(
                pdf,
                {
                    leftSection: [
                        { text: start_complete, style: subHeaderStyle },
                    ],
                    mainSection: [
                        { text: degree, style: subHeaderStyle },
                        { text: university, style: subSubHeaderStyle },
                        shouldIncludeAddress && { text: gpa, style: normalStyle }

                    ]
                },
                {
                    x: left,
                    y: currentPos.y,
                    maxWidth: maxWidth,
                    styles: { bullet: normalStyle },


                }
            );

            continue
        }
        currentPos = drawStyledText(pdf, universityText, { x, y: currentPos.y }, subSubHeaderStyle)
        if (applyFlex) {
            if (!shouldIncludeAddress && !shouldIncludeDate && !address && !start_complete) {
                currentPos = drawStyledText(pdf, degreeText, { x, y: currentPos.y }, subSubHeaderStyle)
                continue
            }

            if (shouldIncludeIcon) {
                const itemIconMapArr = [{ text: degreeText }]
                if (shouldIncludeAddress) {
                    itemIconMapArr.push({ icon: LiaMapMarkerSolid, text: address })
                }
                if (shouldIncludeDate) {
                    itemIconMapArr.push({ icon: BiCalendarAlt, text: start_complete })
                }
                currentPos = await drawJustifyContentItems(pdf,
                    itemIconMapArr,
                    { x, y: currentPos.y, maxWidth: pdfWidth - (left + right) },
                    [normalStyle, normalStyle]
                )
            }
            else {
                const items = [degreeText]
                const styles = [normalStyle]
                if (shouldIncludeDate) {
                    items.push(start_complete)
                    styles.push(normalStyle)
                }
                if (shouldIncludeAddress) {
                    items.push(address)
                    styles.push(normalStyle)
                }
                currentPos = drawJustifyTextItems(pdf, items,
                    { x, y: currentPos.y, maxWidth: pdfWidth - (left + right) },
                    styles)
            }
        }
        else {
            currentPos = drawStyledText(pdf, degreeText, { x, y: currentPos.y }, normalStyle);

            let offsetX = left
            const baseLineY = currentPos.y;
            if (flexIcons) {
                // shouldIncludeIcon = true

                if (shouldIncludeDate) {
                    const iconSize = 10;
                    const iconY = baseLineY - iconSize + 3;
                    offsetX = (await drawIcon(pdf, BiCalendar, { x: offsetX, y: iconY }, { width: iconSize, height: iconSize })).x;
                    offsetX = drawStyledText(pdf, start_complete, { x: offsetX, y: baseLineY }, normalStyle).x;
                }

                if (shouldIncludeAddress) {
                    const iconSize = 10;
                    const iconY = baseLineY - iconSize + 3;
                    offsetX = (await drawIcon(pdf, LiaMapMarkerSolid, { x: offsetX, y: iconY }, { width: iconSize, height: iconSize })).x;

                    currentPos = drawStyledText(pdf, address, { x: offsetX, y: baseLineY }, normalStyle);
                }
            }
        }
        if (shouldIncludeGPA) {
            currentPos = drawStyledText(pdf, gpa, { x: left, y: currentPos.y })
        }
    }
    currentPos.y += 5
    return currentPos
}
export default renderEducationSection;