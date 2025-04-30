import { layout_type_map } from "../../../../constant";
import { ScallopUpDivider } from "../../../Divider/ScallopDiviider";
import { StarAtCenter } from "../../../Divider/StarAtCenter"
import { DividerWithStarBorder, LineWithDots, TransparentLine, TransparentLineWithAngleAtCenter, TransparentLineWithBox, TransparentLineWithSeperatorAtEnd, ZigzagDivider } from "../../../Divider/TransparentDividers";
import ResumeHeader from "../../cards/ResumeHeader";
import generateAchievement from "../../section-data/achievement_section_data";
import generateAwardsSectionData from "../../section-data/awards_section_data";
import generateCertification from "../../section-data/certification_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateLanguage from "../../section-data/language_section_data";
import generateMyTimeSection from "../../section-data/my_time_section_data";
import generatePassionSectionData from "../../section-data/passion_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateSummary from "../../section-data/summary";
import generateTrainingsectionData from "../../section-data/trainings_section_data";
import { layout_5_style as style } from "../layout-5/style";
const getCreativeLayout5OuctputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        certificates=[],
        achievements=[],
        passions=[],
        skills=[]
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
            titleHeader:"experiences",
            props: {
                // applyFlex: true,
                includeDateAndAddress:true,
            

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
            layout_no: layout_no,
            layout_type: layout_type,
            props: {
                borderBottom: true
            },
            titleHeader:"tech stacks"
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
     
   
        generatePassionSectionData({
            passions:passions.slice(0,2),
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
        }),
        generateCertification({
            certificates,
            divider,
            layout_no,
            layout_type:layout_type_map.SIMPLE,
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