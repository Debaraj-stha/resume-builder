import { layout_type_map } from "../../../../constant";
import { TransparentLine } from "../../../Divider/TransparentDividers";

import generateAchievement from "../../section-data/achievement_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateStrength from "../../section-data/strength_section_data";
import generateSummary from "../../section-data/summary";
import { layout_4_style as style } from "../layout-4/style";
const getCreativeLayout4OuctputSectionData = (data, layout_no) => {
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
    const divider = <TransparentLine />

    const layout_type = layout_type_map.CREATIVE
  

    return [
        generateProfileDetails({
            personalDetails: personalDetails,
            layout_no: layout_no,
            layout_type: layout_type,
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
            strengths: strengths.slice(0, 2),
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader,
                iconColor:style.profile_li.iconColor
            },
            props:{
                side:"right",
                shouldIncludeIcon:true
            }

        }),
        generateExperience({
            experiences: experiences.slice(0, 2),
            layout_no,
            layout_type: layout_type_map.SIMPLE,
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
            layout_no,
            layout_type: layout_type,
            style: {
                sectionHeader: style.sectionHeader,

                h2: style.h2,
                p: style.p,
                iconColor: style.profile_li.iconColor

            },
            titleHeader: "most proud of",
            props: {
               
                side:"right",
                shouldIncludeIcon:true
            }
        }),


        generateEducation({
            educations,
            layout_no: layout_no,
            layout_type: layout_type,
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
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                color: style.headerTextColor,
                sectionSubHeader: style.sectionSubHeader,
                barColor: style.profile_li.iconColor
            },
            props:{
                side:"right"
            }
        }),
        generatePassionSectionData({
            passions:passions.slice(0,4),
            layout_no,
            layout_type: layout_type,
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