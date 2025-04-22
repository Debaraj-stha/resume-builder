
import { DynamicInputSectionWrapper, Paragraph } from "../../../../CustomComponents";
import DynamicAcheivementCard from "../DynamicAcheivementCard";
import DynamicEducationCard from "../DynamicEducationCard";
import DynamicExperienceSection from "../DynamicExperienceSection";
import HeaderSection from "../HeaderSection";
import DynamicSkillCard, { SkillItems } from "../SkilllCard";
import SummarySection from "../SummarySection";
export const layout1SeactionData = [
  {
    key: "header",
    content: () => (
      <>
        <HeaderSection />
      </>
    ),
  },
  {
    key: "summary",
    content: () => (
      <><SummarySection /></>
    )
  },
  {
    key: "experience",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Experience</Paragraph>
          <DynamicExperienceSection name="experiences" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Education</Paragraph>
          <DynamicEducationCard name="educations" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "achievement",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Achievement</Paragraph>
          <DynamicAcheivementCard name="acheivements" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "skills",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Skills</Paragraph>
          <SkillItems name="skills[0].items" />,
        </DynamicInputSectionWrapper>
      </>
    )
  },
];
export const layout2sectionData = [
  {
    key: "header",
    content: () => (
      <>
        <HeaderSection />
      </>
    ),
  },
  {
    key: "summary",
    content: () => (
      <><SummarySection /></>
    )
  },
  {
    key: "experience",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Experience</Paragraph>
          <DynamicExperienceSection name="experiences" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Education</Paragraph>
          <DynamicEducationCard name="educations" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "skills",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Skills</Paragraph>
          <SkillItems name="skills[0].items" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
];
export const layout3SectionData = [
  {
    key: "header",
    content: () => (
      <>
        <HeaderSection />
      </>
    ),
  },
  {
    key: "summary",
    content: () => (
      <><SummarySection /></>
    )
  },
  {
    key: "experience",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Experience</Paragraph>
          <DynamicExperienceSection name="experiences" />
        </DynamicInputSectionWrapper>

      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Education</Paragraph>
          <DynamicEducationCard name="educations" />
        </DynamicInputSectionWrapper>
      </>
    ),
  },
  {
    key: "skills",
    content: () => (
      <>
        <DynamicInputSectionWrapper>
          <Paragraph>Skills</Paragraph>
          <DynamicSkillCard name="skills" />
        </DynamicInputSectionWrapper>
      </>
    )
  },
]