import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import ExpertiseCard from "../cards/ResumeExpertiseCard"
import generateTitle from "./titleGenerater"

const generateIndustryExpertise=({industryExpertise,layout_no,style,divider,layout_type=layout_type_map.CLASSICAL,sectionHeader="industry expertise"})=>{
    return {
        key: "industry_expertise",
        content: () => (
            <>
                {

                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader, textAlign: "left" } })
                }
                {
                    divider ? divider :divider
                }
                <SectionContent>
                    <div className="grid grid-cols-2 gap-3">
                        {
                            industryExpertise.map((expertise, index) => (
                                <ExpertiseCard key={index} expertise={expertise} 
                               style={style}
                                />
                            ))
                        }
                    </div>
                </SectionContent>
            </>
        )
    }
}

export default generateIndustryExpertise