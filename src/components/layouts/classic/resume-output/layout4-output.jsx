import { ResumeHeader, SkillCard } from "../../cards";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections, IncludeSeparator } from "./helper";
import style from "../style/layout3_style.json"
import { Title } from "../../../Title";
import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
const getLayout4OutputSection = (data) => {
    console.log("called layout 4",data)
    const {
        personalDetails = {},
        experiences = [],
        educations = [],
        skills = [],
        achievements = [],
        certificates=[]
    } = data;
    const textStyle = {
        className: style.Title.className,
        fontSize: style.Title.fontSize,
        fontWeight: "700",
        fontFamily: "Lato, sans-serif",
        textAlign: "left"
    }
    return [
        {
            key: "personalDetails",
            content: () => {

                return (

                    <ResumeHeader personalDetails={personalDetails} layout_no={4} />
                )
            }
        },
        ...generateAchievementsSections(achievements, 4,textStyle),
        ...generateEducationSections(educations, 4,textStyle),
        ...generateExperienceSections(experiences, 4, textStyle),

        {
            key: "skills",
            content: () => (
                <>
                    <Title title="TECHNICAL SKILLS"  {...textStyle}              />
                   <IncludeSeparator layout_no={4}/>
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={4} />
                    </SectionContent>
                </>
            )
        },
        ...generateCertipicates(certificates,4,textStyle)
      

    ]



}
export default getLayout4OutputSection