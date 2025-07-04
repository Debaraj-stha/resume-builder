import { pdfSize } from "../core";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { BiCalendar } from "react-icons/bi";
import {
  drawBulletText,
  drawJustifyTextItems,
  drawStyledText,
  drawTextWithIcon,
  drawWrappedLongText,
} from "../text";
import jsPDF from "jspdf";
import { drawVerticalDividerLayout } from "../layout";
import { drawLine } from "../graphics";
import capitalize from "../../capitalize";

/**
 *  Renders a section of experiences in a PDF document using jsPDF.
 * @param {jsPDF} pdf - The jsPDF instance to render the experiences on.
 * @param {Array<object>} experiencesArray  - Array of experience objects to render.
 * @param {string} [header="Experiences"] - Header text for the section.
 * @param {{
 * left: number,
 * y: number,
 * centeredWidth:number
 * xPadding: number
 * }} coords  - Coordinates for rendering the section.
 * @param {object<object>} style  - Styles for the section, including header, subheader, and normal text styles.
 * @param {{
 * top:number,
 * left:number,
 * right:number,
 * bottom:number
 * }} padding -page padding
 * @param {object} props  - Additional properties to customize the rendering, such as:
 * @returns 
 */

const renderExperienceSection = async (
  pdf,
  experiencesArray,
  header = "Experience",
  coords = {},
  style = {},
  padding = {},
  props = {}
) => {
  const {
    headerStyle,
    subHeaderStyle,
    subSubHeaderStyle,
    normalStyle,
  } = style;

  const { left, xPadding, centeredWidth, y } = coords;
  const {
    listStyle = null,
    applyFlex = false,
    applyVerticalDivider = false,
    swapPosition = false,
    includeIcon = false,
    includeDate = false,
    includeAddrss = false,
    includeDateAndAddress = false,
    onSameLine = false,
    index = 0,
    real = false
  } = props;
  if (real) {
    console.log("experience section coords", coords)

  }

  const { pdfWidth } = pdfSize(pdf);
  let currentPos = { x: left, y: y || 40 };
  if (index == 0) {
    currentPos = drawStyledText(pdf, header, { x: centeredWidth, y: coords.y }, headerStyle);
    const x2 = pdfWidth - xPadding / 2
    currentPos = drawLine(pdf, { x1: left, y1: currentPos.y, x2: x2, y2: currentPos.y },)
  }
  for (const exp of experiencesArray) {
    const {
      company_name: companyName = "Unknown Company",
      about_company: aboutCompany = "",
      position = "Position not specified",
      location = "Location not specified",
      start_date: startDate = "N/A",
      end_date: endDate = "N/A",
      achievements = [],
    } = exp;


    const maxWidth = pdfWidth - left * 2;
    const date = `${startDate} - ${endDate}`;

    // Vertical Divider Layout
    if (applyVerticalDivider) {
      currentPos = drawVerticalDividerLayout(
        pdf,
        {
          leftSection: [
            { text: date, style: subHeaderStyle },
            { text: location, style: normalStyle },
          ],
          mainSection: [
            { text: capitalize(position), style: subHeaderStyle },
            { text: companyName, style: subSubHeaderStyle },
            { text: aboutCompany, style: normalStyle },
          ],
          achievements,
        },
        {
          x: left,
          y: currentPos.y,
          maxWidth: maxWidth,
          xPadding,
          styles: { bullet: normalStyle },
          listStyle,

        }
      );

      currentPos.y += 10;
      continue;
    }

    // Top header with position and company
    const positionText = swapPosition ? companyName : position;
    const companyText = swapPosition ? position : companyName;



    // Icons / Date + Location
    if (!applyFlex) {
      currentPos = drawStyledText(pdf, positionText, { x: left, y: currentPos.y }, subHeaderStyle);
      currentPos = drawStyledText(pdf, companyText, { x: left, y: currentPos.y }, subSubHeaderStyle);
      if (includeDateAndAddress) {
        currentPos = drawStyledText(pdf, location, { x: left, y: currentPos.y }, normalStyle);
        currentPos = drawStyledText(pdf, date, { x: left, y: currentPos.y }, normalStyle);
      } else {
        if (includeAddrss) {
          if (onSameLine)
            currentPos = drawStyledText(pdf, location, { x: pdfWidth - pdf.getTextWidth(location)-left, y: currentPos.y }, normalStyle);
          else
            currentPos = drawStyledText(pdf, location, { x: left, y: currentPos.y - normalStyle.fontSize }, normalStyle);

        }
        if (includeDate) {
          if (onSameLine)
            currentPos = drawStyledText(pdf, date, { x: pdfWidth - pdf.getTextWidth(date)-left, y: currentPos.y - normalStyle.fontSize }, normalStyle);
          else
            currentPos = drawStyledText(pdf, date, { x: left, y: currentPos.y }, normalStyle);
        }
        if (includeIcon) {
          let iconPos = await drawTextWithIcon(
            pdf,
            LiaMapMarkerSolid,
            location,
            { x: left, y: currentPos.y - 5 },
            normalStyle
          );
          currentPos = await drawTextWithIcon(
            pdf,
            BiCalendar,
            date,
            { x: iconPos.x + 14, y: currentPos.y - 5 },
            normalStyle
          );
        }
      }
    } else {
      currentPos = drawJustifyTextItems(
        pdf,
        [positionText, location],
        { x: left, y: currentPos.y, maxWidth },
        [subHeaderStyle, normalStyle]
      );
      currentPos = drawJustifyTextItems(
        pdf,
        [companyText, date],
        { x: left, y: currentPos.y, maxWidth },
        [subSubHeaderStyle, normalStyle]
      );
    }

    // About company
    if (aboutCompany) {
      currentPos = drawWrappedLongText(
        pdf,
        aboutCompany,
        left,
        currentPos.y,
        pdfWidth - xPadding,
        normalStyle
      );
    }

    // Achievements
    for (const { value } of achievements) {
      if (listStyle === "bullet") {
        currentPos = await drawBulletText(
          pdf,
          value,
          left,
          currentPos.y - 10,
          pdfWidth - xPadding,
          normalStyle
        );
      } else {
        currentPos = drawWrappedLongText(
          pdf,
          value,
          left,
          currentPos.y,
          pdfWidth - xPadding,
          normalStyle
        );
      }
    }

    currentPos.y += 10;
  }

  return currentPos;
};

export default renderExperienceSection;
