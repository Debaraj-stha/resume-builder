import { TransparentLine } from "../../../Divider/TransparentDividers";
import { layout_1_style as style } from "../layout-1/style";
import { generateAchievementsSections, generateExperienceSections, generateEducationSections } from "../../helper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
import generateSummary from "../../section-data/summary"
const getLayout1OutputSectionData = (data, divider)=>{
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
    } = data;



    return [
        generateProfileDetails({
            personalDetails
            , 
            shouldIncludeImage: false,
            style: {
                nameStyle: style.nameStyle,
                titleStyle: style.titleStyle,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                p:style.p
            },
            props: {
                shouldIncludeImage: false,
                shouldIncludeIcon: false,
                applyFlex: true,
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
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props: {
                applyFlex: true,
                includeDateAndAddress: true
            }
        }),
        ...generateEducationSections({
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
            props: {
                applyFlex: true
            }
        }),
        ...generateAchievementsSections({
            achievements,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p,
                tagStyle:style.tagStyle

            },
            shouldPair: true,
            props: {
                shouldApplyGrid: true
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
            props: {
                shouldIncludeField: false
            }
        }),
    ];
};

export default getLayout1OutputSectionData;
