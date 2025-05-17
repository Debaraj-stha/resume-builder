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
import DynamicCertificateCard from "../DynamicCertificateCard"
import DynamicPassionCard  from "../DynamicPassionCrad"
import DynamicLanguageInputCard from "../DynamicLanguageInputCard"
import DynamicStrengthsCard from "../DynamicStrengthsCard";
import DynamicTrainingCard from "../DynamicTrainingCard";
import DynamicMyTimeCard from "../DynamicMyTimeCard";
import DynamicAwardCard from "../DynamicAwardCard";
import DynamicIndustryExpertiseCard from "../DynamicInductryExpertiseCard";
import DynamicOpenSourceWorkCard from "../DynamicOpenSourceWork";
// Section Component Map
const sectionComponents = {
  header: (props) => <HeaderSection {...props} />,
  summary: () => <SummarySection />,
  experience: () => (
    <DynamicInputSectionWrapper>
      <Paragraph>Experience</Paragraph>
      <DynamicExperienceSection name="experiences" />
    </DynamicInputSectionWrapper>
  ),
  education: (props) => (
    <DynamicInputSectionWrapper>
      <Paragraph>Education</Paragraph>
      <DynamicEducationCard name="educations" {...props} />
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
  certificate:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Certificates</Paragraph>
      <DynamicCertificateCard name="certificates" />
    </DynamicInputSectionWrapper>
  ),
  passion:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Passions</Paragraph>
      <DynamicPassionCard name="passions"/>
    </DynamicInputSectionWrapper>
  ),
  language:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Languages</Paragraph>
      <DynamicLanguageInputCard name="languages"/>
    </DynamicInputSectionWrapper>
  ),
  strength:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Strengths</Paragraph>
      <DynamicStrengthsCard name="strengths"/>
    </DynamicInputSectionWrapper>
  ),
  training:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Trainings</Paragraph>
      <DynamicTrainingCard name="trainings"/>
    </DynamicInputSectionWrapper>
  ),
  my_time:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>My Time</Paragraph>
      <DynamicMyTimeCard name="my_time"/>
    </DynamicInputSectionWrapper>
  ),
  award:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Awards</Paragraph>
      <DynamicAwardCard name="awards"/>
    </DynamicInputSectionWrapper>
  ),
  expertise:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Industry Expertise</Paragraph>
      <DynamicIndustryExpertiseCard name="industryExpertise"/>
    </DynamicInputSectionWrapper>
  ),
  open_source_work:()=>(
    <DynamicInputSectionWrapper>
      <Paragraph>Open Source Work</Paragraph>
      <DynamicOpenSourceWorkCard name="openSourceWork"/>
    </DynamicInputSectionWrapper>
  )
};


export default sectionComponents

