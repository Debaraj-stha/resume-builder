import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import ExperienceCard from "../cards/ResumeExperienceCard"
import generateTitle from "./titleGenerater"

const generateExperience = ({ 
    experiences,
     style, 
    divider, 
    layout_no, 
    layout_type = layout_type_map.CLASSICAL, 
    titleHeader = "experience",
    props={}
 }) => {
    return {
        key: "experience",
        content: () => (
            <>
                {

                    generateTitle({ title: titleHeader, style: { ...style.sectionHeader } })
                }
                {
                    divider ? divider : null
                }
                <SectionContent>
                    {
                        experiences.map((experience, index) => (
                            <ExperienceCard key={index} experience={experience} layout_no={layout_no}

                                style={style}
                                layout_type={layout_type}
                                {...props}
                                />
                        ))
                    }
                </SectionContent>
            </>
        )
    }


}

export default generateExperience