import React from "react";
import { Title } from "../../../Title"
import { DoubleLineDivider, TransparentLine } from "../../../Divider/TransparentDividers";
import { SectionContent } from "../../../elements/resumeSectionWrapper";

import style from "../style/layout1_style.json";
import { GridPairBox } from "../../../CustomComponents";
import  ExperienceCard  from "../../cards/ResumeExperienceCard";
import CertificationCard from "../../cards/ResumeCertificationCard"
import EducationCard from "../../cards/ResumeEducationCard"
import AcheivementCard from  "../../cards/ResumeAchievementCard"
export const IncludeSeparator = ({ layout_no }) =>
    (layout_no === 1 || layout_no === 2 || layout_no === 3 || layout_no === 6) ? <TransparentLine /> : null;


// Helper to generate experience sections
const generateExperienceSections = (experiences, layout_no = 1, titleStyle) => {
    switch (layout_no) {
        case 6:
            return experiences.map((experience, index) => ({
                key: `experience_${index}`,
                id: `experience_${index}`,
                content: () => (
                    <>
                        {index === 0 && (
                            <>
                                <Title title="EXPERIENCES" {...titleStyle} />
                                <DoubleLineDivider layout_no={layout_no} />
                            </>
                        )}
                        <SectionContent>
                            <ExperienceCard experience={experience} layout_no={layout_no} />
                        </SectionContent>
                    </>
                ),
            }));
        default:
            return experiences.map((experience, index) => ({
                key: `experience_${index}`,
                id: `experience_${index}`,
                content: () => (
                    <>
                        {index === 0 && (
                            <>
                                <Title title="EXPERIENCES" {...titleStyle} />
                                <IncludeSeparator />
                            </>
                        )}
                        <SectionContent>
                            <ExperienceCard experience={experience} layout_no={layout_no} />
                        </SectionContent>
                    </>
                ),
            }));
    }
}


const generateEducationSections = (educations, layout_no = 1, titleStyle) => {

    switch (layout_no) {
        case 4:

            return [({
                key: `education_0`,
                id: `education_0`,
                content: () => (
                    <>

                        <Title title="EDUCATION"  {...titleStyle} />
                        <IncludeSeparator layout_no={layout_no} />
                        <SectionContent>
                            <EducationCard education={educations[0]} layout_no={layout_no} />
                        </SectionContent>
                    </>
                ),
            })]
        case 6:
            const groupedEducations = []
            for (let i = 0; i < educations.length; i++) {
                groupedEducations.push(educations.slice(i, i + 2))
            }
            return groupedEducations.map((group, index) => ({
                key: `education_${index}`,
                content: () => (
                    <>
                        <SectionContent>
                            <GridPairBox>
                                {group.map((education, subIndex) => (
                                    <EducationCard key={`education_${index}_${subIndex}`} education={education} layout_no={layout_no} />
                                ))}
                            </GridPairBox>
                        </SectionContent>
                    </>
                )
            }))
        default:
            return educations.map((education, index) => ({
                key: `education_${index}`,
                id: `education_${index}`,
                content: () => (
                    <>
                        {
                            index === 0 && (
                                <>
                                    <Title title="EDUCATION"  {...titleStyle} />
                                    <IncludeSeparator layout_no={layout_no} />


                                </>
                            )}
                        <SectionContent>
                            <EducationCard education={education} layout_no={layout_no} />
                        </SectionContent>
                    </>
                ),
            }));

    }
}


const generateAchievementsSections = (achievements, layout_no = 1, titleStyle) => {
    const groupedAcheivements = [];
    // Group achievements into pairs
    for (let i = 0; i < achievements.length; i += 2) {
        groupedAcheivements.push(achievements.slice(i, i + 2));
    }
    switch (layout_no) {
        case 4:
            return groupedAcheivements.map((group, index) => ({
                key: `achievement_${index}`,
                id: `achievement_${index}`,
                content: () => (
                    <>
                        {index === 0 && (
                            <>
                                <Title title="KEY ACHEIVEMENTS" {...titleStyle} />
                                <IncludeSeparator layout_no={layout_no} />
                            </>
                        )}
                        <SectionContent>
                            <GridPairBox>
                                {group.map((achievement, subIndex) => (
                                    <AcheivementCard key={`achievement_${index}_${subIndex}`} my_acheivement={achievement} layout_no={layout_no} />
                                ))}
                            </GridPairBox>
                        </SectionContent>
                    </>
                ),
            }))

        case 5:
            return groupedAcheivements.map((group, index) => ({
                key: `achievement_${index}`,
                id: `achievement_${index}`,
                content: () => (
                    <>
                        {index === 0 && (
                            <>
                                <Title title="KEY ACHEIVEMENTS" {...titleStyle} />
                                <IncludeSeparator layout_no={layout_no} />
                            </>
                        )}
                        <SectionContent>
                            <GridPairBox>
                                {group.map((achievement, subIndex) => (
                                    <AcheivementCard key={`achievement_${index}_${subIndex}`} my_acheivement={achievement} layout_no={layout_no} />
                                ))}
                            </GridPairBox>
                        </SectionContent>
                    </>
                ),
            }))

        default:
            return achievements.map((achievement, index) => ({
                key: `achievement_${index}`,
                id: `achievement_${index}`,
                content: () => (
                    <>
                        {index === 0 && (
                            <>
                                <Title title="KEY ACHEIVEMENTS" {...titleStyle} />
                                <TransparentLine />
                            </>
                        )}
                        <SectionContent>
                            <AcheivementCard my_acheivement={achievement} layout_no={layout_no} />
                        </SectionContent>
                    </>
                ),
            }));
    }
}
const generateCertipicates = (certipicates, layout_no, titleStyle) => {
    const groupedCertipicates = []
    for (let i = 0; i < certipicates.length; i++) {
        groupedCertipicates.push(certipicates.slice(i, i + 2))
    }
    switch (layout_no) {
        case 5:
            return groupedCertipicates.map((group, index) => ({
                key: `certipicate_${index}`,
                content: () => (
                    <>
                        {
                            index == 0 && (
                                <>
                                    <Title title="CERTIPICATIONS" {...titleStyle} />
                                </>
                            )

                        }
                        <SectionContent>
                            <GridPairBox>
                                {group.map((certificate, subIndex) => (
                                    <CertificationCard key={`certificate-${index}_${subIndex}`} certificate={certificate} layout_no={layout_no} />
                                ))}
                            </GridPairBox>
                        </SectionContent>
                    </>
                )
            }
            ))
        default:
            return groupedCertipicates.map((group, index) => ({
                key: `certipicate_${index}`,
                content: () => (
                    <>
                        {
                            index == 0 && (
                                <>
                                    <Title title="CERTIPICATIONS" {...titleStyle} />
                                    {

                                        layout_no == 4 ? (<TransparentLine />) : (<DoubleLineDivider />)

                                    }
                                </>
                            )

                        }

                        <SectionContent>
                            <GridPairBox>
                                {group.map((certificate, subIndex) => (
                                    <CertificationCard key={`certificate-${index}_${subIndex}`} certificate={certificate} layout_no={layout_no} />
                                ))}
                            </GridPairBox>
                        </SectionContent>
                    </>
                )
            }
            ))

    }
}

export { generateAchievementsSections, generateEducationSections, generateExperienceSections, generateCertipicates }