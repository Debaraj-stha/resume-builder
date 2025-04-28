import { layout_type_map } from "../../../constant";
import { SectionContent } from "../../elements/resumeSectionWrapper";
import SkillCard from "../cards/ResumeSkillCard";
import generateTitle from "./titleGenerater";

const generateSkill = ({ skills, divider,
    style, layout_no,
    layout_type = layout_type_map.CLASSICAL,
    titleHeader = "skills",
    props = {}
}) => {
    return {
        key: "skills",
        id: "skills",
        content: () => (
            <>
                {

                    generateTitle({ title: titleHeader, style: { ...style?.sectionHeader } })
                }
                {
                    divider ? divider : null
                }

                <SectionContent>
                    <SkillCard skills={skills} layout_no={layout_no} layout_type={layout_type}
                        style={style}
                        {...props}

                    />
                </SectionContent>
            </>
        ),
    }
}

export default generateSkill