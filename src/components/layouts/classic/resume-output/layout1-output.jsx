import { TransparentLine } from "../../../Divider/TransparentDividers";
import { layout_1_style as style } from "../layout-1/style";
import { generateAchievementsSections, generateExperienceSections, generateEducationSections } from "../../helper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
import generateSummary from "../../section-data/summary"
const getLayout1OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
    } = data;

    const divider = <TransparentLine />

    return [
        generateProfileDetails({
            personalDetails: {...personalDetails,urls:[
                personalDetails.urls[0]]}
            , layout_no: layout_no,
            shouldIncludeImage: false,
            style: {
                nameStyle: style.nameStyle, h2: style.h2, p: style.p,
                li_style: style.li_style,
                ul:style.ul
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
            experiences, layout_no,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                subSection: style.sectionSubHeader,
                sectionHeader: style.sectionHeader
            },
            props:{
                applyFlex:true,
                includeDateAndAddress:true
            }
        }),
        ...generateEducationSections({
            educations,
            layout_no,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader
            },
            props:{
                applyFlex:true
            }
        }),
        ...generateAchievementsSections({
            achievements, layout_no,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p

            },
            shouldPair:true,
            props:{
                shouldApplyGrid:false
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
            layout_no: layout_no,
            props:{
                shouldIncludeField:false
            }
        }),
    ];
};

export default getLayout1OutputSectionData;
