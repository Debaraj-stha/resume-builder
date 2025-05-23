import generateAchievement from "../../section-data/achievement_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateStrength from "../../section-data/strength_section_data";
import generateSummary from "../../section-data/summary";
import { layout_4_style as style } from "../layout-4/style";
const getCreativeLayout4OuctputSectionData = (data, divider) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],

        languages = [],
        summary="",
        strengths=[],
        achievements=[],
        passions=[]
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
                titleStyle: style?.titleStyle
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true
            }

        }),
        generateSummary({
            summary,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            }
        }),
        generateStrength({
            strengths,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader,
                iconColor:style.profile_li.iconColor
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
                p: { ...style.p },
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            titleHeader:"entrepreneurial experiences",
            props: {
                // applyFlex: true,
                includeDateAndAddress:true,
                applyFlex:true

            }
        }),
        generateAchievement({
            achievements,
            divider,
            style: {
                sectionHeader: style.sectionHeader,

                h2: style.h2,
                p: style.p,
                iconColor: style.profile_li.iconColor

            },
            titleHeader: "most proud of",
            props: {
               
               
                shouldIncludeIcon:true
            }
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
     
        generateLanguage({
            languages,
           divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                color: style.headerTextColor,
                sectionSubHeader: style.sectionSubHeader,
                progressBar:style.progressBar
            },
            props:{
              
            }
        }),
        generatePassionSectionData({
            passions,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                sectionSubHeader:style.sectionSubHeader
            },
            divider,
            props:{
                shouldIncludeIcon:true
            }
        })



    ]
}

export default getCreativeLayout4OuctputSectionData