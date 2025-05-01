import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_6_style as style } from "../layout-6/style"
import { layout_type_map } from "../../../../constant";
import generateSkill from "../../section-data/skill_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateAchievement from "../../section-data/achievement_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
const getModernLayout6OutputSectionData = (data, layout_no) => {
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
    const divider = <LineDivider height="3px" backgroundColor="#999" />
    const layout_type = layout_type_map.MODERN
    return [
        generateProfileDetails({
            personalDetails: personalDetails, layout_no: layout_no, layout_type: layout_type,
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
            experiences:experiences.slice(0,2),
            layout_no,
            layout_type: layout_type,
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
            layout_no: layout_no,
            layout_type: layout_type,
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
            skills:skills.slice(0,3),
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
            titleHeader: "technical experiences",
            props:{
                borderBox:true
            }

        }),
        generateAchievement({
            achievements,
            divider,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p

            },
            shouldIncludeIcon: false
        }),
        generateIndustryExpertise({
            industryExpertise:industryExpertise.slice(0,2),
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                barColor:style.profile_li?.iconColor

            },
            sectionHeader: "industry experiences"

        }),
        generateStrength({
            strengths:strengths.slice(0,3),
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader

            }

        }),
        generateLanguage({
            languages:languages.slice(0,2),
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, color: style.headerTextColor,
                sectionSubHeader: style.sectionSubHeader,
                barColor:style.profile_li?.iconColor
            },
        }),
    ]
}
export default getModernLayout6OutputSectionData