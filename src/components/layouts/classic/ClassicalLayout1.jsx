import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section, H1 } from "../../elements/resumeSectionWrapper";
import style from "./style/layout1_style.json";
import common from "./style/common.json";
import getLayout1OutputSectionData from "./resume-output/layout1-output";
import { useLayout } from "../../../provider/layoutProvider";

export const Title = ({ title }) => (
  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className}>
    {title}
  </H1>
);

const ClassicalLayout1 = (props) => {
  const {
    watch
  } = useFormContext();

  // Watch live values from form context
  const liveDetails = watch();

  // Use props if they exist, else fall back to live form values
  const personalDetails = props.personalDetails || liveDetails.personalDetails;
  const educations = props.educations || liveDetails.educations;
  const summary = props.summary || liveDetails.summary;
  const experiences = props.experiences || liveDetails.experiences;
  const achievements = props.achievements || liveDetails.achievements
  const skills = props.skills || liveDetails.skills;

  const key_val = {
    personalDetails: personalDetails,
    educations: educations,
    summary: summary,
    experiences: experiences,
    achievements: achievements,
    skills: skills
  }
  const sectionData = getLayout1OutputSectionData(key_val)
  const shouldMeasureHeight = props.shouldMeasureHeight || false;
  const { measured, setMeasured, groupSectionsIntoPages,ref } = useLayout()
  const sectionRefs = useRef([])
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (shouldMeasureHeight) {
      setMeasured(false); // force pagination re-run
    }
  }, [sectionData.length]); 
  



  return (
    <div className="w-full max-w-full" ref={ref}>
  
        {pages.length > 0
          ? pages.map((group, pageIndex) => (
            <ResumeWrapper key={pageIndex}>
              {group.map((sectionIndex) => {
                const section = sectionData[sectionIndex];
                const SectionContent = section.content(key_val[section.key]);

                const isExperienceSection = section.key?.startsWith("experience_");
                const isFirstExperience = isExperienceSection && section.key === "experience_0";

                const applyMarginTop =
                  section.key !== "personalDetails" &&
                  (!isExperienceSection || isFirstExperience);

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
          : (
            // Fallback render before measuring happens
            <ResumeWrapper>
              {sectionData.map((section, index) => {
                const SectionContent = section.content(key_val[section.key]);

                const isExperienceSection = section.key?.startsWith("experience_");
                const isFirstExperience = isExperienceSection && section.key === "experience_0";

                const applyMarginTop =
                  section.key !== "personalDetails" &&
                  (!isExperienceSection || isFirstExperience);

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
          )}
    </div>
  );
};

export default ClassicalLayout1;
