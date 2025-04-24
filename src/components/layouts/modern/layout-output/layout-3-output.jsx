
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";
import style from "../style/layout1_style.json";
import ExperienceCard from "../../cards/ResumeExperienceCard";
import EducationCard from "../../cards/ResumeEducationCard";
import AcheivementCard from "../../cards/ResumeAchievementCard";
import SkillCard from "../../cards/ResumeSkillCard";
import { GridPairBox } from "../../../CustomComponents";
import ExpertiseCard from "../../cards/ResumeExpertiseCard";
import OpenSourceWorkCard from "../../cards/ResumeOpenSourceWorkCard";
import { LineDivider } from "../../../Divider/TransparentDividers";
import LanguageCard from "../../cards/ResumeLanguageCard";
import StrengthCard from "../../cards/ResumeStrengthCard";
const getModernLayout3OutputSectionData = (data, layout_id) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],

        languages = [],
   
        summary = "",
        
        strengths
    } = data;


    const textStyle = {
        className: style.Title.className,
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "'Roboto', sans-serif",
        textAlign: "left",
        color: "#0f0771"
    }

    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={3} layout_type="modern" />,
        },
        {
            key: "summary",
            content: () => (
                <>
                    <Title title="SUMMARY" {...textStyle} />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                        <P fontSize="14px">{summary}</P>
                    </SectionContent>
                </>
            )
        },
        {
            key: "education",
            content: () => (
                <>
                    <Title title="EDUCATIONS" {...textStyle} />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <>
                                <EducationCard key={index} education={education} layout_no={3} layout_type={"modern"} />
                                {index!=educations.length-1 && <LineDivider backgroundColor="#ccc"/>}
                                </>
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "experience",
            content: () => (
                <>
                    <Title title="EXPERIENCE" {...textStyle} />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={3} layout_type={"modern"} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },

        
        {
            key: "skills",
            content: () => (
                <>
                    <Title title="SKILLS" {...textStyle} />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                        <SkillCard layout_no={3} layout_type="modern" skills={skills} ></SkillCard>
                    </SectionContent>
                </>
            )
        },

        {
            key: "language",
            content: () => (
                <>
                    <Title title="LANGUAGE" {...textStyle}  />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                        {
                            languages.map((language,index)=>(
                                <LanguageCard key={index} language={language} layout_no={3}  />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "strength",
            content: () => (
                <>
                    <Title title="STRENGTH" {...textStyle}  />
                    <LineDivider backgroundColor={textStyle.color} height="3px" />
                    <SectionContent>
                 
                                <StrengthCard  strengths={strengths} layout_no={3} layout_type="modern" />
                     
                    </SectionContent>
                </>
            )
        }

      
    ]



}
export default getModernLayout3OutputSectionData