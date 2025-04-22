import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import { ResumeHeader, SkillCard } from "../../cards";
import style from "../style/layout2_style.json"
import { generateEducationSections, generateExperienceSections } from "./helper";

const getLayout2OutputSectionData = (data) => {
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

                    <ResumeHeader personalDetails={personalDetails} layout_no={2} />
                )
            }
        },
        {
            key: "summary",
            content: () => {
                return (
                    <>
                        <Title className={style.Title.className} fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight}
                            title="Summary" />
                        <TransparentLine />
                        <SectionContent>
                            <P>{summary}</P>
                        </SectionContent>
                    </>
                )
            }

        },
        ...generateExperienceSections(experiences, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        ...generateEducationSections(educations, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        {
            key: "skills",
            content: () => (
                <>
                    <Title title="Skills" className={style.Title.className} fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight}
                    />
                    <TransparentLine />
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={2} />
                    </SectionContent>
                </>
            )
        }

    ]
}
export default getLayout2OutputSectionData;