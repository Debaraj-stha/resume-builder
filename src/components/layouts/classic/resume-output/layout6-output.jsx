import { ResumeHeader, SkillCard } from "../../cards";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections, IncludeSeparator } from "./helper";
import style from "../style/layout3_style.json"
import { Title } from "../../../Title";
import { DoubleLineDivider, TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
const getlayout6OutputSection = (data) => {

    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates = [],
        summary = ""
    } = data;
    const textStyle = {
        className: style.Title.className,
        fontSize: "20px",
        fontFamily: "Lato",
        textAlign: "left",
        fontWeight:"bold"
        
    }
    return [
        {
            key: "personalDetails",
            content: () => {

                return (

                    <ResumeHeader personalDetails={personalDetails} layout_no={6} />
                )
            }
        },
        {
            key: "summary",
            content: () => {
                return (
                    <>
                        <Title fontFamily={"Lato"} {...textStyle}
                            title="SUMMARY OF QUALIFICATION" />
                        <DoubleLineDivider />
                        <SectionContent>
                            <P>{summary}</P>
                        </SectionContent>
                    </>
                )
            },
        },
        ...generateExperienceSections(experiences, 6, textStyle),
        ...generateEducationSections(educations, 6, textStyle),
  ...generateCertipicates(certificates,6,textStyle),
        {
            key: "skills",
            content: () => (
                <>
                    <Title title="TECHNICAL SKILLS"  {...textStyle} />
                    <IncludeSeparator layout_no={6} />
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={6} />
                    </SectionContent>
                </>
            )
        },
      


    ]



}
export default getlayout6OutputSection