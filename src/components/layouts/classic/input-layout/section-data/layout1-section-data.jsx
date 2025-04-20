import { Textarea } from "../../../../elements/resumeSectionWrapper";
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
        <p>Experience</p>
        <DynamicExperienceSection name="experiences" />
      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <p>Education</p>
        <DynamicEducationCard name="educations" />
      </>
    ),
  },
  {
    key: "achievement",
    content: () => (
      <>
        <p>Achievement</p>
        <DynamicAcheivementCard name="acheivements" />
      </>
    ),
  },
  {
    key: "skills",
    content: () => <SkillItems name="skills[0].items" />,
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
        <p>Experience</p>
        <DynamicExperienceSection name="experiences" />
      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <p>Education</p>
        <DynamicEducationCard name="educations" />
      </>
    ),
  },
  {
    key: "skills",
    content: () => <SkillItems name="skills[0].items" />,
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
        <p>Experience</p>
        <DynamicExperienceSection name="experiences" />
      </>
    ),
  },
  {
    key: "education",
    content: () => (
      <>
        <p>Education</p>
        <DynamicEducationCard name="educations" />
      </>
    ),
  },
  {
    key: "skills",
    content: () => <DynamicSkillCard name="skills" />,
  },
]