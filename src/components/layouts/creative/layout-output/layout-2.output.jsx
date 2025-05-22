import { layout_type_map } from "../../../../constant";
import {TransparentLineWithBox} from "../../../Divider/TransparentDividers";

import generateAchievement from "../../section-data/achievement_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateSummary from "../../section-data/summary";
import { layout_2_style as style } from "../layout-2/style";
const getCreativeLayout2OuctputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        strengths = [],
        industryExpertise = [],
        summary = "",

    } = data;
    const divider = <TransparentLineWithBox />

    const layout_type = layout_type_map.CREATIVE

    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[1]] },
            layout_no: layout_no,
            layout_type: layout_type,
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
                shouldIncludeAddress: true
            }

        }),
        generateSummary({
            summary,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            }
        }),
        generateAchievement({
            achievements,
            divider,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,

                h2: style.h2,
                p: style.p,
                iconColor: style.profile_li.iconColor

            },
            titleHeader: "most proud of",
            props: {
                shouldIncludeIcon: true
            }
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
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
                sshouldIncludeDate: true,
                shouldIncludeGPA: true

            }

        }),


        generateSkill({
            skills,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            layout_no: layout_no,
            layout_type: layout_type,
            props: {
                borderBottom: true
            }
        }),
        generateExperience({
            experiences: experiences.slice(0, 1),
            layout_no,
            layout_type: layout_type_map.SIMPLE,
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
                // applyFlex: true,
                includeDateAndAddress: true,
                shouldIincludeIcon: true

            }
        }),

        generateStrength({
            strengths: strengths.slice(0, 2),
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
        generateIndustryExpertise({
            industryExpertise,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                barColor:style.profile_li.iconColor,
                barStyle:style.barStyle
            },

        }),


    ]
}

export default getCreativeLayout2OuctputSectionData