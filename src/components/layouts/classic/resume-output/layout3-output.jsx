import { ResumeHeader, SkillCard } from "../../cards";
import { generateEducationSections, generateExperienceSections } from "./helper";
import style from "../style/layout3_style.json"
import { Title } from "../../../Title";
import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
const getLayout3OutputSection = (data) => {
    console.log("called layout 3")
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        skills = [],
    } = data;

    return [
        {
            key: "personalDetails",
            content: () => {

                return (

                    <ResumeHeader personalDetails={personalDetails} layout_no={3} />
                )
            }
        },
        {
            key: "summary",
            content: () => {
                return (
                    <>
                        <Title fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className}
                            title="Summary" />
                        <TransparentLine />
                        <SectionContent>
                            <P>{summary}</P>
                        </SectionContent>
                    </>
                )
            }

        },
        ...generateExperienceSections(experiences, 3, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        ...generateEducationSections(educations, 3, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        {
            key: "skills",
            content: () => (
                <>
                    <Title title="Skills" fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} className={style.Title.className}
                    />
                    <TransparentLine />
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={3} />
                    </SectionContent>
                </>
            )
        }

    ]



}
export default getLayout3OutputSection