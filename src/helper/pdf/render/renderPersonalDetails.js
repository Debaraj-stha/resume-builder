import { pdfSize } from "../core";
import { drawStyledText, drawTextWithIcon } from "../text";
import { drawFlexWrappedItems, drawRectangle } from "../graphics";

import { BiMobile } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { LiaLinkedin, LiaMapMarkerSolid } from "react-icons/lia";
import { BsGithub, BsGlobe } from "react-icons/bs";
import jsPDF from "jspdf";


const contactIconsMap = {
    phone: BiMobile,
    email: MdEmail,
    linkedin: LiaLinkedin,
    github: BsGithub,
    website: BsGlobe,
    address: LiaMapMarkerSolid,
};

/**
 * function to render personal details on pdf
 * @param {jsPDF} pdf -an instance of jsPDF
 * @param {object} personalDetails - personal details object 
 * @param {{
 * top:number,
 * left:number,
 * centeredWidth:number
 * }} coords - object contaning top and left position
 * @param {{
 * headerBgStyle,
 * nameStyle,
 * subHeaderStyle,
 * normalStyle,
 * nameInitialStyle,
 * contactStyle
 * }} style  -style object 
 * @param {{
 * xPadding:number,
 * yPadding:number
 * }} padding -object containing xpadding and ypadding 
 * @param {{
 * includeIcon:boolean,
 * isStatic:boolean,
 * shouldIncludeImage:boolean,
 * rectangularImage:boolean,
 * addressOnNextLine:boolean,
 * includeNameInitial:boolean
 * }} props -extra props
 * @returns {Promise<{x:number,y:number}>} -x and y coordinates for further use
 */
const renderPersonalDetailsSection = async (
    pdf,
    personalDetails,
    coords = {},
    style = {},
    padding = {},
    props = {}
) => {
    const { pdfWidth } = pdfSize(pdf);
    const {
        nameStyle,
        subHeaderStyle,
        normalStyle,
        headerBgStyle,
        nameInitialStyle = {
            fillColor: [255, 0, 0],
            textColor: [255, 255, 255],
            borderColor: [255, 255, 200]
        },
        subSubHeaderStyle,
        contactStyle
    } = style;
    const {
        includeIcon,
        shouldIncludeImage,
        rectangularImage,
        addressOnNextLine,
        isStatic,
        includeAddress,
        includeNameInitial,
        listStyle,
        centeredProfession,
        includeProfession
    } = {
        includeIcon: true,
        shouldIncludeImage: false,
        rectangularImage: false,
        addressOnNextLine: false,
        isStatic: false,
        includeAddress: false,
        includeNameInitial: false,
        listStyle: null,
        centeredProfession: false,
        includeProfession: true,
        ...props
    };

    const { gapX = 5, gapY = 5 } = contactStyle || {};
    const { top = 20, left = 20, centeredWidth } = coords;
    const { xPadding = 20, yPadding = 20 } = padding;
    console.log("rendering personal details", personalDetails);
    const {
        name,
        profession,
        email,
        phone,
        address,
        profile,
        urls: rawUrls = [],
    } = personalDetails;

    const urls = rawUrls.map((url) => url?.value).filter(Boolean);

    let currentY = top;
    // Draw name (centered)
    const namePos = drawStyledText(pdf, name, { x: centeredWidth, y: currentY + nameStyle?.fontSize || 0 }, nameStyle);
    // Draw name initials if enabled
    if (includeNameInitial) {
        const boxX = pdfWidth - 75;
        const boxY = currentY;
        const boxWidth = 50;
        const boxHeight = 50;

        drawRectangle(pdf, { x: boxX, y: boxY, width: boxWidth, height: boxHeight }, { ...nameInitialStyle, borderStyle: "F" });
        const name = personalDetails.name
        const initials = (name || "")
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

        pdf.setTextColor(...(nameInitialStyle.textColor || [0, 0, 0]));
        pdf.text(initials, boxX + boxWidth / 2, boxY + boxHeight / 2 + 5, { align: "center" });
    }

    currentY = namePos.y;

    // Draw profession
    if (includeProfession)
        currentY = drawStyledText(pdf, profession, { x: centeredWidth, y: currentY }, {
            ...subSubHeaderStyle,
            ...(centeredProfession ? { align: "center" } : {})
        }
        ).y;

    const contactItems = [];
    if (phone != null && phone.trim() !== "")
        contactItems.push({ type: "phone", value: phone })
    if (email != null && email.trim() !== "")
        contactItems.push({ type: "email", value: email });

    // Prepare contact items
    contactItems.push(
        ...urls.map((url) => {
            const lower = url?.toLowerCase();
            const type = lower?.includes("linkedin")
                ? "linkedin"
                : lower.includes("github")
                    ? "github"
                    : "website";
            return { type, value: url };
        })
    )
    if (includeAddress && (address != null && address.trim() !== ""))
        contactItems.push({ type: "address", value: address });


    // Handle address separately if needed
    let filteredItems = contactItems;
    if (includeAddress && addressOnNextLine) {
        filteredItems = contactItems.filter((item) => item.type !== "address");
    }

    // Draw contact info (centered flex wrap)
    const contactPos = await drawFlexWrappedItems(
        pdf,
        filteredItems,
        { x: left, y: currentY, maxWidth: pdfWidth - xPadding / 2 },
        { ...normalStyle, gapX: gapX, gapY: gapY, ...contactStyle, },
        { includeIcon, iconMap: contactIconsMap, listStyle }
    );
    currentY = contactPos.y;

    // Draw address below if on a new line
    if (addressOnNextLine && address && includeAddress) {
        if (includeIcon) {
            const addressPos = await drawTextWithIcon(
                pdf,
                contactIconsMap.address,
                address,
                { x: left, y: currentY },
                normalStyle
            )
            currentY=addressPos.y
        } else {
            currentY = drawStyledText(pdf, address, { x: left, y: currentY }, normalStyle).y;
        }
    }

    // Draw image if needed
    if (shouldIncludeImage && profile && profile.length > 0) {
        const imageBlob = isStatic ? profile[0] : await profile[0].arrayBuffer();
        const imageDataUrl = isStatic
            ? profile[0]
            : URL.createObjectURL(new Blob([imageBlob]));
        const imgX = pdfWidth - 40;
        const imgY = top;
        const imgW = rectangularImage ? 30 : 25;
        const imgH = rectangularImage ? 30 : 25;
        pdf.addImage(imageDataUrl, "JPEG", imgX, imgY, imgW, imgH);
    }

    // Draw header background if applicable
    if (headerBgStyle?.fillColor) {
        pdf.setFillColor(...headerBgStyle.fillColor);
        pdf.rect(0, 0, pdfWidth, currentY, "F");
    }


    return { x: left, y: currentY + 15 };
};

export default renderPersonalDetailsSection;
