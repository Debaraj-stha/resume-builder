import { generateExperienceSections } from "../../helper";
import { layout_4_style as style } from "../layout-4/style"
import { LineDivider } from "../../../Divider/TransparentDividers";
import { layout_type_map } from "../../../../constant";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";
import generateStrength from "../../section-data/strength_section_data";
import generateCertification from "../../section-data/certification_section_data";

const getSimpleLayout4SectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        certificates = [],
        summary = "",
        strengths = []
    } = data;

    const divider = <LineDivider height="3px" />

    return [
        generateProfileDetails({
            personalDetails:  personalDetails , layout_no: layout_no, layout_type: layout_type_map.SIMPLE,
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
            divider: <LineDivider height="3px" />,
            layout_type: layout_type_map.SIMPLE,
            props: {
                applyFlex: false
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
            layout_type:layout_type_map.SIMPLE,
            style:{
                sectionHeader:style.sectionHeader,
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
            layout_type: layout_type_map.SIMPLE
        }),
        generateStrength({
            strengths,
            layout_no,
            layout_type: layout_type_map.SIMPLE,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                h2: style.h2,
                p: style.p
            }

        }),
    ];

}
export default getSimpleLayout4SectionData