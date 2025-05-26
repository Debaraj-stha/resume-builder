import { pdfSize } from "../core";
import { drawStyledText, drawWrappedLongText } from "../text";
/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {Array} experiencesArray  - an array of experience objects
 * @param {object} coords  - coordinates for rendering
 * @param {object} coords.left - left margin for rendering
 * @param {number} coords.xPadding - horizontal padding for rendering
 * @param {*} style - styles for rendering
 * @param {object} style.headerStyle - style for the header
 * @param {object} style.subHeaderStyle - style for the sub-header (company name)
 * @param {object} style.normalStyle - style for normal text
 * @param {object} props - additional properties for rendering
 * @returns {{x: number, y: number}} - the coordinates after rendering
 * @description Renders a section for experiences in the PDF document.
 * The experiences are displayed with the company name, position, and a description of the company.
 * Achievements are also displayed if available.
 */
const renderExperienceSection = (pdf, experiencesArray, coords = {}, style = {}, props = {}) => {
    const { headerStyle, subHeaderStyle, normalStyle } = style
    const { left, xPadding } = coords
    const{}=props
    const { pdfWidth, pdfHeight } = pdfSize(pdf)
    let currentPos = drawStyledText(pdf, "Experiences", { x: pdfWidth / 2, y: coords.y }, headerStyle)
    for (const exp of experiencesArray) {

        const company = exp.company_name || exp.companyName || "Unknown Company";
        currentPos = drawStyledText(pdf, company, { x: left, y: currentPos.y }, subHeaderStyle);
        if (exp.position) {
            currentPos = drawStyledText(pdf, exp.position, { x: left, y: currentPos.y }, normalStyle);
        }
        if (exp.about_company || exp.aboutCompany) {
            currentPos = drawWrappedLongText(
                pdf,
                exp.about_company || exp.aboutCompany,
                left,
                currentPos.y,
                pdfWidth - xPadding,
                normalStyle
            );
        }

        // Optional: draw achievements
        if (exp.achievements?.length) {
            for (const { value } of exp.achievements) {
                currentPos = drawWrappedLongText(
                    pdf,
                    value,
                    left + 10,
                    currentPos.y,
                    pdfWidth - xPadding - 10,
                    normalStyle
                );
            }
        }

        // Space between entries
        currentPos.y += 10;
    }

    return currentPos;
};
export default renderExperienceSection;