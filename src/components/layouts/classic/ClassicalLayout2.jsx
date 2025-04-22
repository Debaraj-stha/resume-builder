import React,{ useRef } from "react"
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section,P,H1,Li,SectionContent, Ul } from "../../elements/resumeSectionWrapper";
import { ExperienceCard,SkillCard,EducationCard,AcheivementCard, ResumeHeader } from "../cards";
import style from "./style/layout2_style.json"
import common from "./style/common.json"
import { useFormContext } from "react-hook-form";
import getLayout2OutputSectionData from "./resume-output/layout2-output";
export const Title=({title})=>{
    return  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className.join(" ")}>{title}</H1>
}

const ClassicalLayout2 = (props) => {
  const sectionRefs = useRef([])
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
  const achievements = props.achievements || liveDetails.acheivements;
  const skills = props.skills || liveDetails.skills;
  const key_val = {
    personalDetails: personalDetails,
    educations: educations,
    summary: summary,
    experiences: experiences,
    achievements: achievements,
    skills: skills
  }
  const sectionData = getLayout2OutputSectionData(key_val)
  return (
    <div className="w-full max-w-full">
      <ResumeWrapper>
        {
          sectionData.map((section, index) => {
            const SectionContent = section.content(key_val[section.key]);
            return (
              <Section key={index} ref={(el) => (sectionRefs.current[index] = el)} marginTop={section.key !== "header" ? common.Section.marginTop : 0}>
                {SectionContent}
              </Section>
            );
          })
        }

      </ResumeWrapper>
    </div>
  );
};

export default ClassicalLayout2;
