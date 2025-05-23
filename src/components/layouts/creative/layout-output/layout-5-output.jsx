import generateAchievement from "../../section-data/achievement_section_data";
import generateCertification from "../../section-data/certification_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";

import { layout_5_style as style } from "../layout-5/style";
const getCreativeLayout5OuctputSectionData = (data, divider) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        certificates=[],
        achievements=[],
        passions=[],
        skills=[]
    } = data;

  

    return [
        generateProfileDetails({
            personalDetails: personalDetails,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle,
                headerBg:style.headerBackground
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
                flexImage:true,
                rectangularImage:true,
                shouldIncludeImage:true
            }

        }),
        
        generateExperience({
            experiences,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            titleHeader:"experiences",
            props: {
                // applyFlex: true,
                includeDateAndAddress:true,
            

            }
        }),
        generateAchievement({
            achievements,
            divider,
            style: {
                sectionHeader: style.sectionHeader,

                h2: style.h2,
                p: style.p,
                iconColor: "orange"

            },
            titleHeader: "key achievement",
            props: {
               
               
                shouldIncludeIcon:true
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
            props: {
                borderBottom: true
            },
            titleHeader:"tech stacks"
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
            props: {
                shouldIncludeDate: true,
                applyFlex:true


            }

        }),
     
   
        generatePassionSectionData({
            passions:passions.slice(0,2),
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                sectionSubHeader:style.sectionSubHeader
            },
            divider,
            props:{
                shouldIncludeIcon:true
            }
        }),
        generateCertification({
            certificates,
            divider,
            style:{
                sectionHeader:style.sectionHeader,
                h2: style.h2,
                p:style.p,
                h3:style.h3
            }

        }),


        






    ]
}

export default getCreativeLayout5OuctputSectionData