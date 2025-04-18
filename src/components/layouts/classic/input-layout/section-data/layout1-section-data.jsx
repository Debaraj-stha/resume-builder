import { Textarea } from "../../../../elements/resumeSectionWrapper";
import DynamicAcheivementCard from "../DynamicAcheivementCard";
import DynamicEducationCard from "../DynamicEducationCard";
import DynamicExperienceSection from "../DynamicExperienceSection";
import HeaderSection from "../HeaderSection";
import DynamicSkillCard from "../SkilllCard";
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
    content: () =>(
      <><SummarySection/></>
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
        <DynamicEducationCard name="education" />
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
    content: () => <DynamicSkillCard name="skills" />,
  },
];
