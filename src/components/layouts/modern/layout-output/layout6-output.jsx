
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";
;
import ExperienceCard from "../../cards/ResumeExperienceCard";
import EducationCard from "../../cards/ResumeEducationCard";
import AcheivementCard from "../../cards/ResumeAchievementCard";
import SkillCard from "../../cards/ResumeSkillCard";
import { FlexBox, GridPairBox } from "../../../CustomComponents";
import ExpertiseCard from "../../cards/ResumeExpertiseCard";
import OpenSourceWorkCard from "../../cards/ResumeOpenSourceWorkCard";
import { LineDivider } from "../../../Divider/TransparentDividers";

import PassionCard from "../../cards/ResumePassionCard";
import  {layout_6_style as style} from "../layout-6/style"
import StrengthCard from "../../cards/ResumeStrengthCard";
import LanguageCard from "../../cards/ResumeLanguageCard";

const Divider = () => <LineDivider height="3px" backgroundColor="#999" />
const generateTitle = ({ title, style }) => (
    <h1 style={{ ...style }}>{title}</h1>
)

const getModernLayout6OutputSectionData = (data, layout_id) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],

        strengths
    } = data;




    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={5}
                layout_type="modern"
                applyPadding={false}
                style={{
                    nameStyle: style.nameStyle,
                    h3: style.h3,
                    p: style.p, headerBackground: style.headerBackground,
                    textColor: style.textColor
                }} />,
        },
        {
            key: "experience",
            content: () => (
                <>
                    {
                        generateTitle({ title: "professional experiences", style: { ...style.sectionHeader, textAlign: "left" } })


                    }
                    <gene />
                    <Divider />
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={5} layout_type={"modern"}

                                    style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p,
                                        header: style.sectionHeader,
                                        subSection: style.sectionSubHeader
                                    }}
                                />
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
                    {
                        generateTitle({ title: "Education", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <Divider />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={5} layout_type={"modern"}

                                    style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p,
                                        header: style.sectionHeader,
                                        subSection: style.sectionSubHeader
                                    }}
                                />
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
                    {
                        generateTitle({ title: "techincal experiences", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <Divider />
                    <SectionContent>
                        <SkillCard layout_no={5} layout_type="modern" skills={skills} style={{
                            header: style.sectionHeader,
                            h1: style.h1,
                            h2: style.h2,
                            h3: style.h3
                        }} ></SkillCard>
                    </SectionContent>
                </>
            )
        },
        {
            key: "achievements",
            content: () => (
                <>
                {
                   generateTitle({ title: "Achievement", style: { ...style.sectionHeader, textAlign: "left" } })
                }
                    <Divider />
                    <SectionContent>
                        {
                            achievements.map((achievement, index) => (
                                <AcheivementCard key={index} my_acheivement={achievement}
                                    layout_no={5}
                                    layout_type={"modern"}
                                    style={
                                        {
                                            iconColor: style.primaryColor,
                                            h2: style.h2,
                                            p: style.p
                                        }
                                    }
                                />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "experties",
            content: () => (
                <>
                    {
                        generateTitle({ title: "industry experiences", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <Divider />
                    <SectionContent>
                        {
                            industryExpertise.map((expertise, index) => (
                                <ExpertiseCard key={index} expertise={expertise} layout_no={5} layout_type="modern" style={{ color: style.accentColor, sectionSubHeader: style.sectionHeader }} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "strengths",
            content: () => (
                <>
                    {
                        generateTitle({ title: "strengths", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <Divider />
                    <SectionContent>

                        <StrengthCard layout_no={5} layout_type="modern" style={{h2:style.h2,p:style.p}} strengths={strengths} />

                    </SectionContent>
                </>
            )
        },
        {
            key:"languages",
            content:()=>(
                <>
                { generateTitle({ title: "Languages", style: { ...style.sectionHeader, textAlign: "left" } })
                    
                    }
                     <SectionContent>
                        {
                            languages.map((language,index)=>(
                                <LanguageCard key={index} language={language} layout_no={6} style={{h2:style.h2,color:style.headerTextColor}}  />
                            ))
                        }
                    </SectionContent>
                </>
            )
        }


    ]



}
export default getModernLayout6OutputSectionData