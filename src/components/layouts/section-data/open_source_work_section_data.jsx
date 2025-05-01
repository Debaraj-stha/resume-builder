import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import OpenSourceWorkCard from "../cards/ResumeOpenSourceWorkCard"
import generateTitle from "./titleGenerater"

const generateOpenSourceWork = ({ openSourceWork, divider, style, layout_no, layout_type = layout_type_map.CLASSICAL, sectionHeader = "open source work" }) => {
    return {
        key: "open_source_work",
        content: () => (
            <>
                {
                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader } })
                }
                {divider?divider:null}
                <SectionContent>
                    <OpenSourceWorkCard works={openSourceWork} layout_no={layout_no} layout_type={layout_type} style={style} />
                </SectionContent>
            </>
        )
    }
}

export default generateOpenSourceWork