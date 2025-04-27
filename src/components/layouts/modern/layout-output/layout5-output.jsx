import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_5_style as style } from "../layout-5/style";

import generateStrength from "../../section-data/strength_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateProfileDetails from "../../section-data/profile_details";

const getModernLayout5OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        industryExpertise = [],
        strengths
    } = data;


    const divider = <LineDivider height="3px" backgroundColor="#999" />
    const layout_type = layout_type_map.MODERN
    return [
        generateProfileDetails({
            personalDetails: { personalDetails }, layout_no: layout_no, layout_type: layout_type,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

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
            layout_type: layout_type_map.SIMPLE,
            titleHeader: "technical experiences"

        }),
        generateIndustryExpertise({
            industryExpertise,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            sectionHeader: "expertise"
        }),
        generateStrength({
            strengths,
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p
            }

        }),
    ]
}
export default getModernLayout5OutputSectionData