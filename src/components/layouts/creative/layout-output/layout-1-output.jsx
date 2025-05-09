import { layout_type_map } from "../../../../constant";
import { TransparentLineWithAngleAtCenter } from "../../../Divider/TransparentDividers";
import generateAchievement from "../../section-data/achievement_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";
import generateMyTimeSection from "../../section-data/my_time_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateSummary from "../../section-data/summary";
import { layout_1_style as style } from "../layout-1/style";
const getCreativeLayout1OuctputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        strengths = [],
        summary = ""
    } = data;
    const divider = <TransparentLineWithAngleAtCenter />
    const layout_type = layout_type_map.CREATIVE
    const items = [
        { label: 'A', value: 1, activity: 'Learning new things' },
        { label: 'B', value: 1, activity: 'Working with my team' },
        { label: 'C', value: 1, activity: 'Hiring' },
        { label: 'D', value: 1, activity: 'Meeting customers' },
        { label: 'E', value: 1, activity: 'Time in nature' },
        { label: 'F', value: 1, activity: 'Volunteering' },
    ];

    return [
        generateProfileDetails({
            personalDetails: { ...personalDetails, urls: [personalDetails.urls[1]] },
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
                shouldIncludeIcon: true,
                shouldIncludeAddress: true,
                sshouldIncludeDate: true

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
            props: {
                shouldIncludeIcon: true,


            }
        }),
        generateExperience({
            experiences: experiences.slice(0, 1),
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
            props: {
                applyFlex: true,
                includeDateAndAddress: true,

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
            layout_type: layout_type,
            props: {
                borderBottom: true
            }
        }),
        generateStrength({
            strengths: strengths.slice(0, 4),
            layout_no,
            layout_type: layout_type,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p,
                sectionSubHeader: style.sectionHeader
            }

        }),
        generateMyTimeSection({
            items,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                p: style.p
            }
        })

    ]
}

export default getCreativeLayout1OuctputSectionData