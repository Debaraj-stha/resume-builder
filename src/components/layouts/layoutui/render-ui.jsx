import styled from "styled-components";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
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
    leftFlex = "2",
    rightFlex = "3",
  }) => {
    const renderSection = (section, index) => {
      const SectionContent = section.content(key_val?.[section.key]);
      return (
        <Section
          key={section.id || section.key || index}
          ref={(el) => (sectionRefs.current[index] = el)}
          marginTop={index === 0 ? 0 : "20px"}
        >
          {SectionContent}
        </Section>
      );
    };
  
    if (pages.length > 0) {
      return pages.map((group, pageIndex) => {
        const leftColumn = [];
        const rightColumn = [];
        let headerSection = null;
  
        group.forEach((sectionIndex, i) => {
          const section = sectionData[sectionIndex];
          if (!section) return;
  
          const content = renderSection(section, sectionIndex);
          if (sectionIndex === 0) {
            headerSection = content;
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
        headerSection = content;
      } else if (index % 2 === 0) {
        rightColumn.push(content);
      } else {
        leftColumn.push(content);
      }
    });
  
    return (
      <ResumeWrapper>
        {headerSection}
        <Wrapper>
          <LeftColumn flex={leftFlex} padding="0 20px 0 0">
            {leftColumn}
          </LeftColumn>
          <RightColumn flex={rightFlex} padding="0" backgroundColor="transparent">
            {rightColumn}
          </RightColumn>
        </Wrapper>
      </ResumeWrapper>
    );
  };
  
  export default renderLayout