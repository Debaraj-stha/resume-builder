
import { generateCertipicates, generateEducationSections, generateExperienceSections } from "../../helper";
import { layout_6_style as style } from "../layout-6/style"
import generateSkill from "../../section-data/skill_section_data";
import generateSummary from "../../section-data/summary";
import generateProfileDetails from "../../section-data/profile_details";
const getlayout6OutputSection = (data, divider) => {

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
            personalDetails: { ...personalDetails, urls: [personalDetails?.urls?.[0]] },
            style: {
                nameStyle: style.nameStyle,
                titleStyle: style.titleStyle,
                profile_ul: style.profile_ul,
                profile_li: style.profile_li,
                p: style.p
            },
            props: {
                shouldIncludeIcon: true,
                applyFlex: true,
                shouldIncludeAddress: true,
                shouldIncludeProfession: false
            }

        }),
        generateSummary({
            summary,
            style: {
                sectionHeader: style.sectionHeader,
                p: style.p
            },
            titleHeader: "summary of qualification",
            divider: divider
        }),
        ...generateExperienceSections({
            experiences,
            style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionSubHeader: style.sectionSubHeader,
                sectionHeader: style.sectionHeader,
            },
            divider
        }),
        ...generateEducationSections({
            educations, style: {
                h2: style.h2,
                h3: style.h3,
                primaryColor: style.primaryColor,
                p: style.p,
                sectionHeader: style.sectionHeader,
                sectionSubHeader: style.sectionSubHeader
            },
            divider
        }),
        ...generateCertipicates({
            certificates, style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h3: style.h3,
                p: style.p
            },
            divider,
            shouldPair: true
        }),
        generateSkill({
            skills,
            style: {
                sectionHeader: style.sectionHeader,
                header: style.sectionHeader,
                h1: style.h1,
                h2: style.h2,
                h3: style.h3
            },

            titleHeader: "technical skills"
        }),



    ]



}
export default getlayout6OutputSection