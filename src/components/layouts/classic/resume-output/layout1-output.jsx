import { TransparentLine } from "../../../Divider/TransparentDividers";
import { P, SectionContent } from "../../../elements/resumeSectionWrapper";
import { Title } from "../../../Title";
import {
    ResumeHeader,
    SkillCard,
} from "../../cards";
import style from "../style/layout1_style.json";
import { generateAchievementsSections, generateExperienceSections, generateEducationSections } from "./helper";
const getLayout1OutputSectionData = (data) => {
    const {
        personalDetails = {},
        summary = "",
        experiences = [],
        educations = [],
        achievements = [],
        skills = [],
    } = data;
    return [
        {
            key: "personalDetails",
            content: () => <ResumeHeader personalDetails={personalDetails} layout_no={1} />,
        },
        {
            key: "summary",
            content: () => (
                <>
                    <Title title="Summary" className={style.Title.className} fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} />
                    <TransparentLine />
                    <SectionContent>
                        <P>{summary}</P>
                    </SectionContent>
                </>
            ),
        },
        ...generateExperienceSections(experiences, 1, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        ...generateEducationSections(educations, 1, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),
        ...generateAchievementsSections(achievements, 1, {
            className: style.Title.className,
            fontSize: style.Title.fontSize,
            fontWeight: style.Title.fontWeight
        }),

        {
            key: "skills",
            id: "skills",
            content: () => (
                <>
                    <Title title="Skills" className={style.Title.className} fontSize={style.Title.fontSize} fontWeight={style.Title.fontWeight} />
                    <TransparentLine />
                    <SectionContent>
                        <SkillCard skills={skills} layout_no={1} />
                    </SectionContent>
                </>
            ),
        },
    ];
};

export default getLayout1OutputSectionData;
