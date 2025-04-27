

import { layout_1_style as style } from "../layout-1/style"
import generateExperience from "../../section-data/experience_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateAchievement from "../../section-data/achievement_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateCertification from "../../section-data/certification_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import { layout_type_map } from "../../../../constant";
const getModernLayout1OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        languages = [],
        certificates = []
    } = data
    return [
        generateProfileDetails({
            personalDetails: { personalDetails }, layout_no: layout_no, layout_type: layout_type_map.SIMPLE,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

        }),
        generateExperience({
            experiences,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                header: style.sectionHeader,
                subSection: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            }
        }),
        generateEducation({
            educations,
            layout_no: layout_no,
            layout_type: layout_type_map.SIMPLE,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader
            }
            

        }),
        generateIndustryExpertise({
            industryExpertise,
            layout_no,
            layout_type:layout_type_map.MODERN,
            style:{
                sectionHeader:style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            }
        }),

        generateAchievement({
            achievements,
            divider,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p

            },
            shouldIncludeIcon:true
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
            layout_type: layout_type_map.SIMPLE
        }),
        generateLanguage({
            languages,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, color: style.headerTextColor
            }
        }),
        generateCertification({
            certificates,
            divider,
            layout_no,
            layout_type:layout_type_map.SIMPLE,
            style:{
                sectionHeader:style.sectionHeader,
                h2: style.h2, color: style.headerTextColor
            }

        }),
    ];

}
export default getModernLayout1OutputSectionData