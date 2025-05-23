import { layout_2_style as style } from "../layout-2/style"
import generateStrength from "../../section-data/strength_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateExperience from "../../section-data/experience_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";

const getSimpleLayout2SectionData = (data, divider)=>{
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        languages = [],
        summary = "",
        strengths = []
    } = data;




    return [
        generateProfileDetails({
            personalDetails: {
                ...personalDetails, urls: [personalDetails.urls[0]]
            },
            
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
                shouldIncludeIcon: true
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
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            props:{
                shouldIncludeIcon:true
            }


        }),
        generateExperience({
            experiences,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                header: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
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
                h3: style.h3,
                sectionSubHeader: style.sectionSubHeader
            },
            props: {
                borderBottom: true
            }

        }),
        generateStrength({
            strengths,
            
            divider,
            style: {
                sectionHeader: style.sectionHeader,

                p: style.p,
                sectionSubHeader: style.sectionSubHeader
            }

        }),
        generateLanguage({
            languages,
            
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                progressBar: style.progressBar
            }
        }),
    ];

}
export default getSimpleLayout2SectionData