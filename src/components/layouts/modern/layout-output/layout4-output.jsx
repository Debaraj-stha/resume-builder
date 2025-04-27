import { LineDivider } from "../../../Divider/TransparentDividers";
import { Layout_4_style as style } from "../layout-4/style";
import { layout_type_map } from "../../../../constant";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";

const divider = <LineDivider height="3px" backgroundColor="#ccc8c8" />

const getModernLayout4OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        industryExpertise = [],
        summary = "",
        passions
    } = data;
    const layout_type = layout_type_map.MODERN
    return [
        generateProfileDetails({
            personalDetails: { personalDetails }, layout_no: layout_no, layout_type: layout_type,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

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
            layout_no,
            layout_type: layout_type,
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
            titleHeader: "skills"

        }),
        generateIndustryExpertise({
            industryExpertise,
            layout_no,
            layout_type:layout_type,
            style:{
                sectionHeader:style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            sectionHeader:"industry expertise"
            
        }),
     
        generatePassionSectionData({
            passions,
            layout_no,
            layout_type:layout_type,
            style:{
                sectionHeader:style.sectionHeader,
                h2:style.h2
            },
            divider
        })

    ]



}
export default getModernLayout4OutputSectionData