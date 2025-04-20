import React from "react";
import { useFormContext } from "react-hook-form";
import { TransparentLine } from "../../Divider/TransparentDividers";
import { ResumeWrapper } from "../../elements/resumeWrapper";
import { Section, P, H1, SectionContent } from "../../elements/resumeSectionWrapper";
import {
  ExperienceCard,
  SkillCard,
  EducationCard,
  AcheivementCard,
  ResumeHeader
} from "../cards";
import style from "./style/layout1_style.json";
import common from "./style/common.json";

const Title = ({ title }) => (
  <H1 fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className}>
    {title}
  </H1>
);

const ModernLayout1 = (props) => {
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
  const skills = props.skills||liveDetails.skills;

  return (
    <div className="w-full max-w-full">
      <ResumeWrapper>
        <H1>Modern 1</H1>

        {/* Header */}
        <Section>
          <ResumeHeader personalDetails={personalDetails} />
        </Section>

        {/* Summary */}
        <Section marginTop={common.Section.marginTop}>
          <Title title="Summary" />
          <TransparentLine />
          <SectionContent>
            <P>{summary}</P>
          </SectionContent>
        </Section>

        {/* Experience */}
        <Section marginTop={common.Section.marginTop}>
          <Title title="Experience" />
          <TransparentLine />
          <SectionContent>
            {(experiences || []).map((experience, index) => (
              <ExperienceCard key={index} experience={experience} />
            ))}
          </SectionContent>
        </Section>

        {/* Education */}
        <Section>
          <Title title="Education" />
          <TransparentLine />
          <SectionContent>
            {(educations || []).map((education, index) => (
              <EducationCard key={index} education={education} />
            ))}
          </SectionContent>
        </Section>

        {/* Achievements */}
        <Section marginTop={common.Section.marginTop}>
          <Title title="Achievements" />
          <TransparentLine />
          <SectionContent>
            <div className="grid grid-cols-2 gap-2">
              {(achievements || []).map((achievement, index) => (
                <AcheivementCard key={index} my_acheivement={achievement} />
              ))}
            </div>
          </SectionContent>
        </Section>

        {/* Skills */}
        <Section marginTop={common.Section.marginTop}>
          <Title title="Skills" />
          <TransparentLine />
          <SectionContent>
            <SkillCard skills={skills} />
          </SectionContent>
        </Section>

      </ResumeWrapper>
    </div>
  );
};

export default ModernLayout1;
