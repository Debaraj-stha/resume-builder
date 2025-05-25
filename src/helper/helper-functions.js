import { renderIconToBase64 } from "../components/RenderIconToBase64";

export const applyStyle = (pdf, style = {}) => {
    if (style.font)
        pdf.setFont(style.font.family || "Helvetica", style.font.style || "normal");
    if (style.fontSize)
        pdf.setFontSize(style.fontSize);
    if (style.color)
        pdf.setTextColor(...style.color);
    if (style.fillColor)
        pdf.setFillColor(...style.fillColor);
    if (style.drawColor)
        pdf.setDrawColor(...style.drawColor);
};

export const convertImageToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
});

export const drawStyledText = (pdf, text, x, y, style = {}) => {
    applyStyle(pdf, style);
    if (style.background) {
        const width = pdf.getTextWidth(text) + 4;
        const height = style.fontSize || 12;
        pdf.rect(x - 2, y - height + 4, width, height, 'F');
    }
    const align = style.align || 'left';
    const xPos = align === 'center' ? x : (align === 'right' ? x - pdf.getTextWidth(text) : x);
    pdf.text(text, xPos, y, { align });
};

export const drawRectangle = (pdf, x, y, width, height, style = {}) => {
    const {
        borderColor = [0, 0, 0],
        borderWidth = 1,
        fillColor = null,
        borderStyle = "S"
    } = style;
    pdf.setDrawColor(...borderColor);
    pdf.setLineWidth(borderWidth);
    if (fillColor)
        pdf.setFillColor(...fillColor);
    pdf.rect(x, y, width, height, fillColor ? borderStyle : "S");
};

export const drawCircle = (pdf, x, y, r, style = {}) => {
    const {
        borderColor = [0, 0, 0],
        borderStyle = 'S',
        borderWidth = 1,
        fillColor = null,
    } = style;
    pdf.setDrawColor(...borderColor);
    pdf.setLineWidth(borderWidth);
    if (fillColor)
        pdf.setFillColor(...fillColor);
    pdf.circle(x, y, r, fillColor ? borderStyle : 'S');
};

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
    } catch (err) {
        console.error("Failed to load image:", err);
    }
};

export const drawLine = (pdf, coords = {}, style = {}) => {
    const {
        width = 1,
        color = [0, 0, 0], // more visible
        dash = []//dashed line [2,2] 4 dash 2 gap
    } = style;
    const { x1 = 10,
        y1 = 10,
        x2 = 100,
        y2 =10 } = coords
        console.log("dash",dash)
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    if (dash.length > 0) {
        pdf.setLineDashPattern(dash, 0);
    }
    pdf.line(x1, y1, x2, y2);
    if (dash.length > 0) {
        pdf.setLineDashPattern([], 0);
    }
};
export const drawIcon = async (pdf, icon, style = {}) => {
    const {
        width = 20,
        height = 20,
        x = 0,
        y = 0,
        ...rest
    } = style;

    const finalStyle = { width, height, x, y, ...rest };
    const iconData = await renderIconToBase64(icon, finalStyle);
    await drawImage(pdf, iconData, { ...finalStyle, format: "PNG" });
};
export const drawDoubleLine = (pdf, coords={}, style = {}) => {
    const {
        color = [0, 0, 0],
        width = 1,
    } = style
    const{
         x1 = 0,
        y1 = 0,
        x2 = 100,
        y2 = 0
    }=coords
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);
    pdf.line(x1, y1, x2, y2);         // First line
    pdf.line(x1, y1 + 3, x2, y1 + 3); // Second line (3px below)

}

export const drawLineWithDotAtCenter = (pdf, coords = {}, style = {}) => {
    const {
        x1 = 10,        // start x of the line
        y1 = 50,        // y position (horizontal line)
        x2 = 200,       // end x of the line,
        y2 = 50

    } = coords;

    const {
        color = [0, 0, 0], // RGB color, default black
        width = 1          // line width
    } = style;

    // Set stroke color and line width
    pdf.setDrawColor(...color);
    pdf.setLineWidth(width);

    // Calculate middle x
    const xMid = (x1 + x2) / 2;

    // Draw left line (from x1 to 5 units before middle)
    pdf.line(x1, y1, xMid - 5, y2);

    // Draw filled circle at middle
    pdf.circle(xMid, y1, 2, 'F');

    // Draw right line (from 5 units after middle to x2)
    pdf.line(xMid + 5, y1, x2, y2);
};

export const drawLineWithBoxAtCenter = (pdf, coords = {}, style = {}) => {
    const {
        x1 = 10,        // start x of the line
        y1 = 50,        // y position (horizontal line)
        x2 = 200,    // end x of the line,
        y2 = 50,
    } = coords;
    const { width = 1, color = [0, 0, 0] } = style
    pdf.setDrawColor(...color)
    pdf.setLineWidth(width)
    const xMid = (x1 + x2) / 2
    pdf.line(x1, y1, xMid - 5, y2)
    pdf.rect(xMid - 5, y1 - 5, 10, 10); // 10x10 box centered
    pdf.line(xMid + 5, y1, x2, y2)

}

export const drawZigZagLine = (pdf, coords = {}, style = {}) => {
    const { x1 = 10, x2 = 300, y1 = 300, y2 = 300 } = coords
    let x = x1;
    const amplitude = 3;
    const step = 6;
    let goingUp = true;
    const{color=[0,0,0],width=1}=style
    pdf.setDrawColor(...color)
    pdf.setLineWidth(width)

    while (x < x2) {
        const nextX = x + step;
        const nextY = goingUp ? y1 - amplitude : y2 + amplitude;
        pdf.line(x, y1, nextX, nextY);
        x = nextX;
        goingUp = !goingUp;
    }

}


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
    } catch (error) {
        console.error("Error drawing element to PDF:", error);
    }
};