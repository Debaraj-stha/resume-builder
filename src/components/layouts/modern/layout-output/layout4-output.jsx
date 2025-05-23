import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_4_style as style } from "../layout-4/style";
import { layout_type_map } from "../../../../constant";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateAchievement from "../../section-data/achievement_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";


const getModernLayout4OutputSectionData = (data, layout_no,divider) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise,
        summary = "",
        passions
    } = data;

    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [] },
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle
            },
            props: {
                shouldIncludeProfession: false,
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
        generateSummary({
            summary,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            divider: divider
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
            shouldIncludeIcon: true
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
            props: {
                // applyFlex:true,
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
                sectionSubHeader: style.sectionSubHeader
            },
            layout_no: layout_no,
            layout_type: layout_type_map.SIMPLE,
            titleHeader: "skills"

        }),
     
         generateIndustryExpertise({
            industryExpertise,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                barStyle:style.barStyle,
               
            },
            
        }),
        generatePassionSectionData({
            passions:passions.slice(0,4),
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2
            },
            divider
        })

    ]



}
export default getModernLayout4OutputSectionData