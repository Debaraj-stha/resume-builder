import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import EducationCard from "../cards/ResumeEducationCard"
import generateTitle from "./titleGenerater"

const generateEducation = ({ educations, divider, style,  titleHeader = "education", props = {} }) => {

    return {
        key: "educations",
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
                            <EducationCard key={index} education={education} 
                                style={style}
                               
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