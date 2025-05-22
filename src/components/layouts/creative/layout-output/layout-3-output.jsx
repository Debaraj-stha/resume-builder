import { layout_type_map } from "../../../../constant";
import {  TransparentLine } from "../../../Divider/TransparentDividers";

import generateAwardsSectionData from "../../section-data/awards_section_data";
import generateEducation from "../../section-data/education_secion_data";
import generateExperience from "../../section-data/experience_section_data";

import generateLanguage from "../../section-data/language_section_data";
import generateMyTimeSection from "../../section-data/my_time_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";

import generateTrainingsectionData from "../../section-data/trainings_section_data";
import { layout_3_style as style } from "../layout-3/style";
const getCreativeLayout3OuctputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        trainings = [],
        awards = [],
        languages = [],
        my_time = [],
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
                // applyFlex: true,
                includeDateAndAddress: true,
                shouldIincludeIcon: true

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
                shouldIncludeDate: true,


            }

        }),
        generateAwardsSectionData({
            style: {

                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                p: style.p
            },
            divider,
            awards

        }),
        generateTrainingsectionData({
            style: {

                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                p: style.p
            },
            divider,
            trainings
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
                barColor: style.profile_li.iconColor,
                progressBar:style.progressBar,
            }
        }),
        generateMyTimeSection({
            items:my_time,
            divider,
            style: {
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader,
                p: style.p
            }
        })






    ]
}

export default getCreativeLayout3OuctputSectionData