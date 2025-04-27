import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import SkillCard from "../../cards/ResumeSkillCard"
import ResumeHeader from "../../cards/ResumeHeader";
import { layout_2_style as style } from "../layout-2/style"
import { generateEducationSections, generateExperienceSections } from "../../helper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
import generateSkill from "../../section-data/skill_section_data";

const getLayout2OutputSectionData = (data, layout_no) => {
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        skills = [],
    } = data;
    const divider = <TransparentLine />

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
            divider: divider
        }),
        ...generateExperienceSections({experiences, layout_no}),
        ...generateEducationSections({educations, layout_no}),
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
            layout_no: layout_no
        }),

    ]
}
export default getLayout2OutputSectionData;