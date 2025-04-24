
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
import LanguageCard from "../../cards/ResumeLanguageCard";
import CertificationCard from "../../cards/ResumeCertificationCard";
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


    const textStyle = {
        className: style.Title.className,
        fontSize: style.Title.fontSize,
        fontWeight: "500",
        fontFamily: "Lato, sans-serif",
        textAlign: "left",
        color: "black"
    }






    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={1} layout_type="modern" />,
        },
        {
            key: "experience",
            content: () => (
                <>
                    <Title title="EXPERIENCES" {...textStyle} />
                    <SectionContent>
                        {
                            experiences.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} layout_no={1} layout_type={"modern"} />
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
                    <Title title="EDUCATIONS" {...textStyle} color="white" />
                    <SectionContent>
                        {
                            educations.map((education, index) => (
                                <EducationCard key={index} education={education} layout_no={1} layout_type={"modern"} />
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
                    <Title title="INDUSTRY EXPERTISE" {...textStyle} />
                    <SectionContent>
                        <div className="grid grid-cols-2 gap-3">
                            {
                                industryExpertise.slice(0,2).map((expertise, index) => (
                                    <ExpertiseCard key={index} expertise={expertise} layout_no={1} />
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
                    <Title title="ACHIEVEMENTS" {...textStyle} color="white" />
                    <SectionContent>
                        {
                            achievements.map((achievement, index) => (
                                <AcheivementCard key={index} my_acheivement={achievement} layout_no={1} layout_type={"modern"} />
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
                    <Title title="SKILLS" {...textStyle} />

                    <SectionContent>
                        <SkillCard skills={skills.slice(0, 2)} layout_no={1} layout_type={"modern"} />
                    </SectionContent>
                </>
            ),
        },
        {
            key: "language",
            content: () => (
                <>
                    <Title title="LANGUAGE" {...textStyle} color="white" />
                    <SectionContent>
                        {
                            languages.map((language,index)=>(
                                <LanguageCard key={index} language={language} layout_no={1}  />
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
                    <Title title="CERTIFICATIONS" {...textStyle}  />
                    <SectionContent>
                        {
                            certificates.map((certificate, index) => (
                                <CertificationCard key={index} certificate={certificate} layout_no={1} layout_type={"modern"} />
                            ))
                        }
                    </SectionContent>
                </>
            )
        }
    ];

}
export default getModernLayout1OutputSectionData