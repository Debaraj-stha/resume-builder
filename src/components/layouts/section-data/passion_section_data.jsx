import { layout_type_map } from "../../../constant"
import { FlexBox } from "../../CustomComponents"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import PassionCard from "../cards/ResumePassionCard"
import generateTitle from "./titleGenerater"

const generatePassionSectionData = ({ passions, style, divider, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "passion" }) => {
    return {
        key: "passions",
        content: () => (
            <>
                {
                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader } })
                }
                {
                    divider ? divider : null
                }

                <SectionContent>
                    <FlexBox flexWrap="wrap" margin="0">
                        {
                            passions.slice(0, 1).map((passion, index) => (
                                <PassionCard key={index} passion={passion} layout_no={layout_no} layout_type={layout_type} style={{ h2: style.h2 }} />
                            ))
                        }
                    </FlexBox>
                </SectionContent>
            </>
        )
    }
}
export default generatePassionSectionData