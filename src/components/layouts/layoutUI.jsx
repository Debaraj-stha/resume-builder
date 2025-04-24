import { memo } from "react";
import common from "./classic/style/common.json";

import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../elements/resumeWrapper";
import { LeftColumn, RightColumn, Section } from "../elements/resumeSectionWrapper";
import useDynamicLayoutSections from "./loadResumeLayput";



const shoulApplyMargin = (section) => {
    const isExperienceSection = section.key?.startsWith("experience_");
    const isFirstExperience = isExperienceSection && section.key === "experience_0";

    const isEducationSection = section.key?.startsWith("education_");
    const isFirstEducation = isEducationSection && section.key === "education_0";

    const isAchievementSection = section.key?.startsWith("achievement_");
    const isFirstAchievement = isAchievementSection && section.key === "achievement_0";
    const isCertificateSection = section.key?.startsWith("certipicate_")
    const isFirstCertificate = isCertificateSection && section.key === "certipicate_0"


    const applyMarginTop =
        section.key !== "personalDetails" &&
        (
            (isExperienceSection && isFirstExperience) ||
            (isEducationSection && isFirstEducation) ||
            (isAchievementSection && isFirstAchievement) ||
            (isCertificateSection && isFirstCertificate) ||
            section.key === "skills" ||
            section.key === "personalDetails"
        );

    return applyMarginTop;
};
const applyFlex = (sectionIndex) => {
    if (sectionIndex == 0) {
        return "4"
    }
    return sectionIndex % 2 == 0 ? "1" : "3"
}


const LayoutUi = memo(({ pages, layoutId, key_val, sectionRefs, layout_type = "classical" }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
    const leftColum = []
    const rightColumn = []
    const layout_type_map = {
        1: "classical",
        2: "modern",
        3: "simple",
        4: "creative"
    }
    switch (layout_type) {
        case layout_type_map[1]:
            return (
                pages.length > 0 ? (
                    pages.map((group, pageIndex) => (
                        <ResumeWrapper key={pageIndex}>
                            {group.map((sectionIndex) => {
                                const section = sectionData[sectionIndex];
                                if (!section) return null;
                                const SectionContent = section.content(key_val?.[section.key]);
                                const applyMarginTop = shoulApplyMargin(section);

                                return (
                                    <Section
                                        key={section.id || section.key || pageIndex}
                                        ref={(el) => (sectionRefs.current[sectionIndex] = el)}
                                        marginTop={applyMarginTop ? common.Section.marginTop : 0}
                                    >
                                        {SectionContent}
                                    </Section>
                                );
                            })}
                        </ResumeWrapper>
                    ))
                ) : (
                    <ResumeWrapper>
                        {sectionData.map((section, index) => {
                            const SectionContent = section.content(key_val?.[section.key]);
                            const applyMarginTop = shoulApplyMargin(section);
                            return (
                                <Section
                                    key={section.id || section.key || index}
                                    ref={(el) => (sectionRefs.current[index] = el)}
                                    marginTop={applyMarginTop ? common.Section.marginTop : 0}
                                >
                                    {SectionContent}
                                </Section>
                            );
                        })}
                    </ResumeWrapper>
                )
            );
        case layout_type_map[2]:
            console.log("modern")
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
                                    console.log("setion index", sectionIndex, "sectionkey", section.key)
                                    console.log("left cxolun", leftColum, "rightcolumn", rightColumn)
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
                                    marginTop={index==0 ? 0 :"20px"}
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
            break
        default:
            console.log("defgald")
    }

});

export default LayoutUi;
