import { layout_type_map } from "../../../constant"
import { FlexBox } from "../../CustomComponents"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import PassionCard from "../cards/ResumePassionCard"
import generateTitle from "./titleGenerater"

const generatePassionSectionData = ({ passions,
    style,
    divider, layout_no,
    layout_type = layout_type_map.CLASSICAL,
    sectionHeader = "passions",
    props = {} }) => {
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
                    <FlexBox flexWrap="wrap" margin="0" 
                    {...(props.shouldIncludeIcon) && {flexDirection: "column",justifyContent: "start",alignContent: "start"}}>
                        {
                            passions.map((passion, index) => (
                                <PassionCard key={index} passion={passion} layout_no={layout_no} layout_type={layout_type} style={{ h2: style.h2 }}{...props} />
                            ))
                        }
                    </FlexBox>
                </SectionContent>
            </>
        )
    }
}
export default generatePassionSectionData