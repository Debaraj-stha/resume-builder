import { layout_2_style as style } from "../layout-2/style"
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateExperience from "../../section-data/experience_section_data";
import generateEducation from "../../section-data/education_secion_data";
const getModernLayout2OutputSectionData = (data, layout_id) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        industryExpertise = [],
        summary = "",
        openSourceWork
    } = data;

    const layout_type = ayout_type_map.MODERN
    return [

        generateProfileDetails({
            personalDetails: { personalDetails }, layout_no: layout_no, layout_type: layout_type,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

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
            layout_type: layout_type
        }),
        generateSummary({
            summary,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            divider: divider,
        }),
        generateIndustryExpertise({
            industryExpertise,
            layout_no,
            layout_type:layout_type,
            style:{
                sectionHeader:style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            sectionHeader:"expertise"
        }),
        generateExperience({
            experiences,
            layout_no,
            layout_type: layout_type,
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
            layout_type: layout_type,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader
            }

        }),

        generateOpenSourceWork({
            openSourceWork,
            divider,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                h3: style.h3
            }
        })
    ]



}
export default getModernLayout2OutputSectionData