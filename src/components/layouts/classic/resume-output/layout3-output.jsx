
import { generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_3_style as style } from "../layout-3/style"
import generateSkill from "../../section-data/skill_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
const getLayout3OutputSection = (data, divider)=>{
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        skills = [],
    } = data;
    return [
        generateProfileDetails({
            personalDetails,
            shouldIncludeImage: true,
            style: {  nameStyle: style.nameStyle,
                            titleStyle: style.titleStyle,
                            profile_ul: style.profile_ul,
                            profile_li: style.profile_li,
                            p:style.p },
            props:{
                applyFlex: true,
                includeDateAndAddress: true
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
            experiences,  style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props:{
                applyFlex:true,
                includeDate:true,
                swapPosition:true,
            }
        }),
        ...generateEducationSections({
            educations,  style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            props:{
                swapPosition:true,
                applyFlex:true
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
     
            props:{
                shouldIncludeField:true
            }
        }),

    ]



}
export default getLayout3OutputSection