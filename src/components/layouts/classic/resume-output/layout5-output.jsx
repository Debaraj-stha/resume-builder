import SkillCard from "../../cards/ResumeSkillCard"
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_5_style as style } from "../layout-5/style"

import { SectionContent } from "../../../elements/resumeSectionWrapper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
const getlayout5OutputSection = (data, layout_no) => {

    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates = []
    } = data;

    return [
        generateProfileDetails({
            personalDetails: {...personalDetails,urls:[personalDetails.urls[0]]}, layout_no: layout_no,
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
            },
            props: {
                shouldIncludeProfession: false,
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
            educations,
            layout_no,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
        }),
        ...generateExperienceSections({
            experiences, layout_no, style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props: {
                applyFlex:true,
                includeDateAndAddress:true
            }
        }),

        generateSkill({
            skills:skills.slice(0,3),
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            layout_no: layout_no,
            titleHeader: "tech stack"
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
            shouldPair:true,
            props:{
                
            }
        })


    ]



}
export default getlayout5OutputSection