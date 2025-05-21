import { memo } from "react";
import { Li, P, Ul } from "../../elements/resumeSectionWrapper";
import { FlexBox, VerticalPinSeparator } from "../../CustomComponents";
import { LiaMapMarkerSolid } from "react-icons/lia";
import { CgCalendar } from "react-icons/cg";
import capitalize from "../../../helper/capitalize";

const ExperienceCard = memo(({ experience, style, ...props }) => {
  const {
    position,
    start_date:startDate,
    end_date:endDate,
    company_name:companyName,
    about_company:aboutCompany,
    location,
    achievements,
  } = experience;

  const {
    applyFlex,
    includeDateAndAddress,
    includeAddrss,
    includeDate,
    swapPosition,
    applyVerticalDivider,
  } = props;

  // Vertical Divider Layout
  if (applyVerticalDivider) {
    return (
      <FlexBox gap="20px" className="mb-3">
        <div style={{ flex: "2" }}>
          <h3 style={style.h3}>{startDate} - {endDate}</h3>
          <p style={style.p}>{location}</p>
        </div>
        <div style={{ flex: "1" }}>
          <VerticalPinSeparator />
        </div>
        <div style={{ flex: "7" }}>
          <h3 style={style.h3}>{position}</h3>
          <p style={style.p}>{aboutCompany}</p>
          <Ul textAlign="left" padding="0 0 0 10px">
            {achievements.map((a, i) => <Li key={i}>{a.value}</Li>)}
          </Ul>
        </div>
      </FlexBox>
    );
  }

  const renderPositionBlock = () => (
    <>
      <h3 style={style.h3}>{swapPosition ? capitalize(companyName) : capitalize(position)}</h3>
      <h3 style={style.sectionSubHeader}>{swapPosition ? capitalize(position) : capitalize(companyName)}</h3>
    </>
  );

  const renderDateAddress = () => {
    if (!applyFlex) {
      return (
        <FlexBox margin="0">
          <FlexBox justifyContent="space-between" margin="0">
            <LiaMapMarkerSolid />
            <P style={style.p}>{location}</P>
          </FlexBox>
          <FlexBox margin="0">
            <CgCalendar />
            <P style={style.p}>{startDate} - {endDate}</P>
          </FlexBox>
        </FlexBox>
      );
    }

    if (includeDateAndAddress) {
      return (
        <div>
          <P style={{ ...style.p, textAlign: "right" }}>{location}</P>
          <P style={{ ...style.p, textAlign: "right" }}>{startDate} - {endDate}</P>
        </div>
      );
    }

    return (
      <>
        {includeDate && <P style={{ ...style.p, textAlign: "right" }}>{startDate} - {endDate}</P>}
        {includeAddrss && <P style={{ ...style.p, textAlign: "right" }}>{location}</P>}
      </>
    );
  };

  return (
    <div className="mb-3">
      <FlexBox
        justifyContent="space-between"
        display={applyFlex ? "flex" : "block"}
        margin="0"
      >
        <FlexBox display="block" alignItems="center" margin="0">
          {renderPositionBlock()}
        </FlexBox>
        {applyFlex && (
          <FlexBox margin="0" alignItems="center">
            {renderDateAddress()}
          </FlexBox>
        )}
      </FlexBox>

      {!applyFlex && renderDateAddress()}

      <P style={style.p}>{aboutCompany}</P>

      <Ul display="block" margin="0">
        {achievements?.map((a, i) => (
          <Li key={i} style={style.p}>{a.value}</Li>
        ))}
      </Ul>
    </div>
  );
});

export default ExperienceCard;
