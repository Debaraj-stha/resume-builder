import {
  DynamicInputSectionWrapper,
  Paragraph,
} from "../../../CustomComponents";
import DynamicAcheivementCard from "../DynamicAcheivementCard";
import DynamicEducationCard from "../DynamicEducationCard";
import DynamicExperienceSection from "../DynamicExperienceSection";
import HeaderSection from "../HeaderSection";
import DynamicSkillCard, { SkillItems } from "../SkilllCard";
import SummarySection from "../SummarySection";

// Section Component Map
const sectionComponents = {
  header: () => <HeaderSection />,
  summary: () => <SummarySection />,
  experience: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Experience</Paragraph>
      <DynamicExperienceSection name="experiences" />
    </DynamicInputSectionWrapper>
  ),
  education: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Education</Paragraph>
      <DynamicEducationCard name="educations" />
    </DynamicInputSectionWrapper>
  ),
  achievement: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Achievement</Paragraph>
      <DynamicAcheivementCard name="acheivements" />
    </DynamicInputSectionWrapper>
  ),
  skills1: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Skills</Paragraph>
      <SkillItems name="skills[0].items" />
    </DynamicInputSectionWrapper>
  ),
  skills2: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Skills</Paragraph>
      <DynamicSkillCard name="skills" />
    </DynamicInputSectionWrapper>
  ),
};

// Layout Definitions
const layoutSections = {
  layout1: ["header", "summary", "experience", "education", "achievement", "skills1"],
  layout2: ["header", "summary", "experience", "education", "skills1"],
  layout3: ["header", "summary", "experience", "education", "skills2"],
};

// Generator
const generateLayoutData = (layoutKey) => {
  return layoutSections[layoutKey].map((key) => ({
    key,
    content: () => sectionComponents[key](),
  }));
};

// Final Exports
export const layout1SeactionData = generateLayoutData("layout1");
export const layout2sectionData = generateLayoutData("layout2");
export const layout3SectionData = generateLayoutData("layout3");
