import SkillCard from "../../cards/ResumeSkillCard"
import ResumeHeader from "../../cards/ResumeHeader";
import { generateAchievementsSections, generateCertipicates, generateEducationSections, generateExperienceSections, IncludeSeparator } from "./helper";
import style from "../style/layout3_style.json"
import { Title } from "../../../Title";
import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
const getlayout5OutputSection = (data) => {
   
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
        fontFamily: "Suranna",
        textAlign: "left",
        fontWeight:"600"
    }
    return [
        {
            key: "personalDetails",
            content: () => {

                return (

                    <ResumeHeader personalDetails={personalDetails} layout_no={5} />
                )
            }
        },
        ...generateAchievementsSections(achievements, 5,textStyle),
        ...generateEducationSections(educations, 5,textStyle),
        ...generateExperienceSections(experiences, 5, textStyle),

        {
            key: "skills",
            content: () => (
                <>
                    <Title title="TECH STACK"  {...textStyle}              />
                   <IncludeSeparator layout_no={5}/>
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={5} />
                    </SectionContent>
                </>
            )
        },
        ...generateCertipicates(certificates,5,textStyle)
      

    ]



}
export default getlayout5OutputSection