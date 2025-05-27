import { pdfSize } from "../core";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { BiCalendar } from "react-icons/bi";
import {
  drawBulletText,
  drawJustifyItems,
  drawStyledText,
  drawTextWithIcon,
  drawWrappedLongText,
} from "../text";
import jsPDF from "jspdf";
import { drawVerticalDividerLayout } from "../layout";

/**
 *  Renders a section of experiences in a PDF document using jsPDF.
 * @param {jsPDF} pdf - The jsPDF instance to render the experiences on.
 * @param {Array<object>} experiencesArray  - Array of experience objects to render.
 * @param {{
 * left: number,
 * y: number,
 * xPadding: number
 * }} coords  - Coordinates for rendering the section.
 * @param {object<object>} style  - Styles for the section, including header, subheader, and normal text styles.
 * @param {object} props  - Additional properties to customize the rendering, such as:
 * @returns 
 */

const renderExperienceSection = async (
  pdf,
  experiencesArray,
  coords = {},
  style = {},
  props = {}
) => {
  const {
    headerStyle,
    subHeaderStyle,
    subsubHeaderStyle,
    normalStyle,
  } = style;
  const { left, xPadding } = coords;
  const {
    listStyle = null,
    applyFlex = false,
    applyVerticalDivider = false,
    swapPosition = false,
    includeIcon = false,
    includeDate = false,
    includeAddrss = false,
    includeDateAndAddress = false,
  } = props;

  const { pdfWidth } = pdfSize(pdf);
  let currentPos = drawStyledText(pdf, "Experiences", { x: pdfWidth / 2, y: coords.y }, headerStyle);

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
      currentPos = await drawVerticalDividerLayout(
        pdf,
        {
          leftSection: [
            { text: date, style: subHeaderStyle },
            { text: location, style: normalStyle },
          ],
          mainSection: [
            { text: position, style: subHeaderStyle },
            { text: companyName, style: subsubHeaderStyle },
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

    currentPos = drawStyledText(pdf, positionText, { x: left, y: currentPos.y }, subHeaderStyle);
    currentPos = drawStyledText(pdf, companyText, { x: left, y: currentPos.y }, subsubHeaderStyle);

    // Icons / Date + Location
    if (!applyFlex) {
      if (includeDateAndAddress) {
        currentPos = drawStyledText(pdf, location, { x: left, y: currentPos.y }, normalStyle);
        currentPos = drawStyledText(pdf, date, { x: left, y: currentPos.y }, normalStyle);
      } else {
        if (includeAddrss) {
          currentPos = drawStyledText(pdf, location, { x: left, y: currentPos.y }, normalStyle);
        }
        if (includeDate) {
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
      currentPos = drawJustifyItems(
        pdf,
        [positionText, location],
        { x: left, y: currentPos.y, maxWidth },
        [subHeaderStyle, normalStyle]
      );
      currentPos = drawJustifyItems(
        pdf,
        [companyText, date],
        { x: left, y: currentPos.y, maxWidth },
        [subsubHeaderStyle, normalStyle]
      );
    }

    // About company
    if (aboutCompany) {
      currentPos = await drawWrappedLongText(
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

    currentPos.y += 10;
  }

  return currentPos;
};

export default renderExperienceSection;
