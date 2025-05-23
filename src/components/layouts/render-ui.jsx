import { Section } from "../elements/resumeSectionWrapper";
import { ResumeWrapper } from "../elements/resumeWrapper";
import useDynamicLayoutSections from "./loadResumeLayput";

const renderUI = ({ pages, key_val, layoutId, layout_type, sectionRefs,divider})=>{
  const sectionData = useDynamicLayoutSections(layoutId, key_val, layout_type,divider)


  const shouldApplyMargin = (section) => {
    const key = section.key;
    return (
      key !== "personalDetails" &&
      (
        key === "experience_0" ||
        key === "education_0" ||
        key === "achievement_0" ||
        key === "certificate_0" ||
        ["skills", "summary", "strengths"].includes(key)
      )
    );
  };

  const renderSection = (section, index) => {
    const SectionContent = section.content(key_val?.[section.key]);
    return (
      <Section
        key={section.id || section.key || index}
        ref={(el) => (sectionRefs.current[index] = el)}
        marginTop={shouldApplyMargin(section) ? "15px" : 0}
      >
        {SectionContent}
      </Section>
    );
  };

  if (pages.length > 0) {
    return pages.map((group, pageIndex) => (
      <ResumeWrapper key={pageIndex}>
        {group.map((sectionIndex) => {
          const section = sectionData[sectionIndex];
          if (!section) return null;
          return renderSection(section, sectionIndex);
        })}
      </ResumeWrapper>
    ));
  }

  // Fallback: render all sections on one page
  return (
    <ResumeWrapper>
      {sectionData.map((section, index) => renderSection(section, index))}
    </ResumeWrapper>
  );
};

export default renderUI;
