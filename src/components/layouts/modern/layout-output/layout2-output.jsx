
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
import {  LineDivider } from "../../../Divider/TransparentDividers";
const getModernLayout2OutputSectionData = (data,layout_id) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        certificates = [],
        summary="",
        openSourceWork
    } = data;

console.log("layout id calex",layout_id)
    const textStyle = {
        className: style.Title.className,
        fontSize: "20px",
        fontWeight: "500",
        fontFamily: "'Raleway', sans-serif",
        textAlign: "left",
        color: "#717171"
    }

    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={2} layout_type="modern" />,
        },
        {
            key:"skills",
            content:()=>(
                <>
                <Title title="SKILLS" {...textStyle}/>
                <LineDivider backgroundColor={textStyle.color} height="3px"/>
                <SectionContent>
                    <SkillCard layout_no={layout_id} layout_type="modern" skills={skills} ></SkillCard>
                </SectionContent>
                </>
            )
        },
        {
            key:"summary",
            content:()=>(
                <>
                <Title title="SUMMARY" {...textStyle}/>
                <LineDivider backgroundColor={textStyle.color} height="3px"/>
                <SectionContent>
                    <P>{summary}</P>
                </SectionContent>
                </>
            )
        },
        {
            key:"experties",
            content:()=>(
                <>
                 <Title title="INDUSTRY EXPERTISE" {...textStyle} />
                 <LineDivider backgroundColor={textStyle.color} height="3px"/>
                    <SectionContent>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                industryExpertise.slice(0,2).map((expertise, index) => (
                                    <ExpertiseCard key={index} expertise={expertise} layout_no={layout_id} />
                                ))
                            }
                        </div>
                    </SectionContent>
                </>
            )
        },
        {
            key:"experience",
            content:()=>(
                <>
                <Title title="EXPERIENCE" {...textStyle}/>
                <LineDivider backgroundColor={textStyle.color} height="3px"/>
                <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={layout_id} layout_type={"modern"} />
                            ))
                        }
                </SectionContent>
                </>
            )
        },
        {
            key: "education",
            content: () => (
                <>
                    <Title title="EDUCATIONS" {...textStyle}  />
                    <LineDivider backgroundColor={textStyle.color} height="3px"/>
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={layout_id} layout_type={"modern"} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key:"open_source_work",
            content:()=>(
                <>
                <Title title="OPEN SOURCE WORK" {...textStyle}  />
                <LineDivider backgroundColor={textStyle.color} height="3px"/>
                <SectionContent>
                    <OpenSourceWorkCard works={openSourceWork} layout_no={layout_id} layout_type={"modern"}/>
                </SectionContent>
                </>
            )
        }
    ]



}
export default getModernLayout2OutputSectionData