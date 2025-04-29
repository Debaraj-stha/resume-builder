import styled from "styled-components";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
import CurvedWrapper from "../wrappers/curved-wrapper";
import { lazy, useEffect } from "react";
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
  props={
    leftPadding:"0",
    rightPadding:"0",
    mainPadding:"20mm"
  }
}) => {
  console.log("p",props)
const{leftPadding,rightPadding,mainPadding,layout}=props
const layout_map={
  CURVED:"curved",
  GRID:"grid"
}
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
  let CustomWrapper
  console.log()
  if(layout===layout_map.CURVED){
    CustomWrapper=CurvedWrapper
  }
  else{
    CustomWrapper=ResumeWrapper
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
    <CustomWrapper padding={mainPadding}>
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
    </CustomWrapper>
  );
};

export default renderLayout