
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";
import style from "../style/layout1_style.json";
import ExperienceCard from "../../cards/ResumeExperienceCard";
import EducationCard from "../../cards/ResumeEducationCard";
import AcheivementCard from "../../cards/ResumeAchievementCard";
import SkillCard from "../../cards/ResumeSkillCard";
import { FlexBox, GridPairBox } from "../../../CustomComponents";
import ExpertiseCard from "../../cards/ResumeExpertiseCard";
import OpenSourceWorkCard from "../../cards/ResumeOpenSourceWorkCard";
import { LineDivider } from "../../../Divider/TransparentDividers";
import { Layout_4_style } from "../layout-4/style";
import PassionCard from "../../cards/ResumePassionCard";

const Divider = () => <LineDivider height="3px" backgroundColor="#ccc8c8" />

const getModernLayout4OutputSectionData = (data, layout_id) => {
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
        openSourceWork,
        passions
    } = data;

    
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
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={4}
                layout_type="modern"
                style={{ nameStyle: Layout_4_style.nameStyle, subSection: Layout_4_style.sectionSubHeader, p: Layout_4_style.p }} />,
        },

        {
            key: "summary",
            content: () => (
                <>
                    <Title title="SUMMARY" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        <P style={{ ...Layout_4_style.p }}>{summary}</P>
                    </SectionContent>
                </>
            )
        },
        {
            key: "achievements",
            content: () => (
                <>
                    <Title title="ACHIEVEMENTS" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        {
                            achievements.map((achievement, index) => (
                                <AcheivementCard key={index} my_acheivement={achievement}
                                    layout_no={4}
                                    layout_type={"modern"}
                                    style={
                                        {
                                            iconColor: Layout_4_style.primaryColor,
                                            h3: Layout_4_style.h3,
                                            p: Layout_4_style.p
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
            key: "experience",
            content: () => (
                <>
                    <Title title="EXPERIENCE" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={4} layout_type={"modern"}

                                    style={{
                                        h2: Layout_4_style.h2,
                                        h3: Layout_4_style.h3,
                                        primaryColor: Layout_4_style.primaryColor,
                                        p: Layout_4_style.p
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
                    <Title title="EDUCATIONS" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={4} layout_type={"modern"}

                                    style={{
                                        h2: Layout_4_style.h2,
                                        h3: Layout_4_style.h3,
                                        primaryColor: Layout_4_style.primaryColor,
                                        p: Layout_4_style.p
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
                    <Title title="SKILLS" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        <SkillCard layout_no={4} layout_type="modern" skills={skills} style={Layout_4_style} ></SkillCard>
                    </SectionContent>
                </>
            )
        },
        {
            key: "experties",
            content: () => (
                <>
                    <Title title="INDUSTRY EXPERTISE" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        {
                            industryExpertise.map((expertise, index) => (
                                <ExpertiseCard key={index} expertise={expertise} layout_no={4} layout_type="modern" style={Layout_4_style} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "passions",
            content: () => (
                <>
                    <Title title="PASSIONS" {...Layout_4_style.sectionHeader} textAlign="left" />
                    <Divider />
                    <SectionContent>
                        <FlexBox flexWrap="wrap" margin="0">
                            {
                                passions.slice(0, 1).map((passion, index) => (
                                    <PassionCard key={index} passion={passion} layout_no={4} layout_type="modern" style={{ h2: Layout_4_style.h2 }} />
                                ))
                            }
                        </FlexBox>
                    </SectionContent>
                </>
            )
        },

    ]



}
export default getModernLayout4OutputSectionData