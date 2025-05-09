import SkillCard from "../../cards/ResumeSkillCard"
import ResumeHeader from "../../cards/ResumeHeader";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_4_style as style } from "../layout-4/style"

import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
const getLayout4OutputSection = (data, layout_no) => {

    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates = []
    } = data;
console.log("called layout number 4",layout_no)
    return [
        generateProfileDetails({
            personalDetails,
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                titleStyle: style.titleStyle,
                profile_ul: style?.profile_ul,
                profile_li: style?.profile_li,
                p: style.p
            },
            props: {
                shouldIncludeProfession: false,
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
        ...generateAchievementsSections({
            achievements,
            layout_no,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p,
                tagStyle: style.tagStyle

            },
            shouldPair: true,
            props: {
                shouldApplyGrid: false
            },
            sectionHeader: "key achievement"
        }),
        ...generateEducationSections({
            educations, layout_no,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            props: {
                applyVerticalDivider: true
            }
        }),
        ...generateExperienceSections({
            experiences: experiences.slice(0, 2), 
            layout_no, 
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props: {
                applyVerticalDivider: true
            }
        }),

        generateSkill({
            skills: skills.slice(0, 4),

            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            layout_no: layout_no,
            titleHeader: "technical skills",
            props: {
                borderBottom: true
            }
        }),
        ...generateCertipicates({
            certificates,
            layout_no,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h3: style.h3,
                p: style.p
            },
            shouldPair: true,

        })


    ]



}
export default getLayout4OutputSection