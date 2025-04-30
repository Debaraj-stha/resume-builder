import { memo } from "react";
import { H3, P } from "../../elements/resumeSectionWrapper";
import { FlexBox, VerticalPinSeparator } from "../../CustomComponents";
import { BiCalendar } from "react-icons/bi";
import { LiaMapMarkerSolid } from "react-icons/lia";

const EducationCard = memo(({ education, style, ...props }) => {
  const { degree, university, start_complete, address } = education;
  const {
    swapPosition,
    applyFlex,
    shouldIncludeIcon,
    applyVerticalDivider,
    side,
    shouldIncludeGPA,
    flexIcons,
    shouldIncludeAddress,
  } = props;

  const textColor = side === "right" ? { color: "white" } : {};

  if (applyVerticalDivider) {
    return (
      <FlexBox gap="20px" className="mb-3">
        <div style={{ flex: "2" }}>
          <H3 textAlign="left">{start_complete}</H3>
        </div>
        <div style={{ flex: "1" }}>
          <VerticalPinSeparator />
        </div>
        <div style={{ flex: "7" }}>
          <P fontWeight="600" fontFamily="Open sans">{degree}</P>
          <P fontWeight="500">{university}</P>
          {shouldIncludeGPA && (
            <P fontWeight="400" fontSize="14px">GPA 3.8</P>
          )}
        </div>
      </FlexBox>
    );
  }

  const DegreeHeading = (
    <h2 style={{ ...style.h3, ...textColor }}>{degree}</h2>
  );
  const UniversityHeading = (
    <h3 style={{ ...style.sectionSubHeader, ...textColor }}>{university}</h3>
  );

  const CalendarAndAddress = () => (
    <FlexBox margin="0" alignItems="center">
      {shouldIncludeIcon && <BiCalendar />}
      <P style={{ ...style.p, ...textColor }}>{start_complete}</P>
      {shouldIncludeAddress && (
        <>
          {shouldIncludeIcon && <LiaMapMarkerSolid />}
          <P style={{ ...style.p, ...textColor }}>{address}</P>
        </>
      )}
    </FlexBox>
  );

  return (
    <>
      {swapPosition ? UniversityHeading : DegreeHeading}

      {applyFlex ? (
        <FlexBox margin="0" justifyContent="space-between" alignItems="center">
          {swapPosition ? DegreeHeading : UniversityHeading}
          {CalendarAndAddress()}
        </FlexBox>
      ) : (
        <>
          {swapPosition ? DegreeHeading : UniversityHeading}
          <FlexBox margin="0" {...(flexIcons && { justifyContent: "space-between" })}>
            {CalendarAndAddress()}
          </FlexBox>
          {shouldIncludeGPA && (
            <P style={{ ...style.p, ...textColor }}>GPA 3.4</P>
          )}
        </>
      )}
    </>
  );
});

export default EducationCard;
