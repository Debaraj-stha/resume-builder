
import { layout_3_style as style } from "../layout-3/style";
import { LineDivider } from "../../../Divider/TransparentDividers";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateStrength from "../../section-data/strength_section_data";
import { layout_type_map } from "../../../../constant";
const getModernLayout3OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],

        languages = [],

        summary = "",

        strengths
    } = data;

    const divider = <LineDivider height="3px" />
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
            props:{
                shouldIncludeIcon:true,
                shouldIncludeAddress:true,
                flexIcons:true
            }

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
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
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
            layout_type: layout_type
        }),

        generateLanguage({
            languages,
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, color: style.headerTextColor,
                sectionSubHeader:style.sectionSubHeader,
                progressBar:style.progressBar
            }
        }),
        generateStrength({
            strengths:strengths.slice(0,4),
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader:style.sectionHeader
            }

        }),


    ]



}
export default getModernLayout3OutputSectionData