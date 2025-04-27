import React from "react";

import {  TransparentLine } from "../Divider/TransparentDividers";
import { SectionContent } from "../elements/resumeSectionWrapper";

import { GridPairBox } from "../CustomComponents";
import ExperienceCard from "./cards/ResumeExperienceCard";
import CertificationCard from "./cards/ResumeCertificationCard"
import EducationCard from "./cards/ResumeEducationCard"
import AcheivementCard from "./cards/ResumeAchievementCard"

import { layout_type_map } from "../../constant";
import generateTitle from "./section-data/titleGenerater";

export const IncludeSeparator = ({ layout_no, divider }) =>
    (layout_no === 1 || layout_no === 2 || layout_no === 3 || layout_no === 6) ? <TransparentLine /> : null;
// Helper to generate experience sections
const generateExperienceSections = ({
    experiences,
    style,
    layout_no = 1,
    divider,
    title = "experience",
    layout_type = layout_type_map.CLASSICAL,
    shouldPair = false,
    props={}
}) => {
    console.log("props", props);

    const renderTitleAndDivider = (index) => (
        index === 0 && (
            <>
                {generateTitle({ title, style: style?.sectionHeader })}
                {divider || (layout_no === 6 ? <IncludeSeparator layout_no={layout_no} /> : <IncludeSeparator />)}
            </>
        )
    );
    const renderExperience = (experience, key) => (
        <ExperienceCard
            key={key}
            experience={experience}
            layout_no={layout_no}
            layout_type={layout_type}
            style={style}
            {...props}
        />
    )

    if (shouldPair) {
        const pairedItems = []
        for (let i = 0; i < experiences.length; i += 2) {
            pairedItems.push(experiences.slice(i, i + 2))
        }
        return pairedItems.map((pair, index) => ({
            key: `experience_${index}`,
            content: () => (

                <>
                    {renderTitleAndDivider(index)}
                    <SectionContent>
                        <GridPairBox>
                            {pair.map((experience, subIndex) =>
                                renderExperience(experience, `experience${index}_${subIndex}`)
                            )}
                        </GridPairBox>
                    </SectionContent>
                </>

            )
        }
        ))
    }

    return experiences.map((experience, index) => ({
        key: `experience_${index}`,
        id: `experience_${index}`,
        content: () => (
            <>
                {renderTitleAndDivider(index)}
                <SectionContent>
                    <ExperienceCard
                        experience={experience}
                        layout_no={layout_no}
                        layout_type={layout_type}
                        style={style}
                        {...props}
                    />
                </SectionContent>
            </>
        ),
    }));
};
const generateEducationSections = ({
    educations,
    style,
    layout_no = 1,
    divider,
    title = "education",
    layout_type = layout_type_map.CLASSICAL,
    shouldPair = false,
    props={}
}) => {
    const renderTitleAndDivider = (index) => (
        index === 0 && (
            <>
                {generateTitle({ title, style: style?.sectionHeader })}
                {divider || <IncludeSeparator />}
            </>
        )
    );

    const renderEducationCard = (education, key) => (
        <EducationCard
            key={key}
            education={education}
            layout_no={layout_no}
            layout_type={layout_type}
            style={style}
            {...props}
        />
    );

    if (shouldPair) {
        const pairedEducations = [];
        for (let i = 0; i < educations.length; i += 2) {
            pairedEducations.push(items.slice(i, i + 2));
        }

        return pairedEducations.map((group, index) => ({
            key: `education_${index}`,
            id: `education_${index}`,
            content: () => (
                <>
                    {renderTitleAndDivider(index)}
                    <SectionContent>
                        <GridPairBox>
                            {group.map((education, subIndex) =>
                                renderEducationCard(education, `education_${index}_${subIndex}`)
                            )}
                        </GridPairBox>
                    </SectionContent>
                </>
            ),
        }));
    }

    return educations.map((education, index) => ({
        key: `education_${index}`,
        id: `education_${index}`,
        content: () => (
            <>
                {renderTitleAndDivider(index)}
                <SectionContent>
                    {renderEducationCard(education, `education_${index}`)}
                </SectionContent>
            </>
        ),
    }));
};
const generateAchievementsSections = ({
    achievements,
    layout_no,
    style,
    divider,
    shouldPair = false,
    layout_type = layout_type_map.CLASSICAL,
    sectionHeader = "achievement" ,
    props={}
}
) => {
    const renderTitleAndDivider = (index) => (
        index === 0 && (
            <>
                {generateTitle({ title: sectionHeader, style: { ...style?.sectionHeader } })}
                {divider || null}
            </>
        )
    );

    const renderAchievementCard = (achievement, key) => (
        <AcheivementCard
            key={key}
            my_acheivement={achievement}
            layout_no={layout_no}
            layout_type={layout_type}
            style={style}
            {...props}
        />
    );

    let items = achievements;

    if (shouldPair) {
        const pairedAchievements = [];
        for (let i = 0; i < achievements.length; i += 2) {
            pairedAchievements.push(achievements.slice(i, i + 2));
        }

        return pairedAchievements.map((group, index) => ({
            key: `achievement_${index}`,
            id: `achievement_${index}`,
            content: () => (
                <>
                    {renderTitleAndDivider(index)}
                    <SectionContent>
                        <GridPairBox>
                            {group.map((achievement, subIndex) =>
                                renderAchievementCard(achievement, `achievement_${index}_${subIndex}`)
                            )}
                        </GridPairBox>
                    </SectionContent>
                </>
            ),
        }));
    }

    return items.map((achievement, index) => ({
        key: `achievement_${index}`,
        id: `achievement_${index}`,
        content: () => (
            <>
                {renderTitleAndDivider(index)}
                <SectionContent>
                    {renderAchievementCard(achievement, `achievement_${index}`)}
                </SectionContent>
            </>
        ),
    }));
};
const generateCertipicates = ({
    certificates,
    layout_no,
    style,
    divider,
    shouldPair = false,
    sectionHeader = "certifications",
    layout_type = layout_type_map.CLASSICAL
}
) => {
    const renderTitleAndDivider = (index) => (
        index === 0 && (
            <>
                {generateTitle({ title: sectionHeader, style: { ...style?.sectionHeader } })}
                {divider || null}
            </>
        )
    );

    const renderCertificateCard = (certificate, key) => (
        <CertificationCard
            key={key}
            certificate={certificate}
            layout_no={layout_no}
            layout_type={layout_type}
            style={{
                h2: style?.h2,
                color: style?.headerTextColor
            }}
        />
    );

    let items = certificates;

    if (shouldPair) {
        const pairedCertificates = [];
        for (let i = 0; i < certificates.length; i += 2) {
            pairedCertificates.push(certificates.slice(i, i + 2));
        }

        return pairedCertificates.map((group, index) => ({
            key: `certificate_${index}`,
            content: () => (
                <>
                    {renderTitleAndDivider(index)}
                    <SectionContent>
                        <GridPairBox>
                            {group.map((certificate, subIndex) =>
                                renderCertificateCard(certificate, `certificate_${index}_${subIndex}`)
                            )}
                        </GridPairBox>
                    </SectionContent>
                </>
            ),
        }));
    }

    return items.map((certificate, index) => ({
        key: `certificate_${index}`,
        content: () => (
            <>
                {renderTitleAndDivider(index)}
                <SectionContent>
                    {renderCertificateCard(certificate, `certificate_${index}`)}
                </SectionContent>
            </>
        ),
    }));
};


export { generateAchievementsSections, generateEducationSections, generateExperienceSections, generateCertipicates }