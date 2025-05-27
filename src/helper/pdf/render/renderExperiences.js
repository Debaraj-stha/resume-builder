import { pdfSize } from "../core";
import { LiaMapMarkerSolid } from "react-icons/lia"
import { drawBulletText, drawJustifyItems, drawStyledText, drawTextWithIcon, drawWrappedLongText } from "../text";
import { BiCalendar } from "react-icons/bi";
/**
 * 
 * @param {jsPDF} pdf an instance of jsPDF
 * @param {Array} experiencesArray  - an array of experience objects
 * @param {object} coords  - coordinates for rendering
 * @param {object} coords.left - left margin for rendering
 * @param {number} coords.xPadding - horizontal padding for rendering
 * @param {object} style - styles for rendering
 * @param {object} style.headerStyle - style for the header
 * @param {object} style.subHeaderStyle - style for the sub-header (company name)
 * @param {object} style.normalStyle - style for normal text
 * @param {object} props - additional properties for rendering
 * @returns {{x: number, y: number}} - the coordinates after rendering
 * @description Renders a section for experiences in the PDF document.
 * The experiences are displayed with the company name, position, and a description of the company.
 * Achievements are also displayed if available.
 */
const renderExperienceSection = async (pdf, experiencesArray, coords = {}, style = {}, props = {}) => {
    const { headerStyle, subHeaderStyle, subsubHeaderStyle, normalStyle } = style
    const { left, xPadding } = coords
    const { listStyle = null, applyFlex = false, includeIcon = false, flexLocationDate = false } = props
    const { pdfWidth, pdfHeight } = pdfSize(pdf)
    let currentPos = drawStyledText(pdf, "Experiences", { x: pdfWidth / 2, y: coords.y }, headerStyle)
    for (const exp of experiencesArray) {

        const companyName = exp.company_name || "Unknown Company";
        const aboutCompany = exp.about_company || "No information available.";
        const position = exp.position || "Position not specified.";
        const location = exp.location || "Location not specified.";
        const startDate = exp.start_date || new Date().toLocaleDateString();
        const endDate = exp.end_date || new Date().toLocaleDateString();
        const achievements = exp.achievements || [];
        const maxWidth = pdfWidth - left * 2
        const date = `${startDate} - ${endDate}`;
        if (applyFlex) {
            currentPos = drawJustifyItems(
                pdf,
                [position, location], // Any number of items
                { x: left, y: currentPos.y, maxWidth },
                [subHeaderStyle, normalStyle]
            );
            currentPos = drawJustifyItems(
                pdf,
                [companyName, date], // Any number of items
                { x: left, y: currentPos.y, maxWidth },
                [subsubHeaderStyle, normalStyle]
            );
        }
        else {
            currentPos = drawStyledText(pdf, position, { x: left, y: currentPos.y }, subHeaderStyle);
            currentPos = drawStyledText(pdf, companyName, { x: left, y: currentPos.y }, subsubHeaderStyle);
            if (flexLocationDate) {
                currentPos = drawJustifyItems(pdf, [location, `${startDate}-${endDate}`],
                    { x: left, y: currentPos.y, maxWidth }, [normalStyle, normalStyle]);
            }
            else if (includeIcon) {
               let iconPos= await drawTextWithIcon(pdf, LiaMapMarkerSolid, location, { x: left, y: currentPos.y-5 }, normalStyle);
                currentPos = await drawTextWithIcon(pdf, BiCalendar,date, { x: iconPos.x+14, y: currentPos.y-5 }, normalStyle);
            }

        }
        
        if (exp.about_company || exp.aboutCompany) {
            currentPos = await drawWrappedLongText(
                pdf,
                aboutCompany,
                left,
                currentPos.y,
                pdfWidth - xPadding,
                normalStyle
            );
        }

        if (achievements?.length) {
            for (const { value } of achievements) {
                if (listStyle === "bullet") {
                    currentPos = await drawBulletText(
                        pdf,
                        value,
                        left,
                        currentPos.y-10,
                        pdfWidth - xPadding,
                        normalStyle
                    );
                } else {
                    currentPos = await drawWrappedLongText(
                        pdf,
                        value,
                        left,
                        currentPos.y,
                        pdfWidth - xPadding,
                        normalStyle
                    );
                }
            }
        }


        // Space between entries
        currentPos.y += 10;
    }

    return currentPos;
};
export default renderExperienceSection;