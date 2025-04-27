import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import StrengthCard from "../cards/ResumeStrengthCard"
import generateTitle from "./titleGenerater"

const generateStrength=({strengths,style,divider,layout_no,layout_type=layout_type_map.CLASSICAL,sectionHeader})=>{
    return  {
        key: "strengths",
        content: () => (
            <>
                {
                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader, textAlign: "left" } })
                }
                {
                    divider ?  divider :null
                }
                <SectionContent>

                    <StrengthCard layout_no={layout_no} layout_type={layout_type} style={{h2:style.h2,p:style.p}} strengths={strengths} />

                </SectionContent>
            </>
        )
    }

}
export default generateStrength