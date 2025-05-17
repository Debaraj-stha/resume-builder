import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_5_style as style } from "../layout-5/style";
import generateStrength from "../../section-data/strength_section_data";
import generateIndustryExpertise from "../../section-data/industry_expertise_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import { layout_type_map } from "../../../../constant";
import { generateExperienceSections } from "../../helper";
const getModernLayout5OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        industryExpertise = [],
        strengths
    } = data;
    const divider = <LineDivider height="3px" backgroundColor="#999" />
    return [
        generateProfileDetails({
            personalDetails,
            style: {
                nameStyle: style.nameStyle,
                h2: style.h2,
                p: style.p,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                titleStyle: style?.titleStyle,
                headerBg: style?.headerBackground
            },
            props: {
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
                shouldIncludeImage: true,
                flexImage: true,
                rectangularImage: true
            }

        }),
      ...generateExperienceSections({
                 experiences, layout_no,
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
                     includeDateAndAddress: true
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

        }),
        generateSkill({
            skills,
            divider,
            style: {
                sectionHeader: style.sectionHeader,

                h1: style.h1,
                h2: style.h2,
                h3: style.h3,
                sectionSubHeader: style.sectionSubHeader
            },
            layout_no: layout_no,
            layout_type: layout_type_map.SIMPLE,
            titleHeader: "technical skills",
            props: {
                borderBox: true
            }

        }),

        generateStrength({
            strengths,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader

            }

        }),
        generateIndustryExpertise({
            industryExpertise,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                barStyle:style.barStyle
            },
            sectionHeader: "industry expertise"
        }),
    ]
}
export default getModernLayout5OutputSectionData