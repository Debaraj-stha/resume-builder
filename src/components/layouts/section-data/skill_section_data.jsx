import { layout_type_map } from "../../../constant";
import { SectionContent } from "../../elements/resumeSectionWrapper";
import SkillCard from "../cards/ResumeSkillCard";
import generateTitle from "./titleGenerater";

const generateSkill = ({ skills, divider,
    style,
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
                    <SkillCard skills={skills} 
                        style={style}
                        {...props}

                    />
                </SectionContent>
            </>
        ),
    }
}

export default generateSkill