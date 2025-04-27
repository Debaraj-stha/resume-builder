import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import EducationCard from "../cards/ResumeEducationCard"

const generateEducation=({educations,divider,style,layout_no,layout_type=layout_type_map.CLASSICAL,titleHeader="education"})=>{
    return   {
        key: "education",
        content: () => (
            <>
                {

                    generateTitle({ title: titleHeader, style: { ...style.sectionHeader, } })
                }
               {
                divider ?  divider :null
               }
                <SectionContent>
                    {
                        educations.map((education, index) => (
                            <EducationCard key={index} education={education} layout_no={layout_no}
                                style={{
                                    h2: style.h2,
                                    h3: style.h3,
                                    primaryColor: style.primaryColor,
                                    p: style.p
                                }}
                                layout_type={layout_type} />
                        ))
                    }
                </SectionContent>
            </>
        )
    }
}

export default generateEducation