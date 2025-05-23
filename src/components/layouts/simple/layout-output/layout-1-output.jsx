import { generateExperienceSections } from "../../helper";
import { layout_1_style as style } from "../layout-1/style"
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateSkill from "../../section-data/skill_section_data";
import generateOpenSourceWork from "../../section-data/open_source_work_section_data";

const getSimpleLayout1SectionData = (data,divider)=>{
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],

        openSourceWork = [],
        summary = ""
    } = data;



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
            experiences,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            divider
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
                h3: style.h3
            },
        }),
        generateOpenSourceWork({
            openSourceWork,
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