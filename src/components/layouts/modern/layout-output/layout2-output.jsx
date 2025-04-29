import { layout_2_style as style } from "../layout-2/style"
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateExperience from "../../section-data/experience_section_data";
import generateEducation from "../../section-data/education_secion_data";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import { LineDivider } from "../../../Divider/TransparentDividers";
import generateOpenSourceWork from "../../section-data/open_source_work_section_data";
const getModernLayout2OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        industryExpertise = [],
        summary = "",
        openSourceWork
    } = data;
    const divider = <LineDivider />
    const layout_type = layout_type_map.MODERN
    return [

        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[0]] }, layout_no: layout_no, layout_type: layout_type,
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
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
                shouldIncludeImage:true,
                flexImage:true
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
                h3: style.h3,
                sectionSubHeader:style.sectionSubHeader
            },
            layout_no: layout_no,
            layout_type: layout_type,
            props:{
                shouldIncludeField:true
            }
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
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            sectionHeader: "expertise"
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