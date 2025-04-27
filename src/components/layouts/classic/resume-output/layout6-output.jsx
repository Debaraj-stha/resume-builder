
import ResumeHeader from "../../cards/ResumeHeader";
import SkillCard from "../../cards/ResumeSkillCard"
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections, IncludeSeparator } from "../../helper";
import {layout_6_style as style} from "../layout-6/style"

import { DoubleLineDivider, TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import generateSkill from "../../section-data/skill_section_data";
import generateSummary from "../../section-data/summary";
import generateProfileDetails from "../../section-data/profile_details";
const getlayout6OutputSection = (data, layout_no) => {

    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates = [],
        summary = ""
    } = data;
 
    return [
        generateProfileDetails({
            personalDetails: personalDetails , layout_no: layout_no,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

        }),
        generateSummary({
            summary,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            divider: <IncludeSeparator layout_no={layout_no} />,
        }),
        ...generateExperienceSections({experiences, layout_no}),
        ...generateEducationSections({educations, layout_no}),
        ...generateCertipicates({certificates, layout_no}),
        generateSkill({
            skills,
            divider: <IncludeSeparator layout_no={layout_no} />,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },
            layout_no: layout_no,
            titleHeader: "technical skills"
        }),



    ]



}
export default getlayout6OutputSection