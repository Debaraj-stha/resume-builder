import { generateExperienceSections } from "../../helper";
import { layout_5_style as style } from "../layout-5/style"
import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateCertification from "../../section-data/certification_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateAchievement from "../../section-data/achievement_section_data";
import generateLanguage from "../../section-data/language_section_data";

const getSimpleLayout5SectionData = (data,divider)=>{
        const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        languages = [],
        summary = "",
    } = data;



    return [
        generateProfileDetails({
            personalDetails: personalDetails,
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_li: style.profile_li,
                profile_ul: style.profile_ul,
                titleStyle: style.titleStyle,
                iconColor: style.profile_li.iconColor
            },

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
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                h3: style.h3,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader

            },

            divider: divider,

            props: {
                applyFlex: true,
                includeDateAndAddress: true,
                applyVerticalDivider: true

            },
        }),
        generateAchievement({
            achievements,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.profile_li.iconColor,
                h2: style.h2,
                p: style.p,
                sectionSubHeader:style.sectionSubHeader,
            },
            titleHeader: "key accomplishment",
            props:{
                shouldApplyGrid:true,
                shouldIncludeIcon:true,
            }
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
                applyVerticalDivider:true,
            }


        }),

        generateSkill({
            skills,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            titleHeader: "technical skills",
            props:{
                borderBottom:true
            }

        }),
        generateLanguage({
            languages,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                progressBar: style.progressBar
            },
            props:{
                grid:true,
                shouldIncludeProficiency:true
            }
        }),
    ];

}
export default getSimpleLayout5SectionData