
import { Section } from "../../elements/resumeSectionWrapper";
import { FlexResumeWrapper, ModernResumeWrapper } from "../../elements/resumeWrapper";
import { LeftColumn, RightColumn } from "../../elements/resumeSectionWrapper";
import { shoulApplyMargin } from "../layoutUI";
import useDynamicLayoutSections from "../loadResumeLayput";
import common from ".././modern/style/common.json";



const getModernLayout4 = ({ pages, layoutId, key_val, layout_type, sectionRefs }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);

    const renderSection = (section, index) => {
        const SectionContent = section.content(key_val?.[section.key]);
        const applyMarginTop = shoulApplyMargin(section);

        return (
            <Section
                key={section.id || section.key || index}
                ref={(el) => (sectionRefs.current[index] = el)}
                marginTop={index==0 ? "0" :"15px"}
            >
                {SectionContent}
            </Section>
        );
    };
    const leftColumn = [];
    const rightColumn = [];



    if (pages.length > 0) {
        return pages.map((group, pageIndex) => {
            const leftColumn = [];
            const rightColumn = [];
            

            group.forEach((sectionIndex, i) => {
                const section = sectionData[sectionIndex];
                if (!section) return;

                const content = renderSection(section, sectionIndex);
                if (sectionIndex === 0) {
                    leftColumn.push(content);
                    rightColumn.push(<Section key="placeholder" marginTop="100px" />);
                } else if (sectionIndex % 2 === 0) {
                    rightColumn.push(content);
                } else {
                    leftColumn.push(content);
                }
            });
            return (
                <ModernResumeWrapper key={pageIndex}>
                    <FlexResumeWrapper>
                        {/* {group.map((sectionIndex) => {
                            const section = sectionData[sectionIndex];
                            if (!section) return null;
                            return renderSection(section, sectionIndex);
                        })} */}
                        <LeftColumn>{leftColumn}</LeftColumn>
                        <RightColumn>{rightColumn}</RightColumn>

                    </FlexResumeWrapper>
                </ModernResumeWrapper>
            );
        });
    }

    // Fallback: No pages
    sectionData.forEach((section, index) => {
        const content = renderSection(section, index);

        if (index === 0) {
            leftColumn.push(content);
            rightColumn.push(<Section key="placeholder" marginTop="100px" />);
        } else if (index % 2 === 0) {
            rightColumn.push(content);
        } else {
            leftColumn.push(content);
        }
    });

    return (
        <FlexResumeWrapper>
            <>
                <LeftColumn>{leftColumn}</LeftColumn>
                <RightColumn backgroundColor="transparent">{rightColumn}</RightColumn>
            </>
        </FlexResumeWrapper>
    );
};

export default getModernLayout4;
