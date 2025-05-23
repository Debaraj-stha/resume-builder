import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_5_style as style } from "../layout-5/style"
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
const getlayout5OutputSection = (data, divider)=>{
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
            personalDetails, 
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
            experiences,  style: {
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
            skills,
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