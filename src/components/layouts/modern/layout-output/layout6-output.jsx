
import { layout_6_style as style } from "../layout-6/style"
import generateSkill from "../../section-data/skill_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateAchievement from "../../section-data/achievement_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateLanguage from "../../section-data/language_section_data";
const getModernLayout6OutputSectionData = (data, divider) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        strengths
    } = data;
    return [
        generateProfileDetails({
            personalDetails: personalDetails,
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style?.profile_ul,
                profile_li: style?.profile_li,
                titleStyle: style?.titleStyle,

            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
        generateExperience({
            experiences,
    
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
        }),
        generateEducation({
            educations,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },

        }),
        generateSkill({
            skills,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3,
                sectionSubHeader: style.sectionSubHeader,
                borderColor:"#cfcbcb"
            },

            titleHeader: "technical skills",
            props:{
                borderBox:true
            }

        }),
        generateAchievement({
            achievements,
            divider,
    
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p

            },
            shouldIncludeIcon: false
        }),
       
        generateStrength({
            strengths,
    
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader

            }

        }),
        generateLanguage({
            languages,
    
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, color: style.headerTextColor,
                sectionSubHeader: style.sectionSubHeader,
                progressBar:style.progressBar
            },
        }),
    ]
}
export default getModernLayout6OutputSectionData