import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import OpenSourceWorkCard from "../cards/ResumeOpenSourceWorkCard"
import generateTitle from "./titleGenerater"

const generateOpenSourceWork = ({ openSourceWork, divider, style,  sectionHeader = "open source work" }) => {
    return {
        key: "open_source_work",
        content: () => (
            <>
                {
                    generateTitle({ title: sectionHeader, style: { ...style.sectionHeader } })
                }
                {divider?divider:null}
                <SectionContent>
                    <OpenSourceWorkCard works={openSourceWork}  style={style} />
                </SectionContent>
            </>
        )
    }
}

export default generateOpenSourceWork