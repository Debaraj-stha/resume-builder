import { TransparentLine } from "../../../Divider/TransparentDividers";
import { layout_2_style as style } from "../layout-2/style"
import { generateEducationSections, generateExperienceSections } from "../../helper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";

const getLayout2OutputSectionData = (data, divider) => {
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        skills = [],
        strengths=[]
    } = data;


    return [
        generateProfileDetails({
            personalDetails,
            shouldIncludeImage: true,
            style: {
                 nameStyle: style.nameStyle, 
                 titleStyle:style.titleStyle,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                p:style.p
             },
            props:{
                shouldIncludeIcon:true,
                shouldIncludeAddress:false
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
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props:{
                applyFlex:false
            }
        }),
        ...generateEducationSections({
            educations,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader:style.sectionSubHeader
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
            props:{
            borderBox:true
            }
        }),
        generateStrength({
            strengths,
            divider,
            style:style,
            props:{
                grid:true,
              
            }
        })

    ]
}
export default getLayout2OutputSectionData;