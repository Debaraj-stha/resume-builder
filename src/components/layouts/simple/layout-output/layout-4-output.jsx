import { generateExperienceSections } from "../../helper";
import { layout_4_style as style } from "../layout-4/style"
import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateCertification from "../../section-data/certification_section_data";
import generateEducation from "../../section-data/education_secion_data";

const getSimpleLayout4SectionData = (data,divider)=>{
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        certificates = [],
        summary = "",
        strengths = []
    } = data;


    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[0]] },
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_li: style.profile_li,
                profile_ul: style.profile_ul,
                titleStyle: style.titleStyle,
                iconColor: style.profile_li.iconColor
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
        generateSummary({
            summary,
            titleHeader: "Profile",
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            divider: divider
        }),


        ...generateExperienceSections({
            experiences,
            style: {

                sectionHeader: style.sectionHeader,
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,

                sectionSubHeader: style.sectionSubHeader

            },

            divider,

            props: {
                applyFlex: false
            },
            title: "professional experiences"
        }),
        generateEducation({
            educations,

            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                sectionSubHeader:style.sectionSubHeader,
                p: style.p,
                sectionHeader: style.sectionHeader
            },
            props:{
                shouldIncludeIcon:true
            }

        }),
        generateCertification({
            certificates,
            divider,

            style: {
                sectionHeader: style.sectionHeader,
                h3: style.h3,
                p: style.p,
                sectionSubHeader:style.sectionSubHeader
            },
            props:{
                grid:true//show two items per row
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
            titleHeader: "technical skills",
            props:{
                borderBottom:true
            }

        }),

    ];

}
export default getSimpleLayout4SectionData