import { layout_type_map } from "../../../constant"
import { SectionContent } from "../../elements/resumeSectionWrapper"
import AcheivementCard from "../cards/ResumeAchievementCard"
import generateTitle from "./titleGenerater"

const generateAchievement = ({ achievements, style, divider, layout_no, layout_type = layout_type_map.CLASSICAL, titleHeader = "achievement", shouldIncludeIcon = false }) => {
    return {
        key: "achievements",
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

                        <AcheivementCard my_acheivement={achievements} layout_no={layout_no}

                            style={
                                {
                                    iconColor: style.primaryColor,
                                    h2: style.h2,
                                    p: style.p
                                }
                            }
                            shouldIncludeIcon={shouldIncludeIcon}
                            layout_type={layout_type} />

                    }
                </SectionContent>
            </>
        )
    }
}

export default generateAchievement