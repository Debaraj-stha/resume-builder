import html2canvas from "html2canvas";
import { createRoot } from "react-dom/client";

/**
 * Renders a React icon component to a base64-encoded PNG image.
 * @param {React.ComponentType} IconComponent - The React icon component (e.g., FaLinkedinIn — not JSX).
 * @param {Object} style - Optional styles including fontSize and color.
 * @returns {Promise<string>} Base64 PNG data URL of the rendered icon.
 */
const renderIconToBase64 = async (IconComponent, style = {}) => {
    // Create a hidden container off-screen to hold the icon during rendering
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px'; // Hide off-screen
    container.style.fontSize = style.fontSize || '24px';
    container.style.color = style.color || 'black';      
    document.body.appendChild(container);

    // Create an inner div where the icon will be rendered
    const icon = document.createElement('div');
    container.appendChild(icon);

    // Create a React root and render the icon component
    const root = createRoot(icon);
    root.render(<IconComponent />);

    // Wait briefly to ensure the icon is fully rendered in the DOM
    await new Promise(resolve => setTimeout(resolve, 100));

    // Capture the rendered icon as a canvas using html2canvas
    const canvas = await html2canvas(icon);

    // Convert the canvas to a base64-encoded PNG image
    const dataUrl = canvas.toDataURL('image/png');

    // Clean up: unmount the React component and remove the container
    root.unmount();
    document.body.removeChild(container);
    return dataUrl;
};
export default renderIconToBase64;