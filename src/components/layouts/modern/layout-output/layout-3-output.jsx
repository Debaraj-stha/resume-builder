
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";

import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";
import { layout_3_style as style } from "../layout-3/style";
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
import { generateTitle } from "./layout5-output";
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




    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails}
                layout_no={5} layout_type="modern"
                style={{ nameStyle: style.nameStyle, subSection: style.sectionSubHeader, p: style.p }}
                applyPadding={false}
            />,
        },
        {
            key: "summary",
            content: () => (
                <>
                    {

                        generateTitle({ title: "summary", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        <p style={{ ...style.p }}>{summary}</p>
                    </SectionContent>
                </>
            )
        },
        {
            key: "education",
            content: () => (
                <>
                    {

                        generateTitle({ title: "education", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <>
                                    <EducationCard key={index} education={education} layout_no={5} 
                                    layout_type={"modern"} style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p
                                    }} />
                                    {index != educations.length - 1 && <LineDivider backgroundColor="#ccc" />}
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
                    {

                        generateTitle({ title: "experience", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={5} layout_type={"modern"} style={{
                                    h2: style.h2,
                                    h3: style.h3,
                                    primaryColor: style.primaryColor,
                                    p: style.p,
                                    header: style.sectionHeader,
                                    subSection: style.sectionSubHeader
                                }} />
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

                        generateTitle({ title: "skills", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
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
            key: "language",
            content: () => (
                <>
                    {

                        generateTitle({ title: "language", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        {
                            languages.map((language, index) => (
                                <LanguageCard key={index} language={language} layout_no={5}
                                    style={{ h2: style.h2, color: style.headerTextColor }}
                                />
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
                    {

                        generateTitle({ title: "strengths", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>

                        <StrengthCard strengths={strengths} layout_no={3} layout_type="modern" style={{ h2: style.h2, p: style.p }} />

                    </SectionContent>
                </>
            )
        }


    ]



}
export default getModernLayout3OutputSectionData