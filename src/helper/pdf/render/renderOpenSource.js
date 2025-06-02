import { pdfSize } from "../core";
import { drawLine } from "../graphics";
import { drawJustifyTextItems, drawStyledText, drawTextItems, drawWrappedLongText } from "../text";

const drawOpenSourceWorkItem = async (
    pdf,
    openSourceWorkObj,
    x,
    y,
    maxWidth,
    style = {},
    props = {}
) => {
    const {
        projectName,
        role,
        description,
        technologies = [],
        link,
        date
    } = openSourceWorkObj;

    const {
        flexLinkAndDate = true,
        includeDate = true,
        includeLink = true,
        includeRole = false
    } = props;

    const { subSubHeaderStyle, normalStyle } = style;
    let currentPos = await drawWrappedLongText(pdf, projectName, x, y, maxWidth, subSubHeaderStyle);
    const linkColor = [19, 70, 212]
    // Render link and date
    const showDate = includeDate && date;
    const showLink = includeLink && link;

    if (showDate && showLink) {
        if (flexLinkAndDate) {
            currentPos = await drawJustifyTextItems(
                pdf,
                [link, date],
                { x, y: currentPos.y, maxWidth },
                [{ ...normalStyle, color: linkColor }, normalStyle]
            );
        } else {
            currentPos = await drawStyledText(pdf, date, { x, y: currentPos.y }, normalStyle);
            currentPos = await drawWrappedLongText(pdf, link, x, currentPos.y, maxWidth, { ...normalStyle, color: linkColor });
        }
    } else if (showDate) {
        currentPos = await drawStyledText(pdf, date, { x, y: currentPos.y }, normalStyle);
    } else if (showLink) {
        currentPos = await drawStyledText(pdf, link, { x, y: currentPos.y }, { ...normalStyle, color: linkColor });
    }

    // Render role
    if (includeRole && role) {
        currentPos = await drawStyledText(pdf, role, { x, y: currentPos.y }, normalStyle);
    }

    // Render description
    if (description) {
        currentPos = await drawWrappedLongText(pdf, description, x, currentPos.y, maxWidth, normalStyle);
    }

    // Render technologies
    const techList = (technologies || []).map(t => typeof t === 'string' ? t : t?.value).filter(Boolean);
    if (techList.length > 0) {
        currentPos = drawTextItems(pdf, techList, { x, y: currentPos.y }, normalStyle);
    }

    return currentPos;
};

/**
 * Renders the certificate section in a PDF using jsPDF.
 *
 * @async
 * @function
 * @param {jsPDF} pdf - Instance of jsPDF used to render content.
 * @param {Array<object>} openSourceWorkArray - Array of open source work objects to render.
 * @param {string} [header="Open Source work"] - Header text for the section.
 * @param {Object} coords - Coordinates for rendering.
 * @param {number} coords.x - X position to start rendering.
 * @param {number} coords.y - Y position to start rendering.
 * @param {number} coords.centeredWidth - Centered width position for header.
 * @param {Object} style - Styling information for section text.
 * @param {object} style.headerStyle - Style object for the header text.
 * @param {object} style.subSubHeaderStyle - Style object for subheaders (e.g., titles of individual trainings).
 * @param {object} style.normalStyle - Style object for normal/description text.
 * @param {Object} padding - Padding around the section.
 * @param {number} padding.top - Top padding.
 * @param {number} padding.left - Left padding.
 * @param {number} padding.right - Right padding.
 * @param {number} padding.bottom - Bottom padding.
 * @param {Object} props - Additional properties that may be used during rendering.
 * @returns {Promise<{x: number, y: number}>} Updated coordinates after rendering the section.
 */
export const renderOpenSourceWorkSection = async (
    pdf,
    openSourceWorkArray,
    header = "Open Source work",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x, y, centeredWidth } = coords
    const { headerStyle, subSubHeaderStyle, normalStyle } = style
    const {
        flexLinkAndDate = true,
        includeDate = true,
        includeLink = true,
        includeRole = false

    } = props
    const { left, right } = padding
    const { pdfWidth } = pdfSize(pdf)
    const maxWidth = pdfWidth - left - right
    let currentPos
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y })
    if (props.grid) {
        return currentPos
    }
    for (let openSourceWorkObj of openSourceWorkArray) {
        currentPos = await drawOpenSourceWorkItem(
            pdf,
            openSourceWorkObj,
            x,
            currentPos.y,
            maxWidth,
            { subSubHeaderStyle, normalStyle },
            props)
        currentPos.y += 5
    }
    return currentPos

}