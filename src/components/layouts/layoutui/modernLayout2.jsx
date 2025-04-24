import styled from "styled-components";
import { LeftColumn, RightColumn, Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../../elements/resumeWrapper";
import { shoulApplyMargin } from "../layoutUI";
import useDynamicLayoutSections from "../loadResumeLayput";

const Wrapper=styled.div`
display:flex;
padding:0;
margin:0;
min-width:100%;
max-height:100%;
`

const getModernLayout2 = ({ pages, layoutId, key_val, layout_type,sectionRefs }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    const leftColum = []
    const rightColumn = []
    let headerSeection
    return (
        pages.length > 0 ? (
            pages.map((group, pageIndex) => (
                <ModernResumeWrapper key={pageIndex}>
                    <FlexResumeWrapper>
                        {group.map((sectionIndex) => {
                            const section = sectionData[sectionIndex];

                            leftColum.push(section.key)
                            rightColumn.push(section.key)
                            if (sectionIndex != 0) {
                                if (sectionIndex % 2 == 0) {
                                    rightColumn.push(section.key)
                                }
                                else {

                                    leftColum.push(section.key)

                                }
                            }

                            if (!section) return null;
                            const SectionContent = section.content(key_val?.[section.key]);
                            const applyMarginTop = shoulApplyMargin(section);
                            const content = <Section
                                key={section.id || section.key || index}
                                ref={(el) => (sectionRefs.current[index] = el)}
                                marginTop={index == 0 ? 0 : "20px"}
                            >
                                {SectionContent}
                            </Section>
                            if (index == 0) {
                                headerSeection=content
                            }
                            if (index != 0) {
                                if (index % 2 == 0) {
                                    rightColumn.push(content)
                                }
                                else {

                                    leftColum.push(content)

                                }
                            }

                        })}
                        <>
                        {
                            headerSeection
                        }
                            <LeftColumn>
                                {/* {...leftColum} */}
                            </LeftColumn>
                            <RightColumn>
                                {/* {...rightColumn} */}
                            </RightColumn>
                        </>
                    </FlexResumeWrapper>
                </ModernResumeWrapper>
            ))
        ) : (

            <ResumeWrapper>
                {sectionData.map((section, index) => {
                    const SectionContent = section.content(key_val?.[section.key]);
                    const applyMarginTop = shoulApplyMargin(section);
                    const content = <Section
                        key={section.id || section.key || index}
                        ref={(el) => (sectionRefs.current[index] = el)}
                        marginTop={index == 0 ? 0 : "20px"}
                    >
                        {SectionContent}
                    </Section>
                    if (index == 0) {
                       headerSeection=content
                    }
                    if (index != 0) {
                        if (index % 2 == 0) {
                            rightColumn.push(content)
                        }
                        else {

                            leftColum.push(content)

                        }
                    }

                })}
                {
                    <>
                    {headerSeection}
                      <Wrapper>
                      <LeftColumn flex="2" padding="0 20px 0 0">
                            {...leftColum}
                        </LeftColumn>
                        <RightColumn flex="3" padding="0" backgroundColor="transparent">
                            {...rightColumn}
                        </RightColumn>
                      </Wrapper>
                    </>
                }
            </ResumeWrapper>


        )
    );
}
export default getModernLayout2