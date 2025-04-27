
import { generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_3_style as style } from "../layout-3/style"

import { TransparentLine } from "../../../Divider/TransparentDividers";

import generateSkill from "../../section-data/skill_section_data";
import generateProfileDetails from "../../section-data/profile_details";
import generateSummary from "../../section-data/summary";
const getLayout3OutputSection = (data,layout_no) => {

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
export default getLayout3OutputSection