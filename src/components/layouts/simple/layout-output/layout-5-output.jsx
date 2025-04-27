import {generateExperienceSections } from "../../helper";
import { layout_5_style as style } from "../layout-5/style"
import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateEducation from "../../section-data/education_secion_data";
import generateCertification from "../../section-data/certification_section_data";
import generateSkill from "../../section-data/skill_section_data";
import generateAchievement from "../../section-data/achievement_section_data";

const getSimpleLayout5SectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
        certificates = [],
        summary = "",
    } = data;
    const divider = <LineDivider height="3px" />


    return [
        generateProfileDetails({
            personalDetails: { personalDetails }, layout_no: layout_no, layout_type: layout_type_map.SIMPLE,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

        }),
        generateSummary({
            summary,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            divider: divider
        }),
        generateAchievement({
            achievements,
            divider,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            style: {
                sectionHeader: style.sectionHeader,
                iconColor: style.primaryColor,
                h2: style.h2,
                p: style.p

            },
            shouldIncludeIcon:true
        }),
        ...generateExperienceSections({
            experiences,
            style: {
                title: {
                    ...style.sectionHeader
                },
                experienceCard: {
                    h2: style.h2,
                    h3: style.h3,
                    primaryColor: style.primaryColor,
                    p: style.p,
                    header: style.sectionHeader,
                    subSection: style.sectionSubHeader
                }
            },
            layout_no: layout_no,
            divider: divider,
            layout_type: layout_type_map.SIMPLE,
            props: {
                applyFlex: true,
                includeDateAndAddress: true
            },
            title: "professional experiences"
        }),
        generateEducation({
            educations,
            layout_no: layout_no,
            layout_type: layout_type_map.SIMPLE,
            divider,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader
            }

        }),
        generateCertification({
            certificates,
            divider,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2, color: style.headerTextColor
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
            layout_type: layout_type_map.SIMPLE,
            titleHeader: "technical skills"

        })
    ];

}
export default getSimpleLayout5SectionData