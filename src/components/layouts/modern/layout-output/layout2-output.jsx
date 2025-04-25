
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";

import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";

import ExperienceCard from "../../cards/ResumeExperienceCard";
import EducationCard from "../../cards/ResumeEducationCard";
import AcheivementCard from "../../cards/ResumeAchievementCard";
import SkillCard from "../../cards/ResumeSkillCard";
import { GridPairBox } from "../../../CustomComponents";
import ExpertiseCard from "../../cards/ResumeExpertiseCard";
import OpenSourceWorkCard from "../../cards/ResumeOpenSourceWorkCard";
import { LineDivider } from "../../../Divider/TransparentDividers";
import { generateTitle } from "./layout5-output";
import { layout_2_style as style } from "../layout-2/style"
const getModernLayout2OutputSectionData = (data, layout_id) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        certificates = [],
        summary = "",
        openSourceWork
    } = data;


    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={2} layout_type="modern"
                style={{ nameStyle: style.nameStyle, subSection: style.sectionSubHeader, p: style.p }}
            />,
        },
        {
            key: "skills",
            content: () => (
                <>
                    {
                        generateTitle({ title: "skils", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        <SkillCard layout_no={5} layout_type="modern" skills={skills}
                            style={{
                                header: style.sectionHeader,
                                h1: style.h1,
                                h2: style.h2,
                                h3: style.h3
                            }}
                        ></SkillCard>
                    </SectionContent>
                </>
            )
        },
        {
            key: "summary",
            content: () => (
                <>
                    {
                        generateTitle({ title: "Summary", style: { ...style.sectionHeader, textAlign: "left" } })

                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        <P>{summary}</P>
                    </SectionContent>
                </>
            )
        },
        {
            key: "experties",
            content: () => (
                <>
                    {
                        generateTitle({ title: "expertise", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        <div className="grid grid-cols-1 gap-3">
                            {
                                industryExpertise.slice(0, 2).map((expertise, index) => (
                                    <ExpertiseCard key={index} expertise={expertise} layout_no={5}
                                        style={{ sectionSubHeader: style.sectionSubHeader }}

                                    />
                                ))
                            }
                        </div>
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
                                <ExperienceCard key={index} experience={experience} layout_no={5}
                                    style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p
                                    }}
                                    layout_type={"modern"} />
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
                        generateTitle({ title: "education", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={2}

                                    style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p
                                    }}
                                    layout_type={"modern"} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "open_source_work",
            content: () => (
                <>
                    {
                        generateTitle({ title: "open source work", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <LineDivider height="3px" />
                    <SectionContent>
                        <OpenSourceWorkCard works={openSourceWork} layout_no={2} layout_type={"modern"} style={{
                            h2: style.h2,

                            p: style.p
                        }} />
                    </SectionContent>
                </>
            )
        }
    ]



}
export default getModernLayout2OutputSectionData