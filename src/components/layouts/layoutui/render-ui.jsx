import styled from "styled-components";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
import { useEffect } from "react";
export const Wrapper = styled.div`
display: flex;
padding: 0;
margin: 0;
min-width: 100%;
max-height: 100%;
`;
const renderLayout = ({
  pages,
  sectionData,
  sectionRefs,
  key_val,
  layout_no,
  leftFlex = "2",
  rightFlex = "3",
  background = "transparent",
}) => {

  const renderSection = (section, index) => {
    const SectionContent = section.content(key_val?.[section.key]);
    return (
      <Section
        key={section.id || section.key || index}
        ref={(el) => (sectionRefs.current[index] = el)}
        marginTop={index === 0 ? 0 : "15px"}
      >
        {SectionContent}
      </Section>
    );
  };

  // Dynamically compute resume padding based on layout
  let resumePadding = null;
  if (layout_no === 1) {
    resumePadding = "0 0 0 20mm";
  } else if (layout_no === 5) {
    resumePadding = "0";
  }

  let leftPadding;
  let rightPadding;
  if (layout_no === 1 || layout_no === 5) {
    leftPadding = "10mm 10mm 20mm 20mm"
    rightPadding = "10mm 20mm  20mm 10mm "
  }
  else if (layout_no === 6 || layout_no === 3) {
    leftPadding = "0 10mm 0 0";
    rightPadding = "0 0 0 10mm "
  }
  else {
    leftPadding = "0";
    rightPadding = "0"
  }

  if (pages.length > 0) {
    return pages.map((group, pageIndex) => {
      const leftColumn = [];
      const rightColumn = [];
      let headerSection = null;

      group.forEach((sectionIndex) => {
        const section = sectionData[sectionIndex];
        if (!section) return;

        const content = renderSection(section, sectionIndex);
        if (sectionIndex === 0) {
          if (layout_no === 1) {
            leftColumn.push(content);
            rightColumn.push(<Section key="placeholder" marginTop="100px" />);
          } else {
            headerSection = content;
          }
        } else if (sectionIndex % 2 === 0) {
          rightColumn.push(content);
        } else {
          leftColumn.push(content);
        }
      });

      return (
        <ModernResumeWrapper key={pageIndex}>
          <FlexResumeWrapper>
            {headerSection}
            <LeftColumn>{leftColumn}</LeftColumn>
            <RightColumn>{rightColumn}</RightColumn>
          </FlexResumeWrapper>
        </ModernResumeWrapper>
      );
    });
  }

  // Fallback if no pages
  const leftColumn = [];
  const rightColumn = [];
  let headerSection = null;

  sectionData.forEach((section, index) => {
    const content = renderSection(section, index);
    if (index === 0) {
      if (layout_no === 1) {
        leftColumn.push(content);
        rightColumn.push(<Section key="placeholder" marginTop="100px" />);
      } else {
        headerSection = content;
      }
    } else if (index % 2 === 0) {
      rightColumn.push(content);
    } else {
      leftColumn.push(content);
    }
  });

  return (
    <ResumeWrapper padding={resumePadding}>
      {headerSection}
      <Wrapper>
        <LeftColumn
          flex={leftFlex}
          padding={leftPadding}
        >
          {leftColumn}
        </LeftColumn>
        <RightColumn
          flex={rightFlex}
          padding={rightPadding}
          backgroundColor={background}
        >
          {rightColumn}
        </RightColumn>
      </Wrapper>
    </ResumeWrapper>
  );
};

export default renderLayout