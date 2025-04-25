
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";

import ResumeHeader from "../../cards/ResumeHeader";

import { generateAchievementsSections, generateEducationSections, generateExperienceSections } from "../../classic/resume-output/helper";
import { layout_1_style as style } from "../layout-1/style"
import ExperienceCard from "../../cards/ResumeExperienceCard";
import EducationCard from "../../cards/ResumeEducationCard";
import AcheivementCard from "../../cards/ResumeAchievementCard";
import SkillCard from "../../cards/ResumeSkillCard";
import { GridPairBox } from "../../../CustomComponents";
import ExpertiseCard from "../../cards/ResumeExpertiseCard";
import LanguageCard from "../../cards/ResumeLanguageCard";
import CertificationCard from "../../cards/ResumeCertificationCard";
import { generateTitle } from "./layout5-output";
const getModernLayout1OutputSectionData = (data) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        certificates = []
    } = data;







    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={1} layout_type="modern" />,
        },
        {
            key: "experience",
            content: () => (
                <>
                    {

                        generateTitle({ title: "experience", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={5}

                                    style={{
                                        h2: style.h2,
                                        h3: style.h3,
                                        primaryColor: style.primaryColor,
                                        p: style.p,
                                        header: style.sectionHeader,
                                        subSection: style.sectionSubHeader
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
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={5}
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
            key: "industry_expertise",
            content: () => (
                <>
                    {

                        generateTitle({ title: "industry expertise", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <SectionContent>
                        <div className="grid grid-cols-2 gap-3">
                            {
                                industryExpertise.slice(0, 2).map((expertise, index) => (
                                    <ExpertiseCard key={index} expertise={expertise} layout_no={5} style={{ sectionSubHeader: style.sectionSubHeader }}
                                    />
                                ))
                            }
                        </div>
                    </SectionContent>
                </>
            )
        },

        {
            key: "achievements",
            content: () => (
                <>
                    {

                        generateTitle({ title: "achievements", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <SectionContent>
                        {
                            achievements.map((achievement, index) => (
                                <AcheivementCard key={index} my_acheivement={achievement} layout_no={5}

                                    style={
                                        {
                                            iconColor: style.primaryColor,
                                            h2: style.h2,
                                            p: style.p
                                        }
                                    }
                                    layout_type={"modern"} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "skills",
            id: "skills",
            content: () => (
                <>
                    {

                        generateTitle({ title: "skills", style: { ...style.sectionHeader, textAlign: "left" } })
                    }

                    <SectionContent>
                        <SkillCard skills={skills.slice(0, 2)} layout_no={5} layout_type={"modern"}
                        style={{
                                                    header: style.sectionHeader,
                                                    h1: style.h1,
                                                    h2: style.h2,
                                                    h3: style.h3
                                                }}
                        
                        />
                    </SectionContent>
                </>
            ),
        },
        {
            key: "language",
            content: () => (
                <>
                    {

                        generateTitle({ title: "languages", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <SectionContent>
                        {
                            languages.map((language, index) => (
                                <LanguageCard key={index} language={language} layout_no={5} style={{
                                    h2: style.h2,
                                    color: style.accentColor
                                }} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        },
        {
            key: "certificates",
            content: () => (
                <>
                    {

                        generateTitle({ title: "certificates", style: { ...style.sectionHeader, textAlign: "left" } })
                    }
                    <SectionContent>
                        {
                            certificates.map((certificate, index) => (
                                <CertificationCard key={index} certificate={certificate} layout_no={5} layout_type={"modern"}
                                style={{
                                    p:style.p,
                                    h3:style.h3
                                }}
                                />
                            ))
                        }
                    </SectionContent>
                </>
            )
        }
    ];

}
export default getModernLayout1OutputSectionData