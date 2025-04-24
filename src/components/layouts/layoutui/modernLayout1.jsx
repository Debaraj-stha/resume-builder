import { Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper } from "../../elements/resumeWrapper";
import { shoulApplyMargin } from "../layoutUI";
import useDynamicLayoutSections from "../loadResumeLayput";

const getModernLayout1 = ({pages,layoutId,key_val,layout_type,sectionRefs}) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    const leftColum = []
    const rightColumn = []
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

                            return (
                                <Section
                                    key={section.id || section.key || pageIndex}
                                    flex={applyFlex(sectionIndex)}
                                    ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                                    marginTop={applyMarginTop ? common.Section.marginTop : 0}
                                >
                                    {SectionContent}
                                </Section>
                            );
                        })}
                    </FlexResumeWrapper>
                </ModernResumeWrapper>
            ))
        ) : (

            <FlexResumeWrapper>
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
                        leftColum.push(content)
                        rightColumn.push(<Section marginTop="100px"></Section>)
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
                        <LeftColumn>
                            {...leftColum}
                        </LeftColumn>
                        <RightColumn>
                            {...rightColumn}
                        </RightColumn>
                    </>
                }
            </FlexResumeWrapper>


        )
    );
}
export default getModernLayout1