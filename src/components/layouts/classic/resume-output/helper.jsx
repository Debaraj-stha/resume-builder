import React from "react";
import {Title} from "../../../Title"
import { TransparentLine } from "../../../Divider/TransparentDividers";
import { SectionContent } from "../../../elements/resumeSectionWrapper";
import { AcheivementCard, EducationCard, ExperienceCard } from "../../cards";
import style from "../style/layout1_style.json";
// Helper to generate experience sections
const generateExperienceSections = (experiences,layout_no=1,titleStyle)=>
    experiences.map((experience, index) => ({
        key: `experience_${index}`,
        id: `experience_${index}`,
        content: () => (
            <>
                {index === 0 && (
                    <>
                        <Title title="Experience" {...titleStyle} />
                        <TransparentLine />
                    </>
                )}
                <SectionContent>
                    <ExperienceCard experience={experience} layout_no={layout_no} />
                </SectionContent>
            </>
        ),
    }));

const generateEducationSections = (educations,layout_no=1,titleStyle)=>
    educations.map((education, index) => ({
        key: `education_${index}`,
        id: `education_${index}`,
        content: () => (
            <>
                {index === 0 && (
                    <>
                        <Title title="Education"  {...titleStyle} />
                        <TransparentLine />
                    </>
                )}
                <SectionContent>
                    <EducationCard education={education} layout_no={layout_no}/>
                </SectionContent>
            </>
        ),
    }));

const generateAchievementsSections = (achievements,layout_no=1,titleStyle)=>
     achievements.map((achievement, index) => ({
        key: `achievement_${index}`,
        id: `achievement_${index}`,
        content: () => (
            <>
                {index === 0 && (
                    <>
                        <Title title="Achievements" {...titleStyle} />
                        <TransparentLine />
                    </>
                )}
                <SectionContent>
                    <AcheivementCard my_acheivement={achievement} layout_no={layout_no}/>
                </SectionContent>
            </>
        ),
    }));

export {generateAchievementsSections,generateEducationSections,generateExperienceSections}