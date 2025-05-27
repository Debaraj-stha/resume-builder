import { BiMobile } from "react-icons/bi"
import { MdEmail } from "react-icons/md"
import { LiaLinkedin, LiaMapMarkerSolid } from "react-icons/lia"
import { BsGithub, BsGlobe } from "react-icons/bs"
import { pdfSize } from "../core"
import { drawStyledText, drawTextWithIcon } from "../text"
import { drawFlexWrappedItems } from "../graphiics"

const contactIconsMap = {
    phone: BiMobile,
    email: MdEmail,
    linkedin: LiaLinkedin,
    github: BsGithub,
    website: BsGlobe,
    address: LiaMapMarkerSolid
}
/**
 * 
 * @param {jsPDF} pdf  an instance of jsPDF
 * @param {object} personalDetails  - an object containing personal details
 * @param {object} coords  - coordinates for rendering
 * @param {object} style  - styles for rendering
 * @param {object} style.nameStyle - style for the name
 * @param {object} style.subHeaderStyle - style for the sub-header (profession)
 * @param {object} padding  - padding for rendering
 * @param {number} padding.xPadding - horizontal padding
 * @param {number} padding.yPadding - vertical padding
 * @param {object} props  - additional properties for rendering
 * @param {object} props  -extra properties for rendering, such as includeIcon
 * @returns {Promise<object>} - returns a promise that resolves to the current position after rendering
 * @description Renders the personal details section of a PDF document.
 * The personal details include name, profession, contact information (phone, email, address), and URLs (LinkedIn, GitHub, website).
 * It uses the provided styles and coordinates to format the text and icons.
 * The function also supports padding and additional properties like including icons for contact items.
 */
const renderPersonalDetailsSection = async (pdf, personalDetails, coords = {}, style = {}, padding = {}, props = {}) => {
    const { pdfWidth, _ } = pdfSize(pdf)
    const { top, left } = coords
    const { nameStyle, subHeaderStyle, normalStyle } = style
    const { includeIcon = false, addressOnNextLine = false } = props
    const { xPadding = 20, yPadding = 20 } = padding
    let currentPos
    currentPos = drawStyledText(pdf, personalDetails.name, { x: pdfWidth / 2, y: top }, nameStyle)
    currentPos = drawStyledText(pdf, personalDetails.profession, { x: pdfWidth / 2, y: currentPos.y }, subHeaderStyle)
    const urls = personalDetails?.urls?.map(url => url.value)
    const { email, phone, address } = personalDetails
    const urlItems = (urls || []).map(url => {
        const lower = url.toLowerCase()
        if (lower.includes('linkedin')) {
            return { type: 'linkedin', value: url }
        } else if (lower.includes('github')) {
            return { type: 'github', value: url }
        } else {
            return { type: 'website', value: url }
        }
    })
    let contactItems = [
        { type: 'phone', value: phone },
        { type: 'email', value: email },
        ...urlItems,
        { type: 'address', value: address }
    ]
    console.log("addressOnNextLine", addressOnNextLine)
    if (addressOnNextLine) {
        contactItems = contactItems.filter(item => item.type !== 'address')
    }
    currentPos = await drawFlexWrappedItems(
        pdf,
        contactItems,
        { x: left, y: currentPos.y, maxWidth: pdfWidth - xPadding },

        { ...normalStyle, gapX: 2,align:"center",gapY: 5 },
        { includeIcon, iconMap: contactIconsMap, listStyle: "bullet" })
    if (addressOnNextLine && address && includeIcon) {
        currentPos = drawTextWithIcon(pdf, contactIconsMap.address, address, { x: left, y: currentPos.y }, normalStyle)
    }
    else if (addressOnNextLine && address) {
        currentPos = drawStyledText(pdf, address, { x: left, y: currentPos.y }, normalStyle)
    }
    return currentPos;
}
export default renderPersonalDetailsSection;