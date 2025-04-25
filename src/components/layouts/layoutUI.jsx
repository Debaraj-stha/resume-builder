import { memo } from "react";
import common from "./classic/style/common.json";

import { FlexResumeWrapper, ModernResumeWrapper, ResumeWrapper } from "../elements/resumeWrapper";
import { LeftColumn, RightColumn, Section } from "../elements/resumeSectionWrapper";
import useDynamicLayoutSections from "./loadResumeLayput";
import getModernLayout1 from "./layoutui/modernLayout1";
import getModernLayout2 from "./layoutui/modernLayout2";
import getModernLayout3 from "./layoutui/modern-layout3";
import getModernLayout4 from "./layoutui/modern-layout-4";



export const shoulApplyMargin = (section) => {
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



const LayoutUi = memo(({ pages, layoutId, key_val, sectionRefs, layout_type = "classical" }) => {
    const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type);

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
            switch(layoutId){
                case 1:
                    return getModernLayout1({pages,layoutId,key_val,layout_type,sectionRefs})
                case 2:
                    return getModernLayout2({pages,layoutId,key_val,layout_type,sectionRefs})
                case 3:
                    return  getModernLayout3({pages,layoutId,key_val,layout_type,sectionRefs})
                case 4:
                    return getModernLayout4({pages,layoutId,key_val,layout_type,sectionRefs})
                    
            }
          
            
        default:
            console.log("default")
    }

});

export default LayoutUi;
