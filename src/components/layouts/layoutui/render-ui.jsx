import styled from "styled-components";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
import CurvedWrapper from "../wrappers/curved-wrapper";
import { CreativeResumeWrapperWithLine } from "../../elements/resumeWrapper";
import { useEffect, useState } from "react";
export const Wrapper = styled.div`
display: flex;
padding: 0;
margin: 0;
min-width: 100%;
max-height: 100%;
`;
const RectangularContainer = styled.div`
    border-radius: 5px;
    height: 130px;
    width: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: auto;
    background:${({ backgroundColor }) => backgroundColor || "#660c09"};
`
const renderLayout = ({
  pages,
  sectionData,
  sectionRefs,
  key_val,
  leftFlex = "2",
  rightFlex = "3",
  background = "transparent",
  props = {
    leftPadding: "0",
    rightPadding: "0",
    mainPadding: "20mm",
    personalDetailsOnLeft: false,
  },
}) => {
  const { leftPadding, rightPadding, mainPadding, layout, personalDetailsOnLeft, includeNameInitial } = props;
  const layout_map = {
    CURVED: "curved",
    NORMAL: "normal",
    LINE: "line",
  };
  const [sectionsHeight, setSectionsHeight] = useState([]);
  let CustomWrapper;
  const NameInitial = () => {
    const name = key_val.personalDetails.name
    const names = name.split(" ")
    const fnameFirstChar = names?.[0]?.[0]
    const lnameFirstChar = names?.[1]?.[0]
    //display initial letter as image
    return <RectangularContainer><h1>{fnameFirstChar}{lnameFirstChar}</h1></RectangularContainer>
  }

  const renderSection = (section, index) => {
    const SectionContent = section.content(key_val?.[section.key]);

    return (
      <Section
        key={section.id || section.key || index}
        ref={(el) => (sectionRefs.current[index] = el)}
        margin={index === 0 ? "0" : "0 10px"}
        marginTop={index === 0 ? 0 : "15px"}
      >
        {SectionContent}
      </Section>
    );
  };
  if (layout === layout_map.CURVED) {
    CustomWrapper = CurvedWrapper;
  } else if (layout === layout_map.LINE) {
    CustomWrapper = CreativeResumeWrapperWithLine;
  } else {
    CustomWrapper = ResumeWrapper;
  }
  // Measure section heights after refs are assigned
  useEffect(() => {
    if (
      !sectionRefs.current ||
      sectionRefs.current.length === 0 ||
      sectionRefs.current.some(ref => ref === null)
    ) {
      return;
    }

    const heights = sectionRefs.current.map(ref => ref.offsetHeight || 0);
    setSectionsHeight(heights);
    console.log("Section heights:", heights);
  }, [sectionData.length, sectionRefs]);
  const renderUI = (headerSection, leftColumn, rightColumn) => {
    return <CustomWrapper padding={mainPadding}>
      {headerSection}
      <Wrapper>
        <LeftColumn flex={leftFlex} padding={leftPadding}>
          {leftColumn}
        </LeftColumn>
        <RightColumn flex={rightFlex} padding={rightPadding} backgroundColor={background}>
          {rightColumn}
        </RightColumn>
      </Wrapper>
    </CustomWrapper>
  }
  // === Render paginated layout ===
  if (pages.length > 0) {
    return pages.map((group, pageIndex) => {
      const leftColumn = [];
      const rightColumn = [];
      let headerSection = null;
        let leftHeight = 0;
        let rightHeight = 0;
      group.forEach((sectionIndex) => {
        const section = sectionData[sectionIndex];
        if (!section) return;

        const content = renderSection(section, sectionIndex);
        const sectionHeight = sectionsHeight[sectionIndex] || 0;

        if (sectionIndex === 0) {
          if (personalDetailsOnLeft) {
            leftColumn.push(content);
            leftHeight += sectionHeight;

            rightColumn.push(
              includeNameInitial ? <NameInitial key={`name_initial_${sectionIndex}`} /> :
                <Section key="placeholder" marginTop="100px" />
            );
          } else {
            headerSection = content;
          }
        } else if (leftHeight <= rightHeight) {
          leftColumn.push(content);
          leftHeight += sectionHeight;
        } else {
          rightColumn.push(content);
          rightHeight += sectionHeight;
        }

      });

      return renderUI(headerSection, leftColumn, rightColumn)
    });
  }

  // === Render fallback layout ===
  const leftColumn = [];
  const rightColumn = [];
  let headerSection = null;

  let leftHeight = 0;
  let rightHeight = 0;

  sectionData.forEach((section, index) => {
    const content = renderSection(section, index);
    const sectionHeight = sectionsHeight[index] || 0;

    if (index === 0) {
      if (personalDetailsOnLeft) {
        leftColumn.push(content);
        leftHeight += sectionHeight;

        rightColumn.push(
          includeNameInitial ? <NameInitial key={`name_initial_${index}`} /> :
            <Section key="placeholder" marginTop="100px" />
        );
      } else {
        headerSection = content;
      }
    } else if (leftHeight <= rightHeight) {
      leftColumn.push(content);
      leftHeight += sectionHeight;
    } else {
      rightColumn.push(content);
      rightHeight += sectionHeight;
    }
  });


  return renderUI(headerSection, leftColumn, rightColumn)
};

export default renderLayout;



