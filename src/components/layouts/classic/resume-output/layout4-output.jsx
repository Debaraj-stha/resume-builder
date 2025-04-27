import SkillCard from "../../cards/ResumeSkillCard"
import ResumeHeader from "../../cards/ResumeHeader";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections, IncludeSeparator } from "../../helper";
import {layout_4_style as style} from "../layout-4/style"
import { Title } from "../../../Title";
import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import generateProfileDetails from "../../section-data/profile_details";
import generateSkill from "../../section-data/skill_section_data";
const getLayout4OutputSection = (data,layout_no) => {

    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates = []
    } = data;

    return [
        generateProfileDetails({
            personalDetails:  personalDetails , layout_no: layout_no,
            shouldIncludeImage: true,
            style: { nameStyle: style.nameStyle, h2: style.h2, p: style.p }

        }),
        ...generateAchievementsSections({achievements, layout_no}),
        ...generateEducationSections({educations, layout_no}),
        ...generateExperienceSections({experiences, layout_no}),

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
            layout_no: layout_no
        }),
        ...generateCertipicates({certificates, layout_no})


    ]



}
export default getLayout4OutputSection