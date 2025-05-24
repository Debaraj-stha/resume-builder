import { layout_1_style as style } from "../layout-1/style"
import generateExperience from "../../section-data/experience_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateAchievement from "../../section-data/achievement_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateCertification from "../../section-data/certification_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import { LineDivider } from "../../../Divider/TransparentDividers";
import generateStrength from "../../section-data/strength_section_data";
const getModernLayout1OutputSectionData = (data,divider) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        certificates = [],
        strengths=[],
        
    } = data
    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails?.urls?.[0]] },
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
               
            }

        }),
        generateExperience({
            experiences: experiences.slice(0, 2),
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            props: {
                applyFlex: true,
                includeDateAndAddress: true,

            }
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
            props: {
                side: "right",
                shouldIncludeIcon: false,
                shouldIncludeGPA: true
            }


        }),
        generateIndustryExpertise({
            industryExpertise,
            divider,
            layout_type: layout_type_map.MODERN,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                barStyle:style.barStyle
            }
        }),

        generateStrength({
            strengths:strengths.slice(0,4),
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader:style.sectionHeader
            },
            props:{
                  side: "right"
            }

        }),
        generateSkill({
            skills: skills.slice(0, 2),
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            props:{
                shouldIncludeField:true
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
            props: {
                shouldIncludeIcon: true,
                  side: "right"
            }
        }),

      
       
        generateLanguage({
            languages,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, 
                color: style.headerTextColor,
                sectionSubHeader: style.sectionSubHeader,
                progressBar:style.progressBar
            },
            props: {
                
                grid:true,
            }
        }),
        generateCertification({
            certificates,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h3: style.h3,
                p: style.p
            },
            props: {
                side:"right"
            }

        }),
    ];

}
export default getModernLayout1OutputSectionData