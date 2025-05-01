import { generateExperienceSections } from "../../helper";
import { layout_1_style as style } from "../layout-1/style"
import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateSkill from "../../section-data/skill_section_data";
import generateOpenSourceWork from "../../section-data/open_source_work_section_data";

const getSimpleLayout1SectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],

        openSourceWork = [],
        summary = ""
    } = data;

    const divider = <LineDivider height="2px" backgroundColor="#b0a9a9" />

    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[0]] },
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
                shouldIncludeImage: true
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

        ...generateExperienceSections({
            experiences:experiences.slice(0,2),
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            layout_no: layout_no,
            divider: divider,
            layout_type: layout_type_map.SIMPLE
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
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },

        }),
        generateSkill({
            skills:skills.slice(0,2),
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
        generateOpenSourceWork({
            openSourceWork:openSourceWork.slice(0,1),
            divider,
           
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                h3: style.h3
            }
        })


    ];

}
export default getSimpleLayout1SectionData