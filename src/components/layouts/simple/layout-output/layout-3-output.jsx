import { generateExperienceSections } from "../../helper";
import { layout_3_style as style } from "../layout-3/style"
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";


const getSimpleLayout3SectionData = (data, divider)=>{
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
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[0]] },
            shouldIncludeImage: true,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle,
                iconColor:style.profile_li.iconColor
            },
            props:{
                shouldIncludeIcon:true
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
                    sectionSubHeader:style.sectionSubHeader,
                    h2: style.h2,
                    h3: style.h3,
    
                    p: style.p,
                    sectionHeader: style.sectionHeader,
                },

            divider: divider,
           
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
                sectionSubHeader:style.sectionSubHeader
            },
            props:{
                shouldIncludeIcon:true
            }

        }),
        generateSkill({
            skills,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
             
               
                sectionSubHeader:style.sectionSubHeader
            },
            props:{
                borderBottom:true
            }
            
        }),
        generateStrength({
            strengths,
            
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader:style.sectionSubHeader,
                p: style.p
            }

        }),
       
    ];

}
export default getSimpleLayout3SectionData