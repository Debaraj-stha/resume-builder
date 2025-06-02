import { pdfSize } from "../core"
import { drawLine } from "../graphics"
import { drawGridLayout } from "../layout"
import { drawStyledText, drawWrappedLongText } from "../text"
const drawCertificateitem = async (pdf, certificateObj, x, y, maxWidth, style = {}, shouldIncludeDate) => {
    const { certificate, subject, date } = certificateObj
    const { subSubHeaderStyle, normalStyle } = style
    let currentPos;
    currentPos = await drawWrappedLongText(pdf, certificate, x, y, maxWidth, subSubHeaderStyle)
    currentPos = await drawWrappedLongText(pdf, subject, x, currentPos.y, maxWidth, normalStyle)
    if (shouldIncludeDate)
        currentPos = drawStyledText(pdf, date, { x, y: currentPos.y }, normalStyle)
    return currentPos
}

/**
 * Renders the certificate section in a PDF using jsPDF.
 *
 * @async
 * @function
 * @param {jsPDF} pdf - Instance of jsPDF used to render content.
 * @param {Array<object>} certificateArray - Array of certificate objects to render.
 * @param {string} [header="Certificate"] - Header text for the section.
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
export const renderCertificateSection = async (
    pdf,
    certificateArray,
    header = "Certificate",
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { x, y, centeredWidth } = coords
    const {
        grid = false,
        gridSize = 2,
        gapX = 10,
        gapY = 20,
        gridpadding = {
            xPadding: 5,
            yPadding: 5
        },
        shouldIncludeDate = false
    } = props
    const { headerStyle, subSubHeaderStyle, normalStyle } = style
    const {  left, right } = padding
    let currentPos;
    const { pdfWidth } = pdfSize(pdf)
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y }, headerStyle)
    currentPos = drawLine(pdf, { x1: x, y1: currentPos.y, x2: pdfWidth - right, y2: currentPos.y })
    if (grid) {
        currentPos = await drawGridLayout(pdf,
            certificateArray,
            { x, y: currentPos.y, },
            { gridSize, gapX, gapY },
            {},
            gridpadding,
            async (pdf, certificateObj, cellX, cellY, cellwidth) => {
                currentPos = await drawCertificateitem(
                    pdf,
                    certificateObj,
                    cellX,
                    cellY,
                    cellwidth,
                    { subSubHeaderStyle, normalStyle },
                    shouldIncludeDate)
                return currentPos
            }

        )
        return currentPos
    }
    for (let certificate of certificateArray) {
        currentPos = await drawCertificateitem(
            pdf,
            certificate,
            x,
            currentPos.y,
            pdfWidth - left - right,
            { subSubHeaderStyle, normalStyle },
            shouldIncludeDate
        )
        currentPos.y += 5
    }
    return currentPos
}
