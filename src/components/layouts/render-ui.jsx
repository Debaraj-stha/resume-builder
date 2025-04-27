import { Section } from "../elements/resumeSectionWrapper";
import { ResumeWrapper } from "../elements/resumeWrapper";
import useDynamicLayoutSections from "./loadResumeLayput";

const renderUI = ({ pages, key_val, layoutId, layout_type, sectionRefs }) => {
    const shoulApplyMargin = (section) => {
        const isExperienceSection = section.key?.startsWith("experience_") ;
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
                section.key === "personalDetails" ||
                section.key==="summary"
            );

        return applyMarginTop;
    };
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);
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
                                marginTop={applyMarginTop ? "15px" : 0}
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
                            marginTop={applyMarginTop ? "15px" : 0}
                        >
                            {SectionContent}
                        </Section>
                    );
                })}
            </ResumeWrapper>
        )
    );
}

export default renderUI