import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import EducationCard from "../cards/ResumeEducationCard"
import generateTitle from "./titleGenerater"

const generateEducation = ({ educations, divider, style, layout_no, layout_type = layout_type_map.CLASSICAL, titleHeader = "education", props = {} }) => {

    return {
        key: "education",
        content: () => (
            <>
                {

                    generateTitle({
                        title: titleHeader,
                        style: {
                            ...style.sectionHeader,
                            ...(props.side === "right" && { color: "white" })
                        }
                    })

                }
                {
                    divider ? divider : null
                }
                <SectionContent paddingTop='5px'>
                    {
                        educations.map((education, index) => (
                            <EducationCard key={index} education={education} layout_no={layout_no}
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

export default generateEducation