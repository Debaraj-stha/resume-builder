import React from "react";
import { Section } from "../elements/resumeSectionWrapper";

const renderSection = (section, index, marginTop, sectionRefs, key_val) => {
  if (!section || typeof section.content !== "function") return null;

  const SectionContent = section.content(key_val?.[section.key]);

  return (
    <Section
      key={section.id || section.key || index}
      ref={(el) => (sectionRefs.current[index] = el)}
      marginTop={marginTop}
    >
      {SectionContent}
    </Section>
  );
};

export default renderSection;
