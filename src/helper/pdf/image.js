import html2canvas from "html2canvas";
import { convertImageToBase64 } from "./core";
import jsPDF from "jspdf";
import renderIconToBase64 from "../../components/RenderIconToBase64"
/**
 * @function drawElementByClassToPDF
 * @param {jsPDF} pdf - An instance of jsPDF where the element will be rendered.
 * @param {string} className - The class name of the HTML element to capture.
 * @param {object} options - Coordinates and dimensions for rendering the image.
 * @param {number} options.x - X-coordinate for the image placement (default: 10).
 * @param {number} options.y - Y-coordinate for the image placement (default: 10).
 * @param {number} options.width - Width of the rendered image (default: 100).
 * @param {number} options.height - Height of the rendered image (default: 20).
 * @returns {object|undefined} Coordinates after image placement or undefined on failure.
 * 
 * @description Captures a DOM element with a specified class name using `html2canvas`,
 * converts it to a PNG image, and draws it on the PDF at the specified location.
 * Useful for rendering styled HTML blocks (e.g., charts, styled divs) into the PDF.
 */

export const drawElementByClassToPDF = async (pdf, className, options = {}) => {
    const {
        x = 10,
        y = 10,
        width = 100,
        height = 20
    } = options;

    const node = document.querySelector(`.${className}`);

    if (!node) {
        console.warn(`Element with class "${className}" not found.`);
        return;
    }

    try {
        const canvas = await html2canvas(node);
        const dataUrl = canvas.toDataURL("image/png");
        pdf.addImage(dataUrl, "PNG", { x, y, width, height });
        return { y: y + height, x: x + width }
    } catch (error) {
        console.error("Error drawing element to PDF:", error);
        return {x,y}
    }
};

/**
 * @function drawIcon
 * @param {jsPDF} pdf - An instance of jsPDF where the icon will be drawn.
 * @param {string|ReactElement} icon - The icon to render; passed to a rendering utility that converts it to base64.
 * @param {object} coords - Coordinates to draw the icon.
 * @param {number} coords.x - X-position (default: 10).
 * @param {number} coords.y - Y-position (default: 10).
 * @param {object} style - Style configuration for the icon.
 * @param {number} style.width - Width of the icon (default: 10).
 * @param {number} style.height - Height of the icon (default: 10).
 * @param {string} style.color -color of the icon(default :black)
 * @returns {{x:number,y:number}} Coordinates after drawing the icon.
 * 
 * @description Converts a given icon (component or identifier) to a base64 image using
 * `renderIconToBase64` and draws it onto the PDF at the given position.
 * Handles sizing, styling, and fallback if the icon is missing.
 */

export const drawIcon = async (pdf, icon, coords = {}, style = {}) => {
    const {
        width = 10,
        height = 10,
        ...rest
    } = style;
    const { x = 10, y = 10 } = coords;
    if (!icon) {
        console.warn("Missing icon");
        return { y, x };
    }
    const finalStyle = { width, height, x, y, ...rest };
    console.log("final style",finalStyle)
    const iconData = await renderIconToBase64(icon, finalStyle);
    const currentPos = await drawImage(pdf, iconData, { ...finalStyle ,format: 'PNG' });
    console.log("icon is drawn",currentPos)
    return currentPos
};

/**
 * @function drawImage
 * @param {jsPDF} pdf - An instance of jsPDF where the image will be drawn.
 * @param {string|File|Blob} src - Source of the image: can be a base64 string, URL, or File/Blob object.
 * @param {object} style - Style and positioning configuration.
 * @param {number} style.x - X-coordinate (default: 0).
 * @param {number} style.y - Y-coordinate (default: 0).
 * @param {number} style.width - Width of the image (default: 100).
 * @param {number} style.height - Height of the image (default: 100).
 * @param {string} style.format - Format of the image for jsPDF (default: 'JPEG').
 * @returns {object} Coordinates after drawing the image, or the current coords if failed.
 * 
 * @description Draws an image from a variety of sources (base64, URL, file/blob)
 * by converting it to base64 if necessary and embedding it into the PDF using `addImage`.
 * Handles fetch and conversion logic for external or local files.
 */
export const drawImage = async (pdf, src, style = {}) => {
    const {
        width = 100,
        height = 100,
        x = 0,
        y = 0,
        format = 'JPEG'
    } = style;
    if (!src) {
        console.warn("Missing image source");
        return;
    }

    try {
        let base64;

        if (typeof src === 'string' && src.startsWith('data:image')) {
            // Already base64
            base64 = src;
        } else if (typeof src === 'string' && src.startsWith('http')) {
            // It's a URL, fetch it as blob then convert
            const response = await fetch(src);
            const blob = await response.blob();
            base64 = await convertImageToBase64(blob);
        } else {
            // File or Blob
            base64 = await convertImageToBase64(src);
        }

        pdf.addImage(base64, format, x, y, width, height);
        return { y: y + height, x: x + width+2 }
    } catch (err) {
        console.error("Failed to load image:", err);
        return { y: y, x: x }
    }
};